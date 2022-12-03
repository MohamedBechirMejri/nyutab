import { makepuzzle } from "sudoku";
import { getRandomNumber } from "../../../../lib/mathUtils";

const Buttons = ({
  initialPuzzle,
  setInitialPuzzle,
  setErrorsIndexes,
  puzzle,
  setPuzzle,
  solvedPuzzle,
  errorsIndexes,
}: {
  initialPuzzle: number[] | null;
  puzzle: number[] | null;
  solvedPuzzle: number[] | null;
  errorsIndexes: number[];
  setInitialPuzzle: any;
  setPuzzle: any;
  setErrorsIndexes: any;
}) => {
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
    puzzle?.forEach((n: number, i: number) => {
      if (n !== null && n !== solvedPuzzle![i])
        setErrorsIndexes((indexes: number[]) => [...indexes, i]);
    });
  };
  return (
    <div className="grid grid-cols-12 min-h-[33rem] w-full px-16 gap-4">
      <h1 className="flex items-center justify-center w-full col-span-12 py-4 text-4xl font-bold">
        00:00:00
      </h1>
      <button
        className="col-span-10 text-white transition-all shadow-xl from-green-400 rounded-xl active:scale-95 bg-gradient-to-br to-green-600"
        onClick={startNewGame}
      >
        New Game
      </button>
      <div className="col-span-2 transition-all shadow-2xl from-yellow-400 rounded-xl to-yellow-600 bg-gradient-to-bl" />
      <button
        className="col-span-8 text-white transition-all shadow-xl from-red-400 rounded-xl active:scale-95 bg-gradient-to-br to-red-600"
        onClick={checkErrors}
      >
        Check Errors
      </button>
      <button
        className="col-span-4 text-white transition-all shadow-xl from-orange-400 rounded-xl active:scale-95 bg-gradient-to-br to-orange-600"
        onClick={addHint}
      >
        Hint
      </button>
      <div className="col-span-2 transition-all shadow-2xl from-blue-500 rounded-xl to-blue-600 bg-gradient-to-tr" />
      <button
        className="col-span-10 text-white transition-all shadow-xl from-gray-400 rounded-xl active:scale-95 bg-gradient-to-br to-gray-600"
        onClick={clearBoard}
      >
        Clear
      </button>
    </div>
  );
};

export default Buttons;
