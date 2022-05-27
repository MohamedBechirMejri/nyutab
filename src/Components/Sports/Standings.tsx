import React, { useEffect } from "react";

const Standings = ({ currentTab }: { currentTab: string }) => {
  useEffect(() => {
    fetch(
      `http://ergast.com/api/f1/current/${
        currentTab === "driverstandings" ? "driver" : "constructor"
      }Standings.json`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }, [currentTab]);

  return <div></div>;
};

export default Standings;
