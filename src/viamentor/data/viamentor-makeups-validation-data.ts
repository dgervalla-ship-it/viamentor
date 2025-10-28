/**
 * VIAMENTOR - Makeups Validation Data
 * Mock data workflow validation admin
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Demande rattrapage en attente validation
 */
export interface MakeupRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  lessonId: string;
  lessonDate: string;
  lessonTime: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  reason: MakeupReason;
  reasonDetails: string;
  certificate?: {
    id: string;
    filename: string;
    url: string;
    uploadedAt: string;
  };
  requestedAt: string;
  expiresAt: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  adminNotes?: string;
}

/**
 * Raison demande rattrapage
 */
export type MakeupReason =
  | "illness"
  | "weather"
  | "emergency"
  | "vehicle_issue"
  | "instructor_absence"
  | "other";

/**
 * Stats validation admin
 */
export interface ValidationStats {
  pending: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  averageDecisionTime: number; // hours
  slaCompliance: number; // percentage
  overdueRequests: number;
}

/**
 * Performance admin
 */
export interface AdminPerformance {
  adminId: string;
  adminName: string;
  adminAvatar: string;
  validationsCount: number;
  averageDecisionTime: number;
  approvalRate: number;
  satisfaction?: number;
}

/**
 * Analytics validation
 */
