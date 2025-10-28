/**
 * VIAMENTOR - Participants Management
 * Gestion participants cours théoriques avec inscriptions/désinscriptions
 */

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card as CardWrapper,
  CardContent as CardContentWrapper,
} from "@/components/ui/card";
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  MailIcon,
  UserIcon,
  PhoneIcon,
  MoreVerticalIcon,
  DownloadIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type {
  CourseParticipant,
  AttendanceStatus,
} from "@/viamentor/data/viamentor-theory-courses-data";
import {
  getTheoryCoursesTranslation,
  type TheoryCoursesLocale,
} from "@/viamentor/data/viamentor-theory-courses-i18n";

interface ParticipantsManagementProps {
  participants: CourseParticipant[];
  locale?: TheoryCoursesLocale;
  showAttendance?: boolean;
  onContact?: (participant: CourseParticipant) => void;
  onViewProfile?: (participant: CourseParticipant) => void;
  onUnenroll?: (
    participant: CourseParticipant,
    reason: string,
    notify: boolean,
    createCredit: boolean
  ) => void;
  onAttendanceChange?: (
    participantId: string,
    status: AttendanceStatus
  ) => void;
  onExport?: () => void;
}

export function ParticipantsManagement({
  participants,
  locale = "fr",
  showAttendance = false,
  onContact,
  onViewProfile,
  onUnenroll,
  onAttendanceChange,
  onExport,
}: ParticipantsManagementProps) {
  const t = getTheoryCoursesTranslation(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [attendanceFilter, setAttendanceFilter] = useState<string>("all");
  const [unenrollDialog, setUnenrollDialog] = useState<{
    open: boolean;
    participant: CourseParticipant | null;
  }>({
    open: false,
    participant: null,
  });
  const [unenrollReason, setUnenrollReason] = useState("");
  const [notifyStudent, setNotifyStudent] = useState(true);
  const [createCredit, setCreateCredit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter participants
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || p.student.category === categoryFilter;
    const matchesAttendance =
      attendanceFilter === "all" || p.attendance === attendanceFilter;

    return matchesSearch && matchesCategory && matchesAttendance;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(
    startIndex,
    endIndex
  );

  // Get unique categories
  const categories = Array.from(
    new Set(participants.map((p) => p.student.category))
  );

  // Attendance icon
  const getAttendanceIcon = (status: AttendanceStatus) => {
    if (status === "present")
      return <CheckCircleIcon className="h-4 w-4 text-green-600" />;

    if (status === "absent")
      return <XCircleIcon className="h-4 w-4 text-destructive" />;

    if (status === "excused")
      return <AlertCircleIcon className="h-4 w-4 text-orange-600" />;

    return null;
  };

  // Handle unenroll
  const handleUnenroll = () => {
    if (unenrollDialog.participant && onUnenroll) {
      onUnenroll(
        unenrollDialog.participant,
        unenrollReason,
        notifyStudent,
        createCredit
      );
      setUnenrollDialog({ open: false, participant: null });
      setUnenrollReason("");
      setNotifyStudent(true);
      setCreateCredit(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {t.participants.title} ({filteredParticipants.length}/
            {participants.length})
          </h3>
        </div>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.participants.export}
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder={t.participants.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-xs"
        />

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder={t.participants.filterCategory} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.participants.all}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showAttendance && (
          <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder={t.participants.filterAttendance} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.participants.all}</SelectItem>
              <SelectItem value="present">{t.attendance.present}</SelectItem>
              <SelectItem value="absent">{t.attendance.absent}</SelectItem>
              <SelectItem value="excused">{t.attendance.excused}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Desktop Table */}
      {filteredParticipants.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.participants.noParticipants}
        </div>
      ) : (
        <>
          <div className="hidden md:block border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.participants.name}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t.participants.email}
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {t.participants.phone}
                  </TableHead>
                  <TableHead>{t.participants.category}</TableHead>
                  {showAttendance && (
                    <TableHead>{t.participants.attendanceStatus}</TableHead>
                  )}
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.student.avatar} />

                          <AvatarFallback>
                            {participant.student.firstName[0]}
                            {participant.student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {participant.student.firstName}{" "}
                          {participant.student.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {participant.student.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {participant.student.phone}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {participant.student.category}
                      </Badge>
                    </TableCell>
                    {showAttendance && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getAttendanceIcon(participant.attendance || null)}
                          <span className="text-sm">
                            {participant.attendance
                              ? t.attendance[participant.attendance]
                              : t.attendance.pending}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onContact && (
                            <DropdownMenuItem
                              onClick={() => onContact(participant)}
                            >
                              <MailIcon className="h-4 w-4 mr-2" />

                              {t.participants.contact}
                            </DropdownMenuItem>
                          )}
                          {onViewProfile && (
                            <DropdownMenuItem
                              onClick={() => onViewProfile(participant)}
                            >
                              <UserIcon className="h-4 w-4 mr-2" />

                              {t.participants.viewProfile}
                            </DropdownMenuItem>
                          )}
                          {onUnenroll && (
                            <DropdownMenuItem
                              onClick={() =>
                                setUnenrollDialog({ open: true, participant })
                              }
                              className="text-destructive"
                            >
                              <XCircleIcon className="h-4 w-4 mr-2" />

                              {t.participants.unenroll}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="md:hidden space-y-4">
            {paginatedParticipants.map((participant) => (
              <CardWrapper key={participant.id}>
                <CardContentWrapper className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={participant.student.avatar} />

                        <AvatarFallback>
                          {participant.student.firstName[0]}
                          {participant.student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {participant.student.firstName}{" "}
                          {participant.student.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {participant.student.email}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onContact && (
                          <DropdownMenuItem
                            onClick={() => onContact(participant)}
                          >
                            <MailIcon className="h-4 w-4 mr-2" />

                            {t.participants.contact}
                          </DropdownMenuItem>
                        )}
                        {onViewProfile && (
                          <DropdownMenuItem
                            onClick={() => onViewProfile(participant)}
                          >
                            <UserIcon className="h-4 w-4 mr-2" />

                            {t.participants.viewProfile}
                          </DropdownMenuItem>
                        )}
                        {onUnenroll && (
                          <DropdownMenuItem
                            onClick={() =>
                              setUnenrollDialog({ open: true, participant })
                            }
                            className="text-destructive"
                          >
                            <XCircleIcon className="h-4 w-4 mr-2" />

                            {t.participants.unenroll}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        {t.participants.phone}
                      </p>
                      <p>{participant.student.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t.participants.category}
                      </p>
                      <Badge variant="outline">
                        {participant.student.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Attendance Status */}
                  {showAttendance && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">
                        {t.participants.attendanceStatus}
                      </span>
                      <div className="flex items-center gap-2">
                        {getAttendanceIcon(participant.attendance || null)}
                        <span className="text-sm">
                          {participant.attendance
                            ? t.attendance[participant.attendance]
                            : t.attendance.pending}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContentWrapper>
              </CardWrapper>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Unenroll Dialog */}
      <Dialog
        open={unenrollDialog.open}
        onOpenChange={(open) => setUnenrollDialog({ open, participant: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.unenroll.title}</DialogTitle>
            <DialogDescription>
              {t.unenroll.confirm}{" "}
              {unenrollDialog.participant?.student.firstName}{" "}
              {unenrollDialog.participant?.student.lastName}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t.unenroll.reason}</Label>
              <Textarea
                value={unenrollReason}
                onChange={(e) => setUnenrollReason(e.target.value)}
                placeholder={t.unenroll.reason}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify"
                checked={notifyStudent}
                onCheckedChange={(checked) =>
                  setNotifyStudent(checked as boolean)
                }
              />

              <Label htmlFor="notify">{t.unenroll.notifyStudent}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="credit"
                checked={createCredit}
                onCheckedChange={(checked) =>
                  setCreateCredit(checked as boolean)
                }
              />

              <Label htmlFor="credit">{t.unenroll.createCredit}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setUnenrollDialog({ open: false, participant: null })
              }
            >
              {t.manage.cancel}
            </Button>
            <Button variant="destructive" onClick={handleUnenroll}>
              {t.unenroll.confirmButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
