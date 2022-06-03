import React, { useState } from "react";
import BookmarksHelper from "./BookmarksHelper";

const Bookmarks = () => {
  //@ts-ignore
  const [bookmarks, setBookmarks] = useState([
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  dateAdded: 1616038448929,
                  id: "67",
                  index: 0,
                  parentId: "66",
                  title: "W3 Schools’ CSS tutorial",
                  url: "https://www.w3schools.com/css/",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  //   chrome.bookmarks.getTree().then(bookmarks => {
  //     setBookmarks(bookmarks);
  //     console.log(bookmarks);
  //   });

  return (
    <div className="w-full h-full p-4">
      <h1 className="w-full p-4 text-2xl font-medium text-center">Bookmarks</h1>
      <div className="w-full h-full p-4 overflow-scroll max-h-[55vh]">
        {
          //@ts-ignore
          bookmarks[0].children[0].children.map(bookmark => {
            //@ts-ignore
            return <BookmarksHelper key={bookmark.id} bookmark={bookmark} />;
          })
        }
      </div>
    </div>
  );
};

export default Bookmarks;
