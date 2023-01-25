import Letter from "./Letter";

const Row = ({ word, row }: { word: string; row: string[] }) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${word.length}, minmax(0, 1fr))`,
      }}
    >
      {row.map((letter: string | null, i: number) => (
        <Letter key={"letter" + i} letter={letter} />
      ))}
    </div>
  );
};

export default Row;
