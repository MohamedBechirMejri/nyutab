import React from "react";
import CountDown from "./CountDown";
import convertDateandTime from "../../Utils/convertDateandTime";

const NextRace = () => {
  const [nextRaceData, setNextRaceData] = React.useState({
    season: "2022",
    round: "7",
    Races: [
      {
        season: "2022",
        round: "7",
        url: "http://en.wikipedia.org/wiki/2022_Monaco_Grand_Prix",
        raceName: "Monaco Grand Prix",
        Circuit: {
          circuitId: "monaco",
          url: "http://en.wikipedia.org/wiki/Circuit_de_Monaco",
          circuitName: "Circuit de Monaco",
          Location: {
            lat: "43.7347",
            long: "7.42056",
            locality: "Monte-Carlo",
            country: "Monaco",
          },
        },
        date: "2022-05-29",
        time: "13:00:00Z",
        FirstPractice: {
          date: "2022-05-27",
          time: "12:00:00Z",
        },
        SecondPractice: {
          date: "2022-05-27",
          time: "15:00:00Z",
        },
        ThirdPractice: {
          date: "2022-05-28",
          time: "11:00:00Z",
        },
        Qualifying: {
          date: "2022-05-28",
          time: "14:00:00Z",
        },
      },
    ],
  });
  const [matchDate, setMatchDate] = React.useState(
    convertDateandTime(nextRaceData.Races[0].date, nextRaceData.Races[0].time)
  );
  return (
    <div className="w-full pt-8 text-center">
      <h1 className="text-sm text-gray-500">NextRace </h1>
      <h1 className="text-xl font-bold">{nextRaceData.Races[0].raceName}</h1>
      <h1 className="text-sm text-gray-500">Round {nextRaceData.round}</h1>
      <h1 className="flex items-center justify-center ">
        <span className="px-2 ">
          {nextRaceData.Races[0].Circuit.circuitName}
        </span>
        |<span className="px-2 ">{matchDate.toUTCString()}</span>
      </h1>
      <CountDown matchDate={matchDate} />
    </div>
  );
};

export default NextRace;
