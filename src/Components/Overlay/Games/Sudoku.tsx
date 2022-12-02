import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import Field from "./Sudoku/Field";

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
          puzzle.map((field: any, i: number) => (
            <Field
              key={"field-" + i}
              i={i}
              initialPuzzle={initialPuzzle}
              field={field}
              setPuzzle={setPuzzle}
            />
          ))}
      </div>
      {/*  {JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle)  */}
    </div>
  );
};

export default Sudoku;
