import { useOverlayStore, useSettingsStore } from "lib/stores";
import Home from "./home";
import Overlay from "./overlay";
import { getLocalData } from "lib/storageUtils";
import { useEffect } from "react";

function App() {
  const { overlay, setOverlay } = useOverlayStore();
  const { setSettings } = useSettingsStore();

  const localSettings = getLocalData("settings");

  useEffect(() => {
    if (localSettings) setSettings(localSettings);
    else setOverlay("onboarding");
  }, [localSettings]);

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
      {overlay ? <Overlay /> : <Home />}
    </div>
  );
}

export default App;
