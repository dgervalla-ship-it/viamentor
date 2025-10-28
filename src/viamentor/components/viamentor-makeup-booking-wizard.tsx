/**
 * VIAMENTOR - Makeup Booking Wizard
 * Wizard réservation rattrapage élève
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  CalendarIcon,
  ClockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CarIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "lucide-react";
import type { StudentMakeupsLocale } from "@/viamentor/data/viamentor-student-makeups-i18n";
import { studentMakeupsTranslations } from "@/viamentor/data/viamentor-student-makeups-i18n";
import type { MakeupCredit } from "@/viamentor/data/viamentor-makeups-data";

/**
 * Props
 */
interface MakeupBookingWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  makeup: MakeupCredit;
  locale?: StudentMakeupsLocale;
  onSuccess?: () => void;
}

/**
 * Time slot type
 */
interface TimeSlot {
  time: string;
  available: boolean;
}

/**
 * Composant principal
 */
export function MakeupBookingWizard({
  open,
  onOpenChange,
  makeup,
  locale = "fr",
  onSuccess,
}: MakeupBookingWizardProps) {
  const t = studentMakeupsTranslations[locale].wizard;
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Mock time slots
  const timeSlots: TimeSlot[] = [
    { time: "08:00", available: true },
    { time: "08:15", available: false },
    { time: "08:30", available: true },
    { time: "08:45", available: true },
    { time: "09:00", available: false },
    { time: "09:15", available: true },
    { time: "09:30", available: true },
    { time: "09:45", available: false },
    { time: "10:00", available: true },
    { time: "10:15", available: true },
    { time: "10:30", available: false },
    { time: "10:45", available: true },
  ];

  // Calculate days remaining
  const daysRemaining = Math.floor(
    (new Date(makeup.expiresAt).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Reset on close
  const handleClose = () => {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime("");
    onOpenChange(false);
  };

  // Handle confirm
  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(t.step2.success, {
        description: `${selectedDate?.toLocaleDateString(locale)} à ${selectedTime}`,
      });

      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(t.step2.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
        </DialogHeader>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`flex items-center gap-2 ${
              step === 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step === 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="font-medium">{t.steps.datetime}</span>
          </div>
          <Separator className="flex-1" />

          <div
            className={`flex items-center gap-2 ${
              step === 2 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step === 2
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="font-medium">{t.steps.confirmation}</span>
          </div>
        </div>

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Context card */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{t.step1.context.title}</h4>
                    <Badge variant="outline">{makeup.category}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        {t.step1.context.cancelledOn}:
                      </span>
                      <p className="font-medium">
                        {new Date(makeup.originalDate).toLocaleDateString(
                          locale,
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        {t.step1.context.instructor}:
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://github.com/yusufhilmi.png" />

                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {makeup.studentName}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        {t.step1.context.reason}:
                      </span>
                      <p className="font-medium">
                        {
                          studentMakeupsTranslations[locale].reasons[
                            makeup.reason as keyof typeof studentMakeupsTranslations.fr.reasons
                          ]
                        }
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        {t.step1.context.replaceBy}:
                      </span>
                      <p className="font-medium text-orange-600">
                        {new Date(makeup.expiresAt).toLocaleDateString(locale)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expiry warning */}
            {daysRemaining < 3 && (
              <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
                <AlertCircleIcon className="h-4 w-4 text-orange-600" />

                <AlertDescription className="text-orange-900 dark:text-orange-100">
                  {t.step1.alert.expiryWarning.replace(
                    "{days}",
                    String(daysRemaining)
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Date picker */}
            <div className="space-y-2">
              <Label>{t.step1.datePicker.label}</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const expiry = new Date(makeup.expiresAt);
                  return date < today || date > expiry;
                }}
                className="rounded-md border border-border"
              />
            </div>

            {/* Time picker */}
            {selectedDate && (
              <div className="space-y-2">
                <Label>{t.step1.timePicker.label}</Label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        selectedTime === slot.time ? "default" : "outline"
                      }
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={
                        selectedTime === slot.time ? "animate-pulse" : ""
                      }
                    >
                      <ClockIcon className="h-3 w-3 mr-1" />

                      {slot.time}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.step1.timePicker.available}: vert •{" "}
                  {t.step1.timePicker.occupied}: gris
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                {t.cancel}
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedTime}
              >
                {t.step1.continue}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t.step2.title}</h4>

            <Accordion type="single" collapsible defaultValue="original">
              {/* Original lesson */}
              <AccordionItem value="original">
                <AccordionTrigger>{t.step2.summary.original}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.step2.originalLesson.date}:
                      </span>
                      <span className="font-medium">
                        {new Date(makeup.originalDate).toLocaleDateString(
                          locale
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.step2.originalLesson.instructor}:
                      </span>
                      <span className="font-medium">{makeup.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.step2.originalLesson.reason}:
                      </span>
                      <span className="font-medium">
                        {
                          studentMakeupsTranslations[locale].reasons[
                            makeup.reason as keyof typeof studentMakeupsTranslations.fr.reasons
                          ]
                        }
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* New lesson */}
              <AccordionItem value="new">
                <AccordionTrigger>{t.step2.summary.newLesson}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="font-medium">
                        {selectedDate?.toLocaleDateString(locale, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        à {selectedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/yusufhilmi.png" />

                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <span>{makeup.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CarIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="text-sm">VD-123456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="text-sm">Auto-école Viamentor</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Credit */}
              <AccordionItem value="credit">
                <AccordionTrigger>{t.step2.summary.credit}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {t.step2.creditInfo.message}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                    >
                      {t.step2.creditInfo.badge}
                    </Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="use-credit" checked disabled />

              <Label htmlFor="use-credit" className="text-sm">
                {t.step2.checkbox.label}
              </Label>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />

                {t.back}
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? (
                  <>
                    <ClockIcon className="h-4 w-4 mr-2 animate-spin" />

                    {t.step2.confirming}
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-4 w-4 mr-2" />

                    {t.step2.confirm}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
