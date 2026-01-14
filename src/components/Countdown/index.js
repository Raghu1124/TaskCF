import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import { timeConverter } from '../../utils';

const Countdown = ({ countdownTime, timeOver, setTimeTaken }) => {
  const totalTime = countdownTime * 1000;
  const [timerTime, setTimerTime] = useState(totalTime);
  const [alerted5Min, setAlerted5Min] = useState(false);
  const [alerted1Min, setAlerted1Min] = useState(false);
  const { hours, minutes, seconds } = timeConverter(timerTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      // 5-minute warning (300 seconds = 300000 ms)
      if (newTime === 300000 && !alerted5Min) {
        Swal.fire({
          icon: 'warning',
          title: '⚠️ Time Alert',
          text: 'Only 5 minutes left!',
          timer: 2000,
          showConfirmButton: false,
        });
        setAlerted5Min(true);
      }

      // 1-minute warning (60 seconds = 60000 ms)
      if (newTime === 60000 && !alerted1Min) {
        Swal.fire({
          icon: 'warning',
          title: '⚠️ Final Warning',
          text: 'Only 1 minute left!',
          timer: 2000,
          showConfirmButton: false,
        });
        setAlerted1Min(true);
      }

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          icon: 'info',
          title: `Oops! Time's up.`,
          text: 'Auto-submitting your quiz...',
          confirmButtonText: 'Check Results',
          timer: 3000,
          allowOutsideClick: false,
          allowEscapeKey: false,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      setTimeTaken(totalTime - timerTime + 1000);
    };

    // eslint-disable-next-line
  }, [timerTime, alerted5Min, alerted1Min]);

  return (
    <Button.Group size="massive" basic floated="right">
      <Popup
        content="Hours"
        trigger={<Button active>{hours}</Button>}
        position="bottom left"
      />
      <Popup
        content="Minutes"
        trigger={<Button active>{minutes}</Button>}
        position="bottom left"
      />
      <Popup
        content="Seconds"
        trigger={<Button active>{seconds}</Button>}
        position="bottom left"
      />
    </Button.Group>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
