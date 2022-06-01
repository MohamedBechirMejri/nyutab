import React from "react";

const News = () => {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        setNews(data.news);
      });
  }, []);
  return (
    <div className="grid items-center justify-center w-full h-full grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] gap-2 justify-items-center "></div>
  );
};

export default News;
