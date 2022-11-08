import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FAVORITES } from "../../../lib/defaultsSettings";
import { saveSettings } from "../../../lib/storageUtils";
import Favorites from "./Favorites";
import Theme from "./Theme";
import { SettingsContext } from "../../../lib/contexts";
import Memes from "./Memes";

const Settings = ({
  setSettings,
  setOverlay,
}: {
  setSettings: any;
  setOverlay: any;
}) => {
  const sections = ["theme", "favorites", "memes"];

  const currentSettings = useContext(SettingsContext);

  const [favorites, setFavorites] = useState(FAVORITES);
  const [theme, SetTheme] = useState(currentSettings!.theme);
  const [section, setSection] = useState("theme");

  const submitSettings = () => {
    setSettings((settings: any) => {
      const newSettings = {
        ...settings,
        theme,
        favorites,
      };
      saveSettings(newSettings);
      return newSettings;
    });
    setSection("theme");
    setOverlay("");
  };

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full grid grid-cols-6 grid-rows-1 h-full bg-slate-600 rounded-xl shadow-2xl relative"
    >
      <div className="col-span-1 flex flex-col justify-between items-center py-8">
        <div className="flex flex-col items-center gap-8">
          {sections.map(s => (
            <button
              className={`uppercase border w-full p-4 px-6 rounded-lg border-slate-700 ${
                section === s && "bg-slate-700"
              } transition-all active:scale-95 active:-rotate-[2deg] `}
              onClick={() => setSection(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-8">
          <button
            className={`uppercase border w-full p-4 px-6 rounded-lg border-slate-700 transition-all active:scale-95 active:-rotate-[2deg] `}
            onClick={submitSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
      <div className="col-span-5 flex items-center p-4 justify-center w-full overflow-scroll relative">
        {section === "theme" && <Theme theme={theme} setTheme={SetTheme} />}
        {section === "favorites" && (
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        )}
        {section === "memes" && <Memes />}
      </div>
    </motion.div>
  );
};

export default Settings;
