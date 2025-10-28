/**
 * VIAMENTOR - Prospects CRM i18n
 * Traductions FR/DE/IT/EN pour pipeline gestion prospects
 */

// ============================================================================
// TYPES
// ============================================================================

export type ProspectsLocale = "fr" | "de" | "it" | "en";

export interface ProspectsTranslations {
  // Page
  page: {
    title: string;
    breadcrumb: string;
  };

  // Stats
  stats: {
    activeProspects: string;
    newThisMonth: string;
    conversionRate: string;
    avgConversionTime: string;
    pipelineValue: string;
    days: string;
  };

  // Pipeline statuses
  statuses: {
    new: string;
    contacted: string;
    interested: string;
    appointment: string;
    hot: string;
    converted: string;
    lost: string;
  };

  // Sources
  sources: {
    google: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    referral: string;
    direct: string;
    other: string;
  };

  // Views
  views: {
    kanban: string;
    table: string;
  };

  // Card actions
  actions: {
    viewDetail: string;
    call: string;
    sendEmail: string;
    scheduleAppointment: string;
    convertToStudent: string;
    markAsLost: string;
    assign: string;
  };

  // Filters
  filters: {
    title: string;
    search: string;
    searchPlaceholder: string;
    sources: string;
    categories: string;
    assignedTo: string;
    unassigned: string;
    dateRange: string;
    leadScore: string;
    notContactedOver24h: string;
    reset: string;
  };

  // Bulk actions
  bulk: {
    selected: string;
    assign: string;
    changeStatus: string;
    sendEmail: string;
    exportCSV: string;
    delete: string;
    assignDialog: {
      title: string;
      description: string;
      selectMember: string;
      confirm: string;
      cancel: string;
    };
    statusDialog: {
      title: string;
      description: string;
      selectStatus: string;
      confirm: string;
      cancel: string;
    };
    emailDialog: {
      title: string;
      description: string;
      subject: string;
      message: string;
      send: string;
      cancel: string;
    };
    deleteDialog: {
      title: string;
      description: string;
      confirm: string;
      cancel: string;
    };
  };

  // Assignment
  assignment: {
    assignProspect: string;
    selectMember: string;
    noMemberSelected: string;
    assignedTo: string;
    notAssigned: string;
  };

  // Misc
  misc: {
    createdAt: string;
    ago: string;
    leadScore: string;
    category: string;
    noProspects: string;
    loading: string;
  };

