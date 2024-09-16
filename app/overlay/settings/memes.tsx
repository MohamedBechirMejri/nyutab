import Toggle from "components/Toggle";
import { m } from "framer-motion";
import { getRandomMeme } from "lib/redditUtils";
import { useSettingsStore } from "lib/stores";
import { useState } from "react";

const Memes = () => {
  const { settings, setSettings } = useSettingsStore();
  const memes = settings!.memes;
  const [subReddit, setSubReddit] = useState("");

  const addSubReddit = async () => {
    if (subReddit === "") return;

    const sub = subReddit.replace("r/", "").trim();

    if (memes.sources.some(s => s.name === sub)) return;

    // check if url is valid
    try {
      await getRandomMeme(sub);
    } catch (error) {
      console.error(error);
      return;
    }

    setMemes({
      ...memes,
      sources: [...memes.sources, { name: sub, isEnabled: true }],
    });
    setSubReddit("");
  };

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
      className="size-full"
    >
      <h1 className="text-2xl font-bold select-none">Memes</h1>
      <div className="grid grid-cols-4 gap-4 pt-8 font-bold">
        <Toggle
          enabled={memes.isNsfwEnabled}
          toggle={toggleNSFW}
          title="NSFW"
          className="col-span-4"
        />
        <div className="col-span-4 flex gap-4">
          <input
            type="text"
            placeholder="Custom Subreddit"
            className="text-center text-zinc-200 bg-zinc-200 border-none outline-none bg-opacity-10 hover:bg-opacity-25 placeholder:text-zinc-200 p-4 py-2 rounded-2xl w-full"
            onChange={e => setSubReddit(e.target.value)}
          />
          <button
            className="shrink-0 text-white bg-blue-500 p-0 px-4 rounded-full hover:bg-blue-400 transition-all duration-300"
            onClick={addSubReddit}
          >
            Add Source
          </button>
        </div>
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
      </div>
    </m.div>
  );
};

export default Memes;
