/**
 * VIAMENTOR - Marketing Manager Data
 * Mock data et types TypeScript pour dashboard Marketing Manager
 *
 * FEATURES:
 * - KPIs marketing (campagnes, leads, ROI, conversions)
 * - Campagnes récentes (email, SMS, mixed)
 * - Prospects pipeline (sources, statuts, conversion)
 * - Analytics ROI (attribution, performance, coûts)
 * - Pixels health (status, événements, alertes)
 * - Reviews stats (collecte, modération, satisfaction)
 */

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "running"
  | "completed"
  | "paused";
export type CampaignType = "email" | "sms" | "mixed";
export type ProspectStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";
export type PixelStatus = "healthy" | "degraded" | "down";

// ============================================================================
// TYPES
// ============================================================================

export interface MarketingKPIs {
  activeCampaigns: number;
  totalLeads: number;
  avgROI: number; // Percentage
  conversionRate: number; // Percentage
  costPerLead: number; // CHF
  totalRevenue: number; // CHF
}

export interface CampaignSummary {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string; // ISO date
  endDate: string; // ISO date
  audienceCount: number;
  sentCount: number;
  openRate: number; // Percentage
  clickRate: number; // Percentage
  conversionRate: number; // Percentage
  roi: number | null; // Percentage
  budget: number | null; // CHF
}

export interface ProspectsPipeline {
  newLeads: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
  totalValue: number; // CHF
}

export interface SourcePerformance {
  source: string;
  leadsGenerated: number;
  conversions: number;
  conversionRate: number; // Percentage
  costPerAcquisition: number; // CHF
  revenue: number; // CHF
  roi: number; // Percentage
}

export interface PixelHealth {
  platform: string;
  status: PixelStatus;
  eventsToday: number;
  lastEvent: string; // ISO date
  errorRate: number; // Percentage
}

