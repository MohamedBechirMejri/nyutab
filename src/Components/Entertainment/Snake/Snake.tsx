import React from "react";
import uniqid from "uniqid";
import generateCoords from "../../../Utils/generateCoords";

const Snake = () => {
  const xAxis = 10;
  const yAxis = 10;
  const [board, setBoard] = React.useState(generateCoords(xAxis, yAxis));
  const [snake, setSnake] = React.useState([2, 3, 4] as number[]);
  const [direction, setDirection] = React.useState("right");
  const [food, setFood] = React.useState(37);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [speed, setSpeed] = React.useState(200);

  //@ts-ignore
  const handleKeyDown = e => {
    if (e.key === "ArrowUp" && direction !== "down") {
      setDirection("up");
    } else if (e.key === "ArrowDown" && direction !== "up") {
      setDirection("down");
    } else if (e.key === "ArrowLeft" && direction !== "right") {
      setDirection("left");
    } else if (e.key === "ArrowRight" && direction !== "left") {
      setDirection("right");
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, speed);
    return () => {
      clearInterval(interval);
    };
  }, [speed]);

  const moveSnake = () => {
    const head = snake[snake.length - 1];
    const newHead =
      direction === "right"
        ? head + 1
        : direction === "left"
        ? head - 1
        : direction === "up"
        ? head - xAxis
        : head + xAxis;
    const newSnake = [...snake, newHead];
    const newBoard = [...board];
    if (newHead === food) {
      setFood(5);
      setScore(score + 1);
    } else {
      newSnake.shift();
    }
    if (
      newHead < 0 ||
      newHead >= xAxis * yAxis ||
      newSnake.indexOf(newHead) !== -1
    ) {
      setGameOver(true);
    }
    newBoard[head] = 0;
    newBoard[newHead] = 1;
    setBoard(newBoard);
    setSnake(newSnake);
  };

  const restart = () => {
    setBoard(generateCoords(xAxis, yAxis));
    setSnake([2, 3, 4] as number[]);
    setDirection("right");
    setFood(37);
    setScore(0);
    setGameOver(false);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="[grid-area:1/1/4/4] w-full h-full p-2 transition-all flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-[repeat(10,35px)] grid-rows-[repeat(10,35px)] w-max h-max border">
        {board.map(coord => {
          return (
            <div
              key={uniqid()}
              className={` p-3 border ${
                snake.includes(coord)
                  ? " bg-green-500 "
                  : food === coord
                  ? "bg-red-500"
                  : "bg-slate-500"
              }`}
            />
          );
        })}
      </div>
      <h2>Score: {score}</h2>
      <div className="flex justify-center items-center gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setDirection("left");
          }}
        >
          Left
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setDirection("right");
          }}
        >
          Right
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setDirection("up");
          }}
        >
          Up
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setDirection("down");
          }}
        >
          Down
        </button>
      </div>
    </div>
  );
};

export default Snake;
