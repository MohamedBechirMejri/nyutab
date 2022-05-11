import React from "react";

const Productivity = () => {
  return (
    <div className="grid grid-rows-[.5fr_5fr_1fr] grid-cols-[5fr_1fr] h-full w-full justify-items-center items-center justify-center gap-2 ">
      <div></div>
      <div></div>
      <div className="grid grid-rows-[.5fr_5fr] h-full w-full">
        <div></div>
        <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-center text-white"></div>
      </div>
      <div className="grid grid-rows-[.5fr_5fr] h-full w-full">
        <div></div>
      </div>
      <div className="grid items-center justify-center w-full h-full grid-cols-2 gap-2 justify-items-center">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Productivity;
