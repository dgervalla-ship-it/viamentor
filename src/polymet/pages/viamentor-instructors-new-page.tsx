/**
 * VIAMENTOR - Instructors New Page
 * Page dédiée création nouveau moniteur
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ViamentorCreateInstructorWizard } from "@/polymet/components/viamentor-create-instructor-wizard";
import { InstructorsLocale } from "@/polymet/data/viamentor-instructors-i18n";

interface InstructorsNewPageProps {
  locale?: InstructorsLocale;
}

export function InstructorsNewPage({ locale = "fr" }: InstructorsNewPageProps) {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const handleSuccess = (instructorId: string) => {
    // Rediriger vers la page de détail du moniteur créé
    setRedirectTo(`/instructors/${instructorId}`);
  };

  const handleClose = () => {
    // Retourner à la liste des moniteurs
    setRedirectTo("/instructors");
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
    <div className="min-h-screen bg-background">
      <ViamentorCreateInstructorWizard
        open={true}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
        locale={locale}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
