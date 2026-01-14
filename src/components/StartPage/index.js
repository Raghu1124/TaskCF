import React, { useState } from 'react';
import { Form, Button, Header, Segment } from 'semantic-ui-react';
import './StartPage.css';

const StartPage = ({ onEmailSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setError('Please enter your first and last name');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);

    onEmailSubmit({
      firstName,
      lastName,
      email,
    });
  };

  return (
    <div className="start-page-wrapper">
      {/* LEFT SECTION */}
      <div className="start-left">
        <h1 className="app-title">Quiz App</h1>
        <p className="app-quote">
          Test your knowledge with our interactive quiz!
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="start-right">
        <Segment raised padded className="form-card">
          <Header as="h2" textAlign="center">
            Get Started
          </Header>

          <Form onSubmit={handleSubmit} error={!!error}>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Form.Input
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Input
              label="Email Address"
              placeholder="john.doe@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && <div className="error-text">{error}</div>}

            <Button primary size="large" fluid type="submit">
              Start Quiz
            </Button>
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default StartPage;
