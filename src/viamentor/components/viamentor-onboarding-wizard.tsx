/**
 * VIAMENTOR - Onboarding Wizard Principal
 * Orchestration 5 steps avec stepper, navigation, auto-save
 */

import { useEffect } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useOnboardingProgress } from "@/viamentor/data/viamentor-onboarding-progress";
import { SchoolInfoStep } from "@/viamentor/components/viamentor-onboarding-school-info-step";
import { UsersRolesStep } from "@/viamentor/components/viamentor-onboarding-users-roles-step";
import { CategoriesVehiclesStep } from "@/viamentor/components/viamentor-onboarding-categories-vehicles-step";
import { PaymentsStep } from "@/viamentor/components/viamentor-onboarding-payments-step";
import { FinalizationStep } from "@/viamentor/components/viamentor-onboarding-finalization-step";
import {
  type OnboardingLocale,
  ONBOARDING_I18N,
} from "@/viamentor/data/viamentor-onboarding-i18n";

interface OnboardingWizardProps {
  locale?: OnboardingLocale;
  onComplete?: () => void;
}

export function OnboardingWizard({
  locale = "fr",
  onComplete,
}: OnboardingWizardProps) {
  const t = ONBOARDING_I18N[locale];
  const {
    state,
    autoSaveStatus,
    progress,
    updateSchoolInfo,
    updateUsersRoles,
    updateCategoriesVehicles,
    updatePaymentConfig,
    updateFinalization,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    completeOnboarding,
  } = useOnboardingProgress();

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle step navigation
   */
  const handleNext = async () => {
    if (state.currentStep === 5) {
      // Finalisation
      setIsSubmitting(true);
      const result = await completeOnboarding();
      setIsSubmitting(false);

      if (result.success) {
        onComplete?.();
      } else {
        alert(`Erreur: ${result.errors?.join(", ")}`);
      }
    } else {
      const result = goToNextStep();
      if (!result.success) {
        alert(`Validation: ${result.errors?.join(", ")}`);
      }
    }
  };

  /**
   * Render current step
   */
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <SchoolInfoStep
            data={state.schoolInfo}
            locale={locale}
            onChange={updateSchoolInfo}
          />
        );

      case 2:
        return (
          <UsersRolesStep
            data={state.usersRoles}
            locale={locale}
            onChange={updateUsersRoles}
          />
        );

      case 3:
        return (
          <CategoriesVehiclesStep
            data={state.categoriesVehicles}
            locale={locale}
            onChange={updateCategoriesVehicles}
          />
        );

      case 4:
        return (
          <PaymentsStep
            data={state.paymentConfig}
            locale={locale}
            onChange={updatePaymentConfig}
          />
        );

      case 5:
        return (
          <FinalizationStep
            data={state.finalization}
            allData={state}
            locale={locale}
            onChange={updateFinalization}
            onEditStep={goToStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{t.header.welcome}</h1>
              <p className="text-muted-foreground mt-1">{t.header.subtitle}</p>
            </div>
            {/* Auto-save indicator */}
            <div className="flex items-center gap-2">
              {autoSaveStatus === "saving" && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />

                  <span className="text-sm text-muted-foreground">
                    {t.autoSave.saving}
                  </span>
                </>
              )}
              {autoSaveStatus === "saved" && (
                <>
                  <Check className="w-4 h-4 text-green-600" />

                  <span className="text-sm text-green-600">
                    {t.autoSave.saved}
                  </span>
                </>
              )}
              {autoSaveStatus === "error" && (
                <>
                  <span className="text-sm text-destructive">
                    {t.autoSave.error}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />

            <p className="text-xs text-muted-foreground text-right">
              {Math.round(progress)}% complété
            </p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => {
              const isActive = state.currentStep === step;
              const isCompleted = state.completedSteps.includes(step);
              const stepLabel =
                t.stepper[`step${step}` as keyof typeof t.stepper];

              return (
                <div key={step} className="flex items-center flex-1">
                  <button
                    onClick={() => goToStep(step)}
                    className="flex flex-col items-center gap-2 group"
                    disabled={step > state.currentStep && !isCompleted}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                            : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : step}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {stepLabel}
                    </span>
                  </button>
                  {step < 5 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded ${
                        isCompleted ? "bg-green-600" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">{renderStep()}</div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={state.currentStep === 1}
            >
              {t.navigation.previous}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Étape {state.currentStep} / 5
              </span>
            </div>

            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />

                  {t.step5.launching}
                </>
              ) : state.currentStep === 5 ? (
                t.step5.launch
              ) : (
                t.navigation.next
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import useState
import { useState } from "react";
