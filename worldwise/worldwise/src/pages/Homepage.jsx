import {Link} from "react-router-dom"
import PageNav from "../components/PageNav"
import AppNav from "../components/AppNav"
function Homepage() {
    return (
        <div>
            <PageNav/>
            <AppNav/>
           <h1 >worldwise</h1>
           <Link to ='/pricing'>pricing</Link>
            <Link to = '/product'>pricing</Link>
             <Link to ='/PageNotFound'>pricing</Link>
             
        </div>
    )
}

export default Homepage
