const Messages = () => {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-1">
      <div className="flex items-center justify-center h-full text-xl font-bold bg-zinc-800">
        <h1>Word: {"word"}</h1>
      </div>
      <div className="grid h-full grid-cols-2 grid-rows-1">
        <button>assistant placeholder</button>
        <button>restart</button>
      </div>
    </div>
  );
};

export default Messages;
