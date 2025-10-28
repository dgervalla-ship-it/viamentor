/**
 * VIAMENTOR - Review Matching Component
 * Matching automatique élèves avec disambiguation
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
} from "lucide-react";
import type {
  VerifiedReview,
  MatchCandidate,
} from "@/polymet/data/viamentor-reviews-verification-data";
import type { ReviewsVerificationLocale } from "@/polymet/data/viamentor-reviews-verification-i18n";
import { reviewsVerificationTranslations } from "@/polymet/data/viamentor-reviews-verification-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ReviewMatchingProps {
  review: VerifiedReview;
  candidates?: MatchCandidate[];
  locale?: ReviewsVerificationLocale;
  autoMatchEnabled?: boolean;
  onToggleAutoMatch?: (enabled: boolean) => void;
  onConfirmMatch?: (reviewId: string, studentId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ReviewMatching({
  review,
  candidates = [],
  locale = "fr",
  autoMatchEnabled = true,
  onToggleAutoMatch,
  onConfirmMatch,
}: ReviewMatchingProps) {
  const t = reviewsVerificationTranslations[locale];
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");

  const handleConfirmMatch = () => {
    if (selectedCandidate && onConfirmMatch) {
      onConfirmMatch(review.id, selectedCandidate);
      setShowDialog(false);
      setSelectedCandidate("");
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "-";
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t.matching.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                id="auto-match"
                checked={autoMatchEnabled}
                onCheckedChange={onToggleAutoMatch}
              />

              <Label htmlFor="auto-match" className="text-sm cursor-pointer">
                {t.matching.autoToggle}
              </Label>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Status Auto Match */}
          {autoMatchEnabled && (
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
              <CheckCircle2Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />

              <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                {t.matching.autoEnabled}
              </AlertDescription>
            </Alert>
          )}

          {/* Review Author Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                <UserIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{review.authorName}</p>
              {review.authorEmail && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MailIcon className="h-3 w-3" />

                  {review.authorEmail}
                </p>
              )}
            </div>
          </div>

          {/* Matching Result */}
          {review.studentId && review.matchConfidence !== undefined ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="h-5 w-5 text-green-600" />

                <span className="font-medium text-green-600">
                  {t.status.verified}
                </span>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {review.studentName}
                  </span>
                  <Badge variant="outline" className="text-green-600">
                    {t.matching.similarity}: {review.matchConfidence}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  ID: {review.studentId}
                </p>
              </div>
            </div>
          ) : candidates.length > 0 ? (
            <div className="space-y-3">
              <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
                <AlertCircleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />

                <AlertDescription className="text-sm text-orange-900 dark:text-orange-100">
                  {t.matching.multipleMatches}
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => setShowDialog(true)}
                variant="outline"
                className="w-full"
              >
                {t.matching.selectCandidate} ({candidates.length})
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircleIcon className="h-5 w-5 text-orange-600" />

                <span className="font-medium text-orange-600">
                  {t.matching.noMatch}
                </span>
              </div>

              <Badge variant="outline" className="text-orange-600">
                {t.matching.noMatch}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disambiguation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.matching.multipleMatches}</DialogTitle>
            <DialogDescription>{t.matching.selectCandidate}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <RadioGroup
              value={selectedCandidate}
              onValueChange={setSelectedCandidate}
            >
              {candidates.map((candidate) => (
                <div
                  key={candidate.studentId}
                  className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedCandidate(candidate.studentId)}
                >
                  <RadioGroupItem
                    value={candidate.studentId}
                    id={candidate.studentId}
                  />

                  <Label
                    htmlFor={candidate.studentId}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar} />

                        <AvatarFallback>
                          {candidate.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{candidate.fullName}</p>
                          <Badge variant="outline">
                            {t.matching.similarity}:{" "}
                            {candidate.similarity.toFixed(0)}%
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MailIcon className="h-3 w-3" />

                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <PhoneIcon className="h-3 w-3" />

                            {candidate.phone}
                          </div>
                          {candidate.lastLessonDate && (
                            <div className="flex items-center gap-1 col-span-2">
                              <CalendarIcon className="h-3 w-3" />
                              {t.matching.lastLesson}:{" "}
                              {formatDate(candidate.lastLessonDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {t.common.cancel}
            </Button>
            <Button onClick={handleConfirmMatch} disabled={!selectedCandidate}>
              {t.matching.confirmMatch}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
