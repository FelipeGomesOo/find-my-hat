import React, { useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import GridContainer from './GridContainer';
import PromptContainer from './PromptContainer';
import { generateNewGrid } from '../functions/helperFunctions';   

export default function Game() {  
  const { gameStatus, setGameStatus, setGrid, grid  } = useGameContext();
  useEffect(() => { 
    console.log("Game status:",gameStatus);
  },[gameStatus]) 

  const loadGame = async () => {  
    setGameStatus('Loading...');    
    let freshNewGrid = await generateNewGrid();
    setGrid(freshNewGrid);       
  } 
  grid && console.log("New grid loaded", grid);  
  return (
    <div className="Game"> 
       {grid && <GridContainer loadGame={loadGame} /> }
       <PromptContainer loadGame={loadGame} /> 
    </div>
  );
} 