/**
 * VIAMENTOR - Notifications i18n
 * Traductions pour paramètres notifications
 */

import type { TemplateLanguage } from "@/viamentor/data/viamentor-notifications-data";

export type NotificationsLocale = "fr" | "de" | "it" | "en";

export const notificationsTranslations: Record<
  NotificationsLocale,
  {
    title: string;
    channels: {
      title: string;
      description: string;
      email: {
        title: string;
        enabled: string;
        useDefault: string;
        customHost: string;
        port: string;
        username: string;
        password: string;
        testEmail: string;
        testButton: string;
        testSuccess: string;
        testError: string;
      };
      sms: {
        title: string;
        enabled: string;
        provider: string;
        apiKey: string;
        senderName: string;
        monthlyBudget: string;
        currentUsage: string;
        budgetWarning: string;
        testButton: string;
        testNumber: string;
      };
      push: {
        title: string;
        enabled: string;
        credentials: string;
      };
      whatsapp: {
        title: string;
        enabled: string;
        apiKey: string;
      };
    };
    triggers: {
      title: string;
      description: string;
      addButton: string;
      table: {
        event: string;
        channels: string;
        recipients: string;
        delay: string;
        active: string;
        template: string;
        actions: string;
      };
      events: {
        student_registration: string;
        lesson_booked: string;
        invoice_issued: string;
        payment_reminder: string;
        exam_passed: string;
        student_birthday: string;
        lesson_cancelled: string;
        document_uploaded: string;
        instructor_assigned: string;
      };
      recipients: {
        student: string;
        instructor: string;
        admin: string;
        all: string;
      };
      delay: {
        immediate: string;
        hours_before: string;
        days_before: string;
      };
    };
    emailTemplates: {
      title: string;
      description: string;
      createButton: string;
      table: {
        name: string;
        language: string;
        event: string;
        lastModified: string;
        actions: string;
      };
      editor: {
        title: string;
        subject: string;
        body: string;
        footer: string;
        preview: string;
        variables: string;
        save: string;
      };
    };
    smsTemplates: {
      title: string;
      description: string;
      characterLimit: string;
      characterCount: string;
      splitWarning: string;
    };
    preferences: {
      title: string;
      description: string;
      testMode: {
        title: string;
        description: string;
        testEmail: string;
      };
      throttling: {
        title: string;
        enabled: string;
        maxEmailsPerHour: string;
        maxSMSPerHour: string;
      };
      timezone: string;
      retry: {
        title: string;
        enabled: string;
        maxAttempts: string;
        delayMinutes: string;
      };
      tracking: {
        title: string;
        enabled: string;
        informRecipients: string;
        gdprInfo: string;
      };
    };
    lists: {
      title: string;
      description: string;
      createButton: string;
      table: {
        name: string;
        description: string;
        subscribers: string;
        type: string;
        criteria: string;
        actions: string;
      };
      types: {
        automatic: string;
        manual: string;
      };
    };
    actions: {
      save: string;
      cancel: string;
      edit: string;
      duplicate: string;
      delete: string;
      preview: string;
      export: string;
      reset: string;
    };
    messages: {
      saveSuccess: string;
      saveError: string;
      deleteConfirm: string;
      resetConfirm: string;
    };
  }
