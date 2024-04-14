import React, { useState, useEffect } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface TimerProps {
  timeLimit: number;
  onZero: () => void;
  stopTimer: boolean;
  resetTimer: boolean;
  sx?: SxProps<Theme>;
}

export const Timer: React.FC<TimerProps> = ({
  timeLimit,
  onZero,
  stopTimer,
  resetTimer,
  sx,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(timeLimit);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!stopTimer) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            onZero();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [stopTimer, onZero]);

  useEffect(() => {
    if (resetTimer) {
      setSecondsRemaining(timeLimit);
    }
  }, [resetTimer, timeLimit]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <Box sx={sx}>
      <h3>{formattedTime}</h3>
    </Box>
  );
};
