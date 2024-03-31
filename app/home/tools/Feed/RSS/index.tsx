import { useOverlayStore, useSettingsStore } from "lib/stores";
import { useEffect, useState } from "react";
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
    <div className="flex">
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
      <div className="overflow-y-scroll h-full w-full">
        <div className="flex flex-col gap-1 ">
          {feed &&
            feed.entries.map((e: RSSItem) => (
              <a
                href={e.link}
                    key={e.id}
                    target="_blank"
                className="p-4 backdrop-blur-3xl rounded-2xl flex items-start gap-2"
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${e.link}&sz=64`}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover shadow-xl border border-zinc-700 bg-white p-1 bg-opacity-75 backdrop-blur-3xl"
                />
                <div>
                  <h1 className="text-xl font-semibold pb-2">{e.title}</h1>
                  <p className="opacity-75">{e.description}</p>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

/*

    .replace(
          "http:%2F%2Fnyaa.tracker.wf:7777%2Fannounce&tr=udp:%2F%2Ftracker.coppersurfer.tk:6969%2Fannounce&tr=udp:%2F%2Ftracker.opentrackr.org:1337%2Fannounce&tr=udp:%2F%2F9.rarbg.to:2710%2Fannounce&tr=udp:%2F%2F9.rarbg.me:2710%2Fannounce&tr=udp:%2F%2Ftracker.leechers-paradise.org:6969%2Fannounce&tr=udp:%2F%2Ftracker.internetwarriors.net:1337%2Fannounce&tr=udp:%2F%2Ftracker.cyberia.is:6969%2Fannounce&tr=udp:%2F%2Fexodus.desync.com:6969%2Fannounce&tr=udp:%2F%2Ftracker3.itzmx.com:6961%2Fannounce&tr=udp:%2F%2Ftracker.torrent.eu.org:451%2Fannounce&tr=udp:%2F%2Ftracker.tiny-vps.com:6969%2Fannounce&tr=udp:%2F%2Fretracker.lanta-net.ru:2710%2Fannounce&tr=http:%2F%2Fopen.acgnxtracker.com:80%2Fannounce&tr=wss:%2F%2Ftracker.openwebtorrent.com",
          ""
        )
        .replace("magnet:?xt=urn:btih:", ""),
      episode: entry.title,
      ...anime,

*/
