import type { $Letter } from "../../../../Types/Games/Wordle";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  generateBoard,
  getRandomWord,
  words,
} from "../../../../lib/Games/wordle";

import Row from "./Row";
import Keyboard from "./Keyboard";
import Messages from "./Messages";

const Wordle = () => {
  const [word, setWord] = useState(getRandomWord());
  const [board, setBoard] = useState<$Letter[][]>(generateBoard(word));
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const addKey = (key: string) => {
    if (isGameOver || currentAttempt > 5) return;

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
    if (isGameOver || currentAttempt > 5) return;

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
    if (isGameOver || currentAttempt > 5) return;

    const newBoard = [...board];

    if (newBoard[currentAttempt].some(letter => letter.letter === "")) return;

    const attempt = newBoard[currentAttempt].map(letter => letter.letter);
    const attemptString = attempt.join("");

    if (!words.includes(attemptString))
      return setMessage("Word not in Dictionary!");

    newBoard[currentAttempt].forEach((letter, i) => {
      letter.letter === word[i]
        ? (letter.status = "correct")
        : letter.letter !== word[i] && word.includes(letter.letter)
        ? (letter.status = "misplaced")
        : (letter.status = "incorrect");
    });

    setBoard([...newBoard]);

    if (attemptString === word) {
      setIsGameWon(true);
      setScore(score + 1);
      setIsGameOver(true);
    }

    if (currentAttempt === 5) setIsGameOver(true);
    setCurrentAttempt(ca => (ca < 6 ? ca + 1 : ca));
  };

  const restart = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setBoard(generateBoard(newWord));
    setCurrentAttempt(0);
    setIsGameOver(false);
    setIsGameWon(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="h-full grid grid-rows-[6rem,.5fr,3fr,1.5fr] grid-cols-1 gap-2 items-center justify-center select-none w-[min(34rem,90vw)] mx-auto"
    >
      <h1 className="pt-4 text-2xl font-bold text-center">Wordle</h1>
      <Messages
        word={word}
        score={score}
        message={message}
        setMessage={setMessage}
        isGameWon={isGameWon}
        isGameOver={isGameOver}
        restart={restart}
      />
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
