import React from 'react';
import './styles/styles.scss'; 
import { GameProvider } from './gameContext';
import Game from './components/Game';

export default function App() {
  return (
    <div className="App">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
} 