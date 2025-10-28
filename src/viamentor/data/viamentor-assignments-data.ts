/**
 * VIAMENTOR - Assignments Data
 * Types et mock data pour système attribution élèves-moniteurs intelligent
 */

import type { StudentCategory } from "@/viamentor/data/viamentor-students-data";

// ============================================================================
// TYPES
// ============================================================================

export type AssignmentStatus = "Active" | "En attente" | "Archivée";

export type ProposalStatus = "Pending" | "Approved" | "Rejected" | "Expired";

export type ReassignmentReason =
  | "schedule_conflict"
  | "student_request"
  | "instructor_unavailable"
  | "performance_issue"
  | "additional_category"
  | "makeup_lesson"
  | "specialized_training"
  | "mock_exam"
  | "other";

export type TemporaryAccessStatus = "Active" | "Expired" | "Revoked";

export type AssignmentEventType =
  | "assignment"
  | "reassignment"
  | "temporary_access"
  | "revocation";

export type AssignmentLocale = "fr" | "de" | "it" | "en";

export interface Assignment {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  category: StudentCategory;
  status: AssignmentStatus;
  assignedDate: string; // ISO date
  completedHours: number;
  totalHours: number;
  nextLesson: string | null; // ISO date
  reason?: string;
}

export interface InstructorWorkload {
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  activeStudents: number;
  maxCapacity: number;
  weeklyHours: number;
  availableHours: number;
  categories: StudentCategory[];
  languages: string[]; // ISO codes: "fr", "de", "it", "en"
  rating: number; // 0-5
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  availabilityScore: number; // 0-100 calculated
}

export interface AssignmentRecommendation {
  instructor: InstructorWorkload;
  score: number; // 0-100
  rank: number;
  reasons: string[];
  warnings: string[];
}

export interface AssignmentStats {
  totalAssignments: number;
  activeAssignments: number;
  saturatedInstructors: number; // >80% capacity
  unassignedStudents: number;
  pendingReassignments: number;
}

export interface WorkloadDistribution {
  instructorName: string;
  categoryB: number;
  categoryA: number;
  categoryBE: number;
  categoryA1: number;
  total: number;
}

export interface AssignmentDetail extends Assignment {
  assignedDays: number;
  completedLessons: number;
  instructorRating: number;
  progressPercentage: number;
  initialReason: string;
}

export interface InstructorProposal {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  currentInstructorId?: string;
  currentInstructorName?: string;
  motivation: string;
  proposedSchedule: string[];
  longTermCommitment: boolean;
  status: ProposalStatus;
  createdAt: string; // ISO date
  processedAt?: string; // ISO date
  processedBy?: string;
  rejectionReason?: string;
  compatibilityScore: number; // 0-100
}

export interface ProposalStats {
  pending: number;
  approvedThisWeek: number;
  rejectedThisWeek: number;
  acceptanceRate: number;
}

export interface WorkloadComparison {
  current: {
    activeStudents: number;
    weeklyHours: number;
  };
  proposed: {
    activeStudents: number;
    weeklyHours: number;
  };
}

export interface TemporaryAccess {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  primaryInstructorId: string;
  primaryInstructorName: string;
  primaryInstructorAvatar?: string;
  temporaryInstructorId: string;
  temporaryInstructorName: string;
  temporaryInstructorAvatar?: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  maxLessons: number;
  completedLessons: number;
  authorizedCategories: StudentCategory[];
  reason: string;
  allowDirectBooking: boolean;
  status: TemporaryAccessStatus;
  createdAt: string; // ISO date
  createdBy: string;
  revokedAt?: string; // ISO date
  revokedBy?: string;
  revocationReason?: string;
}

export interface TemporaryStudent {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  primaryInstructorId: string;
  primaryInstructorName: string;
  primaryInstructorAvatar?: string;
  startDate: string;
  endDate: string;
  remainingLessons: number;
  maxLessons: number;
  authorizedCategories: StudentCategory[];
  reason: string;
  allowDirectBooking: boolean;
}

export interface AssignmentHistoryEvent {
  id: string;
  type: AssignmentEventType;
  studentId: string;
  studentName: string;
  timestamp: string; // ISO date
  performedBy: string;
  performedByName: string;
  previousInstructorId?: string;
  previousInstructorName?: string;
  newInstructorId?: string;
  newInstructorName?: string;
  reason: string;
  status?: AssignmentStatus;
  duration?: number; // days for temporary access
  metadata: {
    instructorStudentCount?: number;
    instructorWeeklyHours?: number;
  };
}

