/**
 * VIAMENTOR - Invoices List Advanced Filters
 * Filtres avancés collapse panel avec presets sauvegardés
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Badge } from "@/components/ui/badge";
import {
  FilterIcon,
  XIcon,
  SaveIcon,
  ChevronDownIcon,
  CalendarIcon,
  DollarSignIcon,
} from "lucide-react";
import type { InvoiceStatus } from "@/viamentor/data/viamentor-invoices-data";
import type { FilterPreset } from "@/viamentor/data/viamentor-invoices-list-data";
import type { InvoiceLocale } from "@/viamentor/data/viamentor-invoices-i18n";
import { INVOICE_TRANSLATIONS } from "@/viamentor/data/viamentor-invoices-i18n";

export interface FiltersState {
  status: InvoiceStatus[];
  dateRangeStart?: string;
  dateRangeEnd?: string;
  minAmount?: number;
  maxAmount?: number;
  overdueOnly: boolean;
  partialPayments: boolean;
  withNotes: boolean;
  period?: "today" | "week" | "month" | "quarter" | "year" | "custom";
}

export interface InvoicesListFiltersProps {
  locale?: InvoiceLocale;
  presets?: FilterPreset[];
  onApply?: (filters: FiltersState) => void;
  onReset?: () => void;
  onSavePreset?: (name: string, filters: FiltersState) => void;
}

export function InvoicesListFilters({
  locale = "fr",
  presets = [],
  onApply,
  onReset,
  onSavePreset,
}: InvoicesListFiltersProps) {
  const t = INVOICE_TRANSLATIONS[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    status: [],
    overdueOnly: false,
    partialPayments: false,
    withNotes: false,
  });

  const statusOptions: InvoiceStatus[] = [
    "Draft",
    "Sent",
    "Paid",
    "Overdue",
    "Void",
  ];

  const handleStatusToggle = (status: InvoiceStatus) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const handleApply = () => {
    onApply?.(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters({
      status: [],
      overdueOnly: false,
      partialPayments: false,
      withNotes: false,
    });
    onReset?.();
  };

  const activeFiltersCount =
    filters.status.length +
    (filters.dateRangeStart ? 1 : 0) +
    (filters.minAmount ? 1 : 0) +
    (filters.overdueOnly ? 1 : 0) +
    (filters.partialPayments ? 1 : 0) +
    (filters.withNotes ? 1 : 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />

          {t.filters}
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4">
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          {/* Status Filters */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              {t.filterByStatus}
            </Label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={
                    filters.status.includes(status) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleStatusToggle(status)}
                  className="gap-2"
                >
                  {status === "Draft" && t.statusDraft}
                  {status === "Sent" && t.statusSent}
                  {status === "Paid" && t.statusPaid}
                  {status === "Overdue" && t.statusOverdue}
                  {status === "Void" && t.statusVoid}
                </Button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="dateStart"
                className="text-sm font-medium text-foreground"
              >
                <CalendarIcon className="h-4 w-4 inline mr-2" />
                Date début
              </Label>
              <Input
                id="dateStart"
                type="date"
                value={filters.dateRangeStart || ""}
                onChange={(e) =>
                  setFilters({ ...filters, dateRangeStart: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="dateEnd"
                className="text-sm font-medium text-foreground"
              >
                <CalendarIcon className="h-4 w-4 inline mr-2" />
                Date fin
              </Label>
              <Input
                id="dateEnd"
                type="date"
                value={filters.dateRangeEnd || ""}
                onChange={(e) =>
                  setFilters({ ...filters, dateRangeEnd: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="minAmount"
                className="text-sm font-medium text-foreground"
              >
                <DollarSignIcon className="h-4 w-4 inline mr-2" />
                Montant min (CHF)
              </Label>
              <Input
                id="minAmount"
                type="number"
                min="0"
                step="0.01"
                value={filters.minAmount || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minAmount: parseFloat(e.target.value) || undefined,
                  })
                }
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="maxAmount"
                className="text-sm font-medium text-foreground"
              >
                <DollarSignIcon className="h-4 w-4 inline mr-2" />
                Montant max (CHF)
              </Label>
              <Input
                id="maxAmount"
                type="number"
                min="0"
                step="0.01"
                value={filters.maxAmount || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxAmount: parseFloat(e.target.value) || undefined,
                  })
                }
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="overdueOnly"
                checked={filters.overdueOnly}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, overdueOnly: checked as boolean })
                }
              />

              <Label
                htmlFor="overdueOnly"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Échues seulement
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="partialPayments"
                checked={filters.partialPayments}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    partialPayments: checked as boolean,
                  })
                }
              />

              <Label
                htmlFor="partialPayments"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Partiellement payées
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="withNotes"
                checked={filters.withNotes}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, withNotes: checked as boolean })
                }
              />

              <Label
                htmlFor="withNotes"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Avec notes
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <XIcon className="h-4 w-4" />

              {t.resetFilters}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onSavePreset?.("Nouveau filtre", filters)}
                className="gap-2"
              >
                <SaveIcon className="h-4 w-4" />

                {t.saveFilter}
              </Button>
              <Button onClick={handleApply}>Appliquer</Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
