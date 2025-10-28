/**
 * VIAMENTOR - Navigation Configuration
 * Configuration complète navigation tous rôles RBAC
 *
 * Rôles supportés:
 * - super_admin: Administration système complète
 * - platform_admin: Gestion plateforme multi-tenant
 * - school_admin: Administration auto-école (tenant)
 * - instructor: Moniteur pédagogie
 * - student: Élève progression
 * - secretary: Secrétariat opérationnel
 */

import {
  HomeIcon,
  UsersIcon,
  GraduationCapIcon,
  CalendarIcon,
  CarIcon,
  ClipboardCheckIcon,
  ReceiptIcon,
  FolderIcon,
  ShieldIcon,
  BarChart2Icon,
  SettingsIcon,
  HelpCircleIcon,
  Building2Icon,
  FileTextIcon,
  ClockIcon,
  TrendingUpIcon,
  LockIcon,
  BarChart3Icon,
  CreditCardIcon,
  UserCheckIcon,
  UserCogIcon,
  DoorOpenIcon,
  CalendarPlusIcon,
  CheckSquareIcon,
  UserPlusIcon,
  MessageSquareIcon,
  UserIcon,
  RotateCcwIcon,
  HeadphonesIcon,
  FileBarChartIcon,
  SlidersIcon,
  type ShapesIcon as LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  type: "link" | "collapsible";
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: {
    type: "count" | "status" | "new";
    value?: string | number;
    variant?: "default" | "primary" | "success" | "warning" | "danger";
  };
  children?: NavigationItem[];
}

export interface NavigationSection {
  id: string;
  label?: string;
  items: NavigationItem[];
}

export type NavigationConfig = NavigationSection[];

// ============================================================================
// SUPER ADMIN NAVIGATION
// ============================================================================

export const SUPER_ADMIN_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "super-admin-dashboard",
        type: "link",
        label: "navigation.superAdminDashboard",
        icon: HomeIcon,
        href: "/super-admin",
      },
    ],
  },
  {
    id: "system",
    label: "navigation.sections.systemAdmin",
    items: [
      {
        id: "tenants",
        type: "link",
        label: "navigation.tenants",
        icon: Building2Icon,
        href: "/tenants",
        badge: {
          type: "count",
          value: 247,
        },
      },
      {
        id: "users",
        type: "link",
        label: "navigation.globalUsers",
        icon: UsersIcon,
        href: "/users",
      },
      {
        id: "billing",
        type: "link",
        label: "navigation.tenantsBilling",
        icon: CreditCardIcon,
        href: "/billing",
      },
    ],
  },
  {
    id: "monitoring",
    label: "navigation.sections.monitoring",
    items: [
      {
        id: "system-health",
        type: "link",
        label: "navigation.systemHealth",
        icon: BarChart2Icon,
        href: "/system/health",
      },
      {
        id: "security-alerts",
        type: "link",
        label: "navigation.securityAlerts",
        icon: ShieldIcon,
        href: "/security/alerts",
        badge: {
          type: "count",
          value: 3,
          variant: "danger",
        },
      },
      {
        id: "audit",
        type: "link",
        label: "navigation.auditLogs",
        icon: FileTextIcon,
        href: "/audit",
      },
      {
        id: "analytics",
        type: "link",
        label: "navigation.platformAnalytics",
        icon: BarChart3Icon,
        href: "/analytics",
      },
    ],
  },
  {
    id: "configuration",
    label: "navigation.sections.configuration",
    items: [
      {
        id: "config",
        type: "link",
        label: "navigation.systemConfig",
        icon: SlidersIcon,
        href: "/config",
      },
      {
        id: "feature-flags",
        type: "link",
        label: "navigation.featureFlags",
        icon: SettingsIcon,
        href: "/config/features",
      },
      {
        id: "integrations",
        type: "link",
        label: "navigation.integrations",
        icon: SettingsIcon,
        href: "/config/integrations",
      },
    ],
  },
  {
    id: "support",
    label: "navigation.sections.support",
    items: [
      {
        id: "documentation",
        type: "link",
        label: "navigation.documentation",
        icon: HelpCircleIcon,
        href: "/docs",
      },
    ],
  },
];

// ============================================================================
// PLATFORM ADMIN NAVIGATION
// ============================================================================

