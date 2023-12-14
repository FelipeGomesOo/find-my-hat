import React, { useState, useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import Grid from './Grid';
import Player from './Player';
import Menu from './Menu';
import { convertGridToHTML } from '../functions/helperFunctions'; 

export default function GridContainer({loadGame}) {      
  const {grid, gameStatus, setGameStatus} = useGameContext();
  const [renderedGrid, setRenderedGrid] = useState(null);

  useEffect(() => {     
      const renderGrid = async () => {    
        console.log("Rendered grid triggered!", grid)        
        let htmlGrid = await convertGridToHTML(grid);           
        setRenderedGrid(htmlGrid);
        console.log("Html grid rendered!", htmlGrid)          
      } 
      const setGameRuning = () => {  
          setGameStatus((prev) => {
            if(prev === 'Loading...') {
              renderGrid();
              return 'Runing';
            } else {
              return prev;
            }
          }); 
      }
      setTimeout(() => {
        setGameRuning(); 
      }, 2000);  
  }, [grid, setGameStatus]);

  return (
    <>
      {gameStatus === 'Runing' &&  ( 
        <>
          <Grid><Player />{renderedGrid}  </Grid>
          <Menu loadGame={loadGame} />
        </>
      )}
    </>
);}