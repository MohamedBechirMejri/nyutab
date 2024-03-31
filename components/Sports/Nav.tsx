import React from "react";

const Nav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  return (
    <nav className="w-full p-2 font-bold text-center">
      <h1 className="w-full pt-3">Standings</h1>
      <ul className="grid w-full grid-cols-2 grid-rows-1 gap-4 px-8">
        <li
          className="p-2 m-2 font-medium transition-all rounded cursor-pointer"
          onClick={() => setCurrentTab("driverstandings")}
        >
          Drivers
        </li>
        <li
          className="p-2 m-2 font-medium transition-all rounded cursor-pointer"
          onClick={() => setCurrentTab("constructorstandings")}
        >
          Constructors
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
