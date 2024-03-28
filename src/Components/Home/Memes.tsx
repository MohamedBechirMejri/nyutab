import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    <div className="flex items-center h-[50vh]">
      <img
        src="images/114027-loader.gif"
        alt=""
        className="m-auto shadow-xl rounded-3xl w-44 h-44"
      />
    </div>
  ) : (
    <div className="h-[50vh] grid grid-rows-[1fr,auto] bg-black rounded-2xl overflow-hidden relative group">
      <img
        src={meme.url}
        alt=""
        className="relative z-10 h-full mx-auto shadow-2xl row-span-4 object-contain w-full"
      />

      <div className="absolute flex items-center justify-center gap-10 px-4 py-6 text-4xl bottom-0 left-0 z-50 w-full backdrop-blur group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-black bg-opacity-50 ">
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
      </div>
    </div>
  );
};

export default Memes;
