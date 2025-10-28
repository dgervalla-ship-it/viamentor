/**
 * ============================================================================
 * VIAMENTOR - Responsive Dashboard
 * ============================================================================
 *
 * Dashboard responsive optimisé mobile avec charts adaptatifs
 */

import React from "react";
import { useResponsive } from "@/viamentor/data/viamentor-responsive-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  CarIcon,
  CalendarIcon,
  EuroIcon,
  ChevronRightIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export interface DashboardKPI {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  color?: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ResponsiveDashboardProps {
  kpis: DashboardKPI[];
  chartsData: {
    revenue: ChartData[];
    students: ChartData[];
    lessons: ChartData[];
    distribution: ChartData[];
  };
  onKPIClick?: (kpi: DashboardKPI) => void;
  className?: string;
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * KPI Card responsive
 */
function KPICard({
  kpi,
  onClick,
  compact = false,
}: {
  kpi: DashboardKPI;
  onClick?: () => void;
  compact?: boolean;
}) {
  const TrendIcon =
    kpi.trend === "up"
      ? TrendingUpIcon
      : kpi.trend === "down"
        ? TrendingDownIcon
        : null;

  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        compact ? "p-3" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className={compact ? "p-0" : "p-6"}>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <p
              className={`text-muted-foreground ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              {kpi.label}
            </p>
            <p
              className={`font-bold text-foreground ${
                compact ? "text-xl" : "text-2xl"
              }`}
            >
              {kpi.value}
            </p>
            {kpi.change !== undefined && (
              <div className="flex items-center gap-1">
                {TrendIcon && (
                  <TrendIcon
                    className={`h-3 w-3 ${
                      kpi.trend === "up"
                        ? "text-green-600"
                        : kpi.trend === "down"
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }`}
                  />
                )}
                <span
                  className={`text-xs ${
                    kpi.trend === "up"
                      ? "text-green-600"
                      : kpi.trend === "down"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change}%
                </span>
              </div>
            )}
          </div>
          {kpi.icon && !compact && (
            <div
              className={`p-2 rounded-lg ${
                kpi.color || "bg-primary/10 text-primary"
              }`}
            >
              {kpi.icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Chart responsive avec adaptation mobile
 */
function ResponsiveChart({
  type,
  data,
  title,
  compact = false,
}: {
  type: "bar" | "line" | "pie";
  data: ChartData[];
  title: string;
  compact?: boolean;
}) {
  const responsive = useResponsive();
  const height = compact ? 200 : responsive.isMobile ? 250 : 300;

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <Card>
      <CardHeader className={compact ? "p-4" : ""}>
        <CardTitle className={compact ? "text-base" : ""}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={compact ? "p-4 pt-0" : ""}>
        <ResponsiveContainer width="100%" height={height}>
          {type === "bar" && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

              {!responsive.isMobile && <XAxis dataKey="name" fontSize={12} />}
              {!compact && <YAxis fontSize={12} />}
              <Tooltip />

              {!responsive.isMobile && <Legend />}
              <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
          {type === "line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

              {!responsive.isMobile && <XAxis dataKey="name" fontSize={12} />}
              {!compact && <YAxis fontSize={12} />}
              <Tooltip />

              {!responsive.isMobile && <Legend />}
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors[1]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          )}
          {type === "pie" && (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={!responsive.isMobile}
                label={!responsive.isMobile}
                outerRadius={responsive.isMobile ? 60 : 80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />

              {!responsive.isMobile && <Legend />}
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

/**
 * Dashboard responsive principal
 */
export function ResponsiveDashboard({
  kpis,
  chartsData,
  onKPIClick,
  className = "",
}: ResponsiveDashboardProps) {
  const responsive = useResponsive();

  // Mobile: Tabs pour organiser les charts
  if (responsive.isMobile) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* KPIs en grille 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <KPICard
              key={kpi.id}
              kpi={kpi}
              onClick={() => onKPIClick?.(kpi)}
              compact
            />
          ))}
        </div>

        {/* Charts en tabs */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="revenue" className="text-xs">
              Revenus
            </TabsTrigger>
            <TabsTrigger value="students" className="text-xs">
              Élèves
            </TabsTrigger>
            <TabsTrigger value="lessons" className="text-xs">
              Leçons
            </TabsTrigger>
            <TabsTrigger value="distribution" className="text-xs">
              Répartition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="mt-4">
            <ResponsiveChart
              type="line"
              data={chartsData.revenue}
              title="Revenus mensuels"
              compact
            />
          </TabsContent>

          <TabsContent value="students" className="mt-4">
            <ResponsiveChart
              type="bar"
              data={chartsData.students}
              title="Nouveaux élèves"
              compact
            />
          </TabsContent>

          <TabsContent value="lessons" className="mt-4">
            <ResponsiveChart
              type="line"
              data={chartsData.lessons}
              title="Leçons par semaine"
              compact
            />
          </TabsContent>

          <TabsContent value="distribution" className="mt-4">
            <ResponsiveChart
              type="pie"
              data={chartsData.distribution}
              title="Répartition catégories"
              compact
            />
          </TabsContent>
        </Tabs>

        {/* Quick actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Voir détails
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  // Tablet: 2 colonnes
  if (responsive.isTablet) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* KPIs en grille 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} onClick={() => onKPIClick?.(kpi)} />
          ))}
        </div>

        {/* Charts en grille 2 colonnes */}
        <div className="grid grid-cols-2 gap-4">
          <ResponsiveChart
            type="line"
            data={chartsData.revenue}
            title="Revenus mensuels"
          />

          <ResponsiveChart
            type="bar"
            data={chartsData.students}
            title="Nouveaux élèves"
          />

          <ResponsiveChart
            type="line"
            data={chartsData.lessons}
            title="Leçons par semaine"
          />

          <ResponsiveChart
            type="pie"
            data={chartsData.distribution}
            title="Répartition catégories"
          />
        </div>
      </div>
    );
  }

  // Desktop: Layout complet
  return (
    <div className={`space-y-6 ${className}`}>
      {/* KPIs en grille 4 colonnes */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} onClick={() => onKPIClick?.(kpi)} />
        ))}
      </div>

      {/* Charts en grille 2x2 */}
      <div className="grid grid-cols-2 gap-6">
        <ResponsiveChart
          type="line"
          data={chartsData.revenue}
          title="Revenus mensuels"
        />

        <ResponsiveChart
          type="bar"
          data={chartsData.students}
          title="Nouveaux élèves"
        />

        <ResponsiveChart
          type="line"
          data={chartsData.lessons}
          title="Leçons par semaine"
        />

        <ResponsiveChart
          type="pie"
          data={chartsData.distribution}
          title="Répartition catégories"
        />
      </div>
    </div>
  );
}
