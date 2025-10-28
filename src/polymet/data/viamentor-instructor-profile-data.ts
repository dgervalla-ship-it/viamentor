/**
 * VIAMENTOR - Instructor Profile Data
 * Mock data et types pour profil moniteur
 */

import type {
  PersonalInfoData,
  CertificateData,
  SpecialtiesData,
  TeachingPreferencesData,
} from "@/polymet/data/viamentor-instructor-profile-schemas";

// ============================================================================
// TYPES
// ============================================================================

export interface InstructorProfile {
  id: string;
  personalInfo: PersonalInfoData;
  authorizedCategories: string[];
  certificates: CertificateData[];
  specialties: SpecialtiesData;
  teachingPreferences: TeachingPreferencesData;
  stats: InstructorStats;
  vehicles: AssignedVehicle[];
  security: SecuritySettings;
}

export interface InstructorStats {
  lessonsCompleted: number;
  lessonsTrend: number; // percentage
  hoursTeaching: number;
  hoursTrend: number;
  studentsTrained: number;
  studentsTrend: number;
  averageRating: number;
  ratingTrend: number;
  lessonsPerMonth: MonthlyLessons[];
}

export interface MonthlyLessons {
  month: string;
  lessons: number;
}

export interface AssignedVehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  category: string;
  isPreferred: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessions: ActiveSession[];
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: Date;
  isCurrent: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockInstructorProfile: InstructorProfile = {
  id: "inst-001",
  personalInfo: {
    firstName: "Marc",
    lastName: "Dubois",
    birthDate: new Date("1992-05-15"),
    gender: "male",
    email: "marc.dubois@viamentor.ch",
    phone: "+41 79 123 45 67",
    address: "Rue de la Gare 12",
    postalCode: "1003",
    city: "Lausanne",
    canton: "VD",
    locale: "fr",
    avatar: "https://github.com/yusufhilmi.png",
  },
  authorizedCategories: ["B", "BE", "A1"],
  certificates: [
    {
      id: "cert-001",
      type: "teaching_permit",
      status: "valid",
      issueDate: new Date("2020-03-15"),
      expirationDate: new Date("2025-03-15"),
      fileUrl: "/certificates/teaching-permit.pdf",
      fileName: "permis-enseignement-2020.pdf",
    },
    {
      id: "cert-002",
      type: "pedagogical_certificate",
      status: "valid",
      issueDate: new Date("2019-09-01"),
      fileUrl: "/certificates/pedagogical.pdf",
      fileName: "brevet-pedagogique.pdf",
    },
    {
      id: "cert-003",
      type: "professional_liability",
      status: "expiring_soon",
      issueDate: new Date("2024-01-01"),
      expirationDate: new Date("2025-01-31"),
      fileUrl: "/certificates/rc-pro.pdf",
      fileName: "rc-professionnelle-2024.pdf",
      notes: "Renouvellement en cours",
    },
    {
      id: "cert-004",
      type: "criminal_record",
      status: "valid",
      issueDate: new Date("2024-06-15"),
      expirationDate: new Date("2025-06-15"),
      fileUrl: "/certificates/criminal-record.pdf",
      fileName: "casier-judiciaire-2024.pdf",
    },
    {
      id: "cert-005",
      type: "medical_certificate",
      status: "valid",
      issueDate: new Date("2024-03-20"),
      expirationDate: new Date("2026-03-20"),
      fileUrl: "/certificates/medical.pdf",
      fileName: "certificat-medical-2024.pdf",
    },
  ],

  specialties: {
    specialties: ["beginners", "exam_prep", "defensive", "eco_driving"],
    bio: "Moniteur passionné avec 5 ans d'expérience. Spécialisé dans l'accompagnement des débutants avec une approche pédagogique bienveillante et structurée. Expert en préparation aux examens avec un taux de réussite de 92%. Formé aux techniques de conduite défensive et éco-conduite. Patient, à l'écoute et déterminé à faire de vous un conducteur confiant et responsable.",
  },
  teachingPreferences: {
    preferredStudentTypes: ["young_adults", "adults"],
    preferredTimeSlots: ["morning", "afternoon", "evening"],
    hourlyRate: 95,
    maxStudentsPerWeek: 15,
    preferredVehicleIds: ["veh-001", "veh-003"],
  },
  stats: {
    lessonsCompleted: 847,
    lessonsTrend: 12.5,
    hoursTeaching: 1270,
    hoursTrend: 8.3,
    studentsTrained: 156,
    studentsTrend: 15.2,
    averageRating: 4.8,
    ratingTrend: 2.1,
    lessonsPerMonth: [
      { month: "Jan", lessons: 65 },
      { month: "Fév", lessons: 72 },
      { month: "Mar", lessons: 78 },
      { month: "Avr", lessons: 85 },
      { month: "Mai", lessons: 92 },
      { month: "Juin", lessons: 88 },
      { month: "Juil", lessons: 75 },
      { month: "Aoû", lessons: 68 },
      { month: "Sep", lessons: 95 },
      { month: "Oct", lessons: 102 },
      { month: "Nov", lessons: 98 },
      { month: "Déc", lessons: 89 },
    ],
  },
  vehicles: [
    {
      id: "veh-001",
      plate: "VD 123456",
      brand: "VW",
      model: "Golf",
      category: "B",
      isPreferred: true,
    },
    {
      id: "veh-003",
      plate: "VD 789012",
      brand: "Audi",
      model: "A3",
      category: "B",
      isPreferred: true,
    },
    {
      id: "veh-005",
      plate: "VD 345678",
      brand: "BMW",
      model: "318i",
      category: "B",
      isPreferred: false,
    },
  ],

  security: {
    twoFactorEnabled: true,
    activeSessions: [
      {
        id: "session-001",
        device: "Chrome - Windows 11",
        location: "Lausanne, VD",
        lastActive: new Date(),
        isCurrent: true,
      },
      {
        id: "session-002",
        device: "Safari - iPhone 15",
        location: "Lausanne, VD",
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isCurrent: false,
      },
      {
        id: "session-003",
        device: "Firefox - macOS",
        location: "Genève, GE",
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isCurrent: false,
      },
    ],
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getCertificateStatus(
  cert: CertificateData
): "valid" | "expiring_soon" | "expired" {
  if (!cert.expirationDate) return "valid";

  const now = new Date();
  const daysUntilExpiry = Math.floor(
    (cert.expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilExpiry < 0) return "expired";
  if (daysUntilExpiry < 60) return "expiring_soon";
  return "valid";
}

export function getDaysUntilExpiry(expirationDate: Date): number {
  const now = new Date();
  return Math.floor(
    (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function hasExpiredCertificates(
  certificates: CertificateData[]
): boolean {
  return certificates.some((cert) => cert.status === "expired");
}

export function hasExpiringSoonCertificates(
  certificates: CertificateData[]
): boolean {
  return certificates.some((cert) => cert.status === "expiring_soon");
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
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
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("41")) {
    const countryCode = cleaned.slice(0, 2);
    const areaCode = cleaned.slice(2, 4);
    const part1 = cleaned.slice(4, 7);
    const part2 = cleaned.slice(7, 9);
    const part3 = cleaned.slice(9, 11);
    return `+${countryCode} ${areaCode} ${part1} ${part2} ${part3}`;
  }
  return phone;
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: "Faible", color: "text-destructive" };
  if (score <= 4) return { score, label: "Moyen", color: "text-orange-500" };
  return { score, label: "Fort", color: "text-green-500" };
}
