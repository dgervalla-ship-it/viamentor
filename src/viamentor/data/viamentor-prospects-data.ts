/**
 * VIAMENTOR - Prospects CRM Data
 * Mock data et types TypeScript pour pipeline gestion prospects
 */

import type { ProspectsLocale } from "@/viamentor/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

export type ProspectStatus =
  | "new"
  | "contacted"
  | "interested"
  | "appointment"
  | "hot"
  | "converted"
  | "lost";

export type ProspectSource =
  | "google"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "referral"
  | "direct"
  | "other";

export type LicenseCategory =
  | "B"
  | "A"
  | "BE"
  | "A1"
  | "BPT"
  | "sensibilisation"
  | "premiers_secours"
  | "autre";

export interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: ProspectStatus;
  source: ProspectSource;
  category: LicenseCategory;
  leadScore: number; // 0-100
  assignedTo: string | null; // Team member ID
  createdAt: string; // ISO date
  contactedAt: string | null; // ISO date
  convertedAt: string | null; // ISO date
  notes: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "secretary" | "instructor" | "admin";
  avatar: string;
  active: boolean;
  workload: number; // Number of assigned prospects
}

export interface ProspectStats {
  activeProspects: number;
  newThisMonth: number;
  newThisMonthTrend: number; // Percentage
  conversionRate: number; // Percentage
  avgConversionTime: number; // Days
  pipelineValue: number; // CHF
}

export interface ProspectsFilters {
  search: string;
  sources: ProspectSource[];
  categories: LicenseCategory[];
  assignedTo: string | null;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  leadScoreRange: [number, number];
  notContactedOver24h: boolean;
}

// Detail sheet types
export type InteractionType =
  | "call"
  | "email"
  | "sms"
  | "meeting"
  | "statusChange"
  | "noteAdded"
  | "documentShared";

export type CallOutcome =
  | "answered"
  | "voicemail"
  | "noAnswer"
  | "invalidNumber"
  | "callBack";

export type CallDirection = "inbound" | "outbound";

export type DocumentVisibility = "internal" | "shared";

export type NoteVisibility = "private" | "team";

export type LostReason =
  | "priceTooHigh"
  | "longWaitTime"
  | "preferCompetitor"
  | "notInterested"
  | "unreachable"
  | "other";

export interface ProspectInteraction {
  id: string;
  prospectId: string;
  type: InteractionType;
  date: string; // ISO date
  userId: string; // Team member ID
  description: string;
  details?: string;
  attachments?: string[];
  metadata?: Record<string, any>;
}

export interface ProspectEmail {
  id: string;
  prospectId: string;
  subject: string;
  from: string;
  to: string;
  body: string;
  date: string; // ISO date
  attachments?: string[];
  opened?: boolean;
  clicked?: boolean;
}

export interface ProspectSMS {
  id: string;
  prospectId: string;
  message: string;
  direction: CallDirection;
  date: string; // ISO date
  delivered: boolean;
}

export interface ProspectCall {
  id: string;
  prospectId: string;
  direction: CallDirection;
  duration: number; // seconds
  date: string; // ISO date
  outcome: CallOutcome;
  recording?: string; // URL
  notes?: string;
  userId: string; // Team member ID
}

export interface ProspectDocument {
  id: string;
  prospectId: string;
  name: string;
  size: number; // bytes
  type: string; // MIME type
  url: string;
  uploadDate: string; // ISO date
  uploadedBy: string; // User ID
  visibility: DocumentVisibility;
}

export interface ProspectNote {
  id: string;
  prospectId: string;
  content: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  authorId: string; // User ID
  visibility: NoteVisibility;
  pinned: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Sophie Martin",
    email: "sophie.martin@viamentor.ch",
    role: "secretary",
    avatar: "https://github.com/shoaibux1.png",
    active: true,
    workload: 12,
  },
  {
    id: "tm-2",
    name: "Marc Dubois",
    email: "marc.dubois@viamentor.ch",
    role: "admin",
    avatar: "https://github.com/yusufhilmi.png",
    active: true,
    workload: 8,
  },
  {
    id: "tm-3",
    name: "Julie Schneider",
    email: "julie.schneider@viamentor.ch",
    role: "secretary",
    avatar: "https://github.com/kdrnp.png",
    active: true,
    workload: 15,
  },
  {
    id: "tm-4",
    name: "Thomas Weber",
    email: "thomas.weber@viamentor.ch",
    role: "instructor",
    avatar: "https://github.com/yahyabedirhan.png",
    active: true,
    workload: 5,
  },
];

