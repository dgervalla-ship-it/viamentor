/**
 * VIAMENTOR Create Tenant Wizard
 *
 * Wizard multi-steps fullscreen pour création tenant
 *
 * @module components/viamentor-create-tenant-wizard
 * @version 1.0.0
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import { Step1SchoolInfo } from "@/viamentor/components/viamentor-wizard-step-1-school-info";
import { Step2AdminUser } from "@/viamentor/components/viamentor-wizard-step-2-admin-user";
import { Step3PlanBilling } from "@/viamentor/components/viamentor-wizard-step-3-plan-billing";
import { Step4Configuration } from "@/viamentor/components/viamentor-wizard-step-4-configuration";
import { Step5Summary } from "@/viamentor/components/viamentor-wizard-step-5-summary";
import {
  SchoolInfoData,
  AdminUserData,
  PlanBillingData,
  ConfigurationData,
} from "@/viamentor/data/viamentor-tenant-wizard-schemas";
import {
  BuildingIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  CheckCircleIcon,
  XIcon,
  LoaderIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateTenantWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (tenantId: string) => void;
}

const STEPS = [
  { id: 0, title: "École", icon: BuildingIcon },
  { id: 1, title: "Admin", icon: UserIcon },
  { id: 2, title: "Plan", icon: CreditCardIcon },
  { id: 3, title: "Config", icon: SettingsIcon },
  { id: 4, title: "Résumé", icon: CheckCircleIcon },
];

export function CreateTenantWizard({
  open,
  onOpenChange,
  onSuccess,
}: CreateTenantWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [schoolInfo, setSchoolInfo] = useState<Partial<SchoolInfoData>>({});
  const [adminUser, setAdminUser] = useState<Partial<AdminUserData>>({});
  const [planBilling, setPlanBilling] = useState<Partial<PlanBillingData>>({});
  const [configuration, setConfiguration] = useState<
    Partial<ConfigurationData>
  >({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Validation states
  const [stepValidations, setStepValidations] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const isLastStep = currentStep === STEPS.length - 1;
  const canGoNext = stepValidations[currentStep];

  const handleStepValidation = (step: number, isValid: boolean) => {
    setStepValidations((prev) => {
      const newValidations = [...prev];
      newValidations[step] = isValid;
      return newValidations;
    });
  };

  const handleNext = () => {
    if (canGoNext && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow navigation only to completed steps or current step
    if (stepId <= currentStep || stepValidations[stepId - 1]) {
      setCurrentStep(stepId);
    }
  };

  const handleClose = () => {
    const hasData =
      Object.keys(schoolInfo).length > 0 ||
      Object.keys(adminUser).length > 0 ||
      Object.keys(planBilling).length > 0;

    if (hasData) {
      setShowExitDialog(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext) return;

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, send data to backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockTenantId = `tenant-${Date.now()}`;

      // Success
      onOpenChange(false);
      onSuccess?.(mockTenantId);

      // Reset form
      setCurrentStep(0);
      setSchoolInfo({});
      setAdminUser({});
      setPlanBilling({});
      setConfiguration({});
      setAcceptTerms(false);
    } catch (error) {
      console.error("Error creating tenant:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0">
          {/* Header with Progress */}
          <div className="sticky top-0 z-10 bg-background border-b border-border">
            <Progress value={progress} className="h-1 rounded-none" />

            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl">
                  Créer une auto-école
                </DialogTitle>
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
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = stepValidations[index];
                  const isClickable = index <= currentStep || isCompleted;

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <button
                        onClick={() => handleStepClick(index)}
                        disabled={!isClickable}
                        className={cn(
                          "flex flex-col items-center gap-2 transition-all",
                          isClickable && "cursor-pointer hover:opacity-80",
                          !isClickable && "cursor-not-allowed opacity-40"
                        )}
                      >
                        <div
                          className={cn(
                            "h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all",
                            isActive &&
                              "bg-primary border-primary text-primary-foreground",
                            isCompleted &&
                              !isActive &&
                              "bg-green-600 border-green-600 text-white",
                            !isActive &&
                              !isCompleted &&
                              "bg-muted border-border text-muted-foreground"
                          )}
                        >
                          {isCompleted && !isActive ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            isActive && "text-primary",
                            !isActive && "text-muted-foreground"
                          )}
                        >
                          {step.title}
                        </span>
                      </button>
                      {index < STEPS.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-0.5 mx-2 transition-all",
                            isCompleted ? "bg-green-600" : "bg-border"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentStep === 0 && (
              <Step1SchoolInfo
                initialData={schoolInfo}
                onDataChange={setSchoolInfo}
                onValidationChange={(isValid) =>
                  handleStepValidation(0, isValid)
                }
              />
            )}
            {currentStep === 1 && (
              <Step2AdminUser
                initialData={adminUser}
                schoolCanton={schoolInfo.canton}
                onDataChange={setAdminUser}
                onValidationChange={(isValid) =>
                  handleStepValidation(1, isValid)
                }
              />
            )}
            {currentStep === 2 && (
              <Step3PlanBilling
                initialData={planBilling}
                onDataChange={setPlanBilling}
                onValidationChange={(isValid) =>
                  handleStepValidation(2, isValid)
                }
              />
            )}
            {currentStep === 3 && (
              <Step4Configuration
                initialData={configuration}
                onDataChange={setConfiguration}
                onValidationChange={(isValid) =>
                  handleStepValidation(3, isValid)
                }
              />
            )}
            {currentStep === 4 && (
              <Step5Summary
                schoolInfo={schoolInfo}
                adminUser={adminUser}
                planBilling={planBilling}
                configuration={configuration}
                acceptTerms={acceptTerms}
                onAcceptTermsChange={setAcceptTerms}
                onValidationChange={(isValid) =>
                  handleStepValidation(4, isValid)
                }
                onEditStep={setCurrentStep}
              />
            )}
          </div>

          {/* Footer Navigation */}
          <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4">
            <div className="flex items-center justify-between max-w-full">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Précédent
              </Button>

              {!isLastStep ? (
                <Button onClick={handleNext} disabled={!canGoNext}>
                  Suivant
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canGoNext || isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    "Créer l'auto-école"
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Abandonner la création ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous avez des modifications non enregistrées. Êtes-vous sûr de
              vouloir quitter ? Toutes les données saisies seront perdues.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuer</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowExitDialog(false);
                onOpenChange(false);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Abandonner
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
