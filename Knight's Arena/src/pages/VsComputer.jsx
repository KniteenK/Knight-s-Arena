import React , {useState} from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const VsComputer = () => {
  const navigate = useNavigate() ;
  const [level, setLevel] = useState(1);

  const handlePlay = (event) => {
    event.preventDefault();
    navigate('/ChessboardPage' , {state : {player : 'c' , level : level}});
  }
  return (
    <>
    <Layout>
      <div>
      <form onSubmit={handlePlay}>
        <label className = "font-bold py-10 px-12">
          Select Level : {level}
          <input 
          type="range" 
          min="1" 
          max="15" 
          value={level} 
          onChange={(e) => setLevel(e.target.value)} 
          />
        </label>
        <div>
          <button type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Play
          </button>
        </div>
      </form>
      </div>
    </Layout>
    </>
  );
};

export default VsComputer;
