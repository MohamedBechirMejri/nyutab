import Button from "../../Misc/Button";

const Games = () => {
  return (
    <div className="flex flex-col items-center w-full h-full p-2 overflow-y-scroll noscroll">
      <h1 className="text-xl font-semibold">Games</h1>
      <div className="grid w-full h-max grid-cols-2 gap-4 p-4 grid-rows-[repeat(25,minmax(0,1fr))]">
        <Button
          name="Game"
          soon={true}
          className="text-[#f43f5e] hover:bg-[#f43f5e27] bg-[#f43f5e11]"
          handleClick={() => console.log("prayers")}
        />
      </div>
    </div>
  );
};

export default Games;
