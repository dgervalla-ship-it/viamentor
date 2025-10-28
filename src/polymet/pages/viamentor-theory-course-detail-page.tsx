/**
 * VIAMENTOR - Détail Cours Théorique
 * Page détail cours théorique avec tabs navigation et gestion participants
 */

"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  BookOpenIcon,
  FileTextIcon,
  HistoryIcon,
  EditIcon,
  TrashIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  DownloadIcon,
  MailIcon,
  PhoneIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { TheoryCoursesLocale } from "@/polymet/data/viamentor-theory-courses-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface TheoryCourseDetailPageProps {
  locale?: TheoryCoursesLocale;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_COURSE = {
  id: "1",
  title: "Signalisation routière et priorités",
  category: "Catégorie B",
  status: "scheduled" as const,
  date: "2025-01-20",
  startTime: "14:00",
  endTime: "16:00",
  duration: 120,
  room: "Salle A",
  instructor: {
    id: "1",
    name: "Marc Müller",
    avatar: "https://github.com/yusufhilmi.png",
    phone: "+41 79 123 45 67",
    email: "marc.muller@viamentor.ch",
  },
  capacity: 20,
  enrolled: 15,
  waitingList: 3,
  description:
    "Ce cours couvre les règles de signalisation routière suisse, les panneaux de signalisation, les marquages au sol et les règles de priorité.",
  program: [
    "Introduction à la signalisation routière",
    "Panneaux de danger et d'interdiction",
    "Panneaux d'obligation et d'indication",
    "Marquages au sol",
    "Règles de priorité aux intersections",
    "Cas pratiques et exercices",
  ],

  materials: [
    "Manuel théorique officiel",
    "Cahier d'exercices",
    "Accès plateforme e-learning",
  ],
};

const MOCK_PARTICIPANTS = [
  {
    id: "1",
    name: "Sophie Laurent",
    avatar: "https://github.com/kdrnp.png",
    phone: "+41 79 234 56 78",
    email: "sophie.laurent@email.ch",
    enrolledDate: "2025-01-10",
    status: "confirmed" as const,
    attendance: null,
  },
  {
    id: "2",
    name: "Thomas Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    phone: "+41 79 345 67 89",
    email: "thomas.dubois@email.ch",
    enrolledDate: "2025-01-11",
    status: "confirmed" as const,
    attendance: null,
  },
  {
    id: "3",
    name: "Emma Favre",
    avatar: "https://github.com/yahyabedirhan.png",
    phone: "+41 79 456 78 90",
    email: "emma.favre@email.ch",
    enrolledDate: "2025-01-12",
    status: "confirmed" as const,
    attendance: null,
  },
];

const MOCK_WAITING_LIST = [
  {
    id: "4",
    name: "Lucas Bernard",
    avatar: "https://github.com/denizbuyuktas.png",
    phone: "+41 79 567 89 01",
    email: "lucas.bernard@email.ch",
    addedDate: "2025-01-15",
    position: 1,
  },
  {
    id: "5",
    name: "Léa Martin",
    avatar: "https://github.com/shoaibux1.png",
    phone: "+41 79 678 90 12",
    email: "lea.martin@email.ch",
    addedDate: "2025-01-16",
    position: 2,
  },
];

const MOCK_DOCUMENTS = [
  {
    id: "1",
    name: "Support de cours - Signalisation.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadedDate: "2025-01-10",
    uploadedBy: "Marc Müller",
  },
  {
    id: "2",
    name: "Exercices pratiques.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedDate: "2025-01-10",
    uploadedBy: "Marc Müller",
  },
  {
    id: "3",
    name: "Présentation PowerPoint.pptx",
    type: "PPTX",
    size: "5.2 MB",
    uploadedDate: "2025-01-12",
    uploadedBy: "Marc Müller",
  },
];

