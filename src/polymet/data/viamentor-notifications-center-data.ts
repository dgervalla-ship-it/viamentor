/**
 * VIAMENTOR - Notifications Center Data
 * Types, mock data et helpers pour le centre de notifications
 */

import {
  BellIcon,
  CalendarIcon,
  DollarSignIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
  UserPlusIcon,
  XCircleIcon,
  CheckCircleIcon,
  FileTextIcon,
  StarIcon,
  SettingsIcon,
  ClockIcon,
  ClipboardIcon,
  MapPinIcon,
  TrendingUpIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "system";
export type NotificationCategory =
  | "students"
  | "lessons"
  | "payments"
  | "messages"
  | "system"
  | "exams"
  | "reviews"
  | "documents";
export type NotificationPriority = "high" | "normal" | "low";
export type NotificationStatus = "unread" | "read" | "archived";
export type NotificationsLocale = "fr" | "de" | "it" | "en";

export interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  description: string;
  content?: string;
  timestamp: Date;
  from?: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  to?: string;
  relatedEntity?: {
    type: "student" | "lesson" | "invoice" | "message" | "exam" | "review";
    id: string;
    label: string;
    url: string;
  };
  actions?: NotificationAction[];
  hasAttachment?: boolean;
  metadata?: Record<string, any>;
}

export interface NotificationAction {
  id: string;
  label: string;
  variant: "primary" | "secondary" | "ghost";
  url?: string;
  onClick?: () => void;
}

export interface NotificationFilters {
  types: NotificationType[];
  categories: NotificationCategory[];
  priority?: NotificationPriority;
  dateRange?: { from: Date; to: Date };
  sender?: string;
  hasAttachment?: boolean;
  status?: NotificationStatus[];
}

// ============================================================================
// I18N TRANSLATIONS
// ============================================================================

