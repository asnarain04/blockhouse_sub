import axios from 'axios';
import { CryptoCurrency } from '../types';

const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });
    
    return response.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      currentPrice: coin.current_price,
      priceChangePercentage: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.error || error.message}`);
    }
    throw new Error('Failed to fetch cryptocurrency data');
  }
};