/**
 * VIAMENTOR - Top Reviewers
 * Leaderboard top contributeurs avec gamification
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrophyIcon, AwardIcon, StarIcon } from "lucide-react";
import type { TopReviewer } from "@/viamentor/data/viamentor-reviews-analytics-data";
import type { ReviewsAnalyticsLocale } from "@/viamentor/data/viamentor-reviews-analytics-i18n";
import { reviewsAnalyticsTranslations } from "@/viamentor/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface TopReviewersProps {
  reviewers: TopReviewer[];
  locale?: ReviewsAnalyticsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TopReviewersTable({
  reviewers,
  locale = "fr",
}: TopReviewersProps) {
  const t = reviewsAnalyticsTranslations[locale];

  // Icon badge
  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case "champion":
        return <TrophyIcon className="h-4 w-4 text-yellow-500" />;

      case "elite":
        return <AwardIcon className="h-4 w-4 text-purple-600" />;

      case "contributor":
        return <StarIcon className="h-4 w-4 text-blue-600" />;

      default:
        return null;
    }
  };

  // Badge label
  const getBadgeLabel = (badge?: string) => {
    if (!badge) return null;
    return t.topReviewers.badges[badge as keyof typeof t.topReviewers.badges];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.topReviewers.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer.studentId}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                reviewer.rank === 1
                  ? "border-yellow-500/50 bg-yellow-500/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                {reviewer.rank === 1 ? (
                  <TrophyIcon className="h-5 w-5 text-yellow-500" />
                ) : (
                  <span className="font-bold text-sm">{reviewer.rank}</span>
                )}
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={reviewer.studentAvatar} />

                  <AvatarFallback>
                    {reviewer.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{reviewer.studentName}</p>
                  {reviewer.badge && (
                    <div className="flex items-center gap-1 mt-1">
                      {getBadgeIcon(reviewer.badge)}
                      <span className="text-xs text-muted-foreground">
                        {getBadgeLabel(reviewer.badge)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-bold">{reviewer.reviewsCount}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.topReviewers.reviews}
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />

                    <p className="text-sm font-bold">
                      {reviewer.averageRating.toFixed(1)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.topReviewers.rating}
                  </p>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="text-xs text-muted-foreground">
                    {new Date(reviewer.lastReviewDate).toLocaleDateString(
                      locale
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.topReviewers.lastReview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
