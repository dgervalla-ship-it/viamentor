/**
 * VIAMENTOR - Sidebar Component
 * Sidebar principale avec RBAC, i18n, collapse state
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/polymet/data/viamentor-user-store";
import { SidebarHeader } from "@/polymet/components/viamentor-sidebar-header";
import { SidebarNavigation } from "@/polymet/components/viamentor-sidebar-navigation";
import { SidebarFooter } from "@/polymet/components/viamentor-sidebar-footer";
import {
  NAVIGATION_BY_ROLE,
  MOCK_CURRENT_USER,
  MOCK_API_STATUS,
  SIDEBAR_I18N,
  MOCK_BADGE_COUNTS,
} from "@/polymet/data/viamentor-sidebar-navigation-data";
import {
  OPTIMIZED_SCHOOL_ADMIN_NAV,
  OPTIMIZED_BADGE_COUNTS,
} from "@/polymet/data/viamentor-sidebar-navigation-optimized";

export interface SidebarProps {
  className?: string;
  locale?: "fr" | "de" | "it" | "en";
  role?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: (href: string) => void;
}

export function Sidebar({
  className,
  locale = "fr",
  role: propRole,
  isCollapsed = false,
  onToggleCollapse,
  onNavigate,
}: SidebarProps) {
  const t = SIDEBAR_I18N[locale];
  const user = useUserStore((state) => state.user);

  // Utiliser le rôle de l'utilisateur connecté ou le rôle passé en prop
  const role = propRole || user?.role || MOCK_CURRENT_USER.role;

  // Utiliser la navigation optimisée pour school_admin
  const navigationConfig =
    role === "school_admin"
      ? OPTIMIZED_SCHOOL_ADMIN_NAV
      : NAVIGATION_BY_ROLE[role] || NAVIGATION_BY_ROLE.instructor;

  const badgeCounts =
    role === "school_admin"
      ? OPTIMIZED_BADGE_COUNTS.school_admin
      : MOCK_BADGE_COUNTS[role as keyof typeof MOCK_BADGE_COUNTS] || {};

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r border-border h-full overflow-hidden transition-all duration-200",
        className
      )}
    >
      <SidebarHeader
        user={MOCK_CURRENT_USER}
        locale={locale}
        isCollapsed={isCollapsed}
      />

      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNavigation
          config={navigationConfig}
          locale={locale}
          isCollapsed={isCollapsed}
          badgeCounts={badgeCounts}
          onNavigate={onNavigate}
        />
      </div>

      <SidebarFooter
        isCollapsed={isCollapsed}
        locale={locale}
        apiStatus={MOCK_API_STATUS}
        onToggleCollapse={onToggleCollapse}
      />
    </div>
  );
}
