/**
 * VIAMENTOR - Propose Group Makeup Dialog
 * Dialog pour proposer cours collectif rattrapage
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  BookOpenIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import type { StudentMakeupsStats } from "@/polymet/data/viamentor-instructor-makeups-data";
import type { InstructorMakeupsLocale } from "@/polymet/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProposeGroupMakeupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: StudentMakeupsStats[];
  locale?: InstructorMakeupsLocale;
  onConfirm?: (data: GroupMakeupProposal) => Promise<void>;
}

export interface GroupMakeupProposal {
  studentIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  topic: string;
  description: string;
  category: string;
  maxParticipants: number;
  notifyStudents: boolean;
}

// Mock rooms data
const MOCK_ROOMS = [
  { id: "room-1", name: "Salle 1", capacity: 15 },
  { id: "room-2", name: "Salle 2", capacity: 12 },
  { id: "room-3", name: "Salle 3", capacity: 20 },
  { id: "room-4", name: "Salle 4", capacity: 10 },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Proposer un Cours Collectif",
    description:
      "Créez un cours théorique collectif pour regrouper plusieurs élèves avec rattrapages disponibles",
    students: {
      title: "Élèves participants",
      subtitle: "Sélectionnez les élèves à inclure dans le cours",
      selected: "sélectionné(s)",
      available: "rattrapage(s) disponible(s)",
      expiresIn: "Expire dans",
      days: "jours",
      minRequired: "Minimum 2 élèves requis",
    },
    course: {
      title: "Détails du cours",
      date: "Date",
      startTime: "Heure de début",
      endTime: "Heure de fin",
      duration: "Durée",
      hours: "heures",
      room: "Salle",
      selectRoom: "Sélectionner une salle",
      capacity: "places",
      topic: "Thème du cours",
      topicPlaceholder: "Ex: Théorie circulation Cat. B",
      description: "Description",
      descriptionPlaceholder:
        "Décrivez le contenu et les objectifs du cours...",
      category: "Catégorie",
      selectCategory: "Sélectionner une catégorie",
      maxParticipants: "Participants max",
    },
    notifications: {
      title: "Notifications",
      notify: "Notifier les élèves par email et SMS",
      notifyDescription:
        "Les élèves recevront une invitation qu'ils pourront accepter ou refuser",
    },
    validation: {
      minStudents: "Sélectionnez au moins 2 élèves",
      maxCapacity: "Le nombre d'élèves dépasse la capacité de la salle",
      dateRequired: "La date est requise",
      timeRequired: "Les horaires sont requis",
      roomRequired: "La salle est requise",
      topicRequired: "Le thème est requis",
    },
    actions: {
      cancel: "Annuler",
      propose: "Proposer le cours",
      proposing: "Création en cours...",
    },
    success: {
      title: "Cours proposé avec succès",
      description:
        "Les élèves ont été notifiés et pourront accepter ou refuser l'invitation",
    },
  },
  de: {
    title: "Gruppenkurs vorschlagen",
    description:
      "Erstellen Sie einen theoretischen Gruppenkurs für mehrere Schüler mit verfügbaren Nachholstunden",
    students: {
      title: "Teilnehmende Schüler",
      subtitle: "Wählen Sie die Schüler für den Kurs aus",
      selected: "ausgewählt",
      available: "verfügbare Nachholstunde(n)",
      expiresIn: "Läuft ab in",
      days: "Tagen",
      minRequired: "Mindestens 2 Schüler erforderlich",
    },
    course: {
      title: "Kursdetails",
      date: "Datum",
      startTime: "Startzeit",
      endTime: "Endzeit",
      duration: "Dauer",
      hours: "Stunden",
      room: "Raum",
      selectRoom: "Raum auswählen",
      capacity: "Plätze",
      topic: "Kursthema",
      topicPlaceholder: "Z.B.: Verkehrstheorie Kat. B",
      description: "Beschreibung",
      descriptionPlaceholder: "Beschreiben Sie Inhalt und Ziele des Kurses...",
      category: "Kategorie",
      selectCategory: "Kategorie auswählen",
      maxParticipants: "Max. Teilnehmer",
    },
    notifications: {
      title: "Benachrichtigungen",
      notify: "Schüler per E-Mail und SMS benachrichtigen",
      notifyDescription:
        "Die Schüler erhalten eine Einladung, die sie annehmen oder ablehnen können",
    },
    validation: {
      minStudents: "Wählen Sie mindestens 2 Schüler aus",
      maxCapacity: "Die Anzahl der Schüler überschreitet die Raumkapazität",
      dateRequired: "Datum ist erforderlich",
      timeRequired: "Zeiten sind erforderlich",
      roomRequired: "Raum ist erforderlich",
      topicRequired: "Thema ist erforderlich",
    },
    actions: {
      cancel: "Abbrechen",
      propose: "Kurs vorschlagen",
      proposing: "Wird erstellt...",
    },
    success: {
      title: "Kurs erfolgreich vorgeschlagen",
      description:
        "Die Schüler wurden benachrichtigt und können die Einladung annehmen oder ablehnen",
    },
  },
  it: {
    title: "Proporre Corso Collettivo",
    description:
      "Crea un corso teorico collettivo per raggruppare più studenti con recuperi disponibili",
    students: {
      title: "Studenti partecipanti",
      subtitle: "Seleziona gli studenti da includere nel corso",
      selected: "selezionato/i",
      available: "recupero/i disponibile/i",
      expiresIn: "Scade tra",
      days: "giorni",
      minRequired: "Minimo 2 studenti richiesti",
    },
    course: {
      title: "Dettagli del corso",
      date: "Data",
      startTime: "Ora di inizio",
      endTime: "Ora di fine",
      duration: "Durata",
      hours: "ore",
      room: "Aula",
      selectRoom: "Seleziona un'aula",
      capacity: "posti",
      topic: "Tema del corso",
      topicPlaceholder: "Es: Teoria circolazione Cat. B",
      description: "Descrizione",
      descriptionPlaceholder:
        "Descrivi il contenuto e gli obiettivi del corso...",
      category: "Categoria",
      selectCategory: "Seleziona una categoria",
      maxParticipants: "Partecipanti max",
    },
    notifications: {
      title: "Notifiche",
      notify: "Notifica gli studenti via email e SMS",
      notifyDescription:
        "Gli studenti riceveranno un invito che potranno accettare o rifiutare",
    },
    validation: {
      minStudents: "Seleziona almeno 2 studenti",
      maxCapacity: "Il numero di studenti supera la capacità dell'aula",
      dateRequired: "La data è richiesta",
      timeRequired: "Gli orari sono richiesti",
      roomRequired: "L'aula è richiesta",
      topicRequired: "Il tema è richiesto",
    },
    actions: {
      cancel: "Annulla",
      propose: "Proponi il corso",
      proposing: "Creazione in corso...",
    },
    success: {
      title: "Corso proposto con successo",
      description:
        "Gli studenti sono stati notificati e potranno accettare o rifiutare l'invito",
    },
  },
  en: {
    title: "Propose Group Course",
    description:
      "Create a group theory course to combine multiple students with available makeups",
    students: {
      title: "Participating students",
      subtitle: "Select students to include in the course",
      selected: "selected",
      available: "available makeup(s)",
      expiresIn: "Expires in",
      days: "days",
      minRequired: "Minimum 2 students required",
    },
    course: {
      title: "Course details",
      date: "Date",
      startTime: "Start time",
      endTime: "End time",
      duration: "Duration",
      hours: "hours",
      room: "Room",
      selectRoom: "Select a room",
      capacity: "seats",
      topic: "Course topic",
      topicPlaceholder: "E.g.: Traffic theory Cat. B",
      description: "Description",
      descriptionPlaceholder: "Describe the course content and objectives...",
      category: "Category",
      selectCategory: "Select a category",
      maxParticipants: "Max participants",
    },
    notifications: {
      title: "Notifications",
      notify: "Notify students by email and SMS",
      notifyDescription:
        "Students will receive an invitation they can accept or decline",
    },
    validation: {
      minStudents: "Select at least 2 students",
      maxCapacity: "Number of students exceeds room capacity",
      dateRequired: "Date is required",
      timeRequired: "Times are required",
      roomRequired: "Room is required",
      topicRequired: "Topic is required",
    },
    actions: {
      cancel: "Cancel",
      propose: "Propose course",
      proposing: "Creating...",
    },
    success: {
      title: "Course proposed successfully",
      description:
        "Students have been notified and can accept or decline the invitation",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ProposeGroupMakeupDialog({
  open,
  onOpenChange,
  students,
  locale = "fr",
  onConfirm,
}: ProposeGroupMakeupDialogProps) {
  const t = translations[locale];

  // Filter students with available makeups
  const eligibleStudents = students.filter((s) => s.available > 0);

  // Form state
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [room, setRoom] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("B");
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Selected room data
  const selectedRoom = MOCK_ROOMS.find((r) => r.id === room);

  // Calculate duration
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const duration = endH * 60 + endM - (startH * 60 + startM);
    return duration / 60;
  };

  const duration = calculateDuration();

  // Toggle student selection
  const toggleStudent = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (selectedStudentIds.length < 2) {
      newErrors.push(t.validation.minStudents);
    }

    if (selectedRoom && selectedStudentIds.length > selectedRoom.capacity) {
      newErrors.push(t.validation.maxCapacity);
    }

    if (!date) {
      newErrors.push(t.validation.dateRequired);
    }

    if (!startTime || !endTime) {
      newErrors.push(t.validation.timeRequired);
    }

    if (!room) {
      newErrors.push(t.validation.roomRequired);
    }

    if (!topic.trim()) {
      newErrors.push(t.validation.topicRequired);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await onConfirm?.({
        studentIds: selectedStudentIds,
        date,
        startTime,
        endTime,
        room,
        topic,
        description,
        category,
        maxParticipants: selectedRoom?.capacity || 20,
        notifyStudents,
      });

      // Reset form
      setSelectedStudentIds([]);
      setDate("");
      setStartTime("09:00");
      setEndTime("12:00");
      setRoom("");
      setTopic("");
      setDescription("");
      setCategory("B");
      setNotifyStudents(true);
      setErrors([]);

      onOpenChange(false);
    } catch (error) {
      console.error("Error proposing group makeup:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary" />

            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {/* Errors */}
            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircleIcon className="w-4 h-4" />

                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Students Selection */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" />

                  {t.students.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.students.subtitle}
                </p>
                {selectedStudentIds.length > 0 && (
                  <Badge variant="secondary" className="mt-2">
                    {selectedStudentIds.length} {t.students.selected}
                  </Badge>
                )}
              </div>

              {eligibleStudents.length === 0 ? (
                <Alert>
                  <AlertCircleIcon className="w-4 h-4" />

                  <AlertDescription>{t.students.minRequired}</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2 border border-border rounded-lg p-3">
                  {eligibleStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors"
                    >
                      <Checkbox
                        checked={selectedStudentIds.includes(student.studentId)}
                        onCheckedChange={() => toggleStudent(student.studentId)}
                      />

                      <img
                        src={student.studentAvatar}
                        alt={student.studentName}
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {student.studentName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {student.available} {t.students.available}
                          </Badge>
                          {student.expiresIn && (
                            <span
                              className={
                                student.expiresIn.urgent
                                  ? "text-destructive"
                                  : ""
                              }
                            >
                              {t.students.expiresIn} {student.expiresIn.days}{" "}
                              {t.students.days}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4" />

                {t.course.title}
              </h3>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3" />

                    {t.course.date}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ClockIcon className="w-3 h-3" />

                    {t.course.duration}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="flex-1"
                    />

                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  {duration > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {duration.toFixed(1)} {t.course.hours}
                    </p>
                  )}
                </div>
              </div>

              {/* Room & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room" className="flex items-center gap-2">
                    <MapPinIcon className="w-3 h-3" />

                    {t.course.room}
                  </Label>
                  <Select value={room} onValueChange={setRoom}>
                    <SelectTrigger id="room">
                      <SelectValue placeholder={t.course.selectRoom} />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_ROOMS.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.name} ({r.capacity} {t.course.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t.course.category}</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder={t.course.selectCategory} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B">Catégorie B</SelectItem>
                      <SelectItem value="A">Catégorie A</SelectItem>
                      <SelectItem value="A1">Catégorie A1</SelectItem>
                      <SelectItem value="C">Catégorie C</SelectItem>
                      <SelectItem value="D">Catégorie D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">{t.course.topic}</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t.course.topicPlaceholder}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t.course.description}</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.course.descriptionPlaceholder}
                  rows={3}
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">
                {t.notifications.title}
              </h3>
              <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <Checkbox
                  id="notify"
                  checked={notifyStudents}
                  onCheckedChange={(checked) =>
                    setNotifyStudents(checked as boolean)
                  }
                />

                <div className="flex-1">
                  <Label
                    htmlFor="notify"
                    className="font-medium cursor-pointer"
                  >
                    {t.notifications.notify}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.notifications.notifyDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.actions.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? t.actions.proposing : t.actions.propose}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