const MOCK_HISTORY = [
  {
    id: "1",
    action: "Cours créé",
    user: "Admin Système",
    date: "2025-01-08 10:30",
    details: "Cours créé avec 20 places disponibles",
  },
  {
    id: "2",
    action: "Inscription",
    user: "Sophie Laurent",
    date: "2025-01-10 14:20",
    details: "Inscription confirmée",
  },
  {
    id: "3",
    action: "Inscription",
    user: "Thomas Dubois",
    date: "2025-01-11 09:15",
    details: "Inscription confirmée",
  },
  {
    id: "4",
    action: "Document ajouté",
    user: "Marc Müller",
    date: "2025-01-12 16:45",
    details: "Présentation PowerPoint ajoutée",
  },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    backToList: "Retour à la liste",
    edit: "Modifier",
    cancel: "Annuler le cours",
    addParticipant: "Inscrire élève",
    tabs: {
      info: "Informations",
      participants: "Participants",
      waitingList: "Liste d'attente",
      documents: "Documents",
      history: "Historique",
    },
    info: {
      details: "Détails du cours",
      program: "Programme",
      materials: "Matériel requis",
    },
    participants: {
      title: "Participants inscrits",
      enrolled: "inscrits",
      name: "Nom",
      contact: "Contact",
      enrolledDate: "Date d'inscription",
      status: "Statut",
      attendance: "Présence",
      actions: "Actions",
      confirmed: "Confirmé",
      pending: "En attente",
      cancelled: "Annulé",
      present: "Présent",
      absent: "Absent",
      notMarked: "Non marqué",
    },
    waitingList: {
      title: "Liste d'attente",
      position: "Position",
      addedDate: "Date d'ajout",
      moveToParticipants: "Inscrire",
      remove: "Retirer",
    },
    documents: {
      title: "Documents du cours",
      name: "Nom",
      type: "Type",
      size: "Taille",
      uploadedDate: "Date d'ajout",
      uploadedBy: "Ajouté par",
      download: "Télécharger",
      upload: "Ajouter document",
    },
    history: {
      title: "Historique des modifications",
      action: "Action",
      user: "Utilisateur",
      date: "Date",
      details: "Détails",
    },
    status: {
      scheduled: "Planifié",
      ongoing: "En cours",
      completed: "Terminé",
      cancelled: "Annulé",
    },
  },
  de: {
    backToList: "Zurück zur Liste",
    edit: "Bearbeiten",
    cancel: "Kurs absagen",
    addParticipant: "Schüler anmelden",
    tabs: {
      info: "Informationen",
      participants: "Teilnehmer",
      waitingList: "Warteliste",
      documents: "Dokumente",
      history: "Verlauf",
    },
    info: {
      details: "Kursdetails",
      program: "Programm",
      materials: "Erforderliches Material",
    },
    participants: {
      title: "Angemeldete Teilnehmer",
      enrolled: "angemeldet",
      name: "Name",
      contact: "Kontakt",
      enrolledDate: "Anmeldedatum",
      status: "Status",
      attendance: "Anwesenheit",
      actions: "Aktionen",
      confirmed: "Bestätigt",
      pending: "Ausstehend",
      cancelled: "Abgesagt",
      present: "Anwesend",
      absent: "Abwesend",
      notMarked: "Nicht markiert",
    },
    waitingList: {
      title: "Warteliste",
      position: "Position",
      addedDate: "Hinzugefügt am",
      moveToParticipants: "Anmelden",
      remove: "Entfernen",
    },
    documents: {
      title: "Kursdokumente",
      name: "Name",
      type: "Typ",
      size: "Größe",
      uploadedDate: "Hinzugefügt am",
      uploadedBy: "Hinzugefügt von",
      download: "Herunterladen",
      upload: "Dokument hinzufügen",
    },
    history: {
      title: "Änderungsverlauf",
      action: "Aktion",
      user: "Benutzer",
      date: "Datum",
      details: "Details",
    },
    status: {
      scheduled: "Geplant",
      ongoing: "Laufend",
      completed: "Abgeschlossen",
      cancelled: "Abgesagt",
    },
  },
  it: {
    backToList: "Torna alla lista",
    edit: "Modifica",
    cancel: "Annulla corso",
    addParticipant: "Iscrivere allievo",
    tabs: {
      info: "Informazioni",
      participants: "Partecipanti",
      waitingList: "Lista d'attesa",
      documents: "Documenti",
      history: "Cronologia",
    },
    info: {
      details: "Dettagli del corso",
      program: "Programma",
      materials: "Materiale richiesto",
    },
    participants: {
      title: "Partecipanti iscritti",
      enrolled: "iscritti",
      name: "Nome",
      contact: "Contatto",
      enrolledDate: "Data d'iscrizione",
      status: "Stato",
      attendance: "Presenza",
      actions: "Azioni",
      confirmed: "Confermato",
      pending: "In attesa",
      cancelled: "Annullato",
      present: "Presente",
      absent: "Assente",
      notMarked: "Non segnato",
    },
    waitingList: {
      title: "Lista d'attesa",
      position: "Posizione",
      addedDate: "Data d'aggiunta",
      moveToParticipants: "Iscrivere",
      remove: "Rimuovere",
    },
    documents: {
      title: "Documenti del corso",
      name: "Nome",
      type: "Tipo",
      size: "Dimensione",
      uploadedDate: "Data d'aggiunta",
      uploadedBy: "Aggiunto da",
      download: "Scaricare",
      upload: "Aggiungere documento",
    },
    history: {
      title: "Cronologia delle modifiche",
      action: "Azione",
      user: "Utente",
      date: "Data",
      details: "Dettagli",
    },
    status: {
      scheduled: "Pianificato",
      ongoing: "In corso",
      completed: "Completato",
      cancelled: "Annullato",
    },
  },
  en: {
    backToList: "Back to list",
    edit: "Edit",
    cancel: "Cancel course",
    addParticipant: "Enroll student",
    tabs: {
      info: "Information",
      participants: "Participants",
      waitingList: "Waiting list",
      documents: "Documents",
      history: "History",
    },
    info: {
      details: "Course details",
      program: "Program",
      materials: "Required materials",
    },
    participants: {
      title: "Enrolled participants",
      enrolled: "enrolled",
      name: "Name",
      contact: "Contact",
      enrolledDate: "Enrollment date",
      status: "Status",
      attendance: "Attendance",
      actions: "Actions",
      confirmed: "Confirmed",
      pending: "Pending",
      cancelled: "Cancelled",
      present: "Present",
      absent: "Absent",
      notMarked: "Not marked",
    },
    waitingList: {
      title: "Waiting list",
      position: "Position",
      addedDate: "Added date",
      moveToParticipants: "Enroll",
      remove: "Remove",
    },
    documents: {
      title: "Course documents",
      name: "Name",
      type: "Type",
      size: "Size",
      uploadedDate: "Upload date",
      uploadedBy: "Uploaded by",
      download: "Download",
      upload: "Add document",
    },
    history: {
      title: "Change history",
      action: "Action",
      user: "User",
      date: "Date",
      details: "Details",
    },
    status: {
      scheduled: "Scheduled",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function TheoryCourseDetailPage({
  locale = "fr",
}: TheoryCourseDetailPageProps) {
  const { id } = useParams();
  const t = translations[locale];
  const [activeTab, setActiveTab] = useState("info");

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-950/20";
      case "ongoing":
        return "border-green-500 text-green-500 bg-green-50 dark:bg-green-950/20";
      case "completed":
        return "border-gray-500 text-gray-500 bg-gray-50 dark:bg-gray-950/20";
      case "cancelled":
        return "border-red-500 text-red-500 bg-red-50 dark:bg-red-950/20";
      default:
        return "border-gray-500 text-gray-500 bg-gray-50 dark:bg-gray-950/20";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            <h1 className="text-3xl font-bold tracking-tight">
              {MOCK_COURSE.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={getStatusColor(MOCK_COURSE.status)}
              >
                {t.status[MOCK_COURSE.status]}
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-950/20"
              >
                {MOCK_COURSE.category}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="min-h-[44px] border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              <EditIcon className="mr-2 h-5 w-5" />

              {t.edit}
            </Button>
            <Button
              variant="outline"
              className="min-h-[44px] border-2 border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <TrashIcon className="mr-2 h-5 w-5" />

              {t.cancel}
            </Button>
            <Button className="min-h-[44px] bg-blue-500 text-white hover:bg-blue-600">
              <UserPlusIcon className="mr-2 h-5 w-5" />

              {t.addParticipant}
            </Button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-950/20 p-3">
                <CalendarIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">{MOCK_COURSE.date}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 dark:bg-green-950/20 p-3">
                <ClockIcon className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horaire</p>
                <p className="font-semibold">
                  {MOCK_COURSE.startTime} - {MOCK_COURSE.endTime}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 dark:bg-purple-950/20 p-3">
                <MapPinIcon className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Salle</p>
                <p className="font-semibold">{MOCK_COURSE.room}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 dark:bg-orange-950/20 p-3">
                <UsersIcon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="font-semibold">
                  {MOCK_COURSE.enrolled}/{MOCK_COURSE.capacity}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="info" className="gap-2">
              <BookOpenIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.tabs.info}</span>
            </TabsTrigger>
            <TabsTrigger value="participants" className="gap-2">
              <UsersIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.tabs.participants}</span>
              <Badge variant="secondary" className="ml-1">
                {MOCK_COURSE.enrolled}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="waiting" className="gap-2">
              <AlertCircleIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.tabs.waitingList}</span>
              <Badge variant="secondary" className="ml-1">
                {MOCK_COURSE.waitingList}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileTextIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.tabs.documents}</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <HistoryIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.tabs.history}</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Informations */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Détails */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{t.info.details}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Description
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      {MOCK_COURSE.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Moniteur
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={MOCK_COURSE.instructor.avatar} />

                        <AvatarFallback>
                          {MOCK_COURSE.instructor.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {MOCK_COURSE.instructor.name}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <PhoneIcon className="h-3 w-3" />

                            {MOCK_COURSE.instructor.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MailIcon className="h-3 w-3" />

                            {MOCK_COURSE.instructor.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Programme */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{t.info.program}</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <ul className="space-y-2">
                    {MOCK_COURSE.program.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Matériel */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t.info.materials}</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <ul className="space-y-2">
                  {MOCK_COURSE.materials.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Participants */}
          <TabsContent value="participants">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t.participants.title}</CardTitle>
                    <CardDescription>
                      {MOCK_COURSE.enrolled} {t.participants.enrolled}
                    </CardDescription>
                  </div>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    <UserPlusIcon className="mr-2 h-5 w-5" />

                    {t.addParticipant}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.participants.name}</TableHead>
                        <TableHead>{t.participants.contact}</TableHead>
                        <TableHead>{t.participants.enrolledDate}</TableHead>
                        <TableHead>{t.participants.status}</TableHead>
                        <TableHead>{t.participants.attendance}</TableHead>
                        <TableHead className="text-right">
                          {t.participants.actions}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_PARTICIPANTS.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={participant.avatar} />

                                <AvatarFallback>
                                  {participant.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {participant.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <PhoneIcon className="h-3 w-3" />

                                {participant.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <MailIcon className="h-3 w-3" />

                                {participant.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{participant.enrolledDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-500 bg-green-50 dark:bg-green-950/20"
                            >
                              {t.participants.confirmed}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-gray-500 text-gray-500"
                            >
                              {t.participants.notMarked}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Waiting List */}
          <TabsContent value="waiting">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t.waitingList.title}</CardTitle>
                <CardDescription>
                  {MOCK_COURSE.waitingList} personnes en attente
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.waitingList.position}</TableHead>
                        <TableHead>{t.participants.name}</TableHead>
                        <TableHead>{t.participants.contact}</TableHead>
                        <TableHead>{t.waitingList.addedDate}</TableHead>
                        <TableHead className="text-right">
                          {t.participants.actions}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_WAITING_LIST.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell>
                            <Badge variant="secondary">
                              #{person.position}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={person.avatar} />

                                <AvatarFallback>
                                  {person.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{person.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <PhoneIcon className="h-3 w-3" />

                                {person.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <MailIcon className="h-3 w-3" />

                                {person.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{person.addedDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-500 text-green-500 hover:bg-green-50"
                              >
                                {t.waitingList.moveToParticipants}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:bg-red-50"
                              >
                                {t.waitingList.remove}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Documents */}
          <TabsContent value="documents">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center justify-between">
                  <CardTitle>{t.documents.title}</CardTitle>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    <FileTextIcon className="mr-2 h-5 w-5" />

                    {t.documents.upload}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.documents.name}</TableHead>
                        <TableHead>{t.documents.type}</TableHead>
                        <TableHead>{t.documents.size}</TableHead>
                        <TableHead>{t.documents.uploadedDate}</TableHead>
                        <TableHead>{t.documents.uploadedBy}</TableHead>
                        <TableHead className="text-right">
                          {t.participants.actions}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MOCK_DOCUMENTS.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">
                            {doc.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{doc.type}</Badge>
                          </TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.uploadedDate}</TableCell>
                          <TableCell>{doc.uploadedBy}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: History */}
          <TabsContent value="history">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t.history.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  {MOCK_HISTORY.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex gap-4 border-b border-border pb-4 last:border-0"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/20">
                          <HistoryIcon className="h-4 w-4 text-blue-500" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{entry.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.date}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.user}
                        </p>
                        <p className="text-sm">{entry.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TheoryCourseDetailPage;
