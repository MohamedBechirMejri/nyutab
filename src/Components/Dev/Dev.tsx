import React from "react";
import HackerNews from "./HackerNews/HackerNews";
import Reddit from "./Reddit/Reddit";
import Awesome from "../Awesome/Awesome";
import { AwesomeDevData } from "../Awesome/AwesomeData/Dev";

const Dev = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center  font-mono">
      <Reddit />

      <Awesome
        header="Awesome Dev"
        data={AwesomeDevData}
        className="[grid-area:1/3/3/5] w-full h-full"
      />

      <div className="[grid-area:1/5/7/7] border w-full h-full">Github</div>
      <HackerNews />
    </div>
  );
};

export default Dev;
