import Toggle from "components/Toggle";
import { useEffect, useState } from "react";
import { getLocalData } from "../../lib/storageUtils";

type Meme = {
	postLink: string;
	subreddit: string;
	title: string;
	url: string;
	nsfw: boolean;
	spoiler: boolean;
	preview: string[];
};

const Memes = () => {
	const [history, setHistory] = useState<Meme[]>([]);
	const [favorites, setFavorites] = useState<Meme[]>([]);
	const [preview, setPreview] = useState<Meme | null>(null);

	const [favoritesOnly, setFavoritesOnly] = useState(false);

	useEffect(() => {
		(async () => {
			const localData = await getLocalData("memes");
			if (localData) {
				const { history, favorites } = localData;
				setFavorites(favorites);
				setHistory([...history]);
			}
		})();
	}, []);

	// TODO: Add animations, improve look, show favs, link to reddit...
	// TODO: infinite scroll (when last el is visible we fetch more memes and append them to the list)

	const filtered =
		favoritesOnly && favorites.length
			? history.filter((m) => favorites.some((mm) => mm.url === m.url))
			: history;

	return (
		<div className="grid w-full h-full grid-cols-3 grid-rows-1 gap-4 pt-24 pb-4 p-12">
			<div className="flex flex-col w-full h-full col-span-2">
				<h1 className="text-3xl font-bold px-4 w-full">Memes history</h1>

				<div className="w-full h-full flex flex-wrap gap-2 overflow-y-auto p-4">
					{filtered.length ? (
						filtered.map((meme, i: number) => {
							return (
								<div
									key={meme.postLink + meme.url + i}
									className={`w-[19%] h-[calc(80vh/5)] rounded-lg border-zinc-500 border shadow hover:ring-4 hover:ring-orange-500 transition-all duration-300`}
									style={{
										backgroundImage: `url(${meme.preview})`,
										backgroundSize: "cover",
									}}
									onClick={() => setPreview(meme)}
								/>
							);
						})
					) : (
						<div className="flex items-center justify-center w-full h-full">
							<h1 className="text-2xl font-bold text-gray-500">
								No memes found
							</h1>
						</div>
					)}
				</div>
			</div>
			<div className="grid grid-rows-[auto,1fr,auto] grid-cols-1 gap-8 w-full h-full">
				<div>
					<Toggle
						enabled={favoritesOnly}
						toggle={() => setFavoritesOnly((f) => !f)}
						title="Favorites Only"
					/>
				</div>
				<div className="h-full w-full rounded-lg overflow-hidden flex flex-col items-center">
					{preview ? (
						<img src={preview.url} alt="" className="rounded h-full" />
					) : (
						<div className="flex items-center justify-center h-full bg-white w-full">
							<h1 className="text-2xl font-bold text-gray-500">
								Click on a meme to preview
							</h1>
						</div>
					)}
				</div>

				<div>orljknlkjnlkjnnf</div>
			</div>
		</div>
	);
};

export default Memes;
