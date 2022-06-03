import React from "react";
import Loading from "../Misc/Loading/Loading";

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const News = () => {
  const [news, setNews] = React.useState([] as Article[]);

  React.useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?language=en&apiKey=
${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        setNews(data.articles);
      });
  }, []);

  return !news ? (
    <Loading />
  ) : (
    <div className="grid items-start justify-start w-full h-full grid-cols-2 gap-4 p-8 overflow-y-scroll ">
      {news.map((item: Article, i: number) => (
        <a
          href={item.url}
          className="grid w-full h-full grid-cols-1 grid-rows-2 transition-all bg-white rounded shadow-lg xl:grid-cols-2 xl:grid-rows-1 dark:bg-slate-800 hover:scale-[1.01] ring ring-black dark:ring-white hover:bg-slate-100 dark:hover:bg-slate-700"
          key={i}
        >
          <div className="flex flex-col [grid-area:2/1/3/2] xl:[grid-area:1/1/1/2] p-4 font-bold h-full justify-between">
            <div className="flex justify-between w-full mb-2">
              <h2>{item.source.name}</h2>
            </div>
            <h3 className="mb-1 text-lg">{item.title}</h3>
            <p className="text-xs font-medium text-gray-300 overflow-ellipsis box ">
              {item.description}
            </p>

            <h3 className="mt-2 text-sm">
              {new Date(item.publishedAt).toUTCString()}
            </h3>
          </div>
          <img
            src={item.urlToImage!}
            alt={item.title}
            className="rounded xl:[grid-area:1/2/1/4] [grid-area:1/1/2/2] object-cover w-full h-full"
          />
        </a>
      ))}
    </div>
  );
};

export default News;
