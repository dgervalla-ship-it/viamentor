/**
 * VIAMENTOR - UI Store Unified
 * Store Zustand centralisé pour état UI global
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export type ViewMode = "table" | "grid" | "kanban";

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // View Preferences
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Quick Actions
  quickActionsOpen: boolean;
  toggleQuickActions: () => void;
  setQuickActionsOpen: (open: boolean) => void;

  // Search
  globalSearchOpen: boolean;
  toggleGlobalSearch: () => void;
  setGlobalSearchOpen: (open: boolean) => void;

  // Recent Pages
  recentPages: string[];
  addRecentPage: (path: string) => void;
  clearRecentPages: () => void;
}

// ============================================================================
// STORE
// ============================================================================

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarCollapsed: false,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Notifications
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date(),
          read: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },

      markAsRead: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification || notification.read) return state;

          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        }),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),

      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          const wasUnread = notification && !notification.read;

          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        }),

      clearNotifications: () =>
        set({
          notifications: [],
          unreadCount: 0,
        }),

      // View Preferences
      viewMode: "table",
      setViewMode: (mode) => set({ viewMode: mode }),

      // Quick Actions
      quickActionsOpen: false,
      toggleQuickActions: () =>
        set((state) => ({ quickActionsOpen: !state.quickActionsOpen })),
      setQuickActionsOpen: (open) => set({ quickActionsOpen: open }),

      // Search
      globalSearchOpen: false,
      toggleGlobalSearch: () =>
        set((state) => ({ globalSearchOpen: !state.globalSearchOpen })),
      setGlobalSearchOpen: (open) => set({ globalSearchOpen: open }),

      // Recent Pages
      recentPages: [],

      addRecentPage: (path) =>
        set((state) => {
          const filtered = state.recentPages.filter((p) => p !== path);
          return {
            recentPages: [path, ...filtered].slice(0, 10), // Keep last 10
          };
        }),

      clearRecentPages: () => set({ recentPages: [] }),
    }),
    {
      name: "viamentor-ui-storage",
      // Ne pas persister les notifications et états temporaires
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        viewMode: state.viewMode,
        recentPages: state.recentPages,
      }),
    }
  )
);

// ============================================================================
// SELECTORS (pour optimiser re-renders)
// ============================================================================

export const selectSidebarCollapsed = (state: UIState) =>
  state.sidebarCollapsed;
export const selectNotifications = (state: UIState) => state.notifications;
export const selectUnreadCount = (state: UIState) => state.unreadCount;
export const selectViewMode = (state: UIState) => state.viewMode;
export const selectRecentPages = (state: UIState) => state.recentPages;
