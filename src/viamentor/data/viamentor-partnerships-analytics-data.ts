/**
 * VIAMENTOR - Partnerships Analytics Data
 * Mock data pour analytics partenariats moniteurs
 */

import type {
  PaymentModelType,
  StatusType,
} from "@/viamentor/data/viamentor-revenue-split-schemas";

// ============================================================================
// TYPES
// ============================================================================

export interface PartnershipModelStats {
  model: PaymentModelType;
  activeInstructors: number;
  totalRevenue: number;
  schoolReversal: number;
  avgSatisfaction: number;
  turnoverRate: number;
  avgCommissionRate?: number;
  monthlyRecurringRevenue?: number;
}

export interface InstructorPartnership {
  id: string;
  instructorId: string;
  name: string;
  avatar: string;
  statusType: StatusType;
  paymentModel: PaymentModelType;
  commissionRate?: number;
  monthlyFeeAmount?: number;
  contractStartDate: Date;
  contractEndDate?: Date;
  contractType: "CDI" | "CDD" | "freelance";
  revenueYTD: number;
  schoolReversal: number;
  netInstructor: number;
  lessonsCount: number;
  studentSatisfaction: number;
  daysUntilExpiry?: number;
}

export interface ContractRenewal {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  contractEndDate: Date;
  daysRemaining: number;
  currentModel: PaymentModelType;
  currentCommissionRate?: number;
  revenue12Months: number;
  satisfaction: number;
  renewalStatus: "pending" | "proposed" | "negotiating" | "signed" | "declined";
  proposedModel?: PaymentModelType;
  proposedCommissionRate?: number;
  lastContactDate?: Date;
}

export interface ConversionFunnel {
  stage: "prospects" | "negotiation" | "signed" | "active" | "renewed";
  count: number;
  conversionRate: number;
}

export interface PartnershipTrend {
  month: string;
  free: number;
  monthlyFlat: number;
  commission: number;
}

export interface NegotiationHistory {
  id: string;
  instructorId: string;
  date: Date;
  type: "initial" | "renewal" | "modification";
  previousModel?: PaymentModelType;
  newModel: PaymentModelType;
  previousCommissionRate?: number;
  newCommissionRate?: number;
  notes: string;
  negotiatedBy: string;
}

// ============================================================================
// MOCK DATA - MODEL STATS
// ============================================================================

export const mockPartnershipModelStats: PartnershipModelStats[] = [
  {
    model: "free",
    activeInstructors: 12,
    totalRevenue: 54000,
    schoolReversal: 0,
    avgSatisfaction: 4.2,
    turnoverRate: 15,
  },
  {
    model: "monthly_flat",
    activeInstructors: 8,
    totalRevenue: 32400,
    schoolReversal: 4000,
    avgSatisfaction: 4.5,
    turnoverRate: 8,
    monthlyRecurringRevenue: 4000,
  },
  {
    model: "commission",
    activeInstructors: 15,
    totalRevenue: 67500,
    schoolReversal: 11475,
    avgSatisfaction: 4.4,
    turnoverRate: 12,
    avgCommissionRate: 17,
  },
];

// ============================================================================
// MOCK DATA - INSTRUCTORS PARTNERSHIPS
// ============================================================================

