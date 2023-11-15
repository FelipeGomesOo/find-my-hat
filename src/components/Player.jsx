import React, {  useState } from 'react';
import { useGameContext  } from '../gameContext'; 
import chars from '../data/chars'; 
import  useOnKeyDown  from '../hooks/useOnKeyDown';
const {hat, hole, field, me } = chars;

export default function Player(){ 
    const { grid, setGrid } = useGameContext(); 
    const firstPostion = {
        previous: { row: 0, cell: 0 },
        next: { row: 0, cell: 0 }
    };
    const [playerPosition , setPlayerPosition] = useState(firstPostion); 
       
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
        let character = await moveEvaluation(potential);       
        changePositionState(potential, character); 
        ifIMoveToNextCell(potential, character);        
    }
    const resetGrid = () => {  
        const firstGrid = JSON.parse(localStorage.getItem('firstGrid'));      
        setGrid(() => firstGrid);
        setPlayerPosition(() => {
            return {
                previous: { row: 0, cell:0 },
                next: { row:0, cell:0 }                    
            }
        });     
    } 
    const moveEvaluation = (potential) => { 
        return new Promise((resolve, reject) => {                  
            if (
                grid[playerPosition.next.row + potential.row] && 
                grid[playerPosition.next.row + potential.row][playerPosition.next.cell + potential.cell]
            ){ 
                let character = grid[playerPosition.next.row + potential.row][playerPosition.next.cell + potential.cell] 
                console.log("Position good to go: ",character);                 
                resolve(character);
            }
        });           
    } 
    const changePositionState = (potential, character) => {  
        setPlayerPosition((old) => {                 
            const newPosition = {
                previous: { row: old.next.row, cell: old.next.cell },
                next: { row: old.next.row + potential.row, cell: old.next.cell + potential.cell}                    
            };                  
            return newPosition;
        });  
    }
    const ifIMoveToNextCell = (potential, character) => { 
        switch(character) {
            case me: console.log("Me!"); break; 
            case field: console.log("ina field!"); moveToNextCell(potential); break; 
            case hole: console.log("Oops! Fell in a hole. Let's try again!");resetGrid(); break; 
            case hat: console.log("Win!"); break;
            default: console.log("You are out of bounds! Let's try again!", );   
        }   
    } 
    const moveToNextCell = (potential) => {
        let newGrid = [...grid];
        newGrid[playerPosition.next.row][playerPosition.next.cell] = field;
        newGrid[playerPosition.next.row + potential.row][playerPosition.next.cell + potential.cell] = me;
        setGrid(newGrid);        
    }  

    useOnKeyDown(
        changePlayerPosition,
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    ); 

    return (
         <></>
    )
}