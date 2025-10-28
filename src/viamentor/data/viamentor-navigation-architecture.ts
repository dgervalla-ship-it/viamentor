/**
 * VIAMENTOR - Navigation Architecture Documentation
 * Documentation complète architecture navigation sidebar
 *
 * Structure modulaire:
 * - Components (UI)
 * - Data (Config, i18n, hooks)
 * - Features (RBAC, Analytics, Keyboard)
 */

// ============================================================================
// ARCHITECTURE OVERVIEW
// ============================================================================

export const NAVIGATION_ARCHITECTURE = {
  overview: {
    title: "Viamentor Navigation Sidebar Architecture",
    description: "Architecture modulaire complète avec RBAC, i18n, analytics",
    version: "2.1.0",
    lastUpdated: "2025-01-13",
  },

  // ==========================================================================
  // COMPONENTS STRUCTURE
  // ==========================================================================

  components: {
    "viamentor-sidebar-link": {
      path: "@/viamentor/components/viamentor-sidebar-link",
      lines: 225,
      purpose: "Lien navigation individuel avec icon, badge, active state",
      features: [
        "Icon Lucide 20x20 consistent",
        "Badge count/status dynamic",
        "Active state highlight border-left 3px",
        "Hover smooth transition 150ms",
        "Tooltip full label collapsed mode",
        "Nested indent 12px hierarchy",
      ],

      props: {
        id: "string - Unique identifier",
        label: "string - Display label",
        icon: "LucideIcon - Icon component",
        href: "string - Navigation URL",
        badge: "object - Badge config (optional)",
        isNested: "boolean - Nested item indent",
        isCollapsed: "boolean - Collapsed sidebar mode",
        onClick: "function - Click handler",
      },
    },

    "viamentor-sidebar-section": {
      path: "@/viamentor/components/viamentor-sidebar-section",
      lines: 230,
      purpose: "Section navigation collapsible avec accordion behavior",
      features: [
        "Collapsible accordion smooth 200ms",
        "ChevronDown icon rotate animation",
        "Section label optional uppercase",
        "Nested items indent hierarchy",
        "Expanded/collapsed state management",
        "Keyboard navigation support",
      ],

      props: {
        id: "string - Section identifier",
        label: "string - Section label (optional)",
        items: "NavigationItem[] - Navigation items",
        isCollapsed: "boolean - Collapsed mode",
        defaultExpanded: "boolean - Initial state",
        badgeCounts: "Record<string, number> - Badge counts",
        onNavigate: "function - Navigation handler",
      },
    },

    "viamentor-mobile-sidebar": {
      path: "@/viamentor/components/viamentor-mobile-sidebar",
      lines: 235,
      purpose: "Sidebar mobile avec Drawer overlay et swipe gestures",
      features: [
        "Drawer overlay backdrop blur",
        "Swipe left to close gesture",
        "Touch-friendly tap targets 44x44px",
        "Responsive <768px only",
        "Auto-close on navigation",
        "Smooth slide animation",
      ],

      props: {
        open: "boolean - Drawer open state",
        onOpenChange: "function - State change handler",
        config: "NavigationConfig - Navigation config",
        locale: "NavigationLocale - i18n locale",
        badgeCounts: "Record<string, number> - Badge counts",
        onNavigate: "function - Navigation handler",
        user: "object - User info (optional)",
      },
    },

    "viamentor-sidebar-navigation-complete": {
      path: "@/viamentor/components/viamentor-sidebar-navigation-complete",
      lines: 245,
      purpose: "Navigation complète assemblant tous les modules",
      features: [
        "RBAC permissions filter",
        "i18n FR/DE/IT/EN",
        "Analytics tracking",
        "Keyboard shortcuts",
        "Mobile responsive",
        "Badge counts real-time",
      ],

      props: {
        role: "string - User role RBAC",
        locale: "NavigationLocale - i18n locale",
        isCollapsed: "boolean - Collapsed mode",
        onNavigate: "function - Navigation handler",
      },
    },
  },

  // ==========================================================================
  // DATA STRUCTURE
  // ==========================================================================

  data: {
    "viamentor-navigation-config": {
      path: "@/viamentor/data/viamentor-navigation-config",
      lines: 240,
      purpose: "Configuration navigation tous rôles RBAC",
      exports: [
        "SUPER_ADMIN_NAV - Navigation super admin",
        "PLATFORM_ADMIN_NAV - Navigation platform admin",
        "SCHOOL_ADMIN_NAV - Navigation school admin",
        "INSTRUCTOR_NAV - Navigation instructor",
        "STUDENT_NAV - Navigation student",
        "SECRETARY_NAV - Navigation secretary",
        "NAVIGATION_BY_ROLE - Mapping role → config",
      ],

      roles: {
        super_admin: {
          sections: 1,
          items: 7,
          description: "Administration système complète",
        },
        platform_admin: {
          sections: 1,
          items: 5,
          description: "Gestion plateforme multi-tenant",
        },
        school_admin: {
          sections: 7,
          items: 30,
          description: "Administration auto-école (tenant)",
        },
        instructor: {
          sections: 1,
          items: 7,
          description: "Moniteur pédagogie",
        },
        student: {
          sections: 1,
          items: 8,
          description: "Élève progression",
        },
        secretary: {
          sections: 1,
          items: 8,
          description: "Secrétariat opérationnel",
        },
      },
    },

    "viamentor-navigation-i18n": {
      path: "@/viamentor/data/viamentor-navigation-i18n",
      lines: 220,
      purpose: "Traductions i18n FR/DE/IT/EN navigation",
      exports: [
        "NAVIGATION_I18N - Traductions complètes",
        "NavigationLocale - Type locale",
        "NavigationTranslations - Type translations",
      ],

      locales: ["fr", "de", "it", "en"],
      keys: {
        navigation: "Labels navigation (sections, links)",
        sidebar: "UI sidebar (collapse, shortcuts, status)",
      },
    },

    "viamentor-use-navigation": {
      path: "@/viamentor/data/viamentor-use-navigation",
      lines: 220,
      purpose: "Hook React custom navigation state et analytics",
      exports: [
        "useNavigation - Hook principal",
        "MOCK_BADGE_COUNTS - Badge counts par rôle",
        "NavigationAnalytics - Type analytics",
      ],

      features: [
        "Navigation state management",
        "Analytics tracking clicks",
        "Keyboard shortcuts Cmd+K, Cmd+B",
        "Badge counts real-time",
        "RBAC permissions filter",
        "localStorage persistence",
      ],
    },
  },

  // ==========================================================================
  // FEATURES
  // ==========================================================================

  features: {
    rbac: {
      title: "RBAC Permissions",
      description: "Filtrage navigation par rôle utilisateur",
      roles: [
        "super_admin - Administration système",
        "platform_admin - Gestion plateforme",
        "school_admin - Administration auto-école",
        "instructor - Moniteur",
        "student - Élève",
        "secretary - Secrétariat",
      ],

      implementation: "NAVIGATION_BY_ROLE mapping + permissions filter",
    },

    i18n: {
      title: "Internationalization",
      description: "Support multilingue FR/DE/IT/EN",
      locales: [
        "fr - Français",
        "de - Deutsch",
        "it - Italiano",
        "en - English",
      ],

      implementation: "NAVIGATION_I18N + translateLabel helper",
    },

    analytics: {
      title: "Analytics Tracking",
      description: "Tracking clicks navigation pour usage patterns",
      events: [
        "linkId - Identifier lien",
        "href - URL navigation",
        "timestamp - Date/heure",
        "role - Rôle utilisateur",
      ],

      storage: "localStorage (last 100 events)",
      implementation: "useNavigation hook + trackClick callback",
    },

    keyboard: {
      title: "Keyboard Shortcuts",
      description: "Raccourcis clavier power users",
      shortcuts: [
        "Cmd/Ctrl + K - Open search (future)",
        "Cmd/Ctrl + B - Toggle sidebar",
        "Escape - Close mobile sidebar",
      ],

      implementation: "useNavigation hook + window.addEventListener",
    },

    badges: {
      title: "Badge Counts",
      description: "Compteurs dynamiques notifications",
      types: [
        "count - Nombre items (ex: 45)",
        "status - Statut texte (ex: OK)",
        "new - Nouveau badge (ex: NEW)",
      ],

      variants: ["default", "primary", "success", "warning", "danger"],
      implementation: "MOCK_BADGE_COUNTS + updateBadgeCount",
    },

    mobile: {
      title: "Mobile Responsive",
      description: "Drawer overlay <768px avec swipe gestures",
      features: [
        "Drawer overlay backdrop blur",
        "Swipe left to close",
        "Touch-friendly 44x44px",
        "Auto-close navigation",
      ],

      implementation: "MobileSidebar component + Sheet UI",
    },
  },

  // ==========================================================================
  // USAGE EXAMPLES
  // ==========================================================================

  usage: {
    basic: `
// Basic usage
import { SidebarNavigationComplete } from "@/viamentor/components/viamentor-sidebar-navigation-complete";

<SidebarNavigationComplete
  role="school_admin"
  locale="fr"
  isCollapsed={false}
  onNavigate={(href) => console.log(href)}
/>
    `,

    withHook: `
// With useNavigation hook
import { useNavigation } from "@/viamentor/data/viamentor-use-navigation";
import { SCHOOL_ADMIN_NAV } from "@/viamentor/data/viamentor-navigation-config";

const navigation = useNavigation({
  role: "school_admin",
  config: SCHOOL_ADMIN_NAV,
  onAnalytics: (event) => console.log(event),
});

// Use navigation state
navigation.toggleCollapse();
navigation.navigate("/students", "students");
navigation.updateBadgeCount("students", 50);
    `,

    mobile: `
// Mobile sidebar
import { MobileSidebar } from "@/viamentor/components/viamentor-mobile-sidebar";

<MobileSidebar
  open={isMobileOpen}
  onOpenChange={setIsMobileOpen}
  config={SCHOOL_ADMIN_NAV}
  locale="fr"
  badgeCounts={{ students: 45 }}
  user={currentUser}
/>
    `,
  },

  // ==========================================================================
  // FILE SIZES
  // ==========================================================================

  fileSizes: {
    components: {
      "viamentor-sidebar-link": "225 lines",
      "viamentor-sidebar-section": "230 lines",
      "viamentor-mobile-sidebar": "235 lines",
      "viamentor-sidebar-navigation-complete": "245 lines",
    },
    data: {
      "viamentor-navigation-config": "240 lines",
      "viamentor-navigation-i18n": "220 lines",
      "viamentor-use-navigation": "220 lines",
      "viamentor-navigation-architecture": "200 lines",
    },
    total: "1815 lines (avg 227 lines/file)",
  },
};

export default NAVIGATION_ARCHITECTURE;
