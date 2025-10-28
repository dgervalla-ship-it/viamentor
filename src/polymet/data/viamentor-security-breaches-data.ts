// ============================================================================
// VIAMENTOR - Security Breaches Data
// Mock data et types pour gestion violations données et incidents sécurité
// ============================================================================

export type BreachType =
  | "unauthorized_access"
  | "data_leak"
  | "ransomware"
  | "phishing"
  | "other";

export type BreachSeverity = "critical" | "high" | "medium" | "low";

export type BreachStatus =
  | "new"
  | "investigation"
  | "contained"
  | "notified"
  | "resolved"
  | "closed";

export interface SecurityBreach {
  id: string;
  detectionDate: Date;
  type: BreachType;
  severity: BreachSeverity;
  affectedPersons: number;
  status: BreachStatus;
  assignedTo: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  description: string;
  dataCategories: string[];
  notificationRequired: boolean;
  notificationDeadline?: Date;
  authorityNotified: boolean;
  personsInformed: boolean;
  timeline: BreachTimelineEvent[];
  rootCause?: string;
  correctiveMeasures: string[];
  documents: BreachDocument[];
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export interface BreachTimelineEvent {
  id: string;
  date: Date;
  action: string;
  description: string;
  user: string;
}

export interface BreachDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  url: string;
}

