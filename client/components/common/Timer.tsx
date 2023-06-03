import React, {useEffect, useState} from 'react';

const Timer = ({end}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  const calc = () => {
    const now = new Date().getTime();
    const timeRemaining = end - now;

    setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

    if (timeRemaining > 0) {
      setTimeout(() => {
        calc();
      }, 5000);
    }
  }

  useEffect(() => {
    calc();
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
