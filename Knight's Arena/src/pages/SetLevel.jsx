import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import ChessboardPage from "./ChessboardPage";

const SetLevel = () => {

    const [level , setLevel] = useState(1) ;
    const navigate = useNavigate() ;

    const handleSubmit = (event) => {
        event.preventDefault() ;
        navigate('/ChessboardPage' , {state : {player : 'c' , level : level}}) ;
    } ;

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
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
        </Layout>
    );
}

export default SetLevel;