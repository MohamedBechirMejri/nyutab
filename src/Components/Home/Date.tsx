import { useEffect, useState } from "react";
import { getDate } from "../../lib/dateUtils";

const Date = () => {
  const [currentDate, setCurrentDate] = useState(getDate().split(", "));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getDate().split(", "));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="flex items-start justify-center 2xl:text-2xl font-bold text-center bg-transparent rounded-lg font-[FiraCode] flex-col">
      {currentDate[0]}, {currentDate[1]}
    </h1>
  );
};

export default Date;
