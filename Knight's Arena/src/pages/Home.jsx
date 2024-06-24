import { data } from 'autoprefixer';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import RollingButton from './RollingButton';
import './x.css';

const Home = () => {
  const [wait, setWait] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://knight-s-arena-backend.onrender.com');
      setSocket(ws);
      console.log("connected");
      ws.onmessage = (event) => {
        var dup=event.data;
        dup='/'+dup;
        navigate(dup);
      };
      return () => {
        ws.close();
    };
  }, []);
  const navigate = useNavigate();

  const handleVsComputerClick = () => {
    navigate('/VsComputer');
  };

  const handleLoginClick = () => {
    navigate('/Login');
  }

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <header className="w-full bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl ">Knight's Arena</div>
          <div>
            <button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Login</button>
            <button className="ml-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">Sign Up</button>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to the Knight's Arena</h1>
        <p className="text-lg mb-6">Play chess with friends, join tournaments, and improve your skills.</p>
        <div className="flex space-x-4">
          <button onClick={()=>{
            
            socket.send('buttonClicked');
            setWait(true);
          }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">Play Online</button>
          <button 
          onClick={handleVsComputerClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
            vs Computer
          </button>
        </div>
      </main>

      <footer className="w-full bg-gray-800 p-4">
        <div className="container mx-auto text-center">
          &copy; 2024 Knight's Arena. All rights reserved.
        </div>
      </footer>
    </div>

    <RollingButton loading={wait} />
    </>
  );
};

export default Home;
