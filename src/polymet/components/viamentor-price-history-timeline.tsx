/**
 * VIAMENTOR - Price History Timeline
 * Timeline historique changements prix avec filtres, audit trail et export
 */

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  TrendingUpIcon,
  TrendingDownIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  UserIcon,
  FileTextIcon,
  DollarSignIcon,
} from "lucide-react";

import {
  mockPriceHistory,
  type PriceHistoryEntry,
  type PricingLocale,
} from "@/polymet/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  formatPercentage,
} from "@/polymet/data/viamentor-pricing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PriceHistoryTimelineProps {
  locale?: PricingLocale;
  entityType?: "lesson" | "package" | "product" | "all";
  entityId?: string;
  onExport?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PriceHistoryTimeline({
  locale = "fr",
  entityType = "all",
  entityId,
  onExport,
}: PriceHistoryTimelineProps) {
  const t = getPricingTranslation(locale);
  const [history, setHistory] = useState<PriceHistoryEntry[]>(mockPriceHistory);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPeriod, setFilterPeriod] = useState<string>("all");

  // Filter history
  const filteredHistory = history.filter((entry) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !entry.entityName.toLowerCase().includes(query) &&
        !entry.changedByName.toLowerCase().includes(query) &&
        !entry.reason.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Type filter
    if (filterType !== "all" && entry.entityType !== filterType) {
      return false;
    }

    // Entity ID filter
    if (entityId && entry.entityId !== entityId) {
      return false;
    }

    // Period filter
    if (filterPeriod !== "all") {
      const entryDate = new Date(entry.timestamp);
      const now = new Date();
      const daysDiff = Math.floor(
        (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (filterPeriod === "7d" && daysDiff > 7) return false;
      if (filterPeriod === "30d" && daysDiff > 30) return false;
      if (filterPeriod === "90d" && daysDiff > 90) return false;
    }

    return true;
  });

  // Stats
  const stats = {
    totalChanges: filteredHistory.length,
    priceIncreases: filteredHistory.filter((e) => e.changePercentage > 0)
      .length,
    priceDecreases: filteredHistory.filter((e) => e.changePercentage < 0)
      .length,
    avgChange:
      filteredHistory.reduce(
        (sum, e) => sum + Math.abs(e.changePercentage),
        0
      ) / (filteredHistory.length || 1),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.totalChanges || "Changements totaux"}
              </p>
              <p className="text-2xl font-bold">{stats.totalChanges}</p>
            </div>
            <FileTextIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.priceIncreases || "Augmentations"}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {stats.priceIncreases}
              </p>
            </div>
            <TrendingUpIcon className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.priceDecreases || "Réductions"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {stats.priceDecreases}
              </p>
            </div>
            <TrendingDownIcon className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.avgChange || "Variation moyenne"}
              </p>
              <p className="text-2xl font-bold">
                {formatPercentage(stats.avgChange, locale)}
              </p>
            </div>
            <DollarSignIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-xs">{t.search || "Rechercher"}</Label>
            <div className="relative mt-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  t.searchPlaceholder || "Nom, utilisateur, raison..."
                }
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">{t.entityType || "Type"}</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allTypes || "Tous"}</SelectItem>
                <SelectItem value="lesson">{t.lessons || "Leçons"}</SelectItem>
                <SelectItem value="package">
                  {t.packages || "Forfaits"}
                </SelectItem>
                <SelectItem value="product">
                  {t.services || "Services"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">{t.period || "Période"}</Label>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allTime || "Tout"}</SelectItem>
                <SelectItem value="7d">
                  {t.last7Days || "7 derniers jours"}
                </SelectItem>
                <SelectItem value="30d">
                  {t.last30Days || "30 derniers jours"}
                </SelectItem>
                <SelectItem value="90d">
                  {t.last90Days || "90 derniers jours"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={onExport} variant="outline" className="w-full">
              <DownloadIcon className="h-4 w-4 mr-2" />

              {t.export || "Exporter"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Timeline Table */}
      <Card className="p-6">
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.date || "Date"}</TableHead>
                <TableHead>{t.entity || "Élément"}</TableHead>
                <TableHead className="text-right">
                  {t.oldPrice || "Ancien prix"}
                </TableHead>
                <TableHead className="text-right">
                  {t.newPrice || "Nouveau prix"}
                </TableHead>
                <TableHead className="text-center">
                  {t.change || "Variation"}
                </TableHead>
                <TableHead>{t.changedBy || "Modifié par"}</TableHead>
                <TableHead>{t.reason || "Raison"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {t.noHistory || "Aucun historique de prix"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                        <div>
                          <div className="font-medium">
                            {new Date(entry.timestamp).toLocaleDateString(
                              locale
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleTimeString(
                              locale,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium">{entry.entityName}</div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {entry.entityType === "lesson" &&
                            (t.lesson || "Leçon")}
                          {entry.entityType === "package" &&
                            (t.package || "Forfait")}
                          {entry.entityType === "product" &&
                            (t.service || "Service")}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-medium text-muted-foreground">
                      {formatCurrency(entry.oldPrice, locale)}
                    </TableCell>

                    <TableCell className="text-right font-semibold">
                      {formatCurrency(entry.newPrice, locale)}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant={
                          entry.changePercentage > 0 ? "destructive" : "default"
                        }
                        className={
                          entry.changePercentage > 0
                            ? "bg-red-600"
                            : "bg-green-600"
                        }
                      >
                        {entry.changePercentage > 0 ? (
                          <TrendingUpIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDownIcon className="h-3 w-3 mr-1" />
                        )}
                        {formatPercentage(
                          Math.abs(entry.changePercentage),
                          locale
                        )}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />

                        <span className="text-sm">{entry.changedByName}</span>
                      </div>
                    </TableCell>

                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.reason}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
