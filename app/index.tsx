import { useOverlayStore, useSettingsStore } from "lib/stores";
import Home from "./home";
import Overlay from "./overlay";
import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect } from "react";
import { getDefaults } from "lib/defaultsSettings";

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
    <div
      className="relative h-screen max-h-screen overflow-hidden bg-center bg-cover backdrop-brightness-50"
      style={{
        backgroundImage: "url(https://picsum.photos/1920/1080)",
        backgroundColor: "#00000055",
        color: "#ffffff",
        backgroundBlendMode: "multiply",
      }}
    >
      {overlay && <Overlay />}
      {settings && <Home />}
    </div>
  );
}

export default App;
