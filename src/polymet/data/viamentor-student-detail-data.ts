/**
 * VIAMENTOR Student Detail Data
 *
 * Mock data pour page détail élève avec types complets
 */

// ============================================================================
// TYPES
// ============================================================================

export type StudentStatus = "Actif" | "Inactif" | "Suspendu" | "Terminé";
export type LicenseCategory = "B" | "A" | "A1" | "BE" | "BPT" | "C" | "D";
export type ExamStatus = "Non passé" | "Réussi" | "Échoué" | "Planifié";
export type DocumentType =
  | "Permis"
  | "Attestation"
  | "Facture"
  | "Photo"
  | "Cours"
  | "Autre";
export type InvoiceStatus =
  | "Brouillon"
  | "Envoyée"
  | "Payée"
  | "En retard"
  | "Annulée";
export type LessonStatus =
  | "Planifiée"
  | "Confirmée"
  | "Complétée"
  | "Annulée"
  | "Reportée";
export type ThemeMastery = "Initiation" | "En cours" | "Bien" | "Maîtrisé";
export type ActionType =
  | "create"
  | "update"
  | "delete"
  | "status_change"
  | "payment"
  | "lesson"
  | "document";

export interface StudentDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  canton: string;
  birthDate: string;
  age: number;
  language: "fr" | "de" | "it" | "en";
  avatar?: string;
  status: StudentStatus;
  enrollmentDate: string;
  categories: CategoryEnrollment[];
  financialBalance: number;
  lessonsBalance: number;
  emergencyContact?: EmergencyContact;
  preferences: StudentPreferences;
}

export interface CategoryEnrollment {
  category: LicenseCategory;
  enrollmentDate: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  package: string;
  examDate?: string;
  notes: string;
  progression: number;
  totalLessons: number;
  completedLessons: number;
  averageRating: number;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
  minorExitAuthorization: boolean;
}

export interface StudentPreferences {
  emailNotifications: boolean;
  smsReminders: boolean;
  whatsappNotifications: boolean;
  preferredTimeSlots: ("Matin" | "Après-midi" | "Soir" | "Weekend")[];
  instructorNotes: string;
}

export interface Lesson {
  id: string;
  date: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  vehicle: string;
  duration: number;
  themes: string[];
  rating: number;
  comment: string;
  signed: boolean;
  status: LessonStatus;
  category: LicenseCategory;
}

export interface ProgressTheme {
  id: string;
  name: string;
  category: LicenseCategory;
  mastery: number;
  masteryLevel: ThemeMastery;
  lastPractice?: string;
  strengths: string;
  weaknesses: string;
  priority: number;
}

export interface ExamRecord {
  type: "Théorique" | "Pratique";
  category: LicenseCategory;
  status: ExamStatus;
  attempts: ExamAttempt[];
  needsArticle23: boolean;
}

export interface ExamAttempt {
  id: string;
  date: string;
  result: "Réussi" | "Échoué";
  score?: number;
  notes: string;
  documentUrl?: string;
}

export interface StudentDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  uploadDate: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  url: string;
  folder: string;
}

