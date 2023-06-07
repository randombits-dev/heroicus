import React, {useEffect, useState} from 'react';

interface Props {
  end: number;
  expired?: () => void;
}

const Timer = ({end, expired}: Props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  const calc = (initial = false) => {
    const now = new Date().getTime();
    const timeRemaining = end - now;

    setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

    if (timeRemaining > 0) {
      setTimeout(() => {
        calc();
      }, 5000);
    } else if (!initial) {
      if (expired) {
        expired();
      }
    }
  }

  useEffect(() => {
    calc(true);
  }, []);

  return (
    <span>
      {days > 0 && <span>{days} days, </span>}
      {hours > 0 && <span>{hours} hours, </span>}
      {minutes > 0 && <span>{minutes} minutes</span>}
    </span>
  );
}

export default Timer
