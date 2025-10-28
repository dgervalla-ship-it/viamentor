/**
 * Mock Data - Revenue Analytics
 *
 * Données de démonstration pour module analytics revenus Viamentor
 * KPIs, cohorts, forecasting, churn analysis
 */

export type PlanType = "Free" | "Pro" | "Enterprise";
export type ChurnReason =
  | "Price too high"
  | "Missing features"
  | "Moved competitor"
  | "Other";
export type ReportType =
  | "monthly_revenue"
  | "bank_reconciliation"
  | "aging_report"
  | "vat_report";
export type ReportFrequency = "Weekly" | "Monthly" | "Quarterly";

export interface RevenueKPIs {
  totalRevenue: number;
  averageMRR: number;
  growthRate: number;
  customerCount: number;
  arpu: number; // Average Revenue Per User
  period: {
    start: string;
    end: string;
  };
}

export interface MRRByPlan {
  month: string;
  Free: number;
  Pro: number;
  Enterprise: number;
  total: number;
}

export interface RevenueSplit {
  plan: PlanType;
  revenue: number;
  percentage: number;
  color: string;
}

export interface ChurnDataPoint {
  month: string;
  mrr: number;
  churnRate: number;
}

export interface CohortData {
  cohortMonth: string;
  initialSize: number;
  retentionByMonth: { [month: string]: number }; // month: retention rate %
  currentActive: number;
  retentionRate: number;
  averageLTV: number;
  medianChurnMonth: number;
}

export interface ForecastDataPoint {
  month: string;
  historicalMRR?: number;
  predictedMRR?: number;
  confidenceMin?: number;
  confidenceMax?: number;
}

export interface ChurnedTenant {
  id: string;
  name: string;
  logo?: string;
  plan: PlanType;
  canceledDate: string;
  activeDuration: number; // months
  totalRevenue: number;
  reason?: ChurnReason;
  feedback?: string;
  lostMRR: number;
  contactAttempted: boolean;
  winBackOffer?: string;
  notes?: string;
}

export interface WinBackCampaign {
  id: string;
  name: string;
  sentDate: string;
  targetCount: number;
  reactivatedCount: number;
  successRate: number;
  roi: number;
}

export interface FinancialReportTemplate {
  id: string;
  type: ReportType;
  name: string;
  description: string;
  icon: string;
  estimatedTime: string;
}

export interface ScheduledReport {
  id: string;
  reportType: ReportType;
  recipients: string[];
  frequency: ReportFrequency;
  nextRun: string;
  active: boolean;
  lastRun?: string;
}

export interface HistoricalReport {
  id: string;
  name: string;
  type: ReportType;
  period: string;
  generatedBy: string;
  generatedDate: string;
  fileSize: string;
  downloadUrl: string;
}

// Mock Data
export const MOCK_REVENUE_KPIS: RevenueKPIs = {
  totalRevenue: 487500,
  averageMRR: 40625,
  growthRate: 12.5,
  customerCount: 125,
  arpu: 325,
  period: {
    start: "2025-01-01",
    end: "2025-01-31",
  },
};

export const MOCK_MRR_BY_PLAN: MRRByPlan[] = [
  { month: "Jul 24", Free: 0, Pro: 28000, Enterprise: 15000, total: 43000 },
  { month: "Aug 24", Free: 0, Pro: 29500, Enterprise: 16500, total: 46000 },
  { month: "Sep 24", Free: 0, Pro: 31000, Enterprise: 18000, total: 49000 },
  { month: "Oct 24", Free: 0, Pro: 32500, Enterprise: 19500, total: 52000 },
  { month: "Nov 24", Free: 0, Pro: 34000, Enterprise: 21000, total: 55000 },
  { month: "Dec 24", Free: 0, Pro: 35500, Enterprise: 22500, total: 58000 },
  { month: "Jan 25", Free: 0, Pro: 24000, Enterprise: 16625, total: 40625 },
];

export const MOCK_REVENUE_SPLIT: RevenueSplit[] = [
  { plan: "Free", revenue: 0, percentage: 0, color: "hsl(var(--muted))" },
  {
    plan: "Pro",
    revenue: 24000,
    percentage: 59.1,
    color: "hsl(var(--chart-1))",
  },
  {
    plan: "Enterprise",
    revenue: 16625,
    percentage: 40.9,
    color: "hsl(var(--chart-2))",
  },
];

