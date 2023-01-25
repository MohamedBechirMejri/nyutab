import { useState } from "react";
import { dictionaryWords } from "enwords";
import { motion } from "framer-motion";

import { getRandomNumber } from "../../../../lib/mathUtils";

import Row from "./Row";

const words = dictionaryWords.filter(
  (word: string) => word.length > 3 && word.length < 7
);

const getRandomWord = () => {
  return words[getRandomNumber(words.length)];
};

const generateBoard = (word: string) =>
  Array(6).fill(Array(word.length).fill(null));

const Wordle = () => {
  const [word, setWord] = useState(getRandomWord());
  const [board, setBoard] = useState(generateBoard(word));

  return (
    <div className="flex flex-col items-center justify-center h-full pt-24 bg-whjite bg-opacity-10">
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <h1>Wordle</h1>
        <div className="grid grid-rows-6 w-[min(34rem,98vw)] bg-[#0fa5e9] border border-sky-200">
          {board.map((row, i) => (
            <Row key={"row" + i} word={word} row={row} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Wordle;
