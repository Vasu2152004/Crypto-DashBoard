'use client';

import { MarketChartData } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PriceChartProps {
  data: MarketChartData;
  timeRange: number;
  onTimeRangeChange: (days: number) => void;
}

export function PriceChart({ data, timeRange, onTimeRangeChange }: PriceChartProps) {
  const timeRanges = [
    { label: '24H', value: 1 },
    { label: '7D', value: 7 },
    { label: '30D', value: 30 },
    { label: '90D', value: 90 },
  ];

  // Get the latest price for display
  const latestPrice = data.prices[data.prices.length - 1]?.[1] || 0;
  const firstPrice = data.prices[0]?.[1] || 0;
  const priceChange = latestPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-2">Price Chart</h3>
          <div className="text-2xl font-bold text-gray-100">
            {formatCurrency(latestPrice)}
          </div>
          <div className={`text-sm ${priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
          </div>
        </div>
        
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onTimeRangeChange(range.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeRange === range.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 bg-gray-800/30 rounded-lg p-4">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-lg font-medium mb-2">Chart Coming Soon</div>
            <div className="text-sm">Interactive price chart will be implemented here</div>
          </div>
        </div>
        
        {/* Placeholder chart visualization */}
        <div className="relative h-full">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent rounded"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="glass rounded-lg p-3">
          <div className="text-gray-400">Market Cap</div>
          <div className="text-gray-200 font-medium">$1.2T</div>
        </div>
        <div className="glass rounded-lg p-3">
          <div className="text-gray-400">Volume (24h)</div>
          <div className="text-gray-200 font-medium">$45.2B</div>
        </div>
      </div>
    </div>
  );
} 