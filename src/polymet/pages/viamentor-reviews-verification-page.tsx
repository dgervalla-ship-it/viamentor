/**
 * VIAMENTOR - Reviews Verification Page
 * Page principale vérification authenticité avis Google
 */

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  FlagIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { ReviewMatching } from "@/polymet/components/viamentor-review-matching";
import { PaymentVerification } from "@/polymet/components/viamentor-payment-verification";
import { FraudDetection } from "@/polymet/components/viamentor-fraud-detection";
import { ContestReview } from "@/polymet/components/viamentor-contest-review";
import {
  mockVerifiedReviews,
  mockVerificationStats,
  mockFraudAnalyses,
  mockMatchCandidates,
} from "@/polymet/data/viamentor-reviews-verification-data";
import { reviewsVerificationTranslations } from "@/polymet/data/viamentor-reviews-verification-i18n";
import type { ReviewsVerificationLocale } from "@/polymet/data/viamentor-reviews-verification-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ReviewsVerificationPageProps {
  locale?: ReviewsVerificationLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ReviewsVerificationPage({
  locale = "fr",
}: ReviewsVerificationPageProps) {
  const t = reviewsVerificationTranslations[locale];
  const [selectedReview, setSelectedReview] = useState(mockVerifiedReviews[0]);

  const stats = mockVerificationStats;

  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t.page.breadcrumb}</span>
        </div>
        <h3 className="text-2xl font-semibold text-foreground">
          {t.page.title}
        </h3>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.stats.verified}
                </span>
                <CheckCircle2Icon className="h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.verified}</p>
                <div className="flex items-center gap-2">
                  <Progress value={stats.verifiedPercentage} className="h-2" />

                  <span className="text-xs text-muted-foreground">
                    {stats.verifiedPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.stats.unverified}
                </span>
                <AlertCircleIcon className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold">{stats.unverified}</p>
              <Badge variant="outline" className="text-orange-600">
                Action requise
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.stats.contested}
                </span>
                <FlagIcon className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold">{stats.contested}</p>
              <p className="text-xs text-muted-foreground">En attente Google</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.stats.fraudulent}
                </span>
                <ShieldAlertIcon className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold">{stats.fraudulent}</p>
              <Badge variant="outline" className="text-red-600">
                Sécurité
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-4">Avis récents</h4>
            <div className="space-y-2">
              {mockVerifiedReviews.map((review) => (
                <button
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedReview.id === review.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{review.authorName}</p>
                    <Badge
                      variant="outline"
                      className={
                        review.status === "verified"
                          ? "text-green-600"
                          : review.status === "fraudulent"
                            ? "text-red-600"
                            : "text-orange-600"
                      }
                    >
                      {t.status[review.status]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs">
                      Score: {review.fraudScore}/100
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {selectedReview.authorName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedReview.text}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">
                      Note: {selectedReview.rating}/5
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedReview.reviewDate).toLocaleDateString(
                        locale
                      )}
                    </span>
                  </div>
                </div>

                <ContestReview
                  review={selectedReview}
                  locale={locale}
                  onSubmit={(id, reason, explanation) =>
                    console.log("Contest:", { id, reason, explanation })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="matching" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="matching">Matching</TabsTrigger>
              <TabsTrigger value="payment">Paiement</TabsTrigger>
              <TabsTrigger value="fraud">Fraude</TabsTrigger>
            </TabsList>

            <TabsContent value="matching" className="mt-4">
              <ReviewMatching
                review={selectedReview}
                candidates={
                  selectedReview.id === "review-5" ? mockMatchCandidates : []
                }
                locale={locale}
                onConfirmMatch={(reviewId, studentId) =>
                  console.log("Match:", reviewId, studentId)
                }
              />
            </TabsContent>

            <TabsContent value="payment" className="mt-4">
              <PaymentVerification
                review={selectedReview}
                locale={locale}
                onHide={(id) => console.log("Hide:", id)}
                onContact={(id) => console.log("Contact:", id)}
                onMarkFraud={(id) => console.log("Mark fraud:", id)}
              />
            </TabsContent>

            <TabsContent value="fraud" className="mt-4">
              <FraudDetection
                review={selectedReview}
                analysis={mockFraudAnalyses.find(
                  (a) => a.reviewId === selectedReview.id
                )}
                locale={locale}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
