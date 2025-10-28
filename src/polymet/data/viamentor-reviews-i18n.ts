/**
 * VIAMENTOR - Google Reviews i18n
 * Traductions FR/DE/IT/EN pour système avis Google
 */

// ============================================================================
// TYPES
// ============================================================================

export type ReviewsLocale = "fr" | "de" | "it" | "en";

export interface ReviewsTranslations {
  page: {
    title: string;
    breadcrumb: string;
    description: string;
  };
  alert: {
    policy: string;
  };
  config: {
    title: string;
    placeId: string;
    placeIdPlaceholder: string;
    connect: string;
    disconnect: string;
    connected: string;
    location: string;
    permissionsWarning: string;
    stats: {
      totalReviews: string;
      averageRating: string;
      unreplied: string;
    };
  };
  sync: {
    title: string;
    enabled: string;
    frequency: string;
    frequencies: {
      realtime: string;
      hourly: string;
      "4xday": string;
      daily: string;
    };
    lastSync: string;
    nextSync: string;
    status: {
      idle: string;
      syncing: string;
      error: string;
    };
  };
  filtering: {
    title: string;
    enabled: string;
    policy: string;
    requirePayment: string;
    blockMessage: string;
  };
  widget: {
    title: string;
    description: string;
    code: string;
    copy: string;
    copied: string;
    preview: string;
    options: {
      theme: string;
      limit: string;
      sort: string;
      showRatings: string;
      showAuthors: string;
      showDates: string;
      showReplies: string;
      minimumRating: string;
    };
    themes: {
      light: string;
      dark: string;
    };
    sorts: {
      recent: string;
      rating: string;
      helpful: string;
    };
  };
  invitations: {
    title: string;
    enabled: string;
    delay: string;
    delays: {
      immediate: string;
      "1day": string;
      "3days": string;
      "1week": string;
    };
    conditions: string;
    afterLessons: string;
    afterPayment: string;
    afterExamSuccess: string;
    afterRating: string;
    template: {
      title: string;
      subject: string;
      body: string;
      variables: string;
      test: string;
    };
    reminder: string;
    reminderDelay: string;
  };
  analytics: {
    title: string;
    period: string;
    stats: {
      sent: string;
      openRate: string;
      clickRate: string;
      conversionRate: string;
    };
    trend: string;
    topReviewers: string;
    reviewsCount: string;
    lastReview: string;
    badge: string;
  };
  actions: {
    save: string;
    cancel: string;
    test: string;
    export: string;
    reply: string;
    delete: string;
  };
  status: {
    new: string;
    replied: string;
    contested: string;
    sent: string;
    clicked: string;
    reviewed: string;
    expired: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const reviewsTranslations: Record<ReviewsLocale, ReviewsTranslations> = {
  fr: {
    page: {
      title: "Gérer avis Google Business",
      breadcrumb: "Paramètres / Avis Google",
      description:
        "Collectez et gérez les avis automatiquement. Seuls les élèves ayant effectué un paiement peuvent laisser un avis.",
    },
    alert: {
      policy:
        "Collectez et gérez avis automatiquement. Seuls élèves ayants payé peuvent laisser avis.",
    },
    config: {
      title: "Configuration Google Business",
      placeId: "Place ID Google",
      placeIdPlaceholder: "ChIJ...",
      connect: "Connecter Google Business",
      disconnect: "Déconnecter",
      connected: "Connecté",
      location: "Lieu",
      permissionsWarning: "Permissions lecture + réponse avis requises",
      stats: {
        totalReviews: "Total avis",
        averageRating: "Note moyenne",
        unreplied: "Avis non-répondus",
      },
    },
    sync: {
      title: "Synchronisation automatique",
      enabled: "Sync automatique avis",
      frequency: "Fréquence",
      frequencies: {
        realtime: "Temps réel",
        hourly: "Toutes les heures",
        "4xday": "4x par jour",
        daily: "1x par jour",
      },
      lastSync: "Dernière sync",
      nextSync: "Prochaine sync",
      status: {
        idle: "En attente",
        syncing: "Synchronisation...",
        error: "Erreur",
      },
    },
    filtering: {
      title: "Politique publication avis",
      enabled: "Filtrer élèves non-payants",
      policy:
        "Seuls élèves ayant effectué paiement peuvent publier avis Google Business",
      requirePayment: "Paiement requis",
      blockMessage:
        "Avis réservé aux clients ayant effectué achat. Merci de votre compréhension.",
    },
    widget: {
      title: "Widget avis site web",
      description: "Intégrez avis Google sur votre site",
      code: "Code d'intégration",
      copy: "Copier code",
      copied: "Code copié!",
      preview: "Aperçu",
      options: {
        theme: "Thème",
        limit: "Nombre d'avis",
        sort: "Tri",
        showRatings: "Afficher notes",
        showAuthors: "Afficher auteurs",
        showDates: "Afficher dates",
        showReplies: "Afficher réponses",
        minimumRating: "Note minimum",
      },
      themes: {
        light: "Clair",
        dark: "Sombre",
      },
      sorts: {
        recent: "Récents",
        rating: "Note",
        helpful: "Utiles",
      },
    },
    invitations: {
      title: "Invitations automatiques",
      enabled: "Invitations auto après leçon",
      delay: "Délai d'envoi",
      delays: {
        immediate: "Immédiatement",
        "1day": "1 jour après",
        "3days": "3 jours après",
        "1week": "1 semaine après",
      },
      conditions: "Conditions d'envoi",
      afterLessons: "Après X leçons",
      afterPayment: "Après paiement facture",
      afterExamSuccess: "Après réussite examen",
      afterRating: "Après note évaluation >",
      template: {
        title: "Template email",
        subject: "Sujet",
        body: "Corps du message",
        variables: "Variables disponibles",
        test: "Tester email",
      },
      reminder: "Relance si pas d'action",
      reminderDelay: "Délai relance (jours)",
    },
    analytics: {
      title: "Performance collecte avis",
      period: "Période",
      stats: {
        sent: "Invitations envoyées",
        openRate: "Taux ouverture",
        clickRate: "Taux clics",
        conversionRate: "Taux conversion",
      },
      trend: "Tendance",
      topReviewers: "Top reviewers",
      reviewsCount: "Avis laissés",
      lastReview: "Dernier avis",
      badge: "Top reviewer",
    },
    actions: {
      save: "Enregistrer",
      cancel: "Annuler",
      test: "Tester",
      export: "Exporter",
      reply: "Répondre",
      delete: "Supprimer",
    },
    status: {
      new: "Nouveau",
      replied: "Répondu",
      contested: "Contesté",
      sent: "Envoyé",
      clicked: "Cliqué",
      reviewed: "Avis laissé",
      expired: "Expiré",
    },
  },
  de: {
    page: {
      title: "Google Business Bewertungen verwalten",
      breadcrumb: "Einstellungen / Google Bewertungen",
      description:
        "Sammeln und verwalten Sie Bewertungen automatisch. Nur Schüler mit Zahlung können Bewertungen abgeben.",
    },
    alert: {
      policy:
        "Sammeln und verwalten Sie Bewertungen automatisch. Nur zahlende Schüler können Bewertungen abgeben.",
    },
    config: {
      title: "Google Business Konfiguration",
      placeId: "Google Place ID",
      placeIdPlaceholder: "ChIJ...",
      connect: "Google Business verbinden",
      disconnect: "Trennen",
      connected: "Verbunden",
      location: "Standort",
      permissionsWarning: "Lese- und Antwortberechtigungen erforderlich",
      stats: {
        totalReviews: "Bewertungen gesamt",
        averageRating: "Durchschnittsnote",
        unreplied: "Unbeantwortete",
      },
    },
    sync: {
      title: "Automatische Synchronisation",
      enabled: "Auto-Sync Bewertungen",
      frequency: "Häufigkeit",
      frequencies: {
        realtime: "Echtzeit",
        hourly: "Stündlich",
        "4xday": "4x täglich",
        daily: "1x täglich",
      },
      lastSync: "Letzte Sync",
      nextSync: "Nächste Sync",
      status: {
        idle: "Bereit",
        syncing: "Synchronisiere...",
        error: "Fehler",
      },
    },
    filtering: {
      title: "Veröffentlichungsrichtlinie",
      enabled: "Nicht-zahlende Schüler filtern",
      policy:
        "Nur Schüler mit Zahlung können Google Business Bewertungen veröffentlichen",
      requirePayment: "Zahlung erforderlich",
      blockMessage:
        "Bewertungen sind Kunden mit Kauf vorbehalten. Vielen Dank für Ihr Verständnis.",
    },
    widget: {
      title: "Website Bewertungs-Widget",
      description: "Integrieren Sie Google Bewertungen auf Ihrer Website",
      code: "Integrationscode",
      copy: "Code kopieren",
      copied: "Code kopiert!",
      preview: "Vorschau",
      options: {
        theme: "Design",
        limit: "Anzahl Bewertungen",
        sort: "Sortierung",
        showRatings: "Noten anzeigen",
        showAuthors: "Autoren anzeigen",
        showDates: "Daten anzeigen",
        showReplies: "Antworten anzeigen",
        minimumRating: "Mindestnote",
      },
      themes: {
        light: "Hell",
        dark: "Dunkel",
      },
      sorts: {
        recent: "Neueste",
        rating: "Note",
        helpful: "Hilfreich",
      },
    },
    invitations: {
      title: "Automatische Einladungen",
      enabled: "Auto-Einladungen nach Lektion",
      delay: "Versandverzögerung",
      delays: {
        immediate: "Sofort",
        "1day": "1 Tag später",
        "3days": "3 Tage später",
        "1week": "1 Woche später",
      },
      conditions: "Versandbedingungen",
      afterLessons: "Nach X Lektionen",
      afterPayment: "Nach Rechnungszahlung",
      afterExamSuccess: "Nach Prüfungserfolg",
      afterRating: "Nach Bewertung >",
      template: {
        title: "E-Mail-Vorlage",
        subject: "Betreff",
        body: "Nachrichtentext",
        variables: "Verfügbare Variablen",
        test: "E-Mail testen",
      },
      reminder: "Erinnerung bei Inaktivität",
      reminderDelay: "Erinnerungsverzögerung (Tage)",
    },
    analytics: {
      title: "Sammelleistung",
      period: "Zeitraum",
      stats: {
        sent: "Einladungen gesendet",
        openRate: "Öffnungsrate",
        clickRate: "Klickrate",
        conversionRate: "Konversionsrate",
      },
      trend: "Trend",
      topReviewers: "Top-Bewerter",
      reviewsCount: "Bewertungen",
      lastReview: "Letzte Bewertung",
      badge: "Top-Bewerter",
    },
    actions: {
      save: "Speichern",
      cancel: "Abbrechen",
      test: "Testen",
      export: "Exportieren",
      reply: "Antworten",
      delete: "Löschen",
    },
    status: {
      new: "Neu",
      replied: "Beantwortet",
      contested: "Angefochten",
      sent: "Gesendet",
      clicked: "Geklickt",
      reviewed: "Bewertet",
      expired: "Abgelaufen",
    },
  },
  it: {
    page: {
      title: "Gestire recensioni Google Business",
      breadcrumb: "Impostazioni / Recensioni Google",
      description:
        "Raccogli e gestisci recensioni automaticamente. Solo studenti con pagamento possono lasciare recensioni.",
    },
    alert: {
      policy:
        "Raccogli e gestisci recensioni automaticamente. Solo studenti paganti possono lasciare recensioni.",
    },
    config: {
      title: "Configurazione Google Business",
      placeId: "Place ID Google",
      placeIdPlaceholder: "ChIJ...",
      connect: "Connetti Google Business",
      disconnect: "Disconnetti",
      connected: "Connesso",
      location: "Luogo",
      permissionsWarning: "Permessi lettura + risposta richiesti",
      stats: {
        totalReviews: "Recensioni totali",
        averageRating: "Valutazione media",
        unreplied: "Non risposte",
      },
    },
    sync: {
      title: "Sincronizzazione automatica",
      enabled: "Sync auto recensioni",
      frequency: "Frequenza",
      frequencies: {
        realtime: "Tempo reale",
        hourly: "Ogni ora",
        "4xday": "4x al giorno",
        daily: "1x al giorno",
      },
      lastSync: "Ultima sync",
      nextSync: "Prossima sync",
      status: {
        idle: "In attesa",
        syncing: "Sincronizzazione...",
        error: "Errore",
      },
    },
    filtering: {
      title: "Politica pubblicazione",
      enabled: "Filtra studenti non paganti",
      policy:
        "Solo studenti con pagamento possono pubblicare recensioni Google Business",
      requirePayment: "Pagamento richiesto",
      blockMessage:
        "Recensioni riservate a clienti con acquisto. Grazie per la comprensione.",
    },
    widget: {
      title: "Widget recensioni sito",
      description: "Integra recensioni Google sul tuo sito",
      code: "Codice integrazione",
      copy: "Copia codice",
      copied: "Codice copiato!",
      preview: "Anteprima",
      options: {
        theme: "Tema",
        limit: "Numero recensioni",
        sort: "Ordinamento",
        showRatings: "Mostra valutazioni",
        showAuthors: "Mostra autori",
        showDates: "Mostra date",
        showReplies: "Mostra risposte",
        minimumRating: "Valutazione minima",
      },
      themes: {
        light: "Chiaro",
        dark: "Scuro",
      },
      sorts: {
        recent: "Recenti",
        rating: "Valutazione",
        helpful: "Utili",
      },
    },
    invitations: {
      title: "Inviti automatici",
      enabled: "Inviti auto dopo lezione",
      delay: "Ritardo invio",
      delays: {
        immediate: "Immediatamente",
        "1day": "1 giorno dopo",
        "3days": "3 giorni dopo",
        "1week": "1 settimana dopo",
      },
      conditions: "Condizioni invio",
      afterLessons: "Dopo X lezioni",
      afterPayment: "Dopo pagamento fattura",
      afterExamSuccess: "Dopo successo esame",
      afterRating: "Dopo valutazione >",
      template: {
        title: "Template email",
        subject: "Oggetto",
        body: "Corpo messaggio",
        variables: "Variabili disponibili",
        test: "Testa email",
      },
      reminder: "Promemoria se nessuna azione",
      reminderDelay: "Ritardo promemoria (giorni)",
    },
    analytics: {
      title: "Performance raccolta",
      period: "Periodo",
      stats: {
        sent: "Inviti inviati",
        openRate: "Tasso apertura",
        clickRate: "Tasso clic",
        conversionRate: "Tasso conversione",
      },
      trend: "Tendenza",
      topReviewers: "Top recensori",
      reviewsCount: "Recensioni lasciate",
      lastReview: "Ultima recensione",
      badge: "Top recensore",
    },
    actions: {
      save: "Salva",
      cancel: "Annulla",
      test: "Testa",
      export: "Esporta",
      reply: "Rispondi",
      delete: "Elimina",
    },
    status: {
      new: "Nuovo",
      replied: "Risposto",
      contested: "Contestato",
      sent: "Inviato",
      clicked: "Cliccato",
      reviewed: "Recensito",
      expired: "Scaduto",
    },
  },
  en: {
    page: {
      title: "Manage Google Business Reviews",
      breadcrumb: "Settings / Google Reviews",
      description:
        "Collect and manage reviews automatically. Only students with payment can leave reviews.",
    },
    alert: {
      policy:
        "Collect and manage reviews automatically. Only paying students can leave reviews.",
    },
    config: {
      title: "Google Business Configuration",
      placeId: "Google Place ID",
      placeIdPlaceholder: "ChIJ...",
      connect: "Connect Google Business",
      disconnect: "Disconnect",
      connected: "Connected",
      location: "Location",
      permissionsWarning: "Read + reply permissions required",
      stats: {
        totalReviews: "Total reviews",
        averageRating: "Average rating",
        unreplied: "Unreplied",
      },
    },
    sync: {
      title: "Automatic synchronization",
      enabled: "Auto-sync reviews",
      frequency: "Frequency",
      frequencies: {
        realtime: "Real-time",
        hourly: "Hourly",
        "4xday": "4x daily",
        daily: "Daily",
      },
      lastSync: "Last sync",
      nextSync: "Next sync",
      status: {
        idle: "Idle",
        syncing: "Syncing...",
        error: "Error",
      },
    },
    filtering: {
      title: "Publication policy",
      enabled: "Filter non-paying students",
      policy: "Only students with payment can publish Google Business reviews",
      requirePayment: "Payment required",
      blockMessage:
        "Reviews reserved for customers with purchase. Thank you for understanding.",
    },
    widget: {
      title: "Website reviews widget",
      description: "Integrate Google reviews on your website",
      code: "Integration code",
      copy: "Copy code",
      copied: "Code copied!",
      preview: "Preview",
      options: {
        theme: "Theme",
        limit: "Number of reviews",
        sort: "Sort",
        showRatings: "Show ratings",
        showAuthors: "Show authors",
        showDates: "Show dates",
        showReplies: "Show replies",
        minimumRating: "Minimum rating",
      },
      themes: {
        light: "Light",
        dark: "Dark",
      },
      sorts: {
        recent: "Recent",
        rating: "Rating",
        helpful: "Helpful",
      },
    },
    invitations: {
      title: "Automatic invitations",
      enabled: "Auto invitations after lesson",
      delay: "Send delay",
      delays: {
        immediate: "Immediately",
        "1day": "1 day after",
        "3days": "3 days after",
        "1week": "1 week after",
      },
      conditions: "Send conditions",
      afterLessons: "After X lessons",
      afterPayment: "After invoice payment",
      afterExamSuccess: "After exam success",
      afterRating: "After rating >",
      template: {
        title: "Email template",
        subject: "Subject",
        body: "Message body",
        variables: "Available variables",
        test: "Test email",
      },
      reminder: "Reminder if no action",
      reminderDelay: "Reminder delay (days)",
    },
    analytics: {
      title: "Collection performance",
      period: "Period",
      stats: {
        sent: "Invitations sent",
        openRate: "Open rate",
        clickRate: "Click rate",
        conversionRate: "Conversion rate",
      },
      trend: "Trend",
      topReviewers: "Top reviewers",
      reviewsCount: "Reviews left",
      lastReview: "Last review",
      badge: "Top reviewer",
    },
    actions: {
      save: "Save",
      cancel: "Cancel",
      test: "Test",
      export: "Export",
      reply: "Reply",
      delete: "Delete",
    },
    status: {
      new: "New",
      replied: "Replied",
      contested: "Contested",
      sent: "Sent",
      clicked: "Clicked",
      reviewed: "Reviewed",
      expired: "Expired",
    },
  },
};
