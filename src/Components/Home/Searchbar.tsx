import React from "react";

const Searchbar = () => {
  return (
    <input
      type="text"
      placeholder="Search Google"
      className="bg-[#C4C4C4] dark:bg-slate-800 dark:text-white dark:placeholder:text-white px-10 p-5 m-2 rounded-lg text-center placeholder:text-black font-bold text-2xl transition-all outline-none w-full hover:bg-slate-700"
    />
  );
};

export default Searchbar;