export interface ReviewsStats {
  totalReviews: number;
  avgRating: number;
  pendingModeration: number;
  verifiedReviews: number;
  responseRate: number; // Percentage
  avgResponseTime: number; // Hours
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  badge?: {
    value: string | number;
    variant: "default" | "primary" | "success" | "warning" | "danger";
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockMarketingKPIs: MarketingKPIs = {
  activeCampaigns: 3,
  totalLeads: 478,
  avgROI: 243,
  conversionRate: 32.4,
  costPerLead: 67.5,
  totalRevenue: 246000,
};

export const mockRecentCampaigns: CampaignSummary[] = [
  {
    id: "camp-1",
    name: "Promo rentrée 2025",
    type: "email",
    status: "completed",
    startDate: "2025-01-10T00:00:00Z",
    endDate: "2025-01-31T23:59:59Z",
    audienceCount: 156,
    sentCount: 156,
    openRate: 30.8,
    clickRate: 11.5,
    conversionRate: 7.7,
    roi: 220,
    budget: 500,
  },
  {
    id: "camp-2",
    name: "Relance prospects perdus Q4 2024",
    type: "email",
    status: "completed",
    startDate: "2025-01-05T00:00:00Z",
    endDate: "2025-01-15T23:59:59Z",
    audienceCount: 89,
    sentCount: 89,
    openRate: 24.7,
    clickRate: 9.0,
    conversionRate: 3.4,
    roi: null,
    budget: null,
  },
  {
    id: "camp-3",
    name: "Campagne Google Ads - Permis B",
    type: "mixed",
    status: "running",
    startDate: "2025-01-15T00:00:00Z",
    endDate: "2025-02-15T23:59:59Z",
    audienceCount: 0,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    roi: null,
    budget: 1500,
  },
  {
    id: "camp-4",
    name: "Newsletter mensuelle janvier",
    type: "email",
    status: "scheduled",
    startDate: "2025-01-25T10:00:00Z",
    endDate: "2025-01-25T10:00:00Z",
    audienceCount: 67,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    roi: null,
    budget: null,
  },
];

export const mockProspectsPipeline: ProspectsPipeline = {
  newLeads: 87,
  contacted: 156,
  qualified: 98,
  converted: 155,
  lost: 42,
  totalValue: 232500,
};

export const mockSourcePerformance: SourcePerformance[] = [
  {
    source: "Google Ads",
    leadsGenerated: 145,
    conversions: 42,
    conversionRate: 29.0,
    costPerAcquisition: 85.71,
    revenue: 63000,
    roi: 175,
  },
  {
    source: "Facebook",
    leadsGenerated: 98,
    conversions: 28,
    conversionRate: 28.6,
    costPerAcquisition: 67.86,
    revenue: 42000,
    roi: 220,
  },
  {
    source: "Instagram",
    leadsGenerated: 76,
    conversions: 22,
    conversionRate: 28.9,
    costPerAcquisition: 54.55,
    revenue: 33000,
    roi: 275,
  },
  {
    source: "TikTok",
    leadsGenerated: 52,
    conversions: 18,
    conversionRate: 34.6,
    costPerAcquisition: 44.44,
    revenue: 27000,
    roi: 338,
  },
  {
    source: "Référence",
    leadsGenerated: 34,
    conversions: 26,
    conversionRate: 76.5,
    costPerAcquisition: 0,
    revenue: 39000,
    roi: 0,
  },
  {
    source: "Organique",
    leadsGenerated: 45,
    conversions: 16,
    conversionRate: 35.6,
    costPerAcquisition: 0,
    revenue: 24000,
    roi: 0,
  },
];

export const mockPixelsHealth: PixelHealth[] = [
  {
    platform: "Google Ads",
    status: "healthy",
    eventsToday: 1247,
    lastEvent: "2025-01-17T14:32:18Z",
    errorRate: 0.2,
  },
  {
    platform: "Facebook Pixel",
    status: "healthy",
    eventsToday: 892,
    lastEvent: "2025-01-17T14:30:45Z",
    errorRate: 0.5,
  },
  {
    platform: "TikTok Pixel",
    status: "degraded",
    eventsToday: 234,
    lastEvent: "2025-01-17T12:15:30Z",
    errorRate: 8.3,
  },
  {
    platform: "LinkedIn Insight",
    status: "healthy",
    eventsToday: 156,
    lastEvent: "2025-01-17T14:28:12Z",
    errorRate: 1.2,
  },
];

export const mockReviewsStats: ReviewsStats = {
  totalReviews: 247,
  avgRating: 4.7,
  pendingModeration: 8,
  verifiedReviews: 239,
  responseRate: 94.3,
  avgResponseTime: 4.2,
};

export const mockQuickActions: QuickAction[] = [
  {
    id: "create-campaign",
    label: "Créer campagne",
    description: "Lancer une nouvelle campagne marketing",
    icon: "PlusCircle",
    href: "/staff/marketing/campaigns",
  },
  {
    id: "view-prospects",
    label: "Voir prospects",
    description: "Gérer le pipeline CRM",
    icon: "Users",
    href: "/staff/prospects",
    badge: {
      value: 87,
      variant: "primary",
    },
  },
  {
    id: "check-pixels",
    label: "Vérifier pixels",
    description: "Monitoring santé tracking",
    icon: "Activity",
    href: "/marketing/pixels/health",
    badge: {
      value: 1,
      variant: "warning",
    },
  },
  {
    id: "export-report",
    label: "Exporter rapport",
    description: "Rapport performance mensuel",
    icon: "FileDown",
    href: "/campaigns/analytics",
  },
  {
    id: "manage-reviews",
    label: "Gérer avis",
    description: "Modération et réponses",
    icon: "Star",
    href: "/reviews/verification",
    badge: {
      value: 8,
      variant: "warning",
    },
  },
  {
    id: "view-analytics",
    label: "Voir analytics",
    description: "ROI et attribution",
    icon: "BarChart3",
    href: "/campaigns/analytics",
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getCampaignStatusColor(status: CampaignStatus): string {
  const colors: Record<CampaignStatus, string> = {
    draft: "bg-gray-500",
    scheduled: "bg-blue-500",
    running: "bg-green-500",
    completed: "bg-purple-500",
    paused: "bg-orange-500",
  };
  return colors[status];
}

export function getPixelStatusColor(status: PixelStatus): string {
  const colors: Record<PixelStatus, string> = {
    healthy: "text-green-600 dark:text-green-400",
    degraded: "text-orange-600 dark:text-orange-400",
    down: "text-red-600 dark:text-red-400",
  };
  return colors[status];
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatCurrency(value: number, locale: string = "fr"): string {
  return new Intl.NumberFormat(
    locale === "fr"
      ? "fr-CH"
      : locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : "en-CH",
    {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export function getROIColor(roi: number | null): string {
  if (roi === null) return "text-gray-600 dark:text-gray-400";
  if (roi >= 200) return "text-green-600 dark:text-green-400";
  if (roi >= 50) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}
