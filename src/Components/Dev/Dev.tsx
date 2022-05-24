import React from "react";
import HackerNews from "./HackerNews/HackerNews";
import Reddit from "./Reddit/Reddit";

const Dev = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center  font-mono">
      <Reddit />
      <div className="[grid-area:1/3/3/5] border w-full h-full">
        Awesome Dev
      </div>
      <div className="[grid-area:1/5/7/7] border w-full h-full">Github</div>
      <HackerNews />
    </div>
  );
};

export default Dev;
