import chars from '../data/chars';
import {gameSettings, gameArea} from '../data/settings';
import Me from '../components/characters/Me';
import Hole from '../components/characters/Hole';
import Field from '../components/characters/Field';
import Hat from '../components/characters/Hat';

const {hat, hole, field, me } = chars;
const {gameWidth, gameHeight} = gameSettings; 

const generateNewGrid = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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
            resolve(newGrid) 
        }, 500);   
    })
}

const localStoreNewGrid = (newGrid) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage.removeItem('firstGrid'); 
            localStorage.setItem('firstGrid', JSON.stringify(newGrid));               
            resolve(true);
        }, 500);
    })     
}     
      
const convertGridToHTML = (grid) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const gridRows = grid.map((arr,index) => { 
                return (
                  
                            
                      arr.map((gridCell,index) => {                        
                          switch(gridCell) {
                              case '*': return <Me key={index} /> ;  
                              case 'O': return <Hole key={index} />;
                              case '^': return <Hat key={index} />;
                              case '░': return <Field key={index} />;
                              default : return null 
                          }
                        })
                      
                  
                );        
            }); 
            resolve(gridRows);
        }, 50);
    })       
}

export {generateNewGrid, localStoreNewGrid, convertGridToHTML};