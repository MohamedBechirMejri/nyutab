import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import { getRandomNumber } from "../../../lib/mathUtils";
import Board from "./Sudoku/Board";
import Buttons from "./Sudoku/Buttons";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[] | null>(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[] | null>(null);
  const [puzzle, setPuzzle] = useState<number[] | null>(null);
  const [errorsIndexes, setErrorsIndexes] = useState<number[]>([]);

  useEffect(() => {
    // load current game from localstorage
    setInitialPuzzle(makepuzzle());
  }, []);

  useEffect(() => {
    setPuzzle(initialPuzzle);
    setSolvedPuzzle(solvepuzzle(initialPuzzle));
  }, [initialPuzzle]);

  return (
    <div className="grid grid-cols-3 h-full font-[FiraCode]">
      <div className="flex items-center justify-center h-full select-none">
        <div className="grid grid-cols-12 min-h-[33rem] w-full px-16 gap-4">
          <h1 className="flex items-center justify-center w-full col-span-12 py-4 text-4xl font-bold">
            Stats
          </h1>
          <div className="flex justify-center col-span-12 gap-4">
            <h2>Games Played:</h2>
            <p>1</p>
          </div>
          <div className="flex justify-center col-span-12 gap-4">
            <h2>Best Time:</h2>
            <p>00:00:00</p>
          </div>
          <div className="flex justify-center col-span-12 gap-4">
            <h2>Total PlayTime:</h2>
            <p>00:00:00</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        {puzzle && (
          <Board
            puzzle={puzzle}
            initialPuzzle={initialPuzzle}
            setPuzzle={setPuzzle}
            errorsIndexes={errorsIndexes}
            setErrorsIndexes={setErrorsIndexes}
          />
        )}
      </div>
      <div className="flex items-center justify-center h-full select-none">
        <Buttons
          initialPuzzle={initialPuzzle}
          puzzle={puzzle}
          solvedPuzzle={solvedPuzzle}
          errorsIndexes={errorsIndexes}
          setInitialPuzzle={setInitialPuzzle}
          setPuzzle={setPuzzle}
          setErrorsIndexes={setErrorsIndexes}
        />
      </div>
    </div>
  );
};

export default Sudoku;
