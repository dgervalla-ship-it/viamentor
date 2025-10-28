// ============================================================================
// VIAMENTOR - ICS Import/Export i18n
// Traductions complètes FR/DE/IT/EN pour import/export calendrier + historique
// ============================================================================

export type ICSImportLocale = "fr" | "de" | "it" | "en";

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const icsImportTranslations = {
  fr: {
    page: {
      title: "Importer événements ICS",
      description:
        "Importez vos événements depuis Google Calendar, Outlook ou Apple Calendar",
      breadcrumb: {
        home: "Accueil",
        planning: "Planning",
        import: "Importer calendrier",
      },
    },
    alerts: {
      info: "Importez Google Calendar ou Outlook (.ics). Format iCalendar RFC 5545.",
      warning:
        "Les événements importés seront ajoutés au planning existant. Vérifiez les conflits avant d'importer.",
      success:
        "Import réussi ! {count} événements ont été ajoutés au planning.",
      error:
        "Erreur lors de l'import. Veuillez vérifier le fichier et réessayer.",
    },
    wizard: {
      steps: {
        upload: "Télécharger",
        preview: "Prévisualiser",
        configure: "Configurer",
        validate: "Valider",
      },
      upload: {
        title: "Sélectionner fichier",
        description:
          "Glissez-déposez votre fichier ICS ou cliquez pour parcourir",
        browse: "Parcourir",
        formats: "Formats: .ics, .ical (Google/Outlook/Apple)",
        maxSize: "Taille maximale: 10 MB",
        uploading: "Téléchargement en cours...",
        parsing: "Analyse du fichier...",
      },
      configure: {
        title: "Configuration",
        description: "Configurez les paramètres d'import",
        eventType: "Type d'événement par défaut",
        instructor: "Moniteur par défaut",
        vehicle: "Véhicule par défaut",
        createStudents: "Créer les élèves manquants",
        sendNotifications: "Envoyer les notifications",
        importRecurrences: "Importer les récurrences",
      },
      validate: {
        title: "Résumé",
        description: "Vérifiez les événements avant l'import",
        events: "événements",
        new: "Nouveaux",
        duplicates: "Doublons",
        conflicts: "Conflits à résoudre",
        estimate: "Import estimé",
        confirm: "Confirmer l'import",
        importing: "Import en cours...",
      },
    },
    preview: {
      title: "Événements à importer",
      description: "Sélectionnez les événements à importer",
      search: "Rechercher...",
      filters: {
        all: "Tous",
        new: "Nouveaux uniquement",
        conflicts: "Avec conflits",
        status: "Statut",
      },
      columns: {
        select: "Sélectionner",
        title: "Titre",
        startDate: "Date début",
        endDate: "Date fin",
        duration: "Durée",
        location: "Lieu",
        attendees: "Participants",
        recurrence: "Récurrence",
        status: "Statut",
        actions: "Actions",
      },
      status: {
        new: "Nouveau",
        duplicate: "Doublon",
        conflict: "Conflit",
      },
      recurrence: {
        daily: "Quotidien",
        weekly: "Hebdomadaire",
        monthly: "Mensuel",
        yearly: "Annuel",
      },
      actions: {
        view: "Voir détail",
        edit: "Modifier",
        exclude: "Exclure",
        selectAll: "Tout sélectionner",
        deselectAll: "Tout désélectionner",
      },
      detail: {
        title: "Détail de l'événement",
        description: "Description",
        organizer: "Organisateur",
        noDescription: "Aucune description",
      },
      stats: {
        total: "Total",
        selected: "Sélectionnés",
        new: "Nouveaux",
        duplicates: "Doublons",
        conflicts: "Conflits",
      },
    },
    conflicts: {
      title: "Conflits détectés",
      description: "Résolvez les conflits avant d'importer",
      noConflicts: "Aucun conflit détecté",
      types: {
        instructor: "Moniteur occupé",
        vehicle: "Véhicule occupé",
        student: "Élève déjà réservé",
        room: "Salle occupée",
      },
      severity: {
        critical: "Critique",
        warning: "Attention",
        info: "Information",
      },
      suggestions: {
        title: "Suggestions de résolution",
        reschedule: "Décaler",
        changeResource: "Changer ressource",
        split: "Diviser",
        exclude: "Exclure",
      },
      actions: {
        apply: "Appliquer",
        exclude: "Exclure l'événement",
        viewDetails: "Voir détails",
      },
      stats: {
        total: "Total",
        critical: "Critiques",
        warning: "Attention",
        resolved: "Résolus",
      },
    },
    actions: {
      next: "Suivant",
      previous: "Précédent",
      cancel: "Annuler",
      import: "Importer",
      close: "Fermer",
    },
    // Export ICS
    export: {
      page: {
        title: "Exporter calendrier",
        description:
          "Générer un fichier ICS pour Google Calendar, Outlook ou Apple Calendar",
      },
      card: {
        title: "Créer fichier ICS",
        description:
          "Sélectionnez la période et les types d'événements à exporter",
      },
      period: {
        label: "Période d'export",
        placeholder: "Sélectionner les dates",
        currentMonth: "Mois en cours",
        lastMonth: "Mois dernier",
        nextMonth: "Mois prochain",
        custom: "Période personnalisée",
      },
      eventTypes: {
        label: "Types d'événements",
        all: "Tout",
        lessons: "Leçons",
        theory: "Cours théoriques",
        exams: "Examens",
        meetings: "Réunions",
        maintenance: "Maintenance",
      },
      options: {
        includePrivate: "Inclure détails privés",
        privateHelp: "Emails, téléphones, adresses (admin uniquement)",
      },
      actions: {
        download: "Télécharger .ics",
        downloading: "Génération du fichier...",
      },
      success: "Fichier généré avec succès",
      error: "Erreur lors de la génération du fichier",
    },
    // Historique imports
    history: {
      page: {
        title: "Historique des imports",
        description: "Consultez et gérez les imports de calendrier",
        breadcrumb: {
          home: "Accueil",
          planning: "Planning",
          history: "Historique imports",
        },
      },
      timeline: {
        title: "Imports récents",
        empty: "Aucun import pour le moment",
        importedOn: "Importé le",
        importedBy: "par",
        ago: "il y a",
        file: "Fichier",
        user: "Utilisateur",
      },
      stats: {
        created: "événements créés",
        skipped: "ignorés",
        errors: "erreurs",
      },
      actions: {
        viewDetails: "Voir détails",
        rollback: "Annuler import",
      },
      details: {
        title: "Détails de l'import",
        created: "Événements créés",
        skipped: "Événements ignorés",
        errors: "Erreurs",
        noCreated: "Aucun événement créé",
        noSkipped: "Aucun événement ignoré",
        noErrors: "Aucune erreur",
      },
      metrics: {
        title: "Métriques des imports",
        totalImports: "Total imports",
        totalEvents: "Événements importés",
        errorRate: "Taux d'erreurs",
        avgEvents: "Moyenne événements par import",
        sources: "Distribution des sources",
        evolution: "Évolution des imports",
      },
    },
    // Rollback
    rollback: {
      dialog: {
        title: "Annuler l'import ?",
        description:
          "Cette action supprimera tous les événements créés par cet import",
        warning: "Supprimera {count} événements créés - Action irréversible",
        understand: "Je comprends les conséquences",
        reason: "Raison (optionnel)",
        reasonPlaceholder: "Ex: Doublon accidentel",
        confirm: "Confirmer l'annulation",
        confirming: "Annulation en cours...",
        progress: "Suppression {current}/{total}...",
      },
      success: "Import annulé - {count} événements supprimés",
      error: "Erreur lors de l'annulation de l'import",
    },
  },
  de: {
    page: {
      title: "ICS-Ereignisse importieren",
      description:
        "Importieren Sie Ihre Ereignisse aus Google Calendar, Outlook oder Apple Calendar",
      breadcrumb: {
        home: "Startseite",
        planning: "Planung",
        import: "Kalender importieren",
      },
    },
    alerts: {
      info: "Importieren Sie Google Calendar oder Outlook (.ics). iCalendar RFC 5545 Format.",
      warning:
        "Die importierten Ereignisse werden zum bestehenden Plan hinzugefügt. Überprüfen Sie Konflikte vor dem Import.",
      success:
        "Import erfolgreich! {count} Ereignisse wurden zum Plan hinzugefügt.",
      error:
        "Fehler beim Import. Bitte überprüfen Sie die Datei und versuchen Sie es erneut.",
    },
    wizard: {
      steps: {
        upload: "Hochladen",
        preview: "Vorschau",
        configure: "Konfigurieren",
        validate: "Validieren",
      },
      upload: {
        title: "Datei auswählen",
        description:
          "Ziehen Sie Ihre ICS-Datei hierher oder klicken Sie zum Durchsuchen",
        browse: "Durchsuchen",
        formats: "Formate: .ics, .ical (Google/Outlook/Apple)",
        maxSize: "Maximale Größe: 10 MB",
        uploading: "Hochladen...",
        parsing: "Datei wird analysiert...",
      },
      configure: {
        title: "Konfiguration",
        description: "Import-Einstellungen konfigurieren",
        eventType: "Standard-Ereignistyp",
        instructor: "Standard-Lehrer",
        vehicle: "Standard-Fahrzeug",
        createStudents: "Fehlende Schüler erstellen",
        sendNotifications: "Benachrichtigungen senden",
        importRecurrences: "Wiederholungen importieren",
      },
      validate: {
        title: "Zusammenfassung",
        description: "Überprüfen Sie die Ereignisse vor dem Import",
        events: "Ereignisse",
        new: "Neu",
        duplicates: "Duplikate",
        conflicts: "Zu lösende Konflikte",
        estimate: "Geschätzter Import",
        confirm: "Import bestätigen",
        importing: "Import läuft...",
      },
    },
    preview: {
      title: "Zu importierende Ereignisse",
      description: "Wählen Sie die zu importierenden Ereignisse aus",
      search: "Suchen...",
      filters: {
        all: "Alle",
        new: "Nur neue",
        conflicts: "Mit Konflikten",
        status: "Status",
      },
      columns: {
        select: "Auswählen",
        title: "Titel",
        startDate: "Startdatum",
        endDate: "Enddatum",
        duration: "Dauer",
        location: "Ort",
        attendees: "Teilnehmer",
        recurrence: "Wiederholung",
        status: "Status",
        actions: "Aktionen",
      },
      status: {
        new: "Neu",
        duplicate: "Duplikat",
        conflict: "Konflikt",
      },
      recurrence: {
        daily: "Täglich",
        weekly: "Wöchentlich",
        monthly: "Monatlich",
        yearly: "Jährlich",
      },
      actions: {
        view: "Details anzeigen",
        edit: "Bearbeiten",
        exclude: "Ausschließen",
        selectAll: "Alle auswählen",
        deselectAll: "Alle abwählen",
      },
      detail: {
        title: "Ereignisdetails",
        description: "Beschreibung",
        organizer: "Organisator",
        noDescription: "Keine Beschreibung",
      },
      stats: {
        total: "Gesamt",
        selected: "Ausgewählt",
        new: "Neu",
        duplicates: "Duplikate",
        conflicts: "Konflikte",
      },
    },
    conflicts: {
      title: "Erkannte Konflikte",
      description: "Lösen Sie Konflikte vor dem Import",
      noConflicts: "Keine Konflikte erkannt",
      types: {
        instructor: "Lehrer beschäftigt",
        vehicle: "Fahrzeug besetzt",
        student: "Schüler bereits gebucht",
        room: "Raum besetzt",
      },
      severity: {
        critical: "Kritisch",
        warning: "Warnung",
        info: "Information",
      },
      suggestions: {
        title: "Lösungsvorschläge",
        reschedule: "Verschieben",
        changeResource: "Ressource ändern",
        split: "Teilen",
        exclude: "Ausschließen",
      },
      actions: {
        apply: "Anwenden",
        exclude: "Ereignis ausschließen",
        viewDetails: "Details anzeigen",
      },
      stats: {
        total: "Gesamt",
        critical: "Kritisch",
        warning: "Warnung",
        resolved: "Gelöst",
      },
    },
    actions: {
      next: "Weiter",
      previous: "Zurück",
      cancel: "Abbrechen",
      import: "Importieren",
      close: "Schließen",
    },
    // Export ICS
    export: {
      page: {
        title: "Kalender exportieren",
        description:
          "ICS-Datei für Google Calendar, Outlook oder Apple Calendar generieren",
      },
      card: {
        title: "ICS-Datei erstellen",
        description: "Wählen Sie Zeitraum und Ereignistypen zum Exportieren",
      },
      period: {
        label: "Exportzeitraum",
        placeholder: "Daten auswählen",
        currentMonth: "Aktueller Monat",
        lastMonth: "Letzter Monat",
        nextMonth: "Nächster Monat",
        custom: "Benutzerdefinierter Zeitraum",
      },
      eventTypes: {
        label: "Ereignistypen",
        all: "Alle",
        lessons: "Lektionen",
        theory: "Theoriekurse",
        exams: "Prüfungen",
        meetings: "Besprechungen",
        maintenance: "Wartung",
      },
      options: {
        includePrivate: "Private Details einschließen",
        privateHelp: "E-Mails, Telefone, Adressen (nur Admin)",
      },
      actions: {
        download: ".ics herunterladen",
        downloading: "Datei wird generiert...",
      },
      success: "Datei erfolgreich generiert",
      error: "Fehler beim Generieren der Datei",
    },
    // Import-Verlauf
    history: {
      page: {
        title: "Import-Verlauf",
        description: "Kalenderimporte anzeigen und verwalten",
        breadcrumb: {
          home: "Startseite",
          planning: "Planung",
          history: "Import-Verlauf",
        },
      },
      timeline: {
        title: "Letzte Importe",
        empty: "Noch keine Importe",
        importedOn: "Importiert am",
        importedBy: "von",
        ago: "vor",
        file: "Datei",
        user: "Benutzer",
      },
      stats: {
        created: "Ereignisse erstellt",
        skipped: "ignoriert",
        errors: "Fehler",
      },
      actions: {
        viewDetails: "Details anzeigen",
        rollback: "Import stornieren",
      },
      details: {
        title: "Import-Details",
        created: "Erstellte Ereignisse",
        skipped: "Übersprungene Ereignisse",
        errors: "Fehler",
        noCreated: "Keine Ereignisse erstellt",
        noSkipped: "Keine Ereignisse übersprungen",
        noErrors: "Keine Fehler",
      },
      metrics: {
        title: "Import-Metriken",
        totalImports: "Gesamtimporte",
        totalEvents: "Importierte Ereignisse",
        errorRate: "Fehlerrate",
        avgEvents: "Durchschnittliche Ereignisse pro Import",
        sources: "Quellenverteilung",
        evolution: "Import-Entwicklung",
      },
    },
    // Rollback
    rollback: {
      dialog: {
        title: "Import stornieren?",
        description:
          "Diese Aktion löscht alle durch diesen Import erstellten Ereignisse",
        warning: "Löscht {count} erstellte Ereignisse - Unwiderrufliche Aktion",
        understand: "Ich verstehe die Konsequenzen",
        reason: "Grund (optional)",
        reasonPlaceholder: "Z.B.: Versehentliches Duplikat",
        confirm: "Stornierung bestätigen",
        confirming: "Stornierung läuft...",
        progress: "Löschen {current}/{total}...",
      },
      success: "Import storniert - {count} Ereignisse gelöscht",
      error: "Fehler beim Stornieren des Imports",
    },
  },
  it: {
    page: {
      title: "Importa eventi ICS",
      description:
        "Importa i tuoi eventi da Google Calendar, Outlook o Apple Calendar",
      breadcrumb: {
        home: "Home",
        planning: "Pianificazione",
        import: "Importa calendario",
      },
    },
    alerts: {
      info: "Importa Google Calendar o Outlook (.ics). Formato iCalendar RFC 5545.",
      warning:
        "Gli eventi importati verranno aggiunti alla pianificazione esistente. Verifica i conflitti prima di importare.",
      success:
        "Importazione riuscita! {count} eventi sono stati aggiunti alla pianificazione.",
      error: "Errore durante l'importazione. Verifica il file e riprova.",
    },
    wizard: {
      steps: {
        upload: "Carica",
        preview: "Anteprima",
        configure: "Configura",
        validate: "Valida",
      },
      upload: {
        title: "Seleziona file",
        description: "Trascina il tuo file ICS o clicca per sfogliare",
        browse: "Sfoglia",
        formats: "Formati: .ics, .ical (Google/Outlook/Apple)",
        maxSize: "Dimensione massima: 10 MB",
        uploading: "Caricamento...",
        parsing: "Analisi del file...",
      },
      configure: {
        title: "Configurazione",
        description: "Configura le impostazioni di importazione",
        eventType: "Tipo di evento predefinito",
        instructor: "Istruttore predefinito",
        vehicle: "Veicolo predefinito",
        createStudents: "Crea studenti mancanti",
        sendNotifications: "Invia notifiche",
        importRecurrences: "Importa ricorrenze",
      },
      validate: {
        title: "Riepilogo",
        description: "Verifica gli eventi prima dell'importazione",
        events: "eventi",
        new: "Nuovi",
        duplicates: "Duplicati",
        conflicts: "Conflitti da risolvere",
        estimate: "Importazione stimata",
        confirm: "Conferma importazione",
        importing: "Importazione in corso...",
      },
    },
    preview: {
      title: "Eventi da importare",
      description: "Seleziona gli eventi da importare",
      search: "Cerca...",
      filters: {
        all: "Tutti",
        new: "Solo nuovi",
        conflicts: "Con conflitti",
        status: "Stato",
      },
      columns: {
        select: "Seleziona",
        title: "Titolo",
        startDate: "Data inizio",
        endDate: "Data fine",
        duration: "Durata",
        location: "Luogo",
        attendees: "Partecipanti",
        recurrence: "Ricorrenza",
        status: "Stato",
        actions: "Azioni",
      },
      status: {
        new: "Nuovo",
        duplicate: "Duplicato",
        conflict: "Conflitto",
      },
      recurrence: {
        daily: "Giornaliero",
        weekly: "Settimanale",
        monthly: "Mensile",
        yearly: "Annuale",
      },
      actions: {
        view: "Vedi dettagli",
        edit: "Modifica",
        exclude: "Escludi",
        selectAll: "Seleziona tutto",
        deselectAll: "Deseleziona tutto",
      },
      detail: {
        title: "Dettagli evento",
        description: "Descrizione",
        organizer: "Organizzatore",
        noDescription: "Nessuna descrizione",
      },
      stats: {
        total: "Totale",
        selected: "Selezionati",
        new: "Nuovi",
        duplicates: "Duplicati",
        conflicts: "Conflitti",
      },
    },
    conflicts: {
      title: "Conflitti rilevati",
      description: "Risolvi i conflitti prima di importare",
      noConflicts: "Nessun conflitto rilevato",
      types: {
        instructor: "Istruttore occupato",
        vehicle: "Veicolo occupato",
        student: "Studente già prenotato",
        room: "Sala occupata",
      },
      severity: {
        critical: "Critico",
        warning: "Attenzione",
        info: "Informazione",
      },
      suggestions: {
        title: "Suggerimenti di risoluzione",
        reschedule: "Spostare",
        changeResource: "Cambiare risorsa",
        split: "Dividere",
        exclude: "Escludere",
      },
      actions: {
        apply: "Applica",
        exclude: "Escludi evento",
        viewDetails: "Vedi dettagli",
      },
      stats: {
        total: "Totale",
        critical: "Critici",
        warning: "Attenzione",
        resolved: "Risolti",
      },
    },
    actions: {
      next: "Avanti",
      previous: "Indietro",
      cancel: "Annulla",
      import: "Importa",
      close: "Chiudi",
    },
    // Export ICS
    export: {
      page: {
        title: "Esporta calendario",
        description:
          "Genera file ICS per Google Calendar, Outlook o Apple Calendar",
      },
      card: {
        title: "Crea file ICS",
        description: "Seleziona periodo e tipi di eventi da esportare",
      },
      period: {
        label: "Periodo di esportazione",
        placeholder: "Seleziona date",
        currentMonth: "Mese corrente",
        lastMonth: "Mese scorso",
        nextMonth: "Mese prossimo",
        custom: "Periodo personalizzato",
      },
      eventTypes: {
        label: "Tipi di eventi",
        all: "Tutti",
        lessons: "Lezioni",
        theory: "Corsi teorici",
        exams: "Esami",
        meetings: "Riunioni",
        maintenance: "Manutenzione",
      },
      options: {
        includePrivate: "Includi dettagli privati",
        privateHelp: "Email, telefoni, indirizzi (solo admin)",
      },
      actions: {
        download: "Scarica .ics",
        downloading: "Generazione file...",
      },
      success: "File generato con successo",
      error: "Errore durante la generazione del file",
    },
    // Cronologia import
    history: {
      page: {
        title: "Cronologia importazioni",
        description: "Visualizza e gestisci le importazioni del calendario",
        breadcrumb: {
          home: "Home",
          planning: "Pianificazione",
          history: "Cronologia importazioni",
        },
      },
      timeline: {
        title: "Importazioni recenti",
        empty: "Nessuna importazione ancora",
        importedOn: "Importato il",
        importedBy: "da",
        ago: "fa",
        file: "File",
        user: "Utente",
      },
      stats: {
        created: "eventi creati",
        skipped: "ignorati",
        errors: "errori",
      },
      actions: {
        viewDetails: "Vedi dettagli",
        rollback: "Annulla importazione",
      },
      details: {
        title: "Dettagli importazione",
        created: "Eventi creati",
        skipped: "Eventi ignorati",
        errors: "Errori",
        noCreated: "Nessun evento creato",
        noSkipped: "Nessun evento ignorato",
        noErrors: "Nessun errore",
      },
      metrics: {
        title: "Metriche importazioni",
        totalImports: "Importazioni totali",
        totalEvents: "Eventi importati",
        errorRate: "Tasso di errori",
        avgEvents: "Media eventi per importazione",
        sources: "Distribuzione sorgenti",
        evolution: "Evoluzione importazioni",
      },
    },
    // Rollback
    rollback: {
      dialog: {
        title: "Annullare importazione?",
        description:
          "Questa azione eliminerà tutti gli eventi creati da questa importazione",
        warning: "Eliminerà {count} eventi creati - Azione irreversibile",
        understand: "Comprendo le conseguenze",
        reason: "Motivo (opzionale)",
        reasonPlaceholder: "Es: Duplicato accidentale",
        confirm: "Conferma annullamento",
        confirming: "Annullamento in corso...",
        progress: "Eliminazione {current}/{total}...",
      },
      success: "Importazione annullata - {count} eventi eliminati",
      error: "Errore durante l'annullamento dell'importazione",
    },
  },
  en: {
    page: {
      title: "Import ICS events",
      description:
        "Import your events from Google Calendar, Outlook or Apple Calendar",
      breadcrumb: {
        home: "Home",
        planning: "Planning",
        import: "Import calendar",
      },
    },
    alerts: {
      info: "Import Google Calendar or Outlook (.ics). iCalendar RFC 5545 format.",
      warning:
        "Imported events will be added to the existing schedule. Check for conflicts before importing.",
      success:
        "Import successful! {count} events have been added to the schedule.",
      error: "Error during import. Please check the file and try again.",
    },
    wizard: {
      steps: {
        upload: "Upload",
        preview: "Preview",
        configure: "Configure",
        validate: "Validate",
      },
      upload: {
        title: "Select file",
        description: "Drag and drop your ICS file or click to browse",
        browse: "Browse",
        formats: "Formats: .ics, .ical (Google/Outlook/Apple)",
        maxSize: "Maximum size: 10 MB",
        uploading: "Uploading...",
        parsing: "Parsing file...",
      },
      configure: {
        title: "Configuration",
        description: "Configure import settings",
        eventType: "Default event type",
        instructor: "Default instructor",
        vehicle: "Default vehicle",
        createStudents: "Create missing students",
        sendNotifications: "Send notifications",
        importRecurrences: "Import recurrences",
      },
      validate: {
        title: "Summary",
        description: "Review events before import",
        events: "events",
        new: "New",
        duplicates: "Duplicates",
        conflicts: "Conflicts to resolve",
        estimate: "Estimated import",
        confirm: "Confirm import",
        importing: "Importing...",
      },
    },
    preview: {
      title: "Events to import",
      description: "Select events to import",
      search: "Search...",
      filters: {
        all: "All",
        new: "New only",
        conflicts: "With conflicts",
        status: "Status",
      },
      columns: {
        select: "Select",
        title: "Title",
        startDate: "Start date",
        endDate: "End date",
        duration: "Duration",
        location: "Location",
        attendees: "Attendees",
        recurrence: "Recurrence",
        status: "Status",
        actions: "Actions",
      },
      status: {
        new: "New",
        duplicate: "Duplicate",
        conflict: "Conflict",
      },
      recurrence: {
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        yearly: "Yearly",
      },
      actions: {
        view: "View details",
        edit: "Edit",
        exclude: "Exclude",
        selectAll: "Select all",
        deselectAll: "Deselect all",
      },
      detail: {
        title: "Event details",
        description: "Description",
        organizer: "Organizer",
        noDescription: "No description",
      },
      stats: {
        total: "Total",
        selected: "Selected",
        new: "New",
        duplicates: "Duplicates",
        conflicts: "Conflicts",
      },
    },
    conflicts: {
      title: "Detected conflicts",
      description: "Resolve conflicts before importing",
      noConflicts: "No conflicts detected",
      types: {
        instructor: "Instructor busy",
        vehicle: "Vehicle occupied",
        student: "Student already booked",
        room: "Room occupied",
      },
      severity: {
        critical: "Critical",
        warning: "Warning",
        info: "Information",
      },
      suggestions: {
        title: "Resolution suggestions",
        reschedule: "Reschedule",
        changeResource: "Change resource",
        split: "Split",
        exclude: "Exclude",
      },
      actions: {
        apply: "Apply",
        exclude: "Exclude event",
        viewDetails: "View details",
      },
      stats: {
        total: "Total",
        critical: "Critical",
        warning: "Warning",
        resolved: "Resolved",
      },
    },
    actions: {
      next: "Next",
      previous: "Previous",
      cancel: "Cancel",
      import: "Import",
      close: "Close",
    },
    // Export ICS
    export: {
      page: {
        title: "Export calendar",
        description:
          "Generate ICS file for Google Calendar, Outlook or Apple Calendar",
      },
      card: {
        title: "Create ICS file",
        description: "Select period and event types to export",
      },
      period: {
        label: "Export period",
        placeholder: "Select dates",
        currentMonth: "Current month",
        lastMonth: "Last month",
        nextMonth: "Next month",
        custom: "Custom period",
      },
      eventTypes: {
        label: "Event types",
        all: "All",
        lessons: "Lessons",
        theory: "Theory courses",
        exams: "Exams",
        meetings: "Meetings",
        maintenance: "Maintenance",
      },
      options: {
        includePrivate: "Include private details",
        privateHelp: "Emails, phones, addresses (admin only)",
      },
      actions: {
        download: "Download .ics",
        downloading: "Generating file...",
      },
      success: "File generated successfully",
      error: "Error generating file",
    },
    // Import History
    history: {
      page: {
        title: "Import history",
        description: "View and manage calendar imports",
        breadcrumb: {
          home: "Home",
          planning: "Planning",
          history: "Import history",
        },
      },
      timeline: {
        title: "Recent imports",
        empty: "No imports yet",
        importedOn: "Imported on",
        importedBy: "by",
        ago: "ago",
        file: "File",
        user: "User",
      },
      stats: {
        created: "events created",
        skipped: "ignored",
        errors: "errors",
      },
      actions: {
        viewDetails: "View details",
        rollback: "Cancel import",
      },
      details: {
        title: "Import details",
        created: "Created events",
        skipped: "Skipped events",
        errors: "Errors",
        noCreated: "No events created",
        noSkipped: "No events skipped",
        noErrors: "No errors",
      },
      metrics: {
        title: "Import metrics",
        totalImports: "Total imports",
        totalEvents: "Events imported",
        errorRate: "Error rate",
        avgEvents: "Average events per import",
        sources: "Sources distribution",
        evolution: "Imports evolution",
      },
    },
    // Rollback
    rollback: {
      dialog: {
        title: "Cancel import?",
        description:
          "This action will delete all events created by this import",
        warning: "Will delete {count} created events - Irreversible action",
        understand: "I understand the consequences",
        reason: "Reason (optional)",
        reasonPlaceholder: "Ex: Accidental duplicate",
        confirm: "Confirm cancellation",
        confirming: "Cancelling...",
        progress: "Deleting {current}/{total}...",
      },
      success: "Import cancelled - {count} events deleted",
      error: "Error cancelling import",
    },
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getICSImportTranslation(locale: ICSImportLocale = "fr") {
  return icsImportTranslations[locale];
}
