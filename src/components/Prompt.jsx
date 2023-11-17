import React from 'react'; 
export default function Prompt({activeCondition, children}) {  
  return ( 
    <div className={`Prompt ${ activeCondition ? 'promptOn' : 'promptOff'}`}>
        <div>
          {children}
        </div>
    </div>
)}