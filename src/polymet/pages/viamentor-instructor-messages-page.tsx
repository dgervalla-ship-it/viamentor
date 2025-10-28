/**
 * VIAMENTOR - Instructor Messages Page
 * Page Messagerie moniteur avec conversations élèves et administration
 *
 * @module pages/viamentor-instructor-messages-page
 */

import { StudentMessagesPage } from "@/polymet/pages/viamentor-student-messages-page";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorMessagesPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page Messagerie Moniteur
 * Réutilise le composant StudentMessagesPage car la structure est identique
 * Seules les conversations diffèrent (élèves au lieu de moniteurs)
 */
export function InstructorMessagesPage({
  locale = "fr",
}: InstructorMessagesPageProps) {
  return <StudentMessagesPage locale={locale} />;
}
