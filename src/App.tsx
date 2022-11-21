import { useState, useEffect } from "react";
import Overlay from "./Components/Overlay/Overlay";
import Home from "./Components/Home/Home";
import { SettingsContext } from "./lib/contexts";
import { getSettings } from "./lib/storageUtils";
import type Settings from "./Types/Settings";
import { THEMES } from "./lib/defaultsSettings";

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
        className="h-screen max-h-screen p-2 overflow-hidden relative"
        style={{
          backgroundImage: "url(https://picsum.photos/1920/1080)",
          backgroundColor: settings
            ? settings.theme.primary
            : THEMES[0].primary,
          color: settings ? settings.theme.text : THEMES[0].text,
          backgroundBlendMode: "overlay",
        }}
      >
        {overlay && (
          <Overlay
            overlay={overlay}
            setOverlay={setOverlay}
            setSettings={setSettings}
          />
        )}
        <Home overlay={overlay} setOverlay={setOverlay} settings={settings}/>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
