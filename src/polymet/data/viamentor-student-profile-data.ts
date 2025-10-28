/**
 * VIAMENTOR - Student Profile Data
 * Mock data et types pour profil élève avec documents légaux, préférences, sécurité
 */

// ============================================================================
// TYPES
// ============================================================================

export type Gender = "male" | "female" | "other" | "not_specified";
export type DocumentType =
  | "learner_permit"
  | "course_certificate"
  | "vision_certificate"
  | "identity_card"
  | "medical_certificate";
export type DocumentStatus = "valid" | "expired" | "missing" | "pending";
export type PreferredTimeSlot = "morning" | "afternoon" | "evening" | "weekend";
export type SupportSubject = "technical" | "billing" | "planning" | "other";
export type DeviceType = "desktop" | "mobile" | "tablet";

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  gender: Gender;
  avatar: string;
  address: {
    street: string;
    zip: string;
    city: string;
    canton: string;
  };
  language: "fr" | "de" | "it" | "en";
  categories: string[];
  assignedInstructor: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    specialties: string[];
    rating: number;
  } | null;
  enrollmentDate: string;
  school: {
    id: string;
    name: string;
    logo: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    hours: string;
  };
}

export interface LegalDocument {
  id: string;
  type: DocumentType;
  status: DocumentStatus;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  expirationDate?: string;
  daysUntilExpiration?: number;
  number?: string;
  issuedDate?: string;
}

export interface TrainingHistory {
  enrollmentDate: string;
  categories: Array<{
    category: string;
    enrollmentDate: string;
  }>;
  packages: Array<{
    id: string;
    name: string;
    lessonsCount: number;
    purchaseDate: string;
    price: number;
  }>;
  exams: Array<{
    id: string;
    type: "theory" | "practical";
    date: string;
    result: "passed" | "failed" | "pending";
    score?: number;
    category?: string;
  }>;
  licenseObtained?: {
    date: string;
    category: string;
    number: string;
  };
}

export interface AccountPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    newsletter: boolean;
  };
  privacy: {
    shareProgressWithFamily: boolean;
  };
  preferredTimeSlots: PreferredTimeSlot[];
  constraints?: string;
  preferredVehicle?: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  os: string;
  location: {
    ip: string;
    city: string;
    country: string;
    flag: string;
  };
  lastActivity: string;
  isCurrent: boolean;
}

export interface ConnectedAccount {
  id: string;
  provider: "google" | "facebook" | "apple";
  email: string;
  connectedDate: string;
}

