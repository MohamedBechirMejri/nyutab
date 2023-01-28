import Button from "../Misc/Button";

const buttons = [
  {
    name: "WordSearch",
    className: "row-span-2 [height:100%!important]",
    color: "#14b8a6",
    overlay: "wordsearch",
  },
  {
    name: "Countries",
    color: "#f97316",
    overlay: "countries",
  },
  {
    name: "Reflex Challenge",
    color: "#ef4444",
    overlay: "reflexchallenge",
  },
  {
    name: "Wordle",
    color: "#3b82f6",
    overlay: "wordle",
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
    className:
      "sm:col-span-2 bg-[url(/images/2048/icon.gif)] bg-center bg-no-repeat bg-cover [color:transparent!important]",
    color: "#eab308",
    overlay: "2048",
  },
];

const Games = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-scroll text-3xl font-bold bg-[#00000011] select-none noscroll p-8 pt-24">
      <div className="grid w-full h-full max-w-5xl gap-4 p-4 sm:grid-cols-3">
        {buttons.map((button, i) => (
          <Button
            key={button.name}
            button={button}
            i={i}
            setOverlay={setOverlay}
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
