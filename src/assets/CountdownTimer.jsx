


import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div>
      {days > 0 && <span className='text-2xl md:text-7xl text-bold  drop-shadow-2xl bg-gradient-to-r from-lightGreen  to-Lemongreen text-transparent bg-clip-text'>{days}d </span>}
      {hours > 0 && <span className='text-2xl md:text-7xl text-bold bg-gradient-to-r from-lightGreen to-Lemongreen text-transparent bg-clip-text'>{hours}h </span>}
      {minutes > 0 && <span className='text-2xl md:text-7xl text-bold bg-gradient-to-r from-lightGreen to-Lemongreen text-transparent bg-clip-text'>{minutes}m </span>}
      {seconds > 0 && <span className='text-2xl md:text-7xl text-bold bg-gradient-to-r from-lightGreen to-Lemongreen text-transparent bg-clip-text'>{seconds}s </span>}
      {days === 0 && hours === 0 && minutes === 0 && seconds === 0 && (
        <span >Countdown Complete!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
