import styles from './CountryList.module.css'
import Spinner from "./Spinner"
import Message from "./Message"
import CountryItem from "./CountryItem"
import { useCities } from '../contexts/CitiesContext'
function CountriesList() {
  const [cities,isloading] = useCities();
    if(isloading) return <Spinner/>
    if(!cities.length) return <Message message='Add your first city by clicking on the Map'/>
   const countries = cities.reduce((arr, city) => {
  const exists = arr.some((el) => el.country === city.country);
  if (!exists) {
    return [...arr, { country: city.country, emoji: city.emoji }];
  } else {
    return arr;
  }
}, []);
;
    return (
        <ul className={styles.countryList}>
{countries.map(country => <CountryItem country={country} key={country.country} />)}
        </ul>
            
        
    )
}

export default CountriesList