export const mockInstructorsPartnerships: InstructorPartnership[] = [
  {
    id: "ip-1",
    instructorId: "instructor-1",
    name: "Jean Dupont",
    avatar: "https://github.com/yusufhilmi.png",
    statusType: "independent_attached",
    paymentModel: "commission",
    commissionRate: 20,
    contractStartDate: new Date("2023-03-15"),
    contractType: "CDI",
    revenueYTD: 43200,
    schoolReversal: 8640,
    netInstructor: 34560,
    lessonsCount: 480,
    studentSatisfaction: 4.6,
  },
  {
    id: "ip-2",
    instructorId: "instructor-2",
    name: "Marie Leclerc",
    avatar: "https://github.com/kdrnp.png",
    statusType: "independent_attached",
    paymentModel: "monthly_flat",
    monthlyFeeAmount: 500,
    contractStartDate: new Date("2024-01-10"),
    contractType: "CDI",
    revenueYTD: 32400,
    schoolReversal: 6000,
    netInstructor: 26400,
    lessonsCount: 360,
    studentSatisfaction: 4.8,
  },
  {
    id: "ip-3",
    instructorId: "instructor-3",
    name: "Pierre Moreau",
    avatar: "https://github.com/yahyabedirhan.png",
    statusType: "independent_attached",
    paymentModel: "free",
    contractStartDate: new Date("2022-09-01"),
    contractType: "CDI",
    revenueYTD: 21600,
    schoolReversal: 0,
    netInstructor: 21600,
    lessonsCount: 240,
    studentSatisfaction: 4.3,
  },
  {
    id: "ip-4",
    instructorId: "instructor-4",
    name: "Sophie Laurent",
    avatar: "https://github.com/denizbuyuktas.png",
    statusType: "independent_attached",
    paymentModel: "commission",
    commissionRate: 15,
    contractStartDate: new Date("2024-06-01"),
    contractEndDate: new Date("2025-05-31"),
    contractType: "CDD",
    revenueYTD: 27000,
    schoolReversal: 4050,
    netInstructor: 22950,
    lessonsCount: 300,
    studentSatisfaction: 4.5,
    daysUntilExpiry: 136,
  },
  {
    id: "ip-5",
    instructorId: "instructor-5",
    name: "Luc Martin",
    avatar: "https://github.com/shoaibux1.png",
    statusType: "independent_attached",
    paymentModel: "free",
    contractStartDate: new Date("2023-11-20"),
    contractType: "CDI",
    revenueYTD: 54000,
    schoolReversal: 0,
    netInstructor: 54000,
    lessonsCount: 600,
    studentSatisfaction: 4.7,
  },
  {
    id: "ip-6",
    instructorId: "instructor-6",
    name: "Emma Rousseau",
    avatar: "https://github.com/shoaibux1.png",
    statusType: "independent_attached",
    paymentModel: "commission",
    commissionRate: 18,
    contractStartDate: new Date("2024-02-15"),
    contractEndDate: new Date("2025-02-14"),
    contractType: "CDD",
    revenueYTD: 36000,
    schoolReversal: 6480,
    netInstructor: 29520,
    lessonsCount: 400,
    studentSatisfaction: 4.4,
    daysUntilExpiry: 29,
  },
];

// ============================================================================
// MOCK DATA - CONTRACT RENEWALS
// ============================================================================

export const mockContractRenewals: ContractRenewal[] = [
  {
    id: "cr-1",
    instructorId: "instructor-6",
    instructorName: "Emma Rousseau",
    instructorAvatar: "https://github.com/shoaibux1.png",
    contractEndDate: new Date("2025-02-14"),
    daysRemaining: 29,
    currentModel: "commission",
    currentCommissionRate: 18,
    revenue12Months: 36000,
    satisfaction: 4.4,
    renewalStatus: "pending",
  },
  {
    id: "cr-2",
    instructorId: "instructor-4",
    instructorName: "Sophie Laurent",
    instructorAvatar: "https://github.com/denizbuyuktas.png",
    contractEndDate: new Date("2025-05-31"),
    daysRemaining: 136,
    currentModel: "commission",
    currentCommissionRate: 15,
    revenue12Months: 27000,
    satisfaction: 4.5,
    renewalStatus: "proposed",
    proposedModel: "commission",
    proposedCommissionRate: 17,
    lastContactDate: new Date("2025-01-10"),
  },
  {
    id: "cr-3",
    instructorId: "instructor-7",
    instructorName: "Thomas Bernard",
    instructorAvatar: "https://github.com/denizbuyuktas.png",
    contractEndDate: new Date("2025-03-31"),
    daysRemaining: 74,
    currentModel: "monthly_flat",
    revenue12Months: 32400,
    satisfaction: 4.6,
    renewalStatus: "negotiating",
    proposedModel: "commission",
    proposedCommissionRate: 15,
    lastContactDate: new Date("2025-01-12"),
  },
];

// ============================================================================
// MOCK DATA - CONVERSION FUNNEL
// ============================================================================

