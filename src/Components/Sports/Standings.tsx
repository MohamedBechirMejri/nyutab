import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

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

  return (
    // <div className="grid w-full h-full grid-cols-1 gap-2 overflow-y-scroll">
    //   <div key={uniqid()} className="grid grid-cols-[2.5rem_9rem_3.5rem_2.5rem_8rem] w-full grid-rows-1">
    //     <h1 className=""> Pos. </h1>
    //     <h1 className="">Driver</h1>
    //     <h1 className="">Points</h1>
    //     <h1 className="">Wins</h1>
    //     <h1 className="">Team</h1>
    //   </div>
    //   {standingsData.map((standing: any) => {
    //     return (
    //       <div
    //         key={uniqid()}
    //         className="grid grid-cols-[2.5rem_9rem_3.5rem_2.5rem_8rem] w-full  grid-rows-1"
    //       >
    //         <h1 className="">{standing.position}</h1>
    //         <h1 className="">
    //           {standing.Driver.givenName} {standing.Driver.familyName}
    //         </h1>
    //         <h1 className="">{standing.points}</h1>
    //         <h1 className="">{standing.wins}</h1>
    //         <h1 className="">{standing.Constructors[0].name}</h1>
    //       </div>
    //     );
    //   })}
    // </div>
    <table className="w-full overflow-y-scroll">
      <thead>
        <tr>
          <th className="pl-2 text-center">Pos.</th>
          <th className="pl-2">Driver</th>
          <th className="pl-2 text-center">Points</th>

          <th className="pl-2">Team</th>
        </tr>
      </thead>
      <tbody className="">
        {standingsData.map((standing: any) => {
          return (
            <tr key={uniqid()} className="">
              <td className="pl-2 text-center">{standing.position}</td>
              <td className="pl-2">
                {standing.Driver.givenName} {standing.Driver.familyName}
              </td>
              <td className="pl-2 text-center">{standing.points}</td>
              <td className="pl-2 text-center">
                {standing.Constructors[0].name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Standings;
