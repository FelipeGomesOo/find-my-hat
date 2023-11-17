import React  from 'react';   
import Prompt from './Prompt'; 
import Button from './Button';
import { useGameContext } from '../gameContext'; 

export default function PromptContainer( { loadGame } ) { 
  const { gameStatus} = useGameContext(); 
  return (
    <>  
       <Prompt activeCondition={gameStatus === 'Unset'}>
            <h2>Find My Hat</h2>
            <p>Click start to begin</p>          
            <Button type='accent' size="medium" onClick={loadGame}>Start</Button>
      </ Prompt>
      <Prompt activeCondition={gameStatus === 'Loading...'}>
            <h2>Loading!</h2>
            <p>TIP: Use the arrow keys to move!</p>           
      </ Prompt>
      <Prompt activeCondition={gameStatus === 'Won'}>
            <h2>You Win!</h2>
            <p>This is a personal project designed and coded by <a className='link' href="https://github.com/FelipeGomesOo">Felipe Gomes</a>.</p> 
            <p>If you enjoyed the game, I'd love to hear your feedback</p>            
            <p>Thank's for playing!</p>          
            <Button type='accent' size="medium" onClick={loadGame}>Play Again</Button> 
      </ Prompt>
    </>
  );
} 