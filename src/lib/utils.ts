import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency values
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '$0.00';
  }
  
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
}

// Format percentage with color
export function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00%';
  }
  
  const formatted = value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  return formatted;
}

// Get percentage color class
export function getPercentageColor(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'text-gray-500';
  }
  
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-500';
}

// Format large numbers
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  } else {
    return value.toFixed(2);
  }
}

// LocalStorage utilities
export const localStorageUtils = {
  getWatchlist: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const watchlist = localStorage.getItem('crypto-watchlist');
      return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
      console.error('Error reading watchlist from localStorage:', error);
      return [];
    }
  },

  addToWatchlist: (coinId: string): void => {
    if (typeof window === 'undefined') return;
    try {
      const watchlist = localStorageUtils.getWatchlist();
      if (!watchlist.includes(coinId)) {
        watchlist.push(coinId);
        localStorage.setItem('crypto-watchlist', JSON.stringify(watchlist));
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  },

  removeFromWatchlist: (coinId: string): void => {
    if (typeof window === 'undefined') return;
    try {
      const watchlist = localStorageUtils.getWatchlist();
      const filteredWatchlist = watchlist.filter(id => id !== coinId);
      localStorage.setItem('crypto-watchlist', JSON.stringify(filteredWatchlist));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  },

  isInWatchlist: (coinId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const watchlist = localStorageUtils.getWatchlist();
      return watchlist.includes(coinId);
    } catch (error) {
      console.error('Error checking watchlist:', error);
      return false;
    }
  },
};

// Debounce function for search
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get chart time range options
export const chartTimeRanges = [
  { label: '24H', value: 1 },
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '90D', value: 90 },
]; 