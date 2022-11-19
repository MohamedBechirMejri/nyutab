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
    <h1 className="p-3 font-medium text-center bg-transparent rounded-lg text-2xl font-[GreatVibes]">
      <p className="">{currentDate}</p>
    </h1>
  );
};

export default Date;
