import React from "react";

const NextRace = () => {
  const [nextRaceData, setNextRaceData] = React.useState({
    RaceTable: {
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
    },
  });
  return (
    <div>
      <h1>NextRace</h1>
    </div>
  );
};

export default NextRace;
