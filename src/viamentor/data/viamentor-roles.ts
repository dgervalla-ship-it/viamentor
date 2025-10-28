/**
 * VIAMENTOR RBAC System - Role Types & Permissions Matrix
 *
 * Système de contrôle d'accès basé sur les rôles (RBAC) pour VIAMENTOR
 * Architecture multi-tenant avec hiérarchie de 15 rôles
 *
 * @module data/viamentor-roles
 * @version 1.0.0
 */

/**
 * Énumération des rôles utilisateur VIAMENTOR
 * Hiérarchie: Super Admin > Platform Admins > School Admin > Staff > Student
 */
export enum UserRole {
  // Root Level (Niveau 0)
  SUPER_ADMIN = "SUPER_ADMIN",

  // Platform Level (Niveau 1)
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  DATABASE_ADMIN = "DATABASE_ADMIN",
  SECURITY_OFFICER = "SECURITY_OFFICER", // DPO
  FINANCE_ADMIN = "FINANCE_ADMIN",
  SUPPORT_MANAGER = "SUPPORT_MANAGER",
  CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS",
  PRODUCT_MANAGER = "PRODUCT_MANAGER",
  DATA_ANALYST = "DATA_ANALYST",
  INTEGRATOR_API_ADMIN = "INTEGRATOR_API_ADMIN",
  QA_TESTER = "QA_TESTER",
  AUDITOR = "AUDITOR",

  // Tenant Level (Niveau 2)
  SCHOOL_ADMIN = "SCHOOL_ADMIN",

  // School Staff Level (Niveau 3)
  INSTRUCTOR = "INSTRUCTOR", // Moniteur
  SECRETARY = "SECRETARY", // Secrétaire
  STAFF = "STAFF",

  // Student Level (Niveau 4)
  STUDENT = "STUDENT",
}

/**
 * Catégories de permissions système
 */
export enum PermissionCategory {
  SYSTEM = "SYSTEM",
  TENANT = "TENANT",
  USER = "USER",
  SCHOOL = "SCHOOL",
  INSTRUCTOR = "INSTRUCTOR",
  STUDENT = "STUDENT",
  LESSON = "LESSON",
  SCHEDULE = "SCHEDULE",
  PAYMENT = "PAYMENT",
  REPORT = "REPORT",
  AUDIT = "AUDIT",
  API = "API",
}

/**
 * Actions CRUD + spécifiques
 */
export enum PermissionAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  MANAGE = "MANAGE", // Full control
  APPROVE = "APPROVE",
  EXPORT = "EXPORT",
  IMPORT = "IMPORT",
}

/**
 * Interface pour une permission individuelle
 */
export interface Permission {
  category: PermissionCategory;
  action: PermissionAction;
  resource?: string;
  conditions?: Record<string, unknown>;
}

/**
 * Interface pour les permissions d'un rôle
 */
export interface RolePermissions {
  role: UserRole;
  level: number;
  permissions: Permission[];
  inheritsFrom?: UserRole[];
  description: string;
  tenantScoped: boolean;
}

/**
 * Matrice complète des permissions par rôle
 * Définit les capacités de chaque rôle dans le système
 */
