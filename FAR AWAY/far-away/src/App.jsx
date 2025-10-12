import React from 'react'
import { useState } from 'react';
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  function handlePrevious(){
if(step>1) setStep(step-1);
}
function handleNext(){
  if (step<3) setStep(step+1);
}
function handleCount(){
  setCount(count+1)
}


  const [step,setStep] = useState(1);
  const [count,setCount] = useState(0);
  const [isopen , setIsopen] = useState(true);
  return (
    <div>
   
      {isopen && (
    <div className="steps">
      <div className='numbers'>
        <div className={`${step >= 1?"active":""}`}>1</div>
         <div className={`${step >= 2?"active":""}`}>2</div>
          <div className={`${step >= 3?"active":""}`}>3</div>
          
      </div>
     <p className='message'>Step {step}:{messages[step-1]}</p>
     <h1>{count}</h1>
    
     <button onClick = {handleCount}>+</button>
     <div className='buttons'>
      <button style={{backgroundColor: '#7950f2', color:'#fff'}} onClick={handlePrevious}>Previous</button>
      <button style={{backgroundColor: '#7950f2', color:'#fff'}} onClick={handleNext}>Next</button>
     </div>
    </div>)}</div>
  )
}

export default App
