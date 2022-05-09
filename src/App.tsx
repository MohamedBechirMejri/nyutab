import React from "react";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="grid items-center justify-center h-screen max-h-screen grid-cols-[1fr_5fr] grid-rows-1 gap-2 p-4 justify-items-center App dark:bg-slate-900 overflow-hidden">
      <div></div>
      <Home />
    </div>
  );
}

export default App;
