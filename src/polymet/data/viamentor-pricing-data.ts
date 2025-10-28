/**
 * VIAMENTOR - Pricing & Products Data
 * Mock data et types pour paramètres tarification
 */

// ============================================================================
// TYPES
// ============================================================================

export type LicenseCategory = "B" | "A" | "BE" | "A1" | "BPT";
export type VATRate = 0 | 2.5 | 8.1;
export type PromotionType = "percentage" | "fixed_amount";
export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "twint"
  | "postfinance";

export interface LessonPrice {
  id: string;
  category: LicenseCategory;
  price45min: number;
  price90min: number;
  autoCalculate90min: boolean;
  visibleForBooking: boolean;
  updatedAt: string;
}

export interface LessonPackage {
  id: string;
  name: string;
  category: LicenseCategory | "all";
  lessonCount: number;
  totalPrice: number;
  unitPrice: number;
  savings: number;
  savingsPercentage: number;
  validityMonths: number | null;
  isActive: boolean;
  soldCount: number;
  createdAt: string;
  // Combined package fields
  isCombined?: boolean;
  includedProducts?: string[]; // Product IDs
  combinedDescription?: string;
}

export interface PriceHistoryEntry {
  id: string;
  entityType: "lesson" | "package" | "product";
  entityId: string;
  entityName: string;
  oldPrice: number;
  newPrice: number;
  changePercentage: number;
  changedBy: string;
  changedByName: string;
  reason: string;
  timestamp: string;
}

export interface PromotionAnalytics {
  promotionId: string;
  promotionCode: string;
  totalRevenue: number;
  revenueWithoutPromo: number;
  discountGiven: number;
  usageCount: number;
  averageOrderValue: number;
  roi: number;
  topCategories: { category: string; count: number; revenue: number }[];
}

export interface PriceChangeNotification {
  id: string;
  studentId: string;
  studentName: string;
  entityType: "lesson" | "package" | "product";
  entityName: string;
  oldPrice: number;
  newPrice: number;
  changePercentage: number;
  notificationType: "price_increase" | "new_package" | "promotion";
  sentAt: string | null;
  readAt: string | null;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: LicenseCategory | "all" | "other";
  durationHours: number | null;
  isMandatory: boolean;
  vatRate: VATRate;
  isActive: boolean;
  type: "theory_course" | "exam" | "fee" | "other";
}

export interface Promotion {
  id: string;
  code: string;
  type: PromotionType;
  value: number;
  applicableTo: ("lessons" | "packages" | "courses" | "all")[];
  startDate: string;
  endDate: string;
  maxUsages: number | null;
  currentUsages: number;
  isActive: boolean;
  minPurchaseAmount?: number;
  newStudentsOnly?: boolean;
  categories?: LicenseCategory[];
}

export interface VATConfig {
  rate: VATRate;
  name: string;
  isDefault: boolean;
  productCount: number;
}

export interface PaymentConditions {
  paymentTermDays: number;
  acceptedMethods: PaymentMethod[];
  paymentInstructions: string;
  requireImmediatePayment: boolean;
  allowDeposits: boolean;
  minimumDepositPercent: number;
  minimumDepositAmount: number;
}

export interface FeesConfig {
  lateCancellationEnabled: boolean;
  cancellationGracePeriodHours: number;
  cancellationFeeAmount: number;
  cancellationFeeIsPercentage: boolean;
  latePaymentFeesEnabled: boolean;
  latePaymentInterestRate: number;
  latePaymentIsAnnualRate: boolean;
  termsAndConditions: string;
}

