import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css'
import Home from './pages/Home'
import VsComputer from './pages/VsComputer';
import OneVone from './pages/oneVone';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VsComputer" element={<VsComputer />} />
        
        <Route path="/:id" element={<OneVone />} />
      </Routes>
    </Router>
  );
}



export default App
