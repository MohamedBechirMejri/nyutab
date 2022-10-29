import React, { useState } from "react"
// import Nav from "./Nav";
import NextRace from "./NextRace"
// import Standings from "./Standings";

const F1 = () => {
  const [currentTab, setCurrentTab] = useState("driverstandings")
  return (
    <div className="flex items-center w-full h-full overflow-y-scroll select-none  noscroll">
      <NextRace />
      {/* <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} /> */}
      {/* <Standings currentTab={currentTab} /> */}
    </div>
  )
}

export default F1
