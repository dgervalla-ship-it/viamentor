/**
 * VIAMENTOR - Payments Mock Data
 * Mock data pour module Payments avec types complets
 */

// ============================================================================
// TYPES
// ============================================================================

export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "twint"
  | "postfinance"
  | "other";

export type PaymentStatus = "validated" | "pending" | "rejected";

export type MatchingStatus = "auto_matched" | "to_verify" | "unmatched";

export interface Payment {
  id: string;
  date: string;
  time: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  invoiceIds: string[];
  invoiceNumbers: string[];
  amount: number;
  method: PaymentMethod;
  reference?: string;
  receiptUrl?: string;
  notes?: string;
  recordedBy: string;
  recordedByName: string;
  status: PaymentStatus;
  accountingEntryId?: string;
  source: "manual" | "camt_import";
  camtTransactionId?: string;
}

export interface PaymentStats {
  totalCollectedMonth: number;
  paymentsCount: number;
  pendingValidation: number;
  averageAmount: number;
}

export interface OpenInvoice {
  id: string;
  number: string;
  date: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: "draft" | "sent" | "overdue" | "partial";
}

export interface CamtTransaction {
  id: string;
  date: string;
  debtorName: string;
  amount: number;
  reference: string;
  message?: string;
  qrReference?: string;
  bvrReference?: string;
  matchingStatus: MatchingStatus;
  matchedInvoiceId?: string;
  matchedInvoiceNumber?: string;
  matchedStudentId?: string;
  matchedStudentName?: string;
  confidenceScore?: number;
  type: "credit" | "debit";
}

