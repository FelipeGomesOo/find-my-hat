import React, { createContext, useContext, useState } from 'react';

// Criar um contexto
const GameContext = createContext();

// Provedor do contexto
const GameProvider = ({ children }) => {
  const [gameOn, setGameOn] = useState(false);
  const [grid, setGrid] = useState(JSON.parse(localStorage.getItem('firstGrid')) || null); 
  
  
  return (
    <GameContext.Provider value={{ gameOn, setGameOn, grid, setGrid }}>
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
