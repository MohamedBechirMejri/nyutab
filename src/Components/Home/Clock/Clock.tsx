import { useEffect, useState } from "react";
import { getTime } from "../../../lib/dateUtils";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(getTime().split(" "));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime().split(" "));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const parseTime = (time: string) => {
    if (time.length === 1) return "0" + time;
    return time;
  };

  return (
    <div className="flex items-start justify-center 2xl:text-2xl font-bold text-center bg-transparent rounded-lg font-[FiraCode] flex-col">
      <p className="flex">
        <span>{parseTime(currentTime[0].split(":")[0])}</span>
      </p>{" "}
      <p className="flex pl-3">
        <span>{parseTime(currentTime[0].split(":")[1])}</span>
      </p>{" "}
      <p className="flex">
        <span>{currentTime[1]}</span>
      </p>
    </div>
  );
};

export default Clock;
