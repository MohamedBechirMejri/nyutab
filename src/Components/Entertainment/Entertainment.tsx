import React from "react";
import Awesome from "../../Components/Awesome/Awesome";
import { AwesomeEntertainmentData } from "../../Components/Awesome/AwesomeData/Entertainment";

const Entertainment = () => {
  return (
    <div>
      <Awesome header="Awesome Entertainment" data={AwesomeEntertainmentData} />
    </div>
  );
};

export default Entertainment;
