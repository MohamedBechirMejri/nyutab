import React from "react";
import PomodoroClock from "./PomodoroClock";
import TodoList from "./TodoList";

const Productivity = () => {
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center ">
      <TodoList />
      <PomodoroClock />
    </div>
  );
};

export default Productivity;
