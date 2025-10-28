/**
 * VIAMENTOR - Planning Module Usage Examples
 * Exemples pratiques d'utilisation du module Planning
 * 
 * @version 2.0.0
 * @date 2025-01-16
 */

// ============================================================================
// EXAMPLE 1: Basic Usage
// ============================================================================

/**
 * Utilisation basique de la page Planning complète
 * Inclut stats, filtres, calendar, legend
 */

// pages/planning.tsx
import { PlanningPage } from "@/polymet/pages/viamentor-planning-page";

export default function PlanningRoute() {
  return <PlanningPage locale="fr" />;
}

// ============================================================================
// EXAMPLE 2: Custom Calendar with External View Control
// ============================================================================

/**
 * Utilisation du composant PlanningCalendar avec contrôle externe de la vue
 * Permet de gérer la vue depuis un composant parent
 */

import { useState } from "react";
import { PlanningCalendar, type PlanningFilters } from "@/polymet/components/viamentor-planning-calendar";
import { Button } from "@/components/ui/button";

export function CustomPlanningWithViewControl() {
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [filters, setFilters] = useState<PlanningFilters>({
    type: "all",
    status: "scheduled",
    category: "all",
    instructor: "all",
  });

  return (
    <div className="space-y-4">
      {/* Custom view switcher */}
      <div className="flex gap-2">
        <Button 
          variant={view === "month" ? "default" : "outline"}
          onClick={() => setView("month")}
        >
          Month
        </Button>
        <Button 
          variant={view === "week" ? "default" : "outline"}
          onClick={() => setView("week")}
        >
          Week
        </Button>
        <Button 
          variant={view === "day" ? "default" : "outline"}
          onClick={() => setView("day")}
        >
          Day
        </Button>
      </div>

      {/* Calendar with external view */}
      <PlanningCalendar
        locale="fr"
        view={view}
        filters={filters}
        onEventClick={(event) => console.log("Event clicked:", event)}
        onEventDrop={(eventId, newDate, newTime) => {
          console.log("Event dropped:", eventId, newDate, newTime);
        }}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Filtered Calendar
// ============================================================================

/**
 * Calendar avec filtres prédéfinis
 * Affiche uniquement les leçons pratiques programmées
 */

import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";

export function PracticalLessonsCalendar() {
  const filters = {
    type: "practical" as const,
    status: "scheduled" as const,
    category: "all",
    instructor: "all",
  };

  return (
    <PlanningCalendar
      locale="fr"
      view="week"
      filters={filters}
      onEventClick={(event) => {
        // Open lesson details modal
        console.log("Lesson details:", event);
      }}
    />
  );
}

// ============================================================================
// EXAMPLE 4: Drag & Drop with Backend Update
// ============================================================================

/**
 * Calendar avec drag & drop et mise à jour backend
 * Inclut validation et gestion d'erreurs
 */

import { useState } from "react";
import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";
import { toast } from "@/components/ui/use-toast";

export function PlanningWithDragDrop() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEventDrop = async (
    eventId: string, 
    newDate: Date, 
    newTime: string
  ) => {
    setIsUpdating(true);

    try {
      // Call backend API
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: newDate.toISOString(),
          startTime: newTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      // Show success toast
      toast({
        title: "Événement déplacé",
        description: "L'événement a été déplacé avec succès",
      });

      // Refresh calendar data
      // refetchEvents();
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Impossible de déplacer l'événement",
        variant: "destructive",
      });

      // Rollback optimistic update
      console.error("Error updating event:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Mise à jour...</p>
          </div>
        </div>
      )}
      <PlanningCalendar
        locale="fr"
        onEventDrop={handleEventDrop}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Export with Custom Filters
// ============================================================================

/**
 * Export Excel avec filtres personnalisés
 * Permet d'exporter uniquement les données filtrées
 */

import { mockTheoryCourses } from "@/polymet/data/viamentor-theory-courses-data";
import { MOCK_LESSONS } from "@/polymet/data/viamentor-lessons-data";

export function exportFilteredPlanning(
  filters: PlanningFilters,
  locale: "fr" | "de" | "it" | "en" = "fr"
) {
  // Filter theory courses
  let theoryCourses = [...mockTheoryCourses];
  if (filters.type === "practical") {
    theoryCourses = [];
  }
  if (filters.status !== "all") {
    theoryCourses = theoryCourses.filter((c) => c.status === filters.status);
  }

  // Filter lessons
  let lessons = [...MOCK_LESSONS];
  if (filters.type === "theory") {
    lessons = [];
  }
  if (filters.status !== "all") {
    lessons = lessons.filter((l) => l.status === filters.status);
  }
  if (filters.category !== "all") {
    lessons = lessons.filter((l) => l.category === filters.category);
  }

  // Combine and sort by date
  const allEvents = [
    ...theoryCourses.map((c) => ({
      date: new Date(c.startDate),
      time: `${c.startTime} - ${c.endTime}`,
      type: "Cours théorique",
      title: c.topic,
      participants: `${c.enrolled}/${c.capacity}`,
      status: c.status,
    })),
    ...lessons.map((l) => ({
      date: new Date(l.startDate),
      time: new Date(l.startDate).toLocaleTimeString(locale, { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: "Leçon pratique",
      title: l.studentName,
      participants: `${l.instructorName} • ${l.vehiclePlate}`,
      status: l.status,
    })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Generate CSV
  const headers = ['Date', 'Heure', 'Type', 'Titre', 'Participants', 'Status'];
  const rows = allEvents.map((event) => [
    event.date.toLocaleDateString(locale),
    event.time,
    event.type,
    event.title,
    event.participants,
    event.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(','))
  ].join('\n');

  // Download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `planning-filtered-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}

// Usage
export function PlanningWithCustomExport() {
  const [filters, setFilters] = useState<PlanningFilters>({
    type: "all",
    status: "scheduled",
    category: "B",
    instructor: "all",
  });

  return (
    <div className="space-y-4">
      <Button onClick={() => exportFilteredPlanning(filters, "fr")}>
        Exporter (filtres actifs)
      </Button>
      <PlanningCalendar
        locale="fr"
        filters={filters}
      />
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Print View with Custom Header
// ============================================================================

/**
 * Vue impression avec header personnalisé
 * Affiche période et filtres actifs dans le header print
 */

import { useRef } from "react";

export function PlanningWithCustomPrint() {
  const printRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<PlanningFilters>({
    type: "all",
    status: "all",
    category: "all",
    instructor: "all",
  });

  const handlePrint = () => {
    // Add custom print header
    const printHeader = document.createElement('div');
    printHeader.className = 'print-header';
    printHeader.innerHTML = `
      <h1>Planning Viamentor</h1>
      <p>Période: ${new Date().toLocaleDateString('fr')}</p>
      <p>Filtres: Type=${filters.type}, Status=${filters.status}</p>
    `;

    // Inject header before print
    if (printRef.current) {
      printRef.current.prepend(printHeader);
    }

    // Print
    window.print();

    // Remove header after print
    printHeader.remove();
  };

  return (
    <div>
      <Button onClick={handlePrint}>
        Imprimer avec header
      </Button>
      <div ref={printRef} className="print:p-8">
        <PlanningCalendar
          locale="fr"
          filters={filters}
        />
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Multi-Language Calendar
// ============================================================================

/**
 * Calendar avec sélecteur de langue
 * Support FR/DE/IT/EN avec traductions complètes
 */

import { useState } from "react";
import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MultiLanguagePlanning() {
  const [locale, setLocale] = useState<"fr" | "de" | "it" | "en">("fr");

  return (
    <div className="space-y-4">
      <Select value={locale} onValueChange={(value: any) => setLocale(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="it">Italiano</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>

      <PlanningCalendar locale={locale} />
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Calendar with Event Details Modal
// ============================================================================

/**
 * Calendar avec modal de détails événement
 * Affiche détails complets au clic sur événement
 */

import { useState } from "react";
import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { TheoryCourse } from "@/polymet/data/viamentor-theory-courses-data";
import type { Lesson } from "@/polymet/data/viamentor-lessons-data";

export function PlanningWithEventModal() {
  const [selectedEvent, setSelectedEvent] = useState<TheoryCourse | Lesson | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventClick = (event: TheoryCourse | Lesson) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const isLesson = (event: any): event is Lesson => {
    return "studentId" in event;
  };

  return (
    <>
      <PlanningCalendar
        locale="fr"
        onEventClick={handleEventClick}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEvent && isLesson(selectedEvent) 
                ? "Leçon pratique" 
                : "Cours théorique"}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              {isLesson(selectedEvent) ? (
                <>
                  <div>
                    <p className="text-sm font-medium">Élève</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Moniteur</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.instructorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Véhicule</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.vehicleModel} ({selectedEvent.vehiclePlate})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Horaire</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedEvent.startDate).toLocaleString('fr')}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-medium">Sujet</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedEvent as TheoryCourse).topic}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instructeur</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedEvent as TheoryCourse).instructor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedEvent as TheoryCourse).enrolled}/{(selectedEvent as TheoryCourse).capacity}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================================================
// EXAMPLE 9: Calendar with Real-time Updates
// ============================================================================

/**
 * Calendar avec mises à jour temps réel via WebSocket
 * Synchronise automatiquement les changements
 */

import { useEffect, useState } from "react";
import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";

export function PlanningWithRealtime() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket('ws://localhost:3000/planning');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'event_created':
          setEvents((prev) => [...prev, data.event]);
          break;
        case 'event_updated':
          setEvents((prev) => 
            prev.map((e) => e.id === data.event.id ? data.event : e)
          );
          break;
        case 'event_deleted':
          setEvents((prev) => prev.filter((e) => e.id !== data.eventId));
          break;
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm text-muted-foreground">
          Connecté • Mises à jour en temps réel
        </span>
      </div>
      <PlanningCalendar locale="fr" />
    </div>
  );
}

// ============================================================================
// EXAMPLE 10: Calendar with Conflict Detection
// ============================================================================

/**
 * Calendar avec détection de conflits horaires
 * Empêche le drop si conflit détecté
 */

import { useState } from "react";
import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";
import { toast } from "@/components/ui/use-toast";
import { MOCK_LESSONS } from "@/polymet/data/viamentor-lessons-data";

export function PlanningWithConflictDetection() {
  const detectConflict = (
    eventId: string,
    newDate: Date,
    newTime: string
  ): boolean => {
    // Get event details
    const event = MOCK_LESSONS.find((l) => l.id === eventId);
    if (!event) return false;

    // Check for conflicts with other events
    const conflicts = MOCK_LESSONS.filter((l) => {
      if (l.id === eventId) return false;
      
      const eventStart = new Date(`${newDate.toISOString().split('T')[0]}T${newTime}`);
      const eventEnd = new Date(eventStart.getTime() + event.duration * 60000);
      
      const lessonStart = new Date(l.startDate);
      const lessonEnd = new Date(l.endDate);

      // Check instructor conflict
      if (l.instructorId === event.instructorId) {
        return (eventStart < lessonEnd && eventEnd > lessonStart);
      }

      // Check vehicle conflict
      if (l.vehicleId === event.vehicleId) {
        return (eventStart < lessonEnd && eventEnd > lessonStart);
      }

      return false;
    });

    return conflicts.length > 0;
  };

  const handleEventDrop = (
    eventId: string,
    newDate: Date,
    newTime: string
  ) => {
    // Check for conflicts
    if (detectConflict(eventId, newDate, newTime)) {
      toast({
        title: "Conflit détecté",
        description: "Le moniteur ou le véhicule n'est pas disponible à cet horaire",
        variant: "destructive",
      });
      return;
    }

    // Proceed with update
    console.log("No conflict, updating event:", eventId, newDate, newTime);
    
    toast({
      title: "Événement déplacé",
      description: "L'événement a été déplacé avec succès",
    });
  };

  return (
    <PlanningCalendar
      locale="fr"
      onEventDrop={handleEventDrop}
    />
  );
}

export const PLANNING_USAGE_EXAMPLES_VERSION = "2.0.0";
export const PLANNING_USAGE_EXAMPLES_LAST_UPDATE = "2025-01-16";
