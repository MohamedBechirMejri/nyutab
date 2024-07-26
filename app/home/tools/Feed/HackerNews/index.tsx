import React from "react";
import Tab from "./Tab";
import Nav from "components/Nav";

const HackerNews = () => {
  const [currentTab, setCurrentTab] = React.useState("top");
  return (
    <div className="w-full h-full pt-2 pb-8 overflow-y-scroll noscroll font-[FiraCode]">
      <div className="max-w-4xl pb-8 mx-auto">
        <Nav
          tabs={["top", "new", "show", "ask", "jobs"]}
          tab={currentTab}
          setTab={setCurrentTab}
          className="bg-black/20 rounded-2xl backdrop-blur-3xl overflow-hidden py-0 px-0 gap-0 max-w-[90%] mx-auto mb-4"
          btnClass="rounded-0 font-normal text-sm"
        />
        <Tab currentTab={currentTab} />
      </div>
    </div>
  );
};

export default HackerNews;
