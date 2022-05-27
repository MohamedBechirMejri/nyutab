import React, { useState } from "react";
import Nav from "./Nav";
import Standings from "./Standings";

const F1 = () => {
  const [currentTab, setCurrentTab] = useState("driverstandings");
  return (
    <div className=" [grid-area:1/1/6/3] w-full h-full overflow-y-scroll noscroll">
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Standings currentTab={currentTab} />
    </div>
  );
};

export default F1;
