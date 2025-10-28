import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  MoonIcon,
  ClockIcon,
  CalendarIcon,
  AlertTriangleIcon,
  BellOffIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface DNDSettingsProps {
  locale?: "fr" | "de" | "it" | "en";
  className?: string;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Ne pas déranger",
    description: "Gérez vos périodes de silence",
    quickMute: {
      title: "Masquer temporairement",
      label: "Durée",
      options: {
        "1h": "1 heure",
        "4h": "4 heures",
        "8h": "8 heures",
        "24h": "24 heures",
        until: "Jusqu'à désactivation",
      },
      active: "Actif encore",
      activate: "Activer maintenant",
    },
    schedule: {
      title: "Plage horaire récurrente",
      description: "Désactiver automatiquement les notifications chaque jour",
      enabled: "Activer le mode silencieux automatique",
      start: "Début",
      end: "Fin",
      example: "Tous les jours 22h-8h aucune notification",
    },
    weekend: {
      title: "Mode week-end",
      description: "Désactiver toutes les notifications le samedi et dimanche",
      enabled: "Désactiver week-end",
    },
    urgency: {
      title: "Urgences uniquement",
      description:
        "Autoriser les notifications critiques même en mode Ne pas déranger",
      enabled: "Urgences uniquement",
    },
    save: "Enregistrer",
    cancel: "Annuler",
  },
  de: {
    title: "Nicht stören",
    description: "Verwalten Sie Ihre Ruhezeiten",
    quickMute: {
      title: "Vorübergehend stumm schalten",
      label: "Dauer",
      options: {
        "1h": "1 Stunde",
        "4h": "4 Stunden",
        "8h": "8 Stunden",
        "24h": "24 Stunden",
        until: "Bis zur Deaktivierung",
      },
      active: "Noch aktiv",
      activate: "Jetzt aktivieren",
    },
    schedule: {
      title: "Wiederkehrende Zeitspanne",
      description: "Benachrichtigungen täglich automatisch deaktivieren",
      enabled: "Automatischen Stummmodus aktivieren",
      start: "Start",
      end: "Ende",
      example: "Täglich 22-8 Uhr keine Benachrichtigungen",
    },
    weekend: {
      title: "Wochenendmodus",
      description:
        "Alle Benachrichtigungen am Samstag und Sonntag deaktivieren",
      enabled: "Wochenende deaktivieren",
    },
    urgency: {
      title: "Nur Notfälle",
      description:
        "Kritische Benachrichtigungen auch im Nicht-stören-Modus zulassen",
      enabled: "Nur Notfälle",
    },
    save: "Speichern",
    cancel: "Abbrechen",
  },
  it: {
    title: "Non disturbare",
    description: "Gestisci i tuoi periodi di silenzio",
    quickMute: {
      title: "Silenzia temporaneamente",
      label: "Durata",
      options: {
        "1h": "1 ora",
        "4h": "4 ore",
        "8h": "8 ore",
        "24h": "24 ore",
        until: "Fino alla disattivazione",
      },
      active: "Ancora attivo",
      activate: "Attiva ora",
    },
    schedule: {
      title: "Fascia oraria ricorrente",
      description: "Disattiva automaticamente le notifiche ogni giorno",
      enabled: "Attiva modalità silenziosa automatica",
      start: "Inizio",
      end: "Fine",
      example: "Ogni giorno 22-8 nessuna notifica",
    },
    weekend: {
      title: "Modalità weekend",
      description: "Disattiva tutte le notifiche il sabato e la domenica",
      enabled: "Disattiva weekend",
    },
    urgency: {
      title: "Solo urgenze",
      description:
        "Consenti notifiche critiche anche in modalità Non disturbare",
      enabled: "Solo urgenze",
    },
    save: "Salva",
    cancel: "Annulla",
  },
  en: {
    title: "Do not disturb",
    description: "Manage your quiet periods",
    quickMute: {
      title: "Temporary mute",
      label: "Duration",
      options: {
        "1h": "1 hour",
        "4h": "4 hours",
        "8h": "8 hours",
        "24h": "24 hours",
        until: "Until disabled",
      },
      active: "Still active",
      activate: "Activate now",
    },
    schedule: {
      title: "Recurring time slot",
      description: "Automatically disable notifications every day",
      enabled: "Enable automatic silent mode",
      start: "Start",
      end: "End",
      example: "Every day 10 PM-8 AM no notifications",
    },
    weekend: {
      title: "Weekend mode",
      description: "Disable all notifications on Saturday and Sunday",
      enabled: "Disable weekend",
    },
    urgency: {
      title: "Emergencies only",
      description: "Allow critical notifications even in Do not disturb mode",
      enabled: "Emergencies only",
    },
    save: "Save",
    cancel: "Cancel",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function DNDSettings({
  locale = "fr",
  className = "",
}: DNDSettingsProps) {
  const t = translations[locale];

  const [quickMuteDuration, setQuickMuteDuration] = useState<string | null>(
    null
  );
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleStart, setScheduleStart] = useState("22:00");
  const [scheduleEnd, setScheduleEnd] = useState("08:00");
  const [weekendMode, setWeekendMode] = useState(false);
  const [urgencyOnly, setUrgencyOnly] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  const handleQuickMute = (duration: string) => {
    setQuickMuteDuration(duration);
    // Simulate countdown
    if (duration === "1h") setRemainingTime("0h 59m");
    else if (duration === "4h") setRemainingTime("3h 59m");
    else if (duration === "8h") setRemainingTime("7h 59m");
    else if (duration === "24h") setRemainingTime("23h 59m");
    else setRemainingTime(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Mute */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOffIcon className="h-5 w-5" />

            {t.quickMute.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.quickMute.label}</Label>
            <Select
              value={quickMuteDuration || ""}
              onValueChange={handleQuickMute}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.quickMute.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">{t.quickMute.options["1h"]}</SelectItem>
                <SelectItem value="4h">{t.quickMute.options["4h"]}</SelectItem>
                <SelectItem value="8h">{t.quickMute.options["8h"]}</SelectItem>
                <SelectItem value="24h">
                  {t.quickMute.options["24h"]}
                </SelectItem>
                <SelectItem value="until">
                  {t.quickMute.options.until}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {remainingTime && (
            <Alert>
              <ClockIcon className="h-4 w-4" />

              <AlertDescription>
                {t.quickMute.active}{" "}
                <Badge variant="secondary">{remainingTime}</Badge>
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={() => handleQuickMute(quickMuteDuration || "1h")}
            className="w-full"
          >
            <MoonIcon className="h-4 w-4 mr-2" />

            {t.quickMute.activate}
          </Button>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />

            {t.schedule.title}
          </CardTitle>
          <CardDescription>{t.schedule.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="schedule-enabled">{t.schedule.enabled}</Label>
            <Switch
              id="schedule-enabled"
              checked={scheduleEnabled}
              onCheckedChange={setScheduleEnabled}
            />
          </div>

          {scheduleEnabled && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.schedule.start}</Label>
                  <Select
                    value={scheduleStart}
                    onValueChange={setScheduleStart}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.schedule.end}</Label>
                  <Select value={scheduleEnd} onValueChange={setScheduleEnd}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Alert>
                <CalendarIcon className="h-4 w-4" />

                <AlertDescription className="text-xs italic">
                  {t.schedule.example}
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>

      {/* Weekend Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />

            {t.weekend.title}
          </CardTitle>
          <CardDescription>{t.weekend.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="weekend-mode">{t.weekend.enabled}</Label>
            <Switch
              id="weekend-mode"
              checked={weekendMode}
              onCheckedChange={setWeekendMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Urgency Only */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5" />

            {t.urgency.title}
          </CardTitle>
          <CardDescription>{t.urgency.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgency-only"
              checked={urgencyOnly}
              onCheckedChange={(checked) => setUrgencyOnly(checked as boolean)}
            />

            <Label htmlFor="urgency-only" className="text-sm font-normal">
              {t.urgency.enabled}
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline">{t.cancel}</Button>
        <Button>{t.save}</Button>
      </div>
    </div>
  );
}
