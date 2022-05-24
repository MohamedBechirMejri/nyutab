import React from "react";

const Tab = ({ currentTab }: { currentTab: string }) => {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [url, setUrl] = React.useState(
    "https://hacker-news.firebaseio.com/v0/jobstories.json"
  );

  React.useEffect(() => {
    switch (currentTab) {
      case "top":
        setUrl("https://hacker-news.firebaseio.com/v0/topstories.json");
        break;
      case "new":
        setUrl("https://hacker-news.firebaseio.com/v0/newstories.json");
        break;
      case "ask":
        setUrl("https://hacker-news.firebaseio.com/v0/askstories.json");
        break;
      case "show":
        setUrl("https://hacker-news.firebaseio.com/v0/showstories.json");
        break;
      case "jobs":
        setUrl("https://hacker-news.firebaseio.com/v0/jobstories.json");
        break;
    }
  }, [currentTab]);

  return (
    <div className="h-full overflow-y-scroll">
      <div>
        {posts.map(post => {
          return (
            <a href={post.url} key={post.id}>
              {post.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Tab;
