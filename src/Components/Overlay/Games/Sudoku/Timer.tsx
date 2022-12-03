import { useEffect, useState } from "react";
import { parseSeconds } from "../../../../lib/dateUtils";

const Timer = () => {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsPassed(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="flex items-center justify-center w-full col-span-12 py-4 text-4xl font-bold">
      {parseSeconds(secondsPassed)}
    </h1>
  );
};

export default Timer;
