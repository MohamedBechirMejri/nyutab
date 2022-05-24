import React from "react";
import getStories from "../../../Utils/apis";
import convertTimestamp from "../../../Utils/convertTimeStamp";
import Loading from "../../Misc/Loading/Loading";

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
    <div className="flex flex-col h-full gap-2 p-2">
      {isloading ? (
        <Loading />
      ) : (
        stories.map(story => {
          return (
            <a
              href={story.url}
              key={story.id}
              className="flex flex-col p-2 transition-all rounded hover:bg-slate-700"
            >
              <span className="w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
                {story.title}
              </span>
              <span className="text-green-300">By: {story.by}</span>
              <span className="text-orange-300">Score: {story.score}</span>
              <span className="text-gray-300">
                Time: {convertTimestamp(story.time)}
              </span>
            </a>
          );
        })
      )}
    </div>
  );
};

export default Tab;
