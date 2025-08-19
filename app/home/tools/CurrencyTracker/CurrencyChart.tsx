'use client'

import {
  type CurrencyCode,
  type CurrencyHistory,
  fetchHistoricalRates,
} from 'lib/services/currencyService'
import { cn, formatToFixed } from 'lib/utils'
import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface CurrencyChartProps {
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  days?: number
}

export default function CurrencyChart({
  baseCurrency,
  targetCurrency,
  days = 7,
}: CurrencyChartProps) {
  const [chartData, setChartData] = useState<
    Array<{
      date: string
      value: number
    }>
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string
    value: number
  } | null>(null)

  // Calculate change indicators
  const firstValue = chartData[0]?.value ?? 0
  const lastValue = chartData[chartData.length - 1]?.value ?? 0
  const changeValue = lastValue - firstValue
  const changePercent = firstValue ? (changeValue / firstValue) * 100 : 0
  const isPositiveChange = changeValue >= 0

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)

        const historyData = await fetchHistoricalRates(baseCurrency, targetCurrency, days)

        // Transform the data for the chart
        const formattedData = transformHistoricalData(historyData)
        setChartData(formattedData)
      } catch (err) {
        console.error('Failed to load currency history:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch data'))
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [baseCurrency, targetCurrency, days])

  // Transform history data into chart format
  function transformHistoricalData(historyData: CurrencyHistory[]) {
    return historyData.map(item => {
      const date = new Date(item.timestamp)
      return {
        date: `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
          .getDate()
          .toString()
          .padStart(2, '0')}`,
        value: item.rate,
      }
    })
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 border rounded-md shadow-md bg-background/80 backdrop-blur-sm border-border">
          <p className="text-xs text-muted-foreground">{payload[0].payload.date}</p>
          <p className="font-semibold text-primary">{formatToFixed(payload[0].value, 4)}</p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/5 h-[300px] flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Loading chart data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/5 h-[300px] flex items-center justify-center">
        <div className="text-red-400">
          <p className="mb-2 font-semibold">Error loading chart data</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 border bg-black/30 backdrop-blur-md rounded-xl border-white/5">
      <div className="px-2 pb-2">
        <div className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center gap-2">
            {baseCurrency}/{targetCurrency} Exchange Rate
          </div>
          {hoveredPoint && (
            <div className="px-3 py-1 text-sm border rounded-full bg-blue-500/10 border-blue-500/20">
              <span className="text-gray-400">{hoveredPoint.date}:</span>{' '}
              <span className="font-medium text-blue-400">
                {formatToFixed(hoveredPoint.value, 4)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-0">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <div className="text-3xl font-bold tracking-tight">{formatToFixed(lastValue, 4)}</div>
            <div
              className={cn(
                'flex items-center text-sm font-medium mt-1',
                isPositiveChange ? 'text-green-500' : 'text-red-500'
              )}
            >
              <span className="flex items-center">
                {isPositiveChange ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 01-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 011.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="mr-1">
                  {isPositiveChange ? '+' : ''}
                  {formatToFixed(changeValue, 4)}
                </span>
              </span>
              <span className="ml-1 text-xs text-gray-400">
                ({isPositiveChange ? '+' : ''}
                {formatToFixed(changePercent, 2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="h-[180px] mt-2 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              onMouseMove={data => {
                if (data.activePayload && data.activePayload[0]) {
                  setHoveredPoint({
                    date: data.activePayload[0].payload.date,
                    value: data.activePayload[0].payload.value,
                  })
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositiveChange ? '#10b981' : '#ef4444'}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositiveChange ? '#10b981' : '#ef4444'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27282c" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
              />
              <YAxis
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickFormatter={value => formatToFixed(value, 2)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositiveChange ? '#10b981' : '#ef4444'}
                fillOpacity={1}
                fill="url(#colorGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: isPositiveChange ? '#064e3b' : '#7f1d1d',
                  strokeWidth: 1,
                  fill: isPositiveChange ? '#10b981' : '#ef4444',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-px my-4 bg-white/5" />

        <div className="flex justify-between text-xs text-gray-400">
          <div>Past {days} days exchange rate history</div>
          <div>{chartData.length} data points</div>
        </div>
      </div>
    </div>
  )
}
