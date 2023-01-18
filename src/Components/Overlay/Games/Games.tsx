import Button from "../Misc/Button";

const buttons = [
  {
    name: "Guess the word",
    soon: true,
    className: "row-span-2 [height:100%!important]",
    color: "#14b8a6",
    overlay: "games",
  },
  {
    name: "Countries",
    color: "#f97316",
    overlay: "countries",
  },
  {
    name: "Battleship",
    soon: true,
    color: "#ef4444",
    overlay: "games",
  },
  {
    name: "Daily Puzzle",
    soon: true,
    color: "#3b82f6",
    overlay: "games",
  },
  {
    name: "Sudoku",
    color: "#64748b",
    overlay: "sudoku",
  },
  {
    name: "Minesweeper",
    color: "#f43f5e",
    overlay: "minesweeper",
  },

  {
    name: "2048",
    soon: true,
    className: "col-span-2",
    color: "#eab308",
    overlay: "games",
  },
];

const Games = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-scroll text-3xl font-bold bg-[#00000011] select-none noscroll p-8 pt-24">
      <div className="grid w-full h-full grid-cols-3 gap-4 p-4">
        {buttons.map((button, i) => (
          <Button button={button} i={i} setOverlay={setOverlay} />
        ))}
      </div>
    </div>
  );
};

export default Games;
