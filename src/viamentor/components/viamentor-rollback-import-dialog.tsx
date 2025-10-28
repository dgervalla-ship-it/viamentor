/**
 * VIAMENTOR - Rollback Import Dialog
 * Dialog de confirmation pour annuler un import avec rollback complet
 */

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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertTriangleIcon, UndoIcon } from "lucide-react";
import {
  getICSImportTranslation,
  type ICSImportLocale,
} from "@/viamentor/data/viamentor-ics-import-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RollbackImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importId: string;
  eventsCount: number;
  locale?: ICSImportLocale;
  onConfirm?: (data: RollbackData) => Promise<void>;
}

interface RollbackData {
  importId: string;
  reason?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RollbackImportDialog({
  open,
  onOpenChange,
  importId,
  eventsCount,
  locale = "fr",
  onConfirm,
}: RollbackImportDialogProps) {
  const t = getICSImportTranslation(locale).rollback;

  // State
  const [understand, setUnderstand] = useState(false);
  const [reason, setReason] = useState("");
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset state when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isRollingBack) {
      setUnderstand(false);
      setReason("");
      setProgress(0);
    }
    onOpenChange(newOpen);
  };

  // Handle rollback
  const handleRollback = async () => {
    if (!understand) return;

    setIsRollingBack(true);
    setProgress(0);

    try {
      const data: RollbackData = {
        importId,
        reason: reason.trim() || undefined,
      };

      if (onConfirm) {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        await onConfirm(data);

        clearInterval(progressInterval);
        setProgress(100);

        // Wait a bit before closing
        setTimeout(() => {
          handleOpenChange(false);
        }, 500);
      } else {
        // Simulate rollback
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setProgress(i);
        }
        handleOpenChange(false);
      }
    } finally {
      setIsRollingBack(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-destructive" />

            {t.dialog.title}
          </DialogTitle>
          <DialogDescription>{t.dialog.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Alert */}
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />

            <AlertDescription>
              {t.dialog.warning.replace("{count}", eventsCount.toString())}
            </AlertDescription>
          </Alert>

          {/* Understanding Checkbox */}
          <div className="flex items-start space-x-3 rounded-lg border border-border bg-card p-4">
            <Checkbox
              id="understand"
              checked={understand}
              onCheckedChange={(checked) => setUnderstand(checked === true)}
              disabled={isRollingBack}
            />

            <div className="flex-1">
              <Label
                htmlFor="understand"
                className="cursor-pointer font-medium"
              >
                {t.dialog.understand}
              </Label>
            </div>
          </div>

          {/* Reason Textarea */}
          <div className="space-y-2">
            <Label htmlFor="reason">{t.dialog.reason}</Label>
            <Textarea
              id="reason"
              placeholder={t.dialog.reasonPlaceholder}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={200}
              rows={3}
              disabled={isRollingBack}
            />

            <p className="text-xs text-muted-foreground text-right">
              {reason.length}/200
            </p>
          </div>

          {/* Progress */}
          {isRollingBack && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />

              <p className="text-sm text-center text-muted-foreground">
                {t.dialog.progress
                  .replace(
                    "{current}",
                    Math.floor((progress / 100) * eventsCount).toString()
                  )
                  .replace("{total}", eventsCount.toString())}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isRollingBack}
          >
            {locale === "fr"
              ? "Annuler"
              : locale === "de"
                ? "Abbrechen"
                : locale === "it"
                  ? "Annulla"
                  : "Cancel"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleRollback}
            disabled={!understand || isRollingBack}
          >
            {isRollingBack ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

                {t.dialog.confirming}
              </>
            ) : (
              <>
                <UndoIcon className="mr-2 h-4 w-4" />

                {t.dialog.confirm}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
