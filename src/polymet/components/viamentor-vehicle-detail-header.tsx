/**
 * VIAMENTOR - Vehicle Detail Header
 * Header Hero UI avec photo 200x200, specs, badges, actions buttons
 */

import { type VehicleDetail } from "@/polymet/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PencilIcon,
  CalendarIcon,
  WrenchIcon,
  PowerIcon,
  TrashIcon,
  DownloadIcon,
  MoreVerticalIcon,
  CarIcon,
  GaugeIcon,
  FuelIcon,
  CalendarCheckIcon,
} from "lucide-react";

interface VehicleDetailHeaderProps {
  vehicle: VehicleDetail;
  locale?: VehicleDetailLocale;
  onEdit?: () => void;
  onPlanning?: () => void;
  onMaintenance?: () => void;
  onDeactivate?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
}

export function VehicleDetailHeader({
  vehicle,
  locale = "fr",
  onEdit,
  onPlanning,
  onMaintenance,
  onDeactivate,
  onDelete,
  onExport,
}: VehicleDetailHeaderProps) {
  const t = getVehicleDetailI18n(locale).header;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "available":
        return "default";
      case "in_lesson":
        return "secondary";
      case "maintenance":
        return "outline";
      case "inactive":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(dateString)
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Vehicle Photo */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-lg overflow-hidden bg-muted">
              <img
                src={vehicle.photo}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex-1 space-y-4">
            {/* Title & Status */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {vehicle.plate}
                  </p>
                </div>
                <Badge
                  variant={getStatusBadgeVariant(vehicle.status)}
                  className="text-sm"
                >
                  {t.status[vehicle.status]}
                </Badge>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Catégorie {vehicle.category}</Badge>
                <Badge variant="outline">{vehicle.year}</Badge>
                <Badge variant="outline">
                  {vehicle.transmission === "manual"
                    ? "Manuelle"
                    : "Automatique"}
                </Badge>
                <Badge variant="outline">{vehicle.color}</Badge>
                {vehicle.gpsEnabled && (
                  <Badge variant="secondary">GPS activé</Badge>
                )}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GaugeIcon className="h-3 w-3" />
                  Kilométrage
                </div>
                <p className="text-lg font-semibold">
                  {vehicle.currentKm.toLocaleString()} km
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <WrenchIcon className="h-3 w-3" />
                  Prochaine révision
                </div>
                <p className="text-lg font-semibold">
                  {vehicle.nextMaintenanceKm.toLocaleString()} km
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FuelIcon className="h-3 w-3" />
                  Carburant
                </div>
                <p className="text-lg font-semibold capitalize">
                  {vehicle.fuelType}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarCheckIcon className="h-3 w-3" />
                  Mise en service
                </div>
                <p className="text-lg font-semibold">
                  {formatDate(vehicle.purchaseDate)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={onEdit}>
                <PencilIcon className="h-4 w-4 mr-2" />

                {t.edit}
              </Button>

              <Button variant="outline" onClick={onPlanning}>
                <CalendarIcon className="h-4 w-4 mr-2" />

                {t.planning}
              </Button>

              <Button variant="outline" onClick={onMaintenance}>
                <WrenchIcon className="h-4 w-4 mr-2" />

                {t.maintenance}
              </Button>

              <Button variant="outline" onClick={onExport}>
                <DownloadIcon className="h-4 w-4 mr-2" />

                {t.export}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onDeactivate}>
                    <PowerIcon className="h-4 w-4 mr-2" />

                    {t.deactivate}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />

                    {t.delete}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
