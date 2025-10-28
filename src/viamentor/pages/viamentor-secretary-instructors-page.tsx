/**
 * VIAMENTOR - Secretary Instructors Search Page
 * Page Recherche Moniteurs secrétaire avec accès rapide
 *
 * @module pages/viamentor-secretary-instructors-page
 */

import { ViamentorInstructorsPage } from "@/viamentor/pages/viamentor-instructors-page";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryInstructorsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page Recherche Moniteurs Secrétaire
 * Réutilise le composant InstructorsPage car la fonctionnalité est identique
 * Les secrétaires ont accès à la même interface de gestion des moniteurs
 */
export function SecretaryInstructorsPage({
  locale = "fr",
}: SecretaryInstructorsPageProps) {
  return <ViamentorInstructorsPage locale={locale} />;
}
