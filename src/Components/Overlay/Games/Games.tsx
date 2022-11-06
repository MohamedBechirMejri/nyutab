const Games = () => {
  return (
    <div className="flex flex-col items-center w-full h-full p-2 overflow-y-scroll noscroll">
      <h1 className="text-xl font-semibold">Games</h1>
      <div className="grid w-full h-max grid-cols-2 gap-4 p-4 grid-rows-[repeat(25,minmax(0,1fr))]">
        <button className="w-full h-24 transition-all border border-current rounded-lg text-rose-500 active:scale-95 hover:bg-[#f43f5e27]">
          Game
          <p className="text-xs">soon</p>
        </button>
      </div>
    </div>
  );
};

export default Games;
