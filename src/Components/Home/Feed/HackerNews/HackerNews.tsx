import React from "react";
import Nav from "./Nav";
import Tab from "./Tab";

const HackerNews = () => {
  const [currentTab, setCurrentTab] = React.useState("top");
  return (
    <div className="[grid-area:3/3/7/5] w-full h-full pt-2 pb-8 overflow-y-scroll noscroll font-[FiraCode]">
      {/* <h1 className="w-full font-bold text-center">Hacker News</h1> */}
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Tab currentTab={currentTab} />
    </div>
  );
};

export default HackerNews;
