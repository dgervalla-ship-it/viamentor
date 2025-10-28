/**
 * VIAMENTOR - Page Leçons Secrétariat
 * Vue globale de toutes les leçons de l'école avec gestion complète
 */

import { InstructorLessonsPage } from "@/polymet/pages/viamentor-instructor-lessons-page";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryLessonsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page Leçons Secrétariat
 * Réutilise le composant InstructorLessonsPage car la structure est identique
 * La secrétaire a accès à toutes les leçons de tous les moniteurs
 */
export function SecretaryLessonsPage({
  locale = "fr",
}: SecretaryLessonsPageProps) {
  return <InstructorLessonsPage locale={locale} />;
}
