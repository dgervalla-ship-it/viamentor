/**
 * VIAMENTOR - Price History Drawer
 * Drawer historique changements prix avec audit trail
 */

"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  HistoryIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UserIcon,
  CalendarIcon,
  FileTextIcon,
  DownloadIcon,
} from "lucide-react";
import {
  formatCurrency,
  getPricingTranslation,
  type PricingLocale,
} from "@/viamentor/data/viamentor-pricing-i18n";
import {
  mockPriceHistory,
  type PriceHistoryEntry,
} from "@/viamentor/data/viamentor-pricing-data";

// ============================================================================
// TYPES
// ============================================================================

interface PriceHistoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: PricingLocale;
  entityId?: string;
  entityName?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PriceHistoryDrawer({
  open,
  onOpenChange,
  locale = "fr",
  entityId,
  entityName,
}: PriceHistoryDrawerProps) {
  const t = getPricingTranslation(locale);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter history
  let filteredHistory = mockPriceHistory;

  if (entityId) {
    filteredHistory = filteredHistory.filter((h) => h.entityId === entityId);
  }

  if (filterType !== "all") {
    filteredHistory = filteredHistory.filter(
      (h) => h.entityType === filterType
    );
  }

  if (searchQuery) {
    filteredHistory = filteredHistory.filter(
      (h) =>
        h.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.changedByName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort by date desc
  filteredHistory = [...filteredHistory].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleExport = () => {
    // Mock export to CSV
    const csv = [
      [
        "Date",
        "Type",
        "Nom",
        "Ancien prix",
        "Nouveau prix",
        "Changement %",
        "Modifié par",
        "Raison",
      ],

      ...filteredHistory.map((h) => [
        new Date(h.timestamp).toLocaleString(),
        h.entityType,
        h.entityName,
        h.oldPrice.toString(),
        h.newPrice.toString(),
        h.changePercentage.toFixed(1),
        h.changedByName,
        h.reason,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `price-history-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            Historique des prix
            {entityName && (
              <Badge variant="secondary" className="ml-2">
                {entityName}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="lesson">Leçons</SelectItem>
                <SelectItem value="package">Forfaits</SelectItem>
                <SelectItem value="product">Produits</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleExport}>
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Total changements</p>
              <p className="text-xl font-bold mt-1">{filteredHistory.length}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <p className="text-xs text-muted-foreground">Augmentations</p>
              <p className="text-xl font-bold mt-1 text-green-600">
                {filteredHistory.filter((h) => h.changePercentage > 0).length}
              </p>
            </div>
            <div className="p-3 bg-destructive/10 rounded-lg">
              <p className="text-xs text-muted-foreground">Réductions</p>
              <p className="text-xl font-bold mt-1 text-destructive">
                {filteredHistory.filter((h) => h.changePercentage < 0).length}
              </p>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <HistoryIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />

                <p>Aucun historique trouvé</p>
              </div>
            ) : (
              filteredHistory.map((entry, idx) => (
                <div key={entry.id} className="relative pl-8 pb-4">
                  {/* Timeline line */}
                  {idx < filteredHistory.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
                  )}

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      entry.changePercentage > 0
                        ? "bg-green-500/10 border-green-500"
                        : entry.changePercentage < 0
                          ? "bg-destructive/10 border-destructive"
                          : "bg-muted border-border"
                    }`}
                  >
                    {entry.changePercentage > 0 ? (
                      <TrendingUpIcon className="h-3 w-3 text-green-600" />
                    ) : entry.changePercentage < 0 ? (
                      <TrendingDownIcon className="h-3 w-3 text-destructive" />
                    ) : (
                      <FileTextIcon className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm">
                          {entry.entityName}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {entry.entityType === "lesson"
                            ? "Leçon"
                            : entry.entityType === "package"
                              ? "Forfait"
                              : "Produit"}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          entry.changePercentage > 0 ? "destructive" : "default"
                        }
                        className={
                          entry.changePercentage < 0 ? "bg-green-600" : ""
                        }
                      >
                        {entry.changePercentage > 0 ? "+" : ""}
                        {entry.changePercentage.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground line-through">
                          {formatCurrency(entry.oldPrice, locale)}
                        </span>
                        <span>→</span>
                        <span className="font-semibold">
                          {formatCurrency(entry.newPrice, locale)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded p-2 mb-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Raison du changement:
                      </p>
                      <p className="text-sm">{entry.reason}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3" />

                        <span>{entry.changedByName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />

                        <span>
                          {new Date(entry.timestamp).toLocaleDateString(
                            locale === "fr"
                              ? "fr-CH"
                              : locale === "de"
                                ? "de-CH"
                                : locale === "it"
                                  ? "it-CH"
                                  : "en-CH",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
