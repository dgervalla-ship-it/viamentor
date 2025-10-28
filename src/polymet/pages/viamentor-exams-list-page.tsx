/**
 * ============================================================================
 * VIAMENTOR - Exams List Page
 * Page liste examens avec filtres, stats et actions
 * ============================================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon as ScheduledIcon,
  BanIcon,
  FileTextIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  PlusIcon,
  RefreshCwIcon,
  LayoutGridIcon,
  LayoutListIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  mockExams,
  mockExamStats,
  type Exam,
} from "@/polymet/data/viamentor-exams-data";
import {
  examsLocales,
  type ExamsLocale,
} from "@/polymet/data/viamentor-exams-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsListPageProps {
  locale?: ExamsLocale;
}

// ============================================================================
// STATS CARDS
// ============================================================================

function StatsCards({ locale }: { locale: ExamsLocale }) {
  const stats = [
    {
      label: locale.stats.total,
      value: mockExamStats.total,
      icon: FileTextIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: locale.stats.scheduled,
      value: mockExamStats.scheduled,
      icon: ScheduledIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      label: locale.stats.passed,
      value: mockExamStats.passed,
      icon: CheckCircle2Icon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: locale.stats.failed,
      value: mockExamStats.failed,
      icon: XCircleIcon,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// FILTERS
// ============================================================================

function Filters({ locale }: { locale: ExamsLocale }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input placeholder={locale.list.search} className="pl-10" />
        </div>
      </div>

      <Select defaultValue="all-types">
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-types">{locale.list.allTypes}</SelectItem>
          <SelectItem value="theory">{locale.types.theory}</SelectItem>
          <SelectItem value="practical">{locale.types.practical}</SelectItem>
          <SelectItem value="first_aid">{locale.types.first_aid}</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all-statuses">
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-statuses">
            {locale.list.allStatuses}
          </SelectItem>
          <SelectItem value="scheduled">{locale.status.scheduled}</SelectItem>
          <SelectItem value="passed">{locale.status.passed}</SelectItem>
          <SelectItem value="failed">{locale.status.failed}</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon">
        <FilterIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ============================================================================
// TABLE VIEW
// ============================================================================

function TableView({ exams, locale }: { exams: Exam[]; locale: ExamsLocale }) {
  const getStatusBadge = (status: Exam["status"]) => {
    const variants: Record<Exam["status"], { variant: any; label: string }> = {
      scheduled: { variant: "default", label: locale.status.scheduled },
      in_progress: { variant: "default", label: locale.status.in_progress },
      completed: { variant: "secondary", label: locale.status.completed },
      passed: { variant: "default", label: locale.status.passed },
      failed: { variant: "destructive", label: locale.status.failed },
      cancelled: { variant: "secondary", label: locale.status.cancelled },
      no_show: { variant: "secondary", label: locale.status.no_show },
    };

    const config = variants[status];
    return (
      <Badge
        variant={config.variant}
        className={
          status === "passed"
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : status === "scheduled"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : ""
        }
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{locale.detail.student}</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>{locale.detail.scheduling}</TableHead>
            <TableHead>{locale.detail.location}</TableHead>
            <TableHead>{locale.detail.result}</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>
                <div>
                  <div className="font-medium text-foreground">
                    {exam.studentName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exam.studentEmail}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline">
                    {locale.types[exam.type as keyof typeof locale.types]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Cat. {exam.category}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-sm">
                    <CalendarIcon className="h-3 w-3 text-muted-foreground" />

                    {exam.scheduledDate.toLocaleDateString("fr-CH")}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ClockIcon className="h-3 w-3" />

                    {exam.scheduledTime}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPinIcon className="h-3 w-3" />

                  <span className="truncate max-w-[150px]">
                    {exam.location}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {exam.result ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {exam.result.score}%
                    </span>
                    <span
                      className={`text-xs ${
                        exam.result.passed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {exam.result.passed
                        ? locale.result.passed
                        : locale.result.failed}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(exam.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/exams/${exam.id}`}>
                      {locale.actions.viewDetails}
                    </Link>
                  </Button>
                  {exam.documents.length > 0 && (
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ============================================================================
// GRID VIEW
// ============================================================================

function GridView({ exams, locale }: { exams: Exam[]; locale: ExamsLocale }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exams.map((exam) => (
        <Card key={exam.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {exam.studentName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exam.studentEmail}
                  </p>
                </div>
                <Badge
                  variant={exam.status === "passed" ? "default" : "secondary"}
                  className={
                    exam.status === "passed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : exam.status === "failed"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : ""
                  }
                >
                  {locale.status[exam.status]}
                </Badge>
              </div>

              {/* Type & Category */}
              <div className="flex gap-2">
                <Badge variant="outline">
                  {locale.types[exam.type as keyof typeof locale.types]}
                </Badge>
                <Badge variant="outline">Cat. {exam.category}</Badge>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                  <span>{exam.scheduledDate.toLocaleDateString("fr-CH")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />

                  <span>{exam.scheduledTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                  <span className="truncate">{exam.location}</span>
                </div>
              </div>

              {/* Result */}
              {exam.result && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {locale.result.score}
                    </span>
                    <span className="text-lg font-bold">
                      {exam.result.score}%
                    </span>
                  </div>
                  <div
                    className={`text-sm font-medium mt-1 ${
                      exam.result.passed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {exam.result.passed
                      ? locale.result.passed
                      : locale.result.failed}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/exams/${exam.id}`}>
                    {locale.actions.viewDetails}
                  </Link>
                </Button>
                {exam.documents.length > 0 && (
                  <Button variant="outline" size="icon">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ExamsListPage({
  locale = examsLocales.fr,
}: ExamsListPageProps) {
  const [view, setView] = useState<"table" | "grid">("table");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {locale.list.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {locale.list.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
            <div className="flex rounded-md border border-border">
              <Button
                variant={view === "table" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setView("table")}
              >
                <LayoutListIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setView("grid")}
              >
                <LayoutGridIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button asChild>
              <Link to="/exams/book">
                <PlusIcon className="h-4 w-4 mr-2" />

                {locale.actions.book}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <StatsCards locale={locale} />

        {/* Filters */}
        <Filters locale={locale} />

        {/* Content */}
        {view === "table" ? (
          <TableView exams={mockExams} locale={locale} />
        ) : (
          <GridView exams={mockExams} locale={locale} />
        )}
      </div>
    </div>
  );
}
