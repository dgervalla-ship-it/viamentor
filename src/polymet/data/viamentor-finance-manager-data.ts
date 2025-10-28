/**
 * VIAMENTOR - Finance Manager Data
 * Mock data et types pour dashboard Finance Manager
 *
 * FEATURES:
 * - KPIs financiers (revenus, créances, trésorerie)
 * - Transactions récentes
 * - Analytics revenus et paiements
 * - Alertes financières
 */

// ============================================================================
// TYPES
// ============================================================================

export interface FinanceKPI {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  trend: "up" | "down" | "stable";
  format: "currency" | "percentage" | "number";
}

export interface Transaction {
  id: string;
  date: string;
  type: "payment" | "invoice" | "refund" | "credit";
  studentId: string;
  studentName: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  method: "cash" | "card" | "transfer" | "qr_bill" | "other";
  reference?: string;
  description?: string;
}

export interface RevenueBreakdown {
  category: "lessons" | "packages" | "exams" | "other";
  amount: number;
  percentage: number;
  count: number;
}

export interface PaymentMethodStats {
  method: "cash" | "card" | "transfer" | "qr_bill" | "other";
  amount: number;
  percentage: number;
  count: number;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  target: number;
}

export interface FinancialAlert {
  id: string;
  type: "overdue" | "low_cashflow" | "pending_payments";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  count?: number;
  amount?: number;
  actionUrl?: string;
}

export interface FinanceManagerData {
  kpis: FinanceKPI[];
  recentTransactions: Transaction[];
  revenueBreakdown: RevenueBreakdown[];
  paymentMethods: PaymentMethodStats[];
  revenueEvolution: RevenueDataPoint[];
  alerts: FinancialAlert[];
  lastUpdate: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_FINANCE_KPIS: FinanceKPI[] = [
  {
    id: "monthly_revenue",
    label: "monthlyRevenue",
    value: 48750,
    change: 12.5,
    changeType: "increase",
    trend: "up",
    format: "currency",
  },
  {
    id: "outstanding_invoices",
    label: "outstandingInvoices",
    value: 23400,
    change: -8.3,
    changeType: "decrease",
    trend: "down",
    format: "currency",
  },
  {
    id: "cash_flow",
    label: "cashFlow",
    value: 67200,
    change: 5.2,
    changeType: "increase",
    trend: "up",
    format: "currency",
  },
  {
    id: "payment_rate",
    label: "paymentRate",
    value: 87.5,
    change: 3.2,
    changeType: "increase",
    trend: "up",
    format: "percentage",
  },
  {
    id: "avg_invoice_value",
    label: "avgInvoiceValue",
    value: 1250,
    change: 2.1,
    changeType: "increase",
    trend: "stable",
    format: "currency",
  },
  {
    id: "overdue_amount",
    label: "overdueAmount",
    value: 8900,
    change: -15.4,
    changeType: "decrease",
    trend: "down",
    format: "currency",
  },
];

export const MOCK_RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_001",
    date: "2025-01-17T14:30:00",
    type: "payment",
    studentId: "std_001",
    studentName: "Sophie Martin",
    amount: 1200,
    status: "completed",
    method: "card",
    reference: "PAY-2025-001",
    description: "Forfait 20 leçons",
  },
  {
    id: "txn_002",
    date: "2025-01-17T11:15:00",
    type: "payment",
    studentId: "std_002",
    studentName: "Lucas Dubois",
    amount: 450,
    status: "completed",
    method: "qr_bill",
    reference: "PAY-2025-002",
    description: "Leçons pratiques",
  },
  {
    id: "txn_003",
    date: "2025-01-17T09:45:00",
    type: "invoice",
    studentId: "std_003",
    studentName: "Emma Bernard",
    amount: 800,
    status: "pending",
    method: "transfer",
    reference: "INV-2025-045",
    description: "Cours théorique + leçons",
  },
  {
    id: "txn_004",
    date: "2025-01-16T16:20:00",
    type: "payment",
    studentId: "std_004",
    studentName: "Thomas Petit",
    amount: 350,
    status: "completed",
    method: "cash",
    reference: "PAY-2025-003",
    description: "Leçons pratiques",
  },
  {
    id: "txn_005",
    date: "2025-01-16T14:00:00",
    type: "refund",
    studentId: "std_005",
    studentName: "Marie Laurent",
    amount: -200,
    status: "refunded",
    method: "transfer",
    reference: "REF-2025-001",
    description: "Annulation leçon",
  },
  {
    id: "txn_006",
    date: "2025-01-16T10:30:00",
    type: "payment",
    studentId: "std_006",
    studentName: "Alexandre Simon",
    amount: 1500,
    status: "completed",
    method: "card",
    reference: "PAY-2025-004",
    description: "Forfait complet",
  },
  {
    id: "txn_007",
    date: "2025-01-15T15:45:00",
    type: "payment",
    studentId: "std_007",
    studentName: "Léa Moreau",
    amount: 600,
    status: "pending",
    method: "qr_bill",
    reference: "PAY-2025-005",
    description: "Examen pratique",
  },
  {
    id: "txn_008",
    date: "2025-01-15T13:20:00",
    type: "credit",
    studentId: "std_008",
    studentName: "Hugo Fournier",
    amount: 150,
    status: "completed",
    method: "other",
    reference: "CRD-2025-001",
    description: "Avoir suite erreur",
  },
];

