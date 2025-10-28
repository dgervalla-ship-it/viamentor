/**
 * VIAMENTOR - Instructor Help Page
 * Page Aide moniteur avec FAQ et guides pédagogiques
 *
 * @module pages/viamentor-instructor-help-page
 */

import { StudentHelpPage } from "@/viamentor/pages/viamentor-student-help-page";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorHelpPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page Aide Moniteur
 * Réutilise le composant StudentHelpPage car la structure est similaire
 * Le contenu FAQ/ressources sera adapté pour les moniteurs
 */
export function InstructorHelpPage({ locale = "fr" }: InstructorHelpPageProps) {
  return <StudentHelpPage locale={locale} />;
}
