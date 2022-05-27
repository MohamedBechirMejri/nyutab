import React, { useState } from "react";
import Nav from "./Nav";
import NextRace from "./NextRace";
import Standings from "./Standings";

const F1 = () => {
  const [currentTab, setCurrentTab] = useState("driverstandings");
  return (
    <div className=" [grid-area:1/1/7/3] w-full h-full overflow-y-scroll noscroll">
      <NextRace />
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Standings currentTab={currentTab} />
    </div>
  );
};

export default F1;
