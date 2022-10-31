import FavoriteSites from "./Components/Home/FavoriteSites";
import Clock from "./Components/Home/Clock";
import Reddit from "./Components/Dev/Reddit/Reddit";
import HackerNews from "./Components/Dev/HackerNews/HackerNews";
import F1 from "./Components/Sports/F1";
import Memes from "./Components/Entertainment/Memes";
import Quotes from "./Components/Home/Quotes";
import FunFacts from "./Components/Home/FunFacts";
import { useState, useEffect } from "react";

function App() {
  const [isQuote, setIsQuote] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsQuote(isQuote => !isQuote);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen max-h-screen p-2 overflow-hidden App dark:bg-slate-900 dark:text-white">
      <div className="grid items-center justify-center w-full h-full grid-cols-12 gap-2 grid-rows-[repeat(12,minmax(0,1fr))] justify-items-center ">
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
          <div className="flex flex-col items-center w-full h-full p-2 overflow-y-scroll noscroll">
            <h1 className="text-xl font-semibold">Games</h1>
            <div className="grid w-full h-max grid-cols-2 gap-4 p-4 grid-rows-[repeat(25,minmax(0,1fr))]">
              <button className="w-full h-24 transition-all border border-current rounded-lg text-rose-500 active:scale-95 hover:bg-[#f43f5e27]">
                Game
                <p className="text-xs">soon</p>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full col-span-4 row-span-6 bg-gray-500x0">
          <Memes />
        </div>
        <div className="w-full h-full col-span-4 row-span-5 p-2 bg-purple-500x0">
          <div className="flex flex-col items-center w-full h-full p-2">
            <h1 className="text-xl font-semibold">Tools</h1>
          </div>
        </div>
        <div className="w-full h-full col-span-4 row-span-6 bg-pink-500x0">
          <HackerNews />
        </div>
        <div className="relative w-full h-full col-span-4 row-span-2 bg-cyan-500x0">
          {isQuote ? (
            <Quotes className="absolute transition-all -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 animate-fadeIn" />
          ) : (
            <FunFacts className="absolute transition-all -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 animate-fadeIn" />
          )}
        </div>{" "}
        <div className="grid w-full h-full grid-cols-2 col-span-4 row-span-2 gap-2 p-2 text-xl font-bold text-white bg-slate-500x0">
          {/* <button className="w-full h-full text-teal-500 transition-all border border-current rounded-lg active:scale-95 hover:bg-[#14b8a527]">
            Tools
            <p className="text-xs">soon</p>
          </button>
          <button className="w-full h-full transition-all border border-current rounded-lg text-rose-500 active:scale-95 hover:bg-[#f43f5e27]">
            Games
            <p className="text-xs">soon</p>
          </button> */}
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
          <button className="w-full h-full transition-all border border-current rounded-lg text-violet-500 active:scale-95 hover:bg-[#895bf327]">
            Settings
            <p className="text-xs">soon</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
