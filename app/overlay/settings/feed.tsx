import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { useState } from "react";

const Feed = () => {
  const { settings, setSettings } = useSettingsStore();

  const { feed } = settings!;

  const setFeed = (newFeed: any) => {
    setSettings({ ...settings!, feed: newFeed });
  };

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addSource = () => {
    if (name === "" || url === "") return;

    // check if url is valid
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (!validUrl) return;

    const newFeed = {
      ...feed,
      rss: {
        ...feed.rss,
        sources: [...feed.rss.sources, { name, url, isEnabled: true }],
      },
    };

    setFeed(newFeed);
    setName("");
    setUrl("");
  };

  const toggleSource = (i: number) => {
    const newFeed = {
      ...feed,
      rss: {
        ...feed.rss,
        sources: feed.rss.sources.map((source: any, index: number) => {
          if (index === i) {
            return { ...source, isEnabled: !source.isEnabled };
          }
          return source;
        }),
      },
    };
    setFeed(newFeed);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 size-full"
    >
      <h1 className="text-2xl font-bold select-none">RSS Feeds</h1>{" "}
      <div className="flex col-span-2 gap-4 font-bold w-full">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 px-4 rounded-full bg-zinc-400 text-white placeholder:text-white outline-none"
        />
        <input
          type="url"
          placeholder="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="p-2 px-4 rounded-full bg-zinc-400 text-white placeholder:text-white outline-none"
        />
        <button
          className="text-white bg-blue-500 p-2 px-4 rounded-full hover:bg-blue-400 transition-all duration-300"
          onClick={() => addSource()}
        >
          Add Source
        </button>
      </div>
      <div className="flex flex-col gap-4 p-2">
        {feed.rss.sources.map((source: any, i: number) => (
          <m.button
            key={i + source.name}
            onClick={() => toggleSource(i)}
            className="flex justify-start border border-zinc-400 p-2 px-4 rounded-2xl font-bold  hover:bg-zinc-400/75 transition-all duration-300 gap-4"
          >
            <span className="shrink-0">{source.name}</span>
            <span className="line-clamp-1 opacity-50 w-full text-left overflow-ellipsis pr-8 block ">
              {source.url}
            </span>
            <m.span
              initial={{
                opacity: 0,
                padding: ".5rem",
                backgroundColor: source.isEnabled ? "#22c55e" : "#ef4444",
                borderRadius: "1rem",
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                padding: ".75rem",
                backgroundColor: source.isEnabled ? "#22c55e" : "#ef4444",
                borderRadius: "1rem",
                scale: 1,
              }}
              whileHover={{ borderRadius: "1.5rem" }}
              whileTap={{ scale: 0.95, borderRadius: "1.5rem" }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                duration: 0.3,
              }}
              className="justify-self-end"
            />
          </m.button>
        ))}
      </div>
    </m.div>
  );
};

export default Feed;
