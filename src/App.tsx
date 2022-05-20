import React, { useState } from "react";
import Entertainment from "./components/Entertainment/Entertainment";
import Home from "./components/Home/Home";
import Productivity from "./components/Productivity/Productivity";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="grid items-center justify-center h-screen max-h-screen grid-cols-[.5fr_5fr] grid-rows-1 gap-2 justify-items-center App dark:bg-slate-900 overflow-hidden dark:text-white">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <Home />}
      {currentPage === "productivity" && <Productivity />}
      {currentPage === "entertainment" && <Entertainment />}
      {currentPage === "developers" && <div>developers</div>}
      {currentPage === "piracy" && <div>piracy</div>}
      {currentPage === "news" && <div>news</div>}
      {currentPage === "settings" && <div>settings</div>}
    </div>
  );
}

export default App;
