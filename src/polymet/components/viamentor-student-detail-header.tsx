/**
 * VIAMENTOR Student Detail Header
 *
 * Header Hero UI avec avatar, infos, badges et actions
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EditIcon,
  CalendarIcon,
  FileTextIcon,
  Trash2Icon,
  PrinterIcon,
  Share2Icon,
  UploadIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import type {
  StudentDetail,
  StudentStatus,
} from "@/polymet/data/viamentor-student-detail-data";
import type { StudentDetailLocale } from "@/polymet/data/viamentor-student-detail-i18n";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";

export interface StudentDetailHeaderProps {
  student: StudentDetail;
  locale?: StudentDetailLocale;
  onEdit?: () => void;
  onBookLesson?: () => void;
  onCreateInvoice?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onStatusChange?: (newStatus: StudentStatus) => void;
  onAvatarChange?: (file: File) => void;
}

export function StudentDetailHeader({
  student,
  locale = "fr",
  onEdit,
  onBookLesson,
  onCreateInvoice,
  onDelete,
  onPrint,
  onShare,
  onStatusChange,
  onAvatarChange,
}: StudentDetailHeaderProps) {
  const t = useStudentDetailTranslations(locale);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<StudentStatus | null>(
    null
  );
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    setPendingStatus(newStatus as StudentStatus);
    setStatusDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus && onStatusChange) {
      onStatusChange(pendingStatus);
    }
    setStatusDialogOpen(false);
    setPendingStatus(null);
  };

  const handleAvatarClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAvatarChange) {
        onAvatarChange(file);
      }
    };
    input.click();
  };

  const getStatusColor = (status: StudentStatus) => {
    switch (status) {
      case "Actif":
        return "bg-green-600";
      case "Inactif":
        return "bg-gray-600";
      case "Suspendu":
        return "bg-red-600";
      case "Terminé":
        return "bg-blue-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <div className="mb-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/students" className="hover:text-foreground">
                {t.breadcrumbStudents}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">
                {student.firstName} {student.lastName}
              </span>
            </nav>
          </div>

          {/* Header Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-start">
            {/* Avatar */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsHoveringAvatar(true)}
              onMouseLeave={() => setIsHoveringAvatar(false)}
              onClick={handleAvatarClick}
            >
              <Avatar className="h-[120px] w-[120px] border-4 border-border">
                {student.avatar && <AvatarImage src={student.avatar} />}
                <AvatarFallback className="text-3xl">
                  {student.firstName[0]}
                  {student.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isHoveringAvatar && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                  <UploadIcon className="h-8 w-8 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold">
                  {student.firstName} {student.lastName}
                </h1>
                <div className="flex flex-col gap-1 mt-2">
                  <a
                    href={`mailto:${student.email}`}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                  >
                    <MailIcon className="h-4 w-4" />

                    {student.email}
                  </a>
                  <a
                    href={`tel:${student.phone}`}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                  >
                    <PhoneIcon className="h-4 w-4" />

                    {student.phone}
                  </a>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    {student.address}, {student.zip} {student.city},{" "}
                    {student.canton}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Status Badge with Select */}
                <Select
                  value={student.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-auto h-auto p-0 border-0 focus:ring-0">
                    <Badge
                      className={`${getStatusColor(student.status)} text-white cursor-pointer`}
                    >
                      <SelectValue />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">{t.statusActive}</SelectItem>
                    <SelectItem value="Inactif">{t.statusInactive}</SelectItem>
                    <SelectItem value="Suspendu">
                      {t.statusSuspended}
                    </SelectItem>
                    <SelectItem value="Terminé">{t.statusCompleted}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Category Badges */}
                {student.categories.map((cat) => (
                  <Badge key={cat.category} variant="outline">
                    {cat.category}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t.age}</p>
                  <p className="font-medium">{student.age} ans</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.lessonsBalance}</p>
                  <Badge variant="secondary">{student.lessonsBalance}</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.financialBalance}</p>
                  <p
                    className={`font-medium ${
                      student.financialBalance < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    CHF {student.financialBalance}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={onEdit} variant="default">
                <EditIcon className="h-4 w-4 mr-2" />

                {t.editStudent}
              </Button>
              <Button onClick={onBookLesson} variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />

                {t.bookLesson}
              </Button>
              <Button onClick={onCreateInvoice} variant="outline">
                <FileTextIcon className="h-4 w-4 mr-2" />

                {t.createInvoice}
              </Button>
              <Button onClick={onPrint} variant="outline" size="icon">
                <PrinterIcon className="h-4 w-4" />
              </Button>
              <Button onClick={onShare} variant="outline" size="icon">
                <Share2Icon className="h-4 w-4" />
              </Button>
              <Button onClick={onDelete} variant="destructive" size="icon">
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Change Confirmation Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.statusChangeConfirm}</DialogTitle>
            <DialogDescription>
              Changer le statut de {student.firstName} {student.lastName} à{" "}
              <strong>{pendingStatus}</strong> ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button onClick={confirmStatusChange}>{t.confirm}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
