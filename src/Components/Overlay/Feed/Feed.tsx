import { useState } from "react";
import { THEMES } from "../../../lib/defaultsSettings";
import Nav from "../../Misc/Nav";

import HackerNews from "./HackerNews/HackerNews";
import Reddit from "./Reddit/Reddit";
import RSS from "./RSS";

const className = "p-2 text-xl font-bold text-white transition-all rounded-md ";

const Feed = () => {
  const [source, setSource] = useState<string>("rss");

  return (
    <div className="h-full">
      <div className="flex">
        <h1 className="w-full p-4 text-2xl font-bold text-center">Feed</h1>
        <Nav
          tabs={["rss", "reddit", "hackernews", "twitter", "youtube", "github"]}
          theme={THEMES[0]}
          tab={source}
          setTab={setSource}
        />
        {/* <div className="grid grid-cols-6 p-4 pt-0">
          <button
            className={className + (source === "rss" ? "bg-slate-500" : "")}
            onClick={() => setSource("rss")}
          >
            RSS
          </button>
          <button
            className={className + (source === "reddit" ? "bg-slate-500" : "")}
            onClick={() => setSource("reddit")}
          >
            Reddit
          </button>
          <button
            className={
              className + (source === "hackernews" ? "bg-slate-500" : "")
            }
            onClick={() => setSource("hackernews")}
          >
            Hacker News
          </button>
          <button
            className={className + (source === "twitter" ? "bg-slate-500" : "")}
            onClick={() => setSource("twitter")}
          >
            Twitter
          </button>
          <button
            className={className + (source === "youtube" ? "bg-slate-500" : "")}
            onClick={() => setSource("youtube")}
          >
            YouTube
          </button>
          <button
            className={className + (source === "github" ? "bg-slate-500" : "")}
            onClick={() => setSource("github")}
          >
            GitHub
          </button>
        </div> */}
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
