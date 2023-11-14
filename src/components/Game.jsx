import React, { useState, useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import GridContainer from './GridContainer';
import Prompt from './Prompt'; 
import chars from '../data/chars';
import {gameSettings, gameArea} from '../data/settings';

export default function Game() {  
  const { gameOn, setGameOn, setGrid } = useGameContext();
  const {hat, hole, field, me } = chars;
  const {gameWidth, gameHeight} = gameSettings;

// Start new game, generate a grid and render it
const startHandler = () => { 
  console.log('StartHandler Clicked!'); 
  generateNewGrid();
  setGameOn(true);      
} 
const generateNewGrid = () => {
  let newGrid = [];
  const sumMe = 1;
  const sumHat = 1;
  const sumHole = Math.ceil(gameArea * 0.2);
  const sumField = gameArea -(sumHole + sumMe + sumHat);
  const charPairs = [[me, sumMe],[hat, sumHat],[hole, sumHole],[field, sumField]];
  const arrSorted = [];    
  const arrIndex = [0];
  const arrShufled = [];
  // Creates an Array with all field elements
  charPairs.forEach((element) => {
  for(let i = 0; i < element[1]; i++){
      arrSorted.push(element[0]);
  }        
  });
  // Creates an array of unsorted Index numbers       
  while (arrIndex.length < gameArea) {
  let randomNumber = Math.floor(Math.random() * gameArea);
  if (!arrIndex.includes(randomNumber)) {
      arrIndex.push(randomNumber);
  }
  }
  // Creates a Shufled array with all field elements
  arrIndex.forEach((indexElement) => {      
  arrShufled.push(arrSorted[indexElement]);          
  });
  // Creates the newGrid
  let j = 0;
  while (newGrid.length < gameHeight ) { 
      let arr = [];        
      for(let i = 0 ; i < gameWidth ; i++){
      arr.push(arrShufled[j]);
      j++;
      } 
      newGrid.push(arr);     
  } 
  setGrid(newGrid);
  console.log("generateNewGrid:", newGrid);     
}

// Move the player
const [playerPosition , setPlayerPosition] = useState({row: 0, cell: 0})    
useEffect(() => {
  const handleKeyDown = (event) => {
    if(gameOn){
      switch (event.key) {
        case 'ArrowLeft': setPlayerPosition((prev) => {
          return {...prev, cell: prev.cell--}
        }); 
        break;
        
        case 'ArrowRight': setPlayerPosition((prev) => {
          return {...prev, cell: prev.cell++}
        }); 
        break;
        
        case 'ArrowUp': setPlayerPosition((prev) => {
          return {...prev, row: prev.row--}
        }); 
        break;
        
        case 'ArrowDown': setPlayerPosition((prev) => {
          return {...prev, row: prev.row++}
        }); 
        break;
        
        default: console.log('Use W A S D to find your hat');
      }
    } else{return null}         
  }; 
  document.addEventListener('keydown', handleKeyDown);        
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [gameOn])

useEffect(() => {
  console.log("Current player position:", playerPosition) 
},[playerPosition])

useEffect(() => {
  gameOn ? console.log('The game is on') : console.log('The game is off');
},[gameOn])

  return (
    <div className="Game"> 
       <GridContainer /> 
       <Prompt startHandler={startHandler} /> 
    </div>
  );
} 