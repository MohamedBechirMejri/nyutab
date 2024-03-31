import { m } from "framer-motion";
import { useEffect, useState } from "react";

import newsSourcesLogos from "db/newsSourcesLogos.json";
import { useOverlayStore, useSettingsStore } from "lib/stores";
import SPCard from "./SPCard";

const RSS = () => {
  const { settings } = useSettingsStore();

  const [source, setSource] = useState<any>(null);
  const [feed, setFeed] = useState<any>([]);

  const sources = settings?.feed.rss.sources || [];

  const { setOverlay } = useOverlayStore();

  const getFeed = async () => {
    const url = `https://nyutab-api.vercel.app/api/v1/rss`;
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: source }),
    }).then(res => res.json());
    const { res } = result;

    console.log(source);

    setFeed(res.entries || res);
    console.log(res);
  };

  useEffect(() => {
    console.log(feed);
  }, [feed]);

  useEffect(() => {
    if (!settings) return;
    setSource(settings.feed.rss.sources[1]?.url);
  }, [settings]);

  useEffect(() => {
    if (!source) return;
    getFeed();
  }, [source]);

  return (
    <div className="flex h-full gap-4">
      <nav className="pt-8 p-6 h-full shrink-0">
        <ul className="flex items-center gap-4 shrink-0 flex-col">
          {sources.map((s, i) => (
            <li key={i} className="shrink-0">
              <button
                className={`text-lg font-bold uppercase ${
                  source === s.url ? "text-cyan-400" : "text-gray-300"
                }`}
                onClick={() => {
                  setFeed(null);
                  setSource(s.url);
                }}
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${s.url}&sz=128`}
                  alt={s.name}
                  className="h-8 w-8 rounded-full object-contain shadow-xl border border-zinc-500"
                />
              </button>
            </li>
          ))}
          <li key={"new source button"} className="shrink-0">
            <button
              className={`text-lg font-bold uppercase `}
              onClick={() => {
                setOverlay("settings");
              }}
            >
              +
            </button>
          </li>
        </ul>
      </nav>

      <div className="h-full overflow-y-scroll noscroll">
        <div className="grid grid-cols-2 gap-6 pr-8 pt-8 pb-[5rem]">
          {feed && !feed.length ? (
            feed.map((item: any, i: number) => {
              console.log(item);
              return source.includes("subsplease") ? (
                // <SPCard {...item} />
                <div></div>
              ) : (
                <m.a
                  key={`rss-article#${i}-${item.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  href={item.link}
                  target="_blank"
                  className="flex flex-col p-4 font-bold text-black transition-all bg-white bg-opacity-50 rounded-2xl hover:bg-opacity-70 active:scale-[.99]"
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
