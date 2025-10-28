/**
 * VIAMENTOR - Create Theory Course Wizard
 * Wizard création cours théorique en 4 étapes
 *
 * Étape 1: Info base (nom, domaine, type, date, capacité, visibilité, langue, code)
 * Étape 2: Lieux & sessions (calendrier, emplacements, créneaux horaires)
 * Étape 3: Enseignants (assignation moniteurs, gestion conflits)
 * Étape 4: Récap & publier (validation finale, estimations)
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPinIcon,
  UsersIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  XIcon,
} from "lucide-react";
import {
  getTheoryCoursesTranslation,
  type TheoryCoursesLocale,
} from "@/viamentor/data/viamentor-theory-courses-i18n";

// ============================================================================
// TYPES
// ============================================================================

type CourseType = "CTC" | "IPB";
type SwissSchoolType =
  | "sensibilisation"
  | "theory_b"
  | "theory_a"
  | "first_aid";

interface CourseBaseInfo {
  name: string;
  domain: CourseType;
  type: SwissSchoolType;
  startDate: string;
  minCapacity: number;
  maxCapacity: number;
  visible: boolean;
  language: "fr" | "de" | "it" | "en";
  code: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

interface Session {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  locationId: string;
  active: boolean;
  preparationDelay: number;
}

interface Instructor {
  id: string;
  name: string;
  avatar: string;
  competencies: SwissSchoolType[];
}

interface SessionAssignment {
  sessionId: string;
  instructorId: string | null;
  hasConflict: boolean;
}

interface CreateTheoryCourseWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: TheoryCoursesLocale;
  onSuccess?: (courseId: string) => void;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const SWISS_SCHOOL_TYPES: Record<
  SwissSchoolType,
  { fr: string; de: string; it: string; en: string }
> = {
  sensibilisation: {
    fr: "Sensibilisation 8h",
    de: "Sensibilisierung 8h",
    it: "Sensibilizzazione 8h",
    en: "Awareness 8h",
  },
  theory_b: {
    fr: "Théorie Cat. B",
    de: "Theorie Kat. B",
    it: "Teoria Cat. B",
    en: "Theory Cat. B",
  },
  theory_a: {
    fr: "Théorie Cat. A",
    de: "Theorie Kat. A",
    it: "Teoria Cat. A",
    en: "Theory Cat. A",
  },
  first_aid: {
    fr: "Premiers secours",
    de: "Erste Hilfe",
    it: "Primo soccorso",
    en: "First Aid",
  },
};

const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc-1",
    name: "Salle 1 - Principal",
    address: "Route de Lausanne 45, Fribourg",
    capacity: 20,
  },
  {
    id: "loc-2",
    name: "Salle 2 - Annexe",
    address: "Rue du Lac 12, Fribourg",
    capacity: 15,
  },
  {
    id: "loc-3",
    name: "Salle 3 - Centre",
    address: "Avenue de la Gare 8, Fribourg",
    capacity: 12,
  },
];

const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: "inst-1",
    name: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    competencies: ["sensibilisation", "theory_b"],
  },
  {
    id: "inst-2",
    name: "Sophie Martin",
    avatar: "https://github.com/kdrnp.png",
    competencies: ["theory_b", "theory_a"],
  },
  {
    id: "inst-3",
    name: "Jean Müller",
    avatar: "https://github.com/yahyabedirhan.png",
    competencies: ["first_aid"],
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function CreateTheoryCourseWizard({
  open,
  onOpenChange,
  locale = "fr",
  onSuccess,
}: CreateTheoryCourseWizardProps) {
  const t = getTheoryCoursesTranslation(locale);
  const [step, setStep] = useState(1);

  // Step 1: Base Info
  const [baseInfo, setBaseInfo] = useState<CourseBaseInfo>({
    name: "",
    domain: "CTC",
    type: "sensibilisation",
    startDate: "",
    minCapacity: 8,
    maxCapacity: 20,
    visible: true,
    language: locale,
    code: generateCourseCode(),
  });

  // Step 2: Sessions
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Step 3: Assignments
  const [assignments, setAssignments] = useState<SessionAssignment[]>([]);

  // Step 4: Validation
  const [hasBlockingIssues, setHasBlockingIssues] = useState(false);

  function generateCourseCode(): string {
    return `CRS-${Date.now().toString(36).toUpperCase()}`;
  }

  function handleAddSession(date: string) {
    const newSession: Session = {
      id: `sess-${Date.now()}`,
      date,
      startTime: "09:00",
      endTime: "17:00",
      locationId: MOCK_LOCATIONS[0].id,
      active: true,
      preparationDelay: 7,
    };
    setSessions([...sessions, newSession]);
    setAssignments([
      ...assignments,
      { sessionId: newSession.id, instructorId: null, hasConflict: false },
    ]);
  }

  function handleAssignInstructor(sessionId: string, instructorId: string) {
    const hasConflict = Math.random() > 0.8; // Simulate conflict detection
    setAssignments(
      assignments.map((a) =>
        a.sessionId === sessionId ? { ...a, instructorId, hasConflict } : a
      )
    );
  }

  function handlePublish() {
    const courseId = `tc-${Date.now()}`;
    onSuccess?.(courseId);
    onOpenChange(false);
  }

  const canProceedToStep2 = baseInfo.name && baseInfo.startDate;
  const canProceedToStep3 = sessions.length > 0;
  const canProceedToStep4 = assignments.every((a) => a.instructorId !== null);
  const canPublish =
    !hasBlockingIssues &&
    assignments.every((a) => a.instructorId && !a.hasConflict);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            Créer un cours théorique
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-6 px-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= s ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"}`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`w-24 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Base Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom du cours *</Label>
                <Input
                  value={baseInfo.name}
                  onChange={(e) =>
                    setBaseInfo({ ...baseInfo, name: e.target.value })
                  }
                  placeholder="Ex: Sensibilisation 8h - Octobre 2025"
                />
              </div>
              <div className="space-y-2">
                <Label>Domaine</Label>
                <Select
                  value={baseInfo.domain}
                  onValueChange={(v: CourseType) =>
                    setBaseInfo({ ...baseInfo, domain: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CTC">
                      CTC (Cours de circulation)
                    </SelectItem>
                    <SelectItem value="IPB">IPB (Premiers secours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type de cours *</Label>
                <Select
                  value={baseInfo.type}
                  onValueChange={(v: SwissSchoolType) =>
                    setBaseInfo({ ...baseInfo, type: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SWISS_SCHOOL_TYPES).map(([key, labels]) => (
                      <SelectItem key={key} value={key}>
                        {labels[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date de début *</Label>
                <Input
                  type="date"
                  value={baseInfo.startDate}
                  onChange={(e) =>
                    setBaseInfo({ ...baseInfo, startDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Capacité min</Label>
                <Input
                  type="number"
                  value={baseInfo.minCapacity}
                  onChange={(e) =>
                    setBaseInfo({ ...baseInfo, minCapacity: +e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Capacité max</Label>
                <Input
                  type="number"
                  value={baseInfo.maxCapacity}
                  onChange={(e) =>
                    setBaseInfo({ ...baseInfo, maxCapacity: +e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select
                  value={baseInfo.language}
                  onValueChange={(v: any) =>
                    setBaseInfo({ ...baseInfo, language: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <Label>Visibilité publique</Label>
                <p className="text-sm text-muted-foreground">
                  Les élèves peuvent voir et s'inscrire
                </p>
              </div>
              <Switch
                checked={baseInfo.visible}
                onCheckedChange={(v) =>
                  setBaseInfo({ ...baseInfo, visible: v })
                }
              />
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <Label>Code auto-généré</Label>
              <p className="text-lg font-mono font-semibold text-primary">
                {baseInfo.code}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Lieux & Sessions */}
        {step === 2 && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <h3 className="font-semibold">Calendrier mensuel</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const dateStr = `2025-10-${day.toString().padStart(2, "0")}`;
                  const hasSession = sessions.some((s) => s.date === dateStr);
                  return (
                    <Button
                      key={day}
                      variant={hasSession ? "default" : "outline"}
                      size="sm"
                      onClick={() => !hasSession && handleAddSession(dateStr)}
                    >
                      {day}
                    </Button>
                  );
                })}
              </div>

              {sessions.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h4 className="font-semibold">Sessions créées</h4>
                  {sessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Calendar className="h-4 w-4 text-muted-foreground" />

                          <div>
                            <p className="font-medium">{session.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.startTime} - {session.endTime}
                            </p>
                          </div>
                          <Badge
                            variant={session.active ? "default" : "secondary"}
                          >
                            {session.active ? "Actif" : "Bloqué"}
                          </Badge>
                          <Badge variant="outline">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            J-{session.preparationDelay}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setSessions(
                              sessions.filter((s) => s.id !== session.id)
                            )
                          }
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                Emplacements
              </h3>
              {MOCK_LOCATIONS.map((loc) => (
                <Card key={loc.id}>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm">{loc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {loc.address}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      <UsersIcon className="h-3 w-3 mr-1" />
                      {loc.capacity} places
                    </Badge>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                + Nouveau lieu
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Enseignants */}
        {step === 3 && (
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Moniteurs disponibles</h3>
              <Input placeholder="Filtrer par compétence..." />

              {MOCK_INSTRUCTORS.filter((i) =>
                i.competencies.includes(baseInfo.type)
              ).map((inst) => (
                <Card
                  key={inst.id}
                  className="cursor-move hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-10 h-10 rounded-full"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-sm">{inst.name}</p>
                      <div className="flex gap-1 mt-1">
                        {inst.competencies.map((c) => (
                          <Badge
                            key={c}
                            variant="secondary"
                            className="text-xs"
                          >
                            {SWISS_SCHOOL_TYPES[c][locale]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="col-span-2 space-y-4">
              <h3 className="font-semibold">Sessions du mois</h3>
              {sessions.map((session) => {
                const assignment = assignments.find(
                  (a) => a.sessionId === session.id
                );
                const instructor = assignment?.instructorId
                  ? MOCK_INSTRUCTORS.find(
                      (i) => i.id === assignment.instructorId
                    )
                  : null;
                return (
                  <Card
                    key={session.id}
                    className={
                      assignment?.hasConflict
                        ? "border-destructive border-2"
                        : ""
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{session.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.startTime} - {session.endTime}
                          </p>
                        </div>
                        <Select
                          value={assignment?.instructorId || ""}
                          onValueChange={(v) =>
                            handleAssignInstructor(session.id, v)
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Assigner moniteur..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_INSTRUCTORS.filter((i) =>
                              i.competencies.includes(baseInfo.type)
                            ).map((inst) => (
                              <SelectItem key={inst.id} value={inst.id}>
                                {inst.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {assignment?.hasConflict && (
                        <div className="mt-2 flex items-center gap-2 text-destructive text-sm">
                          <AlertCircleIcon className="h-4 w-4" />
                          Conflit horaire détecté
                        </div>
                      )}
                      {instructor && !assignment?.hasConflict && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={instructor.avatar}
                            alt={instructor.name}
                            className="w-6 h-6 rounded-full"
                          />

                          <span className="text-sm text-muted-foreground">
                            {instructor.name}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Récap & Publier */}
        {step === 4 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Récapitulatif du cours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Nom</Label>
                    <p className="font-medium">{baseInfo.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Type</Label>
                    <p className="font-medium">
                      {SWISS_SCHOOL_TYPES[baseInfo.type][locale]}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Capacité</Label>
                    <p className="font-medium">
                      {baseInfo.minCapacity} - {baseInfo.maxCapacity} places
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Code</Label>
                    <p className="font-mono font-medium">{baseInfo.code}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h4 className="font-semibold">
                Sessions planifiées ({sessions.length})
              </h4>
              <div className="space-y-2">
                {sessions.map((session) => {
                  const assignment = assignments.find(
                    (a) => a.sessionId === session.id
                  );
                  const instructor = assignment?.instructorId
                    ? MOCK_INSTRUCTORS.find(
                        (i) => i.id === assignment.instructorId
                      )
                    : null;
                  return (
                    <Card key={session.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Calendar className="h-4 w-4 text-muted-foreground" />

                          <div>
                            <p className="font-medium">{session.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.startTime} - {session.endTime}
                            </p>
                          </div>
                          {instructor && (
                            <div className="flex items-center gap-2">
                              <img
                                src={instructor.avatar}
                                alt={instructor.name}
                                className="w-6 h-6 rounded-full"
                              />

                              <span className="text-sm">{instructor.name}</span>
                            </div>
                          )}
                        </div>
                        {assignment?.hasConflict ? (
                          <Badge variant="destructive">Conflit</Badge>
                        ) : (
                          <Badge variant="default">
                            <CheckCircle2Icon className="h-3 w-3 mr-1" />
                            Validé
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="bg-muted">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Estimations</h4>
                <div className="space-y-1 text-sm">
                  <p>• Délai de préparation moyen: 7 jours</p>
                  <p>
                    • Pénalités potentielles:{" "}
                    {assignments.filter((a) => a.hasConflict).length > 0
                      ? "Oui (conflits horaires)"
                      : "Aucune"}
                  </p>
                  <p>• Taux de remplissage estimé: 85%</p>
                </div>
              </CardContent>
            </Card>

            {assignments.some((a) => a.hasConflict) && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircleIcon className="h-5 w-5" />

                <div>
                  <p className="font-semibold">Problèmes bloquants détectés</p>
                  <p className="text-sm">
                    Veuillez corriger les conflits horaires avant de publier.
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-destructive"
                    onClick={() => setStep(3)}
                  >
                    → Corriger à l'étape 3
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => (step > 1 ? setStep(step - 1) : onOpenChange(false))}
          >
            {step === 1 ? "Annuler" : "Précédent"}
          </Button>
          <div className="flex gap-2">
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !canProceedToStep2) ||
                  (step === 2 && !canProceedToStep3) ||
                  (step === 3 && !canProceedToStep4)
                }
              >
                Suivant
              </Button>
            ) : (
              <Button onClick={handlePublish} disabled={!canPublish}>
                <CheckCircle2Icon className="h-4 w-4 mr-2" />
                Publier le cours
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
