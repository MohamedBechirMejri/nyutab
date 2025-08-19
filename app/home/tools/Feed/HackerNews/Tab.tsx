import { m } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Loading from "../../../../../components/loading";
import getStories from "../../../../../utils/apis";
import convertTimestamp from "../../../../../utils/convertTimeStamp";

const Tab = ({ currentTab }: { currentTab: string }) => {
	const [stories, setStories] = useState<any[]>([]);
	const [isloading, setIsLoading] = useState(false);

	const url = useMemo(
		() =>
			`https://hacker-news.firebaseio.com/v0/${currentTab.replace(
				"jobs",
				"job",
			)}stories.json`,
		[currentTab],
	);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			const stories = await getStories(url);
			stories && setStories(stories);
			setIsLoading(false);
		};
		fetchData();
	}, [url]);

	return (
		<div className="flex flex-col h-full gap-2 p-2">
			{isloading ? (
				<div className="pt-24">
					<Loading />
				</div>
			) : (
				stories.map((story, i) => {
					return (
						<m.a
							href={story.url}
							initial={{
								opacity: 0,
								backgroundColor: "#11141d",
								backdropFilter: "blur(10px)",
							}}
							animate={{ opacity: 1 }}
							whileHover={{
								backgroundColor: "#11141d",
								backgroundImage:
									"linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
							}}
							transition={{
								type: "spring",
								damping: 10,
								stiffness: 100,
								opacity: { delay: i * 0.05 },
							}}
							key={story.id}
							className="flex flex-col p-4 rounded-2xl overflow-hidden"
							target={"_blank"}
						>
							<span className="w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
								{story.title}
							</span>
							<span className="text-green-300">By: {story.by}</span>
							<span className="text-orange-300">Score: {story.score}</span>
							<span className="text-gray-300">
								Time: {convertTimestamp(story.time)}
							</span>
						</m.a>
					);
				})
			)}
		</div>
	);
};

export default Tab;
