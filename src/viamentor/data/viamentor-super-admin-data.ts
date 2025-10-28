/**
 * VIAMENTOR - Super Admin Data
 * Mock data et types pour dashboard Super Admin
 *
 * FEATURES:
 * - Stats système globales
 * - Monitoring tenants
 * - Activité plateforme
 * - Sécurité et alertes
 * - Logs système
 */

export type SuperAdminLocale = "fr" | "de" | "it" | "en";

// ============================================================================
// TYPES
// ============================================================================

export interface SystemStats {
  totalTenants: number;
  activeTenants: number;
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  systemHealth: "healthy" | "warning" | "critical";
  uptime: number; // percentage
  apiCalls: number;
  storageUsed: number; // GB
  storageLimit: number; // GB
}

export interface TenantOverview {
  id: string;
  name: string;
  plan: "starter" | "professional" | "enterprise";
  status: "active" | "suspended" | "trial" | "cancelled";
  users: number;
  students: number;
  revenue: number;
  lastActivity: string;
  createdAt: string;
  health: "healthy" | "warning" | "critical";
}

export interface PlatformActivity {
  id: string;
  type:
    | "tenant_created"
    | "tenant_suspended"
    | "payment_received"
    | "system_alert"
    | "security_event";
  tenantId?: string;
  tenantName?: string;
  description: string;
  severity: "info" | "warning" | "error" | "critical";
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface SecurityAlert {
  id: string;
  type:
    | "failed_login"
    | "suspicious_activity"
    | "data_breach_attempt"
    | "permission_escalation";
  tenantId?: string;
  userId?: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved" | "false_positive";
  timestamp: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface SystemLog {
  id: string;
  level: "debug" | "info" | "warn" | "error" | "fatal";
  service: string;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface RevenueMetrics {
  date: string;
  mrr: number;
  arr: number;
  newRevenue: number;
  churnRevenue: number;
}

export interface UsageMetrics {
  date: string;
  apiCalls: number;
  storageGB: number;
  activeUsers: number;
  activeTenants: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockSystemStats: SystemStats = {
  totalTenants: 247,
  activeTenants: 231,
  totalUsers: 3842,
  activeUsers: 2156,
  totalRevenue: 1847500,
  monthlyRevenue: 156800,
  systemHealth: "healthy",
  uptime: 99.97,
  apiCalls: 2847563,
  storageUsed: 847.5,
  storageLimit: 2000,
};

export const mockTenantOverviews: TenantOverview[] = [
  {
    id: "1",
    name: "Auto-École Genève Centre",
    plan: "enterprise",
    status: "active",
    users: 45,
    students: 387,
    revenue: 12500,
    lastActivity: "2025-01-15T14:30:00Z",
    createdAt: "2023-03-15T10:00:00Z",
    health: "healthy",
  },
  {
    id: "2",
    name: "Fahrschule Zürich",
    plan: "professional",
    status: "active",
    users: 28,
    students: 245,
    revenue: 8900,
    lastActivity: "2025-01-15T13:45:00Z",
    createdAt: "2023-06-20T09:00:00Z",
    health: "healthy",
  },
  {
    id: "3",
    name: "Scuola Guida Lugano",
    plan: "professional",
    status: "active",
    users: 22,
    students: 189,
    revenue: 7200,
    lastActivity: "2025-01-15T12:15:00Z",
    createdAt: "2023-08-10T11:30:00Z",
    health: "warning",
  },
  {
    id: "4",
    name: "Auto-École Lausanne",
    plan: "starter",
    status: "trial",
    users: 8,
    students: 45,
    revenue: 0,
    lastActivity: "2025-01-15T10:00:00Z",
    createdAt: "2025-01-10T14:00:00Z",
    health: "healthy",
  },
  {
    id: "5",
    name: "Fahrschule Basel",
    plan: "enterprise",
    status: "suspended",
    users: 35,
    students: 298,
    revenue: 0,
    lastActivity: "2025-01-10T16:30:00Z",
    createdAt: "2023-04-25T08:00:00Z",
    health: "critical",
  },
];

export const mockPlatformActivities: PlatformActivity[] = [
  {
    id: "1",
    type: "tenant_created",
    tenantId: "4",
    tenantName: "Auto-École Lausanne",
    description: "Nouveau tenant créé - Plan Starter (Trial)",
    severity: "info",
    timestamp: "2025-01-15T14:30:00Z",
  },
  {
    id: "2",
    type: "payment_received",
    tenantId: "1",
    tenantName: "Auto-École Genève Centre",
    description: "Paiement reçu - CHF 12'500 (Plan Enterprise)",
    severity: "info",
    timestamp: "2025-01-15T13:15:00Z",
  },
  {
    id: "3",
    type: "security_event",
    tenantId: "5",
    tenantName: "Fahrschule Basel",
    description: "Tentatives de connexion échouées multiples détectées",
    severity: "warning",
    timestamp: "2025-01-15T12:45:00Z",
  },
  {
    id: "4",
    type: "system_alert",
    description: "Utilisation CPU élevée détectée sur serveur DB-02",
    severity: "warning",
    timestamp: "2025-01-15T11:30:00Z",
  },
  {
    id: "5",
    type: "tenant_suspended",
    tenantId: "5",
    tenantName: "Fahrschule Basel",
    description: "Tenant suspendu - Paiement en retard (45 jours)",
    severity: "error",
    timestamp: "2025-01-15T10:00:00Z",
  },
];

export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "1",
    type: "failed_login",
    tenantId: "5",
    userId: "user_123",
    description: "15 tentatives de connexion échouées en 10 minutes",
    severity: "high",
    status: "investigating",
    timestamp: "2025-01-15T12:45:00Z",
  },
  {
    id: "2",
    type: "suspicious_activity",
    tenantId: "3",
    userId: "user_456",
    description: "Accès inhabituel depuis adresse IP étrangère",
    severity: "medium",
    status: "open",
    timestamp: "2025-01-15T11:20:00Z",
  },
  {
    id: "3",
    type: "permission_escalation",
    tenantId: "2",
    userId: "user_789",
    description: "Tentative d'accès à ressources non autorisées",
    severity: "critical",
    status: "resolved",
    timestamp: "2025-01-15T09:30:00Z",
    resolvedAt: "2025-01-15T10:15:00Z",
    resolvedBy: "admin_001",
  },
];

export const mockSystemLogs: SystemLog[] = [
  {
    id: "1",
    level: "error",
    service: "api-gateway",
    message: "Rate limit exceeded for tenant_5",
    timestamp: "2025-01-15T14:35:00Z",
    metadata: { tenantId: "5", endpoint: "/api/students", attempts: 1250 },
  },
  {
    id: "2",
    level: "warn",
    service: "database",
    message: "Slow query detected: SELECT * FROM lessons WHERE...",
    timestamp: "2025-01-15T14:30:00Z",
    metadata: { duration: 3500, query: "SELECT * FROM lessons..." },
  },
  {
    id: "3",
    level: "info",
    service: "auth",
    message: "User login successful",
    timestamp: "2025-01-15T14:25:00Z",
    metadata: { userId: "user_123", tenantId: "1" },
  },
  {
    id: "4",
    level: "error",
    service: "payment",
    message: "Payment processing failed",
    timestamp: "2025-01-15T14:20:00Z",
    metadata: { tenantId: "3", amount: 7200, reason: "card_declined" },
  },
];

export const mockRevenueMetrics: RevenueMetrics[] = [
  {
    date: "2025-01",
    mrr: 156800,
    arr: 1881600,
    newRevenue: 12500,
    churnRevenue: 3200,
  },
  {
    date: "2024-12",
    mrr: 147500,
    arr: 1770000,
    newRevenue: 8900,
    churnRevenue: 2100,
  },
  {
    date: "2024-11",
    mrr: 140700,
    arr: 1688400,
    newRevenue: 15600,
    churnRevenue: 4500,
  },
  {
    date: "2024-10",
    mrr: 129600,
    arr: 1555200,
    newRevenue: 9800,
    churnRevenue: 1800,
  },
  {
    date: "2024-09",
    mrr: 121600,
    arr: 1459200,
    newRevenue: 11200,
    churnRevenue: 2900,
  },
  {
    date: "2024-08",
    mrr: 113300,
    arr: 1359600,
    newRevenue: 7500,
    churnRevenue: 1600,
  },
];

export const mockUsageMetrics: UsageMetrics[] = [
  {
    date: "2025-01-15",
    apiCalls: 284756,
    storageGB: 847.5,
    activeUsers: 2156,
    activeTenants: 231,
  },
  {
    date: "2025-01-14",
    apiCalls: 276543,
    storageGB: 845.2,
    activeUsers: 2089,
    activeTenants: 230,
  },
  {
    date: "2025-01-13",
    apiCalls: 298765,
    storageGB: 843.8,
    activeUsers: 2234,
    activeTenants: 229,
  },
  {
    date: "2025-01-12",
    apiCalls: 265432,
    storageGB: 842.1,
    activeUsers: 1987,
    activeTenants: 228,
  },
  {
    date: "2025-01-11",
    apiCalls: 289654,
    storageGB: 840.5,
    activeUsers: 2145,
    activeTenants: 227,
  },
  {
    date: "2025-01-10",
    apiCalls: 271234,
    storageGB: 838.9,
    activeUsers: 2034,
    activeTenants: 226,
  },
];

export default {
  mockSystemStats,
  mockTenantOverviews,
  mockPlatformActivities,
  mockSecurityAlerts,
  mockSystemLogs,
  mockRevenueMetrics,
  mockUsageMetrics,
};
