/**
 * VIAMENTOR - System Settings Data
 * Mock data et types pour paramètres système avancés
 */

// ============================================================================
// TYPES - INTEGRATIONS
// ============================================================================

export interface CalendarIntegration {
  id: string;
  provider: "google" | "outlook" | "icloud";
  enabled: boolean;
  connectedEmail?: string;
  connectedAt?: string;
  selectedCalendar?: string;
  syncPracticalLessons: boolean;
  syncTheoryCourses: boolean;
  eventColor: string;
  lastSync?: string;
}

export interface PaymentIntegration {
  id: string;
  provider: "stripe" | "twint" | "postfinance";
  enabled: boolean;
  apiKeyPublic?: string;
  apiKeySecret?: string;
  mode: "test" | "production";
  webhookSecret?: string;
  merchantId?: string;
  transactionCount?: number;
  transactionVolume?: number;
  lastTransaction?: string;
}

export interface AccountingIntegration {
  id: string;
  provider: "banana" | "bexio" | "sage" | "excel";
  enabled: boolean;
  format?: "txt" | "csv" | "xml";
  accountMapping?: Record<string, string>;
  apiKey?: string;
  organizationId?: string;
  autoSyncDaily: boolean;
  syncTime?: string;
  lastExport?: string;
  exportStatus?: "success" | "error" | "pending";
  errorLog?: string[];
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  permissions: ("read" | "write" | "admin")[];
  isActive: boolean;
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  lastDelivery?: string;
  deliveryStatus?: "success" | "error";
  createdAt: string;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  timestamp: string;
  event: string;
  httpCode: number;
  payload: any;
  response?: any;
  error?: string;
}

// ============================================================================
// TYPES - SECURITY
// ============================================================================

