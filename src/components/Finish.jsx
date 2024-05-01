import React from "react";

function Finish({ points, maxpoint, dispatch }) {
  const percentage = (points / maxpoint) * 100;
  return (
    <>
      <p className="result">
        你得到了<strong>{points}</strong> 總共有{maxpoint} (
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        重新開始
      </button>
    </>
  );
}
export default Finish;
