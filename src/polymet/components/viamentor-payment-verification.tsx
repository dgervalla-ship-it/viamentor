/**
 * VIAMENTOR - Payment Verification Component
 * Validation paiements élève pour avis vérifiés
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2Icon,
  XCircleIcon,
  MoreVerticalIcon,
  EyeOffIcon,
  MailIcon,
  FlagIcon,
} from "lucide-react";
import type { VerifiedReview } from "@/polymet/data/viamentor-reviews-verification-data";
import type { ReviewsVerificationLocale } from "@/polymet/data/viamentor-reviews-verification-i18n";
import { reviewsVerificationTranslations } from "@/polymet/data/viamentor-reviews-verification-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PaymentVerificationProps {
  review: VerifiedReview;
  locale?: ReviewsVerificationLocale;
  onHide?: (reviewId: string) => void;
  onContact?: (reviewId: string) => void;
  onMarkFraud?: (reviewId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PaymentVerification({
  review,
  locale = "fr",
  onHide,
  onContact,
  onMarkFraud,
}: PaymentVerificationProps) {
  const t = reviewsVerificationTranslations[locale];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
    }).format(amount);
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t.payment.title}</CardTitle>
          {review.studentId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onHide?.(review.id)}>
                  <EyeOffIcon className="h-4 w-4 mr-2" />

                  {t.payment.actions.hide}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onContact?.(review.id)}>
                  <MailIcon className="h-4 w-4 mr-2" />

                  {t.payment.actions.contact}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onMarkFraud?.(review.id)}
                  className="text-destructive"
                >
                  <FlagIcon className="h-4 w-4 mr-2" />

                  {t.payment.actions.markFraud}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {review.studentId ? (
          <>
            {/* Student Info */}
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">{review.studentName}</p>
              <p className="text-xs text-muted-foreground">
                ID: {review.studentId}
              </p>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {t.payment.totalPaid}
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(review.totalPaid)}
                </p>
              </div>

              {review.lastPaymentDate && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {t.payment.lastTransaction}
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(review.lastPaymentDate)}
                  </p>
                </div>
              )}
            </div>

            {/* Verification Status */}
            <div className="pt-4 border-t border-border">
              {review.verifiedPurchase ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-green-600" />

                  <div className="flex-1">
                    <p className="font-medium text-green-600">
                      {t.payment.verified}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.status.verified}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:border-green-900"
                  >
                    {t.status.verified}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircleIcon className="h-5 w-5 text-red-600" />

                  <div className="flex-1">
                    <p className="font-medium text-red-600">
                      {t.payment.noPayment}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.status.unverified}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:border-red-900"
                  >
                    {t.status.unverified}
                  </Badge>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <XCircleIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />

            <p className="text-sm">{t.matching.noMatch}</p>
            <p className="text-xs mt-1">{t.payment.noPayment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
