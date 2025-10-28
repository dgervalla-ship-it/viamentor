/**
 * VIAMENTOR - Lesson Actions
 * Dialogs pour actions sur leçons: annuler, marquer complétée
 */

"use client";

import { useState } from "react";
import { X, Check, Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Lesson } from "@/polymet/data/viamentor-lessons-data";
import { CANCEL_REASONS } from "@/polymet/data/viamentor-lessons-data";
import type { LessonsLocale } from "@/polymet/data/viamentor-lessons-i18n";
import { getLessonsTranslations } from "@/polymet/data/viamentor-lessons-i18n";

interface CancelLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: Lesson | null;
  locale?: LessonsLocale;
  onConfirm?: (data: {
    reason: string;
    notifyStudent: boolean;
    notifyInstructor: boolean;
    rescheduleDate?: string;
  }) => Promise<void>;
}

export function CancelLessonDialog({
  open,
  onOpenChange,
  lesson,
  locale = "fr",
  onConfirm,
}: CancelLessonDialogProps) {
  const t = getLessonsTranslations(locale);
  const [reason, setReason] = useState("");
  const [reasonTemplate, setReasonTemplate] = useState<string>("");
  const [notifyStudent, setNotifyStudent] = useState(true);
  const [notifyInstructor, setNotifyInstructor] = useState(true);
  const [reschedule, setReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReasonTemplateChange = (value: string) => {
    setReasonTemplate(value);
    if (value && value !== "other") {
      const templateText =
        t.cancelReasons[value as keyof typeof t.cancelReasons];
      setReason(templateText);
    }
  };

  const handleConfirm = async () => {
    if (reason.length < 20) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: t.cancelDialog.reasonError,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm?.({
        reason,
        notifyStudent,
        notifyInstructor,
        rescheduleDate: reschedule ? rescheduleDate : undefined,
      });

      toast({
        title: t.toast.lessonCanceled,
        description: `${lesson?.studentName} - ${new Date(lesson?.startDate || "").toLocaleDateString(locale)}`,
      });

      onOpenChange(false);
      // Reset form
      setReason("");
      setReasonTemplate("");
      setNotifyStudent(true);
      setNotifyInstructor(true);
      setReschedule(false);
      setRescheduleDate("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.cancelDialog.error,
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <X className="w-5 h-5 text-destructive" />

            {t.cancelDialog.title}
          </DialogTitle>
          <DialogDescription>{t.cancelDialog.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Lesson Info */}
          <div className="p-4 bg-muted rounded-lg space-y-1">
            <p className="font-semibold text-foreground">
              {lesson.studentName}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(lesson.startDate).toLocaleDateString(locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(lesson.startDate).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Reason Template */}
          <div className="space-y-2">
            <Label>Template de raison</Label>
            <Select
              value={reasonTemplate}
              onValueChange={handleReasonTemplateChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un template..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CANCEL_REASONS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              {t.cancelDialog.reasonLabel}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t.cancelDialog.reasonPlaceholder}
              rows={4}
              className={
                reason.length > 0 && reason.length < 20
                  ? "border-destructive"
                  : ""
              }
            />

            <p className="text-xs text-muted-foreground">
              {reason.length} / 20 caractères minimum
            </p>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify-student"
                checked={notifyStudent}
                onCheckedChange={(checked) =>
                  setNotifyStudent(checked as boolean)
                }
              />

              <Label htmlFor="notify-student" className="cursor-pointer">
                {t.cancelDialog.notifyStudent}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify-instructor"
                checked={notifyInstructor}
                onCheckedChange={(checked) =>
                  setNotifyInstructor(checked as boolean)
                }
              />

              <Label htmlFor="notify-instructor" className="cursor-pointer">
                {t.cancelDialog.notifyInstructor}
              </Label>
            </div>
          </div>

          {/* Reschedule */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reschedule"
                checked={reschedule}
                onCheckedChange={(checked) => setReschedule(checked as boolean)}
              />

              <Label htmlFor="reschedule" className="cursor-pointer">
                {t.cancelDialog.reschedule}
              </Label>
            </div>

            {reschedule && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="reschedule-date">
                  {t.cancelDialog.newDate}
                </Label>
                <Input
                  id="reschedule-date"
                  type="datetime-local"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.cancelDialog.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitting || reason.length < 20}
          >
            {isSubmitting ? "..." : t.cancelDialog.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface CompleteLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: Lesson | null;
  locale?: LessonsLocale;
  onConfirm?: (data: {
    effectiveDate?: string;
    effectiveStartTime?: string;
    effectiveEndTime?: string;
    notes?: string;
    rating?: number;
  }) => Promise<void>;
}

export function CompleteLessonDialog({
  open,
  onOpenChange,
  lesson,
  locale = "fr",
  onConfirm,
}: CompleteLessonDialogProps) {
  const t = getLessonsTranslations(locale);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [effectiveStartTime, setEffectiveStartTime] = useState("");
  const [effectiveEndTime, setEffectiveEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm?.({
        effectiveDate: effectiveDate || undefined,
        effectiveStartTime: effectiveStartTime || undefined,
        effectiveEndTime: effectiveEndTime || undefined,
        notes: notes || undefined,
        rating: rating > 0 ? rating : undefined,
      });

      toast({
        title: t.toast.lessonCompleted,
        description: `${lesson?.studentName} - ${new Date(lesson?.startDate || "").toLocaleDateString(locale)}`,
      });

      onOpenChange(false);
      // Reset form
      setEffectiveDate("");
      setEffectiveStartTime("");
      setEffectiveEndTime("");
      setNotes("");
      setRating(0);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.completeDialog.error,
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />

            {t.completeDialog.title}
          </DialogTitle>
          <DialogDescription>{t.completeDialog.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Lesson Info */}
          <div className="p-4 bg-muted rounded-lg space-y-1">
            <p className="font-semibold text-foreground">
              {lesson.studentName}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(lesson.startDate).toLocaleDateString(locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(lesson.startDate).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Effective Date */}
          <div className="space-y-2">
            <Label htmlFor="effective-date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />

              {t.completeDialog.effectiveDate}
            </Label>
            <Input
              id="effective-date"
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder={
                new Date(lesson.startDate).toISOString().split("T")[0]
              }
            />

            <p className="text-xs text-muted-foreground">
              Laisser vide si identique à la date planifiée
            </p>
          </div>

          {/* Effective Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />

                {t.completeDialog.startTime}
              </Label>
              <Input
                id="start-time"
                type="time"
                value={effectiveStartTime}
                onChange={(e) => setEffectiveStartTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />

                {t.completeDialog.endTime}
              </Label>
              <Input
                id="end-time"
                type="time"
                value={effectiveEndTime}
                onChange={(e) => setEffectiveEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t.completeDialog.notes}</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.completeDialog.notesPlaceholder}
              rows={4}
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>{t.completeDialog.rating}</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-colors ${
                    star <= rating
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </button>
              ))}
              {rating > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {rating}/5 {t.completeDialog.ratingLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.completeDialog.cancel}
          </Button>
          <Button onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting ? "..." : t.completeDialog.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
