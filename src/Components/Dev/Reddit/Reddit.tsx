import React, { useContext } from "react";
import uniqid from "uniqid";
import { SettingsContext } from "../../../lib/contexts";

const Reddit = () => {
  const settings = useContext(SettingsContext);

  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("https://www.reddit.com/r/javascript/hot.json")
      .then(response => response.json())
      .then(data => {
        setPosts(data.data.children);
      });
  }, []);

  return (
    <div
      className="flex flex-col gap-2 p-1 overflow-y-scroll [grid-area:1/1/7/3] w-full h-full noscroll"
      style={{
        color: settings?.theme.text,
      }}
    >
      <a
        href="https://www.reddit.com/r/javascript"
        className="w-full p-2 text-center transition-all hover:underline"
      >
        Popular Posts on /r/javascript
      </a>
      {posts.map(post =>
        post.data.stickied ? null : (
          <div
            key={uniqid()}
            className="flex flex-col p-2 transition-all rounded hover:backdrop-blur-xl active:scale-95 hover:ring-1 ring-current hover:shadow-xl duration-500 "
          >
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
        )
      )}
    </div>
  );
};

export default Reddit;
