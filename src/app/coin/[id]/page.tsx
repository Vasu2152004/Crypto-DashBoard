'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { coinGeckoApi } from '@/lib/api';
import { CoinDetail, MarketChartData } from '@/types';
import { useWatchlist } from '@/hooks/useWatchlist';
import { PriceChart } from '@/components/PriceChart';
import { ChartSkeleton } from '@/components/LoadingSkeleton';
import { formatCurrency, formatPercentage, getPercentageColor, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function CoinDetailPage() {
  const params = useParams();
  const coinId = params.id as string;
  
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<MarketChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState(7);

  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [coinData, chartData] = await Promise.all([
          coinGeckoApi.getCoinDetail(coinId),
          coinGeckoApi.getMarketChart(coinId, selectedTimeRange),
        ]);
        
        setCoin(coinData);
        setChartData(chartData);
      } catch (err) {
        setError('Failed to fetch coin data. Please try again later.');
        console.error('Error fetching coin data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchCoinData();
    }
  }, [coinId, selectedTimeRange]);

  const handleTimeRangeChange = (days: number) => {
    setSelectedTimeRange(days);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Markets
          </Link>
        </div>
        <ChartSkeleton />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">
            {error || 'Coin not found'}
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Markets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets
        </Link>
      </div>

      {/* Coin Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={coin.image}
              alt={coin.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {coin.name}
                </h1>
                <span className="text-lg text-gray-500 dark:text-gray-400 uppercase">
                  {coin.symbol}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  #{coin.market_cap_rank}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(coin.current_price)}
                </div>
                <div className={cn('flex items-center text-sm', getPercentageColor(coin.price_change_percentage_24h))}>
                  {coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {formatPercentage(coin.price_change_percentage_24h)}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleWatchlist(coin.id)}
            className={cn(
              'p-3 rounded-full transition-colors duration-200',
              isInWatchlist(coin.id)
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-yellow-500'
            )}
            aria-label={isInWatchlist(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={cn('w-6 h-6', isInWatchlist(coin.id) && 'fill-current')} />
          </button>
        </div>
      </div>

      {/* Price Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Price Chart
        </h2>
        {chartData && (
          <PriceChart
            data={chartData}
            timeRange={selectedTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        )}
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Market Cap
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(coin.market_cap)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Volume (24h)
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(coin.total_volume)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Circulating Supply
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Max Supply
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {coin.max_supply ? formatNumber(coin.max_supply) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Price Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">All Time High</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(coin.ath)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">ATH Change</span>
              <span className={cn('font-medium', getPercentageColor(coin.ath_change_percentage))}>
                {formatPercentage(coin.ath_change_percentage)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">All Time Low</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(coin.atl)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">ATL Change</span>
              <span className={cn('font-medium', getPercentageColor(coin.atl_change_percentage))}>
                {formatPercentage(coin.atl_change_percentage)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Market Data
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">24h High</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(coin.high_24h)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">24h Low</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(coin.low_24h)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Price Change (24h)</span>
              <span className={cn('font-medium', getPercentageColor(coin.price_change_24h))}>
                {formatCurrency(coin.price_change_24h)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Market Cap Change (24h)</span>
              <span className={cn('font-medium', getPercentageColor(coin.market_cap_change_percentage_24h))}>
                {formatPercentage(coin.market_cap_change_percentage_24h)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 