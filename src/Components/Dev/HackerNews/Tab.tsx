import React, { useTransition } from "react";
import getStories from "../../../Utils/apis";

const Tab = ({ currentTab }: { currentTab: string }) => {
  const [stories, setStories] = React.useState<any[]>([]);
  const [url, setUrl] = React.useState(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const [isloading, setIsLoading] = React.useState(false);
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

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const stories = await getStories(url);
      stories && setStories(stories);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div className="h-full overflow-y-scroll">
      {isloading
        ? "l..."
        : stories.map(story => {
            return (
              <a href={story.url} key={story.id}>
                <span>{story.title}</span>
                <span>By: {story.by}</span>
                <span>Score: {story.score}</span>
                <span>Time: {story.time}</span>
              </a>
            );
          })}
    </div>
  );
};

export default Tab;
