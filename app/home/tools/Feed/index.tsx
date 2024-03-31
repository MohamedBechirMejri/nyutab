import { useState } from "react";
import Nav from "components/Nav";

import HackerNews from "./HackerNews";
import Reddit from "./Reddit";
import RSS from "./RSS";

const Feed = () => {
  const [source, setSource] = useState<string>("rss");

  return (
    <div className="p-2 overflow-hidden bg-black bg-opacity-30 backdrop-blur-3xl h-full max-w-full rounded-xl w-full">
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-2xl font-bold text-center pl-4">Feed</h1>
        <Nav
          tabs={[
            "rss",
            "reddit",
            "hackernews", // , "twitter", "youtube", "github" - later
          ]}
          tab={source}
          setTab={setSource}
          className="p-0 py-0"
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
