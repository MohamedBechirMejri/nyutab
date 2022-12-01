import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SettingsContext } from "../../lib/contexts";
import { saveMemes, getLocalMemes } from "../../lib/storageUtils";
import { getRandomMeme } from "../../lib/redditUtils";
import { getRandomNumber } from "../../lib/mathUtils";

import { RiHistoryLine } from "react-icons/ri";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { L68 } from "react-isloading";

const buttonAnimation = {
  initial: { scale: 0, y: 13 },
  animate: { scale: 1, y: 0 },
  exit: { scale: 0 },
  whileTap: { scale: 0.75 },
};
const Memes = ({ setOverlay }: { setOverlay: any }) => {
  const settings = useContext(SettingsContext);

  const blockDuplicateUseEffect = useRef(false);

  const [meme, setMeme] = useState(null) as any;
  const [history, setHistory] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const getMeme = () => {
    setIsLoading(true);
    if (settings) {
      const { isNsfwEnabled, sources } = settings.memes;
      const source = sources.filter(s => s.isEnabled)[
        getRandomNumber(sources.length)
      ];

      getRandomMeme(source ? source.name : "memes").then(meme => {
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
    } else {
      getRandomMeme("memes").then(meme => {
        setMeme(meme);
        setIsLoading(false);
      });
    }
  };

  const toggleFavoriteMeme = (meme: any) => {
    if (!meme) return;

    const { url, postLink, nsfw, preview } = meme;
    const newMeme = { url, postLink, nsfw, preview: preview[0] };

    setFavorites((favorites: any) => {
      return favorites.find((meme: any) => meme.url === url)
        ? favorites.filter((fav: any) => fav.url !== url)
        : [...favorites, newMeme];
    });
  };

  useEffect(() => {
    const getLocalData = async () => {
      const localData = await getLocalMemes();

      if (localData) {
        const { favorites, history } = localData;
        setFavorites(favorites);
        setHistory(history);
      }
      getMeme();
    };

    if (!blockDuplicateUseEffect.current) {
      getLocalData();
      blockDuplicateUseEffect.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const addToHistory = () => {
      if (!meme) return;

      const { url, postLink, nsfw, preview } = meme;
      const newMeme = { url, postLink, nsfw, preview: preview[0] };

      setHistory((history: any) => {
        return history.find((meme: any) => meme.url === url)
          ? [...history]
          : [...history, newMeme];
      });
    };
    addToHistory();
  }, [meme]);

  useEffect(() => {
    if (!history.length) return;
    saveMemes({
      favorites,
      history,
    });
  }, [favorites, history]);

  return (
    <div className="flex justify-center w-full h-full overflow-scroll rounded-xl">
      {!isLoading ? (
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
        <div className="absolute -translate-x-1/2 -translate-y-1/2 border border-gray-400 shadow-xl rounded-3xl bg-gradient-to-br from-white to-gray-300 top-1/2 left-1/2 w-60 h-60 ">
          {/* <L68 /> */}
        </div>
      )}
    </div>
  );
};

export default Memes;
