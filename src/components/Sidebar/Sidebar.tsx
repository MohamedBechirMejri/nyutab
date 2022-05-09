import React from "react";

const Sidebar = () => {
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
      name: "Entertainment",
      link: "entertainment",
    },
    {
      name: "Developers",
      link: "developers",
    },
    {
      name: "Piracy",
      link: "piracy",
    },
    {
      name: "News",
      link: "news",
    },
  ];
  return (
    <div className="w-full h-full max-w-full py-3 dark:text-white">
      <h1 className="w-full p-4 text-xl font-bold text-center bg-slate-800">
        nyutab
      </h1>
      <nav className="flex flex-col justify-between">
        <ul>
          {navItems.map(item => (
            <li
              key={item.name}
              className="flex items-center justify-center w-full h-full p-4 font-medium transition-all rounded-lg cursor-pointer hover:bg-slate-700"
            >
              {item.name}
            </li>
          ))}
        </ul>
        <ul>
          <li></li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
