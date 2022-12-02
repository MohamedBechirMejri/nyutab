import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import Board from "./Sudoku/Board";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[] | null>(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[] | null>(null);
  const [puzzle, setPuzzle] = useState<number[] | null>(null);

  const startNewGame = () => {
    // reset time
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
            className="col-span-10 transition-all shadow-xl from-green-400 rounded-xl active:scale-95 bg-gradient-to-br to-green-600"
            onClick={startNewGame}
          >
            New Game
          </button>
          <div className="col-span-2 transition-all shadow-2xl from-yellow-400 rounded-xl to-yellow-600 bg-gradient-to-bl" />
          <button className="col-span-8 transition-all shadow-xl from-red-400 rounded-xl active:scale-95 bg-gradient-to-br to-red-600">
            Check Errors
          </button>
          <button className="col-span-4 transition-all shadow-xl from-orange-400 rounded-xl active:scale-95 bg-gradient-to-br to-orange-600">
            Hint
          </button>
          <div className="col-span-2 transition-all shadow-2xl from-blue-500 rounded-xl to-blue-600 bg-gradient-to-tr" />
          <button
            className="col-span-10 transition-all shadow-xl from-gray-400 rounded-xl active:scale-95 bg-gradient-to-br to-gray-600"
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
