/**
 * VIAMENTOR Invoices i18n
 *
 * Traductions pour module Finance Invoices
 * Terminologie comptable précise FR/DE/IT/EN
 */

export type InvoiceLocale = "fr" | "de" | "it" | "en";

export interface InvoiceTranslations {
  // Page titles
  pageTitle: string;
  pageDescription: string;

  // Invoice statuses
  statusDraft: string;
  statusSent: string;
  statusPaid: string;
  statusOverdue: string;
  statusVoid: string;

  // Table columns
  invoiceNumber: string;
  tenant: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: string;
  paymentMethod: string;
  actions: string;

  // Payment methods
  paymentCard: string;
  paymentBankTransfer: string;
  paymentSEPA: string;
  paymentCash: string;
  paymentInvoice: string;

  // Financial terms
  subtotal: string;
  subtotalHT: string;
  vat: string;
  vatRate: string;
  total: string;
  totalTTC: string;

  // Invoice detail
  invoiceDetails: string;
  issuedOn: string;
  dueOn: string;
  paidOn: string;
  tenantInfo: string;
  billingAddress: string;
  lineItems: string;
  description: string;
  quantity: string;
  unitPrice: string;
  lineTotal: string;

  // QR Bill
  qrBill: string;
  qrBillTitle: string;
  paymentSlip: string;
  account: string;
  reference: string;
  creditor: string;
  debtor: string;
  downloadQRBill: string;
  sendQRBill: string;

  // Actions
  viewPDF: string;
  sendEmail: string;
  print: string;
  voidInvoice: string;
  editInvoice: string;
  duplicateInvoice: string;
  markAsPaid: string;
  sendReminder: string;
  download: string;
  delete: string;

  // Filters
  filters: string;
  filterByStatus: string;
  filterByTenant: string;
  filterByPaymentMethod: string;
  filterByDate: string;
  searchInvoice: string;
  showVoided: string;
  resetFilters: string;
  saveFilter: string;

  // Bulk actions
  bulkActions: string;
  selectedItems: string;
  sendReminders: string;
  exportPDF: string;
  markAsPaidBulk: string;

  // Create invoice
  newInvoice: string;
  createInvoice: string;
  selectTenant: string;
  addLineItem: string;
  paymentTerms: string;
  paymentInstructions: string;
  notes: string;
  preview: string;
  sendImmediately: string;

  // Dunning
  dunningManagement: string;
  dunningConfig: string;
  automaticReminders: string;
  reminderStep: string;
  daysOverdue: string;
  emailTemplate: string;
  enabled: string;
  disabled: string;

  // Timeline
  timeline: string;
  created: string;
  sent: string;
  viewed: string;
  paid: string;
  overdue: string;
  reminder: string;
  voided: string;

  // Messages
  overdueBy: string;
  daysUntilDue: string;
  invoiceCreated: string;
  invoiceSent: string;
  invoiceVoided: string;
  paymentReceived: string;
  reminderSent: string;

  // Validation
  requiredField: string;
  invalidAmount: string;
  invalidDate: string;
  invalidEmail: string;
}

