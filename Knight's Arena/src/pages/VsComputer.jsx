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
        <label>
          Select Level: {level}
          <input 
          type="range" 
          min="1" 
          max="15" 
          value={level} 
          onChange={(e) => setLevel(e.target.value)} 
          />
        </label>
        <button type="submit">Play</button>
      </form>
      </div>
    </Layout>
    </>
  );
};

export default VsComputer;
