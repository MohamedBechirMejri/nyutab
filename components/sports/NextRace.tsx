import React, { useEffect } from "react";
import CountDown from "./CountDown";
import RCountdown from "react-countdown";
import Loading from "../misc/Loading/Loading";
const NextRace = () => {
  const [nextRaceData, setNextRaceData] = React.useState(
    null as {
      season: string;
      round: string;
      Races: [
        {
          season: string;
          round: string;
          url: string;
          raceName: string;
          Circuit: {
            circuitId: string;
            url: string;
            circuitName: string;
            Location: {
              lat: string;
              long: string;
              locality: string;
              country: string;
            };
          };
          date: string;
          time: string;
          FirstPractice: {
            date: string;
            time: string;
          };
          SecondPractice: {
            date: string;
            time: string;
          };
          ThirdPractice: {
            date: string;
            time: string;
          };
          Qualifying: {
            date: string;
            time: string;
          };
        }
      ];
    } | null
  );

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current/next.json")
      .then(res => res.json())
      .then(data => {
        setNextRaceData(data.MRData.RaceTable);
      });
  }, []);
  return !nextRaceData ? (
    <Loading />
  ) : (
    <div className="w-full text-center">
      <h1 className="text-sm text-gray-500">NextRace </h1>
      <h1 className="text-xl font-bold">{nextRaceData.Races[0].raceName}</h1>
      <h1 className="text-sm text-gray-500">Round {nextRaceData.round}</h1>
      <h1 className="flex items-center justify-center ">
        <span className="px-2 ">
          {nextRaceData.Races[0].Circuit.circuitName}
        </span>
        |
        <span className="px-2 ">
          {new Date(
            nextRaceData.Races[0].date + ":" + nextRaceData.Races[0].time
          ).toUTCString()}
        </span>
      </h1>{" "}
      <RCountdown
        date={nextRaceData.Races[0].date + ":" + nextRaceData.Races[0].time}
        renderer={props => <CountDown rCountdownProps={props} />}
      />{" "}
    </div>
  );
};

export default NextRace;
