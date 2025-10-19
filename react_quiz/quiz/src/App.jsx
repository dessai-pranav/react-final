import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Maintag";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import "./index.css";
import Question from "./Question";

// Initial state
const initialState = {
  questions: [],
  status: "loading",
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      console.log("Fetched questions:", action.payload);
      return {
        ...state,
        questions: action.payload, // must be an array
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
      case "start": return {...state,status:'active'}
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
   
        dispatch({ type: "dataRecieved", payload: data.questions });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  const numQuestions = questions ? questions.length : 0;
  console.log("numQuestions:", numQuestions);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && <Question/>}
      </Main>
    </div>
  );
}
