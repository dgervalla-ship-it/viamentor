// ============================================================================
// VIAMENTOR - Admin Roles & Database Health Data
// ============================================================================

import {
  adminRolesTranslations,
  type AdminRolesLocale,
} from "@/polymet/data/viamentor-admin-roles-i18n";

// ============================================================================
// TYPES
// ============================================================================

export interface Role {
  id: string;
  name: string;
  slug: string;
  description: string;
  level: number; // 1-100, 100 = Super Admin
  parentId: string | null;
  isSystem: boolean;
  isActive: boolean;
  usersCount: number;
  permissionsCount: number;
  inheritedPermissionsCount: number;
  icon: "Shield" | "Users" | "GraduationCap" | "Briefcase" | "Settings";
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  resource: string;
  action: "create" | "read" | "update" | "delete" | "execute";
  description: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  isInherited: boolean;
  inheritedFrom?: string; // Parent role ID
}

export interface DatabaseStats {
  connections: number;
  maxConnections: number;
  size: number; // GB
  tablesCount: number;
  indexesCount: number;
  cacheHitRatio: number; // percentage
}

export interface SlowQuery {
  id: string;
  query: string;
  duration: number; // ms
  calls: number;
  table: string;
  lastExecuted: Date;
}

export interface TableStats {
  name: string;
  rows: number;
  size: number; // MB
  indexesCount: number;
  lastVacuum: Date | null;
  lastAnalyze: Date | null;
}

export interface Backup {
  id: string;
  date: Date;
  size: number; // GB
  duration: number; // seconds
  status: "success" | "failed";
  type: "automatic" | "manual";
}

export interface BackupConfig {
  schedule: string; // cron expression
  retention: number; // days
  status: "active" | "paused" | "error";
  lastBackup: Date | null;
  lastBackupStatus: "success" | "failed" | null;
}

// ============================================================================
// MOCK DATA - ROLES HIERARCHY (15 levels)
// ============================================================================

