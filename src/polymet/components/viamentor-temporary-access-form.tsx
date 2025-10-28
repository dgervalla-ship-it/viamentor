/**
 * VIAMENTOR - Temporary Access Form
 * Formulaire configuration accès temporaire moniteur
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InfoIcon,
  CheckCircle2Icon,
  CalendarIcon,
  BookOpenIcon,
  StarIcon,
  Loader2Icon,
} from "lucide-react";
import type {
  InstructorWorkload,
  StudentCategory,
  AssignmentLocale,
} from "@/polymet/data/viamentor-assignments-data";
import { ASSIGNMENTS_TRANSLATIONS } from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface TemporaryAccessFormProps {
  instructors: InstructorWorkload[];
  studentCategories: StudentCategory[];
  locale?: AssignmentLocale;
  onSubmit: (data: {
    temporaryInstructorId: string;
    startDate: string;
    endDate: string;
    maxLessons: number;
    authorizedCategories: StudentCategory[];
    reason: string;
    allowDirectBooking: boolean;
    notifyPrimaryInstructor: boolean;
    notifyTemporaryInstructor: boolean;
    notifyStudent: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TemporaryAccessForm({
  instructors,
  studentCategories,
  locale = "fr",
  onSubmit,
  onCancel,
  className,
}: TemporaryAccessFormProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];

  const [selectedInstructorId, setSelectedInstructorId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxLessons, setMaxLessons] = useState<number>(3);
  const [selectedCategories, setSelectedCategories] =
    useState<StudentCategory[]>(studentCategories);
  const [reason, setReason] = useState<string>("");
  const [allowDirectBooking, setAllowDirectBooking] = useState<boolean>(true);
  const [notifyPrimary, setNotifyPrimary] = useState<boolean>(true);
  const [notifyTemporary, setNotifyTemporary] = useState<boolean>(true);
  const [notifyStudent, setNotifyStudent] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedInstructor = instructors.find(
    (i) => i.instructorId === selectedInstructorId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstructorId || !startDate || !endDate || reason.length < 20) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        temporaryInstructorId: selectedInstructorId,
        startDate,
        endDate,
        maxLessons,
        authorizedCategories: selectedCategories,
        reason: reason.trim(),
        allowDirectBooking,
        notifyPrimaryInstructor: notifyPrimary,
        notifyTemporaryInstructor: notifyTemporary,
        notifyStudent,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Info Alert */}
      <Alert className="mb-6">
        <InfoIcon className="w-4 h-4" />

        <AlertDescription>{t.temporaryAccess.infoMessage}</AlertDescription>
      </Alert>

      {/* Use Cases */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.temporaryAccess.useCases}
        </h3>
        <ul className="space-y-2">
          {t.temporaryAccess.useCasesList.map((useCase, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

              <span className="text-sm text-muted-foreground">{useCase}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Select Temporary Instructor */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.temporaryAccess.selectTemporaryInstructor}
        </h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="instructor">
              {t.temporaryAccess.temporaryInstructor}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Select
              value={selectedInstructorId}
              onValueChange={setSelectedInstructorId}
            >
              <SelectTrigger id="instructor" className="mt-2">
                <SelectValue
                  placeholder={
                    locale === "fr"
                      ? "Sélectionner un moniteur"
                      : locale === "de"
                        ? "Fahrlehrer auswählen"
                        : locale === "it"
                          ? "Selezionare istruttore"
                          : "Select instructor"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {instructors.map((instructor) => (
                  <SelectItem
                    key={instructor.instructorId}
                    value={instructor.instructorId}
                  >
                    {instructor.instructorName} - {instructor.activeStudents}/
                    {instructor.maxCapacity} {t.activeStudents.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Instructor Preview */}
          {selectedInstructor && (
            <Card className="p-4 bg-muted/50">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedInstructor.instructorAvatar} />

                  <AvatarFallback>
                    {selectedInstructor.instructorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <p className="font-semibold">
                      {selectedInstructor.instructorName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedInstructor.categories.map((cat) => (
                        <Badge key={cat} variant="secondary">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        {t.activeStudents}
                      </p>
                      <p className="font-medium">
                        {selectedInstructor.activeStudents}/
                        {selectedInstructor.maxCapacity}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.rating}</p>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                        <span className="font-medium">
                          {selectedInstructor.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>

      {/* Configuration */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.temporaryAccess.configuration}
        </h3>

        <div className="space-y-4">
          {/* Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">
                {locale === "fr"
                  ? "Date début"
                  : locale === "de"
                    ? "Startdatum"
                    : locale === "it"
                      ? "Data inizio"
                      : "Start date"}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="end-date">
                {locale === "fr"
                  ? "Date fin"
                  : locale === "de"
                    ? "Enddatum"
                    : locale === "it"
                      ? "Data fine"
                      : "End date"}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>

          {/* Max Lessons */}
          <div>
            <Label htmlFor="max-lessons">
              {t.temporaryAccess.maxLessons}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="max-lessons"
              type="number"
              min={1}
              max={10}
              value={maxLessons}
              onChange={(e) => setMaxLessons(parseInt(e.target.value) || 1)}
              className="mt-2"
              required
            />
          </div>

          {/* Authorized Categories */}
          <div>
            <Label>{t.temporaryAccess.authorizedCategories}</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {studentCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant={
                    selectedCategories.includes(cat) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    if (selectedCategories.includes(cat)) {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, cat]);
                    }
                  }}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <Label htmlFor="reason">
              {t.temporaryAccess.reason}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t.temporaryAccess.reasonPlaceholder}
              rows={3}
              maxLength={200}
              className="mt-2"
              required
            />

            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                {locale === "fr"
                  ? "Minimum 20 caractères"
                  : locale === "de"
                    ? "Mindestens 20 Zeichen"
                    : locale === "it"
                      ? "Minimo 20 caratteri"
                      : "Minimum 20 characters"}
              </p>
              <p
                className={`text-xs ${
                  reason.length >= 20
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground"
                }`}
              >
                {reason.length}/200
              </p>
            </div>
          </div>

          {/* Allow Direct Booking */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="direct-booking"
              checked={allowDirectBooking}
              onCheckedChange={(checked) =>
                setAllowDirectBooking(checked as boolean)
              }
            />

            <Label htmlFor="direct-booking" className="cursor-pointer">
              {t.temporaryAccess.allowDirectBooking}
            </Label>
          </div>

          {/* Notifications */}
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">
              {locale === "fr"
                ? "Notifications"
                : locale === "de"
                  ? "Benachrichtigungen"
                  : locale === "it"
                    ? "Notifiche"
                    : "Notifications"}
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify-primary"
                checked={notifyPrimary}
                onCheckedChange={(checked) =>
                  setNotifyPrimary(checked as boolean)
                }
              />

              <Label htmlFor="notify-primary" className="cursor-pointer">
                {t.temporaryAccess.notifyPrimaryInstructor}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify-temporary"
                checked={notifyTemporary}
                onCheckedChange={(checked) =>
                  setNotifyTemporary(checked as boolean)
                }
              />

              <Label htmlFor="notify-temporary" className="cursor-pointer">
                {t.temporaryAccess.notifyTemporaryInstructor}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify-student"
                checked={notifyStudent}
                onCheckedChange={(checked) =>
                  setNotifyStudent(checked as boolean)
                }
              />

              <Label htmlFor="notify-student" className="cursor-pointer">
                {t.temporaryAccess.notifyStudent}
              </Label>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t.cancel}
        </Button>
        <Button
          type="submit"
          disabled={
            !selectedInstructorId ||
            !startDate ||
            !endDate ||
            reason.length < 20 ||
            isSubmitting
          }
        >
          {isSubmitting && (
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          )}
          {t.confirm}
        </Button>
      </div>
    </form>
  );
}
