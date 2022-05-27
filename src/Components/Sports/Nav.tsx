import React from "react";

const Nav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  return (
    <nav>
      <h1>Standings</h1>
      <ul>
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
