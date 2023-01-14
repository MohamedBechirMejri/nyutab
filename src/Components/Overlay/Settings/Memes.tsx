import { FiCheck, FiX } from "react-icons/fi";

const Memes = ({ memes, setMemes }: { memes: any; setMemes: any }) => {
  const { sources } = memes;

  const toggleNSFW = () => {
    setMemes((memesSettings: any) => ({
      ...memesSettings,
      isNsfwEnabled: !memesSettings.isNsfwEnabled,
    }));
  };

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
    <div className="flex flex-col gap-4">
      <div
        onClick={() => toggleNSFW()}
        className={`rounded text-xl p-2 px-8 text-center transition-all cursor-pointer flex w-full justify-between items-center gap-16  select-none `}
      >
        NSFW
        <div
          className={` transition-all w-12 rounded-full relative h-4  ${
            memes.isNsfwEnabled ? "bg-green-500" : "bg-red-500"
          } bg-opacity-25 `}
        >
          <span
            className={`rounded-full transition-all ${
              memes.isNsfwEnabled
                ? "bg-green-500 text-green-800 left-[80%]"
                : "bg-red-500 text-red-800 left-2"
            } absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-base p-1`}
          >
            {memes.isNsfwEnabled ? <FiCheck /> : <FiX />}
          </span>
        </div>
      </div>
      {sources.map((meme: any, i: number) => (
        <div
          key={i + meme.name}
          onClick={() => toggleSource(i)}
          className={`rounded text-xl p-2 px-8 text-center transition-all cursor-pointer flex w-full justify-between items-center gap-12 ${
            meme.isEnabled
              ? "bg-green-500 text-green-500"
              : "bg-red-500 text-red-500"
          } select-none active:scale-95 bg-opacity-10 hover:bg-opacity-25 backdrop-blur-xl`}
        >
          r/{meme.name} {meme.isEnabled ? <FiCheck /> : <FiX />}
        </div>
      ))}
      {/* // TODO: Will need to test this first and make sure users don't break it using links or wrong subreddits */}
      {/* <input
          type="text"
          placeholder="Custom Subreddit"
          className="text-center text-blue-500 bg-blue-500 border-none rounded outline-none bg-opacity-10 hover:bg-opacity-25 placeholder:text-blue-500"
        />

        */}
    </div>
  );
};

export default Memes;
