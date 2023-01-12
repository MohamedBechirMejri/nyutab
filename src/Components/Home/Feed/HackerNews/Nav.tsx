import React, { useContext } from "react";
import { SettingsContext } from "../../../../lib/contexts";

const Nav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  const settings = useContext(SettingsContext);
  const tabs = ["top", "new", "show", "ask", "jobs"];

  return (
    <ul className="grid items-center justify-between w-full grid-cols-5 grid-rows-1 gap-1 p-2 noscroll">
      {tabs.map(tab => (
        <li
          key={tab}
          className="p-3 font-bold text-center capitalize transition-all duration-500 rounded-lg cursor-pointer select-none hover:backdrop-blur-xl hover:ring-1 ring-current"
          style={{
            color: currentTab !== tab ? settings?.theme.text : "#4285f4",
          }}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default Nav;
