import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App1.jsx'
import StarRating from './StarRating'

{/*function Test(){
  const [movieRating,setMovieRating] = useState(0);
  return(
    <div>
      <StarRating color = "blue" maxRating={10} onSetRating={setMovieRating}/>
      <p> This Movie Was Rated {movieRating}Stars</p>
    </div>

  )
}*/}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
{/*<StarRating maxRating={5} color="red" classname="test" messages={["terrible","bad","okay","good","Amazing"]} defaultRating={3}/>
<Test/>*/}
  </StrictMode>,
)
