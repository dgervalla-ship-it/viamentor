/**
 * VIAMENTOR - Performance Ranking Table
 * DataTable classement performance moniteurs
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
  MedalIcon,
  TrophyIcon,
  AwardIcon,
  EyeIcon,
  CalendarIcon,
  DownloadIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  InstructorRanking,
  PerformanceLocale,
} from "@/polymet/data/viamentor-instructors-performance-data";
import { performanceTranslations } from "@/polymet/data/viamentor-instructors-performance-i18n";

interface PerformanceRankingTableProps {
  rankings: InstructorRanking[];
  locale?: PerformanceLocale;
  currentUserId?: string;
  onViewDetail?: (instructor: InstructorRanking) => void;
  onViewPlanning?: (instructor: InstructorRanking) => void;
  onExport?: () => void;
}

type SortColumn =
  | "rank"
  | "lessons"
  | "hours"
  | "rating"
  | "examSuccess"
  | "attendance";
type SortDirection = "asc" | "desc";

export function PerformanceRankingTable({
  rankings,
  locale = "fr",
  currentUserId,
  onViewDetail,
  onViewPlanning,
  onExport,
}: PerformanceRankingTableProps) {
  const t = performanceTranslations[locale].ranking;
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [ratingRange, setRatingRange] = useState<[number]>([0]);
  const [lessonsRange, setLessonsRange] = useState<[number]>([0]);
  const [sortColumn, setSortColumn] = useState<SortColumn>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter rankings
  const filteredRankings = rankings.filter((r) => {
    if (categoryFilter !== "all" && !r.categories.includes(categoryFilter))
      return false;
    if (r.averageRating < ratingRange[0]) return false;
    if (r.lessonsCompleted < lessonsRange[0]) return false;
    return true;
  });

  // Sort rankings
  const sortedRankings = [...filteredRankings].sort((a, b) => {
    let comparison = 0;
    switch (sortColumn) {
      case "rank":
        comparison = a.rank - b.rank;
        break;
      case "lessons":
        comparison = a.lessonsCompleted - b.lessonsCompleted;
        break;
      case "hours":
        comparison = a.totalHours - b.totalHours;
        break;
      case "rating":
        comparison = a.averageRating - b.averageRating;
        break;
      case "examSuccess":
        comparison = a.examSuccessRate - b.examSuccessRate;
        break;
      case "attendance":
        comparison = a.attendanceRate - b.attendanceRate;
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedRankings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRankings = sortedRankings.slice(startIndex, endIndex);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <TrophyIcon className="h-5 w-5 text-amber-500" />;

    if (rank === 2) return <MedalIcon className="h-5 w-5 text-slate-400" />;

    if (rank === 3) return <AwardIcon className="h-5 w-5 text-amber-700" />;

    return <span className="text-muted-foreground">#{rank}</span>;
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 inline ml-1" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.title}</CardTitle>
          <Button onClick={onExport} variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.export}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.filters.category}</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="B">Catégorie B</SelectItem>
                <SelectItem value="A">Catégorie A</SelectItem>
                <SelectItem value="BE">Catégorie BE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t.filters.ratingRange}: {ratingRange[0].toFixed(1)}+
            </label>
            <Slider
              value={ratingRange}
              onValueChange={(v) => setRatingRange(v as [number])}
              min={0}
              max={5}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t.filters.lessonsRange}: {lessonsRange[0]}+
            </label>
            <Slider
              value={lessonsRange}
              onValueChange={(v) => setLessonsRange(v as [number])}
              min={0}
              max={200}
              step={10}
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-20 cursor-pointer"
                  onClick={() => handleSort("rank")}
                >
                  {t.position} <SortIcon column="rank" />
                </TableHead>
                <TableHead>{t.instructor}</TableHead>
                <TableHead>{t.categories}</TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("lessons")}
                >
                  {t.lessons} <SortIcon column="lessons" />
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("hours")}
                >
                  {t.hours} <SortIcon column="hours" />
                </TableHead>
                <TableHead className="text-right">{t.students}</TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("rating")}
                >
                  {t.rating} <SortIcon column="rating" />
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("examSuccess")}
                >
                  {t.examSuccess} <SortIcon column="examSuccess" />
                </TableHead>
                <TableHead
                  className="text-right cursor-pointer"
                  onClick={() => handleSort("attendance")}
                >
                  {t.attendance} <SortIcon column="attendance" />
                </TableHead>
                <TableHead className="text-right">{t.revenue}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRankings.map((instructor) => (
                <TableRow
                  key={instructor.id}
                  className={
                    currentUserId === instructor.id
                      ? "bg-blue-50 dark:bg-blue-950 font-semibold"
                      : ""
                  }
                >
                  <TableCell className="text-center">
                    {getRankIcon(instructor.rank)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.name}
                        />

                        <AvatarFallback>
                          {instructor.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {instructor.categories.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {instructor.lessonsCompleted}
                  </TableCell>
                  <TableCell className="text-right">
                    {instructor.totalHours}h
                  </TableCell>
                  <TableCell className="text-right">
                    {instructor.activeStudents}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span>{instructor.averageRating.toFixed(1)}</span>
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500"
                          style={{
                            width: `${(instructor.averageRating / 5) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {instructor.examSuccessRate}%
                  </TableCell>
                  <TableCell className="text-right">
                    {instructor.attendanceRate}%
                  </TableCell>
                  <TableCell className="text-right">
                    CHF {instructor.revenueGenerated.toLocaleString(locale)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewDetail?.(instructor)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewPlanning?.(instructor)}
                      >
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="md:hidden space-y-4">
          {paginatedRankings.map((instructor) => (
            <CardWrapper
              key={instructor.id}
              className={
                currentUserId === instructor.id
                  ? "bg-blue-50 dark:bg-blue-950"
                  : ""
              }
            >
              <CardContentWrapper className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold">
                      {getRankIcon(instructor.rank)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.name}
                        />

                        <AvatarFallback>
                          {instructor.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{instructor.name}</div>
                        <div className="flex gap-1 mt-1">
                          {instructor.categories.map((cat) => (
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
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t.lessons}</p>
                    <p className="font-semibold">
                      {instructor.lessonsCompleted}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t.hours}</p>
                    <p className="font-semibold">{instructor.totalHours}h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t.students}</p>
                    <p className="font-semibold">{instructor.activeStudents}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t.rating}</p>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">
                        {instructor.averageRating.toFixed(1)}
                      </span>
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500"
                          style={{
                            width: `${(instructor.averageRating / 5) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-lg text-center text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t.examSuccess}
                    </p>
                    <p className="font-semibold">
                      {instructor.examSuccessRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t.attendance}
                    </p>
                    <p className="font-semibold">
                      {instructor.attendanceRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t.revenue}</p>
                    <p className="font-semibold">
                      CHF {(instructor.revenueGenerated / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetail?.(instructor)}
                    className="flex-1"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewPlanning?.(instructor)}
                    className="flex-1"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Planning
                  </Button>
                </div>
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
      </CardContent>
    </Card>
  );
}
