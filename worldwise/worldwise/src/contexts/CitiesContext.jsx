import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000'

function CitiesProvider({children}){
      const [cities,setCities] = useState([])
      const [isloading,setIsLoading]= useState(false)  
    const[currentCity,setCurrentCity] = useState({})
      useEffect(function() {
        async function fetchCitis(){
          try{
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);}
          catch {
            alert('there was an error loading data')
          } finally {setIsLoading(false)
          }
        }
        fetchCitis();
        }
    
      ,[])
    async function getCity(id)
       {
            try{
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities/${id}`)
                const data = await res.json();
                setCurrentCity(data)
            }catch{
                alert("there was an error loadning data")
            } finally {setIsLoading(false)}
        
      }
      return (<CitiesContext.Provider value={{cities,isloading,currentCity,getCity}}>{children}</CitiesContext.Provider>);
}
function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined)  throw new Error("outsude cititesprovider")
    return context;
}
export {CitiesProvider,useCities}