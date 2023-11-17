import React, { createContext, useContext, useState } from 'react';

// Criar um contexto
const GameContext = createContext();

// Provedor do contexto
const GameProvider = ({ children }) => {
  const [gameStatus, setGameStatus] = useState("Unset"); // Unset - Loading... - Runing - Paused - Over - Won 
  const [grid, setGrid] = useState(null); /* JSON.parse(localStorage.getItem('firstGrid')) ||  */
  
  
  return (
    <GameContext.Provider value={{ gameStatus, setGameStatus, grid, setGrid }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para usar o contexto
const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be inside of GameProvider');
  }
  return context;
};

export { GameProvider, useGameContext };