export const notificationsCenterTranslations = {
  fr: {
    title: "Centre de notifications",
    newCount: "nouveaux",
    tabs: {
      all: "Toutes",
      unread: "Non lues",
      mentions: "Mentions",
      important: "Importantes",
      archived: "Archivées",
    },
    actions: {
      markAllRead: "Marquer toutes lues",
      settings: "Paramètres",
      search: "Rechercher",
      markRead: "Marquer comme lu",
      markUnread: "Marquer comme non lu",
      archive: "Archiver",
      delete: "Supprimer",
      hideSimilar: "Masquer similaires",
      viewProfile: "Voir profil",
      viewLesson: "Voir leçon",
      viewInvoice: "Voir facture",
      contactStudent: "Contacter élève",
      sendWelcomeEmail: "Email de bienvenue",
      reply: "Répondre",
      downloadReceipt: "Télécharger reçu",
      exportCSV: "Exporter CSV",
      resetFilters: "Réinitialiser",
    },
    periods: {
      today: "Aujourd'hui",
      week: "Cette semaine",
      month: "Ce mois",
      all: "Tout",
    },
    types: {
      info: "Info",
      success: "Succès",
      warning: "Attention",
      error: "Erreur",
      system: "Système",
    },
    categories: {
      students: "Élèves",
      lessons: "Leçons",
      payments: "Paiements",
      messages: "Messages",
      system: "Système",
      exams: "Examens",
      reviews: "Avis",
      documents: "Documents",
    },
    priority: {
      high: "Haute",
      normal: "Normale",
      low: "Basse",
    },
    filters: {
      title: "Filtres",
      type: "Type",
      category: "Catégorie",
      priority: "Priorité",
      dateRange: "Période",
      sender: "Expéditeur",
      withAttachment: "Avec pièce jointe",
      unreadOnly: "Non lues uniquement",
    },
    detail: {
      from: "De",
      to: "À",
      category: "Catégorie",
      priority: "Priorité",
      relatedEntity: "Élément associé",
    },
    empty: {
      title: "Aucune notification",
      description: "Vous êtes à jour !",
    },
    bulk: {
      selected: "sélectionnée(s)",
      markRead: "Marquer lues",
      archive: "Archiver",
      delete: "Supprimer",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ces notifications ?",
    },
  },
  de: {
    title: "Benachrichtigungszentrum",
    newCount: "neu",
    tabs: {
      all: "Alle",
      unread: "Ungelesen",
      mentions: "Erwähnungen",
      important: "Wichtig",
      archived: "Archiviert",
    },
    actions: {
      markAllRead: "Alle als gelesen markieren",
      settings: "Einstellungen",
      search: "Suchen",
      markRead: "Als gelesen markieren",
      markUnread: "Als ungelesen markieren",
      archive: "Archivieren",
      delete: "Löschen",
      hideSimilar: "Ähnliche ausblenden",
      viewProfile: "Profil anzeigen",
      viewLesson: "Lektion anzeigen",
      viewInvoice: "Rechnung anzeigen",
      contactStudent: "Schüler kontaktieren",
      sendWelcomeEmail: "Willkommens-E-Mail",
      reply: "Antworten",
      downloadReceipt: "Beleg herunterladen",
      exportCSV: "CSV exportieren",
      resetFilters: "Zurücksetzen",
    },
    periods: {
      today: "Heute",
      week: "Diese Woche",
      month: "Dieser Monat",
      all: "Alle",
    },
    types: {
      info: "Info",
      success: "Erfolg",
      warning: "Warnung",
      error: "Fehler",
      system: "System",
    },
    categories: {
      students: "Schüler",
      lessons: "Lektionen",
      payments: "Zahlungen",
      messages: "Nachrichten",
      system: "System",
      exams: "Prüfungen",
      reviews: "Bewertungen",
      documents: "Dokumente",
    },
    priority: {
      high: "Hoch",
      normal: "Normal",
      low: "Niedrig",
    },
    filters: {
      title: "Filter",
      type: "Typ",
      category: "Kategorie",
      priority: "Priorität",
      dateRange: "Zeitraum",
      sender: "Absender",
      withAttachment: "Mit Anhang",
      unreadOnly: "Nur ungelesene",
    },
    detail: {
      from: "Von",
      to: "An",
      category: "Kategorie",
      priority: "Priorität",
      relatedEntity: "Zugehöriges Element",
    },
    empty: {
      title: "Keine Benachrichtigungen",
      description: "Sie sind auf dem neuesten Stand!",
    },
    bulk: {
      selected: "ausgewählt",
      markRead: "Als gelesen markieren",
      archive: "Archivieren",
      delete: "Löschen",
      confirmDelete: "Möchten Sie diese Benachrichtigungen wirklich löschen?",
    },
  },
  it: {
    title: "Centro notifiche",
    newCount: "nuove",
    tabs: {
      all: "Tutte",
      unread: "Non lette",
      mentions: "Menzioni",
      important: "Importanti",
      archived: "Archiviate",
    },
    actions: {
      markAllRead: "Segna tutte come lette",
      settings: "Impostazioni",
      search: "Cerca",
      markRead: "Segna come letta",
      markUnread: "Segna come non letta",
      archive: "Archivia",
      delete: "Elimina",
      hideSimilar: "Nascondi simili",
      viewProfile: "Vedi profilo",
      viewLesson: "Vedi lezione",
      viewInvoice: "Vedi fattura",
      contactStudent: "Contatta allievo",
      sendWelcomeEmail: "Email di benvenuto",
      reply: "Rispondi",
      downloadReceipt: "Scarica ricevuta",
      exportCSV: "Esporta CSV",
      resetFilters: "Reimposta",
    },
    periods: {
      today: "Oggi",
      week: "Questa settimana",
      month: "Questo mese",
      all: "Tutto",
    },
    types: {
      info: "Info",
      success: "Successo",
      warning: "Attenzione",
      error: "Errore",
      system: "Sistema",
    },
    categories: {
      students: "Allievi",
      lessons: "Lezioni",
      payments: "Pagamenti",
      messages: "Messaggi",
      system: "Sistema",
      exams: "Esami",
      reviews: "Recensioni",
      documents: "Documenti",
    },
    priority: {
      high: "Alta",
      normal: "Normale",
      low: "Bassa",
    },
    filters: {
      title: "Filtri",
      type: "Tipo",
      category: "Categoria",
      priority: "Priorità",
      dateRange: "Periodo",
      sender: "Mittente",
      withAttachment: "Con allegato",
      unreadOnly: "Solo non lette",
    },
    detail: {
      from: "Da",
      to: "A",
      category: "Categoria",
      priority: "Priorità",
      relatedEntity: "Elemento correlato",
    },
    empty: {
      title: "Nessuna notifica",
      description: "Sei aggiornato!",
    },
    bulk: {
      selected: "selezionate",
      markRead: "Segna come lette",
      archive: "Archivia",
      delete: "Elimina",
      confirmDelete: "Sei sicuro di voler eliminare queste notifiche?",
    },
  },
  en: {
    title: "Notifications Center",
    newCount: "new",
    tabs: {
      all: "All",
      unread: "Unread",
      mentions: "Mentions",
      important: "Important",
      archived: "Archived",
    },
    actions: {
      markAllRead: "Mark all as read",
      settings: "Settings",
      search: "Search",
      markRead: "Mark as read",
      markUnread: "Mark as unread",
      archive: "Archive",
      delete: "Delete",
      hideSimilar: "Hide similar",
      viewProfile: "View profile",
      viewLesson: "View lesson",
      viewInvoice: "View invoice",
      contactStudent: "Contact student",
      sendWelcomeEmail: "Welcome email",
      reply: "Reply",
      downloadReceipt: "Download receipt",
      exportCSV: "Export CSV",
      resetFilters: "Reset",
    },
    periods: {
      today: "Today",
      week: "This week",
      month: "This month",
      all: "All",
    },
    types: {
      info: "Info",
      success: "Success",
      warning: "Warning",
      error: "Error",
      system: "System",
    },
    categories: {
      students: "Students",
      lessons: "Lessons",
      payments: "Payments",
      messages: "Messages",
      system: "System",
      exams: "Exams",
      reviews: "Reviews",
      documents: "Documents",
    },
    priority: {
      high: "High",
      normal: "Normal",
      low: "Low",
    },
    filters: {
      title: "Filters",
      type: "Type",
      category: "Category",
      priority: "Priority",
      dateRange: "Period",
      sender: "Sender",
      withAttachment: "With attachment",
      unreadOnly: "Unread only",
    },
    detail: {
      from: "From",
      to: "To",
      category: "Category",
      priority: "Priority",
      relatedEntity: "Related item",
    },
    empty: {
      title: "No notifications",
      description: "You're all caught up!",
    },
    bulk: {
      selected: "selected",
      markRead: "Mark as read",
      archive: "Archive",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete these notifications?",
    },
  },
};

