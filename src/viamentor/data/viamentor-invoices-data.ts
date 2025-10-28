/**
 * VIAMENTOR Invoices Mock Data
 *
 * Mock data pour module Finance Invoices:
 * - Invoices globales plateforme
 * - Payment methods tenants
 * - Dunning configuration
 * - Types complets TypeScript
 */

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Void";
export type PaymentMethodType =
  | "Card"
  | "Bank Transfer"
  | "SEPA"
  | "Cash"
  | "Invoice";
export type PaymentMethodStatus = "Active" | "Expired" | "Failed";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // 0, 2.5, 8.1
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  tenantName: string;
  tenantLogo?: string;
  tenantAddress: {
    street: string;
    zip: string;
    city: string;
    canton: string;
    country: string;
  };
  tenantEmail: string;
  tenantPhone: string;
  tenantIBAN?: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentMethod: PaymentMethodType;
  items: InvoiceLineItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  currency: "CHF";
  paidDate?: string;
  paidAmount?: number;
  transactionId?: string;
  notes?: string;
  voidReason?: string;
  timeline: InvoiceTimelineEvent[];
}

export interface InvoiceTimelineEvent {
  id: string;
  type:
    | "Created"
    | "Sent"
    | "Viewed"
    | "Paid"
    | "Overdue"
    | "Reminder"
    | "Voided";
  date: string;
  user?: string;
  details?: string;
}

export interface PaymentMethod {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantLogo?: string;
  type: PaymentMethodType;
  isDefault: boolean;
  status: PaymentMethodStatus;
  details: {
    // Card
    last4?: string;
    brand?: "Visa" | "Mastercard" | "Amex";
    expiry?: string;
    cardholderName?: string;
    // SEPA
    iban?: string;
    accountHolder?: string;
    mandateAccepted?: boolean;
    // Invoice
    manualBilling?: boolean;
  };
  createdAt: string;
  activeSubscriptions: number;
}

export interface DunningStep {
  id: string;
  days: number;
  enabled: boolean;
  templateId: string;
  templateName: string;
  actions: {
    suspendTrial?: boolean;
    cancelSubscription?: boolean;
    archiveData?: boolean;
  };
}

