/**
 * VIAMENTOR Students Table
 * DataTable avec colonnes triables et actions inline
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDownIcon,
  MoreVerticalIcon,
  EyeIcon,
  EditIcon,
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  TrashIcon,
} from "lucide-react";
import {
  Student,
  Instructor,
  getCategoryColor,
  getStatusColor,
  getProgressionColor,
  getRemainingLessonsColor,
  formatPhoneNumber,
  getRelativeDate,
} from "@/viamentor/data/viamentor-students-data";
import {
  StudentsLocale,
  useStudentsTranslations,
  formatCurrency,
  formatDateTime,
} from "@/viamentor/data/viamentor-students-i18n";

interface StudentsTableProps {
  students: Student[];
  instructors: Instructor[];
  selectedIds: string[];
  locale?: StudentsLocale;
  onSelectAll?: (selected: boolean) => void;
  onSelectOne?: (id: string, selected: boolean) => void;
  onSort?: (column: string) => void;
  onInstructorChange?: (studentId: string, instructorId: string) => void;
  onStatusChange?: (studentId: string, status: string) => void;
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onBookLesson?: (student: Student) => void;
  onInvoice?: (student: Student) => void;
  onDocuments?: (student: Student) => void;
  onDelete?: (student: Student) => void;
}

export function StudentsTable({
  students,
  instructors,
  selectedIds,
  locale = "fr",
  onSelectAll,
  onSelectOne,
  onSort,
  onInstructorChange,
  onStatusChange,
  onView,
  onEdit,
  onBookLesson,
  onInvoice,
  onDocuments,
  onDelete,
}: StudentsTableProps) {
  const t = useStudentsTranslations(locale);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = students.slice(startIndex, endIndex);

  const allSelected =
    students.length > 0 && selectedIds.length === students.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    onSort?.(column);
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  aria-label="Select all"
                  className={
                    someSelected ? "data-[state=checked]:bg-primary" : ""
                  }
                />
              </TableHead>
              <TableHead className="w-20">{t.photo}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("name")}
                  className="h-8 px-2"
                >
                  {t.fullName}
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>{t.contact}</TableHead>
              <TableHead>{t.categories}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("progression")}
                  className="h-8 px-2"
                >
                  {t.progression}
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>{t.assignedInstructor}</TableHead>
              <TableHead>{t.nextLesson}</TableHead>
              <TableHead>{t.remainingLessons}</TableHead>
              <TableHead>{t.financialBalance}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="w-12">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(student.id)}
                    onCheckedChange={(checked) =>
                      onSelectOne?.(student.id, checked as boolean)
                    }
                    aria-label={`Select ${student.firstName} ${student.lastName}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      {student.avatar && <AvatarImage src={student.avatar} />}
                      <AvatarFallback>
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        student.status === "Actif"
                          ? "bg-green-600"
                          : student.status === "Suspendu"
                            ? "bg-red-600"
                            : "bg-gray-400"
                      }`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Link
                      to={`/students/${student.id}`}
                      className="font-semibold hover:underline text-foreground"
                    >
                      {student.firstName} {student.lastName}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <a
                      href={`tel:${student.phone}`}
                      className="text-sm hover:underline"
                    >
                      {formatPhoneNumber(student.phone)}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {student.categories.map((cat) => (
                      <Badge
                        key={cat}
                        variant="outline"
                        style={{
                          borderColor: getCategoryColor(cat),
                          color: getCategoryColor(cat),
                        }}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 min-w-[120px]">
                    <div className="flex items-center justify-between text-sm">
                      <span>{student.progression}%</span>
                    </div>
                    <Progress
                      value={student.progression}
                      className="h-2"
                      style={{
                        backgroundColor: "hsl(var(--muted))",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={student.instructorId || "unassigned"}
                    onValueChange={(value) =>
                      onInstructorChange?.(
                        student.id,
                        value === "unassigned" ? "" : value
                      )
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">{t.unassigned}</SelectItem>
                      {instructors.map((instructor) => (
                        <SelectItem key={instructor.id} value={instructor.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              {instructor.avatar && (
                                <AvatarImage src={instructor.avatar} />
                              )}
                              <AvatarFallback className="text-xs">
                                {instructor.firstName[0]}
                                {instructor.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>
                              {instructor.firstName} {instructor.lastName}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {student.nextLesson ? (
                    <div className="space-y-1">
                      <Badge variant="outline">
                        {getRelativeDate(student.nextLesson, locale)}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(student.nextLesson, locale)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getRemainingLessonsColor(student.remainingLessons)}
                  >
                    {student.remainingLessons}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${
                      student.financialBalance < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {formatCurrency(student.financialBalance, locale)}
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    value={student.status}
                    onValueChange={(value) =>
                      onStatusChange?.(student.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">{t.statusActive}</SelectItem>
                      <SelectItem value="Inactif">
                        {t.statusInactive}
                      </SelectItem>
                      <SelectItem value="En pause">{t.statusPaused}</SelectItem>
                      <SelectItem value="Terminé">
                        {t.statusCompleted}
                      </SelectItem>
                      <SelectItem value="Abandonné">
                        {t.statusAbandoned}
                      </SelectItem>
                      <SelectItem value="Suspendu">
                        {t.statusSuspended}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/students/${student.id}`}>
                          <EyeIcon className="mr-2 h-4 w-4" />

                          {t.viewProfile}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(student)}>
                        <EditIcon className="mr-2 h-4 w-4" />

                        {t.edit}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onBookLesson?.(student)}>
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {t.bookLesson}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onInvoice?.(student)}>
                        <FileTextIcon className="mr-2 h-4 w-4" />

                        {t.invoice}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDocuments?.(student)}>
                        <FolderIcon className="mr-2 h-4 w-4" />

                        {t.documents}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDelete?.(student)}
                        className="text-destructive"
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />

                        {t.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="md:hidden space-y-4">
        {paginatedStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-4 space-y-4">
              {/* Header with checkbox, avatar, name */}
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedIds.includes(student.id)}
                  onCheckedChange={(checked) =>
                    onSelectOne?.(student.id, checked as boolean)
                  }
                  className="mt-1"
                />

                <div className="relative">
                  <Avatar className="h-12 w-12">
                    {student.avatar && <AvatarImage src={student.avatar} />}
                    <AvatarFallback>
                      {student.firstName[0]}
                      {student.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      student.status === "Actif"
                        ? "bg-green-600"
                        : student.status === "Suspendu"
                          ? "bg-red-600"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <Link
                    to={`/students/${student.id}`}
                    className="font-semibold hover:underline text-left text-foreground block"
                  >
                    {student.firstName} {student.lastName}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                  <a
                    href={`tel:${student.phone}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {formatPhoneNumber(student.phone)}
                  </a>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/students/${student.id}`}>
                        <EyeIcon className="mr-2 h-4 w-4" />

                        {t.viewProfile}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(student)}>
                      <EditIcon className="mr-2 h-4 w-4" />

                      {t.edit}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onBookLesson?.(student)}>
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {t.bookLesson}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onInvoice?.(student)}>
                      <FileTextIcon className="mr-2 h-4 w-4" />

                      {t.invoice}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDocuments?.(student)}>
                      <FolderIcon className="mr-2 h-4 w-4" />

                      {t.documents}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => onDelete?.(student)}
                      className="text-destructive"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />

                      {t.delete}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1">
                {student.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    style={{
                      borderColor: getCategoryColor(cat),
                      color: getCategoryColor(cat),
                    }}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Progression */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.progression}</span>
                  <span className="font-medium">{student.progression}%</span>
                </div>
                <Progress
                  value={student.progression}
                  className="h-2"
                  style={{
                    backgroundColor: "hsl(var(--muted))",
                  }}
                />
              </div>

              {/* Instructor */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t.assignedInstructor}
                </label>
                <Select
                  value={student.instructorId || "unassigned"}
                  onValueChange={(value) =>
                    onInstructorChange?.(
                      student.id,
                      value === "unassigned" ? "" : value
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">{t.unassigned}</SelectItem>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.firstName} {instructor.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">{t.nextLesson}</p>
                  {student.nextLesson ? (
                    <Badge variant="outline">
                      {getRelativeDate(student.nextLesson, locale)}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground">{t.remainingLessons}</p>
                  <Badge
                    variant={getRemainingLessonsColor(student.remainingLessons)}
                  >
                    {student.remainingLessons}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.financialBalance}</p>
                  <span
                    className={`font-semibold ${
                      student.financialBalance < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {formatCurrency(student.financialBalance, locale)}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.status}</p>
                  <Select
                    value={student.status}
                    onValueChange={(value) =>
                      onStatusChange?.(student.id, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">{t.statusActive}</SelectItem>
                      <SelectItem value="Inactif">
                        {t.statusInactive}
                      </SelectItem>
                      <SelectItem value="En pause">{t.statusPaused}</SelectItem>
                      <SelectItem value="Terminé">
                        {t.statusCompleted}
                      </SelectItem>
                      <SelectItem value="Abandonné">
                        {t.statusAbandoned}
                      </SelectItem>
                      <SelectItem value="Suspendu">
                        {t.statusSuspended}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
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
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
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
    </div>
  );
}
