'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MarketChartData } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

  // Prepare chart data
  const chartData = {
    labels: data.prices.map((price) => {
      const date = new Date(price[0]);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: timeRange === 1 ? 'numeric' : undefined,
        minute: timeRange === 1 ? '2-digit' : undefined,
      });
    }),
    datasets: [
      {
        label: 'Price',
        data: data.prices.map((price) => price[1]),
        borderColor: priceChangePercent >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: priceChangePercent >= 0 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: priceChangePercent >= 0 ? '#10b981' : '#ef4444',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context: any[]) {
            return context[0]?.label || '';
          },
          label: function(context: any) {
            return `Price: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
                 ticks: {
           color: '#ffffff',
           font: {
             size: 12,
           },
           maxTicksLimit: 6,
         },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false,
        },
                 ticks: {
           color: '#ffffff',
           font: {
             size: 12,
           },
           callback: function(this: any, tickValue: string | number) {
             const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
             return formatCurrency(value);
           },
         },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
    },
  };

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

      <div className="relative h-64">
        <Line data={chartData} options={options} />
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