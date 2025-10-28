/**
 * VIAMENTOR - Secretary Calendar Page
 * Page Calendrier Global secrétaire avec vue complète planning
 *
 * @module pages/viamentor-secretary-calendar-page
 */

import { PlanningPage } from "@/viamentor/pages/viamentor-planning-page";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryCalendarPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page Calendrier Global Secrétaire
 * Réutilise le composant PlanningPage car la fonctionnalité est identique
 * Les secrétaires ont accès à la même vue calendrier globale que les admins
 */
export function SecretaryCalendarPage({
  locale = "fr",
}: SecretaryCalendarPageProps) {
  return <PlanningPage locale={locale} />;
}
