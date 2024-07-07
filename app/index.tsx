import { useOverlayStore, useSettingsStore } from "lib/stores";
import Home from "./home";
import Overlay from "./overlay";
import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect } from "react";
import { getDefaults } from "lib/defaultsSettings";
import { AnimatePresence } from "framer-motion";

function App() {
  const { overlay } = useOverlayStore();
  const { settings, setSettings } = useSettingsStore();

  useEffect(() => {
    const localSettings = getLocalData("settings");

    if (localSettings) setSettings(localSettings);
    else {
      const setDefualtSettings = async () => {
        const defaultSettings = await getDefaults();
        setSettings(defaultSettings);
        setLocalData("settings", defaultSettings);
      };
      setDefualtSettings();
    }
  }, []);

  return (
    <div className="relative h-screen max-h-screen overflow-hidden home">
      <AnimatePresence>{overlay && <Overlay />}</AnimatePresence>
      {settings && <Home />}
    </div>
  );
}

export default App;
