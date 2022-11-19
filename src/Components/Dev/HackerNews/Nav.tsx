import React, { useContext } from "react";
import { SettingsContext } from "../../../lib/contexts";

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
    <ul className="grid items-center justify-between w-full grid-cols-5 grid-rows-1 noscroll">
      {tabs.map(tab => (
        <li
          key={tab}
          className="p-3 font-bold text-center transition-all rounded-lg"
          style={{
            backgroundColor:
              currentTab === tab && settings
                ? settings?.theme.text + 55
                : "transparent",
            color:
              currentTab !== tab
                ? settings?.theme.text
                : settings?.theme.primary,
          }}
        >
          <button className="capitalize" onClick={() => setCurrentTab(tab)}>
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
