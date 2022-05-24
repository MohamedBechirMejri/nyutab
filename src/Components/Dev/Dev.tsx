import React from "react";

const Dev = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center">
      <div className="[grid-area:1/1/7/3] border w-full h-full">Reddit</div>
      <div className="[grid-area:1/3/3/5] border w-full h-full">Awesome Dev</div>
      <div className="[grid-area:1/5/7/7] border w-full h-full">Github</div>
      <div className="[grid-area:3/3/7/5] border w-full h-full">Hacker News</div>
    </div>
  );
};

export default Dev;
