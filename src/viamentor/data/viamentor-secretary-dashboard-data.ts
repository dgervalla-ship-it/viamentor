/**
 * VIAMENTOR - Secretary Dashboard Data
 * Mock data et types pour dashboard secrétariat avec tâches quotidiennes, messages, appels
 */

// ============================================================================
// TYPES
// ============================================================================

export type TaskType =
  | "phone"
  | "email"
  | "document"
  | "payment"
  | "booking"
  | "follow_up";
export type TaskPriority = 1 | 2 | 3;
export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type MessageType = "email" | "sms" | "internal" | "whatsapp";
export type MessagePriority = "normal" | "urgent";
export type MessageStatus = "unread" | "read" | "archived";

export type CallDirection = "incoming" | "outgoing" | "missed";

export type ActivityType =
  | "inscription"
  | "booking"
  | "call"
  | "message"
  | "task_completed"
  | "payment";

export type AppointmentType =
  | "prospect_visit"
  | "inscription_meeting"
  | "scheduled_call"
  | "team_meeting";

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  relatedEntity?: {
    type: "student" | "prospect" | "instructor";
    id: string;
    name: string;
  };
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
}

export interface Message {
  id: string;
  type: MessageType;
  from: {
    id: string;
    name: string;
    avatar: string;
    role: "student" | "prospect" | "instructor" | "admin" | "secretary";
  };
  subject: string;
  body: string;
  priority: MessagePriority;
  status: MessageStatus;
  receivedAt: string;
  readAt?: string;
}

export interface PhoneCall {
  id: string;
  direction: CallDirection;
  contact?: {
    id: string;
    name: string;
    avatar: string;
    type: "student" | "prospect" | "instructor" | "other";
  };
  phoneNumber: string;
  duration: number; // seconds
  timestamp: string;
  notes?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  relatedEntity?: {
    type: string;
    id: string;
    name: string;
  };
  timestamp: string;
}

export interface Appointment {
  id: string;
  type: AppointmentType;
  title: string;
  dateTime: string;
  person: {
    id: string;
    name: string;
    avatar: string;
  };
  location?: string;
  notes?: string;
  status: "scheduled" | "confirmed" | "cancelled";
}

export interface DashboardStats {
  callsToday: number;
  inscriptionsToday: number;
  lessonsBooked: number;
  messagesProcessed: number;
  urgentTasks: number;
  unreadMessages: number;
  lessonsToday: number;
  newProspects: number;
}

export interface SchoolInfo {
  logo: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    googleMaps?: string;
  };
  openingHours: {
    [key: string]: { open: string; close: string } | null;
  };
  currentlyOpen: boolean;
}

