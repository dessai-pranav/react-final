import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchOrder(){
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        if(!query) return;
        navigate(`/order/${query}`);
        setQuery("");
    }

    return (
        <form onSubmit={handleSubmit}>
        <input placeholder="search order #" value = {query} onChange={(e) => setQuery(e.target.value)}
        className=" w-28 rounded-full bg-yelllow-100 px-4 py-2 text-sm placeholder:text-stone-400  focus:w-72 sm:w-64 transition-all duration-300"/>
        </form>
    )
}
export default SearchOrder