import { useEffect, useRef, useState } from 'react';
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
import { MarketChartData } from '@/types';
import { chartTimeRanges } from '@/lib/utils';

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
  coinName: string;
  currentPrice: number;
  priceChange24h: number;
  onTimeRangeChange: (days: number) => void;
  selectedTimeRange: number;
}

export function PriceChart({
  data,
  coinName,
  currentPrice,
  priceChange24h,
  onTimeRangeChange,
  selectedTimeRange,
}: PriceChartProps) {
  const chartRef = useRef<ChartJS>(null);

  const chartData = {
    labels: data.prices.map((price) => {
      const date = new Date(price[0]);
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `${coinName} Price`,
        data: data.prices.map((price) => price[1]),
        borderColor: priceChange24h >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: priceChange24h >= 0 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: priceChange24h >= 0 ? '#10b981' : '#ef4444',
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
        borderColor: priceChange24h >= 0 ? '#10b981' : '#ef4444',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="space-y-4">
      {/* Time Range Buttons */}
      <div className="flex space-x-2">
        {chartTimeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => onTimeRangeChange(range.value)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              selectedTimeRange === range.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
} 