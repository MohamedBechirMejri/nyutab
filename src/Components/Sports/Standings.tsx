import React, { useEffect, useState } from "react";

const Standings = ({ currentTab }: { currentTab: string }) => {
  const [standingsData, setData] = useState<any>([]);
  useEffect(() => {
    fetch(
      `http://ergast.com/api/f1/current/${
        currentTab === "driverstandings" ? "driver" : "constructor"
      }Standings.json`
    )
      .then(response => response.json())
      .then(data => {
        if (data.MRData.StandingsTable.StandingsLists[0].DriverStandings) {
          setData(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        } else {
          setData(
            data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
          );
        }
      });

    console.log(standingsData);
  }, [currentTab]);

  return <div></div>;
};

export default Standings;
