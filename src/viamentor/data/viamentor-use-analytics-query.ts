/**
 * VIAMENTOR - Use Analytics Query Hook
 *
 * Hook TanStack Query pour gestion données serveur analytics admin
 *
 * @module viamentor-use-analytics-query
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useAdminAnalyticsStore,
  type AnalyticsPeriod,
  type MetricType,
  type AdminAnalyticsFilters,
} from "@/viamentor/data/viamentor-admin-analytics-store";

// ============================================================================
// TYPES
// ============================================================================

/**
 * KPIs analytics admin
 */
export interface AnalyticsKPIs {
  revenue: {
    current: number;
    previous: number;
    change: number;
    trend: "up" | "down" | "stable";
  };
  users: {
    current: number;
    previous: number;
    change: number;
    trend: "up" | "down" | "stable";
  };
  tenants: {
    current: number;
    previous: number;
    change: number;
    trend: "up" | "down" | "stable";
  };
  subscriptions: {
    current: number;
    previous: number;
    change: number;
    trend: "up" | "down" | "stable";
  };
  churn: {
    current: number;
    previous: number;
    change: number;
    trend: "up" | "down" | "stable";
  };
  growth: {
    current: number;
    previous: number;
    change: number;
    trend: "up" | "down" | "stable";
  };
}

/**
 * Point de données time series
 */
export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  compareValue?: number;
}

/**
 * Données analytics par métrique
 */
export interface MetricAnalytics {
  metric: MetricType;
  timeSeries: TimeSeriesDataPoint[];
  total: number;
  average: number;
  min: number;
  max: number;
}

/**
 * Rapport analytics
 */
export interface AnalyticsReport {
  id: string;
  name: string;
  type: "revenue" | "tenants" | "users" | "performance";
  period: AnalyticsPeriod;
  generatedAt: Date;
  data: any;
  format: "csv" | "xlsx" | "pdf";
}

/**
 * Configuration alerte
 */
export interface AlertConfig {
  id: string;
  metric: MetricType;
  threshold: number;
  condition: "above" | "below";
  enabled: boolean;
  recipients: string[];
}

// ============================================================================
// API SIMULATION
// ============================================================================

/**
 * Simule un délai API
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simule la récupération des KPIs
 */
const fetchAnalyticsKPIs = async (
  filters: AdminAnalyticsFilters
): Promise<AnalyticsKPIs> => {
  await delay(800);

  // Simulation de données
  return {
    revenue: {
      current: 125000,
      previous: 110000,
      change: 13.6,
      trend: "up",
    },
    users: {
      current: 1250,
      previous: 1180,
      change: 5.9,
      trend: "up",
    },
    tenants: {
      current: 45,
      previous: 42,
      change: 7.1,
      trend: "up",
    },
    subscriptions: {
      current: 380,
      previous: 365,
      change: 4.1,
      trend: "up",
    },
    churn: {
      current: 2.3,
      previous: 3.1,
      change: -25.8,
      trend: "down",
    },
    growth: {
      current: 15.2,
      previous: 12.8,
      change: 18.8,
      trend: "up",
    },
  };
};

/**
 * Simule la récupération des données par métrique
 */
