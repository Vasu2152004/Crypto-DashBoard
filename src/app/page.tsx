'use client';

import { useState, useEffect } from 'react';
import { coinGeckoApi } from '@/lib/api';
import { Coin, FilterOptions } from '@/types';
import { useWatchlist } from '@/hooks/useWatchlist';
import { SearchBar } from '@/components/SearchBar';
import { FilterDropdown } from '@/components/FilterDropdown';
import { CoinCard } from '@/components/CoinCard';
import { CoinTableRow } from '@/components/CoinTableRow';
import { CoinCardSkeleton, CoinTableSkeleton } from '@/components/LoadingSkeleton';
import { Grid3X3, List } from 'lucide-react';

export default function MarketsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'market_cap_rank',
    sortOrder: 'asc',
  });

  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Fetch coins data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coinGeckoApi.getMarkets();
        setCoins(data);
        setFilteredCoins(data);
      } catch (err) {
        setError('Failed to fetch market data. Please try again later.');
        console.error('Error fetching coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Filter and sort coins
  useEffect(() => {
    let filtered = coins;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        coin =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (filters.sortBy) {
        case 'market_cap_rank':
          aValue = a.market_cap_rank || 0;
          bValue = b.market_cap_rank || 0;
          break;
        case 'price_change_percentage_24h':
          aValue = a.price_change_percentage_24h || 0;
          bValue = b.price_change_percentage_24h || 0;
          break;
        case 'total_volume':
          aValue = a.total_volume || 0;
          bValue = b.total_volume || 0;
          break;
        default:
          aValue = a.market_cap_rank || 0;
          bValue = b.market_cap_rank || 0;
      }

      return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setFilteredCoins(filtered);
  }, [coins, searchQuery, filters]);

  const sortOptions = [
    { label: 'Market Cap Rank', value: 'market_cap_rank' },
    { label: '24h Change', value: 'price_change_percentage_24h' },
    { label: 'Volume', value: 'total_volume' },
  ];

  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: value as FilterOptions['sortBy'],
    }));
  };

  const handleSortOrderToggle = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Cryptocurrency Markets
          </h1>
          <p className="text-gray-300 text-lg">
            Track the latest prices and market data for top cryptocurrencies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between animate-slideInLeft">
          <div className="w-full sm:w-96">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="flex items-center space-x-4">
            <FilterDropdown
              options={sortOptions}
              value={filters.sortBy}
              onChange={handleSortChange}
            />
            <button
              onClick={handleSortOrderToggle}
              className="glass px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:text-white transition-all duration-300"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
            <div className="flex items-center space-x-2 glass rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-400 animate-fadeInUp">
          Showing {filteredCoins.length} of {coins.length} cryptocurrencies
        </div>

        {/* Coins Display */}
        {loading ? (
          viewMode === 'grid' ? <CoinCardSkeleton /> : <CoinTableSkeleton />
        ) : filteredCoins.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {searchQuery ? 'No cryptocurrencies found matching your search.' : 'No cryptocurrencies available.'}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCoins.map((coin, index) => (
              <div
                key={coin.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fadeInUp"
              >
                <CoinCard
                  coin={coin}
                  isInWatchlist={isInWatchlist(coin.id)}
                  onToggleWatchlist={toggleWatchlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCoins.map((coin, index) => (
              <div
                key={coin.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fadeInUp"
              >
                <CoinTableRow
                  coin={coin}
                  isInWatchlist={isInWatchlist(coin.id)}
                  onToggleWatchlist={toggleWatchlist}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
