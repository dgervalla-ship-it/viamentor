/**
 * VIAMENTOR - Maintenance Tracking Section
 * Suivi maintenance avec historique, charts et alertes
 */

"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircleIcon, CalendarIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  MaintenanceRecord,
  VehiclesAnalyticsLocale,
} from "@/polymet/data/viamentor-vehicles-analytics-data";
import { getVehiclesAnalyticsTranslations } from "@/polymet/data/viamentor-vehicles-analytics-i18n";

interface MaintenanceTrackingSectionProps {
  records: MaintenanceRecord[];
  locale?: VehiclesAnalyticsLocale;
  onSchedule?: (record: MaintenanceRecord) => void;
}

export function MaintenanceTrackingSection({
  records,
  locale = "fr",
  onSchedule,
}: MaintenanceTrackingSectionProps) {
  const t = getVehiclesAnalyticsTranslations(locale);
  const [filterType, setFilterType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRecords =
    filterType === "all"
      ? records
      : records.filter((r) => r.type === filterType);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  // Calculate days until next due
  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  };

  // Alerts for maintenance due < 30 days
  const upcomingMaintenance = records
    .filter((r) => r.nextDue)
    .map((r) => ({
      ...r,
      daysUntil: getDaysUntilDue(r.nextDue!.date),
    }))
    .filter((r) => r.daysUntil <= 30 && r.daysUntil > 0)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  // Costs by type for chart
  const costsByType = records.reduce(
    (acc, r) => {
      const existing = acc.find((item) => item.type === r.type);
      if (existing) {
        existing.cost += r.cost;
      } else {
        acc.push({ type: t.maintenance.types[r.type], cost: r.cost });
      }
      return acc;
    },
    [] as Array<{ type: string; cost: number }>
  );

  const getTypeBadge = (type: MaintenanceRecord["type"]) => {
    const colors = {
      preventive: "bg-blue-500",
      corrective: "bg-orange-500",
      inspection: "bg-green-500",
      tire_change: "bg-purple-500",
      other: "bg-gray-500",
    };
    return <Badge className={colors[type]}>{t.maintenance.types[type]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {upcomingMaintenance.length > 0 && (
        <Card className="border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500">
              <AlertCircleIcon className="h-5 w-5" />

              {t.maintenance.alerts.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingMaintenance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950 rounded-lg"
                >
                  <div>
                    <div className="font-bold">{record.plate}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-orange-500">
                      {t.maintenance.alerts.due.replace(
                        "{{days}}",
                        record.daysUntil.toString()
                      )}
                    </Badge>
                    <Button size="sm" onClick={() => onSchedule?.(record)}>
                      <CalendarIcon className="h-4 w-4 mr-1" />

                      {t.actions.schedule}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* BarChart by Type */}
      <Card>
        <CardHeader>
          <CardTitle>{t.maintenance.chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costsByType}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="type" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="cost" fill="hsl(var(--chart-1))" name="CHF" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.maintenance.title}</CardTitle>
            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="preventive">
                  {t.maintenance.types.preventive}
                </SelectItem>
                <SelectItem value="corrective">
                  {t.maintenance.types.corrective}
                </SelectItem>
                <SelectItem value="inspection">
                  {t.maintenance.types.inspection}
                </SelectItem>
                <SelectItem value="tire_change">
                  {t.maintenance.types.tire_change}
                </SelectItem>
                <SelectItem value="other">
                  {t.maintenance.types.other}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium">
                    {t.maintenance.table.date}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.maintenance.table.plate}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.maintenance.table.type}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.maintenance.table.km}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.maintenance.table.cost}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.maintenance.table.nextDue}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.maintenance.table.description}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-3 text-sm">
                      {new Date(record.date).toLocaleDateString(locale)}
                    </td>
                    <td className="p-3 font-bold">{record.plate}</td>
                    <td className="p-3">{getTypeBadge(record.type)}</td>
                    <td className="p-3 text-right">
                      {record.kmCounter.toLocaleString(locale)}
                    </td>
                    <td className="p-3 text-right font-medium">
                      CHF {record.cost.toLocaleString(locale)}
                    </td>
                    <td className="p-3 text-sm">
                      {record.nextDue ? (
                        <div>
                          <div>
                            {new Date(record.nextDue.date).toLocaleDateString(
                              locale
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {record.nextDue.km.toLocaleString(locale)} km
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {record.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="md:hidden space-y-4">
            {paginatedRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-lg">{record.plate}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString(locale)}
                      </div>
                    </div>
                    {getTypeBadge(record.type)}
                  </div>

                  {/* Description */}
                  <p className="text-sm">{record.description}</p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        {t.maintenance.table.km}
                      </p>
                      <p className="font-semibold">
                        {record.kmCounter.toLocaleString(locale)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t.maintenance.table.cost}
                      </p>
                      <p className="font-semibold">
                        CHF {record.cost.toLocaleString(locale)}
                      </p>
                    </div>
                  </div>

                  {/* Next Due */}
                  {record.nextDue && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t.maintenance.table.nextDue}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {new Date(record.nextDue.date).toLocaleDateString(
                              locale
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {record.nextDue.km.toLocaleString(locale)} km
                          </div>
                        </div>
                        {getDaysUntilDue(record.nextDue.date) <= 30 && (
                          <Button
                            size="sm"
                            onClick={() => onSchedule?.(record)}
                          >
                            <CalendarIcon className="h-4 w-4 mr-1" />

                            {t.actions.schedule}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
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
    </div>
  );
}