> = {
  fr: {
    title: "Notifications & Communications",
    channels: {
      title: "Canaux de communication",
      description: "Configurer les méthodes d'envoi",
      email: {
        title: "Notifications Email",
        enabled: "Activer les emails",
        useDefault: "Utiliser Resend (par défaut)",
        customHost: "Serveur SMTP personnalisé",
        port: "Port",
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        testEmail: "Email de test",
        testButton: "Tester l'envoi",
        testSuccess: "Email de test envoyé avec succès",
        testError: "Erreur lors de l'envoi du test",
      },
      sms: {
        title: "Notifications SMS",
        enabled: "Activer les SMS",
        provider: "Fournisseur",
        apiKey: "Clé API",
        senderName: "Nom de l'expéditeur",
        monthlyBudget: "Budget mensuel (CHF)",
        currentUsage: "Utilisation actuelle",
        budgetWarning: "Attention: 80% du budget atteint",
        testButton: "Tester SMS",
        testNumber: "Numéro de test",
      },
      push: {
        title: "Notifications Push",
        enabled: "Activer les notifications push",
        credentials: "Identifiants Firebase (JSON)",
      },
      whatsapp: {
        title: "Notifications WhatsApp",
        enabled: "Activer WhatsApp Business",
        apiKey: "Clé API Business",
      },
    },
    triggers: {
      title: "Événements déclencheurs",
      description: "Configurer les envois automatiques par événement",
      addButton: "Ajouter un déclencheur",
      table: {
        event: "Événement",
        channels: "Canaux",
        recipients: "Destinataires",
        delay: "Délai",
        active: "Actif",
        template: "Template",
        actions: "Actions",
      },
      events: {
        student_registration: "Nouvelle inscription élève",
        lesson_booked: "Leçon réservée",
        invoice_issued: "Facture émise",
        payment_reminder: "Rappel de paiement",
        exam_passed: "Examen réussi",
        student_birthday: "Anniversaire élève",
        lesson_cancelled: "Leçon annulée",
        document_uploaded: "Document téléchargé",
        instructor_assigned: "Moniteur assigné",
      },
      recipients: {
        student: "Élève",
        instructor: "Moniteur",
        admin: "Admin",
        all: "Tous",
      },
      delay: {
        immediate: "Immédiat",
        hours_before: "heures avant",
        days_before: "jours avant",
      },
    },
    emailTemplates: {
      title: "Templates Emails",
      description: "Personnaliser les modèles d'emails transactionnels",
      createButton: "Créer un template",
      table: {
        name: "Nom",
        language: "Langue",
        event: "Événement lié",
        lastModified: "Dernière modification",
        actions: "Actions",
      },
      editor: {
        title: "Éditeur de template email",
        subject: "Objet",
        body: "Corps du message",
        footer: "Signature",
        preview: "Aperçu",
        variables: "Variables disponibles",
        save: "Enregistrer",
      },
    },
    smsTemplates: {
      title: "Templates SMS",
      description: "Messages courts (contrainte 160 caractères)",
      characterLimit: "Limite de caractères",
      characterCount: "caractères",
      splitWarning: "Attention: Le message sera divisé en plusieurs SMS",
    },
    preferences: {
      title: "Préférences d'envoi",
      description: "Règles globales d'expédition",
      testMode: {
        title: "Mode test",
        description:
          "Envoyer tous les emails/SMS à l'adresse de test uniquement",
        testEmail: "Email de test",
      },
      throttling: {
        title: "Limitation des envois",
        enabled: "Activer le throttling",
        maxEmailsPerHour: "Max emails/heure",
        maxSMSPerHour: "Max SMS/heure",
      },
      timezone: "Fuseau horaire",
      retry: {
        title: "Réessayer en cas d'échec",
        enabled: "Activer les tentatives automatiques",
        maxAttempts: "Nombre de tentatives",
        delayMinutes: "Délai entre tentatives (min)",
      },
      tracking: {
        title: "Suivi des ouvertures",
        enabled: "Activer le tracking",
        informRecipients: "Informer les destinataires",
        gdprInfo: "Conforme RGPD - Mention ajoutée au footer",
      },
    },
    lists: {
      title: "Listes de distribution",
      description: "Groupes de destinataires pour newsletters et annonces",
      createButton: "Créer une liste",
      table: {
        name: "Nom",
        description: "Description",
        subscribers: "Abonnés",
        type: "Type",
        criteria: "Critères",
        actions: "Actions",
      },
      types: {
        automatic: "Automatique",
        manual: "Manuelle",
      },
    },
    actions: {
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      duplicate: "Dupliquer",
      delete: "Supprimer",
      preview: "Prévisualiser",
      export: "Exporter",
      reset: "Réinitialiser",
    },
    messages: {
      saveSuccess: "Configuration sauvegardée avec succès",
      saveError: "Erreur lors de la sauvegarde",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      resetConfirm:
        "Réinitialiser tous les templates par défaut ? Les personnalisations seront perdues.",
    },
  },
  de: {
    title: "Benachrichtigungen & Kommunikation",
    channels: {
      title: "Kommunikationskanäle",
      description: "Versandmethoden konfigurieren",
      email: {
        title: "E-Mail-Benachrichtigungen",
        enabled: "E-Mails aktivieren",
        useDefault: "Resend verwenden (Standard)",
        customHost: "Benutzerdefinierter SMTP-Server",
        port: "Port",
        username: "Benutzername",
        password: "Passwort",
        testEmail: "Test-E-Mail",
        testButton: "Versand testen",
        testSuccess: "Test-E-Mail erfolgreich gesendet",
        testError: "Fehler beim Senden des Tests",
      },
      sms: {
        title: "SMS-Benachrichtigungen",
        enabled: "SMS aktivieren",
        provider: "Anbieter",
        apiKey: "API-Schlüssel",
        senderName: "Absendername",
        monthlyBudget: "Monatsbudget (CHF)",
        currentUsage: "Aktuelle Nutzung",
        budgetWarning: "Achtung: 80% des Budgets erreicht",
        testButton: "SMS testen",
        testNumber: "Testnummer",
      },
      push: {
        title: "Push-Benachrichtigungen",
        enabled: "Push-Benachrichtigungen aktivieren",
        credentials: "Firebase-Anmeldedaten (JSON)",
      },
      whatsapp: {
        title: "WhatsApp-Benachrichtigungen",
        enabled: "WhatsApp Business aktivieren",
        apiKey: "Business-API-Schlüssel",
      },
    },
    triggers: {
      title: "Ereignis-Trigger",
      description: "Automatische Sendungen nach Ereignis konfigurieren",
      addButton: "Trigger hinzufügen",
      table: {
        event: "Ereignis",
        channels: "Kanäle",
        recipients: "Empfänger",
        delay: "Verzögerung",
        active: "Aktiv",
        template: "Vorlage",
        actions: "Aktionen",
      },
      events: {
        student_registration: "Neue Schüleranmeldung",
        lesson_booked: "Lektion gebucht",
        invoice_issued: "Rechnung ausgestellt",
        payment_reminder: "Zahlungserinnerung",
        exam_passed: "Prüfung bestanden",
        student_birthday: "Schülergeburtstag",
        lesson_cancelled: "Lektion abgesagt",
        document_uploaded: "Dokument hochgeladen",
        instructor_assigned: "Fahrlehrer zugewiesen",
      },
      recipients: {
        student: "Schüler",
        instructor: "Fahrlehrer",
        admin: "Admin",
        all: "Alle",
      },
      delay: {
        immediate: "Sofort",
        hours_before: "Stunden vorher",
        days_before: "Tage vorher",
      },
    },
    emailTemplates: {
      title: "E-Mail-Vorlagen",
      description: "Transaktions-E-Mail-Vorlagen anpassen",
      createButton: "Vorlage erstellen",
      table: {
        name: "Name",
        language: "Sprache",
        event: "Verknüpftes Ereignis",
        lastModified: "Letzte Änderung",
        actions: "Aktionen",
      },
      editor: {
        title: "E-Mail-Vorlagen-Editor",
        subject: "Betreff",
        body: "Nachrichtentext",
        footer: "Signatur",
        preview: "Vorschau",
        variables: "Verfügbare Variablen",
        save: "Speichern",
      },
    },
    smsTemplates: {
      title: "SMS-Vorlagen",
      description: "Kurznachrichten (160 Zeichen Limit)",
      characterLimit: "Zeichenlimit",
      characterCount: "Zeichen",
      splitWarning: "Achtung: Nachricht wird in mehrere SMS aufgeteilt",
    },
    preferences: {
      title: "Versandeinstellungen",
      description: "Globale Versandregeln",
      testMode: {
        title: "Testmodus",
        description: "Alle E-Mails/SMS nur an Testadresse senden",
        testEmail: "Test-E-Mail",
      },
      throttling: {
        title: "Versandbegrenzung",
        enabled: "Throttling aktivieren",
        maxEmailsPerHour: "Max E-Mails/Stunde",
        maxSMSPerHour: "Max SMS/Stunde",
      },
      timezone: "Zeitzone",
      retry: {
        title: "Bei Fehler wiederholen",
        enabled: "Automatische Versuche aktivieren",
        maxAttempts: "Anzahl Versuche",
        delayMinutes: "Verzögerung zwischen Versuchen (Min)",
      },
      tracking: {
        title: "Öffnungs-Tracking",
        enabled: "Tracking aktivieren",
        informRecipients: "Empfänger informieren",
        gdprInfo: "DSGVO-konform - Hinweis im Footer",
      },
    },
    lists: {
      title: "Verteilerlisten",
      description: "Empfängergruppen für Newsletter und Ankündigungen",
      createButton: "Liste erstellen",
      table: {
        name: "Name",
        description: "Beschreibung",
        subscribers: "Abonnenten",
        type: "Typ",
        criteria: "Kriterien",
        actions: "Aktionen",
      },
      types: {
        automatic: "Automatisch",
        manual: "Manuell",
      },
    },
    actions: {
      save: "Speichern",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      duplicate: "Duplizieren",
      delete: "Löschen",
      preview: "Vorschau",
      export: "Exportieren",
      reset: "Zurücksetzen",
    },
    messages: {
      saveSuccess: "Konfiguration erfolgreich gespeichert",
      saveError: "Fehler beim Speichern",
      deleteConfirm: "Möchten Sie dieses Element wirklich löschen?",
      resetConfirm:
        "Alle Standardvorlagen zurücksetzen? Anpassungen gehen verloren.",
    },
  },
  it: {
    title: "Notifiche & Comunicazioni",
    channels: {
      title: "Canali di comunicazione",
      description: "Configurare i metodi di invio",
      email: {
        title: "Notifiche Email",
        enabled: "Attiva email",
        useDefault: "Usa Resend (predefinito)",
        customHost: "Server SMTP personalizzato",
        port: "Porta",
        username: "Nome utente",
        password: "Password",
        testEmail: "Email di test",
        testButton: "Testa invio",
        testSuccess: "Email di test inviata con successo",
        testError: "Errore durante l'invio del test",
      },
      sms: {
        title: "Notifiche SMS",
        enabled: "Attiva SMS",
        provider: "Fornitore",
        apiKey: "Chiave API",
        senderName: "Nome mittente",
        monthlyBudget: "Budget mensile (CHF)",
        currentUsage: "Utilizzo attuale",
        budgetWarning: "Attenzione: 80% del budget raggiunto",
        testButton: "Testa SMS",
        testNumber: "Numero di test",
      },
      push: {
        title: "Notifiche Push",
        enabled: "Attiva notifiche push",
        credentials: "Credenziali Firebase (JSON)",
      },
      whatsapp: {
        title: "Notifiche WhatsApp",
        enabled: "Attiva WhatsApp Business",
        apiKey: "Chiave API Business",
      },
    },
    triggers: {
      title: "Eventi trigger",
      description: "Configurare invii automatici per evento",
      addButton: "Aggiungi trigger",
      table: {
        event: "Evento",
        channels: "Canali",
        recipients: "Destinatari",
        delay: "Ritardo",
        active: "Attivo",
        template: "Template",
        actions: "Azioni",
      },
      events: {
        student_registration: "Nuova iscrizione allievo",
        lesson_booked: "Lezione prenotata",
        invoice_issued: "Fattura emessa",
        payment_reminder: "Promemoria pagamento",
        exam_passed: "Esame superato",
        student_birthday: "Compleanno allievo",
        lesson_cancelled: "Lezione annullata",
        document_uploaded: "Documento caricato",
        instructor_assigned: "Istruttore assegnato",
      },
      recipients: {
        student: "Allievo",
        instructor: "Istruttore",
        admin: "Admin",
        all: "Tutti",
      },
      delay: {
        immediate: "Immediato",
        hours_before: "ore prima",
        days_before: "giorni prima",
      },
    },
    emailTemplates: {
      title: "Template Email",
      description: "Personalizzare i modelli di email transazionali",
      createButton: "Crea template",
      table: {
        name: "Nome",
        language: "Lingua",
        event: "Evento collegato",
        lastModified: "Ultima modifica",
        actions: "Azioni",
      },
      editor: {
        title: "Editor template email",
        subject: "Oggetto",
        body: "Corpo del messaggio",
        footer: "Firma",
        preview: "Anteprima",
        variables: "Variabili disponibili",
        save: "Salva",
      },
    },
    smsTemplates: {
      title: "Template SMS",
      description: "Messaggi brevi (limite 160 caratteri)",
      characterLimit: "Limite caratteri",
      characterCount: "caratteri",
      splitWarning: "Attenzione: Il messaggio sarà diviso in più SMS",
    },
    preferences: {
      title: "Preferenze di invio",
      description: "Regole globali di spedizione",
      testMode: {
        title: "Modalità test",
        description: "Invia tutte le email/SMS solo all'indirizzo di test",
        testEmail: "Email di test",
      },
      throttling: {
        title: "Limitazione invii",
        enabled: "Attiva throttling",
        maxEmailsPerHour: "Max email/ora",
        maxSMSPerHour: "Max SMS/ora",
      },
      timezone: "Fuso orario",
      retry: {
        title: "Riprova in caso di errore",
        enabled: "Attiva tentativi automatici",
        maxAttempts: "Numero di tentativi",
        delayMinutes: "Ritardo tra tentativi (min)",
      },
      tracking: {
        title: "Tracciamento aperture",
        enabled: "Attiva tracking",
        informRecipients: "Informa i destinatari",
        gdprInfo: "Conforme GDPR - Nota aggiunta al footer",
      },
    },
    lists: {
      title: "Liste di distribuzione",
      description: "Gruppi di destinatari per newsletter e annunci",
      createButton: "Crea lista",
      table: {
        name: "Nome",
        description: "Descrizione",
        subscribers: "Iscritti",
        type: "Tipo",
        criteria: "Criteri",
        actions: "Azioni",
      },
      types: {
        automatic: "Automatica",
        manual: "Manuale",
      },
    },
    actions: {
      save: "Salva",
      cancel: "Annulla",
      edit: "Modifica",
      duplicate: "Duplica",
      delete: "Elimina",
      preview: "Anteprima",
      export: "Esporta",
      reset: "Ripristina",
    },
    messages: {
      saveSuccess: "Configurazione salvata con successo",
      saveError: "Errore durante il salvataggio",
      deleteConfirm: "Sei sicuro di voler eliminare questo elemento?",
      resetConfirm:
        "Ripristinare tutti i template predefiniti? Le personalizzazioni andranno perse.",
    },
  },
  en: {
    title: "Notifications & Communications",
    channels: {
      title: "Communication Channels",
      description: "Configure sending methods",
      email: {
        title: "Email Notifications",
        enabled: "Enable emails",
        useDefault: "Use Resend (default)",
        customHost: "Custom SMTP server",
        port: "Port",
        username: "Username",
        password: "Password",
        testEmail: "Test email",
        testButton: "Test sending",
        testSuccess: "Test email sent successfully",
        testError: "Error sending test",
      },
      sms: {
        title: "SMS Notifications",
        enabled: "Enable SMS",
        provider: "Provider",
        apiKey: "API Key",
        senderName: "Sender name",
        monthlyBudget: "Monthly budget (CHF)",
        currentUsage: "Current usage",
        budgetWarning: "Warning: 80% of budget reached",
        testButton: "Test SMS",
        testNumber: "Test number",
      },
      push: {
        title: "Push Notifications",
        enabled: "Enable push notifications",
        credentials: "Firebase credentials (JSON)",
      },
      whatsapp: {
        title: "WhatsApp Notifications",
        enabled: "Enable WhatsApp Business",
        apiKey: "Business API Key",
      },
    },
    triggers: {
      title: "Event Triggers",
      description: "Configure automatic sends by event",
      addButton: "Add trigger",
      table: {
        event: "Event",
        channels: "Channels",
        recipients: "Recipients",
        delay: "Delay",
        active: "Active",
        template: "Template",
        actions: "Actions",
      },
      events: {
        student_registration: "New student registration",
        lesson_booked: "Lesson booked",
        invoice_issued: "Invoice issued",
        payment_reminder: "Payment reminder",
        exam_passed: "Exam passed",
        student_birthday: "Student birthday",
        lesson_cancelled: "Lesson cancelled",
        document_uploaded: "Document uploaded",
        instructor_assigned: "Instructor assigned",
      },
      recipients: {
        student: "Student",
        instructor: "Instructor",
        admin: "Admin",
        all: "All",
      },
      delay: {
        immediate: "Immediate",
        hours_before: "hours before",
        days_before: "days before",
      },
    },
    emailTemplates: {
      title: "Email Templates",
      description: "Customize transactional email templates",
      createButton: "Create template",
      table: {
        name: "Name",
        language: "Language",
        event: "Linked event",
        lastModified: "Last modified",
        actions: "Actions",
      },
      editor: {
        title: "Email template editor",
        subject: "Subject",
        body: "Message body",
        footer: "Signature",
        preview: "Preview",
        variables: "Available variables",
        save: "Save",
      },
    },
    smsTemplates: {
      title: "SMS Templates",
      description: "Short messages (160 character limit)",
      characterLimit: "Character limit",
      characterCount: "characters",
      splitWarning: "Warning: Message will be split into multiple SMS",
    },
    preferences: {
      title: "Sending Preferences",
      description: "Global sending rules",
      testMode: {
        title: "Test mode",
        description: "Send all emails/SMS to test address only",
        testEmail: "Test email",
      },
      throttling: {
        title: "Send throttling",
        enabled: "Enable throttling",
        maxEmailsPerHour: "Max emails/hour",
        maxSMSPerHour: "Max SMS/hour",
      },
      timezone: "Timezone",
      retry: {
        title: "Retry on failure",
        enabled: "Enable automatic retries",
        maxAttempts: "Number of attempts",
        delayMinutes: "Delay between attempts (min)",
      },
      tracking: {
        title: "Open tracking",
        enabled: "Enable tracking",
        informRecipients: "Inform recipients",
        gdprInfo: "GDPR compliant - Notice added to footer",
      },
    },
    lists: {
      title: "Distribution Lists",
      description: "Recipient groups for newsletters and announcements",
      createButton: "Create list",
      table: {
        name: "Name",
        description: "Description",
        subscribers: "Subscribers",
        type: "Type",
        criteria: "Criteria",
        actions: "Actions",
      },
      types: {
        automatic: "Automatic",
        manual: "Manual",
      },
    },
    actions: {
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      duplicate: "Duplicate",
      delete: "Delete",
      preview: "Preview",
      export: "Export",
      reset: "Reset",
    },
    messages: {
      saveSuccess: "Configuration saved successfully",
      saveError: "Error saving",
      deleteConfirm: "Are you sure you want to delete this item?",
      resetConfirm: "Reset all default templates? Customizations will be lost.",
    },
  },
};
