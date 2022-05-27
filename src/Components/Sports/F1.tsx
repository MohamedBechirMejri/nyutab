import React, { useState } from "react";
import Nav from "./Nav";

const F1 = () => {
  const [currentTab, setCurrentTab] = useState("driversStandings");
  return (
    <div>
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default F1;
