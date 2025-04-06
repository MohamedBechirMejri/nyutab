import { m } from "framer-motion";
import { useOverlayStore, useSettingsStore } from "lib/stores";
import { Home, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { RSSItem, RSSResult } from "types/rss";

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

  const sources = settings?.feed.rss.sources.filter(s => s.isEnabled) || [];

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
      <nav className="h-full p-6 pt-2 overflow-scroll pb-28 shrink-0 noscroll">
        <ul className="flex flex-col items-center gap-4 shrink-0">
          <h1 className="py-4 text-2xl font-bold text-center">Feed</h1>
          {/* <button className="p-2 bg-gray-800 rounded-full">
            <Home className="w-6 h-6" />
          </button> */}
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
                  className="object-contain w-8 h-8 border rounded-full shadow-xl border-zinc-500"
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
              <Settings className="w-6 h-6" />
            </button>
          </li>
        </ul>
      </nav>
      <div className="w-full h-full overflow-y-scroll">
        <div className="flex flex-col gap-2 h-max py-[1rem] pr-4">
          {feed && feed.entries.length > 0 ? (
            feed.entries.map((e: RSSItem, i: number) => (
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
                  className="object-cover w-8 h-8 p-1 bg-white bg-opacity-75 border rounded-full shadow-xl border-zinc-700 backdrop-blur-3xl"
                />
                <div>
                  <h1 className="pb-2 text-xl font-semibold">{e.title}</h1>
                  <p className="opacity-75">{e.description}</p>
                </div>
              </m.a>
            ))
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
