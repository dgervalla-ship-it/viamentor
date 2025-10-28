import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UserIcon,
  GraduationCapIcon,
  ShieldIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ViamentorInstructorWizardStep1PersonalInfo } from "@/viamentor/components/viamentor-instructor-wizard-step-1-personal-info";
import { ViamentorInstructorWizardStep2Qualifications } from "@/viamentor/components/viamentor-instructor-wizard-step-2-qualifications";
import { ViamentorInstructorWizardStep3LegalAuthorizations } from "@/viamentor/components/viamentor-instructor-wizard-step-3-legal-authorizations";
import {
  type PersonalInfoData,
  type QualificationsData,
  validatePersonalInfo,
  validateQualifications,
} from "@/viamentor/data/viamentor-instructors-wizard-schemas";
import {
  type LegalAuthorizationsData,
  validateLegalAuthorizations,
} from "@/viamentor/data/viamentor-instructors-wizard-legal-schemas";
import {
  useInstructorWizardTranslations,
  type InstructorWizardLocale,
} from "@/viamentor/data/viamentor-instructors-wizard-i18n";

interface CreateInstructorWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: InstructorWizardLocale;
  onSuccess?: (instructorId: string) => void;
}

interface WizardStep {
  id: number;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    key: "personal_info",
    icon: UserIcon,
    titleKey: "steps.personal_info",
  },
  {
    id: 2,
    key: "qualifications",
    icon: GraduationCapIcon,
    titleKey: "steps.qualifications",
  },
  {
    id: 3,
    key: "legal_authorizations",
    icon: ShieldIcon,
    titleKey: "steps.legal_authorizations",
  },
  {
    id: 4,
    key: "availability",
    icon: CalendarIcon,
    titleKey: "steps.availability",
  },
  { id: 5, key: "summary", icon: CheckCircleIcon, titleKey: "steps.summary" },
];

