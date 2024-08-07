import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const FavoriteSites = () => {
  const { settings } = useSettingsStore();

  const sites = settings?.favorites || [];

  return (
    <div className="relative flex flex-col items-center justify-center h-max p-4 overflow-scroll rounded-lg">
      <button
        className="text-4xl mb-2"
        onClick={async () => {
          const { randomSite } = await fetch(
            "https://nyutab-api.vercel.app/api/v1/randomsite"
          ).then(res => res.json());
          window.open(randomSite, "_blank");
        }}
      >
        <GiPerspectiveDiceSixFacesRandom />
      </button>
      {sites.map((site, i) => (
        <m.a
          key={`favorite-site-${i}-${site}`}
          href={site}
          className="flex items-center justify-center h-full overflow-hidden sm:h-14"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={`https://www.google.com/s2/favicons?domain=${site}&sz=128`}
            alt={site}
            className="h-8 w-8 rounded-full object-cover shadow-xl border border-zinc-500 bg-gray-500 bg-opacity-50 backdrop-blur-3xl"
          />
        </m.a>
      ))}
    </div>
  );
};

export default FavoriteSites;
