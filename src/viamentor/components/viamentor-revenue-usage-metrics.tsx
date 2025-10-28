/**
 * VIAMENTOR - Revenue & Usage Metrics
 * Graphiques métriques revenus et usage Super Admin
 *
 * FEATURES:
 * - Revenue metrics (MRR, ARR, growth)
 * - Usage metrics (users, sessions, storage)
 * - Charts Recharts
 * - Period selector
 * - Export data
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ServerIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import type { SuperAdminLocale } from "@/viamentor/data/viamentor-super-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RevenueUsageMetricsProps {
  locale?: SuperAdminLocale;
  className?: string;
}

type Period = "7d" | "30d" | "90d" | "1y";

// Mock data
const revenueData = [
  { month: "Jan", mrr: 145000, arr: 1740000, growth: 12 },
  { month: "Fév", mrr: 152000, arr: 1824000, growth: 15 },
  { month: "Mar", mrr: 148000, arr: 1776000, growth: 8 },
  { month: "Avr", mrr: 156000, arr: 1872000, growth: 18 },
  { month: "Mai", mrr: 162000, arr: 1944000, growth: 22 },
  { month: "Juin", mrr: 158000, arr: 1896000, growth: 16 },
];

const usageData = [
  { month: "Jan", users: 3200, sessions: 45000, storage: 1200 },
  { month: "Fév", users: 3450, sessions: 48000, storage: 1350 },
  { month: "Mar", users: 3600, sessions: 52000, storage: 1450 },
  { month: "Avr", users: 3750, sessions: 55000, storage: 1580 },
  { month: "Mai", users: 3842, sessions: 58000, storage: 1680 },
  { month: "Juin", users: 3920, sessions: 61000, storage: 1750 },
];

const tenantGrowthData = [
  { month: "Jan", new: 12, churned: 2, net: 10 },
  { month: "Fév", new: 15, churned: 3, net: 12 },
  { month: "Mar", new: 10, churned: 1, net: 9 },
  { month: "Avr", new: 18, churned: 2, net: 16 },
  { month: "Mai", new: 14, churned: 1, net: 13 },
  { month: "Juin", new: 16, churned: 2, net: 14 },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function RevenueUsageMetrics({
  locale = "fr",
  className,
}: RevenueUsageMetricsProps) {
  const [period, setPeriod] = useState<Period>("30d");

  const t = {
    fr: {
      revenue: {
        title: "Métriques Revenus",
        mrr: "MRR",
        arr: "ARR",
        growth: "Croissance",
        export: "Exporter",
      },
      usage: {
        title: "Métriques Usage",
        users: "Utilisateurs",
        sessions: "Sessions",
        storage: "Stockage (GB)",
      },
      tenants: {
        title: "Croissance Tenants",
        new: "Nouveaux",
        churned: "Désabonnés",
        net: "Net",
      },
      period: {
        "7d": "7 jours",
        "30d": "30 jours",
        "90d": "90 jours",
        "1y": "1 an",
      },
      kpis: {
        totalRevenue: "Revenu Total",
        avgRevenuePerTenant: "Revenu Moyen/Tenant",
        activeUsers: "Utilisateurs Actifs",
        avgSessionsPerUser: "Sessions Moy./User",
      },
    },
    de: {
      revenue: {
        title: "Umsatzmetriken",
        mrr: "MRR",
        arr: "ARR",
        growth: "Wachstum",
        export: "Exportieren",
      },
      usage: {
        title: "Nutzungsmetriken",
        users: "Benutzer",
        sessions: "Sitzungen",
        storage: "Speicher (GB)",
      },
      tenants: {
        title: "Mandantenwachstum",
        new: "Neu",
        churned: "Abgewandert",
        net: "Netto",
      },
      period: {
        "7d": "7 Tage",
        "30d": "30 Tage",
        "90d": "90 Tage",
        "1y": "1 Jahr",
      },
      kpis: {
        totalRevenue: "Gesamtumsatz",
        avgRevenuePerTenant: "Durchschn. Umsatz/Mandant",
        activeUsers: "Aktive Benutzer",
        avgSessionsPerUser: "Durchschn. Sitzungen/Benutzer",
      },
    },
    it: {
      revenue: {
        title: "Metriche Ricavi",
        mrr: "MRR",
        arr: "ARR",
        growth: "Crescita",
        export: "Esporta",
      },
      usage: {
        title: "Metriche Utilizzo",
        users: "Utenti",
        sessions: "Sessioni",
        storage: "Archiviazione (GB)",
      },
      tenants: {
        title: "Crescita Tenant",
        new: "Nuovi",
        churned: "Disiscritti",
        net: "Netto",
      },
      period: {
        "7d": "7 giorni",
        "30d": "30 giorni",
        "90d": "90 giorni",
        "1y": "1 anno",
      },
      kpis: {
        totalRevenue: "Ricavi Totali",
        avgRevenuePerTenant: "Ricavi Medi/Tenant",
        activeUsers: "Utenti Attivi",
        avgSessionsPerUser: "Sessioni Medie/Utente",
      },
    },
    en: {
      revenue: {
        title: "Revenue Metrics",
        mrr: "MRR",
        arr: "ARR",
        growth: "Growth",
        export: "Export",
      },
      usage: {
        title: "Usage Metrics",
        users: "Users",
        sessions: "Sessions",
        storage: "Storage (GB)",
      },
      tenants: {
        title: "Tenant Growth",
        new: "New",
        churned: "Churned",
        net: "Net",
      },
      period: {
        "7d": "7 days",
        "30d": "30 days",
        "90d": "90 days",
        "1y": "1 year",
      },
      kpis: {
        totalRevenue: "Total Revenue",
        avgRevenuePerTenant: "Avg Revenue/Tenant",
        activeUsers: "Active Users",
        avgSessionsPerUser: "Avg Sessions/User",
      },
    },
  };

  const translations = t[locale];

  // Calculate KPIs
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.mrr, 0);
  const avgRevenuePerTenant = Math.round(totalRevenue / 247);
  const totalUsers = usageData[usageData.length - 1].users;
  const totalSessions = usageData[usageData.length - 1].sessions;
  const avgSessionsPerUser = Math.round(totalSessions / totalUsers);

  return (
    <div className={`space-y-6 ${className || ""}`}>
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Métriques Plateforme</h2>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{translations.period["7d"]}</SelectItem>
              <SelectItem value="30d">{translations.period["30d"]}</SelectItem>
              <SelectItem value="90d">{translations.period["90d"]}</SelectItem>
              <SelectItem value="1y">{translations.period["1y"]}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />

            {translations.revenue.export}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {translations.kpis.totalRevenue}
              </p>
              <p className="text-2xl font-bold mt-1">
                CHF {(totalRevenue / 1000).toFixed(0)}K
              </p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />

                <span className="text-sm text-green-600">+18%</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
              <CurrencyDollarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {translations.kpis.avgRevenuePerTenant}
              </p>
              <p className="text-2xl font-bold mt-1">
                CHF {avgRevenuePerTenant}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />

                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {translations.kpis.activeUsers}
              </p>
              <p className="text-2xl font-bold mt-1">
                {totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />

                <span className="text-sm text-green-600">+22%</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
              <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {translations.kpis.avgSessionsPerUser}
              </p>
              <p className="text-2xl font-bold mt-1">{avgSessionsPerUser}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />

                <span className="text-sm text-green-600">+8%</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
              <ServerIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">
                {translations.revenue.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                MRR & ARR évolution
              </p>
            </div>
            <Badge variant="secondary">6 mois</Badge>
          </div>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="month" className="text-xs" />

                <YAxis className="text-xs" />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Area
                  type="monotone"
                  dataKey="mrr"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                  name="MRR"
                />

                <Area
                  type="monotone"
                  dataKey="arr"
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.4}
                  name="ARR"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Usage Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">
                {translations.usage.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Utilisateurs & Sessions
              </p>
            </div>
            <Badge variant="secondary">6 mois</Badge>
          </div>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="month" className="text-xs" />

                <YAxis className="text-xs" />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={translations.usage.users}
                />

                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={translations.usage.sessions}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Tenant Growth Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">
                {translations.tenants.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Nouveaux vs Désabonnés
              </p>
            </div>
            <Badge variant="secondary">6 mois</Badge>
          </div>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenantGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="month" className="text-xs" />

                <YAxis className="text-xs" />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar
                  dataKey="new"
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                  name={translations.tenants.new}
                />

                <Bar
                  dataKey="churned"
                  fill="hsl(var(--chart-5))"
                  radius={[4, 4, 0, 0]}
                  name={translations.tenants.churned}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Storage Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Stockage Utilisé</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Évolution stockage (GB)
              </p>
            </div>
            <Badge variant="secondary">6 mois</Badge>
          </div>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="month" className="text-xs" />

                <YAxis className="text-xs" />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Area
                  type="monotone"
                  dataKey="storage"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                  name={translations.usage.storage}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
}

export default RevenueUsageMetrics;
