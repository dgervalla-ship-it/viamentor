/**
 * VIAMENTOR - Staff Prospects Page
 * Page CRM prospects avec stats, Kanban/Table toggle, filtres, bulk actions
 */

"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutGridIcon,
  TableIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  CalendarIcon,
  DollarSignIcon,
  PercentIcon,
} from "lucide-react";
import { ProspectsKanban } from "@/polymet/components/viamentor-prospects-kanban";
import { ProspectsFiltersComponent } from "@/polymet/components/viamentor-prospects-filters";
import { ProspectsBulkActions } from "@/polymet/components/viamentor-prospects-bulk-actions";
import { ProspectDetailSheet } from "@/polymet/components/viamentor-prospect-detail-sheet";
import type {
  Prospect,
  ProspectStatus,
  ProspectsFilters,
} from "@/polymet/data/viamentor-prospects-data";
import {
  mockProspects,
  mockProspectStats,
  mockTeamMembers,
  filterProspects,
} from "@/polymet/data/viamentor-prospects-data";
import type { ProspectsLocale } from "@/polymet/data/viamentor-prospects-i18n";
import { getProspectsTranslations } from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StaffProspectsPageProps {
  locale?: ProspectsLocale;
}

type ViewMode = "kanban" | "table";

// ============================================================================
// COMPONENT
// ============================================================================

export function StaffProspectsPage({ locale = "fr" }: StaffProspectsPageProps) {
  const t = getProspectsTranslations(locale);

  // State
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("prospects-view-mode") as ViewMode) || "kanban"
      );
    }
    return "kanban";
  });
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(
    null
  );
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [filters, setFilters] = useState<ProspectsFilters>({
    search: "",
    sources: [],
    categories: [],
    assignedTo: null,
    dateRange: { from: null, to: null },
    leadScoreRange: [0, 100],
    notContactedOver24h: false,
  });

  // Filtered prospects
  const filteredProspects = useMemo(() => {
    return filterProspects(prospects, filters);
  }, [prospects, filters]);

  // Handlers
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("prospects-view-mode", mode);
    }
  };

  const handleStatusChange = (
    prospectId: string,
    newStatus: ProspectStatus
  ) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === prospectId ? { ...p, status: newStatus } : p))
    );
  };

  const handleApplyFilters = (newFilters: ProspectsFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      sources: [],
      categories: [],
      assignedTo: null,
      dateRange: { from: null, to: null },
      leadScoreRange: [0, 100],
      notContactedOver24h: false,
    });
  };

  const handleBulkAssign = (memberId: string) => {
    setProspects((prev) =>
      prev.map((p) =>
        selectedIds.includes(p.id) ? { ...p, assignedTo: memberId } : p
      )
    );
    setSelectedIds([]);
  };

  const handleBulkStatusChange = (status: ProspectStatus) => {
    setProspects((prev) =>
      prev.map((p) => (selectedIds.includes(p.id) ? { ...p, status } : p))
    );
    setSelectedIds([]);
  };

  const handleBulkEmail = (subject: string, message: string) => {
    console.log("Send email to:", selectedIds, { subject, message });
    setSelectedIds([]);
  };

  const handleBulkExport = () => {
    const selectedProspects = prospects.filter((p) =>
      selectedIds.includes(p.id)
    );
    console.log("Export CSV:", selectedProspects);
  };

  const handleBulkDelete = () => {
    setProspects((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-1">
          {t.page.title}
        </h3>
        <p className="text-sm text-muted-foreground">{t.page.breadcrumb}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.activeProspects}
            </span>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockProspectStats.activeProspects}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.newThisMonth}
            </span>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              {mockProspectStats.newThisMonth}
            </span>
            <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUpIcon className="h-3 w-3" />+
              {mockProspectStats.newThisMonthTrend}%
            </span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.conversionRate}
            </span>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockProspectStats.conversionRate}%
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.avgConversionTime}
            </span>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockProspectStats.avgConversionTime} {t.stats.days}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t.stats.pipelineValue}
            </span>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockProspectStats.pipelineValue.toLocaleString()} CHF
          </div>
        </Card>
      </div>

      {/* Filters */}
      <ProspectsFiltersComponent
        teamMembers={mockTeamMembers}
        locale={locale}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredProspects.length} {t.misc.noProspects.toLowerCase()}
        </div>

        <Tabs
          value={viewMode}
          onValueChange={(v) => handleViewModeChange(v as ViewMode)}
        >
          <TabsList>
            <TabsTrigger value="kanban" className="gap-2">
              <LayoutGridIcon className="h-4 w-4" />

              {t.views.kanban}
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <TableIcon className="h-4 w-4" />

              {t.views.table}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {viewMode === "kanban" ? (
        <ProspectsKanban
          prospects={filteredProspects}
          locale={locale}
          onStatusChange={handleStatusChange}
          onView={(p) => {
            setSelectedProspect(p);
            setDetailSheetOpen(true);
          }}
          onCall={(p) => window.open(`tel:${p.phone}`)}
          onEmail={(p) => window.open(`mailto:${p.email}`)}
          onSchedule={(p) => console.log("Schedule:", p)}
          onConvert={(p) => console.log("Convert:", p)}
          onMarkLost={(p) => console.log("Mark lost:", p)}
          onAssign={(p) => console.log("Assign:", p)}
        />
      ) : (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            Table view coming soon...
          </p>
        </Card>
      )}

      {/* Detail Sheet */}
      <ProspectDetailSheet
        prospect={selectedProspect}
        teamMembers={mockTeamMembers}
        locale={locale}
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        onUpdate={(prospect) => {
          setProspects((prev) =>
            prev.map((p) => (p.id === prospect.id ? prospect : p))
          );
          setSelectedProspect(prospect);
        }}
        onDelete={(id) => {
          setProspects((prev) => prev.filter((p) => p.id !== id));
          setDetailSheetOpen(false);
        }}
        onConvert={(p) => console.log("Convert:", p)}
        onCall={(p) => window.open(`tel:${p.phone}`)}
        onEmail={(p) => window.open(`mailto:${p.email}`)}
        onSchedule={(p) => console.log("Schedule:", p)}
        onMarkLost={(p, reason) => {
          setProspects((prev) =>
            prev.map((prospect) =>
              prospect.id === p.id ? { ...prospect, status: "lost" } : prospect
            )
          );
          console.log("Mark lost:", p, reason);
        }}
      />

      {/* Bulk Actions */}
      <ProspectsBulkActions
        selectedCount={selectedIds.length}
        teamMembers={mockTeamMembers}
        locale={locale}
        onAssign={handleBulkAssign}
        onChangeStatus={handleBulkStatusChange}
        onSendEmail={handleBulkEmail}
        onExportCSV={handleBulkExport}
        onDelete={handleBulkDelete}
        onClearSelection={() => setSelectedIds([])}
      />
    </div>
  );
}
