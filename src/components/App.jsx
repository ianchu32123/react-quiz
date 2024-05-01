import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Next from "./Next";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";

// 初始狀態
const initialState = {
  question: [], // 問題數據
  status: "loading", // 應用程序狀態（loading, error, ready, active）
  index: 0, // 當前問題的索引
  answer: null, // 用戶的答案
  points: 0, // 用戶的得分
  secondRemaining: null, // 剩餘秒數
};
const sec_per_question = 30; // 每個問題的答題時間

// reducer 函數，用於更新狀態
function reducer(state, action) {
  switch (action.type) {
    // 當從 API 收到問題數據時
    case "dataReceived":
      return { ...state, question: action.payload, status: "ready" };
    // 當從 API 加載問題數據時發生錯誤
    case "dataFailed":
      return { ...state, status: "error" };
    // 當用戶點擊了開始按鈕，開始答題時
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.question.length * sec_per_question,
      };
    // 當用戶給出新的答案時
    case "newAnswer":
      const currentQuestion = state.question[state.index]; // 獲取當前問題
      return {
        ...state,
        answer: action.payload, // 更新用戶的答案
        points:
          action.payload === currentQuestion.correctOption // 如果答案正確，增加用戶得分
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextquestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    case "restart":
      return { ...state, points: 0, index: 0, answer: null, status: "ready" };
    // 每秒觸發的 tick 事件，更新剩餘秒數，如果時間用完，則將狀態設置為 finish
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  // 使用 useReducer 鉤子來管理應用程序的狀態
  const [
    {
      question,
      status,
      index,
      answer,
      points,
      secondRemaining,
    } /* 把state解構 */,
    dispatch,
  ] = useReducer(reducer, initialState);

  // 獲取問題的總數量
  const numQuestions = question.length;

  // 計算最大分數
  const maxpoint = question.reduce(
    (total, currentQuestion) => total + currentQuestion.points,
    0
  );

  // 在組件加載時從服務器加載問題數據
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      {/* 應用程序的頂部標題 */}
      <Header />
      {/* 應用程序的主要內容 */}
      <Main>
        {/* 如果應用程序正在加載中，顯示加載器 */}
        {status === "loading" && <Loader />}
        {/* 如果從 API 加載問題數據時發生錯誤，顯示錯誤組件 */}
        {status === "error" && <Error />}
        {/* 如果從 API 成功加載問題數據，顯示開始界面 */}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {/* 如果應用程序處於答題中的狀態，顯示問題界面 */}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxpoint={maxpoint}
            />
            <Question
              question={question[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <Next
                dispatch={dispatch}
                answer={answer}
                index={index}
                numquestion={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish points={points} maxpoint={maxpoint} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
