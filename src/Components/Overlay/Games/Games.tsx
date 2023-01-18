const buttons = [
  {
    name: "Guess the word",
    soon: true,
    className: "row-span-2 [height:100%!important]",
    color: "teal",
    overlay: "games",
  },
  {
    name: "Countries",
    color: "orange",
    overlay: "countries",
  },
  {
    name: "Battleship",
    soon: true,
    color: "red",
    overlay: "games",
  },
  {
    name: "Daily Puzzle",
    soon: true,
    color: "blue",
    overlay: "games",
  },
  {
    name: "Sudoku",
    color: "slate",
    overlay: "sudoku",
  },
  {
    name: "Minesweeper",
    soon: true,
    color: "fuchsia",
    overlay: "games",
  },

  {
    name: "2048",
    soon: true,
    className: "col-span-2",
    color: "yellow",
    overlay: "games",
  },
];

const Games = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-scroll text-3xl font-bold bg-[#00000011] select-none noscroll p-8">
      <div className="grid w-full h-full grid-cols-3 gap-4 p-4">
        {buttons.map(button => (
          <button
            name={button.name}
            className={`${`${button.className} bg-${button.color}-500 text-${button.color}-500`}
            transition-all duration-300 ease-in-out p-2 px-4
            rounded-[1.5rem]
            bg-opacity-30
            hover:text-white hover:bg-opacity-100 hover:rounded-[2rem] active:rounded-[3rem] hover:shadow-xl
            `}
            onClick={() => setOverlay(button.overlay)}
          >
            {button.name}
            {button.soon && (
              <span className="px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded-full">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>
      {/* force tailwind to generate colors */}
      <div className="hidden bg-fuchsia-500 text-fuchsia-500"></div>
      <div className="hidden text-teal-500 bg-teal-500"></div>
      <div className="hidden text-orange-500 bg-orange-500"></div>
      <div className="hidden bg-slate-500 text-slate-500"></div>
      <div className="hidden text-yellow-500 bg-yellow-500"></div>
      <div className="hidden text-blue-500 bg-blue-500"></div>
    </div>
  );
};

export default Games;
