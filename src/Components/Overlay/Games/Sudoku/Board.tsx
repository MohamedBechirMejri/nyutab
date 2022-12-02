import Field from "./Field";

const Board = ({
  puzzle,
  initialPuzzle,
  setPuzzle,
}: {
  puzzle: any;
  initialPuzzle: any;
  setPuzzle: any;
}) => {
  return (
    <div className="w-[33rem] h-[34rem] grid grid-cols-9 font-bold text-black shadow-2xl grid-rows-[repeat(9,minmax(0,1fr))] select-none">
      {puzzle.map((field: any, i: number) => (
        <Field
          key={"field-" + i}
          i={i}
          initialPuzzle={initialPuzzle}
          field={field}
          setPuzzle={setPuzzle}
        />
      ))}
    </div>
  );
};

export default Board;
