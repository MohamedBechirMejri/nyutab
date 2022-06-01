import React, { useState } from "react";
import Entertainment from "./Components/Entertainment/Entertainment";
import Home from "./Components/Home/Home";
import Productivity from "./Components/Productivity/Productivity";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dev from "./Components/Dev/Dev";
import Sports from "./Components/Sports/Sports";
import News from "./Components/News/News";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="grid items-center justify-center h-screen max-h-screen grid-cols-[.5fr_5fr] grid-rows-1 gap-2 justify-items-center App dark:bg-slate-900 overflow-hidden dark:text-white">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <Home />}
      {currentPage === "productivity" && <Productivity />}{" "}
      {currentPage === "dev" && <Dev />}
      {currentPage === "entertainment" && <Entertainment />}{" "}
      {currentPage === "sports" && <Sports />}
      {currentPage === "piracy" && <div>piracy</div>}
      {currentPage === "news" && <News />}
      {currentPage === "settings" && <div>settings</div>}
    </div>
  );
}

export default App;
