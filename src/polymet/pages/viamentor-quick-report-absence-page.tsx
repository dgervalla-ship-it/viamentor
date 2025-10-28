/**
 * VIAMENTOR - Quick Report Absence Page
 * Page Quick Action pour signalement rapide d'absence
 *
 * @module pages/viamentor-quick-report-absence-page
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserIcon,
  CalendarIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  XIcon,
  AlertCircleIcon,
  ClockIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface QuickReportAbsencePageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStudents = [
  { id: "1", name: "Sophie Martin", category: "B" },
  { id: "2", name: "Lucas Dubois", category: "B" },
  { id: "3", name: "Emma Bernard", category: "A1" },
];

const mockInstructors = [
  { id: "1", name: "Jean Dupont" },
  { id: "2", name: "Marie Leclerc" },
  { id: "3", name: "Pierre Moreau" },
];

const absenceReasons = [
  { value: "illness", label: "Maladie" },
  { value: "emergency", label: "Urgence familiale" },
  { value: "work", label: "Obligation professionnelle" },
  { value: "transport", label: "Problème de transport" },
  { value: "weather", label: "Conditions météo" },
  { value: "other", label: "Autre" },
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

// ============================================================================
// COMPONENT
// ============================================================================

export function QuickReportAbsencePage({
  locale = "fr",
}: QuickReportAbsencePageProps) {
  const [reporterType, setReporterType] = useState<"student" | "instructor">(
    "student"
  );
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [notifyInstructor, setNotifyInstructor] = useState(true);
  const [notifyStudent, setNotifyStudent] = useState(true);
  const [requestMakeup, setRequestMakeup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedPerson) {
      newErrors.person =
        reporterType === "student" ? "Élève requis" : "Moniteur requis";
    }
    if (!selectedDate) newErrors.date = "Date requise";
    if (!selectedTime) newErrors.time = "Heure requise";
    if (!reason) newErrors.reason = "Motif requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulation API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  // Auto-redirect après succès
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        console.warn(
          'Prevented assignment: `window.location.href = "/planning"`'
        ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const isFormValid = selectedPerson && selectedDate && selectedTime && reason;

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Absence signalée !</h2>
          <p className="text-muted-foreground mb-4">
            L'absence a été enregistrée avec succès.
          </p>
          {requestMakeup && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Une demande de rattrapage a été créée automatiquement.
              </p>
            </div>
          )}
          <Link to="/planning">
            <Button variant="link" className="mt-2">
              Voir le planning
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Signaler une Absence</h1>
          <p className="text-muted-foreground mt-1">
            Enregistrez rapidement une absence
          </p>
        </div>
        <Link to="/planning">
          <Button variant="ghost" size="icon">
            <XIcon className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Type de signalement */}
          <div className="space-y-3">
            <Label>Type d'absence</Label>
            <div className="flex gap-3">
              <Button
                variant={reporterType === "student" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setReporterType("student");
                  setSelectedPerson("");
                }}
              >
                Absence Élève
              </Button>
              <Button
                variant={reporterType === "instructor" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setReporterType("instructor");
                  setSelectedPerson("");
                }}
              >
                Absence Moniteur
              </Button>
            </div>
          </div>

          <Separator />

          {/* Personne concernée */}
          <div className="space-y-2">
            <Label htmlFor="person" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              {reporterType === "student" ? "Élève" : "Moniteur"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedPerson} onValueChange={setSelectedPerson}>
              <SelectTrigger
                id="person"
                className={errors.person ? "border-destructive" : ""}
              >
                <SelectValue
                  placeholder={
                    reporterType === "student"
                      ? "Sélectionner un élève"
                      : "Sélectionner un moniteur"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {(reporterType === "student"
                  ? mockStudents
                  : mockInstructors
                ).map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    <div className="flex items-center gap-2">
                      <span>{person.name}</span>
                      {"category" in person && (
                        <Badge variant="outline" className="text-xs">
                          {person.category}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.person && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircleIcon className="w-3 h-3" />

                {errors.person}
              </p>
            )}
          </div>

          <Separator />

          {/* Date et Heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date <span className="text-destructive">*</span>
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />

              {errors.date && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="w-3 h-3" />

                  {errors.date}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  Heure de la leçon <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger
                    id="time"
                    className={errors.time ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Sélectionner l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.time}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="flex items-center gap-2">
                  <AlertTriangleIcon className="w-4 h-4" />
                  Motif <span className="text-destructive">*</span>
                </Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger
                    id="reason"
                    className={errors.reason ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Sélectionner un motif" />
                  </SelectTrigger>
                  <SelectContent>
                    {absenceReasons.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.reason && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />

                    {errors.reason}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Détails */}
          <div className="space-y-2">
            <Label htmlFor="details">Détails (optionnel)</Label>
            <Textarea
              id="details"
              placeholder="Ajouter des détails sur l'absence..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>

          <Separator />

          {/* Options */}
          <div className="space-y-3">
            <Label>Options</Label>

            {reporterType === "student" && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifyInstructor"
                    checked={notifyInstructor}
                    onCheckedChange={(checked) =>
                      setNotifyInstructor(checked as boolean)
                    }
                  />

                  <label
                    htmlFor="notifyInstructor"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notifier le moniteur par email/SMS
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requestMakeup"
                    checked={requestMakeup}
                    onCheckedChange={(checked) =>
                      setRequestMakeup(checked as boolean)
                    }
                  />

                  <label
                    htmlFor="requestMakeup"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Créer une demande de rattrapage automatiquement
                  </label>
                </div>
              </>
            )}

            {reporterType === "instructor" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifyStudent"
                  checked={notifyStudent}
                  onCheckedChange={(checked) =>
                    setNotifyStudent(checked as boolean)
                  }
                />

                <label
                  htmlFor="notifyStudent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notifier l'élève par email/SMS
                </label>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              <strong>Important:</strong> L'absence sera enregistrée dans le
              planning et les personnes concernées seront notifiées selon vos
              préférences.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Link to="/planning" className="flex-1">
              <Button
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            </Link>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Signalement..." : "Signaler l'absence"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
