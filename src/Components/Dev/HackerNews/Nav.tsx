import React from "react";

const Nav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  return (
    <ul className="grid items-center justify-between w-full grid-cols-5 grid-rows-1 noscroll">
      <li
        className={`${
          currentTab === "top"
            ? "text-blue-500"
            : "text-gray-500 hover:text-gray-400"
        } transition-all text-center font-bold  p-3 `}
      >
        <button onClick={() => setCurrentTab("top")}>Top</button>
      </li>
      <li
        className={`${
          currentTab === "new"
            ? "text-blue-500"
            : "text-gray-500 hover:text-gray-400"
        } transition-all text-center font-bold  p-3 `}
      >
        <button onClick={() => setCurrentTab("new")}>New</button>
      </li>
      <li
        className={`${
          currentTab === "show"
            ? "text-blue-500"
            : "text-gray-500 hover:text-gray-400"
        } transition-all text-center font-bold  p-3 `}
      >
        <button onClick={() => setCurrentTab("show")}>Show</button>
      </li>
      <li
        className={`${
          currentTab === "ask"
            ? "text-blue-500"
            : "text-gray-500 hover:text-gray-400"
        } transition-all text-center font-bold  p-3 `}
      >
        <button onClick={() => setCurrentTab("ask")}>Ask</button>
      </li>
      <li
        className={`${
          currentTab === "jobs"
            ? "text-blue-500"
            : "text-gray-500 hover:text-gray-400"
        } transition-all text-center font-bold  p-3 `}
      >
        <button onClick={() => setCurrentTab("jobs")}>Jobs</button>
      </li>
    </ul>
  );
};

export default Nav;
