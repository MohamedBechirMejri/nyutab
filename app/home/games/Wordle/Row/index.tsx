import type { $Letter } from "types/games/wordle";

import Letter from "./Letter";

const Row = ({ word, row }: { word: string; row: $Letter[] }) => {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${word.length}, minmax(0, 1fr))` }}
    >
      {row.map((letter: $Letter) => (
        <Letter key={letter.id} letter={letter} />
      ))}
    </div>
  );
};

export default Row;
