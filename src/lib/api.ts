import { Coin, CoinDetail, MarketChartData } from '@/types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

class CoinGeckoAPI {
  private async fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getMarkets(): Promise<Coin[]> {
    try {
      const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<Coin[]>(response);
    } catch (error) {
      console.error('Error fetching markets:', error);
      throw new Error('Failed to fetch market data');
    }
  }

  async getCoinDetail(id: string): Promise<CoinDetail> {
    try {
      const url = `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<CoinDetail>(response);
    } catch (error) {
      console.error('Error fetching coin detail:', error);
      throw new Error('Failed to fetch coin details');
    }
  }

  async getMarketChart(id: string, days: number): Promise<MarketChartData> {
    try {
      const url = `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<MarketChartData>(response);
    } catch (error) {
      console.error('Error fetching market chart:', error);
      throw new Error('Failed to fetch market chart data');
    }
  }

  async searchCoins(query: string): Promise<Coin[]> {
    try {
      const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
      const response = await this.fetchWithTimeout(url);
      const searchResult = await this.handleResponse<{ coins: Array<{ id: string; name: string; symbol: string; market_cap_rank: number | null }> }>(response);
      
      // Get detailed data for the first few results
      const coinIds = searchResult.coins.slice(0, 10).map(coin => coin.id).join(',');
      if (coinIds) {
        const marketsUrl = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;
        const marketsResponse = await this.fetchWithTimeout(marketsUrl);
        return this.handleResponse<Coin[]>(marketsResponse);
      }
      
      return [];
    } catch (error) {
      console.error('Error searching coins:', error);
      throw new Error('Failed to search coins');
    }
  }

  async getTrendingCoins(): Promise<Coin[]> {
    try {
      const url = `${BASE_URL}/search/trending`;
      const response = await this.fetchWithTimeout(url);
      const trendingResult = await this.handleResponse<{ coins: Array<{ item: { id: string; name: string; symbol: string; market_cap_rank: number | null } }> }>(response);
      
      // Get detailed data for trending coins
      const coinIds = trendingResult.coins.slice(0, 10).map(coin => coin.item.id).join(',');
      if (coinIds) {
        const marketsUrl = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;
        const marketsResponse = await this.fetchWithTimeout(marketsUrl);
        return this.handleResponse<Coin[]>(marketsResponse);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      throw new Error('Failed to fetch trending coins');
    }
  }
}

export const coinGeckoApi = new CoinGeckoAPI(); 