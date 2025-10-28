/**
 * VIAMENTOR Student History Tab
 *
 * Audit trail timeline avec filtres actions/users, export CSV
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DownloadIcon,
  SearchIcon,
  FilterIcon,
  ClockIcon,
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  AlertCircleIcon,
} from "lucide-react";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";
import type {
  AuditLog,
  StudentDetailLocale,
} from "@/polymet/data/viamentor-student-detail-data";

interface StudentHistoryTabProps {
  logs: AuditLog[];
  locale?: StudentDetailLocale;
  onExport?: () => void;
}

export function StudentHistoryTab({
  logs,
  locale = "fr",
  onExport,
}: StudentHistoryTabProps) {
  const t = useStudentDetailTranslations(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
      case "updated":
        return <FileTextIcon className="h-4 w-4" />;

      case "lesson_booked":
      case "lesson_completed":
      case "lesson_cancelled":
        return <CalendarIcon className="h-4 w-4" />;

      case "invoice_created":
      case "payment_received":
        return <CreditCardIcon className="h-4 w-4" />;

      case "status_changed":
        return <SettingsIcon className="h-4 w-4" />;

      case "document_uploaded":
        return <FileTextIcon className="h-4 w-4" />;

      default:
        return <AlertCircleIcon className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-green-500 dark:bg-green-600";
      case "updated":
        return "bg-blue-500 dark:bg-blue-600";
      case "lesson_completed":
        return "bg-green-500 dark:bg-green-600";
      case "lesson_cancelled":
        return "bg-red-500 dark:bg-red-600";
      case "payment_received":
        return "bg-green-500 dark:bg-green-600";
      case "status_changed":
        return "bg-orange-500 dark:bg-orange-600";
      default:
        return "bg-muted";
    }
  };

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueUsers = Array.from(
    new Set(logs.map((log) => log.user.name))
  ).sort();

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === "all" || log.action === actionFilter;

    const matchesUser = userFilter === "all" || log.user.name === userFilter;

    return matchesSearch && matchesAction && matchesUser;
  });

  const groupedLogs = filteredLogs.reduce(
    (acc, log) => {
      const date = new Date(log.timestamp).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    },
    {} as Record<string, AuditLog[]>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FilterIcon className="h-5 w-5" />

              {t.filters}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onExport}>
              <DownloadIcon className="h-4 w-4 mr-2" />

              {t.exportCSV}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.searchHistory}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.allActions} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allActions}</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.allUsers} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allUsers}</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-sm text-muted-foreground">{t.totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {logs.filter((l) => l.action.includes("lesson")).length}
            </div>
            <p className="text-sm text-muted-foreground">{t.lessonEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {logs.filter((l) => l.action.includes("invoice")).length}
            </div>
            <p className="text-sm text-muted-foreground">{t.invoiceEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{uniqueUsers.length}</div>
            <p className="text-sm text-muted-foreground">{t.activeUsers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />

            {t.activityTimeline}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {filteredLogs.length} {t.eventsFound}
          </p>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedLogs).length === 0 ? (
            <div className="text-center py-12">
              <AlertCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <p className="text-muted-foreground">{t.noEventsFound}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedLogs).map(([date, dateLogs]) => (
                <div key={date}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-border" />

                    <Badge variant="outline" className="text-sm">
                      {date}
                    </Badge>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="space-y-4 relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                    {dateLogs.map((log, idx) => (
                      <div key={log.id} className="relative">
                        {/* Timeline dot */}
                        <div
                          className={`absolute -left-8 top-2 h-6 w-6 rounded-full ${getActionColor(log.action)} flex items-center justify-center text-white`}
                        >
                          {getActionIcon(log.action)}
                        </div>

                        {/* Event card */}
                        <div className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <Avatar className="h-10 w-10">
                                {log.user.avatar && (
                                  <AvatarImage src={log.user.avatar} />
                                )}
                                <AvatarFallback>
                                  {log.user.name[0]}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">
                                    {log.user.name}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {log.user.role}
                                  </Badge>
                                </div>
                                <p className="text-sm text-foreground mb-2">
                                  {log.description}
                                </p>
                                {log.metadata && (
                                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    {Object.entries(log.metadata).map(
                                      ([key, value]) => (
                                        <span
                                          key={key}
                                          className="bg-background px-2 py-1 rounded"
                                        >
                                          <strong>{key}:</strong> {value}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {new Date(log.timestamp).toLocaleTimeString(
                                  locale,
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                              <Badge
                                variant="secondary"
                                className="text-xs mt-1"
                              >
                                {log.action.replace(/_/g, " ")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
