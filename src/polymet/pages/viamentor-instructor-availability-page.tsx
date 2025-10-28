/**
 * VIAMENTOR - Instructor Availability Page
 * Page Mes Disponibilités moniteur
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  InfoIcon,
  CheckCircle2Icon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorAvailabilityPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface TimeSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  recurring: boolean;
  categories: string[];
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      instructor: "Moniteur",
      availability: "Mes Disponibilités",
    },
    title: "Mes Disponibilités",
    description: "Gérez vos créneaux horaires et votre planning hebdomadaire",
    tabs: {
      weekly: "Planning hebdomadaire",
      exceptions: "Exceptions",
      stats: "Statistiques",
    },
    stats: {
      totalHours: "Heures/semaine",
      activeSlots: "Créneaux actifs",
      nextSlot: "Prochain créneau",
      utilizationRate: "Taux d'utilisation",
    },
    actions: {
      addSlot: "Ajouter créneau",
      copyWeek: "Copier semaine",
      clearAll: "Tout effacer",
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
    },
    days: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
    dialog: {
      addTitle: "Ajouter un créneau",
      editTitle: "Modifier le créneau",
      day: "Jour",
      startTime: "Heure début",
      endTime: "Heure fin",
      recurring: "Créneau récurrent",
      recurringDesc: "Ce créneau se répète chaque semaine",
      categories: "Catégories",
      selectCategories: "Sélectionner catégories",
    },
    alert: {
      success: "Modifications enregistrées",
      successDesc: "Vos disponibilités ont été mises à jour avec succès.",
    },
    weekly: {
      title: "Planning hebdomadaire",
      noSlots: "Aucun créneau défini pour ce jour",
      addFirst: "Ajoutez votre premier créneau",
    },
    exceptions: {
      title: "Exceptions et congés",
      description: "Gérez vos absences et exceptions ponctuelles",
      noExceptions: "Aucune exception définie",
      addException: "Ajouter exception",
    },
    statsTab: {
      title: "Statistiques d'utilisation",
      avgBookings: "Réservations moyennes",
      peakDays: "Jours les plus demandés",
      availableHours: "Heures disponibles",
    },
  },
  de: {
    breadcrumb: {
      instructor: "Fahrlehrer",
      availability: "Meine Verfügbarkeit",
    },
    title: "Meine Verfügbarkeit",
    description: "Verwalten Sie Ihre Zeitfenster und Wochenplanung",
    tabs: {
      weekly: "Wochenplanung",
      exceptions: "Ausnahmen",
      stats: "Statistiken",
    },
    stats: {
      totalHours: "Stunden/Woche",
      activeSlots: "Aktive Zeitfenster",
      nextSlot: "Nächstes Zeitfenster",
      utilizationRate: "Auslastungsrate",
    },
    actions: {
      addSlot: "Zeitfenster hinzufügen",
      copyWeek: "Woche kopieren",
      clearAll: "Alles löschen",
      save: "Speichern",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      delete: "Löschen",
    },
    days: {
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
    },
    dialog: {
      addTitle: "Zeitfenster hinzufügen",
      editTitle: "Zeitfenster bearbeiten",
      day: "Tag",
      startTime: "Startzeit",
      endTime: "Endzeit",
      recurring: "Wiederkehrendes Zeitfenster",
      recurringDesc: "Dieses Zeitfenster wiederholt sich jede Woche",
      categories: "Kategorien",
      selectCategories: "Kategorien auswählen",
    },
    alert: {
      success: "Änderungen gespeichert",
      successDesc: "Ihre Verfügbarkeit wurde erfolgreich aktualisiert.",
    },
    weekly: {
      title: "Wochenplanung",
      noSlots: "Keine Zeitfenster für diesen Tag definiert",
      addFirst: "Fügen Sie Ihr erstes Zeitfenster hinzu",
    },
    exceptions: {
      title: "Ausnahmen und Urlaub",
      description: "Verwalten Sie Ihre Abwesenheiten und einmaligen Ausnahmen",
      noExceptions: "Keine Ausnahmen definiert",
      addException: "Ausnahme hinzufügen",
    },
    statsTab: {
      title: "Nutzungsstatistiken",
      avgBookings: "Durchschnittliche Buchungen",
      peakDays: "Meistgefragte Tage",
      availableHours: "Verfügbare Stunden",
    },
  },
  it: {
    breadcrumb: {
      instructor: "Istruttore",
      availability: "Mia Disponibilità",
    },
    title: "Mia Disponibilità",
    description: "Gestisci i tuoi slot orari e la pianificazione settimanale",
    tabs: {
      weekly: "Pianificazione settimanale",
      exceptions: "Eccezioni",
      stats: "Statistiche",
    },
    stats: {
      totalHours: "Ore/settimana",
      activeSlots: "Slot attivi",
      nextSlot: "Prossimo slot",
      utilizationRate: "Tasso di utilizzo",
    },
    actions: {
      addSlot: "Aggiungi slot",
      copyWeek: "Copia settimana",
      clearAll: "Cancella tutto",
      save: "Salva",
      cancel: "Annulla",
      edit: "Modifica",
      delete: "Elimina",
    },
    days: {
      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
      sunday: "Domenica",
    },
    dialog: {
      addTitle: "Aggiungi slot",
      editTitle: "Modifica slot",
      day: "Giorno",
      startTime: "Ora inizio",
      endTime: "Ora fine",
      recurring: "Slot ricorrente",
      recurringDesc: "Questo slot si ripete ogni settimana",
      categories: "Categorie",
      selectCategories: "Seleziona categorie",
    },
    alert: {
      success: "Modifiche salvate",
      successDesc: "La tua disponibilità è stata aggiornata con successo.",
    },
    weekly: {
      title: "Pianificazione settimanale",
      noSlots: "Nessuno slot definito per questo giorno",
      addFirst: "Aggiungi il tuo primo slot",
    },
    exceptions: {
      title: "Eccezioni e ferie",
      description: "Gestisci le tue assenze ed eccezioni puntuali",
      noExceptions: "Nessuna eccezione definita",
      addException: "Aggiungi eccezione",
    },
    statsTab: {
      title: "Statistiche di utilizzo",
      avgBookings: "Prenotazioni medie",
      peakDays: "Giorni più richiesti",
      availableHours: "Ore disponibili",
    },
  },
  en: {
    breadcrumb: {
      instructor: "Instructor",
      availability: "My Availability",
    },
    title: "My Availability",
    description: "Manage your time slots and weekly schedule",
    tabs: {
      weekly: "Weekly schedule",
      exceptions: "Exceptions",
      stats: "Statistics",
    },
    stats: {
      totalHours: "Hours/week",
      activeSlots: "Active slots",
      nextSlot: "Next slot",
      utilizationRate: "Utilization rate",
    },
    actions: {
      addSlot: "Add slot",
      copyWeek: "Copy week",
      clearAll: "Clear all",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
    dialog: {
      addTitle: "Add slot",
      editTitle: "Edit slot",
      day: "Day",
      startTime: "Start time",
      endTime: "End time",
      recurring: "Recurring slot",
      recurringDesc: "This slot repeats every week",
      categories: "Categories",
      selectCategories: "Select categories",
    },
    alert: {
      success: "Changes saved",
      successDesc: "Your availability has been successfully updated.",
    },
    weekly: {
      title: "Weekly schedule",
      noSlots: "No slots defined for this day",
      addFirst: "Add your first slot",
    },
    exceptions: {
      title: "Exceptions and leave",
      description: "Manage your absences and one-time exceptions",
      noExceptions: "No exceptions defined",
      addException: "Add exception",
    },
    statsTab: {
      title: "Usage statistics",
      avgBookings: "Average bookings",
      peakDays: "Most requested days",
      availableHours: "Available hours",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_STATS = {
  totalHours: 35,
  activeSlots: 18,
  nextSlot: "Aujourd'hui 14:00",
  utilizationRate: 78,
};

const MOCK_SLOTS: TimeSlot[] = [
  {
    id: "1",
    day: "monday",
    startTime: "08:00",
    endTime: "12:00",
    recurring: true,
    categories: ["B"],
  },
  {
    id: "2",
    day: "monday",
    startTime: "14:00",
    endTime: "18:00",
    recurring: true,
    categories: ["B", "A"],
  },
  {
    id: "3",
    day: "tuesday",
    startTime: "08:00",
    endTime: "12:00",
    recurring: true,
    categories: ["B"],
  },
];

const DAYS_ORDER: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function InstructorAvailabilityPage({
  locale = "fr",
}: InstructorAvailabilityPageProps) {
  const t = translations[locale];

  const [slots, setSlots] = useState<TimeSlot[]>(MOCK_SLOTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getSlotsByDay = (day: DayOfWeek) => {
    return slots.filter((slot) => slot.day === day);
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/instructor/dashboard">
              {t.breadcrumb.instructor}
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
            <CopyIcon className="w-4 h-4 mr-2" />

            {t.actions.copyWeek}
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />

                {t.actions.addSlot}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.dialog.addTitle}</DialogTitle>
                <DialogDescription>
                  Définissez un nouveau créneau horaire
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{t.dialog.day}</Label>
                  <Select defaultValue="monday">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS_ORDER.map((day) => (
                        <SelectItem key={day} value={day}>
                          {t.days[day]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.dialog.startTime}</Label>
                    <Select defaultValue="08:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00</SelectItem>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.dialog.endTime}</Label>
                    <Select defaultValue="12:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="recurring" defaultChecked />

                  <Label htmlFor="recurring" className="cursor-pointer">
                    <div className="font-medium">{t.dialog.recurring}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.dialog.recurringDesc}
                    </div>
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  {t.actions.cancel}
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  {t.actions.save}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert>
          <CheckCircle2Icon className="w-4 h-4" />

          <AlertTitle>{t.alert.success}</AlertTitle>
          <AlertDescription>{t.alert.successDesc}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalHours}
            </CardTitle>
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_STATS.totalHours}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.activeSlots}
            </CardTitle>
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_STATS.activeSlots}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.nextSlot}
            </CardTitle>
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{MOCK_STATS.nextSlot}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.utilizationRate}
            </CardTitle>
            <CheckCircle2Icon className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {MOCK_STATS.utilizationRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">{t.tabs.weekly}</TabsTrigger>
          <TabsTrigger value="exceptions">{t.tabs.exceptions}</TabsTrigger>
          <TabsTrigger value="stats">{t.tabs.stats}</TabsTrigger>
        </TabsList>

        {/* Weekly Tab */}
        <TabsContent value="weekly" className="space-y-4">
          {DAYS_ORDER.map((day) => {
            const daySlots = getSlotsByDay(day);
            return (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="text-lg">{t.days[day]}</CardTitle>
                </CardHeader>
                <CardContent>
                  {daySlots.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />

                      <p>{t.weekly.noSlots}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {daySlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <ClockIcon className="w-4 h-4 text-muted-foreground" />

                            <div>
                              <div className="font-medium">
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {slot.categories.join(", ")}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {slot.recurring && (
                              <Badge variant="secondary">Récurrent</Badge>
                            )}
                            <Button variant="ghost" size="icon">
                              <EditIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Exceptions Tab */}
        <TabsContent value="exceptions">
          <Card>
            <CardHeader>
              <CardTitle>{t.exceptions.title}</CardTitle>
              <CardDescription>{t.exceptions.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <InfoIcon className="w-4 h-4" />

                <AlertTitle>Fonctionnalité à venir</AlertTitle>
                <AlertDescription>
                  La gestion des exceptions et congés sera disponible
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

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">{t.actions.clearAll}</Button>
        <Button onClick={handleSave}>{t.actions.save}</Button>
      </div>
    </div>
  );
}
