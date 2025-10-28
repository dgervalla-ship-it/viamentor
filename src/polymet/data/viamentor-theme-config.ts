/**
 * VIAMENTOR Theme Configuration
 *
 * Configuration centralisée du thème UI avec variables CSS modulaires
 * Support Hero UI (prioritaire) avec fallback Shadcn/ui automatique
 *
 * @module data/viamentor-theme-config
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from "react";

/**
 * Types de thèmes disponibles
 */
export type ThemeMode = "light" | "dark" | "viamentor";

/**
 * Configuration des variables CSS du thème
 */
export interface CSSVariables {
  // Primary Colors
  primaryHue: number;
  primarySaturation: number;
  primaryLightness: number;

  // Spacing System (rem)
  spacingBase: number;
  spacingScale: number[];

  // Border Radius (px)
  radiusBase: number;
  radiusScale: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    full: number;
  };

  // Typography
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };

  // Shadows
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  // Transitions
  transitions: {
    fast: string;
    base: string;
    slow: string;
  };
}

/**
 * Configuration complète d'un thème
 */
export interface ThemeConfig {
  mode: ThemeMode;
  cssVariables: CSSVariables;
  heroUI: {
    radius: "none" | "sm" | "md" | "lg";
    fontSize: "sm" | "md" | "lg";
  };
  customColors?: Record<string, string>;
}

/**
 * Variables CSS par défaut
 */
export const DEFAULT_CSS_VARIABLES: CSSVariables = {
  // Primary Colors (HSL)
  primaryHue: 240,
  primarySaturation: 5.9,
  primaryLightness: 10,

  // Spacing System (rem) - 0.25rem = 4px
  spacingBase: 0.25,
  spacingScale: [
    0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64,
  ],

  // Border Radius
  radiusBase: 8,
  radiusScale: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    full: 9999,
  },

  // Typography
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    serif: '"Georgia", "Cambria", serif',
    mono: '"Fira Code", "Consolas", monospace',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },

  // Transitions
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

/**
 * Thèmes prédéfinis
 */
export const PRESET_THEMES: Record<ThemeMode, ThemeConfig> = {
  light: {
    mode: "light",
    cssVariables: DEFAULT_CSS_VARIABLES,
    heroUI: {
      radius: "md",
      fontSize: "md",
    },
  },

  dark: {
    mode: "dark",
    cssVariables: {
      ...DEFAULT_CSS_VARIABLES,
      primaryHue: 240,
      primarySaturation: 10,
      primaryLightness: 3.9,
    },
    heroUI: {
      radius: "md",
      fontSize: "md",
    },
  },

  viamentor: {
    mode: "light",
    cssVariables: {
      ...DEFAULT_CSS_VARIABLES,
      primaryHue: 210,
      primarySaturation: 100,
      primaryLightness: 50,
      radiusBase: 12,
      radiusScale: {
        sm: 6,
        md: 12,
        lg: 16,
        xl: 20,
        "2xl": 28,
        full: 9999,
      },
    },
    heroUI: {
      radius: "lg",
      fontSize: "md",
    },
    customColors: {
      "viamentor-blue": "#0066CC",
      "viamentor-green": "#00AA66",
      "viamentor-orange": "#FF8800",
    },
  },
};

/**
 * Génère les variables CSS pour injection dans le DOM
 */
