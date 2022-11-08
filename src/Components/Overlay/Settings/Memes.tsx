import { useState } from "react";
import { MEMES } from "../../../lib/defaultsSettings";
import { FiCheck, FiX } from "react-icons/fi";

const Memes = () => {
  const [sources, setSources] = useState(MEMES);

  const toggleSource = (id: number) => {
    setSources(sources => {
      const newSources = [...sources];
      const meme = newSources[id];
      newSources[id] = {
        ...meme,
        isEnabled: !meme.isEnabled,
      };
      return newSources;
    });
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {sources.map((meme, i: number) => (
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
      </div>
    </div>
  );
};

export default Memes;