export interface DunningConfig {
  enabled: boolean;
  steps: DunningStep[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  tone: "soft" | "strong" | "final";
}

// Mock Invoices
export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_001",
    invoiceNumber: "INV-2025-00001",
    tenantId: "tenant_001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/viamentor-ai.png",
    tenantAddress: {
      street: "Rue du Commerce 15",
      zip: "1003",
      city: "Lausanne",
      canton: "VD",
      country: "Suisse",
    },
    tenantEmail: "admin@ecole-leman.ch",
    tenantPhone: "+41 21 555 0101",
    tenantIBAN: "CH76 0076 2011 6238 5295 7",
    issueDate: "2025-01-15T10:00:00Z",
    dueDate: "2025-02-15T23:59:59Z",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: "item_001",
        description: "Subscription Enterprise - Janvier 2025",
        quantity: 1,
        unitPrice: 299,
        vatRate: 8.1,
        total: 323.22,
      },
      {
        id: "item_002",
        description: "Module Géolocalisation",
        quantity: 1,
        unitPrice: 29,
        vatRate: 8.1,
        total: 31.35,
      },
    ],

    subtotal: 328,
    vatAmount: 26.57,
    total: 354.57,
    currency: "CHF",
    paidDate: "2025-01-20T14:30:00Z",
    paidAmount: 354.57,
    transactionId: "TXN-20250120-001",
    timeline: [
      {
        id: "t1",
        type: "Created",
        date: "2025-01-15T10:00:00Z",
        user: "System",
      },
      {
        id: "t2",
        type: "Sent",
        date: "2025-01-15T10:05:00Z",
        details: "admin@ecole-leman.ch",
      },
      {
        id: "t3",
        type: "Viewed",
        date: "2025-01-16T09:20:00Z",
        details: "IP: 185.12.34.56",
      },
      {
        id: "t4",
        type: "Paid",
        date: "2025-01-20T14:30:00Z",
        details: "Bank Transfer - TXN-20250120-001",
      },
    ],
  },
  {
    id: "inv_002",
    invoiceNumber: "INV-2025-00002",
    tenantId: "tenant_002",
    tenantName: "École de Conduite Genève",
    tenantLogo: "https://github.com/yusufhilmi.png",
    tenantAddress: {
      street: "Avenue de la Paix 8",
      zip: "1202",
      city: "Genève",
      canton: "GE",
      country: "Suisse",
    },
    tenantEmail: "contact@ecole-geneve.ch",
    tenantPhone: "+41 22 555 0202",
    issueDate: "2025-01-20T10:00:00Z",
    dueDate: "2025-01-27T23:59:59Z",
    status: "Overdue",
    paymentMethod: "Card",
    items: [
      {
        id: "item_003",
        description: "Subscription Pro - Janvier 2025",
        quantity: 1,
        unitPrice: 99,
        vatRate: 8.1,
        total: 107.02,
      },
    ],

    subtotal: 99,
    vatAmount: 8.02,
    total: 107.02,
    currency: "CHF",
    timeline: [
      {
        id: "t5",
        type: "Created",
        date: "2025-01-20T10:00:00Z",
        user: "System",
      },
      {
        id: "t6",
        type: "Sent",
        date: "2025-01-20T10:05:00Z",
        details: "contact@ecole-geneve.ch",
      },
      {
        id: "t7",
        type: "Overdue",
        date: "2025-01-28T00:00:00Z",
        details: "5 jours de retard",
      },
      {
        id: "t8",
        type: "Reminder",
        date: "2025-01-31T09:00:00Z",
        details: "Relance 1 envoyée",
      },
    ],
  },
  {
    id: "inv_003",
    invoiceNumber: "INV-2025-00003",
    tenantId: "tenant_003",
    tenantName: "Fahrschule Zürich",
    tenantLogo: "https://github.com/kdrnp.png",
    tenantAddress: {
      street: "Bahnhofstrasse 45",
      zip: "8001",
      city: "Zürich",
      canton: "ZH",
      country: "Schweiz",
    },
    tenantEmail: "info@fahrschule-zh.ch",
    tenantPhone: "+41 44 555 0303",
    issueDate: "2025-02-01T10:00:00Z",
    dueDate: "2025-02-08T23:59:59Z",
    status: "Sent",
    paymentMethod: "SEPA",
    items: [
      {
        id: "item_004",
        description: "Subscription Pro - Février 2025",
        quantity: 1,
        unitPrice: 99,
        vatRate: 8.1,
        total: 107.02,
      },
      {
        id: "item_005",
        description: "Storage overage 5 Go",
        quantity: 5,
        unitPrice: 2,
        vatRate: 8.1,
        total: 10.81,
      },
    ],

    subtotal: 109,
    vatAmount: 8.83,
    total: 117.83,
    currency: "CHF",
    timeline: [
      {
        id: "t9",
        type: "Created",
        date: "2025-02-01T10:00:00Z",
        user: "System",
      },
      {
        id: "t10",
        type: "Sent",
        date: "2025-02-01T10:05:00Z",
        details: "info@fahrschule-zh.ch",
      },
      {
        id: "t11",
        type: "Viewed",
        date: "2025-02-02T11:15:00Z",
        details: "IP: 194.230.156.78",
      },
    ],
  },
  {
    id: "inv_004",
    invoiceNumber: "INV-2025-00004",
    tenantId: "tenant_004",
    tenantName: "Scuola Guida Ticino",
    tenantLogo: "https://github.com/yahyabedirhan.png",
    tenantAddress: {
      street: "Via Nassa 22",
      zip: "6900",
      city: "Lugano",
      canton: "TI",
      country: "Svizzera",
    },
    tenantEmail: "info@scuola-ticino.ch",
    tenantPhone: "+41 91 555 0404",
    issueDate: "2025-02-01T10:00:00Z",
    dueDate: "2025-03-03T23:59:59Z",
    status: "Draft",
    paymentMethod: "Invoice",
    items: [
      {
        id: "item_006",
        description: "Subscription Free - Février 2025",
        quantity: 1,
        unitPrice: 0,
        vatRate: 0,
        total: 0,
      },
    ],

    subtotal: 0,
    vatAmount: 0,
    total: 0,
    currency: "CHF",
    timeline: [
      {
        id: "t12",
        type: "Created",
        date: "2025-02-01T10:00:00Z",
        user: "Admin",
      },
    ],
  },
];

