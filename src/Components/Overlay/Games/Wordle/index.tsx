import type { $Letter } from "../../../../Types/Games/Wordle";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  generateBoard,
  getRandomWord,
  words,
} from "../../../../lib/Games/wordle";

import Row from "./Row";
import Keyboard from "./Keyboard";

const Wordle = () => {
  const [word, setWord] = useState(getRandomWord());
  const [board, setBoard] = useState<$Letter[][]>(generateBoard(word));
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);

  const addKey = (key: string) => {
    if (currentAttempt > 5) return;

    const newBoard = [...board];
    for (let i = 0; i < word.length; i++) {
      if (newBoard[currentAttempt][i].letter === "") {
        newBoard[currentAttempt][i].letter = key;
        break;
      }
    }

    setBoard([...newBoard]);
  };

  const removeKey = () => {
    if (currentAttempt > 5) return;

    const newBoard = [...board];
    for (let i = word.length - 1; i >= 0; i--) {
      if (newBoard[currentAttempt][i].letter !== "") {
        newBoard[currentAttempt][i].letter = "";
        break;
      }
    }

    setBoard([...newBoard]);
  };

  const submitWord = () => {
    if (currentAttempt > 5) return;

    const newBoard = [...board];

    if (newBoard[currentAttempt].some(letter => letter.letter === "")) return;
    const attempt = newBoard[currentAttempt].map(letter => letter.letter);
    const attemptString = attempt.join("");

    if (!words.includes(attemptString)) {
      return;
    }

    if (attemptString === word) {
      console.log("correct");
    } else {
      newBoard[currentAttempt].forEach((letter, i) => {
        letter.letter === word[i]
          ? (letter.status = "correct")
          : letter.letter !== word[i] && word.includes(letter.letter)
          ? (letter.status = "misplaced")
          : (letter.status = "incorrect");
      });

      setBoard([...newBoard]);
    }
    setCurrentAttempt(c => (c < 6 ? c + 1 : c));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="h-full grid grid-rows-[6rem,.5fr,3fr,1.5fr] grid-cols-1 gap-2 items-center justify-center select-none w-[min(34rem,90vw)] mx-auto"
    >
      <h1 className="pt-4 text-2xl font-bold text-center">Wordle</h1>
      <div className="grid h-full grid-cols-2 grid-rows-1">
        <div className="flex items-center justify-center h-full text-xl font-bold bg-zinc-800">
          <h1>Word: {word}</h1>
        </div>
        <div className="grid h-full grid-cols-2 grid-rows-1">
          <button>assistant placeholder</button>
          <button>restart</button>
        </div>
      </div>
      <div className="grid grid-rows-6 bg-[#0fa5e9] border border-sky-200 h-full">
        {board.map((row: $Letter[], i) => (
          <Row key={"row" + i} word={word} row={row} />
        ))}
      </div>
      <Keyboard
        submitWord={submitWord}
        removeKey={removeKey}
        addKey={addKey}
        board={board}
      />
    </motion.div>
  );
};

export default Wordle;
