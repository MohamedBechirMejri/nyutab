import { useMemo, useState } from "react";
import Clock from "./Clock/Clock";
import FactsAndQuotes from "./FactsAndQuotes";
import FavoriteSites from "./FavoriteSites";
import Memes from "./Memes";

const Home = ({ setOverlay }: { setOverlay: any }) => {
  const [miniApp, setMiniApp] = useState("memes");

  const miniApps = useMemo(() => {
    return {
      memes: <Memes setOverlay={setOverlay} />,
    };
  }, []) as any;

  return (
    <div className="w-full h-full grid grid-rows-[minmax(0,1fr),auto]">
      <div className="grid grid-cols-[15vw,minmax(0,1fr),15vw] gap-8 grid-rows-1">
        <div className="bg-black"></div>
        <div className="h-full grid grid-rows-[auto,minmax(0,1fr)] place-items-center py-4">
          <div className="p-4 flex flex-col items-center w-max bg-black bg-opacity-30 backdrop-blur-3xl rounded-lg gap-2 shadow">
            <Clock />
            <Date />
          </div>
          {miniApps[miniApp]}
        </div>
        <div className="flex flex-col items-end">
          <FavoriteSites />
        </div>
      </div>

      <FactsAndQuotes />
    </div>
  );
};

export default Home;
