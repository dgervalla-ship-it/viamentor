/**
 * VIAMENTOR Instructors Page
 *
 * Page principale gestion moniteurs School Admin
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  UserPlusIcon,
  SearchIcon,
  LayoutGridIcon,
  LayoutListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { InstructorsStatsCards } from "@/polymet/components/viamentor-instructors-stats-cards";
import { InstructorsFilters } from "@/polymet/components/viamentor-instructors-filters";
import { InstructorsTable } from "@/polymet/components/viamentor-instructors-table";
import { InstructorsGridView } from "@/polymet/components/viamentor-instructors-grid-view";
import { ViaMenutorCreateInstructorWizard } from "@/polymet/components/viamentor-create-instructor-wizard";
import { Instructor } from "@/polymet/data/viamentor-instructors-data";
import {
  InstructorsLocale,
  useInstructorsTranslations,
} from "@/polymet/data/viamentor-instructors-i18n";
import { useInstructorsStore } from "@/polymet/data/viamentor-instructors-store";
import {
  useInstructorsList,
  useInstructorStats,
} from "@/polymet/data/viamentor-use-instructors-query";

interface InstructorsPageProps {
  locale?: InstructorsLocale;
}

export function ViaMenutorInstructorsPage({
  locale = "fr",
}: InstructorsPageProps) {
  const t = useInstructorsTranslations(locale);
  const navigate = useNavigate();

  // Zustand Store (UI State)
  const {
    viewMode,
    setViewMode,
    selectedIds,
    toggleSelection,
    selectAll,
    clearSelection,
    filters,
    setFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  } = useInstructorsStore();

  // TanStack Query (Server Data)
  const { data: instructors = [], isLoading: isLoadingList } =
    useInstructorsList(filters);
  const { data: stats, isLoading: isLoadingStats } = useInstructorStats();

  // Local state for wizard
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  // Instructors are already filtered by TanStack Query
  const filteredInstructors = instructors;

  // Pagination
  const totalPages = Math.ceil(filteredInstructors.length / rowsPerPage);
  const paginatedInstructors = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredInstructors.slice(start, end);
  }, [filteredInstructors, currentPage, rowsPerPage]);

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      selectAll(paginatedInstructors.map((i) => i.id));
    } else {
      clearSelection();
    }
  };

  const handleSelectOne = (id: string, selected: boolean) => {
    toggleSelection(id);
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const handleCreateSuccess = (instructorId: string) => {
    console.log("Instructor created:", instructorId);
    // Ici vous pouvez ajouter la logique pour rafraîchir la liste ou naviguer vers le détail
    // navigate(`/instructors/${instructorId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t.breadcrumbHome}</span>
          <span>/</span>
          <span className="text-foreground font-medium">
            {t.breadcrumbInstructors}
          </span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t.pageTitle}
          </h1>
          <Button
            onClick={() => setShowCreateWizard(true)}
            className="min-h-[44px] w-full sm:w-auto"
          >
            <UserPlusIcon className="mr-2 h-4 w-4" />

            {t.newInstructor}
          </Button>
        </div>

        {/* Stats Cards */}
        {isLoadingStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          stats && <InstructorsStatsCards stats={stats} locale={locale} />
        )}

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder={t.searchPlaceholder}
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10 h-11 border-border focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <InstructorsFilters
            locale={locale}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />

          <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-muted/50">
            <Label htmlFor="view-toggle" className="sr-only">
              {t.viewToggle}
            </Label>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="min-h-[44px] min-w-[44px] transition-colors"
              aria-label="Vue tableau"
            >
              <LayoutListIcon className="h-4 w-4" />
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

        {/* Results count */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="text-sm text-muted-foreground">
            {filteredInstructors.length}{" "}
            {filteredInstructors.length === 1 ? "résultat" : "résultats"}
          </p>
        </div>

        {/* Table or Grid View */}
        {isLoadingList ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : viewMode === "table" ? (
          <InstructorsTable
            instructors={paginatedInstructors}
            selectedIds={selectedIds}
            locale={locale}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onView={(instructor) => navigate(`/instructors/${instructor.id}`)}
            onEdit={(instructor) => console.log("Edit:", instructor)}
            onPlanning={(instructor) => console.log("Planning:", instructor)}
            onSuspend={(instructor) => console.log("Suspend:", instructor)}
            onDelete={(instructor) => console.log("Delete:", instructor)}
          />
        ) : (
          <InstructorsGridView
            instructors={paginatedInstructors}
            locale={locale}
            onView={(instructor) => navigate(`/instructors/${instructor.id}`)}
            onEdit={(instructor) => console.log("Edit:", instructor)}
            onPlanning={(instructor) => console.log("Planning:", instructor)}
          />
        )}

        {/* Create Instructor Wizard */}
        <ViaMenutorCreateInstructorWizard
          open={showCreateWizard}
          onOpenChange={setShowCreateWizard}
          locale={locale}
          onSuccess={handleCreateSuccess}
        />

        {/* Pagination */}
        {filteredInstructors.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {t.rowsPerPage}:
              </span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => setRowsPerPage(Number(value))}
              >
                <SelectTrigger className="w-20 h-11 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {t.page} {currentPage} {t.of} {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="min-h-[44px] min-w-[44px] border-border"
                  aria-label="Page précédente"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="min-h-[44px] min-w-[44px] border-border"
                  aria-label="Page suivante"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
