/**
 * VIAMENTOR - useNavigation Hook
 * Hook custom pour gestion navigation state et analytics
 *
 * Features:
 * - Navigation state management
 * - Analytics tracking clicks
 * - Keyboard shortcuts Cmd+K
 * - Badge counts real-time
 * - RBAC permissions filter
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { NavigationConfig } from "@/viamentor/data/viamentor-navigation-config";

export interface NavigationAnalytics {
  linkId: string;
  href: string;
  timestamp: number;
  role: string;
}

export interface UseNavigationOptions {
  role: string;
  config: NavigationConfig;
  onAnalytics?: (event: NavigationAnalytics) => void;
  enableKeyboardShortcuts?: boolean;
}

export interface UseNavigationReturn {
  // State
  isCollapsed: boolean;
  isMobileOpen: boolean;
  badgeCounts: Record<string, number>;
  // Actions
  toggleCollapse: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  navigate: (href: string, linkId?: string) => void;
  updateBadgeCount: (linkId: string, count: number) => void;
  // Analytics
  trackClick: (linkId: string, href: string) => void;
}

export function useNavigation({
  role,
  config,
  onAnalytics,
  enableKeyboardShortcuts = true,
}: UseNavigationOptions): UseNavigationReturn {
  const navigateRouter = useNavigate();
  const location = useLocation();

  // State
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [badgeCounts, setBadgeCounts] = useState<Record<string, number>>({});

  // Toggle collapse
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
    // Save to localStorage
    localStorage.setItem("viamentor-sidebar-collapsed", String(!isCollapsed));
  }, [isCollapsed]);

  // Toggle mobile
  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  // Close mobile
  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  // Navigate with analytics
  const navigate = useCallback(
    (href: string, linkId?: string) => {
      navigateRouter(href);
      if (linkId) {
        trackClick(linkId, href);
      }
      // Auto-close mobile on navigation
      if (isMobileOpen) {
        closeMobile();
      }
    },
    [navigateRouter, isMobileOpen, closeMobile]
  );

  // Track click analytics
  const trackClick = useCallback(
    (linkId: string, href: string) => {
      const event: NavigationAnalytics = {
        linkId,
        href,
        timestamp: Date.now(),
        role,
      };

      // Call analytics callback
      if (onAnalytics) {
        onAnalytics(event);
      }

      // Store in localStorage for usage patterns
      const storageKey = "viamentor-navigation-analytics";
      const stored = localStorage.getItem(storageKey);
      const analytics: NavigationAnalytics[] = stored ? JSON.parse(stored) : [];
      analytics.push(event);
      // Keep only last 100 events
      if (analytics.length > 100) {
        analytics.shift();
      }
      localStorage.setItem(storageKey, JSON.stringify(analytics));
    },
    [role, onAnalytics]
  );

  // Update badge count
  const updateBadgeCount = useCallback((linkId: string, count: number) => {
    setBadgeCounts((prev) => ({
      ...prev,
      [linkId]: count,
    }));
  }, []);

  // Load collapsed state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("viamentor-sidebar-collapsed");
    if (stored) {
      setIsCollapsed(stored === "true");
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K - Toggle search (future feature)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        console.log("Search shortcut triggered");
        // TODO: Open search modal
      }

      // Cmd+B or Ctrl+B - Toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleCollapse();
      }

      // Escape - Close mobile sidebar
      if (e.key === "Escape" && isMobileOpen) {
        closeMobile();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardShortcuts, toggleCollapse, isMobileOpen, closeMobile]);

  // Auto-close mobile on route change
  useEffect(() => {
    if (isMobileOpen) {
      closeMobile();
    }
  }, [location.pathname]);

  return {
    // State
    isCollapsed,
    isMobileOpen,
    badgeCounts,
    // Actions
    toggleCollapse,
    toggleMobile,
    closeMobile,
    navigate,
    updateBadgeCount,
    // Analytics
    trackClick,
  };
}

// ============================================================================
// MOCK BADGE COUNTS BY ROLE
// ============================================================================

export const MOCK_BADGE_COUNTS: Record<string, Record<string, number>> = {
  super_admin: {
    tenants: 12,
    "audit-logs": 45,
  },
  platform_admin: {
    tenants: 8,
    support: 3,
  },
  school_admin: {
    students: 45,
    "group-lessons": 8,
    makeups: 5,
    prospects: 12,
  },
  instructor: {
    planning: 5,
    students: 12,
    makeups: 3,
  },
  student: {
    makeups: 2,
  },
  secretary: {
    tasks: 8,
    prospects: 12,
    messages: 5,
  },
};