export const mockProspects: Prospect[] = [
  {
    id: "pr-1",
    firstName: "Emma",
    lastName: "Müller",
    email: "emma.muller@email.ch",
    phone: "+41 79 123 45 67",
    status: "new",
    source: "google",
    category: "B",
    leadScore: 85,
    assignedTo: null,
    createdAt: "2025-01-15T10:30:00Z",
    contactedAt: null,
    convertedAt: null,
    notes: "Intéressée par formation accélérée",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "permis-b-2025",
  },
  {
    id: "pr-2",
    firstName: "Lucas",
    lastName: "Rossi",
    email: "lucas.rossi@email.ch",
    phone: "+41 78 234 56 78",
    status: "contacted",
    source: "facebook",
    category: "A",
    leadScore: 72,
    assignedTo: "tm-1",
    createdAt: "2025-01-14T14:20:00Z",
    contactedAt: "2025-01-15T09:00:00Z",
    convertedAt: null,
    notes: "Rappeler demain après 14h",
  },
  {
    id: "pr-3",
    firstName: "Sophie",
    lastName: "Bernard",
    email: "sophie.bernard@email.ch",
    phone: "+41 76 345 67 89",
    status: "interested",
    source: "instagram",
    category: "B",
    leadScore: 88,
    assignedTo: "tm-1",
    createdAt: "2025-01-13T16:45:00Z",
    contactedAt: "2025-01-14T10:30:00Z",
    convertedAt: null,
    notes: "Très motivée, budget OK",
  },
  {
    id: "pr-4",
    firstName: "Alexandre",
    lastName: "Dubois",
    email: "alex.dubois@email.ch",
    phone: "+41 77 456 78 90",
    status: "appointment",
    source: "referral",
    category: "B",
    leadScore: 92,
    assignedTo: "tm-2",
    createdAt: "2025-01-12T11:00:00Z",
    contactedAt: "2025-01-13T14:00:00Z",
    convertedAt: null,
    notes: "RDV fixé le 20/01 à 10h",
  },
  {
    id: "pr-5",
    firstName: "Léa",
    lastName: "Favre",
    email: "lea.favre@email.ch",
    phone: "+41 79 567 89 01",
    status: "hot",
    source: "google",
    category: "B",
    leadScore: 95,
    assignedTo: "tm-2",
    createdAt: "2025-01-11T09:30:00Z",
    contactedAt: "2025-01-12T10:00:00Z",
    convertedAt: null,
    notes: "Prête à s'inscrire, envoyer contrat",
  },
  {
    id: "pr-6",
    firstName: "Thomas",
    lastName: "Schmid",
    email: "thomas.schmid@email.ch",
    phone: "+41 78 678 90 12",
    status: "converted",
    source: "tiktok",
    category: "A",
    leadScore: 98,
    assignedTo: "tm-3",
    createdAt: "2025-01-08T13:15:00Z",
    contactedAt: "2025-01-09T09:00:00Z",
    convertedAt: "2025-01-14T15:30:00Z",
    notes: "Inscrit - Élève ID: STU-2025-042",
  },
  {
    id: "pr-7",
    firstName: "Marie",
    lastName: "Perrin",
    email: "marie.perrin@email.ch",
    phone: "+41 76 789 01 23",
    status: "lost",
    source: "direct",
    category: "B",
    leadScore: 45,
    assignedTo: "tm-1",
    createdAt: "2025-01-10T15:00:00Z",
    contactedAt: "2025-01-11T10:00:00Z",
    convertedAt: null,
    notes: "Tarifs trop élevés, parti chez concurrent",
  },
  {
    id: "pr-8",
    firstName: "Nicolas",
    lastName: "Girard",
    email: "nicolas.girard@email.ch",
    phone: "+41 79 890 12 34",
    status: "new",
    source: "facebook",
    category: "BE",
    leadScore: 68,
    assignedTo: null,
    createdAt: "2025-01-15T08:00:00Z",
    contactedAt: null,
    convertedAt: null,
    notes: "Demande info remorque",
  },
  {
    id: "pr-9",
    firstName: "Camille",
    lastName: "Roux",
    email: "camille.roux@email.ch",
    phone: "+41 77 901 23 45",
    status: "contacted",
    source: "instagram",
    category: "B",
    leadScore: 78,
    assignedTo: "tm-3",
    createdAt: "2025-01-14T12:30:00Z",
    contactedAt: "2025-01-15T11:00:00Z",
    convertedAt: null,
    notes: "Étudiante, cherche horaires flexibles",
  },
  {
    id: "pr-10",
    firstName: "Julien",
    lastName: "Blanc",
    email: "julien.blanc@email.ch",
    phone: "+41 78 012 34 56",
    status: "interested",
    source: "google",
    category: "A1",
    leadScore: 82,
    assignedTo: "tm-4",
    createdAt: "2025-01-13T10:00:00Z",
    contactedAt: "2025-01-14T14:30:00Z",
    convertedAt: null,
    notes: "16 ans, permis moto léger",
  },
];

