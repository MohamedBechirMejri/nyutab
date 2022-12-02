import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import Board from "./Sudoku/Board";

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
      {puzzle && (
        <Board
          puzzle={puzzle}
          initialPuzzle={initialPuzzle}
          setPuzzle={setPuzzle}
        />
      )}
      {/*  {JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle)  */}
    </div>
  );
};

export default Sudoku;
