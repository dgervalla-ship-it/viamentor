/**
 * VIAMENTOR - Admin Analytics Store
 *
 * Store Zustand pour gestion état UI analytics admin
 *
 * @module viamentor-admin-analytics-store
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Période d'analyse
 */
export type AnalyticsPeriod = "7d" | "30d" | "90d" | "1y" | "all" | "custom";

/**
 * Type de métrique
 */
export type MetricType =
  | "revenue"
  | "users"
  | "tenants"
  | "subscriptions"
  | "churn"
  | "growth";

/**
 * Granularité des données
 */
export type DataGranularity =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

/**
 * Type de graphique
 */
export type ChartType = "line" | "bar" | "area" | "pie" | "donut" | "radar";

/**
 * Filtres analytics admin
 */
export interface AdminAnalyticsFilters {
  // Période
  period: AnalyticsPeriod;
  startDate: Date | null;
  endDate: Date | null;

  // Métriques
  selectedMetrics: MetricType[];

  // Filtres tenants
  tenantIds: string[];
  tenantPlans: string[];
  tenantStatus: string[];

  // Filtres géographiques
  countries: string[];
  cantons: string[];

  // Comparaison
  compareEnabled: boolean;
  comparePeriod: AnalyticsPeriod | null;
}

/**
 * Préférences affichage analytics
 */
export interface AdminAnalyticsPreferences {
  // Graphiques
  defaultChartType: ChartType;
  dataGranularity: DataGranularity;
  showTrendlines: boolean;
  showForecasts: boolean;

  // Tableaux
  defaultPageSize: number;
  showPercentages: boolean;
  showComparisons: boolean;

  // Export
  defaultExportFormat: "csv" | "xlsx" | "pdf";
  includeCharts: boolean;

  // Notifications
  enableAlerts: boolean;
  alertThresholds: Record<MetricType, number>;
}

/**
 * État du store analytics admin
 */
export interface AdminAnalyticsState {
  // Filtres
  filters: AdminAnalyticsFilters;

  // Préférences
  preferences: AdminAnalyticsPreferences;

  // UI State
  activeTab: "overview" | "revenue" | "tenants" | "users" | "performance";
  selectedMetric: MetricType | null;

  // Modals
  isExportModalOpen: boolean;
  isScheduleReportModalOpen: boolean;
  isAlertConfigModalOpen: boolean;

  // Loading
  isRefreshing: boolean;
  lastRefresh: Date | null;

  // Actions - Filtres
  setFilters: (filters: Partial<AdminAnalyticsFilters>) => void;
  setPeriod: (period: AnalyticsPeriod) => void;
  setCustomDateRange: (startDate: Date, endDate: Date) => void;
  toggleMetric: (metric: MetricType) => void;
  setTenantFilters: (
    tenantIds: string[],
    plans: string[],
    status: string[]
  ) => void;
  toggleCompare: (enabled: boolean, period?: AnalyticsPeriod) => void;
  resetFilters: () => void;

  // Actions - Préférences
  setPreferences: (preferences: Partial<AdminAnalyticsPreferences>) => void;
  setChartType: (type: ChartType) => void;
  setDataGranularity: (granularity: DataGranularity) => void;
  setAlertThreshold: (metric: MetricType, threshold: number) => void;

  // Actions - UI
  setActiveTab: (tab: AdminAnalyticsState["activeTab"]) => void;
  setSelectedMetric: (metric: MetricType | null) => void;

  // Actions - Modals
  openExportModal: () => void;
  closeExportModal: () => void;
  openScheduleReportModal: () => void;
  closeScheduleReportModal: () => void;
  openAlertConfigModal: () => void;
  closeAlertConfigModal: () => void;

