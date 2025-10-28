/**
 * VIAMENTOR - Vehicle History Tab
 * Timeline audit trail avec expand JSON diff, filters, export CSV
 */

import { useState } from "react";
import {
  type AuditLog,
  type ActionType,
} from "@/viamentor/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/viamentor/data/viamentor-vehicle-detail-i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DownloadIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

interface VehicleHistoryTabProps {
  logs: AuditLog[];
  locale?: VehicleDetailLocale;
  onExport?: () => void;
}

export function VehicleHistoryTab({
  logs,
  locale = "fr",
  onExport,
}: VehicleHistoryTabProps) {
  const t = getVehicleDetailI18n(locale).history;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState<ActionType | "all">("all");
  const [filterUser, setFilterUser] = useState<string>("all");
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  // Get unique users for filter
  const uniqueUsers = Array.from(
    new Set(logs.map((log) => log.user.name))
  ).sort();

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = filterAction === "all" || log.action === filterAction;

    const matchesUser = filterUser === "all" || log.user.name === filterUser;

    return matchesSearch && matchesAction && matchesUser;
  });

  const toggleExpand = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterAction("all");
    setFilterUser("all");
  };

  const getActionBadgeVariant = (action: ActionType) => {
    switch (action) {
      case "status_change":
        return "default";
      case "update":
        return "secondary";
      case "maintenance":
        return "outline";
      case "document":
        return "secondary";
      case "cost":
        return "outline";
      case "fuel":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.filters.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={filterAction}
              onValueChange={(value: any) => setFilterAction(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.filters.action} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="status_change">
                  {t.actions.status_change}
                </SelectItem>
                <SelectItem value="update">{t.actions.update}</SelectItem>
                <SelectItem value="maintenance">
                  {t.actions.maintenance}
                </SelectItem>
                <SelectItem value="document">{t.actions.document}</SelectItem>
                <SelectItem value="cost">{t.actions.cost}</SelectItem>
                <SelectItem value="fuel">{t.actions.fuel}</SelectItem>
                <SelectItem value="other">{t.actions.other}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder={t.filters.user} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1"
              >
                <XIcon className="h-4 w-4 mr-2" />

                {t.filters.reset}
              </Button>
              <Button variant="outline" onClick={onExport}>
                <DownloadIcon className="h-4 w-4 mr-2" />

                {t.export}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              {t.noData}
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log, index) => {
            const isExpanded = expandedLogs.has(log.id);
            const hasDetails =
              log.details && Object.keys(log.details).length > 0;

            return (
              <Card key={log.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Timeline line */}
                    <div className="relative flex flex-col items-center">
                      <Avatar className="h-10 w-10 border-2 border-background">
                        <AvatarImage
                          src={log.user.avatar}
                          alt={log.user.name}
                        />

                        <AvatarFallback>
                          {log.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {index < filteredLogs.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {log.user.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {log.user.role}
                            </Badge>
                            <Badge
                              variant={getActionBadgeVariant(log.action)}
                              className="text-xs"
                            >
                              {t.actions[log.action]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {log.user.name} {log.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>

                      {/* Expand JSON details */}
                      {hasDetails && (
                        <Collapsible
                          open={isExpanded}
                          onOpenChange={() => toggleExpand(log.id)}
                        >
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUpIcon className="h-3 w-3 mr-1" />
                                  Masquer détails
                                </>
                              ) : (
                                <>
                                  <ChevronDownIcon className="h-3 w-3 mr-1" />

                                  {t.viewDetails}
                                </>
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="bg-muted rounded-lg p-4">
                              <pre className="text-xs overflow-auto">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
