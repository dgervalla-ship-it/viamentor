/**
 * VIAMENTOR - School Admin Page
 * Dashboard complet School Administrateur
 *
 * FEATURES:
 * - Stats école en temps réel
 * - Actions rapides contextuelles
 * - Activité récente
 * - Événements à venir
 * - Métriques de performance
 * - Alertes et notifications
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
import { ViamentorSchoolAdminStatsSection } from "@/viamentor/components/viamentor-school-admin-stats-section";
import { ViamentorSchoolAdminQuickActionsSection } from "@/viamentor/components/viamentor-school-admin-quick-actions-section";
import { ViamentorSchoolAdminChartsSection } from "@/viamentor/components/viamentor-school-admin-charts-section";
import { ViamentorSchoolAdminGoalsSection } from "@/viamentor/components/viamentor-school-admin-goals-section";
import { ViamentorSchoolAdminTopPerformersSection } from "@/viamentor/components/viamentor-school-admin-top-performers-section";
import { ViamentorSchoolAdminActivitySection } from "@/viamentor/components/viamentor-school-admin-activity-section";
import { ViamentorSchoolAdminEventsSection } from "@/viamentor/components/viamentor-school-admin-events-section";
import { ViamentorSchoolAdminPerformanceSection } from "@/viamentor/components/viamentor-school-admin-performance-section";
import {
  RefreshCw,
  X,
  ArrowRight,
  Download,
  BarChart3,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  mockSchoolAlerts,
  getAlertIcon,
  type SchoolAlert,
} from "@/viamentor/data/viamentor-school-admin-data";
import {
  schoolAdminTranslations,
  type SchoolAdminLocale,
} from "@/viamentor/data/viamentor-school-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminPageProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// ICONS MAP
// ============================================================================

const iconMap: Record<string, any> = {
  Info: () => null,
  AlertTriangle: () => null,
  AlertCircle: () => null,
  CheckCircle: () => null,
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminPage({
  locale = "fr",
}: SchoolAdminPageProps) {
  const t = schoolAdminTranslations[locale];
  const [alerts, setAlerts] = useState<SchoolAlert[]>(mockSchoolAlerts);
  const [timePeriod, setTimePeriod] = useState<
    "today" | "week" | "month" | "year"
  >("month");
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed");
  const [selectedMetric, setSelectedMetric] = useState<string>("revenue");

  // Dismiss alert
  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  // Alerts section
  const alertsSection = alerts.length > 0 && (
    <div className="space-y-2">
      {alerts.slice(0, 3).map((alert) => {
        const Icon = iconMap[getAlertIcon(alert.type)];
        const colorMap = {
          info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
          warning:
            "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950",
          error: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
          success:
            "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
        };

        return (
          <Alert key={alert.id} className={colorMap[alert.type]}>
            <Icon className="h-4 w-4" />

            <AlertTitle className="flex items-center justify-between">
              <span>{alert.title}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleDismissAlert(alert.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{alert.message}</span>
              {alert.actionHref && (
                <Link to={alert.actionHref}>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    {alert.actionLabel}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              )}
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );

  // Actions header
  const actions = (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setViewMode(viewMode === "detailed" ? "compact" : "detailed")
        }
        className="hidden md:flex"
      >
        {viewMode === "detailed" ? (
          <Minimize2 className="h-4 w-4 mr-2" />
        ) : (
          <Maximize2 className="h-4 w-4 mr-2" />
        )}
        {viewMode === "detailed" ? "Vue compacte" : "Vue détaillée"}
      </Button>
      <Button variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />

        <span className="hidden sm:inline">{t.actions.refresh}</span>
      </Button>
      <Button variant="outline" size="sm" className="hidden sm:flex">
        <Download className="h-4 w-4 mr-2" />
        Exporter
      </Button>
      <Button variant="outline" size="sm" className="hidden lg:flex">
        <BarChart3 className="h-4 w-4 mr-2" />

        {t.quickActions.viewReports}
      </Button>
    </div>
  );

  // Filters section
  const filtersSection = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Tabs
        value={timePeriod}
        onValueChange={(v: any) => setTimePeriod(v)}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="today" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Aujourd'hui</span>
            <span className="sm:hidden">Jour</span>
          </TabsTrigger>
          <TabsTrigger value="week" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Cette semaine</span>
            <span className="sm:hidden">Semaine</span>
          </TabsTrigger>
          <TabsTrigger value="month" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Ce mois</span>
            <span className="sm:hidden">Mois</span>
          </TabsTrigger>
          <TabsTrigger value="year" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Cette année</span>
            <span className="sm:hidden">Année</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Select value={selectedMetric} onValueChange={setSelectedMetric}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Métrique" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="revenue">Revenus</SelectItem>
          <SelectItem value="students">Élèves</SelectItem>
          <SelectItem value="lessons">Leçons</SelectItem>
          <SelectItem value="exams">Examens</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  // Sections for ResponsivePageWrapper
  const sections = [
    {
      id: "overview",
      title: "Vue d'ensemble",
      icon: "LayoutDashboard",
      content: (
        <div className="space-y-6">
          {/* Filters visible on desktop */}
          <div className="hidden lg:block">{filtersSection}</div>
          <ViamentorSchoolAdminStatsSection locale={locale} />

          <ViamentorSchoolAdminQuickActionsSection locale={locale} />
        </div>
      ),
    },
    {
      id: "charts",
      title: "Graphiques",
      icon: "BarChart3",
      content: <ViamentorSchoolAdminChartsSection locale={locale} />,
    },
    {
      id: "goals",
      title: "Objectifs",
      icon: "Target",
      content: <ViamentorSchoolAdminGoalsSection locale={locale} />,
    },
    {
      id: "performers",
      title: "Top Performers",
      icon: "Trophy",
      content: <ViamentorSchoolAdminTopPerformersSection locale={locale} />,
    },
    {
      id: "activity",
      title: "Activité",
      icon: "Activity",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ViamentorSchoolAdminActivitySection locale={locale} />

          <ViamentorSchoolAdminEventsSection locale={locale} />
        </div>
      ),
    },
    {
      id: "performance",
      title: "Performance",
      icon: "TrendingUp",
      content: <ViamentorSchoolAdminPerformanceSection locale={locale} />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filters above tabs on mobile */}
      <div className="lg:hidden px-6 pt-6">{filtersSection}</div>

      <ResponsivePageWrapper
        title={t.pageTitle}
        description={t.pageDescription}
        actions={actions}
        alerts={alertsSection}
        sections={sections}
        defaultSection="overview"
        mobileTabsEnabled={true}
        mobileTabsBreakpoint="lg"
        swipeEnabled={true}
        layout="stacked"
        spacing="normal"
      />
    </div>
  );
}

export default ViamentorSchoolAdminPage;
