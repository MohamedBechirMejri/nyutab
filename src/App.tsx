import React from "react";
import Clock from "./components/Clock";
import FavoriteSites from "./components/FavoriteSites";
import FunFacts from "./components/FunFacts";
import PomodoroClock from "./components/PomodoroClock";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="grid items-center justify-center min-h-screen grid-cols-3 grid-rows-3 gap-2 px-4 justify-items-center App dark:bg-slate-900">
      <Searchbar />
      <Clock />
      <FunFacts />
      <FavoriteSites />
      <PomodoroClock />
      <TodoList />
    </div>
  );
}

export default App;
