import React from "react";
import Option from "./Option";

// Question 組件用於顯示單個問題及其選項
function Question({ question, dispatch, answer }) {
  return (
    <div>
      {/* 顯示問題標題 */}
      <h4>{question.question}</h4>
      {/* 顯示問題的選項 */}
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
