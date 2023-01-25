import { useState } from "react";
import { dictionaryWords } from "enwords";
import { motion } from "framer-motion";

import { getRandomNumber } from "../../../../lib/mathUtils";

import Row from "./Row";
import Keyboard from "./Keyboard";

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
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="h-full grid grid-rows-[6rem,.5fr,3fr,1.5fr] grid-cols-1 gap-2 items-center justify-center select-none w-[min(34rem,90vw)] mx-auto"
    >
      <h1 className="pt-4 text-2xl font-bold text-center">Wordle</h1>
      <div></div>
      <div className="grid grid-rows-6 bg-[#0fa5e9] border border-sky-200 h-full">
        {board.map((row, i) => (
          <Row key={"row" + i} rowIndex={i} word={word} row={row} />
        ))}
      </div>
      <Keyboard
        submitWord={function (): void {
          throw new Error("Function not implemented.");
        }}
        removeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        addKey={function (key: string): void {
          throw new Error("Function not implemented.");
        }}
        keysStatus={{
          correct: [],
          misplaced: [],
          incorrect: [],
        }}
      />
    </motion.div>
  );
};

export default Wordle;
