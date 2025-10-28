/**
 * VIAMENTOR - Garages Integration Panel
 * Panel intégration garages avec réservation automatique
 */

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  CalendarIcon,
} from "lucide-react";
import {
  mockGarages,
  getAvailableGarages,
  calculateEstimatedCost,
  type Garage,
  type MaintenanceCategory,
} from "@/viamentor/data/viamentor-garages-api-integration";

// ============================================================================
// TYPES
// ============================================================================

interface GaragesIntegrationPanelProps {
  vehicleId?: string;
  vehiclePlate?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  maintenanceType?: MaintenanceCategory;
  onBookingComplete?: (bookingId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function GaragesIntegrationPanel({
  vehicleId,
  vehiclePlate,
  vehicleBrand,
  vehicleModel,
  maintenanceType = "oil_change",
  onBookingComplete,
}: GaragesIntegrationPanelProps) {
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const availableGarages = getAvailableGarages(maintenanceType);
  const partnerGarages = availableGarages.filter((g) => g.isPartner);

  const handleSelectGarage = (garage: Garage) => {
    setSelectedGarage(garage);
    setIsBookingDialogOpen(true);
  };

  const handleBooking = async () => {
    if (!selectedGarage || !selectedDate || !selectedTime) return;

    setIsLoading(true);

    // Simuler l'appel API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setBookingSuccess(true);

    setTimeout(() => {
      setIsBookingDialogOpen(false);
      setBookingSuccess(false);
      if (onBookingComplete) {
        onBookingComplete(`BK-${Date.now()}`);
      }
    }, 2000);
  };

  // Générer les créneaux horaires disponibles
  const timeSlots = selectedGarage
    ? Array.from({ length: 10 }, (_, i) => {
        const hour = 8 + i;
        return `${hour.toString().padStart(2, "0")}:00`;
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Garages Partenaires</h3>
        <p className="text-sm text-muted-foreground">
          {partnerGarages.length} garages disponibles pour {maintenanceType}
        </p>
      </div>

      {/* Garages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partnerGarages.map((garage) => {
          const cost = calculateEstimatedCost(garage, 60);

          return (
            <Card
              key={garage.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleSelectGarage(garage)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{garage.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <MapPinIcon className="h-3 w-3" />

                      {garage.city}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <PhoneIcon className="h-3 w-3" />

                      {garage.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      <span className="font-medium">{garage.rating}</span>
                    </div>
                    {garage.discount && (
                      <Badge variant="secondary" className="text-xs">
                        -{garage.discount}%
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {garage.specialties.slice(0, 3).map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="outline"
                      className="text-xs"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ClockIcon className="h-4 w-4" />~{garage.estimatedWaitTime}{" "}
                    min
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">CHF {cost.finalPrice}/h</div>
                    {garage.discount && (
                      <div className="text-xs text-muted-foreground line-through">
                        CHF {cost.basePrice}
                      </div>
                    )}
                  </div>
                </div>

                {garage.apiEnabled && (
                  <Badge
                    variant="default"
                    className="w-full mt-3 justify-center"
                  >
                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                    Réservation en ligne
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Réserver chez {selectedGarage?.name}</DialogTitle>
          </DialogHeader>

          {bookingSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold mb-1">
                  Réservation confirmée !
                </div>
                <div className="text-sm text-muted-foreground">
                  Un email de confirmation a été envoyé
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Garage Info */}
              {selectedGarage && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium mb-1">
                        {selectedGarage.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedGarage.address}, {selectedGarage.city}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedGarage.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      <span className="font-medium">
                        {selectedGarage.rating}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Info */}
              <div>
                <Label className="mb-2 block">Véhicule</Label>
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  {vehicleBrand} {vehicleModel} ({vehiclePlate})
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <Label className="mb-2 block">Date souhaitée</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border border-border"
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <Label className="mb-2 block">Heure souhaitée</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un créneau" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Notes */}
              <div>
                <Label className="mb-2 block">Notes (optionnel)</Label>
                <Textarea
                  placeholder="Informations complémentaires..."
                  rows={3}
                />
              </div>

              {/* Cost Estimate */}
              {selectedGarage && (
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Coût estimé (1h)
                    </span>
                    <span className="text-lg font-bold">
                      CHF{" "}
                      {calculateEstimatedCost(selectedGarage, 60).finalPrice}
                    </span>
                  </div>
                  {selectedGarage.discount && (
                    <div className="text-xs text-muted-foreground">
                      Remise partenaire -{selectedGarage.discount}% appliquée
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsBookingDialogOpen(false)}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Réservation...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Confirmer la réservation
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
