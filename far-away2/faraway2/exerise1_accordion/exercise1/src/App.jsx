import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data ={faqs}/>
    </div>
  );
}

function Accordion({data}) {
  const [curOpen,setIsopen] = useState(1);
  return <div>{data.map((el,i)=><AccordionItem curOpen={curOpen} onOpen={setIsopen} title ={el.title}  num={i} >{el.text}</AccordionItem>)} </div>;
}


function AccordionItem({num,title,children,curOpen,onOpen}){
const isOpen = num === curOpen;
  function handleToggle(){
onOpen(isOpen ?null:num);
}
  return <div className="item" onClick={handleToggle}>
    <p className="number">{num<9 ?`0${num+1}`:num + 1}</p>
    <p classname ="title">{title}</p>
    <p classname ="icon">{isOpen? '-' : '+' }</p>
    {isOpen && <div classname ="content-box">{children}</div>}
  </div>
}