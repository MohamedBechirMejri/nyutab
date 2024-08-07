import { useEffect, useState } from "react";
import { parseSeconds } from "../../../../lib/dateUtils";
import { getLocalData, setLocalData } from "../../../../lib/storageUtils";

const Timer = ({ resetTimer }: { resetTimer: string }) => {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    (async () => {
      const localData = await getLocalData("sudokuTime");
      if (localData) setSecondsPassed(localData);
    })();

    const timer = setInterval(() => {
      setSecondsPassed(s => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsPassed === 0) return;
    setLocalData("sudokuTime", secondsPassed);
  }, [secondsPassed]);

  useEffect(() => {
    if (resetTimer !== "") setSecondsPassed(0);
  }, [resetTimer]);

  return (
    <h1 className="items-center justify-center hidden w-full col-span-12 py-4 text-4xl font-bold xl:flex">
      {parseSeconds(secondsPassed)}
    </h1>
  );
};

export default Timer;
