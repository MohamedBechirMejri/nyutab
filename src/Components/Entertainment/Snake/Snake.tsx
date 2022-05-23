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
  const [speed, setSpeed] = React.useState(50);

  // React.useEffect(() => {
  //   console.log(direction);
  // }, [direction]);

  React.useEffect(() => {
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
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      let newSnake = [...snake];
      let newHead =
        direction === "right"
          ? newSnake[newSnake.length - 1] + 1
          : direction === "left"
          ? newSnake[newSnake.length - 1] - 1
          : direction === "up"
          ? newSnake[newSnake.length - 1] - xAxis
          : direction === "down"
          ? newSnake[newSnake.length - 1] + xAxis
          : 0;
      if (direction === "right" && newHead % xAxis === 1) {
        newHead -= xAxis;
      }
      if (direction === "left" && newHead % xAxis === 0) {
        newHead += xAxis;
      }
      if (direction === "up" && newHead < 1) {
        newHead += xAxis * yAxis;
      }
      if (direction === "down" && newHead > xAxis * yAxis) {
        newHead -= xAxis * yAxis;
      }

      newSnake = [...newSnake, newHead];
      if (newHead !== food) {
        newSnake.shift();
      } else {
        setScore(score + 1);
        setFood(7);
      }
      if (
        newHead < 0 ||
        newHead >= xAxis * yAxis ||
        newSnake.indexOf(newHead) !== -1
      ) {
        setGameOver(true);
      }
      setSnake(newSnake);
    }, speed);
    return () => clearInterval(interval);
  }, [direction, food, score, snake, speed]);

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
      <div className="flex items-center justify-center gap-2">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            setDirection("left");
          }}
        >
          Left
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            setDirection("right");
          }}
        >
          Right
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            setDirection("up");
          }}
        >
          Up
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
