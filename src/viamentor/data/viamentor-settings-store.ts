/**
 * VIAMENTOR - Settings Store
 * Store Zustand pour gestion état UI paramètres système
 *
 * Responsabilités:
 * - Section active (school/pricing/notifications/users/integrations)
 * - État formulaires (dirty, saving)
 * - Navigation entre sections
 * - État modals/dialogs
 * - Préférences utilisateur
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type SettingsSection =
  | "school"
  | "pricing"
  | "notifications"
  | "users"
  | "integrations"
  | "categories"
  | "course-types"
  | "business-hours"
  | "makeups"
  | "reviews";

export interface SettingsUIState {
  // Section active
  activeSection: SettingsSection;

  // État formulaires
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;

  // Navigation
  navigationHistory: SettingsSection[];

  // État modals
  isUnsavedChangesModalOpen: boolean;
  pendingNavigation: SettingsSection | null;

  // Préférences
  autoSave: boolean;
  showAdvancedSettings: boolean;

  // Actions
  setActiveSection: (section: SettingsSection) => void;
  navigateWithCheck: (section: SettingsSection) => void;
  confirmNavigation: () => void;
  cancelNavigation: () => void;

  setDirty: (dirty: boolean) => void;
  setSaving: (saving: boolean) => void;
  markSaved: () => void;

  setAutoSave: (enabled: boolean) => void;
  setShowAdvancedSettings: (show: boolean) => void;

  goBack: () => void;
  clearHistory: () => void;
}

// ============================================================================
// STORE
// ============================================================================

export const useSettingsStore = create<SettingsUIState>()(
  persist(
    (set, get) => ({
      // État initial
      activeSection: "school",
      isDirty: false,
      isSaving: false,
      lastSaved: null,
      navigationHistory: [],
      isUnsavedChangesModalOpen: false,
      pendingNavigation: null,
      autoSave: true,
      showAdvancedSettings: false,

      // Actions Navigation
      setActiveSection: (section) =>
        set((state) => ({
          activeSection: section,
          navigationHistory: [...state.navigationHistory, section],
        })),

      navigateWithCheck: (section) => {
        const state = get();
        if (state.isDirty) {
          set({
            isUnsavedChangesModalOpen: true,
            pendingNavigation: section,
          });
        } else {
          state.setActiveSection(section);
        }
      },

      confirmNavigation: () => {
        const state = get();
        if (state.pendingNavigation) {
          set({
            activeSection: state.pendingNavigation,
            navigationHistory: [
              ...state.navigationHistory,
              state.pendingNavigation,
            ],

            isUnsavedChangesModalOpen: false,
            pendingNavigation: null,
            isDirty: false,
          });
        }
      },

      cancelNavigation: () =>
        set({
          isUnsavedChangesModalOpen: false,
          pendingNavigation: null,
        }),

      // Actions État Formulaires
      setDirty: (dirty) => set({ isDirty: dirty }),
      setSaving: (saving) => set({ isSaving: saving }),
      markSaved: () =>
        set({
          isDirty: false,
          isSaving: false,
          lastSaved: new Date(),
        }),

      // Actions Préférences
      setAutoSave: (enabled) => set({ autoSave: enabled }),
      setShowAdvancedSettings: (show) => set({ showAdvancedSettings: show }),

      // Actions Historique
      goBack: () => {
        const state = get();
        if (state.navigationHistory.length > 1) {
          const newHistory = [...state.navigationHistory];
          newHistory.pop(); // Remove current
          const previous = newHistory[newHistory.length - 1];
          set({
            activeSection: previous,
            navigationHistory: newHistory,
          });
        }
      },

      clearHistory: () => set({ navigationHistory: [] }),
    }),
    {
      name: "viamentor-settings-ui",
      partialize: (state) => ({
        activeSection: state.activeSection,
        autoSave: state.autoSave,
        showAdvancedSettings: state.showAdvancedSettings,
      }),
    }
  )
);
