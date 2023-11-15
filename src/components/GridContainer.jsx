import React, { useState, useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import Grid from './Grid';
import Player from './Player';
import { convertGridToHTML } from '../functions/helperFunctions'; 

export default function GridContainer() {      
    const {grid} = useGameContext();
    const [renderedGrid, setRenderedGrid] = useState(null);

    useEffect(() => {
        const renderGrid = async () => {
          let htmlGrid = await convertGridToHTML(grid);
          //console.log("Grid em html: ",htmlGrid)
          setRenderedGrid(htmlGrid);
        } 
         renderGrid();
        
    }, [grid]);     

    return (
      <>
        {renderedGrid && (
          <>
            <Player />
            <Grid>{renderedGrid}</Grid>
          </>
        )}
      </>
    );}