import React, {  useState } from 'react';
import { useGameContext  } from '../gameContext'; 
import chars from '../data/chars'; 
import  useOnKeyDown  from '../hooks/useOnKeyDown';
import playerDown from '../assets/character/front.png'; 
import playerUp from '../assets/character/back.png';
import playerLeft from '../assets/character/side-walking.png';
import playerRight from '../assets/character/side-walking.png';

const {hat, hole, field } = chars; 

export default function Player(){ 
     
    const { grid, setGameStatus } = useGameContext();  
    const [playerPosition , setPlayerPosition] = useState({ row: 0, cell: 0, srcImg: playerDown }); 
       
    const changePlayerPosition = async (targetKey) => {
        console.log("Key pressed!", targetKey); 
        const potentialCoords = async () => {
            const keyToCoords = {
                'ArrowLeft': { row: 0, cell: -1, srcImg: playerLeft, key: 'ArrowLeft' },
                'ArrowRight': { row: 0, cell: 1, srcImg: playerRight, key: 'ArrowRight' },
                'ArrowUp': { row: -1, cell: 0, srcImg: playerUp, key: 'ArrowUp' },
                'ArrowDown': { row: 1, cell: 0, srcImg: playerDown, key:'ArrowDown'  }
            }; 
            return keyToCoords[targetKey];
        }         
        let potential = await potentialCoords();
        let entitie = await moveEvaluation(potential);       
        changePositionState(potential); 
        moveConsequences(entitie);        
    }
    const resetPlayerPosition = () => {   
        setPlayerPosition(() => {
            return { row:0, cell:0, srcImg: playerDown }
        });     
    } 
    const moveEvaluation = (potential) => { 
        return new Promise((resolve, reject) => {                  
            if (
                grid[playerPosition.row + potential.row] && 
                grid[playerPosition.row + potential.row][playerPosition.cell + potential.cell]
            ){ 
                let entitie = grid[playerPosition.row + potential.row][playerPosition.cell + potential.cell] 
                console.log("Position good to go: ",entitie);                 
                resolve(entitie);
            }
        });           
    } 
    const changePositionState = (potential) => {  
        setPlayerPosition((old) => {  
            return {row: old.row + potential.row, cell: old.cell + potential.cell, srcImg: potential.srcImg, key: potential.key} 
        });  
    }
    const moveConsequences = (entitie) => {
        console.log("Entitie if I move: ",entitie)
        setTimeout(() => {
            switch(entitie) {  
                case field: console.log("ina field!"); break; 
                case hole: console.log("Oops! Fell in a hole. Let's try again!");resetPlayerPosition(); break; 
                case hat: console.log("Win!"); setGameStatus('Won'); break;
                default: console.log("You are out of bounds! Let's try again!", );   
            }             
        },400); 
          
    }    
    useOnKeyDown(
        changePlayerPosition,
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    ); 

    const playerPositionStyle = {
        transform: `translate(calc(100% * ${playerPosition.cell}), calc(100% * ${playerPosition.row}))`, 
    }
    const invertOnLeft = playerPosition.key === 'ArrowLeft' ? 'invert' : '';
     
    console.log(playerPosition.srcImg)
    console.log("playerPosition.key", playerPosition.key)
    return (
         <div className={`Player ${invertOnLeft}`} style={playerPositionStyle}>
            <div className="playerInner">
                <img className="PlayerImg" src={playerPosition.srcImg} alt="Player" />
            </div> 
         </div>
    )
}