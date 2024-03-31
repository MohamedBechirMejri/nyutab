import { motion } from "framer-motion";
import { useContext, useState } from "react";

import { saveSettings } from "../../../lib/storageUtils";
import { SettingsContext } from "../../../lib/contexts";

import Favorites from "./Favorites";
import Memes from "./Memes";
import Location from "./Location";
import Feed from "./Feed";
import Nav from "../../Misc/Nav";

const Settings = ({
  setSettings,
  setOverlay,
}: {
  setSettings: any;
  setOverlay: any;
}) => {
  const sections = ["theme", "favorites", "memes", "location", "feed"];

  const currentSettings = useContext(SettingsContext);

  const [favorites, setFavorites] = useState(currentSettings!.favorites);
  const [memes, setMemes] = useState(currentSettings!.memes);
  const [position, setPosition] = useState(currentSettings!.position);
  const [feed, setFeed] = useState(currentSettings!.feed);

  const [section, setSection] = useState("theme");

  const submitSettings = () => {
    setSettings((settings: any) => {
      const newSettings = {
        ...settings,
        favorites,
        memes,
        position,
        feed,
      };
      saveSettings(newSettings);
      return newSettings;
    });
    setSection("theme");
    setOverlay("");
  };

  return (
    <div
      style={{ backgroundColor: "#000000cc" }}
      className="relative grid w-full h-full grid-cols-1 grid-rows-6 shadow-2xl select-none rounded-xl"
    >
      <div className="flex items-center justify-end row-span-1 px-8">
        <div className="grid grid-cols-[1fr,12rem] gap-8 pl-24">
          <Nav tabs={sections} tab={section} setTab={setSection} />
          <motion.button
            initial={{
              backgroundColor: "transparent",
              color: "#000",
              borderRadius: "2rem",
              scale: 0.75,
            }}
            animate={{
              backgroundColor: "#f9d423",
              color: "#000",
              scale: 1,
            }}
            whileHover={{
              borderRadius: "1.5rem",
              backgroundColor: "#e84899",
              backgroundImage:
                "linear-gradient(315deg, #e84899 0%, #f9d423 74%)",
            }}
            whileTap={{ borderRadius: "2rem" }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="p-4 px-6 m-auto text-lg font-bold uppercase h-max w-max"
            onClick={submitSettings}
          >
            Save Settings
          </motion.button>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full row-span-5 p-4 overflow-scroll">
        {section === "favorites" && (
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        )}
        {section === "memes" && <Memes memes={memes} setMemes={setMemes} />}
        {section === "location" && (
          <Location position={position} setPosition={setPosition} />
        )}
        {section === "feed" && <Feed feed={feed} setFeed={setFeed} />}
      </div>
    </div>
  );
};

export default Settings;
