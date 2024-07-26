import Nav from "components/Nav";
import { m } from "framer-motion";
import { setLocalData } from "lib/storageUtils";
import { useOverlayStore, useSettingsStore } from "lib/stores";
import { useState } from "react";
import { SettingsTab } from "types/settings";
import Feed from "./feed";
import Memes from "./memes";
import Favorites from "./favorites";

const sections = {
  feed: Feed,
  memes: Memes,
  favorites: Favorites,
};

const Settings = () => {
  const [section, setSection] = useState<SettingsTab>("feed");

  const { settings } = useSettingsStore();
  const { setOverlay } = useOverlayStore();

  const saveSettings = () => {
    setLocalData("settings", settings);
    setOverlay(null);
  };

  const Section = sections[section];

  return (
    <div className="fixed left-0 top-0 h-full w-[40%] bg-black/70 backdrop-blur-3xl grid grid-rows-[auto,minmax(0,1fr),auto] p-4">
      <div className="flex items-center justify-end row-span-1 px-8">
        <Nav tabs={Object.keys(sections)} tab={section} setTab={setSection} />
      </div>
      <div className="relative flex items-center justify-center w-full row-span-5 p-4 overflow-scroll">
        <Section />
      </div>{" "}
      <m.button
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
          backgroundImage: "linear-gradient(315deg, #e84899 0%, #f9d423 74%)",
        }}
        whileTap={{ borderRadius: "2rem" }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="p-4 px-6 m-auto text-lg font-bold uppercase h-max w-max"
        onClick={saveSettings}
      >
        Save Settings
      </m.button>
      <div className="text-white absolute top-1/2 left-1/2 -rotate-45 text-9xl -translate-x-1/2 -translate-y-1/2 font-extrabold opacity-20 pointer-events-none -z-10">
        WIP
      </div>
    </div>
  );
};

export default Settings;