  // Detail sheet
  detail: {
    tabs: {
      info: string;
      history: string;
      communications: string;
      documents: string;
      notes: string;
    };
    info: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      category: string;
      source: string;
      firstContact: string;
      assignedTo: string;
      status: string;
      originalMessage: string;
      leadScore: string;
      scoreFactors: string;
      recalculateScore: string;
      saveChanges: string;
      edit: string;
      convert: string;
      delete: string;
    };
    history: {
      title: string;
      noInteractions: string;
      callNow: string;
      sendEmail: string;
      types: {
        call: string;
        email: string;
        sms: string;
        meeting: string;
        statusChange: string;
        noteAdded: string;
        documentShared: string;
      };
      by: string;
      details: string;
      attachments: string;
      edit: string;
      delete: string;
    };
    communications: {
      title: string;
      emails: string;
      sms: string;
      calls: string;
      subject: string;
      from: string;
      to: string;
      date: string;
      body: string;
      reply: string;
      forward: string;
      archive: string;
      compose: string;
      send: string;
      templates: string;
      attachments: string;
      maxSize: string;
      duration: string;
      direction: string;
      recording: string;
      outcome: string;
      inbound: string;
      outbound: string;
      outcomes: {
        answered: string;
        voicemail: string;
        noAnswer: string;
        invalidNumber: string;
        callBack: string;
      };
    };
    documents: {
      title: string;
      upload: string;
      dragDrop: string;
      fileName: string;
      fileSize: string;
      uploadDate: string;
      uploadedBy: string;
      visibility: string;
      download: string;
      sendByEmail: string;
      preview: string;
      delete: string;
      sendSelected: string;
      visibilityOptions: {
        internal: string;
        shared: string;
      };
    };
    notes: {
      title: string;
      newNote: string;
      content: string;
      createdAt: string;
      author: string;
      visibility: string;
      edit: string;
      delete: string;
      pin: string;
      visibilityOptions: {
        private: string;
        team: string;
      };
      noNotes: string;
    };
    quickActions: {
      call: string;
      email: string;
      schedule: string;
      convert: string;
      markLost: string;
      lostReasons: {
        priceTooHigh: string;
        longWaitTime: string;
        preferCompetitor: string;
        notInterested: string;
        unreachable: string;
        other: string;
      };
    };
    emailTemplates: {
      infoRequest: string;
      appointmentProposal: string;
      followUp: string;
      thankYou: string;
    };
    smsTemplates: {
      welcome: string;
      reminder: string;
      confirmation: string;
    };
    scoreFactors: {
      categoryB: string;
      emailOpened: string;
      validPhone: string;
      studentReferral: string;
      appointmentScheduled: string;
    };
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const prospectsTranslations: Record<
  ProspectsLocale,
  ProspectsTranslations
> = {
  fr: {
    page: {
      title: "Gérer pipeline prospects",
      breadcrumb: "CRM / Prospects",
    },
    stats: {
      activeProspects: "Prospects actifs",
      newThisMonth: "Nouveaux ce mois",
      conversionRate: "Taux de conversion",
      avgConversionTime: "Délai moyen conversion",
      pipelineValue: "Valeur pipeline",
      days: "jours",
    },
    statuses: {
      new: "Nouveau",
      contacted: "Contacté",
      interested: "Intéressé",
      appointment: "RDV planifié",
      hot: "Chaud",
      converted: "Converti",
      lost: "Perdu",
    },
    sources: {
      google: "Google",
      facebook: "Facebook",
      instagram: "Instagram",
      tiktok: "TikTok",
      referral: "Référence",
      direct: "Direct",
      other: "Autre",
    },
    views: {
      kanban: "Kanban",
      table: "Tableau",
    },
    actions: {
      viewDetail: "Voir détail",
      call: "Appeler",
      sendEmail: "Envoyer email",
      scheduleAppointment: "Planifier RDV",
      convertToStudent: "Convertir en élève",
      markAsLost: "Marquer comme perdu",
      assign: "Assigner",
    },
    filters: {
      title: "Filtres avancés",
      search: "Rechercher",
      searchPlaceholder: "Nom, email, téléphone...",
      sources: "Sources",
      categories: "Catégories",
      assignedTo: "Assigné à",
      unassigned: "Non assigné",
      dateRange: "Période de création",
      leadScore: "Score lead",
      notContactedOver24h: "Non contactés >24h",
      reset: "Réinitialiser filtres",
    },
    bulk: {
      selected: "sélectionné(s)",
      assign: "Assigner",
      changeStatus: "Changer statut",
      sendEmail: "Envoyer email",
      exportCSV: "Exporter CSV",
      delete: "Supprimer",
      assignDialog: {
        title: "Assigner les prospects",
        description: "Sélectionnez un membre de l'équipe",
        selectMember: "Sélectionner un membre",
        confirm: "Assigner",
        cancel: "Annuler",
      },
      statusDialog: {
        title: "Changer le statut",
        description: "Sélectionnez le nouveau statut",
        selectStatus: "Sélectionner un statut",
        confirm: "Modifier",
        cancel: "Annuler",
      },
      emailDialog: {
        title: "Envoyer un email",
        description: "Composer le message",
        subject: "Objet",
        message: "Message",
        send: "Envoyer",
        cancel: "Annuler",
      },
      deleteDialog: {
        title: "Supprimer les prospects",
        description:
          "Cette action est irréversible. Les données seront définitivement supprimées.",
        confirm: "Supprimer",
        cancel: "Annuler",
      },
    },
    assignment: {
      assignProspect: "Assigner le prospect",
      selectMember: "Sélectionner un membre",
      noMemberSelected: "Aucun membre sélectionné",
      assignedTo: "Assigné à",
      notAssigned: "Non assigné",
    },
    misc: {
      createdAt: "Créé",
      ago: "il y a",
      leadScore: "Score",
      category: "Catégorie",
      noProspects: "Aucun prospect",
      loading: "Chargement...",
    },
    detail: {
      tabs: {
        info: "Informations",
        history: "Historique",
        communications: "Communications",
        documents: "Documents",
        notes: "Notes",
      },
      info: {
        title: "Informations du prospect",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        phone: "Téléphone",
        category: "Catégorie d'intérêt",
        source: "Source",
        firstContact: "Premier contact",
        assignedTo: "Assigné à",
        status: "Statut",
        originalMessage: "Message original",
        leadScore: "Score lead",
        scoreFactors: "Facteurs de score",
        recalculateScore: "Recalculer score",
        saveChanges: "Enregistrer modifications",
        edit: "Modifier",
        convert: "Convertir",
        delete: "Supprimer",
      },
      history: {
        title: "Historique des interactions",
        noInteractions:
          "Aucune interaction enregistrée - Contactez le prospect maintenant!",
        callNow: "Appeler",
        sendEmail: "Envoyer email",
        types: {
          call: "Appel téléphonique",
          email: "Email",
          sms: "SMS",
          meeting: "Rendez-vous",
          statusChange: "Changement de statut",
          noteAdded: "Note ajoutée",
          documentShared: "Document partagé",
        },
        by: "par",
        details: "Détails",
        attachments: "Pièces jointes",
        edit: "Modifier",
        delete: "Supprimer",
      },
      communications: {
        title: "Communications",
        emails: "Emails",
        sms: "SMS",
        calls: "Appels",
        subject: "Objet",
        from: "De",
        to: "À",
        date: "Date",
        body: "Message",
        reply: "Répondre",
        forward: "Transférer",
        archive: "Archiver",
        compose: "Composer",
        send: "Envoyer",
        templates: "Modèles",
        attachments: "Pièces jointes",
        maxSize: "Taille max 10MB",
        duration: "Durée",
        direction: "Direction",
        recording: "Enregistrement",
        outcome: "Résultat",
        inbound: "Entrant",
        outbound: "Sortant",
        outcomes: {
          answered: "Répondu",
          voicemail: "Messagerie",
          noAnswer: "Pas de réponse",
          invalidNumber: "Numéro invalide",
          callBack: "Rappeler plus tard",
        },
      },
      documents: {
        title: "Documents",
        upload: "Télécharger",
        dragDrop: "Glissez-déposez des fichiers ou cliquez pour parcourir",
        fileName: "Nom du fichier",
        fileSize: "Taille",
        uploadDate: "Date d'upload",
        uploadedBy: "Uploadé par",
        visibility: "Visibilité",
        download: "Télécharger",
        sendByEmail: "Envoyer par email",
        preview: "Prévisualiser",
        delete: "Supprimer",
        sendSelected: "Envoyer sélection par email",
        visibilityOptions: {
          internal: "Interne équipe",
          shared: "Partagé avec prospect",
        },
      },
      notes: {
        title: "Notes",
        newNote: "Nouvelle note",
        content: "Contenu",
        createdAt: "Créé le",
        author: "Auteur",
        visibility: "Visibilité",
        edit: "Modifier",
        delete: "Supprimer",
        pin: "Épingler",
        visibilityOptions: {
          private: "Privé",
          team: "Équipe",
        },
        noNotes: "Aucune note",
      },
      quickActions: {
        call: "Appeler",
        email: "Email",
        schedule: "Planifier RDV",
        convert: "Convertir en élève",
        markLost: "Marquer comme perdu",
        lostReasons: {
          priceTooHigh: "Prix trop élevé",
          longWaitTime: "Délai d'attente long",
          preferCompetitor: "Préfère concurrent",
          notInterested: "Plus intéressé",
          unreachable: "Injoignable",
          other: "Autre",
        },
      },
      emailTemplates: {
        infoRequest: "Demande d'information tarifs",
        appointmentProposal: "Proposition de rendez-vous",
        followUp: "Relance sans réponse",
        thankYou: "Remerciements pour l'intérêt",
      },
      smsTemplates: {
        welcome: "Bienvenue",
        reminder: "Rappel",
        confirmation: "Confirmation",
      },
      scoreFactors: {
        categoryB: "Catégorie B +20 (forte demande)",
        emailOpened: "Email ouvert +15 (engagement)",
        validPhone: "Téléphone valide +10 (joignable)",
        studentReferral: "Référence élève +25 (confiance)",
        appointmentScheduled: "RDV planifié +30 (engagement fort)",
      },
    },
  },

  de: {
    page: {
      title: "Interessenten-Pipeline verwalten",
      breadcrumb: "CRM / Interessenten",
    },
    stats: {
      activeProspects: "Aktive Interessenten",
      newThisMonth: "Neu diesen Monat",
      conversionRate: "Konversionsrate",
      avgConversionTime: "Durchschn. Konversionszeit",
      pipelineValue: "Pipeline-Wert",
      days: "Tage",
    },
    statuses: {
      new: "Neu",
      contacted: "Kontaktiert",
      interested: "Interessiert",
      appointment: "Termin",
      hot: "Heiß",
      converted: "Gewonnen",
      lost: "Verloren",
    },
    sources: {
      google: "Google",
      facebook: "Facebook",
      instagram: "Instagram",
      tiktok: "TikTok",
      referral: "Empfehlung",
      direct: "Direkt",
      other: "Andere",
    },
    views: {
      kanban: "Kanban",
      table: "Tabelle",
    },
    actions: {
      viewDetail: "Details anzeigen",
      call: "Anrufen",
      sendEmail: "E-Mail senden",
      scheduleAppointment: "Termin planen",
      convertToStudent: "In Schüler umwandeln",
      markAsLost: "Als verloren markieren",
      assign: "Zuweisen",
    },
    filters: {
      title: "Erweiterte Filter",
      search: "Suchen",
      searchPlaceholder: "Name, E-Mail, Telefon...",
      sources: "Quellen",
      categories: "Kategorien",
      assignedTo: "Zugewiesen an",
      unassigned: "Nicht zugewiesen",
      dateRange: "Erstellungszeitraum",
      leadScore: "Lead-Score",
      notContactedOver24h: "Nicht kontaktiert >24h",
      reset: "Filter zurücksetzen",
    },
    bulk: {
      selected: "ausgewählt",
      assign: "Zuweisen",
      changeStatus: "Status ändern",
      sendEmail: "E-Mail senden",
      exportCSV: "CSV exportieren",
      delete: "Löschen",
      assignDialog: {
        title: "Interessenten zuweisen",
        description: "Wählen Sie ein Teammitglied",
        selectMember: "Mitglied auswählen",
        confirm: "Zuweisen",
        cancel: "Abbrechen",
      },
      statusDialog: {
        title: "Status ändern",
        description: "Wählen Sie den neuen Status",
        selectStatus: "Status auswählen",
        confirm: "Ändern",
        cancel: "Abbrechen",
      },
      emailDialog: {
        title: "E-Mail senden",
        description: "Nachricht verfassen",
        subject: "Betreff",
        message: "Nachricht",
        send: "Senden",
        cancel: "Abbrechen",
      },
      deleteDialog: {
        title: "Interessenten löschen",
        description:
          "Diese Aktion ist unwiderruflich. Die Daten werden dauerhaft gelöscht.",
        confirm: "Löschen",
        cancel: "Abbrechen",
      },
    },
    assignment: {
      assignProspect: "Interessent zuweisen",
      selectMember: "Mitglied auswählen",
      noMemberSelected: "Kein Mitglied ausgewählt",
      assignedTo: "Zugewiesen an",
      notAssigned: "Nicht zugewiesen",
    },
    misc: {
      createdAt: "Erstellt",
      ago: "vor",
      leadScore: "Score",
      category: "Kategorie",
      noProspects: "Keine Interessenten",
      loading: "Laden...",
    },
    detail: {
      tabs: {
        info: "Informationen",
        history: "Verlauf",
        communications: "Kommunikation",
        documents: "Dokumente",
        notes: "Notizen",
      },
      info: {
        title: "Interessenteninformationen",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefon",
        category: "Interessenkategorie",
        source: "Quelle",
        firstContact: "Erstkontakt",
        assignedTo: "Zugewiesen an",
        status: "Status",
        originalMessage: "Ursprüngliche Nachricht",
        leadScore: "Lead-Score",
        scoreFactors: "Score-Faktoren",
        recalculateScore: "Score neu berechnen",
        saveChanges: "Änderungen speichern",
        edit: "Bearbeiten",
        convert: "Konvertieren",
        delete: "Löschen",
      },
      history: {
        title: "Interaktionsverlauf",
        noInteractions:
          "Keine Interaktionen aufgezeichnet - Kontaktieren Sie den Interessenten jetzt!",
        callNow: "Anrufen",
        sendEmail: "E-Mail senden",
        types: {
          call: "Telefonanruf",
          email: "E-Mail",
          sms: "SMS",
          meeting: "Termin",
          statusChange: "Statusänderung",
          noteAdded: "Notiz hinzugefügt",
          documentShared: "Dokument geteilt",
        },
        by: "von",
        details: "Details",
        attachments: "Anhänge",
        edit: "Bearbeiten",
        delete: "Löschen",
      },
      communications: {
        title: "Kommunikation",
        emails: "E-Mails",
        sms: "SMS",
        calls: "Anrufe",
        subject: "Betreff",
        from: "Von",
        to: "An",
        date: "Datum",
        body: "Nachricht",
        reply: "Antworten",
        forward: "Weiterleiten",
        archive: "Archivieren",
        compose: "Verfassen",
        send: "Senden",
        templates: "Vorlagen",
        attachments: "Anhänge",
        maxSize: "Max. Größe 10MB",
        duration: "Dauer",
        direction: "Richtung",
        recording: "Aufzeichnung",
        outcome: "Ergebnis",
        inbound: "Eingehend",
        outbound: "Ausgehend",
        outcomes: {
          answered: "Beantwortet",
          voicemail: "Mailbox",
          noAnswer: "Keine Antwort",
          invalidNumber: "Ungültige Nummer",
          callBack: "Später zurückrufen",
        },
      },
      documents: {
        title: "Dokumente",
        upload: "Hochladen",
        dragDrop: "Dateien hierher ziehen oder klicken zum Durchsuchen",
        fileName: "Dateiname",
        fileSize: "Größe",
        uploadDate: "Upload-Datum",
        uploadedBy: "Hochgeladen von",
        visibility: "Sichtbarkeit",
        download: "Herunterladen",
        sendByEmail: "Per E-Mail senden",
        preview: "Vorschau",
        delete: "Löschen",
        sendSelected: "Auswahl per E-Mail senden",
        visibilityOptions: {
          internal: "Intern Team",
          shared: "Mit Interessent geteilt",
        },
      },
      notes: {
        title: "Notizen",
        newNote: "Neue Notiz",
        content: "Inhalt",
        createdAt: "Erstellt am",
        author: "Autor",
        visibility: "Sichtbarkeit",
        edit: "Bearbeiten",
        delete: "Löschen",
        pin: "Anheften",
        visibilityOptions: {
          private: "Privat",
          team: "Team",
        },
        noNotes: "Keine Notizen",
      },
      quickActions: {
        call: "Anrufen",
        email: "E-Mail",
        schedule: "Termin planen",
        convert: "In Schüler umwandeln",
        markLost: "Als verloren markieren",
        lostReasons: {
          priceTooHigh: "Preis zu hoch",
          longWaitTime: "Lange Wartezeit",
          preferCompetitor: "Bevorzugt Konkurrenz",
          notInterested: "Nicht mehr interessiert",
          unreachable: "Nicht erreichbar",
          other: "Andere",
        },
      },
      emailTemplates: {
        infoRequest: "Informationsanfrage Preise",
        appointmentProposal: "Terminvorschlag",
        followUp: "Nachfassen ohne Antwort",
        thankYou: "Danke für Ihr Interesse",
      },
      smsTemplates: {
        welcome: "Willkommen",
        reminder: "Erinnerung",
        confirmation: "Bestätigung",
      },
      scoreFactors: {
        categoryB: "Kategorie B +20 (hohe Nachfrage)",
        emailOpened: "E-Mail geöffnet +15 (Engagement)",
        validPhone: "Gültige Telefonnummer +10 (erreichbar)",
        studentReferral: "Schülerempfehlung +25 (Vertrauen)",
        appointmentScheduled: "Termin geplant +30 (starkes Engagement)",
      },
    },
  },

  it: {
    page: {
      title: "Gestire pipeline prospect",
      breadcrumb: "CRM / Prospect",
    },
    stats: {
      activeProspects: "Prospect attivi",
      newThisMonth: "Nuovi questo mese",
      conversionRate: "Tasso di conversione",
      avgConversionTime: "Tempo medio conversione",
      pipelineValue: "Valore pipeline",
      days: "giorni",
    },
    statuses: {
      new: "Nuovo",
      contacted: "Contattato",
      interested: "Interessato",
      appointment: "Appuntamento",
      hot: "Caldo",
      converted: "Convertito",
      lost: "Perso",
    },
    sources: {
      google: "Google",
      facebook: "Facebook",
      instagram: "Instagram",
      tiktok: "TikTok",
      referral: "Referenza",
      direct: "Diretto",
      other: "Altro",
    },
    views: {
      kanban: "Kanban",
      table: "Tabella",
    },
    actions: {
      viewDetail: "Vedi dettagli",
      call: "Chiamare",
      sendEmail: "Invia email",
      scheduleAppointment: "Pianifica appuntamento",
      convertToStudent: "Converti in studente",
      markAsLost: "Segna come perso",
      assign: "Assegnare",
    },
    filters: {
      title: "Filtri avanzati",
      search: "Cerca",
      searchPlaceholder: "Nome, email, telefono...",
      sources: "Fonti",
      categories: "Categorie",
      assignedTo: "Assegnato a",
      unassigned: "Non assegnato",
      dateRange: "Periodo di creazione",
      leadScore: "Punteggio lead",
      notContactedOver24h: "Non contattati >24h",
      reset: "Ripristina filtri",
    },
    bulk: {
      selected: "selezionato/i",
      assign: "Assegnare",
      changeStatus: "Cambia stato",
      sendEmail: "Invia email",
      exportCSV: "Esporta CSV",
      delete: "Eliminare",
      assignDialog: {
        title: "Assegna prospect",
        description: "Seleziona un membro del team",
        selectMember: "Seleziona membro",
        confirm: "Assegnare",
        cancel: "Annulla",
      },
      statusDialog: {
        title: "Cambia stato",
        description: "Seleziona il nuovo stato",
        selectStatus: "Seleziona stato",
        confirm: "Modificare",
        cancel: "Annulla",
      },
      emailDialog: {
        title: "Invia email",
        description: "Componi messaggio",
        subject: "Oggetto",
        message: "Messaggio",
        send: "Inviare",
        cancel: "Annulla",
      },
      deleteDialog: {
        title: "Elimina prospect",
        description:
          "Questa azione è irreversibile. I dati saranno eliminati definitivamente.",
        confirm: "Eliminare",
        cancel: "Annulla",
      },
    },
    assignment: {
      assignProspect: "Assegna prospect",
      selectMember: "Seleziona membro",
      noMemberSelected: "Nessun membro selezionato",
      assignedTo: "Assegnato a",
      notAssigned: "Non assegnato",
    },
    misc: {
      createdAt: "Creato",
      ago: "fa",
      leadScore: "Punteggio",
      category: "Categoria",
      noProspects: "Nessun prospect",
      loading: "Caricamento...",
    },
    detail: {
      tabs: {
        info: "Informazioni",
        history: "Cronologia",
        communications: "Comunicazioni",
        documents: "Documenti",
        notes: "Note",
      },
      info: {
        title: "Informazioni prospect",
        firstName: "Nome",
        lastName: "Cognome",
        email: "Email",
        phone: "Telefono",
        category: "Categoria di interesse",
        source: "Fonte",
        firstContact: "Primo contatto",
        assignedTo: "Assegnato a",
        status: "Stato",
        originalMessage: "Messaggio originale",
        leadScore: "Punteggio lead",
        scoreFactors: "Fattori di punteggio",
        recalculateScore: "Ricalcola punteggio",
        saveChanges: "Salva modifiche",
        edit: "Modificare",
        convert: "Convertire",
        delete: "Eliminare",
      },
      history: {
        title: "Cronologia interazioni",
        noInteractions:
          "Nessuna interazione registrata - Contatta il prospect ora!",
        callNow: "Chiamare",
        sendEmail: "Invia email",
        types: {
          call: "Chiamata telefonica",
          email: "Email",
          sms: "SMS",
          meeting: "Appuntamento",
          statusChange: "Cambio stato",
          noteAdded: "Nota aggiunta",
          documentShared: "Documento condiviso",
        },
        by: "da",
        details: "Dettagli",
        attachments: "Allegati",
        edit: "Modificare",
        delete: "Eliminare",
      },
      communications: {
        title: "Comunicazioni",
        emails: "Email",
        sms: "SMS",
        calls: "Chiamate",
        subject: "Oggetto",
        from: "Da",
        to: "A",
        date: "Data",
        body: "Messaggio",
        reply: "Rispondi",
        forward: "Inoltra",
        archive: "Archivia",
        compose: "Componi",
        send: "Inviare",
        templates: "Modelli",
        attachments: "Allegati",
        maxSize: "Dimensione max 10MB",
        duration: "Durata",
        direction: "Direzione",
        recording: "Registrazione",
        outcome: "Risultato",
        inbound: "In entrata",
        outbound: "In uscita",
        outcomes: {
          answered: "Risposto",
          voicemail: "Segreteria",
          noAnswer: "Nessuna risposta",
          invalidNumber: "Numero non valido",
          callBack: "Richiamare più tardi",
        },
      },
      documents: {
        title: "Documenti",
        upload: "Caricare",
        dragDrop: "Trascina i file qui o clicca per sfogliare",
        fileName: "Nome file",
        fileSize: "Dimensione",
        uploadDate: "Data caricamento",
        uploadedBy: "Caricato da",
        visibility: "Visibilità",
        download: "Scaricare",
        sendByEmail: "Invia per email",
        preview: "Anteprima",
        delete: "Eliminare",
        sendSelected: "Invia selezione per email",
        visibilityOptions: {
          internal: "Interno team",
          shared: "Condiviso con prospect",
        },
      },
      notes: {
        title: "Note",
        newNote: "Nuova nota",
        content: "Contenuto",
        createdAt: "Creato il",
        author: "Autore",
        visibility: "Visibilità",
        edit: "Modificare",
        delete: "Eliminare",
        pin: "Fissa",
        visibilityOptions: {
          private: "Privato",
          team: "Team",
        },
        noNotes: "Nessuna nota",
      },
      quickActions: {
        call: "Chiamare",
        email: "Email",
        schedule: "Pianifica appuntamento",
        convert: "Converti in studente",
        markLost: "Segna come perso",
        lostReasons: {
          priceTooHigh: "Prezzo troppo alto",
          longWaitTime: "Tempo di attesa lungo",
          preferCompetitor: "Preferisce concorrente",
          notInterested: "Non più interessato",
          unreachable: "Irraggiungibile",
          other: "Altro",
        },
      },
      emailTemplates: {
        infoRequest: "Richiesta informazioni prezzi",
        appointmentProposal: "Proposta appuntamento",
        followUp: "Sollecito senza risposta",
        thankYou: "Grazie per l'interesse",
      },
      smsTemplates: {
        welcome: "Benvenuto",
        reminder: "Promemoria",
        confirmation: "Conferma",
      },
      scoreFactors: {
        categoryB: "Categoria B +20 (alta domanda)",
        emailOpened: "Email aperta +15 (coinvolgimento)",
        validPhone: "Telefono valido +10 (raggiungibile)",
        studentReferral: "Referenza studente +25 (fiducia)",
        appointmentScheduled:
          "Appuntamento pianificato +30 (forte coinvolgimento)",
      },
    },
  },

  en: {
    page: {
      title: "Manage prospects pipeline",
      breadcrumb: "CRM / Prospects",
    },
    stats: {
      activeProspects: "Active prospects",
      newThisMonth: "New this month",
      conversionRate: "Conversion rate",
      avgConversionTime: "Avg. conversion time",
      pipelineValue: "Pipeline value",
      days: "days",
    },
    statuses: {
      new: "New",
      contacted: "Contacted",
      interested: "Interested",
      appointment: "Appointment",
      hot: "Hot",
      converted: "Converted",
      lost: "Lost",
    },
    sources: {
      google: "Google",
      facebook: "Facebook",
      instagram: "Instagram",
      tiktok: "TikTok",
      referral: "Referral",
      direct: "Direct",
      other: "Other",
    },
    views: {
      kanban: "Kanban",
      table: "Table",
    },
    actions: {
      viewDetail: "View details",
      call: "Call",
      sendEmail: "Send email",
      scheduleAppointment: "Schedule appointment",
      convertToStudent: "Convert to student",
      markAsLost: "Mark as lost",
      assign: "Assign",
    },
    filters: {
      title: "Advanced filters",
      search: "Search",
      searchPlaceholder: "Name, email, phone...",
      sources: "Sources",
      categories: "Categories",
      assignedTo: "Assigned to",
      unassigned: "Unassigned",
      dateRange: "Creation period",
      leadScore: "Lead score",
      notContactedOver24h: "Not contacted >24h",
      reset: "Reset filters",
    },
    bulk: {
      selected: "selected",
      assign: "Assign",
      changeStatus: "Change status",
      sendEmail: "Send email",
      exportCSV: "Export CSV",
      delete: "Delete",
      assignDialog: {
        title: "Assign prospects",
        description: "Select a team member",
        selectMember: "Select member",
        confirm: "Assign",
        cancel: "Cancel",
      },
      statusDialog: {
        title: "Change status",
        description: "Select the new status",
        selectStatus: "Select status",
        confirm: "Change",
        cancel: "Cancel",
      },
      emailDialog: {
        title: "Send email",
        description: "Compose message",
        subject: "Subject",
        message: "Message",
        send: "Send",
        cancel: "Cancel",
      },
      deleteDialog: {
        title: "Delete prospects",
        description:
          "This action is irreversible. Data will be permanently deleted.",
        confirm: "Delete",
        cancel: "Cancel",
      },
    },
    assignment: {
      assignProspect: "Assign prospect",
      selectMember: "Select member",
      noMemberSelected: "No member selected",
      assignedTo: "Assigned to",
      notAssigned: "Not assigned",
    },
    misc: {
      createdAt: "Created",
      ago: "ago",
      leadScore: "Score",
      category: "Category",
      noProspects: "No prospects",
      loading: "Loading...",
    },
    detail: {
      tabs: {
        info: "Information",
        history: "History",
        communications: "Communications",
        documents: "Documents",
        notes: "Notes",
      },
      info: {
        title: "Prospect information",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        category: "Interest category",
        source: "Source",
        firstContact: "First contact",
        assignedTo: "Assigned to",
        status: "Status",
        originalMessage: "Original message",
        leadScore: "Lead score",
        scoreFactors: "Score factors",
        recalculateScore: "Recalculate score",
        saveChanges: "Save changes",
        edit: "Edit",
        convert: "Convert",
        delete: "Delete",
      },
      history: {
        title: "Interaction history",
        noInteractions: "No interactions recorded - Contact the prospect now!",
        callNow: "Call",
        sendEmail: "Send email",
        types: {
          call: "Phone call",
          email: "Email",
          sms: "SMS",
          meeting: "Meeting",
          statusChange: "Status change",
          noteAdded: "Note added",
          documentShared: "Document shared",
        },
        by: "by",
        details: "Details",
        attachments: "Attachments",
        edit: "Edit",
        delete: "Delete",
      },
      communications: {
        title: "Communications",
        emails: "Emails",
        sms: "SMS",
        calls: "Calls",
        subject: "Subject",
        from: "From",
        to: "To",
        date: "Date",
        body: "Message",
        reply: "Reply",
        forward: "Forward",
        archive: "Archive",
        compose: "Compose",
        send: "Send",
        templates: "Templates",
        attachments: "Attachments",
        maxSize: "Max size 10MB",
        duration: "Duration",
        direction: "Direction",
        recording: "Recording",
        outcome: "Outcome",
        inbound: "Inbound",
        outbound: "Outbound",
        outcomes: {
          answered: "Answered",
          voicemail: "Voicemail",
          noAnswer: "No answer",
          invalidNumber: "Invalid number",
          callBack: "Call back later",
        },
      },
      documents: {
        title: "Documents",
        upload: "Upload",
        dragDrop: "Drag and drop files or click to browse",
        fileName: "File name",
        fileSize: "Size",
        uploadDate: "Upload date",
        uploadedBy: "Uploaded by",
        visibility: "Visibility",
        download: "Download",
        sendByEmail: "Send by email",
        preview: "Preview",
        delete: "Delete",
        sendSelected: "Send selection by email",
        visibilityOptions: {
          internal: "Internal team",
          shared: "Shared with prospect",
        },
      },
      notes: {
        title: "Notes",
        newNote: "New note",
        content: "Content",
        createdAt: "Created on",
        author: "Author",
        visibility: "Visibility",
        edit: "Edit",
        delete: "Delete",
        pin: "Pin",
        visibilityOptions: {
          private: "Private",
          team: "Team",
        },
        noNotes: "No notes",
      },
      quickActions: {
        call: "Call",
        email: "Email",
        schedule: "Schedule appointment",
        convert: "Convert to student",
        markLost: "Mark as lost",
        lostReasons: {
          priceTooHigh: "Price too high",
          longWaitTime: "Long wait time",
          preferCompetitor: "Prefers competitor",
          notInterested: "Not interested anymore",
          unreachable: "Unreachable",
          other: "Other",
        },
      },
      emailTemplates: {
        infoRequest: "Price information request",
        appointmentProposal: "Appointment proposal",
        followUp: "Follow-up without response",
        thankYou: "Thank you for your interest",
      },
      smsTemplates: {
        welcome: "Welcome",
        reminder: "Reminder",
        confirmation: "Confirmation",
      },
      scoreFactors: {
        categoryB: "Category B +20 (high demand)",
        emailOpened: "Email opened +15 (engagement)",
        validPhone: "Valid phone +10 (reachable)",
        studentReferral: "Student referral +25 (trust)",
        appointmentScheduled: "Appointment scheduled +30 (strong engagement)",
      },
    },
  },
};

// ============================================================================
// HELPER
// ============================================================================

export function getProspectsTranslations(
  locale: ProspectsLocale = "fr"
): ProspectsTranslations {
  return prospectsTranslations[locale];
}
