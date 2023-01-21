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
  const [board, setBoard] = useState(Array(16).fill({ value: 0, x: 0, y: 0 }));

  const move = (direction: string) => {
    let newBoard = [...board];
    let emptyCells = 0;
    let duplicateCells = 0;

    switch (direction) {
      case "left":
        newBoard = newBoard.map((cell, i) => {
          if (cell.value !== 0) {
            if (i % 4 === 0) {
              cell.x = 0;
            } else if (i % 4 === 1) {
              if (newBoard[i - 1].value === 0) {
                cell.x = 0;
                emptyCells++;
              } else if (newBoard[i - 1].value === cell.value) {
                cell.x = 0;
                cell.value *= 2;
                newBoard[i - 1].value = 0;
                duplicateCells++;
              } else {
                cell.x = 1;
              }
            } else if (i % 4 === 2) {
              if (newBoard[i - 2].value === 0) {
                if (newBoard[i - 1].value === 0) {
                  cell.x = 0;
                  emptyCells += 2;
                } else if (newBoard[i - 1].value === cell.value) {
                  cell.x = 0;
                  cell.value *= 2;
                  newBoard[i - 1].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i - 2].value === cell.value) {
                cell.x = 0;
                cell.value *= 2;
                newBoard[i - 2].value = 0;
                duplicateCells++;
              } else if (newBoard[i - 1].value === 0) {
                cell.x = 1;
              } else if (newBoard[i - 1].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i - 1].value = 0;
                duplicateCells++;
              } else {
                cell.x = 2;
              }
            } else if (i % 4 === 3) {
              if (newBoard[i - 3].value === 0) {
                if (newBoard[i - 2].value === 0) {
                  if (newBoard[i - 1].value === 0) {
                    cell.x = 0;
                    emptyCells += 3;
                  } else if (newBoard[i - 1].value === cell.value) {
                    cell.x = 0;
                    cell.value *= 2;
                    newBoard[i - 1].value = 0;
                    duplicateCells++;
                  } else {
                    cell.x = 1;
                  }
                } else if (newBoard[i - 2].value === cell.value) {
                  cell.x = 0;
                  cell.value *= 2;
                  newBoard[i - 2].value = 0;
                  duplicateCells++;
                } else if (newBoard[i - 1].value === 0) {
                  cell.x = 1;
                } else if (newBoard[i - 1].value === cell.value) {
                  cell.x = 1;
                  cell.value *= 2;
                  newBoard[i - 1].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 2;
                }
              } else if (newBoard[i - 3].value === cell.value) {
                cell.x = 0;
                cell.value *= 2;
                newBoard[i - 3].value = 0;
                duplicateCells++;
              } else if (newBoard[i - 2].value === 0) {
                if (newBoard[i - 1].value === 0) {
                  cell.x = 1;
                  emptyCells++;
                } else if (newBoard[i - 1].value === cell.value) {
                  cell.x = 1;
                  cell.value *= 2;
                  newBoard[i - 1].value = 0;

                  duplicateCells++;
                } else {
                  cell.x = 2;
                }
              } else if (newBoard[i - 2].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i - 2].value = 0;
                duplicateCells++;
              } else if (newBoard[i - 1].value === 0) {
                cell.x = 2;
              } else if (newBoard[i - 1].value === cell.value) {
                cell.x = 2;
                cell.value *= 2;
                newBoard[i - 1].value = 0;
                duplicateCells++;
              } else {
                cell.x = 3;
              }
            }
          }
          return cell;
        });
        break;
      case "right":
        newBoard = newBoard.map((cell, i) => {
          if (cell.value !== 0) {
            if (i % 4 === 0) {
              if (newBoard[i + 3].value === 0) {
                if (newBoard[i + 2].value === 0) {
                  if (newBoard[i + 1].value === 0) {
                    cell.x = 3;
                    emptyCells += 3;
                  } else if (newBoard[i + 1].value === cell.value) {
                    cell.x = 3;
                    cell.value *= 2;
                    newBoard[i + 1].value = 0;
                    duplicateCells++;
                  } else {
                    cell.x = 2;
                  }
                } else if (newBoard[i + 2].value === cell.value) {
                  cell.x = 3;
                  cell.value *= 2;
                  newBoard[i + 2].value = 0;
                  duplicateCells++;
                } else if (newBoard[i + 1].value === 0) {
                  cell.x = 2;
                } else if (newBoard[i + 1].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i + 1].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i + 3].value === cell.value) {
                cell.x = 3;
                cell.value *= 2;
                newBoard[i + 3].value = 0;
                duplicateCells++;
              } else if (newBoard[i + 2].value === 0) {
                if (newBoard[i + 1].value === 0) {
                  cell.x = 2;
                  emptyCells++;
                } else if (newBoard[i + 1].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i + 1].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i + 2].value === cell.value) {
                cell.x = 2;
                cell.value *= 2;

                newBoard[i + 2].value = 0;
                duplicateCells++;
              } else if (newBoard[i + 1].value === 0) {
                cell.x = 1;
              } else if (newBoard[i + 1].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i + 1].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            }
          }
          return cell;
        });
        break;
      case "up":
        newBoard = newBoard.map((cell, i) => {
          if (cell.value !== 0) {
            if (i < 4) {
              if (newBoard[i + 12].value === 0) {
                if (newBoard[i + 8].value === 0) {
                  if (newBoard[i + 4].value === 0) {
                    cell.x = 3;
                    emptyCells += 3;
                  } else if (newBoard[i + 4].value === cell.value) {
                    cell.x = 3;
                    cell.value *= 2;
                    newBoard[i + 4].value = 0;
                    duplicateCells++;
                  } else {
                    cell.x = 2;
                  }
                } else if (newBoard[i + 8].value === cell.value) {
                  cell.x = 3;
                  cell.value *= 2;
                  newBoard[i + 8].value = 0;
                  duplicateCells++;
                } else if (newBoard[i + 4].value === 0) {
                  cell.x = 2;
                } else if (newBoard[i + 4].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i + 4].value = 0;
                  duplicateCells++;

                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i + 12].value === cell.value) {
                cell.x = 3;
                cell.value *= 2;
                newBoard[i + 12].value = 0;
                duplicateCells++;
              } else if (newBoard[i + 8].value === 0) {
                if (newBoard[i + 4].value === 0) {
                  cell.x = 2;
                  emptyCells++;

                } else if (newBoard[i + 4].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i + 4].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i + 8].value === cell.value) {
                cell.x = 2;
                cell.value *= 2;
                newBoard[i + 8].value = 0;
                duplicateCells++;
              } else if (newBoard[i + 4].value === 0) {
                cell.x = 1;
              } else if (newBoard[i + 4].value === cell.value) {

                cell.x = 1;
                cell.value *= 2;
                newBoard[i + 4].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            } else if (i < 8) {
              if (newBoard[i + 8].value === 0) {
                if (newBoard[i + 4].value === 0) {
                  cell.x = 2;
                  emptyCells++;
                } else if (newBoard[i + 4].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i + 4].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i + 8].value === cell.value) {
                cell.x = 2;
                cell.value *= 2;
                newBoard[i + 8].value = 0;
                duplicateCells++;
              } else if (newBoard[i + 4].value === 0) {
                cell.x = 1;
              } else if (newBoard[i + 4].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i + 4].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            } else if (i < 12) {
              if (newBoard[i + 4].value === 0) {
                cell.x = 1;
              } else if (newBoard[i + 4].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i + 4].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            } else {
              cell.x = 0;
            }
          }
          return cell;
        });
        break;
      case "down":
        newBoard = newBoard.map((cell, i) => {
          if (cell.value !== 0) {
            if (i > 11) {
              if (newBoard[i - 12].value === 0) {
                if (newBoard[i - 8].value === 0) {
                  if (newBoard[i - 4].value === 0) {
                    cell.x = 3;
                    emptyCells += 3;
                  } else if (newBoard[i - 4].value === cell.value) {
                    cell.x = 3;
                    cell.value *= 2;
                    newBoard[i - 4].value = 0;
                    duplicateCells++;
                  } else {
                    cell.x = 2;
                  }
                } else if (newBoard[i - 8].value === cell.value) {
                  cell.x = 3;
                  cell.value *= 2;
                  newBoard[i - 8].value = 0;
                  duplicateCells++;
                } else if (newBoard[i - 4].value === 0) {
                  cell.x = 2;
                } else if (newBoard[i - 4].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i - 4].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i - 12].value === cell.value) {
                cell.x = 3;
                cell.value *= 2;
                newBoard[i - 12].value = 0;
                duplicateCells++;
              } else if (newBoard[i - 8].value === 0) {
                if (newBoard[i - 4].value === 0) {
                  cell.x = 2;
                  emptyCells++;
                } else if (newBoard[i - 4].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i - 4].value = 0;
                  duplicateCells++;

                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i - 8].value === cell.value) {
                cell.x = 2;
                cell.value *= 2;
                newBoard[i - 8].value = 0;
                duplicateCells++;
              } else if (newBoard[i - 4].value === 0) {
                cell.x = 1;
              } else if (newBoard[i - 4].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i - 4].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            } else if (i > 7) {
              if (newBoard[i - 8].value === 0) {
                if (newBoard[i - 4].value === 0) {
                  cell.x = 2;
                  emptyCells++;
                } else if (newBoard[i - 4].value === cell.value) {
                  cell.x = 2;
                  cell.value *= 2;
                  newBoard[i - 4].value = 0;
                  duplicateCells++;
                } else {
                  cell.x = 1;
                }
              } else if (newBoard[i - 8].value === cell.value) {
                cell.x = 2;
                cell.value *= 2;
                newBoard[i - 8].value = 0;
                duplicateCells++;
              } else if (newBoard[i - 4].value === 0) {
                cell.x = 1;
              } else if (newBoard[i - 4].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i - 4].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            } else if (i > 3) {
              if (newBoard[i - 4].value === 0) {
                cell.x = 1;
              } else if (newBoard[i - 4].value === cell.value) {
                cell.x = 1;
                cell.value *= 2;
                newBoard[i - 4].value = 0;
                duplicateCells++;
              } else {
                cell.x = 0;
              }
            } else {
              cell.x = 0;
            }
          }
          return cell;
        });
        break;
      default:
        break;
    }
    if (emptyCells === 0 && duplicateCells === 0) {
      // setGameOver(true);
    }
    return newBoard;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        // newBoard = moveCells(newBoard, e.key);
        // newBoard = addNewCell(newBoard);
        return newBoard;
      });
    }
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
                x: cell.x * 24,
                y: cell.y * 24,
              }}
              animate={{
                scale: 1,
                x: cell.x * 24,
                y: cell.y * 24,
              }}
              transition={{ type: "spring", stiffness: 300 }}
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
            onClick={() => console.log("startGame")}
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
