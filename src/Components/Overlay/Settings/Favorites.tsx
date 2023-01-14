import { useState } from "react";

const Favorites = ({
  favorites,
  setFavorites,
}: {
  favorites: any;
  setFavorites: any;
}) => {
  const [favId, setFavId] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  const [iconLink, setIconLink] = useState("");

  return (
    <div className="h-[78%] w-[90%] absolute top-8 left-1/2 -translate-x-1/2 grid grid-cols-4 grid-rows-[1.25rem,repeat(3,minmax(0,1fr))] gap-8 ">
      <h1 className="col-span-4 row-span-1 text-3xl font-semibold text-center">
        Top Sites
      </h1>
      {favId === null ? (
        favorites.map((f: any, i: number) => (
          <button
            key={i}
            className="flex items-center justify-center p-8"
            onClick={() => {
              setFavId(i);
              setUrl(f.url);
              setIconLink(f.icon);
            }}
          >
            <img
              src={
                f.icon ||
                "https://logo.clearbit.com/" + f.url.replace("https://", "")
              }
              alt={f.name || f.url}
              className="h-full transition-all rounded-lg hover:scale-105 active:scale-100"
            />
          </button>
        ))
      ) : (
        <form
          className="absolute flex flex-col items-center gap-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          onSubmit={e => {
            e.preventDefault();
            const newFavorites = favorites;
            newFavorites[favId] = {
              ...newFavorites[favId],
              icon: iconLink,
              url,
            };
            setFavorites(newFavorites);
            setFavId(null);
          }}
        >
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              className="h-12 font-semibold text-center text-black transition-all rounded-lg shadow-lg w-80 hover:bg-slate-200"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="icon">Icon Link</label>
            <input
              type="url"
              id="icon"
              value={iconLink}
              onChange={e => setIconLink(e.target.value)}
              className="h-12 font-semibold text-center text-black transition-all rounded-lg shadow-lg w-80 hover:bg-slate-200"
            />
          </div>
          <div className="flex gap-4">
            <div
              className="p-3 px-8 mt-4 transition-all bg-gray-300 cursor-pointer select-none text-slate-800 rounded-xl hover:bg-gray-400 active:scale-95"
              onClick={() => setFavId(null)}
            >
              Cancel
            </div>
            <button className="p-3 px-8 mt-4 transition-all bg-slate-800 rounded-xl hover:bg-gray-700 active:scale-95">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Favorites;
