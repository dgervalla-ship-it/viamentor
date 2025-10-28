/**
 * VIAMENTOR - Lessons Calendar Page
 * Page calendrier interactif avec drag & drop pour toutes les leçons
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  PlusIcon,
  FilterIcon,
  DownloadIcon,
  LayoutListIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { PlanningCalendar } from "@/viamentor/components/viamentor-planning-calendar";
import type { LessonsLocale } from "@/viamentor/data/viamentor-lessons-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface LessonsCalendarPageProps {
  locale?: LessonsLocale;
}

type ViewMode = "month" | "week" | "day";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LessonsCalendarPage({
  locale = "fr",
}: LessonsCalendarPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedInstructor, setSelectedInstructor] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Navigation handlers
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Format date for display
  const getDateRangeText = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
      });
    } else if (viewMode === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString(locale, { day: "numeric", month: "short" })} - ${endOfWeek.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}`;
    } else {
      return currentDate.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/lessons">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Calendrier des leçons</h1>
            <p className="text-muted-foreground">
              Visualisez et gérez toutes les leçons pratiques
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/lessons">
              <LayoutListIcon className="h-4 w-4 mr-2" />
              Liste
            </Link>
          </Button>
          <Button asChild>
            <Link to="/lessons/book">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouvelle leçon
            </Link>
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToday}>
              Aujourd'hui
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handlePrevious}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="min-w-[200px] text-center">
                <span className="font-medium">{getDateRangeText()}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleNext}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2">
            <Select
              value={viewMode}
              onValueChange={(v) => setViewMode(v as ViewMode)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Jour</SelectItem>
                <SelectItem value="week">Semaine</SelectItem>
                <SelectItem value="month">Mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 flex-1">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm font-medium">Filtres:</span>

            <Select
              value={selectedInstructor}
              onValueChange={setSelectedInstructor}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Moniteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les moniteurs</SelectItem>
                <SelectItem value="instructor-1">Jean Dupont</SelectItem>
                <SelectItem value="instructor-2">Marie Leclerc</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="B">Catégorie B</SelectItem>
                <SelectItem value="A">Catégorie A</SelectItem>
                <SelectItem value="C">Catégorie C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-sm font-medium">Légende:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />

            <span className="text-sm">Planifiée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />

            <span className="text-sm">En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="text-sm">Terminée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />

            <span className="text-sm">Annulée</span>
          </div>
        </div>
      </Card>

      {/* Calendar */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <PlanningCalendar
          locale={locale}
          view={viewMode}
          filters={{
            instructorId:
              selectedInstructor === "all" ? undefined : selectedInstructor,
            category: selectedCategory === "all" ? undefined : selectedCategory,
          }}
          onNewPracticalLesson={() => {
            console.warn(
              'Prevented assignment: `window.location.href = "/lessons/book"`'
            ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
          }}
          onEventClick={(event: any) => {
            if (event.type === "lesson") {
              console.warn(
                "Prevented assignment: `window.location.href = `/lessons/${event.id}``"
              ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
            }
          }}
        />
      </div>

      {/* Stats Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Résumé de la période</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">12</p>
            <p className="text-sm text-muted-foreground">Leçons planifiées</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-500">3</p>
            <p className="text-sm text-muted-foreground">En cours</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">45</p>
            <p className="text-sm text-muted-foreground">Terminées</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">2</p>
            <p className="text-sm text-muted-foreground">Annulées</p>
          </div>
        </div>
      </Card>

      {/* Help Text */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

          <div className="space-y-1">
            <p className="text-sm font-medium">Astuce</p>
            <p className="text-sm text-muted-foreground">
              Cliquez sur une leçon pour voir les détails. Utilisez le drag &
              drop pour déplacer une leçon. Double-cliquez sur un créneau vide
              pour créer une nouvelle leçon.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
