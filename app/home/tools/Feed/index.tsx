import { useState } from "react";

import HackerNews from "./HackerNews";
import Reddit from "./Reddit";
import RSS from "./RSS";

const tabs = ["rss", "reddit", "hackernews"];

const Feed = () => {
  const [source, setSource] = useState<string>("rss");

  return (
    <div className="overflow-hidden bg-black bg-opacity-30 backdrop-blur-3xl h-full max-w-full rounded-xl w-full shadow-xl">
      <div className="flex items-center justify-between p-4 px-6">
        <h1 className="text-2xl font-bold text-center">Feed</h1>

        <nav>
          <ul className="flex items-center gap-4">
            {tabs.map((t, i) => (
              <li key={i}>
                <button
                  className={`p-2 px-4 text-lg font-bold uppercase ${
                    source === t ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setSource(t)}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {source === "rss" && <RSS />}
      {source === "reddit" && <Reddit />}
      {source === "hackernews" && <HackerNews />}
      {source === "twitter" && <div>soon</div>}
      {source === "youtube" && <div>soon</div>}
      {source === "github" && <div>soon</div>}
    </div>
  );
};

export default Feed;
