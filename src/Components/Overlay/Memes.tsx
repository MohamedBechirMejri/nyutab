import { useEffect, useState } from "react";
import { getLocalData } from "../../lib/storageUtils";

const Memes = () => {
  const [history, setHistory] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [numberOfMemes, setNumberOfMemes] = useState(10 * 11);
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
    <div className="grid w-full h-full grid-cols-3 grid-rows-1 gap-4">
      <div className="flex flex-col w-full h-full col-span-2">
        <div className="w-full h-full grid grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] gap-2">
          {history.map((meme: any, i: number) => {
            if (i > numberOfMemes || i < numberOfMemes - 10 * 11) return null;
            return (
              <div
                key={meme.postLink + meme.url + i}
                className={`w-full h-full rounded-lg border-rose-500`}
                style={{
                  backgroundImage: `url(${meme.preview})`,
                }}
                onMouseEnter={() => setPreview(meme)}
              ></div>
            );
          })}
        </div>
        <div className="flex items-center justify-center w-full gap-4 p-4">
          <button onClick={() => setNumberOfMemes(numberOfMemes - 10 * 11)}>
            {"<-"}
          </button>
          <h1>
            {numberOfMemes - 10 * 11} - {numberOfMemes}
          </h1>
          <button onClick={() => setNumberOfMemes(numberOfMemes + 10 * 11)}>
            {"->"}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full rounded-lg">
        {preview && <img src={preview.url} alt="" className="rounded" />}
      </div>
    </div>
  );
};

export default Memes;
