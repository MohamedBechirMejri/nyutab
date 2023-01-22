import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * @description 2048 game
 * @returns {JSX.Element} 2048 game
 * @constructor
 * @see
 *
 * @todo
 * - [ ] Add swipe controls
 * - [ ] Add keyboard controls
 * - [ ] Add game over screen
 * - [ ] Add win screen
 * - [ ] Add game restart
 * - [ ] Add game settings
 * - [ ] Add game save
 * - [ ] Add game load
 * - [ ] Add game undo
 * - [ ] Add game redo
 * - [ ] Add game reset
 * - [ ] Add game pause
 * - [ ] Add game resume
 * - [ ] Add game quit
 *
 * @logic
 * - the game board is a 4x4 grid
 * - the game board is an array of 16 cells
 * - each cell is an object with a value and a position { value: number, x: number, y: number}
 * - the game board is initialized with 2 cells with random values and random positions
 * - the game board is updated by swiping in a direction
 * - the cells are placed in the ui by their positions in motion.div from framer motion
 * - the cells are updated by their values in motion.div from framer motion
 * - the cells are updated by their positions in motion.div from framer motion
 * -
 * - the cells are stored in a 1D array
 * - the cells positions are updated then we filter the new array to remove the empty cells or duplicate cells that are in same position
 * - the positions are are updated by the direction of the swipe and the amount of the empty cells in the direction of the swipe ie: if the swipe is left and there are 2 empty cells to the left of the cell then the position of the cell is updated by 2 but if there is another cell to the left of the cell then the position of the cell is the same unless the value of the cell is the same as the value of the cell to the left of it then the position of the cell is updated by 1
 * after the positions are updated we filter the array to remove the empty cells and duplicate cells that are in the same position by keeping one of them and doubling its value and resetting the other one
 * we then check for empty cells and if there are any we generate a new cell with a random value and a random position
 * if not then the game is over
 * new cells value is either 2 or 4 and the probability of getting a 4 is 10%
 */

