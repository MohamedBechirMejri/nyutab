import { type CurrencyCode, useCurrencyData } from 'lib/services/currencyService'
import { useEffect, useState } from 'react'
import CurrencyChart from './CurrencyChart'
import CurrencyConverter from './CurrencyConverter'
import CurrencyFavorites from './CurrencyFavorites'

export default function CurrencyTracker() {
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('USD')
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>('TND')
  const [hasError, setHasError] = useState(false)
  const { currencyData, isLoading, error, refetch } = useCurrencyData(baseCurrency)

  // Handle selecting a currency pair from favorites
  const handleSelectPair = (base: CurrencyCode, target: CurrencyCode) => {
    setBaseCurrency(base)
    setTargetCurrency(target)
  }

  // Format the last updated time
  const formatLastUpdated = (date?: Date) => {
    if (!date) return 'Never'
    return new Intl.DateTimeFormat('default', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date)
  }

  // Track and handle persistent errors
  useEffect(() => {
    if (error) {
      setHasError(true)
      // Add retry logic after 10 seconds on error
      const retryTimer = setTimeout(() => {
        refetch()
      }, 10000)

      return () => clearTimeout(retryTimer)
    }
    setHasError(false)
  }, [error, refetch])

  // Auto-refresh data every 5 minutes to ensure it's up-to-date
  useEffect(() => {
    const refreshInterval = setInterval(
      () => {
        refetch()
      },
      5 * 60 * 1000
    ) // 5 minutes

    return () => clearInterval(refreshInterval)
  }, [refetch])

  // If there's a persistent error and we're not loading, show error message
  if (hasError && !isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-8 bg-black/40 backdrop-blur-md rounded-xl">
        <div className="max-w-md p-6 text-center border rounded-lg shadow-lg bg-black/30 border-white/10">
          <div className="inline-flex p-3 mb-4 rounded-full bg-red-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="mb-3 text-xl font-semibold text-red-400">Error Loading Currency Data</h2>
          <p className="mb-6 text-gray-300">{error?.message || 'Failed to load currency data'}</p>
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-400">We're automatically trying to reconnect...</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-auto bg-black/40 backdrop-blur-md rounded-xl noscroll">
      <div className="p-6 pb-8 mx-auto max-w-7xl">
        <header className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
            Currency Tracker
          </h1>

          {/* Last Updated & Manual Refresh */}
          <div className="flex items-center justify-center mt-2 space-x-2 text-sm">
            <span className="text-gray-400">
              Last updated: {formatLastUpdated(currencyData?.lastUpdated)}
            </span>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="inline-flex items-center px-2 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="w-3 h-3 mr-1 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 5L20 12L13 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {isLoading ? 'Refreshing...' : 'Refresh Now'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Currency Converter - Left Column */}
          <div>
            <div className="overflow-hidden border bg-black/30 backdrop-blur-md rounded-xl border-white/5">
              <div className="p-5 border-b border-white/5">
                <h2 className="text-xl font-medium text-white/90">Currency Converter</h2>
              </div>
              <div className="p-5">
                <CurrencyConverter currencyData={currencyData} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* Right Column - Chart and Favorites */}
          <div className="space-y-6">
            {/* Currency Chart */}
            <CurrencyChart baseCurrency={baseCurrency} targetCurrency={targetCurrency} days={7} />

            {/* Favorites Section - Directly Under Chart */}
            <div className="overflow-hidden border bg-black/30 backdrop-blur-md rounded-xl border-white/5">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h2 className="text-xl font-medium text-white/90">Favorite Pairs</h2>
                <div className="text-xs text-gray-400">Click any pair to view its chart</div>
              </div>
              <div className="p-4">
                <CurrencyFavorites
                  currencyData={currencyData}
                  isLoading={isLoading}
                  onSelectPair={handleSelectPair}
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-6 text-xs text-center text-gray-500">
          <div className="flex flex-col space-y-2">
            <p>
              Data provided by open exchange rate APIs.
              <span className="mx-2">•</span>
              Updated automatically every 5 minutes
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span
                className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border ${
                  isLoading
                    ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                    : 'border-green-500/20 bg-green-500/10 text-green-400'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                    isLoading ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                />
                {isLoading ? 'Updating...' : 'API Connected'}
              </span>
              <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-blue-400" />
                Auto-refresh enabled
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