export interface CamtFile {
  id: string;
  filename: string;
  uploadDate: string;
  bank: string;
  iban: string;
  periodStart: string;
  periodEnd: string;
  transactionsCount: number;
  creditsCount: number;
  debitsCount: number;
  totalCredits: number;
  totalDebits: number;
  processedBy: string;
  status: "processing" | "completed" | "error";
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const PAYMENT_METHODS: Array<{
  value: PaymentMethod;
  labelKey: string;
  icon: string;
}> = [
  { value: "cash", labelKey: "methods.cash", icon: "Banknote" },
  { value: "card", labelKey: "methods.card", icon: "CreditCard" },
  {
    value: "bank_transfer",
    labelKey: "methods.bank_transfer",
    icon: "Building2",
  },
  { value: "twint", labelKey: "methods.twint", icon: "Smartphone" },
  { value: "postfinance", labelKey: "methods.postfinance", icon: "Mail" },
  { value: "other", labelKey: "methods.other", icon: "MoreHorizontal" },
];

export const mockPayments: Payment[] = [
  {
    id: "pay-001",
    date: "2025-01-15",
    time: "14:30",
    studentId: "stu-001",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/yusufhilmi.png",
    invoiceIds: ["inv-001"],
    invoiceNumbers: ["INV-2025-00001"],
    amount: 450.0,
    method: "bank_transfer",
    reference: "QRR-2025-001-456789",
    notes: "Paiement complet facture janvier",
    recordedBy: "usr-admin",
    recordedByName: "Admin École",
    status: "validated",
    accountingEntryId: "acc-001",
    source: "camt_import",
    camtTransactionId: "camt-tx-001",
  },
  {
    id: "pay-002",
    date: "2025-01-14",
    time: "10:15",
    studentId: "stu-002",
    studentName: "Lucas Dubois",
    studentAvatar: "https://github.com/kdrnp.png",
    invoiceIds: ["inv-002", "inv-003"],
    invoiceNumbers: ["INV-2025-00002", "INV-2025-00003"],
    amount: 800.0,
    method: "card",
    reference: "CARD-TX-789456",
    recordedBy: "usr-admin",
    recordedByName: "Admin École",
    status: "validated",
    source: "manual",
  },
  {
    id: "pay-003",
    date: "2025-01-13",
    time: "16:45",
    studentId: "stu-003",
    studentName: "Emma Müller",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    invoiceIds: ["inv-004"],
    invoiceNumbers: ["INV-2025-00004"],
    amount: 200.0,
    method: "cash",
    notes: "Acompte - solde à régler",
    recordedBy: "usr-admin",
    recordedByName: "Admin École",
    status: "pending",
    source: "manual",
  },
];

export const mockPaymentStats: PaymentStats = {
  totalCollectedMonth: 12450.0,
  paymentsCount: 47,
  pendingValidation: 3,
  averageAmount: 264.89,
};

export const mockOpenInvoices: OpenInvoice[] = [
  {
    id: "inv-001",
    number: "INV-2025-00001",
    date: "2025-01-10",
    totalAmount: 450.0,
    paidAmount: 0,
    balance: 450.0,
    status: "sent",
  },
  {
    id: "inv-002",
    number: "INV-2025-00002",
    date: "2025-01-08",
    totalAmount: 600.0,
    paidAmount: 200.0,
    balance: 400.0,
    status: "partial",
  },
  {
    id: "inv-003",
    number: "INV-2025-00003",
    date: "2025-01-05",
    totalAmount: 350.0,
    paidAmount: 0,
    balance: 350.0,
    status: "overdue",
  },
];

export const mockCamtTransactions: CamtTransaction[] = [
  {
    id: "camt-tx-001",
    date: "2025-01-15",
    debtorName: "Martin Sophie",
    amount: 450.0,
    reference: "QRR-2025-001-456789",
    qrReference: "QRR-2025-001-456789",
    matchingStatus: "auto_matched",
    matchedInvoiceId: "inv-001",
    matchedInvoiceNumber: "INV-2025-00001",
    matchedStudentId: "stu-001",
    matchedStudentName: "Sophie Martin",
    confidenceScore: 100,
    type: "credit",
  },
  {
    id: "camt-tx-002",
    date: "2025-01-14",
    debtorName: "Dubois L.",
    amount: 405.0,
    reference: "NOTPROVIDED",
    message: "Facture auto-école",
    matchingStatus: "to_verify",
    matchedInvoiceId: "inv-002",
    matchedInvoiceNumber: "INV-2025-00002",
    matchedStudentId: "stu-002",
    matchedStudentName: "Lucas Dubois",
    confidenceScore: 75,
    type: "credit",
  },
  {
    id: "camt-tx-003",
    date: "2025-01-13",
    debtorName: "Entreprise XYZ SA",
    amount: 1200.0,
    reference: "INV-SUPPLIER-456",
    matchingStatus: "unmatched",
    type: "credit",
  },
  {
    id: "camt-tx-004",
    date: "2025-01-12",
    debtorName: "Banque Frais",
    amount: -15.5,
    reference: "FEES-2025-01",
    matchingStatus: "unmatched",
    type: "debit",
  },
];

export const mockCamtFile: CamtFile = {
  id: "camt-file-001",
  filename: "camt054_20250115_123456.xml",
  uploadDate: "2025-01-15T14:30:00Z",
  bank: "PostFinance SA",
  iban: "CH93 0076 2011 6238 5295 7",
  periodStart: "2025-01-01",
  periodEnd: "2025-01-15",
  transactionsCount: 4,
  creditsCount: 3,
  debitsCount: 1,
  totalCredits: 2055.0,
  totalDebits: 15.5,
  processedBy: "usr-admin",
  status: "completed",
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPaymentMethodIcon(method: PaymentMethod): string {
  return PAYMENT_METHODS.find((m) => m.value === method)?.icon || "HelpCircle";
}

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return (
    PAYMENT_METHODS.find((m) => m.value === method)?.labelKey || "methods.other"
  );
}

// ============================================================================
// UNRECONCILED PAYMENTS
// ============================================================================

export interface UnreconciledPayment extends Payment {
  unreconciledReason:
    | "no_invoice"
    | "amount_mismatch"
    | "student_unknown"
    | "manual_review";
  suggestedActions: Array<"associate" | "create_invoice" | "mark_verified">;
  lastReviewDate?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export const mockUnreconciledPayments: UnreconciledPayment[] = [
  {
    id: "pay-unr-001",
    date: "2025-01-13",
    time: "16:45",
    studentId: "stu-003",
    studentName: "Emma Müller",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    invoiceIds: [],
    invoiceNumbers: [],
    amount: 200.0,
    method: "cash",
    notes: "Paiement sans référence facture",
    recordedBy: "usr-admin",
    recordedByName: "Admin École",
    status: "pending",
    source: "manual",
    unreconciledReason: "no_invoice",
    suggestedActions: ["associate", "create_invoice"],
  },
  {
    id: "pay-unr-002",
    date: "2025-01-12",
    time: "09:20",
    studentId: "stu-unknown",
    studentName: "Inconnu",
    studentAvatar: "https://github.com/polymet-ai.png",
    invoiceIds: [],
    invoiceNumbers: [],
    amount: 350.0,
    method: "bank_transfer",
    reference: "VIREMENT-SANS-REF",
    recordedBy: "usr-admin",
    recordedByName: "Admin École",
    status: "pending",
    source: "camt_import",
    camtTransactionId: "camt-tx-005",
    unreconciledReason: "student_unknown",
    suggestedActions: ["associate", "mark_verified"],
  },
];

// ============================================================================
// ACCOUNTING REPORTS
// ============================================================================

export type VATRate = 0 | 2.5 | 7.7;

export interface AccountingJournalEntry {
  id: string;
  date: string;
  paymentId: string;
  studentName: string;
  invoiceNumber?: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  vatRate?: VATRate;
  vatAmount?: number;
}

export interface VATReport {
  period: { start: string; end: string };
  totalRevenue: number;
  vatBreakdown: Array<{
    rate: VATRate;
    netAmount: number;
    vatAmount: number;
    grossAmount: number;
    transactionsCount: number;
  }>;
  totalVAT: number;
  totalGross: number;
}

export const mockAccountingJournal: AccountingJournalEntry[] = [
  {
    id: "jrn-001",
    date: "2025-01-15",
    paymentId: "pay-001",
    studentName: "Sophie Martin",
    invoiceNumber: "INV-2025-00001",
    description: "Paiement facture formation catégorie B",
    debitAccount: "1020 - Banque PostFinance",
    creditAccount: "3200 - Prestations de formation",
    amount: 450.0,
    vatRate: 7.7,
    vatAmount: 32.23,
  },
  {
    id: "jrn-002",
    date: "2025-01-14",
    paymentId: "pay-002",
    studentName: "Lucas Dubois",
    invoiceNumber: "INV-2025-00002",
    description: "Paiement leçons pratiques",
    debitAccount: "1000 - Caisse",
    creditAccount: "3200 - Prestations de formation",
    amount: 800.0,
    vatRate: 7.7,
    vatAmount: 57.28,
  },
];

export const mockVATReport: VATReport = {
  period: { start: "2025-01-01", end: "2025-01-31" },
  totalRevenue: 11500.0,
  vatBreakdown: [
    {
      rate: 7.7,
      netAmount: 10500.0,
      vatAmount: 808.5,
      grossAmount: 11308.5,
      transactionsCount: 42,
    },
    {
      rate: 2.5,
      netAmount: 1000.0,
      vatAmount: 25.0,
      grossAmount: 1025.0,
      transactionsCount: 3,
    },
    {
      rate: 0,
      netAmount: 0,
      vatAmount: 0,
      grossAmount: 0,
      transactionsCount: 0,
    },
  ],

  totalVAT: 833.5,
  totalGross: 12333.5,
};

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export type NotificationType =
  | "receipt"
  | "validation_alert"
  | "unreconciled_reminder";

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  name: string;
  enabled: boolean;
  trigger: string;
  recipients: string[];
  subject: string;
  body: string;
  variables: string[];
  lastSent?: string;
  sentCount: number;
}

export interface NotificationLog {
  id: string;
  templateId: string;
  type: NotificationType;
  sentDate: string;
  recipient: string;
  subject: string;
  status: "sent" | "failed" | "pending";
  paymentId?: string;
  error?: string;
}

export const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: "tpl-001",
    type: "receipt",
    name: "Reçu de paiement automatique",
    enabled: true,
    trigger: "Après validation paiement",
    recipients: ["student"],
    subject: "Reçu de paiement - {invoice_number}",
    body: "Bonjour {student_name},\n\nNous confirmons la réception de votre paiement de {amount} CHF pour la facture {invoice_number}.\n\nCordialement,\nL'équipe {school_name}",
    variables: ["student_name", "amount", "invoice_number", "school_name"],
    lastSent: "2025-01-15T14:30:00Z",
    sentCount: 127,
  },
  {
    id: "tpl-002",
    type: "validation_alert",
    name: "Alerte paiement en attente",
    enabled: true,
    trigger: "Paiement créé avec statut 'pending'",
    recipients: ["admin", "accountant"],
    subject: "[Action requise] Paiement en attente de validation",
    body: "Un nouveau paiement nécessite votre validation :\n\nÉlève: {student_name}\nMontant: {amount} CHF\nMéthode: {method}\nDate: {date}\n\nVeuillez valider ou rejeter ce paiement.",
    variables: ["student_name", "amount", "method", "date"],
    lastSent: "2025-01-13T16:45:00Z",
    sentCount: 8,
  },
  {
    id: "tpl-003",
    type: "unreconciled_reminder",
    name: "Rappel paiements non réconciliés",
    enabled: true,
    trigger: "Chaque lundi matin si paiements non réconciliés > 0",
    recipients: ["admin", "accountant"],
    subject: "[Rappel] {count} paiement(s) non réconcilié(s)",
    body: "Vous avez {count} paiement(s) en attente de réconciliation :\n\n{payments_list}\n\nMerci de traiter ces paiements.",
    variables: ["count", "payments_list"],
    lastSent: "2025-01-13T08:00:00Z",
    sentCount: 4,
  },
];

