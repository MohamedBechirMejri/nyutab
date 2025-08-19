import { getFactsAndQuotes } from "lib/localDataUtils";
import { useOverlayStore } from "lib/stores";
import { useMemo } from "react";
import M from "react-fast-marquee";

const Marquee = () => {
	const FAQ = useMemo(
		() =>
			getFactsAndQuotes().map((fq) => (
				<span
					key={fq.uniqueIdentifier}
					className={`${fq.author ? "font-serif italic" : ""}`}
				>
					{fq.text} {fq.author ? `- ${fq.author}` : ""}
				</span>
			)),
		[],
	);

	const { overlay } = useOverlayStore();

	return (
		<M
			play={!overlay}
			pauseOnHover
			speed={25}
			className="bg-black p-0 bg-opacity-25 backdrop-blur-3xl h-max shadow-lg"
		>
			<p className="flex gap-[5rem] cursor-default h-full p-2">{FAQ}</p>
		</M>
	);
};

export default Marquee;
