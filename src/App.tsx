import FavoriteSites from "./Components/Home/FavoriteSites";
import Clock from "./Components/Home/Clock";
import Reddit from "./Components/Dev/Reddit/Reddit";
import HackerNews from "./Components/Dev/HackerNews/HackerNews";
import F1 from "./Components/Sports/F1";
import Tasks from "./Components/Productivity/Tasks";
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
          <Tasks />
        </div>
        <div className="w-full h-full col-span-4 row-span-6 bg-gray-500x0">
          <Memes />
        </div>
        <div className="w-full h-full col-span-4 row-span-3 p-2 bg-purple-500x0">
          <a
            href="https://picsum.photos"
            className="w-full h-full bg-[url(https://picsum.photos/1000)] bg-center bg-cover bg-no-repeat rounded-lg relative flex flex-col items-center justify-center overflow-hidden text-white hover:scale-[1.03] active:scale-100 transition-all"
          >
            <div className="absolute w-full h-full bg-black opacity-50"></div>
            <p className="absolute top-0 left-0 p-2 text-xs">Sponsored By:</p>
            <h1 className="z-10 text-3xl font-bold">Picsum Photos</h1>
            <p className="z-10 text-sm">Random Images API</p>
          </a>
        </div>
        <div className="w-full h-full col-span-4 row-span-6 bg-pink-500x0">
          <HackerNews />
        </div>
        <div className="w-full h-full col-span-4 row-span-4 bg-slate-500"></div>
        <div className="relative w-full h-full col-span-4 row-span-2 bg-cyan-500x0">
          {isQuote ? (
            <Quotes className="absolute transition-all -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 animate-fadeIn" />
          ) : (
            <FunFacts className="absolute transition-all -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 animate-fadeIn" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
