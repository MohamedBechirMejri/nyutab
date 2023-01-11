import Button from "../../Misc/Button";

const Games = ({ setOverlay }: { setOverlay: any }) => {
  return (
    <div className="flex flex-col items-center p-2 overflow-y-scroll noscroll">
      <h1 className="text-xl font-semibold">Games</h1>
      <div className="grid w-full grid-cols-3 grid-rows-2 gap-4 p-4 h-max">
        <Button
          name="Guess the word"
          soon={true}
          className="text-[#84fff7] hover:bg-[#84fff727] bg-[#84fff711] row-span-2 [height:100%!important]"
          handleClick={() => console.log("prayers")}
        />
        <Button
          name="Aim Bot"
          soon={true}
          className="text-[#eab308] hover:bg-[#eab30827] bg-[#eab30811]"
          handleClick={() => console.log("prayers")}
        />
        <Button
          name="Battleship"
          soon={true}
          className="text-[#EF8275] hover:bg-[#EF827527] bg-[#EF827511]"
          handleClick={() => console.log("prayers")}
        />
        <Button
          name="Daily Puzzle"
          soon={true}
          className="text-[#e0ff57] hover:bg-[#e0ff5727] bg-[#e0ff5711]"
          handleClick={() => console.log("prayers")}
        />
        <Button
          name="Sudoku"
          className="text-[#BCD0C7] hover:bg-[#BCD0C727] bg-[#BCD0C711]"
          handleClick={() => setOverlay("sudoku")}
        />
      </div>
    </div>
  );
};

export default Games;
