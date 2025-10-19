import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header"
import Main from "./Maintag";
import "./index.css"
const initialState={
  question:[],
  status:'loading',

}
function reducer(state,action){
  switch(action.type){
    case 'dataRecieved': return {...state,
      question: action.payload,
      status:"ready",};
    case 'dataFailed' : return {...state,status:'error',}
      default: throw new Error("Action unknown");

  }

}
export default function App(){
  
  const[state,dispatch] = useReducer(reducer,initialState)


useEffect(function(){
  fetch("http://localhost:8000/questions").then(res=>res.json()).then(data=>dispatch({type: 'dataRecieved',payload: data})).catch((err)=>dispatch({type:'dataFailed'}))
},[]);
  return <div className="app">
  <Header/>
  <Main>
    <p>1/15</p>
    <p>Question</p>
    </Main>
  
   
  </div>
}