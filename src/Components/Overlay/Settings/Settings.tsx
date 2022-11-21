import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { saveSettings } from "../../../lib/storageUtils";
import Favorites from "./Favorites";
import Theme from "./Theme";
import { SettingsContext } from "../../../lib/contexts";
import Memes from "./Memes";
import Location from "./Location";

const Settings = ({
  setSettings,
  setOverlay,
}: {
  setSettings: any;
  setOverlay: any;
}) => {
  const sections = ["theme", "favorites", "memes", "location"];

  const currentSettings = useContext(SettingsContext);

  const [favorites, setFavorites] = useState(currentSettings!.favorites);
  const [theme, SetTheme] = useState(currentSettings!.theme);
  const [memes, setMemes] = useState(currentSettings!.memes);
  const [position, setPosition] = useState(currentSettings!.position);

  const [section, setSection] = useState("theme");

  const submitSettings = () => {
    setSettings((settings: any) => {
      const newSettings = {
        ...settings,
        theme,
        favorites,
        memes,
        position,
      };
      saveSettings(newSettings);
      return newSettings;
    });
    setSection("theme");
    setOverlay("");
  };

  return (
    <motion.div
      style={{ backgroundColor: theme.secondary + "cc" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.5 }}
      className="relative grid w-full h-full grid-cols-6 grid-rows-1 shadow-2xl rounded-xl backdrop-blur-[5rem]"
    >
      <div className="flex flex-col items-center justify-between col-span-1 py-8">
        <div className="flex flex-col items-center gap-8">
          {sections.map(s => (
            <button
              key={s + "-"}
              className="w-full p-4 px-6 uppercase transition-all border rounded-lg shadow-lg active:scale-95 hover:ring-1 ring-current "
              style={{
                backgroundColor: section === s ? theme.primary : "transparent",
                borderColor: theme.primary,
                color: theme.text,
              }}
              onClick={() => setSection(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-8">
          <button
            className="w-full p-4 px-6 uppercase transition-all border rounded-lg active:scale-95 hover:ring-1 ring-current "
            style={{
              backgroundColor: theme.primary,
              color: theme.text,
            }}
            onClick={submitSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full col-span-5 p-4 overflow-scroll">
        {section === "theme" && <Theme theme={theme} setTheme={SetTheme} />}
        {section === "favorites" && (
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        )}
        {section === "memes" && <Memes memes={memes} setMemes={setMemes} />}
        {section === "location" && (
          <Location position={position} setPosition={setPosition} />
        )}
      </div>
    </motion.div>
  );
};

export default Settings;
