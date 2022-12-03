import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import { getRandomNumber } from "../../../lib/mathUtils";
import Board from "./Sudoku/Board";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[] | null>(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[] | null>(null);
  const [puzzle, setPuzzle] = useState<number[] | null>(null);
  const [errorsIndexes, setErrorsIndexes] = useState<number[]>([]);

  const startNewGame = () => {
    // reset time
    setInitialPuzzle(makepuzzle());
    setErrorsIndexes([]);
  };

  const clearBoard = () => {
    setPuzzle(initialPuzzle);
    setErrorsIndexes([]);
  };

  const addHint = () => {
    if (JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle)) return;

    const getIndex = (): number => {
      const index = getRandomNumber(solvedPuzzle!.length);
      return puzzle![index] === null || errorsIndexes.includes(index)
        ? index
        : getIndex();
    };

    const i = getIndex();
    const newPuzzle = [...puzzle!];
    newPuzzle[i] = solvedPuzzle![i];
    setPuzzle([...newPuzzle]);
    checkErrors();
  };

  const checkErrors = () => {
    setErrorsIndexes([]);
    puzzle?.forEach((n, i) => {
      if (n !== null && n !== solvedPuzzle![i])
        setErrorsIndexes(errors => [...errors, i]);
    });
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
          <button
            className="col-span-8 transition-all shadow-xl from-red-400 rounded-xl active:scale-95 bg-gradient-to-br to-red-600"
            onClick={checkErrors}
          >
            Check Errors
          </button>
          <button
            className="col-span-4 transition-all shadow-xl from-orange-400 rounded-xl active:scale-95 bg-gradient-to-br to-orange-600"
            onClick={addHint}
          >
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
