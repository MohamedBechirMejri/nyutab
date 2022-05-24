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
      <ul className="flex justify-center gap-2">
        <li
          className={`${
            currentTab === "top" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <button onClick={() => setCurrentTab("top")}>Top</button>
        </li>
        <li
          className={`${
            currentTab === "new" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <button onClick={() => setCurrentTab("new")}>New</button>
        </li>
        <li
          className={`${
            currentTab === "show" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <button onClick={() => setCurrentTab("show")}>Show</button>
        </li>
        <li
          className={`${
            currentTab === "ask" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <button onClick={() => setCurrentTab("ask")}>Ask</button>
        </li>
        <li
          className={`${
            currentTab === "jobs" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <button onClick={() => setCurrentTab("jobs")}>Jobs</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
