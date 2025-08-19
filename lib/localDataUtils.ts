import facts from "../db/facts.json";
import quotes from "../db/quotes.json";

type Fact = {
	id: number;
	text: string;
};

type Quote = {
	text: string;
	author: string;
};

export const getRandomFact = () => {
	return (
		//? +20 so sometimes it returns undefined and shows you're awesome fact :)
		facts[Math.floor(Math.random() * (facts.length + 20))] || {
			id: 1920,
			text: "You're Awesome",
		}
	);
};

export const getRandomQuote = () => {
	return quotes[Math.floor(Math.random() * quotes.length)];
};

export const getFactsAndQuotes = () => {
	// Combine facts and quotes into one array
	const combinedArray = [...facts, ...quotes].map((item: any) => {
		// Create a unique identifier for each item
		// For Facts: Use 'id' and 'text'
		// For Quotes: Use 'text' and 'author' since 'id' is not available
		const uniqueIdentifier = item.id
			? `${item.id}_${item.text}`
			: `${item.text}_${item.author}`;
		return { ...item, uniqueIdentifier };
	});

	// Fisher-Yates Shuffle Algorithm to randomize the array
	for (let i = combinedArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
	}

	const seenIdentifiers = new Set();
	const uniqueArray = combinedArray.filter((item) => {
		if (!seenIdentifiers.has(item.uniqueIdentifier)) {
			seenIdentifiers.add(item.uniqueIdentifier);
			return true;
		}
		return false;
	});

	//   return uniqueArray.map(({ uniqueIdentifier, ...rest }) => rest);
	return uniqueArray;
};
