import FavoriteSites from "./Components/Home/FavoriteSites";
import Clock from "./Components/Home/Clock";
import Reddit from "./Components/Dev/Reddit/Reddit";
import HackerNews from "./Components/Dev/HackerNews/HackerNews";
import F1 from "./Components/Sports/F1";
import Memes from "./Components/Entertainment/Memes";
import Games from "./Components/Entertainment/Games";
import Tools from "./Components/Tools/Tools";
import FactsAndQuotes from "./Components/Home/FactsAndQuotes";
import Settings from "./Components/Settings/Settings";
import { useState } from "react";
import Overlay from "./Components/Overlay";

function App() {
  const [overlay, setOverlay] = useState("");

  return (
    <div className="h-screen max-h-screen p-2 overflow-hidden App dark:bg-slate-900 dark:text-white">
      {overlay ? (
        <Overlay overlay={overlay} setOverlay={setOverlay} />
      ) : (
        <div className="grid w-full h-full grid-cols-12 gap-2 grid-rows-[repeat(12,minmax(0,1fr))]">
          {/* add x0 to keep the color hints in case i need them */}
          <div className="w-full h-full col-span-9 bg-blackx0">
            <FavoriteSites />
          </div>
          <div className="w-full h-full col-span-3 bg-red-500x0">
            <Clock />
          </div>
          <div className="w-full h-full col-span-4 row-span-5 bg-green-500x0">
            <Reddit />
          </div>
          <div className="w-full h-full col-span-4 row-span-3 bg-blue-500x0">
            <F1 />
          </div>
          <div className="w-full h-full col-span-4 row-span-4 bg-yellow-500x0">
            <Games />
          </div>
          <div className="w-full h-full col-span-4 row-span-6 bg-gray-500x0">
            <Memes />
          </div>
          <div className="w-full h-full col-span-4 row-span-5 p-2 bg-purple-500x0">
            <Tools setOverlay={setOverlay} />
          </div>
          <div className="w-full h-full col-span-4 row-span-6 bg-pink-500x0">
            <HackerNews />
          </div>
          <div className="relative w-full h-full col-span-4 row-span-2 bg-cyan-500x0">
            <FactsAndQuotes />
          </div>
          <div className="grid w-full h-full grid-cols-2 col-span-4 row-span-2 gap-2 p-2 text-xl font-bold text-white bg-slate-500x0">
            <a
              href="https://github.com/MohamedBechirMejri/nyutab/issues"
              target="_blank"
              rel="noreferrer"
            >
              <button className="w-full h-full transition-all border border-current rounded-lg text-fuchsia-500 active:scale-95 hover:bg-[#d946ef27]">
                <span className="text-lg">Help us Improve</span>
                <p className="text-xs">v0.7.0 alpha</p>
              </button>
            </a>
            <Settings />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
