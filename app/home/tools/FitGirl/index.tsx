import Select from "components/Select";
import { useEffect, useMemo, useState } from "react";
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
  const [sortBy, setSortBy] = useState<"latest" | "largest" | "A-Z">("latest");
  const [genre, setGenre] = useState<string>("all");

  const genres = useMemo(() => {
    const genres = new Set<string>();
    posts.forEach(([_, post]) => {
      (post.info["Genres/Tags"] ?? "").split(", ").forEach(genre => {
        genres.add(genre);
      });
    });

    return Array.from(genres)
      .filter(Boolean)
      .map(genre => ({
        id: genre,
        name: genre,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [posts]);

  useEffect(() => {
    (async () => {
      const data = await fetch(JSON_URL).then(res => res.json());
      setPosts(Object.entries(data));
    })();
  }, []);

  return (
    <div className="flex flex-col h-full bg-black/25 backdrop-blur-3xl w-full rounded-2xl overflow-hidden p-8 pt-4">
      <div className="pb-6 pt-0 flex justify-between items-end gap-4">
        <Select
          options={[
            { id: "latest", name: "Latest" },
            { id: "largest", name: "Largest" },
            { id: "A-Z", name: "A-Z" },
          ]}
          selected={sortBy}
          setSelected={sortBy =>
            setSortBy((sortBy as "latest" | "largest" | "A-Z") || "latest")
          }
          label="Sort by"
          noCreate
        />

        <div className="flex flex-col items-center">
          <h1 className="p-2 font-bold text-xl shrink-0 text-zinc-400">
            FitGirl Repacks
          </h1>
          <input
            type="text"
            name=""
            id=""
            className="bg-zinc-700/50 px-4 rounded-2xl py-2 w-[28rem] max-w-full outline-none text-center shadow-xl focus:ring-2 ring-zinc-700 transition-all "
            placeholder="Search..."
          />
        </div>

        <div className="flex gap-2 flex-col">
          <Select
            options={genres}
            selected={genre}
            setSelected={genre => setGenre(genre || "all")}
            label="Genre"
            noCreate
            canClear
          />
        </div>
      </div>
      <div className="flex flex-col h-full w-full gap-4">
        {posts.length ? (
          <Virtuoso
            className="noscroll"
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
  );
}
