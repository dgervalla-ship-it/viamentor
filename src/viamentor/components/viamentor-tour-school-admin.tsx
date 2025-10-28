/**
 * VIAMENTOR School Admin Tour
 *
 * Tour guidé 8 steps pour School Admin
 * Navigation séquentielle avec spotlight et tooltips interactifs
 *
 * @module components/viamentor-tour-school-admin
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

/**
 * Props du tour School Admin
 */
export interface SchoolAdminTourProps {
  locale?: SupportedLocale;
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Tour School Admin - 8 steps
 *
 * Steps:
 * 1. Sidebar navigation
 * 2. Dashboard cards
 * 3. New student button
 * 4. Planning
 * 5. Invoices
 * 6. Analytics
 * 7. Settings
 * 8. Final message
 */
export function SchoolAdminTour({
  locale = "fr",
  onComplete,
  onSkip,
}: SchoolAdminTourProps) {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [startTime] = useState(new Date().toISOString());

  const tourId = "school-admin-tour";
  const t = getTourTranslations("schoolAdmin", locale);

  // Définition des steps
  const steps: TourStep[] = [
    {
      target: '[data-tour-id="sidebar"]',
      title: t.steps.sidebar.title,
      content: t.steps.sidebar.content,
      placement: "right",
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="dashboard-cards"]',
      title: t.steps.dashboard.title,
      content: t.steps.dashboard.content,
      placement: "bottom",
    },
    {
      target: '[data-tour-id="new-student-button"]',
      title: t.steps.newStudent.title,
      content: t.steps.newStudent.content,
      placement: "bottom",
      spotlightClicks: true,
    },
    {
      target: '[data-tour-id="planning-link"]',
      title: t.steps.planning.title,
      content: t.steps.planning.content,
      placement: "right",
    },
    {
      target: '[data-tour-id="invoices-link"]',
      title: t.steps.invoices.title,
      content: t.steps.invoices.content,
      placement: "right",
    },
    {
      target: '[data-tour-id="analytics-link"]',
      title: t.steps.analytics.title,
      content: t.steps.analytics.content,
      placement: "right",
    },
    {
      target: '[data-tour-id="settings-link"]',
      title: t.steps.settings.title,
      content: t.steps.settings.content,
      placement: "right",
    },
    {
      target: "body",
      title: t.steps.final.title,
      content: t.steps.final.content,
      placement: "center",
    },
  ];

  // Vérifier si le tour doit être affiché
  useEffect(() => {
    const shouldShow = shouldShowTour(tourId, true);
    if (shouldShow) {
      // Petit délai pour laisser le DOM se charger
      setTimeout(() => setRun(true), 1000);
    }
  }, []);

  // Handler pour completion
  const handleComplete = () => {
    setRun(false);
    markTourCompleted(tourId);

    // Sauvegarder analytics
    const analytics: TourAnalytics = {
      tourId,
      role: UserRole.SCHOOL_ADMIN,
      startedAt: startTime,
      completedAt: new Date().toISOString(),
      totalSteps: steps.length,
      completionRate: 100,
    };
    saveTourAnalytics(analytics);

    onComplete?.();
  };

  // Handler pour skip
  const handleSkip = () => {
    setRun(false);
    markTourSkipped(tourId);

    // Sauvegarder analytics
    const analytics: TourAnalytics = {
      tourId,
      role: UserRole.SCHOOL_ADMIN,
      startedAt: startTime,
      skippedAt: new Date().toISOString(),
      dropoffStep: stepIndex,
      totalSteps: steps.length,
      completionRate: Math.round((stepIndex / steps.length) * 100),
    };
    saveTourAnalytics(analytics);

    onSkip?.();
  };

  // Handler pour don't show again
  const handleDontShowAgain = () => {
    setRun(false);
    markTourDontShowAgain(tourId);
    onSkip?.();
  };

  // Render custom tooltip
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
        {/* Progress */}
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

        {/* Title */}
        {currentStep.title && (
          <h3 className="mb-2 text-lg font-semibold text-card-foreground">
            {currentStep.title}
          </h3>
        )}

        {/* Content */}
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {currentStep.content}
        </p>

        {/* Actions */}
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

  // Note: Dans une vraie implémentation, on utiliserait react-joyride ou driver.js
  // Ici on simule la structure pour démonstration
  if (!run) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Tooltip simulé */}
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

export default SchoolAdminTour;
