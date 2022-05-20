import React from "react";
import Awesome from "../../Components/Awesome/Awesome";
import { AwesomeEntertainmentData } from "../../Components/Awesome/AwesomeData/Entertainment";

const Entertainment = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center ">
      <Awesome header="Awesome Entertainment" data={AwesomeEntertainmentData} />
    </div>
  );
};

export default Entertainment;