const fetchMetricAnalytics = async (
  metric: MetricType,
  filters: AdminAnalyticsFilters
): Promise<MetricAnalytics> => {
  await delay(600);

  // Génération de données time series
  const days = 30;
  const timeSeries: TimeSeriesDataPoint[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    timeSeries.push({
      date: date.toISOString().split("T")[0],
      value: Math.floor(Math.random() * 10000) + 5000,
      compareValue: filters.compareEnabled
        ? Math.floor(Math.random() * 9000) + 4500
        : undefined,
    });
  }

  const values = timeSeries.map((d) => d.value);

  return {
    metric,
    timeSeries,
    total: values.reduce((sum, v) => sum + v, 0),
    average: values.reduce((sum, v) => sum + v, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

/**
 * Simule la génération d'un rapport
 */
const generateReport = async (
  type: AnalyticsReport["type"],
  filters: AdminAnalyticsFilters,
  format: "csv" | "xlsx" | "pdf"
): Promise<AnalyticsReport> => {
  await delay(2000);

  return {
    id: `report-${Date.now()}`,
    name: `Rapport ${type} - ${new Date().toLocaleDateString()}`,
    type,
    period: filters.period,
    generatedAt: new Date(),
    data: {},
    format,
  };
};

/**
 * Simule la sauvegarde d'une configuration d'alerte
 */
const saveAlertConfig = async (
  config: Omit<AlertConfig, "id">
): Promise<AlertConfig> => {
  await delay(500);

  return {
    id: `alert-${Date.now()}`,
    ...config,
  };
};

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Hook pour récupérer les KPIs analytics
 */
export const useAnalyticsKPIs = () => {
  const filters = useAdminAnalyticsStore((state) => state.filters);

  return useQuery({
    queryKey: ["analytics", "kpis", filters],
    queryFn: () => fetchAnalyticsKPIs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Refresh every minute
  });
};

/**
 * Hook pour récupérer les analytics d'une métrique
 */
export const useMetricAnalytics = (metric: MetricType) => {
  const filters = useAdminAnalyticsStore((state) => state.filters);

  return useQuery({
    queryKey: ["analytics", "metric", metric, filters],
    queryFn: () => fetchMetricAnalytics(metric, filters),
    staleTime: 5 * 60 * 1000,
    enabled: filters.selectedMetrics.includes(metric),
  });
};

/**
 * Hook pour récupérer toutes les métriques sélectionnées
 */
export const useSelectedMetricsAnalytics = () => {
  const selectedMetrics = useAdminAnalyticsStore(
    (state) => state.filters.selectedMetrics
  );
  const filters = useAdminAnalyticsStore((state) => state.filters);

  return useQuery({
    queryKey: ["analytics", "metrics", selectedMetrics, filters],
    queryFn: async () => {
      const results = await Promise.all(
        selectedMetrics.map((metric) => fetchMetricAnalytics(metric, filters))
      );
      return results;
    },
    staleTime: 5 * 60 * 1000,
    enabled: selectedMetrics.length > 0,
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook pour générer un rapport
 */
export const useGenerateReport = () => {
  const queryClient = useQueryClient();
  const filters = useAdminAnalyticsStore((state) => state.filters);

  return useMutation({
    mutationFn: ({
      type,
      format,
    }: {
      type: AnalyticsReport["type"];
      format: "csv" | "xlsx" | "pdf";
    }) => generateReport(type, filters, format),
    onSuccess: () => {
      // Invalider le cache des rapports
      queryClient.invalidateQueries({ queryKey: ["analytics", "reports"] });
    },
  });
};

/**
 * Hook pour sauvegarder une configuration d'alerte
 */
export const useSaveAlertConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: Omit<AlertConfig, "id">) => saveAlertConfig(config),
    onSuccess: () => {
      // Invalider le cache des alertes
      queryClient.invalidateQueries({ queryKey: ["analytics", "alerts"] });
    },
  });
};

/**
 * Hook pour actualiser les données analytics
 */
export const useRefreshAnalytics = () => {
  const queryClient = useQueryClient();
  const setRefreshing = useAdminAnalyticsStore((state) => state.setRefreshing);

  return useMutation({
    mutationFn: async () => {
      setRefreshing(true);
      await delay(1000);
      setRefreshing(false);
    },
    onSuccess: () => {
      // Invalider toutes les queries analytics
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
};

// ============================================================================
// HELPER HOOKS
// ============================================================================

/**
 * Hook pour obtenir l'état de chargement global
 */
export const useAnalyticsLoading = () => {
  const kpisQuery = useAnalyticsKPIs();
  const metricsQuery = useSelectedMetricsAnalytics();

  return kpisQuery.isLoading || metricsQuery.isLoading;
};

/**
 * Hook pour obtenir l'état d'erreur global
 */
export const useAnalyticsError = () => {
  const kpisQuery = useAnalyticsKPIs();
  const metricsQuery = useSelectedMetricsAnalytics();

  return kpisQuery.error || metricsQuery.error;
};

/**
 * Hook pour vérifier si des données sont disponibles
 */
export const useHasAnalyticsData = () => {
  const kpisQuery = useAnalyticsKPIs();
  const metricsQuery = useSelectedMetricsAnalytics();

  return Boolean(kpisQuery.data && metricsQuery.data);
};
