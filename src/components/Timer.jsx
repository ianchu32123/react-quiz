import React, { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  // 計算剩餘時間的分鐘和秒數
  const minute = Math.floor(secondRemaining / 60);
  const second = secondRemaining % 60;

  // 使用 useEffect hook 在組件渲染時設置定時器，每秒觸發一次 dispatch 函數
  useEffect(
    function () {
      const id = setInterval(function () {
        // 每秒觸發 dispatch 函數，發送 "tick" 類型的 action
        dispatch({ type: "tick" });
      }, 1000);
      // 在組件卸載時清除定時器，以防止內存洩漏
      return () => clearInterval(id);
    },
    [dispatch] // 確保只在 dispatch 函數改變時重新設置定時器
  );

  // 返回計時器組件的 JSX 元素，顯示分鐘和秒數
  return (
    <div className="timer">
      {/* 如果分鐘少於 10，則在數字前添加 0 */}
      {minute < 10 && "0"}
      {minute}:{/* 如果秒數少於 10，則在數字前添加 0 */}
      {second < 10 && "0"}
      {second}
    </div>
  );
}

export default Timer;
