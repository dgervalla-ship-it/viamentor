/**
 * VIAMENTOR - Pixels Monitoring Data
 *
 * Mock data et types pour monitoring santé pixels tracking
 */

import {
  pixelsMonitoringTranslations,
  type PixelsMonitoringLocale,
} from "@/viamentor/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

export type PlatformType = "meta" | "google" | "tiktok" | "linkedin";
export type PixelStatus = "operational" | "degraded" | "offline";
export type EventType =
  | "pageView"
  | "purchase"
  | "lead"
  | "addToCart"
  | "initiateCheckout";
export type EventStatus = "sent" | "failed" | "pending" | "retrying";
export type AlertSeverity = "critical" | "warning" | "info";
export type NotificationFrequency = "realtime" | "hourly" | "daily" | "weekly";

export interface PlatformHealth {
  id: string;
  platform: PlatformType;
  name: string;
  logo: string;
  status: PixelStatus;
  lastCheck: Date;
  stats: {
    eventsSentToday: number;
    errors: number;
    successRate: number;
    avgLatency: number;
  };
  pixelId: string;
  isConfigured: boolean;
}

export interface PixelAlert {
  id: string;
  platform: PlatformType;
  severity: AlertSeverity;
  title: string;
  description: string;
  detectedAt: Date;
  isIgnored: boolean;
  ignoredUntil?: Date;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  status: "pending" | "running" | "passed" | "failed";
  details?: string;
  error?: string;
  duration?: number;
}

export interface PixelEvent {
  id: string;
  timestamp: Date;
  eventType: EventType;
  platform: PlatformType;
  status: EventStatus;
  parameters: Record<string, any>;
  response?: {
    statusCode: number;
    message: string;
    body?: any;
  };
  retryCount: number;
  error?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  recipients: string[];
  frequency: NotificationFrequency;
  types: {
    pixelOffline: boolean;
    highErrorRate: boolean;
    budgetExhausted: boolean;
    newConversion: boolean;
  };
}

export interface HealthReport {
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    uptime: number;
    totalEvents: number;
    globalSuccessRate: number;
  };
  platforms: Array<{
    platform: PlatformType;
    uptime: number;
    events: number;
    successRate: number;
  }>;
  alerts: Array<{
    severity: AlertSeverity;
    count: number;
    avgResolutionTime: number;
  }>;
  recommendations: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockPlatformsHealth: PlatformHealth[] = [
  {
    id: "plat-1",
    platform: "meta",
    name: "Meta (Facebook/Instagram)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    status: "operational",
    lastCheck: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    stats: {
      eventsSentToday: 1247,
      errors: 3,
      successRate: 99.8,
      avgLatency: 145,
    },
    pixelId: "1234567890123456",
    isConfigured: true,
  },
  {
    id: "plat-2",
    platform: "google",
    name: "Google Ads",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg",
    status: "operational",
    lastCheck: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1h ago
    stats: {
      eventsSentToday: 2134,
      errors: 12,
      successRate: 99.4,
      avgLatency: 98,
    },
    pixelId: "AW-123456789",
    isConfigured: true,
  },
  {
    id: "plat-3",
    platform: "tiktok",
    name: "TikTok Ads",
    logo: "https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png",
    status: "offline",
    lastCheck: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
    stats: {
      eventsSentToday: 0,
      errors: 45,
      successRate: 0,
      avgLatency: 0,
    },
    pixelId: "TIKTOK123456",
    isConfigured: true,
  },
  {
    id: "plat-4",
    platform: "linkedin",
    name: "LinkedIn Ads",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    status: "degraded",
    lastCheck: new Date(Date.now() - 30 * 60 * 1000), // 30min ago
    stats: {
      eventsSentToday: 456,
      errors: 67,
      successRate: 85.3,
      avgLatency: 342,
    },
    pixelId: "12345678",
    isConfigured: true,
  },
];

export const mockPixelAlerts: PixelAlert[] = [
  {
    id: "alert-1",
    platform: "tiktok",
    severity: "critical",
    title: "Pixel TikTok inactif depuis 6h",
    description:
      "Aucun événement reçu TikTok API. Conversions TikTok non trackées. Vérifiez configuration pixel ID token permissions.",
    detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isIgnored: false,
  },
  {
    id: "alert-2",
    platform: "linkedin",
    severity: "warning",
    title: "Taux d'erreur élevé LinkedIn (14.7%)",
    description:
      "Le taux d'erreur dépasse le seuil acceptable. Latence API élevée détectée. Vérifiez connexion réseau et limites API.",
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isIgnored: false,
  },
];

