import { motion } from "framer-motion";
import { useSettingsStore } from "lib/stores";

const FavoriteSites = () => {
  const { settings } = useSettingsStore();

  const sites = settings?.favorites || [];

  return (
    <div className="relative flex flex-col items-center justify-center h-max gap-4 p-4 overflow-scroll rounded-lg">
      {sites.map((site, i) => (
        <motion.a
          key={`favorite-site-${i}-${site}`}
          href={site}
          className="flex items-center justify-center h-full overflow-hidden sm:h-14"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={"https://logo.clearbit.com/" + site.replace("https://", "")}
            alt={site}
            className="max-h-full rounded-lg"
          />
        </motion.a>
      ))}
    </div>
  );
};

export default FavoriteSites;
