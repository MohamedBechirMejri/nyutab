import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import Loading from "../Misc/Loading/Loading";

const Standings = ({ currentTab }: { currentTab: string }) => {
  const [standingsData, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, [currentTab]);

  return isLoading ? (
    <Loading />
  ) : currentTab === "driverstandings" ? (
    <table className="w-full">
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
                {standing.Driver &&
                  `${standing.Driver.givenName} ${standing.Driver.familyName}`}
              </td>
              <td className="pl-2 text-center">{standing.points}</td>
              <td className="pl-2 text-center">
                {standing.Constructors && standing.Constructors[0].name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <table className="w-full">
      <thead>
        <tr>
          <th className="pl-2 text-center">Pos.</th>
          <th className="pl-2">Team</th>
          <th className="pl-2 text-center">Points</th>
        </tr>
      </thead>
      <tbody className="">
        {standingsData.map((standing: any) => {
          return (
            <tr key={uniqid()} className="">
              <td className="pl-2 text-center">{standing.position}</td>
              <td className="pl-2">
                {standing.Constructor && standing.Constructor.name}{" "}
              </td>
              <td className="pl-2 text-center">{standing.points}</td>
            </tr>
          );
        })}{" "}
      </tbody>
    </table>
  );
};

export default Standings;
