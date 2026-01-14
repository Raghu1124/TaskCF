import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./quiz.css";
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header,
} from "semantic-ui-react";
import he from "he";

import Countdown from "../Countdown";
import QuestionNavigator from "../QuestionNavigator";
import { getLetter } from "../../utils";

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [answers, setAnswers] = useState(Array(15).fill(null));
  const [visited, setVisited] = useState(Array(15).fill(false));

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [questionIndex]);

  useEffect(() => {
    setVisited((v) => {
      const copy = [...v];
      copy[questionIndex] = true;
      return copy;
    });
  }, [questionIndex]);

  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name);
  };

  const handleNext = () => {
    let point = 0;
    const decodedCorrectAnswer = he.decode(data[questionIndex].correctAnswer);

    if (userSlectedAns === decodedCorrectAnswer) {
      point = 1;
    }

    // Update answers array immediately
    const newAnswers = [...answers];
    newAnswers[questionIndex] = userSlectedAns;
    setAnswers(newAnswers);

    // Build question and answer object
    const qna = [...questionsAndAnswers];
    qna[questionIndex] = {
      question: he.decode(data[questionIndex].question),
      user_answer: userSlectedAns,
      correct_answer: decodedCorrectAnswer,
      point,
    };

    // Check if this is the last question
    if (questionIndex === data.length - 1) {
      // return endQuiz({
      //   totalQuestions: data.length,
      //   correctAnswers: correctAnswers + point,
      //   timeTaken,
      //   questionsAndAnswers: qna,
      // });
      return;
    }

    // Move to next question
    setCorrectAnswers(correctAnswers + point);
    setQuestionsAndAnswers(qna);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
  };

  const handlePrevious = () => {
    if (questionIndex === 0) return;

    setQuestionIndex(questionIndex - 1);

    // Restore previously selected answer (if any)
    setUserSlectedAns(answers[questionIndex - 1]);
  };

  const handleSubmitQuiz = () => {
    const qna = [];
    let finalCorrectAnswers = 0;

    data.forEach((q, idx) => {
      const decodedCorrectAnswer = he.decode(q.correctAnswer);
      const userAnswer = answers[idx];

      let point = 0;
      if (userAnswer && userAnswer === decodedCorrectAnswer) {
        point = 1;
        finalCorrectAnswers++;
      }

      qna.push({
        question: he.decode(q.question),
        user_answer: userAnswer,
        correct_answer: decodedCorrectAnswer,
        point,
      });
    });

    endQuiz({
      totalQuestions: data.length,
      correctAnswers: finalCorrectAnswers,
      timeTaken,
      questionsAndAnswers: qna,
    });
  };

  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  const goTo = (index) => {
    if (userSlectedAns !== null) {
      setAnswers((a) => {
        const copy = [...a];
        copy[questionIndex] = userSlectedAns;
        return copy;
      });
    }
    setQuestionIndex(index);
    setUserSlectedAns(answers[index]);
  };

  return (
    <Item.Header>
      <Container className="quiz-container">
        {/* TOP NAVIGATION */}
        <QuestionNavigator
          answers={answers}
          visited={visited}
          currentQuestion={questionIndex}
          goTo={goTo}
        />

        <Segment raised className="quiz-segment">
          {/* TOP BAR */}
          <div className="quiz-topbar">
            {/* LEFT */}
            <Header as="h2">
              <Icon name="info circle" />
              {` Question ${questionIndex + 1} of ${data.length}`}
            </Header>

            {/* CENTER */}
            <div className="quiz-timer">
              <Countdown
                countdownTime={countdownTime}
                timeOver={timeOver}
                setTimeTaken={setTimeTaken}
              />
            </div>

            {/* RIGHT */}
            <Button
              color="red"
              size="large"
              className="quiz-submit"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </Button>
          </div>

          <Divider />

          {/* BODY */}
          <div className="quiz-body">
            {/* QUESTION */}
            <Message size="large" className="quiz-question">
              <b>{he.decode(data[questionIndex].question)}</b>
            </Message>

            {/* OPTIONS */}
            <Menu vertical fluid size="large" className="quiz-options">
              {data[questionIndex].options.map((option, i) => {
                const letter = getLetter(i);
                const decodedOption = he.decode(option);

                return (
                  <Menu.Item
                    key={decodedOption}
                    name={decodedOption}
                    onClick={handleItemClick}
                    className={`quiz-option ${
                      userSlectedAns === decodedOption ? "selected" : ""
                    }`}
                  >
                    <span className="option-letter">{letter}</span>
                    {decodedOption}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>

          <Divider />

          {/* ACTIONS */}
          <div className="quiz-actions">
            <Button
              primary
              disabled={questionIndex === 0}
              onClick={handlePrevious}
              icon="left chevron"
              content="Previous"
              size="big"
            />

            <Button
              primary
              disabled={questionIndex === data.length-1}
              onClick={handleNext}
              icon="right chevron"
              labelPosition="right"
              content="Next"
              size="big"
            />
          </div>
        </Segment>
      </Container>
    </Item.Header>
  );
};
Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
