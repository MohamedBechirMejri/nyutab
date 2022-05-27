import React, { useState } from "react";
import Nav from "./Nav";
import Standings from "./Standings";

const F1 = () => {
  const [currentTab, setCurrentTab] = useState("driverstandings");
  return (
    <div className=" [grid-area:1/1/6/4] w-full h-full">
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Standings currentTab={currentTab} />
    </div>
  );
};

export default F1;
