/**
 * VIAMENTOR - Pricing i18n
 * Traductions pour paramètres tarification
 */

import type {
  LicenseCategory,
  VATRate,
  PromotionType,
  PaymentMethod,
} from "@/polymet/data/viamentor-pricing-data";

export type PricingLocale = "fr" | "de" | "it" | "en";

export interface PricingTranslations {
  // Page
  pageTitle: string;
  pageDescription: string;

  // Tabs
  tabLessons: string;
  tabPackages: string;
  tabServices: string;
  tabPromotions: string;
  tabVAT: string;
  tabConditions: string;

  // Lessons Pricing
  lessonsPricingTitle: string;
  lessonsPricingDescription: string;
  lessonDurationsTitle: string;
  lessonDurationsDescription: string;
  category: string;
  price45min: string;
  price90min: string;
  autoCalculate: string;
  visibleForBooking: string;
  lessonsPricingInfo: string;

  // Packages
  packagesTitle: string;
  packagesDescription: string;
  packageName: string;
  lessonCount: string;
  totalPrice: string;
  unitPrice: string;
  savings: string;
  validityMonths: string;
  unlimited: string;
  active: string;
  soldCount: string;
  createPackage: string;
  editPackage: string;
  duplicatePackage: string;
  deletePackage: string;
  popularPackages: string;

  // Products
  productsTitle: string;
  productsDescription: string;
  productName: string;
  description: string;
  price: string;
  categoryApplicable: string;
  durationHours: string;
  mandatory: string;
  vatRate: string;
  addService: string;

  // Promotions
  promotionsTitle: string;
  promotionsDescription: string;
  promoCode: string;
  promoType: string;
  promoValue: string;
  applicableTo: string;
  startDate: string;
  endDate: string;
  maxUsages: string;
  currentUsages: string;
  createPromotion: string;
  activePromotions: string;
  redemptions: string;
  revenueImpact: string;

  // VAT
  vatConfigTitle: string;
  vatConfigDescription: string;
  vatNumber: string;
  vatRegistered: string;
  displayPricesWithVAT: string;
  vatExempt: string;
  vatReduced: string;
  vatStandard: string;
  defaultRate: string;
  productsCount: string;
  vatCalculator: string;
  amountExclVAT: string;
  vatAmount: string;
  amountInclVAT: string;

  // Payment Conditions
  paymentConditionsTitle: string;
  paymentConditionsDescription: string;
  paymentTermDays: string;
  acceptedMethods: string;
  paymentInstructions: string;
  requireImmediatePayment: string;
  allowDeposits: string;
  minimumDeposit: string;

  // Fees
  feesTitle: string;
  feesDescription: string;
  lateCancellationFee: string;
  cancellationGracePeriod: string;
  cancellationFeeAmount: string;
  latePaymentFees: string;
  interestRate: string;
  termsAndConditions: string;

  // Actions
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  preview: string;
  previewInvoice: string;
  saveSettings: string;

  // Messages
  saveSuccess: string;
  saveError: string;
  deleteConfirm: string;
  priceChangeNotification: string;

  // Categories
  categories: Record<LicenseCategory | "all" | "other", string>;

  // Payment Methods
  paymentMethods: Record<PaymentMethod, string>;

  // Promotion Types
  promotionTypes: Record<PromotionType, string>;

  // Applicable To
  applicableToOptions: Record<string, string>;
}

