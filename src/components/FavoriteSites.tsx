import React from "react";

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
      name: "Amazon",
      url: "https://www.amazon.com",
    },
    {
      id: 10,
      name: "Netflix",
      url: "https://www.netflix.com",
    },
  ]);

  return (
    <div className="grid items-center justify-center w-full h-full min-h-0 grid-cols-5 grid-rows-3 gap-4 p-6 overflow-y-scroll transition-all rounded-lg dark:text-white dark:bg-slate-800 ">
      {sites.map(site => (
        <a
          key={site.id}
          href={site.url}
          className="flex items-center justify-center w-full h-full transition-all rounded-lg hover:scale-105"
        >
          <img
            src={
              "https://logo.clearbit.com/" + site.url.replace("https://", "")
            }
            alt={site.name}
            className="rounded-lg "
          />
        </a>
      ))}
    </div>
  );
};

export default FavoriteSites;
