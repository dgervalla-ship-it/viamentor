/**
 * VIAMENTOR - Reassignment Wizard
 * Wizard réattribution élève avec validation workflow 4 steps
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  UserIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  CalendarIcon,
  Loader2Icon,
} from "lucide-react";
import { InstructorRecommendations } from "@/viamentor/components/viamentor-instructor-recommendations";
import type {
  AssignmentDetail,
  AssignmentRecommendation,
  AssignmentLocale,
} from "@/viamentor/data/viamentor-assignments-data";
import {
  ASSIGNMENTS_TRANSLATIONS,
  calculateDaysSince,
} from "@/viamentor/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface ReassignmentWizardProps {
  currentAssignment: AssignmentDetail;
  recommendations: AssignmentRecommendation[];
  locale?: AssignmentLocale;
  onConfirm: (data: {
    newInstructorId: string;
    reason: string;
    notifications: {
      notifyCurrentInstructor: boolean;
      notifyNewInstructor: boolean;
      notifyStudent: boolean;
      notifyParents: boolean;
    };
  }) => Promise<void>;
  onCancel: () => void;
  className?: string;
}

type WizardStep = "select" | "justify" | "notify" | "confirm";

// ============================================================================
// COMPONENT
// ============================================================================

export function ReassignmentWizard({
  currentAssignment,
  recommendations,
  locale = "fr",
  onConfirm,
  onCancel,
  className,
}: ReassignmentWizardProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];
  const [currentStep, setCurrentStep] = useState<WizardStep>("select");
  const [selectedInstructorId, setSelectedInstructorId] = useState<
    string | null
  >(null);
  const [reason, setReason] = useState("");
  const [notifications, setNotifications] = useState({
    notifyCurrentInstructor: true,
    notifyNewInstructor: true,
    notifyStudent: true,
    notifyParents: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedInstructor = recommendations.find(
    (r) => r.instructor.instructorId === selectedInstructorId
  )?.instructor;

  const daysSinceAssignment = calculateDaysSince(
    currentAssignment.assignedDate
  );

  const steps: { key: WizardStep; label: string }[] = [
    { key: "select", label: t.reassignment.steps.selectInstructor },
    { key: "justify", label: t.reassignment.steps.justification },
    { key: "notify", label: t.reassignment.steps.notifications },
    { key: "confirm", label: t.reassignment.steps.confirmation },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  const handleNext = () => {
    if (currentStep === "select" && selectedInstructorId) {
      setCurrentStep("justify");
    } else if (currentStep === "justify" && reason.trim().length >= 50) {
      setCurrentStep("notify");
    } else if (currentStep === "notify") {
      setCurrentStep("confirm");
    }
  };

  const handleBack = () => {
    if (currentStep === "justify") {
      setCurrentStep("select");
    } else if (currentStep === "notify") {
      setCurrentStep("justify");
    } else if (currentStep === "confirm") {
      setCurrentStep("notify");
    }
  };

  const handleSubmit = async () => {
    if (!selectedInstructorId || !reason.trim()) return;

    setIsSubmitting(true);
    try {
      await onConfirm({
        newInstructorId: selectedInstructorId,
        reason: reason.trim(),
        notifications,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === "select") return !!selectedInstructorId;
    if (currentStep === "justify") return reason.trim().length >= 50;
    return true;
  };

  return (
    <div className={className}>
      {/* Warning Alert */}
      <Alert variant="destructive" className="mb-6">
        <AlertTriangleIcon className="w-4 h-4" />

        <AlertDescription>{t.reassignment.warningMessage}</AlertDescription>
      </Alert>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index <= currentStepIndex
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {index < currentStepIndex ? (
                  <CheckCircle2Icon className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStepIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div
              key={step.key}
              className="flex-1 text-center text-xs text-muted-foreground"
            >
              {step.label}
            </div>
          ))}
        </div>
      </div>

      {/* Current Assignment Card */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.reassignment.currentAssignment}
        </h3>

        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={currentAssignment.instructorAvatar} />

            <AvatarFallback>
              {currentAssignment.instructorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div>
              <h4 className="text-lg font-bold">
                {currentAssignment.instructorName}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t.reassignment.assignedSince
                  .replace(
                    "{date}",
                    new Date(currentAssignment.assignedDate).toLocaleDateString(
                      locale
                    )
                  )
                  .replace("{days}", daysSinceAssignment.toString())}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <UserIcon className="w-4 h-4" />

                  <span>{t.reassignment.completedLessons}</span>
                </div>
                <p className="text-lg font-semibold">
                  {currentAssignment.completedLessons}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <ClockIcon className="w-4 h-4" />

                  <span>{t.reassignment.totalHours}</span>
                </div>
                <p className="text-lg font-semibold">
                  {currentAssignment.completedHours}h
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <TrendingUpIcon className="w-4 h-4" />

                  <span>{t.reassignment.progress}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">
                    {t.reassignment.programCompleted.replace(
                      "{percent}",
                      currentAssignment.progressPercentage.toString()
                    )}
                  </p>
                  <Progress
                    value={currentAssignment.progressPercentage}
                    className="h-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <StarIcon className="w-4 h-4" />

                  <span>{t.reassignment.instructorRating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />

                  <p className="text-lg font-semibold">
                    {currentAssignment.instructorRating.toFixed(1)}/5
                  </p>
                </div>
              </div>
            </div>

            {currentAssignment.initialReason && (
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.reassignment.initialReason}
                </p>
                <p className="text-sm">{currentAssignment.initialReason}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Step Content */}
      <div className="mb-6">
        {currentStep === "select" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t.reassignment.selectNewInstructor}
            </h3>

            <InstructorRecommendations
              recommendations={recommendations.filter(
                (r) =>
                  r.instructor.instructorId !== currentAssignment.instructorId
              )}
              locale={locale}
              onAssign={(instructorId) => setSelectedInstructorId(instructorId)}
              onViewProfile={() => {}}
            />

            {selectedInstructor && selectedInstructor.activeStudents >= 12 && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangleIcon className="w-4 h-4" />

                <AlertDescription>
                  {t.reassignment.warningOverloaded.replace(
                    "{count}",
                    selectedInstructor.activeStudents.toString()
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {currentStep === "justify" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t.reassignment.steps.justification}
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">
                  {t.reassignment.reassignmentReason}
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t.reassignment.reassignmentReasonPlaceholder}
                  rows={6}
                  maxLength={300}
                  className="mt-2"
                />

                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {locale === "fr"
                      ? "Minimum 50 caractères"
                      : locale === "de"
                        ? "Mindestens 50 Zeichen"
                        : locale === "it"
                          ? "Minimo 50 caratteri"
                          : "Minimum 50 characters"}
                  </p>
                  <p
                    className={`text-xs ${
                      reason.length >= 50
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {reason.length}/300
                  </p>
                </div>
              </div>

              {selectedInstructor && (
                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold mb-2">
                    {locale === "fr"
                      ? "Nouveau moniteur sélectionné"
                      : locale === "de"
                        ? "Ausgewählter neuer Fahrlehrer"
                        : locale === "it"
                          ? "Nuovo istruttore selezionato"
                          : "Selected new instructor"}
                  </h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedInstructor.instructorAvatar} />

                      <AvatarFallback>
                        {selectedInstructor.instructorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {selectedInstructor.instructorName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {selectedInstructor.activeStudents}{" "}
                          {t.activeStudents.toLowerCase()}
                        </span>
                        <span>•</span>
                        <span>
                          {selectedInstructor.weeklyHours}h/
                          {selectedInstructor.availableHours}h
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {currentStep === "notify" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t.reassignment.steps.notifications}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="notify-current"
                  checked={notifications.notifyCurrentInstructor}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      notifyCurrentInstructor: checked === true,
                    }))
                  }
                />

                <div className="flex-1">
                  <Label htmlFor="notify-current" className="cursor-pointer">
                    {t.reassignment.notifications.notifyCurrentInstructor}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {locale === "fr"
                      ? "Email et SMS automatique au moniteur actuel"
                      : locale === "de"
                        ? "Automatische E-Mail und SMS an aktuellen Fahrlehrer"
                        : locale === "it"
                          ? "Email e SMS automatici all'istruttore attuale"
                          : "Automatic email and SMS to current instructor"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="notify-new"
                  checked={notifications.notifyNewInstructor}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      notifyNewInstructor: checked === true,
                    }))
                  }
                />

                <div className="flex-1">
                  <Label htmlFor="notify-new" className="cursor-pointer">
                    {t.reassignment.notifications.notifyNewInstructor}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {locale === "fr"
                      ? "Email et SMS automatique au nouveau moniteur"
                      : locale === "de"
                        ? "Automatische E-Mail und SMS an neuen Fahrlehrer"
                        : locale === "it"
                          ? "Email e SMS automatici al nuovo istruttore"
                          : "Automatic email and SMS to new instructor"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="notify-student"
                  checked={notifications.notifyStudent}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      notifyStudent: checked === true,
                    }))
                  }
                />

                <div className="flex-1">
                  <Label htmlFor="notify-student" className="cursor-pointer">
                    {t.reassignment.notifications.notifyStudent}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {locale === "fr"
                      ? "Email et SMS automatique à l'élève"
                      : locale === "de"
                        ? "Automatische E-Mail und SMS an Schüler"
                        : locale === "it"
                          ? "Email e SMS automatici all'allievo"
                          : "Automatic email and SMS to student"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="notify-parents"
                  checked={notifications.notifyParents}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      notifyParents: checked === true,
                    }))
                  }
                />

                <div className="flex-1">
                  <Label htmlFor="notify-parents" className="cursor-pointer">
                    {t.reassignment.notifications.notifyParents}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {locale === "fr"
                      ? "Email et SMS automatique aux parents (si élève mineur)"
                      : locale === "de"
                        ? "Automatische E-Mail und SMS an Eltern (falls minderjährig)"
                        : locale === "it"
                          ? "Email e SMS automatici ai genitori (se minorenne)"
                          : "Automatic email and SMS to parents (if minor)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === "confirm" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t.reassignment.steps.confirmation}
            </h3>

            <Alert className="mb-6">
              <AlertTriangleIcon className="w-4 h-4" />

              <AlertDescription>
                {locale === "fr"
                  ? "Dernière chance d'annuler - Cette action est irréversible"
                  : locale === "de"
                    ? "Letzte Chance zum Abbrechen - Diese Aktion ist unwiderruflich"
                    : locale === "it"
                      ? "Ultima possibilità di annullare - Questa azione è irreversibile"
                      : "Last chance to cancel - This action is irreversible"}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-3">
                  {locale === "fr"
                    ? "Résumé de la réattribution"
                    : locale === "de"
                      ? "Zusammenfassung der Neuzuweisung"
                      : locale === "it"
                        ? "Riepilogo riassegnazione"
                        : "Reassignment Summary"}
                </h4>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "fr"
                        ? "Élève"
                        : locale === "de"
                          ? "Schüler"
                          : locale === "it"
                            ? "Allievo"
                            : "Student"}
                    </p>
                    <p className="font-semibold">
                      {currentAssignment.studentName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "fr"
                        ? "Moniteur actuel"
                        : locale === "de"
                          ? "Aktueller Fahrlehrer"
                          : locale === "it"
                            ? "Istruttore attuale"
                            : "Current Instructor"}
                    </p>
                    <p className="font-semibold">
                      {currentAssignment.instructorName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "fr"
                        ? "Nouveau moniteur"
                        : locale === "de"
                          ? "Neuer Fahrlehrer"
                          : locale === "it"
                            ? "Nuovo istruttore"
                            : "New Instructor"}
                    </p>
                    <p className="font-semibold">
                      {selectedInstructor?.instructorName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.reassignment.reassignmentReason}
                    </p>
                    <p className="text-sm">{reason}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {locale === "fr"
                        ? "Notifications"
                        : locale === "de"
                          ? "Benachrichtigungen"
                          : locale === "it"
                            ? "Notifiche"
                            : "Notifications"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {notifications.notifyCurrentInstructor && (
                        <Badge variant="secondary">
                          {locale === "fr"
                            ? "Moniteur actuel"
                            : locale === "de"
                              ? "Aktueller Fahrlehrer"
                              : locale === "it"
                                ? "Istruttore attuale"
                                : "Current Instructor"}
                        </Badge>
                      )}
                      {notifications.notifyNewInstructor && (
                        <Badge variant="secondary">
                          {locale === "fr"
                            ? "Nouveau moniteur"
                            : locale === "de"
                              ? "Neuer Fahrlehrer"
                              : locale === "it"
                                ? "Nuovo istruttore"
                                : "New Instructor"}
                        </Badge>
                      )}
                      {notifications.notifyStudent && (
                        <Badge variant="secondary">
                          {locale === "fr"
                            ? "Élève"
                            : locale === "de"
                              ? "Schüler"
                              : locale === "it"
                                ? "Allievo"
                                : "Student"}
                        </Badge>
                      )}
                      {notifications.notifyParents && (
                        <Badge variant="secondary">
                          {locale === "fr"
                            ? "Parents"
                            : locale === "de"
                              ? "Eltern"
                              : locale === "it"
                                ? "Genitori"
                                : "Parents"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={currentStepIndex === 0 ? onCancel : handleBack}
        >
          {currentStepIndex === 0
            ? t.cancel
            : locale === "fr"
              ? "Retour"
              : locale === "de"
                ? "Zurück"
                : locale === "it"
                  ? "Indietro"
                  : "Back"}
        </Button>

        {currentStep !== "confirm" ? (
          <Button onClick={handleNext} disabled={!canProceed()}>
            {locale === "fr"
              ? "Suivant"
              : locale === "de"
                ? "Weiter"
                : locale === "it"
                  ? "Avanti"
                  : "Next"}
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
            )}
            {t.reassignment.confirmReassignment}
          </Button>
        )}
      </div>
    </div>
  );
}
