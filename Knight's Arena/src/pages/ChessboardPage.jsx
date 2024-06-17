import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Layout from './Layout';

const ChessboardPage = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  const onDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return false; // illegal move

    setFen(gameCopy.fen());
    setGame(gameCopy);

    setTimeout(makeComputerMove, 500); // make computer move after a short delay
    return true;
  };

  const makeComputerMove = () => {
    const gameCopy = new Chess(game.fen());
    const possibleMoves = gameCopy.moves();

    if (possibleMoves.length === 0) return; // game over

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    gameCopy.move(randomMove);
    setFen(gameCopy.fen());
    setGame(gameCopy);
  };

  return (
    <>
      <div className="flex justify-center">
        <div style={{ width: '400px', height: '400px' }}>
          <Chessboard 
            position={fen} 
            onPieceDrop={(sourceSquare, targetSquare) => onDrop(sourceSquare, targetSquare)} 
          />
        </div>
      </div>
    </>
  );
};

export default ChessboardPage;