export interface BreachStats {
  totalIncidents: number;
  openIncidents: number;
  resolvedIncidents: number;
  avgResolutionTimeHours: number;
  authorityNotifications: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockBreaches: SecurityBreach[] = [
  {
    id: "breach-001",
    detectionDate: new Date("2025-01-15T14:32:00"),
    type: "unauthorized_access",
    severity: "critical",
    affectedPersons: 127,
    status: "investigation",
    assignedTo: {
      id: "dpo-001",
      name: "Marie Dubois",
      role: "DPO",
      avatar: "https://github.com/yusufhilmi.png",
    },
    description:
      "Tentative d'accès non autorisé détectée sur le serveur de base de données. Plusieurs requêtes SQL suspectes ont été identifiées.",
    dataCategories: [
      "Données personnelles",
      "Coordonnées",
      "Historique formation",
    ],

    notificationRequired: true,
    notificationDeadline: new Date("2025-01-18T14:32:00"),
    authorityNotified: false,
    personsInformed: false,
    timeline: [
      {
        id: "evt-001",
        date: new Date("2025-01-15T14:32:00"),
        action: "Détection",
        description: "Alerte système déclenchée - Tentatives d'accès multiples",
        user: "Système",
      },
      {
        id: "evt-002",
        date: new Date("2025-01-15T14:45:00"),
        action: "Investigation",
        description: "Analyse des logs en cours - IP suspecte identifiée",
        user: "Marie Dubois",
      },
      {
        id: "evt-003",
        date: new Date("2025-01-15T15:20:00"),
        action: "Containment",
        description: "Blocage de l'IP suspecte - Accès révoqués",
        user: "IT Security",
      },
    ],

    rootCause:
      "Credentials compromis d'un compte administrateur. Mot de passe faible et absence de MFA.",
    correctiveMeasures: [
      "Mise en place MFA obligatoire pour tous les comptes admin",
      "Politique de mots de passe renforcée (16 caractères minimum)",
      "Audit complet des accès et permissions",
      "Formation sécurité pour tous les administrateurs",
    ],

    documents: [
      {
        id: "doc-001",
        name: "incident-report-001.pdf",
        type: "application/pdf",
        size: 245000,
        uploadedAt: new Date("2025-01-15T16:00:00"),
        uploadedBy: "Marie Dubois",
        url: "#",
      },
      {
        id: "doc-002",
        name: "logs-analysis.xlsx",
        type: "application/vnd.ms-excel",
        size: 128000,
        uploadedAt: new Date("2025-01-15T16:30:00"),
        uploadedBy: "IT Security",
        url: "#",
      },
    ],

    createdAt: new Date("2025-01-15T14:32:00"),
    updatedAt: new Date("2025-01-15T16:30:00"),
  },
  {
    id: "breach-002",
    detectionDate: new Date("2025-01-10T09:15:00"),
    type: "phishing",
    severity: "high",
    affectedPersons: 23,
    status: "notified",
    assignedTo: {
      id: "dpo-001",
      name: "Marie Dubois",
      role: "DPO",
      avatar: "https://github.com/yusufhilmi.png",
    },
    description:
      "Campagne de phishing ciblant les moniteurs. 23 moniteurs ont reçu un email frauduleux demandant leurs identifiants.",
    dataCategories: ["Identifiants de connexion", "Emails professionnels"],
    notificationRequired: true,
    notificationDeadline: new Date("2025-01-13T09:15:00"),
    authorityNotified: true,
    personsInformed: true,
    timeline: [
      {
        id: "evt-004",
        date: new Date("2025-01-10T09:15:00"),
        action: "Détection",
        description: "Signalement par un moniteur - Email suspect",
        user: "Jean Martin",
      },
      {
        id: "evt-005",
        date: new Date("2025-01-10T10:00:00"),
        action: "Investigation",
        description: "Identification de 23 destinataires - Analyse de l'email",
        user: "Marie Dubois",
      },
      {
        id: "evt-006",
        date: new Date("2025-01-10T14:00:00"),
        action: "Notification",
        description: "Notification PFPDT envoyée - Référence #2025-001",
        user: "Marie Dubois",
      },
      {
        id: "evt-007",
        date: new Date("2025-01-11T09:00:00"),
        action: "Communication",
        description: "Email d'information envoyé aux 23 moniteurs concernés",
        user: "Marie Dubois",
      },
    ],

    rootCause:
      "Usurpation d'identité - Email spoofé ressemblant à un email officiel de l'école.",
    correctiveMeasures: [
      "Mise en place SPF/DKIM/DMARC pour sécuriser les emails",
      "Formation anti-phishing pour tous les utilisateurs",
      "Bannière d'avertissement sur emails externes",
      "Procédure de signalement simplifiée",
    ],

    documents: [
      {
        id: "doc-003",
        name: "notification-pfpdt.pdf",
        type: "application/pdf",
        size: 156000,
        uploadedAt: new Date("2025-01-10T14:00:00"),
        uploadedBy: "Marie Dubois",
        url: "#",
      },
    ],

    createdAt: new Date("2025-01-10T09:15:00"),
    updatedAt: new Date("2025-01-11T09:00:00"),
  },
  {
    id: "breach-003",
    detectionDate: new Date("2024-12-05T16:45:00"),
    type: "data_leak",
    severity: "medium",
    affectedPersons: 8,
    status: "closed",
    assignedTo: {
      id: "dpo-001",
      name: "Marie Dubois",
      role: "DPO",
      avatar: "https://github.com/yusufhilmi.png",
    },
    description:
      "Document Excel contenant des données personnelles envoyé par erreur à un destinataire externe.",
    dataCategories: ["Noms", "Emails", "Numéros de téléphone"],
    notificationRequired: false,
    authorityNotified: false,
    personsInformed: true,
    timeline: [
      {
        id: "evt-008",
        date: new Date("2024-12-05T16:45:00"),
        action: "Détection",
        description: "Erreur signalée par l'expéditeur",
        user: "Sophie Bernard",
      },
      {
        id: "evt-009",
        date: new Date("2024-12-05T17:00:00"),
        action: "Containment",
        description: "Contact avec le destinataire - Demande de suppression",
        user: "Marie Dubois",
      },
      {
        id: "evt-010",
        date: new Date("2024-12-05T17:30:00"),
        action: "Confirmation",
        description: "Confirmation de suppression par le destinataire",
        user: "Marie Dubois",
      },
      {
        id: "evt-011",
        date: new Date("2024-12-06T09:00:00"),
        action: "Communication",
        description: "Information des 8 personnes concernées",
        user: "Marie Dubois",
      },
    ],

    rootCause:
      "Erreur humaine - Sélection incorrecte du destinataire dans l'autocomplétion email.",
    correctiveMeasures: [
      "Procédure de double vérification pour envois externes",
      "Formation sur la protection des données",
      "Mise en place d'un délai de rappel d'email (30 secondes)",
      "Chiffrement obligatoire pour documents sensibles",
    ],

    documents: [],
    createdAt: new Date("2024-12-05T16:45:00"),
    updatedAt: new Date("2024-12-06T09:00:00"),
    closedAt: new Date("2024-12-06T14:00:00"),
  },
  {
    id: "breach-004",
    detectionDate: new Date("2024-11-20T11:20:00"),
    type: "ransomware",
    severity: "critical",
    affectedPersons: 0,
    status: "closed",
    assignedTo: {
      id: "dpo-001",
      name: "Marie Dubois",
      role: "DPO",
      avatar: "https://github.com/yusufhilmi.png",
    },
    description:
      "Tentative d'attaque ransomware détectée et bloquée par l'antivirus. Aucune donnée compromise.",
    dataCategories: [],
    notificationRequired: false,
    authorityNotified: false,
    personsInformed: false,
    timeline: [
      {
        id: "evt-012",
        date: new Date("2024-11-20T11:20:00"),
        action: "Détection",
        description: "Antivirus a bloqué un fichier malveillant",
        user: "Système",
      },
      {
        id: "evt-013",
        date: new Date("2024-11-20T11:30:00"),
        action: "Investigation",
        description: "Analyse du fichier - Ransomware confirmé",
        user: "IT Security",
      },
      {
        id: "evt-014",
        date: new Date("2024-11-20T12:00:00"),
        action: "Containment",
        description: "Isolation du poste - Scan complet du réseau",
        user: "IT Security",
      },
      {
        id: "evt-015",
        date: new Date("2024-11-20T16:00:00"),
        action: "Résolution",
        description: "Aucune propagation - Système nettoyé",
        user: "IT Security",
      },
    ],

    rootCause:
      "Email de phishing avec pièce jointe malveillante. Utilisateur a téléchargé mais pas exécuté.",
    correctiveMeasures: [
      "Mise à jour des signatures antivirus",
      "Blocage des extensions .exe dans les emails",
      "Formation sensibilisation ransomware",
      "Sauvegarde automatique quotidienne renforcée",
    ],

    documents: [
      {
        id: "doc-004",
        name: "malware-analysis.pdf",
        type: "application/pdf",
        size: 89000,
        uploadedAt: new Date("2024-11-20T17:00:00"),
        uploadedBy: "IT Security",
        url: "#",
      },
    ],

    createdAt: new Date("2024-11-20T11:20:00"),
    updatedAt: new Date("2024-11-20T17:00:00"),
    closedAt: new Date("2024-11-20T18:00:00"),
  },
];

export const mockBreachStats: BreachStats = {
  totalIncidents: 12,
  openIncidents: 3,
  resolvedIncidents: 9,
  avgResolutionTimeHours: 48,
  authorityNotifications: 4,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getBreachSeverityColor(severity: BreachSeverity): string {
  const colors = {
    critical: "destructive",
    high: "orange",
    medium: "yellow",
    low: "blue",
  };
  return colors[severity];
}

export function getBreachStatusColor(status: BreachStatus): string {
  const colors = {
    new: "destructive",
    investigation: "orange",
    contained: "yellow",
    notified: "blue",
    resolved: "green",
    closed: "secondary",
  };
  return colors[status];
}

export function isBreachCritical(breach: SecurityBreach): boolean {
  return breach.severity === "critical" || breach.severity === "high";
}

export function requiresAuthorityNotification(breach: SecurityBreach): boolean {
  return breach.notificationRequired && !breach.authorityNotified;
}

export function isNotificationOverdue(breach: SecurityBreach): boolean {
  if (!breach.notificationDeadline) return false;
  return new Date() > breach.notificationDeadline && !breach.authorityNotified;
}
