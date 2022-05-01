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
  ]);

  return (
    <div>
      <h1>Favorite Sites</h1>
      <ul>
        {sites.map(site => (
          <li key={site.id}>
            <a href={site.url}>{site.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteSites;
