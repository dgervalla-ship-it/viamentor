/**
 * VIAMENTOR - Student Billing Data
 * Mock data et types pour facturation élève
 */

// ============================================================================
// TYPES
// ============================================================================

export type InvoiceStatus = "paid" | "unpaid" | "overdue" | "partial";
export type PaymentMethod = "card" | "bank_transfer" | "cash" | "twint";
export type PaymentStatus = "validated" | "pending" | "failed" | "refunded";
export type PackageStatus = "active" | "expired" | "used";

export interface StudentInvoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  description: string;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  vatRate: number;
  total: number;
  status: InvoiceStatus;
  paidAmount: number;
  payments: Payment[];
  pdfUrl: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vat: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference?: string;
  receiptUrl?: string;
}

export interface LessonPackage {
  id: string;
  name: string;
  lessonsIncluded: number;
  lessonsRemaining: number;
  price: number;
  pricePerLesson: number;
  validityMonths: number;
  expiryDate: string;
  purchaseDate: string;
  status: PackageStatus;
  features: string[];
  isPopular?: boolean;
}

export interface PackageCatalog {
  id: string;
  name: string;
  lessonsIncluded: number;
  price: number;
  pricePerLesson: number;
  savings: number;
  savingsPercent: number;
  validityMonths: number;
  features: string[];
  isPopular?: boolean;
  isBestSeller?: boolean;
}

export interface AccountBalance {
  availableLessons: {
    fromPackages: number;
    fromSingle: number;
    total: number;
  };
  financialCredits: number;
  deposits: number;
  unpaidInvoices: number;
  netBalance: number;
}

