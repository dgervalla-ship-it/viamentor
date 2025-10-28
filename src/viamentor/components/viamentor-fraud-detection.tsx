/**
 * VIAMENTOR - Fraud Detection Component
 * Détection fraude ML avec analyse patterns
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangleIcon,
  ShieldAlertIcon,
  CheckCircle2Icon,
} from "lucide-react";
import type {
  VerifiedReview,
  FraudAnalysis,
} from "@/viamentor/data/viamentor-reviews-verification-data";
import type { ReviewsVerificationLocale } from "@/viamentor/data/viamentor-reviews-verification-i18n";
import { reviewsVerificationTranslations } from "@/viamentor/data/viamentor-reviews-verification-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FraudDetectionProps {
  review: VerifiedReview;
  analysis?: FraudAnalysis;
  locale?: ReviewsVerificationLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FraudDetection({
  review,
  analysis,
  locale = "fr",
}: FraudDetectionProps) {
  const t = reviewsVerificationTranslations[locale];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-600";
    if (score >= 40) return "text-orange-600";
    return "text-green-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-red-600";
    if (score >= 40) return "bg-orange-600";
    return "bg-green-600";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "flag":
        return <ShieldAlertIcon className="h-5 w-5 text-red-600" />;

      case "investigate":
        return <AlertTriangleIcon className="h-5 w-5 text-orange-600" />;

      default:
        return <CheckCircle2Icon className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.fraud.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Fraud Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t.fraud.score}</span>
            <span
              className={`text-2xl font-bold ${getScoreColor(review.fraudScore)}`}
            >
              {review.fraudScore}/100
            </span>
          </div>
          <Progress
            value={review.fraudScore}
            className="h-2"
            indicatorClassName={getScoreBgColor(review.fraudScore)}
          />
        </div>

        {/* Recommendation */}
        {analysis && (
          <Alert
            className={
              analysis.recommendation === "flag"
                ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
                : analysis.recommendation === "investigate"
                  ? "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950"
                  : "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
            }
          >
            {getRecommendationIcon(analysis.recommendation)}
            <AlertDescription
              className={
                analysis.recommendation === "flag"
                  ? "text-red-900 dark:text-red-100"
                  : analysis.recommendation === "investigate"
                    ? "text-orange-900 dark:text-orange-100"
                    : "text-green-900 dark:text-green-100"
              }
            >
              <span className="font-medium">
                {t.fraud.recommendation[analysis.recommendation]}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* Fraud Factors */}
        {analysis && analysis.factors.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Facteurs détectés:</p>
            <div className="space-y-2">
              {analysis.factors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 border border-border rounded-lg"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {t.fraud.factors[factor.type]}
                      </p>
                      <Badge
                        variant="outline"
                        className={getSeverityColor(factor.severity)}
                      >
                        {t.fraud.severity[factor.severity]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {factor.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Poids: {factor.weight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Factors */}
        {(!analysis || analysis.factors.length === 0) &&
          review.fraudScore < 40 && (
            <div className="py-4 text-center text-muted-foreground">
              <CheckCircle2Icon className="h-12 w-12 mx-auto mb-2 text-green-600 opacity-50" />

              <p className="text-sm">Aucun facteur de fraude détecté</p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
