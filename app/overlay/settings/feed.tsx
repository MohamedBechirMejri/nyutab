import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Memes = () => {
  const { settings, setSettings } = useSettingsStore();

  const { feed } = settings!;

  const setFeed = (newFeed: any) => {
    setSettings({ ...settings!, feed: newFeed });
  };

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addSource = () => {
    if (name === "" || url === "") return;

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
      className="grid grid-cols-2 gap-4"
    >
      {feed.rss.sources.map((source: any, i: number) => (
        <m.button
          key={i + source.name}
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
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          onClick={() => toggleSource(i)}
        >
          r/{source.name}
        </m.button>
      ))}

      <div className="flex col-span-2 gap-4 font-bold">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-transparent"
        />
        <input
          type="url"
          placeholder="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="bg-transparent"
        />
        <button className="text-white" onClick={() => addSource()}>
          <FiPlus />
        </button>
      </div>
    </m.div>
  );
};

export default Memes;
