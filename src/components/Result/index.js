import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Button, Divider } from 'semantic-ui-react';

import Stats from './Stats';
import QNA from './QNA';

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
}) => {
  const [activeTab, setActiveTab] = useState('Stats');

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Segment
        raised
        style={{
          padding: '2.5rem',
          borderRadius: '14px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <h1 style={{ marginBottom: '1.5rem' }}>Quiz Results</h1>

        {/* Internal toggle (NOT separate div visually) */}
        <div style={{ marginBottom: '2rem' }}>
          <Button.Group>
            <Button
              primary={activeTab === 'Stats'}
              basic={activeTab !== 'Stats'}
              onClick={() => setActiveTab('Stats')}
            >
              Summary
            </Button>
            <Button
              primary={activeTab === 'QNA'}
              basic={activeTab !== 'QNA'}
              onClick={() => setActiveTab('QNA')}
            >
              Answers
            </Button>
          </Button.Group>
        </div>

        <Divider />

        {/* Content */}
        {activeTab === 'Stats' && (
          <Stats
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            timeTaken={timeTaken}
            replayQuiz={replayQuiz}
            resetQuiz={resetQuiz}
          />
        )}

        {activeTab === 'QNA' && (
          <QNA questionsAndAnswers={questionsAndAnswers} />
        )}
      </Segment>
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Result;