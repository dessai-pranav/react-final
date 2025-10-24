import { useEffect, useState } from "react"
import { BrowserRouter,Route,Routes} from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import "./index.css"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
function App() {
  const [cities,setCities] = useState([])
  const [isloading,setIsLoading]= useState(false)  
  const BASE_URL = 'http://localhost:8000'
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
  return (
  
  
  <BrowserRouter>
  
  <Routes>

    <Route path ="/" element = {<Homepage/>}/>
<Route path ="product" element = {<Product/>}/>
<Route path ="pricing" element = {<Pricing/>}/>
<Route path ="app" element = {<AppLayout/>}>
<Route index element = {<CityList cities = {cities} isloading={isloading}/>}/>
<Route path = 'cities' element = {<CityList cities = {cities} isloading={isloading}/>}/>
<Route path = 'countries' element = {<CountryList cities={cities} isloading={isloading}/>}/>
<Route path = 'form' element = {<p>form</p>}/>
</Route>
< Route path = "Login" element ={<Login/>}/>

<Route path="*" element = {<PageNotFound/>}/>
  </Routes>
  </BrowserRouter>


  )
}

export default App
