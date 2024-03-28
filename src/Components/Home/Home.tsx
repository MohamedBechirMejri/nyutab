import { useMemo, useState } from "react";
import Clock from "./Clock/Clock";
import FactsAndQuotes from "./FactsAndQuotes";
import FavoriteSites from "./FavoriteSites";
import Memes from "./Memes";
import Weather from "./Weather";
import Feed from "../Overlay/Feed";
import X2048 from "../Overlay/Games/2048";
import Countries from "../Overlay/Games/Countries";
import Minesweeper from "../Overlay/Games/Minesweeper";
import ReflexChallenge from "../Overlay/Games/ReflexChallenge";
import Sudoku from "../Overlay/Games/Sudoku";
import Wordle from "../Overlay/Games/Wordle";
import WordSearch from "../Overlay/Games/WordSearch";

const miniApps = {
  memes: Memes,
  weather: Weather,
  feed: Feed,
  2048: X2048,
  countries: Countries,
  minesweeper: Minesweeper,
  "reflex challenge": ReflexChallenge,
  sudoku: Sudoku,
  wordle: Wordle,
  wordsearch: WordSearch,
} as any;

const Home = ({ setOverlay }: { setOverlay: any }) => {
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
          <div className="p-4 flex flex-col items-center w-max bg-black bg-opacity-30 backdrop-blur-3xl rounded-lg gap-2 shadow">
            <Clock />
            <Date />
          </div>
          <div className="h-full w-full rounded-xl overflow-hidden flex items-center justify-center">
            <MiniApp setOverlay={setOverlay} />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <FavoriteSites />
        </div>
      </div>
      <FactsAndQuotes />
    </div>
  );
};

export default Home;
