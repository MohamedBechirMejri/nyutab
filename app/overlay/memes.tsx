import { useEffect, useState } from "react";
import { getLocalData } from "../../lib/storageUtils";

const Memes = () => {
  const [history, setHistory] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const localData = await getLocalData("memes");
      if (localData) {
        const { history, favorites } = localData;
        setFavorites(favorites);
        setHistory([...history]);
      }
    })();
  }, []);

  // TODO: Add animations, improve look, show favs, link to reddit...

  return (
    <div className="grid w-full h-full grid-cols-3 grid-rows-1 gap-4 p-24 pb-4">
      <div className="flex flex-col w-full h-full col-span-2">
        <div className="w-full min-h-full grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(4,minmax(0,1fr))] gap-2 overflow-y-auto py-4">
          {history.map((meme: any, i: number) => {
            return (
              <div
                key={meme.postLink + meme.url + i}
                className={`w-full h-full rounded-lg border-zinc-500 border shadow hover:ring-4 hover:ring-orange-500 transition-all duration-300`}
                style={{ backgroundImage: `url(${meme.preview})` }}
                onClick={() => setPreview(meme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full rounded-lg">
        {preview && <img src={preview.url} alt="" className="rounded" />}
      </div>
    </div>
  );
};

export default Memes;
