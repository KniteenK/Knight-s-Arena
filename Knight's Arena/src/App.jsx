import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css'
import Home from './pages/Home'
import VsComputer from './pages/VsComputer';
import PlayOnline from './pages/PlayOnline';
import ChessboardPage from './pages/ChessboardPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VsComputer" element={<VsComputer />} />
        <Route path="/PlayOnline" element={<PlayOnline />} />
        <Route path="/ChessboardPage" element={<ChessboardPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}



export default App
