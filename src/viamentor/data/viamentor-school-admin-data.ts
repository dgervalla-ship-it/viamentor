/**
 * VIAMENTOR - School Admin Data
 * Mock data pour dashboard School Admin
 *
 * FEATURES:
 * - Stats école complètes
 * - Gestion élèves/moniteurs/véhicules
 * - Planning et réservations
 * - Analytics et rapports
 * - Configuration auto-école
 */

// ============================================================================
// TYPES
// ============================================================================

export type SchoolAdminLocale = "fr" | "de" | "it" | "en";

// Stats Dashboard
export interface SchoolStats {
  students: {
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
    trend: number; // %
  };
  instructors: {
    total: number;
    active: number;
    onLeave: number;
    avgRating: number;
    trend: number; // %
  };
  vehicles: {
    total: number;
    available: number;
    inMaintenance: number;
    avgUtilization: number; // %
    trend: number; // %
  };
  lessons: {
    totalThisMonth: number;
    completed: number;
    cancelled: number;
    upcoming: number;
    trend: number; // %
  };
  revenue: {
    thisMonth: number;
    lastMonth: number;
    trend: number; // %
    pending: number;
    overdue: number;
  };
  exams: {
    scheduled: number;
    passRate: number; // %
    avgAttempts: number;
    trend: number; // %
  };
}

// Recent Activity
export interface RecentActivity {
  id: string;
  type:
    | "student_registered"
    | "lesson_completed"
    | "exam_passed"
    | "payment_received"
    | "vehicle_maintenance"
    | "instructor_added";
  title: string;
  description: string;
  timestamp: string;
  actor?: {
    id: string;
    name: string;
    avatar: string;
  };
  metadata?: Record<string, any>;
}

// Quick Actions
export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
  color: "primary" | "success" | "warning" | "danger";
}

// Upcoming Events
export interface UpcomingEvent {
  id: string;
  type: "lesson" | "exam" | "theory_course" | "maintenance" | "meeting";
  title: string;
  date: string;
  time: string;
  location?: string;
  participants?: string[];
  status: "scheduled" | "confirmed" | "pending";
}

// Performance Metrics
export interface PerformanceMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  target?: number;
  trend: number; // %
  status: "excellent" | "good" | "warning" | "critical";
}

// Alerts & Notifications
export interface SchoolAlert {
  id: string;
  type: "info" | "warning" | "error" | "success";
  title: string;
  message: string;
  timestamp: string;
  priority: "low" | "medium" | "high" | "critical";
  actionLabel?: string;
  actionHref?: string;
  dismissed?: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockSchoolStats: SchoolStats = {
  students: {
    total: 387,
    active: 312,
    inactive: 75,
    newThisMonth: 28,
    trend: 12.5,
  },
  instructors: {
    total: 18,
    active: 16,
    onLeave: 2,
    avgRating: 4.7,
    trend: 5.2,
  },
  vehicles: {
    total: 12,
    available: 10,
    inMaintenance: 2,
    avgUtilization: 78.5,
    trend: -3.2,
  },
  lessons: {
    totalThisMonth: 1247,
    completed: 1089,
    cancelled: 42,
    upcoming: 116,
    trend: 8.7,
  },
  revenue: {
    thisMonth: 156800,
    lastMonth: 142300,
    trend: 10.2,
    pending: 23400,
    overdue: 4200,
  },
  exams: {
    scheduled: 34,
    passRate: 76.5,
    avgAttempts: 1.8,
    trend: 4.3,
  },
};

export const mockRecentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "student_registered",
    title: "Nouvel élève inscrit",
    description: "Sophie Martin s'est inscrite pour la catégorie B",
    timestamp: "2025-01-16T14:30:00Z",
    actor: {
      id: "u1",
      name: "Marie Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    metadata: {
      studentId: "s387",
      category: "B",
    },
  },
  {
    id: "2",
    type: "exam_passed",
    title: "Examen réussi",
    description: "Lucas Berger a réussi son examen pratique",
    timestamp: "2025-01-16T11:15:00Z",
    actor: {
      id: "s234",
      name: "Lucas Berger",
      avatar: "https://github.com/yusufhilmi.png",
    },
    metadata: {
      examType: "practical",
      score: 85,
    },
  },
  {
    id: "3",
    type: "payment_received",
    title: "Paiement reçu",
    description: "Facture #INV-2025-0234 payée (CHF 1'200.-)",
    timestamp: "2025-01-16T10:45:00Z",
    metadata: {
      invoiceId: "INV-2025-0234",
      amount: 1200,
    },
  },
  {
    id: "4",
    type: "vehicle_maintenance",
    title: "Maintenance véhicule",
    description: "VW Golf (GE-12345) - Révision complétée",
    timestamp: "2025-01-16T09:00:00Z",
    actor: {
      id: "m1",
      name: "Garage Central",
      avatar: "https://github.com/viamentor-ai.png",
    },
    metadata: {
      vehicleId: "v3",
      maintenanceType: "revision",
    },
  },
  {
    id: "5",
    type: "lesson_completed",
    title: "Leçon terminée",
    description: "Emma Schneider - Leçon de circulation (2h)",
    timestamp: "2025-01-16T08:30:00Z",
    actor: {
      id: "i5",
      name: "Pierre Müller",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    metadata: {
      studentId: "s156",
      duration: 120,
      type: "circulation",
    },
  },
];

