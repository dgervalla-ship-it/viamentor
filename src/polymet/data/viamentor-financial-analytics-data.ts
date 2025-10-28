/**
 * VIAMENTOR - Financial Analytics Data
 * Mock data et types pour analytics financières
 */

// ============================================================================
// TYPES
// ============================================================================

export type FinancialLocale = "fr" | "de" | "it" | "en";

export type RevenueSource =
  | "lessons"
  | "packages"
  | "theory"
  | "exams"
  | "other";
export type ExpenseCategory =
  | "salaries"
  | "maintenance"
  | "insurance"
  | "rent"
  | "marketing"
  | "other";
export type PaymentMethod = "cash" | "card" | "transfer" | "twint" | "other";
export type ScenarioType = "optimistic" | "realistic" | "pessimistic";

export interface FinancialKPIs {
  revenue: {
    amount: number;
    trend: number;
  };
  profitMargin: {
    percentage: number;
    trend: number;
  };
  unpaidInvoices: {
    amount: number;
    count: number;
  };
  cashAvailable: {
    amount: number;
    trend: number;
  };
}

export interface RevenueDataPoint {
  month: string;
  lessons: number;
  packages: number;
  theory: number;
  exams: number;
  other: number;
  cumulative: number;
  events?: Array<{ type: string; label: string }>;
}

export interface CategoryRevenue {
  category: "B" | "A" | "BE";
  students: number;
  revenue: number;
  revenuePerStudent: number;
  contribution: number;
  margin?: number;
}

export interface ExpenseData {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  trend: number;
}

export interface PricingData {
  product: string;
  averagePrice: number;
  volume: number;
  revenue: number;
  elasticity?: number;
}

export interface CompetitorPricing {
  product: string;
  ourPrice: number;
  competitorA: number;
  competitorB: number;
  competitorC: number;
}

export interface PaymentMethodData {
  method: PaymentMethod;
  transactions: number;
  amount: number;
  fees: number;
  averageDelay: number;
}

export interface ForecastDataPoint {
  month: string;
  revenueExpected: number;
  expensesExpected: number;
  cashFlow: number;
  confidence: number;
  confidenceMin: number;
  confidenceMax: number;
  events?: Array<{ type: string; label: string }>;
}

export interface FinancialRatio {
  name: string;
  value: number;
  benchmark: number;
  unit: string;
}

