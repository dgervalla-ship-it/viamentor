/**
 * VIAMENTOR - Platform Analytics Page
 * Analytics multi-tenant pour Super Admin
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUpIcon,
  UsersIcon,
  BuildingIcon,
  DollarSignIcon,
  ActivityIcon,
  DownloadIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAnalyticsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Analytics Plateforme",
    description:
      "Métriques et analytics multi-tenant de la plateforme ViaMenutor",
    period: "Période",
    export: "Exporter",
    tabs: {
      overview: "Vue d'ensemble",
      tenants: "Tenants",
      revenue: "Revenus",
      usage: "Utilisation",
    },
    kpis: {
      totalTenants: "Tenants Actifs",
      totalUsers: "Utilisateurs Total",
      monthlyRevenue: "Revenus Mensuels",
      avgUsage: "Utilisation Moyenne",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockKPIs = [
  {
    id: "tenants",
    label: "Tenants Actifs",
    value: "127",
    change: "+12%",
    trend: "up" as const,
    icon: BuildingIcon,
  },
  {
    id: "users",
    label: "Utilisateurs Total",
    value: "8,543",
    change: "+18%",
    trend: "up" as const,
    icon: UsersIcon,
  },
  {
    id: "revenue",
    label: "Revenus Mensuels",
    value: "CHF 45,230",
    change: "+8%",
    trend: "up" as const,
    icon: DollarSignIcon,
  },
  {
    id: "usage",
    label: "Utilisation Moyenne",
    value: "87%",
    change: "-3%",
    trend: "down" as const,
    icon: ActivityIcon,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function PlatformAnalyticsPage({
  locale = "fr",
}: PlatformAnalyticsPageProps) {
  const t = translations[locale];

  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {t.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="h-11 w-full border-border sm:w-[180px]">
              <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />

              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">90 derniers jours</SelectItem>
              <SelectItem value="1y">1 année</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11 border-border">
            <DownloadIcon className="mr-2 h-4 w-4" />

            {t.export}
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {kpi.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        kpi.trend === "up" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="tenants">{t.tabs.tenants}</TabsTrigger>
          <TabsTrigger value="revenue">{t.tabs.revenue}</TabsTrigger>
          <TabsTrigger value="usage">{t.tabs.usage}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              Graphiques de vue d'ensemble - À implémenter
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              Analytics par tenant - À implémenter
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              Analytics revenus - À implémenter
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              Analytics utilisation - À implémenter
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