export const PLATFORM_ADMIN_NAV: NavigationConfig = [
  {
    id: "platform",
    label: "navigation.sections.platform",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.dashboard",
        icon: HomeIcon,
        href: "/dashboard",
      },
      {
        id: "tenants",
        type: "link",
        label: "navigation.activeTenants",
        icon: Building2Icon,
        href: "/tenants",
      },
      {
        id: "support",
        type: "link",
        label: "navigation.supportTickets",
        icon: HeadphonesIcon,
        href: "/support",
      },
      {
        id: "gdpr",
        type: "link",
        label: "navigation.gdprExports",
        icon: LockIcon,
        href: "/compliance/gdpr",
      },
      {
        id: "reports",
        type: "link",
        label: "navigation.globalReports",
        icon: FileBarChartIcon,
        href: "/reports",
      },
    ],
  },
];

// ============================================================================
// SCHOOL ADMIN NAVIGATION (TENANT)
// ============================================================================

export const SCHOOL_ADMIN_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.dashboard",
        icon: HomeIcon,
        href: "/school-admin",
      },
    ],
  },
  {
    id: "school",
    label: "navigation.sections.school",
    items: [
      {
        id: "students",
        type: "link",
        label: "navigation.students",
        icon: UsersIcon,
        href: "/students",
      },
      {
        id: "instructors",
        type: "link",
        label: "navigation.instructors",
        icon: UserCheckIcon,
        href: "/instructors",
      },
      {
        id: "secretaries",
        type: "link",
        label: "navigation.secretaries",
        icon: UserCogIcon,
        href: "/staff",
      },
      {
        id: "vehicles",
        type: "link",
        label: "navigation.vehicles",
        icon: CarIcon,
        href: "/vehicles",
      },
      {
        id: "rooms",
        type: "link",
        label: "navigation.rooms",
        icon: DoorOpenIcon,
        href: "/rooms",
      },
    ],
  },
  {
    id: "planning",
    label: "navigation.sections.planning",
    items: [
      {
        id: "planning",
        type: "link",
        label: "navigation.planning",
        icon: CalendarIcon,
        href: "/planning",
      },
      {
        id: "lessons",
        type: "link",
        label: "navigation.lessons",
        icon: ClipboardCheckIcon,
        href: "/lessons",
      },
      {
        id: "availability",
        type: "link",
        label: "navigation.instructorsAvailability",
        icon: ClockIcon,
        href: "/availability",
      },
      {
        id: "group-lessons",
        type: "link",
        label: "navigation.groupLessons",
        icon: GraduationCapIcon,
        href: "/group-lessons",
      },
      {
        id: "makeups",
        type: "link",
        label: "navigation.makeups",
        icon: RotateCcwIcon,
        href: "/settings/makeups",
      },
    ],
  },
  {
    id: "commercial",
    label: "navigation.sections.commercial",
    items: [
      {
        id: "prospects",
        type: "link",
        label: "navigation.prospectsCRM",
        icon: UsersIcon,
        href: "/staff/prospects",
      },
      {
        id: "registrations",
        type: "link",
        label: "navigation.registrations",
        icon: UserPlusIcon,
        href: "/secretary/registrations",
      },
      {
        id: "campaigns",
        type: "link",
        label: "navigation.marketingCampaigns",
        icon: TrendingUpIcon,
        href: "/staff/marketing/campaigns",
      },
      {
        id: "pixels",
        type: "link",
        label: "navigation.pixelsTracking",
        icon: BarChart2Icon,
        href: "/marketing/pixels/health",
      },
    ],
  },
  {
    id: "billing",
    label: "navigation.sections.billing",
    items: [
      {
        id: "invoices",
        type: "link",
        label: "navigation.invoices",
        icon: ReceiptIcon,
        href: "/invoices",
      },
      {
        id: "payments",
        type: "link",
        label: "navigation.payments",
        icon: CreditCardIcon,
        href: "/payments",
      },
      {
        id: "qr-invoices",
        type: "link",
        label: "navigation.qrInvoices",
        icon: FileTextIcon,
        href: "/finance/invoices",
      },
      {
        id: "reminders",
        type: "link",
        label: "navigation.reminders",
        icon: ClockIcon,
        href: "/billing/reminders",
      },
    ],
  },
  {
    id: "analytics",
    label: "navigation.sections.analytics",
    items: [
      {
        id: "dashboard-analytics",
        type: "link",
        label: "navigation.dashboardAnalytics",
        icon: BarChart2Icon,
        href: "/financial/analytics",
      },
      {
        id: "reports",
        type: "link",
        label: "navigation.reports",
        icon: FileTextIcon,
        href: "/finance/analytics",
      },
      {
        id: "performance",
        type: "link",
        label: "navigation.performance",
        icon: TrendingUpIcon,
        href: "/instructors/analytics",
      },
      {
        id: "roi",
        type: "link",
        label: "navigation.roiCampaigns",
        icon: BarChart3Icon,
        href: "/campaigns/analytics",
      },
    ],
  },
  {
    id: "settings",
    label: "navigation.sections.settings",
    items: [
      {
        id: "settings-central",
        type: "link",
        label: "navigation.settings",
        icon: SettingsIcon,
        href: "/settings",
        badge: {
          type: "status",
          value: "Hub",
          variant: "primary",
        },
      },
      {
        id: "school-settings",
        type: "link",
        label: "navigation.schoolSettings",
        icon: Building2Icon,
        href: "/settings/school",
      },
      {
        id: "pricing",
        type: "link",
        label: "navigation.pricing",
        icon: CreditCardIcon,
        href: "/settings/pricing",
      },
      {
        id: "categories",
        type: "link",
        label: "navigation.categories",
        icon: FolderIcon,
        href: "/settings/categories",
      },
      {
        id: "course-types",
        type: "link",
        label: "navigation.courseTypes",
        icon: GraduationCapIcon,
        href: "/settings/course-types",
      },
      {
        id: "makeups-config",
        type: "link",
        label: "navigation.makeupsConfig",
        icon: SettingsIcon,
        href: "/settings/makeups",
      },
      {
        id: "integrations",
        type: "link",
        label: "navigation.integrations",
        icon: SlidersIcon,
        href: "/settings/integrations",
      },
      {
        id: "users-settings",
        type: "link",
        label: "navigation.users",
        icon: UsersIcon,
        href: "/settings/users",
      },
    ],
  },
];

