/**
 * VIAMENTOR - Performance Optimization Guide
 * Guide complet d'optimisation des performances pour pages dashboard/analytics
 *
 * @module viamentor-performance-optimization-guide
 * @version 2.0.0
 */

// ============================================================================
// PERFORMANCE PATTERNS
// ============================================================================

/**
 * 1. LAZY LOADING COMPONENTS
 * Charger les composants lourds uniquement quand nécessaire
 */

// Pattern: Lazy load charts Recharts
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load composants charts (exemple)
// const RevenueChart = lazy(() => import("@/viamentor/components/viamentor-revenue-chart"));
// const PerformanceChart = lazy(() => import("@/viamentor/components/viamentor-performance-chart"));

// Usage avec Suspense
export function DashboardWithLazyCharts() {
  // Exemple pattern - adapter selon vos composants
  const LazyChart = lazy(() =>
    Promise.resolve({
      default: () => <div>Chart Component</div>,
    })
  );

  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <LazyChart />
      </Suspense>
    </div>
  );
}

/**
 * 2. MEMOIZATION STRATEGIES
 * Éviter re-renders inutiles avec React.memo et useMemo
 */

import { memo, useMemo } from "react";

// Pattern: Memoize composant pur
interface StatsCardProps {
  title: string;
  value: number;
  trend: number;
  icon: React.ComponentType;
}

