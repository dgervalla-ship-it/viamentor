/**
 * VIAMENTOR Theme Provider
 *
 * Context provider pour gestion globale du thème
 * Utilise React Context pour partager le thème dans toute l'application
 *
 * @module components/viamentor-theme-provider
 * @version 1.0.0
 */

import React, { createContext, useContext, ReactNode } from "react";
import {
  useThemeCustomization,
  ThemeMode,
  ThemeConfig,
  CSSVariables,
} from "@/viamentor/data/viamentor-theme-config";

/**
 * Interface du contexte thème
 */
interface ThemeContextValue {
  currentTheme: ThemeMode;
  themeConfig: ThemeConfig;
  changeTheme: (theme: ThemeMode) => void;
  customizeVariable: (
    category: keyof CSSVariables,
    value: Partial<CSSVariables[keyof CSSVariables]>
  ) => void;
  resetTheme: () => void;
  availableThemes: ThemeMode[];
}

/**
 * Contexte React pour le thème
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Props du ThemeProvider
 */
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

/**
 * Provider pour le thème VIAMENTOR
 *
 * @example
 * ```tsx
 * <ThemeProvider initialTheme="viamentor">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  initialTheme = "light",
}: ThemeProviderProps) {
  const themeHook = useThemeCustomization(initialTheme);

  return (
    <ThemeContext.Provider value={themeHook}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook pour utiliser le contexte thème
 *
 * @throws {Error} Si utilisé en dehors d'un ThemeProvider
 *
 * @example
 * ```tsx
 * const { currentTheme, changeTheme } = useTheme()
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

/**
 * HOC pour injecter le thème dans un composant
 *
 * @example
 * ```tsx
 * const MyComponent = withTheme(({ theme }) => {
 *   return <div>Current theme: {theme.currentTheme}</div>
 * })
 * ```
 */
export function withTheme<P extends { theme?: ThemeContextValue }>(
  Component: React.ComponentType<P>
) {
  return function ThemedComponent(props: Omit<P, "theme">) {
    const theme = useTheme();
    return <Component {...(props as P)} theme={theme} />;
  };
}

export type { ThemeContextValue, ThemeProviderProps };
