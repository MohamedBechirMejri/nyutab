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
  return (
    <div className="grid h-full grid-cols-2 grid-rows-1">
      <div className="flex items-center justify-center h-full text-xl font-bold bg-zinc-800">
        <h1>
          Word: {word}
          {isGameOver && (
            <span className="text-green-500">
              - {isGameWon ? "Correct!" : "Wrong!"}{" "}
            </span>
          )}
        </h1>
      </div>
      <div className="grid h-full grid-cols-2 grid-rows-1">
        <button>assistant placeholder</button>
        <button onClick={restart}>{isGameWon ? "Next" : "Restart"}</button>
      </div>
    </div>
  );
};

export default Messages;
