import React from "react";

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
      `https://newsa pi.org/v2/top-headlines?language=en&apiKey=
${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        setNews(data.articles);
      });
  }, []);

    

  return (
    <div className="grid items-start justify-start w-full h-full grid-cols-3 gap-1 p-6 overflow-y-scroll">
      {news.map((item: Article, i: number) => (
        <a
          href={item.url}
          className="grid w-full xl:grid-cols-3 xl:grid-rows-1 transition-all rounded dark:bg-slate-800 h-26 hover:scale-105 max-h-[390px] grid-cols-1 grid-rows-2"
          key={i}
        >
          <div className="flex flex-col [grid-area:2/1/3/2] xl:[grid-area:1/1/1/3] p-4 font-bold">
            <div className="flex justify-between w-full mb-2">
              <h2>{item.source.name}</h2> <h3>{item.author}</h3>
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
            className="rounded xl:[grid-area:1/3/1/4] [grid-area:1/1/2/2] object-cover w-full h-full"
          />
        </a>
      ))}
    </div>
  );
};

export default News;
