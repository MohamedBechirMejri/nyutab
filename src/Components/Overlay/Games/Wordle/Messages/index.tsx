import { useEffect } from "react";
import { getRandomNumber } from "../../../../../lib/mathUtils";

const startMessages = ["Here we Go!", "Good Luck!", "You Got This!"];

const winMessages = ["Congrats!", "You Won!", "Nice Job!"];

const loseMessages = ["Game Over!", "Better Luck Next Time", "Try Again"];

const Messages = ({
  word,
  isGameOver,
  isGameWon,
  message,
  score,
  setMessage,
  restart,
}: {
  word: string;
  isGameOver: boolean;
  isGameWon: boolean;
  message: string;
  score: number;
  setMessage: (message: string) => void;
  restart: () => void;
}) => {
  useEffect(() => {
    if (isGameWon) setMessage(winMessages[getRandomNumber(winMessages.length)]);
    else if (isGameOver)
      setMessage(loseMessages[getRandomNumber(loseMessages.length)]);
    else setMessage(startMessages[getRandomNumber(startMessages.length)]);
  }, [isGameOver, isGameWon, score]);

  return (
    <div className="grid h-full grid-cols-4 grid-rows-1">
      <button></button>
      <div className="flex flex-col items-center justify-center h-full col-span-2 font-bold bg-zinc-800">
        <h1>{message}</h1>
        {isGameOver && (
          <h2 className="text-sm">
            {isGameWon ? `The word was ${word}` : `Streak: ${score}`}
          </h2>
        )}
      </div>
      <button onClick={restart}>{isGameWon ? "Next" : "Restart"}</button>
    </div>
  );
};

export default Messages;
