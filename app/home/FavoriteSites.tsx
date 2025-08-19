import { m } from "framer-motion";
import { useSettingsStore } from "lib/stores";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const FavoriteSites = () => {
	const { settings } = useSettingsStore();

	const sites = settings?.favorites || [];

	return (
		<div className="relative flex flex-col items-center justify-start h-full p-4 overflow-scroll rounded-lg noscroll">
			<m.button
				className="text-4xl mb-2 shrink-0 sm:text-5xl"
				onClick={async () => {
					const { randomSite } = await fetch(
						"https://nyutab-api.vercel.app/api/v1/randomsite",
					).then((res) => res.json());
					window.open(randomSite, "_blank");
				}}
				animate={{ rotate: [0, 360] }}
				transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
			>
				<GiPerspectiveDiceSixFacesRandom />
			</m.button>
			<div>
				{sites.map((site, i) => (
					<a
						key={`favorite-site-${i}-${site}`}
						href={site}
						className="flex items-center justify-center overflow-hidden size-max hover:ring-zinc-500 transition-all duration-300 ring rounded-full my-4 shrink-0 ring-transparent"
					>
						<img
							src={`https://www.google.com/s2/favicons?domain=${site}&sz=128`}
							alt={site}
							className="size-8 sm:size-11 rounded-full object-cover shadow-xl border border-zinc-500 bg-gray-500 bg-opacity-50 backdrop-blur-3xl"
						/>
					</a>
				))}
			</div>
		</div>
	);
};

export default FavoriteSites;
