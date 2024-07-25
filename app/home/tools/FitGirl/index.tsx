import Select from "components/Select";
import { convertToBytes } from "lib/utils";
import { useEffect, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";

interface PostData {
  title: string;
  image: string;
  info: Record<string, string | string[]>;
  // description: string;
  previewImages: string[];
  createdAt: number | null;
}

const JSON_URL =
  "https://raw.githubusercontent.com/MohamedBechirMejri/fitgirl-scraper/main/scraped_data.json";

export default function FitGirl() {
  const [posts, setPosts] = useState<[string, PostData][]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "largest" | "A-Z">("latest");
  const [genre, setGenre] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const genres = useMemo(() => {
    const genres = [
      ...new Set(posts.flatMap(([_, post]) => post.info.genres || [])),
    ];

    return genres
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

  const sortPosts = (posts: [string, PostData][]) => {
    return posts.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (b[1].createdAt || 0) - (a[1].createdAt || 0);
        case "largest":
          const s1 = convertToBytes(a[1].info["Original Size"] as string);
          const s2 = convertToBytes(b[1].info["Original Size"] as string);

          return s2 - s1;
        case "A-Z":
          return a[1].title.localeCompare(b[1].title);
        default:
          return 0;
      }
    });
  };

  const filteredPosts = sortPosts(
    posts.filter(([_, post]) => {
      if (genre === "all") return true;
      return (post.info.genres ?? [[]]).includes(genre);
    })
  );

  const sortedPosts = sortPosts(filteredPosts).filter(([_, post]) => {
    if (!search) return true;
    return post.title.toLowerCase().includes(search.toLowerCase());
  });

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full pt-[12rem] animate-pulse">
        <span className="text-2xl font-bold text-center">Loading...</span>
      </div>
    );
  }

  if (sortedPosts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full pt-[12rem] animate-pulse">
        <span className="text-2xl font-bold text-center">No results found</span>
      </div>
    );
  }

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
            type="search"
            className="bg-zinc-700/50 px-4 rounded-2xl py-2 w-[28rem] max-w-full outline-none text-center shadow-xl focus:ring-2 ring-zinc-700 transition-all "
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
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
            data={sortedPosts}
            itemContent={(_, [id, post]) => <GameCard id={id} post={post} />}
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

const GameCard = ({ id, post }: { id: string; post: PostData }) => {
  return (
    <div className="flex items-start gap-4 p-4 font-bold rounded-2xl relative overflow-hidden mb-4">
      <img
        src={post.image}
        alt={post.title + "background"}
        className="h-full rounded overflow-hidden shrink-0 absolute top-0 left-0 w-full blur-3xl opacity-25 pointer-events-none"
      />
      <img
        src={post.image}
        alt={post.title + "background"}
        className="h-full w-[30rem] rounded-xl object-cover shadow-xl border border-zinc-500"
      />

      <div className="w-full flex flex-col gap-8 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold line-clamp-1">{post.title}</h1>
          <div className="flex w-full justify-between pr-4 items-start">
            <div>
              <p>{((post.info.genres ?? []) as string[]).join(", ")}</p>
              <p>{new Date(post.createdAt ?? 0).toDateString()}</p>
            </div>
            <button
              className="bg-zinc-500/50 p-2 px-4 rounded-2xl shadow-xl hover:bg-zinc-500/75 transition-all"
              onClick={() =>
                window.open(`https://fitgirl-repacks.site/${id}`, "_blank")
              }
            >
              See Post
            </button>
          </div>
          <div>
            <p>Original Size: {post.info["Original Size"]}</p>
            <p>Repack Size: {post.info["Repack Size"]}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 w-full gap-4">
          {post.previewImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={post.title + "preview" + i}
              className="w-[20rem] h-full rounded-xl object-cover shadow-xl border border-zinc-500 shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