export const mockQuickActions: QuickAction[] = [
  {
    id: "add-student",
    label: "Nouvel élève",
    description: "Inscrire un nouvel élève",
    icon: "UserPlus",
    href: "/students?action=create",
    color: "primary",
  },
  {
    id: "schedule-lesson",
    label: "Planifier leçon",
    description: "Créer une nouvelle leçon",
    icon: "Calendar",
    href: "/planning?action=create-lesson",
    color: "success",
  },
  {
    id: "create-invoice",
    label: "Nouvelle facture",
    description: "Créer une facture",
    icon: "FileText",
    href: "/invoices?action=create",
    color: "primary",
  },
  {
    id: "schedule-exam",
    label: "Planifier examen",
    description: "Inscrire à un examen",
    icon: "Award",
    href: "/exams?action=schedule",
    badge: 5,
    color: "warning",
  },
  {
    id: "add-instructor",
    label: "Nouveau moniteur",
    description: "Ajouter un moniteur",
    icon: "UserCheck",
    href: "/instructors?action=create",
    color: "primary",
  },
  {
    id: "add-vehicle",
    label: "Nouveau véhicule",
    description: "Ajouter un véhicule",
    icon: "Car",
    href: "/vehicles?action=create",
    color: "primary",
  },
  {
    id: "view-reports",
    label: "Rapports",
    description: "Voir les rapports",
    icon: "BarChart3",
    href: "/reports",
    color: "primary",
  },
  {
    id: "settings",
    label: "Paramètres",
    description: "Configuration école",
    icon: "Settings",
    href: "/settings",
    color: "primary",
  },
];

export const mockUpcomingEvents: UpcomingEvent[] = [
  {
    id: "e1",
    type: "exam",
    title: "Examen pratique - Emma Schneider",
    date: "2025-01-17",
    time: "09:00",
    location: "Centre d'examen Genève",
    participants: ["s156", "i5"],
    status: "confirmed",
  },
  {
    id: "e2",
    type: "theory_course",
    title: "Cours théorique - Signalisation",
    date: "2025-01-17",
    time: "14:00",
    location: "Salle 2",
    participants: ["s387", "s234", "s156"],
    status: "scheduled",
  },
  {
    id: "e3",
    type: "maintenance",
    title: "Révision - Audi A3 (GE-67890)",
    date: "2025-01-18",
    time: "08:00",
    location: "Garage Central",
    status: "scheduled",
  },
  {
    id: "e4",
    type: "meeting",
    title: "Réunion équipe pédagogique",
    date: "2025-01-18",
    time: "16:00",
    location: "Bureau direction",
    participants: ["i1", "i2", "i3", "i4", "i5"],
    status: "confirmed",
  },
  {
    id: "e5",
    type: "lesson",
    title: "Leçon pratique - Sophie Martin",
    date: "2025-01-17",
    time: "10:00",
    location: "Auto-école",
    participants: ["s387", "i3"],
    status: "confirmed",
  },
];

