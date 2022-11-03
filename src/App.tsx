import { useState } from "react";
import Overlay from "./Components/Overlay";
import Home from "./Components/Home/Home";

function App() {
  const [overlay, setOverlay] = useState("");

  return (
    <div className="h-screen max-h-screen p-2 overflow-hidden relative dark:bg-slate-900 dark:text-white">
      {overlay && <Overlay overlay={overlay} setOverlay={setOverlay} />}

      <Home overlay={overlay} setOverlay={setOverlay} />
    </div>
  );
}

export default App;
