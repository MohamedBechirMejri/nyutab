import {
  AVAILABLE_CURRENCIES,
  type CurrencyCode,
  type CurrencyData,
  convertCurrency,
} from 'lib/services/currencyService'
import { useEffect, useState } from 'react'

interface CurrencyConverterProps {
  currencyData: CurrencyData | null
  isLoading: boolean
}

export default function CurrencyConverter({ currencyData, isLoading }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>('1000')
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD')
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('TND')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Convert the amount whenever any of the inputs change
  useEffect(() => {
    if (!currencyData || !amount || isNaN(Number.parseFloat(amount))) {
      setConvertedAmount(null)
      return
    }

    try {
      const numericAmount = Number.parseFloat(amount)
      const result = convertCurrency(
        numericAmount,
        fromCurrency,
        toCurrency,
        currencyData.rates,
        currencyData.baseCurrency
      )
      setConvertedAmount(result)
      setErrorMessage(null)
    } catch (error) {
      setConvertedAmount(null)
      setErrorMessage((error as Error).message)
    }
  }, [amount, fromCurrency, toCurrency, currencyData])

  // Swap the currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Amount input */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
          Amount
        </label>
        <div className="relative">
          <input
            id="amount"
            type="number"
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-start">
        {/* From currency select */}
        <div>
          <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-300 mb-2">
            From
          </label>
          <select
            id="fromCurrency"
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value as CurrencyCode)}
          >
            {AVAILABLE_CURRENCIES.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <div className="flex justify-center md:mt-8">
          <button
            className="p-3 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all shadow-lg hover:shadow-blue-500/20"
            onClick={handleSwapCurrencies}
            aria-label="Swap currencies"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16V4M7 4L3 8M7 4L11 8" />
              <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
            </svg>
          </button>
        </div>

        {/* To currency select */}
        <div>
          <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-300 mb-2">
            To
          </label>
          <select
            id="toCurrency"
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value as CurrencyCode)}
          >
            {AVAILABLE_CURRENCIES.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      <div className="mt-2 p-6 rounded-lg bg-black/40 border border-white/5">
        {isLoading ? (
          <div className="flex justify-center items-center h-16">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : errorMessage ? (
          <div className="flex items-center justify-center text-red-400 bg-red-500/10 rounded p-3 border border-red-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </div>
        ) : convertedAmount !== null ? (
          <div className="text-center">
            <div className="text-lg font-medium text-gray-400">
              {Number.parseFloat(amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{' '}
              {fromCurrency} =
            </div>
            <div className="text-4xl font-bold my-2 bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {convertedAmount.toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })}
            </div>
            <div className="text-xl font-medium text-gray-300">{toCurrency}</div>
            <div className="text-xs mt-3 py-2 px-3 rounded bg-blue-500/10 border border-blue-500/20 inline-block">
              1 {fromCurrency} ={' '}
              {(convertedAmount / Number.parseFloat(amount)).toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })}{' '}
              {toCurrency}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-16 text-gray-500">
            Enter an amount to convert
          </div>
        )}
      </div>

      {/* Update info */}
      {currencyData && (
        <div className="text-xs text-gray-500 flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
          <div>
            <span className="text-gray-400 mr-1">Last updated:</span>
            {new Date(currencyData.lastUpdated).toLocaleString(undefined, {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div>
            <span className="text-gray-400 mr-1">Next update:</span>
            {new Date(currencyData.nextUpdate).toLocaleString(undefined, {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )}
    </div>
  )
}
