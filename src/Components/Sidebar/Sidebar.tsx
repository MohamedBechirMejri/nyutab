import React from "react";

const Sidebar = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const navItems = [
    {
      name: "Home",
      link: "home",
    },
    {
      name: "Productivity",
      link: "productivity",
    },
    {
      name: "Dev",
      link: "dev",
    },
    {
      name: "Entertainment",
      link: "entertainment",
    },
    {
      name: "Sports",
      link: "sports",
    },

    // {
    //   name: "Piracy",
    //   link: "piracy",
    // },
    {
      name: "News",
      link: "news",
    },
  ];
  const navItems2 = [
    {
      name: "Settings",
      link: "settings",
    },
  ];
  return (
    <div className="flex flex-col justify-between w-full h-full max-w-full py-3 dark:text-white ">
      <div>
        {" "}
        <h1 className="w-full p-4 text-xl font-bold text-center ">nyutab (WIP)</h1>
        <nav className="flex flex-col">
          <ul>
            {navItems.map(item => (
              <li
                key={item.name}
                className="flex items-center justify-center w-full p-4 font-medium transition-all rounded-lg cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100"
                onClick={() => setCurrentPage(item.link)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col justify-center gap-4 py-2">
        <nav>
          <ul>
            {navItems2.map(item => (
              <li
                key={item.name}
                className="flex items-center justify-center w-full p-4 font-medium transition-all rounded-lg cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-100"
                onClick={() => setCurrentPage(item.link)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        <footer className="text-xs text-center text-gray-500">
          <p>
            Created With <span className="text-red-500">&hearts;</span> by{" "}
          </p>
          <a
            href="https://MohamedBechirMejri.dev"
            className="transition-all text-zinc-300 hover:underline dark:hover:text-zinc-100 hover:text-zinc-500"
          >
            Mohamed Bechir Mejri
          </a>
          <hr className="m-2 border-gray-500" />
          <a
            href="https://github.com/MohamedBechirMejri/nyutab"
            className="hover:underline hover:text-gray-400"
          >
            Version 0.5.0
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
