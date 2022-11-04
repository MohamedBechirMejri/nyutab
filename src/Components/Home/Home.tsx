import FavoriteSites from "./FavoriteSites";
import Clock from "./Clock";
import Weather from "./Weather";
import Date from "./Date";
import Reddit from "../Dev/Reddit/Reddit";
import HackerNews from "../Dev/HackerNews/HackerNews";
import F1 from "../Sports/F1";
import Memes from "../Entertainment/Memes";
import Games from "../Entertainment/Games";
import Tools from "../Tools/Tools";
import FactsAndQuotes from "./FactsAndQuotes";
import Settings from "../Settings/Settings";

const Home = ({
  overlay,
  setOverlay,
}: {
  overlay: string;
  setOverlay: any;
}) => {
  return (
    <div
      className={`grid w-full h-full grid-cols-12 gap-2 grid-rows-[repeat(12,minmax(0,1fr))] ${
        overlay ? "opacity-0" : ""
      } transition-all `}
    >
      {/* add x0 to keep the color hints in case i need them */}
      <div className="w-full h-full col-span-9 bg-blackx0">
        <FavoriteSites />
      </div>
      <div className="w-full h-full col-span-3 bg-red-500x0 grid grid-cols-3 grid-rows-1 p-1">
        <div className="col-span-2 w-full">
          <Date />
        </div>
        <div className="flex flex-col w-full">
          <Weather />
          <Clock />
        </div>
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
            <span className="text-base">Suggest an Improvement</span>
            <p className="text-xs">v0.7.0 alpha</p>
          </button>
        </a>
        <Settings />
      </div>
    </div>
  );
};

export default Home;