export interface StudentInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  items: InvoiceItem[];
  paidDate?: string;
  paidAmount?: number;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  instructor: {
    id: string;
    name: string;
  };
  vehicle: string;
  category: LicenseCategory;
  status: LessonStatus;
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  action: ActionType;
  description: string;
  details: {
    field?: string;
    oldValue?: string;
    newValue?: string;
    metadata?: Record<string, any>;
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_STUDENT_DETAIL: StudentDetail = {
  id: "STU-001",
  firstName: "Lucas",
  lastName: "Müller",
  email: "lucas.muller@example.ch",
  phone: "+41 79 123 45 67",
  address: "Rue de la Gare 15",
  zip: "1003",
  city: "Lausanne",
  canton: "VD",
  birthDate: "2005-03-15",
  age: 19,
  language: "fr",
  avatar: "https://github.com/yusufhilmi.png",
  status: "Actif",
  enrollmentDate: "2024-09-01",
  categories: [
    {
      category: "B",
      enrollmentDate: "2024-09-01",
      instructor: {
        id: "INS-001",
        name: "Jean Dupont",
        avatar: "https://github.com/kdrnp.png",
      },
      package: "Forfait 25 leçons",
      examDate: "2025-02-15",
      notes: "Élève motivé, bonne progression",
      progression: 75,
      totalLessons: 25,
      completedLessons: 19,
      averageRating: 4.5,
    },
  ],

  financialBalance: 0,
  lessonsBalance: 8,
  emergencyContact: {
    name: "Marie Müller",
    phone: "+41 79 987 65 43",
    relation: "Mère",
    minorExitAuthorization: false,
  },
  preferences: {
    emailNotifications: true,
    smsReminders: true,
    whatsappNotifications: false,
    preferredTimeSlots: ["Après-midi", "Weekend"],
    instructorNotes:
      "Préfère les leçons en fin d'après-midi. Disponible le samedi matin.",
  },
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "LES-001",
    date: "2025-01-10T14:00:00Z",
    instructor: {
      id: "INS-001",
      name: "Jean Dupont",
      avatar: "https://github.com/kdrnp.png",
    },
    vehicle: "VD-123456",
    duration: 90,
    themes: ["Circulation urbaine", "Stationnement"],
    rating: 5,
    comment: "Excellente leçon, bonne maîtrise du stationnement en créneau",
    signed: true,
    status: "Complétée",
    category: "B",
  },
  {
    id: "LES-002",
    date: "2025-01-08T15:30:00Z",
    instructor: {
      id: "INS-001",
      name: "Jean Dupont",
      avatar: "https://github.com/kdrnp.png",
    },
    vehicle: "VD-123456",
    duration: 90,
    themes: ["Autoroute", "Dépassements"],
    rating: 4,
    comment: "Bonne progression sur autoroute, à retravailler les dépassements",
    signed: true,
    status: "Complétée",
    category: "B",
  },
  {
    id: "LES-003",
    date: "2025-01-05T10:00:00Z",
    instructor: {
      id: "INS-001",
      name: "Jean Dupont",
      avatar: "https://github.com/kdrnp.png",
    },
    vehicle: "VD-123456",
    duration: 90,
    themes: ["Conduite de nuit", "Visibilité"],
    rating: 4,
    comment: "Première leçon de nuit réussie",
    signed: true,
    status: "Complétée",
    category: "B",
  },
];

export const MOCK_PROGRESS_THEMES: ProgressTheme[] = [
  {
    id: "TH-001",
    name: "Circulation urbaine",
    category: "B",
    mastery: 85,
    masteryLevel: "Maîtrisé",
    lastPractice: "2025-01-10",
    strengths: "Bonne anticipation, respect des priorités",
    weaknesses: "Peut améliorer la fluidité dans le trafic dense",
    priority: 1,
  },
  {
    id: "TH-002",
    name: "Stationnement",
    category: "B",
    mastery: 80,
    masteryLevel: "Maîtrisé",
    lastPractice: "2025-01-10",
    strengths: "Créneau maîtrisé, bonne perception des distances",
    weaknesses: "Stationnement en bataille à améliorer",
    priority: 2,
  },
  {
    id: "TH-003",
    name: "Autoroute",
    category: "B",
    mastery: 70,
    masteryLevel: "Bien",
    lastPractice: "2025-01-08",
    strengths: "Bonne vitesse de croisière, insertion correcte",
    weaknesses: "Dépassements à retravailler, contrôles rétroviseurs",
    priority: 3,
  },
  {
    id: "TH-004",
    name: "Conduite de nuit",
    category: "B",
    mastery: 65,
    masteryLevel: "Bien",
    lastPractice: "2025-01-05",
    strengths: "Bonne utilisation des feux",
    weaknesses: "Adaptation vitesse selon visibilité",
    priority: 4,
  },
  {
    id: "TH-005",
    name: "Conduite par mauvais temps",
    category: "B",
    mastery: 40,
    masteryLevel: "En cours",
    lastPractice: "2024-12-20",
    strengths: "Prudence adaptée",
    weaknesses: "Distances de sécurité, aquaplaning",
    priority: 5,
  },
  {
    id: "TH-006",
    name: "Manœuvres complexes",
    category: "B",
    mastery: 55,
    masteryLevel: "En cours",
    lastPractice: "2025-01-03",
    strengths: "Demi-tour correct",
    weaknesses: "Marche arrière en ligne, virages serrés",
    priority: 6,
  },
];

export const MOCK_EXAM_RECORDS: ExamRecord[] = [
  {
    type: "Théorique",
    category: "B",
    status: "Réussi",
    attempts: [
      {
        id: "EX-TH-001",
        date: "2024-10-15",
        result: "Réussi",
        score: 48,
        notes: "Score: 48/50 - Excellent résultat",
        documentUrl: "/documents/exam-theory-result.pdf",
      },
    ],

    needsArticle23: false,
  },
  {
    type: "Pratique",
    category: "B",
    status: "Planifié",
    attempts: [],
    needsArticle23: false,
  },
];

