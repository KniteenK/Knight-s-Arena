import React from 'react';
import ChessboardPage from './ChessboardPage';
import { useNavigate } from 'react-router-dom';

const oneVone = () => {

  navigate('/ChessboardPage' , {state : {player : 'h'}});

  return (
    <>
      <div>
        <ChessboardPage props="h" />
      </div>
    </>
  );
};

export default oneVone;