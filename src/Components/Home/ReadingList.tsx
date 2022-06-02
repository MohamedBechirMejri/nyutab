import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import uniqid from "uniqid";

const ReadingList = () => {
  const [list, setList] = useState([
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
    {
      title: "The Sun",
      link: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
    },
    {
      title: "The Moon",
      link: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
    },
    {
      title: "The Earth",
      link: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
    },
  ]);
  // @ts-ignore
  const removeItem = item => {
    setList(list.filter(i => list.indexOf(i) !== list.indexOf(item)));
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="w-full p-4 text-2xl font-medium text-center">
        Reading List
      </h1>
      <ul className="w-full h-full p-4 overflow-scroll max-h-[55vh]">
        {list.map(item => (
          <li
            key={uniqid()}
            className="flex items-center justify-between gap-3 p-2 transition-all rounded-lg select-none group dark:hover:bg-slate-800 hover:bg-slate-300 "
          >
            <p
              onClick={() => {
                removeItem(item);
                window.open(item.link, "_blank");
              }}
              className="transition-all cursor-pointer hover:underline"
            >
              {item.title}
            </p>{" "}
            <MdOutlineClear
              onClick={() => {
                removeItem(item);
              }}
              className="invisible text-xl text-gray-500 transition-all rounded-full cursor-pointer hover:bg-white group-hover:visible hover:scale-105 hover:text-red-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
