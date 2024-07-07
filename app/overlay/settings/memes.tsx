import Toggle from "components/Toggle";
import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";

const Memes = () => {
  const { settings, setSettings } = useSettingsStore();
  const memes = settings!.memes;

  const { sources } = memes;

  const setMemes = (newMemes: any) => {
    setSettings({ ...settings!, memes: newMemes });
  };

  const toggleNSFW = () => {
    setMemes({ ...memes, isNsfwEnabled: !memes.isNsfwEnabled });
  };

  const toggleSource = (id: number) => {
    const { sources } = memes;

    const newSources = [...sources];
    const meme = newSources[id];
    newSources[id] = {
      ...meme,
      isEnabled: !meme.isEnabled,
    };

    setMemes({ ...memes, sources: newSources });
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-4 pt-8 font-bold"
    >
      <Toggle enabled={memes.isNsfwEnabled} toggle={toggleNSFW} title="NSFW" />
      {sources.map((meme: any, i: number) => (
        <m.button
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
        </m.button>
      ))}
      {/* // TODO: Will need to test this first and make sure users don't break it using links or wrong subreddits */}
      {/* <input
            type="text"
            placeholder="Custom Subreddit"
            className="text-center text-blue-500 bg-blue-500 border-none rounded outline-none bg-opacity-10 hover:bg-opacity-25 placeholder:text-blue-500"
          />

          */}
    </m.div>
  );
};

export default Memes;
