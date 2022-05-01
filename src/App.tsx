import React from "react";
import Clock from "./components/Clock";
import FavoriteSites from "./components/FavoriteSites";
import FunFacts from "./components/FunFacts";
import PomodoroClock from "./components/PomodoroClock";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <Searchbar />
      <Clock />
      <PomodoroClock />
      <TodoList />
      <FavoriteSites />
      <FunFacts />
    </div>
  );
}

export default App;
