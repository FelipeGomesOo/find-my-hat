import React, {  useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import GridContainer from './GridContainer';
import PromptContainer from './PromptContainer';  
import { generateNewGrid, localStoreNewGrid } from '../functions/helperFunctions'; 

export default function Game() {  
  const { gameOn, setGameOn, setGrid } = useGameContext();

  useEffect(() => {
    let gameStatus = gameOn ? 'Game on' : 'Game off';
    console.log(gameStatus);
  },[gameOn])

 
  const startHandler = async () => { 
    console.log('StartHandler Clicked!');
    let freshNewGrid = await generateNewGrid();
    setGrid(freshNewGrid);
    let localNewGrid = await localStoreNewGrid(freshNewGrid);
    setGameOn(localNewGrid);        
  } 

  return (
    <div className="Game"> 
       {gameOn && <GridContainer /> }
       <PromptContainer startHandler={startHandler}/> 
    </div>
  );
} 