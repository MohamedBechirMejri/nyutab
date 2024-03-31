import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import getStories from "../../../../../utils/apis";
import convertTimestamp from "../../../../../utils/convertTimeStamp";
import Loading from "../../../../../components/Loading/Loading";

const Tab = ({ currentTab }: { currentTab: string }) => {
  const [stories, setStories] = useState<any[]>([]);
  const [url, setUrl] = useState(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const url = `https://hacker-news.firebaseio.com/v0/${currentTab.replace(
      "jobs",
      "job"
    )}stories.json`;
    setUrl(url);
  }, [currentTab]);

  useEffect(() => {
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
        <div className="pt-24">
          <Loading />
        </div>
      ) : (
        stories.map((story, i) => {
          return (
            <motion.a
              href={story.url}
              initial={{
                opacity: 0,
                backgroundColor: "#1a202c",
                backdropFilter: "blur(10px)",
                borderRadius: "1rem",
              }}
              animate={{ opacity: 1 }}
              whileHover={{
                backgroundColor: "#1a202c",
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                borderRadius: "2rem",
              }}
              transition={{
                // @ts-ignore
                type: "spring",
                // @ts-ignore
                damping: 10,
                // @ts-ignore
                stiffness: 100,
                opacity: { delay: i * 0.05 },
              }}
              key={story.id}
              className="flex flex-col p-4"
              target={"_blank"}
            >
              <span className="w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
                {story.title}
              </span>
              <span className="text-green-300">By: {story.by}</span>
              <span className="text-orange-300">Score: {story.score}</span>
              <span className="text-gray-300">
                Time: {convertTimestamp(story.time)}
              </span>
            </motion.a>
          );
        })
      )}
    </div>
  );
};

export default Tab;
