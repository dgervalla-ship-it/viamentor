/**
 * VIAMENTOR - Vehicles Analytics Page
 * Page principale analytics véhicules
 */

"use client";

import { TruckIcon, DollarSignIcon, WrenchIcon, FuelIcon } from "lucide-react";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
import { VehiclesAnalyticsHeader } from "@/viamentor/components/viamentor-vehicles-analytics-header";
import { FleetUtilizationSection } from "@/viamentor/components/viamentor-fleet-utilization-section";
import { CostsAnalysisSection } from "@/viamentor/components/viamentor-costs-analysis-section";
import { MaintenanceTrackingSection } from "@/viamentor/components/viamentor-maintenance-tracking-section";
import { FuelConsumptionSection } from "@/viamentor/components/viamentor-fuel-consumption-section";
import {
  vehiclesAnalyticsStats,
  vehiclesUtilization,
  vehiclesCosts,
  maintenanceRecords,
  fuelConsumption,
  type VehiclesAnalyticsLocale,
} from "@/viamentor/data/viamentor-vehicles-analytics-data";
import { getVehiclesAnalyticsTranslations } from "@/viamentor/data/viamentor-vehicles-analytics-i18n";

interface VehiclesAnalyticsPageProps {
  locale?: VehiclesAnalyticsLocale;
}

export function VehiclesAnalyticsPage({
  locale = "fr",
}: VehiclesAnalyticsPageProps) {
  const t = getVehiclesAnalyticsTranslations(locale);

  // Header Stats
  const headerStats = (
    <VehiclesAnalyticsHeader stats={vehiclesAnalyticsStats} locale={locale} />
  );

  return (
    <ResponsivePageWrapper
      title={t.title}
      description="Analytics et statistiques de la flotte de véhicules"
      alerts={headerStats}
      sections={[
        {
          id: "utilization",
          label: t.tabs.utilization,
          icon: <TruckIcon className="h-4 w-4" />,

          content: (
            <FleetUtilizationSection
              vehicles={vehiclesUtilization}
              locale={locale}
              onViewDetail={(v) => console.log("View detail:", v.plate)}
              onViewPlanning={(v) => console.log("View planning:", v.plate)}
            />
          ),
        },
        {
          id: "costs",
          label: t.tabs.costs,
          icon: <DollarSignIcon className="h-4 w-4" />,

          content: (
            <CostsAnalysisSection costs={vehiclesCosts} locale={locale} />
          ),
        },
        {
          id: "maintenance",
          label: t.tabs.maintenance,
          icon: <WrenchIcon className="h-4 w-4" />,

          content: (
            <MaintenanceTrackingSection
              records={maintenanceRecords}
              locale={locale}
              onSchedule={(r) => console.log("Schedule:", r.plate)}
            />
          ),
        },
        {
          id: "fuel",
          label: t.tabs.fuel,
          icon: <FuelIcon className="h-4 w-4" />,

          content: (
            <FuelConsumptionSection
              consumption={fuelConsumption}
              locale={locale}
            />
          ),
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
    />
  );
}