export function generateCSSVariables(
  config: ThemeConfig
): Record<string, string> {
  const { cssVariables } = config;

  return {
    // Primary Colors
    "--primary-hue": cssVariables.primaryHue.toString(),
    "--primary-saturation": `${cssVariables.primarySaturation}%`,
    "--primary-lightness": `${cssVariables.primaryLightness}%`,
    "--primary": `${cssVariables.primaryHue} ${cssVariables.primarySaturation}% ${cssVariables.primaryLightness}%`,

    // Spacing
    "--spacing-base": `${cssVariables.spacingBase}rem`,
    ...Object.fromEntries(
      cssVariables.spacingScale.map((scale) => [
        `--spacing-${scale}`,
        `${cssVariables.spacingBase * scale}rem`,
      ])
    ),

    // Border Radius
    "--radius-base": `${cssVariables.radiusBase}px`,
    "--radius-sm": `${cssVariables.radiusScale.sm}px`,
    "--radius-md": `${cssVariables.radiusScale.md}px`,
    "--radius-lg": `${cssVariables.radiusScale.lg}px`,
    "--radius-xl": `${cssVariables.radiusScale.xl}px`,
    "--radius-2xl": `${cssVariables.radiusScale["2xl"]}px`,
    "--radius-full": `${cssVariables.radiusScale.full}px`,

    // Typography
    "--font-sans": cssVariables.fontFamily.sans,
    "--font-serif": cssVariables.fontFamily.serif,
    "--font-mono": cssVariables.fontFamily.mono,

    // Font Sizes
    "--font-size-xs": cssVariables.fontSize.xs,
    "--font-size-sm": cssVariables.fontSize.sm,
    "--font-size-base": cssVariables.fontSize.base,
    "--font-size-lg": cssVariables.fontSize.lg,
    "--font-size-xl": cssVariables.fontSize.xl,
    "--font-size-2xl": cssVariables.fontSize["2xl"],
    "--font-size-3xl": cssVariables.fontSize["3xl"],
    "--font-size-4xl": cssVariables.fontSize["4xl"],

    // Shadows
    "--shadow-sm": cssVariables.shadows.sm,
    "--shadow-md": cssVariables.shadows.md,
    "--shadow-lg": cssVariables.shadows.lg,
    "--shadow-xl": cssVariables.shadows.xl,

    // Transitions
    "--transition-fast": cssVariables.transitions.fast,
    "--transition-base": cssVariables.transitions.base,
    "--transition-slow": cssVariables.transitions.slow,

    // Custom Colors
    ...(config.customColors
      ? Object.fromEntries(
          Object.entries(config.customColors).map(([key, value]) => [
            `--color-${key}`,
            value,
          ])
        )
      : {}),
  };
}

/**
 * Hook personnalisé pour gestion du thème
 */
export function useThemeCustomization(initialTheme: ThemeMode = "light") {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(initialTheme);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(
    PRESET_THEMES[initialTheme]
  );

  /**
   * Applique les variables CSS au document
   */
  const applyTheme = useCallback((config: ThemeConfig) => {
    const root = document.documentElement;
    const cssVars = generateCSSVariables(config);

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Applique la classe de mode
    root.classList.remove("light", "dark", "viamentor");
    root.classList.add(config.mode);
  }, []);

  /**
   * Change le thème actif
   */
  const changeTheme = useCallback(
    (theme: ThemeMode) => {
      const newConfig = PRESET_THEMES[theme];
      setCurrentTheme(theme);
      setThemeConfig(newConfig);
      applyTheme(newConfig);

      // Sauvegarde dans localStorage
      localStorage.setItem("viamentor-theme", theme);
    },
    [applyTheme]
  );

  /**
   * Personnalise une variable CSS spécifique
   */
  const customizeVariable = useCallback(
    (
      category: keyof CSSVariables,
      value: Partial<CSSVariables[keyof CSSVariables]>
    ) => {
      setThemeConfig((prev) => {
        const newConfig = {
          ...prev,
          cssVariables: {
            ...prev.cssVariables,
            [category]:
              typeof value === "object"
                ? { ...prev.cssVariables[category], ...value }
                : value,
          },
        };
        applyTheme(newConfig);
        return newConfig;
      });
    },
    [applyTheme]
  );

  /**
   * Réinitialise au thème par défaut
   */
  const resetTheme = useCallback(() => {
    changeTheme("light");
  }, [changeTheme]);

  // Applique le thème au montage
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "viamentor-theme"
    ) as ThemeMode | null;
    if (savedTheme && PRESET_THEMES[savedTheme]) {
      changeTheme(savedTheme);
    } else {
      applyTheme(themeConfig);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentTheme,
    themeConfig,
    changeTheme,
    customizeVariable,
    resetTheme,
    availableThemes: Object.keys(PRESET_THEMES) as ThemeMode[],
  };
}

/**
 * Utilitaires pour Hero UI
 */
export const HeroUIConfig = {
  /**
   * Vérifie si un composant Hero UI est disponible
   */
  isComponentAvailable: (componentName: string): boolean => {
    // Simulation - dans un vrai projet, vérifier l'import dynamique
    const availableComponents = [
      "Button",
      "Input",
      "Card",
      "Modal",
      "Dropdown",
    ];

    return availableComponents.includes(componentName);
  },

  /**
   * Retourne le fallback Shadcn si Hero UI n'est pas disponible
   */
  getFallback: (componentName: string): string => {
    return `@/components/ui/${componentName.toLowerCase()}`;
  },
};

export type { ThemeConfig, ThemeMode, CSSVariables };
