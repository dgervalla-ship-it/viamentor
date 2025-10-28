/**
 * VIAMENTOR - Maintenance Task Dialog
 * Dialog création/édition tâche maintenance avec intégration module Vehicles
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CalendarIcon,
  SaveIcon,
  XIcon,
  CarIcon,
  GaugeIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MaintenanceTask } from "@/viamentor/data/viamentor-maintenance-data";
import {
  MOCK_VEHICLES,
  getVehicleById,
  getComplianceIssues,
  type Vehicle,
} from "@/viamentor/data/viamentor-vehicles-data";

// ============================================================================
// TYPES
// ============================================================================

interface MaintenanceTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: MaintenanceTask;
  vehicleId?: string; // Pré-sélection véhicule
  onSave?: (data: Partial<MaintenanceTask>) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MaintenanceTaskDialog({
  open,
  onOpenChange,
  task,
  vehicleId: preselectedVehicleId,
  onSave,
}: MaintenanceTaskDialogProps) {
  // Form state
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    type: task?.type || "preventive",
    category: task?.category || "oil_change",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate || new Date().toISOString().split("T")[0],
    vehicleId: task?.vehicleId || preselectedVehicleId || "",
    estimatedCost: task?.estimatedCost || 0,
    estimatedDuration: task?.estimatedDuration || 60,
    triggerMileage: task?.triggerMileage,
    garage: task?.garage || "",
  });

  // Selected vehicle data
  const selectedVehicle = useMemo(
    () => (formData.vehicleId ? getVehicleById(formData.vehicleId) : null),
    [formData.vehicleId]
  );

  // Compliance issues for selected vehicle
  const vehicleIssues = useMemo(
    () => (selectedVehicle ? getComplianceIssues(selectedVehicle) : []),
    [selectedVehicle]
  );

  // Available vehicles (exclude out of service)
  const availableVehicles = useMemo(
    () => MOCK_VEHICLES.filter((v) => v.status !== "out_of_service"),
    []
  );

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      setFormData({
        title: task?.title || "",
        description: task?.description || "",
        type: task?.type || "preventive",
        category: task?.category || "oil_change",
        priority: task?.priority || "medium",
        dueDate: task?.dueDate || new Date().toISOString().split("T")[0],
        vehicleId: task?.vehicleId || preselectedVehicleId || "",
        estimatedCost: task?.estimatedCost || 0,
        estimatedDuration: task?.estimatedDuration || 60,
        triggerMileage: task?.triggerMileage,
        garage: task?.garage || "",
      });
    }
  }, [open, task, preselectedVehicleId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build complete task data
    const taskData: Partial<MaintenanceTask> = {
      ...formData,
      vehicleName: selectedVehicle?.brand + " " + selectedVehicle?.model,
      vehiclePlate: selectedVehicle?.licensePlate,
      currentMileage: selectedVehicle?.mileage,
      scheduledDate: formData.dueDate,
      status: task?.status || "scheduled",
      triggerType: formData.triggerMileage ? "both" : "time",
    };

    onSave?.(taskData);
    onOpenChange(false);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      in_lesson:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      maintenance:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {task ? "Modifier" : "Créer"} une Tâche de Maintenance
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Selection */}
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <CarIcon className="h-5 w-5 text-muted-foreground" />

              <Label className="text-base font-semibold">Véhicule *</Label>
            </div>

            <Select
              value={formData.vehicleId}
              onValueChange={(v) => setFormData({ ...formData, vehicleId: v })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un véhicule" />
              </SelectTrigger>
              <SelectContent>
                {availableVehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {vehicle.licensePlate}
                      </span>
                      <span className="text-muted-foreground">-</span>
                      <span>
                        {vehicle.brand} {vehicle.model}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn("ml-2", getStatusColor(vehicle.status))}
                      >
                        {vehicle.status === "available" && "Disponible"}
                        {vehicle.status === "in_lesson" && "En cours"}
                        {vehicle.status === "maintenance" && "Maintenance"}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Vehicle Info */}
            {selectedVehicle && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <GaugeIcon className="h-4 w-4 text-muted-foreground" />

                    <span className="text-muted-foreground">
                      Kilométrage actuel:
                    </span>
                    <span className="font-semibold">
                      {selectedVehicle.mileage.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Catégorie:</span>
                    <Badge variant="secondary">
                      {selectedVehicle.category}
                    </Badge>
                  </div>
                </div>

                {/* Compliance Issues */}
                {vehicleIssues.length > 0 && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertTriangleIcon className="h-4 w-4" />

                    <AlertDescription>
                      <div className="font-semibold mb-1">
                        Alertes de conformité:
                      </div>
                      <ul className="list-disc list-inside space-y-1">
                        {vehicleIssues.map((issue, idx) => (
                          <li key={idx} className="text-sm">
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Next Maintenance Info */}
                <div className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-950 rounded text-sm">
                  <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />

                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">
                      Prochaines échéances:
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 space-y-0.5 mt-1">
                      <div>
                        • Révision:{" "}
                        {new Date(
                          selectedVehicle.nextRevision
                        ).toLocaleDateString("fr-CH")}
                      </div>
                      <div>
                        • Assurance:{" "}
                        {new Date(
                          selectedVehicle.insuranceExpiry
                        ).toLocaleDateString("fr-CH")}
                      </div>
                      <div>
                        • Expertise:{" "}
                        {new Date(
                          selectedVehicle.expertiseExpiry
                        ).toLocaleDateString("fr-CH")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Titre *</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(v) =>
                  setFormData({ ...formData, type: v as any })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preventive">Préventif</SelectItem>
                  <SelectItem value="corrective">Correctif</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="repair">Réparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData({ ...formData, category: v as any })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil_change">Vidange</SelectItem>
                  <SelectItem value="tire_rotation">
                    Permutation pneus
                  </SelectItem>
                  <SelectItem value="brake_service">Freins</SelectItem>
                  <SelectItem value="engine">Moteur</SelectItem>
                  <SelectItem value="transmission">Transmission</SelectItem>
                  <SelectItem value="electrical">Électrique</SelectItem>
                  <SelectItem value="bodywork">Carrosserie</SelectItem>
                  <SelectItem value="inspection">Contrôle technique</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priorité *</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) =>
                  setFormData({ ...formData, priority: v as any })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date d'échéance *</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Coût estimé (CHF)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.estimatedCost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedCost: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Durée estimée (minutes)</Label>
              <Input
                type="number"
                min="15"
                step="15"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedDuration: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Kilométrage déclencheur (optionnel)</Label>
              <Input
                type="number"
                min="0"
                step="1000"
                placeholder="Ex: 15000"
                value={formData.triggerMileage || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    triggerMileage: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />

              {selectedVehicle && formData.triggerMileage && (
                <p className="text-xs text-muted-foreground">
                  Kilométrage actuel: {selectedVehicle.mileage.toLocaleString()}{" "}
                  km
                  {formData.triggerMileage > selectedVehicle.mileage && (
                    <span className="text-orange-600 dark:text-orange-400">
                      {" "}
                      (dans{" "}
                      {(
                        formData.triggerMileage - selectedVehicle.mileage
                      ).toLocaleString()}{" "}
                      km)
                    </span>
                  )}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Garage / Prestataire</Label>
              <Input
                value={formData.garage}
                onChange={(e) =>
                  setFormData({ ...formData, garage: e.target.value })
                }
                placeholder="Ex: Garage Central SA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit">
              <SaveIcon className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
