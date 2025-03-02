export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage: number;
  marketCap: number;
  volume: number;
  high24h: number;
  low24h: number;
}