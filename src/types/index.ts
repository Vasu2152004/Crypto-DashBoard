export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
  roi: any | null;
  last_updated: string;
}

export interface CoinDetail extends Coin {
  community_data: {
    facebook_likes: number | null;
    reddit_subscribers: number | null;
    twitter_followers: number | null;
  };
  developer_data: {
    forks: number | null;
    stars: number | null;
    subscribers: number | null;
    total_issues: number | null;
  };
  public_interest_score: number | null;
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface FilterOptions {
  sortBy: 'market_cap_rank' | 'price_change_percentage_24h' | 'total_volume';
  sortOrder: 'asc' | 'desc';
}

export interface SearchFilters {
  query: string;
  filters: FilterOptions;
} 