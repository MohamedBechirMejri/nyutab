import uniqid from "uniqid";

const Picker = ({
	field,
	i,
	setPuzzle,
	setErrorsIndexes,
}: {
	field: number;
	i: number;
	setPuzzle: any;
	setErrorsIndexes: any;
}) => {
	return (
		<div className="absolute z-10 grid w-[5rem] h-[5rem] grid-cols-3 overflow-hidden transition-all scale-0 -translate-x-1/2 -translate-y-1/2 border shadow-2xl top-1/2 left-1/2 bg-gradient-to-bl from-gray-200 to-white rounded-xl group-hover:scale-100 group-hover:opacity-100 opacity-0 duration-300 border-black">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
				return (
					<button
						key={uniqid()}
						className={`flex items-center justify-center transition-all hover:bg-gray-300 ${
							n - 1 === field ? "text-blue-500" : "text-black"
						} `}
						onClick={() => {
							setErrorsIndexes((indexes: number[]) =>
								indexes.filter((index) => index !== i),
							);
							setPuzzle((puzzle: any) => {
								const newPuzzle = [...puzzle];
								newPuzzle[i] = +n - 1;
								return [...newPuzzle];
							});
						}}
					>
						{n}
					</button>
				);
			})}
		</div>
	);
};

export default Picker;