  // Actions - Data
  refresh: () => void;
  setRefreshing: (isRefreshing: boolean) => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: AdminAnalyticsFilters = {
  period: "30d",
  startDate: null,
  endDate: null,
  selectedMetrics: ["revenue", "users", "tenants"],
  tenantIds: [],
  tenantPlans: [],
  tenantStatus: [],
  countries: [],
  cantons: [],
  compareEnabled: false,
  comparePeriod: null,
};

const initialPreferences: AdminAnalyticsPreferences = {
  defaultChartType: "line",
  dataGranularity: "day",
  showTrendlines: true,
  showForecasts: false,
  defaultPageSize: 25,
  showPercentages: true,
  showComparisons: true,
  defaultExportFormat: "xlsx",
  includeCharts: true,
  enableAlerts: true,
  alertThresholds: {
    revenue: 10000,
    users: 100,
    tenants: 10,
    subscriptions: 50,
    churn: 5,
    growth: 10,
  },
};

// ============================================================================
// STORE
// ============================================================================

/**
 * Store Zustand pour analytics admin
 */
export const useAdminAnalyticsStore = create<AdminAnalyticsState>()(
  persist(
    (set) => ({
      // État initial
      filters: initialFilters,
      preferences: initialPreferences,
      activeTab: "overview",
      selectedMetric: null,
      isExportModalOpen: false,
      isScheduleReportModalOpen: false,
      isAlertConfigModalOpen: false,
      isRefreshing: false,
      lastRefresh: null,

      // Actions - Filtres
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      setPeriod: (period) =>
        set((state) => ({
          filters: {
            ...state.filters,
            period,
            startDate: null,
            endDate: null,
          },
        })),

      setCustomDateRange: (startDate, endDate) =>
        set((state) => ({
          filters: {
            ...state.filters,
            period: "custom",
            startDate,
            endDate,
          },
        })),

      toggleMetric: (metric) =>
        set((state) => {
          const selectedMetrics = state.filters.selectedMetrics.includes(metric)
            ? state.filters.selectedMetrics.filter((m) => m !== metric)
            : [...state.filters.selectedMetrics, metric];

          return {
            filters: {
              ...state.filters,
              selectedMetrics,
            },
          };
        }),

      setTenantFilters: (tenantIds, plans, status) =>
        set((state) => ({
          filters: {
            ...state.filters,
            tenantIds,
            tenantPlans: plans,
            tenantStatus: status,
          },
        })),

      toggleCompare: (enabled, period) =>
        set((state) => ({
          filters: {
            ...state.filters,
            compareEnabled: enabled,
            comparePeriod: enabled ? period || state.filters.period : null,
          },
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
        }),

      // Actions - Préférences
      setPreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      setChartType: (type) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            defaultChartType: type,
          },
        })),

      setDataGranularity: (granularity) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            dataGranularity: granularity,
          },
        })),

      setAlertThreshold: (metric, threshold) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            alertThresholds: {
              ...state.preferences.alertThresholds,
              [metric]: threshold,
            },
          },
        })),

      // Actions - UI
      setActiveTab: (tab) => set({ activeTab: tab }),

      setSelectedMetric: (metric) => set({ selectedMetric: metric }),

      // Actions - Modals
      openExportModal: () => set({ isExportModalOpen: true }),
      closeExportModal: () => set({ isExportModalOpen: false }),
      openScheduleReportModal: () => set({ isScheduleReportModalOpen: true }),
      closeScheduleReportModal: () => set({ isScheduleReportModalOpen: false }),
      openAlertConfigModal: () => set({ isAlertConfigModalOpen: true }),
      closeAlertConfigModal: () => set({ isAlertConfigModalOpen: false }),

      // Actions - Data
      refresh: () =>
        set({
          isRefreshing: true,
          lastRefresh: new Date(),
        }),

      setRefreshing: (isRefreshing) => set({ isRefreshing }),
    }),
    {
      name: "viamentor-admin-analytics-store",
      partialize: (state) => ({
        filters: state.filters,
        preferences: state.preferences,
        activeTab: state.activeTab,
      }),
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

/**
 * Sélecteur pour vérifier si des filtres sont actifs
 */
export const useHasActiveFilters = () => {
  const filters = useAdminAnalyticsStore((state) => state.filters);

  return (
    filters.tenantIds.length > 0 ||
    filters.tenantPlans.length > 0 ||
    filters.tenantStatus.length > 0 ||
    filters.countries.length > 0 ||
    filters.cantons.length > 0 ||
    filters.compareEnabled
  );
};

/**
 * Sélecteur pour obtenir la période formatée
 */
export const useFormattedPeriod = () => {
  const { period, startDate, endDate } = useAdminAnalyticsStore(
    (state) => state.filters
  );

  if (period === "custom" && startDate && endDate) {
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  }

  const periodLabels: Record<AnalyticsPeriod, string> = {
    "7d": "7 derniers jours",
    "30d": "30 derniers jours",
    "90d": "90 derniers jours",
    "1y": "1 an",
    all: "Toute la période",
    custom: "Période personnalisée",
  };

  return periodLabels[period];
};
