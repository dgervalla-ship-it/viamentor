/**
 * VIAMENTOR - Vehicle Detail Page
 *
 * Page complète détail véhicule avec:
 * - Header Hero UI avec photo, specs, badges, actions
 * - Tabs navigation (Historique/GPS/Coûts/Carburant/Analytics)
 * - Export PDF dossier complet
 * - i18n FR/DE/IT/EN
 *
 * @module pages/viamentor-vehicle-detail-page
 */

"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HistoryIcon,
  MapPinIcon,
  WalletIcon,
  FuelIcon,
  BarChart3Icon,
  CalendarIcon,
  FileTextIcon,
} from "lucide-react";
import { VehicleDetailHeader } from "@/viamentor/components/viamentor-vehicle-detail-header";
import { VehicleHistoryTab } from "@/viamentor/components/viamentor-vehicle-history-tab";
import { VehicleGPSTracking } from "@/viamentor/components/viamentor-vehicle-gps-tracking";
import { VehicleCostsManagement } from "@/viamentor/components/viamentor-vehicle-costs-management";
import { VehicleFuelTracking } from "@/viamentor/components/viamentor-vehicle-fuel-tracking";
import { VehicleUtilizationAnalytics } from "@/viamentor/components/viamentor-vehicle-utilization-analytics";
import { VehiclePlanningTab } from "@/viamentor/components/viamentor-vehicle-planning-tab";
import { VehicleDocumentsTab } from "@/viamentor/components/viamentor-vehicle-documents-tab";
import {
  mockVehicleDetail,
  mockAuditLogs,
  mockGPSTrajectories,
  mockVehicleCosts,
  mockFuelEntries,
  mockUtilizationData,
  type VehicleDetail,
} from "@/viamentor/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/viamentor/data/viamentor-vehicle-detail-i18n";
import { MaintenanceTaskDialog } from "@/viamentor/components/viamentor-maintenance-task-dialog";
import type { MaintenanceTask } from "@/viamentor/data/viamentor-maintenance-data";

// ============================================================================
// TYPES
// ============================================================================

export interface VehicleDetailPageProps {
  locale?: VehicleDetailLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function VehicleDetailPage({ locale = "fr" }: VehicleDetailPageProps) {
  const t = getVehicleDetailI18n(locale);
  const { id } = useParams<{ id: string }>();

  // State
  const [vehicle] = useState<VehicleDetail>({
    ...mockVehicleDetail,
    history: mockAuditLogs,
    gpsTracking: {
      currentLocation: mockVehicleDetail.currentLocation,
      trips: mockGPSTrajectories,
    },
    costs: mockVehicleCosts,
    fuelTracking: mockFuelEntries,
    utilization: mockUtilizationData,
  } as any);
  const [activeTab, setActiveTab] = useState("history");
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);

  // Handlers
  const handleScheduleMaintenance = () => {
    setIsMaintenanceDialogOpen(true);
  };

  const handleSaveMaintenanceTask = (data: Partial<MaintenanceTask>) => {
    console.log("Save maintenance task:", data);
    // TODO: Save to backend
  };

