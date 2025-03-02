import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { CryptoCurrency } from '../types';

interface CryptoCardProps {
  crypto: CryptoCurrency;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const isPriceUp = crypto.priceChangePercentage >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };
  
  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K`;
    }
    return value.toString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mr-3" />
            <div>
              <h3 className="font-bold text-lg">{crypto.name}</h3>
              <span className="text-gray-500 text-sm">{crypto.symbol}</span>
            </div>
          </div>
          <div className={`flex items-center ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
            {isPriceUp ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            <span className="font-medium">{Math.abs(crypto.priceChangePercentage).toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-2xl font-bold">{formatCurrency(crypto.currentPrice)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p className="font-medium">{formatLargeNumber(crypto.marketCap)}</p>
          </div>
          <div>
            <p className="text-gray-500">Volume (24h)</p>
            <p className="font-medium">{formatLargeNumber(crypto.volume)}</p>
          </div>
          <div>
            <p className="text-gray-500">High (24h)</p>
            <p className="font-medium">{formatCurrency(crypto.high24h)}</p>
          </div>
          <div>
            <p className="text-gray-500">Low (24h)</p>
            <p className="font-medium">{formatCurrency(crypto.low24h)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;