export const pricingTranslations: Record<PricingLocale, PricingTranslations> = {
  fr: {
    pageTitle: "Tarification & Catalogue",
    pageDescription:
      "Gestion des prix, forfaits, produits et conditions de paiement",

    tabLessons: "Prix Leçons",
    tabPackages: "Forfaits",
    tabServices: "Services",
    tabPromotions: "Promotions",
    tabVAT: "TVA",
    tabConditions: "Conditions",

    lessonsPricingTitle: "Prix leçons pratiques",
    lessonsPricingDescription: "Tarifs leçons individuelles par catégorie",
    lessonDurationsTitle: "Durées de leçons",
    lessonDurationsDescription:
      "Configurez les durées de leçons disponibles pour votre auto-école",
    category: "Catégorie",
    price45min: "Prix 45min",
    price90min: "Prix 90min",
    autoCalculate: "Calculer automatiquement",
    visibleForBooking: "Visible pour réservations",
    lessonsPricingInfo:
      "Prix appliqués aux nouvelles leçons, les leçons existantes conservent leur prix de création",

    packagesTitle: "Forfaits leçons",
    packagesDescription: "Packages leçons avec remises incitatives",
    packageName: "Nom du forfait",
    lessonCount: "Nombre de leçons",
    totalPrice: "Prix total",
    unitPrice: "Prix unitaire",
    savings: "Économie",
    validityMonths: "Validité (mois)",
    unlimited: "Illimité",
    active: "Actif",
    soldCount: "Vendus",
    createPackage: "Créer un forfait",
    editPackage: "Modifier",
    duplicatePackage: "Dupliquer",
    deletePackage: "Supprimer",
    popularPackages: "Forfaits populaires",

    productsTitle: "Cours théoriques & Autres services",
    productsDescription: "Catalogue services complémentaires",
    productName: "Nom du service",
    description: "Description",
    price: "Prix",
    categoryApplicable: "Catégorie applicable",
    durationHours: "Durée (heures)",
    mandatory: "Obligatoire",
    vatRate: "Taux TVA",
    addService: "Ajouter un service",

    promotionsTitle: "Remises & Promotions",
    promotionsDescription: "Codes promo et offres spéciales",
    promoCode: "Code promo",
    promoType: "Type",
    promoValue: "Valeur",
    applicableTo: "Applicable à",
    startDate: "Date début",
    endDate: "Date fin",
    maxUsages: "Utilisations max",
    currentUsages: "Utilisations",
    createPromotion: "Créer une promotion",
    activePromotions: "Promotions actives",
    redemptions: "Utilisations",
    revenueImpact: "Impact revenus",

    vatConfigTitle: "Configuration TVA",
    vatConfigDescription: "Taxes applicables Suisse",
    vatNumber: "Numéro TVA",
    vatRegistered: "Assujetti TVA",
    displayPricesWithVAT: "Afficher prix TTC",
    vatExempt: "Exonéré",
    vatReduced: "Réduit",
    vatStandard: "Standard",
    defaultRate: "Taux par défaut",
    productsCount: "Produits",
    vatCalculator: "Calculateur TVA",
    amountExclVAT: "Montant HT",
    vatAmount: "Montant TVA",
    amountInclVAT: "Montant TTC",

    paymentConditionsTitle: "Conditions de paiement",
    paymentConditionsDescription: "Modalités générales facturation",
    paymentTermDays: "Délai de paiement (jours)",
    acceptedMethods: "Méthodes acceptées",
    paymentInstructions: "Instructions de paiement",
    requireImmediatePayment: "Paiement immédiat à la réservation",
    allowDeposits: "Autoriser les acomptes",
    minimumDeposit: "Acompte minimum",

    feesTitle: "Frais & Pénalités",
    feesDescription: "Frais additionnels automatiques",
    lateCancellationFee: "Frais annulation tardive",
    cancellationGracePeriod: "Délai annulation gratuite (heures)",
    cancellationFeeAmount: "Montant frais annulation",
    latePaymentFees: "Frais retard paiement",
    interestRate: "Taux d'intérêt",
    termsAndConditions: "Conditions générales",

    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    preview: "Prévisualiser",
    previewInvoice: "Prévisualiser facture",
    saveSettings: "Enregistrer les tarifs",

    saveSuccess: "Tarifs enregistrés avec succès",
    saveError: "Erreur lors de l'enregistrement",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet élément ?",
    priceChangeNotification: "Informer les élèves des changements de prix ?",

    categories: {
      B: "Voiture (B)",
      A: "Moto (A)",
      BE: "Remorque (BE)",
      A1: "Moto légère (A1)",
      BPT: "Transport (BPT)",
      all: "Toutes catégories",
      other: "Autre",
    },

    paymentMethods: {
      cash: "Espèces",
      card: "Carte bancaire",
      bank_transfer: "Virement bancaire",
      twint: "Twint",
      postfinance: "PostFinance",
    },

    promotionTypes: {
      percentage: "Pourcentage",
      fixed_amount: "Montant fixe",
    },

    applicableToOptions: {
      lessons: "Leçons",
      packages: "Forfaits",
      courses: "Cours",
      all: "Tous",
    },
  },

  de: {
    pageTitle: "Preisgestaltung & Katalog",
    pageDescription:
      "Verwaltung von Preisen, Paketen, Produkten und Zahlungsbedingungen",

    tabLessons: "Lektionspreise",
    tabPackages: "Pakete",
    tabServices: "Dienstleistungen",
    tabPromotions: "Aktionen",
    tabVAT: "MwSt",
    tabConditions: "Bedingungen",

    lessonsPricingTitle: "Preise Fahrstunden",
    lessonsPricingDescription: "Tarife Einzelstunden nach Kategorie",
    lessonDurationsTitle: "Lektionsdauer",
    lessonDurationsDescription:
      "Konfigurieren Sie die verfügbaren Lektionsdauern für Ihre Fahrschule",
    category: "Kategorie",
    price45min: "Preis 45min",
    price90min: "Preis 90min",
    autoCalculate: "Automatisch berechnen",
    visibleForBooking: "Sichtbar für Buchungen",
    lessonsPricingInfo:
      "Preise gelten für neue Lektionen, bestehende Lektionen behalten ihren Erstellungspreis",

    packagesTitle: "Lektionspakete",
    packagesDescription: "Lektionspakete mit Anreizrabatten",
    packageName: "Paketname",
    lessonCount: "Anzahl Lektionen",
    totalPrice: "Gesamtpreis",
    unitPrice: "Stückpreis",
    savings: "Ersparnis",
    validityMonths: "Gültigkeit (Monate)",
    unlimited: "Unbegrenzt",
    active: "Aktiv",
    soldCount: "Verkauft",
    createPackage: "Paket erstellen",
    editPackage: "Bearbeiten",
    duplicatePackage: "Duplizieren",
    deletePackage: "Löschen",
    popularPackages: "Beliebte Pakete",

    productsTitle: "Theoriekurse & Weitere Dienstleistungen",
    productsDescription: "Katalog ergänzender Dienstleistungen",
    productName: "Dienstleistungsname",
    description: "Beschreibung",
    price: "Preis",
    categoryApplicable: "Anwendbare Kategorie",
    durationHours: "Dauer (Stunden)",
    mandatory: "Obligatorisch",
    vatRate: "MwSt-Satz",
    addService: "Dienstleistung hinzufügen",

    promotionsTitle: "Rabatte & Aktionen",
    promotionsDescription: "Promo-Codes und Sonderangebote",
    promoCode: "Promo-Code",
    promoType: "Typ",
    promoValue: "Wert",
    applicableTo: "Anwendbar auf",
    startDate: "Startdatum",
    endDate: "Enddatum",
    maxUsages: "Max. Verwendungen",
    currentUsages: "Verwendungen",
    createPromotion: "Aktion erstellen",
    activePromotions: "Aktive Aktionen",
    redemptions: "Einlösungen",
    revenueImpact: "Umsatzauswirkung",

    vatConfigTitle: "MwSt-Konfiguration",
    vatConfigDescription: "Anwendbare Steuern Schweiz",
    vatNumber: "MwSt-Nummer",
    vatRegistered: "MwSt-pflichtig",
    displayPricesWithVAT: "Preise inkl. MwSt anzeigen",
    vatExempt: "Befreit",
    vatReduced: "Reduziert",
    vatStandard: "Standard",
    defaultRate: "Standardsatz",
    productsCount: "Produkte",
    vatCalculator: "MwSt-Rechner",
    amountExclVAT: "Betrag Netto",
    vatAmount: "MwSt-Betrag",
    amountInclVAT: "Betrag Brutto",

    paymentConditionsTitle: "Zahlungsbedingungen",
    paymentConditionsDescription: "Allgemeine Rechnungsmodalitäten",
    paymentTermDays: "Zahlungsfrist (Tage)",
    acceptedMethods: "Akzeptierte Methoden",
    paymentInstructions: "Zahlungsanweisungen",
    requireImmediatePayment: "Sofortige Zahlung bei Buchung",
    allowDeposits: "Anzahlungen zulassen",
    minimumDeposit: "Mindestanzahlung",

    feesTitle: "Gebühren & Strafen",
    feesDescription: "Automatische Zusatzgebühren",
    lateCancellationFee: "Gebühr verspätete Stornierung",
    cancellationGracePeriod: "Kostenlose Stornierungsfrist (Stunden)",
    cancellationFeeAmount: "Stornierungsgebühr",
    latePaymentFees: "Verzugszinsen",
    interestRate: "Zinssatz",
    termsAndConditions: "Allgemeine Geschäftsbedingungen",

    save: "Speichern",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    delete: "Löschen",
    preview: "Vorschau",
    previewInvoice: "Rechnung Vorschau",
    saveSettings: "Tarife speichern",

    saveSuccess: "Tarife erfolgreich gespeichert",
    saveError: "Fehler beim Speichern",
    deleteConfirm: "Möchten Sie dieses Element wirklich löschen?",
    priceChangeNotification: "Schüler über Preisänderungen informieren?",

    categories: {
      B: "Auto (B)",
      A: "Motorrad (A)",
      BE: "Anhänger (BE)",
      A1: "Leichtmotorrad (A1)",
      BPT: "Transport (BPT)",
      all: "Alle Kategorien",
      other: "Andere",
    },

    paymentMethods: {
      cash: "Bargeld",
      card: "Kreditkarte",
      bank_transfer: "Banküberweisung",
      twint: "Twint",
      postfinance: "PostFinance",
    },

    promotionTypes: {
      percentage: "Prozentsatz",
      fixed_amount: "Fester Betrag",
    },

    applicableToOptions: {
      lessons: "Lektionen",
      packages: "Pakete",
      courses: "Kurse",
      all: "Alle",
    },
  },

  it: {
    pageTitle: "Prezzi & Catalogo",
    pageDescription:
      "Gestione prezzi, pacchetti, prodotti e condizioni di pagamento",

    tabLessons: "Prezzi Lezioni",
    tabPackages: "Pacchetti",
    tabServices: "Servizi",
    tabPromotions: "Promozioni",
    tabVAT: "IVA",
    tabConditions: "Condizioni",

    lessonsPricingTitle: "Prezzi lezioni pratiche",
    lessonsPricingDescription: "Tariffe lezioni individuali per categoria",
    lessonDurationsTitle: "Durata lezioni",
    lessonDurationsDescription:
      "Configura le durate delle lezioni disponibili per la tua scuola guida",
    category: "Categoria",
    price45min: "Prezzo 45min",
    price90min: "Prezzo 90min",
    autoCalculate: "Calcola automaticamente",
    visibleForBooking: "Visibile per prenotazioni",
    lessonsPricingInfo:
      "Prezzi applicati alle nuove lezioni, le lezioni esistenti mantengono il prezzo di creazione",

    packagesTitle: "Pacchetti lezioni",
    packagesDescription: "Pacchetti lezioni con sconti incentivanti",
    packageName: "Nome pacchetto",
    lessonCount: "Numero lezioni",
    totalPrice: "Prezzo totale",
    unitPrice: "Prezzo unitario",
    savings: "Risparmio",
    validityMonths: "Validità (mesi)",
    unlimited: "Illimitato",
    active: "Attivo",
    soldCount: "Venduti",
    createPackage: "Crea pacchetto",
    editPackage: "Modifica",
    duplicatePackage: "Duplica",
    deletePackage: "Elimina",
    popularPackages: "Pacchetti popolari",

    productsTitle: "Corsi teorici & Altri servizi",
    productsDescription: "Catalogo servizi complementari",
    productName: "Nome servizio",
    description: "Descrizione",
    price: "Prezzo",
    categoryApplicable: "Categoria applicabile",
    durationHours: "Durata (ore)",
    mandatory: "Obbligatorio",
    vatRate: "Aliquota IVA",
    addService: "Aggiungi servizio",

    promotionsTitle: "Sconti & Promozioni",
    promotionsDescription: "Codici promo e offerte speciali",
    promoCode: "Codice promo",
    promoType: "Tipo",
    promoValue: "Valore",
    applicableTo: "Applicabile a",
    startDate: "Data inizio",
    endDate: "Data fine",
    maxUsages: "Utilizzi max",
    currentUsages: "Utilizzi",
    createPromotion: "Crea promozione",
    activePromotions: "Promozioni attive",
    redemptions: "Riscatti",
    revenueImpact: "Impatto ricavi",

    vatConfigTitle: "Configurazione IVA",
    vatConfigDescription: "Tasse applicabili Svizzera",
    vatNumber: "Numero IVA",
    vatRegistered: "Soggetto IVA",
    displayPricesWithVAT: "Mostra prezzi IVA inclusa",
    vatExempt: "Esente",
    vatReduced: "Ridotta",
    vatStandard: "Standard",
    defaultRate: "Aliquota predefinita",
    productsCount: "Prodotti",
    vatCalculator: "Calcolatore IVA",
    amountExclVAT: "Importo Netto",
    vatAmount: "Importo IVA",
    amountInclVAT: "Importo Lordo",

    paymentConditionsTitle: "Condizioni di pagamento",
    paymentConditionsDescription: "Modalità generali fatturazione",
    paymentTermDays: "Termine pagamento (giorni)",
    acceptedMethods: "Metodi accettati",
    paymentInstructions: "Istruzioni pagamento",
    requireImmediatePayment: "Pagamento immediato alla prenotazione",
    allowDeposits: "Consenti acconti",
    minimumDeposit: "Acconto minimo",

    feesTitle: "Spese & Penali",
    feesDescription: "Spese aggiuntive automatiche",
    lateCancellationFee: "Spese cancellazione tardiva",
    cancellationGracePeriod: "Periodo cancellazione gratuita (ore)",
    cancellationFeeAmount: "Importo spese cancellazione",
    latePaymentFees: "Interessi mora",
    interestRate: "Tasso interesse",
    termsAndConditions: "Condizioni generali",

    save: "Salva",
    cancel: "Annulla",
    edit: "Modifica",
    delete: "Elimina",
    preview: "Anteprima",
    previewInvoice: "Anteprima fattura",
    saveSettings: "Salva tariffe",

    saveSuccess: "Tariffe salvate con successo",
    saveError: "Errore durante il salvataggio",
    deleteConfirm: "Sei sicuro di voler eliminare questo elemento?",
    priceChangeNotification:
      "Informare gli studenti delle modifiche ai prezzi?",

    categories: {
      B: "Auto (B)",
      A: "Moto (A)",
      BE: "Rimorchio (BE)",
      A1: "Moto leggera (A1)",
      BPT: "Trasporto (BPT)",
      all: "Tutte le categorie",
      other: "Altro",
    },

    paymentMethods: {
      cash: "Contanti",
      card: "Carta di credito",
      bank_transfer: "Bonifico bancario",
      twint: "Twint",
      postfinance: "PostFinance",
    },

    promotionTypes: {
      percentage: "Percentuale",
      fixed_amount: "Importo fisso",
    },

    applicableToOptions: {
      lessons: "Lezioni",
      packages: "Pacchetti",
      courses: "Corsi",
      all: "Tutti",
    },
  },

  en: {
    pageTitle: "Pricing & Catalog",
    pageDescription: "Manage prices, packages, products and payment conditions",

    tabLessons: "Lesson Prices",
    tabPackages: "Packages",
    tabServices: "Services",
    tabPromotions: "Promotions",
    tabVAT: "VAT",
    tabConditions: "Conditions",

    lessonsPricingTitle: "Practical lesson prices",
    lessonsPricingDescription: "Individual lesson rates by category",
    lessonDurationsTitle: "Lesson durations",
    lessonDurationsDescription:
      "Configure available lesson durations for your driving school",
    category: "Category",
    price45min: "Price 45min",
    price90min: "Price 90min",
    autoCalculate: "Calculate automatically",
    visibleForBooking: "Visible for bookings",
    lessonsPricingInfo:
      "Prices applied to new lessons, existing lessons keep their creation price",

    packagesTitle: "Lesson packages",
    packagesDescription: "Lesson packages with incentive discounts",
    packageName: "Package name",
    lessonCount: "Number of lessons",
    totalPrice: "Total price",
    unitPrice: "Unit price",
    savings: "Savings",
    validityMonths: "Validity (months)",
    unlimited: "Unlimited",
    active: "Active",
    soldCount: "Sold",
    createPackage: "Create package",
    editPackage: "Edit",
    duplicatePackage: "Duplicate",
    deletePackage: "Delete",
    popularPackages: "Popular packages",

    productsTitle: "Theory courses & Other services",
    productsDescription: "Complementary services catalog",
    productName: "Service name",
    description: "Description",
    price: "Price",
    categoryApplicable: "Applicable category",
    durationHours: "Duration (hours)",
    mandatory: "Mandatory",
    vatRate: "VAT rate",
    addService: "Add service",

    promotionsTitle: "Discounts & Promotions",
    promotionsDescription: "Promo codes and special offers",
    promoCode: "Promo code",
    promoType: "Type",
    promoValue: "Value",
    applicableTo: "Applicable to",
    startDate: "Start date",
    endDate: "End date",
    maxUsages: "Max usages",
    currentUsages: "Usages",
    createPromotion: "Create promotion",
    activePromotions: "Active promotions",
    redemptions: "Redemptions",
    revenueImpact: "Revenue impact",

    vatConfigTitle: "VAT Configuration",
    vatConfigDescription: "Applicable taxes Switzerland",
    vatNumber: "VAT number",
    vatRegistered: "VAT registered",
    displayPricesWithVAT: "Display prices incl. VAT",
    vatExempt: "Exempt",
    vatReduced: "Reduced",
    vatStandard: "Standard",
    defaultRate: "Default rate",
    productsCount: "Products",
    vatCalculator: "VAT Calculator",
    amountExclVAT: "Amount Net",
    vatAmount: "VAT Amount",
    amountInclVAT: "Amount Gross",

    paymentConditionsTitle: "Payment conditions",
    paymentConditionsDescription: "General invoicing terms",
    paymentTermDays: "Payment term (days)",
    acceptedMethods: "Accepted methods",
    paymentInstructions: "Payment instructions",
    requireImmediatePayment: "Immediate payment on booking",
    allowDeposits: "Allow deposits",
    minimumDeposit: "Minimum deposit",

    feesTitle: "Fees & Penalties",
    feesDescription: "Automatic additional fees",
    lateCancellationFee: "Late cancellation fee",
    cancellationGracePeriod: "Free cancellation period (hours)",
    cancellationFeeAmount: "Cancellation fee amount",
    latePaymentFees: "Late payment fees",
    interestRate: "Interest rate",
    termsAndConditions: "Terms and conditions",

    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    preview: "Preview",
    previewInvoice: "Preview invoice",
    saveSettings: "Save rates",

    saveSuccess: "Rates saved successfully",
    saveError: "Error saving",
    deleteConfirm: "Are you sure you want to delete this item?",
    priceChangeNotification: "Notify students of price changes?",

    categories: {
      B: "Car (B)",
      A: "Motorcycle (A)",
      BE: "Trailer (BE)",
      A1: "Light motorcycle (A1)",
      BPT: "Transport (BPT)",
      all: "All categories",
      other: "Other",
    },

    paymentMethods: {
      cash: "Cash",
      card: "Credit card",
      bank_transfer: "Bank transfer",
      twint: "Twint",
      postfinance: "PostFinance",
    },

    promotionTypes: {
      percentage: "Percentage",
      fixed_amount: "Fixed amount",
    },

    applicableToOptions: {
      lessons: "Lessons",
      packages: "Packages",
      courses: "Courses",
      all: "All",
    },
  },
};

