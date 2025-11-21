import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {decreaseItemQuantitY, increaseItemQuantity} from "./cartSlice.js";
import {formatCurrency} from "../../utils/helpers.js";

function UpdateItemQuantity({pizzaId , currentQuantity}) {
    const dispatch = useDispatch();
    return (
        <div className="flex  gap-1 items-center md:gap-3">
            <Button type = 'round' onClick={() =>  dispatch(increaseItemQuantity(pizzaId))}>+</Button>
            <span className="text-sm font-bold">{currentQuantity}</span>
            <Button type = 'round' onClick={() =>  dispatch(decreaseItemQuantitY(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity;