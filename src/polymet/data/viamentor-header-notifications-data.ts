/**
 * VIAMENTOR - Header Notifications Data
 * Mock data pour notifications realtime avec WebSocket simulation
 */

export type NotificationType = "info" | "success" | "warning" | "error";
export type NotificationCategory = "all" | "unread" | "mentions";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  url?: string;
  metadata?: {
    icon?: string;
    avatar?: string;
    actionLabel?: string;
  };
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-001",
    type: "success",
    title: "Leçon confirmée",
    message: "Jean Dupont a confirmé sa leçon du 15.01.2025 à 14:00",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
    read: false,
    url: "/lessons/les-001",
    metadata: {
      avatar: "https://github.com/yusufhilmi.png",
    },
  },
  {
    id: "notif-002",
    type: "warning",
    title: "Facture en retard",
    message:
      "La facture INV-2025-003 de Pierre Dubois est en retard de 7 jours",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    read: false,
    url: "/finances/invoices/inv-003",
  },
  {
    id: "notif-003",
    type: "info",
    title: "Nouveau message",
    message: "Marie Martin vous a envoyé un message",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    read: false,
    url: "/messages/msg-001",
    metadata: {
      avatar: "https://github.com/kdrnp.png",
    },
  },
  {
    id: "notif-004",
    type: "success",
    title: "Paiement reçu",
    message: "Paiement de CHF 1'200.00 reçu pour INV-2025-001",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h ago
    read: true,
    url: "/finances/invoices/inv-001",
  },
  {
    id: "notif-005",
    type: "info",
    title: "Examen planifié",
    message: "L'examen pratique de Sophie Bernard est planifié le 20.01.2025",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
    read: true,
    url: "/exams/exam-001",
    metadata: {
      avatar: "https://github.com/denizbuyuktas.png",
    },
  },
  {
    id: "notif-006",
    type: "warning",
    title: "Document manquant",
    message: "Le permis d'élève de Luc Moreau expire dans 30 jours",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    read: true,
    url: "/students/std-005",
    metadata: {
      avatar: "https://github.com/shoaibux1.png",
    },
  },
  {
    id: "notif-007",
    type: "error",
    title: "Leçon annulée",
    message: "Marc Lefebvre a annulé la leçon du 14.01.2025",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    url: "/lessons/les-004",
  },
  {
    id: "notif-008",
    type: "info",
    title: "Nouveau véhicule",
    message: "Le véhicule VD 22222 a été ajouté à la flotte",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    url: "/vehicles/veh-004",
  },
  {
    id: "notif-009",
    type: "success",
    title: "Examen réussi",
    message: "Pierre Dubois a réussi son examen pratique catégorie BE",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    url: "/students/std-003",
    metadata: {
      avatar: "https://github.com/yahyabedirhan.png",
    },
  },
  {
    id: "notif-010",
    type: "info",
    title: "Rappel maintenance",
    message: "Le véhicule VD 12345 nécessite une maintenance dans 500 km",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    read: true,
    url: "/vehicles/veh-001",
  },
];

// Messages preview data
export interface MessagePreview {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  preview: string;
  timestamp: Date;
  unread: boolean;
}

export const MOCK_MESSAGES: MessagePreview[] = [
  {
    id: "msg-001",
    conversationId: "conv-001",
    sender: {
      id: "std-002",
      name: "Marie Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    preview: "Bonjour, est-ce possible de déplacer ma leçon de demain ?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    unread: true,
  },
  {
    id: "msg-002",
    conversationId: "conv-002",
    sender: {
      id: "ins-001",
      name: "Marc Lefebvre",
      avatar: "https://github.com/yusufhilmi.png",
    },
    preview: "J'ai terminé la leçon avec Jean, tout s'est bien passé",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h ago
    unread: true,
  },
  {
    id: "msg-003",
    conversationId: "conv-003",
    sender: {
      id: "std-001",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    preview: "Merci pour la confirmation !",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
    unread: false,
  },
  {
    id: "msg-004",
    conversationId: "conv-004",
    sender: {
      id: "std-004",
      name: "Sophie Bernard",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    preview: "Quand est-ce que je peux passer mon examen ?",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    unread: false,
  },
  {
    id: "msg-005",
    conversationId: "conv-005",
    sender: {
      id: "ins-002",
      name: "Claire Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    preview: "Le rapport de leçon est disponible",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    unread: false,
  },
];

// Notification type colors
export const NOTIFICATION_TYPE_COLORS = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-orange-500",
  error: "text-red-500",
} as const;

// Notification type icons (lucide-react)
export const NOTIFICATION_TYPE_ICONS = {
  info: "InfoIcon",
  success: "CheckCircle2Icon",
  warning: "AlertTriangleIcon",
  error: "XCircleIcon",
} as const;

// Helper to format relative time
export function formatRelativeTime(date: Date, locale: string = "fr"): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  const translations = {
    fr: {
      justNow: "À l'instant",
      minutesAgo: (n: number) => `Il y a ${n} min`,
      hoursAgo: (n: number) => `Il y a ${n}h`,
      daysAgo: (n: number) => `Il y a ${n}j`,
    },
    de: {
      justNow: "Gerade eben",
      minutesAgo: (n: number) => `Vor ${n} Min`,
      hoursAgo: (n: number) => `Vor ${n}h`,
      daysAgo: (n: number) => `Vor ${n}T`,
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

  const t =
    translations[locale as keyof typeof translations] || translations.fr;

  if (diffMins < 1) return t.justNow;
  if (diffMins < 60) return t.minutesAgo(diffMins);
  if (diffHours < 24) return t.hoursAgo(diffHours);
  return t.daysAgo(diffDays);
}
