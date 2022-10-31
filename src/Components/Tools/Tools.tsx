const Tools = () => {
  return (
    <div className="flex flex-col items-center w-full h-full p-2">
      <h1 className="text-xl font-semibold">Tools</h1>
      <div className="grid w-full h-max grid-cols-2 gap-4 p-4 grid-rows-[repeat(25,minmax(0,1fr))]">
        <button className="w-full h-24 text-teal-500 transition-all border border-current rounded-lg active:scale-95 hover:bg-[#14b8a527]">
          Tools
          <p className="text-xs">soon</p>
        </button>
      </div>
    </div>
  );
};

export default Tools;
