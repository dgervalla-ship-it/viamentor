/**
 * VIAMENTOR - Extend Deadline Dialog
 * Dialog prolongation délai rattrapage
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast as showToast } from "sonner";
import { ClockIcon, CalendarIcon, AlertCircleIcon } from "lucide-react";
import type { StudentMakeupsStats } from "@/viamentor/data/viamentor-instructor-makeups-data";
import type { InstructorMakeupsLocale } from "@/viamentor/data/viamentor-instructor-makeups-i18n";
import { instructorMakeupsTranslations } from "@/viamentor/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExtendDeadlineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentMakeupsStats | null;
  locale?: InstructorMakeupsLocale;
  onConfirm?: (data: {
    studentId: string;
    days: number;
    reason: string;
    notify: boolean;
  }) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ExtendDeadlineDialog({
  open,
  onOpenChange,
  student,
  locale = "fr",
  onConfirm,
}: ExtendDeadlineDialogProps) {
  const t = instructorMakeupsTranslations[locale].extend;
  const reasonsT = instructorMakeupsTranslations[locale].reasons;
  // Toast notifications

  const [days, setDays] = useState("7");
  const [reason, setReason] = useState("");
  const [notify, setNotify] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!student) return null;

  // Trouver le premier makeup disponible
  const availableMakeup = student.makeups.find((m) => m.status === "available");

  if (!availableMakeup) return null;

  // Calculer nouvelle échéance
  const currentExpiry = new Date(availableMakeup.expiresAt);
  const daysNum = parseInt(days) || 0;
  const newExpiry = new Date(currentExpiry);
  newExpiry.setDate(newExpiry.getDate() + daysNum);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  };

  const handleConfirm = async () => {
    if (!reason.trim()) {
      showToast.error("Veuillez indiquer une raison");
      return;
    }

    if (daysNum < 1 || daysNum > 30) {
      showToast.error("L'extension doit être entre 1 et 30 jours");
      return;
    }

    setLoading(true);

    try {
      await onConfirm?.({
        studentId: student.studentId,
        days: daysNum,
        reason: reason.trim(),
        notify,
      });

      showToast.success(t.success.replace("{days}", daysNum.toString()));

      onOpenChange(false);
      setDays("7");
      setReason("");
      setNotify(true);
    } catch (error) {
      showToast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contexte makeup */}
          <Card className="p-4 bg-muted">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={student.studentAvatar}
                  alt={student.studentName}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <div className="font-medium text-foreground">
                    {t.context.student}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {student.studentName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">
                    {t.context.originalLesson}
                  </div>
                  <div className="font-medium text-foreground">
                    {formatDate(new Date(availableMakeup.originalDate))}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">
                    {t.context.reason}
                  </div>
                  <div className="font-medium text-foreground">
                    {reasonsT[availableMakeup.reason]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <AlertCircleIcon className="w-4 h-4 text-orange-600" />

                <div className="text-sm">
                  <span className="text-muted-foreground">
                    {t.context.currentExpiry}:{" "}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatDate(currentExpiry)}
                  </span>
                  {student.expiresIn && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    >
                      {student.expiresIn.days}j restants
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Formulaire extension */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="days">{t.fields.days.label}</Label>
              <Input
                id="days"
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder={t.fields.days.placeholder}
              />

              <p className="text-xs text-muted-foreground">
                {t.fields.days.helper}
              </p>
            </div>

            {/* Preview nouvelle échéance */}
            {daysNum > 0 && daysNum <= 30 && (
              <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-900 dark:text-green-100">
                      {t.fields.newExpiry.label}
                    </div>
                    <div className="text-lg font-bold text-green-700 dark:text-green-300">
                      {formatDate(newExpiry)}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason">{t.fields.reason.label}</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.fields.reason.placeholder}
                maxLength={300}
                rows={3}
              />

              <p className="text-xs text-muted-foreground">
                {t.fields.reason.helper} ({reason.length}/300)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify"
                checked={notify}
                onCheckedChange={(checked) => setNotify(checked as boolean)}
              />

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="notify"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.fields.notify.label}
                </label>
                <p className="text-xs text-muted-foreground">
                  {t.fields.notify.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {t.actions.cancel}
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            <ClockIcon className="w-4 h-4 mr-2" />

            {t.actions.extend}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