export function getNotificationsCenterTranslations(
  locale: NotificationsLocale = "fr"
) {
  return notificationsCenterTranslations[locale];
}

// ============================================================================
// MOCK DATA - 15+ REALISTIC SCENARIOS
// ============================================================================

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "success",
    category: "students",
    priority: "normal",
    status: "unread",
    title: "Nouvel élève: Jean Dupont",
    description: "Catégorie B - Début 20.01.2025",
    content:
      "Jean Dupont s'est inscrit pour la formation Catégorie B. Première leçon prévue le 20 janvier 2025 à 14:00.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    from: {
      id: "student-001",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
      role: "Élève",
    },
    relatedEntity: {
      type: "student",
      id: "student-001",
      label: "Jean Dupont - Catégorie B",
      url: "/students/student-001",
    },
    actions: [
      {
        id: "view-profile",
        label: "Voir profil",
        variant: "primary",
        url: "/students/student-001",
      },
      { id: "send-welcome", label: "Email de bienvenue", variant: "secondary" },
    ],
  },
  {
    id: "notif-002",
    type: "info",
    category: "lessons",
    priority: "high",
    status: "unread",
    title: "Nouvelle leçon: Marie Martin",
    description: "Demain 14:00 - Catégorie B",
    content:
      "Marie Martin a réservé une leçon pratique pour demain 16 janvier 2025 à 14:00. Durée: 90 minutes.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h ago
    from: {
      id: "student-002",
      name: "Marie Martin",
      avatar: "https://github.com/kdrnp.png",
      role: "Élève",
    },
    relatedEntity: {
      type: "lesson",
      id: "lesson-042",
      label: "Leçon pratique - 16.01.2025 14:00",
      url: "/lessons/lesson-042",
    },
    actions: [
      {
        id: "view-lesson",
        label: "Voir leçon",
        variant: "primary",
        url: "/lessons/lesson-042",
      },
      { id: "contact-student", label: "Contacter élève", variant: "secondary" },
    ],
  },
  {
    id: "notif-003",
    type: "success",
    category: "payments",
    priority: "normal",
    status: "unread",
    title: "Paiement reçu: 450 CHF",
    description: "Facture #2025-042 - Pierre Rossi",
    content:
      "Paiement de 450 CHF reçu pour la facture #2025-042. Méthode: Virement bancaire.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
    from: {
      id: "student-003",
      name: "Pierre Rossi",
      avatar: "https://github.com/yahyabedirhan.png",
      role: "Élève",
    },
    relatedEntity: {
      type: "invoice",
      id: "invoice-2025-042",
      label: "Facture #2025-042 - 450 CHF",
      url: "/invoices/invoice-2025-042",
    },
    actions: [
      {
        id: "view-invoice",
        label: "Voir facture",
        variant: "primary",
        url: "/invoices/invoice-2025-042",
      },
      {
        id: "download-receipt",
        label: "Télécharger reçu",
        variant: "secondary",
      },
    ],
  },
  {
    id: "notif-004",
    type: "warning",
    category: "lessons",
    priority: "high",
    status: "read",
    title: "Leçon annulée: Marc Dubois",
    description: "15.01.2025 10:00 - Moniteur indisponible",
    content:
      "La leçon du 15 janvier 2025 à 10:00 avec Marc Dubois a été annulée. Raison: Moniteur indisponible.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    from: {
      id: "instructor-001",
      name: "Thomas Müller",
      avatar: "https://github.com/denizbuyuktas.png",
      role: "Moniteur",
    },
    relatedEntity: {
      type: "lesson",
      id: "lesson-041",
      label: "Leçon annulée - 15.01.2025 10:00",
      url: "/lessons/lesson-041",
    },
    actions: [
      { id: "reschedule", label: "Replanifier", variant: "primary" },
      { id: "contact-student", label: "Contacter élève", variant: "secondary" },
    ],
  },
  {
    id: "notif-005",
    type: "success",
    category: "exams",
    priority: "normal",
    status: "read",
    title: "Résultat examen: Pierre Rossi",
    description: "Théorie réussie - 48/50 points",
    content:
      "Pierre Rossi a réussi l'examen théorique avec un score de 48/50 points. Félicitations!",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    from: {
      id: "system",
      name: "Système ViaMenutor",
      role: "Système",
    },
    relatedEntity: {
      type: "exam",
      id: "exam-012",
      label: "Examen théorie - Pierre Rossi",
      url: "/exams/exam-012",
    },
    actions: [
      {
        id: "view-results",
        label: "Voir résultats",
        variant: "primary",
        url: "/exams/exam-012",
      },
      { id: "congratulate", label: "Féliciter", variant: "secondary" },
    ],
  },
  {
    id: "notif-006",
    type: "system",
    category: "system",
    priority: "high",
    status: "unread",
    title: "Maintenance planifiée",
    description: "Ce soir 02:00-04:00 - Mise à jour système",
    content:
      "Une maintenance système est prévue ce soir de 02:00 à 04:00. Le système sera temporairement indisponible.",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8h ago
    from: {
      id: "system",
      name: "Équipe ViaMenutor",
      role: "Système",
    },
  },
  {
    id: "notif-007",
    type: "info",
    category: "messages",
    priority: "normal",
    status: "unread",
    title: "Nouveau message: Marc Dubois",
    description: "Question sur la prochaine leçon",
    content:
      "Marc Dubois vous a envoyé un message concernant la prochaine leçon pratique.",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10h ago
    from: {
      id: "student-004",
      name: "Marc Dubois",
      avatar: "https://github.com/shoaibux1.png",
      role: "Élève",
    },
    relatedEntity: {
      type: "message",
      id: "msg-123",
      label: "Message de Marc Dubois",
      url: "/messages/msg-123",
    },
    actions: [
      {
        id: "reply",
        label: "Répondre",
        variant: "primary",
        url: "/messages/msg-123",
      },
      { id: "archive", label: "Archiver", variant: "secondary" },
    ],
  },
  {
    id: "notif-008",
    type: "error",
    category: "payments",
    priority: "high",
    status: "unread",
    title: "Facture impayée: Sophie Laurent",
    description: "Facture #2025-038 en retard de 7 jours",
    content:
      "La facture #2025-038 de Sophie Laurent est en retard de 7 jours. Montant: 380 CHF.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    from: {
      id: "system",
      name: "Système Facturation",
      role: "Système",
    },
    relatedEntity: {
      type: "invoice",
      id: "invoice-2025-038",
      label: "Facture #2025-038 - 380 CHF",
      url: "/invoices/invoice-2025-038",
    },
    actions: [
      { id: "send-reminder", label: "Envoyer rappel", variant: "primary" },
      {
        id: "view-invoice",
        label: "Voir facture",
        variant: "secondary",
        url: "/invoices/invoice-2025-038",
      },
    ],
  },
  {
    id: "notif-009",
    type: "success",
    category: "documents",
    priority: "low",
    status: "read",
    title: "Document uploadé: Anna Weber",
    description: "Permis d'élève conducteur scanné",
    content:
      "Anna Weber a uploadé son permis d'élève conducteur. Document en attente de validation.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    from: {
      id: "student-005",
      name: "Anna Weber",
      avatar: "https://github.com/polymet-ai.png",
      role: "Élève",
    },
    hasAttachment: true,
    relatedEntity: {
      type: "student",
      id: "student-005",
      label: "Anna Weber - Documents",
      url: "/students/student-005",
    },
    actions: [
      { id: "validate-doc", label: "Valider document", variant: "primary" },
      {
        id: "view-profile",
        label: "Voir profil",
        variant: "secondary",
        url: "/students/student-005",
      },
    ],
  },
  {
    id: "notif-010",
    type: "success",
    category: "reviews",
    priority: "normal",
    status: "unread",
    title: "Nouvel avis Google: 5 étoiles",
    description: "Sophie Laurent - Excellente formation",
    content:
      "Sophie Laurent a laissé un avis 5 étoiles sur Google: 'Excellente formation, moniteurs très professionnels!'",
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
    from: {
      id: "student-006",
      name: "Sophie Laurent",
      avatar: "https://github.com/yusufhilmi.png",
      role: "Élève",
    },
    relatedEntity: {
      type: "review",
      id: "review-042",
      label: "Avis Google - Sophie Laurent",
      url: "/reviews/review-042",
    },
    actions: [
      {
        id: "view-review",
        label: "Voir avis",
        variant: "primary",
        url: "/reviews/review-042",
      },
      { id: "thank", label: "Remercier", variant: "secondary" },
    ],
  },
  {
    id: "notif-011",
    type: "warning",
    category: "system",
    priority: "normal",
    status: "read",
    title: "Rappel: Échéance permis",
    description: "3 élèves - Permis expire dans 30 jours",
    content:
      "3 élèves ont leur permis d'élève conducteur qui expire dans les 30 prochains jours.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    from: {
      id: "system",
      name: "Système ViaMenutor",
      role: "Système",
    },
  },
  {
    id: "notif-012",
    type: "info",
    category: "lessons",
    priority: "normal",
    status: "read",
    title: "Tâche assignée: Évaluation leçon",
    description: "Leçon du 14.01 avec Marc Dubois",
    content:
      "Veuillez compléter l'évaluation de la leçon du 14 janvier avec Marc Dubois.",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    from: {
      id: "system",
      name: "Système Planning",
      role: "Système",
    },
    relatedEntity: {
      type: "lesson",
      id: "lesson-040",
      label: "Leçon 14.01 - Marc Dubois",
      url: "/lessons/lesson-040",
    },
    actions: [
      {
        id: "evaluate",
        label: "Évaluer",
        variant: "primary",
        url: "/lessons/lesson-040/evaluate",
      },
    ],
  },
  {
    id: "notif-013",
    type: "warning",
    category: "lessons",
    priority: "high",
    status: "unread",
    title: "Changement planning: Thomas Müller",
    description: "Leçon déplacée au 18.01 16:00",
    content:
      "La leçon du 17 janvier à 14:00 a été déplacée au 18 janvier à 16:00 à la demande du moniteur.",
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
    from: {
      id: "instructor-002",
      name: "Thomas Müller",
      avatar: "https://github.com/denizbuyuktas.png",
      role: "Moniteur",
    },
    relatedEntity: {
      type: "lesson",
      id: "lesson-043",
      label: "Leçon modifiée - 18.01 16:00",
      url: "/lessons/lesson-043",
    },
  },
  {
    id: "notif-014",
    type: "info",
    category: "students",
    priority: "low",
    status: "read",
    title: "Nouveau prospect: Laura Schneider",
    description: "Demande d'information Catégorie A",
    content:
      "Laura Schneider a soumis une demande d'information pour la formation Catégorie A moto.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    from: {
      id: "prospect-001",
      name: "Laura Schneider",
      role: "Prospect",
    },
  },
  {
    id: "notif-015",
    type: "success",
    category: "exams",
    priority: "normal",
    status: "read",
    title: "Examen réservé: Jean Dupont",
    description: "Pratique - 25.01.2025 09:00",
    content:
      "Jean Dupont a réservé son examen pratique pour le 25 janvier 2025 à 09:00.",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    from: {
      id: "student-001",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
      role: "Élève",
    },
    relatedEntity: {
      type: "exam",
      id: "exam-013",
      label: "Examen pratique - 25.01.2025",
      url: "/exams/exam-013",
    },
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getNotificationIcon(category: NotificationCategory) {
  const icons = {
    students: UserPlusIcon,
    lessons: CalendarIcon,
    payments: DollarSignIcon,
    messages: MessageSquareIcon,
    system: SettingsIcon,
    exams: ClipboardIcon,
    reviews: StarIcon,
    documents: FileTextIcon,
  };
  return icons[category] || BellIcon;
}

export function getNotificationTypeColor(type: NotificationType) {
  const colors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-orange-500",
    error: "bg-red-500",
    system: "bg-purple-500",
  };
  return colors[type];
}

