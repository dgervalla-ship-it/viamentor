/**
 * VIAMENTOR Tenant Students Tab
 *
 * Tab Students readonly avec stats et export
 *
 * @module components/viamentor-tenant-students-tab
 * @version 1.0.0
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  SearchIcon,
  DownloadIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  CalendarIcon,
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { TenantStudent } from "@/viamentor/data/viamentor-tenant-detail-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface StudentsTabProps {
  students: TenantStudent[];
  totalStudents: number;
  inTrainingPercentage: number;
  upcomingExams: number;
  onExport?: () => void;
}

export function TenantStudentsTab({
  students,
  totalStudents,
  inTrainingPercentage,
  upcomingExams,
  onExport,
}: StudentsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [instructorFilter, setInstructorFilter] = useState<string>("all");
  const [progressRange, setProgressRange] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<
    "name" | "email" | "progress" | "instructor"
  >("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  const filteredAndSortedStudents = useMemo(() => {
    // Filter
    let filtered = students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || student.categories.includes(categoryFilter);

      const matchesInstructor =
        instructorFilter === "all" || student.instructor === instructorFilter;

      const matchesProgress =
        progressRange === "all" ||
        (progressRange === "0-25" && student.progress <= 25) ||
        (progressRange === "26-50" &&
          student.progress > 25 &&
          student.progress <= 50) ||
        (progressRange === "51-75" &&
          student.progress > 50 &&
          student.progress <= 75) ||
        (progressRange === "76-100" && student.progress > 75);

      return (
        matchesSearch && matchesCategory && matchesInstructor && matchesProgress
      );
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortColumn) {
        case "name":
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "progress":
          aValue = a.progress;
          bValue = b.progress;
          break;
        case "instructor":
          aValue = a.instructor.toLowerCase();
          bValue = b.instructor.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    students,
    searchQuery,
    categoryFilter,
    instructorFilter,
    progressRange,
    sortColumn,
    sortDirection,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);
  const paginatedStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, instructorFilter, progressRange]);

  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const uniqueInstructors = Array.from(
    new Set(students.map((s) => s.instructor))
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{totalStudents}</p>
              </div>
              <GraduationCapIcon className="h-10 w-10 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En formation</p>
                <p className="text-3xl font-bold">{inTrainingPercentage}%</p>
              </div>
              <TrendingUpIcon className="h-10 w-10 text-green-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Examens prévus</p>
                <p className="text-3xl font-bold">{upcomingExams}</p>
              </div>
              <CalendarIcon className="h-10 w-10 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="B1">B1</SelectItem>
            <SelectItem value="A1">A1</SelectItem>
            <SelectItem value="A">A</SelectItem>
          </SelectContent>
        </Select>

        <Select value={instructorFilter} onValueChange={setInstructorFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All instructors</SelectItem>
            {uniqueInstructors.map((instructor) => (
              <SelectItem key={instructor} value={instructor}>
                {instructor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={progressRange} onValueChange={setProgressRange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Progress" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All progress</SelectItem>
            <SelectItem value="0-25">0-25%</SelectItem>
            <SelectItem value="26-50">26-50%</SelectItem>
            <SelectItem value="51-75">51-75%</SelectItem>
            <SelectItem value="76-100">76-100%</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={onExport}>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Students ({filteredAndSortedStudents.length}/{students.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 font-medium"
                      onClick={() => handleSort("name")}
                    >
                      Student
                      <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 font-medium"
                      onClick={() => handleSort("email")}
                    >
                      Email
                      <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 font-medium"
                      onClick={() => handleSort("progress")}
                    >
                      Progress
                      <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 font-medium"
                      onClick={() => handleSort("instructor")}
                    >
                      Instructor
                      <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Next Lesson</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} />

                          <AvatarFallback>
                            {student.firstName.charAt(0)}
                            {student.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {student.firstName} {student.lastName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {student.categories.map((cat) => (
                          <Badge
                            key={cat}
                            variant="outline"
                            className="text-xs"
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium">
                            {student.progress}%
                          </span>
                        </div>
                        <Progress value={student.progress} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {student.instructor}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.nextLesson
                        ? format(new Date(student.nextLesson), "dd MMM yyyy", {
                            locale: fr,
                          })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="md:hidden space-y-4">
            {paginatedStudents.map((student) => (
              <Card key={student.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar} />

                    <AvatarFallback>
                      {student.firstName.charAt(0)}
                      {student.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <p className="font-semibold text-base">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Categories:
                        </span>
                        <div className="flex gap-1">
                          {student.categories.map((cat) => (
                            <Badge
                              key={cat}
                              variant="outline"
                              className="text-xs"
                            >
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Progress:
                          </span>
                          <span className="font-medium">
                            {student.progress}%
                          </span>
                        </div>
                        <Progress value={student.progress} className="h-1.5" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Instructor:
                        </span>
                        <span className="text-sm font-medium">
                          {student.instructor}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Next lesson:
                        </span>
                        <span className="text-sm">
                          {student.nextLesson
                            ? format(
                                new Date(student.nextLesson),
                                "dd MMM yyyy",
                                { locale: fr }
                              )
                            : "—"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Status:
                        </span>
                        <Badge
                          variant={
                            student.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {student.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedStudents.length
                )}{" "}
                of {filteredAndSortedStudents.length} students
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
        <p>
          <strong>Note:</strong> Cette vue est en lecture seule. La gestion
          complète des étudiants se fait dans l'interface School Admin du
          tenant.
        </p>
      </div>
    </div>
  );
}
