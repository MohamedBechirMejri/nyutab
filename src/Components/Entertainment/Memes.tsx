import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RiHistoryLine } from "react-icons/ri";
import { SettingsContext } from "../../lib/contexts";
import { AnimatePresence, motion } from "framer-motion";

const Memes = () => {
  const settings = useContext(SettingsContext);

  const [meme, setMeme] = useState(null) as any;
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState<any>([]);

  const [isHovered, setIsHovered] = useState(false);

  // TODO: add history, nsfw filter, more subs (from localstorage)

  const getMeme = () => {
    axios
      .get("https://meme-api.herokuapp.com/gimme")
      .then(res => setMeme(res.data));
  };

  const toggleFavoriteMeme = (meme: any) => {
    const { url, postLink, nsfw } = meme;
    const newMeme = { url, postLink, nsfw };
    setFavorites((favorites: any) => {
      return favorites.find((meme: any) => meme.url === url)
        ? favorites.filter((fav: any) => fav.url !== url)
        : [...favorites, newMeme];
    });
  };

  // useEffect(() => {
  // save to ls
  // }, [favorites, history]);

  useEffect(() => {
    getMeme();
  }, []);
  return (
    <div className="flex justify-center w-full h-full overflow-scroll rounded-xl">
      {meme ? (
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={meme.url} alt="" className="h-full rounded" />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-0 flex items-end justify-center gap-10 bg-[#00000088] w-full h-full text-4xl py-10"
              >
                <button onClick={() => toggleFavoriteMeme(meme)}>
                  <FiHeart className="fill-red-500 stroke-red-400" />
                </button>
                <a href={meme.postLink} target="_blank" rel="noreferrer">
                  <HiOutlineExternalLink />
                </a>
                <button>
                  <RiHistoryLine />
                </button>
                <button>
                  <FiRefreshCw />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Memes;
