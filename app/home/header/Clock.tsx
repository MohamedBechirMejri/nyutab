import { useEffect, useState } from "react";
import { getTime } from "lib/dateUtils";

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
    <div className="flex items-start justify-center 2xl:text-3xl font-bold text-center bg-transparent rounded-lg font-[FiraCode] flex-col text-xl">
      {parseTime(currentTime[0])} {currentTime[1]}
    </div>
  );
};

export default Clock;
