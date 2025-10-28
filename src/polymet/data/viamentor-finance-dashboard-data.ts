/**
 * VIAMENTOR - Finance Dashboard Data
 * Mock data et types pour dashboard finance et rapports TVA
 */

// ============================================================================
// TYPES
// ============================================================================

export interface FinanceStats {
  revenue: number;
  mrr: number;
  arr: number;
  outstanding: number;
  paymentRate: number;
  netMargin: number;
  trends: {
    revenue: number;
    mrr: number;
    arr: number;
    outstanding: number;
    paymentRate: number;
    netMargin: number;
  };
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  previousYear?: number;
}

export interface RevenueSource {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PaymentMethod {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface CashFlowDataPoint {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

export interface ForecastDataPoint {
  date: string;
  actual?: number;
  forecast: number;
  lower: number;
  upper: number;
}

export interface ForecastScenario {
  name: string;
  data: ForecastDataPoint[];
  color: string;
}

export interface ForecastMetrics {
  mae: number;
  confidence: number;
}

export type VATRate = "normal" | "reduced" | "accommodation";
export type VATCategory = "training" | "exam" | "rental" | "other";

export interface VATTransaction {
  id: string;
  date: Date;
  client: string;
  amountHT: number;
  vatRate: VATRate;
  vatAmount: number;
  category: VATCategory;
  invoiceNumber: string;
}

export interface VATStats {
  turnover: number;
  collected: number;
  deductible: number;
  toPay: number;
}

export interface VATRateInfo {
  rate: VATRate;
  percentage: number;
  label: string;
}

export type ExportFormat =
  | "excel"
  | "csv"
  | "datev"
  | "banana"
  | "sap"
  | "sage"
  | "bexio";
export type AccountPlan = "pme" | "gaap" | "ifrs";

export interface ExportConfig {
  format: ExportFormat;
  accountPlan: AccountPlan;
  anonymize: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockFinanceStats: FinanceStats = {
  revenue: 125000,
  mrr: 42000,
  arr: 504000,
  outstanding: 8500,
  paymentRate: 96.5,
  netMargin: 32.5,
  trends: {
    revenue: 12.5,
    mrr: 8.3,
    arr: 8.3,
    outstanding: -15.2,
    paymentRate: 2.1,
    netMargin: 3.8,
  },
};

export const mockRevenueData: RevenueDataPoint[] = [
  { month: "Jan", revenue: 95000, previousYear: 88000 },
  { month: "Fév", revenue: 102000, previousYear: 95000 },
  { month: "Mar", revenue: 118000, previousYear: 105000 },
  { month: "Avr", revenue: 125000, previousYear: 112000 },
  { month: "Mai", revenue: 132000, previousYear: 118000 },
  { month: "Juin", revenue: 128000, previousYear: 115000 },
  { month: "Juil", revenue: 115000, previousYear: 108000 },
  { month: "Août", revenue: 98000, previousYear: 92000 },
  { month: "Sept", revenue: 135000, previousYear: 122000 },
  { month: "Oct", revenue: 142000, previousYear: 128000 },
  { month: "Nov", revenue: 138000, previousYear: 125000 },
  { month: "Déc", revenue: 125000, previousYear: 115000 },
];

export const mockRevenueSources: RevenueSource[] = [
  {
    name: "Leçons pratiques",
    value: 75000,
    percentage: 60,
    color: "hsl(var(--chart-1))",
  },
  {
    name: "Cours théoriques",
    value: 31250,
    percentage: 25,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Examens",
    value: 12500,
    percentage: 10,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Forfaits",
    value: 6250,
    percentage: 5,
    color: "hsl(var(--chart-4))",
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  { name: "Carte", value: 56250, percentage: 45, color: "hsl(var(--chart-1))" },
  {
    name: "Virement",
    value: 37500,
    percentage: 30,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Espèces",
    value: 18750,
    percentage: 15,
    color: "hsl(var(--chart-3))",
  },
  { name: "Twint", value: 12500, percentage: 10, color: "hsl(var(--chart-4))" },
];

export const mockCashFlowData: CashFlowDataPoint[] = [
  { month: "Jan", inflow: 95000, outflow: 62000, net: 33000 },
  { month: "Fév", inflow: 102000, outflow: 65000, net: 37000 },
  { month: "Mar", inflow: 118000, outflow: 72000, net: 46000 },
  { month: "Avr", inflow: 125000, outflow: 78000, net: 47000 },
  { month: "Mai", inflow: 132000, outflow: 82000, net: 50000 },
  { month: "Juin", inflow: 128000, outflow: 80000, net: 48000 },
  { month: "Juil", inflow: 115000, outflow: 75000, net: 40000 },
  { month: "Août", inflow: 98000, outflow: 68000, net: 30000 },
  { month: "Sept", inflow: 135000, outflow: 85000, net: 50000 },
  { month: "Oct", inflow: 142000, outflow: 88000, net: 54000 },
  { month: "Nov", inflow: 138000, outflow: 86000, net: 52000 },
  { month: "Déc", inflow: 125000, outflow: 80000, net: 45000 },
];

export const mockForecastScenarios: ForecastScenario[] = [
  {
    name: "Optimiste",
    color: "hsl(var(--chart-1))",
    data: [
      {
        date: "Jan 2025",
        actual: 125000,
        forecast: 125000,
        lower: 120000,
        upper: 130000,
      },
      { date: "Fév 2025", forecast: 135000, lower: 128000, upper: 142000 },
      { date: "Mar 2025", forecast: 145000, lower: 136000, upper: 154000 },
      { date: "Avr 2025", forecast: 152000, lower: 142000, upper: 162000 },
      { date: "Mai 2025", forecast: 158000, lower: 147000, upper: 169000 },
      { date: "Juin 2025", forecast: 162000, lower: 150000, upper: 174000 },
    ],
  },
  {
    name: "Réaliste",
    color: "hsl(var(--chart-2))",
    data: [
      {
        date: "Jan 2025",
        actual: 125000,
        forecast: 125000,
        lower: 120000,
        upper: 130000,
      },
      { date: "Fév 2025", forecast: 128000, lower: 122000, upper: 134000 },
      { date: "Mar 2025", forecast: 132000, lower: 125000, upper: 139000 },
      { date: "Avr 2025", forecast: 135000, lower: 127000, upper: 143000 },
      { date: "Mai 2025", forecast: 138000, lower: 129000, upper: 147000 },
      { date: "Juin 2025", forecast: 140000, lower: 131000, upper: 149000 },
    ],
  },
  {
    name: "Pessimiste",
    color: "hsl(var(--chart-3))",
    data: [
      {
        date: "Jan 2025",
        actual: 125000,
        forecast: 125000,
        lower: 120000,
        upper: 130000,
      },
      { date: "Fév 2025", forecast: 122000, lower: 116000, upper: 128000 },
      { date: "Mar 2025", forecast: 120000, lower: 113000, upper: 127000 },
      { date: "Avr 2025", forecast: 118000, lower: 110000, upper: 126000 },
      { date: "Mai 2025", forecast: 115000, lower: 107000, upper: 123000 },
      { date: "Juin 2025", forecast: 112000, lower: 104000, upper: 120000 },
    ],
  },
];

export const mockForecastMetrics: ForecastMetrics = {
  mae: 3250,
  confidence: 80,
};

export const vatRates: VATRateInfo[] = [
  { rate: "normal", percentage: 8.1, label: "Normal (8.1%)" },
  { rate: "reduced", percentage: 2.6, label: "Réduit (2.6%)" },
  { rate: "accommodation", percentage: 3.8, label: "Hébergement (3.8%)" },
];

export const mockVATTransactions: VATTransaction[] = [
  {
    id: "VAT-001",
    date: new Date("2025-01-15"),
    client: "Martin Dubois",
    amountHT: 1200,
    vatRate: "normal",
    vatAmount: 97.2,
    category: "training",
    invoiceNumber: "INV-2025-001",
  },
  {
    id: "VAT-002",
    date: new Date("2025-01-18"),
    client: "Sophie Laurent",
    amountHT: 850,
    vatRate: "normal",
    vatAmount: 68.85,
    category: "training",
    invoiceNumber: "INV-2025-002",
  },
  {
    id: "VAT-003",
    date: new Date("2025-01-22"),
    client: "École Primaire Genève",
    amountHT: 2500,
    vatRate: "reduced",
    vatAmount: 65,
    category: "training",
    invoiceNumber: "INV-2025-003",
  },
  {
    id: "VAT-004",
    date: new Date("2025-02-05"),
    client: "Pierre Martin",
    amountHT: 450,
    vatRate: "normal",
    vatAmount: 36.45,
    category: "exam",
    invoiceNumber: "INV-2025-004",
  },
  {
    id: "VAT-005",
    date: new Date("2025-02-12"),
    client: "Auto-École Lausanne",
    amountHT: 3200,
    vatRate: "normal",
    vatAmount: 259.2,
    category: "rental",
    invoiceNumber: "INV-2025-005",
  },
  {
    id: "VAT-006",
    date: new Date("2025-02-20"),
    client: "Marie Dupont",
    amountHT: 1500,
    vatRate: "normal",
    vatAmount: 121.5,
    category: "training",
    invoiceNumber: "INV-2025-006",
  },
  {
    id: "VAT-007",
    date: new Date("2025-03-08"),
    client: "Jean Petit",
    amountHT: 950,
    vatRate: "normal",
    vatAmount: 76.95,
    category: "training",
    invoiceNumber: "INV-2025-007",
  },
  {
    id: "VAT-008",
    date: new Date("2025-03-15"),
    client: "Hôtel Beau-Rivage",
    amountHT: 1800,
    vatRate: "accommodation",
    vatAmount: 68.4,
    category: "other",
    invoiceNumber: "INV-2025-008",
  },
];

export const mockVATStats: VATStats = {
  turnover: 125000,
  collected: 10125,
  deductible: 2850,
  toPay: 7275,
};

// ============================================================================
// HELPERS
// ============================================================================

export function calculateVAT(amountHT: number, rate: VATRate): number {
  const rateInfo = vatRates.find((r) => r.rate === rate);
  if (!rateInfo) return 0;
  return Math.round(amountHT * (rateInfo.percentage / 100) * 100) / 100;
}

export function getVATRatePercentage(rate: VATRate): number {
  const rateInfo = vatRates.find((r) => r.rate === rate);
  return rateInfo?.percentage || 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
