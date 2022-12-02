import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import uniqid from "uniqid";

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
                  <div className="absolute z-10 grid w-[5rem] h-[5rem] grid-cols-3 overflow-hidden transition-all scale-0 -translate-x-1/2 -translate-y-1/2 border shadow-2xl top-1/2 left-1/2 bg-gradient-to-bl from-gray-200 to-white rounded-xl group-hover:scale-100 group-hover:opacity-100 opacity-0 duration-300 border-black">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
                      return (
                        <button
                          key={uniqid()}
                          className={`flex items-center justify-center transition-all hover:bg-gray-300 ${
                            n - 1 === field ? "text-blue-500" : ""
                          } `}
                          onClick={() =>
                            setPuzzle((puzzle: any) => {
                              const newPuzzle = [...puzzle];
                              newPuzzle[i] = solvedPuzzle![i]; // +n - 1;
                              return [...newPuzzle];
                            })
                          }
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
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