export interface BudgetCategory {
  category: ExpenseCategory;
  allocated: number;
  spent: number;
  remaining: number;
  percentUsed: number;
  projectedEnd: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const financialKPIs: FinancialKPIs = {
  revenue: {
    amount: 245680,
    trend: 12.5,
  },
  profitMargin: {
    percentage: 28.5,
    trend: 3.2,
  },
  unpaidInvoices: {
    amount: 18450,
    count: 12,
  },
  cashAvailable: {
    amount: 87320,
    trend: 8.7,
  },
};

export const revenueData: RevenueDataPoint[] = [
  {
    month: "Jan 2024",
    lessons: 18500,
    packages: 12300,
    theory: 4200,
    exams: 2800,
    other: 1200,
    cumulative: 39000,
  },
  {
    month: "Fév 2024",
    lessons: 19200,
    packages: 13100,
    theory: 4500,
    exams: 2900,
    other: 1300,
    cumulative: 80000,
    events: [{ type: "promotion", label: "Promo Hiver" }],
  },
  {
    month: "Mar 2024",
    lessons: 22400,
    packages: 15800,
    theory: 5200,
    exams: 3400,
    other: 1600,
    cumulative: 128400,
    events: [{ type: "rentree", label: "Rentrée Printemps" }],
  },
  {
    month: "Avr 2024",
    lessons: 21800,
    packages: 14900,
    theory: 4900,
    exams: 3200,
    other: 1500,
    cumulative: 174700,
  },
  {
    month: "Mai 2024",
    lessons: 20500,
    packages: 13800,
    theory: 4600,
    exams: 3000,
    other: 1400,
    cumulative: 218000,
  },
  {
    month: "Juin 2024",
    lessons: 19800,
    packages: 13200,
    theory: 4400,
    exams: 2900,
    other: 1300,
    cumulative: 259600,
  },
  {
    month: "Juil 2024",
    lessons: 16200,
    packages: 10800,
    theory: 3600,
    exams: 2400,
    other: 1000,
    cumulative: 294000,
    events: [{ type: "vacances", label: "Vacances Été" }],
  },
  {
    month: "Août 2024",
    lessons: 15800,
    packages: 10500,
    theory: 3500,
    exams: 2300,
    other: 900,
    cumulative: 327000,
    events: [{ type: "vacances", label: "Vacances Été" }],
  },
  {
    month: "Sep 2024",
    lessons: 24500,
    packages: 17200,
    theory: 5800,
    exams: 3800,
    other: 1700,
    cumulative: 380000,
    events: [{ type: "rentree", label: "Rentrée Automne" }],
  },
  {
    month: "Oct 2024",
    lessons: 23200,
    packages: 16100,
    theory: 5400,
    exams: 3500,
    other: 1600,
    cumulative: 429800,
  },
  {
    month: "Nov 2024",
    lessons: 21900,
    packages: 15200,
    theory: 5100,
    exams: 3300,
    other: 1500,
    cumulative: 477000,
  },
  {
    month: "Déc 2024",
    lessons: 20100,
    packages: 13900,
    theory: 4700,
    exams: 3100,
    other: 1400,
    cumulative: 520200,
  },
];

export const categoryRevenues: CategoryRevenue[] = [
  {
    category: "B",
    students: 145,
    revenue: 187500,
    revenuePerStudent: 1293,
    contribution: 42.5,
    margin: 32.8,
  },
  {
    category: "A",
    students: 89,
    revenue: 156800,
    revenuePerStudent: 1762,
    contribution: 35.6,
    margin: 28.4,
  },
  {
    category: "BE",
    students: 67,
    revenue: 96400,
    revenuePerStudent: 1439,
    contribution: 21.9,
    margin: 22.1,
  },
];

export const expensesData: ExpenseData[] = [
  { category: "salaries", amount: 125000, percentage: 50.9, trend: 2.3 },
  { category: "maintenance", amount: 28500, percentage: 11.6, trend: -1.2 },
  { category: "insurance", amount: 22000, percentage: 9.0, trend: 0.5 },
  { category: "rent", amount: 18000, percentage: 7.3, trend: 0.0 },
  { category: "marketing", amount: 15800, percentage: 6.4, trend: 8.5 },
  { category: "other", amount: 36380, percentage: 14.8, trend: 1.8 },
];

export const pricingData: PricingData[] = [
  {
    product: "Leçon B (50min)",
    averagePrice: 95,
    volume: 2450,
    revenue: 232750,
    elasticity: -0.8,
  },
  {
    product: "Leçon A (50min)",
    averagePrice: 110,
    volume: 1680,
    revenue: 184800,
    elasticity: -1.2,
  },
  {
    product: "Forfait 10 leçons B",
    averagePrice: 900,
    volume: 145,
    revenue: 130500,
    elasticity: -0.5,
  },
  {
    product: "Forfait 10 leçons A",
    averagePrice: 1050,
    volume: 98,
    revenue: 102900,
    elasticity: -0.6,
  },
  {
    product: "Cours théorique",
    averagePrice: 45,
    volume: 1240,
    revenue: 55800,
    elasticity: -0.3,
  },
  {
    product: "Examen pratique",
    averagePrice: 180,
    volume: 187,
    revenue: 33660,
    elasticity: -0.9,
  },
];

export const competitorPricing: CompetitorPricing[] = [
  {
    product: "Leçon B (50min)",
    ourPrice: 95,
    competitorA: 98,
    competitorB: 92,
    competitorC: 100,
  },
  {
    product: "Leçon A (50min)",
    ourPrice: 110,
    competitorA: 115,
    competitorB: 108,
    competitorC: 120,
  },
  {
    product: "Forfait 10 leçons B",
    ourPrice: 900,
    competitorA: 950,
    competitorB: 880,
    competitorC: 970,
  },
  {
    product: "Cours théorique",
    ourPrice: 45,
    competitorA: 50,
    competitorB: 42,
    competitorC: 48,
  },
];

export const paymentMethodsData: PaymentMethodData[] = [
  {
    method: "card",
    transactions: 1245,
    amount: 156800,
    fees: 2352,
    averageDelay: 0,
  },
  {
    method: "transfer",
    transactions: 892,
    amount: 128500,
    fees: 0,
    averageDelay: 2,
  },
  {
    method: "cash",
    transactions: 567,
    amount: 45200,
    fees: 0,
    averageDelay: 0,
  },
  {
    method: "twint",
    transactions: 423,
    amount: 38900,
    fees: 389,
    averageDelay: 0,
  },
  {
    method: "other",
    transactions: 156,
    amount: 12300,
    fees: 0,
    averageDelay: 1,
  },
];

export const forecastData: ForecastDataPoint[] = [
  {
    month: "Jan 2025",
    revenueExpected: 42500,
    expensesExpected: 24800,
    cashFlow: 17700,
    confidence: 85,
    confidenceMin: 38250,
    confidenceMax: 46750,
    events: [{ type: "rentree", label: "Rentrée Hiver" }],
  },
  {
    month: "Fév 2025",
    revenueExpected: 44200,
    expensesExpected: 25200,
    cashFlow: 36900,
    confidence: 82,
    confidenceMin: 39780,
    confidenceMax: 48620,
  },
  {
    month: "Mar 2025",
    revenueExpected: 51800,
    expensesExpected: 27500,
    cashFlow: 61200,
    confidence: 78,
    confidenceMin: 46620,
    confidenceMax: 56980,
    events: [{ type: "promotion", label: "Promo Printemps" }],
  },
  {
    month: "Avr 2025",
    revenueExpected: 48900,
    expensesExpected: 26800,
    cashFlow: 83300,
    confidence: 75,
    confidenceMin: 44010,
    confidenceMax: 53790,
  },
  {
    month: "Mai 2025",
    revenueExpected: 46500,
    expensesExpected: 26200,
    cashFlow: 103600,
    confidence: 72,
    confidenceMin: 41850,
    confidenceMax: 51150,
  },
  {
    month: "Juin 2025",
    revenueExpected: 44800,
    expensesExpected: 25800,
    cashFlow: 122600,
    confidence: 70,
    confidenceMin: 40320,
    confidenceMax: 49280,
  },
];

export const financialRatios: FinancialRatio[] = [
  { name: "DSO", value: 38, benchmark: 45, unit: "jours" },
  { name: "DPO", value: 42, benchmark: 30, unit: "jours" },
  { name: "Current Ratio", value: 1.8, benchmark: 1.5, unit: "ratio" },
  { name: "Debt-to-Equity", value: 0.4, benchmark: 0.5, unit: "ratio" },
  { name: "Working Capital", value: 65000, benchmark: 50000, unit: "CHF" },
];

export const budgetCategories: BudgetCategory[] = [
  {
    category: "salaries",
    allocated: 130000,
    spent: 125000,
    remaining: 5000,
    percentUsed: 96.2,
    projectedEnd: 128500,
  },
  {
    category: "maintenance",
    allocated: 32000,
    spent: 28500,
    remaining: 3500,
    percentUsed: 89.1,
    projectedEnd: 30200,
  },
  {
    category: "insurance",
    allocated: 24000,
    spent: 22000,
    remaining: 2000,
    percentUsed: 91.7,
    projectedEnd: 23500,
  },
  {
    category: "rent",
    allocated: 18000,
    spent: 18000,
    remaining: 0,
    percentUsed: 100.0,
    projectedEnd: 18000,
  },
  {
    category: "marketing",
    allocated: 18000,
    spent: 15800,
    remaining: 2200,
    percentUsed: 87.8,
    projectedEnd: 17400,
  },
  {
    category: "other",
    allocated: 40000,
    spent: 36380,
    remaining: 3620,
    percentUsed: 91.0,
    projectedEnd: 38900,
  },
];

export default {
  financialKPIs,
  revenueData,
  categoryRevenues,
  expensesData,
  pricingData,
  competitorPricing,
  paymentMethodsData,
  forecastData,
  financialRatios,
  budgetCategories,
};