export const mockConversionFunnel: ConversionFunnel[] = [
  { stage: "prospects", count: 50, conversionRate: 100 },
  { stage: "negotiation", count: 35, conversionRate: 70 },
  { stage: "signed", count: 28, conversionRate: 80 },
  { stage: "active", count: 35, conversionRate: 125 },
  { stage: "renewed", count: 30, conversionRate: 86 },
];

// ============================================================================
// MOCK DATA - PARTNERSHIP TRENDS
// ============================================================================

export const mockPartnershipTrends: PartnershipTrend[] = [
  { month: "2024-02", free: 48000, monthlyFlat: 28800, commission: 54000 },
  { month: "2024-03", free: 50400, monthlyFlat: 30000, commission: 57600 },
  { month: "2024-04", free: 49200, monthlyFlat: 29400, commission: 55800 },
  { month: "2024-05", free: 51600, monthlyFlat: 31200, commission: 60000 },
  { month: "2024-06", free: 50400, monthlyFlat: 30600, commission: 58200 },
  { month: "2024-07", free: 48000, monthlyFlat: 28800, commission: 54000 },
  { month: "2024-08", free: 46800, monthlyFlat: 27600, commission: 51600 },
  { month: "2024-09", free: 52800, monthlyFlat: 31800, commission: 61800 },
  { month: "2024-10", free: 54000, monthlyFlat: 32400, commission: 63000 },
  { month: "2024-11", free: 55200, monthlyFlat: 33600, commission: 66000 },
  { month: "2024-12", free: 52800, monthlyFlat: 31800, commission: 62400 },
  { month: "2025-01", free: 54000, monthlyFlat: 32400, commission: 67500 },
];

// ============================================================================
// MOCK DATA - NEGOTIATION HISTORY
// ============================================================================

export const mockNegotiationHistory: NegotiationHistory[] = [
  {
    id: "nh-1",
    instructorId: "instructor-1",
    date: new Date("2023-03-15"),
    type: "initial",
    newModel: "commission",
    newCommissionRate: 20,
    notes: "Contrat initial - Moniteur expérimenté avec excellentes références",
    negotiatedBy: "admin-1",
  },
  {
    id: "nh-2",
    instructorId: "instructor-4",
    date: new Date("2024-06-01"),
    type: "initial",
    newModel: "commission",
    newCommissionRate: 15,
    notes: "Premier contrat - Moniteur junior en formation",
    negotiatedBy: "admin-1",
  },
  {
    id: "nh-3",
    instructorId: "instructor-4",
    date: new Date("2025-01-10"),
    type: "renewal",
    previousModel: "commission",
    previousCommissionRate: 15,
    newModel: "commission",
    newCommissionRate: 17,
    notes:
      "Renouvellement avec augmentation - Excellentes performances et satisfaction élèves",
    negotiatedBy: "admin-1",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calcule le total des reversements par modèle
 */
export function calculateReversalsByModel(
  instructors: InstructorPartnership[]
): Record<PaymentModelType, number> {
  return instructors.reduce(
    (acc, instructor) => {
      acc[instructor.paymentModel] += instructor.schoolReversal;
      return acc;
    },
    { free: 0, monthly_flat: 0, commission: 0 } as Record<
      PaymentModelType,
      number
    >
  );
}

/**
 * Filtre les contrats expirant dans N jours
 */
export function getExpiringContracts(
  renewals: ContractRenewal[],
  daysThreshold: number
): ContractRenewal[] {
  return renewals.filter((r) => r.daysRemaining <= daysThreshold);
}

/**
 * Calcule le taux de conversion global du funnel
 */
export function calculateOverallConversionRate(
  funnel: ConversionFunnel[]
): number {
  if (funnel.length === 0) return 0;
  const first = funnel[0].count;
  const last = funnel[funnel.length - 1].count;
  return (last / first) * 100;
}

/**
 * Génère un résumé des performances par modèle
 */
export function generateModelPerformanceSummary(
  stats: PartnershipModelStats[]
): string {
  const total = stats.reduce((sum, s) => sum + s.totalRevenue, 0);
  const best = stats.reduce((max, s) =>
    s.totalRevenue > max.totalRevenue ? s : max
  );

  return `Total revenue: ${total.toLocaleString()} CHF. Best performing model: ${best.model} (${best.totalRevenue.toLocaleString()} CHF, ${best.activeInstructors} instructors)`;
}
