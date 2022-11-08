import { FiCheck, FiX } from "react-icons/fi";

const Memes = ({ memes, setMemes }: { memes: any; setMemes: any }) => {
  const { sources } = memes;

  const toggleSource = (id: number) => {
    setMemes((memes: any) => {
      const { sources } = memes;

      const newSources = [...sources];
      const meme = newSources[id];
      newSources[id] = {
        ...meme,
        isEnabled: !meme.isEnabled,
      };
      return { ...memes, sources: newSources };
    });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {sources.map((meme: any, i: number) => (
          <div
            onClick={() => toggleSource(i)}
            className={`rounded text-xl p-2 px-8 text-center transition-all cursor-pointer flex w-full justify-between items-center gap-12 ${
              meme.isEnabled
                ? "bg-green-500 text-green-500"
                : "bg-red-500 text-red-500"
            } select-none active:scale-95 bg-opacity-10 hover:bg-opacity-25`}
          >
            r/{meme.name} {meme.isEnabled ? <FiCheck /> : <FiX />}
          </div>
        ))}
        {/* // TODO: Will need to test this first and make sure users don't break it using links or wrong subreddits */}
        {/* <input
          type="text"
          placeholder="Custom Subreddit"
          className="rounded bg-blue-500 bg-opacity-10 hover:bg-opacity-25 text-blue-500 outline-none border-none placeholder:text-blue-500 text-center"
        />

        */}
      </div>
    </div>
  );
};

export default Memes;
