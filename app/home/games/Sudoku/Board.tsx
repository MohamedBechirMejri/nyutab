import Field from "./Field";

const Board = ({
	puzzle,
	initialPuzzle,
	setPuzzle,
	errorsIndexes,
	setErrorsIndexes,
}: {
	puzzle: any;
	initialPuzzle: any;
	setPuzzle: any;
	errorsIndexes: number[];
	setErrorsIndexes: any;
}) => {
	return (
		<div className="w-[min(33rem,95vw)] h-[min(34rem,95vw)] grid grid-cols-9 font-bold text-black shadow-2xl grid-rows-[repeat(9,minmax(0,1fr))] select-none rounded-2xl">
			{puzzle.map((field: any, i: number) => (
				<Field
					key={"field-" + i}
					i={i}
					initialPuzzle={initialPuzzle}
					field={field}
					setPuzzle={setPuzzle}
					errorsIndexes={errorsIndexes}
					setErrorsIndexes={setErrorsIndexes}
				/>
			))}
		</div>
	);
};

export default Board;
