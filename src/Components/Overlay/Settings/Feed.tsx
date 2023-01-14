import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiPlus, FiX } from "react-icons/fi";

const Memes = ({ feed, setFeed }: { feed: any; setFeed: any }) => {
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
      className="flex flex-col gap-4"
    >
      {feed.rss.sources.map((source: any, i: number) => (
        <div
          key={i + source.name}
          className={`rounded text-xl p-2 px-8 text-center transition-all cursor-pointer flex w-full justify-between items-center gap-12 bg-opacity-20 capitalize ${
            source.isEnabled
              ? "bg-green-500 text-green-500"
              : "bg-red-500 text-red-500"
          }`}
          onClick={() => toggleSource(i)}
        >
          {source.name}
          <div
            className={` transition-all w-12 rounded-full relative h-4  ${
              source.isEnabled ? "bg-green-500" : "bg-red-500"
            } bg-opacity-25 `}
          >
            <span
              className={`rounded-full transition-all ${
                source.isEnabled
                  ? "bg-green-500 text-green-800 left-[80%]"
                  : "bg-red-500 text-red-800 left-2"
              } absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-base p-1`}
            >
              {source.isEnabled ? <FiCheck /> : <FiX />}
            </span>
          </div>
        </div>
      ))}

      <div className="flex gap-4">
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
        <button onClick={() => addSource()}>
          <FiPlus />
        </button>
      </div>
    </motion.div>
  );
};

export default Memes;
