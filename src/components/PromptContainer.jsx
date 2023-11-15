import React  from 'react';   
import Prompt from './Prompt'; 


export default function PromptContainer({startHandler}) {  
 
  return (
    <>  
       <Prompt startHandler={startHandler} /> 
    </>
  );
} 