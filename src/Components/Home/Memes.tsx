import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SettingsContext } from "../../lib/contexts";
import { saveMemes, getLocalMemes } from "../../lib/storageUtils";
import { getRandomMeme } from "../../lib/redditUtils";
import { getRandomNumber } from "../../lib/mathUtils";

import { RiHistoryLine } from "react-icons/ri";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";

const buttonAnimation = {
  initial: { scale: 0, y: 13 },
  animate: { scale: 1, y: 0 },
  whileTap: { scale: 0.75 },
};

const Memes = ({ setOverlay }: { setOverlay: any }) => {
  const settings = useContext(SettingsContext);

  const blockDuplicateUseEffect = useRef(false);

  const [meme, setMeme] = useState(null) as any;
  const [history, setHistory] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <div className="flex items-center h-full row-span-6">
      <img
        src="images/114027-loader.gif"
        alt=""
        className="m-auto shadow-xl rounded-3xl w-44 h-44"
      />
    </div>
  ) : (
    <div className="row-span-6 grid grid-rows-[minmax(0,5fr),minmax(0,1fr)] h-full items-center justify-center">
      <div className="h-full">
        <img
          src={meme.url}
          alt=""
          className="relative z-10 h-full mx-auto shadow-2xl rounded-xl"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex items-center justify-center gap-10 px-4 py-6 text-4xl bg-gradient-to-tl from-gray-700 to-gray-400 rounded-xl -top-2"
      >
        <motion.button
          {...buttonAnimation}
          onClick={() => toggleFavoriteMeme(meme)}
          className="fill-black"
        >
          <FiHeart
            className={`transition-all fill-red-500 stroke-red-400 ${
              !favorites.find((m: any) => m.url === meme.url) && "fill-none"
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
        <motion.button {...buttonAnimation} onClick={() => setOverlay("memes")}>
          <RiHistoryLine />
        </motion.button>
        <motion.button {...buttonAnimation} onClick={() => getMeme()}>
          <FiRefreshCw />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Memes;
