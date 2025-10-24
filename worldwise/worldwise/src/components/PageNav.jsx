import {  NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"

function PageNav() {
    return (
     <nav className={styles.nav}>
        <ul>
            <li>
                <NavLink to ="/">Homepage</NavLink>
            
            </li>
            <li>
                <NavLink to ="/pricing">Pricing</NavLink>
            
            </li>
            <li>
                <NavLink to ="/prduct">Product</NavLink>

            
            </li>
             <li>
                <NavLink to ="/app">AppNav</NavLink>
            
            </li>
        </ul>
     </nav>
    )
}

export default PageNav
