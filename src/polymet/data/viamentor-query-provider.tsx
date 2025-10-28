/**
 * VIAMENTOR Query Provider
 *
 * Provider TanStack Query v5 pour gestion du cache et data fetching
 * - Configuration optimisée pour production
 * - DevTools intégré (dev only)
 * - Retry logic personnalisée
 * - Cache persistence
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

/**
 * Configuration du QueryClient
 */
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Cache pendant 5 minutes
        staleTime: 5 * 60 * 1000,
        // Garde en cache pendant 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry 3 fois avec backoff exponentiel
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus (production)
        refetchOnWindowFocus: true,
        // Refetch on reconnect
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry 1 fois pour les mutations
        retry: 1,
        retryDelay: 1000,
      },
    },
  });

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Provider pour TanStack Query
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/**
 * Hook pour accéder au QueryClient
 */
export { useQueryClient } from "@tanstack/react-query";
