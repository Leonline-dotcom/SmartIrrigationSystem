import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const CountdownTimer = ({ duration }) => {
  return (
    <div className="countdown-timer">
      <CountdownCircleTimer
        isPlaying
        duration={10}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => (
          <div className="timer-text">
            {remainingTime} seconds
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownTimer;