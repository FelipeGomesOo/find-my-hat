import React, { useState, useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import Grid from './Grid';

export default function GridContainer() {   
  
    const [renderedGrid, setRenderedGrid] = useState(null);
    const {gameOn, grid} = useGameContext();

    useEffect(() => {
      if(grid) {
      const convertGridToHTML = () => {
        const gridRows = grid.map((arr,index) => { 
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
        console.log("convertGridToHTML:", gridRows); 
        setRenderedGrid(gridRows)
      }
      convertGridToHTML()
    }
    },[grid, setRenderedGrid])      
    return (
      <>
          {gameOn && <Grid>{renderedGrid}</Grid>}             
      </>
    );
  }