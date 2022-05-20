import React from "react";
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  return (
    <div className="[grid-area:1/1/4/4] w-full h-full p-2 transition-all flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-[repeat(10,35px)] grid-rows-[repeat(10,35px)] w-max h-max border">
        {board.map(coord => {
          return (
            <div
              key={coord}
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
