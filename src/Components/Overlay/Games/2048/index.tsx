import { motion } from "framer-motion";
import { useState } from "react";

const X2048 = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const startGame = () => {
    setBoard([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setGameStarted(true);
    randomTile();
    randomTile();
  };

  const randomTile = () => {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    let tile = Math.random() < 0.9 ? 2 : 4;
    let newBoard = board;
    newBoard[randomCell.x][randomCell.y] = tile;
    setBoard(newBoard);
  };

  const swipe = (direction: string) => {
    let flipped = false;
    let rotated = false;
    let played = true;
    let newBoard = board;

    switch (direction) {
      case "up":
        newBoard = rotateBoard(newBoard);
        rotated = true;
        break;
      case "down":
        newBoard = rotateBoard(newBoard);
        newBoard = rotateBoard(newBoard);
        newBoard = rotateBoard(newBoard);
        rotated = true;
        break;
      case "left":
        newBoard = flipBoard(newBoard);
        flipped = true;
        break;
      case "right":
        break;
      default:
        played = false;
    }

    if (played) {
      let pastBoard = JSON.parse(JSON.stringify(newBoard));
      for (let i = 0; i < 4; i++) {
        newBoard[i] = operate(newBoard[i]);
      }

      let changed = compare(pastBoard, newBoard);

      if (flipped) {
        newBoard = flipBoard(newBoard);
      }

      if (rotated) {
        newBoard = rotateBoard(newBoard);
        newBoard = rotateBoard(newBoard);
        newBoard = rotateBoard(newBoard);
      }

      if (changed) {
        randomTile();
        setBoard(newBoard);
        setScore(score + getScore(newBoard));
        if (gameOverCheck(newBoard)) {
          setGameOver(true);
        }
        if (gameWonCheck(newBoard)) {
          setGameWon(true);
        }
      }
    }
  };

  const flipBoard = (board: number[][]) => {
    let newBoard = board;
    for (let i = 0; i < 4; i++) {
      newBoard[i] = newBoard[i].reverse();
    }
    return newBoard;
  };

  const rotateBoard = (board: number[][]) => {
    let newBoard = board;
    for (let i = 0; i < 4; i++) {
      for (let j = i; j < 4; j++) {
        let temp = newBoard[i][j];
        newBoard[i][j] = newBoard[j][i];
        newBoard[j][i] = temp;
      }
    }
    return newBoard;
  };

  const operate = (row: number[]) => {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
  };

  const slide = (row: number[]) => {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
  };

  const combine = (row: number[]) => {
    for (let i = 3; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a == b) {
        row[i] = a + b;
        row[i - 1] = 0;
      }
    }
    return row;
  };

  const compare = (a: number[][], b: number[][]) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (a[i][j] !== b[i][j]) {
          return true;
        }
      }
    }
    return false;
  };

  const getScore = (board: number[][]) => {
    let score = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        score += board[i][j];
      }
    }
    return score;
  };

  const gameOverCheck = (board: number[][]) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          return false;
        }
        if (i !== 3 && board[i][j] === board[i + 1][j]) {
          return false;
        }
        if (j !== 3 && board[i][j] === board[i][j + 1]) {
          return false;
        }
      }
    }
    return true;
  };

  const gameWonCheck = (board: number[][]) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 2048) {
          return true;
        }
      }
    }
    return false;
  };

  const restart = () => {
    const initialBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(initialBoard);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    randomTile();
    randomTile();
  };

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
            Score: {score}
          </div>
          <div className="flex items-center justify-center w-full h-12 text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl">
            Best: {bestScore}
          </div>
        </div>

        <div className="relative grid grid-cols-4 grid-rows-4 gap-1">
          {Array(16)
            .fill(1)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-24 h-24 text-4xl font-bold bg-opacity-25 bg-fuchsia-500 text-fuchsia-500 rounded-xl"
              ></div>
            ))}
          <div className="absolute grid w-full h-full grid-rows-4">
            {board.map((row, i) => (
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
          </div>
          {/* {board.map((row, i) =>
            row.map((tile, j) => (
              <motion.div
                key={i * 4 + j}
                initial={{
                  opacity: 0,
                  scale: 0,
                  position: "absolute",
                  top: i * 24,
                  left: j * 24,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  top: i * 24,
                  left: j * 24,
                }}
                transition={{ ease: "anticipate", duration: 0.3 }}
                // className={`absolute flex items-center justify-center w-24 h-24 text-4xl font-bold}`}
              >
                {tile}
              </motion.div>
            ))
          )} */}
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
            onClick={() => swipe("left")}
          >
            Left
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => swipe("right")}
          >
            Right
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => swipe("up")}
          >
            Up
          </button>
          <button
            className="w-full h-full text-2xl font-bold text-slate-100 bg-slate-800 rounded-xl"
            onClick={() => swipe("down")}
          >
            Down
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="game-container">
      {gameStarted ? (
        <>
          <div className="game-board">
            {board.map((row, i) => (
              <div key={i} className="row">
                {row.map((cell, j) => (
                  <motion.div
                    key={j}
                    className="cell"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {cell !== 0 ? cell : ""}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="start-container">
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
      {gameOver && (
        <div className="game-over-container">
          <p>Game Over</p>
          <button onClick={startGame}>Try Again</button>
        </div>
      )}
      {gameWon && (
        <div className="game-won-container">
          <p>You won!</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};
export default X2048;
