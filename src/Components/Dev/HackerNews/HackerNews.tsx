import React from "react";
import Nav from "./Nav";

const HackerNews = () => {
  const [currentTab, setCurrentTab] = React.useState("top");
  return (
    <div className="[grid-area:3/3/7/5] border w-full h-full">
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default HackerNews;
