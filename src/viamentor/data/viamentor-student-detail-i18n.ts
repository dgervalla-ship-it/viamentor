/**
 * VIAMENTOR Student Detail i18n
 *
 * Traductions FR/DE/IT/EN pour page détail élève
 */

export type StudentDetailLocale = "fr" | "de" | "it" | "en";

export interface StudentDetailTranslations {
  // Breadcrumb & Navigation
  breadcrumbStudents: string;

  // Header Actions
  editStudent: string;
  bookLesson: string;
  createInvoice: string;
  deleteStudent: string;
  printFile: string;
  shareLink: string;

  // Tabs
  tabInformations: string;
  tabProgression: string;
  tabDocuments: string;
  tabInvoices: string;
  tabPlanning: string;
  tabHistory: string;

  // Status
  statusActive: string;
  statusInactive: string;
  statusSuspended: string;
  statusCompleted: string;

  // Informations Tab
  sectionContact: string;
  sectionEnrollments: string;
  sectionBalance: string;
  sectionEmergencyContact: string;
  sectionPreferences: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  canton: string;
  birthDate: string;
  age: string;
  language: string;

  enrollmentDate: string;
  assignedInstructor: string;
  package: string;
  examDate: string;
  notes: string;
  lessonHistory: string;
  addCategory: string;

  lessonsBalance: string;
  addLessons: string;
  financialBalance: string;
  collectPayment: string;
  transactionHistory: string;

  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  minorExitAuth: string;

  emailNotifications: string;
  smsReminders: string;
  whatsappNotifications: string;
  preferredTimeSlots: string;
  instructorNotes: string;

  // Progression Tab
  lessonsCompleted: string;
  totalHours: string;
  averageRating: string;
  nextLesson: string;

  progressionThemes: string;
  themeMastery: string;
  lastPractice: string;
  strengths: string;
  weaknesses: string;
  evaluate: string;

  masteryInitiation: string;
  masteryInProgress: string;
  masteryGood: string;
  masteryMastered: string;

  examObjectives: string;
  theoryExam: string;
  practicalExam: string;
  examStatus: string;
  attempts: string;
  recordResult: string;
  needsArticle23: string;
  generateAttestation: string;

  recommendations: string;
  planTargetedLessons: string;

  // Documents Tab
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  actions: string;

  download: string;
  preview: string;
  rename: string;
  delete: string;

  uploadZone: string;
  dragDropFiles: string;
  requestDocuments: string;

  folderPermit: string;
  folderCourses: string;
  folderAttestations: string;
  folderInvoices: string;
  folderPhotos: string;
  folderOther: string;

  // Invoices Tab
  invoiceNumber: string;
  issueDate: string;
  amount: string;
  status: string;
  dueDate: string;

  totalBilled: string;
  totalPaid: string;
  remainingBalance: string;
  newInvoice: string;

  invoiceStatusDraft: string;
  invoiceStatusSent: string;
  invoiceStatusPaid: string;
  invoiceStatusOverdue: string;
  invoiceStatusCancelled: string;

  // Planning Tab
  month: string;
  week: string;
  day: string;
  monthView: string;
  weekView: string;
  dayView: string;
  today: string;
  upcomingLessons: string;
  noLessons: string;
  noUpcomingLessons: string;

  lessonScheduled: string;
  lessonConfirmed: string;
  lessonCompleted: string;
  lessonCancelled: string;
  lessonRescheduled: string;

  modify: string;
  cancel: string;
  exportCalendar: string;

  // History Tab
  filters: string;
  exportCSV: string;
  searchHistory: string;
  allActions: string;
  allUsers: string;
  totalEvents: string;
  lessonEvents: string;
  invoiceEvents: string;
  activeUsers: string;
  activityTimeline: string;
  eventsFound: string;
  noEventsFound: string;
  auditTrail: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;

  actionCreate: string;
  actionUpdate: string;
  actionDelete: string;
  actionStatusChange: string;
  actionPayment: string;
  actionLesson: string;
  actionDocument: string;

  exportAudit: string;

  // Quick Actions
  quickActions: string;
  contact: string;
  sendEmail: string;
  call: string;
  sendSMS: string;
  addNote: string;
  viewDocuments: string;
  viewProgress: string;
  alertsReminders: string;
  outstandingBalance: string;
  sendReminder: string;
  lowLessonBalance: string;
  lessonsRemaining: string;
  proposePurchase: string;
  allGood: string;
  noAlertsAtThisTime: string;
  quickStats: string;
  totalLessons: string;
  avgProgress: string;
  memberSince: string;
  categories: string;

