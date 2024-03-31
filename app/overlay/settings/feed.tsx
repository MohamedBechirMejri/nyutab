import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Memes = () => {
  console.log(feed.rss.sources);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addSource = () => {
    if (name === "" || url === "") return;

    setFeed((feed: any) => {
      const newFeed = {
        ...feed,
        rss: {
          ...feed.rss,
          sources: [
            ...feed.rss.sources,
            {
              name,
              url,
              isEnabled: true,
            },
          ],
        },
      };
      return newFeed;
    });
    setName("");
    setUrl("");
  };

  const toggleSource = (i: number) => {
    setFeed((feed: any) => {
      const newFeed = {
        ...feed,
        rss: {
          ...feed.rss,
          sources: feed.rss.sources.map((source: any, index: number) => {
            if (index === i) {
              return {
                ...source,
                isEnabled: !source.isEnabled,
              };
            }
            return source;
          }),
        },
      };
      return newFeed;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-4"
    >
      {feed.rss.sources.map((source: any, i: number) => (
        <motion.button
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
        </motion.button>
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
    </motion.div>
  );
};

export default Memes;
