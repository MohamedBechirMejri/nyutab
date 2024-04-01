import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect, useMemo, useState } from "react";

type SPCardProps = {
  link: string;
  episode: string;
  id: number;
  title: string;
  image: string;
  synopsis: string;
  alternative_titles: string;
};

export default function SPCard({ rawtitle }: { rawtitle: string }) {
  const title = rawtitle.split("-")[0].replace("[SubsPlease]", "");
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const cache = getLocalData("animeCache");

    if (cache) {
      const cachedData = cache[title];
      console.log("cached");
      if (cachedData) return setAnime(cachedData);
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
        [title]: res,
      };
      setLocalData("animeCache", newCache);
      setAnime(res);
      console.log("fetched");
    })();
  }, [title]);

  console.log(anime);

  return (
    // <a href={link}>
    //   <div className="flex flex-col p-4 font-bold text-black transition-all bg-white bg-opacity-50 rounded-2xl hover:bg-opacity-70 active:scale-[.99]">
    //     <img
    //       src={image}
    //       className="object-contain object-left w-[10rem] h-[1rem] rounded"
    //       alt={title}
    //     />
    //     <span className="text-xl">{title}</span>
    //     <br />
    //     <p>{synopsis.replaceAll(/\&nbsp\;/g, " ")}</p>
    //   </div>
    // </a>
    <div></div>
  );
}
