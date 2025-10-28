/**
 * VIAMENTOR - Vehicles Management Page
 *
 * Page complète gestion véhicules School Admin avec:
 * - Stats KPIs temps réel
 * - DataTable/Grid view responsive
 * - Filtres avancés multi-critères
 * - Bulk actions
 * - Wizard création véhicule
 * - Quick actions
 * - Analytics utilisation
 * - Conformité OAC Art. 65-68
 *
 * @module pages/viamentor-vehicles-page
 */

"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  SearchIcon,
  TableIcon,
  LayoutGridIcon,
  DownloadIcon,
  FilterIcon,
  MoreVerticalIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { VehiclesStatsCards } from "@/viamentor/components/viamentor-vehicles-stats-cards";
import {
  VehiclesFilters,
  type FiltersState,
} from "@/viamentor/components/viamentor-vehicles-filters";
import { VehiclesTable } from "@/viamentor/components/viamentor-vehicles-table";
import { VehiclesGridView } from "@/viamentor/components/viamentor-vehicles-grid-view";
import { VehiclesBulkActions } from "@/viamentor/components/viamentor-vehicles-bulk-actions";
import { VehiclesUtilizationStats } from "@/viamentor/components/viamentor-vehicles-utilization-stats";
import { CreateVehicleWizard } from "@/viamentor/components/viamentor-create-vehicle-wizard";
import {
  MOCK_VEHICLES,
  MOCK_VEHICLE_STATS,
  MOCK_UTILIZATION_DATA,
  type Vehicle,
  type VehicleStatus,
} from "@/viamentor/data/viamentor-vehicles-data";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/viamentor/data/viamentor-vehicles-i18n";

export interface VehiclesPageProps {
  locale?: VehiclesLocale;
}

