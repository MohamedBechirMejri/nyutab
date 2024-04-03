import { useOverlayStore, useSettingsStore } from "lib/stores";
import { useEffect, useState } from "react";
import { RSSItem, RSSResult } from "types/rss";
import { m } from "framer-motion";
import SPCard from "./SPCard";

const getFeed = async (source: string) => {
  const url = `https://nyutab-api.vercel.app/api/v1/rss`;
  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: source }),
  }).then(res => res.json());

  return result.res;
};

export default function RSS() {
  const { settings } = useSettingsStore();
  const { setOverlay } = useOverlayStore();

  const sources = settings?.feed.rss.sources || [];

  const [source, setSource] = useState(
    sources[0]?.url || "https://subsplease.org/rss/?r=1080"
  );
  const [feed, setFeed] = useState<RSSResult | null>(null);

  useEffect(() => {
    (async () => {
      if (!source) return;
      const feed = await getFeed(source);
      setFeed(feed);
    })();
  }, [source]);

  return (
    <div className="flex h-full">
      <nav className="pt-8 p-6 h-full shrink-0">
        <ul className="flex items-center gap-4 shrink-0 flex-col">
          {sources.map((s, i) => (
            <li key={i} className="shrink-0">
              <button
                className={`text-lg font-bold uppercase ${
                  source === s.url ? "text-cyan-400" : "text-gray-300"
                }`}
                onClick={() => {
                  if (source === s.url) return;
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
      <div className="overflow-y-scroll h-full w-full">
        <div className="flex flex-col gap-2 h-max pb-[8rem]">
          {feed && feed.entries.length > 0 ? (
            feed.entries.map((e: RSSItem, i: number) =>
              source.includes("subsplease") ? (
                <SPCard key={e.id} rawtitle={e.title} rawlink={e.link} />
              ) : (
                <m.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  href={e.link}
                  key={e.id}
                  target="_blank"
                  className="p-4 backdrop-blur-3xl rounded-2xl flex items-start gap-2 relative overflow-hidden py-6 active:scale-[.99] transition-all bg-blue-900 bg-opacity-10 hover:bg-opacity-20 shadow-xl"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${e.link}&sz=64`}
                    alt=""
                    className="rounded-full object-cover absolute top-0 left-0 w-full h-full blur-[10rem] opacity-20"
                  />
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${e.link}&sz=64`}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover shadow-xl border border-zinc-700 bg-white p-1 bg-opacity-75 backdrop-blur-3xl"
                  />
                  <div>
                    <h1 className="text-xl font-semibold pb-2">{e.title}</h1>
                    <p className="opacity-75">{e.description}</p>
                  </div>
                </m.a>
              )
            )
          ) : (
            <div className="flex items-center justify-center h-full pt-[12rem] animate-pulse">
              <span className="text-2xl font-bold text-center">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
