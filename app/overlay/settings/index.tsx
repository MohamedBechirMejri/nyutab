import Nav from "components/Nav";
import { m } from "framer-motion";
import { setLocalData } from "lib/storageUtils";
import { useSettingsStore } from "lib/stores";
import { useState } from "react";
import { SettingsTab } from "types/settings";
import Feed from "./feed";
import Memes from "./memes";

const sections = {
  feed: Feed,
  memes: Memes,
};

const Settings = () => {
  const [section, setSection] = useState<SettingsTab>("feed");

  const { settings } = useSettingsStore();

  const saveSettings = () => setLocalData("settings", settings);

  const Section = sections[section];

  return (
    <div className="relative grid w-full h-full grid-cols-1 grid-rows-6 shadow-2xl select-none rounded-xl bg-gradient-to-tr from-zinc-700 to-zinc-900">
      <div className="flex items-center justify-end row-span-1 px-8">
        <div className="grid grid-cols-[1fr,12rem] gap-8 pl-24">
          <Nav tabs={Object.keys(sections)} tab={section} setTab={setSection} />
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
              backgroundImage:
                "linear-gradient(315deg, #e84899 0%, #f9d423 74%)",
            }}
            whileTap={{ borderRadius: "2rem" }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="p-4 px-6 m-auto text-lg font-bold uppercase h-max w-max"
            onClick={saveSettings}
          >
            Save Settings
          </m.button>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full row-span-5 p-4 overflow-scroll">
        <Section />
      </div>
    </div>
  );
};

export default Settings;
