import { getDate } from "lib/dateUtils";
import { useEffect, useState } from "react";

const Date = () => {
	const [currentDate, setCurrentDate] = useState(getDate().split(", "));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(getDate().split(", "));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<h1 className="flex items-start justify-center font-bold text-center bg-transparent rounded-lg font-[FiraCode] flex-col w-max opacity-90">
			{currentDate[0]}, {currentDate[1]}
		</h1>
	);
};

export default Date;
