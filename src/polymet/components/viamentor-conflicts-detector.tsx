// ============================================================================
// VIAMENTOR - Conflicts Detector
// Détection conflits planning avec suggestions résolution ML
// ============================================================================

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangleIcon,
  UserIcon,
  CarIcon,
  UsersIcon,
  DoorOpenIcon,
  ClockIcon,
  CheckCircle2Icon,
  XIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

type ConflictsLocale = "fr" | "de" | "it" | "en";

interface Conflict {
  id: string;
  eventId: string;
  eventTitle: string;
  type: "instructor" | "vehicle" | "student" | "room";
  severity: "critical" | "warning" | "info";
  message: string;
  suggestions: ConflictSuggestion[];
}

interface ConflictSuggestion {
  id: string;
  type: "reschedule" | "change-resource" | "split" | "exclude";
  description: string;
  impact: string;
}

interface ConflictsDetectorProps {
  conflicts: Conflict[];
  locale?: ConflictsLocale;
  onResolveConflict?: (conflictId: string, suggestionId: string) => void;
  onExcludeEvent?: (eventId: string) => void;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Conflits détectés",
    description: "Résolvez les conflits avant d'importer",
    noConflicts: "Aucun conflit détecté",
    conflictTypes: {
      instructor: "Moniteur occupé",
      vehicle: "Véhicule occupé",
      student: "Élève déjà réservé",
      room: "Salle occupée",
    },
    severity: {
      critical: "Critique",
      warning: "Attention",
      info: "Information",
    },
    suggestions: {
      title: "Suggestions de résolution",
      reschedule: "Décaler",
      changeResource: "Changer ressource",
      split: "Diviser",
      exclude: "Exclure",
    },
    actions: {
      apply: "Appliquer",
      exclude: "Exclure l'événement",
      viewDetails: "Voir détails",
    },
    stats: {
      total: "Total",
      critical: "Critiques",
      warning: "Attention",
      resolved: "Résolus",
    },
  },
  de: {
    title: "Erkannte Konflikte",
    description: "Lösen Sie Konflikte vor dem Import",
    noConflicts: "Keine Konflikte erkannt",
    conflictTypes: {
      instructor: "Lehrer beschäftigt",
      vehicle: "Fahrzeug besetzt",
      student: "Schüler bereits gebucht",
      room: "Raum besetzt",
    },
    severity: {
      critical: "Kritisch",
      warning: "Warnung",
      info: "Information",
    },
    suggestions: {
      title: "Lösungsvorschläge",
      reschedule: "Verschieben",
      changeResource: "Ressource ändern",
      split: "Teilen",
      exclude: "Ausschließen",
    },
    actions: {
      apply: "Anwenden",
      exclude: "Ereignis ausschließen",
      viewDetails: "Details anzeigen",
    },
    stats: {
      total: "Gesamt",
      critical: "Kritisch",
      warning: "Warnung",
      resolved: "Gelöst",
    },
  },
  it: {
    title: "Conflitti rilevati",
    description: "Risolvi i conflitti prima di importare",
    noConflicts: "Nessun conflitto rilevato",
    conflictTypes: {
      instructor: "Istruttore occupato",
      vehicle: "Veicolo occupato",
      student: "Studente già prenotato",
      room: "Sala occupata",
    },
    severity: {
      critical: "Critico",
      warning: "Attenzione",
      info: "Informazione",
    },
    suggestions: {
      title: "Suggerimenti di risoluzione",
      reschedule: "Spostare",
      changeResource: "Cambiare risorsa",
      split: "Dividere",
      exclude: "Escludere",
    },
    actions: {
      apply: "Applica",
      exclude: "Escludi evento",
      viewDetails: "Vedi dettagli",
    },
    stats: {
      total: "Totale",
      critical: "Critici",
      warning: "Attenzione",
      resolved: "Risolti",
    },
  },
  en: {
    title: "Detected conflicts",
    description: "Resolve conflicts before importing",
    noConflicts: "No conflicts detected",
    conflictTypes: {
      instructor: "Instructor busy",
      vehicle: "Vehicle occupied",
      student: "Student already booked",
      room: "Room occupied",
    },
    severity: {
      critical: "Critical",
      warning: "Warning",
      info: "Information",
    },
    suggestions: {
      title: "Resolution suggestions",
      reschedule: "Reschedule",
      changeResource: "Change resource",
      split: "Split",
      exclude: "Exclude",
    },
    actions: {
      apply: "Apply",
      exclude: "Exclude event",
      viewDetails: "View details",
    },
    stats: {
      total: "Total",
      critical: "Critical",
      warning: "Warning",
      resolved: "Resolved",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ConflictsDetector({
  conflicts: initialConflicts,
  locale = "fr",
  onResolveConflict,
  onExcludeEvent,
}: ConflictsDetectorProps) {
  const t = translations[locale];
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const [resolvedConflicts, setResolvedConflicts] = useState<Set<string>>(
    new Set()
  );

  const getConflictIcon = (type: Conflict["type"]) => {
    switch (type) {
      case "instructor":
        return <UserIcon className="h-4 w-4" />;

      case "vehicle":
        return <CarIcon className="h-4 w-4" />;

      case "student":
        return <UsersIcon className="h-4 w-4" />;

      case "room":
        return <DoorOpenIcon className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: Conflict["severity"]) => {
    switch (severity) {
      case "critical":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {t.severity.critical}
          </Badge>
        );

      case "warning":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            {t.severity.warning}
          </Badge>
        );

      case "info":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {t.severity.info}
          </Badge>
        );
    }
  };

  const getSuggestionIcon = (type: ConflictSuggestion["type"]) => {
    switch (type) {
      case "reschedule":
        return <ClockIcon className="h-4 w-4" />;

      case "change-resource":
        return <CarIcon className="h-4 w-4" />;

      case "split":
        return <UsersIcon className="h-4 w-4" />;

      case "exclude":
        return <XIcon className="h-4 w-4" />;
    }
  };

  const handleApplySuggestion = (conflictId: string, suggestionId: string) => {
    setResolvedConflicts((prev) => new Set(prev).add(conflictId));
    onResolveConflict?.(conflictId, suggestionId);
  };

  const handleExclude = (eventId: string, conflictId: string) => {
    setResolvedConflicts((prev) => new Set(prev).add(conflictId));
    onExcludeEvent?.(eventId);
  };

  const activeConflicts = conflicts.filter((c) => !resolvedConflicts.has(c.id));
  const criticalCount = activeConflicts.filter(
    (c) => c.severity === "critical"
  ).length;
  const warningCount = activeConflicts.filter(
    (c) => c.severity === "warning"
  ).length;

  if (activeConflicts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <CheckCircle2Icon className="h-12 w-12 mx-auto mb-4 text-green-600 dark:text-green-400" />

            <p className="text-lg font-medium text-foreground mb-2">
              {t.noConflicts}
            </p>
            <p className="text-sm text-muted-foreground">
              Tous les événements peuvent être importés sans conflit
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />

              {t.title}
            </CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center px-3 py-2 bg-muted rounded-lg">
              <p className="text-lg font-bold text-foreground">
                {activeConflicts.length}
              </p>
              <p className="text-xs text-muted-foreground">{t.stats.total}</p>
            </div>
            <div className="text-center px-3 py-2 bg-red-50 dark:bg-red-950 rounded-lg">
              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                {criticalCount}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                {t.stats.critical}
              </p>
            </div>
            <div className="text-center px-3 py-2 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {warningCount}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                {t.stats.warning}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeConflicts.map((conflict) => (
          <Card
            key={conflict.id}
            className="border-2 border-orange-200 dark:border-orange-900"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      conflict.severity === "critical"
                        ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                        : "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {getConflictIcon(conflict.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">
                        {conflict.eventTitle}
                      </h4>
                      {getSeverityBadge(conflict.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.conflictTypes[conflict.type]}
                    </p>
                    <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
                      <AlertDescription className="text-orange-800 dark:text-orange-200 text-sm">
                        {conflict.message}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  {t.suggestions.title}
                </p>
                <div className="space-y-2">
                  {conflict.suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-1.5 rounded bg-background">
                          {getSuggestionIcon(suggestion.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {suggestion.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {suggestion.impact}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleApplySuggestion(conflict.id, suggestion.id)
                        }
                      >
                        {t.actions.apply}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                  onClick={() => handleExclude(conflict.eventId, conflict.id)}
                >
                  <XIcon className="h-4 w-4 mr-2" />

                  {t.actions.exclude}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
