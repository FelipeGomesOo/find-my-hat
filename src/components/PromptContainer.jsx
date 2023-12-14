import React  from 'react';   
import Prompt from './Prompt'; 
import Button from './Button';
import promptIcon_start from '../assets/promptIcon-start.png'; 
import promptIcon_loading from '../assets/promptIcon-loading.png';
import promptIcon_win from '../assets/promptIcon-win.png';
import { useGameContext } from '../gameContext'; 

export default function PromptContainer( { loadGame } ) { 
  const { gameStatus} = useGameContext(); 
  return (
    <>  
       <Prompt activeCondition={gameStatus === 'Unset'}>
            <div className="Prompt__Icon"><img src={promptIcon_start} alt="Find My Hat" /></div> 
            <h2>Find My Hat</h2>
            <p>Click start to begin</p>          
            <Button type='accent' size="medium" onClick={loadGame}>Start</Button>
      </ Prompt>
      <Prompt activeCondition={gameStatus === 'Loading...'}>
            <div className="Prompt__Icon"><img src={promptIcon_loading} alt="Loading!" /></div> 
            <h2>Loading!</h2>
            <p>TIP: Use the arrow keys to move!</p>           
      </ Prompt>
      <Prompt activeCondition={gameStatus === 'Won'}>
            <div className="Prompt__Icon"><img src={promptIcon_win} alt="You Win!" /></div> 
            <h2>You Win!</h2>
            <p>This is a personal project designed and coded by <a className='link' href="https://github.com/FelipeGomesOo">Felipe Gomes</a>.</p>           
            <p>Thank's for playing!</p>          
            <Button type='accent' size="small" onClick={loadGame}>Play Again</Button> 
      </ Prompt>
    </>
  );
} 