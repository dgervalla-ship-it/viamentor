/**
 * VIAMENTOR - Sidebar Navigation Optimized
 * Configuration navigation réorganisée pour une expérience utilisateur optimale
 */

import type { ShapesIcon as LucideIcon } from "lucide-react";
import {
  HomeIcon,
  UsersIcon,
  GraduationCapIcon,
  CalendarIcon,
  CarIcon,
  ClipboardCheckIcon,
  BanknoteIcon,
  ShieldCheckIcon,
  SettingsIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  FileTextIcon,
  ClockIcon,
  TrendingUpIcon,
  WrenchIcon,
  ArchiveIcon,
  UploadIcon,
  FileSpreadsheetIcon,
  BuildingIcon,
  UserCogIcon,
  DollarSignIcon,
  ZapIcon,
  CreditCardIcon,
} from "lucide-react";

export type NavigationItemType = "link" | "collapsible";

export interface NavigationItem {
  id: string;
  type: NavigationItemType;
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

/**
 * Navigation optimisée pour School Admin
 * Structure hiérarchique claire: Dashboard → Gestion → Finances → Analytics → Conformité → Paramètres
 */
export const OPTIMIZED_SCHOOL_ADMIN_NAV: NavigationConfig = [
  // Dashboard
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        type: "link",
        label: "navigation.dashboard",
        icon: HomeIcon,
        href: "/dashboard",
      },
    ],
  },

  // Gestion quotidienne
  {
    id: "management",
    label: "navigation.sections.management",
    items: [
      {
        id: "students",
        type: "collapsible",
        label: "navigation.students.title",
        icon: UsersIcon,
        badge: { type: "count", variant: "primary" },
        children: [
          {
            id: "students-list",
            type: "link",
            label: "navigation.students.list",
            icon: UsersIcon,
            href: "/students",
          },
          {
            id: "students-new",
            type: "link",
            label: "navigation.students.new",
            icon: UsersIcon,
            href: "/students/new",
          },
          {
            id: "students-import",
            type: "link",
            label: "navigation.students.import",
            icon: UploadIcon,
            href: "/students/import",
          },
          {
            id: "students-archive",
            type: "link",
            label: "navigation.students.archive",
            icon: ArchiveIcon,
            href: "/students/archive",
          },
        ],
      },
      {
        id: "instructors",
        type: "collapsible",
        label: "navigation.instructors.title",
        icon: GraduationCapIcon,
        children: [
          {
            id: "instructors-list",
            type: "link",
            label: "navigation.instructors.list",
            icon: GraduationCapIcon,
            href: "/instructors",
          },
          {
            id: "instructors-new",
            type: "link",
            label: "navigation.instructors.new",
            icon: GraduationCapIcon,
            href: "/instructors/new",
          },
        ],
      },
      {
        id: "vehicles",
        type: "collapsible",
        label: "navigation.vehicles.title",
        icon: CarIcon,
        children: [
          {
            id: "vehicles-list",
            type: "link",
            label: "navigation.vehicles.list",
            icon: CarIcon,
            href: "/vehicles",
          },
          {
            id: "vehicles-new",
            type: "link",
            label: "navigation.vehicles.new",
            icon: CarIcon,
            href: "/vehicles/new",
          },
          {
            id: "vehicles-maintenance",
            type: "link",
            label: "navigation.vehicles.maintenance",
            icon: WrenchIcon,
            href: "/vehicles/maintenance",
          },
        ],
      },
      {
        id: "planning",
        type: "link",
        label: "navigation.planning",
        icon: CalendarIcon,
        href: "/planning",
        badge: { type: "count", variant: "warning" },
      },
    ],
  },

  // Finances
  {
    id: "finances",
    label: "navigation.sections.finances",
    items: [
      {
        id: "billing",
        type: "link",
        label: "navigation.finances.billing",
        icon: LayoutDashboardIcon,
        href: "/billing",
      },
      {
        id: "invoices",
        type: "link",
        label: "navigation.finances.invoices",
        icon: FileSpreadsheetIcon,
        href: "/invoices",
      },
      {
        id: "payments",
        type: "link",
        label: "navigation.finances.payments",
        icon: CreditCardIcon,
        href: "/payments",
      },
    ],
  },

  // Analytics
  {
    id: "analytics",
    label: "navigation.sections.analytics",
    items: [
      {
        id: "analytics-instructors",
        type: "link",
        label: "navigation.analytics.instructors",
        icon: GraduationCapIcon,
        href: "/instructors/analytics",
      },
      {
        id: "analytics-vehicles",
        type: "link",
        label: "navigation.analytics.vehicles",
        icon: CarIcon,
        href: "/vehicles/analytics",
      },
      {
        id: "analytics-financial",
        type: "link",
        label: "navigation.analytics.financial",
        icon: TrendingUpIcon,
        href: "/financial/analytics",
      },
      {
        id: "analytics-exams",
        type: "link",
        label: "navigation.analytics.exams",
        icon: ClipboardCheckIcon,
        href: "/exams/analytics",
      },
    ],
  },

  // Conformité
  {
    id: "compliance",
    items: [
      {
        id: "compliance-gdpr",
        type: "link",
        label: "navigation.compliance",
        icon: ShieldCheckIcon,
        href: "/compliance/gdpr",
        badge: { type: "status", value: "OK", variant: "success" },
      },
    ],
  },

  // Paramètres
  {
    id: "settings",
    label: "navigation.sections.settings",
    items: [
      {
        id: "settings-school",
        type: "link",
        label: "navigation.settings.school",
        icon: BuildingIcon,
        href: "/settings/school",
      },
      {
        id: "settings-users",
        type: "link",
        label: "navigation.settings.users",
        icon: UserCogIcon,
        href: "/settings/users",
      },
      {
        id: "settings-pricing",
        type: "link",
        label: "navigation.settings.pricing",
        icon: DollarSignIcon,
        href: "/settings/pricing",
      },
      {
        id: "settings-notifications",
        type: "link",
        label: "navigation.settings.notifications",
        icon: ZapIcon,
        href: "/settings/notifications",
      },
      {
        id: "settings-hours",
        type: "link",
        label: "navigation.settings.hours",
        icon: ClockIcon,
        href: "/settings/hours",
      },
    ],
  },

  // Support
  {
    id: "support",
    items: [
      {
        id: "support",
        type: "link",
        label: "navigation.support",
        icon: HelpCircleIcon,
        href: "/support",
      },
    ],
  },
];

