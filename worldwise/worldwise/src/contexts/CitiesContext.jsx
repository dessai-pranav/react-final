import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000'

const initialState ={
  cities:[],
  isloading: false,
currentCity:{},
error:''
}

function reducer(state,action){
switch(action.type){
  case 'loading' : return {...state, isloading:true}
  case 'cities/loaded' : return {...state,isloading:false,cities:action.payload}
    case 'city/created': return {...state,isloading: false,cities:[...state.cities, action.payload]}
      case 'city/deleted': return {...state,isloading: false,cities:state.cities.filter((city)=>city.id !==action.payload),}
        case 'city/loaded' : return{...state,isloading: false,currentCity:action.payload};
        case 'rejected' : return {...state ,isloading: false ,error:action.payload}
        default : throw new Error("unknown action")
}
}

function CitiesProvider({children}){
  const [{cities,isloading,currentCity},dispatch] = useReducer(reducer,initialState)
     // const [cities,setCities] = useState([])
      //const [isloading,setIsLoading]= useState(false)  
   // const[currentCity,setCurrentCity] = useState({})
      useEffect(function() {
        async function fetchCitis(){
          dispatch({type:"loading"})
          try{
            
            const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
         dispatch({type:'cities/loaded' , payload:data})}
          catch{
            dispatch({type: 'rejected', payload: "there was an error loading cities "})
          } 
          
        }
        fetchCitis();
        }
    
      ,[])
    async function getCity(id)
   
       {   
         if(id===currentCity.id) return ;
        dispatch({type:"loading"})
            try{
                
                const res = await fetch(`${BASE_URL}/cities/${id}`)
                const data = await res.json();
                dispatch({type: 'city/loaded' , payload: data})
            }catch{
                dispatch({type: 'rejected', payload: "there was an error loading the city "})
            } 
        
      }
       async function createCity(newCity)
       {    dispatch({type:"loading"})
            try{
             
                const res = await fetch(`${BASE_URL}/cities`,{method:'POST',body:JSON.stringify(newCity),header:{"Content-Type":"application/json",}})
                const data = await res.json();
             dispatch({type:'city/created', payload: data})
            }catch{
                dispatch({type: 'rejected', payload: "there was an error loading the city "})
            } 
        
      }
      async function deleteCity(id)
       {    dispatch({type:"loading"})
            try{
               
                 await fetch(`${BASE_URL}/cities/${id}`,{method:"DELETE"})
               
                dispatch({type:'city/deleted',payload:id})
            }catch{
                dispatch({type: 'rejected', payload: "there was an error loading the city "})
            } 
        
      }
      return (<CitiesContext.Provider value={{cities,isloading,currentCity,getCity,createCity,deleteCity}}>{children}</CitiesContext.Provider>);
}
function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined)  throw new Error("outsude cititesprovider")
    return context;
}
export {CitiesProvider,useCities}