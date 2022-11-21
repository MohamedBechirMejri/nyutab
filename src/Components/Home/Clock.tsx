import { useEffect, useState } from "react";
import { getTime } from "../../lib/dateUtils";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <h1 className="flex items-center justify-center w-full h-full text-4xl font-medium text-center bg-transparent rounded-lg">
      {currentTime}
    </h1>
  );
};

export default Clock;
