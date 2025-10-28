/**
 * VIAMENTOR Tenant Logs Tab
 *
 * Tab Logs avec audit trail et filtres puissants
 *
 * @module components/viamentor-tenant-logs-tab
 * @version 1.0.0
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  SearchIcon,
  DownloadIcon,
  RefreshCwIcon,
  CalendarIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpDownIcon,
} from "lucide-react";
import { TenantLog } from "@/viamentor/data/viamentor-tenant-detail-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface LogsTabProps {
  logs: TenantLog[];
  onExport?: () => void;
  onRefresh?: () => void;
}

type SortField = "timestamp" | "user" | "action" | "resource";
type SortOrder = "asc" | "desc";

export function TenantLogsTab({ logs, onExport, onRefresh }: LogsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const itemsPerPage = 10;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
    resetPagination();
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const filteredAndSortedLogs = useMemo(() => {
    // Filter
    const filtered = logs.filter((log) => {
      const matchesSearch =
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.includes(searchQuery);

      const matchesUser = userFilter === "all" || log.userId === userFilter;
      const matchesAction =
        actionFilter === "all" || log.action === actionFilter;
      const matchesResource =
        resourceFilter === "all" || log.resource === resourceFilter;

      const logDate = new Date(log.timestamp);
      const matchesDateFrom = !dateFrom || logDate >= dateFrom;
      const matchesDateTo = !dateTo || logDate <= dateTo;

      return (
        matchesSearch &&
        matchesUser &&
        matchesAction &&
        matchesResource &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "timestamp":
          comparison =
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case "user":
          comparison = a.userName.localeCompare(b.userName);
          break;
        case "action":
          comparison = a.action.localeCompare(b.action);
          break;
        case "resource":
          comparison = a.resource.localeCompare(b.resource);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [
    logs,
    searchQuery,
    userFilter,
    actionFilter,
    resourceFilter,
    dateFrom,
    dateTo,
    sortField,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredAndSortedLogs.length / itemsPerPage);
  const paginatedLogs = filteredAndSortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // Reset to page 1 when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const uniqueUsers = Array.from(new Set(logs.map((l) => l.userId)));
  const uniqueResources = Array.from(new Set(logs.map((l) => l.resource)));

  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return "bg-green-600";
      case "Update":
        return "bg-blue-600";
      case "Delete":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCountryFlag = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              resetPagination();
            }}
            className="pl-9"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <CalendarIcon className="h-4 w-4" />

              {dateFrom || dateTo
                ? `${dateFrom ? format(dateFrom, "dd/MM") : "..."} - ${dateTo ? format(dateTo, "dd/MM") : "..."}`
                : "Date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex gap-2 p-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">From</p>
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">To</p>
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Select
          value={userFilter}
          onValueChange={(value) => {
            setUserFilter(value);
            resetPagination();
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All users</SelectItem>
            {uniqueUsers.map((userId) => {
              const log = logs.find((l) => l.userId === userId);
              return (
                <SelectItem key={userId} value={userId}>
                  {log?.userName}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          value={actionFilter}
          onValueChange={(value) => {
            setActionFilter(value);
            resetPagination();
          }}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            <SelectItem value="Create">Create</SelectItem>
            <SelectItem value="Update">Update</SelectItem>
            <SelectItem value="Delete">Delete</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={resourceFilter}
          onValueChange={(value) => {
            setResourceFilter(value);
            resetPagination();
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Resource" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All resources</SelectItem>
            {uniqueResources.map((resource) => (
              <SelectItem key={resource} value={resource}>
                {resource}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCwIcon
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>

        <Button variant="outline" size="sm" onClick={onExport}>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Audit Trail ({filteredAndSortedLogs.length}/{logs.length})
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
                      onClick={() => handleSort("timestamp")}
                      className="h-8 px-2 hover:bg-muted"
                    >
                      Timestamp
                      {sortField === "timestamp" && (
                        <ArrowUpDownIcon className="ml-2 h-3 w-3" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("user")}
                      className="h-8 px-2 hover:bg-muted"
                    >
                      User
                      {sortField === "user" && (
                        <ArrowUpDownIcon className="ml-2 h-3 w-3" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("action")}
                      className="h-8 px-2 hover:bg-muted"
                    >
                      Action
                      {sortField === "action" && (
                        <ArrowUpDownIcon className="ml-2 h-3 w-3" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("resource")}
                      className="h-8 px-2 hover:bg-muted"
                    >
                      Resource
                      {sortField === "resource" && (
                        <ArrowUpDownIcon className="ml-2 h-3 w-3" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Changes</TableHead>
                  <TableHead>IP / Location</TableHead>
                  <TableHead>Session</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm font-mono">
                        {format(
                          new Date(log.timestamp),
                          "dd/MM/yyyy HH:mm:ss",
                          {
                            locale: fr,
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={log.userAvatar} />

                            <AvatarFallback className="text-xs">
                              {log.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{log.userName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getActionColor(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {log.resource}
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2"
                              >
                                {log.changes.length} change
                                {log.changes.length > 1 ? "s" : ""}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-md">
                              <div className="space-y-2">
                                {log.changes.map((change, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs space-y-1 p-2 bg-muted rounded"
                                  >
                                    <p className="font-medium">
                                      {change.field}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <code className="text-red-600">
                                        {change.oldValue || "(empty)"}
                                      </code>
                                      <ArrowRightIcon className="h-3 w-3" />

                                      <code className="text-green-600">
                                        {change.newValue || "(empty)"}
                                      </code>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-mono">{log.ipAddress}</span>
                          <span className="text-lg">
                            {getCountryFlag(log.country)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground">
                          {log.sessionId}
                        </code>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="md:hidden space-y-4">
            {paginatedLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No logs found
              </div>
            ) : (
              paginatedLogs.map((log) => (
                <Card key={log.id} className="border-2">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.userAvatar} />

                          <AvatarFallback className="text-xs">
                            {log.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{log.userName}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(
                              new Date(log.timestamp),
                              "dd/MM/yyyy HH:mm",
                              {
                                locale: fr,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Resource:</span>
                        <span className="font-medium">{log.resource}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Changes:</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2"
                              >
                                {log.changes.length} change
                                {log.changes.length > 1 ? "s" : ""}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-md">
                              <div className="space-y-2">
                                {log.changes.map((change, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs space-y-1 p-2 bg-muted rounded"
                                  >
                                    <p className="font-medium">
                                      {change.field}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <code className="text-red-600">
                                        {change.oldValue || "(empty)"}
                                      </code>
                                      <ArrowRightIcon className="h-3 w-3" />

                                      <code className="text-green-600">
                                        {change.newValue || "(empty)"}
                                      </code>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">IP:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">
                            {log.ipAddress}
                          </span>
                          <span>{getCountryFlag(log.country)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Session:</span>
                        <code className="text-xs text-muted-foreground">
                          {log.sessionId}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredAndSortedLogs.length > itemsPerPage && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} • Showing{" "}
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedLogs.length
                )}{" "}
                of {filteredAndSortedLogs.length} logs
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
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

      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <p>Auto-refresh every 30 seconds when page is active</p>
      </div>
    </div>
  );
}