export const mockProspectStats: ProspectStats = {
  activeProspects: 8,
  newThisMonth: 6,
  newThisMonthTrend: 15,
  conversionRate: 28.5,
  avgConversionTime: 6,
  pipelineValue: 16000,
};

// Mock interactions
export const mockInteractions: ProspectInteraction[] = [
  {
    id: "int-1",
    prospectId: "pr-3",
    type: "call",
    date: "2025-01-14T10:30:00Z",
    userId: "tm-1",
    description: "Appel téléphonique 15 min",
    details:
      "Discussion sur les tarifs et disponibilités. Très motivée, souhaite commencer rapidement.",
  },
  {
    id: "int-2",
    prospectId: "pr-3",
    type: "email",
    date: "2025-01-14T14:00:00Z",
    userId: "tm-1",
    description: "Email envoyé - Proposition tarifs",
    details: "Envoi de la brochure tarifs et planning disponible.",
    attachments: ["brochure-tarifs-2025.pdf"],
  },
  {
    id: "int-3",
    prospectId: "pr-3",
    type: "statusChange",
    date: "2025-01-14T14:05:00Z",
    userId: "tm-1",
    description: "Statut changé: Contacté → Intéressé",
  },
];

// Mock emails
export const mockEmails: ProspectEmail[] = [
  {
    id: "email-1",
    prospectId: "pr-3",
    subject: "Demande d'information - Formation Permis B",
    from: "sophie.bernard@email.ch",
    to: "contact@viamentor.ch",
    body: "Bonjour, je souhaiterais obtenir des informations sur vos tarifs et disponibilités pour le permis B. Merci.",
    date: "2025-01-13T16:45:00Z",
    opened: true,
  },
  {
    id: "email-2",
    prospectId: "pr-3",
    subject: "Re: Demande d'information - Formation Permis B",
    from: "sophie.martin@viamentor.ch",
    to: "sophie.bernard@email.ch",
    body: "Bonjour Sophie, merci pour votre intérêt. Voici notre brochure avec tous les détails...",
    date: "2025-01-14T14:00:00Z",
    attachments: ["brochure-tarifs-2025.pdf"],
    opened: true,
    clicked: true,
  },
];

// Mock SMS
export const mockSMS: ProspectSMS[] = [
  {
    id: "sms-1",
    prospectId: "pr-3",
    message:
      "Bonjour Sophie, merci pour votre demande. Je vous rappelle demain à 10h. Sophie - Viamentor",
    direction: "outbound",
    date: "2025-01-13T17:00:00Z",
    delivered: true,
  },
];

// Mock calls
export const mockCalls: ProspectCall[] = [
  {
    id: "call-1",
    prospectId: "pr-3",
    direction: "outbound",
    duration: 900, // 15 minutes
    date: "2025-01-14T10:30:00Z",
    outcome: "answered",
    notes:
      "Discussion très positive. Budget OK, souhaite commencer dans 2 semaines.",
    userId: "tm-1",
  },
];

// Mock documents
export const mockDocuments: ProspectDocument[] = [
  {
    id: "doc-1",
    prospectId: "pr-3",
    name: "brochure-tarifs-2025.pdf",
    size: 2457600, // 2.4 MB
    type: "application/pdf",
    url: "/documents/brochure-tarifs-2025.pdf",
    uploadDate: "2025-01-14T14:00:00Z",
    uploadedBy: "tm-1",
    visibility: "shared",
  },
  {
    id: "doc-2",
    prospectId: "pr-3",
    name: "contrat-formation.pdf",
    size: 1024000, // 1 MB
    type: "application/pdf",
    url: "/documents/contrat-formation.pdf",
    uploadDate: "2025-01-15T09:00:00Z",
    uploadedBy: "tm-1",
    visibility: "internal",
  },
];

