/**
 * VIAMENTOR - Platform Admin Data
 * Mock data et types pour dashboard Platform Admin
 *
 * FEATURES:
 * - Stats système multi-tenant
 * - Monitoring infrastructure
 * - Gestion tenants avancée
 * - Configuration globale
 * - Audit logs système
 * - Alertes et incidents
 */

// ============================================================================
// TYPES
// ============================================================================

export type PlatformAdminLocale = "fr" | "de" | "it" | "en";

export type TenantStatus =
  | "active"
  | "suspended"
  | "trial"
  | "pending"
  | "cancelled";
export type SubscriptionPlan =
  | "starter"
  | "professional"
  | "enterprise"
  | "custom";
export type SystemHealthStatus =
  | "healthy"
  | "degraded"
  | "critical"
  | "maintenance";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "open" | "investigating" | "resolved" | "closed";

// ============================================================================
// SYSTEM STATS
// ============================================================================

export interface SystemStats {
  tenants: {
    total: number;
    active: number;
    trial: number;
    suspended: number;
    newThisMonth: number;
    churnRate: number;
  };
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    averagePerTenant: number;
  };
  revenue: {
    mrr: number;
    arr: number;
    growth: number;
    churnMrr: number;
  };
  infrastructure: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    requestsPerSecond: number;
  };
}

// ============================================================================
// TENANT OVERVIEW
// ============================================================================

export interface PlatformTenant {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  plan: SubscriptionPlan;
  createdAt: string;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  users: {
    total: number;
    active: number;
    admins: number;
  };
  usage: {
    storage: number;
    storageLimit: number;
    apiCalls: number;
    apiLimit: number;
  };
  billing: {
    mrr: number;
    lastPayment?: string;
    nextBilling?: string;
    paymentMethod?: string;
  };
  health: {
    status: SystemHealthStatus;
    lastIncident?: string;
    uptime: number;
  };
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
}

// ============================================================================
// SYSTEM HEALTH
// ============================================================================

export interface SystemHealthMetric {
  id: string;
  name: string;
  status: SystemHealthStatus;
  value: number;
  unit: string;
  threshold: number;
  lastCheck: string;
  trend: "up" | "down" | "stable";
}

export interface SystemComponent {
  id: string;
  name: string;
  type: "database" | "api" | "storage" | "cache" | "queue" | "cdn";
  status: SystemHealthStatus;
  uptime: number;
  responseTime: number;
  lastIncident?: string;
  region: string;
}

// ============================================================================
// INCIDENTS
// ============================================================================

export interface SystemIncident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedTenants: number;
  affectedUsers: number;
  component: string;
  startedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  updates: IncidentUpdate[];
}

export interface IncidentUpdate {
  id: string;
  timestamp: string;
  author: string;
  message: string;
  status: IncidentStatus;
}

