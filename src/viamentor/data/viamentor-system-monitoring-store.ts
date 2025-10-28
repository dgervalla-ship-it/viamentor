/**
 * VIAMENTOR - System Monitoring Store
 * Store Zustand pour gestion état UI monitoring système Super Admin
 *
 * Responsabilités:
 * - État monitoring temps réel (health, performance, alertes)
 * - État filtres logs et événements
 * - État notifications et alertes
 * - État dashboards personnalisés
 * - Préférences monitoring
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

type HealthStatus = "healthy" | "degraded" | "critical" | "unknown";
type AlertSeverity = "info" | "warning" | "error" | "critical";
type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type MetricType = "cpu" | "memory" | "disk" | "network" | "database" | "api";

interface SystemHealth {
  status: HealthStatus;
  uptime: number;
  lastCheck: Date;
  services: {
    [key: string]: {
      status: HealthStatus;
      responseTime: number;
      errorRate: number;
    };
  };
}

interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  resolvedAt?: Date;
  source: string;
}

interface LogsFilters {
  search: string;
  levels: LogLevel[];
  sources: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  tenantId?: string;
  userId?: string;
}

interface MetricsConfig {
  refreshInterval: number; // en secondes
  retentionPeriod: number; // en jours
  enabledMetrics: MetricType[];
  thresholds: {
    [key in MetricType]?: {
      warning: number;
      critical: number;
    };
  };
}

interface DashboardWidget {
  id: string;
  type: "chart" | "metric" | "list" | "status";
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: any;
  visible: boolean;
}

interface SystemMonitoringState {
  // Health Status
  health: SystemHealth;
  setHealth: (health: Partial<SystemHealth>) => void;
  isHealthy: () => boolean;

  // Alertes
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "timestamp" | "acknowledged">) => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  clearAlert: (id: string) => void;
  clearAllAlerts: () => void;
  getUnacknowledgedCount: () => number;
  getCriticalCount: () => number;

  // Logs
  logsFilters: LogsFilters;
  setLogsFilters: (filters: Partial<LogsFilters>) => void;
  resetLogsFilters: () => void;

  // Métriques
  metricsConfig: MetricsConfig;
  setMetricsConfig: (config: Partial<MetricsConfig>) => void;
  toggleMetric: (metric: MetricType) => void;
  setThreshold: (
    metric: MetricType,
    level: "warning" | "critical",
    value: number
  ) => void;

  // Dashboard
  widgets: DashboardWidget[];
  addWidget: (widget: Omit<DashboardWidget, "id">) => void;
  updateWidget: (id: string, updates: Partial<DashboardWidget>) => void;
  removeWidget: (id: string) => void;
  toggleWidgetVisibility: (id: string) => void;
  reorderWidgets: (widgets: DashboardWidget[]) => void;

  // Notifications
  notifications: {
    enabled: boolean;
    channels: {
      email: boolean;
      slack: boolean;
      webhook: boolean;
    };
    minSeverity: AlertSeverity;
    quietHours: {
      enabled: boolean;
      start: string; // HH:mm
      end: string; // HH:mm
    };
  };
  setNotifications: (
    notifications: Partial<SystemMonitoringState["notifications"]>
  ) => void;

  // Auto-refresh
  autoRefresh: {
    enabled: boolean;
    interval: number; // en secondes
    lastRefresh: Date | null;
  };
  setAutoRefresh: (
    config: Partial<SystemMonitoringState["autoRefresh"]>
  ) => void;
  triggerRefresh: () => void;

  // Préférences
  preferences: {
    compactView: boolean;
    showResolvedAlerts: boolean;
    groupAlertsBySource: boolean;
    defaultTimeRange: "1h" | "6h" | "24h" | "7d" | "30d";
    chartType: "line" | "area" | "bar";
  };
  setPreferences: (
    prefs: Partial<SystemMonitoringState["preferences"]>
  ) => void;
}

// ============================================================================
// DEFAULTS
// ============================================================================

const DEFAULT_HEALTH: SystemHealth = {
  status: "healthy",
  uptime: 0,
  lastCheck: new Date(),
  services: {},
};

const DEFAULT_LOGS_FILTERS: LogsFilters = {
  search: "",
  levels: [],
  sources: [],
};

const DEFAULT_METRICS_CONFIG: MetricsConfig = {
  refreshInterval: 30,
  retentionPeriod: 30,
  enabledMetrics: ["cpu", "memory", "disk", "network", "database", "api"],
  thresholds: {
    cpu: { warning: 70, critical: 90 },
    memory: { warning: 80, critical: 95 },
    disk: { warning: 85, critical: 95 },
  },
};

const DEFAULT_NOTIFICATIONS = {
  enabled: true,
  channels: {
    email: true,
    slack: false,
    webhook: false,
  },
  minSeverity: "warning" as AlertSeverity,
  quietHours: {
    enabled: false,
    start: "22:00",
    end: "08:00",
  },
};

const DEFAULT_AUTO_REFRESH = {
  enabled: true,
  interval: 30,
  lastRefresh: null,
};

const DEFAULT_PREFERENCES = {
  compactView: false,
  showResolvedAlerts: false,
  groupAlertsBySource: true,
  defaultTimeRange: "24h" as const,
  chartType: "line" as const,
};

// ============================================================================
// STORE
// ============================================================================

export const useSystemMonitoringStore = create<SystemMonitoringState>()(
  persist(
    (set, get) => ({
      // Health Status
      health: DEFAULT_HEALTH,
      setHealth: (health) =>
        set((state) => ({
          health: { ...state.health, ...health, lastCheck: new Date() },
        })),
      isHealthy: () => {
        const { health } = get();
        return health.status === "healthy" || health.status === "degraded";
      },

      // Alertes
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            {
              ...alert,
              id: `alert-${Date.now()}`,
              timestamp: new Date(),
              acknowledged: false,
            },
            ...state.alerts,
          ],
        })),
      acknowledgeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, acknowledged: true } : alert
          ),
        })),
      resolveAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id
              ? { ...alert, acknowledged: true, resolvedAt: new Date() }
              : alert
          ),
        })),
      clearAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      clearAllAlerts: () => set({ alerts: [] }),
      getUnacknowledgedCount: () =>
        get().alerts.filter((a) => !a.acknowledged).length,
      getCriticalCount: () =>
        get().alerts.filter((a) => a.severity === "critical" && !a.resolvedAt)
          .length,

      // Logs
      logsFilters: DEFAULT_LOGS_FILTERS,
      setLogsFilters: (filters) =>
        set((state) => ({
          logsFilters: { ...state.logsFilters, ...filters },
        })),
      resetLogsFilters: () => set({ logsFilters: DEFAULT_LOGS_FILTERS }),

      // Métriques
      metricsConfig: DEFAULT_METRICS_CONFIG,
      setMetricsConfig: (config) =>
        set((state) => ({
          metricsConfig: { ...state.metricsConfig, ...config },
        })),
      toggleMetric: (metric) =>
        set((state) => ({
          metricsConfig: {
            ...state.metricsConfig,
            enabledMetrics: state.metricsConfig.enabledMetrics.includes(metric)
              ? state.metricsConfig.enabledMetrics.filter((m) => m !== metric)
              : [...state.metricsConfig.enabledMetrics, metric],
          },
        })),
      setThreshold: (metric, level, value) =>
        set((state) => ({
          metricsConfig: {
            ...state.metricsConfig,
            thresholds: {
              ...state.metricsConfig.thresholds,
              [metric]: {
                ...state.metricsConfig.thresholds[metric],
                [level]: value,
              },
            },
          },
        })),

      // Dashboard
      widgets: [],
      addWidget: (widget) =>
        set((state) => ({
          widgets: [
            ...state.widgets,
            { ...widget, id: `widget-${Date.now()}` },
          ],
        })),
      updateWidget: (id, updates) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, ...updates } : widget
          ),
        })),
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),
      toggleWidgetVisibility: (id) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, visible: !widget.visible } : widget
          ),
        })),
      reorderWidgets: (widgets) => set({ widgets }),

      // Notifications
      notifications: DEFAULT_NOTIFICATIONS,
      setNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),

      // Auto-refresh
      autoRefresh: DEFAULT_AUTO_REFRESH,
      setAutoRefresh: (config) =>
        set((state) => ({
          autoRefresh: { ...state.autoRefresh, ...config },
        })),
      triggerRefresh: () =>
        set((state) => ({
          autoRefresh: { ...state.autoRefresh, lastRefresh: new Date() },
        })),

      // Préférences
      preferences: DEFAULT_PREFERENCES,
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: "viamentor-system-monitoring-storage",
      partialize: (state) => ({
        logsFilters: state.logsFilters,
        metricsConfig: state.metricsConfig,
        widgets: state.widgets,
        notifications: state.notifications,
        autoRefresh: {
          enabled: state.autoRefresh.enabled,
          interval: state.autoRefresh.interval,
          lastRefresh: null,
        },
        preferences: state.preferences,
      }),
    }
  )
);
