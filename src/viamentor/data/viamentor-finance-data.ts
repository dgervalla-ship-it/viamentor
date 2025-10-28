/**
 * VIAMENTOR Finance Data
 *
 * Mock data pour module Finance Admin avec KPIs, subscriptions et invoices
 *
 * @module data/viamentor-finance-data
 */

export type PlanType = "Free" | "Pro" | "Enterprise";
export type SubscriptionStatus =
  | "Active"
  | "Trialing"
  | "Past Due"
  | "Canceled";
export type BillingCycle = "Monthly" | "Yearly";
export type PaymentMethodType = "Card" | "SEPA";

export interface FinanceKPIs {
  mrr: number;
  mrrTrend: number;
  mrrHistory: { month: string; value: number }[];
  arr: number;
  newMrr: number;
  churnMrr: number;
  outstandingInvoices: { amount: number; count: number };
  collectedYTD: { amount: number; target: number };
}

export interface PaymentMethod {
  type: PaymentMethodType;
  brand?: "Visa" | "Mastercard" | "Amex";
  last4?: string;
  expiry?: string;
  bankName?: string;
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantLogo?: string;
  plan: PlanType;
  status: SubscriptionStatus;
  price: number;
  billingCycle: BillingCycle;
  nextBillingDate: string;
  autoRenewal: boolean;
  paymentMethod: PaymentMethod;
  mrrContribution: number;
  studentsCount: number;
  studentsLimit: number;
  storageUsed: number;
  storageQuota: number;
  createdAt: string;
  canceledAt?: string;
}

export const PLAN_FEATURES = {
  Free: {
    price: 0,
    students: 10,
    storage: 1,
    modules: ["Gestion élèves", "Planning basique"],
    support: "Email",
  },
  Pro: {
    price: 99,
    students: 50,
    storage: 10,
    modules: [
      "Gestion élèves",
      "Planning avancé",
      "Facturation",
      "Rapports",
      "Examens",
    ],

    support: "Prioritaire",
  },
  Enterprise: {
    price: 299,
    students: -1,
    storage: 100,
    modules: [
      "Tous modules Pro",
      "Multi-sites",
      "API dédiée",
      "Branding custom",
      "SSO",
    ],

    support: "Account Manager",
  },
};

export const MOCK_FINANCE_KPIS: FinanceKPIs = {
  mrr: 45680,
  mrrTrend: 8.5,
  mrrHistory: [
    { month: "Jan 24", value: 32500 },
    { month: "Fév 24", value: 34200 },
    { month: "Mar 24", value: 35800 },
    { month: "Avr 24", value: 36900 },
    { month: "Mai 24", value: 38100 },
    { month: "Juin 24", value: 39500 },
    { month: "Juil 24", value: 40200 },
    { month: "Août 24", value: 41000 },
    { month: "Sep 24", value: 42100 },
    { month: "Oct 24", value: 43500 },
    { month: "Nov 24", value: 44200 },
    { month: "Déc 24", value: 45680 },
  ],

  arr: 548160,
  newMrr: 3850,
  churnMrr: 1570,
  outstandingInvoices: { amount: 8940, count: 12 },
  collectedYTD: { amount: 487320, target: 550000 },
};

export const MOCK_SUBSCRIPTIONS: TenantSubscription[] = [
  {
    id: "sub-001",
    tenantId: "tenant-001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/viamentor-ai.png",
    plan: "Enterprise",
    status: "Active",
    price: 299,
    billingCycle: "Monthly",
    nextBillingDate: "2025-02-15",
    autoRenewal: true,
    paymentMethod: {
      type: "Card",
      brand: "Visa",
      last4: "4242",
      expiry: "12/26",
    },
    mrrContribution: 299,
    studentsCount: 145,
    studentsLimit: -1,
    storageUsed: 45,
    storageQuota: 100,
    createdAt: "2023-06-12",
  },
  {
    id: "sub-002",
    tenantId: "tenant-002",
    tenantName: "École de Conduite Genève",
    tenantLogo: "https://github.com/yusufhilmi.png",
    plan: "Pro",
    status: "Active",
    price: 99,
    billingCycle: "Yearly",
    nextBillingDate: "2025-08-20",
    autoRenewal: true,
    paymentMethod: { type: "SEPA", bankName: "UBS" },
    mrrContribution: 99,
    studentsCount: 38,
    studentsLimit: 50,
    storageUsed: 6.2,
    storageQuota: 10,
    createdAt: "2024-08-20",
  },
  {
    id: "sub-003",
    tenantId: "tenant-003",
    tenantName: "Fahrschule Zürich",
    plan: "Pro",
    status: "Past Due",
    price: 99,
    billingCycle: "Monthly",
    nextBillingDate: "2025-01-05",
    autoRenewal: true,
    paymentMethod: {
      type: "Card",
      brand: "Mastercard",
      last4: "5555",
      expiry: "03/25",
    },
    mrrContribution: 99,
    studentsCount: 42,
    studentsLimit: 50,
    storageUsed: 7.8,
    storageQuota: 10,
    createdAt: "2024-03-10",
  },
  {
    id: "sub-004",
    tenantId: "tenant-004",
    tenantName: "Scuola Guida Ticino",
    plan: "Free",
    status: "Trialing",
    price: 0,
    billingCycle: "Monthly",
    nextBillingDate: "2025-01-28",
    autoRenewal: false,
    paymentMethod: {
      type: "Card",
      brand: "Visa",
      last4: "1111",
      expiry: "09/27",
    },
    mrrContribution: 0,
    studentsCount: 8,
    studentsLimit: 10,
    storageUsed: 0.5,
    storageQuota: 1,
    createdAt: "2025-01-14",
  },
  {
    id: "sub-005",
    tenantId: "tenant-005",
    tenantName: "Auto-École Lausanne",
    plan: "Pro",
    status: "Canceled",
    price: 99,
    billingCycle: "Monthly",
    nextBillingDate: "2025-01-31",
    autoRenewal: false,
    paymentMethod: {
      type: "Card",
      brand: "Amex",
      last4: "3782",
      expiry: "06/26",
    },
    mrrContribution: 0,
    studentsCount: 25,
    studentsLimit: 50,
    storageUsed: 4.2,
    storageQuota: 10,
    createdAt: "2024-02-15",
    canceledAt: "2024-12-28",
  },
];

export function calculateProrata(
  currentPlan: PlanType,
  newPlan: PlanType,
  daysRemaining: number,
  billingCycle: BillingCycle
): { credit: number; newCost: number; difference: number } {
  const currentPrice = PLAN_FEATURES[currentPlan].price;
  const newPrice = PLAN_FEATURES[newPlan].price;
  const daysInCycle = billingCycle === "Monthly" ? 30 : 365;

  const credit = (currentPrice * daysRemaining) / daysInCycle;
  const newCost = (newPrice * daysRemaining) / daysInCycle;
  const difference = newCost - credit;

  return {
    credit: Math.round(credit * 100) / 100,
    newCost: Math.round(newCost * 100) / 100,
    difference: Math.round(difference * 100) / 100,
  };
}

export function formatCurrency(
  amount: number,
  locale: "fr" | "de" | "it" | "en"
): string {
  const formatters = {
    fr: new Intl.NumberFormat("fr-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }),
    de: new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }),
    it: new Intl.NumberFormat("it-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }),
    en: new Intl.NumberFormat("en-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }),
  };

  return formatters[locale].format(amount);
}
