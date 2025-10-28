/**
 * VIAMENTOR - Secretary Students Search Page
 * Page Recherche Élèves secrétaire avec accès rapide
 *
 * @module pages/viamentor-secretary-students-page
 */

import { StudentsPage } from "@/viamentor/pages/viamentor-students-page";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryStudentsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page Recherche Élèves Secrétaire
 * Réutilise le composant StudentsPage car la fonctionnalité est identique
 * Les secrétaires ont accès à la même interface de gestion des élèves
 */
export function SecretaryStudentsPage({
  locale = "fr",
}: SecretaryStudentsPageProps) {
  return <StudentsPage locale={locale} />;
}