// Mock notes
export const mockNotes: ProspectNote[] = [
  {
    id: "note-1",
    prospectId: "pr-3",
    content:
      "Très motivée, budget OK. Préfère les cours en fin de journée après 17h. Disponible du lundi au jeudi.",
    createdAt: "2025-01-14T10:45:00Z",
    updatedAt: "2025-01-14T10:45:00Z",
    authorId: "tm-1",
    visibility: "team",
    pinned: true,
  },
  {
    id: "note-2",
    prospectId: "pr-3",
    content: "Rappeler vendredi pour confirmer date de début.",
    createdAt: "2025-01-14T14:30:00Z",
    updatedAt: "2025-01-14T14:30:00Z",
    authorId: "tm-1",
    visibility: "private",
    pinned: false,
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getProspectsByStatus(
  prospects: Prospect[],
  status: ProspectStatus
): Prospect[] {
  return prospects.filter((p) => p.status === status);
}

export function getProspectInitials(prospect: Prospect): string {
  return `${prospect.firstName[0]}${prospect.lastName[0]}`.toUpperCase();
}

export function getProspectColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function getSourceColor(source: ProspectSource): string {
  const colors: Record<ProspectSource, string> = {
    google: "bg-blue-500",
    facebook: "bg-blue-700",
    instagram: "bg-pink-500",
    tiktok: "bg-black dark:bg-white",
    referral: "bg-green-500",
    direct: "bg-gray-500",
    other: "bg-orange-500",
  };
  return colors[source];
}

export function getStatusColor(status: ProspectStatus): string {
  const colors: Record<ProspectStatus, string> = {
    new: "bg-blue-500",
    contacted: "bg-yellow-500",
    interested: "bg-orange-500",
    appointment: "bg-purple-500",
    hot: "bg-red-500",
    converted: "bg-green-500",
    lost: "bg-gray-500",
  };
  return colors[status];
}

export function getLeadScoreColor(score: number): string {
  if (score >= 70) return "text-green-600 dark:text-green-400";
  if (score >= 40) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function formatRelativeTime(
  date: string,
  locale: ProspectsLocale = "fr"
): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const units: Record<ProspectsLocale, { d: string; h: string; m: string }> = {
    fr: { d: "j", h: "h", m: "min" },
    de: { d: "T", h: "Std", m: "Min" },
    it: { d: "g", h: "h", m: "min" },
    en: { d: "d", h: "h", m: "m" },
  };

  const unit = units[locale];

  if (diffDays > 0) return `${diffDays}${unit.d}`;
  if (diffHours > 0) return `${diffHours}${unit.h}`;
  return `${diffMinutes}${unit.m}`;
}

export function getCategoryLabel(category: LicenseCategory): string {
  const labels: Record<LicenseCategory, string> = {
    B: "Permis B",
    A: "Permis A",
    BE: "Permis BE",
    A1: "Permis A1",
    BPT: "Permis BPT",
    sensibilisation: "Cours sensibilisation",
    premiers_secours: "Premiers secours",
    autre: "Autre formation",
  };
  return labels[category];
}

export function isNotContactedOver24h(prospect: Prospect): boolean {
  if (prospect.contactedAt) return false;
  const now = new Date();
  const created = new Date(prospect.createdAt);
  const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  return diffHours > 24;
}

export function filterProspects(
  prospects: Prospect[],
  filters: ProspectsFilters
): Prospect[] {
  return prospects.filter((prospect) => {
    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        prospect.firstName.toLowerCase().includes(search) ||
        prospect.lastName.toLowerCase().includes(search) ||
        prospect.email.toLowerCase().includes(search) ||
        prospect.phone.includes(search);
      if (!matchesSearch) return false;
    }

    // Sources
    if (
      filters.sources.length > 0 &&
      !filters.sources.includes(prospect.source)
    ) {
      return false;
    }

    // Categories
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(prospect.category)
    ) {
      return false;
    }

    // Assigned to
    if (filters.assignedTo !== null) {
      if (filters.assignedTo === "unassigned" && prospect.assignedTo !== null) {
        return false;
      }
      if (
        filters.assignedTo !== "unassigned" &&
        prospect.assignedTo !== filters.assignedTo
      ) {
        return false;
      }
    }

    // Date range
    if (filters.dateRange.from || filters.dateRange.to) {
      const createdDate = new Date(prospect.createdAt);
      if (filters.dateRange.from && createdDate < filters.dateRange.from) {
        return false;
      }
      if (filters.dateRange.to && createdDate > filters.dateRange.to) {
        return false;
      }
    }

    // Lead score range
    if (
      prospect.leadScore < filters.leadScoreRange[0] ||
      prospect.leadScore > filters.leadScoreRange[1]
    ) {
      return false;
    }

    // Not contacted over 24h
    if (filters.notContactedOver24h && !isNotContactedOver24h(prospect)) {
      return false;
    }

    return true;
  });
}