// ============================================================================
// INSTRUCTOR MANAGER NAVIGATION
// ============================================================================

export const INSTRUCTOR_MANAGER_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.instructorManagerDashboard",
        icon: HomeIcon,
        href: "/instructor-manager",
      },
    ],
  },
  {
    id: "team",
    label: "navigation.sections.school",
    items: [
      {
        id: "team-management",
        type: "link",
        label: "navigation.teamManagement",
        icon: UsersIcon,
        href: "/instructors",
      },
      {
        id: "team-planning",
        type: "link",
        label: "navigation.teamPlanning",
        icon: CalendarIcon,
        href: "/planning",
      },
      {
        id: "team-performance",
        type: "link",
        label: "navigation.teamPerformance",
        icon: TrendingUpIcon,
        href: "/instructors/analytics",
      },
      {
        id: "student-assignments",
        type: "link",
        label: "navigation.studentAssignments",
        icon: UserCheckIcon,
        href: "/students",
      },
    ],
  },
];

// ============================================================================
// MARKETING MANAGER NAVIGATION
// ============================================================================

export const MARKETING_MANAGER_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.marketingManagerDashboard",
        icon: HomeIcon,
        href: "/marketing-manager",
      },
    ],
  },
  {
    id: "marketing",
    label: "navigation.sections.marketing",
    items: [
      {
        id: "campaigns",
        type: "link",
        label: "navigation.marketingCampaigns",
        icon: TrendingUpIcon,
        href: "/staff/marketing/campaigns",
      },
      {
        id: "prospects",
        type: "link",
        label: "navigation.prospectsCRM",
        icon: UsersIcon,
        href: "/staff/prospects",
      },
      {
        id: "pixels",
        type: "link",
        label: "navigation.pixelsTracking",
        icon: BarChart2Icon,
        href: "/marketing/pixels/health",
      },
      {
        id: "reviews",
        type: "link",
        label: "navigation.reviewsManagement",
        icon: MessageSquareIcon,
        href: "/reviews/dashboard",
      },
    ],
  },
  {
    id: "analytics",
    label: "navigation.sections.analytics",
    items: [
      {
        id: "roi-analytics",
        type: "link",
        label: "navigation.roiAnalytics",
        icon: BarChart3Icon,
        href: "/campaigns/analytics",
      },
      {
        id: "attribution",
        type: "link",
        label: "navigation.attribution",
        icon: TrendingUpIcon,
        href: "/campaigns/analytics",
      },
    ],
  },
];

