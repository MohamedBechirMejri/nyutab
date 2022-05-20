import React from "react";
import generateCoords from "../../../Utils/generateCoords";

const Snake = () => {
  const xAxis = 10;
  const yAxis = 10;
  const [board, setBoard] = React.useState(generateCoords(xAxis, yAxis));
  const [snake, setSnake] = React.useState([2, 3, 4] as number[]);
  const [direction, setDirection] = React.useState("right");
  const [food, setFood] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [speed, setSpeed] = React.useState(200);

  return (
    <div className="[grid-area:1/1/3/3] w-full h-full p-2 transition-all">
      <div className="grid grid-cols-10 grid-rows-10 w-full h-full border">
        {board.map(coord => {
          console.log(coord);
          console.log(snake);
          console.log(snake.includes(coord));
          return (
            <div
              key={coord}
              className={` p-3 border ${
                snake.includes(coord) ? " bg-green-500 " : "bg-slate-500"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Snake;
