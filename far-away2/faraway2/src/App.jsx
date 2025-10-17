import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
   { id: 3, description: "cahrger", quantity: 1, packed: false }
];
export default function App(){
    const [items,setItems] = useState([]);
  
      function handleAddItems(item){
    setItems((items)=>[...items,item]);
   
    }
     function handleDeleteItem(id){
      setItems(items.filter(item=>item.id !== id))

  }
  function handleToggleItem(id){
    setItems((items)=> items.map((item)=> item.id === id ? {...item, packed: !item.packed}: item ));
  }
  function handleClearList(){
    const confirmed = window.confirm('are you sure you want to delete all items?');
    if (confirmed)
    setItems([]);
  }
return(
  <div className="app">
     <Logo/>
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItems={handleToggleItem} onClearList={handleClearList}/>
    <Stats items={items} />
   
  </div>
)
}

function Logo(){
  return <h1> 🏝️ Far Away 🧳</h1>

}

function Form({onAddItems}){
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState(1);


  function handleSubmit(e) {e.preventDefault(); 
    if(!description) return;
    const newItem = {description, quantity,packed:false, id:Date.now()}
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  } 

  
return (<form  className="add-form" onSubmit={handleSubmit} 
  > 
  <h3>What Do You Need For Your Trip </h3>
  <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
    {Array.from({length: 20},(_,i)=> i+1).map((num)=>(<option value={num} key ={num} >{num}</option>))}
    </select>
    <input type='text' placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button>Add</button></form>
)
}

function PackingList({items,onDeleteItem,onToggleItems,onClearList}){
  const [sortBy,setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if(sortBy === 'description') sortedItems = items.slice().sort((a,b)=> a.description.localeCompare(b.description));

  if (sortBy === 'packed') sortedItems = items.slice().sort((a,b)=>Number(a.packed) - Number(b.packed));
  return( 
  <div className="list" >
    <ul >
      {sortedItems.map((item) => (<Item item = {item}
       onDeleteItem={onDeleteItem}
        onToggleItems={onToggleItems} 
        key={item.id}/>))}
        </ul>
        <div className="action">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value ='input'>Sort By Input order</option>
            <option value = 'description'>Sort By Description</option>
            <option value = 'packed'>Sort By Packed Status</option>
            </select>
            <button onClick={onClearList}> Clear list</button>
            </div>
        </div>
      );
}




function Item({item,onDeleteItem,onToggleItems}){
  return <li> <input type="checkbox" value={item.packed} onChange={()=>onToggleItems(item.id)}/> <span style={item.packed ? {textDecoration:"line-through"}:{}}>{item.quantity} {item.description}</span>
  <button onClick={()=>onDeleteItem(item.id)}>❌</button></li>
}
function Stats({items}){
  if(!items.length) return(<p className="stats"><em>Start adding some items to your packing list </em></p>)
    const numItems=items.length;
    const numPacked = items.filter((item)=>item.packed).length
    const percentage= Math.round( numPacked / numItems *100)
  return <footer className="stats">
    <em> {percentage=== 100?'You Got Everything Ready To Go ✈️ ' :` You Have ${numItems} items on your list, and you already packed  ${numPacked} (${percentage}%) `} </em>
  </footer>
}