  // Tabs configuration
  const tabs = [
    {
      value: "history",
      label: t.tabs.history,
      icon: HistoryIcon,
    },
    {
      value: "planning",
      label: t.tabs.planning,
      icon: CalendarIcon,
    },
    {
      value: "documents",
      label: t.tabs.documents,
      icon: FileTextIcon,
    },
    {
      value: "gps",
      label: t.tabs.gps,
      icon: MapPinIcon,
    },
    {
      value: "costs",
      label: t.tabs.costs,
      icon: WalletIcon,
    },
    {
      value: "fuel",
      label: t.tabs.fuel,
      icon: FuelIcon,
    },
    {
      value: "analytics",
      label: t.tabs.analytics,
      icon: BarChart3Icon,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <VehicleDetailHeader
        vehicle={vehicle}
        locale={locale}
        onEdit={() => console.log("Edit vehicle")}
        onPlanning={() => console.log("View planning")}
        onMaintenance={handleScheduleMaintenance}
        onExport={() => console.log("Export PDF")}
        onDeactivate={() => console.log("Deactivate vehicle")}
        onDelete={() => console.log("Delete vehicle")}
      />

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-7">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                <Icon className="h-4 w-4" />

                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content: History */}
        <TabsContent value="history" className="space-y-4">
          <VehicleHistoryTab
            logs={mockAuditLogs}
            locale={locale}
            onExport={() => console.log("Export history CSV")}
          />
        </TabsContent>

        {/* Tab Content: GPS */}
        <TabsContent value="gps" className="space-y-4">
          <VehicleGPSTracking
            vehicle={vehicle}
            trajectories={mockGPSTrajectories}
            locale={locale}
            onViewDetails={(trip) => console.log("View trip:", trip)}
          />
        </TabsContent>

        {/* Tab Content: Costs */}
        <TabsContent value="costs" className="space-y-4">
          <VehicleCostsManagement
            costs={mockVehicleCosts}
            totalKm={vehicle.currentKm}
            totalHours={2500}
            revenue={85000}
            locale={locale}
            onAdd={() => console.log("Add cost")}
            onEdit={(cost) => console.log("Edit cost:", cost)}
            onDelete={(cost) => console.log("Delete cost:", cost)}
            onExport={() => console.log("Export costs")}
          />
        </TabsContent>

        {/* Tab Content: Fuel */}
        <TabsContent value="fuel" className="space-y-4">
          <VehicleFuelTracking
            entries={mockFuelEntries}
            currentKm={vehicle.currentKm}
            locale={locale}
            onAdd={(entry) => console.log("Add refuel:", entry)}
            onEdit={(entry) => console.log("Edit refuel:", entry)}
            onDelete={(entry) => console.log("Delete refuel:", entry)}
          />
        </TabsContent>

        {/* Tab Content: Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <VehicleUtilizationAnalytics
            data={mockUtilizationData}
            locale={locale}
          />
        </TabsContent>

        {/* Tab Content: Planning */}
        <TabsContent value="planning" className="space-y-4">
          <VehiclePlanningTab
            vehicleId={vehicle.id}
            lessons={[
              {
                id: "1",
                date: new Date().toISOString().split("T")[0],
                startTime: "09:00",
                endTime: "10:30",
                studentName: "Sophie Martin",
                instructorName: "Jean Dupont",
                type: "practical",
                status: "scheduled",
              },
              {
                id: "2",
                date: new Date().toISOString().split("T")[0],
                startTime: "14:00",
                endTime: "15:30",
                studentName: "Marc Dubois",
                instructorName: "Marie Leroy",
                type: "practical",
                status: "scheduled",
                hasConflict: true,
              },
            ]}
            locale={locale}
            onViewLesson={(id) => console.log("View lesson:", id)}
            onBookLesson={() => console.log("Book lesson")}
          />
        </TabsContent>

        {/* Tab Content: Documents */}
        <TabsContent value="documents" className="space-y-4">
          <VehicleDocumentsTab
            vehicleId={vehicle.id}
            documents={[
              {
                id: "1",
                name: "Carte grise.pdf",
                type: "registration",
                category: "Documents officiels",
                uploadDate: "2024-01-15",
                expirationDate: "2025-12-31",
                size: 245000,
                format: "pdf",
                url: "/docs/registration.pdf",
                status: "valid",
              },
              {
                id: "2",
                name: "Assurance 2024.pdf",
                type: "insurance",
                category: "Assurances",
                uploadDate: "2024-01-10",
                expirationDate: "2024-12-31",
                size: 180000,
                format: "pdf",
                url: "/docs/insurance.pdf",
                status: "expiring_soon",
              },
              {
                id: "3",
                name: "Expertise technique.pdf",
                type: "inspection",
                category: "Contrôles techniques",
                uploadDate: "2023-06-20",
                expirationDate: "2024-06-20",
                size: 320000,
                format: "pdf",
                url: "/docs/inspection.pdf",
                status: "expired",
              },
            ]}
            locale={locale}
            onUpload={(file, type) => console.log("Upload:", file.name, type)}
            onDownload={(id) => console.log("Download:", id)}
            onDelete={(id) => console.log("Delete:", id)}
            onPreview={(id) => console.log("Preview:", id)}
          />
        </TabsContent>
      </Tabs>

      {/* Maintenance Task Dialog */}
      <MaintenanceTaskDialog
        open={isMaintenanceDialogOpen}
        onOpenChange={setIsMaintenanceDialogOpen}
        vehicleId={vehicle.id}
        onSave={handleSaveMaintenanceTask}
      />
    </div>
  );
}
