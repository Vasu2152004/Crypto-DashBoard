import axios from 'axios';
import { Coin, CoinDetail, MarketChartData } from '@/types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: COINGECKO_API_BASE,
  timeout: 10000,
});

export const coinGeckoApi = {
  // Get top cryptocurrencies by market cap
  getMarkets: async (page: number = 1, perPage: number = 50): Promise<Coin[]> => {
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: false,
          locale: 'en',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching markets:', error);
      throw new Error('Failed to fetch market data');
    }
  },

  // Get detailed information about a specific coin
  getCoinDetail: async (id: string): Promise<CoinDetail> => {
    try {
      const response = await api.get(`/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: true,
          developer_data: true,
          sparkline: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coin detail:', error);
      throw new Error('Failed to fetch coin details');
    }
  },

  // Get market chart data for a specific coin
  getMarketChart: async (
    id: string,
    days: number = 7,
    currency: string = 'usd'
  ): Promise<MarketChartData> => {
    try {
      const response = await api.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: currency,
          days: days,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching market chart:', error);
      throw new Error('Failed to fetch chart data');
    }
  },

  // Search coins
  searchCoins: async (query: string): Promise<Coin[]> => {
    try {
      const response = await api.get('/search', {
        params: {
          query: query,
        },
      });
      
      // Get detailed data for searched coins
      const coinIds = response.data.coins.slice(0, 10).map((coin: any) => coin.id);
      if (coinIds.length === 0) return [];
      
      const detailedCoins = await Promise.all(
        coinIds.map((id: string) => this.getCoinDetail(id))
      );
      
      return detailedCoins;
    } catch (error) {
      console.error('Error searching coins:', error);
      throw new Error('Failed to search coins');
    }
  },
}; 