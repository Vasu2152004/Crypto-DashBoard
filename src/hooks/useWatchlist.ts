import { useState, useEffect } from 'react';
import { localStorageUtils } from '@/lib/utils';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    // Load watchlist from localStorage on mount
    const savedWatchlist = localStorageUtils.getWatchlist();
    setWatchlist(savedWatchlist);
  }, []);

  const addToWatchlist = (coinId: string) => {
    localStorageUtils.addToWatchlist(coinId);
    setWatchlist(prev => [...prev, coinId]);
  };

  const removeFromWatchlist = (coinId: string) => {
    localStorageUtils.removeFromWatchlist(coinId);
    setWatchlist(prev => prev.filter(id => id !== coinId));
  };

  const isInWatchlist = (coinId: string) => {
    return watchlist.includes(coinId);
  };

  const toggleWatchlist = (coinId: string) => {
    if (isInWatchlist(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
  };
} 