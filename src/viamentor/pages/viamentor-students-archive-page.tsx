/**
 * VIAMENTOR - Students Archive Page
 * Page d'archive des élèves avec restauration
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeftIcon,
  SearchIcon,
  ArchiveRestoreIcon,
  Trash2Icon,
  CalendarIcon,
  InfoIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ArchivedStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  archivedDate: string;
  archivedReason: string;
}

interface StudentsArchivePageProps {
  locale?: "fr" | "de" | "it" | "en";
}

export function StudentsArchivePage({
  locale = "fr",
}: StudentsArchivePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState<ArchivedStudent | null>(null);
  const [actionType, setActionType] = useState<"restore" | "delete" | null>(
    null
  );

  const t = {
    fr: {
      title: "Archive des élèves",
      description:
        "Gérez les élèves archivés - restaurez ou supprimez définitivement",
      searchPlaceholder: "Rechercher un élève archivé...",
      backToList: "Retour à la liste",
      noResults: "Aucun élève archivé trouvé",
      student: "Élève",
      category: "Catégorie",
      archivedDate: "Date d'archivage",
      reason: "Motif",
      actions: "Actions",
      restore: "Restaurer",
      deleteForever: "Supprimer définitivement",
      restoreTitle: "Restaurer l'élève",
      restoreDescription:
        "Êtes-vous sûr de vouloir restaurer cet élève ? Il sera réactivé et visible dans la liste principale.",
      deleteTitle: "Supprimer définitivement",
      deleteDescription:
        "⚠️ ATTENTION : Cette action est irréversible ! Toutes les données de l'élève (leçons, paiements, documents) seront définitivement supprimées.",
      cancel: "Annuler",
      confirm: "Confirmer",
      infoTitle: "Fonctionnement de l'archive",
      infoDescription:
        "Les élèves archivés sont conservés pendant 90 jours avant suppression automatique. Vous pouvez les restaurer à tout moment ou les supprimer manuellement.",
      reasons: {
        completed: "Formation terminée",
        abandoned: "Formation abandonnée",
        transferred: "Transféré vers une autre école",
        other: "Autre motif",
      },
    },
  };

  const translations = t[locale];

  // Mock data
  const [archivedStudents, setArchivedStudents] = useState<ArchivedStudent[]>([
    {
      id: "1",
      firstName: "Lucas",
      lastName: "Bernard",
      email: "lucas.bernard@email.com",
      phone: "+41 79 123 45 67",
      category: "B",
      archivedDate: "2024-01-15",
      archivedReason: "completed",
    },
    {
      id: "2",
      firstName: "Emma",
      lastName: "Dubois",
      email: "emma.dubois@email.com",
      phone: "+41 79 234 56 78",
      category: "B",
      archivedDate: "2024-02-20",
      archivedReason: "abandoned",
    },
    {
      id: "3",
      firstName: "Thomas",
      lastName: "Leroy",
      email: "thomas.leroy@email.com",
      phone: "+41 79 345 67 89",
      category: "A1",
      archivedDate: "2024-03-10",
      archivedReason: "transferred",
    },
  ]);

  const filteredStudents = archivedStudents.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(query) ||
      student.lastName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  const handleRestore = (student: ArchivedStudent) => {
    setSelectedStudent(student);
    setActionType("restore");
  };

  const handleDelete = (student: ArchivedStudent) => {
    setSelectedStudent(student);
    setActionType("delete");
  };

  const confirmAction = () => {
    if (!selectedStudent) return;

    if (actionType === "restore") {
      // Restaurer l'élève
      setArchivedStudents(
        archivedStudents.filter((s) => s.id !== selectedStudent.id)
      );
      console.log("Élève restauré:", selectedStudent);
    } else if (actionType === "delete") {
      // Supprimer définitivement
      setArchivedStudents(
        archivedStudents.filter((s) => s.id !== selectedStudent.id)
      );
      console.log("Élève supprimé définitivement:", selectedStudent);
    }

    setSelectedStudent(null);
    setActionType(null);
  };

  const getReasonBadge = (reason: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      completed: "default",
      abandoned: "secondary",
      transferred: "outline",
      other: "outline",
    };

    return (
      <Badge variant={variants[reason] || "outline"}>
        {translations.reasons[reason as keyof typeof translations.reasons] ||
          reason}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/students">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {translations.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {translations.description}
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <InfoIcon className="h-4 w-4" />

          <AlertDescription>
            <strong>{translations.infoTitle}:</strong>{" "}
            {translations.infoDescription}
          </AlertDescription>
        </Alert>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ArchiveRestoreIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

              <p className="text-muted-foreground">{translations.noResults}</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{translations.student}</TableHead>
                      <TableHead>{translations.category}</TableHead>
                      <TableHead>{translations.archivedDate}</TableHead>
                      <TableHead>{translations.reason}</TableHead>
                      <TableHead className="text-right">
                        {translations.actions}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />

                            {new Date(student.archivedDate).toLocaleDateString(
                              locale
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getReasonBadge(student.archivedReason)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRestore(student)}
                            >
                              <ArchiveRestoreIcon className="h-4 w-4 mr-2" />

                              {translations.restore}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(student)}
                            >
                              <Trash2Icon className="h-4 w-4 mr-2" />

                              {translations.deleteForever}
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
        )}

        {/* Confirmation Dialogs */}
        <AlertDialog
          open={actionType !== null}
          onOpenChange={() => setActionType(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {actionType === "restore"
                  ? translations.restoreTitle
                  : translations.deleteTitle}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {actionType === "restore"
                  ? translations.restoreDescription
                  : translations.deleteDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{translations.cancel}</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmAction}
                className={
                  actionType === "delete"
                    ? "bg-destructive hover:bg-destructive/90"
                    : ""
                }
              >
                {translations.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
