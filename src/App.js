import React from 'react';
import './styles/styles.scss'; 
import { GameProvider } from './gameContext';
import Game from './components/Game';
import Root from './components/Root';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'; 
const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element={<Root/>}>  
            <Route index element={<Game /> } />  
        </Route>
        </>
    ),
    {
        basename: '/findMyHat', 
    }
);

export default function App() {
  return (
    <div className="App">
      <GameProvider>
        <RouterProvider router={appRouter}/>  
      </GameProvider>
    </div>
  );
} 