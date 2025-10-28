/**
 * VIAMENTOR - Planning Page
 * Page principale Planning avec calendar view intégrant cours théoriques
 */

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CalendarIcon,
  UsersIcon,
  CarIcon,
  ClipboardCheckIcon,
  PlusIcon,
  DownloadIcon,
  PrinterIcon,
  RefreshCwIcon,
  FilterIcon,
} from "lucide-react";
import {
  PlanningCalendar,
  type PlanningFilters,
} from "@/viamentor/components/viamentor-planning-calendar";
import { mockTheoryCourses } from "@/viamentor/data/viamentor-theory-courses-data";
import {
  planningTranslations,
  type PlanningLocale,
} from "@/viamentor/data/viamentor-planning-i18n";
import { usePlanningQueryParams } from "@/viamentor/data/viamentor-url-query-params";
import { CreateTheoryCourseWizard } from "@/viamentor/components/viamentor-create-theory-course-wizard";

interface PlanningPageProps {
  locale?: PlanningLocale;
}

export function PlanningPage({ locale = "fr" }: PlanningPageProps) {
  // Add print styles
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        @page {
          size: A4 landscape;
          margin: 1cm;
        }
        body * {
          visibility: hidden;
        }
        .print\\:block, .print\\:block * {
          visibility: visible;
        }
        .print\\:hidden {
          display: none !important;
        }
        .print\\:p-8 {
          padding: 2rem;
        }
        /* Hide sidebar and header */
        aside, header, nav {
          display: none !important;
        }
      }
    `;
    if (!document.getElementById("print-styles")) {
      style.id = "print-styles";
      document.head.appendChild(style);
    }
  }

  const t = planningTranslations[locale];

  // Use query params hook
  const {
    view,
    setView,
    category: categoryParam,
    setCategory: setCategoryParam,
    instructor: instructorParam,
    setInstructor: setInstructorParam,
  } = usePlanningQueryParams();

  const [filters, setFilters] = useState<PlanningFilters>({
    type: "all",
    status: "all",
    category: categoryParam || "all",
    instructor: instructorParam || "all",
  });
  const printRef = useRef<HTMLDivElement>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Sync filters with query params
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam || "all",
      instructor: instructorParam || "all",
    }));
  }, [categoryParam, instructorParam]);

  // Update query params when filters change
  const handleCategoryChange = (value: string) => {
    setCategoryParam(value);
    setFilters({ ...filters, category: value });
  };

  const handleInstructorChange = (value: string) => {
    setInstructorParam(value);
    setFilters({ ...filters, instructor: value });
  };

  // Calculate stats
  const totalEvents = mockTheoryCourses.length;
  const theoryCourses = mockTheoryCourses.filter(
    (c) => c.type === "theory" || c.type === "sensibilisation"
  ).length;
  const todayEvents = mockTheoryCourses.filter((c) => {
    const today = new Date();
    const courseDate = new Date(c.startDate);
    return (
      courseDate.getDate() === today.getDate() &&
      courseDate.getMonth() === today.getMonth() &&
      courseDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // Export to PDF (using native print)
  const handlePrint = () => {
    window.print();
  };

  // Export to Excel
  const handleExportExcel = () => {
    // Simple CSV export (can be enhanced with xlsx library)
    const headers = [
      "Date",
      "Heure",
      "Type",
      "Titre",
      "Participants",
      "Status",
    ];

    const rows = mockTheoryCourses.map((course) => [
      new Date(course.startDate).toLocaleDateString(locale),
      `${course.startTime} - ${course.endTime}`,
      course.type,
      course.topic,
      `${course.enrolled}/${course.capacity}`,
      course.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `planning-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const stats = [
    {
      title: t.stats.totalEvents,
      value: totalEvents,
      icon: CalendarIcon,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: t.stats.theoryCourses,
      value: theoryCourses,
      icon: UsersIcon,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: t.stats.today,
      value: todayEvents,
      icon: ClipboardCheckIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
            <Button
              variant={view === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("month")}
              className="min-h-[44px] px-4"
              aria-label={t.views.month}
            >
              {t.views.month}
            </Button>
            <Button
              variant={view === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("week")}
              className="min-h-[44px] px-4"
              aria-label={t.views.week}
            >
              {t.views.week}
            </Button>
            <Button
              variant={view === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("day")}
              className="min-h-[44px] px-4"
              aria-label={t.views.day}
            >
              {t.views.day}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={
              () =>
                console.warn(
                  "Prevented function call: `window.location.reload()`"
                ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/
            }
            className="min-h-[44px] border-border"
            aria-label={t.actions.refresh}
          >
            <RefreshCwIcon className="h-4 w-4 sm:mr-2" />

            <span className="hidden sm:inline">{t.actions.refresh}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportExcel}
            className="min-h-[44px] border-border"
            aria-label={t.actions.export}
          >
            <DownloadIcon className="h-4 w-4 sm:mr-2" />

            <span className="hidden sm:inline">{t.actions.export}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="min-h-[44px] border-border"
            aria-label={t.actions.print}
          >
            <PrinterIcon className="h-4 w-4 sm:mr-2" />

            <span className="hidden sm:inline">{t.actions.print}</span>
          </Button>
          <Button
            size="sm"
            className="min-h-[44px]"
            onClick={() => setIsWizardOpen(true)}
            aria-label={t.actions.newTheoryCourse}
          >
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.actions.newTheoryCourse}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                      {stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`${stat.bgColor} p-2.5 sm:p-3 rounded-lg shrink-0`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FilterIcon className="h-4 w-4 sm:h-5 sm:w-5" />

              {t.filters.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  type: "all",
                  status: "all",
                  category: "all",
                  instructor: "all",
                })
              }
              className="min-h-[44px]"
            >
              {t.filters.reset}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                Type d'événement
              </label>
              <Select
                value={filters.type}
                onValueChange={(value) =>
                  setFilters({ ...filters, type: value as any })
                }
              >
                <SelectTrigger className="h-11 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.all}</SelectItem>
                  <SelectItem value="theory">
                    {t.filters.theoryCourses}
                  </SelectItem>
                  <SelectItem value="practical">
                    {t.filters.practicalLessons}
                  </SelectItem>
                  <SelectItem value="exams">{t.filters.exams}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                {t.filters.status}
              </label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters({ ...filters, status: value as any })
                }
              >
                <SelectTrigger className="h-11 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="scheduled">Prévu</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="canceled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                {t.filters.category}
              </label>
              <Select
                value={filters.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="h-11 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="B">Catégorie B</SelectItem>
                  <SelectItem value="A">Catégorie A</SelectItem>
                  <SelectItem value="A1">Catégorie A1</SelectItem>
                  <SelectItem value="C">Catégorie C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-foreground">
                {t.filters.instructor}
              </label>
              <Select
                value={filters.instructor}
                onValueChange={handleInstructorChange}
              >
                <SelectTrigger className="h-11 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="inst-1">Marc Dubois</SelectItem>
                  <SelectItem value="inst-2">Sophie Martin</SelectItem>
                  <SelectItem value="inst-3">Jean Müller</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <div ref={printRef} className="print:p-8">
        <PlanningCalendar
          locale={locale}
          view={view}
          filters={filters}
          onNewTheoryCourse={() => console.log("New theory course")}
          onNewPracticalLesson={() => console.log("New practical lesson")}
          onEventClick={(event) => console.log("Event clicked:", event)}
          onEventDrop={(eventId, newDate, newTime) => {
            console.log("Event dropped:", eventId, newDate, newTime);
            // Here you would update the event in your backend
          }}
        />
      </div>

      {/* Legend */}
      <Card className="print:hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Légende</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-l-4 border-blue-500 bg-blue-500/10 shrink-0" />

              <span className="text-xs sm:text-sm text-foreground">
                Cours théorique prévu
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-l-4 border-orange-500 bg-orange-500/10 shrink-0" />

              <span className="text-xs sm:text-sm text-foreground">
                Leçon pratique prévue
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-l-4 border-green-500 bg-green-500/10 shrink-0" />

              <span className="text-xs sm:text-sm text-foreground">
                En cours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-l-4 border-gray-500 bg-gray-500/10 shrink-0" />

              <span className="text-xs sm:text-sm text-foreground">
                Terminé
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-l-4 border-red-500 bg-red-500/10 shrink-0" />

              <span className="text-xs sm:text-sm text-foreground">Annulé</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Theory Course Wizard */}
      <CreateTheoryCourseWizard
        open={isWizardOpen}
        onOpenChange={setIsWizardOpen}
        locale={locale}
        onSuccess={(courseId) => {
          console.log("Course created:", courseId);
          // Refresh the calendar or show success message
        }}
      />
    </div>
  );
}
