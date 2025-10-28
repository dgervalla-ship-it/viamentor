/**
 * VIAMENTOR - Invoice Detail Extended Data
 * Mock data étendu pour vue détail facture avec paiements, communications, historique
 */

import type { Invoice } from "@/viamentor/data/viamentor-invoices-data";

export interface InvoicePayment {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  method: "Bank Transfer" | "Card" | "Cash" | "TWINT" | "PayPal";
  reference?: string;
  recordedBy: string;
  notes?: string;
  receiptUrl?: string;
}

export interface InvoiceEmail {
  id: string;
  invoiceId: string;
  date: string;
  recipient: string;
  subject: string;
  type: "Initial" | "Reminder1" | "Reminder2" | "Reminder3" | "Custom";
  status: "Sent" | "Opened" | "Clicked" | "Bounced";
  openedAt?: string;
  clickedAt?: string;
}

export interface InvoiceAuditLog {
  id: string;
  invoiceId: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}

export interface InvoiceNote {
  id: string;
  invoiceId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  content: string;
  replies?: InvoiceNote[];
}

export interface InvoiceDetailExtended extends Invoice {
  payments: InvoicePayment[];
  emails: InvoiceEmail[];
  auditLogs: InvoiceAuditLog[];
  notes: InvoiceNote[];
  internalNotes?: string;
  qrBillEnabled: boolean;
  qrReference?: string;
  studentPhone?: string;
  studentAddress?: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
}

// Mock Payments
export const MOCK_INVOICE_PAYMENTS: InvoicePayment[] = [
  {
    id: "pay_001",
    invoiceId: "inv_001",
    date: "2025-01-20T14:30:00Z",
    amount: 1945.8,
    method: "Bank Transfer",
    reference: "TXN-20250120-001",
    recordedBy: "Admin User",
    notes: "Paiement complet reçu",
  },
  {
    id: "pay_002",
    invoiceId: "inv_005",
    date: "2025-01-15T10:00:00Z",
    amount: 500,
    method: "Cash",
    recordedBy: "Admin User",
    notes: "Acompte initial",
  },
];

// Mock Emails
export const MOCK_INVOICE_EMAILS: InvoiceEmail[] = [
  {
    id: "email_001",
    invoiceId: "inv_001",
    date: "2025-01-15T10:05:00Z",
    recipient: "sophie.martin@email.ch",
    subject: "Votre facture INV-2025-00001",
    type: "Initial",
    status: "Opened",
    openedAt: "2025-01-15T14:20:00Z",
  },
  {
    id: "email_002",
    invoiceId: "inv_002",
    date: "2025-01-20T10:05:00Z",
    recipient: "lucas.dubois@email.ch",
    subject: "Votre facture INV-2025-00002",
    type: "Initial",
    status: "Opened",
    openedAt: "2025-01-20T15:30:00Z",
  },
  {
    id: "email_003",
    invoiceId: "inv_002",
    date: "2025-01-31T09:00:00Z",
    recipient: "lucas.dubois@email.ch",
    subject: "Rappel: Facture INV-2025-00002 échue",
    type: "Reminder1",
    status: "Clicked",
    openedAt: "2025-01-31T10:15:00Z",
    clickedAt: "2025-01-31T10:16:00Z",
  },
];

// Mock Audit Logs
export const MOCK_INVOICE_AUDIT_LOGS: InvoiceAuditLog[] = [
  {
    id: "log_001",
    invoiceId: "inv_001",
    timestamp: "2025-01-15T10:00:00Z",
    userId: "user_001",
    userName: "System",
    action: "created",
    description: "Facture créée automatiquement",
  },
  {
    id: "log_002",
    invoiceId: "inv_001",
    timestamp: "2025-01-15T10:05:00Z",
    userId: "user_001",
    userName: "Admin User",
    action: "status_changed",
    description: "Statut changé de Draft à Sent",
    changes: [
      {
        field: "status",
        oldValue: "Draft",
        newValue: "Sent",
      },
    ],
  },
  {
    id: "log_003",
    invoiceId: "inv_001",
    timestamp: "2025-01-20T14:30:00Z",
    userId: "user_001",
    userName: "Admin User",
    action: "payment_recorded",
    description: "Paiement enregistré: 1945.80 CHF",
    changes: [
      {
        field: "paidAmount",
        oldValue: 0,
        newValue: 1945.8,
      },
      {
        field: "status",
        oldValue: "Sent",
        newValue: "Paid",
      },
    ],
  },
];

// Mock Notes
export const MOCK_INVOICE_NOTES: InvoiceNote[] = [
  {
    id: "note_001",
    invoiceId: "inv_002",
    userId: "user_001",
    userName: "Admin User",
    userAvatar: "https://github.com/yusufhilmi.png",
    timestamp: "2025-01-25T09:00:00Z",
    content:
      "Élève contacté par téléphone, paiement promis pour fin de semaine",
  },
  {
    id: "note_002",
    invoiceId: "inv_002",
    userId: "user_002",
    userName: "Finance Manager",
    userAvatar: "https://github.com/kdrnp.png",
    timestamp: "2025-02-01T10:00:00Z",
    content: "Rappel envoyé, attendre 3 jours avant relance niveau 2",
  },
];

// Helper function to get extended invoice detail
export function getInvoiceDetailExtended(
  invoice: Invoice
): InvoiceDetailExtended {
  return {
    ...invoice,
    payments: MOCK_INVOICE_PAYMENTS.filter((p) => p.invoiceId === invoice.id),
    emails: MOCK_INVOICE_EMAILS.filter((e) => e.invoiceId === invoice.id),
    auditLogs: MOCK_INVOICE_AUDIT_LOGS.filter(
      (l) => l.invoiceId === invoice.id
    ),
    notes: MOCK_INVOICE_NOTES.filter((n) => n.invoiceId === invoice.id),
    internalNotes: "Élève prioritaire, bon payeur habituel",
    qrBillEnabled: true,
    qrReference: `RF${invoice.invoiceNumber.replace(/[^0-9]/g, "")}`,
    studentPhone: "+41 79 123 45 67",
    studentAddress: {
      street: "Rue de la Gare 12",
      zip: "1003",
      city: "Lausanne",
      country: "Suisse",
    },
  };
}
