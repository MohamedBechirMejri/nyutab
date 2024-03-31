import { useSettingsStore } from "lib/stores";
import { useEffect, useMemo, useState } from "react";
import { RSSResult } from "types/rss";

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
    <div>
      <nav>
        {sources.map(s => (
          <li>
            <button
              onClick={() => {
                if (source === s.url) return;
                setFeed(null);
                setSource(s.url);
              }}
            >
              {s.name}
            </button>
          </li>
        ))}
      </nav>
      <div>{feed && feed.entries.map(e => <div>{e.title}</div>)}</div>
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
