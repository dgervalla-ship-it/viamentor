/**
 * VIAMENTOR - Lessons Conflicts Page
 * Page gestion des conflits de planning avec détection et résolution
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeftIcon,
  AlertTriangleIcon,
  CalendarIcon,
  UserIcon,
  CarIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
} from "lucide-react";
import type { LessonsLocale } from "@/polymet/data/viamentor-lessons-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface LessonsConflictsPageProps {
  locale?: LessonsLocale;
}

type ConflictType = "instructor" | "vehicle" | "student" | "room";
type ConflictSeverity = "critical" | "warning" | "info";

interface Conflict {
  id: string;
  type: ConflictType;
  severity: ConflictSeverity;
  date: string;
  time: string;
  lessons: {
    id: string;
    studentName: string;
    instructorName: string;
    vehiclePlate: string;
  }[];
  description: string;
  suggestions: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_CONFLICTS: Conflict[] = [
  {
    id: "conflict-1",
    type: "instructor",
    severity: "critical",
    date: "2025-01-15",
    time: "14:30",
    lessons: [
      {
        id: "lesson-1",
        studentName: "Sophie Martin",
        instructorName: "Jean Dupont",
        vehiclePlate: "GE 123456",
      },
      {
        id: "lesson-5",
        studentName: "Lucas Bernard",
        instructorName: "Jean Dupont",
        vehiclePlate: "GE 789012",
      },
    ],

    description: "Le moniteur Jean Dupont est assigné à 2 leçons simultanées",
    suggestions: [
      "Réassigner une leçon à Marie Leclerc (disponible)",
      "Déplacer une leçon à 16:00",
      "Annuler une des leçons",
    ],
  },
  {
    id: "conflict-2",
    type: "vehicle",
    severity: "critical",
    date: "2025-01-16",
    time: "10:00",
    lessons: [
      {
        id: "lesson-2",
        studentName: "Marc Dubois",
        instructorName: "Jean Dupont",
        vehiclePlate: "GE 123456",
      },
      {
        id: "lesson-6",
        studentName: "Emma Rousseau",
        instructorName: "Marie Leclerc",
        vehiclePlate: "GE 123456",
      },
    ],

    description: "Le véhicule GE 123456 est réservé pour 2 leçons simultanées",
    suggestions: [
      "Utiliser le véhicule GE 789012 (disponible)",
      "Déplacer une leçon à 11:30",
      "Annuler une des leçons",
    ],
  },
  {
    id: "conflict-3",
    type: "student",
    severity: "warning",
    date: "2025-01-17",
    time: "09:00",
    lessons: [
      {
        id: "lesson-3",
        studentName: "Sophie Martin",
        instructorName: "Jean Dupont",
        vehiclePlate: "GE 123456",
      },
      {
        id: "lesson-7",
        studentName: "Sophie Martin",
        instructorName: "Marie Leclerc",
        vehiclePlate: "GE 789012",
      },
    ],

    description: "L'élève Sophie Martin a 2 leçons planifiées le même jour",
    suggestions: [
      "Espacer les leçons d'au moins 2 heures",
      "Déplacer une leçon à un autre jour",
    ],
  },
];

// ============================================================================
// CONFLICT CARD
// ============================================================================

function ConflictCard({
  conflict,
  onResolve,
}: {
  conflict: Conflict;
  onResolve: (id: string) => void;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const severityColors = {
    critical: "bg-red-500",
    warning: "bg-orange-500",
    info: "bg-blue-500",
  };

  const typeIcons = {
    instructor: UserIcon,
    vehicle: CarIcon,
    student: UserIcon,
    room: CalendarIcon,
  };

  const Icon = typeIcons[conflict.type];

  return (
    <>
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${severityColors[conflict.severity]}/10`}
          >
            <Icon
              className={`h-6 w-6 ${severityColors[conflict.severity].replace("bg-", "text-")}`}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      conflict.severity === "critical"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {conflict.severity === "critical"
                      ? "Critique"
                      : "Attention"}
                  </Badge>
                  <Badge variant="outline">{conflict.type}</Badge>
                </div>
                <h3 className="font-semibold">{conflict.description}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />

                <span>{new Date(conflict.date).toLocaleDateString("fr")}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />

                <span>{conflict.time}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Leçons en conflit:</p>
              <div className="space-y-1">
                {conflict.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span>•</span>
                    <span>
                      {lesson.studentName} avec {lesson.instructorName} (
                      {lesson.vehiclePlate})
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                      asChild
                    >
                      <Link to={`/lessons/${lesson.id}`}>Voir</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" onClick={() => setShowDialog(true)}>
                Résoudre
              </Button>
              <Button variant="outline" size="sm">
                Ignorer
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Resolution Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Résoudre le conflit</DialogTitle>
            <DialogDescription>{conflict.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Suggestions de résolution:</h4>
              <div className="space-y-2">
                {conflict.suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => {
                      onResolve(conflict.id);
                      setShowDialog(false);
                    }}
                  >
                    <CheckCircle2Icon className="h-4 w-4 mr-2 flex-shrink-0" />

                    <span>{suggestion}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Astuce:</strong> Vous pouvez également résoudre ce
                conflit manuellement en modifiant les leçons concernées depuis
                le calendrier ou la liste des leçons.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LessonsConflictsPage({
  locale = "fr",
}: LessonsConflictsPageProps) {
  const [conflicts, setConflicts] = useState(MOCK_CONFLICTS);
  const [filter, setFilter] = useState<"all" | ConflictType>("all");

  const handleResolve = (id: string) => {
    setConflicts(conflicts.filter((c) => c.id !== id));
  };

  const filteredConflicts = conflicts.filter(
    (c) => filter === "all" || c.type === filter
  );

  const criticalCount = conflicts.filter(
    (c) => c.severity === "critical"
  ).length;
  const warningCount = conflicts.filter((c) => c.severity === "warning").length;

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
            <h1 className="text-3xl font-bold">Conflits de planning</h1>
            <p className="text-muted-foreground">
              Détection et résolution automatique des conflits
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/lessons/calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendrier
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Conflits critiques
              </p>
              <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
            </div>
            <AlertTriangleIcon className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avertissements</p>
              <p className="text-2xl font-bold text-orange-500">
                {warningCount}
              </p>
            </div>
            <AlertTriangleIcon className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{conflicts.length}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">Tous ({conflicts.length})</TabsTrigger>
          <TabsTrigger value="instructor">
            Moniteurs ({conflicts.filter((c) => c.type === "instructor").length}
            )
          </TabsTrigger>
          <TabsTrigger value="vehicle">
            Véhicules ({conflicts.filter((c) => c.type === "vehicle").length})
          </TabsTrigger>
          <TabsTrigger value="student">
            Élèves ({conflicts.filter((c) => c.type === "student").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Conflicts List */}
      {filteredConflicts.length > 0 ? (
        <div className="space-y-4">
          {filteredConflicts.map((conflict) => (
            <ConflictCard
              key={conflict.id}
              conflict={conflict}
              onResolve={handleResolve}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <CheckCircle2Icon className="h-12 w-12 mx-auto text-green-500 mb-4" />

          <h3 className="text-lg font-medium mb-2">Aucun conflit détecté</h3>
          <p className="text-muted-foreground mb-4">
            {filter === "all"
              ? "Tous les conflits ont été résolus !"
              : "Aucun conflit de ce type n'a été détecté"}
          </p>
          <Button variant="outline" asChild>
            <Link to="/lessons/calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Voir le calendrier
            </Link>
          </Button>
        </Card>
      )}

      {/* Help */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <AlertTriangleIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

          <div className="space-y-1">
            <p className="text-sm font-medium">
              À propos de la détection des conflits
            </p>
            <p className="text-sm text-muted-foreground">
              Le système détecte automatiquement les conflits de planning en
              temps réel: moniteurs assignés à plusieurs leçons simultanées,
              véhicules double-réservés, élèves avec plusieurs leçons le même
              jour, etc. Résolvez les conflits critiques en priorité pour
              assurer le bon fonctionnement de l'auto-école.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
