/**
 * VIAMENTOR - Vehicles Table
 * DataTable véhicules avec conformité OAC et actions inline
 */

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  CalendarIcon,
  WrenchIcon,
  FileTextIcon,
  XCircleIcon,
  TrashIcon,
  CarIcon,
  BikeIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ArrowUpDownIcon,
} from "lucide-react";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/viamentor/data/viamentor-vehicles-i18n";
import type { Vehicle } from "@/viamentor/data/viamentor-vehicles-data";
import { cn } from "@/lib/utils";

export interface VehiclesTableProps {
  vehicles: Vehicle[];
  selectedIds: string[];
  locale?: VehiclesLocale;
  onSelectAll?: (selected: boolean) => void;
  onSelectOne?: (id: string, selected: boolean) => void;
  onSort?: (column: string) => void;
  onView?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onPlanning?: (vehicle: Vehicle) => void;
  onMaintenance?: (vehicle: Vehicle) => void;
  onDocuments?: (vehicle: Vehicle) => void;
  onDeactivate?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

export function VehiclesTable({
  vehicles,
  selectedIds,
  locale = "fr",
  onSelectAll,
  onSelectOne,
  onSort,
  onView,
  onEdit,
  onPlanning,
  onMaintenance,
  onDocuments,
  onDeactivate,
  onDelete,
}: VehiclesTableProps) {
  const t = VEHICLES_I18N[locale].table;
  const tStatus = VEHICLES_I18N[locale].status;
  const tCompliance = VEHICLES_I18N[locale].compliance;
  const tCountdown = VEHICLES_I18N[locale].countdown;
  const tMenu = VEHICLES_I18N[locale].menu;

  const allSelected =
    vehicles.length > 0 && selectedIds.length === vehicles.length;

  const getStatusBadge = (status: Vehicle["status"]) => {
    const variants = {
      available: { color: "bg-green-500", label: tStatus.available },
      in_lesson: { color: "bg-blue-500", label: tStatus.in_lesson },
      maintenance: { color: "bg-orange-500", label: tStatus.maintenance },
      out_of_service: { color: "bg-red-500", label: tStatus.out_of_service },
    };
    return variants[status];
  };

  const getComplianceBadge = (status: Vehicle["complianceStatus"]) => {
    const variants = {
      compliant: {
        variant: "default" as const,
        className:
          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        icon: CheckCircleIcon,
        label: tCompliance.compliant,
      },
      warning: {
        variant: "default" as const,
        className:
          "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
        icon: AlertTriangleIcon,
        label: tCompliance.warning,
      },
      non_compliant: {
        variant: "destructive" as const,
        className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        icon: XCircleIcon,
        label: tCompliance.non_compliant,
      },
    };
    return variants[status];
  };

  const getDaysUntil = (dateString: string) => {
    const now = new Date();
    const target = new Date(dateString);
    return Math.floor(
      (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const getCountdownBadge = (days: number) => {
    if (days < 0) {
      return { color: "bg-red-600 text-white", label: tCountdown.expired };
    }
    if (days < 15) {
      return {
        color: "bg-red-500 text-white",
        label: `${tCountdown.in} ${days} ${tCountdown.days}`,
      };
    }
    if (days < 30) {
      return {
        color: "bg-orange-500 text-white",
        label: `${tCountdown.in} ${days} ${tCountdown.days}`,
      };
    }
    return {
      color: "bg-green-500 text-white",
      label: `${tCountdown.in} ${days} ${tCountdown.days}`,
    };
  };

  const getCategoryIcon = (category: Vehicle["category"]) => {
    if (category === "A" || category === "A1") return BikeIcon;
    return CarIcon;
  };

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CarIcon className="h-16 w-16 text-muted-foreground mb-4" />

        <h3 className="text-lg font-semibold mb-2">{t.noData}</h3>
        <p className="text-sm text-muted-foreground">{t.noDataDescription}</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                aria-label={t.selectAll}
              />
            </TableHead>
            <TableHead className="w-24">{t.photo}</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSort?.("licensePlate")}
              >
                {t.licensePlate}
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>{t.brandModel}</TableHead>
            <TableHead>{t.category}</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSort?.("mileage")}
              >
                {t.mileage}
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>{t.nextRevision}</TableHead>
            <TableHead>{t.insurance}</TableHead>
            <TableHead>{t.compliance}</TableHead>
            <TableHead className="w-12">{t.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => {
            const CategoryIcon = getCategoryIcon(vehicle.category);
            const statusBadge = getStatusBadge(vehicle.status);
            const complianceBadge = getComplianceBadge(
              vehicle.complianceStatus
            );
            const ComplianceIcon = complianceBadge.icon;

            const revisionDays = getDaysUntil(vehicle.nextRevision);
            const insuranceDays = getDaysUntil(vehicle.insuranceExpiry);
            const revisionCountdown = getCountdownBadge(revisionDays);
            const insuranceCountdown = getCountdownBadge(insuranceDays);

            return (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(vehicle.id)}
                    onCheckedChange={(checked) =>
                      onSelectOne?.(vehicle.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="relative w-20 h-12 rounded overflow-hidden bg-muted">
                    {vehicle.photo ? (
                      <img
                        src={vehicle.photo}
                        alt={vehicle.licensePlate}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CategoryIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-1 right-1">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          statusBadge.color
                        )}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => onView?.(vehicle)}
                    className="font-bold text-primary hover:underline"
                  >
                    {vehicle.licensePlate}
                  </button>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t.year} {vehicle.year}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <CategoryIcon className="mr-1 h-3 w-3" />

                    {vehicle.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {vehicle.mileage.toLocaleString(locale)} {t.km}
                    </p>
                    {vehicle.mileage > 200000 && (
                      <Alert className="mt-2 py-1 px-2">
                        <AlertTriangleIcon className="h-3 w-3" />

                        <AlertDescription className="text-xs">
                          {tCompliance.checkRecommended}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-xs", revisionCountdown.color)}>
                    {revisionCountdown.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <Badge className={cn("text-xs", insuranceCountdown.color)}>
                      {insuranceCountdown.label}
                    </Badge>
                    {insuranceDays < 0 && (
                      <Alert variant="destructive" className="mt-2 py-1 px-2">
                        <AlertDescription className="text-xs font-bold">
                          {tCompliance.usageForbidden}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className={complianceBadge.className}>
                      <ComplianceIcon className="mr-1 h-3 w-3" />

                      {complianceBadge.label}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(vehicle)}>
                        <EyeIcon className="mr-2 h-4 w-4" />

                        {tMenu.view}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(vehicle)}>
                        <EditIcon className="mr-2 h-4 w-4" />

                        {tMenu.edit}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onPlanning?.(vehicle)}>
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {tMenu.planning}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onMaintenance?.(vehicle)}
                      >
                        <WrenchIcon className="mr-2 h-4 w-4" />

                        {tMenu.maintenance}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDocuments?.(vehicle)}>
                        <FileTextIcon className="mr-2 h-4 w-4" />

                        {tMenu.documents}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => onDeactivate?.(vehicle)}>
                        <XCircleIcon className="mr-2 h-4 w-4" />

                        {tMenu.deactivate}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete?.(vehicle)}
                        className="text-destructive"
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />

                        {tMenu.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
