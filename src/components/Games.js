import React, { useState, useEffect } from 'react'; 
import { useGameContext  } from '../gameContext'; 
import Map from './Grid';
import Prompt from './Prompt'; 
import chars from '../data/chars';
import {gameSettings, gameArea} from '../data/settings';

export default function Games() {  
    const {hat, hole, field, me } = chars;
    const {gameWidth, gameHeight, gameArea} = gameSettings;
  return (
    <div className="Games"> 
      "oieee"
    </div>
  );
} 