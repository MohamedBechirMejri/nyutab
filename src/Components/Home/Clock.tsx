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
    <h1 className="font-medium text-center bg-transparent rounded-lg dark:text-white text-xl">
      {currentTime}
    </h1>
  );
};

export default Clock;