export function getRelativeTime(
  date: Date,
  locale: NotificationsLocale = "fr"
): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  const translations = {
    fr: {
      justNow: "À l'instant",
      minutesAgo: (n: number) => `il y a ${n} min`,
      hoursAgo: (n: number) => `il y a ${n}h`,
      daysAgo: (n: number) => `il y a ${n}j`,
    },
    de: {
      justNow: "Gerade eben",
      minutesAgo: (n: number) => `vor ${n} Min`,
      hoursAgo: (n: number) => `vor ${n}h`,
      daysAgo: (n: number) => `vor ${n}T`,
    },
    it: {
      justNow: "Proprio ora",
      minutesAgo: (n: number) => `${n} min fa`,
      hoursAgo: (n: number) => `${n}h fa`,
      daysAgo: (n: number) => `${n}g fa`,
    },
    en: {
      justNow: "Just now",
      minutesAgo: (n: number) => `${n} min ago`,
      hoursAgo: (n: number) => `${n}h ago`,
      daysAgo: (n: number) => `${n}d ago`,
    },
  };

  const t = translations[locale];

  if (diffMins < 1) return t.justNow;
  if (diffMins < 60) return t.minutesAgo(diffMins);
  if (diffHours < 24) return t.hoursAgo(diffHours);
  return t.daysAgo(diffDays);
}

export function formatFullTimestamp(
  date: Date,
  locale: NotificationsLocale = "fr"
): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