export function ViamentorCreateInstructorWizard({
  open,
  onOpenChange,
  locale = "fr",
  onSuccess,
}: CreateInstructorWizardProps) {
  const { t, interpolate } = useInstructorWizardTranslations(locale);

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfoData, setPersonalInfoData] = useState<
    Partial<PersonalInfoData>
  >({});
  const [qualificationsData, setQualificationsData] = useState<
    Partial<QualificationsData>
  >({});
  const [legalAuthorizationsData, setLegalAuthorizationsData] = useState<
    Partial<LegalAuthorizationsData>
  >({});
  const [stepValidations, setStepValidations] = useState<
    Record<number, boolean>
  >({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculer le progrès
  const progress = (currentStep / WIZARD_STEPS.length) * 100;
  const completedSteps = Object.values(stepValidations).filter(Boolean).length;

  // Marquer comme modifié quand des données changent
  useEffect(() => {
    const hasData =
      Object.keys(personalInfoData).length > 0 ||
      Object.keys(qualificationsData).length > 0 ||
      Object.keys(legalAuthorizationsData).length > 0;
    setIsDirty(hasData);
  }, [personalInfoData, qualificationsData, legalAuthorizationsData]);

  // Validation des étapes
  const updateStepValidation = (step: number, isValid: boolean) => {
    setStepValidations((prev) => ({ ...prev, [step]: isValid }));
  };

  // Navigation
  const canGoNext = stepValidations[currentStep] || currentStep > 3; // Steps 3-5 pas encore implémentés
  const canGoPrevious = currentStep > 1;
  const isLastStep = currentStep === WIZARD_STEPS.length;

  const handleNext = () => {
    if (canGoNext && currentStep < WIZARD_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Permettre de naviguer vers les étapes précédentes ou la suivante si validée
    if (stepId <= currentStep || stepValidations[stepId - 1]) {
      setCurrentStep(stepId);
    }
  };

  // Fermeture avec confirmation
  const handleClose = () => {
    if (isDirty) {
      setShowCloseConfirmation(true);
    } else {
      onOpenChange(false);
    }
  };

  const confirmClose = () => {
    setShowCloseConfirmation(false);
    onOpenChange(false);
    // Reset state
    setCurrentStep(1);
    setPersonalInfoData({});
    setQualificationsData({});
    setLegalAuthorizationsData({});
    setStepValidations({ 1: false, 2: false, 3: false, 4: false, 5: false });
    setIsDirty(false);
  };

  // Soumission finale
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validation finale
      const personalInfoValidation = validatePersonalInfo(personalInfoData);
      const qualificationsValidation =
        validateQualifications(qualificationsData);
      const legalAuthorizationsValidation = validateLegalAuthorizations(
        legalAuthorizationsData
      );

      if (
        !personalInfoValidation.success ||
        !qualificationsValidation.success ||
        !legalAuthorizationsValidation.success
      ) {
        throw new Error("Données invalides");
      }

      // Simulation API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockInstructorId = `instructor-${Date.now()}`;
      onSuccess?.(mockInstructorId);

      // Reset et fermer
      confirmClose();
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendu du contenu de l'étape
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ViamentorInstructorWizardStep1PersonalInfo
            initialData={personalInfoData}
            locale={locale}
            onDataChange={setPersonalInfoData}
            onValidationChange={(isValid) => updateStepValidation(1, isValid)}
          />
        );

      case 2:
        return (
          <ViamentorInstructorWizardStep2Qualifications
            initialData={qualificationsData}
            locale={locale}
            onDataChange={setQualificationsData}
            onValidationChange={(isValid) => updateStepValidation(2, isValid)}
          />
        );

      case 3:
        return (
          <ViamentorInstructorWizardStep3LegalAuthorizations
            initialData={legalAuthorizationsData}
            locale={locale}
            onDataChange={setLegalAuthorizationsData}
            onValidationChange={(isValid) => updateStepValidation(3, isValid)}
          />
        );

      case 4:
      case 5:
        return (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="text-6xl">🚧</div>
            <h3 className="text-xl font-semibold">Étape en construction</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Cette étape sera implémentée dans une prochaine version du wizard.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">{t.wizard.title}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t.wizard.subtitle}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Stepper */}
          <div className="px-6 py-4 border-b bg-background">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                {interpolate(t.wizard.step_of, {
                  current: currentStep.toString(),
                  total: WIZARD_STEPS.length.toString(),
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {interpolate(t.wizard.progress, {
                  percent: Math.round(progress).toString(),
                })}
              </div>
            </div>

            <Progress value={progress} className="mb-4" />

            <div className="flex items-center justify-between">
              {WIZARD_STEPS.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = stepValidations[step.id];
                const isAccessible =
                  step.id <= currentStep || stepValidations[step.id - 1];
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={cn(
                        "flex flex-col items-center space-y-2 p-2 rounded-lg transition-colors",
                        isActive && "bg-primary text-primary-foreground",
                        isCompleted &&
                          !isActive &&
                          "bg-green-100 text-green-700",
                        !isAccessible && "opacity-50 cursor-not-allowed",
                        isAccessible &&
                          !isActive &&
                          !isCompleted &&
                          "hover:bg-muted"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full border-2",
                          isActive &&
                            "border-primary-foreground bg-primary-foreground text-primary",
                          isCompleted &&
                            !isActive &&
                            "border-green-600 bg-green-600 text-white",
                          !isActive && !isCompleted && "border-muted-foreground"
                        )}
                      >
                        {isCompleted && !isActive ? (
                          <CheckCircleIcon className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-center max-w-20">
                        {t.steps[step.key as keyof typeof t.steps]}
                      </span>
                    </button>

                    {index < WIZARD_STEPS.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5 mx-2",
                          stepValidations[step.id] ? "bg-green-600" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {completedSteps}/{WIZARD_STEPS.length} étapes complétées
                </Badge>
                {isDirty && (
                  <Badge variant="secondary">
                    Modifications non sauvegardées
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
                >
                  {t.navigation.previous}
                </Button>

                {isLastStep ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !stepValidations[1] ||
                      !stepValidations[2] ||
                      !stepValidations[3] ||
                      isSubmitting
                    }
                    className="min-w-32"
                  >
                    {isSubmitting ? "Création..." : t.navigation.create}
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={!canGoNext}>
                    {t.navigation.next}
                  </Button>
                )}
              </div>
            </div>

            {!stepValidations[currentStep] && currentStep <= 3 && (
              <Alert className="mt-4">
                <AlertTriangleIcon className="h-4 w-4" />

                <AlertDescription>
                  {t.messages.validation_errors}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation de fermeture */}
      <Dialog
        open={showCloseConfirmation}
        onOpenChange={setShowCloseConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fermer le wizard</DialogTitle>
            <DialogDescription>{t.wizard.close_confirmation}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowCloseConfirmation(false)}
            >
              Continuer l'édition
            </Button>
            <Button variant="destructive" onClick={confirmClose}>
              Fermer sans sauvegarder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
