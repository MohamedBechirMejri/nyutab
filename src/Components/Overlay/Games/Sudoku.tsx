import { useState } from "react";
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(makepuzzle());

  return (
    <div className="flex items-center justify-center h-full font-[FiraCode]">
      <div className="w-[35rem] h-[35rem] grid grid-cols-9 border font-bold rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-300 text-black shadow-2xl p-1 grid-rows-[repeat(9,minmax(0,1fr))] ">
        {puzzle.map((zone: any, i: number) => {
          return (
            <div
              key={"zone-" + i}
              className="flex items-center justify-center border"
              style={{
                borderBottomColor:
                  (i >= 18 && i <= 26) || (i >= 45 && i <= 53)
                    ? "black"
                    : "transparent",
                borderTopColor:
                  (i >= 27 && i <= 35) || (i >= 54 && i <= 62)
                    ? "black"
                    : "transparent",
                borderRightColor:
                  !((i + 7) % 9) || !((i + 4) % 9) ? "black" : "transparent",
                borderLeftColor:
                  !((i + 6) % 9) || !((i + 3) % 9) ? "black" : "transparent",
              }}
            >
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sudoku;
