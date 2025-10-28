/**
 * VIAMENTOR - Invoices List Extended Data
 * Mock data étendu pour liste factures avec élèves, stats, filtres
 */

import type {
  Invoice,
  InvoiceStatus,
} from "@/polymet/data/viamentor-invoices-data";

export interface InvoiceStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone?: string;
}

export interface InvoiceListItem extends Invoice {
  student: InvoiceStudent;
  remainingBalance: number;
  daysOverdue?: number;
  daysUntilDue?: number;
}

export interface InvoiceListStats {
  totalInvoices: number;
  totalAmount: number;
  paidCount: number;
  unpaidCount: number;
  overdueCount: number;
  draftCount: number;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    status?: InvoiceStatus[];
    dateRange?: { start: string; end: string };
    minAmount?: number;
    maxAmount?: number;
    overdueOnly?: boolean;
  };
}

// Mock Students
export const MOCK_INVOICE_STUDENTS: InvoiceStudent[] = [
  {
    id: "std_001",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@email.ch",
    avatar: "https://github.com/yusufhilmi.png",
    phone: "+41 79 123 45 67",
  },
  {
    id: "std_002",
    firstName: "Lucas",
    lastName: "Dubois",
    email: "lucas.dubois@email.ch",
    avatar: "https://github.com/kdrnp.png",
    phone: "+41 78 234 56 78",
  },
  {
    id: "std_003",
    firstName: "Emma",
    lastName: "Müller",
    email: "emma.mueller@email.ch",
    avatar: "https://github.com/yahyabedirhan.png",
    phone: "+41 76 345 67 89",
  },
  {
    id: "std_004",
    firstName: "Noah",
    lastName: "Rossi",
    email: "noah.rossi@email.ch",
    avatar: "https://github.com/denizbuyuktas.png",
    phone: "+41 77 456 78 90",
  },
  {
    id: "std_005",
    firstName: "Léa",
    lastName: "Bernard",
    email: "lea.bernard@email.ch",
    avatar: "https://github.com/shoaibux1.png",
    phone: "+41 79 567 89 01",
  },
];