export interface AssignmentAnalytics {
  assignmentsPerMonth: Array<{
    month: string;
    count: number;
  }>;
  topInstructors: Array<{
    instructorName: string;
    assignmentCount: number;
  }>;
  reassignmentReasons: Array<{
    reason: string;
    percentage: number;
    count: number;
  }>;
  metrics: {
    averageDuration: number; // days
    reassignmentRate: number; // percentage
    studentSatisfactionAfterAssignment: number; // NPS score
    studentSatisfactionAfterReassignment: number; // NPS score
    medianTimeToAssignment: number; // hours
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const ASSIGNMENTS_TRANSLATIONS = {
  fr: {
    title: "Gestion des attributions",
    assignInstructor: "Attribuer un moniteur",
    assignTo: "Attribuer à",
    recommendations: "Recommandations automatiques",
    recommendationsSubtitle: "Triés par charge de travail croissante",
    manualSearch: "Recherche manuelle",
    confirmAssignment: "Confirmer l'attribution",
    confirmMessage: "Attribuer {student} à {instructor}?",
    warningMessage:
      "Cette attribution est quasi-définitive - Seule l'école pourra modifier",
    reason: "Raison de l'attribution",
    reasonPlaceholder: "Ex: Catégorie B - Disponibilités compatibles",
    notifyInstructor: "Notifier le moniteur par email/SMS",
    notifyStudent: "Notifier l'élève",
    confirm: "Confirmer l'attribution",
    cancel: "Annuler",
    activeStudents: "Élèves actifs",
    weeklyHours: "Heures/semaine",
    availabilityScore: "Score disponibilité",
    categories: "Catégories",
    languages: "Langues",
    rating: "Évaluations",
    distance: "Distance",
    viewProfile: "Voir profil complet",
    assignThisInstructor: "Attribuer ce moniteur",
    filters: {
      availableOnly: "Disponibles uniquement",
      sortBy: "Trier par",
      sortScore: "Score décroissant",
      sortAlpha: "Alphabétique",
      sortWorkload: "Moins chargés",
      sortRating: "Mieux notés",
    },
    stats: {
      total: "Total attributions",
      saturated: "Moniteurs saturés",
      unassigned: "Élèves non attribués",
      pending: "Demandes réattribution",
    },
    status: {
      Active: "Active",
      "En attente": "En attente",
      Archivée: "Archivée",
    },
    actions: {
      viewDetail: "Voir détail",
      modify: "Modifier attribution",
      history: "Historique",
      archive: "Archiver",
      reassignBatch: "Réassigner sélection",
    },
    workload: {
      title: "Distribution de la charge",
      instructor: "Moniteur",
      workload: "Charge",
      availability: "Disponibilité",
    },
    reassignment: {
      title: "Réattribuer élève",
      currentAssignment: "Attribution actuelle",
      assignedSince: "Attribué le {date} ({days} jours)",
      completedLessons: "Leçons effectuées",
      totalHours: "Heures totales",
      progress: "Progression",
      programCompleted: "{percent}% programme complété",
      instructorRating: "Évaluations moniteur",
      initialReason: "Raison attribution initiale",
      removeAssignment: "Retirer attribution",
      selectNewInstructor: "Sélectionner nouveau moniteur",
      warningOverloaded:
        "⚠️ Ce moniteur a déjà {count} élèves (recommandé max 12)",
      reassignmentReason: "Raison réattribution",
      reassignmentReasonPlaceholder:
        "Ex: Incompatibilité horaires - Demande élève parent - Moniteur indisponible longue durée",
      confirmReassignment: "Confirmer réattribution",
      warningMessage:
        "Action sensible - Notification automatique moniteur actuel + nouvel moniteur + élève",
      steps: {
        selectInstructor: "Sélection moniteur",
        justification: "Justification",
        notifications: "Notifications",
        confirmation: "Confirmation",
      },
      notifications: {
        notifyCurrentInstructor: "Notifier moniteur actuel",
        notifyNewInstructor: "Notifier nouveau moniteur",
        notifyStudent: "Notifier élève",
        notifyParents: "Notifier parents (si mineur)",
      },
    },
    temporaryAccess: {
      title: "Accès temporaires",
      authorize: "Autoriser un autre moniteur",
      infoMessage:
        "L'élève reste attribué à son moniteur principal - Ceci est une autorisation ponctuelle pour leçons spécifiques",
      useCases: "Cas d'usage",
      useCasesList: [
        "Moniteur principal absent (vacances, maladie, congé)",
        "Catégorie additionnelle (élève veut apprendre moto)",
        "Leçon rattrapage (autre moniteur disponible)",
        "Formation spécialisée (expertise manœuvres spécifiques)",
        "Examen blanc (simuler conditions réelles)",
      ],

      selectTemporaryInstructor: "Moniteur autorisé",
      configuration: "Configuration autorisation",
      period: "Période validité",
      maxLessons: "Maximum leçons",
      authorizedCategories: "Catégories autorisées",
      reason: "Raison",
      reasonPlaceholder:
        "Ex: Moniteur principal en vacances - Remplacement temporaire",
      allowDirectBooking: "Autoriser réservation directe",
      notifyPrimaryInstructor: "Notifier moniteur principal",
      notifyTemporaryInstructor: "Notifier moniteur temporaire",
      notifyStudent: "Notifier élève",
      activeAuthorizations: "Autorisations actives",
      primaryInstructor: "Moniteur principal",
      temporaryInstructor: "Moniteur temporaire",
      validity: "Période",
      lessonsCompleted: "Leçons effectuées",
      extend: "Prolonger",
      revoke: "Révoquer",
      history: "Historique",
      revocationReason: "Raison révocation",
      revocationReasonPlaceholder:
        "Expliquez pourquoi cette autorisation est révoquée prématurément",
      temporaryStudents: "Élèves temporaires",
      temporaryStudentsInfo:
        "Ces élèves ont un moniteur principal - Votre autorisation est limitée dans le temps",
      expiresIn: "Expire dans {days} jours",
      remainingLessons: "Leçons restantes",
      requestExtension: "Demander extension",
      viewPlanning: "Voir planning",
      bookLesson: "Réserver leçon",
    },
    assignmentHistory: {
      title: "Historique des attributions",
      timeline: "Chronologie",
      assignedTo: "Attribué à {instructor}",
      reassignedTo: "Réattribué à {instructor}",
      temporaryAccessGranted: "Accès temporaire accordé à {instructor}",
      accessRevoked: "Accès révoqué",
      performedBy: "Par",
      previousInstructor: "Moniteur ancien",
      newInstructor: "Moniteur nouveau",
      statusAtTime: "Statut",
      duration: "Durée",
      instructorWorkload: "Charge moniteur",
      analytics: "Statistiques",
      assignmentsPerMonth: "Attributions par mois",
      topInstructors: "Moniteurs les plus attribués",
      reassignmentReasons: "Raisons réattribution",
      metrics: {
        averageDuration: "Durée moyenne attribution",
        reassignmentRate: "Taux réattribution",
        satisfactionAfterAssignment: "Satisfaction après attribution",
        satisfactionAfterReassignment: "Satisfaction après réattribution",
        timeToAssignment: "Délai attribution",
      },
      days: "jours",
      hours: "heures",
      students: "élèves",
    },
    proposals: {
      title: "Propositions moniteurs",
      myProposals: "Mes propositions",
      proposeStudent: "Proposer de prendre un élève",
      infoMessage:
        "Vos propositions nécessitent validation école avant attribution officielle",
      availableStudents: "Élèves cherchant moniteur",
      studentLevel: "Niveau progression",
      currentInstructor: "Moniteur actuel",
      overloaded: "saturé",
      preferredSchedule: "Préférence horaires",
      geographicZone: "Zone géographique",
      proposeToTake: "Proposer prise en charge",
      proposalFor: "Proposition pour {student}",
      motivation: "Motivation",
      motivationPlaceholder:
        "Ex: Je suis spécialisé catégorie B avec 10 ans expérience - Disponibilités après-midi compatibles élève - Actuellement 8 élèves seulement",
      proposedSchedule: "Disponibilité proposée",
      longTermCommitment: "Engagement minimum",
      sendProposal: "Envoyer proposition",
      validateProposals: "Valider propositions",
      pendingProposals: "Propositions en attente",
      approvedThisWeek: "Approuvées cette semaine",
      rejectedThisWeek: "Refusées",
      acceptanceRate: "Taux acceptation",
      proposingInstructor: "Moniteur proposant",
      concernedStudent: "Élève concerné",
      motivationPreview: "Motivation",
      workloadComparison: "Comparaison charge",
      proposalScore: "Score proposition",
      approve: "Approuver",
      reject: "Refuser",
      postpone: "Reporter",
      rejectionReason: "Raison du refus",
      rejectionReasonPlaceholder:
        "Expliquez pourquoi cette proposition est refusée",
      compatibilityScore: "{percent}% compatible",
      currentVsProposed:
        "Actuel: {current} élèves {currentHours}h/semaine vs Proposant: {proposed} élèves {proposedHours}h/semaine",
    },
  },
  de: {
    title: "Zuweisungsverwaltung",
    assignInstructor: "Fahrlehrer zuweisen",
    assignTo: "Zuweisen an",
    recommendations: "Automatische Empfehlungen",
    recommendationsSubtitle: "Sortiert nach steigender Auslastung",
    manualSearch: "Manuelle Suche",
    confirmAssignment: "Zuweisung bestätigen",
    confirmMessage: "{student} an {instructor} zuweisen?",
    warningMessage:
      "Diese Zuweisung ist quasi-endgültig - Nur die Schule kann ändern",
    reason: "Grund der Zuweisung",
    reasonPlaceholder: "Z.B.: Kategorie B - Verfügbarkeiten kompatibel",
    notifyInstructor: "Fahrlehrer per E-Mail/SMS benachrichtigen",
    notifyStudent: "Schüler benachrichtigen",
    confirm: "Zuweisung bestätigen",
    cancel: "Abbrechen",
    activeStudents: "Aktive Schüler",
    weeklyHours: "Stunden/Woche",
    availabilityScore: "Verfügbarkeits-Score",
    categories: "Kategorien",
    languages: "Sprachen",
    rating: "Bewertungen",
    distance: "Entfernung",
    viewProfile: "Vollständiges Profil anzeigen",
    assignThisInstructor: "Diesen Fahrlehrer zuweisen",
    filters: {
      availableOnly: "Nur verfügbare",
      sortBy: "Sortieren nach",
      sortScore: "Score absteigend",
      sortAlpha: "Alphabetisch",
      sortWorkload: "Weniger ausgelastet",
      sortRating: "Besser bewertet",
    },
    stats: {
      total: "Gesamt Zuweisungen",
      saturated: "Überlastete Fahrlehrer",
      unassigned: "Nicht zugewiesene Schüler",
      pending: "Ausstehende Neuzuweisungen",
    },
    status: {
      Active: "Aktiv",
      "En attente": "Ausstehend",
      Archivée: "Archiviert",
    },
    actions: {
      viewDetail: "Detail anzeigen",
      modify: "Zuweisung ändern",
      history: "Verlauf",
      archive: "Archivieren",
      reassignBatch: "Auswahl neu zuweisen",
    },
    workload: {
      title: "Lastverteilung",
      instructor: "Fahrlehrer",
      workload: "Auslastung",
      availability: "Verfügbarkeit",
    },
    reassignment: {
      title: "Schüler neu zuweisen",
      currentAssignment: "Aktuelle Zuweisung",
      assignedSince: "Zugewiesen am {date} ({days} Tage)",
      completedLessons: "Durchgeführte Lektionen",
      totalHours: "Gesamtstunden",
      progress: "Fortschritt",
      programCompleted: "{percent}% Programm abgeschlossen",
      instructorRating: "Fahrlehrer-Bewertungen",
      initialReason: "Ursprünglicher Zuweisungsgrund",
      removeAssignment: "Zuweisung entfernen",
      selectNewInstructor: "Neuen Fahrlehrer auswählen",
      warningOverloaded:
        "⚠️ Dieser Fahrlehrer hat bereits {count} Schüler (empfohlen max 12)",
      reassignmentReason: "Grund für Neuzuweisung",
      reassignmentReasonPlaceholder:
        "Z.B.: Zeitplan-Inkompatibilität - Schüleranfrage - Fahrlehrer langfristig nicht verfügbar",
      confirmReassignment: "Neuzuweisung bestätigen",
      warningMessage:
        "Sensible Aktion - Automatische Benachrichtigung aktueller Fahrlehrer + neuer Fahrlehrer + Schüler",
      steps: {
        selectInstructor: "Fahrlehrer-Auswahl",
        justification: "Begründung",
        notifications: "Benachrichtigungen",
        confirmation: "Bestätigung",
      },
      notifications: {
        notifyCurrentInstructor: "Aktuellen Fahrlehrer benachrichtigen",
        notifyNewInstructor: "Neuen Fahrlehrer benachrichtigen",
        notifyStudent: "Schüler benachrichtigen",
        notifyParents: "Eltern benachrichtigen (falls minderjährig)",
      },
    },
    temporaryAccess: {
      title: "Vorübergehende Zugriffe",
      authorize: "Anderen Fahrlehrer autorisieren",
      infoMessage:
        "Der Schüler bleibt seinem Hauptfahrlehrer zugewiesen - Dies ist eine punktuelle Autorisierung für spezifische Lektionen",
      useCases: "Anwendungsfälle",
      useCasesList: [
        "Hauptfahrlehrer abwesend (Urlaub, Krankheit, Freistellung)",
        "Zusätzliche Kategorie (Schüler möchte Motorrad lernen)",
        "Nachhollektion (anderer Fahrlehrer verfügbar)",
        "Spezialisierte Ausbildung (Expertise spezifische Manöver)",
        "Prüfungssimulation (reale Bedingungen simulieren)",
      ],

      selectTemporaryInstructor: "Autorisierter Fahrlehrer",
      configuration: "Autorisierungskonfiguration",
      period: "Gültigkeitszeitraum",
      maxLessons: "Maximale Lektionen",
      authorizedCategories: "Autorisierte Kategorien",
      reason: "Grund",
      reasonPlaceholder:
        "Z.B.: Hauptfahrlehrer im Urlaub - Vorübergehende Vertretung",
      allowDirectBooking: "Direkte Buchung erlauben",
      notifyPrimaryInstructor: "Hauptfahrlehrer benachrichtigen",
      notifyTemporaryInstructor: "Vorübergehenden Fahrlehrer benachrichtigen",
      notifyStudent: "Schüler benachrichtigen",
      activeAuthorizations: "Aktive Autorisierungen",
      primaryInstructor: "Hauptfahrlehrer",
      temporaryInstructor: "Vorübergehender Fahrlehrer",
      validity: "Zeitraum",
      lessonsCompleted: "Durchgeführte Lektionen",
      extend: "Verlängern",
      revoke: "Widerrufen",
      history: "Verlauf",
      revocationReason: "Widerrufsgrund",
      revocationReasonPlaceholder:
        "Erklären Sie, warum diese Autorisierung vorzeitig widerrufen wird",
      temporaryStudents: "Vorübergehende Schüler",
      temporaryStudentsInfo:
        "Diese Schüler haben einen Hauptfahrlehrer - Ihre Autorisierung ist zeitlich begrenzt",
      expiresIn: "Läuft ab in {days} Tagen",
      remainingLessons: "Verbleibende Lektionen",
      requestExtension: "Verlängerung beantragen",
      viewPlanning: "Planung anzeigen",
      bookLesson: "Lektion buchen",
    },
    assignmentHistory: {
      title: "Zuweisungsverlauf",
      timeline: "Chronologie",
      assignedTo: "Zugewiesen an {instructor}",
      reassignedTo: "Neu zugewiesen an {instructor}",
      temporaryAccessGranted: "Vorübergehender Zugriff gewährt an {instructor}",
      accessRevoked: "Zugriff widerrufen",
      performedBy: "Von",
      previousInstructor: "Vorheriger Fahrlehrer",
      newInstructor: "Neuer Fahrlehrer",
      statusAtTime: "Status",
      duration: "Dauer",
      instructorWorkload: "Fahrlehrer-Auslastung",
      analytics: "Statistiken",
      assignmentsPerMonth: "Zuweisungen pro Monat",
      topInstructors: "Meistens zugewiesene Fahrlehrer",
      reassignmentReasons: "Neuzuweisungsgründe",
      metrics: {
        averageDuration: "Durchschnittliche Zuweisungsdauer",
        reassignmentRate: "Neuzuweisungsrate",
        satisfactionAfterAssignment: "Zufriedenheit nach Zuweisung",
        satisfactionAfterReassignment: "Zufriedenheit nach Neuzuweisung",
        timeToAssignment: "Zeit bis zur Zuweisung",
      },
      days: "Tage",
      hours: "Stunden",
      students: "Schüler",
    },
    proposals: {
      title: "Fahrlehrer-Vorschläge",
      myProposals: "Meine Vorschläge",
      proposeStudent: "Schüler übernehmen vorschlagen",
      infoMessage:
        "Ihre Vorschläge erfordern Schulgenehmigung vor offizieller Zuweisung",
      availableStudents: "Schüler suchen Fahrlehrer",
      studentLevel: "Fortschrittsniveau",
      currentInstructor: "Aktueller Fahrlehrer",
      overloaded: "überlastet",
      preferredSchedule: "Zeitplan-Präferenz",
      geographicZone: "Geografische Zone",
      proposeToTake: "Übernahme vorschlagen",
      proposalFor: "Vorschlag für {student}",
      motivation: "Begründung",
      motivationPlaceholder:
        "Z.B.: Ich bin spezialisiert auf Kategorie B mit 10 Jahren Erfahrung - Nachmittags-Verfügbarkeiten kompatibel mit Schüler - Derzeit nur 8 Schüler",
      proposedSchedule: "Vorgeschlagene Verfügbarkeit",
      longTermCommitment: "Mindestengagement",
      sendProposal: "Vorschlag senden",
      validateProposals: "Vorschläge validieren",
      pendingProposals: "Ausstehende Vorschläge",
      approvedThisWeek: "Diese Woche genehmigt",
      rejectedThisWeek: "Abgelehnt",
      acceptanceRate: "Akzeptanzrate",
      proposingInstructor: "Vorschlagender Fahrlehrer",
      concernedStudent: "Betroffener Schüler",
      motivationPreview: "Begründung",
      workloadComparison: "Lastvergleich",
      proposalScore: "Vorschlags-Score",
      approve: "Genehmigen",
      reject: "Ablehnen",
      postpone: "Verschieben",
      rejectionReason: "Ablehnungsgrund",
      rejectionReasonPlaceholder:
        "Erklären Sie, warum dieser Vorschlag abgelehnt wird",
      compatibilityScore: "{percent}% kompatibel",
      currentVsProposed:
        "Aktuell: {current} Schüler {currentHours}h/Woche vs Vorgeschlagen: {proposed} Schüler {proposedHours}h/Woche",
    },
  },
  it: {
    title: "Gestione assegnazioni",
    assignInstructor: "Assegnare istruttore",
    assignTo: "Assegnare a",
    recommendations: "Raccomandazioni automatiche",
    recommendationsSubtitle: "Ordinati per carico di lavoro crescente",
    manualSearch: "Ricerca manuale",
    confirmAssignment: "Confermare assegnazione",
    confirmMessage: "Assegnare {student} a {instructor}?",
    warningMessage:
      "Questa assegnazione è quasi definitiva - Solo la scuola può modificare",
    reason: "Motivo dell'assegnazione",
    reasonPlaceholder: "Es: Categoria B - Disponibilità compatibili",
    notifyInstructor: "Notificare istruttore via email/SMS",
    notifyStudent: "Notificare allievo",
    confirm: "Confermare assegnazione",
    cancel: "Annullare",
    activeStudents: "Allievi attivi",
    weeklyHours: "Ore/settimana",
    availabilityScore: "Punteggio disponibilità",
    categories: "Categorie",
    languages: "Lingue",
    rating: "Valutazioni",
    distance: "Distanza",
    viewProfile: "Vedere profilo completo",
    assignThisInstructor: "Assegnare questo istruttore",
    filters: {
      availableOnly: "Solo disponibili",
      sortBy: "Ordinare per",
      sortScore: "Punteggio decrescente",
      sortAlpha: "Alfabetico",
      sortWorkload: "Meno caricati",
      sortRating: "Meglio valutati",
    },
    stats: {
      total: "Totale assegnazioni",
      saturated: "Istruttori saturi",
      unassigned: "Allievi non assegnati",
      pending: "Richieste riassegnazione",
    },
    status: {
      Active: "Attiva",
      "En attente": "In attesa",
      Archivée: "Archiviata",
    },
    actions: {
      viewDetail: "Vedere dettaglio",
      modify: "Modificare assegnazione",
      history: "Storico",
      archive: "Archiviare",
      reassignBatch: "Riassegnare selezione",
    },
    workload: {
      title: "Distribuzione del carico",
      instructor: "Istruttore",
      workload: "Carico",
      availability: "Disponibilità",
    },
    reassignment: {
      title: "Riassegnare allievo",
      currentAssignment: "Assegnazione attuale",
      assignedSince: "Assegnato il {date} ({days} giorni)",
      completedLessons: "Lezioni effettuate",
      totalHours: "Ore totali",
      progress: "Progressione",
      programCompleted: "{percent}% programma completato",
      instructorRating: "Valutazioni istruttore",
      initialReason: "Motivo assegnazione iniziale",
      removeAssignment: "Rimuovere assegnazione",
      selectNewInstructor: "Selezionare nuovo istruttore",
      warningOverloaded:
        "⚠️ Questo istruttore ha già {count} allievi (raccomandato max 12)",
      reassignmentReason: "Motivo riassegnazione",
      reassignmentReasonPlaceholder:
        "Es: Incompatibilità orari - Richiesta allievo genitore - Istruttore non disponibile lungo periodo",
      confirmReassignment: "Confermare riassegnazione",
      warningMessage:
        "Azione sensibile - Notifica automatica istruttore attuale + nuovo istruttore + allievo",
      steps: {
        selectInstructor: "Selezione istruttore",
        justification: "Giustificazione",
        notifications: "Notifiche",
        confirmation: "Conferma",
      },
      notifications: {
        notifyCurrentInstructor: "Notificare istruttore attuale",
        notifyNewInstructor: "Notificare nuovo istruttore",
        notifyStudent: "Notificare allievo",
        notifyParents: "Notificare genitori (se minorenne)",
      },
    },
    temporaryAccess: {
      title: "Accessi temporanei",
      authorize: "Autorizzare altro istruttore",
      infoMessage:
        "L'allievo rimane assegnato al suo istruttore principale - Questa è un'autorizzazione puntuale per lezioni specifiche",
      useCases: "Casi d'uso",
      useCasesList: [
        "Istruttore principale assente (vacanze, malattia, congedo)",
        "Categoria aggiuntiva (allievo vuole imparare moto)",
        "Lezione recupero (altro istruttore disponibile)",
        "Formazione specializzata (expertise manovre specifiche)",
        "Esame simulato (simulare condizioni reali)",
      ],

      selectTemporaryInstructor: "Istruttore autorizzato",
      configuration: "Configurazione autorizzazione",
      period: "Periodo validità",
      maxLessons: "Massimo lezioni",
      authorizedCategories: "Categorie autorizzate",
      reason: "Motivo",
      reasonPlaceholder:
        "Es: Istruttore principale in vacanza - Sostituzione temporanea",
      allowDirectBooking: "Autorizzare prenotazione diretta",
      notifyPrimaryInstructor: "Notificare istruttore principale",
      notifyTemporaryInstructor: "Notificare istruttore temporaneo",
      notifyStudent: "Notificare allievo",
      activeAuthorizations: "Autorizzazioni attive",
      primaryInstructor: "Istruttore principale",
      temporaryInstructor: "Istruttore temporaneo",
      validity: "Periodo",
      lessonsCompleted: "Lezioni effettuate",
      extend: "Prolungare",
      revoke: "Revocare",
      history: "Storico",
      revocationReason: "Motivo revoca",
      revocationReasonPlaceholder:
        "Spiegate perché questa autorizzazione è revocata prematuramente",
      temporaryStudents: "Allievi temporanei",
      temporaryStudentsInfo:
        "Questi allievi hanno un istruttore principale - La vostra autorizzazione è limitata nel tempo",
      expiresIn: "Scade tra {days} giorni",
      remainingLessons: "Lezioni rimanenti",
      requestExtension: "Richiedere estensione",
      viewPlanning: "Vedere pianificazione",
      bookLesson: "Prenotare lezione",
    },
    assignmentHistory: {
      title: "Storico assegnazioni",
      timeline: "Cronologia",
      assignedTo: "Assegnato a {instructor}",
      reassignedTo: "Riassegnato a {instructor}",
      temporaryAccessGranted: "Accesso temporaneo concesso a {instructor}",
      accessRevoked: "Accesso revocato",
      performedBy: "Da",
      previousInstructor: "Istruttore precedente",
      newInstructor: "Nuovo istruttore",
      statusAtTime: "Stato",
      duration: "Durata",
      instructorWorkload: "Carico istruttore",
      analytics: "Statistiche",
      assignmentsPerMonth: "Assegnazioni per mese",
      topInstructors: "Istruttori più assegnati",
      reassignmentReasons: "Motivi riassegnazione",
      metrics: {
        averageDuration: "Durata media assegnazione",
        reassignmentRate: "Tasso riassegnazione",
        satisfactionAfterAssignment: "Soddisfazione dopo assegnazione",
        satisfactionAfterReassignment: "Soddisfazione dopo riassegnazione",
        timeToAssignment: "Tempo per assegnazione",
      },
      days: "giorni",
      hours: "ore",
      students: "allievi",
    },
    proposals: {
      title: "Proposte istruttori",
      myProposals: "Le mie proposte",
      proposeStudent: "Proporre di prendere un allievo",
      infoMessage:
        "Le vostre proposte richiedono validazione scuola prima dell'assegnazione ufficiale",
      availableStudents: "Allievi cercano istruttore",
      studentLevel: "Livello progressione",
      currentInstructor: "Istruttore attuale",
      overloaded: "saturo",
      preferredSchedule: "Preferenza orari",
      geographicZone: "Zona geografica",
      proposeToTake: "Proporre presa in carico",
      proposalFor: "Proposta per {student}",
      motivation: "Motivazione",
      motivationPlaceholder:
        "Es: Sono specializzato categoria B con 10 anni esperienza - Disponibilità pomeriggio compatibili allievo - Attualmente 8 allievi solamente",
      proposedSchedule: "Disponibilità proposta",
      longTermCommitment: "Impegno minimo",
      sendProposal: "Inviare proposta",
      validateProposals: "Validare proposte",
      pendingProposals: "Proposte in attesa",
      approvedThisWeek: "Approvate questa settimana",
      rejectedThisWeek: "Rifiutate",
      acceptanceRate: "Tasso accettazione",
      proposingInstructor: "Istruttore proponente",
      concernedStudent: "Allievo interessato",
      motivationPreview: "Motivazione",
      workloadComparison: "Confronto carico",
      proposalScore: "Punteggio proposta",
      approve: "Approvare",
      reject: "Rifiutare",
      postpone: "Rinviare",
      rejectionReason: "Motivo del rifiuto",
      rejectionReasonPlaceholder: "Spiegate perché questa proposta è rifiutata",
      compatibilityScore: "{percent}% compatibile",
      currentVsProposed:
        "Attuale: {current} allievi {currentHours}h/settimana vs Proponente: {proposed} allievi {proposedHours}h/settimana",
    },
  },
  en: {
    title: "Assignment Management",
    assignInstructor: "Assign Instructor",
    assignTo: "Assign to",
    recommendations: "Automatic Recommendations",
    recommendationsSubtitle: "Sorted by increasing workload",
    manualSearch: "Manual Search",
    confirmAssignment: "Confirm Assignment",
    confirmMessage: "Assign {student} to {instructor}?",
    warningMessage: "This assignment is quasi-final - Only school can modify",
    reason: "Assignment Reason",
    reasonPlaceholder: "Ex: Category B - Compatible availabilities",
    notifyInstructor: "Notify instructor by email/SMS",
    notifyStudent: "Notify student",
    confirm: "Confirm Assignment",
    cancel: "Cancel",
    activeStudents: "Active Students",
    weeklyHours: "Hours/week",
    availabilityScore: "Availability Score",
    categories: "Categories",
    languages: "Languages",
    rating: "Ratings",
    distance: "Distance",
    viewProfile: "View Full Profile",
    assignThisInstructor: "Assign This Instructor",
    filters: {
      availableOnly: "Available Only",
      sortBy: "Sort By",
      sortScore: "Score Descending",
      sortAlpha: "Alphabetical",
      sortWorkload: "Less Loaded",
      sortRating: "Better Rated",
    },
    stats: {
      total: "Total Assignments",
      saturated: "Saturated Instructors",
      unassigned: "Unassigned Students",
      pending: "Pending Reassignments",
    },
    status: {
      Active: "Active",
      "En attente": "Pending",
      Archivée: "Archived",
    },
    actions: {
      viewDetail: "View Detail",
      modify: "Modify Assignment",
      history: "History",
      archive: "Archive",
      reassignBatch: "Reassign Selection",
    },
    workload: {
      title: "Workload Distribution",
      instructor: "Instructor",
      workload: "Workload",
      availability: "Availability",
    },
    reassignment: {
      title: "Reassign Student",
      currentAssignment: "Current Assignment",
      assignedSince: "Assigned on {date} ({days} days)",
      completedLessons: "Completed Lessons",
      totalHours: "Total Hours",
      progress: "Progress",
      programCompleted: "{percent}% program completed",
      instructorRating: "Instructor Ratings",
      initialReason: "Initial Assignment Reason",
      removeAssignment: "Remove Assignment",
      selectNewInstructor: "Select New Instructor",
      warningOverloaded:
        "⚠️ This instructor already has {count} students (recommended max 12)",
      reassignmentReason: "Reassignment Reason",
      reassignmentReasonPlaceholder:
        "Ex: Schedule incompatibility - Student parent request - Instructor unavailable long term",
      confirmReassignment: "Confirm Reassignment",
      warningMessage:
        "Sensitive action - Automatic notification current instructor + new instructor + student",
      steps: {
        selectInstructor: "Instructor Selection",
        justification: "Justification",
        notifications: "Notifications",
        confirmation: "Confirmation",
      },
      notifications: {
        notifyCurrentInstructor: "Notify current instructor",
        notifyNewInstructor: "Notify new instructor",
        notifyStudent: "Notify student",
        notifyParents: "Notify parents (if minor)",
      },
    },
    temporaryAccess: {
      title: "Temporary Access",
      authorize: "Authorize Another Instructor",
      infoMessage:
        "The student remains assigned to their primary instructor - This is a one-time authorization for specific lessons",
      useCases: "Use Cases",
      useCasesList: [
        "Primary instructor absent (vacation, illness, leave)",
        "Additional category (student wants to learn motorcycle)",
        "Makeup lesson (another instructor available)",
        "Specialized training (expertise specific maneuvers)",
        "Mock exam (simulate real conditions)",
      ],

      selectTemporaryInstructor: "Authorized Instructor",
      configuration: "Authorization Configuration",
      period: "Validity Period",
      maxLessons: "Maximum Lessons",
      authorizedCategories: "Authorized Categories",
      reason: "Reason",
      reasonPlaceholder:
        "Ex: Primary instructor on vacation - Temporary replacement",
      allowDirectBooking: "Allow Direct Booking",
      notifyPrimaryInstructor: "Notify Primary Instructor",
      notifyTemporaryInstructor: "Notify Temporary Instructor",
      notifyStudent: "Notify Student",
      activeAuthorizations: "Active Authorizations",
      primaryInstructor: "Primary Instructor",
      temporaryInstructor: "Temporary Instructor",
      validity: "Period",
      lessonsCompleted: "Lessons Completed",
      extend: "Extend",
      revoke: "Revoke",
      history: "History",
      revocationReason: "Revocation Reason",
      revocationReasonPlaceholder:
        "Explain why this authorization is being revoked prematurely",
      temporaryStudents: "Temporary Students",
      temporaryStudentsInfo:
        "These students have a primary instructor - Your authorization is time-limited",
      expiresIn: "Expires in {days} days",
      remainingLessons: "Remaining Lessons",
      requestExtension: "Request Extension",
      viewPlanning: "View Planning",
      bookLesson: "Book Lesson",
    },
    assignmentHistory: {
      title: "Assignment History",
      timeline: "Timeline",
      assignedTo: "Assigned to {instructor}",
      reassignedTo: "Reassigned to {instructor}",
      temporaryAccessGranted: "Temporary access granted to {instructor}",
      accessRevoked: "Access revoked",
      performedBy: "By",
      previousInstructor: "Previous Instructor",
      newInstructor: "New Instructor",
      statusAtTime: "Status",
      duration: "Duration",
      instructorWorkload: "Instructor Workload",
      analytics: "Analytics",
      assignmentsPerMonth: "Assignments per Month",
      topInstructors: "Most Assigned Instructors",
      reassignmentReasons: "Reassignment Reasons",
      metrics: {
        averageDuration: "Average Assignment Duration",
        reassignmentRate: "Reassignment Rate",
        satisfactionAfterAssignment: "Satisfaction After Assignment",
        satisfactionAfterReassignment: "Satisfaction After Reassignment",
        timeToAssignment: "Time to Assignment",
      },
      days: "days",
      hours: "hours",
      students: "students",
    },
    proposals: {
      title: "Instructor Proposals",
      myProposals: "My Proposals",
      proposeStudent: "Propose to take a student",
      infoMessage:
        "Your proposals require school validation before official assignment",
      availableStudents: "Students seeking instructor",
      studentLevel: "Progress Level",
      currentInstructor: "Current Instructor",
      overloaded: "overloaded",
      preferredSchedule: "Schedule Preference",
      geographicZone: "Geographic Zone",
      proposeToTake: "Propose to take",
      proposalFor: "Proposal for {student}",
      motivation: "Motivation",
      motivationPlaceholder:
        "Ex: I am specialized in category B with 10 years experience - Afternoon availabilities compatible with student - Currently only 8 students",
      proposedSchedule: "Proposed Availability",
      longTermCommitment: "Minimum Commitment",
      sendProposal: "Send Proposal",
      validateProposals: "Validate Proposals",
      pendingProposals: "Pending Proposals",
      approvedThisWeek: "Approved This Week",
      rejectedThisWeek: "Rejected",
      acceptanceRate: "Acceptance Rate",
      proposingInstructor: "Proposing Instructor",
      concernedStudent: "Concerned Student",
      motivationPreview: "Motivation",
      workloadComparison: "Workload Comparison",
      proposalScore: "Proposal Score",
      approve: "Approve",
      reject: "Reject",
      postpone: "Postpone",
      rejectionReason: "Rejection Reason",
      rejectionReasonPlaceholder: "Explain why this proposal is rejected",
      compatibilityScore: "{percent}% compatible",
      currentVsProposed:
        "Current: {current} students {currentHours}h/week vs Proposed: {proposed} students {proposedHours}h/week",
    },
  },
} as const;

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_INSTRUCTORS_WORKLOAD: InstructorWorkload[] = [
  {
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    activeStudents: 8,
    maxCapacity: 15,
    weeklyHours: 24,
    availableHours: 40,
    categories: ["B", "BE"],
    languages: ["fr", "en"],
    rating: 4.8,
    location: {
      lat: 46.5197,
      lng: 6.6323,
      city: "Lausanne",
    },
    availabilityScore: 85,
  },
  {
    instructorId: "inst-2",
    instructorName: "Sophie Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    activeStudents: 12,
    maxCapacity: 15,
    weeklyHours: 32,
    availableHours: 40,
    categories: ["A", "A1"],
    languages: ["fr", "de"],
    rating: 4.9,
    location: {
      lat: 46.2044,
      lng: 6.1432,
      city: "Genève",
    },
    availabilityScore: 70,
  },
  {
    instructorId: "inst-3",
    instructorName: "Thomas Müller",
    instructorAvatar: "https://github.com/yahyabedirhan.png",
    activeStudents: 15,
    maxCapacity: 15,
    weeklyHours: 38,
    availableHours: 40,
    categories: ["B", "A", "BE"],
    languages: ["de", "en"],
    rating: 4.6,
    location: {
      lat: 47.3769,
      lng: 8.5417,
      city: "Zürich",
    },
    availabilityScore: 55,
  },
  {
    instructorId: "inst-4",
    instructorName: "Laura Rossi",
    activeStudents: 10,
    maxCapacity: 15,
    weeklyHours: 28,
    availableHours: 40,
    categories: ["B"],
    languages: ["it", "fr"],
    rating: 4.7,
    location: {
      lat: 46.0037,
      lng: 8.9511,
      city: "Lugano",
    },
    availabilityScore: 75,
  },
  {
    instructorId: "inst-5",
    instructorName: "Pierre Favre",
    instructorAvatar: "https://github.com/denizbuyuktas.png",
    activeStudents: 6,
    maxCapacity: 15,
    weeklyHours: 20,
    availableHours: 40,
    categories: ["B", "A"],
    languages: ["fr"],
    rating: 4.8,
    location: {
      lat: 46.5197,
      lng: 6.6323,
      city: "Lausanne",
    },
    availabilityScore: 90,
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "assign-1",
    studentId: "std-1",
    studentName: "Lucas Müller",
    studentAvatar: "https://github.com/yusufhilmi.png",
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    category: "B",
    status: "Active",
    assignedDate: "2024-09-01T00:00:00Z",
    completedHours: 12,
    totalHours: 20,
    nextLesson: "2025-01-15T10:00:00Z",
    reason: "Catégorie B - Disponibilités compatibles",
  },
  {
    id: "assign-2",
    studentId: "std-2",
    studentName: "Emma Schmidt",
    studentAvatar: "https://github.com/kdrnp.png",
    instructorId: "inst-2",
    instructorName: "Sophie Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    category: "A",
    status: "Active",
    assignedDate: "2024-10-15T00:00:00Z",
    completedHours: 8,
    totalHours: 20,
    nextLesson: "2025-01-14T14:00:00Z",
    reason: "Catégorie A - Préférence moto",
  },
  {
    id: "assign-3",
    studentId: "std-3",
    studentName: "Noah Weber",
    instructorId: "inst-3",
    instructorName: "Thomas Müller",
    instructorAvatar: "https://github.com/yahyabedirhan.png",
    category: "B",
    status: "En attente",
    assignedDate: "2024-08-20T00:00:00Z",
    completedHours: 6,
    totalHours: 20,
    nextLesson: null,
    reason: "Catégorie B - Réattribution demandée",
  },
];

export const MOCK_ASSIGNMENT_STATS: AssignmentStats = {
  totalAssignments: 45,
  activeAssignments: 38,
  saturatedInstructors: 2,
  unassignedStudents: 5,
  pendingReassignments: 3,
};

export const MOCK_WORKLOAD_DISTRIBUTION: WorkloadDistribution[] = [
  {
    instructorName: "Marc Dubois",
    categoryB: 6,
    categoryA: 0,
    categoryBE: 2,
    categoryA1: 0,
    total: 8,
  },
  {
    instructorName: "Sophie Martin",
    categoryB: 0,
    categoryA: 8,
    categoryBE: 0,
    categoryA1: 4,
    total: 12,
  },
  {
    instructorName: "Thomas Müller",
    categoryB: 10,
    categoryA: 3,
    categoryBE: 2,
    categoryA1: 0,
    total: 15,
  },
  {
    instructorName: "Laura Rossi",
    categoryB: 10,
    categoryA: 0,
    categoryBE: 0,
    categoryA1: 0,
    total: 10,
  },
  {
    instructorName: "Pierre Favre",
    categoryB: 4,
    categoryA: 2,
    categoryBE: 0,
    categoryA1: 0,
    total: 6,
  },
];

export const MOCK_ASSIGNMENT_DETAILS: AssignmentDetail[] = [
  {
    id: "assign-1",
    studentId: "std-1",
    studentName: "Lucas Müller",
    studentAvatar: "https://github.com/yusufhilmi.png",
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    category: "B",
    status: "Active",
    assignedDate: "2024-09-01T00:00:00Z",
    completedHours: 18,
    totalHours: 20,
    nextLesson: "2025-01-15T10:00:00Z",
    reason: "Catégorie B - Disponibilités compatibles",
    assignedDays: 135,
    completedLessons: 12,
    instructorRating: 4.5,
    progressPercentage: 60,
    initialReason: "Catégorie B compatible - Bonne disponibilité",
  },
];

export const MOCK_INSTRUCTOR_PROPOSALS: InstructorProposal[] = [
  {
    id: "prop-1",
    instructorId: "inst-5",
    instructorName: "Pierre Favre",
    instructorAvatar: "https://github.com/denizbuyuktas.png",
    studentId: "std-4",
    studentName: "Emma Dubois",
    studentAvatar: "https://github.com/kdrnp.png",
    currentInstructorId: "inst-3",
    currentInstructorName: "Thomas Müller",
    motivation:
      "Je suis spécialisé catégorie B avec 10 ans d'expérience. Mes disponibilités après-midi sont parfaitement compatibles avec les préférences de l'élève. J'ai actuellement seulement 6 élèves, ce qui me permet d'offrir un suivi personnalisé de qualité. Ma localisation à Lausanne facilite les déplacements.",
    proposedSchedule: ["Lundi 14h-18h", "Mercredi 14h-18h", "Samedi 9h-12h"],
    longTermCommitment: true,
    status: "Pending",
    createdAt: "2025-01-13T10:30:00Z",
    compatibilityScore: 85,
  },
  {
    id: "prop-2",
    instructorId: "inst-4",
    instructorName: "Laura Rossi",
    studentId: "std-5",
    studentName: "Noah Weber",
    motivation:
      "Excellente expérience avec élèves débutants. Bilingue français-italien, idéal pour cet élève. Disponibilités flexibles et méthode pédagogique adaptée.",
    proposedSchedule: ["Mardi 16h-19h", "Jeudi 16h-19h"],
    longTermCommitment: true,
    status: "Pending",
    createdAt: "2025-01-12T14:20:00Z",
    compatibilityScore: 78,
  },
  {
    id: "prop-3",
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    studentId: "std-6",
    studentName: "Sophie Martin",
    currentInstructorId: "inst-2",
    currentInstructorName: "Sophie Martin",
    motivation:
      "Catégorie BE spécialisée. Expérience 15 ans avec remorques. Disponibilités week-end parfaites pour cet élève.",
    proposedSchedule: ["Samedi 8h-12h", "Dimanche 8h-12h"],
    longTermCommitment: false,
    status: "Approved",
    createdAt: "2025-01-10T09:00:00Z",
    processedAt: "2025-01-11T15:30:00Z",
    processedBy: "admin-1",
    compatibilityScore: 92,
  },
  {
    id: "prop-4",
    instructorId: "inst-2",
    instructorName: "Sophie Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    studentId: "std-7",
    studentName: "Lucas Favre",
    motivation:
      "Spécialisation moto catégorie A. Cependant, charge actuelle déjà élevée (12 élèves).",
    proposedSchedule: ["Vendredi 14h-17h"],
    longTermCommitment: true,
    status: "Rejected",
    createdAt: "2025-01-09T11:00:00Z",
    processedAt: "2025-01-10T10:00:00Z",
    processedBy: "admin-1",
    rejectionReason:
      "Moniteur déjà saturé avec 12 élèves actifs. Nous privilégions une répartition équilibrée de la charge de travail.",
    compatibilityScore: 65,
  },
];

export const MOCK_PROPOSAL_STATS: ProposalStats = {
  pending: 8,
  approvedThisWeek: 3,
  rejectedThisWeek: 1,
  acceptanceRate: 75,
};

export const MOCK_AVAILABLE_STUDENTS = [
  {
    id: "std-unassigned-1",
    name: "Emma Dubois",
    avatar: "https://github.com/kdrnp.png",
    category: "B" as StudentCategory,
    level: "Débutant",
    progressPercentage: 5,
    currentInstructor: null,
    preferredSchedule: "Après-midis + samedis",
    geographicZone: "Genève centre",
  },
  {
    id: "std-unassigned-2",
    name: "Noah Weber",
    category: "B" as StudentCategory,
    level: "Intermédiaire",
    progressPercentage: 35,
    currentInstructor: {
      id: "inst-3",
      name: "Thomas Müller",
      avatar: "https://github.com/yahyabedirhan.png",
      overloaded: true,
    },
    preferredSchedule: "Soirées en semaine",
    geographicZone: "Zürich",
  },
  {
    id: "std-unassigned-3",
    name: "Sophie Martin",
    category: "BE" as StudentCategory,
    level: "Avancé",
    progressPercentage: 75,
    currentInstructor: null,
    preferredSchedule: "Week-ends",
    geographicZone: "Lausanne",
  },
];

export const MOCK_WORKLOAD_COMPARISONS: Record<string, WorkloadComparison> = {
  "prop-1": {
    current: {
      activeStudents: 15,
      weeklyHours: 38,
    },
    proposed: {
      activeStudents: 6,
      weeklyHours: 20,
    },
  },
  "prop-2": {
    current: {
      activeStudents: 0,
      weeklyHours: 0,
    },
    proposed: {
      activeStudents: 10,
      weeklyHours: 28,
    },
  },
};

export const MOCK_TEMPORARY_ACCESS: TemporaryAccess[] = [
  {
    id: "temp-1",
    studentId: "std-1",
    studentName: "Lucas Müller",
    studentAvatar: "https://github.com/yusufhilmi.png",
    primaryInstructorId: "inst-1",
    primaryInstructorName: "Marc Dubois",
    primaryInstructorAvatar: "https://github.com/yusufhilmi.png",
    temporaryInstructorId: "inst-5",
    temporaryInstructorName: "Pierre Favre",
    temporaryInstructorAvatar: "https://github.com/denizbuyuktas.png",
    startDate: "2025-01-20T00:00:00Z",
    endDate: "2025-01-27T00:00:00Z",
    maxLessons: 3,
    completedLessons: 1,
    authorizedCategories: ["B"],
    reason: "Moniteur principal en vacances - Remplacement temporaire",
    allowDirectBooking: true,
    status: "Active",
    createdAt: "2025-01-15T10:00:00Z",
    createdBy: "admin-1",
  },
  {
    id: "temp-2",
    studentId: "std-2",
    studentName: "Emma Schmidt",
    studentAvatar: "https://github.com/kdrnp.png",
    primaryInstructorId: "inst-2",
    primaryInstructorName: "Sophie Martin",
    primaryInstructorAvatar: "https://github.com/kdrnp.png",
    temporaryInstructorId: "inst-3",
    temporaryInstructorName: "Thomas Müller",
    temporaryInstructorAvatar: "https://github.com/yahyabedirhan.png",
    startDate: "2025-01-10T00:00:00Z",
    endDate: "2025-01-17T00:00:00Z",
    maxLessons: 2,
    completedLessons: 2,
    authorizedCategories: ["B"],
    reason: "Catégorie additionnelle - Formation remorque BE",
    allowDirectBooking: false,
    status: "Expired",
    createdAt: "2025-01-08T14:00:00Z",
    createdBy: "admin-1",
  },
  {
    id: "temp-3",
    studentId: "std-3",
    studentName: "Noah Weber",
    primaryInstructorId: "inst-3",
    primaryInstructorName: "Thomas Müller",
    primaryInstructorAvatar: "https://github.com/yahyabedirhan.png",
    temporaryInstructorId: "inst-4",
    temporaryInstructorName: "Laura Rossi",
    startDate: "2025-01-12T00:00:00Z",
    endDate: "2025-01-19T00:00:00Z",
    maxLessons: 5,
    completedLessons: 2,
    authorizedCategories: ["B"],
    reason: "Moniteur principal indisponible - Maladie de courte durée",
    allowDirectBooking: true,
    status: "Revoked",
    createdAt: "2025-01-11T09:00:00Z",
    createdBy: "admin-1",
    revokedAt: "2025-01-14T16:00:00Z",
    revokedBy: "admin-1",
    revocationReason: "Moniteur principal de retour plus tôt que prévu",
  },
];

export const MOCK_TEMPORARY_STUDENTS: TemporaryStudent[] = [
  {
    id: "temp-std-1",
    studentId: "std-1",
    studentName: "Lucas Müller",
    studentAvatar: "https://github.com/yusufhilmi.png",
    primaryInstructorId: "inst-1",
    primaryInstructorName: "Marc Dubois",
    primaryInstructorAvatar: "https://github.com/yusufhilmi.png",
    startDate: "2025-01-20T00:00:00Z",
    endDate: "2025-01-27T00:00:00Z",
    remainingLessons: 2,
    maxLessons: 3,
    authorizedCategories: ["B"],
    reason: "Moniteur principal en vacances - Remplacement temporaire",
    allowDirectBooking: true,
  },
  {
    id: "temp-std-2",
    studentId: "std-4",
    studentName: "Sophie Dubois",
    primaryInstructorId: "inst-2",
    primaryInstructorName: "Sophie Martin",
    primaryInstructorAvatar: "https://github.com/kdrnp.png",
    startDate: "2025-01-18T00:00:00Z",
    endDate: "2025-01-25T00:00:00Z",
    remainingLessons: 1,
    maxLessons: 2,
    authorizedCategories: ["A"],
    reason: "Formation spécialisée moto - Expertise conduite sportive",
    allowDirectBooking: false,
  },
];

export const MOCK_ASSIGNMENT_HISTORY: AssignmentHistoryEvent[] = [
  {
    id: "hist-1",
    type: "assignment",
    studentId: "std-1",
    studentName: "Lucas Müller",
    timestamp: "2024-09-01T14:32:00Z",
    performedBy: "admin-1",
    performedByName: "Admin Principal",
    newInstructorId: "inst-1",
    newInstructorName: "Marc Dubois",
    reason: "Catégorie B compatible - Bonne disponibilité",
    status: "Active",
    metadata: {
      instructorStudentCount: 7,
      instructorWeeklyHours: 22,
    },
  },
  {
    id: "hist-2",
    type: "temporary_access",
    studentId: "std-1",
    studentName: "Lucas Müller",
    timestamp: "2025-01-15T10:00:00Z",
    performedBy: "admin-1",
    performedByName: "Admin Principal",
    newInstructorId: "inst-5",
    newInstructorName: "Pierre Favre",
    reason: "Moniteur principal en vacances - Remplacement temporaire",
    duration: 7,
    metadata: {
      instructorStudentCount: 6,
      instructorWeeklyHours: 20,
    },
  },
  {
    id: "hist-3",
    type: "reassignment",
    studentId: "std-3",
    studentName: "Noah Weber",
    timestamp: "2024-12-10T11:20:00Z",
    performedBy: "admin-1",
    performedByName: "Admin Principal",
    previousInstructorId: "inst-2",
    previousInstructorName: "Sophie Martin",
    newInstructorId: "inst-3",
    newInstructorName: "Thomas Müller",
    reason: "Incompatibilité horaires - Demande élève",
    status: "Active",
    metadata: {
      instructorStudentCount: 14,
      instructorWeeklyHours: 36,
    },
  },
  {
    id: "hist-4",
    type: "temporary_access",
    studentId: "std-2",
    studentName: "Emma Schmidt",
    timestamp: "2025-01-08T14:00:00Z",
    performedBy: "admin-1",
    performedByName: "Admin Principal",
    newInstructorId: "inst-3",
    newInstructorName: "Thomas Müller",
    reason: "Catégorie additionnelle - Formation remorque BE",
    duration: 7,
    metadata: {
      instructorStudentCount: 15,
      instructorWeeklyHours: 38,
    },
  },
  {
    id: "hist-5",
    type: "revocation",
    studentId: "std-3",
    studentName: "Noah Weber",
    timestamp: "2025-01-14T16:00:00Z",
    performedBy: "admin-1",
    performedByName: "Admin Principal",
    previousInstructorId: "inst-4",
    previousInstructorName: "Laura Rossi",
    reason: "Moniteur principal de retour plus tôt que prévu",
    metadata: {},
  },
];

export const MOCK_ASSIGNMENT_ANALYTICS: AssignmentAnalytics = {
  assignmentsPerMonth: [
    { month: "2024-07", count: 8 },
    { month: "2024-08", count: 12 },
    { month: "2024-09", count: 15 },
    { month: "2024-10", count: 10 },
    { month: "2024-11", count: 7 },
    { month: "2024-12", count: 9 },
    { month: "2025-01", count: 11 },
  ],

  topInstructors: [
    { instructorName: "Marc Dubois", assignmentCount: 18 },
    { instructorName: "Thomas Müller", assignmentCount: 15 },
    { instructorName: "Sophie Martin", assignmentCount: 12 },
    { instructorName: "Laura Rossi", assignmentCount: 10 },
    { instructorName: "Pierre Favre", assignmentCount: 8 },
  ],

  reassignmentReasons: [
    { reason: "Horaires", percentage: 40, count: 12 },
    { reason: "Indisponibilité", percentage: 25, count: 8 },
    { reason: "Demande élève", percentage: 20, count: 6 },
    { reason: "Qualité", percentage: 10, count: 3 },
    { reason: "Autre", percentage: 5, count: 1 },
  ],

  metrics: {
    averageDuration: 156,
    reassignmentRate: 8,
    studentSatisfactionAfterAssignment: 8.2,
    studentSatisfactionAfterReassignment: 7.8,
    medianTimeToAssignment: 4,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getStatusColor(
  status: AssignmentStatus
): "default" | "secondary" | "destructive" {
  switch (status) {
    case "Active":
      return "default";
    case "En attente":
      return "secondary";
    case "Archivée":
      return "destructive";
  }
}

export function getUtilizationColor(percentage: number): string {
  if (percentage >= 80) return "hsl(0 84.2% 60.2%)"; // red
  if (percentage >= 60) return "hsl(43 74% 66%)"; // orange
  return "hsl(173 58% 39%)"; // green
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "hsl(173 58% 39%)"; // green
  if (score >= 60) return "hsl(43 74% 66%)"; // orange
  return "hsl(0 84.2% 60.2%)"; // red
}

export function formatDistance(km: number, locale: AssignmentLocale): string {
  return `${km.toFixed(1)} km`;
}

export function getLanguageFlag(langCode: string): string {
  const flags: Record<string, string> = {
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    en: "🇬🇧",
  };
  return flags[langCode] || "🌐";
}

export function getProposalStatusColor(
  status: ProposalStatus
): "default" | "secondary" | "destructive" {
  switch (status) {
    case "Pending":
      return "secondary";
    case "Approved":
      return "default";
    case "Rejected":
      return "destructive";
    case "Expired":
      return "destructive";
  }
}

export function calculateDaysSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatRelativeTime(
  dateString: string,
  locale: AssignmentLocale
): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return locale === "fr"
      ? "Il y a quelques minutes"
      : locale === "de"
        ? "Vor ein paar Minuten"
        : locale === "it"
          ? "Pochi minuti fa"
          : "A few minutes ago";
  }
  if (diffHours < 24) {
    return locale === "fr"
      ? `Il y a ${diffHours}h`
      : locale === "de"
        ? `Vor ${diffHours}h`
        : locale === "it"
          ? `${diffHours}h fa`
          : `${diffHours}h ago`;
  }
  return locale === "fr"
    ? `Il y a ${diffDays}j`
    : locale === "de"
      ? `Vor ${diffDays}T`
      : locale === "it"
        ? `${diffDays}g fa`
        : `${diffDays}d ago`;
}
