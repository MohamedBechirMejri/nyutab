import { motion } from "framer-motion";
import { useState } from "react";

import { saveLocalData, saveSettings } from "../../../../lib/storageUtils";
import { FAVORITES, MEMES } from "../../../../lib/defaultsSettings";

import Greeting from "./Greeting";
import Location from "../Location";
import Nav from "./Nav";
import Favorites from "../Favorites";

const Setup = ({
  setSettings,
  setOverlay,
}: {
  setSettings: any;
  setOverlay: any;
}) => {
  const maxSection = 2;

  const [favorites, setFavorites] = useState(FAVORITES);
  const [memes, SetMemes] = useState(MEMES);
  const [section, setSection] = useState(0);
  const [position, setPosition] = useState<any>(null);
  const [feed, setFeed] = useState<any>({
    rss: {
      sources: [
        {
          name: "google news",
          url: "https://news.google.com/rss",
          isEnabled: true,
        },
      ],
    },
  });

  const submitSettings = () => {
    if (position === null)
      return console.error(
        `failed to get position/location, Please submit the issue at https://github.com/mohamedbechirmejri/nyutab/issues`
      );
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
    setOverlay("");
  };

  return (
    <div className="h-full p-12">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5 }}
        className="relative flex flex-col items-center justify-center w-full h-full gap-32 pt-8 text-black bg-orange-200 shadow-2xl rounded-xl"
      >
        {section === 0 && <Greeting />}
        {section === 1 && (
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        )}
        {section === 2 && (
          <Location position={position} setPosition={setPosition} />
        )}

        <Nav
          section={section}
          setSection={setSection}
          maxSection={maxSection}
          submitSettings={submitSettings}
        />
      </motion.div>
    </div>
  );
};

export default Setup;
