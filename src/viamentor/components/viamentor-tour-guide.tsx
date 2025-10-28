/**
 * VIAMENTOR Tour Guide
 *
 * Composant principal qui orchestre tous les tours guidés
 * Auto-start sur first login selon le rôle utilisateur
 *
 * @module components/viamentor-tour-guide
 * @version 1.0.0
 */

"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/viamentor/data/viamentor-user-store";
import { UserRole } from "@/viamentor/data/viamentor-roles";
import type { SupportedLocale } from "@/viamentor/data/viamentor-i18n-config";
import { shouldShowTour } from "@/viamentor/data/viamentor-tours-types";

// Import des tours spécifiques
import { SchoolAdminTour } from "@/viamentor/components/viamentor-tour-school-admin";
import { InstructorTour } from "@/viamentor/components/viamentor-tour-instructor";
import { StudentTour } from "@/viamentor/components/viamentor-tour-student";
import { SecretaryTour } from "@/viamentor/components/viamentor-tour-secretary";

/**
 * Props du TourGuide
 */
export interface TourGuideProps {
  locale?: SupportedLocale;
  autoStart?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Mapping rôle -> tour ID
 */
const ROLE_TOUR_MAP: Record<string, string> = {
  [UserRole.SCHOOL_ADMIN]: "school-admin-tour",
  [UserRole.INSTRUCTOR]: "instructor-tour",
  [UserRole.STUDENT]: "student-tour",
  [UserRole.SECRETARY]: "secretary-tour",
};

/**
 * TourGuide principal
 *
 * Détecte automatiquement le rôle de l'utilisateur et affiche le tour approprié
 * sur first login ou si explicitement demandé
 *
 * @example
 * ```tsx
 * // Dans le layout principal
 * <TourGuide autoStart locale="fr" />
 * ```
 */
export function TourGuide({
  locale = "fr",
  autoStart = true,
  onComplete,
  onSkip,
}: TourGuideProps) {
  const { user, isAuthenticated } = useUserStore();
  const [activeTour, setActiveTour] = useState<string | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  // Détecter first login
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    try {
      const storage = localStorage.getItem("viamentor-user-visits");
      const visits: Record<string, number> = storage ? JSON.parse(storage) : {};

      const userVisits = visits[user.id] || 0;

      if (userVisits === 0) {
        setIsFirstLogin(true);
        visits[user.id] = 1;
      } else {
        visits[user.id] = userVisits + 1;
      }

      localStorage.setItem("viamentor-user-visits", JSON.stringify(visits));
    } catch (error) {
      console.error("Failed to track user visits:", error);
    }
  }, [isAuthenticated, user]);

  // Démarrer le tour approprié
  useEffect(() => {
    if (!autoStart || !isAuthenticated || !user || !isFirstLogin) return;

    const tourId = ROLE_TOUR_MAP[user.role];
    if (!tourId) return;

    const shouldShow = shouldShowTour(tourId, isFirstLogin);
    if (shouldShow) {
      // Petit délai pour laisser le DOM se charger
      setTimeout(() => {
        setActiveTour(tourId);
      }, 1500);
    }
  }, [autoStart, isAuthenticated, user, isFirstLogin]);

  // Handler completion
  const handleComplete = () => {
    setActiveTour(null);
    onComplete?.();
  };

  // Handler skip
  const handleSkip = () => {
    setActiveTour(null);
    onSkip?.();
  };

  // Ne rien afficher si pas de tour actif
  if (!activeTour || !user) return null;

  // Rendre le tour approprié selon le rôle
  switch (user.role) {
    case UserRole.SCHOOL_ADMIN:
      return (
        <SchoolAdminTour
          locale={locale}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      );

    case UserRole.INSTRUCTOR:
      return (
        <InstructorTour
          locale={locale}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      );

    case UserRole.STUDENT:
      return (
        <StudentTour
          locale={locale}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      );

    case UserRole.SECRETARY:
      return (
        <SecretaryTour
          locale={locale}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      );

    default:
      return null;
  }
}

/**
 * Hook pour démarrer manuellement un tour
 */
export function useStartTour() {
  const { user } = useUserStore();
  const [activeTour, setActiveTour] = useState<string | null>(null);

  const startTour = (role?: UserRole) => {
    const targetRole = role || user?.role;
    if (!targetRole) return;

    const tourId = ROLE_TOUR_MAP[targetRole];
    if (tourId) {
      setActiveTour(tourId);
    }
  };

  const stopTour = () => {
    setActiveTour(null);
  };

  return {
    activeTour,
    startTour,
    stopTour,
  };
}

/**
 * Helper pour reset tous les tours
 */
export function resetAllTours(): void {
  try {
    localStorage.removeItem("viamentor-tours");
    localStorage.removeItem("viamentor-tours-analytics");
    localStorage.removeItem("viamentor-user-visits");
  } catch (error) {
    console.error("Failed to reset tours:", error);
  }
}

/**
 * Helper pour récupérer les stats de completion
 */
export function getTourCompletionStats(): {
  total: number;
  completed: number;
  skipped: number;
  completionRate: number;
} {
  try {
    const storage = localStorage.getItem("viamentor-tours");
    if (!storage) {
      return { total: 0, completed: 0, skipped: 0, completionRate: 0 };
    }

    const config = JSON.parse(storage);
    const tours = Object.values(config) as any[];

    const completed = tours.filter((t) => t.completed).length;
    const skipped = tours.filter((t) => t.skipped).length;
    const total = tours.length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, skipped, completionRate };
  } catch {
    return { total: 0, completed: 0, skipped: 0, completionRate: 0 };
  }
}

export default TourGuide;
