/**
 * VIAMENTOR - Marketing Manager Monitoring Section
 * Section Monitoring avec pixels health et reviews stats
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, StarIcon, ArrowRightIcon } from "lucide-react";
import {
  mockPixelsHealth,
  mockReviewsStats,
  formatPercentage,
  getPixelStatusColor,
  type MarketingManagerLocale,
} from "@/viamentor/data/viamentor-marketing-manager-data";
import { getMarketingManagerTranslations } from "@/viamentor/data/viamentor-marketing-manager-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingManagerMonitoringSectionProps {
  locale?: MarketingManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingManagerMonitoringSection({
  locale = "fr",
}: MarketingManagerMonitoringSectionProps) {
  const t = getMarketingManagerTranslations(locale);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pixels Health */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t.sections.pixels}</h3>
          <Button variant="ghost" size="sm" className="gap-2">
            {t.pixels.viewHealth}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {mockPixelsHealth.map((pixel) => (
            <div
              key={pixel.platform}
              className="flex items-center justify-between p-3 border border-border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <ActivityIcon className="w-5 h-5 text-muted-foreground" />

                <div>
                  <div className="font-medium text-sm">{pixel.platform}</div>
                  <div className="text-xs text-muted-foreground">
                    {pixel.eventsToday} {t.pixels.events.toLowerCase()}
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${getPixelStatusColor(pixel.status)} border-current`}
              >
                {t.pixels[pixel.status]}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t.sections.reviews}</h3>
          <Button variant="ghost" size="sm" className="gap-2">
            {t.reviews.viewAll}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />

              <div>
                <div className="font-medium text-sm">{t.reviews.avgRating}</div>
                <div className="text-xs text-muted-foreground">
                  {mockReviewsStats.totalReviews}{" "}
                  {t.reviews.totalReviews.toLowerCase()}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {mockReviewsStats.avgRating.toFixed(1)}
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">
                {t.reviews.pending}
              </div>
              <div className="text-2xl font-bold">
                {mockReviewsStats.pendingModeration}
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-orange-500/10 text-orange-600 border-orange-500/20"
            >
              À modérer
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">
                Taux de réponse
              </div>
              <div className="text-2xl font-bold">
                {formatPercentage(mockReviewsStats.responseRate)}
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-600 border-green-500/20"
            >
              Excellent
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
