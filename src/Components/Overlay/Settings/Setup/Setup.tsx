import { motion } from "framer-motion";
import { useState } from "react";
import { FAVORITES, MEMES, THEMES } from "../../../../lib/defaultsSettings";
import Theme from "../Theme";
import Nav from "./Nav";
import Favorites from "../Favorites";
import { saveSettings } from "../../../../lib/storageUtils";
import Greeting from "./Greeting";
import Location from "../Location";

const Setup = ({
  setSettings,
  setOverlay,
}: {
  setSettings: any;
  setOverlay: any;
}) => {
  const maxSection = 3;

  const [favorites, setFavorites] = useState(FAVORITES);
  const [theme, SetTheme] = useState(THEMES[0]);
  const [memes, SetMemes] = useState(MEMES);
  const [section, setSection] = useState(0);
  const [position, setPosition] = useState<any>(null);

  const submitSettings = () => {
    if (position === null)
      return console.error(
        `failed to get position/location, Please submit the issue at https://github.com/mohamedbechirmejri/nyutab/issues`
      );
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
    setOverlay("");
  };

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        backgroundColor: theme.secondary,
        color: theme.text,
      }}
      transition={{
        delay: 0.5,
        backgroundColor: { delay: 0 },
        color: { delay: 0 },
      }}
      className="w-full flex justify-center items-center h-full flex-col gap-32 pt-8 rounded-xl shadow-2xl relative"
    >
      {section === 0 && <Greeting />}
      {section === 1 && <Theme theme={theme} setTheme={SetTheme} />}
      {section === 2 && (
        <Favorites favorites={favorites} setFavorites={setFavorites} />
      )}
      {section === 3 && (
        <Location position={position} setPosition={setPosition} />
      )}

      <Nav
        section={section}
        setSection={setSection}
        maxSection={maxSection}
        submitSettings={submitSettings}
      />
    </motion.div>
  );
};

export default Setup;
