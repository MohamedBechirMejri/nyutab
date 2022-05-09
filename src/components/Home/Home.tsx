import React from "react";
import FavoriteSites from "./FavoriteSites";
import FunFacts from "./FunFacts";
import Quotes from "./Quotes";
import Searchbar from "./Searchbar";
import Clock from "./Clock";

const Home = () => {
  return (
    <div className="grid grid-rows-[.5fr_5fr_1fr] grid-cols-[5fr_1fr] h-full w-full justify-items-center items-center justify-center gap-2 ">
      <Searchbar />
      <Clock />
      <div className="grid grid-rows-[.5fr_5fr] h-full w-full">
        <FavoriteSites />
        <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-white">
          Don't know what to put here yet :P
        </div>
      </div>
      <div></div>
      <div className="grid items-center justify-center w-full h-full grid-cols-2 gap-2 justify-items-center">
        <FunFacts />
        <Quotes />
      </div>
    </div>
  );
};

export default Home;