export const MOCK_CHURN_DATA: ChurnDataPoint[] = [
  { month: "Jan 24", mrr: 35000, churnRate: 3.2 },
  { month: "Feb 24", mrr: 36500, churnRate: 2.8 },
  { month: "Mar 24", mrr: 38000, churnRate: 4.1 },
  { month: "Apr 24", mrr: 39500, churnRate: 3.5 },
  { month: "May 24", mrr: 41000, churnRate: 2.9 },
  { month: "Jun 24", mrr: 42500, churnRate: 3.7 },
  { month: "Jul 24", mrr: 43000, churnRate: 4.2 },
  { month: "Aug 24", mrr: 46000, churnRate: 3.1 },
  { month: "Sep 24", mrr: 49000, churnRate: 2.6 },
  { month: "Oct 24", mrr: 52000, churnRate: 3.8 },
  { month: "Nov 24", mrr: 55000, churnRate: 4.5 },
  { month: "Dec 24", mrr: 58000, churnRate: 5.2 },
];

export const MOCK_COHORTS: CohortData[] = [
  {
    cohortMonth: "Jan 2024",
    initialSize: 20,
    retentionByMonth: {
      M0: 100,
      M1: 95,
      M2: 90,
      M3: 85,
      M4: 80,
      M5: 78,
      M6: 75,
      M7: 73,
      M8: 70,
      M9: 68,
      M10: 65,
      M11: 63,
      M12: 60,
    },
    currentActive: 12,
    retentionRate: 60,
    averageLTV: 7800,
    medianChurnMonth: 8,
  },
  {
    cohortMonth: "Feb 2024",
    initialSize: 18,
    retentionByMonth: {
      M0: 100,
      M1: 94,
      M2: 89,
      M3: 83,
      M4: 78,
      M5: 72,
      M6: 67,
      M7: 61,
      M8: 56,
      M9: 50,
      M10: 44,
      M11: 39,
    },
    currentActive: 7,
    retentionRate: 39,
    averageLTV: 6240,
    medianChurnMonth: 7,
  },
  {
    cohortMonth: "Mar 2024",
    initialSize: 22,
    retentionByMonth: {
      M0: 100,
      M1: 96,
      M2: 91,
      M3: 86,
      M4: 82,
      M5: 77,
      M6: 73,
      M7: 68,
      M8: 64,
      M9: 59,
      M10: 55,
    },
    currentActive: 12,
    retentionRate: 55,
    averageLTV: 7040,
    medianChurnMonth: 9,
  },
  {
    cohortMonth: "Apr 2024",
    initialSize: 25,
    retentionByMonth: {
      M0: 100,
      M1: 92,
      M2: 88,
      M3: 84,
      M4: 80,
      M5: 76,
      M6: 72,
      M7: 68,
      M8: 64,
      M9: 60,
    },
    currentActive: 15,
    retentionRate: 60,
    averageLTV: 7680,
    medianChurnMonth: 10,
  },
  {
    cohortMonth: "May 2024",
    initialSize: 28,
    retentionByMonth: {
      M0: 100,
      M1: 93,
      M2: 89,
      M3: 86,
      M4: 82,
      M5: 79,
      M6: 75,
      M7: 71,
      M8: 68,
    },
    currentActive: 19,
    retentionRate: 68,
    averageLTV: 8704,
    medianChurnMonth: 11,
  },
  {
    cohortMonth: "Jun 2024",
    initialSize: 30,
    retentionByMonth: {
      M0: 100,
      M1: 97,
      M2: 93,
      M3: 90,
      M4: 87,
      M5: 83,
      M6: 80,
      M7: 77,
    },
    currentActive: 23,
    retentionRate: 77,
    averageLTV: 9856,
    medianChurnMonth: 12,
  },
];