export const MOCK_DOCUMENTS: StudentDocument[] = [
  {
    id: "DOC-001",
    name: "Permis d'élève conducteur",
    type: "Permis",
    size: 245000,
    uploadDate: "2024-09-01T10:00:00Z",
    uploadedBy: {
      id: "ADM-001",
      name: "Admin École",
    },
    url: "/documents/permis-eleve.pdf",
    folder: "Permis élève",
  },
  {
    id: "DOC-002",
    name: "Attestation cours sensibilisation",
    type: "Attestation",
    size: 180000,
    uploadDate: "2024-09-15T14:30:00Z",
    uploadedBy: {
      id: "ADM-001",
      name: "Admin École",
    },
    url: "/documents/cours-sensibilisation.pdf",
    folder: "Cours obligatoires",
  },
  {
    id: "DOC-003",
    name: "Résultat examen théorique",
    type: "Attestation",
    size: 120000,
    uploadDate: "2024-10-15T16:00:00Z",
    uploadedBy: {
      id: "INS-001",
      name: "Jean Dupont",
    },
    url: "/documents/exam-theory-result.pdf",
    folder: "Attestations",
  },
  {
    id: "DOC-004",
    name: "Photo identité",
    type: "Photo",
    size: 85000,
    uploadDate: "2024-09-01T10:00:00Z",
    uploadedBy: {
      id: "STU-001",
      name: "Lucas Müller",
    },
    url: "https://github.com/yusufhilmi.png",
    folder: "Photos",
  },
  {
    id: "DOC-005",
    name: "Facture forfait 25 leçons",
    type: "Facture",
    size: 95000,
    uploadDate: "2024-09-01T11:00:00Z",
    uploadedBy: {
      id: "ADM-001",
      name: "Admin École",
    },
    url: "/documents/invoice-001.pdf",
    folder: "Factures",
  },
];

export const MOCK_STUDENT_INVOICES: StudentInvoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "2024-001",
    date: "2024-09-01",
    amount: 2500,
    status: "Payée",
    dueDate: "2024-09-30",
    paidDate: "2024-09-15",
    paidAmount: 2500,
    items: [
      {
        description: "Forfait 25 leçons de conduite (90 min)",
        quantity: 1,
        unitPrice: 2500,
        total: 2500,
      },
    ],
  },
  {
    id: "INV-002",
    invoiceNumber: "2024-045",
    date: "2024-10-01",
    amount: 350,
    status: "Payée",
    dueDate: "2024-10-30",
    paidDate: "2024-10-10",
    paidAmount: 350,
    items: [
      {
        description: "Cours de sensibilisation (8h)",
        quantity: 1,
        unitPrice: 350,
        total: 350,
      },
    ],
  },
  {
    id: "INV-003",
    invoiceNumber: "2025-003",
    date: "2025-01-05",
    amount: 500,
    status: "Envoyée",
    dueDate: "2025-01-31",
    items: [
      {
        description: "Leçons supplémentaires",
        quantity: 5,
        unitPrice: 100,
        total: 500,
      },
    ],
  },
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "EVT-001",
    title: "Leçon de conduite - Circulation urbaine",
    start: "2025-01-15T14:00:00Z",
    end: "2025-01-15T15:30:00Z",
    instructor: {
      id: "INS-001",
      name: "Jean Dupont",
    },
    vehicle: "VD-123456",
    category: "B",
    status: "Confirmée",
    notes: "RDV devant l'école",
  },
  {
    id: "EVT-002",
    title: "Leçon de conduite - Autoroute",
    start: "2025-01-18T10:00:00Z",
    end: "2025-01-18T11:30:00Z",
    instructor: {
      id: "INS-001",
      name: "Jean Dupont",
    },
    vehicle: "VD-123456",
    category: "B",
    status: "Planifiée",
  },
  {
    id: "EVT-003",
    title: "Examen pratique",
    start: "2025-02-15T09:00:00Z",
    end: "2025-02-15T10:00:00Z",
    instructor: {
      id: "INS-001",
      name: "Jean Dupont",
    },
    vehicle: "VD-123456",
    category: "B",
    status: "Confirmée",
    notes: "RDV 30 min avant au centre d'examen",
  },
];

