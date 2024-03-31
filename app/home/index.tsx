import { Suspense, lazy, useState } from "react";
import FavoriteSites from "./FavoriteSites";
import Header from "./header";
import Marquee from "./marquee";
import Feed from "./tools/Feed";
import Memes from "./tools/Memes";

const miniApps = {
  memes: Memes,
  feed: Feed,
  2048: lazy(() => import("./games/2048")),
  countries: lazy(() => import("./games/Countries")),
  minesweeper: lazy(() => import("./games/Minesweeper")),
  "reflex challenge": lazy(() => import("./games/ReflexChallenge")),
  sudoku: lazy(() => import("./games/Sudoku")),
  wordle: lazy(() => import("./games/Wordle")),
  wordsearch: lazy(() => import("./games/WordSearch")),
} as any;

const Home = () => {
  const [miniApp, setMiniApp] = useState("memes");

  const MiniApp = miniApps[miniApp];

  return (
    <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
      <div className="grid grid-cols-[15vw,minmax(0,1fr),15vw] gap-8 grid-rows-1">
        <div className="">
          {Object.keys(miniApps).map(app => (
            <button
              key={app}
              onClick={() => setMiniApp(app)}
              className={`w-full p-4 text-white text-center ${
                miniApp === app ? "bg-blue-500" : "bg-black"
              }`}
            >
              {app}
            </button>
          ))}
        </div>
        <div className="h-full grid grid-rows-[auto,minmax(0,1fr)] place-items-center py-4 gap-8">
          <Header />
          <div className="h-full w-full rounded-xl overflow-hidden flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <MiniApp />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <FavoriteSites />
        </div>
      </div>
      <Marquee />
    </div>
  );
};

export default Home;
