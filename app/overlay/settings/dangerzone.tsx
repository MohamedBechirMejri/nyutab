import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { useState } from "react";

const DangerZone = () => {
  const { settings, setSettings } = useSettingsStore();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 size-full"
    >
      <h1 className="text-2xl font-bold select-none">Danger Zone</h1>

      <div className="flex gap-4 font-bold w-full items-center justify-between">
        <h2>Clear Prayer Times</h2>
        <button
          className="text-white bg-rose-500 p-2 px-4 rounded-full hover:bg-rose-400 transition-all duration-300"
          onClick={() => {
            localStorage.removeItem("prayerTimes");
          }}
        >
          Clear
        </button>
      </div>
    </m.div>
  );
};

export default DangerZone;
