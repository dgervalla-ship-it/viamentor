/**
 * VIAMENTOR - Courses Calendar Page
 * Page calendrier cours théoriques avec layout split sidebar/main et filtres
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Info, Plus } from "lucide-react";
import { CalendarFiltersSidebar } from "@/polymet/components/viamentor-calendar-filters";
import { CourseCalendarView } from "@/polymet/components/viamentor-course-calendar-view";
import { CoursesPalette } from "@/polymet/components/viamentor-courses-palette";
import { QuickCreateModal } from "@/polymet/components/viamentor-quick-create-modal";
import {
  mockCalendarEvents,
  mockCalendarInstructors,
  calendarI18n,
  filterCalendarEvents,
  type CalendarFilters,
  type CalendarView,
  type CalendarLocale,
  type CalendarEvent,
} from "@/polymet/data/viamentor-courses-calendar-data";
import { mockCourseCategories } from "@/polymet/data/viamentor-courses-categories-data";
import {
  mockCourseTypes,
  type CourseType,
} from "@/polymet/data/viamentor-courses-types-data";
import { CoursesDragDropService } from "@/polymet/data/viamentor-courses-drag-drop-service";

// ============================================================================
// TYPES
// ============================================================================

interface CoursesCalendarPageProps {
  locale?: CalendarLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CoursesCalendarPage({
  locale = "fr",
}: CoursesCalendarPageProps) {
  const t = calendarI18n[locale];

  // State
  const [filters, setFilters] = useState<CalendarFilters>({
    categories: [],
    instructorId: undefined,
    hideFullCourses: false,
    showPastCourses: false,
    searchKeyword: "",
  });
  const [view, setView] = useState<CalendarView>("month");
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);

  // Drag & Drop state
  const [draggedType, setDraggedType] = useState<CourseType | null>(null);
  const [dropDate, setDropDate] = useState<Date | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock locations
  const mockLocations = [
    { id: "loc-1", name: "Salle A - Lausanne" },
    { id: "loc-2", name: "Salle B - Genève" },
    { id: "loc-3", name: "Salle C - Vaud" },
  ];

  // Filter events
  const filteredEvents = filterCalendarEvents(events, filters);

  // Handlers
  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked:", event);
    // TODO: Open event detail modal
  };

  const handleNewCourse = () => {
    console.log("New course clicked");
    // TODO: Open create course wizard
  };

  // Drag & Drop handlers
  const handleDragStart = (type: CourseType) => {
    setDraggedType(type);
  };

  const handleDragEnd = () => {
    setDraggedType(null);
  };

  const handleDrop = (date: Date) => {
    if (!draggedType) return;

    // Validate drop
    const validation = CoursesDragDropService.validateDrop(
      draggedType,
      date,
      events
    );

    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    // Show warnings if any
    if (validation.warnings.length > 0) {
      console.warn("Warnings:", validation.warnings);
    }

    // Open create modal
    setDropDate(date);
    setShowCreateModal(true);
  };

  const handleCreateSessions = (newEvents: Partial<CalendarEvent>[]) => {
    // Add new events to calendar
    const eventsWithIds = newEvents.map((e, idx) => ({
      ...e,
      id: `event-${Date.now()}-${idx}`,
    })) as CalendarEvent[];

    setEvents([...events, ...eventsWithIds]);
    setShowCreateModal(false);
    setDraggedType(null);
    setDropDate(null);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/school">
              {t.breadcrumb.school}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/school/courses/categories">
              {t.breadcrumb.theoryCourses}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.calendar}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">
            {filteredEvents.length} cours planifiés
          </p>
        </div>
        <Button onClick={handleNewCourse}>
          <Plus className="w-4 h-4 mr-2" />

          {t.empty.action}
        </Button>
      </div>

      {/* Alert Info */}
      <Alert>
        <Info className="h-4 w-4" />

        <AlertDescription>
          Visualisez et gérez tous vos cours théoriques planifiés. Utilisez les
          filtres pour affiner votre recherche.
        </AlertDescription>
      </Alert>

      {/* Main Layout - Split Sidebar/Main */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar - Palette & Filters */}
        <aside className="lg:sticky lg:top-6 lg:self-start space-y-4">
          {/* Drag & Drop Palette */}
          <CoursesPalette
            categories={mockCourseCategories}
            types={mockCourseTypes}
            locale={locale}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />

          {/* Filters */}
          <CalendarFiltersSidebar
            filters={filters}
            instructors={mockCalendarInstructors}
            locale={locale}
            onFiltersChange={setFilters}
          />
        </aside>

        {/* Main Calendar */}
        <main>
          <CourseCalendarView
            events={filteredEvents}
            view={view}
            locale={locale}
            onViewChange={setView}
            onEventClick={handleEventClick}
            onNewCourse={handleNewCourse}
            onDrop={handleDrop}
            isDragging={draggedType !== null}
          />
        </main>
      </div>

      {/* Quick Create Modal */}
      <QuickCreateModal
        open={showCreateModal}
        type={draggedType}
        dropDate={dropDate}
        instructors={mockCalendarInstructors}
        locations={mockLocations}
        locale={locale}
        onClose={() => {
          setShowCreateModal(false);
          setDraggedType(null);
          setDropDate(null);
        }}
        onCreate={handleCreateSessions}
      />
    </div>
  );
}
