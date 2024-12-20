import { useEffect, useState } from "react";
import { RSSItem, RSSResult } from "types/rss";
import SPCard from "./SPCard";
import { getLocalData } from "lib/storageUtils";

const getFeed = async (source: string) => {
  const url = `https://nyutab-api.vercel.app/api/v1/rss`;
  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: source }),
  }).then(res => res.json());

  return result.res;
};

export default function SP() {
  const [feed, setFeed] = useState<RSSResult | null>(null);
  const [ignored, setIgnored] = useState<string[]>(getLocalData("ignored") || []);

  useEffect(() => {
    (async () => {
      const feed = await getFeed("https://subsplease.org/rss/?r=1080");
      setFeed(feed);
    })();
  }, []);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-rose-600/5 to-orange-500/5 p-4 pr-0 rounded-2xl backdrop-blur-3xl w-full relative overflow-hidden">
      <div className="overflow-y-scroll h-full w-full">
        <h1 className="text-2xl font-bold p-8">Latest Anime</h1>
        <div className="flex flex-col gap-2 h-max pb-[8rem]">
          {feed && feed.entries.length > 0 ? (
            feed.entries.map((e: RSSItem, i: number) => (
              <SPCard
                key={e.id}
                rawtitle={e.title}
                rawlink={e.link}
                anime={e.category}
                spl={e.spl}
                ignored={ignored}
                setIgnored={setIgnored}
              />
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
