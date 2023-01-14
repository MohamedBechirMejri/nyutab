import axios from "axios";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
  useEffect,
  useState,
} from "react";

import newsSourcesLogos from "../../../db/newsSourcesLogos.json";
import { SettingsContext } from "../../../lib/contexts";
import { THEMES } from "../../../lib/defaultsSettings";
import Nav from "../../Misc/Nav";

const initFeed = [
  {
    title: "Loading...",
    link: "",
    description: "",
    pubDate: "",
    guid: "",
  },
];

const RSS = () => {
  const currentSettings = useContext(SettingsContext);

  const [sources, setSources] = useState<any>([]);
  const [source, setSource] = useState<any>(null);
  const [feed, setFeed] = useState<any>(initFeed);

  const getFeed = async () => {
    const url = `${import.meta.env.VITE_NYUTAB_API}rss?url=${source}`;
    const result = await axios.get(url);
    setFeed(result.data.entries);
  };

  useEffect(() => {
    if (!currentSettings) return;
    const sources = currentSettings.feed.rss.sources.filter(s => s.isEnabled);
    setSources(sources);
    setSource(sources[0].url);
  }, [currentSettings]);

  useEffect(() => {
    if (!source) return;
    getFeed();
  }, [source]);

  return (
    <div className="h-full">
      <div className="p-8 pb-0">
        {source && (
          <Nav
            tabs={sources}
            theme={THEMES[5]}
            tab={source}
            setTab={source => setSource(source.url)}
          />
        )}
      </div>

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
                    item.title
                      .split(" - ")[1]
                      ?.toLowerCase()
                      .replaceAll(" ", "-")
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
    </div>
  );
};

export default RSS;
