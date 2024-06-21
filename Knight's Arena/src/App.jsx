import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import VsComputer from './pages/VsComputer';
import PlayOnline from './pages/PlayOnline';
import SetLevel from './pages/SetLevel';
import ChessboardPage from './pages/ChessboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VsComputer" element={<VsComputer />} />
        <Route path="/PlayOnline" element={<PlayOnline />} />
        <Route path = "/SetLevel" element={<SetLevel />} />
        <Route path = "/ChessboardPage" element={<ChessboardPage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}



export default App
