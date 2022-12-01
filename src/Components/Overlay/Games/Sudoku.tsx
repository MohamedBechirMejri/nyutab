import { useState } from "react";
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(makepuzzle());

  return (
    <div className="flex items-center justify-center h-full font-[FiraCode]">
      <div className="w-[35rem] h-[35rem] grid grid-cols-9 font-bold rounded-xl overflow-hidden bg-gradient-to-br from-white to-gray-200 text-black shadow-2xl grid-rows-[repeat(9,minmax(0,1fr))] border">
        {puzzle.map((zone: any, i: number) => {
          return (
            <div
              key={"zone-" + i}
              className="flex items-center justify-center border"
              style={{
                background: zone !== null ? "#ddd" : "transparent",
                borderTopColor:
                  (i >= 54 && i <= 62) || (i >= 27 && i <= 35)
                    ? "#999"
                    : "#ccc",
                borderRightColor:
                  !((i + 7) % 9) || !((i + 4) % 9) ? "#999" : "#ccc",
                borderBottomColor:
                  (i >= 45 && i <= 53) || (i >= 18 && i <= 26)
                    ? "#999"
                    : "#ccc",
                borderLeftColor:
                  !((i + 6) % 9) || !((i + 3) % 9) ? "#999" : "#ccc",
              }}
            >
              {zone !== null && zone + 1}
              {/* {i} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sudoku;
