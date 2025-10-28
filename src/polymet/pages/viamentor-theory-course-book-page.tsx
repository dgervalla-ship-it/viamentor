/**
 * VIAMENTOR - Inscription Cours Théorique
 * Wizard 3 steps pour inscrire des élèves à un cours théorique
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  MapPinIcon,
  UsersIcon,
  SearchIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { TheoryCoursesLocale } from "@/polymet/data/viamentor-theory-courses-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface TheoryCourseBookPageProps {
  locale?: TheoryCoursesLocale;
}

interface TheoryCourse {
  id: string;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  available: number;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  category: string;
  phone: string;
  email: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_COURSES: TheoryCourse[] = [
  {
    id: "1",
    title: "Signalisation routière et priorités",
    category: "Catégorie B",
    date: "2025-01-20",
    startTime: "14:00",
    endTime: "16:00",
    room: "Salle A",
    instructor: "Marc Müller",
    capacity: 20,
    enrolled: 15,
    available: 5,
  },
  {
    id: "2",
    title: "Règles de circulation",
    category: "Catégorie B",
    date: "2025-01-22",
    startTime: "10:00",
    endTime: "12:00",
    room: "Salle B",
    instructor: "Sophie Laurent",
    capacity: 20,
    enrolled: 12,
    available: 8,
  },
  {
    id: "3",
    title: "Conduite défensive",
    category: "Catégorie B",
    date: "2025-01-25",
    startTime: "14:00",
    endTime: "16:00",
    room: "Salle A",
    instructor: "Marc Müller",
    capacity: 20,
    enrolled: 18,
    available: 2,
  },
];

const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Alice Bernard",
    avatar: "https://github.com/kdrnp.png",
    category: "Catégorie B",
    phone: "+41 79 123 45 67",
    email: "alice.bernard@email.ch",
  },
  {
    id: "2",
    name: "Thomas Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    category: "Catégorie B",
    phone: "+41 79 234 56 78",
    email: "thomas.dubois@email.ch",
  },
  {
    id: "3",
    name: "Emma Favre",
    avatar: "https://github.com/yahyabedirhan.png",
    category: "Catégorie B",
    phone: "+41 79 345 67 89",
    email: "emma.favre@email.ch",
  },
  {
    id: "4",
    name: "Lucas Martin",
    avatar: "https://github.com/denizbuyuktas.png",
    category: "Catégorie B",
    phone: "+41 79 456 78 90",
    email: "lucas.martin@email.ch",
  },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Inscrire des élèves",
    subtitle: "Wizard d'inscription en 3 étapes",
    backToList: "Retour à la liste",
    steps: {
      course: "Sélection du cours",
      students: "Sélection des élèves",
      confirmation: "Confirmation",
    },
    step1: {
      title: "Choisissez un cours théorique",
      description:
        "Sélectionnez le cours auquel vous souhaitez inscrire des élèves",
      search: "Rechercher un cours...",
      filterCategory: "Catégorie",
      filterDate: "Date",
      allCategories: "Toutes les catégories",
      available: "places disponibles",
      full: "Complet",
      select: "Sélectionner",
    },
    step2: {
      title: "Sélectionnez les élèves",
      description: "Choisissez les élèves à inscrire au cours sélectionné",
      search: "Rechercher un élève...",
      filterCategory: "Catégorie",
      selected: "sélectionné(s)",
      noStudents: "Aucun élève trouvé",
    },
    step3: {
      title: "Confirmation de l'inscription",
      description: "Vérifiez les informations avant de confirmer",
      courseDetails: "Détails du cours",
      selectedStudents: "Élèves sélectionnés",
      summary: "Récapitulatif",
      totalEnrollments: "Total d'inscriptions",
      availableSeats: "Places disponibles",
      remainingSeats: "Places restantes après inscription",
      warning: "Attention",
      notEnoughSeats:
        "Il n'y a pas assez de places disponibles pour tous les élèves sélectionnés.",
    },
    actions: {
      previous: "Précédent",
      next: "Suivant",
      confirm: "Confirmer l'inscription",
      cancel: "Annuler",
    },
    success: {
      title: "Inscription réussie !",
      message: "Les élèves ont été inscrits au cours avec succès.",
      backToCourses: "Retour aux cours",
      viewCourse: "Voir le cours",
    },
  },
  de: {
    title: "Schüler anmelden",
    subtitle: "Anmeldungs-Assistent in 3 Schritten",
    backToList: "Zurück zur Liste",
    steps: {
      course: "Kursauswahl",
      students: "Schülerauswahl",
      confirmation: "Bestätigung",
    },
    step1: {
      title: "Wählen Sie einen Theoriekurs",
      description:
        "Wählen Sie den Kurs aus, für den Sie Schüler anmelden möchten",
      search: "Kurs suchen...",
      filterCategory: "Kategorie",
      filterDate: "Datum",
      allCategories: "Alle Kategorien",
      available: "Plätze verfügbar",
      full: "Ausgebucht",
      select: "Auswählen",
    },
    step2: {
      title: "Schüler auswählen",
      description:
        "Wählen Sie die Schüler aus, die für den Kurs angemeldet werden sollen",
      search: "Schüler suchen...",
      filterCategory: "Kategorie",
      selected: "ausgewählt",
      noStudents: "Keine Schüler gefunden",
    },
    step3: {
      title: "Anmeldebestätigung",
      description: "Überprüfen Sie die Informationen vor der Bestätigung",
      courseDetails: "Kursdetails",
      selectedStudents: "Ausgewählte Schüler",
      summary: "Zusammenfassung",
      totalEnrollments: "Gesamtanmeldungen",
      availableSeats: "Verfügbare Plätze",
      remainingSeats: "Verbleibende Plätze nach Anmeldung",
      warning: "Achtung",
      notEnoughSeats:
        "Es sind nicht genügend Plätze für alle ausgewählten Schüler verfügbar.",
    },
    actions: {
      previous: "Zurück",
      next: "Weiter",
      confirm: "Anmeldung bestätigen",
      cancel: "Abbrechen",
    },
    success: {
      title: "Anmeldung erfolgreich!",
      message: "Die Schüler wurden erfolgreich für den Kurs angemeldet.",
      backToCourses: "Zurück zu den Kursen",
      viewCourse: "Kurs anzeigen",
    },
  },
  it: {
    title: "Iscrivere allievi",
    subtitle: "Procedura guidata di iscrizione in 3 passaggi",
    backToList: "Torna alla lista",
    steps: {
      course: "Selezione del corso",
      students: "Selezione degli allievi",
      confirmation: "Conferma",
    },
    step1: {
      title: "Scegli un corso teorico",
      description: "Seleziona il corso a cui vuoi iscrivere gli allievi",
      search: "Cerca un corso...",
      filterCategory: "Categoria",
      filterDate: "Data",
      allCategories: "Tutte le categorie",
      available: "posti disponibili",
      full: "Completo",
      select: "Seleziona",
    },
    step2: {
      title: "Seleziona gli allievi",
      description: "Scegli gli allievi da iscrivere al corso selezionato",
      search: "Cerca un allievo...",
      filterCategory: "Categoria",
      selected: "selezionato/i",
      noStudents: "Nessun allievo trovato",
    },
    step3: {
      title: "Conferma dell'iscrizione",
      description: "Verifica le informazioni prima di confermare",
      courseDetails: "Dettagli del corso",
      selectedStudents: "Allievi selezionati",
      summary: "Riepilogo",
      totalEnrollments: "Totale iscrizioni",
      availableSeats: "Posti disponibili",
      remainingSeats: "Posti rimanenti dopo l'iscrizione",
      warning: "Attenzione",
      notEnoughSeats:
        "Non ci sono abbastanza posti disponibili per tutti gli allievi selezionati.",
    },
    actions: {
      previous: "Precedente",
      next: "Successivo",
      confirm: "Conferma iscrizione",
      cancel: "Annulla",
    },
    success: {
      title: "Iscrizione riuscita!",
      message: "Gli allievi sono stati iscritti al corso con successo.",
      backToCourses: "Torna ai corsi",
      viewCourse: "Visualizza corso",
    },
  },
  en: {
    title: "Enroll students",
    subtitle: "3-step enrollment wizard",
    backToList: "Back to list",
    steps: {
      course: "Course selection",
      students: "Student selection",
      confirmation: "Confirmation",
    },
    step1: {
      title: "Choose a theory course",
      description: "Select the course you want to enroll students in",
      search: "Search for a course...",
      filterCategory: "Category",
      filterDate: "Date",
      allCategories: "All categories",
      available: "seats available",
      full: "Full",
      select: "Select",
    },
    step2: {
      title: "Select students",
      description: "Choose the students to enroll in the selected course",
      search: "Search for a student...",
      filterCategory: "Category",
      selected: "selected",
      noStudents: "No students found",
    },
    step3: {
      title: "Enrollment confirmation",
      description: "Review the information before confirming",
      courseDetails: "Course details",
      selectedStudents: "Selected students",
      summary: "Summary",
      totalEnrollments: "Total enrollments",
      availableSeats: "Available seats",
      remainingSeats: "Remaining seats after enrollment",
      warning: "Warning",
      notEnoughSeats:
        "There are not enough seats available for all selected students.",
    },
    actions: {
      previous: "Previous",
      next: "Next",
      confirm: "Confirm enrollment",
      cancel: "Cancel",
    },
    success: {
      title: "Enrollment successful!",
      message: "Students have been successfully enrolled in the course.",
      backToCourses: "Back to courses",
      viewCourse: "View course",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function TheoryCourseBookPage({
  locale = "fr",
}: TheoryCourseBookPageProps) {
  const t = translations[locale];
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<TheoryCourse | null>(
    null
  );
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchCourse, setSearchCourse] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter courses
  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchCourse.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter students
  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchStudent.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || student.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Toggle student selection
  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Check if there are enough seats
  const hasEnoughSeats = selectedCourse
    ? selectedStudents.length <= selectedCourse.available
    : true;

  // Handle confirm
  const handleConfirm = () => {
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/20">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="mb-2 text-2xl">{t.success.title}</CardTitle>
            <CardDescription className="mb-6">
              {t.success.message}
            </CardDescription>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="outline"
                className="min-h-[44px] border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10"
                asChild
              >
                <Link to="/theory-courses">{t.success.backToCourses}</Link>
              </Button>
              <Button
                className="min-h-[44px] bg-blue-500 text-white hover:bg-blue-600"
                asChild
              >
                <Link to={`/theory-courses/${selectedCourse?.id}`}>
                  {t.success.viewCourse}
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 h-auto p-2"
            asChild
          >
            <Link to="/theory-courses">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />

              {t.backToList}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    step === currentStep
                      ? "border-blue-500 bg-blue-500 text-white"
                      : step < currentStep
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`hidden text-sm font-medium sm:inline ${
                    step === currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step === 1 && t.steps.course}
                  {step === 2 && t.steps.students}
                  {step === 3 && t.steps.confirmation}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    step < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Course Selection */}
        {currentStep === 1 && (
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>{t.step1.title}</CardTitle>
              <CardDescription>{t.step1.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              {/* Filters */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder={t.step1.search}
                    value={searchCourse}
                    onChange={(e) => setSearchCourse(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.step1.allCategories}</SelectItem>
                    <SelectItem value="Catégorie B">Catégorie B</SelectItem>
                    <SelectItem value="Catégorie A">Catégorie A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Courses List */}
              <div className="grid gap-4">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCourse?.id === course.id
                        ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                        : ""
                    }`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{course.title}</h3>
                            <Badge
                              variant="outline"
                              className="border-purple-500 text-purple-500"
                            >
                              {course.category}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />

                              {course.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              {course.startTime} - {course.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPinIcon className="h-4 w-4" />

                              {course.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <UsersIcon className="h-4 w-4" />
                              {course.enrolled}/{course.capacity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          {course.available > 0 ? (
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-500 bg-green-50 dark:bg-green-950/20"
                            >
                              {course.available} {t.step1.available}
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-red-500 text-red-500 bg-red-50 dark:bg-red-950/20"
                            >
                              {t.step1.full}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Student Selection */}
        {currentStep === 2 && (
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>{t.step2.title}</CardTitle>
              <CardDescription>
                {t.step2.description} • {selectedStudents.length}{" "}
                {t.step2.selected}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder={t.step2.search}
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Students List */}
              <div className="grid gap-3">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedStudents.includes(student.id)
                        ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                        : ""
                    }`}
                    onClick={() => toggleStudent(student.id)}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleStudent(student.id)}
                      />

                      <Avatar className="h-11 w-11">
                        <AvatarImage src={student.avatar} />

                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.category}
                        </p>
                      </div>
                      <Badge variant="outline">{student.category}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && selectedCourse && (
          <div className="space-y-6">
            {/* Warning if not enough seats */}
            {!hasEnoughSeats && (
              <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircleIcon className="h-5 w-5 text-amber-500" />

                  <div>
                    <p className="font-medium text-amber-900 dark:text-amber-100">
                      {t.step3.warning}
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {t.step3.notEnoughSeats}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Course Details */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{t.step3.courseDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-0">
                  <div>
                    <p className="text-sm text-muted-foreground">Titre</p>
                    <p className="font-medium">{selectedCourse.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Catégorie</p>
                    <Badge
                      variant="outline"
                      className="border-purple-500 text-purple-500"
                    >
                      {selectedCourse.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date et heure
                    </p>
                    <p className="font-medium">
                      {selectedCourse.date} • {selectedCourse.startTime} -{" "}
                      {selectedCourse.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Salle</p>
                    <p className="font-medium">{selectedCourse.room}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Moniteur</p>
                    <p className="font-medium">{selectedCourse.instructor}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Students */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{t.step3.selectedStudents}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-0">
                  {MOCK_STUDENTS.filter((s) =>
                    selectedStudents.includes(s.id)
                  ).map((student) => (
                    <div key={student.id} className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={student.avatar} />

                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t.step3.summary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-0">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t.step3.totalEnrollments}
                  </span>
                  <span className="font-semibold">
                    {selectedStudents.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t.step3.availableSeats}
                  </span>
                  <span className="font-semibold">
                    {selectedCourse.available}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">
                    {t.step3.remainingSeats}
                  </span>
                  <span
                    className={`font-semibold ${
                      hasEnoughSeats ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {selectedCourse.available - selectedStudents.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          {currentStep === 1 ? (
            <Button variant="outline" className="min-h-[44px] border-2" asChild>
              <Link to="/theory-courses">
                <ArrowLeftIcon className="mr-2 h-5 w-5" />

                {t.actions.cancel}
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="min-h-[44px] border-2"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />

              {t.actions.previous}
            </Button>
          )}
          <Button
            className="min-h-[44px] bg-blue-500 text-white hover:bg-blue-600"
            disabled={
              (currentStep === 1 && !selectedCourse) ||
              (currentStep === 2 && selectedStudents.length === 0) ||
              (currentStep === 3 && !hasEnoughSeats)
            }
            onClick={() => {
              if (currentStep === 3) {
                handleConfirm();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === 3 ? t.actions.confirm : t.actions.next}
            {currentStep < 3 && <ArrowRightIcon className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TheoryCourseBookPage;
