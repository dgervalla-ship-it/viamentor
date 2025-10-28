/**
 * VIAMENTOR - Staff Marketing Campaigns Page
 * Page principale campagnes marketing avec stats KPIs, liste campaigns, filtres, wizard création
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusIcon,
  SearchIcon,
  MailIcon,
  MessageSquareIcon,
  LayersIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeIcon,
  MousePointerClickIcon,
  CheckCircle2Icon,
  DollarSignIcon,
} from "lucide-react";
import {
  mockCampaigns,
  mockCampaignStats,
  mockTeamMembers,
  getCampaignStatusColor,
  getCampaignTypeIcon,
  formatPercentage,
  formatCurrency,
  getROIColor,
  type Campaign,
  type CampaignsLocale,
} from "@/polymet/data/viamentor-campaigns-data";
import { getCampaignsTranslations } from "@/polymet/data/viamentor-campaigns-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StaffCampaignsPageProps {
  locale?: CampaignsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StaffCampaignsPage({ locale = "fr" }: StaffCampaignsPageProps) {
  const t = getCampaignsTranslations(locale);
  const [search, setSearch] = useState("");
  const [createWizardOpen, setCreateWizardOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  // Filter campaigns by search
  const filteredCampaigns = mockCampaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
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

  const getCreatorName = (userId: string) => {
    const member = mockTeamMembers.find((m) => m.id === userId);
    return member?.name || "Unknown";
  };

  const getCreatorAvatar = (userId: string) => {
    const member = mockTeamMembers.find((m) => m.id === userId);
    return member?.avatar || "";
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            {t.page.breadcrumb}
          </div>
          <h1 className="text-3xl font-bold">{t.page.title}</h1>
        </div>
        <Button onClick={() => setCreateWizardOpen(true)} className="gap-2">
          <PlusIcon className="w-4 h-4" />

          {t.page.createCampaign}
        </Button>
      </div>

      {/* Stats KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.totalCampaigns}
            </span>
            <LayersIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {mockCampaignStats.totalCampaigns}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {mockCampaignStats.activeCampaigns}{" "}
            {t.stats.activeCampaigns.toLowerCase()}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.avgOpenRate}
            </span>
            <EyeIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {formatPercentage(mockCampaignStats.avgOpenRate)}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <TrendingUpIcon className="w-3 h-3" />
            +2.3% vs mois dernier
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.avgClickRate}
            </span>
            <MousePointerClickIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">
            {formatPercentage(mockCampaignStats.avgClickRate)}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <TrendingUpIcon className="w-3 h-3" />
            +1.8% vs mois dernier
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.avgROI}
            </span>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className={`text-2xl font-bold ${getROIColor(mockCampaignStats.avgROI)}`}
          >
            {formatPercentage(mockCampaignStats.avgROI)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {formatCurrency(mockCampaignStats.totalRevenue, locale)}{" "}
            {t.stats.totalRevenue.toLowerCase()}
          </div>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder="Rechercher une campagne..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-3">
        {filteredCampaigns.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Aucune campagne trouvée</p>
          </Card>
        ) : (
          filteredCampaigns.map((campaign) => {
            const TypeIcon = getTypeIcon(campaign.type);
            return (
              <Card
                key={campaign.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Campaign Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <Badge
                        className={`${getCampaignStatusColor(campaign.status)} text-white`}
                      >
                        {t.statuses[campaign.status]}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <TypeIcon className="w-3 h-3" />

                        {t.types[campaign.type]}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {campaign.objective}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">
                          {t.table.audience}
                        </div>
                        <div className="font-medium">
                          {campaign.audienceCount}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          {t.table.sent}
                        </div>
                        <div className="font-medium">{campaign.sentCount}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          {t.table.opens}
                        </div>
                        <div className="font-medium">
                          {formatPercentage(campaign.openRate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          {t.table.clicks}
                        </div>
                        <div className="font-medium">
                          {formatPercentage(campaign.clickRate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          {t.table.conversions}
                        </div>
                        <div className="font-medium">
                          {campaign.convertedCount} (
                          {formatPercentage(campaign.conversionRate)})
                        </div>
                      </div>
                      {campaign.roi !== null && (
                        <div>
                          <div className="text-muted-foreground">
                            {t.table.roi}
                          </div>
                          <div
                            className={`font-medium ${getROIColor(campaign.roi)}`}
                          >
                            {formatPercentage(campaign.roi)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Creator & Date */}
                  <div className="flex flex-col items-end gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={getCreatorAvatar(campaign.createdBy)}
                        />

                        <AvatarFallback>
                          {getCreatorName(campaign.createdBy)[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">
                        {getCreatorName(campaign.createdBy)}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(campaign.createdAt).toLocaleDateString(locale)}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Note: Wizard and Detail components would be imported here */}
      {createWizardOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{t.wizard.title}</h2>
            <p className="text-muted-foreground mb-4">
              Wizard component would be rendered here with 4 steps
            </p>
            <Button onClick={() => setCreateWizardOpen(false)}>Close</Button>
          </Card>
        </div>
      )}
    </div>
  );
}
