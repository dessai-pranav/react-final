import Header from "./Header.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";
import {Outlet,useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";


function AppLayout() {

    const navigation = useNavigation()
    const isLoading = navigation.state === "loading";
    return (
        <div className="grid h-screen  grid-row-[auto_1fr_auto]  ">
            {isLoading && <Loader />}
<Header/>
            <div className="my-10 overflow-scroll">
            <main className="overflow-scroll max-w-3xl mx-auto ">
                <Outlet/>
            </main >
            </div>
            <CartOverview/>
        </div>
    )
}
export default AppLayout;