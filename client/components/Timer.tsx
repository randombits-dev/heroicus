import React, {useEffect, useState} from 'react';

interface Props {
  key: string;
}

const Timer = ({end}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = end - now;
      console.log(timeRemaining);

      setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
      // setSeconds(Math.floor((timeRemaining % (1000 * 60)) / 1000));

      if (timeRemaining < 0) {
        clearInterval(interval);
      }
    }, 5000);
  }, []);

  return (
    <div><span>Expires in </span>
      {days && <span>{days} days, </span>}
      {hours && <span>{hours} hours, </span>}
      {minutes && <span>{minutes} minutes</span>}
    </div>
  );
}

export default Timer
