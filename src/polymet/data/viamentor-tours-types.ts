/**
 * VIAMENTOR Tours Types
 *
 * Types TypeScript pour système tours guidés utilisateurs
 * Architecture react-joyride avec support mobile et accessibility
 *
 * @module data/viamentor-tours-types
 * @version 1.0.0
 */

import type { SupportedLocale } from "@/polymet/data/viamentor-i18n-config";
import type { UserRole } from "@/polymet/data/viamentor-roles";

/**
 * Position du tooltip
 */
export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "auto"
  | "center";

/**
 * Interface pour un step de tour
 */
export interface TourStep {
  // Identification
  target: string; // Sélecteur CSS ou data-tour-id
  title: string;
  content: string;

  // Positionnement
  placement?: TooltipPlacement;
  disableBeacon?: boolean; // Pas de beacon pulsant
  spotlightClicks?: boolean; // Permettre clicks sur élément spotlight

  // Actions
  action?: () => void; // Action avant d'afficher le step
  beforeNext?: () => void | Promise<void>; // Validation avant next

  // Styling
  styles?: {
    tooltip?: React.CSSProperties;
    spotlight?: React.CSSProperties;
  };

  // Accessibility
  locale?: {
    skip?: string;
    next?: string;
    back?: string;
    close?: string;
    last?: string;
  };
}

/**
 * Configuration d'un tour complet
 */
export interface TourConfig {
  // Identification
  id: string;
  role: UserRole;

  // Steps
  steps: TourStep[];

  // Comportement
  continuous?: boolean; // Auto-advance
  showProgress?: boolean; // Afficher "3/8"
  showSkipButton?: boolean;
  disableOverlay?: boolean; // Pas de dim background
  disableScrolling?: boolean;

  // Callbacks
  onStart?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
  onStepChange?: (step: number) => void;

  // Persistence
  storageKey?: string; // localStorage key pour "ne plus afficher"
}

/**
 * État du tour
 */
export interface TourState {
  run: boolean; // Tour actif
  stepIndex: number; // Step actuel (0-based)
  completed: boolean;
  skipped: boolean;
}

/**
 * Props du TourGuide principal
 */
export interface TourGuideProps {
  locale?: SupportedLocale;
  autoStart?: boolean; // Démarrer automatiquement si first login
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Props des tours spécifiques par rôle
 */
export interface RoleTourProps {
  locale?: SupportedLocale;
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Interface pour tooltip contextuel
 */
export interface ContextualTooltipProps {
  // Contenu
  title?: string;
  content: string;
  example?: string; // "Ex: Cliquez date calendrier..."
  learnMoreUrl?: string;

  // Positionnement
  trigger: React.ReactNode; // Icon "?" ou autre
  placement?: TooltipPlacement;

  // Options
  showDontShowAgain?: boolean;
  storageKey?: string; // Pour persister "ne plus afficher"

  // Styling
  className?: string;
  maxWidth?: number;

  // Callbacks
  onDismiss?: () => void;
}

/**
 * Configuration localStorage pour tours
 */
export interface TourStorageConfig {
  [tourId: string]: {
    completed: boolean;
    skipped: boolean;
    dontShowAgain: boolean;
    lastShown?: string; // ISO date
    completedAt?: string; // ISO date
  };
}

/**
 * Analytics tracking pour tours
 */
export interface TourAnalytics {
  tourId: string;
  role: UserRole;
  startedAt: string;
  completedAt?: string;
  skippedAt?: string;
  dropoffStep?: number; // Step où l'utilisateur a quitté
  totalSteps: number;
  completionRate: number; // 0-100
}

/**
 * Helper pour vérifier si un tour doit être affiché
 */
export function shouldShowTour(
  tourId: string,
  isFirstLogin: boolean = false
): boolean {
  try {
    const storage = localStorage.getItem("viamentor-tours");
    if (!storage) return isFirstLogin;

    const config: TourStorageConfig = JSON.parse(storage);
    const tourConfig = config[tourId];

    if (!tourConfig) return isFirstLogin;
    if (tourConfig.dontShowAgain) return false;
    if (tourConfig.completed) return false;

    return isFirstLogin;
  } catch {
    return isFirstLogin;
  }
}

/**
 * Helper pour marquer un tour comme complété
 */
export function markTourCompleted(tourId: string): void {
  try {
    const storage = localStorage.getItem("viamentor-tours");
    const config: TourStorageConfig = storage ? JSON.parse(storage) : {};

    config[tourId] = {
      ...config[tourId],
      completed: true,
      completedAt: new Date().toISOString(),
      dontShowAgain: false,
      skipped: false,
    };

    localStorage.setItem("viamentor-tours", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to mark tour as completed:", error);
  }
}

/**
 * Helper pour marquer un tour comme skipped
 */
export function markTourSkipped(tourId: string): void {
  try {
    const storage = localStorage.getItem("viamentor-tours");
    const config: TourStorageConfig = storage ? JSON.parse(storage) : {};

    config[tourId] = {
      ...config[tourId],
      skipped: true,
      completedAt: new Date().toISOString(),
      dontShowAgain: false,
      completed: false,
    };

    localStorage.setItem("viamentor-tours", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to mark tour as skipped:", error);
  }
}

/**
 * Helper pour marquer "ne plus afficher"
 */
export function markTourDontShowAgain(tourId: string): void {
  try {
    const storage = localStorage.getItem("viamentor-tours");
    const config: TourStorageConfig = storage ? JSON.parse(storage) : {};

    config[tourId] = {
      ...config[tourId],
      dontShowAgain: true,
      lastShown: new Date().toISOString(),
    };

    localStorage.setItem("viamentor-tours", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to mark tour as don't show again:", error);
  }
}

/**
 * Helper pour reset un tour
 */
export function resetTour(tourId: string): void {
  try {
    const storage = localStorage.getItem("viamentor-tours");
    if (!storage) return;

    const config: TourStorageConfig = JSON.parse(storage);
    delete config[tourId];

    localStorage.setItem("viamentor-tours", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to reset tour:", error);
  }
}

/**
 * Helper pour récupérer les analytics d'un tour
 */
export function getTourAnalytics(tourId: string): TourAnalytics | null {
  try {
    const storage = localStorage.getItem("viamentor-tours-analytics");
    if (!storage) return null;

    const analytics: Record<string, TourAnalytics> = JSON.parse(storage);
    return analytics[tourId] || null;
  } catch {
    return null;
  }
}

/**
 * Helper pour sauvegarder les analytics d'un tour
 */
export function saveTourAnalytics(analytics: TourAnalytics): void {
  try {
    const storage = localStorage.getItem("viamentor-tours-analytics");
    const allAnalytics: Record<string, TourAnalytics> = storage
      ? JSON.parse(storage)
      : {};

    allAnalytics[analytics.tourId] = analytics;

    localStorage.setItem(
      "viamentor-tours-analytics",
      JSON.stringify(allAnalytics)
    );
  } catch (error) {
    console.error("Failed to save tour analytics:", error);
  }
}

export type {
  TourStep,
  TourConfig,
  TourState,
  TourGuideProps,
  RoleTourProps,
  ContextualTooltipProps,
  TourStorageConfig,
  TourAnalytics,
  TooltipPlacement,
};
