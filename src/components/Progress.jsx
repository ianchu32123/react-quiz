import React from "react";

function Progress({ index, numQuestions, points, maxpoint }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index}></progress>
      <p>
        question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong> {points} </strong> / {maxpoint}
      </p>
    </header>
  );
}

export default Progress;
