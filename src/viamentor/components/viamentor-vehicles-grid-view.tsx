/**
 * VIAMENTOR - Vehicles Grid View
 * Grid View cards alternative avec hover effects
 */

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  EditIcon,
  CalendarIcon,
  CarIcon,
  BikeIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/viamentor/data/viamentor-vehicles-i18n";
import type { Vehicle } from "@/viamentor/data/viamentor-vehicles-data";
import { cn } from "@/lib/utils";

export interface VehiclesGridViewProps {
  vehicles: Vehicle[];
  locale?: VehiclesLocale;
  onView?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onPlanning?: (vehicle: Vehicle) => void;
}

export function VehiclesGridView({
  vehicles,
  locale = "fr",
  onView,
  onEdit,
  onPlanning,
}: VehiclesGridViewProps) {
  const t = VEHICLES_I18N[locale].table;
  const tStatus = VEHICLES_I18N[locale].status;
  const tCompliance = VEHICLES_I18N[locale].compliance;
  const tCountdown = VEHICLES_I18N[locale].countdown;

  const getStatusBadge = (status: Vehicle["status"]) => {
    const variants = {
      available: { color: "bg-green-500 text-white", label: tStatus.available },
      in_lesson: { color: "bg-blue-500 text-white", label: tStatus.in_lesson },
      maintenance: {
        color: "bg-orange-500 text-white",
        label: tStatus.maintenance,
      },
      out_of_service: {
        color: "bg-red-500 text-white",
        label: tStatus.out_of_service,
      },
    };
    return variants[status];
  };

  const getComplianceBadge = (status: Vehicle["complianceStatus"]) => {
    const variants = {
      compliant: {
        className:
          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        icon: CheckCircleIcon,
        label: tCompliance.compliant,
      },
      warning: {
        className:
          "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
        icon: AlertTriangleIcon,
        label: tCompliance.warning,
      },
      non_compliant: {
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
        label: `${tCountdown.in} ${days}j`,
      };
    }
    if (days < 30) {
      return {
        color: "bg-orange-500 text-white",
        label: `${tCountdown.in} ${days}j`,
      };
    }
    return {
      color: "bg-green-500 text-white",
      label: `${tCountdown.in} ${days}j`,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => {
        const CategoryIcon = getCategoryIcon(vehicle.category);
        const statusBadge = getStatusBadge(vehicle.status);
        const complianceBadge = getComplianceBadge(vehicle.complianceStatus);
        const ComplianceIcon = complianceBadge.icon;

        const revisionDays = getDaysUntil(vehicle.nextRevision);
        const revisionCountdown = getCountdownBadge(revisionDays);

        return (
          <Card
            key={vehicle.id}
            className="group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
            onClick={() => onView?.(vehicle)}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
              {vehicle.photo ? (
                <img
                  src={vehicle.photo}
                  alt={vehicle.licensePlate}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CategoryIcon className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              {/* Status Badge Overlay */}
              <div className="absolute top-3 right-3">
                <Badge className={cn("animate-pulse", statusBadge.color)}>
                  {statusBadge.label}
                </Badge>
              </div>
            </div>

            {/* Header */}
            <CardHeader className="pb-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{vehicle.licensePlate}</h3>
                <p className="text-sm text-muted-foreground">
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </p>
              </div>
            </CardHeader>

            {/* Body */}
            <CardContent className="space-y-3">
              {/* Badges Row */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  <CategoryIcon className="mr-1 h-3 w-3" />

                  {vehicle.category}
                </Badge>
                <Badge variant="secondary">
                  {vehicle.mileage.toLocaleString(locale)} {t.km}
                </Badge>
                <Badge className={revisionCountdown.color}>
                  {revisionCountdown.label}
                </Badge>
              </div>

              {/* Compliance */}
              <div className="flex items-center gap-2">
                <Badge className={complianceBadge.className}>
                  <ComplianceIcon className="mr-1 h-3 w-3" />

                  {complianceBadge.label}
                </Badge>
              </div>

              {/* Warnings */}
              {vehicle.complianceIssues &&
                vehicle.complianceIssues.length > 0 && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    {vehicle.complianceIssues.slice(0, 2).map((issue, idx) => (
                      <p key={idx} className="flex items-start gap-1">
                        <AlertTriangleIcon className="h-3 w-3 mt-0.5 flex-shrink-0 text-orange-500" />

                        {issue}
                      </p>
                    ))}
                  </div>
                )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="pt-3 border-t border-border">
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView?.(vehicle);
                  }}
                >
                  <EyeIcon className="mr-1 h-4 w-4" />
                  Voir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(vehicle);
                  }}
                >
                  <EditIcon className="mr-1 h-4 w-4" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlanning?.(vehicle);
                  }}
                >
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  Planning
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
