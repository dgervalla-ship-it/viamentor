/**
 * ============================================================================
 * VIAMENTOR - Exams Book Page
 * Wizard réservation examen en 4 étapes
 * ============================================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  FileTextIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { examCenters } from "@/viamentor/data/viamentor-exams-data";
import {
  examsLocales,
  type ExamsLocale,
} from "@/viamentor/data/viamentor-exams-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsBookPageProps {
  locale?: ExamsLocale;
}

interface BookingData {
  // Step 1
  studentId: string;
  studentName: string;
  type: string;
  category: string;

  // Step 2
  date: string;
  time: string;
  centerId: string;
  centerName: string;

  // Step 3
  instructorId?: string;
  instructorName?: string;
  vehicleId?: string;
  vehiclePlate?: string;
  notes?: string;

  // Financier
  fee: number;
}

// ============================================================================
// STEPS INDICATOR
// ============================================================================

function StepsIndicator({
  currentStep,
  locale,
}: {
  currentStep: number;
  locale: ExamsLocale;
}) {
  const steps = [
    { number: 1, label: locale.booking.step1, icon: UserIcon },
    { number: 2, label: locale.booking.step2, icon: CalendarIcon },
    { number: 3, label: locale.booking.step3, icon: MapPinIcon },
    { number: 4, label: locale.booking.step4, icon: FileTextIcon },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {currentStep > step.number ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            <div className="text-xs mt-2 text-center font-medium">
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.number ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// STEP 1: STUDENT & TYPE
// ============================================================================

function Step1({
  data,
  onChange,
  locale,
}: {
  data: BookingData;
  onChange: (data: Partial<BookingData>) => void;
  locale: ExamsLocale;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale.booking.step1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student">{locale.booking.selectStudent}</Label>
          <Select
            value={data.studentId}
            onValueChange={(value) => {
              const studentName =
                value === "student-001"
                  ? "Sophie Martin"
                  : value === "student-002"
                    ? "Marc Dubois"
                    : "Julie Rousseau";
              onChange({ studentId: value, studentName });
            }}
          >
            <SelectTrigger id="student">
              <SelectValue placeholder="Sélectionner un élève" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student-001">Sophie Martin</SelectItem>
              <SelectItem value="student-002">Marc Dubois</SelectItem>
              <SelectItem value="student-003">Julie Rousseau</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">{locale.booking.selectType}</Label>
          <Select
            value={data.type}
            onValueChange={(value) => {
              const fee =
                value === "theory" ? 150 : value === "practical" ? 250 : 150;
              onChange({ type: value, fee });
            }}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="theory">{locale.types.theory}</SelectItem>
              <SelectItem value="practical">
                {locale.types.practical}
              </SelectItem>
              <SelectItem value="first_aid">
                {locale.types.first_aid}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">{locale.booking.selectCategory}</Label>
          <Select
            value={data.category}
            onValueChange={(value) => onChange({ category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Sélectionner la catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Catégorie A</SelectItem>
              <SelectItem value="A1">Catégorie A1</SelectItem>
              <SelectItem value="B">Catégorie B</SelectItem>
              <SelectItem value="C">Catégorie C</SelectItem>
              <SelectItem value="D">Catégorie D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// STEP 2: DATE & LOCATION
// ============================================================================

function Step2({
  data,
  onChange,
  locale,
}: {
  data: BookingData;
  onChange: (data: Partial<BookingData>) => void;
  locale: ExamsLocale;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale.booking.step2}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">{locale.booking.selectDate}</Label>
          <Input
            id="date"
            type="date"
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">{locale.booking.selectTime}</Label>
          <Input
            id="time"
            type="time"
            value={data.time}
            onChange={(e) => onChange({ time: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="center">{locale.booking.selectCenter}</Label>
          <Select
            value={data.centerId}
            onValueChange={(value) => {
              const center = examCenters.find((c) => c.id === value);
              onChange({
                centerId: value,
                centerName: center?.name || "",
              });
            }}
          >
            <SelectTrigger id="center">
              <SelectValue placeholder="Sélectionner le centre" />
            </SelectTrigger>
            <SelectContent>
              {examCenters.map((center) => (
                <SelectItem key={center.id} value={center.id}>
                  {center.name} - {center.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// STEP 3: DETAILS
// ============================================================================

function Step3({
  data,
  onChange,
  locale,
}: {
  data: BookingData;
  onChange: (data: Partial<BookingData>) => void;
  locale: ExamsLocale;
}) {
  const isPractical = data.type === "practical";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale.booking.step3}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPractical && (
          <>
            <div className="space-y-2">
              <Label htmlFor="instructor">
                {locale.booking.selectInstructor}
              </Label>
              <Select
                value={data.instructorId}
                onValueChange={(value) => {
                  const instructorName =
                    value === "instructor-001"
                      ? "Jean Dupont"
                      : "Claire Moreau";
                  onChange({ instructorId: value, instructorName });
                }}
              >
                <SelectTrigger id="instructor">
                  <SelectValue placeholder="Sélectionner un moniteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instructor-001">Jean Dupont</SelectItem>
                  <SelectItem value="instructor-002">Claire Moreau</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle">{locale.booking.selectVehicle}</Label>
              <Select
                value={data.vehicleId}
                onValueChange={(value) => {
                  const vehiclePlate =
                    value === "vehicle-001" ? "VD 123456" : "VD 234567";
                  onChange({ vehicleId: value, vehiclePlate });
                }}
              >
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vehicle-001">
                    VW Golf - VD 123456
                  </SelectItem>
                  <SelectItem value="vehicle-002">
                    Audi A3 - VD 234567
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <Textarea
            id="notes"
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Informations complémentaires..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// STEP 4: CONFIRMATION
// ============================================================================

function Step4({ data, locale }: { data: BookingData; locale: ExamsLocale }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale.booking.step4}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Élève */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            {locale.detail.student}
          </div>
          <div className="font-medium">{data.studentName}</div>
        </div>

        <Separator />

        {/* Type & Catégorie */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Type d'examen
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">
              {locale.types[data.type as keyof typeof locale.types]}
            </Badge>
            <Badge variant="outline">Catégorie {data.category}</Badge>
          </div>
        </div>

        <Separator />

        {/* Date & Heure */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Date</div>
            <div className="font-medium">
              {new Date(data.date).toLocaleDateString("fr-CH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Heure</div>
            <div className="font-medium">{data.time}</div>
          </div>
        </div>

        <Separator />

        {/* Lieu */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            {locale.detail.location}
          </div>
          <div className="font-medium">{data.centerName}</div>
        </div>

        {/* Détails pratique */}
        {data.type === "practical" && (
          <>
            <Separator />

            <div className="grid grid-cols-2 gap-4">
              {data.instructorName && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {locale.detail.instructor}
                  </div>
                  <div className="font-medium">{data.instructorName}</div>
                </div>
              )}
              {data.vehiclePlate && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {locale.detail.vehicle}
                  </div>
                  <div className="font-medium">{data.vehiclePlate}</div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Notes */}
        {data.notes && (
          <>
            <Separator />

            <div>
              <div className="text-sm text-muted-foreground mb-2">Notes</div>
              <div className="text-sm whitespace-pre-wrap">{data.notes}</div>
            </div>
          </>
        )}

        <Separator />

        {/* Frais */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
          <div className="font-medium">Frais d'examen</div>
          <div className="text-2xl font-bold">CHF {data.fee.toFixed(2)}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ExamsBookPage({
  locale = examsLocales.fr,
}: ExamsBookPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    studentId: "",
    studentName: "",
    type: "",
    category: "",
    date: "",
    time: "",
    centerId: "",
    centerName: "",
    fee: 0,
  });

  const handleDataChange = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    // Simulation de la réservation
    setShowSuccess(true);
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return bookingData.studentId && bookingData.type && bookingData.category;
    }
    if (currentStep === 2) {
      return bookingData.date && bookingData.time && bookingData.centerId;
    }
    if (currentStep === 3) {
      return true; // Optionnel
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {locale.booking.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {locale.booking.description}
            </p>
          </div>

          {/* Steps Indicator */}
          <StepsIndicator currentStep={currentStep} locale={locale} />

          {/* Step Content */}
          {currentStep === 1 && (
            <Step1
              data={bookingData}
              onChange={handleDataChange}
              locale={locale}
            />
          )}
          {currentStep === 2 && (
            <Step2
              data={bookingData}
              onChange={handleDataChange}
              locale={locale}
            />
          )}
          {currentStep === 3 && (
            <Step3
              data={bookingData}
              onChange={handleDataChange}
              locale={locale}
            />
          )}
          {currentStep === 4 && <Step4 data={bookingData} locale={locale} />}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Suivant
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleConfirm}>
                <CheckIcon className="h-4 w-4 mr-2" />

                {locale.booking.confirm}
              </Button>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && (
            <Card className="border-green-500 bg-green-50 dark:bg-green-950">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
                    <CheckIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {locale.booking.success}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Votre réservation a été enregistrée avec succès.
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/exams">Retour aux examens</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