// ============================================================================
// ACCOUNTANT NAVIGATION
// ============================================================================

export const ACCOUNTANT_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.accountantDashboard",
        icon: HomeIcon,
        href: "/accountant",
      },
    ],
  },
  {
    id: "billing",
    label: "navigation.sections.billing",
    items: [
      {
        id: "invoices",
        type: "link",
        label: "navigation.invoices",
        icon: ReceiptIcon,
        href: "/invoices",
      },
      {
        id: "payments",
        type: "link",
        label: "navigation.payments",
        icon: CreditCardIcon,
        href: "/payments",
      },
      {
        id: "qr-invoices",
        type: "link",
        label: "navigation.qrInvoices",
        icon: FileTextIcon,
        href: "/finance/invoices",
      },
    ],
  },
  {
    id: "reports",
    label: "navigation.sections.reports",
    items: [
      {
        id: "accounting-reports",
        type: "link",
        label: "navigation.accountingReports",
        icon: FileBarChartIcon,
        href: "/reports",
      },
      {
        id: "vat-reports",
        type: "link",
        label: "navigation.vatReports",
        icon: FileTextIcon,
        href: "/reports",
      },
      {
        id: "financial-analytics",
        type: "link",
        label: "navigation.financialAnalytics",
        icon: BarChart3Icon,
        href: "/financial/analytics",
      },
    ],
  },
];

// ============================================================================
// FINANCE MANAGER NAVIGATION
// ============================================================================

export const FINANCE_MANAGER_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.financeManagerDashboard",
        icon: HomeIcon,
        href: "/finance-manager",
      },
    ],
  },
  {
    id: "billing",
    label: "navigation.sections.billing",
    items: [
      {
        id: "invoices",
        type: "link",
        label: "navigation.invoices",
        icon: ReceiptIcon,
        href: "/invoices",
      },
      {
        id: "payments",
        type: "link",
        label: "navigation.payments",
        icon: CreditCardIcon,
        href: "/payments",
      },
      {
        id: "qr-invoices",
        type: "link",
        label: "navigation.qrInvoices",
        icon: FileTextIcon,
        href: "/finance/invoices",
      },
      {
        id: "reminders",
        type: "link",
        label: "navigation.reminders",
        icon: ClockIcon,
        href: "/billing/reminders",
      },
    ],
  },
  {
    id: "analytics",
    label: "navigation.sections.analytics",
    items: [
      {
        id: "financial-analytics",
        type: "link",
        label: "navigation.financialAnalytics",
        icon: BarChart3Icon,
        href: "/financial/analytics",
      },
      {
        id: "revenue-analytics",
        type: "link",
        label: "navigation.revenueAnalytics",
        icon: TrendingUpIcon,
        href: "/finance/analytics",
      },
      {
        id: "reports",
        type: "link",
        label: "navigation.reports",
        icon: FileTextIcon,
        href: "/reports",
      },
    ],
  },
  {
    id: "settings",
    label: "navigation.sections.settings",
    items: [
      {
        id: "settings-central",
        type: "link",
        label: "navigation.settings",
        icon: SettingsIcon,
        href: "/settings",
        badge: {
          type: "status",
          value: "Hub",
          variant: "primary",
        },
      },
      {
        id: "pricing",
        type: "link",
        label: "navigation.pricing",
        icon: CreditCardIcon,
        href: "/settings/pricing",
      },
    ],
  },
];

// ============================================================================
// INSTRUCTOR NAVIGATION
// ============================================================================

export const INSTRUCTOR_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.dashboard",
        icon: HomeIcon,
        href: "/instructor-dashboard",
      },
      {
        id: "planning",
        type: "link",
        label: "navigation.planning",
        icon: CalendarIcon,
        href: "/instructor/planning",
      },
      {
        id: "lessons",
        type: "link",
        label: "navigation.lessons",
        icon: ClipboardCheckIcon,
        href: "/instructor/lessons",
      },
      {
        id: "students",
        type: "link",
        label: "navigation.myStudents",
        icon: UsersIcon,
        href: "/instructor/students",
      },
      {
        id: "evaluations",
        type: "link",
        label: "navigation.evaluations",
        icon: ClipboardCheckIcon,
        href: "/instructor/evaluations",
      },
      {
        id: "availability",
        type: "link",
        label: "navigation.availability",
        icon: ClockIcon,
        href: "/instructor/availability",
      },
      {
        id: "makeups",
        type: "link",
        label: "navigation.studentsMakeups",
        icon: RotateCcwIcon,
        href: "/instructor/makeups",
      },
      {
        id: "profile",
        type: "link",
        label: "navigation.profile",
        icon: UserIcon,
        href: "/instructor/profile",
      },
    ],
  },
];

