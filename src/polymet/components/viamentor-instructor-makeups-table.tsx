/**
 * VIAMENTOR - Instructor Makeups Table
 * DataTable élèves rattrapages
 */

"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SearchIcon,
  MoreVerticalIcon,
  EyeIcon,
  ClockIcon,
  XCircleIcon,
  AlertTriangleIcon,
} from "lucide-react";
import type { StudentMakeupsStats } from "@/polymet/data/viamentor-instructor-makeups-data";
import type { InstructorMakeupsLocale } from "@/polymet/data/viamentor-instructor-makeups-i18n";
import { instructorMakeupsTranslations } from "@/polymet/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorMakeupsTableProps {
  students: StudentMakeupsStats[];
  locale?: InstructorMakeupsLocale;
  onViewDetail?: (student: StudentMakeupsStats) => void;
  onExtend?: (student: StudentMakeupsStats) => void;
  onCancel?: (student: StudentMakeupsStats) => void;
}

type StatusFilter = "all" | "available" | "expired" | "used";
type SortField = "expiration" | "available" | "used";

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorMakeupsTable({
  students,
  locale = "fr",
  onViewDetail,
  onExtend,
  onCancel,
}: InstructorMakeupsTableProps) {
  const t = instructorMakeupsTranslations[locale].table;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("expiration");

  // Filtrage et tri
  const filteredStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const matchesSearch =
        student.studentName.toLowerCase().includes(search.toLowerCase()) ||
        student.studentEmail.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === "available") return student.available > 0;
      if (statusFilter === "expired") return student.expired > 0;
      if (statusFilter === "used") return student.used > 0;

      return true;
    });

    // Tri
    filtered.sort((a, b) => {
      if (sortField === "expiration") {
        if (!a.expiresIn && !b.expiresIn) return 0;
        if (!a.expiresIn) return 1;
        if (!b.expiresIn) return -1;
        return a.expiresIn.days - b.expiresIn.days;
      }
      if (sortField === "available") {
        return b.available - a.available;
      }
      if (sortField === "used") {
        return b.used - a.used;
      }
      return 0;
    });

    return filtered;
  }, [students, search, statusFilter, sortField]);

  const getExpirationBadge = (expiresIn?: StudentMakeupsStats["expiresIn"]) => {
    if (!expiresIn) return null;

    const { days, urgent } = expiresIn;

    if (urgent || days < 3) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangleIcon className="w-3 h-3" />

          {t.expiresIn.days.replace("{days}", days.toString())}
        </Badge>
      );
    }

    if (days < 7) {
      return (
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 gap-1"
        >
          <ClockIcon className="w-3 h-3" />

          {t.expiresIn.days.replace("{days}", days.toString())}
        </Badge>
      );
    }

    return (
      <Badge
        variant="secondary"
        className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 gap-1"
      >
        <ClockIcon className="w-3 h-3" />

        {t.expiresIn.days.replace("{days}", days.toString())}
      </Badge>
    );
  };

  const getUsageRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-orange-600";
    return "text-red-600";
  };

  if (filteredStudents.length === 0 && students.length === 0) {
    return (
      <div className="text-center py-12 border border-border rounded-lg bg-card">
        <p className="text-lg font-medium text-card-foreground">
          {t.empty.title}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {t.empty.description}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder={t.filters.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as StatusFilter)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t.filters.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.statusOptions.all}</SelectItem>
            <SelectItem value="available">
              {t.filters.statusOptions.available}
            </SelectItem>
            <SelectItem value="expired">
              {t.filters.statusOptions.expired}
            </SelectItem>
            <SelectItem value="used">{t.filters.statusOptions.used}</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortField}
          onValueChange={(value) => setSortField(value as SortField)}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expiration">{t.sort.expirationAsc}</SelectItem>
            <SelectItem value="available">{t.sort.availableDesc}</SelectItem>
            <SelectItem value="used">{t.sort.usedDesc}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.columns.student}</TableHead>
              <TableHead className="text-center">
                {t.columns.available}
              </TableHead>
              <TableHead>{t.columns.expiresIn}</TableHead>
              <TableHead className="text-center">{t.columns.used}</TableHead>
              <TableHead className="text-center">{t.columns.expired}</TableHead>
              <TableHead>{t.columns.usageRate}</TableHead>
              <TableHead className="text-right">{t.columns.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={student.studentAvatar}
                      alt={student.studentName}
                      className="w-8 h-8 rounded-full"
                    />

                    <div>
                      <div className="font-medium text-foreground">
                        {student.studentName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {student.studentEmail}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {student.available > 0 ? (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    >
                      {student.available}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell>{getExpirationBadge(student.expiresIn)}</TableCell>
                <TableCell className="text-center">
                  <span className="text-foreground font-medium">
                    {student.used}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {student.expired > 0 ? (
                    <span className="text-destructive font-medium">
                      {student.expired}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={student.usageRate}
                        className="h-2 flex-1"
                      />

                      <span
                        className={`text-sm font-medium ${getUsageRateColor(
                          student.usageRate
                        )}`}
                      >
                        {student.usageRate.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetail?.(student)}>
                        <EyeIcon className="w-4 h-4 mr-2" />

                        {t.actions.viewDetail}
                      </DropdownMenuItem>
                      {student.available > 0 && (
                        <>
                          <DropdownMenuItem onClick={() => onExtend?.(student)}>
                            <ClockIcon className="w-4 h-4 mr-2" />

                            {t.actions.extend}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onCancel?.(student)}
                            className="text-destructive"
                          >
                            <XCircleIcon className="w-4 h-4 mr-2" />

                            {t.actions.cancel}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredStudents.length === 0 && students.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Aucun résultat pour ces filtres
        </div>
      )}
    </div>
  );
}
