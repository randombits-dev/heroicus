import React, {useEffect, useState} from 'react';

interface Props {
  end: number;
  expired?: () => void;
}

let intervalId: any;
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

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      if (!initial) {
        expired && expired();
      }
    }
  }

  useEffect(() => {
    intervalId = setInterval(() => {
      calc();
    }, 5000);
    calc(true);
    return () => {
      clearInterval(intervalId);
    };
  }, [end]);

  return (
    <span>
      {days > 0 && <span>{days} days, </span>}
      {hours > 0 && <span>{hours} hours, </span>}
      <span>{minutes} minutes</span>
    </span>
  );
}

export default Timer
