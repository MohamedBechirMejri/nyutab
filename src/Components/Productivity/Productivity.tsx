import React from "react";
import AwesomeProductivityData from "../Awesome/AwesomeData/Productivity";
import Awesome from "../Awesome/Awesome";
import PomodoroClock from "./PomodoroClock";
import Tasks from "./Tasks";

const Productivity = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center ">
      <Tasks />
      <PomodoroClock />
      <Awesome
        data={AwesomeProductivityData}
        header="Awesome Productivity"
        className=" [grid-area:1/3/5/6] "
      />
    </div>
  );
};

export default Productivity;
