import React from "react";
import Clock from "./components/Clock";
import FavoriteSites from "./components/FavoriteSites";
import FunFacts from "./components/FunFacts";
import PomodoroClock from "./components/PomodoroClock";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="grid items-center justify-center max-h-screen h-screen grid-cols-[1fr_5.25fr_.75fr] grid-rows-[1fr_5fr_2fr] gap-2 p-4 justify-items-center App dark:bg-slate-900">
      <div></div>
      <Searchbar />
      <Clock />
      <div></div>
      <FavoriteSites />
      <PomodoroClock />
      <div></div>
      <TodoList /> <FunFacts />
    </div>
  );
}

export default App;
