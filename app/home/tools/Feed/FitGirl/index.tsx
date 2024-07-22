import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";

interface PostData {
  title: string;
  image: string;
  info: Record<string, string>;
  // description: string;
  previewImages: string[];
  createdAt: string;
}

const JSON_URL =
  "https://raw.githubusercontent.com/MohamedBechirMejri/fitgirl-scraper/main/scraped_data.json";

export default function FitGirl() {
  const [posts, setPosts] = useState<[string, PostData][]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetch(JSON_URL).then(res => res.json());
      setPosts(Object.entries(data));
    })();
  }, []);

  console.log(posts);

  return (
    <div className="flex h-full">
      <nav className="pb-28 pt-2 p-6 h-full shrink-0 overflow-scroll noscroll"></nav>
      <div className="h-full w-full">
        <div className="flex flex-col gap-2 h-max pb-[8rem]">
          {posts.length ? (
            <Virtuoso
              style={{ height: 400 }}
              data={posts}
              itemContent={(_, [id, post]) => (
                <div
                  key={id}
                  className="flex items-start gap-4 p-4 font-bold rounded-2xl relative overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.title + "background"}
                    className="h-full rounded overflow-hidden shrink-0 absolute top-0 left-0 w-full blur-3xl opacity-25"
                  />
                  <img
                    src={post.image}
                    alt={post.title + "background"}
                    className="h-32 w-32 rounded-full object-cover shadow-xl border border-zinc-500"
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p>{post.info["Release Date"]}</p>
                    <p>{post.info["Genres"]}</p>
                    <p>{post.info["Languages"]}</p>
                    <p>{post.info["Size"]}</p>
                    <p>{post.info["Repack Size"]}</p>
                    <p>{post.info["Crack"]}</p>
                    <p>{post.info["Links"]}</p>
                  </div>
                </div>
              )}
            />
          ) : (
            <div className="flex items-center justify-center h-full pt-[12rem] animate-pulse">
              <span className="text-2xl font-bold text-center">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
