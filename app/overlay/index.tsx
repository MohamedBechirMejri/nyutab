import { m } from "framer-motion";
import { useOverlayStore } from "lib/stores";
import { type JSX, lazy, Suspense } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import type { Overlay as TOverlay } from "types/overlay";

const overlays = {
	settings: lazy(() => import("./settings")),
	memes: lazy(() => import("./memes")),
	onboarding: lazy(() => import("./onboarding")),
	games: lazy(() => import("./games")),
} as Record<TOverlay, React.LazyExoticComponent<() => JSX.Element>>;

const Overlay = () => {
	const { overlay, setOverlay } = useOverlayStore();

	const OverlayContent = overlay ? overlays[overlay] : null;

	return (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute z-50 w-full h-full origin-top backdrop-blur bg-black/20"
		>
			{overlay !== "onboarding" && overlay !== "settings" && (
				<m.button
					initial={{ scale: 0.5, x: 50, opacity: 0, borderRadius: "1rem" }}
					animate={{ scale: 1, x: 0, opacity: 1, borderRadius: "1.5rem" }}
					whileTap={{ scale: 0.95, borderRadius: "1.5rem" }}
					transition={{ type: "spring", damping: 10, stiffness: 100 }}
					className="absolute z-40 p-2 px-8 text-3xl font-bold top-8 left-[1.5rem] bg-opacity-25 bg-zinc-500"
					onClick={() => setOverlay(null)}
				>
					<IoArrowBackCircle />
				</m.button>
			)}

			<m.div
				className="w-full h-full bg-inherit rounded-xl "
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "anticipate", duration: 0.3 }}
			>
				<Suspense
					fallback={
						<div className="flex items-center justify-center h-full">
							Loading...
						</div>
					}
				>
					{OverlayContent && <OverlayContent />}
				</Suspense>
			</m.div>
		</m.div>
	);
};

export default Overlay;
