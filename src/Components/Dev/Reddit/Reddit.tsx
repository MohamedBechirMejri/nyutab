import React from "react";

const Reddit = () => {
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("https://www.reddit.com/r/javascript/hot.json")
      .then(response => response.json())
      .then(data => {
        setPosts(data.data.children);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 p-1 overflow-y-scroll [grid-area:1/1/7/3] w-full h-full noscroll">
      <a
        href="https://www.reddit.com/r/javascript"
        className="w-full p-2 text-center transition-all hover:underline"
      >
        Popular Posts on /r/javascript
      </a>
      {posts.map(post => {
        if (post.data.stickied === true) {
          return null;
        }
        return (
          <div className="flex flex-col p-2 transition-all rounded dark:hover:bg-slate-700 hover:bg-slate-100">
            {" "}
            <a
              href={post.data.url}
              key={post.data.id}
              className="flex flex-col"
            >
              <h2 className="">{post.data.title}</h2>
              <p className="text-blue-300">
                Posted By:
                <span className="text-green-300"> {post.data.author}</span>
              </p>
              <p className="text-gray-300">
                Reddit Score: <span className="">{post.data.score}</span>
              </p>
            </a>{" "}
            <a
              href={"https://reddit.com" + post.data.permalink}
              className="text-orange-500 underline"
            >
              Link to Comments
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Reddit;
