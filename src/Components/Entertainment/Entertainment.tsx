import React from "react";
import Awesome from "../../Components/Awesome/Awesome";
import { AwesomeEntertainmentData } from "../../Components/Awesome/AwesomeData/Entertainment";
import Snake from "./Snake/Snake";

const Entertainment = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center ">
      <Snake />
      <Awesome
        header="Awesome Entertainment"
        data={AwesomeEntertainmentData}
        className=" [grid-area:1/5/5/7] "
      />
    </div>
  );
};

export default Entertainment;