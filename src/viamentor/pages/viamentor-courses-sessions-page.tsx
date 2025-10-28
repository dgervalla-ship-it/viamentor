/**
 * VIAMENTOR - Courses Sessions Page
 * Page gestion séances cours théoriques avec stats, filtres, liste et détails
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UsersIcon,
  CheckCircle2Icon,
  FilterIcon,
  XIcon,
} from "lucide-react";
import { SessionsDataTable } from "@/viamentor/components/viamentor-sessions-data-table";
import { SessionDetailSheet } from "@/viamentor/components/viamentor-session-detail-sheet";
import { mockCourseSessions } from "@/viamentor/data/viamentor-courses-calendar-data";

// ============================================================================
// TYPES
// ============================================================================

interface CoursesSessionsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Gestion des séances",
    description: "Gérez les séances de cours théoriques et les participants",
    breadcrumb: {
      school: "École",
      courses: "Cours",
      sessions: "Séances",
    },
    stats: {
      total: "Total séances",
      upcoming: "À venir",
      ongoing: "En cours",
      completed: "Terminées",
    },
    filters: {
      title: "Filtres",
      period: "Période",
      categories: "Catégories",
      instructors: "Moniteurs",
      status: "Statut",
      location: "Lieu",
      unvalidated: "Présences non validées",
      search: "Rechercher...",
      searchButton: "Rechercher",
      reset: "Réinitialiser",
      showFilters: "Afficher les filtres",
      hideFilters: "Masquer les filtres",
    },
    actions: {
      newSession: "Nouvelle séance",
      export: "Exporter",
    },
  },
  de: {
    title: "Sitzungsverwaltung",
    description: "Verwalten Sie theoretische Kurssitzungen und Teilnehmer",
    breadcrumb: {
      school: "Schule",
      courses: "Kurse",
      sessions: "Sitzungen",
    },
    stats: {
      total: "Gesamtsitzungen",
      upcoming: "Bevorstehend",
      ongoing: "Laufend",
      completed: "Abgeschlossen",
    },
    filters: {
      title: "Filter",
      period: "Zeitraum",
      categories: "Kategorien",
      instructors: "Fahrlehrer",
      status: "Status",
      location: "Standort",
      unvalidated: "Nicht validierte Anwesenheit",
      search: "Suchen...",
      searchButton: "Suchen",
      reset: "Zurücksetzen",
      showFilters: "Filter anzeigen",
      hideFilters: "Filter ausblenden",
    },
    actions: {
      newSession: "Neue Sitzung",
      export: "Exportieren",
    },
  },
  it: {
    title: "Gestione sessioni",
    description: "Gestisci le sessioni dei corsi teorici e i partecipanti",
    breadcrumb: {
      school: "Scuola",
      courses: "Corsi",
      sessions: "Sessioni",
    },
    stats: {
      total: "Sessioni totali",
      upcoming: "In arrivo",
      ongoing: "In corso",
      completed: "Completate",
    },
    filters: {
      title: "Filtri",
      period: "Periodo",
      categories: "Categorie",
      instructors: "Istruttori",
      status: "Stato",
      location: "Luogo",
      unvalidated: "Presenze non validate",
      search: "Cerca...",
      searchButton: "Cerca",
      reset: "Reimposta",
      showFilters: "Mostra filtri",
      hideFilters: "Nascondi filtri",
    },
    actions: {
      newSession: "Nuova sessione",
      export: "Esporta",
    },
  },
  en: {
    title: "Sessions Management",
    description: "Manage theory course sessions and participants",
    breadcrumb: {
      school: "School",
      courses: "Courses",
      sessions: "Sessions",
    },
    stats: {
      total: "Total sessions",
      upcoming: "Upcoming",
      ongoing: "Ongoing",
      completed: "Completed",
    },
    filters: {
      title: "Filters",
      period: "Period",
      categories: "Categories",
      instructors: "Instructors",
      status: "Status",
      location: "Location",
      unvalidated: "Unvalidated attendance",
      search: "Search...",
      searchButton: "Search",
      reset: "Reset",
      showFilters: "Show filters",
      hideFilters: "Hide filters",
    },
    actions: {
      newSession: "New session",
      export: "Export",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function CoursesSessionsPage({
  locale = "fr",
}: CoursesSessionsPageProps) {
  const t = translations[locale];
  const [showFilters, setShowFilters] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Stats calculation
  const stats = {
    total: 145,
    upcoming: 42,
    ongoing: 3,
    completed: 100,
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{t.breadcrumb.school}</span>
        <span>/</span>
        <span>{t.breadcrumb.courses}</span>
        <span>/</span>
        <span className="text-foreground font-medium">
          {t.breadcrumb.sessions}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t.title}</h2>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">{t.actions.export}</Button>
          <Button>{t.actions.newSession}</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.total}
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.upcoming}
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {stats.upcoming}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.ongoing}
            </CardTitle>
            <div className="relative">
              <UsersIcon className="h-4 w-4 text-green-500" />

              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {stats.ongoing}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.completed}
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {stats.completed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon className="h-4 w-4 mr-2" />

          {showFilters ? t.filters.hideFilters : t.filters.showFilters}
        </Button>
      </div>

      {/* Sessions DataTable */}
      <SessionsDataTable
        locale={locale}
        showFilters={showFilters}
        onSessionSelect={setSelectedSession}
      />

      {/* Session Detail Sheet */}
      {selectedSession && (
        <SessionDetailSheet
          sessionId={selectedSession}
          locale={locale}
          open={!!selectedSession}
          onOpenChange={(open) => !open && setSelectedSession(null)}
        />
      )}
    </div>
  );
}
