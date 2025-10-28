/**
 * VIAMENTOR - Campaigns Analytics Page
 * Page analytics campagnes marketing avec KPIs, ROI, conversion funnel et performance tracking
 */

"use client";

import { useState, useMemo, memo, useCallback } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  Euro,
  Target,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// ============================================================================
// TYPES
// ============================================================================

interface CampaignsAnalyticsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type CampaignChannel = "email" | "sms" | "social" | "google" | "facebook";

interface CampaignPerformance {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: "active" | "completed" | "paused";
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  roi: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockCampaigns: CampaignPerformance[] = [
  {
    id: "1",
    name: "Promotion Rentrée 2025",
    channel: "email",
    status: "active",
    startDate: new Date(2025, 0, 15),
    budget: 2000,
    spent: 1200,
    impressions: 15000,
    clicks: 450,
    conversions: 35,
    revenue: 8750,
    ctr: 3.0,
    cpc: 2.67,
    roi: 629,
  },
  {
    id: "2",
    name: "Google Ads - Permis B",
    channel: "google",
    status: "active",
    startDate: new Date(2025, 0, 1),
    budget: 5000,
    spent: 3800,
    impressions: 45000,
    clicks: 1200,
    conversions: 85,
    revenue: 21250,
    ctr: 2.67,
    cpc: 3.17,
    roi: 459,
  },
  {
    id: "3",
    name: "Facebook - Cours théoriques",
    channel: "facebook",
    status: "completed",
    startDate: new Date(2024, 11, 1),
    endDate: new Date(2024, 11, 31),
    budget: 1500,
    spent: 1500,
    impressions: 25000,
    clicks: 650,
    conversions: 42,
    revenue: 6300,
    ctr: 2.6,
    cpc: 2.31,
    roi: 320,
  },
  {
    id: "4",
    name: "SMS - Rappel examens",
    channel: "sms",
    status: "completed",
    startDate: new Date(2024, 11, 15),
    endDate: new Date(2024, 11, 20),
    budget: 500,
    spent: 480,
    impressions: 3500,
    clicks: 280,
    conversions: 28,
    revenue: 2800,
    ctr: 8.0,
    cpc: 1.71,
    roi: 483,
  },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Analytics Campagnes",
    description: "Analyse de performance et ROI des campagnes marketing",
    tabs: {
      overview: "Vue d'ensemble",
      campaigns: "Campagnes",
      channels: "Canaux",
      funnel: "Tunnel de conversion",
    },
    stats: {
      totalSpent: "Dépenses totales",
      totalRevenue: "Revenus générés",
      avgROI: "ROI moyen",
      totalConversions: "Conversions totales",
      avgCTR: "CTR moyen",
      avgCPC: "CPC moyen",
    },
    filters: {
      period: "Période",
      channel: "Canal",
      status: "Statut",
      all: "Tous",
    },
    periods: {
      "7d": "7 derniers jours",
      "30d": "30 derniers jours",
      "90d": "90 derniers jours",
      "1y": "1 an",
    },
    channels: {
      email: "Email",
      sms: "SMS",
      social: "Réseaux sociaux",
      google: "Google Ads",
      facebook: "Facebook Ads",
    },
    status: {
      active: "Active",
      completed: "Terminée",
      paused: "En pause",
    },
    table: {
      campaign: "Campagne",
      channel: "Canal",
      status: "Statut",
      budget: "Budget",
      spent: "Dépensé",
      impressions: "Impressions",
      clicks: "Clics",
      conversions: "Conversions",
      revenue: "Revenus",
      roi: "ROI",
      ctr: "CTR",
      cpc: "CPC",
    },
    actions: {
      export: "Exporter",
      refresh: "Actualiser",
    },
    funnel: {
      title: "Tunnel de conversion",
      impressions: "Impressions",
      clicks: "Clics",
      leads: "Leads",
      conversions: "Conversions",
    },
  },
  de: {
    title: "Kampagnen-Analytics",
    description: "Leistungs- und ROI-Analyse von Marketingkampagnen",
    tabs: {
      overview: "Übersicht",
      campaigns: "Kampagnen",
      channels: "Kanäle",
      funnel: "Conversion-Funnel",
    },
    stats: {
      totalSpent: "Gesamtausgaben",
      totalRevenue: "Generierte Einnahmen",
      avgROI: "Durchschnittlicher ROI",
      totalConversions: "Gesamtkonversionen",
      avgCTR: "Durchschnittliche CTR",
      avgCPC: "Durchschnittlicher CPC",
    },
    filters: {
      period: "Zeitraum",
      channel: "Kanal",
      status: "Status",
      all: "Alle",
    },
    periods: {
      "7d": "Letzte 7 Tage",
      "30d": "Letzte 30 Tage",
      "90d": "Letzte 90 Tage",
      "1y": "1 Jahr",
    },
    channels: {
      email: "E-Mail",
      sms: "SMS",
      social: "Soziale Medien",
      google: "Google Ads",
      facebook: "Facebook Ads",
    },
    status: {
      active: "Aktiv",
      completed: "Abgeschlossen",
      paused: "Pausiert",
    },
    table: {
      campaign: "Kampagne",
      channel: "Kanal",
      status: "Status",
      budget: "Budget",
      spent: "Ausgegeben",
      impressions: "Impressionen",
      clicks: "Klicks",
      conversions: "Konversionen",
      revenue: "Einnahmen",
      roi: "ROI",
      ctr: "CTR",
      cpc: "CPC",
    },
    actions: {
      export: "Exportieren",
      refresh: "Aktualisieren",
    },
    funnel: {
      title: "Conversion-Funnel",
      impressions: "Impressionen",
      clicks: "Klicks",
      leads: "Leads",
      conversions: "Konversionen",
    },
  },
  it: {
    title: "Analytics Campagne",
    description: "Analisi delle prestazioni e ROI delle campagne marketing",
    tabs: {
      overview: "Panoramica",
      campaigns: "Campagne",
      channels: "Canali",
      funnel: "Funnel di conversione",
    },
    stats: {
      totalSpent: "Spese totali",
      totalRevenue: "Ricavi generati",
      avgROI: "ROI medio",
      totalConversions: "Conversioni totali",
      avgCTR: "CTR medio",
      avgCPC: "CPC medio",
    },
    filters: {
      period: "Periodo",
      channel: "Canale",
      status: "Stato",
      all: "Tutti",
    },
    periods: {
      "7d": "Ultimi 7 giorni",
      "30d": "Ultimi 30 giorni",
      "90d": "Ultimi 90 giorni",
      "1y": "1 anno",
    },
    channels: {
      email: "Email",
      sms: "SMS",
      social: "Social media",
      google: "Google Ads",
      facebook: "Facebook Ads",
    },
    status: {
      active: "Attiva",
      completed: "Completata",
      paused: "In pausa",
    },
    table: {
      campaign: "Campagna",
      channel: "Canale",
      status: "Stato",
      budget: "Budget",
      spent: "Speso",
      impressions: "Impressioni",
      clicks: "Clic",
      conversions: "Conversioni",
      revenue: "Ricavi",
      roi: "ROI",
      ctr: "CTR",
      cpc: "CPC",
    },
    actions: {
      export: "Esporta",
      refresh: "Aggiorna",
    },
    funnel: {
      title: "Funnel di conversione",
      impressions: "Impressioni",
      clicks: "Clic",
      leads: "Lead",
      conversions: "Conversioni",
    },
  },
  en: {
    title: "Campaigns Analytics",
    description: "Performance and ROI analysis of marketing campaigns",
    tabs: {
      overview: "Overview",
      campaigns: "Campaigns",
      channels: "Channels",
      funnel: "Conversion funnel",
    },
    stats: {
      totalSpent: "Total spent",
      totalRevenue: "Revenue generated",
      avgROI: "Average ROI",
      totalConversions: "Total conversions",
      avgCTR: "Average CTR",
      avgCPC: "Average CPC",
    },
    filters: {
      period: "Period",
      channel: "Channel",
      status: "Status",
      all: "All",
    },
    periods: {
      "7d": "Last 7 days",
      "30d": "Last 30 days",
      "90d": "Last 90 days",
      "1y": "1 year",
    },
    channels: {
      email: "Email",
      sms: "SMS",
      social: "Social media",
      google: "Google Ads",
      facebook: "Facebook Ads",
    },
    status: {
      active: "Active",
      completed: "Completed",
      paused: "Paused",
    },
    table: {
      campaign: "Campaign",
      channel: "Channel",
      status: "Status",
      budget: "Budget",
      spent: "Spent",
      impressions: "Impressions",
      clicks: "Clicks",
      conversions: "Conversions",
      revenue: "Revenue",
      roi: "ROI",
      ctr: "CTR",
      cpc: "CPC",
    },
    actions: {
      export: "Export",
      refresh: "Refresh",
    },
    funnel: {
      title: "Conversion funnel",
      impressions: "Impressions",
      clicks: "Clicks",
      leads: "Leads",
      conversions: "Conversions",
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getChannelIcon = (channel: CampaignChannel) => {
  switch (channel) {
    case "email":
      return Mail;
    case "sms":
      return MessageSquare;
    case "social":
      return Users;
    case "google":
      return Target;
    case "facebook":
      return Users;
    default:
      return Target;
  }
};

const getChannelColor = (channel: CampaignChannel) => {
  switch (channel) {
    case "email":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "sms":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "social":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "google":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "facebook":
      return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "completed":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "paused":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

// ============================================================================
// COMPONENT
// ============================================================================

export function CampaignsAnalyticsPage({
  locale = "fr",
}: CampaignsAnalyticsPageProps) {
  const t = translations[locale];
  const [period, setPeriod] = useState("30d");
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // ============================================================================
  // OPTIMISATION PERFORMANCE - useMemo pour calculs coûteux
  // ============================================================================

  // Calculate global stats - Memoized pour éviter recalculs
  const globalStats = useMemo(() => {
    const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = mockCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    const totalConversions = mockCampaigns.reduce(
      (sum, c) => sum + c.conversions,
      0
    );
    const avgROI =
      mockCampaigns.reduce((sum, c) => sum + c.roi, 0) / mockCampaigns.length;
    const avgCTR =
      mockCampaigns.reduce((sum, c) => sum + c.ctr, 0) / mockCampaigns.length;
    const avgCPC =
      mockCampaigns.reduce((sum, c) => sum + c.cpc, 0) / mockCampaigns.length;

    return {
      totalSpent,
      totalRevenue,
      totalConversions,
      avgROI,
      avgCTR,
      avgCPC,
    };
  }, []);

  // Filtered campaigns - Memoized pour éviter filtrage répété
  const filteredCampaigns = useMemo(
    () =>
      mockCampaigns.filter((campaign) => {
        const matchesChannel =
          channelFilter === "all" || campaign.channel === channelFilter;
        const matchesStatus =
          statusFilter === "all" || campaign.status === statusFilter;
        return matchesChannel && matchesStatus;
      }),
    [channelFilter, statusFilter]
  );

  // Funnel data - Memoized
  const funnelData = useMemo(() => {
    const totalImpressions = mockCampaigns.reduce(
      (sum, c) => sum + c.impressions,
      0
    );
    const totalClicks = mockCampaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalLeads = Math.floor(globalStats.totalConversions * 1.5);

    return { totalImpressions, totalClicks, totalLeads };
  }, [globalStats.totalConversions]);

  // Destructure stats
  const { totalSpent, totalRevenue, totalConversions, avgROI, avgCTR, avgCPC } =
    globalStats;
  const { totalImpressions, totalClicks, totalLeads } = funnelData;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />

            {t.actions.refresh}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />

            {t.actions.export}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Calendar className="h-4 w-4 mr-2" />

                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">{t.periods["7d"]}</SelectItem>
                <SelectItem value="30d">{t.periods["30d"]}</SelectItem>
                <SelectItem value="90d">{t.periods["90d"]}</SelectItem>
                <SelectItem value="1y">{t.periods["1y"]}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t.filters.channel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="email">{t.channels.email}</SelectItem>
                <SelectItem value="sms">{t.channels.sms}</SelectItem>
                <SelectItem value="google">{t.channels.google}</SelectItem>
                <SelectItem value="facebook">{t.channels.facebook}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t.filters.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="active">{t.status.active}</SelectItem>
                <SelectItem value="completed">{t.status.completed}</SelectItem>
                <SelectItem value="paused">{t.status.paused}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalSpent}
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSpent)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalRevenue}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.avgROI}
            </CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {formatPercentage(avgROI)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalConversions}
            </CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {totalConversions}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.avgCTR}
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {formatPercentage(avgCTR)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.avgCPC}
            </CardTitle>
            <Euro className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {formatCurrency(avgCPC)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">{t.tabs.campaigns}</TabsTrigger>
          <TabsTrigger value="funnel">{t.tabs.funnel}</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.table.campaign}</TableHead>
                    <TableHead>{t.table.channel}</TableHead>
                    <TableHead>{t.table.status}</TableHead>
                    <TableHead className="text-right">
                      {t.table.budget}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.spent}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.impressions}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.clicks}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.conversions}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.revenue}
                    </TableHead>
                    <TableHead className="text-right">{t.table.roi}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => {
                    const ChannelIcon = getChannelIcon(campaign.channel);
                    const budgetUsed = (campaign.spent / campaign.budget) * 100;

                    return (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getChannelColor(campaign.channel)}
                          >
                            <ChannelIcon className="h-3 w-3 mr-1" />

                            {t.channels[campaign.channel]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(campaign.status)}
                          >
                            {t.status[campaign.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="space-y-1">
                            <div className="font-medium">
                              {formatCurrency(campaign.budget)}
                            </div>
                            <Progress value={budgetUsed} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(campaign.spent)}
                        </TableCell>
                        <TableCell className="text-right">
                          {campaign.impressions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <div className="font-medium">
                              {campaign.clicks.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatPercentage(campaign.ctr)} CTR
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {campaign.conversions}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-medium text-green-500">
                            {formatCurrency(campaign.revenue)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {campaign.roi > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={
                                campaign.roi > 0
                                  ? "font-bold text-green-500"
                                  : "font-bold text-red-500"
                              }
                            >
                              {formatPercentage(campaign.roi)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Funnel Tab */}
        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.funnel.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Impressions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />

                    <span className="font-medium">{t.funnel.impressions}</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {totalImpressions.toLocaleString()}
                  </span>
                </div>
                <Progress value={100} className="h-3" />
              </div>

              {/* Clicks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-5 w-5 text-green-500" />

                    <span className="font-medium">{t.funnel.clicks}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {totalClicks.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatPercentage((totalClicks / totalImpressions) * 100)}
                    </div>
                  </div>
                </div>
                <Progress
                  value={(totalClicks / totalImpressions) * 100}
                  className="h-3"
                />
              </div>

              {/* Leads */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />

                    <span className="font-medium">{t.funnel.leads}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {totalLeads.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatPercentage((totalLeads / totalClicks) * 100)}
                    </div>
                  </div>
                </div>
                <Progress
                  value={(totalLeads / totalImpressions) * 100}
                  className="h-3"
                />
              </div>

              {/* Conversions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />

                    <span className="font-medium">{t.funnel.conversions}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {totalConversions.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatPercentage((totalConversions / totalLeads) * 100)}
                    </div>
                  </div>
                </div>
                <Progress
                  value={(totalConversions / totalImpressions) * 100}
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CampaignsAnalyticsPage;
