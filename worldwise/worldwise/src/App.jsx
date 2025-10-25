import { BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import "./index.css"
import { lazy, Suspense, useEffect, useState } from "react"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import SpinnerFullPage from "./components/SpinnerFullPage"

import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"
//import Product from "./pages/Product"
//import Pricing from "./pages/Pricing"
//import Homepage from "./pages/Homepage"
//import PageNotFound from "./pages/PageNotFound"
//import AppLayout from "./pages/AppLayout"
const Homepage = lazy(()=>import("./pages/Homepage"))
const Product = lazy(()=>import("./pages/Product"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))

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

<AuthProvider>
  <CitiesProvider>
  
  <BrowserRouter>
  <Suspense fallback={<SpinnerFullPage/>}>
  <Routes>

    <Route path ="/" element = {<Homepage/>}/>
<Route path ="product" element = {<Product/>}/>
<Route path ="pricing" element = {<Pricing/>}/>
<Route path ="app" element = {<ProtectedRoute><AppLayout/></ProtectedRoute>}>
<Route index element = {<Navigate replace to ="cities"/>}/>
<Route path = 'cities' element = {<CityList />}/>
<Route path="cities/:id" element ={<City/>}/>
<Route path = 'countries' element = {<CountryList />}/>

<Route path = 'form' element = {<Form/>}/>
</Route>
< Route path = "Login" element ={<Login/>}/>

<Route path="*" element = {<PageNotFound/>}/>
  </Routes>
  </Suspense>
  </BrowserRouter>
</CitiesProvider>
</AuthProvider>

  )
}

export default App
