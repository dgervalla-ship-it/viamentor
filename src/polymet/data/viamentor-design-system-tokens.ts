/**
 * VIAMENTOR - Design System Tokens
 * Référence complète des tokens pour développement conforme
 */

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Primary - Actions principales, liens, boutons CTA
  primary: {
    DEFAULT: "#3B82F6", // blue-500
    hover: "#2563EB", // blue-600
    light: "#DBEAFE", // blue-50
    dark: "#1E40AF", // blue-700
  },

  // Secondary - Highlights, badges, status positifs
  secondary: {
    DEFAULT: "#8B5CF6", // purple-500
    hover: "#7C3AED", // purple-600
    light: "#F3E8FF", // purple-50
    dark: "#6D28D9", // purple-700
  },

  // Success - Validations, permis obtenu
  success: {
    DEFAULT: "#10B981", // green-500
    hover: "#059669", // green-600
    light: "#D1FAE5", // green-50
    dark: "#047857", // green-700
  },

  // Warning - Alertes, paiements en retard
  warning: {
    DEFAULT: "#F59E0B", // amber-500
    hover: "#D97706", // amber-600
    light: "#FEF3C7", // amber-50
    dark: "#B45309", // amber-700
  },

  // Danger - Erreurs, annulations, échecs examen
  danger: {
    DEFAULT: "#EF4444", // red-500
    hover: "#DC2626", // red-600
    light: "#FEE2E2", // red-50
    dark: "#B91C1C", // red-700
  },

  // Gray - Texte secondaire, borders
  gray: {
    DEFAULT: "#6B7280", // gray-500
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#030712",
  },

  // Background
  background: {
    light: "#F9FAFB", // gray-50
    dark: "#030712", // gray-950
  },

  // Surface
  surface: {
    light: "#FFFFFF",
    dark: "#111827", // gray-900
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  h1: {
    size: "text-4xl", // 36px
    weight: "font-bold",
    tracking: "tracking-tight",
    leading: "leading-tight",
  },
  h2: {
    size: "text-3xl", // 30px
    weight: "font-semibold",
    tracking: "tracking-normal",
    leading: "leading-tight",
  },
  h3: {
    size: "text-2xl", // 24px
    weight: "font-semibold",
    tracking: "tracking-normal",
    leading: "leading-snug",
  },
  h4: {
    size: "text-xl", // 20px
    weight: "font-medium",
    tracking: "tracking-normal",
    leading: "leading-normal",
  },
  body: {
    size: "text-base", // 16px
    weight: "font-normal",
    tracking: "tracking-normal",
    leading: "leading-relaxed",
  },
  small: {
    size: "text-sm", // 14px
    weight: "font-normal",
    tracking: "tracking-normal",
    leading: "leading-relaxed",
  },
  tiny: {
    size: "text-xs", // 12px
    weight: "font-medium",
    tracking: "tracking-normal",
    leading: "leading-normal",
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const SPACING = {
  // Base unit: 4px
  1: "4px", // 0.25rem
  2: "8px", // 0.5rem
  3: "12px", // 0.75rem
  4: "16px", // 1rem
  6: "24px", // 1.5rem
  8: "32px", // 2rem
  12: "48px", // 3rem
  16: "64px", // 4rem
  24: "96px", // 6rem

  // Semantic spacing
  card: "24px", // p-6
  form: "16px", // space-y-4
  list: "12px", // gap-3
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const RADIUS = {
  sm: "4px", // rounded-sm
  DEFAULT: "6px", // rounded
  md: "6px", // rounded-md
  lg: "8px", // rounded-lg
  xl: "12px", // rounded-xl
  "2xl": "16px", // rounded-2xl
  full: "9999px", // rounded-full
} as const;

// ============================================================================
// BUTTONS
// ============================================================================

export const BUTTONS = {
  primary: {
    base: "bg-blue-500 text-white hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    padding: "px-6 py-3",
    radius: "rounded-lg",
    minHeight: "min-h-[44px]",
  },
  secondary: {
    base: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    padding: "px-6 py-3",
    radius: "rounded-lg",
    minHeight: "min-h-[44px]",
  },
  ghost: {
    base: "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    padding: "px-4 py-2",
    radius: "rounded-lg",
    minHeight: "min-h-[44px]",
  },
  danger: {
    base: "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    padding: "px-6 py-3",
    radius: "rounded-lg",
    minHeight: "min-h-[44px]",
  },
} as const;

// ============================================================================
// CARDS
// ============================================================================

export const CARDS = {
  base: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm",
  padding: "p-6",
  spacing: "space-y-4",
} as const;

// ============================================================================
// FORMS
// ============================================================================

export const FORMS = {
  container: "max-w-2xl", // max-w-2xl (640px)
  spacing: "space-y-4", // 16px entre champs
  label: {
    position: "above", // Labels au-dessus des champs
    classes:
      "text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300 mb-2",
  },
  input: {
    base: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px]",
    error: "border-red-500 focus:ring-red-500",
  },
  error: {
    classes: "text-sm text-red-500 mt-1",
  },
} as const;

// ============================================================================
// TABLES
// ============================================================================

export const TABLES = {
  header: {
    sticky: "sticky top-0 z-10",
    background: "bg-gray-50 dark:bg-gray-900",
    border: "border-b border-gray-200 dark:border-gray-800",
  },
  row: {
    hover: "hover:bg-gray-50 dark:hover:bg-gray-900",
    border: "border-b border-gray-200 dark:border-gray-800",
  },
  cell: {
    padding: "px-4 py-3",
  },
  actions: {
    minWidth: "min-w-[44px]",
    minHeight: "min-h-[44px]",
  },
} as const;

// ============================================================================
// MODALS
// ============================================================================

export const MODALS = {
  backdrop: "backdrop-blur-sm",
  container: "max-w-2xl", // md
  padding: "p-8", // 32px
  radius: "rounded-xl",
  animation: {
    enter: "transition-all duration-300 ease-out",
    exit: "transition-all duration-250 ease-in",
  },
} as const;

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const ACCESSIBILITY = {
  focus: {
    ring: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    visible:
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
  },
  touchTarget: {
    minHeight: "min-h-[44px]",
    minWidth: "min-w-[44px]",
  },
  contrast: {
    text: "text-gray-900 dark:text-gray-100",
    textSecondary: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-800",
  },
} as const;

// ============================================================================
// MOBILE
// ============================================================================

export const MOBILE = {
  touchTarget: {
    min: "44px", // Minimum 44x44px
    recommended: "48px", // Recommandé 48x48px
  },
  bottomSheet: {
    preferred: true, // Préféré aux modals sur mobile
  },
  swipeGestures: {
    enabled: true,
    left: "delete", // Swipe left = delete (avec undo)
    right: "actions", // Swipe right = actions secondaires
  },
  thumbZones: {
    bottom: "bottom-0 to bottom-1/3", // Zone accessible au pouce
  },
} as const;

// ============================================================================
// ANIMATIONS
// ============================================================================

export const ANIMATIONS = {
  duration: {
    quick: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easing: {
    default: "ease-in-out",
    entrance: "ease-out",
    exit: "ease-in",
  },
  transitions: {
    opacity: "transition-opacity",
    transform: "transition-transform",
    colors: "transition-colors",
    all: "transition-all",
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Génère les classes Tailwind pour un bouton selon le type
 */
export function getButtonClasses(
  variant: "primary" | "secondary" | "ghost" | "danger" = "primary"
): string {
  const button = BUTTONS[variant];
  return `${button.base} ${button.padding} ${button.radius} ${button.minHeight}`;
}

/**
 * Génère les classes Tailwind pour une card
 */
export function getCardClasses(): string {
  return `${CARDS.base} ${CARDS.padding}`;
}

/**
 * Génère les classes Tailwind pour un input
 */
export function getInputClasses(hasError: boolean = false): string {
  return `${FORMS.input.base} ${hasError ? FORMS.input.error : ""}`;
}

/**
 * Génère les classes Tailwind pour un focus accessible
 */
export function getFocusClasses(): string {
  return ACCESSIBILITY.focus.ring;
}

/**
 * Génère les classes Tailwind pour un touch target mobile
 */
export function getTouchTargetClasses(): string {
  return `${ACCESSIBILITY.touchTarget.minHeight} ${ACCESSIBILITY.touchTarget.minWidth}`;
}

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BUTTONS,
  CARDS,
  FORMS,
  TABLES,
  MODALS,
  ACCESSIBILITY,
  MOBILE,
  ANIMATIONS,
  getButtonClasses,
  getCardClasses,
  getInputClasses,
  getFocusClasses,
  getTouchTargetClasses,
};
