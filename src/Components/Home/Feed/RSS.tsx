import axios from "axios";
import { useEffect, useState } from "react";

import newsSourcesLogos from "../../../db/newsSourcesLogos.json";

const RSS = () => {
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
    const url =
      import.meta.env.VITE_NYUTAB_API + "rss?url=https://news.google.com/rss";
    const result = await axios.get(url);
    setFeed(result.data.entries);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="h-full overflow-y-scroll noscroll">
      <div className="flex flex-col gap-4 p-1 pb-[8rem]">
        {feed.map((item: any) => {
          return (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              className="flex flex-col p-2 transition-all duration-[300ms] rounded hover:backdrop-blur active:scale-95 hover:ring-1 ring-current hover:shadow-xl border-b hovertext"
              data-hover={item.description.replaceAll("&nbsp;", " ")}
            >
              {
                // @ts-ignore
                newsSourcesLogos[
                  item.title.split(" - ")[1]?.toLowerCase().replaceAll(" ", "-")
                ] ? (
                  <img
                    src={
                      // @ts-ignore
                      newsSourcesLogos[
                        item.title
                          .split(" - ")[1]
                          .toLowerCase()
                          .replaceAll(" ", "-")
                      ]
                    }
                    className="object-contain object-left w-[10rem] h-[1rem] rounded"
                    alt={item.title.split(" - ")[1]}
                  />
                ) : (
                  <span className="text-sm text-gray-400">
                    {item.title.split(" - ")[1]}
                  </span>
                )
              }
              <span className="text-xl">{item.title.split(" - ")[0]}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RSS;
