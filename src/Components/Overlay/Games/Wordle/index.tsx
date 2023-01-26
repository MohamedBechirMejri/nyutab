import type { $Letter } from "../../../../Types/Games/Wordle";

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

const generateBoard = (word: string): $Letter[][] =>
  Array(6)
    .fill(null)
    .map((_, i) =>
      Array(word.length)
        .fill(null)
        .map((_, j) => ({
          id: i + "-" + j,
          letter: "",
          status: "empty",
        }))
    );

const Wordle = () => {
  const [word, setWord] = useState(getRandomWord());
  const [board, setBoard] = useState<$Letter[][]>(generateBoard(word));
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);

  const addKey = (key: string) => {
    const newBoard = [...board];
    for (let i = 0; i < word.length; i++) {
      if (newBoard[currentAttempt][i].letter === "") {
        newBoard[currentAttempt][i].letter = key;
        break;
      }
    }

    setBoard([...newBoard]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="h-full grid grid-rows-[6rem,.5fr,3fr,1.5fr] grid-cols-1 gap-2 items-center justify-center select-none w-[min(34rem,90vw)] mx-auto"
    >
      <h1 className="pt-4 text-2xl font-bold text-center">Wordle</h1>
      <div></div>
      <div className="grid grid-rows-6 bg-[#0fa5e9] border border-sky-200 h-full">
        {board.map((row: $Letter[], i) => (
          <Row key={"row" + i} word={word} row={row} />
        ))}
      </div>
      <Keyboard
        submitWord={function (): void {
          throw new Error("Function not implemented.");
        }}
        removeKey={function (): void {
          throw new Error("Function not implemented.");
        }}
        addKey={addKey}
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