export const mockRoles: Role[] = [
  // Level 100 - Super Admin
  {
    id: "role-1",
    name: "Super Admin",
    slug: "super_admin",
    description:
      "Accès complet système multi-tenant, configuration globale, sécurité",
    level: 100,
    parentId: null,
    isSystem: true,
    isActive: true,
    usersCount: 3,
    permissionsCount: 150,
    inheritedPermissionsCount: 0,
    icon: "Shield",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 90 - Platform Admin
  {
    id: "role-2",
    name: "Platform Admin",
    slug: "platform_admin",
    description:
      "Gestion tenants, monitoring système, support technique niveau 3",
    level: 90,
    parentId: null,
    isSystem: true,
    isActive: true,
    usersCount: 5,
    permissionsCount: 120,
    inheritedPermissionsCount: 0,
    icon: "Settings",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 80 - School Admin
  {
    id: "role-3",
    name: "School Admin",
    slug: "school_admin",
    description:
      "Direction auto-école, gestion complète tenant, décisions stratégiques",
    level: 80,
    parentId: null,
    isSystem: true,
    isActive: true,
    usersCount: 12,
    permissionsCount: 100,
    inheritedPermissionsCount: 0,
    icon: "Briefcase",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 70 - Finance Manager
  {
    id: "role-4",
    name: "Finance Manager",
    slug: "finance_manager",
    description:
      "Gestion financière complète, facturation, comptabilité, analytics",
    level: 70,
    parentId: "role-3",
    isSystem: true,
    isActive: true,
    usersCount: 8,
    permissionsCount: 45,
    inheritedPermissionsCount: 20,
    icon: "Briefcase",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 70 - Instructor Manager
  {
    id: "role-5",
    name: "Instructor Manager",
    slug: "instructor_manager",
    description: "Gestion équipe moniteurs, planning, évaluations, recrutement",
    level: 70,
    parentId: "role-3",
    isSystem: true,
    isActive: true,
    usersCount: 6,
    permissionsCount: 42,
    inheritedPermissionsCount: 18,
    icon: "Users",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 70 - Marketing Manager
  {
    id: "role-6",
    name: "Marketing Manager",
    slug: "marketing_manager",
    description:
      "Campagnes marketing, CRM prospects, analytics conversion, communication",
    level: 70,
    parentId: "role-3",
    isSystem: true,
    isActive: true,
    usersCount: 4,
    permissionsCount: 38,
    inheritedPermissionsCount: 15,
    icon: "Users",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 60 - Accountant
  {
    id: "role-7",
    name: "Accountant",
    slug: "accountant",
    description:
      "Comptabilité, rapports financiers, TVA, réconciliation bancaire",
    level: 60,
    parentId: "role-4",
    isSystem: true,
    isActive: true,
    usersCount: 10,
    permissionsCount: 35,
    inheritedPermissionsCount: 25,
    icon: "Briefcase",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 50 - Secretary
  {
    id: "role-8",
    name: "Secretary",
    slug: "secretary",
    description:
      "Accueil, inscriptions, planning, communication élèves/moniteurs",
    level: 50,
    parentId: "role-3",
    isSystem: true,
    isActive: true,
    usersCount: 15,
    permissionsCount: 55,
    inheritedPermissionsCount: 12,
    icon: "Users",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 40 - Instructor
  {
    id: "role-9",
    name: "Instructor",
    slug: "instructor",
    description:
      "Enseignement conduite, évaluations élèves, gestion planning personnel",
    level: 40,
    parentId: null,
    isSystem: true,
    isActive: true,
    usersCount: 45,
    permissionsCount: 30,
    inheritedPermissionsCount: 0,
    icon: "GraduationCap",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 30 - Student
  {
    id: "role-10",
    name: "Student",
    slug: "student",
    description:
      "Élève auto-école, réservation leçons, suivi progression, documents",
    level: 30,
    parentId: null,
    isSystem: true,
    isActive: true,
    usersCount: 450,
    permissionsCount: 15,
    inheritedPermissionsCount: 0,
    icon: "Users",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Level 20 - Guest
  {
    id: "role-11",
    name: "Guest",
    slug: "guest",
    description:
      "Visiteur site web, formulaire contact, consultation informations publiques",
    level: 20,
    parentId: null,
    isSystem: true,
    isActive: true,
    usersCount: 0,
    permissionsCount: 5,
    inheritedPermissionsCount: 0,
    icon: "Users",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Custom roles examples
  {
    id: "role-12",
    name: "Assistant Admin",
    slug: "assistant_admin",
    description: "Support administratif, gestion quotidienne, reporting",
    level: 65,
    parentId: "role-3",
    isSystem: false,
    isActive: true,
    usersCount: 3,
    permissionsCount: 48,
    inheritedPermissionsCount: 22,
    icon: "Users",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "role-13",
    name: "Senior Instructor",
    slug: "senior_instructor",
    description:
      "Moniteur senior, formation nouveaux moniteurs, supervision qualité",
    level: 45,
    parentId: "role-9",
    isSystem: false,
    isActive: true,
    usersCount: 8,
    permissionsCount: 38,
    inheritedPermissionsCount: 30,
    icon: "GraduationCap",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "role-14",
    name: "Billing Specialist",
    slug: "billing_specialist",
    description: "Spécialiste facturation, relances, gestion impayés",
    level: 55,
    parentId: "role-7",
    isSystem: false,
    isActive: true,
    usersCount: 5,
    permissionsCount: 28,
    inheritedPermissionsCount: 32,
    icon: "Briefcase",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "role-15",
    name: "Support Agent",
    slug: "support_agent",
    description: "Support client, assistance technique, gestion tickets",
    level: 35,
    parentId: "role-8",
    isSystem: false,
    isActive: true,
    usersCount: 7,
    permissionsCount: 25,
    inheritedPermissionsCount: 15,
    icon: "Users",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
];

// ============================================================================
// MOCK DATA - PERMISSIONS
// ============================================================================

export const mockPermissions: Permission[] = [
  // Students
  {
    id: "perm-1",
    resource: "students",
    action: "create",
    description: "Créer nouveaux élèves",
  },
  {
    id: "perm-2",
    resource: "students",
    action: "read",
    description: "Consulter élèves",
  },
  {
    id: "perm-3",
    resource: "students",
    action: "update",
    description: "Modifier élèves",
  },
  {
    id: "perm-4",
    resource: "students",
    action: "delete",
    description: "Supprimer élèves",
  },
  // Instructors
  {
    id: "perm-5",
    resource: "instructors",
    action: "create",
    description: "Créer moniteurs",
  },
  {
    id: "perm-6",
    resource: "instructors",
    action: "read",
    description: "Consulter moniteurs",
  },
  {
    id: "perm-7",
    resource: "instructors",
    action: "update",
    description: "Modifier moniteurs",
  },
  {
    id: "perm-8",
    resource: "instructors",
    action: "delete",
    description: "Supprimer moniteurs",
  },
  // Vehicles
  {
    id: "perm-9",
    resource: "vehicles",
    action: "create",
    description: "Créer véhicules",
  },
  {
    id: "perm-10",
    resource: "vehicles",
    action: "read",
    description: "Consulter véhicules",
  },
  {
    id: "perm-11",
    resource: "vehicles",
    action: "update",
    description: "Modifier véhicules",
  },
  {
    id: "perm-12",
    resource: "vehicles",
    action: "delete",
    description: "Supprimer véhicules",
  },
  // Lessons
  {
    id: "perm-13",
    resource: "lessons",
    action: "create",
    description: "Créer leçons",
  },
  {
    id: "perm-14",
    resource: "lessons",
    action: "read",
    description: "Consulter leçons",
  },
  {
    id: "perm-15",
    resource: "lessons",
    action: "update",
    description: "Modifier leçons",
  },
  {
    id: "perm-16",
    resource: "lessons",
    action: "delete",
    description: "Supprimer leçons",
  },
  // Invoices
  {
    id: "perm-17",
    resource: "invoices",
    action: "create",
    description: "Créer factures",
  },
  {
    id: "perm-18",
    resource: "invoices",
    action: "read",
    description: "Consulter factures",
  },
  {
    id: "perm-19",
    resource: "invoices",
    action: "update",
    description: "Modifier factures",
  },
  {
    id: "perm-20",
    resource: "invoices",
    action: "delete",
    description: "Supprimer factures",
  },
  // Settings
  {
    id: "perm-21",
    resource: "settings",
    action: "read",
    description: "Consulter paramètres",
  },
  {
    id: "perm-22",
    resource: "settings",
    action: "update",
    description: "Modifier paramètres",
  },
  // Audit
  {
    id: "perm-23",
    resource: "audit",
    action: "read",
    description: "Consulter logs audit",
  },
  {
    id: "perm-24",
    resource: "audit",
    action: "execute",
    description: "Exporter logs audit",
  },
  // Users
  {
    id: "perm-25",
    resource: "users",
    action: "create",
    description: "Créer utilisateurs",
  },
  {
    id: "perm-26",
    resource: "users",
    action: "read",
    description: "Consulter utilisateurs",
  },
  {
    id: "perm-27",
    resource: "users",
    action: "update",
    description: "Modifier utilisateurs",
  },
  {
    id: "perm-28",
    resource: "users",
    action: "delete",
    description: "Supprimer utilisateurs",
  },
  // Roles
  {
    id: "perm-29",
    resource: "roles",
    action: "create",
    description: "Créer rôles",
  },
  {
    id: "perm-30",
    resource: "roles",
    action: "read",
    description: "Consulter rôles",
  },
  {
    id: "perm-31",
    resource: "roles",
    action: "update",
    description: "Modifier rôles",
  },
  {
    id: "perm-32",
    resource: "roles",
    action: "delete",
    description: "Supprimer rôles",
  },
  // Reports
  {
    id: "perm-33",
    resource: "reports",
    action: "read",
    description: "Consulter rapports",
  },
  {
    id: "perm-34",
    resource: "reports",
    action: "execute",
    description: "Générer rapports",
  },
];

// ============================================================================
// MOCK DATA - DATABASE HEALTH
// ============================================================================

export const mockDatabaseStats: DatabaseStats = {
  connections: 45,
  maxConnections: 100,
  size: 12.4, // GB
  tablesCount: 87,
  indexesCount: 245,
  cacheHitRatio: 97.8, // %
};

export const mockSlowQueries: SlowQuery[] = [
  {
    id: "query-1",
    query:
      "SELECT * FROM lessons l JOIN students s ON l.student_id = s.id WHERE l.status = 'completed' AND l.date > NOW() - INTERVAL '30 days'",
    duration: 1850,
    calls: 1245,
    table: "lessons",
    lastExecuted: new Date("2025-01-15T14:32:00"),
  },
  {
    id: "query-2",
    query:
      "SELECT i.*, COUNT(l.id) as lessons_count FROM instructors i LEFT JOIN lessons l ON i.id = l.instructor_id GROUP BY i.id",
    duration: 1420,
    calls: 856,
    table: "instructors",
    lastExecuted: new Date("2025-01-15T15:18:00"),
  },
  {
    id: "query-3",
    query:
      "SELECT * FROM invoices WHERE status = 'pending' AND due_date < NOW() ORDER BY due_date DESC",
    duration: 1120,
    calls: 2341,
    table: "invoices",
    lastExecuted: new Date("2025-01-15T16:05:00"),
  },
];

export const mockTableStats: TableStats[] = [
  {
    name: "students",
    rows: 4523,
    size: 145.2,
    indexesCount: 8,
    lastVacuum: new Date("2025-01-14T03:00:00"),
    lastAnalyze: new Date("2025-01-14T03:15:00"),
  },
  {
    name: "instructors",
    rows: 156,
    size: 12.8,
    indexesCount: 6,
    lastVacuum: new Date("2025-01-14T03:00:00"),
    lastAnalyze: new Date("2025-01-14T03:15:00"),
  },
  {
    name: "lessons",
    rows: 45678,
    size: 1240.5,
    indexesCount: 12,
    lastVacuum: new Date("2025-01-14T03:00:00"),
    lastAnalyze: new Date("2025-01-14T03:15:00"),
  },
  {
    name: "vehicles",
    rows: 45,
    size: 3.2,
    indexesCount: 4,
    lastVacuum: new Date("2025-01-14T03:00:00"),
    lastAnalyze: new Date("2025-01-14T03:15:00"),
  },
  {
    name: "invoices",
    rows: 12456,
    size: 456.7,
    indexesCount: 10,
    lastVacuum: new Date("2025-01-14T03:00:00"),
    lastAnalyze: new Date("2025-01-14T03:15:00"),
  },
  {
    name: "payments",
    rows: 8934,
    size: 234.1,
    indexesCount: 7,
    lastVacuum: new Date("2025-01-14T03:00:00"),
    lastAnalyze: new Date("2025-01-14T03:15:00"),
  },
];

export const mockBackupConfig: BackupConfig = {
  schedule: "0 3 * * *", // Every day at 3:00 AM
  retention: 30, // days
  status: "active",
  lastBackup: new Date("2025-01-15T03:00:00"),
  lastBackupStatus: "success",
};

export const mockBackups: Backup[] = [
  {
    id: "backup-1",
    date: new Date("2025-01-15T03:00:00"),
    size: 11.8,
    duration: 245,
    status: "success",
    type: "automatic",
  },
  {
    id: "backup-2",
    date: new Date("2025-01-14T03:00:00"),
    size: 11.6,
    duration: 238,
    status: "success",
    type: "automatic",
  },
  {
    id: "backup-3",
    date: new Date("2025-01-13T15:30:00"),
    size: 11.5,
    duration: 198,
    status: "success",
    type: "manual",
  },
  {
    id: "backup-4",
    date: new Date("2025-01-13T03:00:00"),
    size: 11.4,
    duration: 242,
    status: "success",
    type: "automatic",
  },
  {
    id: "backup-5",
    date: new Date("2025-01-12T03:00:00"),
    size: 11.2,
    duration: 235,
    status: "success",
    type: "automatic",
  },
  {
    id: "backup-6",
    date: new Date("2025-01-11T03:00:00"),
    size: 11.0,
    duration: 0,
    status: "failed",
    type: "automatic",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getRolesByLevel(): Role[] {
  return [...mockRoles].sort((a, b) => b.level - a.level);
}

export function getRoleChildren(roleId: string): Role[] {
  return mockRoles.filter((r) => r.parentId === roleId);
}

export function getRoleAncestors(roleId: string): Role[] {
  const ancestors: Role[] = [];
  let currentRole = mockRoles.find((r) => r.id === roleId);

  while (currentRole?.parentId) {
    const parent = mockRoles.find((r) => r.id === currentRole!.parentId);
    if (parent) {
      ancestors.push(parent);
      currentRole = parent;
    } else {
      break;
    }
  }

  return ancestors;
}

export function getTimeAgo(
  date: Date,
  locale: AdminRolesLocale = "fr"
): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  const t = adminRolesTranslations[locale].common.timeAgo;

  if (diffMins < 1) return t.now;
  if (diffMins < 60) return t.minutes.replace("{{count}}", diffMins.toString());
  if (diffHours < 24) return t.hours.replace("{{count}}", diffHours.toString());
  return t.days.replace("{{count}}", diffDays.toString());
}