export const mockNotificationLogs: NotificationLog[] = [
  {
    id: "log-001",
    templateId: "tpl-001",
    type: "receipt",
    sentDate: "2025-01-15T14:30:00Z",
    recipient: "sophie.martin@example.com",
    subject: "Reçu de paiement - INV-2025-00001",
    status: "sent",
    paymentId: "pay-001",
  },
  {
    id: "log-002",
    templateId: "tpl-002",
    type: "validation_alert",
    sentDate: "2025-01-13T16:45:00Z",
    recipient: "admin@ecole-conduite.ch",
    subject: "[Action requise] Paiement en attente de validation",
    status: "sent",
    paymentId: "pay-003",
  },
];

export function calculateMatchingConfidence(
  transaction: CamtTransaction,
  invoice: OpenInvoice,
  student: { name: string }
): number {
  let score = 0;

  // QR reference exact match = 100%
  if (
    transaction.qrReference &&
    invoice.number.includes(transaction.qrReference)
  ) {
    return 100;
  }

  // Amount match ±5%
  const amountDiff = Math.abs(transaction.amount - invoice.balance);
  const amountPercent = (amountDiff / invoice.balance) * 100;
  if (amountPercent <= 5) score += 40;
  else if (amountPercent <= 10) score += 20;

  // Name similarity (simple)
  const nameLower = student.name.toLowerCase();
  const debtorLower = transaction.debtorName.toLowerCase();
  const nameWords = nameLower.split(" ");
  const matchedWords = nameWords.filter((word) => debtorLower.includes(word));
  score += (matchedWords.length / nameWords.length) * 40;

  // Date proximity ±7 days
  const txDate = new Date(transaction.date);
  const invDate = new Date(invoice.date);
  const daysDiff = Math.abs(
    (txDate.getTime() - invDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff <= 7) score += 20;

  return Math.round(score);
}
