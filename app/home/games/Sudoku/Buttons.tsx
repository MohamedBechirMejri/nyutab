import { useState } from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import uniqid from "uniqid";
import { getRandomNumber } from "../../../../lib/mathUtils";
import Timer from "./Timer";

const Buttons = ({
	initialPuzzle,
	setInitialPuzzle,
	setErrorsIndexes,
	puzzle,
	setPuzzle,
	solvedPuzzle,
	setSolvedPuzzle,
	errorsIndexes,
}: {
	initialPuzzle: number[] | null;
	puzzle: number[] | null;
	solvedPuzzle: number[] | null;
	setSolvedPuzzle: any;
	errorsIndexes: number[];
	setInitialPuzzle: any;
	setPuzzle: any;
	setErrorsIndexes: any;
}) => {
	const [resetTimer, setResetTimer] = useState("");

	const startNewGame = () => {
		const newPuzzle = makepuzzle();

		setInitialPuzzle(newPuzzle);
		setPuzzle(newPuzzle);
		setSolvedPuzzle(solvepuzzle(newPuzzle));
		setErrorsIndexes([]);
		setResetTimer(uniqid());
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
		<div className="grid grid-cols-4 xl:grid-cols-12 xl:min-h-[33rem] w-full px-16 gap-4 p-8 xl:p-0 font-bold">
			<Timer resetTimer={resetTimer} />
			<button
				className="text-white transition-all shadow-xl xl:col-span-10 from-green-400 rounded-xl active:scale-95 bg-gradient-to-br to-green-600"
				onClick={startNewGame}
			>
				New Game
			</button>
			<div className="hidden col-span-2 transition-all shadow-2xl from-yellow-400 rounded-xl to-yellow-600 bg-gradient-to-bl xl:block" />
			<button
				className="text-white transition-all shadow-xl xl:col-span-8 from-red-400 rounded-xl active:scale-95 bg-gradient-to-br to-red-600"
				onClick={checkErrors}
			>
				Check Errors
			</button>
			<button
				className="text-white transition-all shadow-xl xl:col-span-4 from-orange-400 rounded-xl active:scale-95 bg-gradient-to-br to-orange-600"
				onClick={addHint}
			>
				Hint
			</button>
			<div className="hidden col-span-2 transition-all shadow-2xl from-blue-500 rounded-xl to-blue-600 bg-gradient-to-tr xl:block" />
			<button
				className="text-white transition-all shadow-xl xl:col-span-10 from-gray-400 rounded-xl active:scale-95 bg-gradient-to-br to-gray-600"
				onClick={clearBoard}
			>
				Clear
			</button>
		</div>
	);
};

export default Buttons;
