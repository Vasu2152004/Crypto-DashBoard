import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Coin } from '@/types';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CoinTableRowProps {
  coin: Coin;
  isInWatchlist: boolean;
  onToggleWatchlist: (coinId: string) => void;
}

export function CoinTableRow({ coin, isInWatchlist, onToggleWatchlist }: CoinTableRowProps) {
  return (
    <div className="table-row flex items-center justify-between p-4 glass rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Rank and Coin Info */}
      <div className="flex items-center space-x-4 flex-1">
        <div className="text-sm font-medium text-gray-400 w-8 group-hover:text-blue-400 transition-colors duration-300">
          #{coin.market_cap_rank || 'N/A'}
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
              className="rounded-full group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <Link
              href={`/coin/${coin.id}`}
              className="font-semibold text-gray-100 hover:text-blue-400 transition-colors duration-300 group-hover:gradient-text"
            >
              {coin.name}
            </Link>
            <div className="text-sm text-gray-400 uppercase group-hover:text-gray-300 transition-colors duration-300">
              {coin.symbol}
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-1">
        <div className="font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
          {formatCurrency(coin.current_price)}
        </div>
        <div className={cn(
          'text-sm transition-all duration-300',
          coin.price_change_percentage_24h && coin.price_change_percentage_24h > 0 ? 'price-up' : 
          coin.price_change_percentage_24h && coin.price_change_percentage_24h < 0 ? 'price-down' : 
          'text-gray-400'
        )}>
          {formatPercentage(coin.price_change_percentage_24h)}
        </div>
      </div>

      {/* Market Cap */}
      <div className="text-right flex-1">
        <div className="font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
          {formatCurrency(coin.market_cap)}
        </div>
        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
        </div>
      </div>

      {/* Volume */}
      <div className="text-right flex-1">
        <div className="font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
          {formatCurrency(coin.total_volume)}
        </div>
        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          Vol (24h)
        </div>
      </div>

      {/* Watchlist Button */}
      <div className="flex-1 flex justify-end">
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
          <Star className={cn('w-5 h-5', isInWatchlist && 'fill-current')} />
        </button>
      </div>
    </div>
  );
} 