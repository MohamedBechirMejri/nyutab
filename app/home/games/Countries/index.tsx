import { useEffect, useState } from "react";

const Countries = () => {
	const [countries, setCountries] = useState<
		{
			country?: string;
			flag: string;
			answer: string;
			variants: string[];
		}[]
	>([]);
	const [level, setLevel] = useState(0);
	const [country, setCountry] = useState(countries[level]);
	const [url, setUrl] = useState("");
	const [score, setScore] = useState(0);
	const [negativeScore, setNegativeScore] = useState(0);

	useEffect(() => {
		if (!url) return;
		fetch(url)
			.then((res) => res.json())
			.then((res) => setCountries(res));
	}, [url]);

	useEffect(() => {
		if (level === 20) {
			setUrl(
				url === "https://shadify.dev/api/countries/capital-quiz?amount=20"
					? "https://shadify.dev/api/countries/country-quiz?amount=20"
					: "https://shadify.dev/api/countries/capital-quiz?amount=20",
			);
			setLevel(0);
			return;
		}
		setCountry(countries[level]);
	}, [countries, level]);

	const handleAnswer = (answer: string) => {
		if (answer === country.answer) setScore(score + 1);
		else setNegativeScore(negativeScore + 1);
		setLevel(level + 1);
	};

	return !url ? (
		<div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
			<h1 className="text-2xl font-semibold">Select Game</h1>
			<button
				className="p-4 transition-all bg-white bg-opacity-25 rounded-2xl hover:bg-opacity-40 active:rounded-3xl"
				onClick={() =>
					setUrl("https://shadify.dev/api/countries/capital-quiz?amount=20")
				}
			>
				Guess the capital
			</button>
			<button
				className="p-4 transition-all bg-white bg-opacity-25 rounded-2xl hover:bg-opacity-40 active:rounded-3xl"
				onClick={() =>
					setUrl("https://shadify.dev/api/countries/country-quiz?amount=20")
				}
			>
				Guess the country
			</button>
		</div>
	) : country ? (
		<div className="flex flex-col items-center justify-center h-full gap-8 font-[FiraCode] text-2xl no-select">
			{country.country && <h1>{country.country}</h1>}
			<a href="https://flagpedia.net" target="_blank" rel="noreferrer">
				<img
					src={country.flag}
					alt={country.country || country.answer}
					className="rounded-2xl"
				/>
			</a>
			<h2>Guess the {country.country ? "capital" : "country"}</h2>
			<div className="grid grid-cols-2 gap-4">
				{country.variants.map((variant, index) => (
					<button
						key={index}
						className="p-4 transition-all bg-white bg-opacity-25 rounded-2xl hover:bg-opacity-40 active:rounded-3xl"
						onClick={() => handleAnswer(variant)}
					>
						{variant}
					</button>
				))}
			</div>
			<p>
				<span className="text-red-500">{negativeScore}</span> |{" "}
				<span className="text-green-500">{score}</span>
			</p>
			<div className="flex gap-4">
				<button
					className="p-4 transition-all bg-white bg-opacity-25 rounded-2xl hover:bg-opacity-40 active:rounded-3xl"
					onClick={() => setUrl("")}
				>
					back
				</button>
				<button
					className="p-4 transition-all bg-white bg-opacity-25 rounded-2xl hover:bg-opacity-40 active:rounded-3xl"
					onClick={() => setLevel(level + 1)}
				>
					next
				</button>
			</div>
		</div>
	) : null;
};

export default Countries;