  // Messages
  saveSuccess: string;
  saveError: string;
  deleteConfirm: string;
  statusChangeConfirm: string;

  // Time slots
  morning: string;
  afternoon: string;
  evening: string;
  weekend: string;

  // Common
  save: string;
  cancel: string;
  confirm: string;
  close: string;
  edit: string;
  view: string;
  search: string;
  filter: string;
  export: string;
  print: string;
}

export const STUDENT_DETAIL_TRANSLATIONS: Record<
  StudentDetailLocale,
  StudentDetailTranslations
> = {
  fr: {
    breadcrumbStudents: "Élèves",

    editStudent: "Modifier",
    bookLesson: "Réserver leçon",
    createInvoice: "Créer facture",
    deleteStudent: "Supprimer",
    printFile: "Imprimer fiche",
    shareLink: "Partager",

    tabInformations: "Informations",
    tabProgression: "Progression",
    tabDocuments: "Documents",
    tabInvoices: "Factures",
    tabPlanning: "Planning",
    tabHistory: "Historique",

    statusActive: "Actif",
    statusInactive: "Inactif",
    statusSuspended: "Suspendu",
    statusCompleted: "Terminé",

    sectionContact: "Coordonnées",
    sectionEnrollments: "Inscriptions formations",
    sectionBalance: "Soldes",
    sectionEmergencyContact: "Contact d'urgence",
    sectionPreferences: "Préférences",

    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse",
    zip: "NPA",
    city: "Ville",
    canton: "Canton",
    birthDate: "Date de naissance",
    age: "Âge",
    language: "Langue",

    enrollmentDate: "Date d'inscription",
    assignedInstructor: "Moniteur assigné",
    package: "Formule",
    examDate: "Date examen",
    notes: "Notes",
    lessonHistory: "Historique leçons",
    addCategory: "Ajouter catégorie",

    lessonsBalance: "Solde leçons",
    addLessons: "Ajouter leçons",
    financialBalance: "Solde financier",
    collectPayment: "Encaisser",
    transactionHistory: "Historique transactions",

    emergencyName: "Nom",
    emergencyPhone: "Téléphone",
    emergencyRelation: "Relation",
    minorExitAuth: "Autorisation sortie mineurs",

    emailNotifications: "Notifications email",
    smsReminders: "Rappels SMS",
    whatsappNotifications: "Notifications WhatsApp",
    preferredTimeSlots: "Créneaux préférés",
    instructorNotes: "Notes moniteurs",

    lessonsCompleted: "Leçons effectuées",
    totalHours: "Total heures",
    averageRating: "Moyenne",
    nextLesson: "Prochaine leçon",

    progressionThemes: "Progression thématique",
    themeMastery: "Maîtrise",
    lastPractice: "Dernière pratique",
    strengths: "Forces",
    weaknesses: "Faiblesses",
    evaluate: "Évaluer",

    masteryInitiation: "Initiation",
    masteryInProgress: "En cours",
    masteryGood: "Bien",
    masteryMastered: "Maîtrisé",

    examObjectives: "Objectifs examens",
    theoryExam: "Examen théorique",
    practicalExam: "Examen pratique",
    examStatus: "Statut",
    attempts: "Tentatives",
    recordResult: "Enregistrer résultat",
    needsArticle23: "Attestation Art. 23 OAC requise",
    generateAttestation: "Générer attestation",

    recommendations: "Recommandations",
    planTargetedLessons: "Planifier leçons ciblées",

    fileName: "Nom fichier",
    fileType: "Type",
    fileSize: "Taille",
    uploadDate: "Date upload",
    uploadedBy: "Uploadé par",
    actions: "Actions",

    download: "Télécharger",
    preview: "Aperçu",
    rename: "Renommer",
    delete: "Supprimer",

    uploadZone: "Zone d'upload",
    dragDropFiles: "Glisser-déposer des fichiers",
    requestDocuments: "Demander documents",

    folderPermit: "Permis élève",
    folderCourses: "Cours obligatoires",
    folderAttestations: "Attestations",
    folderInvoices: "Factures",
    folderPhotos: "Photos",
    folderOther: "Autre",

    invoiceNumber: "N° facture",
    issueDate: "Date émission",
    amount: "Montant",
    status: "Statut",
    dueDate: "Échéance",

    totalBilled: "Total facturé",
    totalPaid: "Total payé",
    remainingBalance: "Solde restant",
    newInvoice: "Nouvelle facture",

    invoiceStatusDraft: "Brouillon",
    invoiceStatusSent: "Envoyée",
    invoiceStatusPaid: "Payée",
    invoiceStatusOverdue: "En retard",
    invoiceStatusCancelled: "Annulée",

    month: "Mois",
    week: "Semaine",
    day: "Jour",
    monthView: "Mois",
    weekView: "Semaine",
    dayView: "Jour",
    today: "Aujourd'hui",
    upcomingLessons: "Leçons à venir",
    noLessons: "Aucune leçon",
    noUpcomingLessons: "Aucune leçon à venir",

    lessonScheduled: "Planifiée",
    lessonConfirmed: "Confirmée",
    lessonCompleted: "Complétée",
    lessonCancelled: "Annulée",
    lessonRescheduled: "Reportée",

    modify: "Modifier",
    cancelLesson: "Annuler",
    exportCalendar: "Exporter calendrier",

    filters: "Filtres",
    exportCSV: "Exporter CSV",
    searchHistory: "Rechercher dans l'historique",
    allActions: "Toutes les actions",
    allUsers: "Tous les utilisateurs",
    totalEvents: "Total événements",
    lessonEvents: "Événements leçons",
    invoiceEvents: "Événements factures",
    activeUsers: "Utilisateurs actifs",
    activityTimeline: "Chronologie d'activité",
    eventsFound: "événements trouvés",
    noEventsFound: "Aucun événement trouvé",
    auditTrail: "Journal d'audit",
    timestamp: "Date/Heure",
    user: "Utilisateur",
    action: "Action",
    details: "Détails",

    actionCreate: "Création",
    actionUpdate: "Modification",
    actionDelete: "Suppression",
    actionStatusChange: "Changement statut",
    actionPayment: "Paiement",
    actionLesson: "Leçon",
    actionDocument: "Document",

    exportAudit: "Exporter audit",

    quickActions: "Actions rapides",
    contact: "Contact",
    sendEmail: "Envoyer email",
    call: "Appeler",
    sendSMS: "Envoyer SMS",
    addNote: "Ajouter note",
    viewDocuments: "Voir documents",
    viewProgress: "Voir progression",
    alertsReminders: "Alertes & Rappels",
    outstandingBalance: "Solde impayé",
    sendReminder: "Envoyer rappel",
    lowLessonBalance: "Solde leçons faible",
    lessonsRemaining: "leçons restantes",
    proposePurchase: "Proposer achat",
    allGood: "Tout va bien",
    noAlertsAtThisTime: "Aucune alerte pour le moment",
    quickStats: "Statistiques rapides",
    totalLessons: "Total leçons",
    avgProgress: "Progression moyenne",
    memberSince: "Membre depuis",
    categories: "Catégories",

    saveSuccess: "Modifications enregistrées",
    saveError: "Erreur lors de l'enregistrement",
    deleteConfirm: "Confirmer la suppression ?",
    statusChangeConfirm: "Confirmer le changement de statut ?",

    morning: "Matin",
    afternoon: "Après-midi",
    evening: "Soir",
    weekend: "Weekend",

    save: "Enregistrer",
    cancel: "Annuler",
    confirm: "Confirmer",
    close: "Fermer",
    edit: "Modifier",
    view: "Voir",
    search: "Rechercher",
    filter: "Filtrer",
    export: "Exporter",
    print: "Imprimer",
  },

  de: {
    breadcrumbStudents: "Schüler",

    editStudent: "Bearbeiten",
    bookLesson: "Lektion buchen",
    createInvoice: "Rechnung erstellen",
    deleteStudent: "Löschen",
    printFile: "Akte drucken",
    shareLink: "Teilen",

    tabInformations: "Informationen",
    tabProgression: "Fortschritt",
    tabDocuments: "Dokumente",
    tabInvoices: "Rechnungen",
    tabPlanning: "Planung",
    tabHistory: "Verlauf",

    statusActive: "Aktiv",
    statusInactive: "Inaktiv",
    statusSuspended: "Suspendiert",
    statusCompleted: "Abgeschlossen",

    sectionContact: "Kontaktdaten",
    sectionEnrollments: "Ausbildungsanmeldungen",
    sectionBalance: "Guthaben",
    sectionEmergencyContact: "Notfallkontakt",
    sectionPreferences: "Präferenzen",

    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    address: "Adresse",
    zip: "PLZ",
    city: "Stadt",
    canton: "Kanton",
    birthDate: "Geburtsdatum",
    age: "Alter",
    language: "Sprache",

    enrollmentDate: "Anmeldedatum",
    assignedInstructor: "Zugewiesener Fahrlehrer",
    package: "Paket",
    examDate: "Prüfungsdatum",
    notes: "Notizen",
    lessonHistory: "Lektionsverlauf",
    addCategory: "Kategorie hinzufügen",

    lessonsBalance: "Lektionsguthaben",
    addLessons: "Lektionen hinzufügen",
    financialBalance: "Finanzielles Guthaben",
    collectPayment: "Zahlung einziehen",
    transactionHistory: "Transaktionsverlauf",

    emergencyName: "Name",
    emergencyPhone: "Telefon",
    emergencyRelation: "Beziehung",
    minorExitAuth: "Ausgangserlaubnis Minderjährige",

    emailNotifications: "E-Mail-Benachrichtigungen",
    smsReminders: "SMS-Erinnerungen",
    whatsappNotifications: "WhatsApp-Benachrichtigungen",
    preferredTimeSlots: "Bevorzugte Zeitfenster",
    instructorNotes: "Fahrlehrernotizen",

    lessonsCompleted: "Abgeschlossene Lektionen",
    totalHours: "Gesamtstunden",
    averageRating: "Durchschnitt",
    nextLesson: "Nächste Lektion",

    progressionThemes: "Thematischer Fortschritt",
    themeMastery: "Beherrschung",
    lastPractice: "Letzte Übung",
    strengths: "Stärken",
    weaknesses: "Schwächen",
    evaluate: "Bewerten",

    masteryInitiation: "Einführung",
    masteryInProgress: "In Bearbeitung",
    masteryGood: "Gut",
    masteryMastered: "Beherrscht",

    examObjectives: "Prüfungsziele",
    theoryExam: "Theorieprüfung",
    practicalExam: "Praktische Prüfung",
    examStatus: "Status",
    attempts: "Versuche",
    recordResult: "Ergebnis erfassen",
    needsArticle23: "Art. 23 VZV Bescheinigung erforderlich",
    generateAttestation: "Bescheinigung erstellen",

    recommendations: "Empfehlungen",
    planTargetedLessons: "Gezielte Lektionen planen",

    fileName: "Dateiname",
    fileType: "Typ",
    fileSize: "Größe",
    uploadDate: "Upload-Datum",
    uploadedBy: "Hochgeladen von",
    actions: "Aktionen",

    download: "Herunterladen",
    preview: "Vorschau",
    rename: "Umbenennen",
    delete: "Löschen",

    uploadZone: "Upload-Bereich",
    dragDropFiles: "Dateien hierher ziehen",
    requestDocuments: "Dokumente anfordern",

    folderPermit: "Lernfahrausweis",
    folderCourses: "Pflichtkurse",
    folderAttestations: "Bescheinigungen",
    folderInvoices: "Rechnungen",
    folderPhotos: "Fotos",
    folderOther: "Sonstiges",

    invoiceNumber: "Rechnungsnr.",
    issueDate: "Ausstellungsdatum",
    amount: "Betrag",
    status: "Status",
    dueDate: "Fälligkeit",

    totalBilled: "Gesamt berechnet",
    totalPaid: "Gesamt bezahlt",
    remainingBalance: "Restbetrag",
    newInvoice: "Neue Rechnung",

    invoiceStatusDraft: "Entwurf",
    invoiceStatusSent: "Gesendet",
    invoiceStatusPaid: "Bezahlt",
    invoiceStatusOverdue: "Überfällig",
    invoiceStatusCancelled: "Storniert",

    monthView: "Monat",
    weekView: "Woche",
    dayView: "Tag",
    today: "Heute",

    lessonScheduled: "Geplant",
    lessonConfirmed: "Bestätigt",
    lessonCompleted: "Abgeschlossen",
    lessonCancelled: "Abgesagt",
    lessonRescheduled: "Verschoben",

    modify: "Ändern",
    cancelLesson: "Abbrechen",
    exportCalendar: "Kalender exportieren",

    auditTrail: "Prüfprotokoll",
    timestamp: "Zeitstempel",
    user: "Benutzer",
    action: "Aktion",
    details: "Details",

    actionCreate: "Erstellung",
    actionUpdate: "Änderung",
    actionDelete: "Löschung",
    actionStatusChange: "Statusänderung",
    actionPayment: "Zahlung",
    actionLesson: "Lektion",
    actionDocument: "Dokument",

    exportAudit: "Audit exportieren",

    quickActions: "Schnellaktionen",
    contactStudent: "Schüler kontaktieren",
    addDocument: "Dokument hinzufügen",
    printConvocation: "Vorladung drucken",
    nextLessonCountdown: "Nächste Lektion",

    saveSuccess: "Änderungen gespeichert",
    saveError: "Fehler beim Speichern",
    deleteConfirm: "Löschen bestätigen?",
    statusChangeConfirm: "Statusänderung bestätigen?",

    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    weekend: "Wochenende",

    save: "Speichern",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    close: "Schließen",
    edit: "Bearbeiten",
    view: "Ansehen",
    search: "Suchen",
    filter: "Filtern",
    export: "Exportieren",
    print: "Drucken",
  },

  it: {
    breadcrumbStudents: "Allievi",

    editStudent: "Modificare",
    bookLesson: "Prenotare lezione",
    createInvoice: "Creare fattura",
    deleteStudent: "Eliminare",
    printFile: "Stampare scheda",
    shareLink: "Condividere",

    tabInformations: "Informazioni",
    tabProgression: "Progressione",
    tabDocuments: "Documenti",
    tabInvoices: "Fatture",
    tabPlanning: "Pianificazione",
    tabHistory: "Storico",

    statusActive: "Attivo",
    statusInactive: "Inattivo",
    statusSuspended: "Sospeso",
    statusCompleted: "Completato",

    sectionContact: "Contatti",
    sectionEnrollments: "Iscrizioni formazioni",
    sectionBalance: "Saldi",
    sectionEmergencyContact: "Contatto d'emergenza",
    sectionPreferences: "Preferenze",

    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    address: "Indirizzo",
    zip: "CAP",
    city: "Città",
    canton: "Cantone",
    birthDate: "Data di nascita",
    age: "Età",
    language: "Lingua",

    enrollmentDate: "Data d'iscrizione",
    assignedInstructor: "Istruttore assegnato",
    package: "Pacchetto",
    examDate: "Data esame",
    notes: "Note",
    lessonHistory: "Storico lezioni",
    addCategory: "Aggiungere categoria",

    lessonsBalance: "Saldo lezioni",
    addLessons: "Aggiungere lezioni",
    financialBalance: "Saldo finanziario",
    collectPayment: "Riscuotere",
    transactionHistory: "Storico transazioni",

    emergencyName: "Nome",
    emergencyPhone: "Telefono",
    emergencyRelation: "Relazione",
    minorExitAuth: "Autorizzazione uscita minori",

    emailNotifications: "Notifiche email",
    smsReminders: "Promemoria SMS",
    whatsappNotifications: "Notifiche WhatsApp",
    preferredTimeSlots: "Fasce orarie preferite",
    instructorNotes: "Note istruttori",

    lessonsCompleted: "Lezioni completate",
    totalHours: "Ore totali",
    averageRating: "Media",
    nextLesson: "Prossima lezione",

    progressionThemes: "Progressione tematica",
    themeMastery: "Padronanza",
    lastPractice: "Ultima pratica",
    strengths: "Punti di forza",
    weaknesses: "Punti deboli",
    evaluate: "Valutare",

    masteryInitiation: "Iniziazione",
    masteryInProgress: "In corso",
    masteryGood: "Bene",
    masteryMastered: "Padroneggiato",

    examObjectives: "Obiettivi esami",
    theoryExam: "Esame teorico",
    practicalExam: "Esame pratico",
    examStatus: "Stato",
    attempts: "Tentativi",
    recordResult: "Registrare risultato",
    needsArticle23: "Attestato Art. 23 OAC richiesto",
    generateAttestation: "Generare attestato",

    recommendations: "Raccomandazioni",
    planTargetedLessons: "Pianificare lezioni mirate",

    fileName: "Nome file",
    fileType: "Tipo",
    fileSize: "Dimensione",
    uploadDate: "Data caricamento",
    uploadedBy: "Caricato da",
    actions: "Azioni",

    download: "Scaricare",
    preview: "Anteprima",
    rename: "Rinominare",
    delete: "Eliminare",

    uploadZone: "Zona di caricamento",
    dragDropFiles: "Trascinare file qui",
    requestDocuments: "Richiedere documenti",

    folderPermit: "Licenza allievo",
    folderCourses: "Corsi obbligatori",
    folderAttestations: "Attestati",
    folderInvoices: "Fatture",
    folderPhotos: "Foto",
    folderOther: "Altro",

    invoiceNumber: "N° fattura",
    issueDate: "Data emissione",
    amount: "Importo",
    status: "Stato",
    dueDate: "Scadenza",

    totalBilled: "Totale fatturato",
    totalPaid: "Totale pagato",
    remainingBalance: "Saldo rimanente",
    newInvoice: "Nuova fattura",

    invoiceStatusDraft: "Bozza",
    invoiceStatusSent: "Inviata",
    invoiceStatusPaid: "Pagata",
    invoiceStatusOverdue: "In ritardo",
    invoiceStatusCancelled: "Annullata",

    monthView: "Mese",
    weekView: "Settimana",
    dayView: "Giorno",
    today: "Oggi",

    lessonScheduled: "Pianificata",
    lessonConfirmed: "Confermata",
    lessonCompleted: "Completata",
    lessonCancelled: "Annullata",
    lessonRescheduled: "Rinviata",

    modify: "Modificare",
    cancelLesson: "Annullare",
    exportCalendar: "Esportare calendario",

    auditTrail: "Registro di controllo",
    timestamp: "Data/Ora",
    user: "Utente",
    action: "Azione",
    details: "Dettagli",

    actionCreate: "Creazione",
    actionUpdate: "Modifica",
    actionDelete: "Eliminazione",
    actionStatusChange: "Cambio stato",
    actionPayment: "Pagamento",
    actionLesson: "Lezione",
    actionDocument: "Documento",

    exportAudit: "Esportare audit",

    quickActions: "Azioni rapide",
    contactStudent: "Contattare allievo",
    addDocument: "Aggiungere documento",
    printConvocation: "Stampare convocazione",
    nextLessonCountdown: "Prossima lezione",

    saveSuccess: "Modifiche salvate",
    saveError: "Errore durante il salvataggio",
    deleteConfirm: "Confermare l'eliminazione?",
    statusChangeConfirm: "Confermare il cambio di stato?",

    morning: "Mattina",
    afternoon: "Pomeriggio",
    evening: "Sera",
    weekend: "Fine settimana",

    save: "Salvare",
    cancel: "Annullare",
    confirm: "Confermare",
    close: "Chiudere",
    edit: "Modificare",
    view: "Vedere",
    search: "Cercare",
    filter: "Filtrare",
    export: "Esportare",
    print: "Stampare",
  },

  en: {
    breadcrumbStudents: "Students",

    editStudent: "Edit",
    bookLesson: "Book lesson",
    createInvoice: "Create invoice",
    deleteStudent: "Delete",
    printFile: "Print file",
    shareLink: "Share",

    tabInformations: "Information",
    tabProgression: "Progress",
    tabDocuments: "Documents",
    tabInvoices: "Invoices",
    tabPlanning: "Schedule",
    tabHistory: "History",

    statusActive: "Active",
    statusInactive: "Inactive",
    statusSuspended: "Suspended",
    statusCompleted: "Completed",

    sectionContact: "Contact details",
    sectionEnrollments: "Training enrollments",
    sectionBalance: "Balances",
    sectionEmergencyContact: "Emergency contact",
    sectionPreferences: "Preferences",

    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    zip: "ZIP",
    city: "City",
    canton: "Canton",
    birthDate: "Birth date",
    age: "Age",
    language: "Language",

    enrollmentDate: "Enrollment date",
    assignedInstructor: "Assigned instructor",
    package: "Package",
    examDate: "Exam date",
    notes: "Notes",
    lessonHistory: "Lesson history",
    addCategory: "Add category",

    lessonsBalance: "Lessons balance",
    addLessons: "Add lessons",
    financialBalance: "Financial balance",
    collectPayment: "Collect payment",
    transactionHistory: "Transaction history",

    emergencyName: "Name",
    emergencyPhone: "Phone",
    emergencyRelation: "Relation",
    minorExitAuth: "Minor exit authorization",

    emailNotifications: "Email notifications",
    smsReminders: "SMS reminders",
    whatsappNotifications: "WhatsApp notifications",
    preferredTimeSlots: "Preferred time slots",
    instructorNotes: "Instructor notes",

    lessonsCompleted: "Lessons completed",
    totalHours: "Total hours",
    averageRating: "Average rating",
    nextLesson: "Next lesson",

    progressionThemes: "Thematic progression",
    themeMastery: "Mastery",
    lastPractice: "Last practice",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    evaluate: "Evaluate",

    masteryInitiation: "Initiation",
    masteryInProgress: "In progress",
    masteryGood: "Good",
    masteryMastered: "Mastered",

    examObjectives: "Exam objectives",
    theoryExam: "Theory exam",
    practicalExam: "Practical exam",
    examStatus: "Status",
    attempts: "Attempts",
    recordResult: "Record result",
    needsArticle23: "Art. 23 OAC certificate required",
    generateAttestation: "Generate certificate",

    recommendations: "Recommendations",
    planTargetedLessons: "Plan targeted lessons",

    fileName: "File name",
    fileType: "Type",
    fileSize: "Size",
    uploadDate: "Upload date",
    uploadedBy: "Uploaded by",
    actions: "Actions",

    download: "Download",
    preview: "Preview",
    rename: "Rename",
    delete: "Delete",

    uploadZone: "Upload zone",
    dragDropFiles: "Drag and drop files",
    requestDocuments: "Request documents",

    folderPermit: "Learner permit",
    folderCourses: "Mandatory courses",
    folderAttestations: "Certificates",
    folderInvoices: "Invoices",
    folderPhotos: "Photos",
    folderOther: "Other",

    invoiceNumber: "Invoice #",
    issueDate: "Issue date",
    amount: "Amount",
    status: "Status",
    dueDate: "Due date",

    totalBilled: "Total billed",
    totalPaid: "Total paid",
    remainingBalance: "Remaining balance",
    newInvoice: "New invoice",

    invoiceStatusDraft: "Draft",
    invoiceStatusSent: "Sent",
    invoiceStatusPaid: "Paid",
    invoiceStatusOverdue: "Overdue",
    invoiceStatusCancelled: "Cancelled",

    monthView: "Month",
    weekView: "Week",
    dayView: "Day",
    today: "Today",

    lessonScheduled: "Scheduled",
    lessonConfirmed: "Confirmed",
    lessonCompleted: "Completed",
    lessonCancelled: "Cancelled",
    lessonRescheduled: "Rescheduled",

    modify: "Modify",
    cancelLesson: "Cancel",
    exportCalendar: "Export calendar",

    auditTrail: "Audit trail",
    timestamp: "Timestamp",
    user: "User",
    action: "Action",
    details: "Details",

    actionCreate: "Creation",
    actionUpdate: "Update",
    actionDelete: "Deletion",
    actionStatusChange: "Status change",
    actionPayment: "Payment",
    actionLesson: "Lesson",
    actionDocument: "Document",

    exportAudit: "Export audit",

    quickActions: "Quick actions",
    contactStudent: "Contact student",
    addDocument: "Add document",
    printConvocation: "Print convocation",
    nextLessonCountdown: "Next lesson",

    saveSuccess: "Changes saved",
    saveError: "Error saving",
    deleteConfirm: "Confirm deletion?",
    statusChangeConfirm: "Confirm status change?",

    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    weekend: "Weekend",

    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    edit: "Edit",
    view: "View",
    search: "Search",
    filter: "Filter",
    export: "Export",
    print: "Print",
  },
};

export function useStudentDetailTranslations(
  locale: StudentDetailLocale = "fr"
): StudentDetailTranslations {
  return STUDENT_DETAIL_TRANSLATIONS[locale];
}

export function formatCurrency(
  amount: number,
  locale: StudentDetailLocale = "fr"
): string {
  return new Intl.NumberFormat(locale === "en" ? "en-CH" : `${locale}-CH`, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
}

export function formatDate(
  date: string,
  locale: StudentDetailLocale = "fr"
): string {
  return new Date(date).toLocaleDateString(
    locale === "en" ? "en-CH" : `${locale}-CH`
  );
}

export function formatDateTime(
  date: string,
  locale: StudentDetailLocale = "fr"
): string {
  return new Date(date).toLocaleString(
    locale === "en" ? "en-CH" : `${locale}-CH`
  );
}
