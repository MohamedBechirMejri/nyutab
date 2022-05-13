import React, { useState } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([
    {
      title: "The Sun",
      url: "https://www.theguardian.com/world/2020/april/01/the-sun-is-not-a-star-the-sun-is-a-planet",
      type: "bookmark",
    },
    {
      title: "The Moon",
      type: "folder",
      children: [
        {
          title: "The Moon",
          url: "https://www.theguardian.com/world/2020/april/01/the-moon-is-not-a-star-the-moon-is-a-planet",
          type: "bookmark",
        },
        {
          title: "The Earth",
          type: "folder",
          children: [
            {
              title: "The Earth",
              url: "https://www.theguardian.com/world/2020/april/01/the-earth-is-not-a-star-the-earth-is-a-planet",
              type: "bookmark",
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="w-full h-full p-4">
      <h1 className="w-full p-4 text-2xl font-medium text-center">Bookmarks</h1>
      <ul className="w-full h-full p-4 overflow-scroll max-h-[55vh]"></ul>
    </div>
  );
};

export default Bookmarks;
