'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { coinGeckoApi } from '@/lib/api';
import { Coin } from '@/types';
import { useWatchlist } from '@/hooks/useWatchlist';
import { CoinTableRow } from '@/components/CoinTableRow';
import { CoinTableSkeleton } from '@/components/LoadingSkeleton';
import { Star } from 'lucide-react';

export default function WatchlistPage() {
  const [watchlistCoins, setWatchlistCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { watchlist, removeFromWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      if (watchlist.length === 0) {
        setWatchlistCoins([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const coinPromises = watchlist.map(coinId => 
          coinGeckoApi.getCoinDetail(coinId).catch(err => {
            console.error(`Error fetching coin ${coinId}:`, err);
            return null;
          })
        );
        
        const coins = await Promise.all(coinPromises);
        const validCoins = coins.filter(coin => coin !== null) as Coin[];
        setWatchlistCoins(validCoins);
      } catch (err) {
        setError('Failed to fetch watchlist data. Please try again later.');
        console.error('Error fetching watchlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistCoins();
  }, [watchlist]);

  const handleRemoveFromWatchlist = (coinId: string) => {
    removeFromWatchlist(coinId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Watchlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your favorite cryptocurrencies
          </p>
        </div>
        <CoinTableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Watchlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your favorite cryptocurrencies
        </p>
      </div>

      {/* Empty State */}
      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start building your watchlist by adding cryptocurrencies from the markets page.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Browse Markets
          </Link>
        </div>
      ) : watchlistCoins.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            Some coins in your watchlist are no longer available.
          </div>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {watchlistCoins.length} of {watchlist.length} watchlist items
          </div>

          {/* Watchlist Table */}
          <div className="space-y-2">
            {watchlistCoins.map((coin) => (
              <CoinTableRow
                key={coin.id}
                coin={coin}
                isInWatchlist={true}
                onToggleWatchlist={handleRemoveFromWatchlist}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 