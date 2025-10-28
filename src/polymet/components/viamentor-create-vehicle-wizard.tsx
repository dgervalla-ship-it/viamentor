/**
 * VIAMENTOR - Create Vehicle Wizard
 *
 * Wizard multi-steps création véhicule avec:
 * - Dialog fullscreen Hero UI
 * - Stepper 4 steps avec progress bar
 * - Validation OAC Art. 65-68
 * - Navigation prev/next avec validation
 * - Unsaved changes warning
 * - i18n FR/DE/IT/EN
 *
 * @module components/viamentor-create-vehicle-wizard
 */

"use client";

import { useState, useCallback } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  CarIcon,
  ShieldIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getVehicleWizardI18n,
  type VehicleWizardLocale,
} from "@/polymet/data/viamentor-vehicles-wizard-i18n";
import type {
  VehicleInfoData,
  EquipmentOACData,
  InsurancesData,
  SummaryData,
} from "@/polymet/data/viamentor-vehicles-wizard-schemas";

// ============================================================================
// TYPES
// ============================================================================

export interface CreateVehicleWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (vehicleId: string) => void;
  locale?: VehicleWizardLocale;
}

type WizardStep = 1 | 2 | 3 | 4;

interface WizardData {
  vehicleInfo: Partial<VehicleInfoData>;
  equipment: Partial<EquipmentOACData>;
  insurances: Partial<InsurancesData>;
  summary: Partial<SummaryData>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CreateVehicleWizard({
  open,
  onOpenChange,
  onSuccess,
  locale = "fr",
}: CreateVehicleWizardProps) {
  const t = getVehicleWizardI18n(locale);

  // State
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    vehicleInfo: {},
    equipment: {},
    insurances: {},
    summary: {},
  });
  const [stepValidation, setStepValidation] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Steps configuration
  const steps = [
    { number: 1, icon: CarIcon, label: t.steps[0] },
    { number: 2, icon: ShieldIcon, label: t.steps[1] },
    { number: 3, icon: FileTextIcon, label: t.steps[2] },
    { number: 4, icon: CheckCircle2Icon, label: t.steps[3] },
  ];

  // Calculate progress
  const progress = (currentStep / 4) * 100;

  // Handle data change
  const handleDataChange = useCallback(
    (step: keyof WizardData, data: Partial<any>) => {
      setWizardData((prev) => ({
        ...prev,
        [step]: { ...prev[step], ...data },
      }));
      setIsDirty(true);
    },
    []
  );

  // Handle validation change
  const handleValidationChange = useCallback(
    (step: WizardStep, isValid: boolean) => {
      setStepValidation((prev) => ({ ...prev, [step]: isValid }));
    },
    []
  );

  // Handle next step
  const handleNext = () => {
    if (currentStep < 4 && stepValidation[currentStep]) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  // Handle close with unsaved check
  const handleClose = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      onOpenChange(false);
      resetWizard();
    }
  };

  // Handle create vehicle
  const handleCreate = async () => {
    if (!stepValidation[4]) return;

    setIsCreating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const vehicleId = `VEH-${Date.now()}`;
      const plate = wizardData.vehicleInfo.licensePlate || "UNKNOWN";

      // Success
      alert(t.step4.success.replace("{plate}", plate));
      onSuccess?.(vehicleId);
      onOpenChange(false);
      resetWizard();
    } catch (error) {
      alert(t.step4.error);
    } finally {
      setIsCreating(false);
    }
  };

  // Reset wizard
  const resetWizard = () => {
    setCurrentStep(1);
    setWizardData({
      vehicleInfo: {},
      equipment: {},
      insurances: {},
      summary: {},
    });
    setStepValidation({ 1: false, 2: false, 3: false, 4: false });
    setIsDirty(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                {t.title}
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mt-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                const isValid = stepValidation[step.number as WizardStep];

                return (
                  <div key={step.number} className="flex items-center flex-1">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                          isActive &&
                            "border-primary bg-primary text-primary-foreground",
                          isCompleted &&
                            "border-green-500 bg-green-500 text-white",
                          !isActive &&
                            !isCompleted &&
                            "border-muted bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={cn(
                          "text-xs mt-2 font-medium",
                          isActive && "text-foreground",
                          !isActive && "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </span>
                      {isValid && !isCompleted && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5 mx-2 transition-all",
                          isCompleted ? "bg-green-500" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <Progress value={progress} className="mt-4" />
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Step 1: Vehicle Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Step 1 content will be imported from
                  viamentor-vehicle-wizard-step-1-info
                </p>
              </div>
            )}

            {/* Step 2: Equipment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Step 2 content will be imported from
                  viamentor-vehicle-wizard-step-2-equipment
                </p>
              </div>
            )}

            {/* Step 3: Insurances */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Step 3 content will be imported from
                  viamentor-vehicle-wizard-step-3-insurances
                </p>
              </div>
            )}

            {/* Step 4: Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Step 4 content will be imported from
                  viamentor-vehicle-wizard-step-4-summary
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <Button variant="outline" onClick={handleClose}>
              {t.nav.cancel}
            </Button>

            <div className="flex items-center gap-2">
              {/* Previous Button */}
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrev}>
                  <ChevronLeftIcon className="h-4 w-4 mr-2" />

                  {t.nav.prev}
                </Button>
              )}

              {/* Next Button */}
              {currentStep < 4 && (
                <Button
                  onClick={handleNext}
                  disabled={!stepValidation[currentStep]}
                >
                  {t.nav.next}
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </Button>
              )}

              {/* Create Button */}
              {currentStep === 4 && (
                <Button
                  onClick={handleCreate}
                  disabled={!stepValidation[4] || isCreating}
                >
                  {isCreating ? t.step4.creating : t.nav.create}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.unsaved}</AlertDialogTitle>
            <AlertDialogDescription>
              Les modifications non enregistrées seront perdues.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowUnsavedDialog(false);
                onOpenChange(false);
                resetWizard();
              }}
            >
              Quitter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
