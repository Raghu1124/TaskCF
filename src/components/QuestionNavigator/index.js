import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const QuestionNavigator = ({ answers, visited, currentQuestion, goTo }) => {
  return (
    <div className="question-navigator">
      {answers.map((answer, i) => (
        <button
          key={i}
          className={`nav-button ${
            answers[i] !== null
              ? 'attempted'
              : visited[i]
              ? 'visited'
              : ''
          } ${i === currentQuestion ? 'current' : ''}`}
          onClick={() => goTo(i)}
          title={`Question ${i + 1}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

QuestionNavigator.propTypes = {
  answers: PropTypes.array.isRequired,
  visited: PropTypes.array.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  goTo: PropTypes.func.isRequired,
};

export default QuestionNavigator;