export interface AvailableInstructor {
  id: string;
  name: string;
  avatar: string;
  category: string[];
  status: "available" | "in_lesson" | "break";
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockDashboardStats: DashboardStats = {
  callsToday: 12,
  inscriptionsToday: 3,
  lessonsBooked: 8,
  messagesProcessed: 15,
  urgentTasks: 7,
  unreadMessages: 4,
  lessonsToday: 24,
  newProspects: 5,
};

export const mockTasks: Task[] = [
  {
    id: "task-1",
    type: "phone",
    title: "Rappeler prospect",
    description:
      "Rappeler Sophie Martin pour confirmer RDV inscription demain 14h",
    relatedEntity: {
      type: "prospect",
      id: "prospect-1",
      name: "Sophie Martin",
    },
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // Dans 2h
    priority: 3,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "admin-1",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-2",
    type: "document",
    title: "Document manquant",
    description: "Demander copie permis élève à Lucas Dubois",
    relatedEntity: {
      type: "student",
      id: "student-1",
      name: "Lucas Dubois",
    },
    dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Échéance dépassée
    priority: 2,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "secretary-1",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-3",
    type: "payment",
    title: "Relance paiement",
    description: "Relancer Emma Lefebvre pour facture #INV-2024-0234 échue",
    relatedEntity: {
      type: "student",
      id: "student-2",
      name: "Emma Lefebvre",
    },
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    priority: 3,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "admin-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-4",
    type: "booking",
    title: "Confirmer leçon",
    description:
      "Confirmer leçon demain 10h avec Thomas Müller et moniteur Jean",
    relatedEntity: {
      type: "student",
      id: "student-3",
      name: "Thomas Müller",
    },
    dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    priority: 2,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "secretary-1",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-5",
    type: "email",
    title: "Envoyer convocation",
    description: "Envoyer convocation examen pratique à Marie Rossi",
    relatedEntity: {
      type: "student",
      id: "student-4",
      name: "Marie Rossi",
    },
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    priority: 2,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "admin-1",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "task-6",
    type: "follow_up",
    title: "Suivi prospect",
    description:
      "Relancer prospect Pierre Blanc sans nouvelles depuis 1 semaine",
    relatedEntity: {
      type: "prospect",
      id: "prospect-2",
      name: "Pierre Blanc",
    },
    dueDate: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    priority: 1,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "secretary-1",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-7",
    type: "phone",
    title: "Appel parent",
    description: "Appeler parent de Léa Petit pour autorisation parentale",
    relatedEntity: {
      type: "student",
      id: "student-5",
      name: "Léa Petit",
    },
    dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    priority: 2,
    status: "pending",
    assignedTo: "secretary-1",
    createdBy: "admin-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    type: "email",
    from: {
      id: "student-1",
      name: "Lucas Dubois",
      avatar: "https://github.com/denizbuyuktas.png",
      role: "student",
    },
    subject: "Question sur mon planning",
    body: "Bonjour, je voudrais savoir si je peux déplacer ma leçon de vendredi prochain? Merci d'avance.",
    priority: "normal",
    status: "unread",
    receivedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-2",
    type: "sms",
    from: {
      id: "prospect-1",
      name: "Sophie Martin",
      avatar: "https://github.com/shoaibux1.png",
      role: "prospect",
    },
    subject: "Confirmation RDV",
    body: "Bonjour, je confirme mon RDV demain à 14h pour l'inscription. À demain!",
    priority: "normal",
    status: "unread",
    receivedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-3",
    type: "internal",
    from: {
      id: "instructor-1",
      name: "Marc Dubois",
      avatar: "https://github.com/yusufhilmi.png",
      role: "instructor",
    },
    subject: "Véhicule en panne",
    body: "Le véhicule VD-123456 a un problème de démarrage. Merci de reporter les leçons de cet après-midi.",
    priority: "urgent",
    status: "unread",
    receivedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-4",
    type: "email",
    from: {
      id: "student-2",
      name: "Emma Lefebvre",
      avatar: "https://github.com/kdrnp.png",
      role: "student",
    },
    subject: "Facture reçue",
    body: "Bonjour, j'ai bien reçu la facture. Je procède au paiement cette semaine. Cordialement.",
    priority: "normal",
    status: "read",
    receivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    readAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockPhoneCalls: PhoneCall[] = [
  {
    id: "call-1",
    direction: "incoming",
    contact: {
      id: "prospect-1",
      name: "Sophie Martin",
      avatar: "https://github.com/shoaibux1.png",
      type: "prospect",
    },
    phoneNumber: "+41 79 123 45 67",
    duration: 320, // 5min 20s
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    notes: "Intéressée par formation catégorie B. RDV fixé demain 14h.",
  },
  {
    id: "call-2",
    direction: "outgoing",
    contact: {
      id: "student-1",
      name: "Lucas Dubois",
      avatar: "https://github.com/denizbuyuktas.png",
      type: "student",
    },
    phoneNumber: "+41 79 234 56 78",
    duration: 180,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    notes: "Rappel document permis élève manquant.",
  },
  {
    id: "call-3",
    direction: "missed",
    phoneNumber: "+41 79 345 67 89",
    duration: 0,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "call-4",
    direction: "incoming",
    contact: {
      id: "student-3",
      name: "Thomas Müller",
      avatar: "https://github.com/yahyabedirhan.png",
      type: "student",
    },
    phoneNumber: "+41 79 456 78 90",
    duration: 240,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    notes: "Confirmation leçon demain 10h.",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "activity-1",
    type: "inscription",
    description: "a inscrit",
    user: {
      id: "secretary-1",
      name: "Claire Dupont",
      avatar: "https://github.com/shoaibux1.png",
    },
    relatedEntity: {
      type: "student",
      id: "student-6",
      name: "Antoine Bernard",
    },
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "activity-2",
    type: "booking",
    description: "a réservé une leçon pour",
    user: {
      id: "secretary-1",
      name: "Claire Dupont",
      avatar: "https://github.com/shoaibux1.png",
    },
    relatedEntity: {
      type: "student",
      id: "student-1",
      name: "Lucas Dubois",
    },
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity-3",
    type: "call",
    description: "a appelé",
    user: {
      id: "secretary-1",
      name: "Claire Dupont",
      avatar: "https://github.com/shoaibux1.png",
    },
    relatedEntity: {
      type: "prospect",
      id: "prospect-1",
      name: "Sophie Martin",
    },
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity-4",
    type: "task_completed",
    description: "a terminé la tâche",
    user: {
      id: "secretary-1",
      name: "Claire Dupont",
      avatar: "https://github.com/shoaibux1.png",
    },
    relatedEntity: {
      type: "task",
      id: "task-8",
      name: "Confirmer RDV prospect",
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "appt-1",
    type: "prospect_visit",
    title: "Visite prospect",
    dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    person: {
      id: "prospect-1",
      name: "Sophie Martin",
      avatar: "https://github.com/shoaibux1.png",
    },
    location: "Bureau accueil",
    notes: "Intéressée catégorie B, formation complète",
    status: "confirmed",
  },
  {
    id: "appt-2",
    type: "scheduled_call",
    title: "Appel planifié",
    dateTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    person: {
      id: "prospect-2",
      name: "Pierre Blanc",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    location: "+41 79 567 89 01",
    notes: "Suivi prospect, devis envoyé il y a 1 semaine",
    status: "scheduled",
  },
  {
    id: "appt-3",
    type: "team_meeting",
    title: "Réunion équipe",
    dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    person: {
      id: "admin-1",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    location: "Salle de réunion",
    notes: "Point mensuel équipe administrative",
    status: "scheduled",
  },
];

export const mockSchoolInfo: SchoolInfo = {
  logo: "https://github.com/viamentor-ai.png",
  name: "Auto-École Viamentor Lausanne",
  address: "Rue de la Gare 12, 1003 Lausanne",
  phone: "+41 21 123 45 67",
  email: "contact@viamentor.ch",
  website: "https://viamentor.ch",
  socialMedia: {
    facebook: "https://facebook.com/viamentor",
    instagram: "https://instagram.com/viamentor",
    googleMaps: "https://maps.google.com/?q=Auto-École+Viamentor+Lausanne",
  },
  openingHours: {
    monday: { open: "08:00", close: "18:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "18:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "18:00" },
    saturday: { open: "09:00", close: "12:00" },
    sunday: null,
  },
  currentlyOpen: true,
};

export const mockAvailableInstructors: AvailableInstructor[] = [
  {
    id: "instructor-1",
    name: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    category: ["B", "BE"],
    status: "available",
  },
  {
    id: "instructor-2",
    name: "Sophie Laurent",
    avatar: "https://github.com/shoaibux1.png",
    category: ["B", "A1"],
    status: "in_lesson",
  },
  {
    id: "instructor-3",
    name: "Pierre Martin",
    avatar: "https://github.com/denizbuyuktas.png",
    category: ["B", "A", "BE"],
    status: "available",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTaskTypeIcon(type: TaskType): string {
  const icons: Record<TaskType, string> = {
    phone: "Phone",
    email: "Mail",
    document: "FileText",
    payment: "CreditCard",
    booking: "Calendar",
    follow_up: "UserCheck",
  };
  return icons[type];
}

export function getTaskTypeColor(type: TaskType): string {
  const colors: Record<TaskType, string> = {
    phone: "bg-blue-500",
    email: "bg-purple-500",
    document: "bg-orange-500",
    payment: "bg-green-500",
    booking: "bg-cyan-500",
    follow_up: "bg-pink-500",
  };
  return colors[type];
}

export function getActivityIcon(type: ActivityType): string {
  const icons: Record<ActivityType, string> = {
    inscription: "UserPlus",
    booking: "Calendar",
    call: "Phone",
    message: "Mail",
    task_completed: "CheckCircle",
    payment: "CreditCard",
  };
  return icons[type];
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function getTimeUntilDue(dueDate: string): {
  text: string;
  isOverdue: boolean;
  isUrgent: boolean;
} {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffMs < 0) {
    return {
      text: "Échéance dépassée!",
      isOverdue: true,
      isUrgent: true,
    };
  }

  if (diffHours < 1) {
    return {
      text: `Dans ${diffMinutes}min`,
      isOverdue: false,
      isUrgent: true,
    };
  }

  if (diffHours < 24) {
    return {
      text: `Dans ${diffHours}h`,
      isOverdue: false,
      isUrgent: diffHours < 3,
    };
  }

  const diffDays = Math.floor(diffHours / 24);
  return {
    text: `Dans ${diffDays}j`,
    isOverdue: false,
    isUrgent: false,
  };
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
