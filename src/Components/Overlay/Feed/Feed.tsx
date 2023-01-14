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
    <div className="h-full p-4 overflow-hidden ">
      <div className="flex items-center justify-between">
        <h1 className="p-4 pl-8 text-2xl font-bold text-center">Feed</h1>
        <Nav
          tabs={["rss", "reddit", "hackernews", "twitter", "youtube", "github"]}
          theme={THEMES[0]}
          tab={source}
          setTab={setSource}
        />
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
