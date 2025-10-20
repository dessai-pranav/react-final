import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Maintag";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import "./index.css";
import NextButton from "./NextButton";
import Progress from "./Progress";

// Initial state
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      console.log("Fetched questions:", action.payload);
      return {
        ...state,
        questions: action.payload, // always an array
        status: "ready",
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + 1
            : state.points,
      };
case 'nextQuestion': return{...state,index:state.index+1,answer:null}
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [{ questions, status, index, answer,points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        const questionsArray = Array.isArray(data) ? data : data.questions;
        dispatch({ type: "dataRecieved", payload: questionsArray });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  const numQuestions = questions.length;
  console.log("numQuestions:", numQuestions);
const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);


  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          /> <NextButton dispatch={dispatch} answer={answer}/></>
        )}
      </Main>
    </div>
  );
}