export interface SecuritySettings {
  twoFactorAuth: {
    enabled: boolean;
    method: "totp" | "sms" | "email";
    enforceForAdmins: boolean;
    rememberDevice: boolean;
    rememberDeviceDays: number;
  };
  sessionManagement: {
    sessionDurationMinutes: number;
    maxLoginAttempts: number;
    lockoutDurationMinutes: number;
  };
  passwordPolicy: {
    enforceStrongPolicy: boolean;
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    expirationDays: number | null;
    historyCount: number;
  };
  accessControl: {
    auditLogsEnabled: boolean;
    auditRetentionMonths: number;
    ipWhitelistEnabled: boolean;
    whitelistedIPs: string[];
    timeRestrictionEnabled: boolean;
    allowedHoursStart?: string;
    allowedHoursEnd?: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "error";
}

// ============================================================================
// TYPES - COMPLIANCE
// ============================================================================

export interface GDPRSettings {
  strictMode: boolean;
  dpoEmail: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
  lastRevisionDate: string;
  explicitConsents: boolean;
  rightToErasure: boolean;
  erasureGracePeriodDays: number;
  dataPortability: boolean;
  inactivityRetentionMonths: number;
}

export interface CookieSettings {
  bannerEnabled: boolean;
  bannerText: Record<string, string>;
  essentialCookies: boolean;
  analyticsCookies: boolean;
  marketingCookies: boolean;
  thirdPartyCookies: boolean;
  blockOnRefusal: boolean;
  cookiePolicyUrl?: string;
  googleAnalyticsId?: string;
  anonymizeIP: boolean;
}

// ============================================================================
// TYPES - ADVANCED
// ============================================================================

export interface BackupConfig {
  autoBackupEnabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  backupTime: string;
  retentionDays: number;
  provider: "s3" | "dropbox" | "google";
  credentials?: Record<string, string>;
  lastBackup?: string;
  lastBackupSize?: number;
  lastBackupStatus?: "success" | "error";
}

export interface BackupHistory {
  id: string;
  date: string;
  size: number;
  type: "auto" | "manual";
  status: "success" | "error" | "pending";
  downloadUrl?: string;
}

export interface MaintenanceSettings {
  maintenanceMode: boolean;
  maintenanceMessage: Record<string, string>;
  estimatedEndTime?: string;
  allowedUserIds: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockCalendarIntegrations: CalendarIntegration[] = [
  {
    id: "cal-1",
    provider: "google",
    enabled: true,
    connectedEmail: "ecole@viamentor.ch",
    connectedAt: "2024-01-15T10:30:00Z",
    selectedCalendar: "primary",
    syncPracticalLessons: true,
    syncTheoryCourses: true,
    eventColor: "#4285F4",
    lastSync: "2024-03-15T14:25:00Z",
  },
  {
    id: "cal-2",
    provider: "outlook",
    enabled: false,
    syncPracticalLessons: false,
    syncTheoryCourses: false,
    eventColor: "#0078D4",
  },
  {
    id: "cal-3",
    provider: "icloud",
    enabled: false,
    syncPracticalLessons: false,
    syncTheoryCourses: false,
    eventColor: "#007AFF",
  },
];

export const mockPaymentIntegrations: PaymentIntegration[] = [
  {
    id: "pay-1",
    provider: "stripe",
    enabled: true,
    apiKeyPublic: "pk_test_51H...",
    apiKeySecret: "sk_test_51H...",
    mode: "production",
    webhookSecret: "whsec_...",
    transactionCount: 1247,
    transactionVolume: 156890.5,
    lastTransaction: "2024-03-15T16:45:00Z",
  },
  {
    id: "pay-2",
    provider: "twint",
    enabled: true,
    merchantId: "CHE-123.456.789",
    transactionCount: 342,
    transactionVolume: 28450.0,
    lastTransaction: "2024-03-15T15:20:00Z",
  },
  {
    id: "pay-3",
    provider: "postfinance",
    enabled: false,
  },
];

export const mockAccountingIntegrations: AccountingIntegration[] = [
  {
    id: "acc-1",
    provider: "bexio",
    enabled: true,
    apiKey: "bx_...",
    organizationId: "12345",
    autoSyncDaily: true,
    syncTime: "03:00",
    lastExport: "2024-03-15T03:00:00Z",
    exportStatus: "success",
  },
  {
    id: "acc-2",
    provider: "banana",
    enabled: false,
    format: "csv",
  },
];

export const mockAPIKeys: APIKey[] = [
  {
    id: "key-1",
    name: "Production API",
    key: "sk_live_abc123...",
    createdAt: "2024-01-10T09:00:00Z",
    lastUsed: "2024-03-15T14:30:00Z",
    permissions: ["read", "write"],
    isActive: true,
  },
  {
    id: "key-2",
    name: "Mobile App",
    key: "sk_live_def456...",
    createdAt: "2024-02-01T10:00:00Z",
    lastUsed: "2024-03-15T16:00:00Z",
    permissions: ["read"],
    isActive: true,
  },
];

export const mockWebhooks: Webhook[] = [
  {
    id: "wh-1",
    url: "https://api.example.com/webhooks/viamentor",
    events: ["student.created", "lesson.booked", "invoice.paid"],
    secret: "whsec_abc123...",
    isActive: true,
    lastDelivery: "2024-03-15T16:45:00Z",
    deliveryStatus: "success",
    createdAt: "2024-01-15T10:00:00Z",
  },
];

export const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: {
    enabled: true,
    method: "totp",
    enforceForAdmins: true,
    rememberDevice: true,
    rememberDeviceDays: 30,
  },
  sessionManagement: {
    sessionDurationMinutes: 60,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 30,
  },
  passwordPolicy: {
    enforceStrongPolicy: true,
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    expirationDays: 90,
    historyCount: 5,
  },
  accessControl: {
    auditLogsEnabled: true,
    auditRetentionMonths: 12,
    ipWhitelistEnabled: false,
    whitelistedIPs: [],
    timeRestrictionEnabled: false,
  },
};

export const mockGDPRSettings: GDPRSettings = {
  strictMode: true,
  dpoEmail: "dpo@viamentor.ch",
  privacyPolicyUrl: "/legal/privacy",
  termsUrl: "/legal/terms",
  lastRevisionDate: "2024-01-01",
  explicitConsents: true,
  rightToErasure: true,
  erasureGracePeriodDays: 30,
  dataPortability: true,
  inactivityRetentionMonths: 24,
};

export const mockCookieSettings: CookieSettings = {
  bannerEnabled: true,
  bannerText: {
    fr: "Nous utilisons des cookies pour améliorer votre expérience.",
    de: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.",
    it: "Utilizziamo i cookie per migliorare la tua esperienza.",
    en: "We use cookies to improve your experience.",
  },
  essentialCookies: true,
  analyticsCookies: true,
  marketingCookies: false,
  thirdPartyCookies: false,
  blockOnRefusal: true,
  cookiePolicyUrl: "/legal/cookies",
  googleAnalyticsId: "G-XXXXXXXXXX",
  anonymizeIP: true,
};

export const mockBackupConfig: BackupConfig = {
  autoBackupEnabled: true,
  frequency: "daily",
  backupTime: "03:00",
  retentionDays: 30,
  provider: "s3",
  lastBackup: "2024-03-15T03:00:00Z",
  lastBackupSize: 2048,
  lastBackupStatus: "success",
};

export const mockMaintenanceSettings: MaintenanceSettings = {
  maintenanceMode: false,
  maintenanceMessage: {
    fr: "Maintenance en cours. Retour prévu à 14h00.",
    de: "Wartung läuft. Rückkehr um 14:00 Uhr geplant.",
    it: "Manutenzione in corso. Ritorno previsto alle 14:00.",
    en: "Maintenance in progress. Expected return at 2:00 PM.",
  },
  allowedUserIds: [],
};
