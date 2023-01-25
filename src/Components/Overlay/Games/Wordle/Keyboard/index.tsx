import React, { useEffect } from "react";
import { SiWindicss } from "react-icons/si";

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
  keysStatus,
}: {
  submitWord: () => void;
  removeKey: () => void;
  addKey: (key: string) => void;
  keysStatus: {
    correct: string[];
    misplaced: string[];
    incorrect: string[];
  };
}) => {
  const { correct, incorrect, misplaced } = keysStatus;

  const keydownHandler = (e: KeyboardEvent) => {
    let key = e.key.toLowerCase();
    if (key === "backspace") key = "<-";
    document.getElementById(key)?.click();
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
            <button
              key={keyIndex}
              id={key}
              className={`"border
               text-2xl font-bold text-center rounded p-[2.55%] sm:p-4 active:scale-125 bg-white shadow transition-all select-none

                ${
                  key === "enter"
                    ? "bg-[#03ca77] text-white col-span-3"
                    : key === "<-"
                    ? "bg-[#0084ff] text-white font-[FiraCode] col-span-2"
                    : null
                }  transition-all uppercase
              "`}
              onClick={() => {
                key === "enter"
                  ? submitWord()
                  : key === "<-"
                  ? removeKey()
                  : addKey(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Keyboard;