export const MOCK_FORECAST_DATA: ForecastDataPoint[] = [
  // Historical (24 months)
  { month: "Jan 23", historicalMRR: 18000 },
  { month: "Feb 23", historicalMRR: 19200 },
  { month: "Mar 23", historicalMRR: 20500 },
  { month: "Apr 23", historicalMRR: 21800 },
  { month: "May 23", historicalMRR: 23000 },
  { month: "Jun 23", historicalMRR: 24500 },
  { month: "Jul 23", historicalMRR: 26000 },
  { month: "Aug 23", historicalMRR: 27500 },
  { month: "Sep 23", historicalMRR: 29000 },
  { month: "Oct 23", historicalMRR: 30500 },
  { month: "Nov 23", historicalMRR: 32000 },
  { month: "Dec 23", historicalMRR: 33500 },
  { month: "Jan 24", historicalMRR: 35000 },
  { month: "Feb 24", historicalMRR: 36500 },
  { month: "Mar 24", historicalMRR: 38000 },
  { month: "Apr 24", historicalMRR: 39500 },
  { month: "May 24", historicalMRR: 41000 },
  { month: "Jun 24", historicalMRR: 42500 },
  { month: "Jul 24", historicalMRR: 43000 },
  { month: "Aug 24", historicalMRR: 46000 },
  { month: "Sep 24", historicalMRR: 49000 },
  { month: "Oct 24", historicalMRR: 52000 },
  { month: "Nov 24", historicalMRR: 55000 },
  { month: "Dec 24", historicalMRR: 58000 },
  // Predicted (12 months)
  {
    month: "Jan 25",
    predictedMRR: 61000,
    confidenceMin: 54900,
    confidenceMax: 67100,
  },
  {
    month: "Feb 25",
    predictedMRR: 64000,
    confidenceMin: 57600,
    confidenceMax: 70400,
  },
  {
    month: "Mar 25",
    predictedMRR: 67000,
    confidenceMin: 60300,
    confidenceMax: 73700,
  },
  {
    month: "Apr 25",
    predictedMRR: 70000,
    confidenceMin: 63000,
    confidenceMax: 77000,
  },
  {
    month: "May 25",
    predictedMRR: 73000,
    confidenceMin: 65700,
    confidenceMax: 80300,
  },
  {
    month: "Jun 25",
    predictedMRR: 76000,
    confidenceMin: 68400,
    confidenceMax: 83600,
  },
  {
    month: "Jul 25",
    predictedMRR: 79000,
    confidenceMin: 71100,
    confidenceMax: 86900,
  },
  {
    month: "Aug 25",
    predictedMRR: 82000,
    confidenceMin: 73800,
    confidenceMax: 90200,
  },
  {
    month: "Sep 25",
    predictedMRR: 85000,
    confidenceMin: 76500,
    confidenceMax: 93500,
  },
  {
    month: "Oct 25",
    predictedMRR: 88000,
    confidenceMin: 79200,
    confidenceMax: 96800,
  },
  {
    month: "Nov 25",
    predictedMRR: 91000,
    confidenceMin: 81900,
    confidenceMax: 100100,
  },
  {
    month: "Dec 25",
    predictedMRR: 94000,
    confidenceMin: 84600,
    confidenceMax: 103400,
  },
];

export const MOCK_CHURNED_TENANTS: ChurnedTenant[] = [
  {
    id: "tenant-ch-1",
    name: "Auto-École Lausanne",
    logo: "https://github.com/viamentor-ai.png",
    plan: "Pro",
    canceledDate: "2024-12-15",
    activeDuration: 8,
    totalRevenue: 2080,
    reason: "Price too high",
    feedback: "Budget serré cette année, nous reviendrons peut-être plus tard.",
    lostMRR: 260,
    contactAttempted: true,
    winBackOffer: "20% discount for 3 months",
    notes: "Contacted on Dec 20, interested but waiting Q2 2025",
  },
  {
    id: "tenant-ch-2",
    name: "École de Conduite Genève",
    logo: "https://github.com/viamentor-ai.png",
    plan: "Enterprise",
    canceledDate: "2024-11-28",
    activeDuration: 14,
    totalRevenue: 7280,
    reason: "Moved competitor",
    feedback: "Concurrent offre intégration comptabilité native.",
    lostMRR: 520,
    contactAttempted: true,
    notes: "Lost to competitor with accounting integration",
  },
  {
    id: "tenant-ch-3",
    name: "Fahrschule Zürich",
    plan: "Pro",
    canceledDate: "2024-12-05",
    activeDuration: 6,
    totalRevenue: 1560,
    reason: "Missing features",
    feedback: "Manque module gestion flotte véhicules avancé.",
    lostMRR: 260,
    contactAttempted: false,
  },
];

