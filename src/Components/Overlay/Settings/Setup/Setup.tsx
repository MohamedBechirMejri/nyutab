import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FAVORITES, MEMES, THEMES } from "../../../../lib/defaultsSettings";
import Theme from "../Theme";
import Nav from "./Nav";
import Favorites from "../Favorites";
import { saveSettings } from "../../../../lib/storageUtils";
import { getLocation } from "../../../../lib/locationUtils";
import Greeting from "./Greeting";

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
  const [section, setSection] = useState(0);
  const [position, setPosition] = useState<any>(null);

  const submitSettings = () => {
    if (location === null || position === null)
      return console.error(
        `failed to get position/location, Please submit the issue at https://github.com/mohamedbechirmejri/nyutab/issues`
      );
    setSettings((settings: any) => {
      const newSettings = {
        ...settings,
        theme,
        favorites,
        memes,
        location,
        position,
      };
      saveSettings(newSettings);
      return newSettings;
    });
    setOverlay("");
  };

  useEffect(() => {
    if (!position) return;
    (async () => {
      const location = await getLocation(position.latitude, position.longitude);
      setLocation(location);
    })();
  }, [position]);

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
      {section === 0 && <Greeting />}
      {section === 1 && <Theme theme={theme} setTheme={SetTheme} />}
      {section === 2 && (
        <Favorites favorites={favorites} setFavorites={setFavorites} />
      )}
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setPosition({ latitude, longitude });
          });
        }}
      >
        Get Location
      </button>
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
