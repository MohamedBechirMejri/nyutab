import { getToday } from "lib/dateUtils";
import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect, useState } from "react";

type SPCardProps = {
  id: number;
  title: string;
  image: string;
  synopsis: string;
  alternative_titles: string;
};

export default function SPCard({
  rawtitle,
  rawlink,
}: {
  rawtitle: string;
  rawlink: string;
}) {
  const title = rawtitle.split("-")[0].replace("[SubsPlease]", "");
  const [anime, setAnime] = useState<SPCardProps | null>(null);

  useEffect(() => {
    const cache = getLocalData("animeCache");

    const today = getToday();

    if (cache) {
      if (cache["today"] !== today) {
        setLocalData("animeCache", null);
      } else {
        const cachedData = cache[title];
        if (cachedData) return setAnime(cachedData);
      }
    }

    (async () => {
      const res = await fetch(
        `https://nyutab-api.vercel.app/api/v1/anime?title=${title}`
      )
        .then(res => res.json())
        .catch(err => console.error(err));

      const latestCache = getLocalData("animeCache");
      const newCache = {
        ...(latestCache || {}),
        [title]: res.res,
      };
      newCache["today"] = today;
      setLocalData("animeCache", newCache);
      setAnime(res.res);
      console.log("fetched");
    })();
  }, [title]);

  if (!anime) return null;

  const { image, synopsis, alternative_titles, title: MALTitle } = anime;

  return (
    <a
      href={rawlink}
      className="flex items-start gap-4 p-4 font-bold transition-all rounded-2xl relative overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="h-full rounded overflow-hidden shrink-0 absolute top-0 left-0 w-full blur-3xl opacity-25"
      />
      <img
        src={image}
        alt={title}
        className="h-[12rem] rounded overflow-hidden w-max shrink-0 relative z-10"
      />
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-xl ">
          {MALTitle} - {alternative_titles}
        </span>
        <span>{rawtitle.replace("[SubsPlease]", "")}</span>
        <p className="text-sm opacity-85">
          {(synopsis || "").replaceAll(/\&nbsp\;/g, " ")}
        </p>
      </div>
    </a>
  );
}
