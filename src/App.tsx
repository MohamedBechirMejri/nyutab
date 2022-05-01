import React from "react";
import Clock from "./components/Clock";
import PomodoroClock from "./components/PomodoroClock";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <div className="App">
      <Searchbar />
      <Clock />
      <PomodoroClock />
    </div>
  );
}

export default App;
