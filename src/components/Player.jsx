import React, {  useState } from 'react';
import { useGameContext  } from '../gameContext'; 
import chars from '../data/chars'; 
import  useOnKeyDown  from '../hooks/useOnKeyDown';
import svgPlayer from '../assets/me.svg';
const {hat, hole, field, me } = chars; 

export default function Player(){ 
     
    const { grid, setGameStatus } = useGameContext();  
    const [playerPosition , setPlayerPosition] = useState({ row: 0, cell: 0 }); 
       
    const changePlayerPosition = async (targetKey) => {
        console.log("Key pressed!"); 
        const potentialCoords = async () => {
            const keyToCoords = {
                'ArrowLeft': { row: 0, cell: -1 },
                'ArrowRight': { row: 0, cell: 1 },
                'ArrowUp': { row: -1, cell: 0 },
                'ArrowDown': { row: 1, cell: 0 }
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
            return { row:0, cell:0 }
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
            return {row: old.row + potential.row, cell: old.cell + potential.cell} 
        });  
    }
    const moveConsequences = (entitie) => {
        console.log("Entitie if I move: ",entitie)
        setTimeout(() => {
            switch(entitie) {
                case me: console.log("Me!"); break; 
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
        transform: `translate(calc(100% * ${playerPosition.cell}), calc(57.5% * ${playerPosition.row}))`,
    }

    return (
         <div className='Player' style={playerPositionStyle}>
            <img className="PlayerImg" src={svgPlayer} alt="Player" />
         </div>
    )
}