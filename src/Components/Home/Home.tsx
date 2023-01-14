import type Settings from "../../Types/Settings";

import { motion } from "framer-motion";

import Date from "./Date";
import Clock from "./Clock";
import Weather from "./Weather";
import FavoriteSites from "./FavoriteSites";
import Memes from "./Memes";
import FactsAndQuotes from "./FactsAndQuotes";
import Button from "../Misc/Button";

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
      initial={{ scale: 0.9, y: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: overlay ? 0 : 1, y: overlay ? -100 : 0 }}
      transition={{
        duration: 0.2,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      className="grid w-full h-full grid-rows-[repeat(11,minmax(0,1fr))] gap-2"
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
