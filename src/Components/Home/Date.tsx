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
      <p className="flex flex-col">
        <span>{currentDate[0].slice(0, 3)} </span>
        <span className="pr-4">{currentDate[1].split(" ")[1]}</span>
        <span>{currentDate[1].split(" ")[0].slice(0, 3)} </span>
      </p>{" "}
    </h1>
  );
};

export default Date;
