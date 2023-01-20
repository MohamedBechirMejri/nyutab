import axios from "axios";
import { motion } from "framer-motion";
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
    <div className="grid grid-cols-[1fr,5fr] h-full">
      <div className="p-8 pb-0">
        {source && (
          <Nav
            tabs={sources}
            theme={THEMES[1]}
            tab={source}
            setTab={source => setSource(source.url)}
            isColumn
          />
        )}
      </div>

      <div className="h-full overflow-y-scroll noscroll">
        <div className="flex flex-col gap-4 pt-8 pb-[5rem]">
          {feed.map((item: any, i: number) => {
            return (
              <motion.a
                key={`rss-article#${i}-${item.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                href={item.link}
                target="_blank"
                className="flex flex-col p-2 font-bold text-black transition-all bg-white bg-opacity-50 rounded-2xl hover:bg-opacity-70 active:scale-[.99]"
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
                    <span className="text-sm text-gray-700">
                      {item.title.split(" - ")[1]}
                    </span>
                  )
                }
                <span className="text-xl">{item.title.split(" - ")[0]}</span>
                <br />
                <p>{item.description.replaceAll(/\&nbsp\;/g, " ")}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RSS;
