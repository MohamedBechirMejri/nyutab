import { getToday } from "lib/dateUtils";
import { fetchPrayerTimes, getNextPrayer } from "lib/prayersUtils";
import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function NextPrayer() {
	const [prayerTimes, setPrayerTimes] = useState(null);
	const [nextPrayer, setNextPrayer] = useState<any>(null);

	useEffect(() => {
		const handlePrayerTimes = async () => {
			const today = getToday();
			const localData = await getLocalData("prayerTimes");

			if (localData?.today.today === today) {
				setPrayerTimes(localData);
			} else {
				const prayers = await fetchPrayerTimes();
				setLocalData("prayerTimes", { ...prayers });
				setPrayerTimes(prayers);
			}
		};

		handlePrayerTimes();
	}, []);

	useEffect(() => {
		if (prayerTimes) {
			const nextPrayer = getNextPrayer(prayerTimes);
			setNextPrayer(nextPrayer);
		}
	}, [prayerTimes]);

	return !nextPrayer ? null : (
		<div className="flex items-center justify-center w-full h-full p-2 gap-1">
			{nextPrayer?.name} in{" "}
			<Countdown
				date={nextPrayer?.timestamp}
				autoStart
				daysInHours
				onComplete={() => {
					if (!prayerTimes) return;
					const nextPrayer = getNextPrayer(prayerTimes);
					setNextPrayer(nextPrayer);
				}}
			/>
		</div>
	);
}