export const MOCK_REVENUE_BREAKDOWN: RevenueBreakdown[] = [
  {
    category: "lessons",
    amount: 28500,
    percentage: 58.5,
    count: 342,
  },
  {
    category: "packages",
    amount: 15200,
    percentage: 31.2,
    count: 28,
  },
  {
    category: "exams",
    amount: 3800,
    percentage: 7.8,
    count: 45,
  },
  {
    category: "other",
    amount: 1250,
    percentage: 2.5,
    count: 12,
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethodStats[] = [
  {
    method: "card",
    amount: 22400,
    percentage: 46,
    count: 156,
  },
  {
    method: "qr_bill",
    amount: 15600,
    percentage: 32,
    count: 89,
  },
  {
    method: "transfer",
    amount: 7800,
    percentage: 16,
    count: 34,
  },
  {
    method: "cash",
    amount: 2400,
    percentage: 5,
    count: 67,
  },
  {
    method: "other",
    amount: 550,
    percentage: 1,
    count: 8,
  },
];

export const MOCK_REVENUE_EVOLUTION: RevenueDataPoint[] = [
  { date: "2024-07", revenue: 42300, target: 45000 },
  { date: "2024-08", revenue: 38900, target: 45000 },
  { date: "2024-09", revenue: 46200, target: 45000 },
  { date: "2024-10", revenue: 44800, target: 45000 },
  { date: "2024-11", revenue: 47500, target: 45000 },
  { date: "2024-12", revenue: 43200, target: 45000 },
  { date: "2025-01", revenue: 48750, target: 45000 },
];

export const MOCK_FINANCIAL_ALERTS: FinancialAlert[] = [
  {
    id: "alert_001",
    type: "overdue",
    severity: "high",
    title: "overdueInvoices",
    description: "overdueInvoicesDesc",
    count: 12,
    amount: 8900,
    actionUrl: "/invoices?filter=overdue",
  },
  {
    id: "alert_002",
    type: "pending_payments",
    severity: "medium",
    title: "pendingPayments",
    description: "pendingPaymentsDesc",
    count: 8,
    amount: 5400,
    actionUrl: "/payments?filter=pending",
  },
];

export const MOCK_FINANCE_MANAGER_DATA: FinanceManagerData = {
  kpis: MOCK_FINANCE_KPIS,
  recentTransactions: MOCK_RECENT_TRANSACTIONS,
  revenueBreakdown: MOCK_REVENUE_BREAKDOWN,
  paymentMethods: MOCK_PAYMENT_METHODS,
  revenueEvolution: MOCK_REVENUE_EVOLUTION,
  alerts: MOCK_FINANCIAL_ALERTS,
  lastUpdate: new Date().toISOString(),
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function formatCurrency(amount: number, locale: string = "fr"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
}

export function formatPercentage(value: number, locale: string = "fr"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function getTransactionStatusColor(
  status: Transaction["status"]
): string {
  const colors = {
    completed:
      "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950",
    pending:
      "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950",
    failed: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
    refunded: "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950",
  };
  return colors[status];
}

export function getAlertSeverityColor(
  severity: FinancialAlert["severity"]
): string {
  const colors = {
    high: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-900",
    medium:
      "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-900",
    low: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-900",
  };
  return colors[severity];
}
