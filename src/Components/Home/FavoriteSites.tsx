import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

const FavoriteSites = () => {
  const [sites, setSites] = React.useState([
    {
      id: 1,
      name: "Google",
      url: "https://www.google.com",
    },
    {
      id: 2,
      name: "Facebook",
      url: "https://www.facebook.com",
    },
    {
      id: 3,
      name: "Youtube",
      url: "https://www.youtube.com",
    },
    {
      id: 4,
      name: "Amazon",
      url: "https://www.amazon.com",
    },
    {
      id: 5,
      name: "Netflix",
      url: "https://www.netflix.com",
    },
    {
      id: 6,
      name: "Spotify",
      url: "https://www.spotify.com",
    },
    {
      id: 7,
      name: "Twitch",
      url: "https://www.twitch.com",
    },
    {
      id: 8,
      name: "Github",
      url: "https://www.github.com",
    },
  ]);

  return (
    <div className="relative flex items-center justify-center w-full h-full gap-4 p-8 overflow-hidden transition-all rounded-lg dark:text-white dark:bg-slate-800">
      {sites.map(site => (
        <a
          key={site.id}
          href={site.url}
          className="flex items-center justify-center h-12 transition-all hover:scale-105"
        >
          <img
            src={
              "https://logo.clearbit.com/" + site.url.replace("https://", "")
            }
            alt={site.name}
            className="h-full rounded-full"
          />
        </a>
      ))}
      <button>
        <BsPlusCircleFill className="w-8 h-8 transition-all hover:text-slate-200" />
      </button>
    </div>
  );
};

export default FavoriteSites;
