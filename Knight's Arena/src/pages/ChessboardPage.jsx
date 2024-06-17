import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Layout from './Layout';

const ChessboardPage = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  

  const onDrop = (sourceSquare, targetSquare) => {
    console.log(sourceSquare);
    console.log(targetSquare);
    
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    

    if (move === null) return false; // illegal move
    console.log(gameCopy.fen());
    setFen(gameCopy.fen());
    setGame(gameCopy);
    

    return true;
  };

  useEffect(() => {
    if(game.turn()=='w') return;
    const gameCopy = new Chess(game.fen());
    const possibleMoves = gameCopy.moves();

    if (possibleMoves.length === 0) return; // game over

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    gameCopy.move(randomMove);
    setFen(gameCopy.fen());
    setGame(gameCopy);
  },[game.turn()]);

  return (
    <>
      <div className="flex justify-center">
        <div style={{ width: '400px', height: '400px' }}>
          <Chessboard 
          
            position={game.fen()}  
            onPieceDrop={(sourceSquare, targetSquare) => onDrop(sourceSquare, targetSquare)}
            

          />
        </div>
      </div>
    </>
  );
};

export default ChessboardPage;
