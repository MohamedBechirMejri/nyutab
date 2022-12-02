import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import Board from "./Sudoku/Board";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[] | null>(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[] | null>(null);
  const [puzzle, setPuzzle] = useState<number[] | null>(null);

  const startNewGame = () => {
    setInitialPuzzle(makepuzzle());
  };

  const clearBoard = () => {
    setPuzzle(initialPuzzle);
  };

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
      <div></div>
      <div className="flex items-center justify-center h-full">
        {puzzle && (
          <Board
            puzzle={puzzle}
            initialPuzzle={initialPuzzle}
            setPuzzle={setPuzzle}
          />
        )}
      </div>
      {/*  {JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle)  */}
      <div className="flex items-center justify-center h-full select-none">
        <div className="grid grid-cols-12 min-h-[33rem] w-full px-16 gap-4">
          <h1 className="flex items-center justify-center w-full col-span-12 py-4 text-4xl font-bold">
            00:00:00
          </h1>
          <button
            className="col-span-10 transition-all bg-green-500 shadow-xl rounded-xl active:scale-95"
            onClick={startNewGame}
          >
            New Game
          </button>
          <div className="col-span-2 transition-all bg-yellow-500 shadow-xl rounded-xl"></div>
          <button className="col-span-8 transition-all bg-red-500 shadow-xl rounded-xl active:scale-95">
            Check Errors
          </button>
          <button className="col-span-4 transition-all bg-orange-500 shadow-xl rounded-xl active:scale-95">
            Hint
          </button>
          <div className="col-span-2 transition-all bg-blue-500 shadow-xl rounded-xl"></div>
          <button
            className="col-span-10 transition-all bg-gray-500 shadow-xl rounded-xl active:scale-95"
            onClick={clearBoard}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
