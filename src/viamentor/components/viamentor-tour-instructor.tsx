/**
 * VIAMENTOR Instructor Tour
 *
 * Tour guidé 6 steps pour Moniteur
 * Focus sur dashboard, élèves, évaluation, planning, profil
 *
 * @module components/viamentor-tour-instructor
 * @version 1.0.0
 */

"use client";

import { useEffect, useState } from "react";
import type { SupportedLocale } from "@/viamentor/data/viamentor-i18n-config";
import { getTourTranslations } from "@/viamentor/data/viamentor-tours-i18n";
import {
  shouldShowTour,
  markTourCompleted,
  markTourSkipped,
  markTourDontShowAgain,
  saveTourAnalytics,
  type TourStep,
  type TourAnalytics,
} from "@/viamentor/data/viamentor-tours-types";
import { UserRole } from "@/viamentor/data/viamentor-roles";

export interface InstructorTourProps {
  locale?: SupportedLocale;
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Tour Instructor - 6 steps
 */
export function InstructorTour({
  locale = "fr",
  onComplete,
  onSkip,
}: InstructorTourProps) {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [startTime] = useState(new Date().toISOString());

  const tourId = "instructor-tour";
  const t = getTourTranslations("instructor", locale);

  const steps: TourStep[] = [
    {
      target: '[data-tour-id="instructor-dashboard"]',
      title: t.steps.dashboard.title,
      content: t.steps.dashboard.content,
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="instructor-students"]',
      title: t.steps.students.title,
      content: t.steps.students.content,
      placement: "right",
    },
    {
      target: '[data-tour-id="lesson-evaluation"]',
      title: t.steps.evaluation.title,
      content: t.steps.evaluation.content,
      placement: "bottom",
    },
    {
      target: '[data-tour-id="instructor-planning"]',
      title: t.steps.planning.title,
      content: t.steps.planning.content,
      placement: "right",
    },
    {
      target: '[data-tour-id="instructor-profile"]',
      title: t.steps.profile.title,
      content: t.steps.profile.content,
      placement: "left",
    },
    {
      target: "body",
      title: t.steps.final.title,
      content: t.steps.final.content,
      placement: "center",
    },
  ];

  useEffect(() => {
    const shouldShow = shouldShowTour(tourId, true);
    if (shouldShow) {
      setTimeout(() => setRun(true), 1000);
    }
  }, []);

  const handleComplete = () => {
    setRun(false);
    markTourCompleted(tourId);

    const analytics: TourAnalytics = {
      tourId,
      role: UserRole.INSTRUCTOR,
      startedAt: startTime,
      completedAt: new Date().toISOString(),
      totalSteps: steps.length,
      completionRate: 100,
    };
    saveTourAnalytics(analytics);

    onComplete?.();
  };

  const handleSkip = () => {
    setRun(false);
    markTourSkipped(tourId);

    const analytics: TourAnalytics = {
      tourId,
      role: UserRole.INSTRUCTOR,
      startedAt: startTime,
      skippedAt: new Date().toISOString(),
      dropoffStep: stepIndex,
      totalSteps: steps.length,
      completionRate: Math.round((stepIndex / steps.length) * 100),
    };
    saveTourAnalytics(analytics);

    onSkip?.();
  };

  const handleDontShowAgain = () => {
    setRun(false);
    markTourDontShowAgain(tourId);
    onSkip?.();
  };

  const renderTooltip = ({
    step,
    tooltipProps,
    index,
    size,
    isLastStep,
  }: any) => {
    const currentStep = steps[index];
    const progress = `${index + 1}/${size}`;

    return (
      <div
        {...tooltipProps}
        className="relative max-w-md rounded-lg border border-border bg-card p-6 shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {progress}
          </span>
          <button
            onClick={handleSkip}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {t.navigation.skip}
          </button>
        </div>

        {currentStep.title && (
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">
            {currentStep.title}
          </h3>
        )}

        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {currentStep.content}
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {index > 0 && (
              <button
                onClick={() => setStepIndex(index - 1)}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                {t.navigation.previous}
              </button>
            )}
            <button
              onClick={() => {
                if (isLastStep) {
                  handleComplete();
                } else {
                  setStepIndex(index + 1);
                }
              }}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {isLastStep ? t.navigation.finish : t.navigation.next}
            </button>
          </div>

          {isLastStep && (
            <button
              onClick={handleDontShowAgain}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t.options.dontShowAgain}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!run) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {renderTooltip({
          step: steps[stepIndex],
          tooltipProps: {},
          index: stepIndex,
          size: steps.length,
          isLastStep: stepIndex === steps.length - 1,
        })}
      </div>
    </div>
  );
}

export default InstructorTour;
