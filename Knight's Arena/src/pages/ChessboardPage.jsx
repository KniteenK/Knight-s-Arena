import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { FaFlag, FaHandshake } from 'react-icons/fa';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

Modal.setAppElement('#root');

const ChessboardPage = () => {
  const location = useLocation();
  const { player, level } = location.state || { player: 'h', level: 1 };
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moves, setMoves] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState('');
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('wss://knight-s-arena-backend.onrender.com');
    setSocket(ws);

    ws.onmessage = (event) => {
      const gameCopy = new Chess(event.data);
      setFen(gameCopy.fen());
      setGame(gameCopy);
    };

    return () => {
      ws.close();
    };
  }, []);

  const onDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return false;

    setFen(gameCopy.fen());
    setGame(gameCopy);
    setMoves((prevMoves) => [...prevMoves, `Player: ${sourceSquare}-${targetSquare}`]);

    if (gameCopy.isGameOver()) {
      handleGameOver(gameCopy);
    }

    if (socket) {
      socket.send(gameCopy.fen());
    }

    if (game.turn() === 'w' && player === 'c') {
      makeComputerMove(gameCopy.fen());
    }

    return true;
  };

  const makeComputerMove = async (fen) => {
    try {
      const response = await axios.get('https://stockfish.online/api/s/v2.php', {
        params: {
          fen: fen,
          depth: level,
        },
      });
      console.log('Stockfish response:', response.data);

      const bestMove = response.data.bestmove;
      const gameCopy = new Chess(fen);
      gameCopy.move(bestMove);
      setFen(gameCopy.fen());
      setGame(gameCopy);
      setMoves((prevMoves) => [...prevMoves, `Computer: ${bestMove}`]);

      if (gameCopy.isGameOver()) {
        handleGameOver(gameCopy);
      }
    } catch (error) {
      console.error('Error fetching Stockfish move:', error);
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

  const handleHomeClick = () => {
    navigate('/Home');
  };

  return (
    <div className="flex h-screen">
      {/* Player Info Section */}
      <div className="w-1/5 bg-gray-900 p-4 flex flex-col justify-center items-start">
        {player !== 'h' && (
          <>
            <div className="text-white text-xl mb-2">Stockfish</div>
            <div className="text-white text-xl mb-2">Player 1 (1500?)</div>
          </>
        )}
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
            <li key={index} className="mb-2">
              {move}
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <button
            onClick={handleResign}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaFlag />
          </button>
          <button
            onClick={handleDraw}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              New Game
            </button>

            <button
              onClick={handleHomeClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Home
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChessboardPage;
