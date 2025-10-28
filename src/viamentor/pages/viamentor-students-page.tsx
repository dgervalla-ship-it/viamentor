/**
 * VIAMENTOR Students Page
 * Page principale gestion élèves School Admin
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  UserPlusIcon,
  SearchIcon,
  DownloadIcon,
  TableIcon,
  LayoutGridIcon,
} from "lucide-react";
import { StudentsStatsCards } from "@/viamentor/components/viamentor-students-stats-cards";
import { StudentsTable } from "@/viamentor/components/viamentor-students-table";
import { StudentsFilters } from "@/viamentor/components/viamentor-students-filters";
import { BulkActionsBar } from "@/viamentor/components/viamentor-students-bulk-actions";
import { StudentsGridView } from "@/viamentor/components/viamentor-students-grid-view";
import { CreateStudentWizard } from "@/viamentor/components/viamentor-create-student-wizard";
import { MOCK_FILTER_PRESETS } from "@/viamentor/data/viamentor-students-data";
import {
  StudentsLocale,
  useStudentsTranslations,
} from "@/viamentor/data/viamentor-students-i18n";
import { useStudentsQueryParams } from "@/viamentor/data/viamentor-url-query-params";
import { useStudents, useStudentsStats } from "@/lib/hooks/use-students";
import { useInstructors } from "@/lib/hooks/use-instructors";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

interface StudentsPageProps {
  locale?: StudentsLocale;
}

export function StudentsPage({ locale = "fr" }: StudentsPageProps) {
  const t = useStudentsTranslations(locale);

  // Fetch data from APIs
  const { data: students, isLoading: studentsLoading, error: studentsError } = useStudents();
  const { data: stats, isLoading: statsLoading } = useStudentsStats();
  const { data: instructors } = useInstructors();

  // Use query params hook
  const {
    view,
    setView,
    search: searchParam,
    setSearch: setSearchParam,
    status,
    setStatus,
    category,
    setCategory,
    instructor,
    setInstructor,
  } = useStudentsQueryParams();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [createWizardOpen, setCreateWizardOpen] = useState(false);

  // Loading state
  if (studentsLoading || statsLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Error state
  if (studentsError) {
    return <ErrorMessage error={studentsError} fullScreen />;
  }

  // No data fallback
  if (!students || students.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Aucun élève trouvé</p>
          <Button onClick={() => setCreateWizardOpen(true)}>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Créer un élève
          </Button>
        </div>
      </div>
    );
  }

  // Map view to viewMode (list/grid/cards -> table/grid)
  const viewMode =
    view === "list"
      ? "table"
      : view === "cards"
        ? "grid"
        : view === "grid"
          ? "grid"
          : "table";

  const setViewMode = (mode: "table" | "grid") => {
    setView(mode === "table" ? "list" : "grid");
  };

  // Sync search query with URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== searchParam) {
        setSearchParam(searchQuery);
      }
    }, 500); // Debounce
    return () => clearTimeout(timer);
  }, [searchQuery, searchParam, setSearchParam]);

  const handleSelectAll = (selected: boolean) => {
    setSelectedIds(selected ? students.map((s) => s.id) : []);
  };

  const handleSelectOne = (id: string, selected: boolean) => {
    setSelectedIds(
      selected ? [...selectedIds, id] : selectedIds.filter((sid) => sid !== id)
    );
  };

  const handleStudentCreated = (studentId: string) => {
    console.log("Student created with ID:", studentId);
    // In production, you would refresh the students list here
    // or add the new student to the local state
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {t.pageTitle}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t.breadcrumb} / {t.pageTitle}
              </p>
            </div>
            <Button
              className="min-h-[44px] w-full sm:w-auto"
              onClick={() => setCreateWizardOpen(true)}
            >
              <UserPlusIcon className="mr-2 h-4 w-4" />

              {t.newStudent}
            </Button>
          </div>

          {/* Stats Cards */}
          <StudentsStatsCards stats={stats} locale={locale} />

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="pl-10 h-11 border-border focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <StudentsFilters
              instructors={instructors || []}
              presets={MOCK_FILTER_PRESETS}
              locale={locale}
              onApply={(filters) => console.log("Apply filters:", filters)}
              onReset={() => console.log("Reset filters")}
              onSavePreset={(name, filters) =>
                console.log("Save preset:", name, filters)
              }
              onLoadPreset={(preset) => console.log("Load preset:", preset)}
            />

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-h-[44px] border-border"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />

                  {t.export}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Export Excel")}>
                  {t.exportExcel}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Export CSV")}>
                  {t.exportCSV}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Export PDF")}>
                  {t.exportPDF}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {viewMode === "table" ? (
            <StudentsTable
              students={students}
              instructors={instructors || []}
              selectedIds={selectedIds}
              locale={locale}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onSort={(column) => console.log("Sort:", column)}
              onInstructorChange={(studentId, instructorId) =>
                console.log("Assign instructor:", studentId, instructorId)
              }
              onStatusChange={(studentId, status) =>
                console.log("Change status:", studentId, status)
              }
              onEdit={(student) => console.log("Edit:", student)}
              onBookLesson={(student) => console.log("Book lesson:", student)}
              onInvoice={(student) => console.log("Invoice:", student)}
              onDocuments={(student) => console.log("Documents:", student)}
              onDelete={(student) => console.log("Delete:", student)}
            />
          ) : (
            <StudentsGridView
              students={MOCK_STUDENTS}
              locale={locale}
              onEdit={(student) => console.log("Edit:", student)}
              onBookLesson={(student) => console.log("Book lesson:", student)}
            />
          )}
        </div>

        {/* Empty State */}
        {students.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-6">
              <div className="h-24 w-24 mx-auto rounded-full bg-muted flex items-center justify-center">
                <UserPlusIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{t.noStudentsFound}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.createFirstStudent}
                </p>
              </div>
              <Button
                className="min-h-[44px]"
                onClick={() => setCreateWizardOpen(true)}
              >
                <UserPlusIcon className="mr-2 h-4 w-4" />

                {t.newStudent}
              </Button>
            </div>
          </div>
        )}

        {/* Bulk Actions Bar */}
        <BulkActionsBar
          selectedCount={selectedIds.length}
          locale={locale}
          onAssignInstructor={() => console.log("Assign instructor")}
          onSendEmail={() => console.log("Send email")}
          onChangeStatus={() => console.log("Change status")}
          onExportSelection={() => console.log("Export selection")}
          onPrintConvocations={() => console.log("Print convocations")}
          onDelete={() => console.log("Delete")}
          onClearSelection={() => setSelectedIds([])}
        />
      </div>

      {/* Create Student Wizard */}
      <CreateStudentWizard
        open={createWizardOpen}
        onOpenChange={setCreateWizardOpen}
        instructors={instructors || []}
        locale={locale}
        onSuccess={handleStudentCreated}
      />
    </div>
  );
}