// Extended Mock Invoices
export const MOCK_INVOICES_LIST: InvoiceListItem[] = [
  {
    id: "inv_001",
    invoiceNumber: "INV-2025-00001",
    tenantId: "tenant_001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/polymet-ai.png",
    tenantAddress: {
      street: "Rue du Commerce 15",
      zip: "1003",
      city: "Lausanne",
      canton: "VD",
      country: "Suisse",
    },
    tenantEmail: "admin@ecole-leman.ch",
    tenantPhone: "+41 21 555 0101",
    issueDate: "2025-01-15T10:00:00Z",
    dueDate: "2025-02-15T23:59:59Z",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: "item_001",
        description: "Forfait 20 leçons - Catégorie B",
        quantity: 1,
        unitPrice: 1800,
        vatRate: 8.1,
        total: 1945.8,
      },
    ],

    subtotal: 1800,
    vatAmount: 145.8,
    total: 1945.8,
    currency: "CHF",
    paidDate: "2025-01-20T14:30:00Z",
    paidAmount: 1945.8,
    transactionId: "TXN-20250120-001",
    timeline: [
      {
        id: "t1",
        type: "Created",
        date: "2025-01-15T10:00:00Z",
        user: "System",
      },
      { id: "t2", type: "Sent", date: "2025-01-15T10:05:00Z" },
      { id: "t3", type: "Paid", date: "2025-01-20T14:30:00Z" },
    ],

    student: MOCK_INVOICE_STUDENTS[0],
    remainingBalance: 0,
    daysUntilDue: 15,
  },
  {
    id: "inv_002",
    invoiceNumber: "INV-2025-00002",
    tenantId: "tenant_001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/polymet-ai.png",
    tenantAddress: {
      street: "Rue du Commerce 15",
      zip: "1003",
      city: "Lausanne",
      canton: "VD",
      country: "Suisse",
    },
    tenantEmail: "admin@ecole-leman.ch",
    tenantPhone: "+41 21 555 0101",
    issueDate: "2025-01-20T10:00:00Z",
    dueDate: "2025-01-27T23:59:59Z",
    status: "Overdue",
    paymentMethod: "Card",
    items: [
      {
        id: "item_002",
        description: "Leçon de conduite - 90 min",
        quantity: 5,
        unitPrice: 120,
        vatRate: 8.1,
        total: 648.6,
      },
    ],

    subtotal: 600,
    vatAmount: 48.6,
    total: 648.6,
    currency: "CHF",
    timeline: [
      {
        id: "t4",
        type: "Created",
        date: "2025-01-20T10:00:00Z",
        user: "System",
      },
      { id: "t5", type: "Sent", date: "2025-01-20T10:05:00Z" },
      { id: "t6", type: "Overdue", date: "2025-01-28T00:00:00Z" },
      { id: "t7", type: "Reminder", date: "2025-01-31T09:00:00Z" },
    ],

    student: MOCK_INVOICE_STUDENTS[1],
    remainingBalance: 648.6,
    daysOverdue: 7,
  },
  {
    id: "inv_003",
    invoiceNumber: "INV-2025-00003",
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
    issueDate: "2025-02-01T10:00:00Z",
    dueDate: "2025-02-08T23:59:59Z",
    status: "Sent",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: "item_003",
        description: "Cours théorique VKU - 4 jours",
        quantity: 1,
        unitPrice: 250,
        vatRate: 8.1,
        total: 270.25,
      },
    ],

    subtotal: 250,
    vatAmount: 20.25,
    total: 270.25,
    currency: "CHF",
    timeline: [
      {
        id: "t8",
        type: "Created",
        date: "2025-02-01T10:00:00Z",
        user: "System",
      },
      { id: "t9", type: "Sent", date: "2025-02-01T10:05:00Z" },
      { id: "t10", type: "Viewed", date: "2025-02-02T11:15:00Z" },
    ],

    student: MOCK_INVOICE_STUDENTS[2],
    remainingBalance: 270.25,
    daysUntilDue: 5,
  },
  {
    id: "inv_004",
    invoiceNumber: "INV-2025-00004",
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
    issueDate: "2025-02-01T10:00:00Z",
    dueDate: "2025-03-03T23:59:59Z",
    status: "Draft",
    paymentMethod: "Cash",
    items: [
      {
        id: "item_004",
        description: "Examen pratique - Catégorie B",
        quantity: 1,
        unitPrice: 150,
        vatRate: 8.1,
        total: 162.15,
      },
    ],

    subtotal: 150,
    vatAmount: 12.15,
    total: 162.15,
    currency: "CHF",
    timeline: [
      {
        id: "t11",
        type: "Created",
        date: "2025-02-01T10:00:00Z",
        user: "Admin",
      },
    ],

    student: MOCK_INVOICE_STUDENTS[3],
    remainingBalance: 162.15,
    daysUntilDue: 30,
  },
  {
    id: "inv_005",
    invoiceNumber: "INV-2025-00005",
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
    issueDate: "2025-01-10T10:00:00Z",
    dueDate: "2025-01-17T23:59:59Z",
    status: "Overdue",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: "item_005",
        description: "Forfait 10 leçons - Catégorie B",
        quantity: 1,
        unitPrice: 950,
        vatRate: 8.1,
        total: 1026.95,
      },
    ],

    subtotal: 950,
    vatAmount: 76.95,
    total: 1026.95,
    currency: "CHF",
    paidAmount: 500,
    timeline: [
      {
        id: "t12",
        type: "Created",
        date: "2025-01-10T10:00:00Z",
        user: "System",
      },
      { id: "t13", type: "Sent", date: "2025-01-10T10:05:00Z" },
      { id: "t14", type: "Overdue", date: "2025-01-18T00:00:00Z" },
      { id: "t15", type: "Reminder", date: "2025-01-21T09:00:00Z" },
      { id: "t16", type: "Reminder", date: "2025-01-28T09:00:00Z" },
    ],

    student: MOCK_INVOICE_STUDENTS[4],
    remainingBalance: 526.95,
    daysOverdue: 17,
  },
];

// Filter Presets
export const MOCK_FILTER_PRESETS: FilterPreset[] = [
  {
    id: "preset_001",
    name: "Factures échues",
    filters: {
      status: ["Overdue"],
      overdueOnly: true,
    },
  },
  {
    id: "preset_002",
    name: "À envoyer",
    filters: {
      status: ["Draft"],
    },
  },
  {
    id: "preset_003",
    name: "Payées ce mois",
    filters: {
      status: ["Paid"],
      dateRange: {
        start: "2025-02-01T00:00:00Z",
        end: "2025-02-28T23:59:59Z",
      },
    },
  },
  {
    id: "preset_004",
    name: "Montants élevés",
    filters: {
      minAmount: 1000,
    },
  },
];

// Calculate Stats
export function calculateInvoiceListStats(
  invoices: InvoiceListItem[]
): InvoiceListStats {
  return {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidCount: invoices.filter((inv) => inv.status === "Paid").length,
    unpaidCount: invoices.filter(
      (inv) => inv.status !== "Paid" && inv.status !== "Void"
    ).length,
    overdueCount: invoices.filter((inv) => inv.status === "Overdue").length,
    draftCount: invoices.filter((inv) => inv.status === "Draft").length,
  };
}

// Export formats
export type ExportFormat = "excel" | "csv" | "pdf" | "accounting";

export interface ExportOptions {
  format: ExportFormat;
  includeDetails?: boolean;
  selectedIds?: string[];
}
