import { useEffect, useState } from "react";
import { getDate } from "../../lib/dateUtils";

const Date = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <h1 className="font-medium text-center bg-transparent rounded-lg transition-all self-center text-xs">
      {currentDate}
    </h1>
  );
};

export default Date;
