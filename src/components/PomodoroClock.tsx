import React, { useEffect, useState } from "react";

const PomodoroClock = () => {
  const [time, setTime] = useState(25 * 60);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const tick = () => {
    if (time === 0) {
      setIsWorkTime(!isWorkTime);
      setTime(!isWorkTime ? 25 * 60 : 5 * 60);
    } else {
      setTime(time - 1);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(tick, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <h2>
        {Math.floor(time / 60)}:{time % 60 < 10 ? "0" + (time % 60) : time % 60}
      </h2>
      <h2>{isRunning && (isWorkTime ? "Work Time!" : "Take a Break!")}</h2>
      {isRunning ? (
        <button onClick={() => setIsRunning(false)}>Stop</button>
      ) : (
        <button onClick={() => setIsRunning(true)}>Start</button>
      )}
      {!isRunning && time < 25 * 60 && (
        <button onClick={() => setTime(25 * 60)}> Reset </button>
      )}
    </div>
  );
};

export default PomodoroClock;
