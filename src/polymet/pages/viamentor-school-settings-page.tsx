/**
 * VIAMENTOR - School Settings Page
 * Page paramètres école
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BuildingIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  SaveIcon,
  InfoIcon,
  SettingsIcon,
  UsersIcon,
  BellIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolSettingsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      settings: "Paramètres",
      school: "École",
    },
    title: "Paramètres de l'École",
    description: "Configurez les informations et préférences de votre école",
    tabs: {
      general: "Général",
      contact: "Contact",
      hours: "Horaires",
      preferences: "Préférences",
    },
    general: {
      title: "Informations générales",
      description: "Informations de base de votre école",
      schoolName: "Nom de l'école",
      schoolNamePlaceholder: "Auto-école ViaMenutor",
      description_field: "Description",
      descriptionPlaceholder: "Description de votre école...",
      logo: "Logo",
      language: "Langue par défaut",
      timezone: "Fuseau horaire",
      currency: "Devise",
    },
    contact: {
      title: "Informations de contact",
      description: "Coordonnées de votre école",
      address: "Adresse",
      addressPlaceholder: "Rue de l'École 123",
      city: "Ville",
      cityPlaceholder: "Genève",
      postalCode: "Code postal",
      postalCodePlaceholder: "1200",
      canton: "Canton",
      phone: "Téléphone",
      phonePlaceholder: "+41 22 123 45 67",
      email: "Email",
      emailPlaceholder: "contact@ecole.ch",
      website: "Site web",
      websitePlaceholder: "https://www.ecole.ch",
    },
    hours: {
      title: "Horaires d'ouverture",
      description: "Définissez vos horaires d'ouverture",
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      closed: "Fermé",
      from: "De",
      to: "À",
    },
    preferences: {
      title: "Préférences",
      description: "Configurez les préférences de votre école",
      notifications: {
        title: "Notifications",
        emailNotifications: "Notifications par email",
        emailNotificationsDesc: "Recevoir les notifications par email",
        smsNotifications: "Notifications par SMS",
        smsNotificationsDesc: "Recevoir les notifications par SMS",
        pushNotifications: "Notifications push",
        pushNotificationsDesc: "Recevoir les notifications push",
      },
      booking: {
        title: "Réservations",
        autoConfirm: "Confirmation automatique",
        autoConfirmDesc: "Confirmer automatiquement les réservations",
        minAdvance: "Délai minimum de réservation",
        minAdvanceDesc: "Nombre d'heures minimum avant une leçon",
        maxAdvance: "Délai maximum de réservation",
        maxAdvanceDesc: "Nombre de jours maximum à l'avance",
      },
      cancellation: {
        title: "Annulations",
        allowCancellation: "Autoriser les annulations",
        allowCancellationDesc: "Permettre aux élèves d'annuler leurs leçons",
        cancellationDeadline: "Délai d'annulation",
        cancellationDeadlineDesc: "Nombre d'heures minimum avant annulation",
      },
    },
    actions: {
      save: "Enregistrer",
      cancel: "Annuler",
      reset: "Réinitialiser",
    },
    alerts: {
      success: "Paramètres enregistrés avec succès",
      error: "Erreur lors de l'enregistrement des paramètres",
    },
  },
  de: {
    breadcrumb: {
      settings: "Einstellungen",
      school: "Schule",
    },
    title: "Schuleinstellungen",
    description:
      "Konfigurieren Sie die Informationen und Einstellungen Ihrer Schule",
    tabs: {
      general: "Allgemein",
      contact: "Kontakt",
      hours: "Öffnungszeiten",
      preferences: "Einstellungen",
    },
    general: {
      title: "Allgemeine Informationen",
      description: "Grundlegende Informationen Ihrer Schule",
      schoolName: "Schulname",
      schoolNamePlaceholder: "Fahrschule ViaMenutor",
      description_field: "Beschreibung",
      descriptionPlaceholder: "Beschreibung Ihrer Schule...",
      logo: "Logo",
      language: "Standardsprache",
      timezone: "Zeitzone",
      currency: "Währung",
    },
    contact: {
      title: "Kontaktinformationen",
      description: "Kontaktdaten Ihrer Schule",
      address: "Adresse",
      addressPlaceholder: "Schulstrasse 123",
      city: "Stadt",
      cityPlaceholder: "Genf",
      postalCode: "Postleitzahl",
      postalCodePlaceholder: "1200",
      canton: "Kanton",
      phone: "Telefon",
      phonePlaceholder: "+41 22 123 45 67",
      email: "E-Mail",
      emailPlaceholder: "kontakt@schule.ch",
      website: "Webseite",
      websitePlaceholder: "https://www.schule.ch",
    },
    hours: {
      title: "Öffnungszeiten",
      description: "Definieren Sie Ihre Öffnungszeiten",
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
      closed: "Geschlossen",
      from: "Von",
      to: "Bis",
    },
    preferences: {
      title: "Einstellungen",
      description: "Konfigurieren Sie die Einstellungen Ihrer Schule",
      notifications: {
        title: "Benachrichtigungen",
        emailNotifications: "E-Mail-Benachrichtigungen",
        emailNotificationsDesc: "E-Mail-Benachrichtigungen erhalten",
        smsNotifications: "SMS-Benachrichtigungen",
        smsNotificationsDesc: "SMS-Benachrichtigungen erhalten",
        pushNotifications: "Push-Benachrichtigungen",
        pushNotificationsDesc: "Push-Benachrichtigungen erhalten",
      },
      booking: {
        title: "Buchungen",
        autoConfirm: "Automatische Bestätigung",
        autoConfirmDesc: "Buchungen automatisch bestätigen",
        minAdvance: "Mindestvorlaufzeit",
        minAdvanceDesc: "Mindestanzahl Stunden vor einer Lektion",
        maxAdvance: "Maximale Vorlaufzeit",
        maxAdvanceDesc: "Maximale Anzahl Tage im Voraus",
      },
      cancellation: {
        title: "Stornierungen",
        allowCancellation: "Stornierungen zulassen",
        allowCancellationDesc:
          "Schülern erlauben, ihre Lektionen zu stornieren",
        cancellationDeadline: "Stornierungsfrist",
        cancellationDeadlineDesc: "Mindestanzahl Stunden vor Stornierung",
      },
    },
    actions: {
      save: "Speichern",
      cancel: "Abbrechen",
      reset: "Zurücksetzen",
    },
    alerts: {
      success: "Einstellungen erfolgreich gespeichert",
      error: "Fehler beim Speichern der Einstellungen",
    },
  },
  it: {
    breadcrumb: {
      settings: "Impostazioni",
      school: "Scuola",
    },
    title: "Impostazioni della Scuola",
    description: "Configura le informazioni e le preferenze della tua scuola",
    tabs: {
      general: "Generale",
      contact: "Contatto",
      hours: "Orari",
      preferences: "Preferenze",
    },
    general: {
      title: "Informazioni generali",
      description: "Informazioni di base della tua scuola",
      schoolName: "Nome della scuola",
      schoolNamePlaceholder: "Autoscuola ViaMenutor",
      description_field: "Descrizione",
      descriptionPlaceholder: "Descrizione della tua scuola...",
      logo: "Logo",
      language: "Lingua predefinita",
      timezone: "Fuso orario",
      currency: "Valuta",
    },
    contact: {
      title: "Informazioni di contatto",
      description: "Coordinate della tua scuola",
      address: "Indirizzo",
      addressPlaceholder: "Via della Scuola 123",
      city: "Città",
      cityPlaceholder: "Ginevra",
      postalCode: "Codice postale",
      postalCodePlaceholder: "1200",
      canton: "Cantone",
      phone: "Telefono",
      phonePlaceholder: "+41 22 123 45 67",
      email: "Email",
      emailPlaceholder: "contatto@scuola.ch",
      website: "Sito web",
      websitePlaceholder: "https://www.scuola.ch",
    },
    hours: {
      title: "Orari di apertura",
      description: "Definisci i tuoi orari di apertura",
      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
      sunday: "Domenica",
      closed: "Chiuso",
      from: "Dalle",
      to: "Alle",
    },
    preferences: {
      title: "Preferenze",
      description: "Configura le preferenze della tua scuola",
      notifications: {
        title: "Notifiche",
        emailNotifications: "Notifiche via email",
        emailNotificationsDesc: "Ricevi notifiche via email",
        smsNotifications: "Notifiche via SMS",
        smsNotificationsDesc: "Ricevi notifiche via SMS",
        pushNotifications: "Notifiche push",
        pushNotificationsDesc: "Ricevi notifiche push",
      },
      booking: {
        title: "Prenotazioni",
        autoConfirm: "Conferma automatica",
        autoConfirmDesc: "Conferma automaticamente le prenotazioni",
        minAdvance: "Preavviso minimo",
        minAdvanceDesc: "Numero minimo di ore prima di una lezione",
        maxAdvance: "Preavviso massimo",
        maxAdvanceDesc: "Numero massimo di giorni in anticipo",
      },
      cancellation: {
        title: "Cancellazioni",
        allowCancellation: "Consenti cancellazioni",
        allowCancellationDesc:
          "Permetti agli allievi di cancellare le loro lezioni",
        cancellationDeadline: "Termine di cancellazione",
        cancellationDeadlineDesc:
          "Numero minimo di ore prima della cancellazione",
      },
    },
    actions: {
      save: "Salva",
      cancel: "Annulla",
      reset: "Ripristina",
    },
    alerts: {
      success: "Impostazioni salvate con successo",
      error: "Errore durante il salvataggio delle impostazioni",
    },
  },
  en: {
    breadcrumb: {
      settings: "Settings",
      school: "School",
    },
    title: "School Settings",
    description: "Configure your school information and preferences",
    tabs: {
      general: "General",
      contact: "Contact",
      hours: "Hours",
      preferences: "Preferences",
    },
    general: {
      title: "General information",
      description: "Basic information about your school",
      schoolName: "School name",
      schoolNamePlaceholder: "ViaMenutor Driving School",
      description_field: "Description",
      descriptionPlaceholder: "Description of your school...",
      logo: "Logo",
      language: "Default language",
      timezone: "Timezone",
      currency: "Currency",
    },
    contact: {
      title: "Contact information",
      description: "Your school contact details",
      address: "Address",
      addressPlaceholder: "School Street 123",
      city: "City",
      cityPlaceholder: "Geneva",
      postalCode: "Postal code",
      postalCodePlaceholder: "1200",
      canton: "Canton",
      phone: "Phone",
      phonePlaceholder: "+41 22 123 45 67",
      email: "Email",
      emailPlaceholder: "contact@school.ch",
      website: "Website",
      websitePlaceholder: "https://www.school.ch",
    },
    hours: {
      title: "Opening hours",
      description: "Define your opening hours",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      from: "From",
      to: "To",
    },
    preferences: {
      title: "Preferences",
      description: "Configure your school preferences",
      notifications: {
        title: "Notifications",
        emailNotifications: "Email notifications",
        emailNotificationsDesc: "Receive email notifications",
        smsNotifications: "SMS notifications",
        smsNotificationsDesc: "Receive SMS notifications",
        pushNotifications: "Push notifications",
        pushNotificationsDesc: "Receive push notifications",
      },
      booking: {
        title: "Bookings",
        autoConfirm: "Auto-confirm",
        autoConfirmDesc: "Automatically confirm bookings",
        minAdvance: "Minimum advance",
        minAdvanceDesc: "Minimum number of hours before a lesson",
        maxAdvance: "Maximum advance",
        maxAdvanceDesc: "Maximum number of days in advance",
      },
      cancellation: {
        title: "Cancellations",
        allowCancellation: "Allow cancellations",
        allowCancellationDesc: "Allow students to cancel their lessons",
        cancellationDeadline: "Cancellation deadline",
        cancellationDeadlineDesc: "Minimum number of hours before cancellation",
      },
    },
    actions: {
      save: "Save",
      cancel: "Cancel",
      reset: "Reset",
    },
    alerts: {
      success: "Settings saved successfully",
      error: "Error saving settings",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function SchoolSettingsPage({
  locale = "fr",
}: SchoolSettingsPageProps) {
  const t = translations[locale];

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // API call here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">
              {t.breadcrumb.settings}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.school}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>

        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4 mr-2" />

          {t.actions.save}
        </Button>
      </div>

      {/* Success Alert */}
      {saved && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <InfoIcon className="w-4 h-4 text-green-600 dark:text-green-400" />

          <AlertTitle className="text-green-800 dark:text-green-200">
            {t.alerts.success}
          </AlertTitle>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <BuildingIcon className="w-4 h-4 mr-2" />

            {t.tabs.general}
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MapPinIcon className="w-4 h-4 mr-2" />

            {t.tabs.contact}
          </TabsTrigger>
          <TabsTrigger value="hours">
            <ClockIcon className="w-4 h-4 mr-2" />

            {t.tabs.hours}
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SettingsIcon className="w-4 h-4 mr-2" />

            {t.tabs.preferences}
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.general.title}</CardTitle>
              <CardDescription>{t.general.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">{t.general.schoolName}</Label>
                <Input
                  id="schoolName"
                  placeholder={t.general.schoolNamePlaceholder}
                  defaultValue="Auto-école ViaMenutor Genève"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  {t.general.description_field}
                </Label>
                <Textarea
                  id="description"
                  placeholder={t.general.descriptionPlaceholder}
                  rows={4}
                  defaultValue="École de conduite professionnelle située à Genève, spécialisée dans la formation de qualité pour tous les types de permis."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">{t.general.language}</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">{t.general.timezone}</Label>
                  <Select defaultValue="europe/zurich">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe/zurich">
                        Europe/Zurich (CET)
                      </SelectItem>
                      <SelectItem value="europe/paris">
                        Europe/Paris (CET)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">{t.general.currency}</Label>
                  <Select defaultValue="CHF">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CHF">CHF (Franc suisse)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.contact.title}</CardTitle>
              <CardDescription>{t.contact.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">{t.contact.address}</Label>
                <Input
                  id="address"
                  placeholder={t.contact.addressPlaceholder}
                  defaultValue="Rue de la Servette 93"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">{t.contact.postalCode}</Label>
                  <Input
                    id="postalCode"
                    placeholder={t.contact.postalCodePlaceholder}
                    defaultValue="1202"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">{t.contact.city}</Label>
                  <Input
                    id="city"
                    placeholder={t.contact.cityPlaceholder}
                    defaultValue="Genève"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canton">{t.contact.canton}</Label>
                  <Select defaultValue="GE">
                    <SelectTrigger id="canton">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GE">Genève</SelectItem>
                      <SelectItem value="VD">Vaud</SelectItem>
                      <SelectItem value="VS">Valais</SelectItem>
                      <SelectItem value="ZH">Zürich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.contact.phone}</Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      id="phone"
                      placeholder={t.contact.phonePlaceholder}
                      className="pl-10"
                      defaultValue="+41 22 731 98 00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.email}</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder={t.contact.emailPlaceholder}
                      className="pl-10"
                      defaultValue="info@viamentor.ch"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{t.contact.website}</Label>
                <div className="relative">
                  <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    id="website"
                    type="url"
                    placeholder={t.contact.websitePlaceholder}
                    className="pl-10"
                    defaultValue="https://www.viamentor.ch"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hours Tab */}
        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.hours.title}</CardTitle>
              <CardDescription>{t.hours.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "monday", label: t.hours.monday },
                { key: "tuesday", label: t.hours.tuesday },
                { key: "wednesday", label: t.hours.wednesday },
                { key: "thursday", label: t.hours.thursday },
                { key: "friday", label: t.hours.friday },
                { key: "saturday", label: t.hours.saturday },
                { key: "sunday", label: t.hours.sunday },
              ].map((day) => (
                <div key={day.key} className="flex items-center gap-4">
                  <div className="w-32">
                    <Label>{day.label}</Label>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      defaultValue={day.key === "sunday" ? "" : "08:00"}
                      disabled={day.key === "sunday"}
                      className="w-32"
                    />

                    <span className="text-muted-foreground">{t.hours.to}</span>
                    <Input
                      type="time"
                      defaultValue={day.key === "sunday" ? "" : "18:00"}
                      disabled={day.key === "sunday"}
                      className="w-32"
                    />
                  </div>
                  <Switch defaultChecked={day.key !== "sunday"} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.preferences.notifications.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>
                    {t.preferences.notifications.emailNotifications}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t.preferences.notifications.emailNotificationsDesc}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.preferences.notifications.smsNotifications}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.preferences.notifications.smsNotificationsDesc}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.preferences.notifications.pushNotifications}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.preferences.notifications.pushNotificationsDesc}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.preferences.booking.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.preferences.booking.autoConfirm}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.preferences.booking.autoConfirmDesc}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAdvance">
                    {t.preferences.booking.minAdvance}
                  </Label>
                  <Input
                    id="minAdvance"
                    type="number"
                    defaultValue="24"
                    min="1"
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.preferences.booking.minAdvanceDesc}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAdvance">
                    {t.preferences.booking.maxAdvance}
                  </Label>
                  <Input
                    id="maxAdvance"
                    type="number"
                    defaultValue="90"
                    min="1"
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.preferences.booking.maxAdvanceDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.preferences.cancellation.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.preferences.cancellation.allowCancellation}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t.preferences.cancellation.allowCancellationDesc}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellationDeadline">
                  {t.preferences.cancellation.cancellationDeadline}
                </Label>
                <Input
                  id="cancellationDeadline"
                  type="number"
                  defaultValue="48"
                  min="1"
                />

                <p className="text-xs text-muted-foreground">
                  {t.preferences.cancellation.cancellationDeadlineDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
