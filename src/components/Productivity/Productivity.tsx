import React from "react";
import AwesomeProductivity from "./Awesome";
import PomodoroClock from "./PomodoroClock";
import Tasks from "./Tasks";

const Productivity = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center ">
      <Tasks />
      <PomodoroClock />
      <AwesomeProductivity />
    </div>
  );
};

export default Productivity;
