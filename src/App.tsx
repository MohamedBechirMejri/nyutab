import React, { useState } from "react";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="grid items-center justify-center h-screen max-h-screen grid-cols-[.5fr_5fr] grid-rows-1 gap-2 justify-items-center App dark:bg-slate-900 overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <Home />}
    </div>
  );
}

export default App;
