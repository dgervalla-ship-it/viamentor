import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  UserPlusIcon,
  MoreVerticalIcon,
  CalendarIcon,
  UserMinusIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  ClockIcon,
  AwardIcon,
} from "lucide-react";
import type { AssignedStudent } from "@/polymet/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { useInstructorDetailTranslations } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { Link } from "react-router-dom";

interface StudentsTabProps {
  students: AssignedStudent[];
  stats: {
    total: number;
    active: number;
    lessonsLast7Days: number;
    successRate: number;
  };
  locale?: InstructorDetailLocale;
  onAssignStudent?: () => void;
  onViewPlanning?: (student: AssignedStudent) => void;
  onUnassign?: (student: AssignedStudent) => void;
}

export function ViaMenutorInstructorStudentsTab({
  students,
  stats,
  locale = "fr",
  onAssignStudent,
  onViewPlanning,
  onUnassign,
}: StudentsTabProps) {
  const t = useInstructorDetailTranslations(locale);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString(locale);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />

              {t.studentsTotal}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />

              {t.studentsActive}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />

              {t.studentsLessons7d}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lessonsLast7Days}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AwardIcon className="h-4 w-4 text-muted-foreground" />

              {t.studentsSuccessRate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t.studentsTitle}</h3>
        <Button onClick={onAssignStudent}>
          <UserPlusIcon className="h-4 w-4 mr-2" />

          {t.studentsAssign}
        </Button>
      </div>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  {t.studentsColName}
                </TableHead>
                <TableHead>{t.studentsColCategory}</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("progression")}
                >
                  {t.studentsColProgression}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("lessons")}
                >
                  {t.studentsColLessons}
                </TableHead>
                <TableHead>{t.studentsColLastLesson}</TableHead>
                <TableHead>{t.studentsColNextLesson}</TableHead>
                <TableHead>{t.studentsColRating}</TableHead>
                <TableHead className="text-right">
                  {t.studentsColActions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />

                        <AvatarFallback>
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          to={`/students/${student.id}`}
                          className="font-medium hover:underline"
                        >
                          {student.firstName} {student.lastName}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          <Badge
                            variant={
                              student.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{student.progression}%</span>
                      </div>
                      <Progress value={student.progression} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{student.lessonsCount}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(student.lastLesson)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(student.nextLesson)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      <span className="text-sm font-medium">
                        {student.rating}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewPlanning?.(student)}
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />

                          {t.studentsActionPlanning}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => onUnassign?.(student)}
                          className="text-destructive"
                        >
                          <UserMinusIcon className="h-4 w-4 mr-2" />

                          {t.studentsActionUnassign}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {students.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UsersIcon className="h-12 w-12 text-muted-foreground mb-4" />

            <h3 className="text-lg font-semibold mb-2">{t.noData}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aucun élève assigné à ce moniteur
            </p>
            <Button onClick={onAssignStudent}>
              <UserPlusIcon className="h-4 w-4 mr-2" />

              {t.studentsAssign}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
