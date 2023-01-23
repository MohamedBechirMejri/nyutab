import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomNumber } from "../../../../lib/mathUtils";

const X2048 = () => {
  const boardWidth = 4;
  const boardHeight = 4;

  const [board, setBoard] = useState(
    Array(boardWidth * boardHeight)
      .fill({ value: 0, x: null, y: null })
      .map((c, i) => ({
        ...c,
        id: i,
      }))
  );
  const [history, setHistory] = useState<any[]>([]);

  const moveUp = () => {
    const handleMove = (newBoard: any[]) => {
      return newBoard.map(c => {
        if (
          c.y === null ||
          c.y === 0 ||
          newBoard.filter(cell => cell.x === c.x && cell.y === c.y - 1).length >
            1
        )
          return c;

        const c1 = { ...c };
        const c2 = newBoard.find(c => c.x === c1.x && c.y === c1.y - 1);

        if (!c2 || (c2 && c2.value === c1.value)) c1.y -= 1;
        return { ...c1 };
      });
    };

    setBoard(board => {
      let newBoard = [...board];

      // handle it 4 times to make sure all tiles are moved
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        setHistory(history => [...history, board]);
      }

      return [...newBoard];
    });
  };

  const moveDown = () => {
    const handleMove = (newBoard: any[]) => {
      return newBoard.map(c => {
        if (
          c.y === null ||
          c.y === boardHeight - 1 ||
          newBoard.filter(cell => cell.x === c.x && cell.y === c.y + 1).length >
            1
        )
          return c;

        const c1 = { ...c };
        const c2 = newBoard.find(c => c.x === c1.x && c.y === c1.y + 1);

        if (!c2 || (c2 && c2.value === c1.value)) c1.y += 1;
        return { ...c1 };
      });
    };

    setBoard(board => {
      let newBoard = [...board];

      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        setHistory(history => [...history, board]);
      }

      return [...newBoard];
    });
  };

  const moveLeft = () => {
    const handleMove = (newBoard: any[]) => {
      return newBoard.map(c => {
        if (
          c.x === null ||
          c.x === 0 ||
          newBoard.filter(cell => cell.x === c.x - 1 && cell.y === c.y).length >
            1
        )
          return c;

        const c1 = { ...c };
        const c2 = newBoard.find(c => c.x === c1.x - 1 && c.y === c1.y);

        if (!c2 || (c2 && c2.value === c1.value)) c1.x -= 1;
        return { ...c1 };
      });
    };

    setBoard(board => {
      let newBoard = [...board];

      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        setHistory(history => [...history, board]);
      }

      return [...newBoard];
    });
  };

  const moveRight = () => {
    const handleMove = (newBoard: any[]) => {
      return newBoard.map(c => {
        if (
          c.x === null ||
          c.x === boardWidth - 1 ||
          newBoard.filter(cell => cell.x === c.x + 1 && cell.y === c.y).length >
            1
        )
          return c;

        const c1 = { ...c };
        const c2 = newBoard.find(c => c.x === c1.x + 1 && c.y === c1.y);

        if (!c2 || (c2 && c2.value === c1.value)) c1.x += 1;
        return { ...c1 };
      });
    };

    setBoard(board => {
      let newBoard = [...board];

      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);
      newBoard = handleMove(newBoard);

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        setHistory(history => [...history, board]);
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

  const mergeTiles = () => {
    setBoard(board => {
      const newBoard = [...board];
      const occupiedPositions: any = {};
      const occupiedCells = newBoard.filter(c => c.value !== 0);
      occupiedCells.forEach(c => {
        occupiedPositions[c.x + " " + c.y] = [
          ...(occupiedPositions[c.x + " " + c.y] || []),
          c,
        ];
      });
      Object.keys(occupiedPositions).forEach(key => {
        const cells = occupiedPositions[key];
        if (cells.length > 1) {
          const cell = cells[0];
          const cellsToMerge = cells.slice(1);
          cell.value *= 2;
          cellsToMerge.forEach((c: { value: number; x: null; y: null }) => {
            c.value = 0;
            c.x = null;
            c.y = null;
          });
        }
      });

      return [...newBoard];
    });
  };

  const addNewTile = (board: any[]) => {
    const newBoard = [...board];
    const emptyCells = newBoard.filter(c => c.value === 0);
    if (emptyCells.length === 0) return [...newBoard];
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const randomValue = Math.random() < 0.9 ? 2 : 4;
    const occupiedCells = newBoard.filter(c => c.value !== 0);
    const occupiedPositions = occupiedCells.map(c => c.x + " " + c.y);
    let randomPosition = {
      x: getRandomNumber(boardWidth),
      y: getRandomNumber(boardHeight),
    };

    do {
      randomPosition = {
        x: getRandomNumber(boardWidth),
        y: getRandomNumber(boardHeight),
      };
    } while (
      occupiedPositions.includes(randomPosition.x + " " + randomPosition.y)
    );

    newBoard[randomCell.id] = {
      ...randomCell,
      value: randomValue,
      x: randomPosition.x,
      y: randomPosition.y,
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
    mergeTiles();
    setBoard(board => addNewTile(board));
  }, [history]);

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

          <AnimatePresence>
            {board.map((cell, i) =>
              !cell.value ? null : (
                <motion.div
                  key={cell.id}
                  className="absolute flex items-center justify-center w-24 h-24 overflow-hidden text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl"
                  initial={{
                    scale: 0,
                    left: (cell.x * 100) / 4 + "%",
                    top: (cell.y * 100) / 4 + "%",
                  }}
                  animate={{
                    scale: 1,
                    left: (cell.x * 100) / 4 + "%",
                    top: (cell.y * 100) / 4 + "%",
                  }}
                  onCompositionEnd={mergeTiles}
                >
                  <img src={`/images/2048/${cell.value}.gif`} alt="" />
                  {cell.value > 2048 ? cell.value : null}
                </motion.div>
              )
            )}
          </AnimatePresence>
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
