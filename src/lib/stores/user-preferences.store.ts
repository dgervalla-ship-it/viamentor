/**
 * Viamentor - User Preferences Store (Zustand)
 * Personnalisation basique de l'expérience utilisateur
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'fr' | 'de' | 'it' | 'en';
export type DashboardLayout = 'grid' | 'list' | 'compact';

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  lessons: boolean; // Notifications leçons
  invoices: boolean; // Notifications factures
  marketing: boolean; // Newsletters
}

interface DisplayPreferences {
  sidebarCollapsed: boolean;
  dashboardLayout: DashboardLayout;
  compactMode: boolean;
  showWelcome: boolean;
}

interface UserPreferencesState {
  // Préférences
  language: Language;
  notifications: NotificationPreferences;
  display: DisplayPreferences;

  // Actions
  setLanguage: (language: Language) => void;
  setNotifications: (notifications: Partial<NotificationPreferences>) => void;
  setDisplay: (display: Partial<DisplayPreferences>) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setDashboardLayout: (layout: DashboardLayout) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  language: 'fr' as Language,
  notifications: {
    email: true,
    push: true,
    sms: false,
    lessons: true,
    invoices: true,
    marketing: false,
  },
  display: {
    sidebarCollapsed: false,
    dashboardLayout: 'grid' as DashboardLayout,
    compactMode: false,
    showWelcome: true,
  },
};

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      ...initialState,

      setLanguage: (language) => set({ language }),

      setNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),

      setDisplay: (display) =>
        set((state) => ({
          display: { ...state.display, ...display },
        })),

      setSidebarCollapsed: (collapsed) =>
        set((state) => ({
          display: { ...state.display, sidebarCollapsed: collapsed },
        })),

      setDashboardLayout: (layout) =>
        set((state) => ({
          display: { ...state.display, dashboardLayout: layout },
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'viamentor-user-preferences',
      version: 1,
    }
  )
);

/**
 * Hook pour obtenir seulement les notifications
 */
export function useNotificationPreferences() {
  return useUserPreferences((state) => state.notifications);
}

/**
 * Hook pour obtenir seulement les préférences d'affichage
 */
export function useDisplayPreferences() {
  return useUserPreferences((state) => state.display);
}

/**
 * Hook pour obtenir la langue
 */
export function useLanguagePreference() {
  return useUserPreferences((state) => state.language);
}

