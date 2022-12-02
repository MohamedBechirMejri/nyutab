import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import uniqid from "uniqid";
import Picker from "./Sudoku/Picker";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[] | null>(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[] | null>(null);
  const [puzzle, setPuzzle] = useState<number[] | null>(null);

  useEffect(() => {
    // load current game from localstorage
    setInitialPuzzle(makepuzzle());
  }, []);

  useEffect(() => {
    setPuzzle(initialPuzzle);
    setSolvedPuzzle(solvepuzzle(initialPuzzle));
  }, [initialPuzzle]);

  return (
    <div className="flex items-center justify-center h-full font-[FiraCode]">
      <div className="w-[33rem] h-[34rem] grid grid-cols-9 font-bold text-black shadow-2xl grid-rows-[repeat(9,minmax(0,1fr))] select-none">
        {puzzle &&
          puzzle.map((field: any, i: number) => {
            const showTopBorder = (i >= 54 && i <= 62) || (i >= 27 && i <= 35);
            const showBottomBorder =
              (i >= 45 && i <= 53) || (i >= 18 && i <= 26);
            const showRightBorder = !((i + 7) % 9) || !((i + 4) % 9);
            const showLeftBorder = !((i + 6) % 9) || !((i + 3) % 9);

            return (
              <div
                key={"field-" + i}
                className={`relative flex items-center justify-center transition-all border group from-white to-gray-200 ${
                  initialPuzzle![i] !== null
                    ? "bg-gray-300"
                    : "bg-gradient-to-br"
                } `}
                style={{
                  borderTopColor: showTopBorder ? "#999" : "#ccc",
                  borderBottomColor: showBottomBorder ? "#999" : "#ccc",
                  borderRightColor: showRightBorder ? "#999" : "#ccc",
                  borderLeftColor: showLeftBorder ? "#999" : "#ccc",
                  borderTopLeftRadius: i === 0 ? "1rem" : 0,
                  borderTopRightRadius: i === 8 ? "1rem" : 0,
                  borderBottomLeftRadius: i === 72 ? "1rem" : 0,
                  borderBottomRightRadius: i === 80 ? "1rem" : 0,
                }}
              >
                <p>{field !== null && field + 1}</p>

                {initialPuzzle![i] === null ? (
                  <Picker field={field} i={i} setPuzzle={setPuzzle} />
                ) : null}
              </div>
            );
          })}
      </div>
      {/* <h1>
        {JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle)
          ? "solved!"
          : "not solved"}
      </h1> */}
    </div>
  );
};

export default Sudoku;