export const StatsCard = memo(function StatsCard({
  title,
  value,
  trend,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        <p
          className={`text-xs ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          {trend >= 0 ? "+" : ""}
          {trend}%
        </p>
      </div>
    </div>
  );
});

// Pattern: useMemo pour calculs coûteux
export function useAnalyticsCalculations(data: DataPoint[]) {
  const calculations = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const average = total / data.length;
    const max = Math.max(...data.map((item) => item.value));
    const min = Math.min(...data.map((item) => item.value));

    return { total, average, max, min };
  }, [data]); // Recalcule uniquement si data change

  return calculations;
}

/**
 * 3. DATA CACHING
 * Implémenter cache local pour réduire requêtes API
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live en ms
}

class DataCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

export const analyticsCache = new DataCache();

// Hook avec cache intégré
export function useCachedAnalytics(endpoint: string, ttl?: number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier cache d'abord
    const cached = analyticsCache.get(endpoint);

    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    // Sinon fetch et cache
    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();

        analyticsCache.set(endpoint, result, ttl);
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint, ttl]);

  return { data, loading };
}

/**
 * 4. OPTIMIZED QUERIES
 * Pagination, filtres serveur, debounce
 */

import { useCallback, useEffect, useState } from "react";

// Hook debounce pour search
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook pagination optimisée
interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems: number;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 20,
  totalItems,
}: UsePaginationOptions) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  return {
    page,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    setPage: goToPage,
    setPageSize,
    nextPage,
    prevPage,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * 5. VIRTUAL SCROLLING
 * Pour tables longues (>100 rows)
 */

import { useRef } from "react";
// import { useVirtualizer } from "@tanstack/react-virtual"; // Si disponible

export function VirtualizedTable({ data }: { data: any[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Pattern: Virtual scrolling pour grandes listes
  // Utiliser @tanstack/react-virtual ou react-window

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      {/* Exemple simplifié - utiliser une lib de virtualisation en production */}
      {data.map((item, index) => (
        <div key={index} className="h-[50px] border-b p-2">
          {item.name}
        </div>
      ))}
    </div>
  );
}

/**
 * 6. CHART OPTIMIZATION
 * Optimiser Recharts avec sampling et memoization
 */

// Hook pour sampler data si trop de points
export function useChartDataSampling(data: any[], maxPoints: number = 100) {
  return useMemo(() => {
    if (data.length <= maxPoints) return data;

    const step = Math.ceil(data.length / maxPoints);
    return data.filter((_, index) => index % step === 0);
  }, [data, maxPoints]);
}

// Composant chart memoizé
interface OptimizedChartProps {
  data: any[];
  maxPoints?: number;
}

export const OptimizedLineChart = memo(function OptimizedLineChart({
  data,
  maxPoints = 100,
}: OptimizedChartProps) {
  const sampledData = useChartDataSampling(data, maxPoints);

  // Pattern: Chart memoizé avec data sampling
  // Adapter selon votre lib de charts (Recharts, Chart.js, etc.)

  return (
    <div className="h-[300px] w-full rounded-lg border bg-card p-4">
      <p className="text-sm text-muted-foreground">
        Chart with {sampledData.length} points (sampled from {data.length})
      </p>
      {/* Votre composant chart ici */}
    </div>
  );
});

/**
 * 7. CODE SPLITTING
 * Séparer bundles par route
 */

// Dans prototype, lazy load pages
// const AnalyticsCentralPage = lazy(() =>
//   import("@/viamentor/pages/viamentor-analytics-central-page")
// );

// Usage dans Routes (exemple pattern)
// <Route
//   path="/analytics"
//   element={
//     <Suspense fallback={<LoadingPage />}>
//       <AnalyticsCentralPage />
//     </Suspense>
//   }
// />

/**
 * 8. PERFORMANCE MONITORING
 * Mesurer et tracker les performances
 */

export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 100) {
        console.warn(
          `⚠️ Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`
        );
      }
    };
  }, [componentName]);
}

// Hook pour mesurer temps de chargement data
export function useDataLoadingMetrics(dataKey: string) {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    dataSize: 0,
  });

  const startMeasure = useCallback(() => {
    return performance.now();
  }, []);

  const endMeasure = useCallback(
    (startTime: number, data: any) => {
      const loadTime = performance.now() - startTime;
      const dataSize = JSON.stringify(data).length;

      setMetrics({ loadTime, dataSize });

      console.log(`📊 ${dataKey}:`, {
        loadTime: `${loadTime.toFixed(2)}ms`,
        dataSize: `${(dataSize / 1024).toFixed(2)}KB`,
      });
    },
    [dataKey]
  );

  return { metrics, startMeasure, endMeasure };
}

/**
 * 9. OPTIMIZED HOOKS LIBRARY
 * Hooks réutilisables optimisés
 */

// Hook pour données analytics avec cache et memoization
export function useOptimizedAnalytics<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        // Check cache
        const cached = analyticsCache.get<T>(cacheKey);
        if (cached && isMounted) {
          setData(cached);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const result = await fetchFn();

        if (isMounted) {
          analyticsCache.set(cacheKey, result);
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [cacheKey, ...dependencies]);

  return { data, loading, error };
}

// Hook pour filtres avec debounce
export function useOptimizedFilters<T extends Record<string, any>>(
  initialFilters: T,
  debounceDelay: number = 500
) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const debouncedFilters = useDebounce(filters, debounceDelay);

  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    filters,
    debouncedFilters,
    updateFilter,
    resetFilters,
    setFilters,
  };
}

/**
 * 10. STATE MANAGEMENT OPTIMIZATION
 * Zustand + TanStack Query pour gestion d'état performante
 */

// Pattern: Zustand Store pour état UI
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  viewMode: "table" | "grid";
  selectedIds: string[];
  filters: Record<string, any>;
  setViewMode: (mode: "table" | "grid") => void;
  toggleSelection: (id: string) => void;
  setFilters: (filters: Record<string, any>) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      viewMode: "table",
      selectedIds: [],
      filters: {},
      setViewMode: (mode) => set({ viewMode: mode }),
      toggleSelection: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((sid) => sid !== id)
            : [...state.selectedIds, id],
        })),
      setFilters: (filters) => set({ filters }),
    }),
    { name: "ui-store" }
  )
);

// Pattern: TanStack Query pour données serveur
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useDataQuery() {
  // Query avec cache automatique
  const list = useQuery({
    queryKey: ["data", "list"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000, // 5min cache
  });

  // Mutation avec invalidation
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationFn: createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  return { list, create };
}

// Pattern: Sélecteurs Zustand pour optimiser re-renders
export const selectViewMode = (state: UIStore) => state.viewMode;
export const selectSelectedIds = (state: UIStore) => state.selectedIds;

// Usage optimisé
export function OptimizedComponent() {
  // ✅ Bon: Sélecteur spécifique (re-render uniquement si viewMode change)
  const viewMode = useUIStore(selectViewMode);

  // ❌ Mauvais: Tout le store (re-render à chaque changement)
  // const store = useUIStore();

  return <div>{viewMode}</div>;
}

// Pattern: Séparation claire des responsabilités
// - Zustand: État UI éphémère (filtres, sélection, view mode)
// - TanStack Query: Données serveur (cache, invalidation, optimistic updates)
// - Ne pas dupliquer les données entre les deux

/**
 * 11. PERFORMANCE BEST PRACTICES CHECKLIST
 */

export const PERFORMANCE_CHECKLIST = {
  // Lazy Loading
  lazyLoadHeavyComponents: true,
  useSuspenseBoundaries: true,

  // Memoization
  memoizePureComponents: true,
  useMemoForExpensiveCalculations: true,
  useCallbackForEventHandlers: true,

  // Data Management
  implementCaching: true,
  paginateLargeLists: true,
  debounceSearchInputs: true,

  // Rendering
  virtualizeScrolling: true,
  avoidInlineObjectCreation: true,
  useKeysForLists: true,

  // Charts
  sampleLargeDatasets: true,
  memoizeChartComponents: true,

  // Code Splitting
  splitByRoute: true,
  lazyLoadModals: true,

  // Monitoring
  trackRenderTimes: true,
  measureDataLoadTimes: true,
  setPerformanceBudgets: true,
};

/**
 * PERFORMANCE TARGETS
 */

export const PERFORMANCE_TARGETS = {
  // Core Web Vitals
  FCP: 1800, // First Contentful Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  CLS: 0.1, // Cumulative Layout Shift
  TTI: 3800, // Time to Interactive (ms)

  // Custom Metrics
  initialBundleSize: 200, // KB
  chartRenderTime: 100, // ms
  dataFetchTime: 1000, // ms
  cacheHitRate: 0.8, // 80%

  // User Experience
  pageTransition: 200, // ms
  searchDebounce: 500, // ms
  scrollFPS: 60, // frames per second
};

export default {
  // Patterns
  StatsCard,
  OptimizedLineChart,
  VirtualizedTable,

  // Hooks
  useDebounce,
  usePagination,
  useAnalyticsCalculations,
  useCachedAnalytics,
  useChartDataSampling,
  usePerformanceMonitor,
  useDataLoadingMetrics,
  useOptimizedAnalytics,
  useOptimizedFilters,

  // Cache
  analyticsCache,

  // Constants
  PERFORMANCE_CHECKLIST,
  PERFORMANCE_TARGETS,
};