export const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    id: "student-satisfaction",
    label: "Satisfaction élèves",
    value: 4.7,
    unit: "/5",
    target: 4.5,
    trend: 5.2,
    status: "excellent",
  },
  {
    id: "lesson-completion",
    label: "Taux de complétion",
    value: 96.6,
    unit: "%",
    target: 95,
    trend: 2.1,
    status: "excellent",
  },
  {
    id: "exam-pass-rate",
    label: "Taux de réussite",
    value: 76.5,
    unit: "%",
    target: 75,
    trend: 4.3,
    status: "good",
  },
  {
    id: "revenue-per-student",
    label: "Revenu par élève",
    value: 405,
    unit: "CHF",
    target: 400,
    trend: 8.7,
    status: "excellent",
  },
  {
    id: "vehicle-utilization",
    label: "Utilisation véhicules",
    value: 78.5,
    unit: "%",
    target: 80,
    trend: -3.2,
    status: "warning",
  },
  {
    id: "instructor-efficiency",
    label: "Efficacité moniteurs",
    value: 92.3,
    unit: "%",
    target: 90,
    trend: 1.8,
    status: "excellent",
  },
];

export const mockSchoolAlerts: SchoolAlert[] = [
  {
    id: "a1",
    type: "warning",
    title: "Factures en retard",
    message: "4 factures sont en retard de paiement (CHF 4'200.-)",
    timestamp: "2025-01-16T08:00:00Z",
    priority: "high",
    actionLabel: "Voir les factures",
    actionHref: "/invoices?filter=overdue",
    dismissed: false,
  },
  {
    id: "a2",
    type: "info",
    title: "Permis à renouveler",
    message: "3 moniteurs doivent renouveler leur permis d'enseigner",
    timestamp: "2025-01-15T14:00:00Z",
    priority: "medium",
    actionLabel: "Voir les moniteurs",
    actionHref: "/instructors?filter=permit-expiring",
    dismissed: false,
  },
  {
    id: "a3",
    type: "warning",
    title: "Véhicule en maintenance",
    message: "VW Golf (GE-12345) - Révision prévue demain",
    timestamp: "2025-01-16T10:00:00Z",
    priority: "medium",
    actionLabel: "Voir le planning",
    actionHref: "/vehicles/v3",
    dismissed: false,
  },
  {
    id: "a4",
    type: "success",
    title: "Objectif atteint",
    message: "Objectif mensuel de revenus atteint (CHF 150'000.-)",
    timestamp: "2025-01-16T12:00:00Z",
    priority: "low",
    dismissed: false,
  },
  {
    id: "a5",
    type: "error",
    title: "Capacité planning",
    message: "Planning saturé pour la semaine prochaine",
    timestamp: "2025-01-16T09:00:00Z",
    priority: "critical",
    actionLabel: "Optimiser le planning",
    actionHref: "/planning?view=week",
    dismissed: false,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getStatTrend(value: number): "up" | "down" | "stable" {
  if (value > 2) return "up";
  if (value < -2) return "down";
  return "stable";
}

export function getStatusColor(status: PerformanceMetric["status"]): string {
  const colors = {
    excellent: "text-green-600 dark:text-green-400",
    good: "text-blue-600 dark:text-blue-400",
    warning: "text-orange-600 dark:text-orange-400",
    critical: "text-red-600 dark:text-red-400",
  };
  return colors[status];
}

export function getAlertIcon(type: SchoolAlert["type"]): string {
  const icons = {
    info: "Info",
    warning: "AlertTriangle",
    error: "AlertCircle",
    success: "CheckCircle",
  };
  return icons[type];
}

export function formatCurrency(
  amount: number,
  locale: SchoolAdminLocale = "fr"
): string {
  return new Intl.NumberFormat(
    locale === "fr"
      ? "fr-CH"
      : locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : "en-CH",
    {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export function formatPercentage(
  value: number,
  locale: SchoolAdminLocale = "fr"
): string {
  return new Intl.NumberFormat(
    locale === "fr"
      ? "fr-CH"
      : locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : "en-CH",
    {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }
  ).format(value / 100);
}