export const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "LOG-001",
    timestamp: "2025-01-10T14:00:00Z",
    user: {
      id: "INS-001",
      name: "Jean Dupont",
      avatar: "https://github.com/kdrnp.png",
      role: "Moniteur",
    },
    action: "lesson",
    description: "a complété une leçon de conduite",
    details: {
      metadata: {
        lessonId: "LES-001",
        duration: 90,
        themes: ["Circulation urbaine", "Stationnement"],
        rating: 5,
      },
    },
  },
  {
    id: "LOG-002",
    timestamp: "2025-01-08T15:30:00Z",
    user: {
      id: "INS-001",
      name: "Jean Dupont",
      avatar: "https://github.com/kdrnp.png",
      role: "Moniteur",
    },
    action: "lesson",
    description: "a complété une leçon de conduite",
    details: {
      metadata: {
        lessonId: "LES-002",
        duration: 90,
        themes: ["Autoroute", "Dépassements"],
        rating: 4,
      },
    },
  },
  {
    id: "LOG-003",
    timestamp: "2025-01-05T10:00:00Z",
    user: {
      id: "ADM-001",
      name: "Admin École",
      role: "Administrateur",
    },
    action: "create",
    description: "a créé une facture",
    details: {
      metadata: {
        invoiceId: "INV-003",
        amount: 500,
      },
    },
  },
  {
    id: "LOG-004",
    timestamp: "2024-12-20T16:00:00Z",
    user: {
      id: "ADM-001",
      name: "Admin École",
      role: "Administrateur",
    },
    action: "update",
    description: "a modifié le moniteur assigné",
    details: {
      field: "instructor",
      oldValue: "Pierre Martin",
      newValue: "Jean Dupont",
    },
  },
  {
    id: "LOG-005",
    timestamp: "2024-10-15T16:00:00Z",
    user: {
      id: "INS-001",
      name: "Jean Dupont",
      avatar: "https://github.com/kdrnp.png",
      role: "Moniteur",
    },
    action: "document",
    description: "a ajouté un document",
    details: {
      metadata: {
        documentId: "DOC-003",
        documentName: "Résultat examen théorique",
      },
    },
  },
  {
    id: "LOG-006",
    timestamp: "2024-09-15T14:30:00Z",
    user: {
      id: "ADM-001",
      name: "Admin École",
      role: "Administrateur",
    },
    action: "payment",
    description: "a enregistré un paiement",
    details: {
      metadata: {
        invoiceId: "INV-001",
        amount: 2500,
      },
    },
  },
  {
    id: "LOG-007",
    timestamp: "2024-09-01T10:00:00Z",
    user: {
      id: "ADM-001",
      name: "Admin École",
      role: "Administrateur",
    },
    action: "create",
    description: "a créé le dossier élève",
    details: {
      metadata: {
        studentId: "STU-001",
        category: "B",
      },
    },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getMasteryColor(mastery: number): string {
  if (mastery >= 75) return "text-green-600 dark:text-green-400";
  if (mastery >= 50) return "text-yellow-600 dark:text-yellow-400";
  if (mastery >= 25) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function getMasteryBgColor(mastery: number): string {
  if (mastery >= 75) return "bg-green-600";
  if (mastery >= 50) return "bg-yellow-600";
  if (mastery >= 25) return "bg-orange-600";
  return "bg-red-600";
}

export function getMasteryLabel(mastery: number): ThemeMastery {
  if (mastery >= 75) return "Maîtrisé";
  if (mastery >= 50) return "Bien";
  if (mastery >= 25) return "En cours";
  return "Initiation";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function getInvoiceStatusColor(status: InvoiceStatus): string {
  switch (status) {
    case "Payée":
      return "bg-green-600";
    case "Envoyée":
      return "bg-blue-600";
    case "En retard":
      return "bg-red-600";
    case "Annulée":
      return "bg-gray-600";
    default:
      return "bg-gray-400";
  }
}

export function getLessonStatusColor(status: LessonStatus): string {
  switch (status) {
    case "Complétée":
      return "bg-green-600";
    case "Confirmée":
      return "bg-blue-600";
    case "Planifiée":
      return "bg-gray-600";
    case "Annulée":
      return "bg-red-600";
    case "Reportée":
      return "bg-orange-600";
    default:
      return "bg-gray-400";
  }
}

export function getActionIcon(action: ActionType): string {
  switch (action) {
    case "create":
      return "Plus";
    case "update":
      return "Edit";
    case "delete":
      return "Trash2";
    case "status_change":
      return "RefreshCw";
    case "payment":
      return "CreditCard";
    case "lesson":
      return "Car";
    case "document":
      return "FileText";
    default:
      return "Activity";
  }
}
