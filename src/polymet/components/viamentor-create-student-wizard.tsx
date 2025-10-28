/**
 * VIAMENTOR Create Student Wizard
 * Main wizard component with stepper and navigation
 */

import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// Toast functionality (would use useToast in production)
const useToast = () => ({
  toast: (options: any) => console.log("Toast:", options),
});
import {
  UserIcon,
  GraduationCapIcon,
  FileTextIcon,
  CheckCircleIcon,
  XIcon,
  LoaderIcon,
} from "lucide-react";
import { IdentityStep } from "@/polymet/components/viamentor-student-wizard-step-1-identity";
import { TrainingStep } from "@/polymet/components/viamentor-student-wizard-step-2-training";
import { LegalRequirementsStep } from "@/polymet/components/viamentor-student-wizard-step-3-legal";
import { SummaryStep } from "@/polymet/components/viamentor-student-wizard-step-4-summary";
import {
  IdentityData,
  TrainingData,
  LegalRequirementsData,
  SummaryData,
  CreateStudentWizardData,
} from "@/polymet/data/viamentor-student-wizard-schemas";
import {
  useWizardTranslations,
  WizardLocale,
} from "@/polymet/data/viamentor-student-wizard-i18n";
import { Instructor } from "@/polymet/data/viamentor-students-data";

interface CreateStudentWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructors: Instructor[];
  locale?: WizardLocale;
  onSuccess?: (studentId: string) => void;
}

const STEPS = [
  { id: 0, icon: UserIcon, key: "step1" },
  { id: 1, icon: GraduationCapIcon, key: "step2" },
  { id: 2, icon: FileTextIcon, key: "step3" },
  { id: 3, icon: CheckCircleIcon, key: "step4" },
];

export function CreateStudentWizard({
  open,
  onOpenChange,
  instructors,
  locale = "fr",
  onSuccess,
}: CreateStudentWizardProps) {
  const t = useWizardTranslations(locale);
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Form data
  const [identityData, setIdentityData] = useState<Partial<IdentityData>>({});
  const [trainingData, setTrainingData] = useState<Partial<TrainingData>>({});
  const [legalData, setLegalData] = useState<Partial<LegalRequirementsData>>(
    {}
  );
  const [summaryData, setSummaryData] = useState<Partial<SummaryData>>({});

  // Validation states
  const [identityValid, setIdentityValid] = useState(false);
  const [trainingValid, setTrainingValid] = useState(false);
  const [legalValid, setLegalValid] = useState(false);
  const [summaryValid, setSummaryValid] = useState(false);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return identityValid;
      case 1:
        return trainingValid;
      case 2:
        return legalValid;
      case 3:
        return summaryValid;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      setShowCloseConfirm(true);
    } else {
      onOpenChange(false);
      resetWizard();
    }
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    onOpenChange(false);
    resetWizard();
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setIdentityData({});
    setTrainingData({});
    setLegalData({});
    setSummaryData({});
    setIsDirty(false);
  };

  const handleCreateStudent = async () => {
    if (!summaryValid) return;

    setIsCreating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const studentId = `student-${Date.now()}`;

      toast({
        title: t.successTitle,
        description: t.successMessage.replace(
          "{name}",
          `${identityData.firstName} ${identityData.lastName}`
        ),
      });

      onSuccess?.(studentId);
      onOpenChange(false);
      resetWizard();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'élève.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">{t.dialogTitle}</DialogTitle>
                <DialogDescription>{t.dialogDescription}</DialogDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="px-6">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Stepper */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === idx;
                const isCompleted = currentStep > idx;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex items-center justify-center h-10 w-10 rounded-full border-2 transition-colors ${
                          isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : isActive
                              ? "border-primary text-primary"
                              : "border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircleIcon className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {t[step.key as keyof typeof t]}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          isCompleted ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {currentStep === 0 && (
              <IdentityStep
                initialData={identityData}
                locale={locale}
                onDataChange={(data) => {
                  setIdentityData(data);
                  setIsDirty(true);
                }}
                onValidationChange={setIdentityValid}
              />
            )}

            {currentStep === 1 && (
              <TrainingStep
                initialData={trainingData}
                birthDate={identityData.birthDate}
                instructors={instructors}
                locale={locale}
                onDataChange={(data) => {
                  setTrainingData(data);
                  setIsDirty(true);
                }}
                onValidationChange={setTrainingValid}
              />
            )}

            {currentStep === 2 && (
              <LegalRequirementsStep
                initialData={legalData}
                selectedCategories={trainingData.categories?.map(
                  (c) => c.category
                )}
                locale={locale}
                onDataChange={(data) => {
                  setLegalData(data);
                  setIsDirty(true);
                }}
                onValidationChange={setLegalValid}
              />
            )}

            {currentStep === 3 && (
              <SummaryStep
                identityData={identityData}
                trainingData={trainingData}
                legalData={legalData}
                instructors={instructors}
                locale={locale}
                onDataChange={(data) => {
                  setSummaryData(data);
                  setIsDirty(true);
                }}
                onValidationChange={setSummaryValid}
                onEditStep={handleEditStep}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              {t.previous}
            </Button>

            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentStep + 1} / {STEPS.length}
              </Badge>
            </div>

            {currentStep < STEPS.length - 1 ? (
              <Button onClick={handleNext} disabled={!canGoNext()}>
                {t.next}
              </Button>
            ) : (
              <Button
                onClick={handleCreateStudent}
                disabled={!summaryValid || isCreating}
                className="min-w-[150px]"
              >
                {isCreating ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />

                    {t.creating}
                  </>
                ) : (
                  t.createStudent
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Close Confirmation Dialog */}
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.closeConfirm}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.closeConfirmMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClose}>Fermer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
