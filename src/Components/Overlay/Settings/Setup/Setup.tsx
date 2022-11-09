import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FAVORITES, MEMES, THEMES } from "../../../../lib/defaultsSettings";
import Theme from "../Theme";
import Nav from "./Nav";
import Favorites from "../Favorites";
import { saveSettings } from "../../../../lib/storageUtils";
import { getLocation } from "../../../../lib/locationUtils";

const Setup = ({
  setSettings,
  setOverlay,
}: {
  setSettings: any;
  setOverlay: any;
}) => {
  const maxSection = 2;

  const [favorites, setFavorites] = useState(FAVORITES);
  const [theme, SetTheme] = useState(THEMES[0]);
  const [memes, SetMemes] = useState(MEMES);
  const [location, setLocation] = useState<any>(null);
  const [section, setSection] = useState(1);

  const submitSettings = () => {
    if (!location)
      return console.error(
        `can't get location, Please submit and issue at https://github.com/mohamedbechirmejri/nyutab/issues`
      );
    setSettings((settings: any) => {
      const newSettings = {
        ...settings,
        theme,
        favorites,
        memes,
        location,
      };
      saveSettings(newSettings);
      return newSettings;
    });
    setOverlay("");
  };

  useEffect(() => {
    (async () => {
      const location = await getLocation();
      setLocation(location);
    })();
  }, []);

  return (
    <motion.div
      initial={{
        scaleY: 0,
      }}
      animate={{
        scaleY: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="w-full flex justify-center items-center h-full flex-col gap-32 pt-8 bg-slate-600 rounded-xl shadow-2xl relative"
    >
      {/* <h1 className="absolute top-8 left-8 text-xl">
        Hello, Let's setup your Homepage..
      </h1> */}
      {section === 1 && <Theme theme={theme} setTheme={SetTheme} />}
      {section === 2 && (
        <Favorites favorites={favorites} setFavorites={setFavorites} />
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
