/**
 * VIAMENTOR - Billing Dashboard Data
 * Mock data pour dashboard facturation School Admin avec KPIs, stats, invoices
 */

// ============================================================================
// TYPES
// ============================================================================

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "void";
export type PaymentMethod = "cash" | "card" | "transfer" | "twint" | "other";
export type ProductType = "lesson" | "package" | "course" | "exam" | "other";
export type ReminderLevel = 1 | 2 | 3;

export interface BillingKPIs {
  monthRevenue: {
    amount: number;
    trend: number; // % vs last month
    isPositive: boolean;
  };
  unpaidInvoices: {
    count: number;
    amount: number;
  };
  pendingPayments: {
    count: number;
    amount: number;
  };
  yearToDate: {
    amount: number;
    target?: number;
    percentage?: number;
  };
  monthInvoices: number;
  collectionRate: number; // % paid/total
  averagePaymentDelay: number; // days
  overdueOver90Days: number; // CHF
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  payments: number;
}

export interface ActionRequired {
  type: "draft" | "reminder" | "validation" | "credit";
  count: number;
  label: string;
  link: string;
}

export interface UpcomingDue {
  id: string;
  date: string;
  student: {
    id: string;
    name: string;
    avatar: string;
  };
  amount: number;
  daysUntilDue: number;
  invoiceNumber: string;
}

export interface RevenueByCategoryData {
  category: string;
  B: number;
  A: number;
  BE: number;
}

export interface ProductTypeData {
  type: ProductType;
  amount: number;
  percentage: number;
}

export interface TopProduct {
  name: string;
  count: number;
  total: number;
  rank: number;
}

export interface PaymentMethodStats {
  method: PaymentMethod;
  count: number;
  amount: number;
  percentage: number;
  averageDelay: number;
}

export interface ReminderStats {
  level: ReminderLevel;
  sent: number;
  paid: number;
  successRate: number;
}

export interface InvoicePreview {
  id: string;
  number: string;
  date: string;
  student: {
    id: string;
    name: string;
    avatar: string;
  };
  amount: number;
  status: InvoiceStatus;
  dueDate?: string;
  daysOverdue?: number;
}