export interface SupportTicket {
  id: string;
  subject: SupportSubject;
  message: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  attachments?: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockStudentProfile: StudentProfile = {
  id: "STU-2024-001",
  firstName: "Sophie",
  lastName: "Martin",
  email: "sophie.martin@example.ch",
  phone: "+41 79 123 45 67",
  dateOfBirth: "2005-03-15",
  age: 19,
  gender: "female",
  avatar: "https://github.com/yahyabedirhan.png",
  address: {
    street: "Rue de la Gare 12",
    zip: "1003",
    city: "Lausanne",
    canton: "VD",
  },
  language: "fr",
  categories: ["B", "A1"],
  assignedInstructor: {
    id: "INS-001",
    name: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    phone: "+41 79 234 56 78",
    email: "marc.dubois@viamentor.ch",
    specialties: ["B", "A1", "Formation continue"],
    rating: 4.8,
  },
  enrollmentDate: "2024-01-15",
  school: {
    id: "SCH-001",
    name: "Auto-École ViaMenutor Lausanne",
    logo: "https://github.com/polymet-ai.png",
    address: "Avenue de la Gare 45, 1003 Lausanne",
    phone: "+41 21 123 45 67",
    email: "contact@viamentor-lausanne.ch",
    website: "https://viamentor-lausanne.ch",
    hours: "Lun-Ven: 8h-18h, Sam: 9h-16h",
  },
};

export const mockLegalDocuments: LegalDocument[] = [
  {
    id: "DOC-001",
    type: "learner_permit",
    status: "valid",
    fileName: "permis_eleve_martin_sophie.pdf",
    fileUrl: "/documents/learner_permit.pdf",
    uploadDate: "2024-01-15",
    expirationDate: "2026-01-15",
    daysUntilExpiration: 730,
    number: "VD-2024-123456",
    issuedDate: "2024-01-10",
  },
  {
    id: "DOC-002",
    type: "course_certificate",
    status: "valid",
    fileName: "attestation_cours_sensibilisation.pdf",
    fileUrl: "/documents/course_certificate.pdf",
    uploadDate: "2024-02-01",
    expirationDate: "2026-02-01",
    daysUntilExpiration: 745,
  },
  {
    id: "DOC-003",
    type: "vision_certificate",
    status: "valid",
    fileName: "certificat_vue_2024.pdf",
    fileUrl: "/documents/vision_certificate.pdf",
    uploadDate: "2024-01-10",
    expirationDate: "2026-01-10",
    daysUntilExpiration: 725,
  },
  {
    id: "DOC-004",
    type: "identity_card",
    status: "valid",
    fileName: "carte_identite.pdf",
    fileUrl: "/documents/identity_card.pdf",
    uploadDate: "2024-01-15",
    expirationDate: "2029-03-15",
    daysUntilExpiration: 1825,
  },
];

export const mockTrainingHistory: TrainingHistory = {
  enrollmentDate: "2024-01-15",
  categories: [
    { category: "B", enrollmentDate: "2024-01-15" },
    { category: "A1", enrollmentDate: "2024-03-01" },
  ],

  packages: [
    {
      id: "PKG-001",
      name: "Pack 10 leçons B",
      lessonsCount: 10,
      purchaseDate: "2024-01-15",
      price: 950,
    },
    {
      id: "PKG-002",
      name: "Pack 5 leçons A1",
      lessonsCount: 5,
      purchaseDate: "2024-03-01",
      price: 500,
    },
  ],

  exams: [
    {
      id: "EXM-001",
      type: "theory",
      date: "2024-02-15",
      result: "passed",
      score: 48,
      category: "B",
    },
    {
      id: "EXM-002",
      type: "practical",
      date: "2024-04-20",
      result: "pending",
      category: "B",
    },
  ],
};

export const mockAccountPreferences: AccountPreferences = {
  notifications: {
    email: true,
    sms: false,
    newsletter: true,
  },
  privacy: {
    shareProgressWithFamily: false,
  },
  preferredTimeSlots: ["afternoon", "evening"],
  constraints:
    "Préfère éviter l'autoroute au début. Porte des lunettes obligatoires.",
  preferredVehicle: "VEH-001",
};

export const mockActiveSessions: ActiveSession[] = [
  {
    id: "SES-001",
    device: "Desktop",
    browser: "Chrome 120",
    os: "Windows 11",
    location: {
      ip: "185.12.34.56",
      city: "Lausanne",
      country: "Switzerland",
      flag: "🇨🇭",
    },
    lastActivity: "2024-01-20T14:30:00Z",
    isCurrent: true,
  },
  {
    id: "SES-002",
    device: "Mobile",
    browser: "Safari 17",
    os: "iOS 17",
    location: {
      ip: "185.12.34.78",
      city: "Lausanne",
      country: "Switzerland",
      flag: "🇨🇭",
    },
    lastActivity: "2024-01-19T18:45:00Z",
    isCurrent: false,
  },
];

export const mockConnectedAccounts: ConnectedAccount[] = [
  {
    id: "ACC-001",
    provider: "google",
    email: "sophie.martin@gmail.com",
    connectedDate: "2024-01-15",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getDocumentStatusColor(status: DocumentStatus): string {
  const colors = {
    valid: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950",
    expired: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
    missing:
      "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
    pending: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
  };
  return colors[status];
}

export function getDocumentStatusIcon(status: DocumentStatus): string {
  const icons = {
    valid: "CheckCircle2Icon",
    expired: "XCircleIcon",
    missing: "AlertCircleIcon",
    pending: "ClockIcon",
  };
  return icons[status];
}

export function isDocumentExpiringSoon(daysUntilExpiration?: number): boolean {
  return daysUntilExpiration !== undefined && daysUntilExpiration < 60;
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function formatPhoneNumber(phone: string): string {
  // Format: +41 79 123 45 67
  return phone.replace(
    /(\+\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/,
    "$1 $2 $3 $4 $5"
  );
}
