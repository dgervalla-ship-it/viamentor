/**
 * VIAMENTOR GDPR Data
 *
 * Mock data pour module RGPD et consentements
 *
 * @module data/viamentor-gdpr-data
 * @version 1.0.0
 */

// ============================================================================
// TYPES
// ============================================================================

export type RequestType = "Access" | "Delete" | "Export" | "Rectify";
export type RequestStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Rejected";
export type RequestPriority = "High" | "Medium" | "Low";

export interface GDPRRequest {
  id: string;
  type: RequestType;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  tenantId: string;
  tenantName: string;
  tenantLogo?: string;
  submitted: string;
  deadline: string;
  status: RequestStatus;
  assignedTo?: string;
  assignedToName?: string;
  assignedToAvatar?: string;
  priority: RequestPriority;
  notes?: string;
}

export interface ConsentType {
  id: string;
  type: string;
  description: string;
  required: boolean;
  defaultOptIn: boolean;
  collectedVia: ("Signup" | "Settings" | "Both")[];
  usersConsented: number;
  totalUsers: number;
}

export interface UserConsent {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  consentTypeId: string;
  consentDate: string;
  method: "Signup" | "Settings" | "API";
  ipAddress: string;
  country: string;
  browser: string;
  revoked: boolean;
  revokedDate?: string;
}

