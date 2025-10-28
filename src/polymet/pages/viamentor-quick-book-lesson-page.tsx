/**
 * VIAMENTOR - Quick Book Lesson Page
 * Page Quick Action pour réservation rapide de leçon
 *
 * @module pages/viamentor-quick-book-lesson-page
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CarIcon,
  CheckCircle2Icon,
  XIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface QuickBookLessonPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStudents = [
  { id: "1", name: "Sophie Martin", category: "B" },
  { id: "2", name: "Lucas Dubois", category: "B" },
  { id: "3", name: "Emma Bernard", category: "A1" },
];

const mockInstructors = [
  { id: "1", name: "Jean Dupont", available: true },
  { id: "2", name: "Marie Leclerc", available: true },
  { id: "3", name: "Pierre Moreau", available: false },
];

const mockVehicles = [
  { id: "1", name: "VW Golf - GE 12345", category: "B", available: true },
  { id: "2", name: "BMW 320d - GE 67890", category: "B", available: true },
  { id: "3", name: "Honda CB500 - GE 11111", category: "A1", available: true },
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

// ============================================================================
// COMPONENT
// ============================================================================

export function QuickBookLessonPage({
  locale = "fr",
}: QuickBookLessonPageProps) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulation API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  // Auto-redirect après succès
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        console.warn(
          'Prevented assignment: `window.location.href = "/planning"`'
        ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const isFormValid =
    selectedStudent &&
    selectedInstructor &&
    selectedVehicle &&
    selectedDate &&
    selectedTime &&
    duration;

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Leçon réservée !</h2>
          <p className="text-muted-foreground mb-4">
            La leçon a été ajoutée au planning avec succès.
          </p>
          <Link to="/planning">
            <Button variant="link" className="mt-2">
              Voir le planning
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Réservation Rapide</h1>
          <p className="text-muted-foreground mt-1">
            Créez une nouvelle leçon en quelques clics
          </p>
        </div>
        <Link to="/planning">
          <Button variant="ghost" size="icon">
            <XIcon className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Élève */}
          <div className="space-y-2">
            <Label htmlFor="student" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Élève
            </Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger id="student">
                <SelectValue placeholder="Sélectionner un élève" />
              </SelectTrigger>
              <SelectContent>
                {mockStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    <div className="flex items-center gap-2">
                      <span>{student.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {student.category}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Moniteur */}
          <div className="space-y-2">
            <Label htmlFor="instructor" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Moniteur
            </Label>
            <Select
              value={selectedInstructor}
              onValueChange={setSelectedInstructor}
            >
              <SelectTrigger id="instructor">
                <SelectValue placeholder="Sélectionner un moniteur" />
              </SelectTrigger>
              <SelectContent>
                {mockInstructors.map((instructor) => (
                  <SelectItem
                    key={instructor.id}
                    value={instructor.id}
                    disabled={!instructor.available}
                  >
                    <div className="flex items-center gap-2">
                      <span>{instructor.name}</span>
                      {instructor.available ? (
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 dark:bg-green-900/20"
                        >
                          Disponible
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs bg-red-50 dark:bg-red-900/20"
                        >
                          Indisponible
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Véhicule */}
          <div className="space-y-2">
            <Label htmlFor="vehicle" className="flex items-center gap-2">
              <CarIcon className="w-4 h-4" />
              Véhicule
            </Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger id="vehicle">
                <SelectValue placeholder="Sélectionner un véhicule" />
              </SelectTrigger>
              <SelectContent>
                {mockVehicles.map((vehicle) => (
                  <SelectItem
                    key={vehicle.id}
                    value={vehicle.id}
                    disabled={!vehicle.available}
                  >
                    <div className="flex items-center gap-2">
                      <span>{vehicle.name}</span>
                      {vehicle.available ? (
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 dark:bg-green-900/20"
                        >
                          Disponible
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs bg-red-50 dark:bg-red-900/20"
                        >
                          Indisponible
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Date et Heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  Heure
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Sélectionner l'heure" />
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

              <div className="space-y-2">
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="90">90 min</SelectItem>
                    <SelectItem value="120">120 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Input
              id="notes"
              placeholder="Ajouter des notes pour cette leçon..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Link to="/planning" className="flex-1">
              <Button
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            </Link>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Réservation..." : "Réserver la leçon"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
