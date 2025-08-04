import Image from 'next/image';
import Link from 'next/link';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Coin } from '@/types';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CoinCardProps {
  coin: Coin;
  isInWatchlist: boolean;
  onToggleWatchlist: (coinId: string) => void;
}

export function CoinCard({ coin, isInWatchlist, onToggleWatchlist }: CoinCardProps) {
  const priceChange = coin.price_change_percentage_24h;
  const isPositive = priceChange && priceChange > 0;
  const isNegative = priceChange && priceChange < 0;

  return (
    <div className="coin-card glass rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-700/50 hover:border-blue-500/50">
      <div className="card-content">
        {/* Header with Rank and Watchlist */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
              #{coin.market_cap_rank || 'N/A'}
            </div>
            <button
              onClick={() => onToggleWatchlist(coin.id)}
              className={cn(
                'star-button p-2 rounded-full transition-all duration-300',
                isInWatchlist
                  ? 'text-yellow-400 filled'
                  : 'text-gray-400 hover:text-yellow-400'
              )}
              aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              <Star className={cn('w-4 h-4', isInWatchlist && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Coin Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <Image
              src={coin.image}
              alt={coin.name}
              width={48}
              height={48}
              className="rounded-full group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex-1">
            <Link
              href={`/coin/${coin.id}`}
              className="font-bold text-gray-100 hover:text-blue-400 transition-colors duration-300 group-hover:gradient-text"
            >
              {coin.name}
            </Link>
            <div className="text-sm text-gray-400 uppercase">
              {coin.symbol}
            </div>
          </div>
        </div>

        {/* Price and Change */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-100 mb-2 price-display">
            {formatCurrency(coin.current_price)}
          </div>
          <div className={cn(
            'flex items-center space-x-1 text-sm font-medium transition-all duration-300',
            isPositive ? 'price-up' : 
            isNegative ? 'price-down' : 
            'text-gray-400'
          )}>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            <span>{formatPercentage(priceChange)}</span>
          </div>
        </div>

        {/* Market Data */}
        <div className="market-data-grid space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap</span>
            <span className="text-gray-200 font-medium">
              {formatCurrency(coin.market_cap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Volume (24h)</span>
            <span className="text-gray-200 font-medium">
              {formatCurrency(coin.total_volume)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Circulating Supply</span>
            <span className="text-gray-200 font-medium">
              {formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
} 