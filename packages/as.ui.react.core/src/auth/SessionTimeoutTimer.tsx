import * as React from 'react';
import PropTypes from 'prop-types';
import { useTimer } from 'react-timer-hook';

import { SessionCheckerContentProps } from '../types';

const SessionTimeoutTimer = (props: SessionCheckerContentProps) => {
  const {
    expiryTimestamp,
    pauseRef,
    onExpire = () => {
      console.warn('onExpire called on React Timer Hook');
    },
  } = props;

  const { pause, seconds, minutes } = useTimer({ expiryTimestamp, onExpire: onExpire });

  pauseRef.current = pause;

  return (
    <span>
      <span>{minutes}m</span> <span>{seconds}s</span>
    </span>
  );
};

SessionTimeoutTimer.propTypes = {
  expiryTimestamp: PropTypes.instanceOf(Date),
  onExpire: PropTypes.func,
  pauseRef: PropTypes.object,
};

export default SessionTimeoutTimer;
