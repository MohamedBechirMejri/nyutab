const Awesome = () => {
  return (
    <div className="grid w-full h-full grid-cols-6 grid-rows-[7rem,1fr] font-bold bg-orange-200 rounded-lg text-zinc-900">
      <h1 className="flex flex-col items-center justify-center col-span-6 text-3xl">
        Awesome Nyutab
        <a
          href="https://github.com/MohamedBechirMejri/nyutab/issues"
          target="_blank"
          rel="noreferrer"
          className="text-sm hover:underline"
        >
          Add your own Links
        </a>
      </h1>
    </div>
  );
};

export default Awesome;
