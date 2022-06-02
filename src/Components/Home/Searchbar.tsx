import React from "react";

const Searchbar = () => {
  return (
    <input
      type="text"
      placeholder="Search Google"
      className="w-full p-5 px-10 m-2 text-2xl font-bold text-center transition-all rounded-lg outline-none bg-slate-100 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:placeholder:text-white placeholder:text-slate-700 dark:hover:bg-slate-700"
    />
  );
};

export default Searchbar;
