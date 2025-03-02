import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw, Search, TrendingUp } from 'lucide-react';
import { fetchCryptoData } from './api/cryptoApi';
import CryptoCard from './components/CryptoCard';
import Header from './components/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    data: cryptoData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    staleTime: 60000, // 1 minute
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCryptos = cryptoData?.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm) || 
    crypto.symbol.toLowerCase().includes(searchTerm)
  ) || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <button 
            onClick={() => refetch()} 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{(error as Error).message || 'Failed to fetch cryptocurrency data'}</span>
          </div>
        ) : (
          <>
            {filteredCryptos.length === 0 ? (
              <div className="text-center py-10">
                <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No cryptocurrencies found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCryptos.map(crypto => (
                  <CryptoCard key={crypto.id} crypto={crypto} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Crypto Price Tracker &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-1">Data provided by CoinGecko API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;