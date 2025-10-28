/**
 * VIAMENTOR - Notifications Settings
 * Dialog fullscreen paramètres notifications avec tabs et préférences
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { SettingsIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export type NotificationsLocale = "fr" | "de" | "it" | "en";
export type FrequencyType = "realtime" | "daily" | "weekly";

interface CategoryPreference {
  enabled: boolean;
  frequency: FrequencyType;
}

interface NotificationPreferences {
  students: {
    registrations: CategoryPreference;
    modifications: CategoryPreference;
    deletions: CategoryPreference;
  };
  lessons: {
    bookings: CategoryPreference;
    cancellations: CategoryPreference;
    modifications: CategoryPreference;
  };
  payments: {
    received: CategoryPreference;
    due: CategoryPreference;
    reminders: CategoryPreference;
  };
  messages: {
    new: CategoryPreference;
    replies: CategoryPreference;
    mentions: CategoryPreference;
  };
  system: {
    alerts: CategoryPreference;
    maintenance: CategoryPreference;
    updates: CategoryPreference;
  };
}

interface NotificationsSettingsProps {
  locale?: NotificationsLocale;
  onSave: (preferences: NotificationPreferences) => Promise<void>;
  className?: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Préférences notifications",
    tabs: {
      general: "Général",
      email: "Email",
      push: "Push",
      sms: "SMS",
      dnd: "Ne pas déranger",
    },
    categories: {
      title: "Préférences par catégorie",
      students: {
        title: "Élèves",
        registrations: "Inscriptions",
        modifications: "Modifications",
        deletions: "Suppressions",
      },
      lessons: {
        title: "Leçons",
        bookings: "Réservations",
        cancellations: "Annulations",
        modifications: "Modifications",
      },
      payments: {
        title: "Paiements",
        received: "Reçus",
        due: "Échéances",
        reminders: "Rappels",
      },
      messages: {
        title: "Messages",
        new: "Nouveaux messages",
        replies: "Réponses",
        mentions: "Mentions",
      },
      system: {
        title: "Système",
        alerts: "Alertes",
        maintenance: "Maintenances",
        updates: "Mises à jour",
      },
    },
    frequency: {
      label: "Fréquence",
      realtime: "Temps réel",
      daily: "Digest quotidien 18h",
      weekly: "Résumé hebdomadaire lundi",
      preview: "Ex: Vous recevrez un email chaque soir à 18:00",
    },
    archive: {
      title: "Archivage automatique",
      readAfter: "Archiver les notifications lues après",
      deleteAfter: "Supprimer les notifications archivées après",
      periods: {
        "7d": "7 jours",
        "14d": "14 jours",
        "30d": "30 jours",
        "60d": "60 jours",
        "90d": "90 jours",
        never: "Jamais",
      },
      warning: "⚠️ Notifications supprimées définitivement non récupérables",
      saveImportant: "Sauvegarder les notifications importantes",
      emptyNow: "Vider l'archive maintenant",
      confirmEmpty: "Supprimer {count} notifications?",
      irreversible: "Cette action est irréversible",
    },
    save: "Enregistrer",
    cancel: "Annuler",
    saved: "Préférences enregistrées",
  },
  de: {
    title: "Benachrichtigungseinstellungen",
    tabs: {
      general: "Allgemein",
      email: "E-Mail",
      push: "Push",
      sms: "SMS",
      dnd: "Nicht stören",
    },
    categories: {
      title: "Einstellungen nach Kategorie",
      students: {
        title: "Schüler",
        registrations: "Anmeldungen",
        modifications: "Änderungen",
        deletions: "Löschungen",
      },
      lessons: {
        title: "Lektionen",
        bookings: "Buchungen",
        cancellations: "Stornierungen",
        modifications: "Änderungen",
      },
      payments: {
        title: "Zahlungen",
        received: "Erhalten",
        due: "Fällig",
        reminders: "Erinnerungen",
      },
      messages: {
        title: "Nachrichten",
        new: "Neue Nachrichten",
        replies: "Antworten",
        mentions: "Erwähnungen",
      },
      system: {
        title: "System",
        alerts: "Warnungen",
        maintenance: "Wartung",
        updates: "Updates",
      },
    },
    frequency: {
      label: "Häufigkeit",
      realtime: "Echtzeit",
      daily: "Tägliche Zusammenfassung 18 Uhr",
      weekly: "Wöchentliche Zusammenfassung Montag",
      preview: "Z.B.: Sie erhalten jeden Abend um 18:00 Uhr eine E-Mail",
    },
    archive: {
      title: "Automatische Archivierung",
      readAfter: "Gelesene Benachrichtigungen archivieren nach",
      deleteAfter: "Archivierte Benachrichtigungen löschen nach",
      periods: {
        "7d": "7 Tage",
        "14d": "14 Tage",
        "30d": "30 Tage",
        "60d": "60 Tage",
        "90d": "90 Tage",
        never: "Nie",
      },
      warning:
        "⚠️ Gelöschte Benachrichtigungen können nicht wiederhergestellt werden",
      saveImportant: "Wichtige Benachrichtigungen speichern",
      emptyNow: "Archiv jetzt leeren",
      confirmEmpty: "{count} Benachrichtigungen löschen?",
      irreversible: "Diese Aktion ist unwiderruflich",
    },
    save: "Speichern",
    cancel: "Abbrechen",
    saved: "Einstellungen gespeichert",
  },
  it: {
    title: "Preferenze notifiche",
    tabs: {
      general: "Generale",
      email: "Email",
      push: "Push",
      sms: "SMS",
      dnd: "Non disturbare",
    },
    categories: {
      title: "Preferenze per categoria",
      students: {
        title: "Allievi",
        registrations: "Iscrizioni",
        modifications: "Modifiche",
        deletions: "Eliminazioni",
      },
      lessons: {
        title: "Lezioni",
        bookings: "Prenotazioni",
        cancellations: "Cancellazioni",
        modifications: "Modifiche",
      },
      payments: {
        title: "Pagamenti",
        received: "Ricevuti",
        due: "Scadenze",
        reminders: "Promemoria",
      },
      messages: {
        title: "Messaggi",
        new: "Nuovi messaggi",
        replies: "Risposte",
        mentions: "Menzioni",
      },
      system: {
        title: "Sistema",
        alerts: "Avvisi",
        maintenance: "Manutenzioni",
        updates: "Aggiornamenti",
      },
    },
    frequency: {
      label: "Frequenza",
      realtime: "Tempo reale",
      daily: "Riepilogo giornaliero ore 18",
      weekly: "Riepilogo settimanale lunedì",
      preview: "Es: Riceverai un'email ogni sera alle 18:00",
    },
    archive: {
      title: "Archiviazione automatica",
      readAfter: "Archivia notifiche lette dopo",
      deleteAfter: "Elimina notifiche archiviate dopo",
      periods: {
        "7d": "7 giorni",
        "14d": "14 giorni",
        "30d": "30 giorni",
        "60d": "60 giorni",
        "90d": "90 giorni",
        never: "Mai",
      },
      warning: "⚠️ Notifiche eliminate definitivamente non recuperabili",
      saveImportant: "Salva notifiche importanti",
      emptyNow: "Svuota archivio ora",
      confirmEmpty: "Eliminare {count} notifiche?",
      irreversible: "Questa azione è irreversibile",
    },
    save: "Salva",
    cancel: "Annulla",
    saved: "Preferenze salvate",
  },
  en: {
    title: "Notification preferences",
    tabs: {
      general: "General",
      email: "Email",
      push: "Push",
      sms: "SMS",
      dnd: "Do not disturb",
    },
    categories: {
      title: "Preferences by category",
      students: {
        title: "Students",
        registrations: "Registrations",
        modifications: "Modifications",
        deletions: "Deletions",
      },
      lessons: {
        title: "Lessons",
        bookings: "Bookings",
        cancellations: "Cancellations",
        modifications: "Modifications",
      },
      payments: {
        title: "Payments",
        received: "Received",
        due: "Due",
        reminders: "Reminders",
      },
      messages: {
        title: "Messages",
        new: "New messages",
        replies: "Replies",
        mentions: "Mentions",
      },
      system: {
        title: "System",
        alerts: "Alerts",
        maintenance: "Maintenance",
        updates: "Updates",
      },
    },
    frequency: {
      label: "Frequency",
      realtime: "Real-time",
      daily: "Daily digest 6 PM",
      weekly: "Weekly summary Monday",
      preview: "E.g.: You will receive an email every evening at 6:00 PM",
    },
    archive: {
      title: "Auto-archive",
      readAfter: "Archive read notifications after",
      deleteAfter: "Delete archived notifications after",
      periods: {
        "7d": "7 days",
        "14d": "14 days",
        "30d": "30 days",
        "60d": "60 days",
        "90d": "90 days",
        never: "Never",
      },
      warning: "⚠️ Deleted notifications cannot be recovered",
      saveImportant: "Save important notifications",
      emptyNow: "Empty archive now",
      confirmEmpty: "Delete {count} notifications?",
      irreversible: "This action is irreversible",
    },
    save: "Save",
    cancel: "Cancel",
    saved: "Preferences saved",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationsSettings({
  locale = "fr",
  onSave,
  className,
}: NotificationsSettingsProps) {
  const t = translations[locale];
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [archiveReadAfter, setArchiveReadAfter] = useState<string>("30d");
  const [archiveDeleteAfter, setArchiveDeleteAfter] = useState<string>("90d");
  const [saveImportant, setSaveImportant] = useState(true);

  // Default preferences
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    students: {
      registrations: { enabled: true, frequency: "realtime" },
      modifications: { enabled: true, frequency: "daily" },
      deletions: { enabled: false, frequency: "daily" },
    },
    lessons: {
      bookings: { enabled: true, frequency: "realtime" },
      cancellations: { enabled: true, frequency: "realtime" },
      modifications: { enabled: true, frequency: "realtime" },
    },
    payments: {
      received: { enabled: true, frequency: "realtime" },
      due: { enabled: true, frequency: "daily" },
      reminders: { enabled: true, frequency: "daily" },
    },
    messages: {
      new: { enabled: true, frequency: "realtime" },
      replies: { enabled: true, frequency: "realtime" },
      mentions: { enabled: true, frequency: "realtime" },
    },
    system: {
      alerts: { enabled: true, frequency: "realtime" },
      maintenance: { enabled: true, frequency: "daily" },
      updates: { enabled: false, frequency: "weekly" },
    },
  });

  const handleToggle = (
    category: keyof NotificationPreferences,
    subcategory: string,
    enabled: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][
            subcategory as keyof (typeof prev)[typeof category]
          ],

          enabled,
        },
      },
    }));
  };

  const handleFrequencyChange = (
    category: keyof NotificationPreferences,
    subcategory: string,
    frequency: FrequencyType
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][
            subcategory as keyof (typeof prev)[typeof category]
          ],

          frequency,
        },
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(preferences);
      toast({
        title: t.saved,
        description: "",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderCategorySection = (
    category: keyof NotificationPreferences,
    categoryData: any
  ) => {
    const categoryT = t.categories[category];

    return (
      <AccordionItem value={category} key={category}>
        <AccordionTrigger className="text-base font-semibold">
          {categoryT.title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {Object.entries(categoryData).map(([key, value]) => {
              const pref = value as CategoryPreference;
              const label = categoryT[key as keyof typeof categoryT] || key;

              return (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={pref.enabled}
                        onCheckedChange={(checked) =>
                          handleToggle(category, key, checked)
                        }
                      />

                      <Label className="font-medium">{label}</Label>
                    </div>

                    {pref.enabled && (
                      <div className="ml-11 space-y-2">
                        <Select
                          value={pref.frequency}
                          onValueChange={(value) =>
                            handleFrequencyChange(
                              category,
                              key,
                              value as FrequencyType
                            )
                          }
                        >
                          <SelectTrigger className="w-[250px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">
                              {t.frequency.realtime}
                            </SelectItem>
                            <SelectItem value="daily">
                              {t.frequency.daily}
                            </SelectItem>
                            <SelectItem value="weekly">
                              {t.frequency.weekly}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs italic text-muted-foreground">
                          {t.frequency.preview}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <SettingsIcon className="mr-2 h-4 w-4" />

          {t.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">{t.tabs.general}</TabsTrigger>
            <TabsTrigger value="email">{t.tabs.email}</TabsTrigger>
            <TabsTrigger value="push">{t.tabs.push}</TabsTrigger>
            <TabsTrigger value="sms">{t.tabs.sms}</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                {t.categories.title}
              </h3>
              <Accordion type="multiple" className="w-full">
                {renderCategorySection("students", preferences.students)}
                {renderCategorySection("lessons", preferences.lessons)}
                {renderCategorySection("payments", preferences.payments)}
                {renderCategorySection("messages", preferences.messages)}
                {renderCategorySection("system", preferences.system)}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="archive" className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">{t.archive.title}</h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>{t.archive.readAfter}</Label>
                  <RadioGroup
                    value={archiveReadAfter}
                    onValueChange={setArchiveReadAfter}
                  >
                    {Object.entries(t.archive.periods).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={`read-${value}`} />

                        <Label htmlFor={`read-${value}`}>{label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>{t.archive.deleteAfter}</Label>
                  <RadioGroup
                    value={archiveDeleteAfter}
                    onValueChange={setArchiveDeleteAfter}
                  >
                    {Object.entries(t.archive.periods).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={`delete-${value}`} />

                        <Label htmlFor={`delete-${value}`}>{label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Alert>
                  <AlertTriangleIcon className="h-4 w-4" />

                  <AlertDescription>{t.archive.warning}</AlertDescription>
                </Alert>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={saveImportant}
                    onCheckedChange={setSaveImportant}
                  />

                  <Label>{t.archive.saveImportant}</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSaving}
          >
            {t.cancel}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : t.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
