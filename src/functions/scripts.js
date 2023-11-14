import React, { useState, useEffect } from 'react'; 
import { useGameContext  } from './gameContext';

const { gameOn, setGameOn, grid, setGrid } = useGameContext();

// Start new game, generate a grid and render it
export const startHandler = () => { 
    console.log('StartHandler Clicked!'); 
    generateNewGrid();
    setGameOn(true);      
}    
const renderGrid = (gridArray) => {
    const gridRows = gridArray.map((arr,index) => { 
    return <div key={index} className={`gridRow row${index}`}>{          
        arr.map((gridCell,index) => {
        const gridCellClass = () => {
            switch(gridCell) {
                case '*': return "hole" ;  
                case 'O': return "player";
                case '^': return "hat";
                case '░': return "path";
                default : return null 
            }
        }
        return <div key={index} className={`gridCell ${gridCellClass()}`}>{gridCell}</div>;  
        })}
    </div>;        
    });        
    setGrid(gridRows);
    console.log("renderGrid:", gridRows); 
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
    renderGrid(newGrid);     
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

  
