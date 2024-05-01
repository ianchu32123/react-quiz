import React from "react";

// Option 組件用於顯示單個問題的選項
function Option({ question, dispatch, answer }) {
  // 檢查是否已回答過該問題
  const hasAnswered = answer !== null;

  return (
    <div className="option">
      {/* 遍歷顯示問題的各個選項 */}
      {question.options.map((option, index) => (
        <button
          // 按鈕的 CSS 類名根據狀態動態設置
          className={`btn btn-option ${
            // 如果該選項是答案，添加 "answer" 類名
            index === answer ? "answer" : ""
          } ${
            // 如果已回答且該選項是正確答案，添加 "correct" 類名；否則添加 "wrong" 類名
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          // 如果已經回答過，禁用按鈕
          disabled={answer !== null}
          // 點擊按鈕時觸發 dispatch 函數來更新回答狀態
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
