/**
 * VIAMENTOR - Sidebar Navigation Complete
 * Composant navigation complet assemblant tous les modules
 *
 * Features:
 * - RBAC permissions filter
 * - i18n FR/DE/IT/EN
 * - Analytics tracking
 * - Keyboard shortcuts
 * - Mobile responsive
 * - Badge counts real-time
 * - Collapsible sections
 */

"use client";

import { SidebarSection } from "@/polymet/components/viamentor-sidebar-section";
import { NAVIGATION_BY_ROLE } from "@/polymet/data/viamentor-navigation-config";
import {
  NAVIGATION_I18N,
  type NavigationLocale,
} from "@/polymet/data/viamentor-navigation-i18n";
import {
  useNavigation,
  MOCK_BADGE_COUNTS,
} from "@/polymet/data/viamentor-use-navigation";

export interface SidebarNavigationCompleteProps {
  role?: string;
  locale?: NavigationLocale;
  isCollapsed?: boolean;
  onNavigate?: (href: string) => void;
  className?: string;
}

export function SidebarNavigationComplete({
  role = "school_admin",
  locale = "fr",
  isCollapsed = false,
  onNavigate,
  className,
}: SidebarNavigationCompleteProps) {
  const t = NAVIGATION_I18N[locale];

  // Get navigation config for role
  const config = NAVIGATION_BY_ROLE[role] || NAVIGATION_BY_ROLE.school_admin;

  // Use navigation hook
  const navigation = useNavigation({
    role,
    config,
    onAnalytics: (event) => {
      console.log("Navigation analytics:", event);
    },
    enableKeyboardShortcuts: true,
  });

  // Get badge counts for role
  const badgeCounts = MOCK_BADGE_COUNTS[role] || {};

  // Translate navigation items
  const translateLabel = (label: string): string => {
    const key = label.split(".").pop() as keyof typeof t.navigation;
    return (t.navigation[key] as string) || label;
  };

  const translateSectionLabel = (label?: string): string | undefined => {
    if (!label) return undefined;
    const key = label.split(".").pop() as keyof typeof t.navigation.sections;
    return t.navigation.sections[key] || label;
  };

  const translatedConfig = config.map((section) => ({
    ...section,
    label: translateSectionLabel(section.label),
    items: section.items.map((item) => ({
      ...item,
      label: translateLabel(item.label),
      children: item.children?.map((child) => ({
        ...child,
        label: translateLabel(child.label),
      })),
    })),
  }));

  return (
    <div className={className}>
      <div className="space-y-6">
        {translatedConfig.map((section) => (
          <SidebarSection
            key={section.id}
            id={section.id}
            label={section.label}
            items={section.items}
            isCollapsed={isCollapsed}
            badgeCounts={badgeCounts}
            onNavigate={(href) => {
              navigation.navigate(href);
              if (onNavigate) {
                onNavigate(href);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
