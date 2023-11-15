import chars from '../data/chars';
import {gameSettings, gameArea} from '../data/settings';

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
                  <div key={index} className={`gridRow row${index}`}>
                    {          
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
                        })
                      }
                  </div>
                );        
            }); 
            resolve(gridRows);
        }, 50);
    })       
}

export {generateNewGrid, localStoreNewGrid, convertGridToHTML};