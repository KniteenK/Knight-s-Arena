import React from 'react';
import Layout from './Layout';
import ChessboardPage from './ChessboardPage';

const VsComputer = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold mb-6">Play vs Computer</h1>
      <div className="flex justify-center">
        <ChessboardPage />
      </div>
    </ Layout>
  );
};

export default VsComputer;
