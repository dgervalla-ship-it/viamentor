/**
 * VIAMENTOR - Contest Review Component
 * Contestation avis frauduleux avec wizard
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlagIcon, UploadIcon, CheckCircle2Icon } from "lucide-react";
import type {
  VerifiedReview,
  ContestReason,
} from "@/viamentor/data/viamentor-reviews-verification-data";
import type { ReviewsVerificationLocale } from "@/viamentor/data/viamentor-reviews-verification-i18n";
import { reviewsVerificationTranslations } from "@/viamentor/data/viamentor-reviews-verification-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ContestReviewProps {
  review: VerifiedReview;
  locale?: ReviewsVerificationLocale;
  onSubmit?: (
    reviewId: string,
    reason: ContestReason,
    explanation: string,
    evidence: File[]
  ) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ContestReview({
  review,
  locale = "fr",
  onSubmit,
}: ContestReviewProps) {
  const t = reviewsVerificationTranslations[locale];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState<ContestReason | "">("");
  const [explanation, setExplanation] = useState("");
  const [evidence, setEvidence] = useState<File[]>([]);

  const handleSubmit = () => {
    if (reason && explanation && onSubmit) {
      onSubmit(review.id, reason as ContestReason, explanation, evidence);
      setOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setStep(1);
    setReason("");
    setExplanation("");
    setEvidence([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidence(Array.from(e.target.files));
    }
  };

  const getStatusBadge = () => {
    if (!review.contestStatus) return null;

    const colors = {
      pending: "bg-orange-100 text-orange-700 border-orange-200",
      accepted: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      partial: "bg-blue-100 text-blue-700 border-blue-200",
    };

    return (
      <Badge variant="outline" className={colors[review.contestStatus]}>
        {t.contest.status[review.contestStatus]}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {review.contestedAt && getStatusBadge()}
        </div>
        <Button
          onClick={() => setOpen(true)}
          variant={review.fraudScore >= 70 ? "destructive" : "outline"}
          size="sm"
        >
          <FlagIcon className="h-4 w-4 mr-2" />

          {t.contest.button}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.contest.title}</DialogTitle>
            <DialogDescription>
              Étape {step}/4:{" "}
              {
                t.contest.steps[
                  step === 1
                    ? "reason"
                    : step === 2
                      ? "evidence"
                      : step === 3
                        ? "explanation"
                        : "review"
                ]
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Step 1: Reason */}
            {step === 1 && (
              <div className="space-y-2">
                <Label>{t.contest.steps.reason}</Label>
                <Select
                  value={reason}
                  onValueChange={(v) => setReason(v as ContestReason)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une raison" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(t.contest.reasons) as ContestReason[]).map(
                      (key) => (
                        <SelectItem key={key} value={key}>
                          {t.contest.reasons[key]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 2: Evidence */}
            {step === 2 && (
              <div className="space-y-2">
                <Label>{t.contest.steps.evidence}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <UploadIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />

                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="evidence-upload"
                  />

                  <label htmlFor="evidence-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>{t.common.upload}</span>
                    </Button>
                  </label>
                  {evidence.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {evidence.length} fichier(s) sélectionné(s)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Explanation */}
            {step === 3 && (
              <div className="space-y-2">
                <Label>{t.contest.steps.explanation}</Label>
                <Textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Expliquez en détail pourquoi cet avis est frauduleux..."
                  rows={8}
                  maxLength={500}
                />

                <p className="text-xs text-muted-foreground text-right">
                  {explanation.length}/500
                </p>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div>
                    <p className="text-sm font-medium">Raison:</p>
                    <p className="text-sm">
                      {reason && t.contest.reasons[reason as ContestReason]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Preuves:</p>
                    <p className="text-sm">{evidence.length} fichier(s)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Explication:</p>
                    <p className="text-sm">{explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Précédent
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !reason}
              >
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!reason || !explanation}>
                <CheckCircle2Icon className="h-4 w-4 mr-2" />

                {t.contest.submit}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
