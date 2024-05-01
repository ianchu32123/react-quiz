import React from "react";

function Next({ dispatch, answer, index, numquestion }) {
  if (answer === null) {
    return null;
  }
  if (index < numquestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextquestion" })}
      >
        下一題
      </button>
    );
  }
  if (index === numquestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        結束了
      </button>
    );
  }
}

export default Next;
