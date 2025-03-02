---
sidebar_position: 1
---

# API Integration

## Overview

The Crypto Price Tracker uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) to fetch cryptocurrency data. CoinGecko provides a free, reliable API with comprehensive cryptocurrency information.

## Implementation Details

### API Client

We use Axios for making HTTP requests to the CoinGecko API. The API client is implemented in `src/api/cryptoApi.ts`:

```typescript
import axios from 'axios';
import { CryptoCurrency } from '../types';

const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });
    
    // Transform the API response to our internal data model
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
```

### Data Model

We define a `CryptoCurrency` interface in `src/types/index.ts` to ensure type safety throughout the application:

```typescript
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
```

## Error Handling

The API client includes comprehensive error handling:

1. Axios errors are caught and transformed into user-friendly error messages
2. Network errors are handled gracefully
3. Error states are displayed to the user with appropriate UI feedback

## Rate Limiting and Caching

CoinGecko's free API has rate limits. To respect these limits and improve performance, we:

1. Cache API responses using React Query
2. Set a stale time of 60 seconds to prevent excessive refetching
3. Provide a manual refresh button for users to get the latest data when needed

## Future Improvements

Potential improvements to the API integration include:

1. Implementing pagination to load more cryptocurrencies
2. Adding support for different base currencies (EUR, GBP, etc.)
3. Implementing websocket connections for real-time price updates
4. Adding more detailed cryptocurrency information (market charts, historical data)