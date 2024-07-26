import { useOverlayStore, useSettingsStore } from "lib/stores";
import Home from "./home";
import Overlay from "./overlay";
import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect } from "react";
import { getDefaults } from "lib/defaultsSettings";
import { AnimatePresence } from "framer-motion";
import { getUserLocation } from "lib/locationUtils";
import Settings from "types/settings";

function App() {
  const { overlay } = useOverlayStore();
  const { settings, setSettings } = useSettingsStore();

  useEffect(() => {
    const localSettings = getLocalData("settings");

    let settings = null as Settings | null;

    if (localSettings) settings = localSettings;
    else {
      const defaultSettings = getDefaults();
      settings = defaultSettings;
    }

    setSettings(settings);
    setLocalData("settings", settings);

    getUserLocation().then(({ latitude, longitude }) => {
      if (!settings) return console.log("No settings");

      const newSettings = {
        ...settings,
      };

      newSettings.position!.latitude = latitude;
      newSettings.position!.longitude = longitude;

      setSettings(newSettings);
      setLocalData("settings", newSettings);
    });
  }, []);

  return (
    <div className="relative h-screen max-h-screen overflow-hidden home overscroll-none">
      <AnimatePresence>{overlay && <Overlay />}</AnimatePresence>
      {settings && <Home />}
    </div>
  );
}

export default App;
