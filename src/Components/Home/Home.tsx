import { useMemo, useState } from "react";
import Clock from "./Clock/Clock";
import FactsAndQuotes from "./FactsAndQuotes";
import FavoriteSites from "./FavoriteSites";
import Memes from "./Memes";
import Weather from "./Weather";

const miniApps = {
  memes: Memes,
  weather: Weather,
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
        <div className="h-full grid grid-rows-[auto,minmax(0,1fr)] place-items-center py-4">
          <div className="p-4 flex flex-col items-center w-max bg-black bg-opacity-30 backdrop-blur-3xl rounded-lg gap-2 shadow">
            <Clock />
            <Date />
          </div>
          <MiniApp setOverlay={setOverlay} />
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
