import {
	AVAILABLE_CURRENCIES,
	type CurrencyCode,
	type CurrencyData,
} from "lib/services/currencyService";
import { useEffect, useRef, useState } from "react";

interface CurrencyFavoritesProps {
	currencyData: CurrencyData | null;
	isLoading: boolean;
	onSelectPair: (base: CurrencyCode, target: CurrencyCode) => void;
}

type FavoritePair = {
	id: string;
	baseCurrency: CurrencyCode;
	targetCurrency: CurrencyCode;
};

// Default favorites to show when the user hasn't added any yet
const DEFAULT_FAVORITES: FavoritePair[] = [
	{ id: "usd-eur", baseCurrency: "USD", targetCurrency: "EUR" },
	{ id: "usd-tnd", baseCurrency: "USD", targetCurrency: "TND" },
	{ id: "eur-tnd", baseCurrency: "EUR", targetCurrency: "TND" },
];

// Create a unique local storage key for currency favorites
const STORAGE_KEY = "nyutab-currency-favorites";

export default function CurrencyFavorites({
	currencyData,
	isLoading,
	onSelectPair,
}: CurrencyFavoritesProps) {
	const [favorites, setFavorites] = useState<FavoritePair[]>(DEFAULT_FAVORITES);
	const [newBase, setNewBase] = useState<CurrencyCode>("USD");
	const [newTarget, setNewTarget] = useState<CurrencyCode>("EUR");
	const [isAdding, setIsAdding] = useState(false);
	// Track if we've loaded from storage to avoid overriding with defaults
	const hasLoadedFromStorage = useRef(false);

	// Load favorites from local storage only once on mount
	useEffect(() => {
		try {
			const savedFavorites = localStorage.getItem(STORAGE_KEY);
			if (savedFavorites) {
				const parsed = JSON.parse(savedFavorites);
				if (Array.isArray(parsed) && parsed.length > 0) {
					setFavorites(parsed);
					hasLoadedFromStorage.current = true;
				}
			}
		} catch (error) {
			console.error("Failed to parse saved favorites:", error);
		}
	}, []);

	// Save favorites to local storage when they change
	// But only if we've loaded from storage or made changes manually
	useEffect(() => {
		if (hasLoadedFromStorage.current || favorites !== DEFAULT_FAVORITES) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
			} catch (error) {
				console.error("Failed to save favorites:", error);
			}
		}
	}, [favorites]);

	// Handle adding a new favorite pair
	const handleAddFavorite = () => {
		if (newBase === newTarget) return;

		const id = `${newBase.toLowerCase()}-${newTarget.toLowerCase()}`;

		// Check if this pair already exists
		if (favorites.some((fav) => fav.id === id)) {
			// If it exists, just close the form
			setIsAdding(false);
			return;
		}

		const newFavorite: FavoritePair = {
			id,
			baseCurrency: newBase,
			targetCurrency: newTarget,
		};

		setFavorites((prev) => [...prev, newFavorite]);
		setIsAdding(false);
		// Set the flag to indicate we've made manual changes
		hasLoadedFromStorage.current = true;
	};

	// Handle removing a favorite pair
	const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		setFavorites((prev) => prev.filter((fav) => fav.id !== id));
		// Set the flag to indicate we've made manual changes
		hasLoadedFromStorage.current = true;
	};

	// Calculate the rate between two currencies
	const calculateRate = (
		base: CurrencyCode,
		target: CurrencyCode,
	): number | null => {
		if (!currencyData || !currencyData.rates) return null;

		// If base is the same as currencyData.baseCurrency, just return the target rate
		if (base === currencyData.baseCurrency && target in currencyData.rates) {
			return currencyData.rates[target]!;
		}

		// If target is the same as currencyData.baseCurrency, return 1/base rate
		if (target === currencyData.baseCurrency && base in currencyData.rates) {
			return 1 / currencyData.rates[base]!;
		}

		// Convert from base to target via currencyData.baseCurrency
		if (base in currencyData.rates && target in currencyData.rates) {
			return currencyData.rates[target]! / currencyData.rates[base]!;
		}

		return null;
	};

	// Calculate rate change (mock functionality since historical data is limited)
	const getChangeIndicator = (pair: string): "up" | "down" | "neutral" => {
		// This would normally be calculated based on historical data
		// For demo purposes, we'll use a deterministic approach based on the pair ID
		// This ensures the same pair always gets the same indicator without changing randomly
		const seed = pair
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const value = seed % 3;

		if (value === 0) return "up";
		if (value === 1) return "down";
		return "neutral";
	};

	return (
		<div>
			{isAdding ? (
				<div className="p-3 mb-3 border rounded-lg bg-black/40 border-white/5">
					<div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center mb-3">
						<select
							className="px-3 py-2 text-sm text-white transition-all border rounded-lg appearance-none bg-black/50 border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
							value={newBase}
							onChange={(e) => setNewBase(e.target.value as CurrencyCode)}
						>
							{AVAILABLE_CURRENCIES.map((currency) => (
								<option key={currency} value={currency}>
									{currency}
								</option>
							))}
						</select>
						<span className="flex justify-center text-gray-400">/</span>
						<select
							className="px-3 py-2 text-sm text-white transition-all border rounded-lg appearance-none bg-black/50 border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
							value={newTarget}
							onChange={(e) => setNewTarget(e.target.value as CurrencyCode)}
						>
							{AVAILABLE_CURRENCIES.map((currency) => (
								<option key={currency} value={currency}>
									{currency}
								</option>
							))}
						</select>
					</div>
					<div className="flex gap-2">
						<button
							className="flex-1 py-2 text-sm font-medium text-white transition-all rounded-lg bg-green-600/90 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleAddFavorite}
							disabled={newBase === newTarget}
						>
							Add
						</button>
						<button
							className="px-3 py-2 text-sm text-white transition-all rounded-lg bg-gray-600/50 hover:bg-gray-600/80 focus:outline-none"
							onClick={() => setIsAdding(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className="flex justify-end mb-3">
					<button
						className="px-3 py-1.5 flex items-center gap-1.5 text-xs rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
						onClick={() => setIsAdding(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
						Add Pair
					</button>
				</div>
			)}

			{isLoading ? (
				<div className="flex items-center justify-center h-12">
					<div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
				</div>
			) : favorites.length === 0 ? (
				<div className="flex items-center justify-center py-3 text-center">
					<div className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-blue-400"
						>
							<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
						</svg>
						<span className="text-sm text-gray-400">
							No favorite pairs added yet
						</span>
					</div>
				</div>
			) : (
				<div
					className="overflow-x-auto"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					<div className="flex gap-2 pb-1" style={{ paddingRight: "1px" }}>
						{favorites.map((favorite) => {
							const rate = calculateRate(
								favorite.baseCurrency,
								favorite.targetCurrency,
							);
							const changeIndicator = getChangeIndicator(favorite.id);

							return (
								<div
									key={favorite.id}
									className="p-2 bg-black/30 rounded-lg border border-white/5 hover:bg-black/40 transition-colors flex flex-col cursor-pointer group min-w-[150px] max-w-[160px] flex-shrink-0"
									onClick={() =>
										onSelectPair(favorite.baseCurrency, favorite.targetCurrency)
									}
								>
									<div className="flex items-start justify-between">
										<div className="text-sm font-medium text-white flex items-center gap-1.5">
											{favorite.baseCurrency}/{favorite.targetCurrency}
											{changeIndicator === "up" && (
												<span className="text-[10px] px-1 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
													↑
												</span>
											)}
											{changeIndicator === "down" && (
												<span className="text-[10px] px-1 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
													↓
												</span>
											)}
											{changeIndicator === "neutral" && (
												<span className="text-[10px] px-1 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">
													―
												</span>
											)}
										</div>
										<button
											className="p-1 text-gray-400 transition-all rounded-full opacity-60 group-hover:opacity-100 hover:text-red-400 hover:bg-red-500/10 focus:outline-none"
											onClick={(e) => handleRemoveFavorite(favorite.id, e)}
											aria-label="Remove favorite"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="10"
												height="10"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>
									<div className="mt-1 text-xs text-gray-400">
										1 {favorite.baseCurrency} ={" "}
										<span className="font-medium text-white">
											{rate ? rate.toFixed(4) : "―"}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
