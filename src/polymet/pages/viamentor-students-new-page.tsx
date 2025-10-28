/**
 * VIAMENTOR Students New Page
 * Page dédiée pour créer un nouvel élève via le wizard
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateStudentWizard } from "@/polymet/components/viamentor-create-student-wizard";
import { MOCK_INSTRUCTORS } from "@/polymet/data/viamentor-students-data";
import { StudentsLocale } from "@/polymet/data/viamentor-students-i18n";

interface StudentsNewPageProps {
  locale?: StudentsLocale;
}

export function StudentsNewPage({ locale = "fr" }: StudentsNewPageProps) {
  const [wizardOpen, setWizardOpen] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const handleWizardClose = (open: boolean) => {
    if (!open) {
      // Quand le wizard se ferme, retourner à la liste des élèves
      setRedirectTo("/students");
    }
    setWizardOpen(open);
  };

  const handleStudentCreated = (studentId: string) => {
    console.log("Student created with ID:", studentId);
    // Rediriger vers la page de détail du nouvel élève
    setRedirectTo(`/students/${studentId}`);
  };

  // If redirect is set, show a link to navigate
  if (redirectTo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="mb-4">Redirection...</p>
          <Link to={redirectTo} className="text-primary hover:underline">
            Cliquez ici si vous n'êtes pas redirigé automatiquement
          </Link>
        </div>
        {/* Auto-redirect using a hidden link */}
        <Link
          to={redirectTo}
          style={{ display: "none" }}
          ref={(el) => el?.click()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <CreateStudentWizard
        open={wizardOpen}
        onOpenChange={handleWizardClose}
        instructors={MOCK_INSTRUCTORS}
        locale={locale}
        onSuccess={handleStudentCreated}
      />
    </div>
  );
}
