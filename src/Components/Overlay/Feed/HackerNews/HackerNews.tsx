import React from "react";
import Nav from "../../../Misc/Nav";
import Tab from "./Tab";

const HackerNews = () => {
  const [currentTab, setCurrentTab] = React.useState("top");
  return (
    <div className="w-full h-full pt-2 pb-8 overflow-y-scroll noscroll font-[FiraCode]">
      <div className="max-w-4xl pb-8 mx-auto">
        <Nav
          tabs={["top", "new", "show", "ask", "jobs"]}
          theme={{
            primary: "#ff6600",
            text: "#ffffff",
          }}
          tab={currentTab}
          setTab={setCurrentTab}
        />
        <Tab currentTab={currentTab} />
      </div>
    </div>
  );
};

export default HackerNews;
