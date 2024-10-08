import { TbTrash } from "react-icons/tb";
import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { useState } from "react";

const Favorites = () => {
  const [url, setUrl] = useState("");
  const { settings, setSettings } = useSettingsStore();

  const { favorites } = settings!;

  const setFavorites = (newFavorites: any) => {
    setSettings({ ...settings!, favorites: newFavorites });
  };

  const addFav = () => {
    if (url === "") return;

    // check if url is valid
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (!validUrl) return;

    const newFavorites = [...favorites, url];
    setFavorites(newFavorites);
    setUrl("");
  };

  const deleteFav = (i: number) => {
    const newFavorites = favorites.filter((_, index) => index !== i);
    setFavorites(newFavorites);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 max-h-[70vh] size-full"
    >
      <h1 className="text-2xl font-bold select-none">Favorites</h1>
      <div className="flex col-span-2 gap-4 font-bold w-full">
        <input
          type="url"
          placeholder="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="p-2 px-4 rounded-full bg-zinc-500 outline-none w-full"
        />
        <button className="text-white shrink-0 bg-blue-500 p-2 px-4 rounded-full hover:bg-blue-400 transition-all duration-300">
          Add URL
        </button>
      </div>{" "}
      <div className="overflow-scroll noscroll">
        {favorites.map((fav: string, i: number) => (
          <div
            key={i + fav}
            className="flex space-y-6 justify-between items-center gap-12"
          >
            <div className="flex gap-4 items-center ">
              <img
                src={`https://www.google.com/s2/favicons?domain=${fav}&sz=128`}
                alt={fav}
                className="h-8 w-8 rounded-full object-cover shadow-xl border border-zinc-500 bg-gray-500 bg-opacity-50 backdrop-blur-3xl"
              />
              {fav}
            </div>
            <button
              onClick={() => deleteFav(i)}
              className="hover:bg-red-400 text-white bg-red-500 p-2 px-4 rounded-full transition-all duration-300"
            >
              <TbTrash />
            </button>
          </div>
        ))}
      </div>
    </m.div>
  );
};

export default Favorites;
