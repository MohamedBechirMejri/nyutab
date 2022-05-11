import React from "react";
import PomodoroClock from "./PomodoroClock";
import TodoList from "./TodoList";

const Productivity = () => {
  return (
    <div className="grid grid-rows-[1fr_1fr] grid-cols-[5fr_2fr] h-full w-full justify-items-center items-center justify-center gap-2 ">
      <TodoList />
      <PomodoroClock />
    </div>
  );
};

export default Productivity;
