import { motion } from "framer-motion";
import React, { useContext } from "react";
import uniqid from "uniqid";
import { SettingsContext } from "../../../../lib/contexts";

const Reddit = () => {
  const settings = useContext(SettingsContext);

  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("https://www.reddit.com/hot.json")
      .then(response => response.json())
      .then(res => {
        setPosts(res.data.children);
      });
  }, []);

  return (
    <div className="grid gap-2 p-1 overflow-y-scroll [grid-area:1/1/7/3] w-full h-full noscroll font-[FiraCode] font-bold text-white py-8">
      {posts.map((post, i) =>
        post.data.stickied ? null : (
          <motion.div
            key={uniqid()}
            initial={{ backgroundColor: "rgb(15 23 42)" }}
            whileHover={{
              backgroundColor: "rgb(15 23 42)",
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
            }}
            className="flex flex-col p-2 transition-all duration-[400ms] rounded hover:backdrop-blur-xl active:scale-95 hover:shadow-xl w-[min(48rem,98vw)] mx-auto"
          >
            <a
              href={post.data.url}
              key={post.data.id}
              className="flex flex-col"
              target={"_blank"}
            >
              <h2 className="">{post.data.title}</h2>
              {post.data.url &&
                /\.png|\.jpg|\.gif|\.webp/.test(post.data.url) && (
                  <img src={post.data.url} />
                )}
              <p className="text-blue-700">
                Posted By:
                <span className="text-green-700"> {post.data.author}</span>
              </p>
              <p className="text-gray-500">
                Reddit Score: <span className="">{post.data.score}</span>
              </p>
            </a>
            <a
              href={"https://reddit.com" + post.data.permalink}
              className="text-orange-700 underline"
              target={"_blank"}
            >
              Link to Comments
            </a>
          </motion.div>
        )
      )}
    </div>
  );
};

export default Reddit;