export const ROLE_MATRIX: Record<UserRole, RolePermissions> = {
  // ============================================
  // NIVEAU 0: ROOT
  // ============================================
  [UserRole.SUPER_ADMIN]: {
    role: UserRole.SUPER_ADMIN,
    level: 0,
    description: "Accès root complet au système",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.SYSTEM, action: PermissionAction.MANAGE },
      { category: PermissionCategory.TENANT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.USER, action: PermissionAction.MANAGE },
      { category: PermissionCategory.AUDIT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.API, action: PermissionAction.MANAGE },
    ],
  },

  // ============================================
  // NIVEAU 1: PLATFORM ADMINS
  // ============================================
  [UserRole.PLATFORM_ADMIN]: {
    role: UserRole.PLATFORM_ADMIN,
    level: 1,
    description: "Administration plateforme globale",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.TENANT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.USER, action: PermissionAction.MANAGE },
      { category: PermissionCategory.REPORT, action: PermissionAction.READ },
      { category: PermissionCategory.AUDIT, action: PermissionAction.READ },
    ],
  },

  [UserRole.SYSTEM_ADMIN]: {
    role: UserRole.SYSTEM_ADMIN,
    level: 1,
    description: "Administration système et infrastructure",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.SYSTEM, action: PermissionAction.UPDATE },
      { category: PermissionCategory.SYSTEM, action: PermissionAction.READ },
      { category: PermissionCategory.AUDIT, action: PermissionAction.READ },
    ],
  },

  [UserRole.DATABASE_ADMIN]: {
    role: UserRole.DATABASE_ADMIN,
    level: 1,
    description: "Administration base de données",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.SYSTEM, action: PermissionAction.READ },
      { category: PermissionCategory.AUDIT, action: PermissionAction.EXPORT },
      { category: PermissionCategory.TENANT, action: PermissionAction.READ },
    ],
  },

  [UserRole.SECURITY_OFFICER]: {
    role: UserRole.SECURITY_OFFICER,
    level: 1,
    description: "Délégué à la protection des données (DPO)",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.AUDIT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.USER, action: PermissionAction.READ },
      { category: PermissionCategory.SYSTEM, action: PermissionAction.READ },
    ],
  },

  [UserRole.FINANCE_ADMIN]: {
    role: UserRole.FINANCE_ADMIN,
    level: 1,
    description: "Administration financière globale",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.PAYMENT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.REPORT, action: PermissionAction.EXPORT },
      { category: PermissionCategory.TENANT, action: PermissionAction.READ },
    ],
  },

  [UserRole.SUPPORT_MANAGER]: {
    role: UserRole.SUPPORT_MANAGER,
    level: 1,
    description: "Gestion support client",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.TENANT, action: PermissionAction.READ },
      { category: PermissionCategory.USER, action: PermissionAction.READ },
      { category: PermissionCategory.SCHOOL, action: PermissionAction.READ },
    ],
  },

  [UserRole.CUSTOMER_SUCCESS]: {
    role: UserRole.CUSTOMER_SUCCESS,
    level: 1,
    description: "Succès client et onboarding",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.TENANT, action: PermissionAction.READ },
      { category: PermissionCategory.SCHOOL, action: PermissionAction.READ },
      { category: PermissionCategory.REPORT, action: PermissionAction.READ },
    ],
  },

  [UserRole.PRODUCT_MANAGER]: {
    role: UserRole.PRODUCT_MANAGER,
    level: 1,
    description: "Gestion produit et roadmap",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.REPORT, action: PermissionAction.READ },
      { category: PermissionCategory.AUDIT, action: PermissionAction.READ },
    ],
  },

  [UserRole.DATA_ANALYST]: {
    role: UserRole.DATA_ANALYST,
    level: 1,
    description: "Analyse données et reporting",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.REPORT, action: PermissionAction.EXPORT },
      { category: PermissionCategory.TENANT, action: PermissionAction.READ },
    ],
  },

  [UserRole.INTEGRATOR_API_ADMIN]: {
    role: UserRole.INTEGRATOR_API_ADMIN,
    level: 1,
    description: "Administration API et intégrations",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.API, action: PermissionAction.MANAGE },
      { category: PermissionCategory.SYSTEM, action: PermissionAction.READ },
    ],
  },

  [UserRole.QA_TESTER]: {
    role: UserRole.QA_TESTER,
    level: 1,
    description: "Tests qualité et validation",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.SYSTEM, action: PermissionAction.READ },
      { category: PermissionCategory.TENANT, action: PermissionAction.READ },
    ],
  },

  [UserRole.AUDITOR]: {
    role: UserRole.AUDITOR,
    level: 1,
    description: "Audit et conformité",
    tenantScoped: false,
    permissions: [
      { category: PermissionCategory.AUDIT, action: PermissionAction.READ },
      { category: PermissionCategory.AUDIT, action: PermissionAction.EXPORT },
    ],
  },

  // ============================================
  // NIVEAU 2: TENANT (SCHOOL)
  // ============================================
  [UserRole.SCHOOL_ADMIN]: {
    role: UserRole.SCHOOL_ADMIN,
    level: 2,
    description: "Administrateur auto-école (tenant)",
    tenantScoped: true,
    permissions: [
      { category: PermissionCategory.SCHOOL, action: PermissionAction.MANAGE },
      {
        category: PermissionCategory.INSTRUCTOR,
        action: PermissionAction.MANAGE,
      },
      { category: PermissionCategory.STUDENT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.LESSON, action: PermissionAction.MANAGE },
      {
        category: PermissionCategory.SCHEDULE,
        action: PermissionAction.MANAGE,
      },
      { category: PermissionCategory.PAYMENT, action: PermissionAction.MANAGE },
      { category: PermissionCategory.REPORT, action: PermissionAction.EXPORT },
    ],
  },

  // ============================================
  // NIVEAU 3: SCHOOL STAFF
  // ============================================
  [UserRole.INSTRUCTOR]: {
    role: UserRole.INSTRUCTOR,
    level: 3,
    description: "Moniteur de conduite",
    tenantScoped: true,
    permissions: [
      { category: PermissionCategory.LESSON, action: PermissionAction.CREATE },
      { category: PermissionCategory.LESSON, action: PermissionAction.READ },
      { category: PermissionCategory.LESSON, action: PermissionAction.UPDATE },
      { category: PermissionCategory.SCHEDULE, action: PermissionAction.READ },
      { category: PermissionCategory.STUDENT, action: PermissionAction.READ },
    ],
  },

  [UserRole.SECRETARY]: {
    role: UserRole.SECRETARY,
    level: 3,
    description: "Secrétaire auto-école",
    tenantScoped: true,
    permissions: [
      { category: PermissionCategory.STUDENT, action: PermissionAction.CREATE },
      { category: PermissionCategory.STUDENT, action: PermissionAction.READ },
      { category: PermissionCategory.STUDENT, action: PermissionAction.UPDATE },
      {
        category: PermissionCategory.SCHEDULE,
        action: PermissionAction.MANAGE,
      },
      { category: PermissionCategory.PAYMENT, action: PermissionAction.READ },
    ],
  },

  [UserRole.STAFF]: {
    role: UserRole.STAFF,
    level: 3,
    description: "Personnel auto-école",
    tenantScoped: true,
    permissions: [
      { category: PermissionCategory.STUDENT, action: PermissionAction.READ },
      { category: PermissionCategory.SCHEDULE, action: PermissionAction.READ },
    ],
  },

  // ============================================
  // NIVEAU 4: STUDENT
  // ============================================
  [UserRole.STUDENT]: {
    role: UserRole.STUDENT,
    level: 4,
    description: "Élève conducteur",
    tenantScoped: true,
    permissions: [
      {
        category: PermissionCategory.LESSON,
        action: PermissionAction.READ,
        resource: "own",
      },
      {
        category: PermissionCategory.SCHEDULE,
        action: PermissionAction.READ,
        resource: "own",
      },
      {
        category: PermissionCategory.PAYMENT,
        action: PermissionAction.READ,
        resource: "own",
      },
    ],
  },
};

/**
 * Utilitaires pour vérification des permissions
 */
export class RoleUtils {
  /**
   * Vérifie si un rôle a une permission spécifique
   */
  static hasPermission(
    role: UserRole,
    category: PermissionCategory,
    action: PermissionAction
  ): boolean {
    const rolePerms = ROLE_MATRIX[role];
    return rolePerms.permissions.some(
      (p) =>
        p.category === category &&
        (p.action === action || p.action === PermissionAction.MANAGE)
    );
  }

  /**
   * Vérifie si un rôle est supérieur à un autre
   */
  static isHigherRole(role1: UserRole, role2: UserRole): boolean {
    return ROLE_MATRIX[role1].level < ROLE_MATRIX[role2].level;
  }

  /**
   * Récupère tous les rôles d'un niveau spécifique
   */
  static getRolesByLevel(level: number): UserRole[] {
    return Object.values(UserRole).filter(
      (role) => ROLE_MATRIX[role].level === level
    );
  }

  /**
   * Vérifie si un rôle est scopé au tenant
   */
  static isTenantScoped(role: UserRole): boolean {
    return ROLE_MATRIX[role].tenantScoped;
  }
}

export type { Permission, RolePermissions };
