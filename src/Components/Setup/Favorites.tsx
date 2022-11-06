import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[78%] w-[90%] absolute top-8 left-1/2 -translate-x-1/2 grid grid-cols-4 grid-rows-3 gap-8 "
    >
      {favId === null ? (
        favorites.map((f: any, i: number) => (
          <button
            key={i}
            className="flex items-center justify-center"
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
              className=""
            />
          </button>
        ))
      ) : (
        <form
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="icon">Icon Link</label>
            <input
              type="url"
              id="icon"
              value={iconLink}
              onChange={e => setIconLink(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      )}
    </motion.div>
  );
};

export default Favorites;
