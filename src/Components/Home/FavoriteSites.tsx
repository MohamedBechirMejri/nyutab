import React, { useContext, useEffect } from "react";
import { FAVORITES } from "../../lib/defaultsSettings";
import { SettingsContext } from "../../lib/contexts";

const FavoriteSites = () => {
  const [sites, setSites] = React.useState(FAVORITES);

  const settings = useContext(SettingsContext);

  useEffect(() => {
    // if (settings) setSites(settings.favorites);
  }, [settings]);

  return (
    <div className="relative grid items-center justify-center w-full h-full grid-cols-12 grid-rows-1 gap-4 p-8 overflow-hidden transition-all rounded-lg dark:text-white dark:bg-[#292a2d7a]">
      {sites.map((site, i) => (
        <a
          key={i}
          href={site.url}
          className="flex items-center justify-center h-12 overflow-hidden transition-all hover:scale-110"
        >
          <img
            src={
              site.icon ||
              "https://logo.clearbit.com/" + site.url.replace("https://", "")
            }
            alt={site.url}
            className="max-h-full"
          />
        </a>
      ))}
    </div>
  );
};

export default FavoriteSites;
