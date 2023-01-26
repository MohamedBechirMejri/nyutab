import type { $Letter } from "../../../../../Types/Games/Wordle";

import { useEffect } from "react";
import { motion } from "framer-motion";

const layouts = {
  en: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "<-"],
  ],
};

const Keyboard = ({
  submitWord,
  removeKey,
  addKey,
  board,
}: {
  submitWord: () => void;
  removeKey: () => void;
  addKey: (key: string) => void;
  board: $Letter[][];
}) => {
  const keydownHandler = (e: KeyboardEvent) => {
    let key = e.key.toLowerCase();
    if (key === "backspace") key = "<-";

    if (layouts.en.flat().includes(key)) {
      if (key === "enter") submitWord();
      else if (key === "<-") removeKey();
      else addKey(key);
    }
  };

  useEffect(() => {
    addEventListener("keydown", keydownHandler);
    return () => removeEventListener("keydown", keydownHandler);
  }, []);

  return (
    <div className="grid h-full grid-rows-3 gap-1 py-2 text-black rounded-xl">
      {layouts.en.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid h-full gap-1"
          style={{
            gridTemplateColumns: `repeat(${
              rowIndex === 2 ? row.length + 3 : row.length
            }, minmax(0, 1fr))`,
          }}
        >
          {row.map((key, keyIndex) => (
            <motion.button
              key={keyIndex}
              initial={{
                opacity: 0,
                y: 20,
                backgroundColor: "#fff",
                color: "#000",
              }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor:
                  key === "enter"
                    ? "#03ca77"
                    : key === "<-"
                    ? "#0084ff"
                    : board
                        .flat()
                        .some(
                          letter =>
                            letter.letter === key && letter.status === "correct"
                        )
                    ? "#ff0000"
                    : board
                        .flat()
                        .some(
                          letter =>
                            letter.letter === key &&
                            letter.status === "misplaced"
                        )
                    ? "#eab308"
                    : board
                        .flat()
                        .some(
                          letter =>
                            letter.letter === key &&
                            letter.status === "incorrect"
                        )
                    ? "#57534e"
                    : "#fff",

                color:
                  key === "enter" ||
                  key === "<-" ||
                  board
                    .flat()
                    .some(
                      letter =>
                        letter.letter === key && !(letter.status === "empty")
                    )
                    ? "#fff"
                    : "#000",
              }}
              whileTap={{ y: 2 }}
              className={
                "text-2xl font-bold text-center uppercase shadow-2xl " +
                (key === "enter"
                  ? "col-span-3"
                  : key === "<-"
                  ? "font-[FiraCode] col-span-2"
                  : null)
              }
              onClick={() => {
                key === "enter"
                  ? submitWord()
                  : key === "<-"
                  ? removeKey()
                  : addKey(key);
              }}
            >
              {key}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Keyboard;