/**
 * Mock badges dynamiques
 */
export const OPTIMIZED_BADGE_COUNTS = {
  school_admin: {
    students: 45,
    planning: 8,
  },
};

/**
 * Traductions i18n optimisées
 */
export const OPTIMIZED_I18N = {
  fr: {
    navigation: {
      sections: {
        management: "Gestion",
        finances: "Finances",
        analytics: "Analytics",
        settings: "Paramètres",
      },
      dashboard: "Tableau de bord",
      planning: "Planning",
      students: {
        title: "Élèves",
        list: "Liste",
        new: "Nouveau",
        import: "Importer",
        archive: "Archive",
      },
      instructors: {
        title: "Moniteurs",
        list: "Liste",
        new: "Nouveau",
      },
      vehicles: {
        title: "Véhicules",
        list: "Liste",
        new: "Nouveau",
        maintenance: "Entretien",
      },
      finances: {
        billing: "Facturation",
        invoices: "Factures",
        payments: "Paiements",
      },
      analytics: {
        instructors: "Performance moniteurs",
        vehicles: "Utilisation véhicules",
        financial: "Analytics financières",
        exams: "Résultats examens",
      },
      compliance: "Conformité OMCo",
      settings: {
        school: "École",
        users: "Utilisateurs",
        pricing: "Tarifs",
        notifications: "Notifications",
        hours: "Horaires",
      },
      support: "Support",
    },
  },
  de: {
    navigation: {
      sections: {
        management: "Verwaltung",
        finances: "Finanzen",
        analytics: "Analytics",
        settings: "Einstellungen",
      },
      dashboard: "Dashboard",
      planning: "Planung",
      students: {
        title: "Schüler",
        list: "Liste",
        new: "Neu",
        import: "Importieren",
        archive: "Archiv",
      },
      instructors: {
        title: "Fahrlehrer",
        list: "Liste",
        new: "Neu",
      },
      vehicles: {
        title: "Fahrzeuge",
        list: "Liste",
        new: "Neu",
        maintenance: "Wartung",
      },
      finances: {
        billing: "Abrechnung",
        invoices: "Rechnungen",
        payments: "Zahlungen",
      },
      analytics: {
        instructors: "Fahrlehrer-Leistung",
        vehicles: "Fahrzeugnutzung",
        financial: "Finanz-Analytics",
        exams: "Prüfungsergebnisse",
      },
      compliance: "OMCo-Konformität",
      settings: {
        school: "Fahrschule",
        users: "Benutzer",
        pricing: "Preise",
        notifications: "Benachrichtigungen",
        hours: "Öffnungszeiten",
      },
      support: "Support",
    },
  },
  it: {
    navigation: {
      sections: {
        management: "Gestione",
        finances: "Finanze",
        analytics: "Analytics",
        settings: "Impostazioni",
      },
      dashboard: "Dashboard",
      planning: "Pianificazione",
      students: {
        title: "Allievi",
        list: "Lista",
        new: "Nuovo",
        import: "Importa",
        archive: "Archivio",
      },
      instructors: {
        title: "Istruttori",
        list: "Lista",
        new: "Nuovo",
      },
      vehicles: {
        title: "Veicoli",
        list: "Lista",
        new: "Nuovo",
        maintenance: "Manutenzione",
      },
      finances: {
        billing: "Fatturazione",
        invoices: "Fatture",
        payments: "Pagamenti",
      },
      analytics: {
        instructors: "Prestazioni istruttori",
        vehicles: "Utilizzo veicoli",
        financial: "Analytics finanziarie",
        exams: "Risultati esami",
      },
      compliance: "Conformità OMCo",
      settings: {
        school: "Scuola guida",
        users: "Utenti",
        pricing: "Prezzi",
        notifications: "Notifiche",
        hours: "Orari",
      },
      support: "Supporto",
    },
  },
  en: {
    navigation: {
      sections: {
        management: "Management",
        finances: "Finances",
        analytics: "Analytics",
        settings: "Settings",
      },
      dashboard: "Dashboard",
      planning: "Planning",
      students: {
        title: "Students",
        list: "List",
        new: "New",
        import: "Import",
        archive: "Archive",
      },
      instructors: {
        title: "Instructors",
        list: "List",
        new: "New",
      },
      vehicles: {
        title: "Vehicles",
        list: "List",
        new: "New",
        maintenance: "Maintenance",
      },
      finances: {
        billing: "Billing",
        invoices: "Invoices",
        payments: "Payments",
      },
      analytics: {
        instructors: "Instructor performance",
        vehicles: "Vehicle utilization",
        financial: "Financial analytics",
        exams: "Exam results",
      },
      compliance: "OMCo Compliance",
      settings: {
        school: "School",
        users: "Users",
        pricing: "Pricing",
        notifications: "Notifications",
        hours: "Business hours",
      },
      support: "Support",
    },
  },
};
