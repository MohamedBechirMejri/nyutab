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
    {
      id: 9,
      name: "Reddit",
      url: "https://www.reddit.com",
    },
    {
      id: 10,
      name: "Twitter",
      url: "https://www.twitter.com",
    },
    {
      id: 11,
      name: "Instagram",
      url: "https://www.instagram.com",
    },
    {
      id: 12,
      name: "Twitch",
      url: "https://www.twitch.com",
    },
  ]);

  return (
    <div className="relative grid items-center justify-center w-full h-full grid-cols-12 grid-rows-1 gap-4 p-8 overflow-hidden transition-all rounded-lg dark:text-white dark:bg-[#292a2d7a]">
      {sites.map(site => (
        <a
          key={site.id}
          href={site.url}
          className="flex items-center justify-center h-12 overflow-hidden transition-all hover:scale-110"
        >
          <img
            src={
              "https://logo.clearbit.com/" + site.url.replace("https://", "")
            }
            alt={site.name}
            className="max-h-full rounded-full"
          />
        </a>
      ))}
      {/* <button>
        <BsPlusCircleFill className="w-8 h-8 transition-all hover:text-slate-200" />
      </button> */}
    </div>
  );
};

export default FavoriteSites;
