import React, { useEffect, useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full p-3 text-2xl font-medium text-center bg-transparent rounded-lg dark:text-white ">
      {currentTime}
    </div>
  );
};

export default Clock;