export const mockPixelEvents: PixelEvent[] = [
  {
    id: "evt-1",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    eventType: "lead",
    platform: "meta",
    status: "sent",
    parameters: {
      email: "jean.dupont@example.com",
      phone: "+41791234567",
      category: "permis_b",
      source: "google",
      campaign: "auto-ecole-geneve",
    },
    response: {
      statusCode: 200,
      message: "Event received",
      body: { event_id: "evt_meta_123" },
    },
    retryCount: 0,
  },
  {
    id: "evt-2",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    eventType: "pageView",
    platform: "google",
    status: "sent",
    parameters: {
      page_url: "https://viamentor.ch/contact",
      page_title: "Contact - Viamentor",
    },
    response: {
      statusCode: 200,
      message: "Success",
    },
    retryCount: 0,
  },
  {
    id: "evt-3",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    eventType: "lead",
    platform: "tiktok",
    status: "failed",
    parameters: {
      email: "marie.martin@example.com",
      category: "permis_a",
    },
    response: {
      statusCode: 401,
      message: "Unauthorized - Invalid access token",
    },
    retryCount: 3,
    error: "Authentication failed: Token expired",
  },
  {
    id: "evt-4",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    eventType: "purchase",
    platform: "linkedin",
    status: "retrying",
    parameters: {
      value: 1500,
      currency: "CHF",
      transaction_id: "txn_123",
    },
    response: {
      statusCode: 503,
      message: "Service temporarily unavailable",
    },
    retryCount: 2,
    error: "API rate limit exceeded",
  },
];

export const mockNotificationSettings: NotificationSettings = {
  enabled: true,
  recipients: ["admin@viamentor.ch", "marketing@viamentor.ch"],
  frequency: "hourly",
  types: {
    pixelOffline: true,
    highErrorRate: true,
    budgetExhausted: true,
    newConversion: false,
  },
};

export const mockHealthReport: HealthReport = {
  period: {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  },
  summary: {
    uptime: 99.2,
    totalEvents: 45678,
    globalSuccessRate: 96.8,
  },
  platforms: [
    {
      platform: "meta",
      uptime: 99.9,
      events: 18234,
      successRate: 99.7,
    },
    {
      platform: "google",
      uptime: 99.8,
      events: 21456,
      successRate: 99.3,
    },
    {
      platform: "tiktok",
      uptime: 87.5,
      events: 3456,
      successRate: 78.2,
    },
    {
      platform: "linkedin",
      uptime: 98.2,
      events: 2532,
      successRate: 94.5,
    },
  ],

  alerts: [
    {
      severity: "critical",
      count: 3,
      avgResolutionTime: 4.5,
    },
    {
      severity: "warning",
      count: 12,
      avgResolutionTime: 2.3,
    },
    {
      severity: "info",
      count: 8,
      avgResolutionTime: 1.2,
    },
  ],

  recommendations: [
    "Renouveler le token d'accès TikTok avant expiration",
    "Augmenter les limites API LinkedIn pour éviter throttling",
    "Configurer alertes SMS pour incidents critiques",
    "Mettre en place redondance multi-régions pour haute disponibilité",
  ],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getStatusColor(status: PixelStatus): string {
  switch (status) {
    case "operational":
      return "text-green-600 dark:text-green-400";
    case "degraded":
      return "text-orange-600 dark:text-orange-400";
    case "offline":
      return "text-red-600 dark:text-red-400";
  }
}

export function getStatusBadgeVariant(
  status: PixelStatus
): "default" | "secondary" | "destructive" {
  switch (status) {
    case "operational":
      return "default";
    case "degraded":
      return "secondary";
    case "offline":
      return "destructive";
  }
}

export function getSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "text-red-600 dark:text-red-400";
    case "warning":
      return "text-orange-600 dark:text-orange-400";
    case "info":
      return "text-blue-600 dark:text-blue-400";
  }
}

export function formatRelativeTime(
  date: Date,
  locale: PixelsMonitoringLocale = "fr"
): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else {
    return `${days}j`;
  }
}

export function getEventTypeColor(eventType: EventType): string {
  switch (eventType) {
    case "pageView":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "purchase":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "lead":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "addToCart":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "initiateCheckout":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  }
}

export function getEventStatusColor(status: EventStatus): string {
  switch (status) {
    case "sent":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "pending":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    case "retrying":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
  }
}
