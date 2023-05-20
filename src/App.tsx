import type Settings from "./Types/Settings";

import { useState, useEffect } from "react";

import { SettingsContext } from "./lib/contexts";
import { getSettings } from "./lib/storageUtils";

import Overlay from "./Components/Overlay";
import Home from "./Components/Home/Home";

function App() {
  const [overlay, setOverlay] = useState("");
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const settings = getSettings();

    if (settings) setSettings(JSON.parse(settings));
    else setOverlay("setup");
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <div
        className="relative h-screen max-h-screen overflow-hidden bg-center bg-cover backdrop-brightness-50"
        style={{
          backgroundImage: "url(https://picsum.photos/1920/1080)",
          backgroundColor: "#00000055",
          color: "#ffffff",
          backgroundBlendMode: "multiply",
        }}
      >
        {overlay ? (
          <Overlay
            overlay={overlay}
            setOverlay={setOverlay}
            setSettings={setSettings}
          />
        ) : (
          <Home setOverlay={setOverlay} />
        )}
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
