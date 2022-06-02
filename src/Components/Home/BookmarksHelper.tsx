import React from "react";

const BookmarksHelper = ({
  bookmark,
}: {
  bookmark: {
    children: React.ReactNode;
    id: number;
    title: string;
    url: string;
  };
}) => {
  return bookmark.children ? (
    <div key={bookmark.id} className="flex flex-col gap-2">
      <h1 className="text-lg font-bold text-center">{bookmark.title}</h1>

      {
        //@ts-ignore
        bookmark.children.map(child => (
          <BookmarksHelper bookmark={child} key={child.id} />
        ))
      }
    </div>
  ) : (
    <a
      href={bookmark.url}
      key={bookmark.id}
      className="flex items-center gap-2 p-1 transition-all rounded-lg dark:hover:bg-slate-800 hover:bg-slate-100 hover:underline"
    >
      <img
        src={"https://www.google.com/s2/favicons?domain=" + bookmark.url}
        alt=""
      />
      {/* <img
        src={
          "http://www.getfavicon.org/get.pl?url=" +
          new URL(bookmark.url).hostname
        }
        alt=""
        className="w-4 h-4"
      /> */}
      {bookmark.title}
    </a>
  );
};

export default BookmarksHelper;
