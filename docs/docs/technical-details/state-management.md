---
sidebar_position: 2
---

# State Management

## Overview

For state management in the Crypto Price Tracker, we chose React Query (TanStack Query). This section explains why we made this choice and how we implemented it.

## Why React Query?

We evaluated several state management options:

### React Query

**Pros:**
- Built specifically for asynchronous data fetching
- Automatic caching and refetching
- Loading, error, and success states out of the box
- Optimistic updates and mutations
- Devtools for debugging

**Cons:**
- Learning curve for developers new to the library
- Might be overkill for very simple applications

### Context API

**Pros:**
- Built into React
- No additional dependencies
- Simple for basic state sharing

**Cons:**
- No built-in data fetching capabilities
- Requires manual implementation of loading/error states
- No caching mechanism
- Can lead to unnecessary re-renders

### Zustand

**Pros:**
- Lightweight and simple API
- Works well with TypeScript
- No provider required

**Cons:**
- No built-in data fetching or caching
- Requires more boilerplate for async operations

## Implementation

We implemented React Query in our application as follows:

1. **Setup**: We created a QueryClient in our main entry point:

```typescript
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```

2. **Data Fetching**: We use the `useQuery` hook to fetch cryptocurrency data:

```typescript
// In App.tsx
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
```

3. **UI Integration**: We use the query state to render appropriate UI:

```typescript
// Loading state
{isLoading ? (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
) : null}

// Error state
{isError ? (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{(error as Error).message || 'Failed to fetch cryptocurrency data'}</span>
  </div>
) : null}

// Success state
{cryptoData ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredCryptos.map(crypto => (
      <CryptoCard key={crypto.id} crypto={crypto} />
    ))}
  </div>
) : null}
```

## Benefits of Our Approach

Our implementation of React Query provides several benefits:

1. **Separation of Concerns**: Data fetching logic is separated from UI components
2. **Automatic Caching**: Responses are cached to improve performance
3. **Refetching Strategies**: We control when data is refetched (manual refresh, time-based)
4. **Loading and Error States**: Built-in states make it easy to show appropriate UI
5. **Type Safety**: Full TypeScript integration ensures type safety

## Future Improvements

Potential improvements to our state management approach:

1. Implementing optimistic updates for real-time price changes
2. Adding prefetching for improved performance
3. Implementing infinite scrolling for loading more cryptocurrencies
4. Adding persistence layer for offline support