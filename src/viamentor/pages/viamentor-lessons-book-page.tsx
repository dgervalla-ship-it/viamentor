/**
 * VIAMENTOR - Lessons Book Page
 * Page wizard réservation leçon (réutilise le composant existant)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, CalendarIcon, CheckCircle2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LessonsLocale } from "@/viamentor/data/viamentor-lessons-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface LessonsBookPageProps {
  locale?: LessonsLocale;
}

// ============================================================================
// WIZARD STEPS
// ============================================================================

type WizardStep = "student" | "instructor" | "datetime" | "summary";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LessonsBookPage({ locale = "fr" }: LessonsBookPageProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("student");
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    studentId: "",
    instructorId: "",
    vehicleId: "",
    category: "",
    date: "",
    time: "",
    duration: "90",
    meetingPoint: "",
    notes: "",
  });

  const steps = [
    { id: "student", label: "Élève", number: 1 },
    { id: "instructor", label: "Moniteur & Véhicule", number: 2 },
    { id: "datetime", label: "Date & Heure", number: 3 },
    { id: "summary", label: "Récapitulatif", number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as WizardStep);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as WizardStep);
    }
  };

  const handleSubmit = () => {
    // Simulate booking
    setShowSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/lessons">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Réserver une leçon</h1>
          <p className="text-muted-foreground">
            Planifiez une nouvelle leçon pratique en 4 étapes
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStepIndex
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2Icon className="h-5 w-5" />
                  ) : (
                    <span className="font-medium">{step.number}</span>
                  )}
                </div>
                <span
                  className={`text-sm mt-2 ${
                    index <= currentStepIndex
                      ? "font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    index < currentStepIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-6">
        {currentStep === "student" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Sélectionner l'élève
              </h2>
              <p className="text-sm text-muted-foreground">
                Choisissez l'élève pour cette leçon
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Élève *</Label>
                <Select
                  value={formData.studentId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, studentId: v })
                  }
                >
                  <SelectTrigger id="student">
                    <SelectValue placeholder="Sélectionner un élève" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student-1">Sophie Martin</SelectItem>
                    <SelectItem value="student-2">Marc Dubois</SelectItem>
                    <SelectItem value="student-3">Emma Rousseau</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData({ ...formData, category: v })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B">Catégorie B (Voiture)</SelectItem>
                    <SelectItem value="A">Catégorie A (Moto)</SelectItem>
                    <SelectItem value="C">Catégorie C (Camion)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStep === "instructor" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Moniteur et véhicule
              </h2>
              <p className="text-sm text-muted-foreground">
                Sélectionnez le moniteur et le véhicule disponibles
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructor">Moniteur *</Label>
                <Select
                  value={formData.instructorId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, instructorId: v })
                  }
                >
                  <SelectTrigger id="instructor">
                    <SelectValue placeholder="Sélectionner un moniteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instructor-1">Jean Dupont</SelectItem>
                    <SelectItem value="instructor-2">Marie Leclerc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Véhicule *</Label>
                <Select
                  value={formData.vehicleId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, vehicleId: v })
                  }
                >
                  <SelectTrigger id="vehicle">
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicle-1">
                      VW Golf 8 (GE 123456)
                    </SelectItem>
                    <SelectItem value="vehicle-2">
                      Audi A3 (GE 789012)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStep === "datetime" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Date et heure</h2>
              <p className="text-sm text-muted-foreground">
                Choisissez la date, l'heure et le point de rendez-vous
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Heure *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(v) =>
                    setFormData({ ...formData, duration: v })
                  }
                >
                  <SelectTrigger id="duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingPoint">Point de rendez-vous *</Label>
                <Select
                  value={formData.meetingPoint}
                  onValueChange={(v) =>
                    setFormData({ ...formData, meetingPoint: v })
                  }
                >
                  <SelectTrigger id="meetingPoint">
                    <SelectValue placeholder="Sélectionner un point de RDV" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp-1">Auto-École (Siège)</SelectItem>
                    <SelectItem value="mp-2">Place de Neuve</SelectItem>
                    <SelectItem value="mp-3">Gare Cornavin</SelectItem>
                    <SelectItem value="mp-4">Domicile élève</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  placeholder="Informations complémentaires..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === "summary" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Récapitulatif</h2>
              <p className="text-sm text-muted-foreground">
                Vérifiez les informations avant de confirmer la réservation
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Élève</span>
                  <span className="font-medium">Sophie Martin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Catégorie
                  </span>
                  <span className="font-medium">B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Moniteur
                  </span>
                  <span className="font-medium">Jean Dupont</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Véhicule
                  </span>
                  <span className="font-medium">VW Golf 8 (GE 123456)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {formData.date || "Non défini"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Heure</span>
                  <span className="font-medium">
                    {formData.time || "Non défini"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Durée</span>
                  <span className="font-medium">
                    {formData.duration} minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prix</span>
                  <span className="font-medium text-lg">120 CHF</span>
                </div>
              </div>

              {formData.notes && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          Précédent
        </Button>

        {currentStep === "summary" ? (
          <Button onClick={handleSubmit}>
            <CheckCircle2Icon className="h-4 w-4 mr-2" />
            Confirmer la réservation
          </Button>
        ) : (
          <Button onClick={handleNext}>Suivant</Button>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
                <CheckCircle2Icon className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <DialogTitle className="text-center">
              Leçon réservée avec succès !
            </DialogTitle>
            <DialogDescription className="text-center">
              La leçon a été créée et les notifications ont été envoyées à
              l'élève et au moniteur.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button asChild>
              <Link to="/lessons">Retour aux leçons</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
