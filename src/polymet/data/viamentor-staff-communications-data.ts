/**
 * VIAMENTOR Staff Communications Data
 *
 * Mock data et types pour messagerie interne et gestion tâches secrétariat
 */

// ============================================================================
// TYPES - MESSAGES
// ============================================================================

export type MessageFolder = "inbox" | "sent" | "drafts" | "archived" | "trash";
export type MessagePriority = "normal" | "urgent";
export type UserRole = "student" | "instructor" | "admin" | "staff";

export interface MessageThread {
  id: string;
  subject: string;
  participants: {
    id: string;
    name: string;
    role: UserRole;
    avatar: string;
  }[];
  lastMessage: {
    senderId: string;
    content: string;
    timestamp: Date;
  };
  unreadCount: number;
  priority: MessagePriority;
  attachmentsCount: number;
  folder: MessageFolder;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  attachments: {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  read: boolean;
}

// ============================================================================
// TYPES - TASKS
// ============================================================================

export type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed"
  | "postponed"
  | "cancelled";
export type TaskPriority = 1 | 2 | 3 | 4 | 5;

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar: string;
  };
  createdBy: {
    id: string;
    name: string;
  };
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

// ============================================================================
// MOCK DATA - MESSAGES
// ============================================================================

export const mockMessageThreads: MessageThread[] = [
  {
    id: "thread-1",
    subject: "Changement horaire leçon demain",
    participants: [
      {
        id: "std-1",
        name: "Sophie Martin",
        role: "student",
        avatar: "https://github.com/yahyabedirhan.png",
      },
    ],

    lastMessage: {
      senderId: "std-1",
      content:
        "Bonjour, serait-il possible de décaler ma leçon de 14h à 16h demain ?",
      timestamp: new Date(2025, 0, 19, 15, 30),
    },
    unreadCount: 1,
    priority: "normal",
    attachmentsCount: 0,
    folder: "inbox",
  },
  {
    id: "thread-2",
    subject: "URGENT: Véhicule en panne",
    participants: [
      {
        id: "inst-1",
        name: "Jean Dupont",
        role: "instructor",
        avatar: "https://github.com/yusufhilmi.png",
      },
    ],

    lastMessage: {
      senderId: "inst-1",
      content:
        "Le véhicule GE-123456 a un problème de démarrage. Besoin de véhicule de remplacement pour leçons cet après-midi.",
      timestamp: new Date(2025, 0, 19, 9, 15),
    },
    unreadCount: 1,
    priority: "urgent",
    attachmentsCount: 2,
    folder: "inbox",
  },
  {
    id: "thread-3",
    subject: "Confirmation inscription cours théorique",
    participants: [
      {
        id: "std-2",
        name: "Marc Dubois",
        role: "student",
        avatar: "https://github.com/kdrnp.png",
      },
    ],

    lastMessage: {
      senderId: "staff-1",
      content:
        "Votre inscription au cours théorique du 25 janvier est confirmée. Vous recevrez un email de rappel 24h avant.",
      timestamp: new Date(2025, 0, 18, 14, 20),
    },
    unreadCount: 0,
    priority: "normal",
    attachmentsCount: 1,
    folder: "sent",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    threadId: "thread-1",
    senderId: "std-1",
    senderName: "Sophie Martin",
    senderRole: "student",
    senderAvatar: "https://github.com/yahyabedirhan.png",
    content:
      "Bonjour, serait-il possible de décaler ma leçon de 14h à 16h demain ? J'ai un rendez-vous médical imprévu. Merci de votre compréhension.",
    timestamp: new Date(2025, 0, 19, 15, 30),
    attachments: [],
    read: false,
  },
  {
    id: "msg-2",
    threadId: "thread-2",
    senderId: "inst-1",
    senderName: "Jean Dupont",
    senderRole: "instructor",
    senderAvatar: "https://github.com/yusufhilmi.png",
    content:
      "Le véhicule GE-123456 a un problème de démarrage. Besoin de véhicule de remplacement pour leçons cet après-midi. J'ai 3 leçons prévues entre 14h et 18h.",
    timestamp: new Date(2025, 0, 19, 9, 15),
    attachments: [
      {
        id: "att-1",
        name: "photo_panne.jpg",
        size: 2456789,
        type: "image/jpeg",
        url: "#",
      },
      {
        id: "att-2",
        name: "planning_apres_midi.pdf",
        size: 156789,
        type: "application/pdf",
        url: "#",
      },
    ],

    read: false,
  },
];

// ============================================================================
// MOCK DATA - TASKS
// ============================================================================

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Préparer convocations examens février",
    description:
      "Générer et envoyer les convocations pour les 12 élèves inscrits aux examens pratiques de février",
    assignedTo: {
      id: "staff-1",
      name: "Marie Secrétaire",
      avatar: "https://github.com/shoaibux1.png",
    },
    createdBy: {
      id: "admin-1",
      name: "Directeur École",
    },
    dueDate: new Date(2025, 0, 25),
    priority: 4,
    status: "in_progress",
    createdAt: new Date(2025, 0, 15),
  },
  {
    id: "task-2",
    title: "Vérifier assurances véhicules",
    description:
      "Contrôler les dates d'échéance des assurances pour tous les véhicules de l'école",
    assignedTo: {
      id: "staff-2",
      name: "Paul Assistant",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    createdBy: {
      id: "admin-1",
      name: "Directeur École",
    },
    dueDate: new Date(2025, 0, 22),
    priority: 5,
    status: "todo",
    createdAt: new Date(2025, 0, 18),
  },
  {
    id: "task-3",
    title: "Mise à jour dossiers élèves",
    description:
      "Vérifier que tous les dossiers élèves sont complets avec permis d'élève et photos",
    createdBy: {
      id: "staff-1",
      name: "Marie Secrétaire",
    },
    dueDate: new Date(2025, 0, 30),
    priority: 3,
    status: "todo",
    createdAt: new Date(2025, 0, 19),
  },
  {
    id: "task-4",
    title: "Relance paiements en retard",
    description:
      "Contacter les 5 élèves avec factures impayées depuis plus de 30 jours",
    assignedTo: {
      id: "staff-1",
      name: "Marie Secrétaire",
      avatar: "https://github.com/shoaibux1.png",
    },
    createdBy: {
      id: "admin-1",
      name: "Directeur École",
    },
    dueDate: new Date(2025, 0, 20),
    priority: 4,
    status: "completed",
    createdAt: new Date(2025, 0, 10),
    completedAt: new Date(2025, 0, 19),
  },
];

export const mockTaskStats: TaskStats = {
  total: 24,
  todo: 8,
  inProgress: 6,
  completed: 9,
  overdue: 1,
};

// ============================================================================
// HELPERS
// ============================================================================

export const getTaskStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    todo: "bg-blue-500",
    in_progress: "bg-yellow-500",
    completed: "bg-green-500",
    postponed: "bg-orange-500",
    cancelled: "bg-red-500",
  };
  return colors[status];
};

export const getPriorityStars = (priority: TaskPriority): string => {
  return "⭐".repeat(priority);
};

export const isTaskOverdue = (task: Task): boolean => {
  return task.status !== "completed" && task.dueDate < new Date();
};

export const getDaysUntilDue = (dueDate: Date): number => {
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
