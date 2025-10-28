/**
 * VIAMENTOR - Vehicles Bulk Actions
 * Bulk Actions bar sticky bottom avec actions batch
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  WrenchIcon,
  DownloadIcon,
  RefreshCwIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/viamentor/data/viamentor-vehicles-i18n";

export interface BulkActionsBarProps {
  selectedCount: number;
  locale?: VehiclesLocale;
  onScheduleMaintenance?: () => void;
  onExportSelection?: () => void;
  onChangeStatus?: () => void;
  onDeactivate?: () => void;
  onClearSelection?: () => void;
}

export function VehiclesBulkActions({
  selectedCount,
  locale = "fr",
  onScheduleMaintenance,
  onExportSelection,
  onChangeStatus,
  onDeactivate,
  onClearSelection,
}: BulkActionsBarProps) {
  const t = VEHICLES_I18N[locale].bulk;

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg animate-slide-from-left">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Selection Count */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              {selectedCount}
            </div>
            <p className="font-semibold">
              {selectedCount} {t.selected}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={onScheduleMaintenance}>
              <WrenchIcon className="mr-2 h-4 w-4" />

              {t.scheduleMaintenance}
            </Button>
            <Button variant="outline" size="sm" onClick={onExportSelection}>
              <DownloadIcon className="mr-2 h-4 w-4" />

              {t.exportSelection}
            </Button>
            <Button variant="outline" size="sm" onClick={onChangeStatus}>
              <RefreshCwIcon className="mr-2 h-4 w-4" />

              {t.changeStatus}
            </Button>
            <Button variant="outline" size="sm" onClick={onDeactivate}>
              <XCircleIcon className="mr-2 h-4 w-4" />

              {t.deactivate}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClearSelection}>
              <XIcon className="mr-2 h-4 w-4" />

              {t.clearSelection}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
