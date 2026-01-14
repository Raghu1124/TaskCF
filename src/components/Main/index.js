import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";

import mindImg from "../../images/mind.svg";
import {formatQuestions } from "../../utils";
import Offline from "../Offline";
import "./style.css";

const Main = ({ startQuiz }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=15`;
    fetch(API)
      .then((respone) => respone.json())
      .then((data) =>
        setTimeout(() => {
          const { response_code, results } = data;

          if (response_code !== 0) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{" "}
                <strong>Difficulty Level</strong>, or{" "}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          const formattedQuestions = formatQuestions(results);

          const totalTimeInSeconds = 30 * 60;

          setProcessing(false);
          startQuiz(formattedQuestions, totalTimeInSeconds);
        }, 1000)
      )
      .catch((error) =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  return (
    <Container>
      <Segment raised className="main-card">
        <div className="main-grid">
          {/* LEFT SIDE – Branding (same as StartPage) */}
          <div className="main-left">
            <h1 className="app-title">Quiz App</h1>
            <p className="app-quote">
              Test your knowledge with our interactive quiz!
            </p>
          </div>

          {/* RIGHT SIDE – Instructions + CTA */}
          <div className="main-right">
            <h2>The Ultimate Trivia Quiz</h2>

            <p className="quiz-info">
              This quiz contains <strong>15 questions</strong> and must be
              completed within <strong>30 minutes</strong>.
            </p>

            {error && (
              <Message error onDismiss={() => setError(null)}>
                <Message.Header>Error</Message.Header>
                {error.message}
              </Message>
            )}

            <Divider />

            <Button
              primary
              size="large"
              icon="play"
              labelPosition="left"
              content={processing ? "Loading Quiz..." : "Start Quiz"}
              onClick={fetchData}
              disabled={processing}
            />
          </div>
        </div>
      </Segment>
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
