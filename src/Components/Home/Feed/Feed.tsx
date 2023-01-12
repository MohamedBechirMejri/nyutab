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
    <div className="h-full">
      <h1 className="w-full p-4 text-2xl font-bold text-center">Feed</h1>
      <div className="h-full overflow-y-scroll noscroll">
        <div className="flex flex-col gap-4 p-1 pb-[8rem]">
          {feed.map((item: any) => {
            return (
              <a
                href={item.link}
                target="_blank"
                className="flex flex-col p-2 transition-all duration-[300ms] rounded hover:backdrop-blur active:scale-95 hover:ring-1 ring-current hover:shadow-xl hovertext"
                data-hover={item.description.replaceAll("&nbsp;", " ")}
              >
                <span className="text-sm font-bold">
                  {item.title.split(" - ")[1]}
                </span>
                <span className="text-xl">{item.title.split(" - ")[0]}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
