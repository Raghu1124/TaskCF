import shuffle from './shuffle';

const formatQuestions = (results) => {
  return results.map((q) => {
    const options = shuffle([
      ...q.incorrect_answers,
      q.correct_answer,
    ]);

    return {
      question: q.question,
      options,
      correctAnswer: q.correct_answer,
    };
  });
};

export default formatQuestions;
