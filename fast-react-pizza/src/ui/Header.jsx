import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "./username.jsx";

function Header(){
    return (<>
        <header className="bg-yellow-500 px-3 py-4 border-b border-stone-200 sm:px-6 flex justify-evenly ">
            <Link to ='/' className="tracking-widest">Fast React Pizza.Co</Link>
            <SearchOrder />
            <Username/>
        </header>

</>
        )
}
export default Header;