// ============================================================================
// STUDENT NAVIGATION
// ============================================================================

export const STUDENT_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.dashboard",
        icon: HomeIcon,
        href: "/student-dashboard",
      },
      {
        id: "book-lesson",
        type: "link",
        label: "navigation.bookLesson",
        icon: CalendarPlusIcon,
        href: "/student/lessons/book",
        badge: { type: "status", value: "CTA", variant: "primary" },
      },
      {
        id: "progression",
        type: "link",
        label: "navigation.myProgression",
        icon: TrendingUpIcon,
        href: "/student/progression",
      },
      {
        id: "planning",
        type: "link",
        label: "navigation.planning",
        icon: CalendarIcon,
        href: "/student/planning",
      },
      {
        id: "lessons",
        type: "link",
        label: "navigation.lessons",
        icon: ClipboardCheckIcon,
        href: "/student/lessons",
      },
      {
        id: "invoices",
        type: "link",
        label: "navigation.invoices",
        icon: ReceiptIcon,
        href: "/student/billing",
      },
      {
        id: "documents",
        type: "link",
        label: "navigation.documents",
        icon: FileTextIcon,
        href: "/student/documents",
      },
      {
        id: "makeups",
        type: "link",
        label: "navigation.makeups",
        icon: RotateCcwIcon,
        href: "/student/makeups",
      },
      {
        id: "profile",
        type: "link",
        label: "navigation.profile",
        icon: UserIcon,
        href: "/student/profile",
      },
    ],
  },
];

// ============================================================================
// SECRETARY NAVIGATION
// ============================================================================

export const SECRETARY_NAV: NavigationConfig = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.dashboard",
        icon: HomeIcon,
        href: "/secretary/dashboard",
      },
      {
        id: "tasks",
        type: "link",
        label: "navigation.dailyTasks",
        icon: CheckSquareIcon,
        href: "/staff/tasks",
      },
      {
        id: "quick-register",
        type: "link",
        label: "navigation.quickRegister",
        icon: UserPlusIcon,
        href: "/secretary/registrations",
      },
      {
        id: "planning",
        type: "link",
        label: "navigation.planning",
        icon: CalendarIcon,
        href: "/secretary/planning",
      },
      {
        id: "lessons",
        type: "link",
        label: "navigation.lessons",
        icon: ClipboardCheckIcon,
        href: "/secretary/lessons",
      },
      {
        id: "prospects",
        type: "link",
        label: "navigation.prospects",
        icon: UsersIcon,
        href: "/staff/prospects",
      },
      {
        id: "students",
        type: "link",
        label: "navigation.students",
        icon: GraduationCapIcon,
        href: "/students",
      },
      {
        id: "messages",
        type: "link",
        label: "navigation.messages",
        icon: MessageSquareIcon,
        href: "/staff/messages",
      },
      {
        id: "profile",
        type: "link",
        label: "navigation.profile",
        icon: UserIcon,
        href: "/staff/profile",
      },
    ],
  },
];

// ============================================================================
// NAVIGATION BY ROLE MAPPING
// ============================================================================

export const NAVIGATION_BY_ROLE: Record<string, NavigationConfig> = {
  super_admin: SUPER_ADMIN_NAV,
  platform_admin: PLATFORM_ADMIN_NAV,
  school_admin: SCHOOL_ADMIN_NAV,
  instructor_manager: INSTRUCTOR_MANAGER_NAV,
  marketing_manager: MARKETING_MANAGER_NAV,
  finance_manager: FINANCE_MANAGER_NAV,
  accountant: ACCOUNTANT_NAV,
  instructor: INSTRUCTOR_NAV,
  student: STUDENT_NAV,
  secretary: SECRETARY_NAV,
};
