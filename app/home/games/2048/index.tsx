import { m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { getRandomNumber } from "../../../../lib/mathUtils";

const boardWidth = 4;
const boardHeight = 4;

const initialBoard = Array(boardWidth * boardHeight)
  .fill({ value: 0, x: null, y: null })
  .map((c, i) => ({
    ...c,
    id: i,
  }));

const X2048 = () => {
  const [board, setBoard] = useState(initialBoard);
  const [history, setHistory] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
    onSwipedUp: () => moveUp(),
    onSwipedDown: () => moveDown(),
  });

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

  const undoMove = () => {
    if (history.length === 0) return;
    setBoard(history[history.length - 1]);
    setHistory(history => history.slice(0, history.length - 1));
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setHistory([]);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    setBestScore(bestScore => Math.max(bestScore, score));
  }, [score]);

  // useEffect(() => {
  //   const occupiedCells = board.filter(c => c.value !== 0);
  //   const occupiedPositions = occupiedCells.map(c => c.x + " " + c.y);
  //   const emptyCells = board.filter(c => c.value === 0);
  //   const emptyPositions = emptyCells.map(c => c.x + " " + c.y);
  //   const occupiedPositionsSet = new Set(occupiedPositions);
  //   const emptyPositionsSet = new Set(emptyPositions);
  //   const isGameOver = occupiedPositions.length === boardWidth * boardHeight;
  //   const isGameWon = occupiedCells.some(c => c.value === 2048);
  //   if (isGameWon) {
  //     setGameWon(true);
  //   } else if (isGameOver) {
  //     setGameOver(true);
  //   } else {
  //     setScore(score => score + 1);
  //   }
  // }, [board]);

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
    <div className="flex flex-col items-center justify-center h-full gap-4 pt-24 select-none bg-slate-900 bg-opacity-70">
      <m.div
        className="flex flex-col items-center justify-center w-full h-full max-w-xl gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "anticipate", duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold">2048</h1>
        <div className="flex items-center justify-center w-full gap-4 h-max">
          <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
            Score: {score}
          </div>
          <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
            Best: {bestScore}
          </div>
        </div>
        <div
          {...handlers}
          style={{ touchAction: "pan-y" }}
          className="relative grid grid-cols-4 grid-rows-4 gap-1"
        >
          {board.map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-24 h-24 text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl"
            />
          ))}

          <AnimatePresence>
            {board.map((cell, i) =>
              !cell.value ? null : (
                <m.div
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
                </m.div>
              )
            )}
          </AnimatePresence>

          {gameOver && (
            <m.div
              className="absolute flex items-center justify-center w-full h-full text-4xl font-bold text-slate-100 bg-slate-800 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "anticipate", duration: 0.3 }}
            >
              Game Over
            </m.div>
          )}
        </div>
        <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
          {/* <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={undoMove}
          >
            Undo
          </button> */}
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>

        {/* <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => moveLeft()}
          >
            Left
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => moveRight()}
          >
            Right
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => moveUp()}
          >
            Up
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => moveDown()}
          >
            Down
          </button>
        </div> */}
      </m.div>
    </div>
  );
};

export default X2048;
