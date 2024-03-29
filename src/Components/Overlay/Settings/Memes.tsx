import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-4 pt-8 font-bold"
    >
      <div
        onClick={() => toggleNSFW()}
        className="flex items-center justify-between w-full col-span-2 gap-16 p-2 px-8 text-xl text-center transition-all rounded cursor-pointer select-none"
      >
        NSFW
        <div
          className={
            "transition-all w-12 rounded-full relative h-4 bg-opacity-50 " +
            (memes.isNsfwEnabled ? "bg-green-500" : "bg-red-500")
          }
        >
          <motion.span
            initial={{
              top: -4,
              left: memes.isNsfwEnabled ? "80%" : "0",
              padding: 0,
            }}
            animate={{
              left: memes.isNsfwEnabled ? 24 : 0,
              padding: 3,
            }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className={`rounded-full ${
              memes.isNsfwEnabled
                ? "bg-green-500 text-green-800"
                : "bg-red-500 text-red-800"
            } absolute`}
          >
            {memes.isNsfwEnabled ? <FiCheck /> : <FiX />}
          </motion.span>
        </div>
      </div>
      {sources.map((meme: any, i: number) => (
        <motion.button
          key={i + meme.name}
          initial={{
            opacity: 0,
            padding: ".5rem",
            backgroundColor: meme.isEnabled ? "#22c55e" : "#ef4444",
            borderRadius: "1rem",
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            padding: ".75rem",
            backgroundColor: meme.isEnabled ? "#22c55e" : "#ef4444",
            borderRadius: "1rem",
            scale: 1,
          }}
          whileHover={{ borderRadius: "1.5rem" }}
          whileTap={{ scale: 0.95, borderRadius: "1.5rem" }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          onClick={() => toggleSource(i)}
        >
          r/{meme.name}
        </motion.button>
      ))}
      {/* // TODO: Will need to test this first and make sure users don't break it using links or wrong subreddits */}
      {/* <input
            type="text"
            placeholder="Custom Subreddit"
            className="text-center text-blue-500 bg-blue-500 border-none rounded outline-none bg-opacity-10 hover:bg-opacity-25 placeholder:text-blue-500"
          />

          */}
    </motion.div>
  );
};

export default Memes;
