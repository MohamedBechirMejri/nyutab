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
      <h1 className="w-full ">Standings</h1>
      <ul className="grid w-full grid-cols-2 grid-rows-1 px-2">
        <li>
          <button onClick={() => setCurrentTab("driverstandings")}>
            Drivers
          </button>
        </li>
        <li>
          <button onClick={() => setCurrentTab("constructorstandings")}>
            Constructors
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