// Mock Payment Methods
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_001",
    tenantId: "tenant_001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/viamentor-ai.png",
    type: "Card",
    isDefault: true,
    status: "Active",
    details: {
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
      cardholderName: "Jean Dupont",
    },
    createdAt: "2024-06-15T10:00:00Z",
    activeSubscriptions: 1,
  },
  {
    id: "pm_002",
    tenantId: "tenant_002",
    tenantName: "École de Conduite Genève",
    tenantLogo: "https://github.com/yusufhilmi.png",
    type: "SEPA",
    isDefault: true,
    status: "Active",
    details: {
      iban: "CH76 0076 2011 6238 5295",
      accountHolder: "École de Conduite Genève SA",
      mandateAccepted: true,
    },
    createdAt: "2024-08-20T10:00:00Z",
    activeSubscriptions: 1,
  },
  {
    id: "pm_003",
    tenantId: "tenant_003",
    tenantName: "Fahrschule Zürich",
    tenantLogo: "https://github.com/kdrnp.png",
    type: "Card",
    isDefault: false,
    status: "Expired",
    details: {
      last4: "5555",
      brand: "Mastercard",
      expiry: "01/25",
      cardholderName: "Hans Müller",
    },
    createdAt: "2023-12-10T10:00:00Z",
    activeSubscriptions: 0,
  },
  {
    id: "pm_004",
    tenantId: "tenant_004",
    tenantName: "Scuola Guida Ticino",
    tenantLogo: "https://github.com/yahyabedirhan.png",
    type: "Invoice",
    isDefault: true,
    status: "Active",
    details: {
      manualBilling: true,
    },
    createdAt: "2024-10-05T10:00:00Z",
    activeSubscriptions: 1,
  },
];

// Mock Email Templates
export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "tpl_001",
    name: "Relance 1 - Ton doux",
    subject: "Rappel: Facture {invoiceNumber} échue",
    body: "Bonjour {tenantName},\n\nNous vous rappelons que la facture {invoiceNumber} d'un montant de {amountDue} est échue depuis {daysOverdue} jour(s).\n\nMerci de procéder au paiement dans les meilleurs délais.\n\nCordialement,\nL'équipe Viamentor",
    tone: "soft",
  },
  {
    id: "tpl_002",
    name: "Relance 2 - Ton ferme",
    subject: "URGENT: Facture {invoiceNumber} impayée",
    body: "Bonjour {tenantName},\n\nMalgré notre précédent rappel, la facture {invoiceNumber} d'un montant de {amountDue} reste impayée depuis {daysOverdue} jours.\n\nNous vous prions de régulariser votre situation sous 3 jours ouvrables.\n\nCordialement,\nL'équipe Viamentor",
    tone: "strong",
  },
  {
    id: "tpl_003",
    name: "Relance 3 - Mise en demeure",
    subject: "DERNIER RAPPEL: Facture {invoiceNumber}",
    body: "Bonjour {tenantName},\n\nCeci est notre dernier rappel concernant la facture {invoiceNumber} d'un montant de {amountDue}, impayée depuis {daysOverdue} jours.\n\nSans règlement sous 7 jours, nous serons contraints de suspendre votre abonnement.\n\nCordialement,\nL'équipe Viamentor",
    tone: "final",
  },
];

// Mock Dunning Config
export const MOCK_DUNNING_CONFIG: DunningConfig = {
  enabled: true,
  steps: [
    {
      id: "step_1",
      days: 3,
      enabled: true,
      templateId: "tpl_001",
      templateName: "Relance 1 - Ton doux",
      actions: {},
    },
    {
      id: "step_2",
      days: 7,
      enabled: true,
      templateId: "tpl_002",
      templateName: "Relance 2 - Ton ferme",
      actions: {},
    },
    {
      id: "step_3",
      days: 14,
      enabled: true,
      templateId: "tpl_003",
      templateName: "Relance 3 - Mise en demeure",
      actions: {
        suspendTrial: true,
      },
    },
    {
      id: "step_4",
      days: 30,
      enabled: false,
      templateId: "tpl_003",
      templateName: "Relance 3 - Mise en demeure",
      actions: {
        cancelSubscription: true,
        archiveData: false,
      },
    },
  ],
};

// Utility Functions
export function formatInvoiceNumber(year: number, sequence: number): string {
  return `INV-${year}-${sequence.toString().padStart(5, "0")}`;
}

export function calculateInvoiceTotal(items: InvoiceLineItem[]): {
  subtotal: number;
  vatAmount: number;
  total: number;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const vatAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice * (item.vatRate / 100),
    0
  );
  const total = subtotal + vatAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export function getDaysOverdue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = now.getTime() - due.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatCurrency(
  amount: number,
  locale: "fr" | "de" | "it" | "en" = "fr"
): string {
  const separators = {
    fr: { thousands: "'", decimal: "." },
    de: { thousands: ".", decimal: "," },
    it: { thousands: ".", decimal: "," },
    en: { thousands: ",", decimal: "." },
  };

  const sep = separators[locale];
  const parts = amount.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep.thousands);
  return `CHF ${parts.join(sep.decimal)}`;
}