export const INVOICE_TRANSLATIONS: Record<InvoiceLocale, InvoiceTranslations> =
  {
    fr: {
      pageTitle: "Gestion des factures",
      pageDescription: "Gérez toutes les factures de la plateforme",

      statusDraft: "Brouillon",
      statusSent: "Envoyée",
      statusPaid: "Payée",
      statusOverdue: "En retard",
      statusVoid: "Annulée",

      invoiceNumber: "N° Facture",
      tenant: "École",
      issueDate: "Date d'émission",
      dueDate: "Date d'échéance",
      amount: "Montant",
      status: "Statut",
      paymentMethod: "Mode de paiement",
      actions: "Actions",

      paymentCard: "Carte bancaire",
      paymentBankTransfer: "Virement bancaire",
      paymentSEPA: "Prélèvement SEPA",
      paymentCash: "Espèces",
      paymentInvoice: "Facture",

      subtotal: "Sous-total",
      subtotalHT: "Sous-total HT",
      vat: "TVA",
      vatRate: "Taux TVA",
      total: "Total",
      totalTTC: "Total TTC",

      invoiceDetails: "Détails de la facture",
      issuedOn: "Émise le",
      dueOn: "Échéance le",
      paidOn: "Payée le",
      tenantInfo: "Informations client",
      billingAddress: "Adresse de facturation",
      lineItems: "Lignes de facturation",
      description: "Description",
      quantity: "Quantité",
      unitPrice: "Prix unitaire",
      lineTotal: "Total ligne",

      qrBill: "QR-facture",
      qrBillTitle: "Bulletin de versement QR",
      paymentSlip: "Bulletin de versement",
      account: "Compte",
      reference: "Référence",
      creditor: "Créancier",
      debtor: "Débiteur",
      downloadQRBill: "Télécharger le bulletin QR",
      sendQRBill: "Envoyer le bulletin QR",

      viewPDF: "Voir le PDF",
      sendEmail: "Envoyer par email",
      print: "Imprimer",
      voidInvoice: "Annuler la facture",
      editInvoice: "Modifier",
      duplicateInvoice: "Dupliquer",
      markAsPaid: "Marquer comme payée",
      sendReminder: "Envoyer un rappel",
      download: "Télécharger",
      delete: "Supprimer",

      filters: "Filtres",
      filterByStatus: "Filtrer par statut",
      filterByTenant: "Filtrer par école",
      filterByPaymentMethod: "Filtrer par mode de paiement",
      filterByDate: "Filtrer par date",
      searchInvoice: "Rechercher une facture",
      showVoided: "Afficher les annulées",
      resetFilters: "Réinitialiser",
      saveFilter: "Sauvegarder le filtre",

      bulkActions: "Actions groupées",
      selectedItems: "éléments sélectionnés",
      sendReminders: "Envoyer des rappels",
      exportPDF: "Exporter en PDF",
      markAsPaidBulk: "Marquer comme payées",

      newInvoice: "Nouvelle facture",
      createInvoice: "Créer une facture",
      selectTenant: "Sélectionner une école",
      addLineItem: "Ajouter une ligne",
      paymentTerms: "Conditions de paiement",
      paymentInstructions: "Instructions de paiement",
      notes: "Notes",
      preview: "Aperçu",
      sendImmediately: "Envoyer immédiatement",

      dunningManagement: "Gestion des relances",
      dunningConfig: "Configuration des relances",
      automaticReminders: "Rappels automatiques",
      reminderStep: "Étape de relance",
      daysOverdue: "Jours de retard",
      emailTemplate: "Modèle d'email",
      enabled: "Activé",
      disabled: "Désactivé",

      timeline: "Historique",
      created: "Créée",
      sent: "Envoyée",
      viewed: "Consultée",
      paid: "Payée",
      overdue: "En retard",
      reminder: "Rappel",
      voided: "Annulée",

      overdueBy: "En retard de",
      daysUntilDue: "J-",
      invoiceCreated: "Facture créée avec succès",
      invoiceSent: "Facture envoyée avec succès",
      invoiceVoided: "Facture annulée",
      paymentReceived: "Paiement reçu",
      reminderSent: "Rappel envoyé",

      requiredField: "Ce champ est requis",
      invalidAmount: "Montant invalide",
      invalidDate: "Date invalide",
      invalidEmail: "Email invalide",
    },

    de: {
      pageTitle: "Rechnungsverwaltung",
      pageDescription: "Verwalten Sie alle Rechnungen der Plattform",

      statusDraft: "Entwurf",
      statusSent: "Gesendet",
      statusPaid: "Bezahlt",
      statusOverdue: "Überfällig",
      statusVoid: "Storniert",

      invoiceNumber: "Rechnungsnr.",
      tenant: "Fahrschule",
      issueDate: "Rechnungsdatum",
      dueDate: "Fälligkeitsdatum",
      amount: "Betrag",
      status: "Status",
      paymentMethod: "Zahlungsmethode",
      actions: "Aktionen",

      paymentCard: "Kreditkarte",
      paymentBankTransfer: "Banküberweisung",
      paymentSEPA: "SEPA-Lastschrift",
      paymentCash: "Bargeld",
      paymentInvoice: "Rechnung",

      subtotal: "Zwischensumme",
      subtotalHT: "Netto",
      vat: "MwSt",
      vatRate: "MwSt-Satz",
      total: "Gesamt",
      totalTTC: "Brutto",

      invoiceDetails: "Rechnungsdetails",
      issuedOn: "Ausgestellt am",
      dueOn: "Fällig am",
      paidOn: "Bezahlt am",
      tenantInfo: "Kundeninformationen",
      billingAddress: "Rechnungsadresse",
      lineItems: "Rechnungspositionen",
      description: "Beschreibung",
      quantity: "Menge",
      unitPrice: "Einzelpreis",
      lineTotal: "Zeilensumme",

      qrBill: "QR-Rechnung",
      qrBillTitle: "QR-Einzahlungsschein",
      paymentSlip: "Einzahlungsschein",
      account: "Konto",
      reference: "Referenz",
      creditor: "Zahlungsempfänger",
      debtor: "Zahlungspflichtiger",
      downloadQRBill: "QR-Rechnung herunterladen",
      sendQRBill: "QR-Rechnung senden",

      viewPDF: "PDF anzeigen",
      sendEmail: "Per E-Mail senden",
      print: "Drucken",
      voidInvoice: "Rechnung stornieren",
      editInvoice: "Bearbeiten",
      duplicateInvoice: "Duplizieren",
      markAsPaid: "Als bezahlt markieren",
      sendReminder: "Erinnerung senden",
      download: "Herunterladen",
      delete: "Löschen",

      filters: "Filter",
      filterByStatus: "Nach Status filtern",
      filterByTenant: "Nach Fahrschule filtern",
      filterByPaymentMethod: "Nach Zahlungsmethode filtern",
      filterByDate: "Nach Datum filtern",
      searchInvoice: "Rechnung suchen",
      showVoided: "Stornierte anzeigen",
      resetFilters: "Zurücksetzen",
      saveFilter: "Filter speichern",

      bulkActions: "Massenaktionen",
      selectedItems: "Elemente ausgewählt",
      sendReminders: "Erinnerungen senden",
      exportPDF: "Als PDF exportieren",
      markAsPaidBulk: "Als bezahlt markieren",

      newInvoice: "Neue Rechnung",
      createInvoice: "Rechnung erstellen",
      selectTenant: "Fahrschule auswählen",
      addLineItem: "Position hinzufügen",
      paymentTerms: "Zahlungsbedingungen",
      paymentInstructions: "Zahlungsanweisungen",
      notes: "Notizen",
      preview: "Vorschau",
      sendImmediately: "Sofort senden",

      dunningManagement: "Mahnwesen",
      dunningConfig: "Mahnkonfiguration",
      automaticReminders: "Automatische Erinnerungen",
      reminderStep: "Mahnstufe",
      daysOverdue: "Tage überfällig",
      emailTemplate: "E-Mail-Vorlage",
      enabled: "Aktiviert",
      disabled: "Deaktiviert",

      timeline: "Verlauf",
      created: "Erstellt",
      sent: "Gesendet",
      viewed: "Angesehen",
      paid: "Bezahlt",
      overdue: "Überfällig",
      reminder: "Erinnerung",
      voided: "Storniert",

      overdueBy: "Überfällig seit",
      daysUntilDue: "T-",
      invoiceCreated: "Rechnung erfolgreich erstellt",
      invoiceSent: "Rechnung erfolgreich gesendet",
      invoiceVoided: "Rechnung storniert",
      paymentReceived: "Zahlung erhalten",
      reminderSent: "Erinnerung gesendet",

      requiredField: "Dieses Feld ist erforderlich",
      invalidAmount: "Ungültiger Betrag",
      invalidDate: "Ungültiges Datum",
      invalidEmail: "Ungültige E-Mail",
    },

    it: {
      pageTitle: "Gestione fatture",
      pageDescription: "Gestisci tutte le fatture della piattaforma",

      statusDraft: "Bozza",
      statusSent: "Inviata",
      statusPaid: "Pagata",
      statusOverdue: "In ritardo",
      statusVoid: "Annullata",

      invoiceNumber: "N° Fattura",
      tenant: "Scuola guida",
      issueDate: "Data emissione",
      dueDate: "Data scadenza",
      amount: "Importo",
      status: "Stato",
      paymentMethod: "Metodo di pagamento",
      actions: "Azioni",

      paymentCard: "Carta di credito",
      paymentBankTransfer: "Bonifico bancario",
      paymentSEPA: "Addebito SEPA",
      paymentCash: "Contanti",
      paymentInvoice: "Fattura",

      subtotal: "Subtotale",
      subtotalHT: "Netto",
      vat: "IVA",
      vatRate: "Aliquota IVA",
      total: "Totale",
      totalTTC: "Lordo",

      invoiceDetails: "Dettagli fattura",
      issuedOn: "Emessa il",
      dueOn: "Scadenza il",
      paidOn: "Pagata il",
      tenantInfo: "Informazioni cliente",
      billingAddress: "Indirizzo di fatturazione",
      lineItems: "Voci di fatturazione",
      description: "Descrizione",
      quantity: "Quantità",
      unitPrice: "Prezzo unitario",
      lineTotal: "Totale riga",

      qrBill: "Fattura QR",
      qrBillTitle: "Bollettino di versamento QR",
      paymentSlip: "Bollettino di versamento",
      account: "Conto",
      reference: "Riferimento",
      creditor: "Creditore",
      debtor: "Debitore",
      downloadQRBill: "Scarica bollettino QR",
      sendQRBill: "Invia bollettino QR",

      viewPDF: "Visualizza PDF",
      sendEmail: "Invia per email",
      print: "Stampa",
      voidInvoice: "Annulla fattura",
      editInvoice: "Modifica",
      duplicateInvoice: "Duplica",
      markAsPaid: "Segna come pagata",
      sendReminder: "Invia sollecito",
      download: "Scarica",
      delete: "Elimina",

      filters: "Filtri",
      filterByStatus: "Filtra per stato",
      filterByTenant: "Filtra per scuola",
      filterByPaymentMethod: "Filtra per metodo di pagamento",
      filterByDate: "Filtra per data",
      searchInvoice: "Cerca fattura",
      showVoided: "Mostra annullate",
      resetFilters: "Reimposta",
      saveFilter: "Salva filtro",

      bulkActions: "Azioni di massa",
      selectedItems: "elementi selezionati",
      sendReminders: "Invia solleciti",
      exportPDF: "Esporta in PDF",
      markAsPaidBulk: "Segna come pagate",

      newInvoice: "Nuova fattura",
      createInvoice: "Crea fattura",
      selectTenant: "Seleziona scuola",
      addLineItem: "Aggiungi riga",
      paymentTerms: "Termini di pagamento",
      paymentInstructions: "Istruzioni di pagamento",
      notes: "Note",
      preview: "Anteprima",
      sendImmediately: "Invia immediatamente",

      dunningManagement: "Gestione solleciti",
      dunningConfig: "Configurazione solleciti",
      automaticReminders: "Promemoria automatici",
      reminderStep: "Fase di sollecito",
      daysOverdue: "Giorni di ritardo",
      emailTemplate: "Modello email",
      enabled: "Attivato",
      disabled: "Disattivato",

      timeline: "Cronologia",
      created: "Creata",
      sent: "Inviata",
      viewed: "Visualizzata",
      paid: "Pagata",
      overdue: "In ritardo",
      reminder: "Sollecito",
      voided: "Annullata",

      overdueBy: "In ritardo di",
      daysUntilDue: "G-",
      invoiceCreated: "Fattura creata con successo",
      invoiceSent: "Fattura inviata con successo",
      invoiceVoided: "Fattura annullata",
      paymentReceived: "Pagamento ricevuto",
      reminderSent: "Sollecito inviato",

      requiredField: "Questo campo è obbligatorio",
      invalidAmount: "Importo non valido",
      invalidDate: "Data non valida",
      invalidEmail: "Email non valida",
    },

    en: {
      pageTitle: "Invoice Management",
      pageDescription: "Manage all platform invoices",

      statusDraft: "Draft",
      statusSent: "Sent",
      statusPaid: "Paid",
      statusOverdue: "Overdue",
      statusVoid: "Void",

      invoiceNumber: "Invoice #",
      tenant: "Driving School",
      issueDate: "Issue Date",
      dueDate: "Due Date",
      amount: "Amount",
      status: "Status",
      paymentMethod: "Payment Method",
      actions: "Actions",

      paymentCard: "Credit Card",
      paymentBankTransfer: "Bank Transfer",
      paymentSEPA: "SEPA Direct Debit",
      paymentCash: "Cash",
      paymentInvoice: "Invoice",

      subtotal: "Subtotal",
      subtotalHT: "Net",
      vat: "VAT",
      vatRate: "VAT Rate",
      total: "Total",
      totalTTC: "Gross",

      invoiceDetails: "Invoice Details",
      issuedOn: "Issued on",
      dueOn: "Due on",
      paidOn: "Paid on",
      tenantInfo: "Customer Information",
      billingAddress: "Billing Address",
      lineItems: "Line Items",
      description: "Description",
      quantity: "Quantity",
      unitPrice: "Unit Price",
      lineTotal: "Line Total",

      qrBill: "QR Bill",
      qrBillTitle: "QR Payment Slip",
      paymentSlip: "Payment Slip",
      account: "Account",
      reference: "Reference",
      creditor: "Creditor",
      debtor: "Debtor",
      downloadQRBill: "Download QR Bill",
      sendQRBill: "Send QR Bill",

      viewPDF: "View PDF",
      sendEmail: "Send Email",
      print: "Print",
      voidInvoice: "Void Invoice",
      editInvoice: "Edit",
      duplicateInvoice: "Duplicate",
      markAsPaid: "Mark as Paid",
      sendReminder: "Send Reminder",
      download: "Download",
      delete: "Delete",

      filters: "Filters",
      filterByStatus: "Filter by Status",
      filterByTenant: "Filter by School",
      filterByPaymentMethod: "Filter by Payment Method",
      filterByDate: "Filter by Date",
      searchInvoice: "Search Invoice",
      showVoided: "Show Voided",
      resetFilters: "Reset",
      saveFilter: "Save Filter",

      bulkActions: "Bulk Actions",
      selectedItems: "items selected",
      sendReminders: "Send Reminders",
      exportPDF: "Export PDF",
      markAsPaidBulk: "Mark as Paid",

      newInvoice: "New Invoice",
      createInvoice: "Create Invoice",
      selectTenant: "Select School",
      addLineItem: "Add Line Item",
      paymentTerms: "Payment Terms",
      paymentInstructions: "Payment Instructions",
      notes: "Notes",
      preview: "Preview",
      sendImmediately: "Send Immediately",

      dunningManagement: "Dunning Management",
      dunningConfig: "Dunning Configuration",
      automaticReminders: "Automatic Reminders",
      reminderStep: "Reminder Step",
      daysOverdue: "Days Overdue",
      emailTemplate: "Email Template",
      enabled: "Enabled",
      disabled: "Disabled",

      timeline: "Timeline",
      created: "Created",
      sent: "Sent",
      viewed: "Viewed",
      paid: "Paid",
      overdue: "Overdue",
      reminder: "Reminder",
      voided: "Voided",

      overdueBy: "Overdue by",
      daysUntilDue: "D-",
      invoiceCreated: "Invoice created successfully",
      invoiceSent: "Invoice sent successfully",
      invoiceVoided: "Invoice voided",
      paymentReceived: "Payment received",
      reminderSent: "Reminder sent",

      requiredField: "This field is required",
      invalidAmount: "Invalid amount",
      invalidDate: "Invalid date",
      invalidEmail: "Invalid email",
    },
  };

export function useInvoiceTranslations(locale: InvoiceLocale = "fr") {
  return INVOICE_TRANSLATIONS[locale];
}