const X2048 = () => {
  const boardWidth = 4;
  const boardHeight = 4;

  const [board, setBoard] = useState(
    Array(boardWidth * boardHeight).fill({ value: 0, x: 0, y: 0 })
  );

  const moveUp = () => {
    setBoard(board => {
      let newBoard = board;

      for (let i = 0; i < newBoard.length; i++) {
        const cell = newBoard[i];
        if (cell.y === 0) continue;

        const cellsAbove = newBoard.filter(c => c.y < cell.y && c.x === cell.x);
        const directCellAbove = cellsAbove[cellsAbove.length - 1];
        let distance;

        if (
          directCellAbove &&
          directCellAbove.value &&
          directCellAbove.value !== cell.value
        )
          distance = cell.y - directCellAbove.y - 1;
        else distance = cell.y;

        cell.y -= distance;
        newBoard = [...mergeTiles(newBoard)];
      }

      return [...newBoard];
    });
  };

  const moveDown = () => {
    setBoard(board => {
      let newBoard = board;

      for (let i = 0; i < newBoard.length; i++) {
        const cell = newBoard[i];
        if (cell.y === boardHeight - 1) continue;

        const cellsBelow = newBoard.filter(c => c.y > cell.y && c.x === cell.x);
        const directCellBelow = cellsBelow[0];
        let distance;

        if (
          directCellBelow &&
          directCellBelow.value &&
          directCellBelow.value !== cell.value
        )
          distance = directCellBelow.y - cell.y - 1;
        else distance = boardHeight - cell.y - 1;

        cell.y += distance;
        newBoard = [...mergeTiles(newBoard)];
      }

      return [...newBoard];
    });
  };

  const moveLeft = () => {
    setBoard(board => {
      let newBoard = board;

      for (let i = 0; i < newBoard.length; i++) {
        const cell = newBoard[i];
        if (cell.x === 0) continue;

        const cellsLeft = newBoard.filter(c => c.x < cell.x && c.y === cell.y);
        const directCellLeft = cellsLeft[cellsLeft.length - 1];
        let distance;

        if (
          directCellLeft &&
          directCellLeft.value &&
          directCellLeft.value !== cell.value
        )
          distance = cell.x - directCellLeft.x - 1;
        else distance = cell.x;

        cell.x -= distance;
        newBoard = [...mergeTiles(newBoard)];
      }

      return [...newBoard];
    });
  };

  const moveRight = () => {
    setBoard(board => {
      let newBoard = board;

      for (let i = 0; i < newBoard.length; i++) {
        const cell = newBoard[i];
        if (cell.x === boardWidth - 1) continue;

        const cellsRight = newBoard.filter(c => c.x > cell.x && c.y === cell.y);
        const directCellRight = cellsRight[0];
        let distance;

        if (
          directCellRight &&
          directCellRight.value &&
          directCellRight.value !== cell.value
        )
          distance = directCellRight.x - cell.x - 1;
        else distance = boardWidth - cell.x - 1;

        cell.x += distance;
        newBoard = [...mergeTiles(newBoard)];
      }

      return [...newBoard];
    });
  };

  const moveTiles = (direction: string) => {
    switch (direction) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      default:
        break;
    }
  };

  const mergeTiles = (newBoard: string | any[]) => {
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard.length; j++) {
        if (
          i !== j &&
          newBoard[i].x === newBoard[j].x &&
          newBoard[i].y === newBoard[j].y &&
          newBoard[i].value !== 0 &&
          newBoard[j].value !== 0
        ) {
          if (newBoard[i].value === newBoard[j].value) {
            newBoard[i].value *= 2;
            newBoard[j].value = 0;
            newBoard[j].x = 0;
            newBoard[j].y = 0;
          }
        }
      }
    }
    return newBoard;
  };

  const addNewTile = (board: any) => {
    const newBoard = [...board];
    const emptyCells = newBoard
      .map((c, i) => (c.value === 0 ? i : null))
      .filter(c => c !== null);
    if (emptyCells.length === 0) {
      // game over
      return newBoard;
    }
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const randomValue = Math.random() < 0.1 ? 4 : 2;
    newBoard[randomCell!] = {
      value: randomValue,
      x: randomCell! % 4,
      y: Math.floor(randomCell! / 4),
    };
    return [...newBoard];
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      e.preventDefault();
      moveTiles(e.key);
    }
  };

  const startGame = () => {
    setBoard(board => addNewTile(board));
    setBoard(board => addNewTile(board));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 pt-24 bg-slate-900 bg-opacity-70">
      <motion.div
        className="flex flex-col items-center justify-center w-full h-full gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "anticipate", duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold">2048</h1>
        <div className="flex items-center justify-center w-full gap-4 h-max">
          <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
            Score: {0}
          </div>
          <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
            Best: {0}
          </div>
        </div>

        <div className="relative grid grid-cols-4 grid-rows-4 gap-1">
          {board.map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-24 h-24 text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl"
            ></div>
          ))}

          {board.map((cell, i) => (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center w-24 h-24 overflow-hidden text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl"
              initial={{
                scale: 0,
                opacity: 0,
                left: (cell.x * 100) / 4 + "%",
                top: (cell.y * 100) / 4 + "%",
              }}
              animate={{
                scale: 1,
                opacity: cell.value === 0 ? 0 : 1,
                left: (cell.x * 100) / 4 + "%",
                top: (cell.y * 100) / 4 + "%",
              }}
            >
              <img
                src={cell.value === 0 ? "" : `/images/2048/${cell.value}.gif`}
                alt=""
              />
            </motion.div>
          ))}

          {/* <div className="absolute grid w-full h-full grid-rows-4">
            {[[2, 0, 0, 0]].map((row, i) => (
              <div key={i} className="grid w-full grid-cols-4">
                {row.map((cell, j) => (
                  <motion.div
                    key={j}
                    className="flex items-center justify-center w-24 h-24 overflow-hidden text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={cell === 0 ? "" : `./images/2048/${cell}.gif`}
                      alt=""
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div> */}
        </div>
        <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={startGame}
          >
            Start
          </button>
        </div>

        <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => console.log("left")}
          >
            Left
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => console.log("right")}
          >
            Right
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => console.log("up")}
          >
            Up
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => console.log("down")}
          >
            Down
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default X2048;
