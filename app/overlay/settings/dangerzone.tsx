import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { BACKUP_KEYS } from "lib/backupUtils";
import { useState } from "react";

const DangerZone = () => {
  const { settings, setSettings } = useSettingsStore();
  const [message, setMessage] = useState<string | null>(null);

  const clearAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear ALL application data? This cannot be undone."
      )
    ) {
      for (const key of BACKUP_KEYS) {
        localStorage.removeItem(key);
      }
      setMessage("All data cleared. Please refresh the page.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

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
            setMessage("Prayer times cleared");
            setTimeout(() => setMessage(null), 3000);
          }}
        >
          Clear
        </button>
      </div>

      <div className="flex gap-4 font-bold w-full items-center justify-between">
        <h2>Clear All Data</h2>
        <button
          className="text-white bg-rose-700 p-2 px-4 rounded-full hover:bg-rose-600 transition-all duration-300"
          onClick={clearAllData}
        >
          Clear All Data
        </button>
      </div>

      {message && (
        <div className="mt-4 bg-green-500/80 text-white p-2 rounded-lg text-center">
          {message}
        </div>
      )}
    </m.div>
  );
};

export default DangerZone;
