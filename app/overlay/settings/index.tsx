import { setLocalData } from "lib/storageUtils";
import { useOverlayStore, useSettingsStore } from "lib/stores";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { SettingsTab } from "types/settings";
import Favorites from "./favorites";
import Feed from "./feed";
import Memes from "./memes";
import DangerZone from "./dangerzone";

const sectionsTop = {
  feed: Feed,
  memes: Memes,
  favorites: Favorites,
};

const sectionsBottom = {
  "danger zone": DangerZone,
};

const sections = Object.assign({}, sectionsTop, sectionsBottom) as Record<
  SettingsTab,
  React.FC
>;

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
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-500/90 backdrop-blur-3xl grid grid-cols-[auto,minmax(0,1fr)] p-8 h-3/4 w-3/4 rounded-2xl overflow-hidden grid-rows-1">
      <div className="flex items-center flex-col gap-8 pr-8 border-r border-zinc-500 h-full">
        <h1 className="text-2xl font-bold">Settings</h1>

        <nav className="flex flex-col gap-4 h-full">
          {Object.keys(sectionsTop).map(s => (
            <button
              key={s}
              className={`${
                section === s
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-white/30 text-zinc-200"
              } p-1 px-8 rounded-2xl capitalize transition-all duration-300`}
              onClick={() => setSection(s as SettingsTab)}
            >
              {s}
            </button>
          ))}
        </nav>

        <nav className="flex flex-col gap-4">
          {Object.keys(sectionsBottom).map(s => {
            const isActive = section === s;
            const isDangerZone = s === "danger zone";

            const activeBg = isDangerZone ? "bg-rose-500" : "bg-blue-500";
            const activeText = isDangerZone ? " text-white" : " text-blue-500";
            const inactiveText = isDangerZone
              ? " text-rose-500"
              : " text-zinc-200";

            return (
              <button
                key={s}
                className={`${
                  isActive
                    ? activeBg + activeText + " font-bold"
                    : "hover:bg-white/30 " + inactiveText
                }
                p-1 px-8 rounded-2xl capitalize transition-all duration-300`}
                onClick={() => setSection(s as SettingsTab)}
              >
                {s}
              </button>
            );
          })}
        </nav>
      </div>
      <button
        className="absolute top-4 right-4 text-3xl"
        onClick={() => setOverlay(null)}
      >
        <VscClose />
      </button>

      <div className="h-full w-full grid grid-rows-[minmax(0,1fr),auto]">
        <div className="relative flex items-center justify-center w-full row-span-5 p-4 overflow-scroll">
          <Section />
        </div>

        <div className="flex items-center justify-end w-full gap-4">
          <button
            className="p-1 px-8 font-bold bg-blue-400/50 rounded-2xl transition-all duration-300 hover:bg-blue-400/75"
            onClick={saveSettings}
          >
            Save
          </button>
          <button
            className="p-1 px-8 font-bold bg-white/50 rounded-2xl transition-all duration-300 hover:bg-white/75"
            onClick={() => setOverlay(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
