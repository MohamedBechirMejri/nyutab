import axios from "axios";
import { useEffect, useState } from "react";

const Feed = () => {
  const [feed, setFeed] = useState<any>([
    {
      title: "Loading...",
      link: "",
      description: "",
      pubDate: "",
      guid: "",
    },
  ]);

  const getFeed = async () => {
    const result = await axios.get(
      import.meta.env.VITE_NYUTAB_API + "rss?url=https://news.google.com/rss"
    );
    setFeed(result.data.entries);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Feed</h1>
      {feed.map((item: any) => {
        return (
          <div>
            <h1>
              {item.title.split(" - ")[1]} <br /> {item.title.split(" - ")[0]}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