export interface DPOStats {
  pendingRequests: number;
  urgentRequests: number;
  dataBreachesYTD: number;
  consentRate: number;
  lastAuditDate: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_DPO_STATS: DPOStats = {
  pendingRequests: 8,
  urgentRequests: 3,
  dataBreachesYTD: 0,
  consentRate: 94.5,
  lastAuditDate: "2025-01-05T10:30:00Z",
};

export const MOCK_GDPR_REQUESTS: GDPRRequest[] = [
  {
    id: "a3f8b2c1",
    type: "Access",
    userId: "usr_001",
    userName: "Sophie Martin",
    userEmail: "sophie.martin@example.com",
    userAvatar: "https://github.com/yusufhilmi.png",
    tenantId: "ten_001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/polymet-ai.png",
    submitted: "2025-01-08T14:30:00Z",
    deadline: "2025-02-07T14:30:00Z",
    status: "Pending",
    priority: "High",
    notes: "Demande urgente - utilisateur souhaite vérifier ses données",
  },
  {
    id: "b7d4e9f2",
    type: "Delete",
    userId: "usr_002",
    userName: "Marc Dubois",
    userEmail: "marc.dubois@example.com",
    userAvatar: "https://github.com/kdrnp.png",
    tenantId: "ten_002",
    tenantName: "École de Conduite Genève",
    submitted: "2025-01-03T09:15:00Z",
    deadline: "2025-02-02T09:15:00Z",
    status: "In Progress",
    assignedTo: "dpo_001",
    assignedToName: "Jean Dupont",
    assignedToAvatar: "https://github.com/yahyabedirhan.png",
    priority: "High",
    notes: "Vérification éligibilité en cours - contrats actifs détectés",
  },
  {
    id: "c2a5d8e3",
    type: "Export",
    userId: "usr_003",
    userName: "Laura Rossi",
    userEmail: "laura.rossi@example.com",
    userAvatar: "https://github.com/denizbuyuktas.png",
    tenantId: "ten_001",
    tenantName: "Auto-École Léman",
    tenantLogo: "https://github.com/polymet-ai.png",
    submitted: "2025-01-10T16:45:00Z",
    deadline: "2025-02-09T16:45:00Z",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "d9f3b1a4",
    type: "Rectify",
    userId: "usr_004",
    userName: "Thomas Weber",
    userEmail: "thomas.weber@example.com",
    userAvatar: "https://github.com/shoaibux1.png",
    tenantId: "ten_003",
    tenantName: "Fahrschule Zürich",
    submitted: "2025-01-12T11:20:00Z",
    deadline: "2025-02-11T11:20:00Z",
    status: "Completed",
    assignedTo: "dpo_002",
    assignedToName: "Marie Schneider",
    assignedToAvatar: "https://github.com/yusufhilmi.png",
    priority: "Low",
    notes: "Correction adresse effectuée - notification envoyée",
  },
  {
    id: "e4c7a2b5",
    type: "Access",
    userId: "usr_005",
    userName: "Emma Müller",
    userEmail: "emma.muller@example.com",
    userAvatar: "https://github.com/kdrnp.png",
    tenantId: "ten_002",
    tenantName: "École de Conduite Genève",
    submitted: "2025-01-06T08:00:00Z",
    deadline: "2025-02-05T08:00:00Z",
    status: "In Progress",
    assignedTo: "dpo_001",
    assignedToName: "Jean Dupont",
    assignedToAvatar: "https://github.com/yahyabedirhan.png",
    priority: "Medium",
  },
];

export const MOCK_CONSENT_TYPES: ConsentType[] = [
  {
    id: "consent_001",
    type: "Marketing Emails",
    description: "Recevoir des emails marketing et promotionnels",
    required: false,
    defaultOptIn: false,
    collectedVia: ["Signup", "Settings"],
    usersConsented: 1245,
    totalUsers: 1580,
  },
  {
    id: "consent_002",
    type: "SMS Notifications",
    description: "Recevoir des notifications par SMS",
    required: false,
    defaultOptIn: true,
    collectedVia: ["Signup", "Settings"],
    usersConsented: 1420,
    totalUsers: 1580,
  },
  {
    id: "consent_003",
    type: "Data Analytics",
    description: "Utilisation des données à des fins d'analyse",
    required: true,
    defaultOptIn: true,
    collectedVia: ["Signup"],
    usersConsented: 1580,
    totalUsers: 1580,
  },
  {
    id: "consent_004",
    type: "Third-party Sharing",
    description: "Partage des données avec des partenaires tiers",
    required: false,
    defaultOptIn: false,
    collectedVia: ["Settings"],
    usersConsented: 320,
    totalUsers: 1580,
  },
  {
    id: "consent_005",
    type: "Cookies",
    description: "Utilisation de cookies pour améliorer l'expérience",
    required: true,
    defaultOptIn: true,
    collectedVia: ["Signup"],
    usersConsented: 1580,
    totalUsers: 1580,
  },
];

export const MOCK_USER_CONSENTS: UserConsent[] = [
  {
    id: "uc_001",
    userId: "usr_001",
    userName: "Sophie Martin",
    userEmail: "sophie.martin@example.com",
    userAvatar: "https://github.com/yusufhilmi.png",
    consentTypeId: "consent_001",
    consentDate: "2024-11-15T10:30:00Z",
    method: "Signup",
    ipAddress: "185.45.123.67",
    country: "CH",
    browser: "Chrome 120.0",
    revoked: false,
  },
  {
    id: "uc_002",
    userId: "usr_002",
    userName: "Marc Dubois",
    userEmail: "marc.dubois@example.com",
    userAvatar: "https://github.com/kdrnp.png",
    consentTypeId: "consent_002",
    consentDate: "2024-12-01T14:20:00Z",
    method: "Settings",
    ipAddress: "194.230.156.89",
    country: "CH",
    browser: "Firefox 121.0",
    revoked: false,
  },
  {
    id: "uc_003",
    userId: "usr_003",
    userName: "Laura Rossi",
    userEmail: "laura.rossi@example.com",
    userAvatar: "https://github.com/denizbuyuktas.png",
    consentTypeId: "consent_001",
    consentDate: "2024-10-20T09:15:00Z",
    method: "Signup",
    ipAddress: "178.195.234.12",
    country: "CH",
    browser: "Safari 17.2",
    revoked: true,
    revokedDate: "2025-01-05T16:45:00Z",
  },
];
