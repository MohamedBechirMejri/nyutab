import { useState } from "react";

import FavoriteSites from "./FavoriteSites";
import X2048 from "./games/2048";
import Countries from "./games/Countries";
import Minesweeper from "./games/Minesweeper";
import ReflexChallenge from "./games/ReflexChallenge";
import Sudoku from "./games/Sudoku";
import WordSearch from "./games/WordSearch";
import Wordle from "./games/Wordle";
import Header from "./header";
import Marquee from "./marquee";
import Feed from "./tools/Feed";
import Memes from "./tools/Memes";
import GameButton from "./games/GameButton";

const tools = ["memes", "feed"];
const games = [
  "countries",
  "minesweeper",
  "sudoku",
  "wordle",
  "wordsearch",
  "2048",
  "reflex challenge",
];

const miniApps = {
  memes: Memes,
  feed: Feed,
  2048: X2048,
  countries: Countries,
  minesweeper: Minesweeper,
  "reflex challenge": ReflexChallenge,
  sudoku: Sudoku,
  wordle: Wordle,
  wordsearch: WordSearch,
} as any;

const Home = () => {
  const [miniApp, setMiniApp] = useState("memes");

  const MiniApp = miniApps[miniApp];

  return (
    <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
      <div className="grid grid-cols-[15vw,minmax(0,1fr),15vw] gap-8 grid-rows-1">
        <div className="flex flex-col justify-between p-4 select-none">
          <div>
            {tools.map(app => (
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

          <div className="flex flex-wrap gap-x-4 gap-1">
            <span className="w-full pb-2">Games:</span>
            {games.map(app => (
              <GameButton key={app} app={app} onClick={() => setMiniApp(app)} miniApp={miniApp} />
            ))}
          </div>
        </div>
        <div className="h-full grid grid-rows-[auto,minmax(0,1fr)] place-items-center py-4 gap-8">
          <Header />
          <div className="h-full w-full rounded-xl overflow-hidden flex items-center justify-center">
            <MiniApp />
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
