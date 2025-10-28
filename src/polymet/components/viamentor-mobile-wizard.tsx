/**
 * ============================================================================
 * VIAMENTOR - Mobile Wizard
 * ============================================================================
 *
 * Wizard adaptatif mobile avec steps optimisés et swipe navigation
 */

import React, { useState } from "react";
import { useResponsive } from "@/polymet/data/viamentor-responsive-utils";
import { useSwipeGesture } from "@/polymet/data/viamentor-touch-gestures";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
  CircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;
  optional?: boolean;
}

export interface MobileWizardProps {
  steps: WizardStep[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onCancel?: () => void;
  showProgress?: boolean;
  showStepIndicator?: boolean;
  allowSwipe?: boolean;
  className?: string;
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Step indicator mobile (dots)
 */
function MobileStepIndicator({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <button
            key={step.id}
            onClick={() => onStepClick?.(index)}
            className="focus:outline-none"
            aria-label={`Étape ${index + 1}: ${step.title}`}
          >
            {isCompleted ? (
              <CheckCircle2Icon className="h-4 w-4 text-green-600" />
            ) : isActive ? (
              <div className="h-3 w-3 rounded-full bg-primary" />
            ) : (
              <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Step indicator desktop (liste)
 */
function DesktopStepIndicator({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <button
            key={step.id}
            onClick={() => onStepClick?.(index)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : isCompleted
                  ? "bg-green-50 dark:bg-green-950/20 text-green-600"
                  : "hover:bg-muted"
            }`}
          >
            <div className="flex-shrink-0">
              {isCompleted ? (
                <CheckCircle2Icon className="h-5 w-5 text-green-600" />
              ) : isActive ? (
                <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              ) : (
                <CircleIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p
                className={`text-sm font-medium ${
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
            {step.optional && (
              <Badge variant="outline" className="text-xs">
                Optionnel
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Mobile Wizard principal
 */
export function MobileWizard({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  onCancel,
  showProgress = true,
  showStepIndicator = true,
  allowSwipe = true,
  className = "",
}: MobileWizardProps) {
  const [internalStep, setInternalStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const responsive = useResponsive();

  const currentStep = controlledStep ?? internalStep;
  const setCurrentStep = (step: number) => {
    if (controlledStep === undefined) {
      setInternalStep(step);
    }
    onStepChange?.(step);
  };

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Swipe navigation
  const swipe = useSwipeGesture({
    onSwipeLeft: () => {
      if (allowSwipe && !isLastStep) {
        handleNext();
      }
    },
    onSwipeRight: () => {
      if (allowSwipe && !isFirstStep) {
        handlePrevious();
      }
    },
    swipeThreshold: 80,
  });

  const handleNext = async () => {
    // Validation
    if (currentStepData.validate) {
      setIsValidating(true);
      const isValid = await currentStepData.validate();
      setIsValidating(false);

      if (!isValid) {
        return;
      }
    }

    if (isLastStep) {
      onComplete?.();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    // Permet de revenir en arrière uniquement
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  // Mobile layout
  if (responsive.isMobile) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        {/* Progress bar */}
        {showProgress && (
          <div className="px-4 pt-4">
            <Progress value={progress} className="h-2" />

            <p className="text-xs text-muted-foreground text-center mt-2">
              Étape {currentStep + 1} sur {steps.length}
            </p>
          </div>
        )}

        {/* Step indicator */}
        {showStepIndicator && (
          <MobileStepIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        )}

        {/* Content avec swipe */}
        <div
          {...(allowSwipe ? swipe : {})}
          className="flex-1 overflow-y-auto px-4 pb-4"
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <div className="flex items-center gap-2">
                {currentStepData.icon}
                <CardTitle className="text-xl">
                  {currentStepData.title}
                </CardTitle>
              </div>
              {currentStepData.description && (
                <CardDescription>{currentStepData.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="px-0">
              {currentStepData.content}
            </CardContent>
          </Card>
        </div>

        {/* Actions fixées en bas */}
        <div className="border-t border-border bg-background p-4 space-y-3">
          {allowSwipe && (
            <p className="text-xs text-center text-muted-foreground">
              Swipez pour naviguer
            </p>
          )}
          <div className="flex gap-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Précédent
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isValidating}
              className="flex-1"
            >
              {isValidating
                ? "Validation..."
                : isLastStep
                  ? "Terminer"
                  : "Suivant"}
              {!isLastStep && <ChevronRightIcon className="h-4 w-4 ml-1" />}
            </Button>
          </div>
          {onCancel && (
            <Button
              variant="ghost"
              onClick={onCancel}
              className="w-full"
              size="sm"
            >
              Annuler
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className={`grid grid-cols-[280px_1fr] gap-6 ${className}`}>
      {/* Sidebar avec steps */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-2">Progression</h3>
          {showProgress && (
            <div className="space-y-2">
              <Progress value={progress} />

              <p className="text-xs text-muted-foreground">
                {currentStep + 1} / {steps.length} étapes
              </p>
            </div>
          )}
        </div>

        <DesktopStepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              {currentStepData.icon}
              <div>
                <CardTitle>{currentStepData.title}</CardTitle>
                {currentStepData.description && (
                  <CardDescription>
                    {currentStepData.description}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>{currentStepData.content}</CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {!isFirstStep && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ChevronLeftIcon className="h-4 w-4 mr-2" />
                  Précédent
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              {onCancel && (
                <Button variant="ghost" onClick={onCancel}>
                  Annuler
                </Button>
              )}
              <Button onClick={handleNext} disabled={isValidating}>
                {isValidating
                  ? "Validation..."
                  : isLastStep
                    ? "Terminer"
                    : "Suivant"}
                {!isLastStep && <ChevronRightIcon className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
