import { motion } from "framer-motion";
import { useContext, useState } from "react";

import { saveSettings } from "../../../lib/storageUtils";
import { SettingsContext } from "../../../lib/contexts";

import Favorites from "./Favorites";
import Theme from "./Theme";
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
  const [theme, SetTheme] = useState(currentSettings!.theme);
  const [memes, setMemes] = useState(currentSettings!.memes);
  const [position, setPosition] = useState(currentSettings!.position);
  const [feed, setFeed] = useState(currentSettings!.feed);

  const [section, setSection] = useState("theme");

  const submitSettings = () => {
    setSettings((settings: any) => {
      const newSettings = {
        ...settings,
        theme,
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
    <motion.div
      initial={{ scale: 0.5, backgroundColor: theme.secondary }}
      animate={{ scale: 1 }}
      className="relative grid w-full h-full grid-cols-1 grid-rows-6 shadow-2xl rounded-xl"
    >
      <div className="flex items-center justify-between row-span-1 px-8">
        <Nav tabs={sections} theme={theme} tab={section} setTab={setSection} />
        <div className="flex flex-col items-center gap-8">
          <motion.button
            initial={{
              backgroundColor: "transparent",
              borderColor: theme.primary,
              color: theme.text,
              borderRadius: "2rem",
              scale: 0,
            }}
            animate={{
              backgroundColor: theme.primary,
              borderColor: theme.primary,
              color: theme.text,
              scale: 1,
            }}
            whileHover={{ borderRadius: "1.5rem" }}
            whileTap={{ borderRadius: "2rem", scale: 0.95 }}
            className="w-full p-4 px-6 text-lg font-bold uppercase border"
            onClick={submitSettings}
          >
            Save Settings
          </motion.button>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full row-span-5 p-4 overflow-scroll">
        {section === "theme" && <Theme theme={theme} setTheme={SetTheme} />}
        {section === "favorites" && (
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        )}
        {section === "memes" && <Memes memes={memes} setMemes={setMemes} />}
        {section === "location" && (
          <Location position={position} setPosition={setPosition} />
        )}
        {section === "feed" && <Feed feed={feed} setFeed={setFeed} />}
      </div>
    </motion.div>
  );
};

export default Settings;
