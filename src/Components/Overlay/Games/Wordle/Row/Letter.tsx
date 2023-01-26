import type { $Letter } from "../../../../../Types/Games/Wordle";

import { motion } from "framer-motion";

const Letter = ({ letter }: { letter: $Letter }) => {
  return (
    <div className="h-[min(5.5rem,100%)] border border-sky-200 bg-gradient-to-b from-sky-400">
      <p
        className="flex items-center justify-center w-full h-full text-xl font-bold uppercase"
        style={{
          padding: letter.status === "misplaced" ? "0.25rem" : "0",
        }}
      >
        {letter.letter ? (
          <motion.span
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.5,
              backgroundColor: "ffffff00",
              borderRadius: "0",
              color: "white",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              backgroundColor:
                letter.status === "correct"
                  ? "#f00"
                  : letter.status === "misplaced"
                  ? "#ff0"
                  : "#ffffff00",
              borderRadius: letter.status === "misplaced" ? "99999rem" : "0rem",
              color: letter.status === "misplaced" ? "orange" : "white",
            }}
            transition={{
              backgroundColor: { delay: 0.33 * +letter.id.split("-")[1] },
            }}
            className="flex items-center justify-center w-full h-full"
          >
            {letter.letter}
          </motion.span>
        ) : (
          <span>•</span>
        )}
      </p>
    </div>
  );
};

export default Letter;
