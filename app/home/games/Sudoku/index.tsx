import { useEffect, useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import { getLocalData, saveLocalData } from "../../../../lib/storageUtils";
import Board from "./Board";
import Buttons from "./Buttons";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<number[] | null>(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState<number[] | null>(null);
  const [puzzle, setPuzzle] = useState<number[] | null>(null);
  const [errorsIndexes, setErrorsIndexes] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const localData = await getLocalData("sudoku");

      if (localData) {
        const { initialPuzzle, solvedPuzzle, puzzle, errorsIndexes } =
          localData;

        setInitialPuzzle(initialPuzzle);
        setSolvedPuzzle(solvedPuzzle);
        setPuzzle(puzzle);
        setErrorsIndexes(errorsIndexes);
      } else {
        const newPuzzle = makepuzzle();

        setInitialPuzzle(newPuzzle);
        setPuzzle(newPuzzle);
        setSolvedPuzzle(solvepuzzle(newPuzzle));
      }
    })();
  }, []);

  useEffect(() => {
    if (initialPuzzle === null || puzzle === null || solvedPuzzle === null)
      return;
    saveLocalData("sudoku", {
      initialPuzzle,
      solvedPuzzle,
      puzzle,
      errorsIndexes,
    });
  }, [errorsIndexes, initialPuzzle, puzzle, solvedPuzzle]);

  return (
    <div className="grid h-full xl:grid-cols-3">
      <div className="flex items-center justify-center p-10 text-3xl font-bold xl:text-7xl">
        Sudoku
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
      <div className="flex items-center justify-center h-full text-xl select-none">
        <Buttons
          initialPuzzle={initialPuzzle}
          puzzle={puzzle}
          solvedPuzzle={solvedPuzzle}
          errorsIndexes={errorsIndexes}
          setInitialPuzzle={setInitialPuzzle}
          setPuzzle={setPuzzle}
          setErrorsIndexes={setErrorsIndexes}
          setSolvedPuzzle={setSolvedPuzzle}
        />
      </div>
    </div>
  );
};

export default Sudoku;
