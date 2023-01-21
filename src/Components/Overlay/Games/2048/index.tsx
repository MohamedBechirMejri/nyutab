import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomNumber } from "../../../../lib/mathUtils";

const generateCoords = () => {
  const x1 = getRandomNumber(3);
  const y1 = getRandomNumber(3);
  let x2 = getRandomNumber(3);
  let y2 = getRandomNumber(3);

  while (x1 === x2 && y1 === y2) {
    x2 = getRandomNumber(3);
    y2 = getRandomNumber(3);
  }

  return { x1, y1, x2, y2 };
};

const X2048 = () => {
  const [board, setBoard] = useState<any[][]>([]);

  useEffect(() => {
    const newBoard = [];
    const { x1, y1, x2, y2 } = generateCoords();

    for (let i = 0; i < 4; i++) {
      newBoard.push([
        { value: 0, x: 0, y: 0 },
        { value: 2, x: x1, y: y1 },
        { value: 0, x: 0, y: 0 },
        { value: 2, x: x2, y: y2 },
      ]);
    }
    setBoard(newBoard);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative grid grid-rows-4 gap-1 bg-slate-900 rounded-xl">
        {board.map((row, y) => (
          <div key={"row" + y} className="grid grid-cols-4 gap-1">
            {row.map((col, x) => (
              <div
                key={"col#" + x}
                className="w-24 h-24 bg-slate-500 rounded-xl"
              ></div>
            ))}
          </div>
        ))}
        {board.flat().map((tile, i) => {
          if (tile.value === 0) {
            return null;
          } else {
            return (
              <motion.div
                key={"tile#" + i}
                className="flex items-center justify-center w-24 h-24 text-2xl font-bold text-black bg-zinc-300 rounded-xl"
                initial={{
                  position: "absolute",
                  scale: 0.5,
                  opacity: 0,
                  top: tile.y * (101 / 4) + "%",
                  left: tile.x * (101 / 4) + "%",
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  top: tile.y * (101 / 4) + "%",
                  left: tile.x * (101 / 4) + "%",
                }}
              >
                {tile.value}
              </motion.div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default X2048;
