import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// generate list of coords between two points
const generateCoords = (start: number[], end: number[]) => {
  const coords = [];
  const [x1, y1] = start;
  const [x2, y2] = end;
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  const xDir = xDiff > 0 ? 1 : -1;
  const yDir = yDiff > 0 ? 1 : -1;
  const xSteps = Math.abs(xDiff);
  const ySteps = Math.abs(yDiff);
  const steps = Math.max(xSteps, ySteps);
  for (let i = 0; i <= steps; i++) {
    const x = x1 + (i * xDir * xSteps) / steps;
    const y = y1 + (i * yDir * ySteps) / steps;
    coords.push([x, y]);
  }
  return coords;
};

const WordSearch = () => {
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [wordsCount, setWordsCount] = useState(10);
  const [grid, setGrid] = useState([
    ["e", "n", "r", "w", "r", "o", "l", "o", "c"],
    ["t", "o", "o", "o", "a", "l", "n", "b", "p"],
    ["e", "o", "o", "l", "z", "a", "w", "r", "a"],
    ["l", "n", "s", "p", "r", "e", "o", "u", "n"],
    ["h", "r", "t", "w", "e", "m", "t", "g", "t"],
    ["t", "e", "e", "o", "l", "t", "n", "b", "s"],
    ["a", "t", "r", "n", "l", "a", "w", "y", "t"],
    ["v", "f", "s", "s", "e", "o", "o", "f", "j"],
    ["i", "a", "b", "d", "t", "z", "d", "s", "n"],
  ]);
  const [words, setWords] = useState([
    { word: "color", position: { start: [9, 1], end: [5, 1] } },
    { word: "downtown", position: { start: [7, 9], end: [7, 2] } },
    { word: "teller", position: { start: [5, 9], end: [5, 4] } },
    { word: "pants", position: { start: [9, 2], end: [9, 6] } },
    { word: "athlete", position: { start: [1, 7], end: [1, 1] } },
    { word: "afternoon", position: { start: [2, 9], end: [2, 1] } },
    { word: "snowplow", position: { start: [4, 8], end: [4, 1] } },
    { word: "rooster", position: { start: [3, 1], end: [3, 7] } },
    { word: "rugby", position: { start: [8, 3], end: [8, 7] } },
    { word: "oatmeal", position: { start: [6, 8], end: [6, 2] } },
  ]);
  const [currentWord, setCurrentWord] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [foundWords, setFoundWords] = useState<any[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleClick = (x: number, y: number) => {
    if (currentWord.start.x === 0 && currentWord.start.y === 0)
      setCurrentWord({ start: { x, y }, end: { x: 0, y: 0 } });
    else setCurrentWord({ start: currentWord.start, end: { x, y } });
  };

  const handleCheck = () => {
    const word = words.find(word => {
      return (
        word.position.start[0] === currentWord.start.x &&
        word.position.start[1] === currentWord.start.y &&
        word.position.end[0] === currentWord.end.x &&
        word.position.end[1] === currentWord.end.y
      );
    });
    if (word) {
      setFoundWords([
        ...foundWords,
        {
          ...word,
          coords: generateCoords(word.position.start, word.position.end),
        },
      ]);
      setCurrentWord({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
    } else setCurrentWord({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
  };

  const handleGameOver = () => {
    if (foundWords.length === wordsCount) {
      setIsGameOver(true);
      setStreak(streak + 1);
    }
  };

  const handleNewGame = async () => {
    const res = await axios.get("https://shadify.dev/api/wordsearch/generator");
    setGrid(res.data.grid);
    setWords(res.data.words);
    setWidth(res.data.width);
    setHeight(res.data.height);
    setWordsCount(res.data.wordsCount);
    setCurrentWord({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
    setFoundWords([]);
  };

  useEffect(() => {
    if (
      currentWord.start.x !== 0 &&
      currentWord.start.y !== 0 &&
      currentWord.end.x !== 0 &&
      currentWord.end.y !== 0
    ) {
      handleCheck();
    }
  }, [currentWord]);

  useEffect(() => {
    handleNewGame();
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="grid gap-4 pt-24 w-[min(36rem,96vw)] m-auto font-bold"
    >
      <div className="grid grid-flow-col grid-rows-2 bg-zinc-600 text-zinc-200">
        {words.map(word => {
          return (
            <div
              key={"word:" + word.word}
              className={
                "flex items-center justify-center p-1 uppercase transition-all " +
                (foundWords.find(foundWord => foundWord.word === word.word)
                  ? "bg-teal-700 text-teal-200"
                  : "")
              }
            >
              {word.word}
            </div>
          );
        })}
      </div>
      <div
        className="grid bg-black"
        style={{
          height: `min(calc(4rem * ${height}), 50vh)`,
          gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, y) => {
          return (
            <div
              key={"row#" + y}
              className={`grid grid-cols-9`}
              style={{
                width: `min(calc(${width} * 4rem), 96vw)`,
                gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
              }}
            >
              {row.map((col, x) => {
                return (
                  <button
                    key={`${x}-${y}`}
                    className="uppercase border border-black bg-[antiquewhite] text-[antiquewhite] font-bold bg-opacity-50 backdrop-blur hover:bg-opacity-60 transition-all"
                    style={{
                      backgroundColor: foundWords.find(word => {
                        return word.coords.find((coord: number[]) => {
                          return coord[0] === x + 1 && coord[1] === y + 1;
                        });
                      })
                        ? "teal"
                        : currentWord.start.x === x + 1 &&
                          currentWord.start.y === y + 1
                        ? "crimson"
                        : "",
                    }}
                    onClick={() => {
                      handleClick(x + 1, y + 1);
                      handleGameOver();
                    }}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          {isGameOver && <span>You Win!</span>}
          <span>Streak: {streak}</span>
        </div>

        <button
          className="w-full h-16 uppercase transition-all bg-zinc-700 text-zinc-200 hover:bg-zinc-600 active:bg-zinc-700"
          onClick={() => handleNewGame()}
        >
          New Game
        </button>
      </div>
    </motion.div>
  );
};

export default WordSearch;
