import type Settings from "../../Types/Settings";

import Date from "./Date";
import Clock from "./Clock";
import Weather from "./Weather";
import FavoriteSites from "./FavoriteSites";
import Memes from "./Memes";
import FactsAndQuotes from "./FactsAndQuotes";
import Button from "../Misc/Button";
import { motion } from "framer-motion";

const Home = ({
  overlay,
  setOverlay,
  settings,
}: {
  overlay: string;
  setOverlay: any;
  settings: Settings | null;
}) => {
  // TODO: image bg option (and a slideshow)

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: overlay && !/games|tools|feed/.test(overlay) ? "-100%" : 0,
        x:
          overlay && /games|tools/.test(overlay)
            ? "30%"
            : overlay === "feed"
            ? "-60%"
            : "0",
      }}
      className="grid w-full h-full grid-rows-[repeat(10,minmax(0,1fr))] gap-2"
    >
      <div className="grid grid-cols-3">
        <Date />
        <Clock />
        <Weather />
      </div>
      <FavoriteSites />
      <Memes setOverlay={setOverlay} />
      <div className="relative">
        <FactsAndQuotes />
      </div>
      <div className="grid grid-cols-4 row-span-2 gap-4 p-4">
        <Button
          name={"Games"}
          handleClick={() => setOverlay("games")}
          className="text-red-500 bg-red-500 bg-opacity-10 hover:bg-opacity-20"
        />
        <Button
          name={"Tools"}
          handleClick={() => setOverlay("tools")}
          className="text-yellow-500 bg-yellow-500 bg-opacity-10 hover:bg-opacity-20"
        />
        <Button
          name={"Feed"}
          handleClick={() => setOverlay("feed")}
          className="text-blue-500 bg-blue-500 bg-opacity-10 hover:bg-opacity-20"
        />
        <Button
          name={"Settings"}
          handleClick={() => setOverlay("settings")}
          className="text-pink-500 bg-pink-500 bg-opacity-10 hover:bg-opacity-20"
        />
      </div>
    </motion.div>
  );
};

export default Home;
