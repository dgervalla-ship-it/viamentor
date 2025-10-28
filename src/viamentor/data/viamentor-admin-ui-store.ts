/**
 * VIAMENTOR - Admin UI Store
 * Store Zustand pour gestion état UI global admin
 *
 * Responsabilités:
 * - Sidebar state (collapsed/expanded)
 * - Active sections/tabs
 * - Dashboard preferences
 * - Quick actions favorites
 * - Notifications preferences
 *
 * Note: Données admin gérées par TanStack Query
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type DashboardView = "overview" | "stats" | "activity" | "performance";
export type DashboardPeriod = "today" | "week" | "month" | "year";

export interface DashboardPreferences {
  view: DashboardView;
  period: DashboardPeriod;
  activeWidgets: string[];
  widgetsOrder: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  favorite: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  categories: string[];
}

interface AdminUIStore {
  // ============================================================================
  // STATE
  // ============================================================================

  // Sidebar
  sidebarCollapsed: boolean;

  // Active sections
  activeSection: string;
  activeTab: string;

  // Dashboard
  dashboardPreferences: DashboardPreferences;

  // Quick actions
  quickActions: QuickAction[];

  // Notifications
  notificationPreferences: NotificationPreferences;

  // ============================================================================
  // ACTIONS - SIDEBAR
  // ============================================================================

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // ============================================================================
  // ACTIONS - NAVIGATION
  // ============================================================================

  setActiveSection: (section: string) => void;
  setActiveTab: (tab: string) => void;

  // ============================================================================
  // ACTIONS - DASHBOARD
  // ============================================================================

  setDashboardView: (view: DashboardView) => void;
  setDashboardPeriod: (period: DashboardPeriod) => void;
  toggleWidget: (widgetId: string) => void;
  reorderWidgets: (widgets: string[]) => void;

  // ============================================================================
  // ACTIONS - QUICK ACTIONS
  // ============================================================================

  toggleQuickActionFavorite: (actionId: string) => void;
  reorderQuickActions: (actions: QuickAction[]) => void;

  // ============================================================================
  // ACTIONS - NOTIFICATIONS
  // ============================================================================

  setNotificationPreferences: (
    preferences: Partial<NotificationPreferences>
  ) => void;
  toggleNotificationCategory: (category: string) => void;

  // ============================================================================
  // ACTIONS - RESET
  // ============================================================================

  reset: () => void;
}

// ============================================================================
// DEFAULT STATE
// ============================================================================

const defaultDashboardPreferences: DashboardPreferences = {
  view: "overview",
  period: "week",
  activeWidgets: [
    "stats",
    "activity",
    "charts",
    "goals",
    "events",
    "performers",
  ],

  widgetsOrder: [
    "stats",
    "activity",
    "charts",
    "goals",
    "events",
    "performers",
  ],
};

const defaultQuickActions: QuickAction[] = [
  {
    id: "new-student",
    label: "Nouvel élève",
    icon: "UserPlusIcon",
    route: "/quick/new-student",
    favorite: true,
  },
  {
    id: "book-lesson",
    label: "Réserver leçon",
    icon: "CalendarPlusIcon",
    route: "/quick/book-lesson",
    favorite: true,
  },
  {
    id: "new-invoice",
    label: "Nouvelle facture",
    icon: "FileTextIcon",
    route: "/quick/new-invoice",
    favorite: false,
  },
];

const defaultNotificationPreferences: NotificationPreferences = {
  enabled: true,
  sound: true,
  desktop: true,
  categories: ["lessons", "students", "invoices", "system"],
};

// ============================================================================
// STORE
// ============================================================================

export const useAdminUIStore = create<AdminUIStore>()(
  persist(
    (set, get) => ({
      // ============================================================================
      // INITIAL STATE
      // ============================================================================

      sidebarCollapsed: false,
      activeSection: "dashboard",
      activeTab: "overview",
      dashboardPreferences: defaultDashboardPreferences,
      quickActions: defaultQuickActions,
      notificationPreferences: defaultNotificationPreferences,

      // ============================================================================
      // ACTIONS - SIDEBAR
      // ============================================================================

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // ============================================================================
      // ACTIONS - NAVIGATION
      // ============================================================================

      setActiveSection: (section) => set({ activeSection: section }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      // ============================================================================
      // ACTIONS - DASHBOARD
      // ============================================================================

      setDashboardView: (view) =>
        set((state) => ({
          dashboardPreferences: {
            ...state.dashboardPreferences,
            view,
          },
        })),

      setDashboardPeriod: (period) =>
        set((state) => ({
          dashboardPreferences: {
            ...state.dashboardPreferences,
            period,
          },
        })),

      toggleWidget: (widgetId) =>
        set((state) => {
          const { activeWidgets } = state.dashboardPreferences;
          const isActive = activeWidgets.includes(widgetId);

          return {
            dashboardPreferences: {
              ...state.dashboardPreferences,
              activeWidgets: isActive
                ? activeWidgets.filter((id) => id !== widgetId)
                : [...activeWidgets, widgetId],
            },
          };
        }),

      reorderWidgets: (widgets) =>
        set((state) => ({
          dashboardPreferences: {
            ...state.dashboardPreferences,
            widgetsOrder: widgets,
          },
        })),

      // ============================================================================
      // ACTIONS - QUICK ACTIONS
      // ============================================================================

      toggleQuickActionFavorite: (actionId) =>
        set((state) => ({
          quickActions: state.quickActions.map((action) =>
            action.id === actionId
              ? { ...action, favorite: !action.favorite }
              : action
          ),
        })),

      reorderQuickActions: (actions) => set({ quickActions: actions }),

      // ============================================================================
      // ACTIONS - NOTIFICATIONS
      // ============================================================================

      setNotificationPreferences: (preferences) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            ...preferences,
          },
        })),

      toggleNotificationCategory: (category) =>
        set((state) => {
          const { categories } = state.notificationPreferences;
          const isActive = categories.includes(category);

          return {
            notificationPreferences: {
              ...state.notificationPreferences,
              categories: isActive
                ? categories.filter((c) => c !== category)
                : [...categories, category],
            },
          };
        }),

      // ============================================================================
      // ACTIONS - RESET
      // ============================================================================

      reset: () =>
        set({
          sidebarCollapsed: false,
          activeSection: "dashboard",
          activeTab: "overview",
          dashboardPreferences: defaultDashboardPreferences,
          quickActions: defaultQuickActions,
          notificationPreferences: defaultNotificationPreferences,
        }),
    }),
    {
      name: "viamentor-admin-ui-store",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeSection: state.activeSection,
        activeTab: state.activeTab,
        dashboardPreferences: state.dashboardPreferences,
        quickActions: state.quickActions,
        notificationPreferences: state.notificationPreferences,
      }),
    }
  )
);

// ============================================================================
// SELECTORS (pour optimiser re-renders)
// ============================================================================

export const selectSidebarCollapsed = (state: AdminUIStore) =>
  state.sidebarCollapsed;
export const selectActiveSection = (state: AdminUIStore) => state.activeSection;
export const selectActiveTab = (state: AdminUIStore) => state.activeTab;
export const selectDashboardPreferences = (state: AdminUIStore) =>
  state.dashboardPreferences;
export const selectQuickActions = (state: AdminUIStore) => state.quickActions;
export const selectFavoriteQuickActions = (state: AdminUIStore) =>
  state.quickActions.filter((action) => action.favorite);
export const selectNotificationPreferences = (state: AdminUIStore) =>
  state.notificationPreferences;
