import Letter from "./Letter";

const Row = ({
  word,
  row,
  rowIndex,
}: {
  word: string;
  row: string[];
  rowIndex: number;
}) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${word.length}, minmax(0, 1fr))`,
      }}
    >
      {row.map((letter: string | null, i: number) => (
        <Letter
          key={"letter" + rowIndex + "-" + i}
          i={i}
          j={rowIndex}
          letter={letter}
        />
      ))}
    </div>
  );
};

export default Row;
