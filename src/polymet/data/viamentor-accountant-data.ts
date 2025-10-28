/**
 * VIAMENTOR - Accountant Data
 * Mock data et types TypeScript pour dashboard comptable
 *
 * Sections:
 * - KPIs financiers (revenus, créances, trésorerie, taux encaissement)
 * - Transactions récentes
 * - Analytics revenus (évolution, répartition, moyens paiement)
 * - Alertes comptables
 */

// ============================================================================
// TYPES
// ============================================================================

export interface AccountantKPI {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  format: "currency" | "percentage" | "number";
  icon: string;
}

export interface Transaction {
  id: string;
  date: string;
  reference: string;
  studentId: string;
  studentName: string;
  amount: number;
  method: "card" | "qr" | "transfer" | "cash";
  status: "paid" | "pending" | "overdue" | "cancelled";
  invoiceId?: string;
}

export interface RevenueEvolution {
  month: string;
  revenue: number;
  target: number;
}

export interface RevenueCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface PaymentMethodDistribution {
  method: string;
  count: number;
  amount: number;
  percentage: number;
}

export interface AccountantAlert {
  id: string;
  type: "overdue" | "pending" | "cashflow" | "reconciliation";
  severity: "high" | "medium" | "low";
  title: string;
  count?: number;
  amount?: number;
  action: string;
  href: string;
}

export interface AccountantDashboardData {
  kpis: AccountantKPI[];
  transactions: Transaction[];
  revenueEvolution: RevenueEvolution[];
  revenueCategories: RevenueCategory[];
  paymentMethods: PaymentMethodDistribution[];
  alerts: AccountantAlert[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const ACCOUNTANT_KPIS: AccountantKPI[] = [
  {
    id: "monthly-revenue",
    label: "monthlyRevenue",
    value: 48750,
    change: 12.5,
    trend: "up",
    format: "currency",
    icon: "TrendingUpIcon",
  },
  {
    id: "receivables",
    label: "receivables",
    value: 23400,
    change: -8.3,
    trend: "down",
    format: "currency",
    icon: "FileTextIcon",
  },
  {
    id: "cash-flow",
    label: "cashFlow",
    value: 67200,
    change: 5.2,
    trend: "up",
    format: "currency",
    icon: "WalletIcon",
  },
  {
    id: "collection-rate",
    label: "collectionRate",
    value: 87.5,
    change: 3.2,
    trend: "up",
    format: "percentage",
    icon: "PercentIcon",
  },
  {
    id: "avg-invoice",
    label: "avgInvoice",
    value: 1250,
    change: 0,
    trend: "stable",
    format: "currency",
    icon: "ReceiptIcon",
  },
  {
    id: "overdue",
    label: "overdue",
    value: 8900,
    change: -15.4,
    trend: "down",
    format: "currency",
    icon: "AlertTriangleIcon",
  },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-001",
    date: "2025-01-15",
    reference: "INV-2025-0234",
    studentId: "std-001",
    studentName: "Sophie Martin",
    amount: 1500,
    method: "card",
    status: "paid",
    invoiceId: "inv-234",
  },
  {
    id: "txn-002",
    date: "2025-01-15",
    reference: "INV-2025-0235",
    studentId: "std-002",
    studentName: "Lucas Dubois",
    amount: 2400,
    method: "qr",
    status: "pending",
    invoiceId: "inv-235",
  },
  {
    id: "txn-003",
    date: "2025-01-14",
    reference: "INV-2025-0232",
    studentId: "std-003",
    studentName: "Emma Lefebvre",
    amount: 1200,
    method: "transfer",
    status: "paid",
    invoiceId: "inv-232",
  },
  {
    id: "txn-004",
    date: "2025-01-14",
    reference: "INV-2025-0230",
    studentId: "std-004",
    studentName: "Thomas Bernard",
    amount: 800,
    method: "cash",
    status: "paid",
    invoiceId: "inv-230",
  },
  {
    id: "txn-005",
    date: "2025-01-13",
    reference: "INV-2025-0228",
    studentId: "std-005",
    studentName: "Léa Moreau",
    amount: 1800,
    method: "qr",
    status: "overdue",
    invoiceId: "inv-228",
  },
  {
    id: "txn-006",
    date: "2025-01-13",
    reference: "INV-2025-0226",
    studentId: "std-006",
    studentName: "Hugo Petit",
    amount: 950,
    method: "card",
    status: "paid",
    invoiceId: "inv-226",
  },
];

export const REVENUE_EVOLUTION: RevenueEvolution[] = [
  { month: "Juil", revenue: 42300, target: 45000 },
  { month: "Août", revenue: 38900, target: 45000 },
  { month: "Sept", revenue: 46200, target: 45000 },
  { month: "Oct", revenue: 44800, target: 45000 },
  { month: "Nov", revenue: 47500, target: 45000 },
  { month: "Déc", revenue: 43200, target: 45000 },
  { month: "Jan", revenue: 48750, target: 45000 },
];

export const REVENUE_CATEGORIES: RevenueCategory[] = [
  {
    category: "lessons",
    amount: 28275,
    percentage: 58,
    color: "hsl(var(--chart-1))",
  },
  {
    category: "packages",
    amount: 15112.5,
    percentage: 31,
    color: "hsl(var(--chart-2))",
  },
  {
    category: "exams",
    amount: 3900,
    percentage: 8,
    color: "hsl(var(--chart-3))",
  },
  {
    category: "other",
    amount: 1462.5,
    percentage: 3,
    color: "hsl(var(--chart-4))",
  },
];

export const PAYMENT_METHODS: PaymentMethodDistribution[] = [
  {
    method: "card",
    count: 145,
    amount: 22425,
    percentage: 46,
  },
  {
    method: "qr",
    count: 98,
    amount: 15600,
    percentage: 32,
  },
  {
    method: "transfer",
    count: 52,
    amount: 7800,
    percentage: 16,
  },
  {
    method: "cash",
    count: 28,
    amount: 2925,
    percentage: 6,
  },
];

export const ACCOUNTANT_ALERTS: AccountantAlert[] = [
  {
    id: "alert-001",
    type: "overdue",
    severity: "high",
    title: "overdueInvoices",
    count: 12,
    amount: 8900,
    action: "view",
    href: "/invoices?filter=overdue",
  },
  {
    id: "alert-002",
    type: "pending",
    severity: "medium",
    title: "pendingPayments",
    count: 8,
    amount: 6200,
    action: "view",
    href: "/payments?filter=pending",
  },
  {
    id: "alert-003",
    type: "cashflow",
    severity: "medium",
    title: "lowCashFlow",
    action: "view",
    href: "/financial/analytics",
  },
  {
    id: "alert-004",
    type: "reconciliation",
    severity: "low",
    title: "reconciliationNeeded",
    count: 5,
    action: "resolve",
    href: "/payments?action=reconcile",
  },
];

export const MOCK_ACCOUNTANT_DASHBOARD: AccountantDashboardData = {
  kpis: ACCOUNTANT_KPIS,
  transactions: RECENT_TRANSACTIONS,
  revenueEvolution: REVENUE_EVOLUTION,
  revenueCategories: REVENUE_CATEGORIES,
  paymentMethods: PAYMENT_METHODS,
  alerts: ACCOUNTANT_ALERTS,
};
