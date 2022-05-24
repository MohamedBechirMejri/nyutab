import React from "react";
import Nav from "./Nav";
import Tab from "./Tab";

const HackerNews = () => {
  const [currentTab, setCurrentTab] = React.useState("top");
  return (
    <div className="[grid-area:3/3/7/5] border w-full h-full">
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Tab currentTab={currentTab} />
    </div>
  );
};

export default HackerNews;
