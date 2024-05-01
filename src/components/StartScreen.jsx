import React from "react";

function StartScreen({ numquestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to react quiz</h2>
      <h3>{numquestion} question to test your knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        開始
      </button>
    </div>
  );
}

export default StartScreen;
