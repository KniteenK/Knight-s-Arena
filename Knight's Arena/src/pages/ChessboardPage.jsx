import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { FaFlag, FaHandshake } from 'react-icons/fa';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

// Set the app element for accessibility
Modal.setAppElement('#root');

const ChessboardPage = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moves, setMoves] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState('');

  const onDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for simplicity
    });

    if (move === null) return false; // illegal move

    setFen(gameCopy.fen());
    setGame(gameCopy);
    setMoves((prevMoves) => [...prevMoves, `Player: ${sourceSquare}-${targetSquare}`]);

    if (gameCopy.isGameOver()) {
      handleGameOver(gameCopy);
    } else {
      // setTimeout(() => makeComputerMove(gameCopy.fen()), 500);
    }

    return true;
  };

  const makeComputerMove = (fen) => {
    const gameCopy = new Chess(fen);
    const possibleMoves = gameCopy.moves();

    if (possibleMoves.length === 0) {
      // handleGameOver(gameCopy) ;
      return ;
    }

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    gameCopy.move(randomMove);
    setFen(gameCopy.fen());
    setGame(gameCopy);
    setMoves((prevMoves) => [...prevMoves, `Computer: ${randomMove}`]);

    if (gameCopy.isGameOver()) {
      handleGameOver(gameCopy);
    }
  };

  const handleGameOver = (gameInstance) => {
    let resultMessage = '';
    if (gameInstance.isCheckmate()) {
      resultMessage = gameInstance.turn() === 'b' ? 'Player wins by checkmate' : 'Computer wins by checkmate';
    } else if (gameInstance.isStalemate()) {
      resultMessage = 'Draw due to stalemate';
    } else if (gameInstance.isInsufficientMaterial()) {
      resultMessage = 'Draw due to insufficient material';
    } else if (gameInstance.isDraw()) {
      resultMessage = 'Game is a draw';
    }
    setResult(resultMessage);
    setGameOver(true);
  };

  const handleResign = () => {
    setResult('Player resigns. Computer wins.');
    setGameOver(true);
  };

  const handleDraw = () => {
    setResult('Draw by agreement');
    setGameOver(true);
  };

  const handleNewGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setMoves([]);
    setGameOver(false);
    setResult('');
  };

  const Home = () => {
    navigate('/Home');
  };

  // Ensure computer moves only when it's their turn
  useEffect(() => {
    if (game.turn() === 'b' && !gameOver) {
      makeComputerMove(game.fen());
    }
  }, [fen]); // Only run the effect when the FEN changes

  return (
    <div className="flex h-screen">
      {/* Player Info Section */}
      <div className="w-1/5 bg-gray-900 p-4 flex flex-col justify-center items-start">
        <div className="text-white text-xl mb-2">Stockfish</div>
        <div className="text-white text-xl mb-2">Player 1 (1500?)</div>
      </div>

      {/* Chessboard Section */}
      <div className="flex-1 flex justify-center items-center bg-gray-900">
        <div className="flex justify-center items-center h-full">
          <Chessboard
            position={fen}
            onPieceDrop={(sourceSquare, targetSquare) => onDrop(sourceSquare, targetSquare)}
            boardWidth={Math.min(window.innerHeight * 0.9, window.innerWidth * 0.6)} // Responsive board size
          />
        </div>
      </div>

      {/* Moves and Buttons Section */}
      <div className="w-1/5 bg-gray-900 p-4 overflow-y-auto">
        <h2 className="text-2xl text-white font-bold mb-4">Moves</h2>
        <ul className="mb-4 text-white">
          {moves.map((move, index) => (
            <li key={index} className="mb-2">{move}</li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <button
            onClick={handleResign}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <FaFlag />
          </button>
          <button
            onClick={handleDraw}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FaHandshake />
          </button>
        </div>
      </div>

      {/* Modal for Game Over */}
      <Modal
        isOpen={gameOver}
        onRequestClose={handleNewGame}
        contentLabel="Game Over"
        className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-75"
        overlayClassName="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-75"
      >
        <div className="bg-white p-8 rounded shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">{result}</h2>
          <div>
            <button
              onClick={handleNewGame}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              New Game
            </button>

            <button
              onClick={Home}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">           
              Home
            </button>
          </div>
          
        </div>
      </Modal>
    </div>
  );
};

export default ChessboardPage;
