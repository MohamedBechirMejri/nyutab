import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";

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
    <div className="rounded-lg w-max p-3 text-2xl font-medium bg-[#C4C4C4] flex flex-col items-center justify-center transition-all gap-2">
      <h1>Pomodoro Clock</h1>
      <h2
        className={` border-2 px-8 py-11 rounded-full border-black ${
          isRunning && "animate-borderFade"
        } `}
      >
        {Math.floor(time / 60)}:{time % 60 < 10 ? "0" + (time % 60) : time % 60}
      </h2>
      <h2>{isRunning ? (isWorkTime ? "Work Time!" : "Take a Break!") : ("Fun Time?")}</h2>
      <div className=" transition-all ">
        <button
          className={` px-4 py-2 ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } rounded-full m-2 transition-all text-zinc-700 `}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? <BsPauseFill /> : <BsPlayFill />}
        </button>

        {!isRunning && time < 25 * 60 && (
          <button
            className="px-4 py-2 bg-blue-500 rounded-full m-2 transition-all text-zinc-700 hover:bg-blue-600 "
            onClick={() => setTime(25 * 60)}
          >
            {" "}
            <BsStopFill />{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default PomodoroClock;
