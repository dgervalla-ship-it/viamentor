/**
 * VIAMENTOR - Marketing Manager Campaigns Section
 * Section Campagnes avec liste campagnes récentes et performance
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MailIcon,
  MessageSquareIcon,
  LayersIcon,
  ArrowRightIcon,
} from "lucide-react";
import {
  mockRecentCampaigns,
  formatPercentage,
  getCampaignStatusColor,
  type MarketingManagerLocale,
} from "@/viamentor/data/viamentor-marketing-manager-data";
import { getMarketingManagerTranslations } from "@/viamentor/data/viamentor-marketing-manager-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingManagerCampaignsSectionProps {
  locale?: MarketingManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingManagerCampaignsSection({
  locale = "fr",
}: MarketingManagerCampaignsSectionProps) {
  const t = getMarketingManagerTranslations(locale);

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return MailIcon;
      case "sms":
        return MessageSquareIcon;
      case "mixed":
        return LayersIcon;
      default:
        return MailIcon;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t.sections.campaigns}</h3>
        <Button variant="ghost" size="sm" className="gap-2">
          {t.campaigns.viewAll}
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {mockRecentCampaigns.map((campaign) => {
          const TypeIcon = getCampaignTypeIcon(campaign.type);
          return (
            <div
              key={campaign.id}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TypeIcon className="w-4 h-4 text-muted-foreground" />

                    <span className="font-medium text-sm">{campaign.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{campaign.audienceCount} contacts</span>
                    <span>•</span>
                    <span>{formatPercentage(campaign.openRate)} ouverture</span>
                    {campaign.roi !== null && (
                      <>
                        <span>•</span>
                        <span className="text-green-600">
                          {formatPercentage(campaign.roi)} ROI
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Badge
                  className={`${getCampaignStatusColor(campaign.status)} text-white text-xs`}
                >
                  {t.campaigns[campaign.status]}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