// ============================================================================
// AUDIT LOGS
// ============================================================================

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  action: string;
  resource: string;
  resourceId: string;
  tenantId?: string;
  tenantName?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  result: "success" | "failure";
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface PlatformConfiguration {
  general: {
    maintenanceMode: boolean;
    allowNewSignups: boolean;
    defaultPlan: SubscriptionPlan;
    trialDuration: number;
  };
  security: {
    enforceSSO: boolean;
    enforce2FA: boolean;
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
  };
  limits: {
    maxUsersPerTenant: Record<SubscriptionPlan, number>;
    maxStoragePerTenant: Record<SubscriptionPlan, number>;
    maxApiCallsPerMonth: Record<SubscriptionPlan, number>;
  };
  features: {
    enabledFeatures: string[];
    betaFeatures: string[];
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockSystemStats: SystemStats = {
  tenants: {
    total: 247,
    active: 198,
    trial: 32,
    suspended: 17,
    newThisMonth: 24,
    churnRate: 3.2,
  },
  users: {
    total: 8456,
    active: 6234,
    newThisMonth: 892,
    averagePerTenant: 34.2,
  },
  revenue: {
    mrr: 124500,
    arr: 1494000,
    growth: 12.5,
    churnMrr: 4200,
  },
  infrastructure: {
    uptime: 99.97,
    responseTime: 145,
    errorRate: 0.03,
    requestsPerSecond: 1247,
  },
};

export const mockPlatformTenants: PlatformTenant[] = [
  {
    id: "tenant-1",
    name: "Auto-École Genève",
    slug: "auto-ecole-geneve",
    status: "active",
    plan: "professional",
    createdAt: "2024-01-15T10:00:00Z",
    users: {
      total: 45,
      active: 38,
      admins: 3,
    },
    usage: {
      storage: 12.5,
      storageLimit: 50,
      apiCalls: 45000,
      apiLimit: 100000,
    },
    billing: {
      mrr: 599,
      lastPayment: "2024-10-01T00:00:00Z",
      nextBilling: "2024-11-01T00:00:00Z",
      paymentMethod: "card",
    },
    health: {
      status: "healthy",
      uptime: 99.98,
    },
    contact: {
      name: "Jean Dupont",
      email: "jean.dupont@auto-ecole-geneve.ch",
      phone: "+41 22 123 45 67",
    },
  },
  {
    id: "tenant-2",
    name: "Fahrschule Zürich",
    slug: "fahrschule-zurich",
    status: "trial",
    plan: "professional",
    createdAt: "2024-10-01T14:30:00Z",
    trialEndsAt: "2024-10-31T23:59:59Z",
    users: {
      total: 12,
      active: 10,
      admins: 1,
    },
    usage: {
      storage: 2.3,
      storageLimit: 50,
      apiCalls: 8500,
      apiLimit: 100000,
    },
    billing: {
      mrr: 0,
    },
    health: {
      status: "healthy",
      uptime: 100,
    },
    contact: {
      name: "Hans Müller",
      email: "hans.mueller@fahrschule-zurich.ch",
      phone: "+41 44 987 65 43",
    },
  },
  {
    id: "tenant-3",
    name: "Scuola Guida Lugano",
    slug: "scuola-guida-lugano",
    status: "active",
    plan: "enterprise",
    createdAt: "2023-06-20T09:15:00Z",
    users: {
      total: 128,
      active: 105,
      admins: 8,
    },
    usage: {
      storage: 45.8,
      storageLimit: 200,
      apiCalls: 285000,
      apiLimit: 500000,
    },
    billing: {
      mrr: 1499,
      lastPayment: "2024-10-01T00:00:00Z",
      nextBilling: "2024-11-01T00:00:00Z",
      paymentMethod: "invoice",
    },
    health: {
      status: "healthy",
      lastIncident: "2024-09-15T08:30:00Z",
      uptime: 99.95,
    },
    contact: {
      name: "Marco Rossi",
      email: "marco.rossi@scuola-lugano.ch",
      phone: "+41 91 456 78 90",
    },
  },
  {
    id: "tenant-4",
    name: "École de Conduite Lausanne",
    slug: "ecole-conduite-lausanne",
    status: "suspended",
    plan: "professional",
    createdAt: "2023-11-10T11:20:00Z",
    users: {
      total: 34,
      active: 0,
      admins: 2,
    },
    usage: {
      storage: 8.2,
      storageLimit: 50,
      apiCalls: 0,
      apiLimit: 100000,
    },
    billing: {
      mrr: 599,
      lastPayment: "2024-08-01T00:00:00Z",
    },
    health: {
      status: "degraded",
      lastIncident: "2024-09-01T12:00:00Z",
      uptime: 0,
    },
    contact: {
      name: "Pierre Martin",
      email: "pierre.martin@ecole-lausanne.ch",
      phone: "+41 21 345 67 89",
    },
  },
];

export const mockSystemComponents: SystemComponent[] = [
  {
    id: "db-primary",
    name: "Database Primary",
    type: "database",
    status: "healthy",
    uptime: 99.99,
    responseTime: 12,
    region: "eu-west-1",
  },
  {
    id: "db-replica",
    name: "Database Replica",
    type: "database",
    status: "healthy",
    uptime: 99.98,
    responseTime: 15,
    region: "eu-central-1",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    type: "api",
    status: "healthy",
    uptime: 99.97,
    responseTime: 45,
    region: "eu-west-1",
  },
  {
    id: "storage-s3",
    name: "Object Storage",
    type: "storage",
    status: "healthy",
    uptime: 100,
    responseTime: 89,
    region: "eu-west-1",
  },
  {
    id: "cache-redis",
    name: "Redis Cache",
    type: "cache",
    status: "healthy",
    uptime: 99.95,
    responseTime: 3,
    region: "eu-west-1",
  },
  {
    id: "queue-rabbitmq",
    name: "Message Queue",
    type: "queue",
    status: "degraded",
    uptime: 99.85,
    responseTime: 125,
    lastIncident: "2024-10-12T14:30:00Z",
    region: "eu-west-1",
  },
  {
    id: "cdn-cloudflare",
    name: "CDN",
    type: "cdn",
    status: "healthy",
    uptime: 99.99,
    responseTime: 23,
    region: "global",
  },
];

export const mockSystemIncidents: SystemIncident[] = [
  {
    id: "inc-001",
    title: "Dégradation performance Message Queue",
    description:
      "Latence élevée détectée sur le service RabbitMQ causant des retards dans le traitement des notifications",
    severity: "medium",
    status: "investigating",
    affectedTenants: 12,
    affectedUsers: 456,
    component: "queue-rabbitmq",
    startedAt: "2024-10-16T14:30:00Z",
    assignedTo: "DevOps Team",
    updates: [
      {
        id: "upd-001",
        timestamp: "2024-10-16T14:35:00Z",
        author: "System",
        message: "Incident détecté automatiquement - Latence > 100ms",
        status: "open",
      },
      {
        id: "upd-002",
        timestamp: "2024-10-16T14:40:00Z",
        author: "Thomas Weber",
        message: "Investigation en cours - Vérification des ressources serveur",
        status: "investigating",
      },
    ],
  },
  {
    id: "inc-002",
    title: "Pic de trafic API Gateway",
    description: "Augmentation inhabituelle du trafic API détectée",
    severity: "low",
    status: "resolved",
    affectedTenants: 0,
    affectedUsers: 0,
    component: "api-gateway",
    startedAt: "2024-10-15T09:15:00Z",
    resolvedAt: "2024-10-15T09:45:00Z",
    assignedTo: "Platform Team",
    updates: [
      {
        id: "upd-003",
        timestamp: "2024-10-15T09:15:00Z",
        author: "System",
        message: "Alerte: Trafic API +250% par rapport à la normale",
        status: "open",
      },
      {
        id: "upd-004",
        timestamp: "2024-10-15T09:30:00Z",
        author: "Sarah Chen",
        message:
          "Cause identifiée: Campagne marketing d'un tenant. Scaling automatique activé.",
        status: "investigating",
      },
      {
        id: "upd-005",
        timestamp: "2024-10-15T09:45:00Z",
        author: "Sarah Chen",
        message: "Résolu: Capacité augmentée, performance normale rétablie",
        status: "resolved",
      },
    ],
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "log-001",
    timestamp: "2024-10-16T15:23:45Z",
    actor: {
      id: "admin-1",
      name: "Platform Admin",
      email: "admin@viamentor.ch",
      role: "platform_admin",
    },
    action: "tenant.suspend",
    resource: "tenant",
    resourceId: "tenant-4",
    tenantId: "tenant-4",
    tenantName: "École de Conduite Lausanne",
    details: {
      reason: "Non-paiement après 60 jours",
      previousStatus: "active",
      newStatus: "suspended",
    },
    ipAddress: "185.12.45.67",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    result: "success",
  },
  {
    id: "log-002",
    timestamp: "2024-10-16T14:15:22Z",
    actor: {
      id: "admin-1",
      name: "Platform Admin",
      email: "admin@viamentor.ch",
      role: "platform_admin",
    },
    action: "config.update",
    resource: "platform_configuration",
    resourceId: "config-general",
    details: {
      field: "allowNewSignups",
      oldValue: false,
      newValue: true,
    },
    ipAddress: "185.12.45.67",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    result: "success",
  },
  {
    id: "log-003",
    timestamp: "2024-10-16T11:45:10Z",
    actor: {
      id: "admin-2",
      name: "Support Admin",
      email: "support@viamentor.ch",
      role: "platform_admin",
    },
    action: "tenant.impersonate",
    resource: "tenant",
    resourceId: "tenant-2",
    tenantId: "tenant-2",
    tenantName: "Fahrschule Zürich",
    details: {
      reason: "Support technique demandé par le client",
      duration: "30 minutes",
    },
    ipAddress: "185.12.45.68",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    result: "success",
  },
];

export const mockPlatformConfiguration: PlatformConfiguration = {
  general: {
    maintenanceMode: false,
    allowNewSignups: true,
    defaultPlan: "professional",
    trialDuration: 30,
  },
  security: {
    enforceSSO: false,
    enforce2FA: true,
    sessionTimeout: 3600,
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
  },
  limits: {
    maxUsersPerTenant: {
      starter: 10,
      professional: 50,
      enterprise: 500,
      custom: 9999,
    },
    maxStoragePerTenant: {
      starter: 10,
      professional: 50,
      enterprise: 200,
      custom: 1000,
    },
    maxApiCallsPerMonth: {
      starter: 10000,
      professional: 100000,
      enterprise: 500000,
      custom: 9999999,
    },
  },
  features: {
    enabledFeatures: [
      "multi_tenant",
      "rbac",
      "audit_logs",
      "api_access",
      "webhooks",
      "sso",
      "2fa",
      "custom_branding",
    ],

    betaFeatures: ["ai_assistant", "advanced_analytics", "mobile_app"],
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTenantStatusColor(status: TenantStatus): string {
  const colors: Record<TenantStatus, string> = {
    active: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950",
    trial: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
    suspended: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
    pending:
      "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950",
    cancelled: "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950",
  };
  return colors[status];
}

export function getHealthStatusColor(status: SystemHealthStatus): string {
  const colors: Record<SystemHealthStatus, string> = {
    healthy: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950",
    degraded:
      "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950",
    critical: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
    maintenance: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
  };
  return colors[status];
}

export function getIncidentSeverityColor(severity: IncidentSeverity): string {
  const colors: Record<IncidentSeverity, string> = {
    low: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
    medium:
      "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950",
    high: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
    critical: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
  };
  return colors[severity];
}

export function formatUptime(uptime: number): string {
  return `${uptime.toFixed(2)}%`;
}

export function formatResponseTime(ms: number): string {
  return `${ms}ms`;
}

export function calculateUsagePercentage(used: number, limit: number): number {
  return (used / limit) * 100;
}
