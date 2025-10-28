/**
 * VIAMENTOR - Availability Global Page
 * Page disponibilités globales moniteurs pour School Admin
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  FilterIcon,
  DownloadIcon,
  PlusIcon,
  InfoIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ============================================================================
// TYPES
// ============================================================================

interface AvailabilityGlobalPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type ViewMode = "week" | "month";
type FilterStatus = "all" | "available" | "busy" | "unavailable";

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      availability: "Disponibilités Moniteurs",
    },
    title: "Disponibilités Moniteurs",
    description: "Vue d'ensemble des disponibilités de l'équipe de moniteurs",
    tabs: {
      overview: "Vue d'ensemble",
      calendar: "Calendrier",
      conflicts: "Conflits",
      stats: "Statistiques",
    },
    stats: {
      totalInstructors: "Moniteurs actifs",
      availableNow: "Disponibles maintenant",
      busyNow: "En cours de leçon",
      conflicts: "Conflits détectés",
    },
    filters: {
      view: "Vue",
      week: "Semaine",
      month: "Mois",
      status: "Statut",
      all: "Tous",
      available: "Disponibles",
      busy: "Occupés",
      unavailable: "Indisponibles",
      category: "Catégorie",
      allCategories: "Toutes catégories",
    },
    actions: {
      addSlot: "Ajouter créneau",
      export: "Exporter",
      refresh: "Actualiser",
    },
    alert: {
      conflicts: "Conflits détectés",
      conflictsDesc:
        "3 moniteurs ont des créneaux qui se chevauchent. Vérifiez l'onglet Conflits.",
    },
    overview: {
      title: "Disponibilités par moniteur",
      noData: "Aucune donnée disponible",
    },
    calendar: {
      title: "Planning hebdomadaire",
      noSlots: "Aucun créneau défini",
    },
    conflicts: {
      title: "Conflits de disponibilités",
      noConflicts: "Aucun conflit détecté",
      resolve: "Résoudre",
    },
    statsTab: {
      title: "Statistiques d'utilisation",
      avgHours: "Heures moyennes/semaine",
      utilizationRate: "Taux d'utilisation",
      peakHours: "Heures de pointe",
    },
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      availability: "Fahrlehrer-Verfügbarkeit",
    },
    title: "Fahrlehrer-Verfügbarkeit",
    description: "Übersicht über die Verfügbarkeit des Fahrlehrer-Teams",
    tabs: {
      overview: "Übersicht",
      calendar: "Kalender",
      conflicts: "Konflikte",
      stats: "Statistiken",
    },
    stats: {
      totalInstructors: "Aktive Fahrlehrer",
      availableNow: "Jetzt verfügbar",
      busyNow: "Im Unterricht",
      conflicts: "Konflikte erkannt",
    },
    filters: {
      view: "Ansicht",
      week: "Woche",
      month: "Monat",
      status: "Status",
      all: "Alle",
      available: "Verfügbar",
      busy: "Beschäftigt",
      unavailable: "Nicht verfügbar",
      category: "Kategorie",
      allCategories: "Alle Kategorien",
    },
    actions: {
      addSlot: "Zeitfenster hinzufügen",
      export: "Exportieren",
      refresh: "Aktualisieren",
    },
    alert: {
      conflicts: "Konflikte erkannt",
      conflictsDesc:
        "3 Fahrlehrer haben überlappende Zeitfenster. Überprüfen Sie die Registerkarte Konflikte.",
    },
    overview: {
      title: "Verfügbarkeit nach Fahrlehrer",
      noData: "Keine Daten verfügbar",
    },
    calendar: {
      title: "Wochenplanung",
      noSlots: "Keine Zeitfenster definiert",
    },
    conflicts: {
      title: "Verfügbarkeitskonflikte",
      noConflicts: "Keine Konflikte erkannt",
      resolve: "Lösen",
    },
    statsTab: {
      title: "Nutzungsstatistiken",
      avgHours: "Durchschnittliche Stunden/Woche",
      utilizationRate: "Auslastungsrate",
      peakHours: "Stoßzeiten",
    },
  },
  it: {
    breadcrumb: {
      home: "Home",
      availability: "Disponibilità Istruttori",
    },
    title: "Disponibilità Istruttori",
    description: "Panoramica delle disponibilità del team di istruttori",
    tabs: {
      overview: "Panoramica",
      calendar: "Calendario",
      conflicts: "Conflitti",
      stats: "Statistiche",
    },
    stats: {
      totalInstructors: "Istruttori attivi",
      availableNow: "Disponibili ora",
      busyNow: "In lezione",
      conflicts: "Conflitti rilevati",
    },
    filters: {
      view: "Vista",
      week: "Settimana",
      month: "Mese",
      status: "Stato",
      all: "Tutti",
      available: "Disponibili",
      busy: "Occupati",
      unavailable: "Non disponibili",
      category: "Categoria",
      allCategories: "Tutte le categorie",
    },
    actions: {
      addSlot: "Aggiungi slot",
      export: "Esporta",
      refresh: "Aggiorna",
    },
    alert: {
      conflicts: "Conflitti rilevati",
      conflictsDesc:
        "3 istruttori hanno slot sovrapposti. Controlla la scheda Conflitti.",
    },
    overview: {
      title: "Disponibilità per istruttore",
      noData: "Nessun dato disponibile",
    },
    calendar: {
      title: "Pianificazione settimanale",
      noSlots: "Nessuno slot definito",
    },
    conflicts: {
      title: "Conflitti di disponibilità",
      noConflicts: "Nessun conflitto rilevato",
      resolve: "Risolvi",
    },
    statsTab: {
      title: "Statistiche di utilizzo",
      avgHours: "Ore medie/settimana",
      utilizationRate: "Tasso di utilizzo",
      peakHours: "Ore di punta",
    },
  },
  en: {
    breadcrumb: {
      home: "Home",
      availability: "Instructor Availability",
    },
    title: "Instructor Availability",
    description: "Overview of instructor team availability",
    tabs: {
      overview: "Overview",
      calendar: "Calendar",
      conflicts: "Conflicts",
      stats: "Statistics",
    },
    stats: {
      totalInstructors: "Active instructors",
      availableNow: "Available now",
      busyNow: "In lesson",
      conflicts: "Conflicts detected",
    },
    filters: {
      view: "View",
      week: "Week",
      month: "Month",
      status: "Status",
      all: "All",
      available: "Available",
      busy: "Busy",
      unavailable: "Unavailable",
      category: "Category",
      allCategories: "All categories",
    },
    actions: {
      addSlot: "Add slot",
      export: "Export",
      refresh: "Refresh",
    },
    alert: {
      conflicts: "Conflicts detected",
      conflictsDesc:
        "3 instructors have overlapping slots. Check the Conflicts tab.",
    },
    overview: {
      title: "Availability by instructor",
      noData: "No data available",
    },
    calendar: {
      title: "Weekly schedule",
      noSlots: "No slots defined",
    },
    conflicts: {
      title: "Availability conflicts",
      noConflicts: "No conflicts detected",
      resolve: "Resolve",
    },
    statsTab: {
      title: "Usage statistics",
      avgHours: "Average hours/week",
      utilizationRate: "Utilization rate",
      peakHours: "Peak hours",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_STATS = {
  totalInstructors: 12,
  availableNow: 8,
  busyNow: 3,
  conflicts: 3,
};

const MOCK_INSTRUCTORS = [
  {
    id: "1",
    name: "Jean Dupont",
    avatar: "https://github.com/yusufhilmi.png",
    status: "available" as const,
    categories: ["B", "A"],
    hoursThisWeek: 32,
    nextSlot: "Aujourd'hui 14:00",
  },
  {
    id: "2",
    name: "Marie Martin",
    avatar: "https://github.com/kdrnp.png",
    status: "busy" as const,
    categories: ["B"],
    hoursThisWeek: 38,
    nextSlot: "En cours jusqu'à 15:00",
  },
  {
    id: "3",
    name: "Pierre Bernard",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "unavailable" as const,
    categories: ["B", "C"],
    hoursThisWeek: 0,
    nextSlot: "Congé jusqu'au 25/10",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function AvailabilityGlobalPage({
  locale = "fr",
}: AvailabilityGlobalPageProps) {
  const t = translations[locale];

  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/school/dashboard">
              {t.breadcrumb.home}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.availability}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="w-4 h-4 mr-2" />

            {t.actions.refresh}
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />

            {t.actions.export}
          </Button>
          <Button size="sm">
            <PlusIcon className="w-4 h-4 mr-2" />

            {t.actions.addSlot}
          </Button>
        </div>
      </div>

      {/* Alert Conflicts */}
      {MOCK_STATS.conflicts > 0 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="w-4 h-4" />

          <AlertTitle>{t.alert.conflicts}</AlertTitle>
          <AlertDescription>{t.alert.conflictsDesc}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalInstructors}
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_STATS.totalInstructors}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.availableNow}
            </CardTitle>
            <CheckCircle2Icon className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {MOCK_STATS.availableNow}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.busyNow}
            </CardTitle>
            <ClockIcon className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {MOCK_STATS.busyNow}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.conflicts}
            </CardTitle>
            <XCircleIcon className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {MOCK_STATS.conflicts}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.filters.view}:</span>
              <Select
                value={viewMode}
                onValueChange={(value) => setViewMode(value as ViewMode)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t.filters.week}</SelectItem>
                  <SelectItem value="month">{t.filters.month}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.filters.status}:</span>
              <Select
                value={filterStatus}
                onValueChange={(value) =>
                  setFilterStatus(value as FilterStatus)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.all}</SelectItem>
                  <SelectItem value="available">
                    {t.filters.available}
                  </SelectItem>
                  <SelectItem value="busy">{t.filters.busy}</SelectItem>
                  <SelectItem value="unavailable">
                    {t.filters.unavailable}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.filters.category}:</span>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.allCategories}</SelectItem>
                  <SelectItem value="B">Catégorie B</SelectItem>
                  <SelectItem value="A">Catégorie A</SelectItem>
                  <SelectItem value="C">Catégorie C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="calendar">{t.tabs.calendar}</TabsTrigger>
          <TabsTrigger value="conflicts">
            {t.tabs.conflicts}
            {MOCK_STATS.conflicts > 0 && (
              <Badge variant="destructive" className="ml-2">
                {MOCK_STATS.conflicts}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stats">{t.tabs.stats}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.overview.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_INSTRUCTORS.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <div className="font-medium">{instructor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {instructor.categories.join(", ")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {instructor.hoursThisWeek}h
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {instructor.nextSlot}
                        </div>
                      </div>
                      <Badge
                        variant={
                          instructor.status === "available"
                            ? "default"
                            : instructor.status === "busy"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {instructor.status === "available" &&
                          t.filters.available}
                        {instructor.status === "busy" && t.filters.busy}
                        {instructor.status === "unavailable" &&
                          t.filters.unavailable}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>{t.calendar.title}</CardTitle>
              <CardDescription>
                Vue calendrier des disponibilités (à implémenter)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />

                  <p className="text-muted-foreground">{t.calendar.noSlots}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conflicts Tab */}
        <TabsContent value="conflicts">
          <Card>
            <CardHeader>
              <CardTitle>{t.conflicts.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <InfoIcon className="w-4 h-4" />

                <AlertTitle>Fonctionnalité à venir</AlertTitle>
                <AlertDescription>
                  La détection automatique des conflits sera disponible
                  prochainement.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>{t.statsTab.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <InfoIcon className="w-4 h-4" />

                <AlertTitle>Fonctionnalité à venir</AlertTitle>
                <AlertDescription>
                  Les statistiques détaillées d'utilisation seront disponibles
                  prochainement.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
