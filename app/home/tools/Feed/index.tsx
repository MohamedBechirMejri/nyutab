import { useState } from "react";
import RSS from "./RSS";
import HackerNews from "./HackerNews";
// import SP from "../SP";
// import FitGirl from "../FitGirl";

const tabs = [
  { name: "RSS", value: "rss" },
  {
    name: "Hacker News",
    value: "hackernews",
  },
  { name: "Twitter", value: "twitter" },
  // { name: "Anime", value: "anime" },
  // { name: "FitGirl", value: "fitgirl" },
];

const Feed = () => {
  const [source, setSource] = useState("fitgirl");
  return (
    <div className="overflow-hidden bg-black bg-opacity-30 backdrop-blur-3xl h-full max-w-full rounded-xl w-full shadow-xl">
      <div className="flex items-center justify-between p-4 px-6">
        <h1 className="text-2xl font-bold text-center">Feed</h1>

        <div className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setSource(tab.value)}
              className={`${
                source === tab.value
                  ? "bg-white text-black"
                  : "bg-black bg-opacity-30"
              } p-2 px-4 rounded-full`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {source === "rss" && <RSS />}
      {/* {source === "anime" && <SP />} */}
      {source === "hackernews" && <HackerNews />}
      {source === "twitter" && (
        <div className="flex items-center justify-center h-full">soon..</div>
      )}
      {/* {source === "fitgirl" && <FitGirl />} */}
    </div>
  );
};

export default Feed;
