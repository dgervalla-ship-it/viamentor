/**
 * VIAMENTOR - Cancel Credit Dialog
 * Dialog annulation crédit rattrapage
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast as showToast } from "sonner";
import { AlertTriangleIcon, XCircleIcon } from "lucide-react";
import type { StudentMakeupsStats } from "@/viamentor/data/viamentor-instructor-makeups-data";
import type { InstructorMakeupsLocale } from "@/viamentor/data/viamentor-instructor-makeups-i18n";
import { instructorMakeupsTranslations } from "@/viamentor/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface CancelCreditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentMakeupsStats | null;
  locale?: InstructorMakeupsLocale;
  onConfirm?: (data: { studentId: string; reason: string }) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CancelCreditDialog({
  open,
  onOpenChange,
  student,
  locale = "fr",
  onConfirm,
}: CancelCreditDialogProps) {
  const t = instructorMakeupsTranslations[locale].cancel;

  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!student) return null;

  const handleConfirm = async () => {
    if (!reason.trim() || reason.trim().length < 200) {
      showToast.error("La raison doit contenir au moins 200 caractères");
      return;
    }

    if (!confirmed) {
      showToast.error("Veuillez confirmer l'annulation");
      return;
    }

    setLoading(true);

    try {
      await onConfirm?.({
        studentId: student.studentId,
        reason: reason.trim(),
      });

      showToast.success(t.success);

      onOpenChange(false);
      setReason("");
      setConfirmed(false);
    } catch (error) {
      showToast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setReason("");
    setConfirmed(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <XCircleIcon className="w-5 h-5" />

            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert danger */}
          <Alert variant="destructive">
            <AlertTriangleIcon className="w-4 h-4" />

            <AlertDescription>{t.warning}</AlertDescription>
          </Alert>

          {/* Info élève */}
          <div className="p-4 border border-border rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <img
                src={student.studentAvatar}
                alt={student.studentName}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <div className="font-medium text-foreground">
                  {student.studentName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {student.available} crédit(s) disponible(s)
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">{t.fields.reason.label}</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.fields.reason.placeholder}
                rows={5}
                className={
                  reason.length > 0 && reason.length < 200
                    ? "border-destructive"
                    : ""
                }
              />

              <p
                className={`text-xs ${
                  reason.length < 200
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {t.fields.reason.helper} ({reason.length}/200 minimum)
              </p>
            </div>

            <div className="flex items-start space-x-2 p-4 border border-destructive rounded-lg bg-destructive/5">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.fields.confirm.label}
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {t.actions.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading || !confirmed || reason.length < 200}
          >
            <XCircleIcon className="w-4 h-4 mr-2" />

            {t.actions.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