export interface BillingStats {
  accountBalance: number;
  unpaidInvoices: number;
  lastInvoiceDate: string;
  totalPaidLifetime: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockStudentInvoices: StudentInvoice[] = [
  {
    id: "inv-001",
    number: "INV-2024-12345",
    date: "2024-01-15",
    dueDate: "2024-02-14",
    description: "2 leçons B + Forfait",
    items: [
      {
        id: "item-1",
        description: "Leçon pratique catégorie B (50min)",
        quantity: 2,
        unitPrice: 90,
        vat: 14.58,
        total: 194.58,
      },
      {
        id: "item-2",
        description: "Pack 10 leçons catégorie B",
        quantity: 1,
        unitPrice: 850,
        vat: 68.85,
        total: 918.85,
      },
    ],

    subtotal: 1030,
    vat: 83.43,
    vatRate: 8.1,
    total: 1113.43,
    status: "paid",
    paidAmount: 1113.43,
    payments: [
      {
        id: "pay-001",
        invoiceId: "inv-001",
        date: "2024-01-16",
        amount: 1113.43,
        method: "card",
        status: "validated",
        reference: "ch_3OP4KJ2eZvKYlo2C0123456",
        receiptUrl: "/receipts/receipt-001.pdf",
      },
    ],

    pdfUrl: "/invoices/inv-001.pdf",
  },
  {
    id: "inv-002",
    number: "INV-2024-12346",
    date: "2024-02-01",
    dueDate: "2024-03-02",
    description: "3 leçons B",
    items: [
      {
        id: "item-3",
        description: "Leçon pratique catégorie B (50min)",
        quantity: 3,
        unitPrice: 90,
        vat: 21.87,
        total: 291.87,
      },
    ],

    subtotal: 270,
    vat: 21.87,
    vatRate: 8.1,
    total: 291.87,
    status: "unpaid",
    paidAmount: 0,
    payments: [],
    pdfUrl: "/invoices/inv-002.pdf",
  },
  {
    id: "inv-003",
    number: "INV-2024-12347",
    date: "2024-01-05",
    dueDate: "2024-01-20",
    description: "Cours sensibilisation",
    items: [
      {
        id: "item-4",
        description: "Cours sensibilisation circulation routière",
        quantity: 1,
        unitPrice: 280,
        vat: 22.68,
        total: 302.68,
      },
    ],

    subtotal: 280,
    vat: 22.68,
    vatRate: 8.1,
    total: 302.68,
    status: "overdue",
    paidAmount: 0,
    payments: [],
    pdfUrl: "/invoices/inv-003.pdf",
  },
  {
    id: "inv-004",
    number: "INV-2024-12348",
    date: "2024-02-10",
    dueDate: "2024-03-12",
    description: "Pack 5 leçons B",
    items: [
      {
        id: "item-5",
        description: "Pack 5 leçons catégorie B",
        quantity: 1,
        unitPrice: 440,
        vat: 35.64,
        total: 475.64,
      },
    ],

    subtotal: 440,
    vat: 35.64,
    vatRate: 8.1,
    total: 475.64,
    status: "partial",
    paidAmount: 200,
    payments: [
      {
        id: "pay-002",
        invoiceId: "inv-004",
        date: "2024-02-11",
        amount: 200,
        method: "bank_transfer",
        status: "validated",
        reference: "VIREMENT-20240211-001",
      },
    ],

    pdfUrl: "/invoices/inv-004.pdf",
  },
];

export const mockPaymentHistory: Payment[] = [
  {
    id: "pay-001",
    invoiceId: "inv-001",
    date: "2024-01-16",
    amount: 1113.43,
    method: "card",
    status: "validated",
    reference: "ch_3OP4KJ2eZvKYlo2C0123456",
    receiptUrl: "/receipts/receipt-001.pdf",
  },
  {
    id: "pay-002",
    invoiceId: "inv-004",
    date: "2024-02-11",
    amount: 200,
    method: "bank_transfer",
    status: "validated",
    reference: "VIREMENT-20240211-001",
  },
  {
    id: "pay-003",
    invoiceId: "inv-002",
    date: "2024-01-10",
    amount: 500,
    method: "twint",
    status: "failed",
    reference: "TWINT-20240110-001",
  },
];

export const mockLessonPackages: LessonPackage[] = [
  {
    id: "pkg-001",
    name: "Pack 10 leçons",
    lessonsIncluded: 10,
    lessonsRemaining: 7,
    price: 850,
    pricePerLesson: 85,
    validityMonths: 6,
    expiryDate: "2024-07-15",
    purchaseDate: "2024-01-15",
    status: "active",
    features: [
      "Choix du moniteur",
      "Annulation gratuite 24h avant",
      "Report illimité",
      "Validité 6 mois",
    ],

    isPopular: true,
  },
  {
    id: "pkg-002",
    name: "Pack 5 leçons",
    lessonsIncluded: 5,
    lessonsRemaining: 0,
    price: 440,
    pricePerLesson: 88,
    validityMonths: 3,
    expiryDate: "2023-12-20",
    purchaseDate: "2023-09-20",
    status: "used",
    features: [
      "Choix du moniteur",
      "Annulation gratuite 24h avant",
      "Validité 3 mois",
    ],
  },
];

export const mockPackageCatalog: PackageCatalog[] = [
  {
    id: "cat-001",
    name: "Pack 5 leçons",
    lessonsIncluded: 5,
    price: 440,
    pricePerLesson: 88,
    savings: 10,
    savingsPercent: 2.2,
    validityMonths: 3,
    features: [
      "Choix du moniteur",
      "Annulation gratuite 24h avant",
      "Validité 3 mois",
    ],
  },
  {
    id: "cat-002",
    name: "Pack 10 leçons",
    lessonsIncluded: 10,
    price: 850,
    pricePerLesson: 85,
    savings: 50,
    savingsPercent: 5.6,
    validityMonths: 6,
    features: [
      "Choix du moniteur",
      "Annulation gratuite 24h avant",
      "Report illimité",
      "Validité 6 mois",
    ],

    isPopular: true,
    isBestSeller: true,
  },
  {
    id: "cat-003",
    name: "Pack 20 leçons",
    lessonsIncluded: 20,
    price: 1600,
    pricePerLesson: 80,
    savings: 200,
    savingsPercent: 11.1,
    validityMonths: 12,
    features: [
      "Choix du moniteur",
      "Annulation gratuite 24h avant",
      "Report illimité",
      "Validité 12 mois",
      "Priorité réservation",
    ],

    isBestSeller: true,
  },
  {
    id: "cat-004",
    name: "Pack 30 leçons",
    lessonsIncluded: 30,
    price: 2250,
    pricePerLesson: 75,
    savings: 450,
    savingsPercent: 16.7,
    validityMonths: 12,
    features: [
      "Choix du moniteur",
      "Annulation gratuite 24h avant",
      "Report illimité",
      "Validité 12 mois",
      "Priorité réservation",
      "1 leçon autoroute offerte",
    ],
  },
];

export const mockAccountBalance: AccountBalance = {
  availableLessons: {
    fromPackages: 7,
    fromSingle: 2,
    total: 9,
  },
  financialCredits: 150,
  deposits: 0,
  unpaidInvoices: 578.55,
  netBalance: -428.55,
};

export const mockBillingStats: BillingStats = {
  accountBalance: -428.55,
  unpaidInvoices: 2,
  lastInvoiceDate: "2024-02-10",
  totalPaidLifetime: 1313.43,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getInvoiceStatusColor(status: InvoiceStatus): string {
  const colors: Record<InvoiceStatus, string> = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    unpaid: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    partial:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };
  return colors[status];
}

export function getPaymentMethodIcon(method: PaymentMethod): string {
  const icons: Record<PaymentMethod, string> = {
    card: "CreditCard",
    bank_transfer: "Building2",
    cash: "Banknote",
    twint: "Smartphone",
  };
  return icons[method];
}

export function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isInvoiceOverdue(dueDate: string): boolean {
  return getDaysUntilDue(dueDate) < 0;
}

export function getOverdueDays(dueDate: string): number {
  return Math.abs(getDaysUntilDue(dueDate));
}