export interface ValidationAnalytics {
  period: {
    start: string;
    end: string;
  };
  requestsByDay: Array<{
    date: string;
    count: number;
  }>;
  reasonsDistribution: Record<MakeupReason, number>;
  conversionFunnel: {
    requested: number;
    approved: number;
    used: number;
  };
  adminPerformance: AdminPerformance[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Demandes en attente
 */
export const mockPendingRequests: MakeupRequest[] = [
  {
    id: "req-001",
    studentId: "student-001",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/yusufhilmi.png",
    studentEmail: "sophie.martin@example.com",
    lessonId: "lesson-001",
    lessonDate: "2024-02-10",
    lessonTime: "14:00",
    instructorId: "instructor-001",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/kdrnp.png",
    reason: "illness",
    reasonDetails: "Grippe avec fièvre, impossible de conduire en sécurité",
    certificate: {
      id: "cert-001",
      filename: "certificat_medical_10-02-2024.pdf",
      url: "/uploads/certificates/cert-001.pdf",
      uploadedAt: "2024-02-10T09:30:00Z",
    },
    requestedAt: "2024-02-10T09:30:00Z",
    expiresAt: "2024-02-11T09:30:00Z",
    status: "pending",
  },
  {
    id: "req-002",
    studentId: "student-002",
    studentName: "Lucas Bernard",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    studentEmail: "lucas.bernard@example.com",
    lessonId: "lesson-002",
    lessonDate: "2024-02-09",
    lessonTime: "10:00",
    instructorId: "instructor-002",
    instructorName: "Julie Rousseau",
    instructorAvatar: "https://github.com/denizbuyuktas.png",
    reason: "weather",
    reasonDetails:
      "Tempête de neige, routes impraticables selon police cantonale",
    requestedAt: "2024-02-09T08:00:00Z",
    expiresAt: "2024-02-10T08:00:00Z",
    status: "pending",
  },
  {
    id: "req-003",
    studentId: "student-003",
    studentName: "Emma Dubois",
    studentAvatar: "https://github.com/shoaibux1.png",
    studentEmail: "emma.dubois@example.com",
    lessonId: "lesson-003",
    lessonDate: "2024-02-08",
    lessonTime: "16:00",
    instructorId: "instructor-001",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/kdrnp.png",
    reason: "emergency",
    reasonDetails: "Urgence familiale - hospitalisation parent",
    requestedAt: "2024-02-08T15:30:00Z",
    expiresAt: "2024-02-09T15:30:00Z",
    status: "pending",
  },
  {
    id: "req-004",
    studentId: "student-004",
    studentName: "Thomas Petit",
    studentAvatar: "https://github.com/yusufhilmi.png",
    studentEmail: "thomas.petit@example.com",
    lessonId: "lesson-004",
    lessonDate: "2024-02-07",
    lessonTime: "11:00",
    instructorId: "instructor-003",
    instructorName: "Pierre Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    reason: "instructor_absence",
    reasonDetails:
      "Moniteur absent pour raison personnelle, leçon annulée par l'école",
    requestedAt: "2024-02-07T10:45:00Z",
    expiresAt: "2024-02-08T10:45:00Z",
    status: "pending",
  },
];

/**
 * Stats validation
 */
export const mockValidationStats: ValidationStats = {
  pending: 4,
  approvedThisMonth: 28,
  rejectedThisMonth: 3,
  averageDecisionTime: 4.2,
  slaCompliance: 94.5,
  overdueRequests: 1,
};

/**
 * Performance admins
 */
export const mockAdminPerformance: AdminPerformance[] = [
  {
    adminId: "admin-001",
    adminName: "Claire Dubois",
    adminAvatar: "https://github.com/denizbuyuktas.png",
    validationsCount: 45,
    averageDecisionTime: 3.8,
    approvalRate: 92.5,
    satisfaction: 4.7,
  },
  {
    adminId: "admin-002",
    adminName: "Jean Martin",
    adminAvatar: "https://github.com/kdrnp.png",
    validationsCount: 38,
    averageDecisionTime: 5.2,
    approvalRate: 88.3,
    satisfaction: 4.5,
  },
  {
    adminId: "admin-003",
    adminName: "Marie Rousseau",
    adminAvatar: "https://github.com/shoaibux1.png",
    validationsCount: 52,
    averageDecisionTime: 2.9,
    approvalRate: 95.1,
    satisfaction: 4.8,
  },
];

/**
 * Analytics validation
 */
export const mockValidationAnalytics: ValidationAnalytics = {
  period: {
    start: "2024-01-01",
    end: "2024-02-15",
  },
  requestsByDay: [
    { date: "2024-02-01", count: 3 },
    { date: "2024-02-02", count: 5 },
    { date: "2024-02-03", count: 2 },
    { date: "2024-02-04", count: 4 },
    { date: "2024-02-05", count: 6 },
    { date: "2024-02-06", count: 3 },
    { date: "2024-02-07", count: 7 },
    { date: "2024-02-08", count: 4 },
    { date: "2024-02-09", count: 5 },
    { date: "2024-02-10", count: 3 },
  ],

  reasonsDistribution: {
    illness: 14,
    weather: 9,
    emergency: 6,
    vehicle_issue: 3,
    instructor_absence: 5,
    other: 2,
  },
  conversionFunnel: {
    requested: 39,
    approved: 35,
    used: 27,
  },
  adminPerformance: mockAdminPerformance,
};

// ============================================================================
// I18N
// ============================================================================

export type ValidationLocale = "fr" | "de" | "it" | "en";

export const validationTranslations = {
  fr: {
    title: "Validation Rattrapages",
    description: "Gérer les demandes de rattrapages en attente",
    stats: {
      pending: "En attente",
      approved: "Approuvés ce mois",
      rejected: "Refusés",
      avgDecisionTime: "Délai moyen décision",
      slaCompliance: "Respect SLA <24h",
      overdue: "En retard",
    },
    table: {
      student: "Élève",
      lesson: "Leçon origine",
      reason: "Raison",
      certificate: "Certificat",
      requestDate: "Date demande",
      deadline: "Décision avant",
      actions: "Actions",
    },
    reasons: {
      illness: "Maladie",
      weather: "Météo",
      emergency: "Urgence",
      vehicle_issue: "Problème véhicule",
      instructor_absence: "Absence moniteur",
      other: "Autre",
    },
    actions: {
      approve: "Approuver",
      reject: "Refuser",
      viewCertificate: "Voir",
    },
    filters: {
      dateRange: "Période demande",
      reason: "Raison",
      withCertificate: "Avec certificat",
      sortOldest: "Plus anciennes d'abord",
    },
  },
  de: {
    title: "Nachholtermine Validierung",
    description: "Ausstehende Nachholtermine verwalten",
    stats: {
      pending: "Ausstehend",
      approved: "Genehmigt diesen Monat",
      rejected: "Abgelehnt",
      avgDecisionTime: "Durchschn. Entscheidungszeit",
      slaCompliance: "SLA <24h Einhaltung",
      overdue: "Überfällig",
    },
    table: {
      student: "Schüler",
      lesson: "Ursprungslektion",
      reason: "Grund",
      certificate: "Zertifikat",
      requestDate: "Anfragedatum",
      deadline: "Entscheidung vor",
      actions: "Aktionen",
    },
    reasons: {
      illness: "Krankheit",
      weather: "Wetter",
      emergency: "Notfall",
      vehicle_issue: "Fahrzeugproblem",
      instructor_absence: "Instruktor abwesend",
      other: "Andere",
    },
    actions: {
      approve: "Genehmigen",
      reject: "Ablehnen",
      viewCertificate: "Ansehen",
    },
    filters: {
      dateRange: "Anfragezeitraum",
      reason: "Grund",
      withCertificate: "Mit Zertifikat",
      sortOldest: "Älteste zuerst",
    },
  },
  it: {
    title: "Validazione Recuperi",
    description: "Gestire le richieste di recupero in attesa",
    stats: {
      pending: "In attesa",
      approved: "Approvati questo mese",
      rejected: "Rifiutati",
      avgDecisionTime: "Tempo medio decisione",
      slaCompliance: "Rispetto SLA <24h",
      overdue: "In ritardo",
    },
    table: {
      student: "Studente",
      lesson: "Lezione origine",
      reason: "Motivo",
      certificate: "Certificato",
      requestDate: "Data richiesta",
      deadline: "Decisione prima",
      actions: "Azioni",
    },
    reasons: {
      illness: "Malattia",
      weather: "Meteo",
      emergency: "Emergenza",
      vehicle_issue: "Problema veicolo",
      instructor_absence: "Assenza istruttore",
      other: "Altro",
    },
    actions: {
      approve: "Approvare",
      reject: "Rifiutare",
      viewCertificate: "Visualizza",
    },
    filters: {
      dateRange: "Periodo richiesta",
      reason: "Motivo",
      withCertificate: "Con certificato",
      sortOldest: "Più vecchie prima",
    },
  },
  en: {
    title: "Makeup Validation",
    description: "Manage pending makeup lesson requests",
    stats: {
      pending: "Pending",
      approved: "Approved this month",
      rejected: "Rejected",
      avgDecisionTime: "Avg decision time",
      slaCompliance: "SLA <24h compliance",
      overdue: "Overdue",
    },
    table: {
      student: "Student",
      lesson: "Original lesson",
      reason: "Reason",
      certificate: "Certificate",
      requestDate: "Request date",
      deadline: "Decision before",
      actions: "Actions",
    },
    reasons: {
      illness: "Illness",
      weather: "Weather",
      emergency: "Emergency",
      vehicle_issue: "Vehicle issue",
      instructor_absence: "Instructor absence",
      other: "Other",
    },
    actions: {
      approve: "Approve",
      reject: "Reject",
      viewCertificate: "View",
    },
    filters: {
      dateRange: "Request period",
      reason: "Reason",
      withCertificate: "With certificate",
      sortOldest: "Oldest first",
    },
  },
};
