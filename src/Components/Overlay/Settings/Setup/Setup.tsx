import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

import { saveLocalData, saveSettings } from "../../../../lib/storageUtils";
import { FAVORITES, MEMES, THEMES } from "../../../../lib/defaultsSettings";

import Greeting from "./Greeting";
import Location from "../Location";
import Theme from "../Theme";
import Nav from "./Nav";
import Favorites from "../Favorites";

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
        theme,
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

  useEffect(() => {
    saveLocalData("tasks", [
      {
        id: uniqid(),
        title: "",
        tasks: [
          {
            id: uniqid(),
            title: "",
            isCompleted: false,
            isFolded: false,
            subtasks: [
              {
                id: uniqid(),
                text: "",
                isCompleted: false,
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="h-full p-12">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5 }}
        className="relative flex flex-col items-center justify-center w-full h-full gap-32 pt-8 text-black bg-orange-200 shadow-2xl rounded-xl"
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
    </div>
  );
};

export default Setup;
