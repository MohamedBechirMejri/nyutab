import axios from "axios";
import { useEffect, useState } from "react";

const Minesweeper = () => {
  const [board, setBoard] = useState([
    ["o", "o", "1", "x", "3", "x", "2", "x", "2"],
    ["1", "1", "1", "2", "x", "2", "2", "2", "x"],
    ["x", "1", "o", "1", "1", "1", "o", "1", "1"],
    ["1", "1", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "1", "1", "1", "o", "o", "o"],
    ["2", "2", "1", "1", "x", "1", "o", "o", "o"],
    ["x", "x", "2", "2", "1", "1", "o", "1", "1"],
    ["x", "4", "x", "1", "o", "o", "o", "1", "x"],
    ["1", "2", "1", "1", "o", "o", "o", "1", "1"],
  ]);
  const [clicked, setClicked] = useState(
    Array(board.length).fill(Array(board[0].length).fill(false))
  );

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const getBoard = async () => {
    const res = await axios.get(
      "https://shadify.dev/api/minesweeper/generator?start=1-2"
    );
    setBoard(res.data.board);
  };

  const reveal = (i: number, j: number) => {
    setClicked(clicked => {
      const newClicked = [...clicked];
      const row = [...newClicked[i]];
      row[j] = true;
      newClicked[i] = row;
      return [...newClicked];
    });
  };

  const handleClick = (i: number, j: number) => {
    if (
      i < 0 ||
      i >= board.length ||
      j < 0 ||
      j >= board[0].length ||
      clicked[i][j] ||
      gameOver ||
      gameWon
    )
      return;

    reveal(i, j);
    if (board[i][j] === "x") setGameOver(true);
    if (board[i][j] === "o") {
      // reveal surrounding tiles
      document.getElementById(`#${i}${j - 1}`)?.click();
      document.getElementById(`#${i - 1}${j - 1}`)?.click();
      document.getElementById(`#${i - 1}${j}`)?.click();
      document.getElementById(`#${i - 1}${j + 1}`)?.click();
      document.getElementById(`#${i}${j + 1}`)?.click();
      document.getElementById(`#${i + 1}${j - 1}`)?.click();
      document.getElementById(`#${i + 1}${j}`)?.click();
      document.getElementById(`#${i + 1}${j + 1}`)?.click();
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-rows-[repeat(12,minmax(0,2rem))] p-2 bg-gray-700 rounded-2xl gap-2 min-w-[24rem]">
        <div className="row-span-2">
          <h1>
            {gameOver ? "Game Over" : gameWon ? "Game Won" : "Minesweeper"}
          </h1>
        </div>
        {board.map((row, i) => {
          return (
            <div className="grid grid-cols-9 gap-2">
              {row.map((col, j) => {
                return (
                  <button
                    key={`#${i}${j}`}
                    id={`#${i}${j}`}
                    className={`${
                      clicked[i][j] ? "bg-red-500" : "bg-blue-700"
                    } rounded-2xl`}
                    onClick={() => handleClick(i, j)}
                  >
                    {clicked[i][j] && col !== "o" ? col : ""}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Minesweeper;
