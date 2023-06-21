import { useEffect, useState } from "react";
import { getTime } from "../../../lib/dateUtils";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <h1 className="flex items-center justify-center 2xl:text-2xl font-bold text-center bg-transparent rounded-lg font-[FiraCode] flex-col">
      {currentTime}
    </h1>
  );
};

export default Clock;
