/**
 * VIAMENTOR Theme Store (Zustand)
 *
 * Store global pour gestion du thème avec persistence localStorage
 * Intégration Zustand pour state management avancé
 *
 * @module data/viamentor-theme-store
 * @version 1.0.0
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ThemeMode,
  ThemeConfig,
  PRESET_THEMES,
} from "@/viamentor/data/viamentor-theme-config";

/**
 * Interface du store thème
 */
interface ThemeStore {
  // State
  currentTheme: ThemeMode;
  themeConfig: ThemeConfig;
  isLoading: boolean;

  // Actions
  setTheme: (theme: ThemeMode) => void;
  updateConfig: (config: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  toggleTheme: () => void;
}

/**
 * Store Zustand pour le thème
 *
 * @example
 * ```tsx
 * const { currentTheme, setTheme } = useThemeStore()
 * setTheme('dark')
 * ```
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTheme: "light",
      themeConfig: PRESET_THEMES.light,
      isLoading: false,

      // Actions
      setTheme: (theme: ThemeMode) => {
        set({
          currentTheme: theme,
          themeConfig: PRESET_THEMES[theme],
        });
      },

      updateConfig: (config: Partial<ThemeConfig>) => {
        set((state) => ({
          themeConfig: {
            ...state.themeConfig,
            ...config,
          },
        }));
      },

      resetTheme: () => {
        const { currentTheme } = get();
        set({
          themeConfig: PRESET_THEMES[currentTheme],
        });
      },

      toggleTheme: () => {
        const { currentTheme } = get();
        const nextTheme: ThemeMode =
          currentTheme === "light"
            ? "dark"
            : currentTheme === "dark"
              ? "viamentor"
              : "light";
        get().setTheme(nextTheme);
      },
    }),
    {
      name: "viamentor-theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Sélecteurs optimisés
 */
export const selectCurrentTheme = (state: ThemeStore) => state.currentTheme;
export const selectThemeConfig = (state: ThemeStore) => state.themeConfig;
export const selectIsLoading = (state: ThemeStore) => state.isLoading;
