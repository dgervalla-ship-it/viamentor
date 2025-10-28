/**
 * VIAMENTOR - Instructor UI Store
 * Store Zustand pour gestion état UI global moniteur
 *
 * Responsabilités:
 * - Préférences dashboard
 * - Quick actions favorites
 * - Widgets actifs
 * - Notifications preferences
 * - View preferences globales
 *
 * Note: Données métier gérées par TanStack Query hooks
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type DashboardView = "today" | "week" | "month";
export type CalendarView = "day" | "week" | "month";

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  favorite: boolean;
}

export interface DashboardWidget {
  id: string;
  type: "lessons" | "students" | "performance" | "earnings" | "calendar";
  enabled: boolean;
  position: number;
}

export interface NotificationPreferences {
  lessonReminders: boolean;
  studentMessages: boolean;
  performanceAlerts: boolean;
  scheduleChanges: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface InstructorUIStore {
  // ============================================================================
  // STATE
  // ============================================================================

  // Dashboard
  dashboardView: DashboardView;
  activeWidgets: DashboardWidget[];

  // Calendar
  calendarView: CalendarView;
  showWeekends: boolean;
  showCancelled: boolean;

  // Quick Actions
  quickActions: QuickAction[];

  // Notifications
  notificationPreferences: NotificationPreferences;

  // Sidebar
  sidebarCollapsed: boolean;

  // ============================================================================
  // ACTIONS - DASHBOARD
  // ============================================================================

  setDashboardView: (view: DashboardView) => void;
  toggleWidget: (widgetId: string) => void;
  reorderWidgets: (widgets: DashboardWidget[]) => void;

  // ============================================================================
  // ACTIONS - CALENDAR
  // ============================================================================

  setCalendarView: (view: CalendarView) => void;
  toggleWeekends: () => void;
  toggleCancelled: () => void;

  // ============================================================================
  // ACTIONS - QUICK ACTIONS
  // ============================================================================

  toggleQuickActionFavorite: (actionId: string) => void;
  reorderQuickActions: (actions: QuickAction[]) => void;

  // ============================================================================
  // ACTIONS - NOTIFICATIONS
  // ============================================================================

  updateNotificationPreferences: (
    preferences: Partial<NotificationPreferences>
  ) => void;

  // ============================================================================
  // ACTIONS - SIDEBAR
  // ============================================================================

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // ============================================================================
  // ACTIONS - RESET
  // ============================================================================

  reset: () => void;
}

// ============================================================================
// DEFAULT STATE
// ============================================================================

const defaultQuickActions: QuickAction[] = [
  {
    id: "book-lesson",
    label: "Réserver leçon",
    icon: "CalendarPlus",
    href: "/lessons/book",
    favorite: true,
  },
  {
    id: "view-today",
    label: "Ma journée",
    icon: "Calendar",
    href: "/instructor/today",
    favorite: true,
  },
  {
    id: "my-students",
    label: "Mes élèves",
    icon: "Users",
    href: "/instructor/students",
    favorite: true,
  },
  {
    id: "performance",
    label: "Performance",
    icon: "TrendingUp",
    href: "/instructor/performance",
    favorite: false,
  },
];

const defaultWidgets: DashboardWidget[] = [
  { id: "lessons-today", type: "lessons", enabled: true, position: 0 },
  { id: "students-active", type: "students", enabled: true, position: 1 },
  { id: "performance-week", type: "performance", enabled: true, position: 2 },
  { id: "earnings-month", type: "earnings", enabled: true, position: 3 },
  { id: "calendar-week", type: "calendar", enabled: false, position: 4 },
];

const defaultNotificationPreferences: NotificationPreferences = {
  lessonReminders: true,
  studentMessages: true,
  performanceAlerts: true,
  scheduleChanges: true,
  emailNotifications: true,
  pushNotifications: false,
};

// ============================================================================
// STORE
// ============================================================================

export const useInstructorUIStore = create<InstructorUIStore>()(
  persist(
    (set, get) => ({
      // ============================================================================
      // INITIAL STATE
      // ============================================================================

      dashboardView: "today",
      activeWidgets: defaultWidgets,
      calendarView: "week",
      showWeekends: false,
      showCancelled: false,
      quickActions: defaultQuickActions,
      notificationPreferences: defaultNotificationPreferences,
      sidebarCollapsed: false,

      // ============================================================================
      // ACTIONS - DASHBOARD
      // ============================================================================

      setDashboardView: (view) => set({ dashboardView: view }),

      toggleWidget: (widgetId) =>
        set((state) => ({
          activeWidgets: state.activeWidgets.map((widget) =>
            widget.id === widgetId
              ? { ...widget, enabled: !widget.enabled }
              : widget
          ),
        })),

      reorderWidgets: (widgets) => set({ activeWidgets: widgets }),

      // ============================================================================
      // ACTIONS - CALENDAR
      // ============================================================================

      setCalendarView: (view) => set({ calendarView: view }),

      toggleWeekends: () =>
        set((state) => ({ showWeekends: !state.showWeekends })),

      toggleCancelled: () =>
        set((state) => ({ showCancelled: !state.showCancelled })),

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

      updateNotificationPreferences: (preferences) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            ...preferences,
          },
        })),

      // ============================================================================
      // ACTIONS - SIDEBAR
      // ============================================================================

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // ============================================================================
      // ACTIONS - RESET
      // ============================================================================

      reset: () =>
        set({
          dashboardView: "today",
          activeWidgets: defaultWidgets,
          calendarView: "week",
          showWeekends: false,
          showCancelled: false,
          quickActions: defaultQuickActions,
          notificationPreferences: defaultNotificationPreferences,
          sidebarCollapsed: false,
        }),
    }),
    {
      name: "viamentor-instructor-ui-store",
    }
  )
);

// ============================================================================
// SELECTORS (pour optimiser re-renders)
// ============================================================================

export const selectDashboardView = (state: InstructorUIStore) =>
  state.dashboardView;
export const selectActiveWidgets = (state: InstructorUIStore) =>
  state.activeWidgets.filter((w) => w.enabled);
export const selectCalendarView = (state: InstructorUIStore) =>
  state.calendarView;
export const selectShowWeekends = (state: InstructorUIStore) =>
  state.showWeekends;
export const selectShowCancelled = (state: InstructorUIStore) =>
  state.showCancelled;
export const selectFavoriteQuickActions = (state: InstructorUIStore) =>
  state.quickActions.filter((a) => a.favorite);
export const selectNotificationPreferences = (state: InstructorUIStore) =>
  state.notificationPreferences;
export const selectSidebarCollapsed = (state: InstructorUIStore) =>
  state.sidebarCollapsed;
