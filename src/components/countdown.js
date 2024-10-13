"use client";

import React, { useState, useEffect } from "react";

const formatTime = (remainingTime) => {
  const days = Math.floor(remainingTime / (24 * 60 * 60));
  const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  return { days, hours, minutes, seconds };
};

const CountdownTimer = ({ targetTime }) => {
  const targetDate = new Date(targetTime).getTime();
  const [remainingTime, setRemainingTime] = useState(
    Math.floor((targetDate - new Date().getTime()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = Math.floor((targetDate - currentTime) / 1000);

      if (timeLeft >= 0) {
        setRemainingTime(timeLeft);
      } else {
        clearInterval(interval); 
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [targetDate]);

  if (remainingTime <= 0) {
    return <div>Countdown has ended!</div>; 
  }

  const { days, hours, minutes, seconds } = formatTime(remainingTime);

  return (
    <div>
      <div>{`Days: ${days}`}</div>
      <div>{`Hours: ${hours}`}</div>
      <div>{`Minutes: ${minutes}`}</div>
      <div>{`Seconds: ${seconds}`}</div>
    </div>
  );
};

export default CountdownTimer;
