/**
 * ============================================================================
 * VIAMENTOR - BILLING BUSINESS RULES
 * ============================================================================
 *
 * Règles métier complètes pour facturation automatique:
 * - Génération automatique factures mensuelles
 * - Relances automatiques impayés
 * - Gestion crédits de rattrapage
 * - Calculs TVA et réductions
 * - Workflow complet facturation
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Lesson {
  id: string;
  studentId: string;
  instructorId: string;
  category: string;
  date: Date;
  duration: number; // En minutes
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  price?: number;
  isPaid: boolean;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  vatRate: number;
  lessonsIncluded: number;
  validityMonths: number;
}

export interface Discount {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minAmount?: number;
  validUntil?: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  vat: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  items: InvoiceItem[];
  discounts: number;
  subtotal: number;
  vat: number;
  total: number;
  dueDate: Date;
  status: "draft" | "pending" | "paid" | "overdue" | "cancelled";
  createdAt: Date;
  paidAt?: Date;
}

export interface MakeupCredit {
  id: string;
  studentId: string;
  amount: number; // En minutes
  expiryDate: Date;
  reason: string;
  used: boolean;
  createdAt: Date;
}

export type CancellationReason =
  | "student_illness"
  | "instructor_unavailable"
  | "weather"
  | "vehicle_issue"
  | "student_request"
  | "other";

export interface MakeupPolicy {
  studentId: string;
  allowMakeups: boolean;
  maxCreditsPerMonth: number;
  creditValidityMonths: number;
  requireMedicalCertificate: boolean;
}

export interface PricingRule {
  category: string;
  pricePerHour: number;
  vatRate: number;
  discountEligible: boolean;
}

export interface ReminderConfig {
  firstReminderDays: number; // 7 jours
  secondReminderDays: number; // 14 jours
  formalNoticeDays: number; // 30 jours
  collectionDays: number; // 60 jours
  lateFee: number; // 5 CHF
}

// ============================================================================
// BILLING BUSINESS LOGIC CLASS
// ============================================================================

export class BillingBusinessLogic {
  private reminderConfig: ReminderConfig = {
    firstReminderDays: 7,
    secondReminderDays: 14,
    formalNoticeDays: 30,
    collectionDays: 60,
    lateFee: 5,
  };

  // ==========================================================================
  // 1. GÉNÉRATION AUTOMATIQUE FACTURE MENSUELLE
  // ==========================================================================

  /**
   * Génère automatiquement la facture mensuelle pour un élève
   *
   * Règles:
   * - Récupère toutes les leçons complétées du mois
   * - Calcule le coût selon tarif catégorie
   * - Ajoute les forfaits utilisés
   * - Applique les réductions actives
   * - Calcule la TVA (7.7% en Suisse)
   * - Génère numéro de facture unique
   * - Envoie email automatique
   */
  async generateMonthlyInvoice(
    studentId: string,
    month: Date
  ): Promise<Invoice> {
    console.log(`📄 Génération facture mensuelle pour élève ${studentId}...`);

    // 1. Récupérer toutes les leçons du mois
    const lessons = await this.getLessonsForMonth(studentId, month);
    console.log(`   ✓ ${lessons.length} leçons trouvées`);

    // 2. Calculer coût par leçon selon tarif
    const lessonItems = await Promise.all(
      lessons.map(async (lesson) => {
        const pricing = await this.getPricingForLesson(lesson);

        return {
          description: `Leçon ${lesson.category} - ${this.formatDate(lesson.date)}`,
          quantity: lesson.duration / 60, // En heures
          unitPrice: pricing.pricePerHour,
          amount: (lesson.duration / 60) * pricing.pricePerHour,
          vat: pricing.vatRate,
        };
      })
    );

    // 3. Ajouter forfaits utilisés
    const packages = await this.getPackagesUsed(studentId, month);
    const packageItems = packages.map((pkg) => ({
      description: pkg.name,
      quantity: 1,
      unitPrice: pkg.price,
      amount: pkg.price,
      vat: pkg.vatRate,
    }));

    console.log(`   ✓ ${packageItems.length} forfaits ajoutés`);

    // 4. Appliquer réductions actives
    const discounts = await this.getActiveDiscounts(studentId);
    const allItems = [...lessonItems, ...packageItems];
    const discountAmount = this.calculateDiscounts(allItems, discounts);

    console.log(`   ✓ Réduction appliquée: ${discountAmount} CHF`);

    // 5. Calculer TVA
    const subtotal = this.sumItems(allItems);
    const totalVAT = this.calculateVAT(subtotal - discountAmount, allItems);

    console.log(`   ✓ Sous-total: ${subtotal} CHF`);
    console.log(`   ✓ TVA: ${totalVAT} CHF`);

    // 6. Créer facture
    const invoice = await this.createInvoice({
      studentId,
      invoiceNumber: this.generateInvoiceNumber(month),
      items: allItems,
      discounts: discountAmount,
      subtotal: subtotal,
      vat: totalVAT,
      total: subtotal - discountAmount + totalVAT,
      dueDate: this.addDays(this.endOfMonth(month), 30),
      status: "pending",
      createdAt: new Date(),
    });

    console.log(`   ✓ Facture créée: ${invoice.invoiceNumber}`);
    console.log(`   ✓ Total: ${invoice.total} CHF`);
    console.log(`   ✓ Échéance: ${this.formatDate(invoice.dueDate)}`);

    // 7. Déclencher envoi email
    await this.sendInvoiceEmail(invoice);
    console.log(`   ✓ Email envoyé`);

    return invoice;
  }

  // ==========================================================================
  // 2. RELANCES AUTOMATIQUES IMPAYÉS
  // ==========================================================================

  /**
   * Traite les factures impayées avec relances automatiques
   *
   * Règles:
   * - Relance 1: 7 jours après échéance (email rappel)
   * - Relance 2: 14 jours après échéance (email + frais 5 CHF)
   * - Relance 3: 30 jours après échéance (mise en demeure + suspension)
   * - 60 jours: Passage au recouvrement
   */
  async processOverdueInvoices(): Promise<void> {
    console.log("🔔 Traitement des factures impayées...");

    const overdueInvoices = await this.getOverdueInvoices();
    console.log(`   ${overdueInvoices.length} factures en retard`);

    for (const invoice of overdueInvoices) {
      const daysPastDue = this.daysBetween(invoice.dueDate, new Date());

      console.log(
        `   Facture ${invoice.invoiceNumber}: ${daysPastDue} jours de retard`
      );

      // Relance 1: 7 jours après échéance
      if (daysPastDue === this.reminderConfig.firstReminderDays) {
        await this.sendReminderEmail(invoice, "first");
        console.log(`      ✓ Relance 1 envoyée`);
      }

      // Relance 2: 14 jours après échéance
      if (daysPastDue === this.reminderConfig.secondReminderDays) {
        await this.sendReminderEmail(invoice, "second");
        await this.chargeLateFee(invoice, this.reminderConfig.lateFee);
        console.log(
          `      ✓ Relance 2 envoyée + frais de retard ${this.reminderConfig.lateFee} CHF`
        );
      }

      // Relance 3: 30 jours après échéance (mise en demeure)
      if (daysPastDue === this.reminderConfig.formalNoticeDays) {
        await this.sendFormalNotice(invoice);
        await this.suspendStudent(invoice.studentId);
        console.log(`      ⚠️  Mise en demeure envoyée + élève suspendu`);
      }

      // 60 jours: Passage recouvrement
      if (daysPastDue === this.reminderConfig.collectionDays) {
        await this.transferToCollection(invoice);
        console.log(`      🚨 Transfert au recouvrement`);
      }
    }

    console.log("✓ Traitement terminé");
  }

  // ==========================================================================
  // 3. GESTION CRÉDITS DE RATTRAPAGE
  // ==========================================================================

  /**
   * Gère les crédits de rattrapage selon politique d'annulation
   *
   * Règles:
   * - Maladie élève + certificat + 24h avant = 100% crédit (3 mois validité)
   * - Annulation 48h avant = 100% crédit (3 mois validité)
   * - Annulation 24-48h avant = 50% crédit (3 mois validité)
   * - Annulation < 24h = Pas de crédit, leçon facturée
   * - Moniteur absent = 100% crédit + leçon gratuite
   * - Météo/véhicule = 100% crédit
   */
  async manageMakeupCredits(
    lessonId: string,
    reason: CancellationReason
  ): Promise<MakeupCredit | null> {
    console.log(`💳 Gestion crédit rattrapage pour leçon ${lessonId}...`);

    const lesson = await this.getLesson(lessonId);
    const policy = await this.getMakeupPolicy(lesson.studentId);

    if (!policy.allowMakeups) {
      console.log("   ✗ Politique de rattrapage non activée");
      return null;
    }

    // Calculer heures avant la leçon
    const hoursBeforeLesson = this.hoursBetween(new Date(), lesson.date);
    console.log(`   Annulation ${hoursBeforeLesson}h avant la leçon`);

    let creditAmount = 0;
    let creditReason = reason;

    // Règle 1: Maladie élève avec certificat médical
    if (reason === "student_illness" && hoursBeforeLesson >= 24) {
      if (policy.requireMedicalCertificate) {
        creditAmount = lesson.duration; // 100%
        console.log("   ✓ Crédit 100% (maladie + certificat)");
      } else {
        creditAmount = lesson.duration; // 100%
        console.log("   ✓ Crédit 100% (maladie)");
      }
    }
    // Règle 2: Moniteur indisponible
    else if (reason === "instructor_unavailable") {
      creditAmount = lesson.duration * 2; // 200% (leçon gratuite en compensation)
      console.log("   ✓ Crédit 200% (moniteur absent + leçon gratuite)");
    }
    // Règle 3: Météo ou problème véhicule
    else if (reason === "weather" || reason === "vehicle_issue") {
      creditAmount = lesson.duration; // 100%
      console.log("   ✓ Crédit 100% (météo/véhicule)");
    }
    // Règle 4: Annulation 48h avant
    else if (hoursBeforeLesson >= 48) {
      creditAmount = lesson.duration; // 100%
      console.log("   ✓ Crédit 100% (annulation 48h avant)");
    }
    // Règle 5: Annulation 24-48h avant
    else if (hoursBeforeLesson >= 24) {
      creditAmount = lesson.duration * 0.5; // 50%
      console.log("   ✓ Crédit 50% (annulation 24-48h avant)");
    }
    // Règle 6: Annulation < 24h
    else {
      console.log("   ✗ Pas de crédit (annulation < 24h)");
      await this.chargeFullLesson(lesson);
      return null;
    }

    // Créer le crédit
    const credit = await this.addMakeupCredit(lesson.studentId, {
      amount: creditAmount,
      expiryDate: this.addMonths(new Date(), policy.creditValidityMonths),
      reason: creditReason,
    });

    console.log(`   ✓ Crédit créé: ${creditAmount} minutes`);
    console.log(`   ✓ Expire le: ${this.formatDate(credit.expiryDate)}`);

    return credit;
  }

  // ==========================================================================
  // 4. UTILISATION CRÉDITS DE RATTRAPAGE
  // ==========================================================================

  /**
   * Utilise un crédit de rattrapage pour une nouvelle leçon
   *
   * Règles:
   * - Vérifier crédit disponible et non expiré
   * - Déduire durée de la leçon du crédit
   * - Si crédit insuffisant, facturer la différence
   * - Marquer crédit comme utilisé si épuisé
   */
  async useMakeupCredit(
    studentId: string,
    lessonDuration: number
  ): Promise<{ creditUsed: number; amountToPay: number }> {
    console.log(
      `💳 Utilisation crédit rattrapage pour ${lessonDuration} minutes...`
    );

    // Récupérer crédits disponibles
    const credits = await this.getAvailableCredits(studentId);

    if (credits.length === 0) {
      console.log("   ✗ Aucun crédit disponible");
      return { creditUsed: 0, amountToPay: lessonDuration };
    }

    // Trier par date d'expiration (FIFO)
    credits.sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime());

    let remainingDuration = lessonDuration;
    let totalCreditUsed = 0;

    for (const credit of credits) {
      if (remainingDuration <= 0) break;

      const creditToUse = Math.min(credit.amount, remainingDuration);

      // Déduire du crédit
      await this.deductCredit(credit.id, creditToUse);

      totalCreditUsed += creditToUse;
      remainingDuration -= creditToUse;

      console.log(
        `   ✓ Crédit utilisé: ${creditToUse} minutes (reste: ${credit.amount - creditToUse})`
      );
    }

    const amountToPay = remainingDuration;

    console.log(`   ✓ Total crédit utilisé: ${totalCreditUsed} minutes`);
    console.log(`   ✓ Montant à payer: ${amountToPay} minutes`);

    return { creditUsed: totalCreditUsed, amountToPay };
  }

  // ==========================================================================
  // 5. CALCULS FINANCIERS
  // ==========================================================================

  /**
   * Calcule le montant des réductions applicables
   */
  private calculateDiscounts(
    items: InvoiceItem[],
    discounts: Discount[]
  ): number {
    let totalDiscount = 0;
    const subtotal = this.sumItems(items);

    for (const discount of discounts) {
      // Vérifier montant minimum
      if (discount.minAmount && subtotal < discount.minAmount) {
        continue;
      }

      // Vérifier validité
      if (discount.validUntil && discount.validUntil < new Date()) {
        continue;
      }

      // Calculer réduction
      if (discount.type === "percentage") {
        totalDiscount += subtotal * (discount.value / 100);
      } else {
        totalDiscount += discount.value;
      }
    }

    return Math.min(totalDiscount, subtotal); // Max = subtotal
  }

  /**
   * Calcule la TVA totale (7.7% en Suisse)
   */
  private calculateVAT(amount: number, items: InvoiceItem[]): number {
    // Calculer TVA par item selon taux
    let totalVAT = 0;

    for (const item of items) {
      const itemAmount = item.amount;
      const vatRate = item.vat || 0.077; // 7.7% par défaut
      totalVAT += itemAmount * vatRate;
    }

    return Math.round(totalVAT * 100) / 100; // Arrondir à 2 décimales
  }

  /**
   * Somme les montants des items
   */
  private sumItems(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }

  // ==========================================================================
  // 6. HELPERS & UTILITIES
  // ==========================================================================

  private generateInvoiceNumber(month: Date): string {
    const year = month.getFullYear();
    const monthNum = String(month.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000);
    return `INV-${year}${monthNum}-${random}`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString("fr-CH");
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  private endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  private daysBetween(date1: Date, date2: Date): number {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private hoursBetween(date1: Date, date2: Date): number {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diff / (1000 * 60 * 60));
  }

  // ==========================================================================
  // 7. API MOCK FUNCTIONS (À REMPLACER PAR VRAIES API)
  // ==========================================================================

  private async getLessonsForMonth(
    studentId: string,
    month: Date
  ): Promise<Lesson[]> {
    // TODO: Remplacer par vraie API call
    return [];
  }

  private async getPricingForLesson(lesson: Lesson): Promise<PricingRule> {
    // TODO: Remplacer par vraie API call
    return {
      category: lesson.category,
      pricePerHour: 100,
      vatRate: 0.077,
      discountEligible: true,
    };
  }

  private async getPackagesUsed(
    studentId: string,
    month: Date
  ): Promise<Package[]> {
    // TODO: Remplacer par vraie API call
    return [];
  }

  private async getActiveDiscounts(studentId: string): Promise<Discount[]> {
    // TODO: Remplacer par vraie API call
    return [];
  }

  private async createInvoice(data: Omit<Invoice, "id">): Promise<Invoice> {
    // TODO: Remplacer par vraie API call
    return {
      id: Math.random().toString(36).substring(7),
      ...data,
    };
  }

  private async sendInvoiceEmail(invoice: Invoice): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   📧 Email envoyé pour facture ${invoice.invoiceNumber}`);
  }

  private async getOverdueInvoices(): Promise<Invoice[]> {
    // TODO: Remplacer par vraie API call
    return [];
  }

  private async sendReminderEmail(
    invoice: Invoice,
    type: "first" | "second"
  ): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   📧 Relance ${type} envoyée pour ${invoice.invoiceNumber}`);
  }

  private async chargeLateFee(invoice: Invoice, fee: number): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   💰 Frais de retard ajoutés: ${fee} CHF`);
  }

  private async sendFormalNotice(invoice: Invoice): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   ⚠️  Mise en demeure envoyée`);
  }

  private async suspendStudent(studentId: string): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   🚫 Élève ${studentId} suspendu`);
  }

  private async transferToCollection(invoice: Invoice): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(
      `   🚨 Facture ${invoice.invoiceNumber} transférée au recouvrement`
    );
  }

  private async getLesson(lessonId: string): Promise<Lesson> {
    // TODO: Remplacer par vraie API call
    return {
      id: lessonId,
      studentId: "student-1",
      instructorId: "instructor-1",
      category: "B",
      date: new Date(),
      duration: 90,
      status: "scheduled",
      isPaid: false,
    };
  }

  private async getMakeupPolicy(studentId: string): Promise<MakeupPolicy> {
    // TODO: Remplacer par vraie API call
    return {
      studentId,
      allowMakeups: true,
      maxCreditsPerMonth: 4,
      creditValidityMonths: 3,
      requireMedicalCertificate: true,
    };
  }

  private async addMakeupCredit(
    studentId: string,
    data: { amount: number; expiryDate: Date; reason: string }
  ): Promise<MakeupCredit> {
    // TODO: Remplacer par vraie API call
    return {
      id: Math.random().toString(36).substring(7),
      studentId,
      amount: data.amount,
      expiryDate: data.expiryDate,
      reason: data.reason,
      used: false,
      createdAt: new Date(),
    };
  }

  private async chargeFullLesson(lesson: Lesson): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   💰 Leçon ${lesson.id} facturée intégralement`);
  }

  private async getAvailableCredits(
    studentId: string
  ): Promise<MakeupCredit[]> {
    // TODO: Remplacer par vraie API call
    return [];
  }

  private async deductCredit(creditId: string, amount: number): Promise<void> {
    // TODO: Remplacer par vraie API call
    console.log(`   ✓ Crédit ${creditId} déduit de ${amount} minutes`);
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const billingBusinessLogic = new BillingBusinessLogic();
