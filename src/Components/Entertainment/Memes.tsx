import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RiHistoryLine } from "react-icons/ri";
import { SettingsContext } from "../../lib/contexts";
import { AnimatePresence, motion } from "framer-motion";
import { saveMemes, getLocalMemes } from "../../lib/storageUtils";

const buttonAnimation = {
  initial: { scale: 0, y: 13 },
  animate: { scale: 1, y: 0 },
  exit: { scale: 0 },
  whileTap: { scale: 0.75 },
};

const Memes = ({ setOverlay }: { setOverlay: any }) => {
  const settings = useContext(SettingsContext);

  const [meme, setMeme] = useState(null) as any;
  const [history, setHistory] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // TODO: add history, nsfw filter, more subs (from localstorage)

  const getMeme = () => {
    setIsLoading(true);
    if (settings) {
      const { isNsfwEnabled, sources } = settings.memes;

      const source = sources.filter(s => s.isEnabled)[
        Math.floor(Math.random() * sources.length)
      ];

      axios
        .get(
          `https://meme-api.herokuapp.com/gimme${
            source ? `/${source.name}` : ""
          }`
        )
        .then(res => {
          const meme = res.data;

          if (
            history.find((m: any) => meme.url === m.url) ||
            (meme.nsfw && !isNsfwEnabled)
          )
            getMeme();
          else {
            setMeme(meme);
            setIsLoading(false);
          }
        });
    } else
      axios.get("https://meme-api.herokuapp.com/gimme").then(res => {
        setMeme(res.data);
        setIsLoading(false);
      });
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
    (async () => {

      getMeme();
    })();
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
    saveMemes({
      favorites,
      history,
    });
  }, [favorites, history]);

  return (
    <div
      className="flex justify-center w-full h-full overflow-scroll rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isLoading ? (
        <div className="relative">
          <motion.img
            src={meme.url}
            alt=""
            className="h-full rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
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
                <motion.button
                  {...buttonAnimation}
                  onClick={() => setOverlay("memes")}
                >
                  <RiHistoryLine />
                </motion.button>
                <motion.button
                  {...buttonAnimation}
                  onClick={() => {
                    setIsHovered(false);
                    getMeme();
                  }}
                >
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