export const MOCK_WINBACK_CAMPAIGNS: WinBackCampaign[] = [
  {
    id: "wb-1",
    name: "Q4 2024 Reactivation - 25% Off",
    sentDate: "2024-10-15",
    targetCount: 12,
    reactivatedCount: 3,
    successRate: 25,
    roi: 2340,
  },
  {
    id: "wb-2",
    name: "Summer Special - Free Upgrade",
    sentDate: "2024-07-01",
    targetCount: 8,
    reactivatedCount: 2,
    successRate: 25,
    roi: 1560,
  },
];

export const MOCK_REPORT_TEMPLATES: FinancialReportTemplate[] = [
  {
    id: "tpl-1",
    type: "monthly_revenue",
    name: "Rapport Revenu Mensuel",
    description:
      "Liste tenants revenus détaillés par plan/modules, subtotals, graphiques",
    icon: "TrendingUpIcon",
    estimatedTime: "~2 min",
  },
  {
    id: "tpl-2",
    type: "bank_reconciliation",
    name: "Rapprochement Bancaire",
    description: "Stripe payouts vs comptabilité expected, écarts highlight",
    icon: "BuildingIcon",
    estimatedTime: "~3 min",
  },
  {
    id: "tpl-3",
    type: "aging_report",
    name: "État des Créances",
    description: "Aging report buckets: 0-30j/31-60j/61-90j/>90j outstanding",
    icon: "ClockIcon",
    estimatedTime: "~2 min",
  },
  {
    id: "tpl-4",
    type: "vat_report",
    name: "Rapport TVA Suisse",
    description:
      "Revenus soumis 8.1%, montant TVA collectée, formulaire Swiss tax",
    icon: "ReceiptIcon",
    estimatedTime: "~4 min",
  },
];

export const MOCK_SCHEDULED_REPORTS: ScheduledReport[] = [
  {
    id: "sched-1",
    reportType: "monthly_revenue",
    recipients: ["cfo@viamentor.ch", "finance@viamentor.ch"],
    frequency: "Monthly",
    nextRun: "2025-02-01T09:00:00Z",
    active: true,
    lastRun: "2025-01-01T09:00:00Z",
  },
  {
    id: "sched-2",
    reportType: "vat_report",
    recipients: ["accounting@viamentor.ch"],
    frequency: "Quarterly",
    nextRun: "2025-04-01T08:00:00Z",
    active: true,
    lastRun: "2025-01-01T08:00:00Z",
  },
];

export const MOCK_HISTORICAL_REPORTS: HistoricalReport[] = [
  {
    id: "hist-1",
    name: "Rapport Revenu Mensuel - Décembre 2024",
    type: "monthly_revenue",
    period: "Dec 2024",
    generatedBy: "Jean Dupont",
    generatedDate: "2025-01-05T10:30:00Z",
    fileSize: "2.4 MB",
    downloadUrl: "#",
  },
  {
    id: "hist-2",
    name: "Rapport TVA Q4 2024",
    type: "vat_report",
    period: "Q4 2024",
    generatedBy: "Marie Martin",
    generatedDate: "2025-01-10T14:15:00Z",
    fileSize: "1.8 MB",
    downloadUrl: "#",
  },
];

// Utility functions
export function calculateARR(mrr: number): number {
  return mrr * 12;
}

export function calculateChurnRate(churned: number, total: number): number {
  return total > 0 ? (churned / total) * 100 : 0;
}

export function calculateLTV(mrr: number, avgLifetimeMonths: number): number {
  return mrr * avgLifetimeMonths;
}

export function getRetentionColor(rate: number): string {
  if (rate >= 80) return "hsl(142, 76%, 36%)"; // Green
  if (rate >= 60) return "hsl(48, 96%, 53%)"; // Yellow
  if (rate >= 40) return "hsl(25, 95%, 53%)"; // Orange
  return "hsl(0, 84%, 60%)"; // Red
}

export function formatPeriodLabel(
  start: string,
  end: string,
  locale: string = "fr"
): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });

  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return formatter.format(startDate);
  }

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}
