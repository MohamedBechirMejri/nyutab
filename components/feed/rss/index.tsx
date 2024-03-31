import axios from "axios";
import { m } from "framer-motion";
import { useContext, useEffect, useState } from "react";

import newsSourcesLogos from "db/newsSourcesLogos.json";
import Nav from "../../Nav";
import { useSettingsStore } from "lib/stores";

const RSS = () => {
  const {settings} = useSettingsStore();

  const [sources, setSources] = useState<any>([]);
  const [source, setSource] = useState<any>(null);
  const [feed, setFeed] = useState<any>(null);

  const getFeed = async () => {
    const url = `${import.meta.env.VITE_NYUTAB_API}rss?url=${source}`;
    const result = await fetch(url).then(res => res.json());
    console.log(result);
    setFeed(result.data.entries);
  };

  useEffect(() => {
    if (!settings) return;
    const sources = settings.feed.rss.sources.filter(s => s.isEnabled);
    setSources(sources);
    setSource(sources[0].url);
  }, [settings]);

  useEffect(() => {
    if (!source) return;
    getFeed();
  }, [source]);

  return (
    <div className="grid sm:grid-cols-[1fr,5fr] h-full">
      <div className="p-8 pb-0">
        {source && (
          <Nav
            tabs={sources}
            tab={source}
            setTab={source => {
              setFeed(null);
              setSource(source.url);
            }}
            className="overflow-x-scroll sm:flex-col sm:overflow-y-scroll sm:overflow-x-auto"
          />
        )}
      </div>

      <div className="h-full overflow-y-scroll noscroll">
        <div className="flex flex-col gap-4 pt-8 pb-[5rem]">
          {feed ? (
            feed.map((item: any, i: number) => {
              return (
                <m.a
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
                </m.a>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-2xl font-bold text-center">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RSS;