export function VehiclesPage({ locale = "fr" }: VehiclesPageProps) {
  const t = VEHICLES_I18N[locale];

  // State management
  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [filteredVehicles, setFilteredVehicles] =
    useState<Vehicle[]>(MOCK_VEHICLES);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [activeTab, setActiveTab] = useState<"all" | "alerts">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FiltersState | null>(
    null
  );
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  // Get unique brands for filters
  const brands = Array.from(new Set(vehicles.map((v) => v.brand))).sort();

  // Compute alerts
  const alerts = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    return vehicles.filter((v) => {
      const insuranceExpiry = new Date(v.insuranceExpiry);
      const expertiseExpiry = new Date(v.expertiseExpiry);
      const nextService = v.nextServiceDate
        ? new Date(v.nextServiceDate)
        : null;

      return (
        insuranceExpiry < thirtyDaysFromNow ||
        expertiseExpiry < thirtyDaysFromNow ||
        (nextService && nextService < thirtyDaysFromNow) ||
        v.complianceStatus === "non_compliant" ||
        v.status === "maintenance"
      );
    });
  }, [vehicles]);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const total = filteredVehicles.length;
    const available = filteredVehicles.filter(
      (v) => v.status === "available"
    ).length;
    const inUse = filteredVehicles.filter((v) => v.status === "in_use").length;
    const maintenance = filteredVehicles.filter(
      (v) => v.status === "maintenance"
    ).length;

    return {
      total,
      available,
      inUse,
      maintenance,
      utilizationRate: total > 0 ? Math.round((inUse / total) * 100) : 0,
    };
  }, [filteredVehicles]);

  // Handle search with debounce
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = vehicles.filter(
      (v) =>
        v.licensePlate.toLowerCase().includes(query.toLowerCase()) ||
        v.brand.toLowerCase().includes(query.toLowerCase()) ||
        v.model.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVehicles(filtered);
  };

  // Handle filters
  const handleApplyFilters = (filters: FiltersState) => {
    setAppliedFilters(filters);
    let filtered = [...vehicles];

    // Apply search query first
    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((v) =>
        filters.categories.includes(v.category)
      );
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter((v) => filters.brands.includes(v.brand));
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((v) => v.status === filters.status);
    }

    // Filter by compliance
    if (filters.compliance.length > 0) {
      filtered = filtered.filter((v) =>
        filters.compliance.includes(v.complianceStatus)
      );
    }

    // Filter by mileage range
    filtered = filtered.filter(
      (v) =>
        v.mileage >= filters.mileageRange[0] &&
        v.mileage <= filters.mileageRange[1]
    );

    // Filter by insurance expired
    if (filters.insuranceExpired) {
      filtered = filtered.filter(
        (v) => new Date(v.insuranceExpiry) < new Date()
      );
    }

    // Filter by expertise expired
    if (filters.expertiseExpired) {
      filtered = filtered.filter(
        (v) => new Date(v.expertiseExpiry) < new Date()
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleResetFilters = () => {
    setAppliedFilters(null);
    setSearchQuery("");
    setFilteredVehicles(vehicles);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Handle export
  const handleExport = (format: "csv" | "excel" | "pdf") => {
    console.log(`Exporting ${filteredVehicles.length} vehicles as ${format}`);
    alert(
      `Export ${filteredVehicles.length} véhicules en ${format.toUpperCase()}`
    );
  };

  // Get vehicles to display based on active tab
  const displayVehicles = activeTab === "alerts" ? alerts : filteredVehicles;

  // Count active filters
  const activeFiltersCount = appliedFilters
    ? [
        appliedFilters.categories.length > 0,
        appliedFilters.brands.length > 0,
        appliedFilters.status !== "all",
        appliedFilters.compliance.length > 0,
        appliedFilters.insuranceExpired,
        appliedFilters.expertiseExpired,
      ].filter(Boolean).length
    : 0;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t.page.title}
          </h1>
          <p className="text-sm text-muted-foreground">{t.page.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="min-h-[44px] border-border"
          >
            <RefreshCwIcon
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />

            {t.actions.refresh || "Actualiser"}
          </Button>

          {/* Export Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="min-h-[44px] border-border"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />

                {t.actions.export || "Exporter"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => handleExport("csv")}>
                Export CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                Export Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                Export PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* New Vehicle Button */}
          <Button
            onClick={() => setShowCreateWizard(true)}
            className="min-h-[44px]"
          >
            <PlusIcon className="mr-2 h-4 w-4" />

            {t.actions.newVehicle}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <VehiclesStatsCards stats={MOCK_VEHICLE_STATS} locale={locale} />

      {/* Tabs: All Vehicles / Alerts */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "all" | "alerts")}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <CheckCircle2Icon className="h-4 w-4" />
              Tous les véhicules
              <Badge variant="secondary" className="ml-1">
                {vehicles.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertTriangleIcon className="h-4 w-4" />
              Alertes
              {alerts.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {alerts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.actions.search}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-11 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <VehiclesFilters
                brands={brands}
                locale={locale}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />

              {activeFiltersCount > 0 && (
                <Badge variant="secondary">
                  {activeFiltersCount}{" "}
                  {activeFiltersCount === 1 ? "filtre" : "filtres"}
                </Badge>
              )}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-muted/50">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="min-h-[44px] min-w-[44px] transition-colors"
              aria-label="Vue tableau"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="min-h-[44px] min-w-[44px] transition-colors"
              aria-label="Vue grille"
            >
              <LayoutGridIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Content: All Vehicles */}
        <TabsContent value="all" className="space-y-4 mt-6">
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredVehicles.length}{" "}
              {filteredVehicles.length === 1 ? "véhicule" : "véhicules"}
              {searchQuery && ` trouvé(s) pour "${searchQuery}"`}
            </p>
            {appliedFilters && (
              <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                Réinitialiser les filtres
              </Button>
            )}
          </div>

          {/* Table or Grid View */}
          {viewMode === "table" ? (
            <VehiclesTable
              vehicles={filteredVehicles}
              selectedIds={selectedIds}
              locale={locale}
              onSelectAll={(selected) => {
                setSelectedIds(
                  selected ? filteredVehicles.map((v) => v.id) : []
                );
              }}
              onSelectOne={(id, selected) => {
                setSelectedIds((prev) =>
                  selected ? [...prev, id] : prev.filter((i) => i !== id)
                );
              }}
              onSort={(column) => console.log("Sort by:", column)}
              onView={(vehicle) => console.log("View:", vehicle)}
              onEdit={(vehicle) => console.log("Edit:", vehicle)}
              onPlanning={(vehicle) => console.log("Planning:", vehicle)}
              onMaintenance={(vehicle) => console.log("Maintenance:", vehicle)}
              onDocuments={(vehicle) => console.log("Documents:", vehicle)}
              onDeactivate={(vehicle) => console.log("Deactivate:", vehicle)}
              onDelete={(vehicle) => console.log("Delete:", vehicle)}
            />
          ) : (
            <VehiclesGridView
              vehicles={filteredVehicles}
              locale={locale}
              onView={(vehicle) => console.log("View:", vehicle)}
              onEdit={(vehicle) => console.log("Edit:", vehicle)}
              onPlanning={(vehicle) => console.log("Planning:", vehicle)}
            />
          )}
        </TabsContent>

        {/* Tab Content: Alerts */}
        <TabsContent value="alerts" className="space-y-4 mt-6">
          {/* Alerts Info */}
          <div className="rounded-lg border-2 border-orange-500/20 bg-orange-500/10 dark:border-orange-500/30 dark:bg-orange-500/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">
                  {alerts.length} véhicule(s) nécessite(nt) votre attention
                </h3>
                <p className="text-sm text-muted-foreground">
                  Assurances expirées, expertises à renouveler, maintenances
                  planifiées ou non-conformités OAC
                </p>
              </div>
            </div>
          </div>

          {/* Alerts Table/Grid */}
          {viewMode === "table" ? (
            <VehiclesTable
              vehicles={alerts}
              selectedIds={selectedIds}
              locale={locale}
              onSelectAll={(selected) => {
                setSelectedIds(selected ? alerts.map((v) => v.id) : []);
              }}
              onSelectOne={(id, selected) => {
                setSelectedIds((prev) =>
                  selected ? [...prev, id] : prev.filter((i) => i !== id)
                );
              }}
              onSort={(column) => console.log("Sort by:", column)}
              onView={(vehicle) => console.log("View:", vehicle)}
              onEdit={(vehicle) => console.log("Edit:", vehicle)}
              onPlanning={(vehicle) => console.log("Planning:", vehicle)}
              onMaintenance={(vehicle) => console.log("Maintenance:", vehicle)}
              onDocuments={(vehicle) => console.log("Documents:", vehicle)}
              onDeactivate={(vehicle) => console.log("Deactivate:", vehicle)}
              onDelete={(vehicle) => console.log("Delete:", vehicle)}
            />
          ) : (
            <VehiclesGridView
              vehicles={alerts}
              locale={locale}
              onView={(vehicle) => console.log("View:", vehicle)}
              onEdit={(vehicle) => console.log("Edit:", vehicle)}
              onPlanning={(vehicle) => console.log("Planning:", vehicle)}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Utilization Stats */}
      <VehiclesUtilizationStats
        utilizationData={MOCK_UTILIZATION_DATA}
        locale={locale}
      />

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <VehiclesBulkActions
          selectedCount={selectedIds.length}
          locale={locale}
          onScheduleMaintenance={() => {
            console.log("Schedule maintenance for", selectedIds);
            alert(`Planifier maintenance pour ${selectedIds.length} véhicules`);
          }}
          onExportSelection={() => {
            console.log("Export", selectedIds);
            alert(`Exporter ${selectedIds.length} véhicules`);
          }}
          onChangeStatus={() => {
            console.log("Change status for", selectedIds);
            alert(`Changer statut pour ${selectedIds.length} véhicules`);
          }}
          onDeactivate={() => {
            console.log("Deactivate", selectedIds);
            alert(`Désactiver ${selectedIds.length} véhicules`);
          }}
          onClearSelection={() => setSelectedIds([])}
        />
      )}

      {/* Create Vehicle Wizard */}
      <CreateVehicleWizard
        open={showCreateWizard}
        onOpenChange={setShowCreateWizard}
        onSuccess={(vehicleId) => {
          console.log("Vehicle created:", vehicleId);
          handleRefresh();
        }}
        locale={locale}
      />
    </div>
  );
}