export interface PricingSettings {
  lessonPrices: LessonPrice[];
  packages: LessonPackage[];
  products: Product[];
  promotions: Promotion[];
  vatConfig: VATConfig[];
  schoolVATNumber: string;
  isVATRegistered: boolean;
  displayPricesWithVAT: boolean;
  paymentConditions: PaymentConditions;
  feesConfig: FeesConfig;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockLessonPrices: LessonPrice[] = [
  {
    id: "lp-1",
    category: "B",
    price45min: 90,
    price90min: 171,
    autoCalculate90min: true,
    visibleForBooking: true,
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "lp-2",
    category: "A",
    price45min: 95,
    price90min: 180.5,
    autoCalculate90min: true,
    visibleForBooking: true,
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "lp-3",
    category: "BE",
    price45min: 110,
    price90min: 209,
    autoCalculate90min: true,
    visibleForBooking: true,
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "lp-4",
    category: "A1",
    price45min: 85,
    price90min: 161.5,
    autoCalculate90min: true,
    visibleForBooking: true,
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "lp-5",
    category: "BPT",
    price45min: 100,
    price90min: 190,
    autoCalculate90min: true,
    visibleForBooking: false,
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export const mockPackages: LessonPackage[] = [
  {
    id: "pkg-1",
    name: "Forfait découverte 5 leçons",
    category: "B",
    lessonCount: 5,
    totalPrice: 425,
    unitPrice: 85,
    savings: 25,
    savingsPercentage: 5.6,
    validityMonths: 6,
    isActive: true,
    soldCount: 45,
    createdAt: "2024-01-10T00:00:00Z",
    isCombined: false,
  },
  {
    id: "pkg-combined-1",
    name: "Pack Complet Permis B",
    category: "B",
    lessonCount: 20,
    totalPrice: 2100,
    unitPrice: 105,
    savings: 300,
    savingsPercentage: 12.5,
    validityMonths: 12,
    isActive: true,
    soldCount: 78,
    createdAt: "2024-01-10T00:00:00Z",
    isCombined: true,
    includedProducts: ["prod-1", "prod-2", "prod-4"],
    combinedDescription:
      "20 leçons pratiques + Cours sensibilisation 8h + Cours premiers secours 10h + Frais dossier",
  },
  {
    id: "pkg-2",
    name: "Pack réussite 20 leçons",
    category: "B",
    lessonCount: 20,
    totalPrice: 1620,
    unitPrice: 81,
    savings: 180,
    savingsPercentage: 10,
    validityMonths: 12,
    isActive: true,
    soldCount: 128,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "pkg-3",
    name: "Forfait intensif 10 leçons",
    category: "A",
    lessonCount: 10,
    totalPrice: 855,
    unitPrice: 85.5,
    savings: 95,
    savingsPercentage: 10,
    validityMonths: 3,
    isActive: true,
    soldCount: 67,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "pkg-4",
    name: "Pack complet 30 leçons",
    category: "all",
    lessonCount: 30,
    totalPrice: 2430,
    unitPrice: 81,
    savings: 270,
    savingsPercentage: 10,
    validityMonths: 18,
    isActive: true,
    soldCount: 89,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "pkg-5",
    name: "Forfait perfectionnement 8 leçons",
    category: "BE",
    lessonCount: 8,
    totalPrice: 792,
    unitPrice: 99,
    savings: 88,
    savingsPercentage: 10,
    validityMonths: 6,
    isActive: false,
    soldCount: 12,
    createdAt: "2024-01-10T00:00:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Cours sensibilisation 8h",
    description:
      "Cours obligatoire de sensibilisation à la circulation routière (OAC Art. 10)",
    price: 250,
    category: "all",
    durationHours: 8,
    isMandatory: true,
    vatRate: 8.1,
    isActive: true,
    type: "theory_course",
  },
  {
    id: "prod-2",
    name: "Cours premiers secours 10h",
    description:
      "Formation aux premiers secours obligatoire pour permis B/A (OAC Art. 11)",
    price: 150,
    category: "all",
    durationHours: 10,
    isMandatory: true,
    vatRate: 8.1,
    isActive: true,
    type: "theory_course",
  },
  {
    id: "prod-3",
    name: "Examen simulation",
    description: "Examen blanc avec moniteur pour préparation examen pratique",
    price: 120,
    category: "all",
    durationHours: 1.5,
    isMandatory: false,
    vatRate: 8.1,
    isActive: true,
    type: "exam",
  },
  {
    id: "prod-4",
    name: "Frais dossier",
    description:
      "Frais administratifs inscription et constitution dossier élève",
    price: 50,
    category: "all",
    durationHours: null,
    isMandatory: false,
    vatRate: 8.1,
    isActive: true,
    type: "fee",
  },
  {
    id: "prod-5",
    name: "Formation complémentaire moto",
    description:
      "Cours pratique obligatoire 12h pour permis A/A1 (OAC Art. 27)",
    price: 1200,
    category: "A",
    durationHours: 12,
    isMandatory: true,
    vatRate: 8.1,
    isActive: true,
    type: "theory_course",
  },
  {
    id: "prod-6",
    name: "Cours conduite écologique",
    description:
      "Formation éco-conduite optionnelle pour réduction consommation",
    price: 180,
    category: "all",
    durationHours: 4,
    isMandatory: false,
    vatRate: 8.1,
    isActive: true,
    type: "theory_course",
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: "promo-1",
    code: "BIENVENUE2024",
    type: "percentage",
    value: 10,
    applicableTo: ["packages"],
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    maxUsages: 100,
    currentUsages: 34,
    isActive: true,
    newStudentsOnly: true,
  },
  {
    id: "promo-2",
    code: "ETE2024",
    type: "fixed_amount",
    value: 50,
    applicableTo: ["lessons", "packages"],
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    maxUsages: null,
    currentUsages: 156,
    isActive: true,
    minPurchaseAmount: 500,
  },
  {
    id: "promo-3",
    code: "PARRAINAGE",
    type: "fixed_amount",
    value: 100,
    applicableTo: ["all"],
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    maxUsages: null,
    currentUsages: 23,
    isActive: true,
  },
  {
    id: "promo-4",
    code: "NOEL2023",
    type: "percentage",
    value: 15,
    applicableTo: ["packages"],
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
    maxUsages: 50,
    currentUsages: 50,
    isActive: false,
  },
];

export const mockVATConfig: VATConfig[] = [
  {
    rate: 0,
    name: "Exonéré",
    isDefault: false,
    productCount: 0,
  },
  {
    rate: 2.5,
    name: "Réduit",
    isDefault: false,
    productCount: 0,
  },
  {
    rate: 8.1,
    name: "Standard",
    isDefault: true,
    productCount: 11,
  },
];

export const mockPaymentConditions: PaymentConditions = {
  paymentTermDays: 30,
  acceptedMethods: ["cash", "card", "bank_transfer", "twint"],
  paymentInstructions:
    "Paiement par virement bancaire:\nIBAN: CH93 0076 2011 6238 5295 7\nBIC: POFICHBEXXX\nRéférence: Numéro de facture\n\nPaiement par Twint: +41 79 123 45 67",
  requireImmediatePayment: false,
  allowDeposits: true,
  minimumDepositPercent: 30,
  minimumDepositAmount: 100,
};

export const mockFeesConfig: FeesConfig = {
  lateCancellationEnabled: true,
  cancellationGracePeriodHours: 48,
  cancellationFeeAmount: 50,
  cancellationFeeIsPercentage: false,
  latePaymentFeesEnabled: true,
  latePaymentInterestRate: 5,
  latePaymentIsAnnualRate: true,
  termsAndConditions:
    "Conditions générales de paiement:\n\n1. Les factures sont payables dans un délai de 30 jours à compter de la date d'émission.\n\n2. En cas d'annulation tardive (moins de 48h avant la leçon), des frais de CHF 50.- seront facturés.\n\n3. En cas de retard de paiement, un intérêt de 5% par an sera appliqué.\n\n4. Les forfaits de leçons sont valables pour la durée indiquée et non remboursables.\n\n5. Les cours obligatoires (sensibilisation, premiers secours) doivent être réglés avant le début de la formation pratique.",
};

export const mockPricingSettings: PricingSettings = {
  lessonPrices: mockLessonPrices,
  packages: mockPackages,
  products: mockProducts,
  promotions: mockPromotions,
  vatConfig: mockVATConfig,
  schoolVATNumber: "CHE-123.456.789",
  isVATRegistered: true,
  displayPricesWithVAT: true,
  paymentConditions: mockPaymentConditions,
  feesConfig: mockFeesConfig,
};

// ============================================================================
// HELPERS
// ============================================================================

export function calculatePackageSavings(
  lessonCount: number,
  unitPrice: number,
  normalPrice: number
): { savings: number; savingsPercentage: number } {
  const totalPrice = lessonCount * unitPrice;
  const normalTotal = lessonCount * normalPrice;
  const savings = normalTotal - totalPrice;
  const savingsPercentage = (savings / normalTotal) * 100;

  return {
    savings: Math.round(savings * 100) / 100,
    savingsPercentage: Math.round(savingsPercentage * 10) / 10,
  };
}

export function calculatePrice90min(price45min: number): number {
  return Math.round(price45min * 1.9 * 100) / 100;
}

export function calculateVAT(amount: number, rate: VATRate): number {
  return Math.round(amount * (rate / 100) * 100) / 100;
}

export function calculatePriceWithVAT(amount: number, rate: VATRate): number {
  return Math.round(amount * (1 + rate / 100) * 100) / 100;
}

export function validateSwissVATNumber(vatNumber: string): boolean {
  const regex = /^CHE-\d{3}\.\d{3}\.\d{3}$/;
  return regex.test(vatNumber);
}

export function getCategoryIcon(category: LicenseCategory | "all"): string {
  const icons: Record<string, string> = {
    B: "🚗",
    A: "🏍️",
    BE: "🚛",
    A1: "🛵",
    BPT: "🚐",
    all: "📦",
  };
  return icons[category] || "📄";
}

// ============================================================================
// MOCK DATA - PRICE HISTORY
// ============================================================================

export const mockPriceHistory: PriceHistoryEntry[] = [
  {
    id: "ph-1",
    entityType: "lesson",
    entityId: "lp-1",
    entityName: "Leçon pratique Catégorie B (45min)",
    oldPrice: 85,
    newPrice: 90,
    changePercentage: 5.9,
    changedBy: "admin-1",
    changedByName: "Marie Dubois",
    reason: "Ajustement inflation et coûts carburant",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: "ph-2",
    entityType: "package",
    entityId: "pkg-2",
    entityName: "Pack réussite 20 leçons",
    oldPrice: 1700,
    newPrice: 1620,
    changePercentage: -4.7,
    changedBy: "admin-1",
    changedByName: "Marie Dubois",
    reason: "Promotion lancement nouvelle année",
    timestamp: "2024-01-10T14:30:00Z",
  },
  {
    id: "ph-3",
    entityType: "product",
    entityId: "prod-1",
    entityName: "Cours sensibilisation 8h",
    oldPrice: 230,
    newPrice: 250,
    changePercentage: 8.7,
    changedBy: "admin-2",
    changedByName: "Jean Martin",
    reason: "Mise à jour tarifs 2024 selon directives cantonales",
    timestamp: "2024-01-05T09:00:00Z",
  },
];

// ============================================================================
// MOCK DATA - PROMOTION ANALYTICS
// ============================================================================

export const mockPromotionAnalytics: PromotionAnalytics[] = [
  {
    promotionId: "promo-1",
    promotionCode: "BIENVENUE2024",
    totalRevenue: 48960,
    revenueWithoutPromo: 54400,
    discountGiven: 5440,
    usageCount: 34,
    averageOrderValue: 1440,
    roi: 8.5,
    topCategories: [
      { category: "B", count: 28, revenue: 40320 },
      { category: "A", count: 6, revenue: 8640 },
    ],
  },
  {
    promotionId: "promo-2",
    promotionCode: "ETE2024",
    totalRevenue: 234000,
    revenueWithoutPromo: 241800,
    discountGiven: 7800,
    usageCount: 156,
    averageOrderValue: 1500,
    roi: 29.0,
    topCategories: [
      { category: "B", count: 120, revenue: 180000 },
      { category: "A", count: 36, revenue: 54000 },
    ],
  },
  {
    promotionId: "promo-3",
    promotionCode: "PARRAINAGE",
    totalRevenue: 32200,
    revenueWithoutPromo: 34500,
    discountGiven: 2300,
    usageCount: 23,
    averageOrderValue: 1400,
    roi: 13.0,
    topCategories: [
      { category: "B", count: 18, revenue: 25200 },
      { category: "A", count: 5, revenue: 7000 },
    ],
  },
];

// ============================================================================
// MOCK DATA - PRICE CHANGE NOTIFICATIONS
// ============================================================================

export const mockPriceChangeNotifications: PriceChangeNotification[] = [
  {
    id: "notif-1",
    studentId: "std-1",
    studentName: "Sophie Martin",
    entityType: "lesson",
    entityName: "Leçon pratique Catégorie B (45min)",
    oldPrice: 85,
    newPrice: 90,
    changePercentage: 5.9,
    notificationType: "price_increase",
    sentAt: "2024-01-15T10:30:00Z",
    readAt: "2024-01-15T14:20:00Z",
    message:
      "Le prix des leçons pratiques catégorie B a augmenté de 5.9%. Nouveau tarif: CHF 90.- (45min).",
  },
  {
    id: "notif-2",
    studentId: "std-2",
    studentName: "Lucas Dubois",
    entityType: "package",
    entityName: "Pack Complet Permis B",
    oldPrice: 0,
    newPrice: 2100,
    changePercentage: 0,
    notificationType: "new_package",
    sentAt: "2024-01-10T15:00:00Z",
    readAt: null,
    message:
      "Nouveau forfait disponible ! Pack Complet Permis B: 20 leçons + cours obligatoires pour CHF 2'100.- (économie de CHF 300.-).",
  },
];