// ============================================================================
// HELPERS
// ============================================================================

export function getPricingTranslation(
  locale: PricingLocale = "fr"
): PricingTranslations {
  return pricingTranslations[locale] || pricingTranslations.fr;
}

export function formatCurrency(
  amount: number,
  locale: PricingLocale = "fr"
): string {
  const localeMap: Record<PricingLocale, string> = {
    fr: "fr-CH",
    de: "de-CH",
    it: "it-CH",
    en: "en-CH",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(
  value: number,
  locale: PricingLocale = "fr"
): string {
  const localeMap: Record<PricingLocale, string> = {
    fr: "fr-CH",
    de: "de-CH",
    it: "it-CH",
    en: "en-CH",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function getVATLabel(
  rate: VATRate,
  type: "short" | "long",
  locale: PricingLocale = "fr"
): string {
  const labels: Record<
    PricingLocale,
    Record<VATRate, { short: string; long: string }>
  > = {
    fr: {
      0: { short: "0%", long: "Exonéré (0%)" },
      2.5: { short: "2.5%", long: "Réduit (2.5%)" },
      8.1: { short: "8.1%", long: "Standard (8.1%)" },
    },
    de: {
      0: { short: "0%", long: "Befreit (0%)" },
      2.5: { short: "2.5%", long: "Reduziert (2.5%)" },
      8.1: { short: "8.1%", long: "Standard (8.1%)" },
    },
    it: {
      0: { short: "0%", long: "Esente (0%)" },
      2.5: { short: "2.5%", long: "Ridotta (2.5%)" },
      8.1: { short: "8.1%", long: "Standard (8.1%)" },
    },
    en: {
      0: { short: "0%", long: "Exempt (0%)" },
      2.5: { short: "2.5%", long: "Reduced (2.5%)" },
      8.1: { short: "8.1%", long: "Standard (8.1%)" },
    },
  };

  return labels[locale][rate][type];
}
