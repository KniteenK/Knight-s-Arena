import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { FaFlag, FaHandshake } from 'react-icons/fa';

const ChessboardPage = (props) => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moves, setMoves] = useState([]);
  const [socket, setSocket] = useState(null);

    useEffect(() => {
      const ws = new WebSocket('ws://20.244.36.168:8000/');
        setSocket(ws);

        ws.onmessage = (event) => {
          console.log(event.data);
          
            const gameCopy = new Chess(event.data);
            
            setFen(gameCopy.fen());
            setGame(gameCopy);
        };

        return () => {
            ws.close();
        };
    }, [game]);

  const onDrop = (sourceSquare, targetSquare) => {
    console.log(moves);
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

    // Delay computer's move to allow the board to update
    // setTimeout(() => makeComputerMove(gameCopy.fen()), 500);

    if (socket) {
      console.log(gameCopy.fen());
      socket.send(gameCopy.fen());
    }

    if (game.turn() === 'w' && player === 'c') {
      makeComputerMove(gameCopy.fen());
    }

    return true;
  };

  const makeComputerMove = (fen) => {
   
    const gameCopy = new Chess(fen);
    const possibleMoves = gameCopy.moves();

    if (possibleMoves.length === 0) return; // game over

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    gameCopy.move(randomMove);
    setFen(gameCopy.fen());
    setGame(gameCopy);
    setMoves((prevMoves) => [...prevMoves, `Computer: ${randomMove}`]);
  };

  // Ensure computer moves only when it's their turn
  useEffect(() => {
    console.log(props);
    if (game.turn() === 'b' && props.props != 'h') {
      makeComputerMove(game.fen());
    }
  }, [fen]); // Only run the effect when the FEN changes

  return (
    <div className="flex h-screen">
      {/* Player Info Section */}
      <div className="w-1/5 bg-gray-900 p-4 flex flex-col justify-center items-start">
       {props.props!='h'&& <div className="text-white text-xl mb-2">Stockfish</div> &&
        <div className="text-white text-xl mb-2">Player 1 (1500?)</div>}
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
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <FaFlag />
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            <FaHandshake />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessboardPage;