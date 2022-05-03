import React from "react";
import Clock from "./components/Clock";
import FavoriteSites from "./components/FavoriteSites";
import FunFacts from "./components/FunFacts";
import PomodoroClock from "./components/PomodoroClock";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 App">
      <div className="flex items-center justify-center gap-4">
        <Searchbar />
        <Clock />
      </div>
      <div className="flex items-center justify-center gap-4">
        <FunFacts />
        <FavoriteSites />
      </div>
      <div className="flex items-center justify-center gap-4">
        <PomodoroClock />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
