import { useContext, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

import { saveMemes, getLocalMemes } from "lib/storageUtils";
import { getRandomMeme } from "lib/redditUtils";
import { getRandomNumber } from "lib/mathUtils";

import { RiHistoryLine } from "react-icons/ri";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useOverlayStore, useSettingsStore } from "lib/stores";

const buttonAnimation = {
  initial: { scale: 0, y: 13 },
  animate: { scale: 1, y: 0 },
};

const Memes = () => {
  const { settings } = useSettingsStore();

  const blockDuplicateUseEffect = useRef(false);
  const { setOverlay } = useOverlayStore();

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

  // TODO: fix tools disappearing if image too small
  // TODO: improve logic (reduce useeffects and extract functions/components)

  return isLoading ? (
    <div
      className="flex items-center h-[50vh]"
      onClick={() => setOverlay("memes")}
    >
      <img
        src="images/114027-loader.gif"
        alt=""
        className="m-auto shadow-xl rounded-3xl w-44 h-44"
      />
    </div>
  ) : (
    <div className="h-[65vh] grid grid-rows-[1fr,auto] bg-black rounded-2xl overflow-hidden relative group min-w-max">
      <img
        src={meme.url}
        alt=""
        className="relative z-10 h-full mx-auto shadow-2xl row-span-4 object-contain w-full"
      />

      <div className="absolute flex items-center justify-center gap-10 px-4 py-6 text-4xl bottom-0 left-0 z-20 w-full backdrop-blur group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-black bg-opacity-50 rounded-b-2xl min-w-max">
        <m.button
          {...buttonAnimation}
          onClick={() => toggleFavoriteMeme(meme)}
          className="fill-black"
        >
          <FiHeart
            className={
              `transition-all ` +
              (favorites.some((m: any) => m.url === meme.url)
                ? "fill-red-500 stroke-red-400"
                : "")
            }
          />
        </m.button>
        <m.a
          {...buttonAnimation}
          href={meme.postLink}
          target="_blank"
          rel="noreferrer"
        >
          <HiOutlineExternalLink />
        </m.a>
        <m.button {...buttonAnimation} onClick={() => setOverlay("memes")}>
          <RiHistoryLine />
        </m.button>
        <m.button {...buttonAnimation} onClick={() => getMeme()}>
          <FiRefreshCw />
        </m.button>
      </div>
    </div>
  );
};

export default Memes;
