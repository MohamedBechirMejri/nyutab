import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RiHistoryLine } from "react-icons/ri";
import { SettingsContext } from "../../lib/contexts";
import { AnimatePresence, motion } from "framer-motion";

const buttonAnimation = {
  initial: { scale: 0, y: 13 },
  animate: { scale: 1, y: 0 },
  exit: { scale: 0 },
  whileTap: { scale: 0.75 },
};

const Memes = () => {
  const settings = useContext(SettingsContext);

  const [meme, setMeme] = useState(null) as any;
  const [history, setHistory] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const [isHovered, setIsHovered] = useState(false);

  // TODO: add history, nsfw filter, more subs (from localstorage)

  const getMeme = () => {
    axios
      .get("https://meme-api.herokuapp.com/gimme")
      .then(res => setMeme(res.data));
  };

  const toggleFavoriteMeme = (meme: any) => {
    if (!meme) return;

    const { url, postLink, nsfw } = meme;
    const newMeme = { url, postLink, nsfw };

    setFavorites((favorites: any) => {
      return favorites.find((meme: any) => meme.url === url)
        ? favorites.filter((fav: any) => fav.url !== url)
        : [...favorites, newMeme];
    });
  };

  useEffect(() => {
    getMeme();
  }, []);

  useEffect(() => {
    const addToHistory = () => {
      if (!meme) return;

      const { url, postLink, nsfw } = meme;
      const newMeme = { url, postLink, nsfw };

      setHistory((history: any) => {
        return history.find((meme: any) => meme.url === url)
          ? [...history]
          : [...history, newMeme];
      });
    };
    addToHistory();
  }, [meme]);

  useEffect(() => {
    console.log("save to ls", "favs:", favorites, "hist:", history);
  }, [favorites, history]);

  return (
    <div className="flex justify-center w-full h-full overflow-scroll rounded-xl">
      {meme ? (
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={meme.url} alt="" className="h-full rounded-xl" />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute left-0 top-0 flex items-center justify-center gap-10 bg-[#00000055] w-full h-full text-5xl py-10 backdrop-blur-lg rounded-xl"
              >
                <motion.button
                  {...buttonAnimation}
                  onClick={() => toggleFavoriteMeme(meme)}
                  className="fill-black"
                >
                  <FiHeart
                    className={`transition-all fill-red-500 stroke-red-400 ${
                      !favorites.find((m: any) => m.url === meme.url) &&
                      "fill-none"
                    }`}
                  />
                </motion.button>
                <motion.a
                  {...buttonAnimation}
                  href={meme.postLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <HiOutlineExternalLink />
                </motion.a>
                <motion.button {...buttonAnimation}>
                  <RiHistoryLine />
                </motion.button>
                <motion.button {...buttonAnimation}>
                  <FiRefreshCw />
                </motion.button>
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
