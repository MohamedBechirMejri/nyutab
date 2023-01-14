import React, { useContext, useEffect } from "react";
import { FAVORITES } from "../../lib/defaultsSettings";
import { SettingsContext } from "../../lib/contexts";
import { motion } from "framer-motion";

const FavoriteSites = () => {
  const [sites, setSites] = React.useState(FAVORITES);

  const settings = useContext(SettingsContext);

  useEffect(() => {
    if (settings) setSites(settings.favorites);
  }, [settings]);

  return (
    <div className="relative grid items-center justify-center w-full h-full grid-cols-6 grid-rows-2 gap-4 p-4 overflow-hidden rounded-lg sm:grid-rows-1 sm:grid-cols-12">
      {sites.map((site, i) => (
        <motion.a
          key={`favorite-site-${i}-${site.url}`}
          href={site.url}
          className="flex items-center justify-center h-full overflow-hidden sm:h-14"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={
              site.icon ||
              "https://logo.clearbit.com/" + site.url.replace("https://", "")
            }
            alt={site.url}
            className="max-h-full rounded-lg"
          />
        </motion.a>
      ))}
    </div>
  );
};

export default FavoriteSites;