export interface CalendarDay {
  date: string;
  count: number;
  invoices: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockBillingKPIs: BillingKPIs = {
  monthRevenue: {
    amount: 45680.5,
    trend: 12.5,
    isPositive: true,
  },
  unpaidInvoices: {
    count: 23,
    amount: 18450.0,
  },
  pendingPayments: {
    count: 8,
    amount: 6780.0,
  },
  yearToDate: {
    amount: 387650.0,
    target: 500000.0,
    percentage: 77.53,
  },
  monthInvoices: 142,
  collectionRate: 87.5,
  averagePaymentDelay: 12,
  overdueOver90Days: 4250.0,
};

export const mockRevenueData: RevenueDataPoint[] = [
  { month: "Jan", revenue: 38500, payments: 36200 },
  { month: "Fév", revenue: 42300, payments: 40100 },
  { month: "Mar", revenue: 39800, payments: 38900 },
  { month: "Avr", revenue: 44200, payments: 42800 },
  { month: "Mai", revenue: 41500, payments: 40200 },
  { month: "Jun", revenue: 38900, payments: 37500 },
  { month: "Jul", revenue: 35200, payments: 34800 },
  { month: "Aoû", revenue: 32100, payments: 31500 },
  { month: "Sep", revenue: 43800, payments: 42300 },
  { month: "Oct", revenue: 46200, payments: 44900 },
  { month: "Nov", revenue: 44500, payments: 43200 },
  { month: "Déc", revenue: 45680, payments: 44100 },
];

export const mockActionsRequired: ActionRequired[] = [
  {
    type: "draft",
    count: 5,
    label: "Factures brouillon à finaliser",
    link: "/billing/invoices?status=draft",
  },
  {
    type: "reminder",
    count: 12,
    label: "Rappels à envoyer",
    link: "/billing/reminders",
  },
  {
    type: "validation",
    count: 3,
    label: "Paiements à valider",
    link: "/billing/payments?status=pending",
  },
  {
    type: "credit",
    count: 2,
    label: "Avoirs à créer",
    link: "/billing/credits",
  },
];

export const mockUpcomingDues: UpcomingDue[] = [
  {
    id: "1",
    date: "2025-01-16",
    student: {
      id: "s1",
      name: "Sophie Martin",
      avatar: "https://github.com/yusufhilmi.png",
    },
    amount: 1250.0,
    daysUntilDue: 1,
    invoiceNumber: "INV-2025-0142",
  },
  {
    id: "2",
    date: "2025-01-17",
    student: {
      id: "s2",
      name: "Lucas Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    amount: 890.0,
    daysUntilDue: 2,
    invoiceNumber: "INV-2025-0138",
  },
  {
    id: "3",
    date: "2025-01-18",
    student: {
      id: "s3",
      name: "Emma Müller",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    amount: 1580.0,
    daysUntilDue: 3,
    invoiceNumber: "INV-2025-0145",
  },
  {
    id: "4",
    date: "2025-01-19",
    student: {
      id: "s4",
      name: "Noah Schmidt",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    amount: 720.0,
    daysUntilDue: 4,
    invoiceNumber: "INV-2025-0141",
  },
  {
    id: "5",
    date: "2025-01-20",
    student: {
      id: "s5",
      name: "Léa Bernard",
      avatar: "https://github.com/shoaibux1.png",
    },
    amount: 2100.0,
    daysUntilDue: 5,
    invoiceNumber: "INV-2025-0149",
  },
];

export const mockRevenueByCategoryData: RevenueByCategoryData[] = [
  { category: "Jan", B: 12500, A: 8300, BE: 5200 },
  { category: "Fév", B: 14200, A: 9100, BE: 6400 },
  { category: "Mar", B: 13800, A: 8900, BE: 5800 },
  { category: "Avr", B: 15100, A: 9800, BE: 6200 },
  { category: "Mai", B: 14500, A: 9200, BE: 5900 },
  { category: "Jun", B: 13200, A: 8500, BE: 5400 },
];

export const mockProductTypeData: ProductTypeData[] = [
  { type: "lesson", amount: 185400, percentage: 47.8 },
  { type: "package", amount: 142300, percentage: 36.7 },
  { type: "course", amount: 38900, percentage: 10.0 },
  { type: "exam", amount: 15200, percentage: 3.9 },
  { type: "other", amount: 5850, percentage: 1.6 },
];

export const mockTopProducts: TopProduct[] = [
  { rank: 1, name: "Forfait 20 leçons B", count: 45, total: 45000 },
  { rank: 2, name: "Leçon individuelle B", count: 234, total: 23400 },
  { rank: 3, name: "Cours théorique VKU", count: 38, total: 11400 },
  { rank: 4, name: "Forfait 10 leçons A", count: 28, total: 16800 },
  { rank: 5, name: "Examen pratique B", count: 52, total: 7800 },
];

export const mockPaymentMethodStats: PaymentMethodStats[] = [
  {
    method: "transfer",
    count: 89,
    amount: 156780,
    percentage: 45.2,
    averageDelay: 8,
  },
  {
    method: "card",
    count: 67,
    amount: 98450,
    percentage: 28.4,
    averageDelay: 2,
  },
  {
    method: "cash",
    count: 54,
    amount: 67230,
    percentage: 19.4,
    averageDelay: 0,
  },
  {
    method: "twint",
    count: 18,
    amount: 18900,
    percentage: 5.5,
    averageDelay: 1,
  },
  {
    method: "other",
    count: 6,
    amount: 5290,
    percentage: 1.5,
    averageDelay: 15,
  },
];

export const mockReminderStats: ReminderStats[] = [
  { level: 1, sent: 45, paid: 32, successRate: 71.1 },
  { level: 2, sent: 18, paid: 10, successRate: 55.6 },
  { level: 3, sent: 8, paid: 3, successRate: 37.5 },
];

export const mockInvoicesPreview: InvoicePreview[] = [
  {
    id: "1",
    number: "INV-2025-0150",
    date: "2025-01-15",
    student: {
      id: "s1",
      name: "Sophie Martin",
      avatar: "https://github.com/yusufhilmi.png",
    },
    amount: 1250.0,
    status: "sent",
    dueDate: "2025-01-30",
  },
  {
    id: "2",
    number: "INV-2025-0149",
    date: "2025-01-14",
    student: {
      id: "s2",
      name: "Lucas Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    amount: 890.0,
    status: "paid",
  },
  {
    id: "3",
    number: "INV-2025-0148",
    date: "2025-01-13",
    student: {
      id: "s3",
      name: "Emma Müller",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    amount: 2100.0,
    status: "overdue",
    dueDate: "2025-01-10",
    daysOverdue: 5,
  },
  {
    id: "4",
    number: "INV-2025-0147",
    date: "2025-01-12",
    student: {
      id: "s4",
      name: "Noah Schmidt",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    amount: 720.0,
    status: "draft",
  },
  {
    id: "5",
    number: "INV-2025-0146",
    date: "2025-01-11",
    student: {
      id: "s5",
      name: "Léa Bernard",
      avatar: "https://github.com/shoaibux1.png",
    },
    amount: 1580.0,
    status: "sent",
    dueDate: "2025-01-25",
  },
];

export const mockCalendarDays: CalendarDay[] = [
  {
    date: "2025-01-16",
    count: 3,
    invoices: ["INV-2025-0142", "INV-2025-0143", "INV-2025-0144"],
  },
  {
    date: "2025-01-17",
    count: 2,
    invoices: ["INV-2025-0138", "INV-2025-0139"],
  },
  { date: "2025-01-18", count: 1, invoices: ["INV-2025-0145"] },
  {
    date: "2025-01-20",
    count: 4,
    invoices: [
      "INV-2025-0149",
      "INV-2025-0150",
      "INV-2025-0151",
      "INV-2025-0152",
    ],
  },
  {
    date: "2025-01-23",
    count: 2,
    invoices: ["INV-2025-0155", "INV-2025-0156"],
  },
];
