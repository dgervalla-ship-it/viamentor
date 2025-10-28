/**
 * VIAMENTOR - Pixels Monitoring i18n
 *
 * Traductions FR/DE/IT/EN pour monitoring santé pixels tracking
 * avec terminologie technique marketing digital
 */

export type PixelsMonitoringLocale = "fr" | "de" | "it" | "en";

export const pixelsMonitoringTranslations = {
  fr: {
    // Page
    title: "Surveillance pixels tracking",
    subtitle:
      "Vérifications automatiques quotidiennes garantissent conversions remontées correctement plateformes publicitaires",
    breadcrumb: {
      marketing: "Marketing",
      health: "Santé pixels",
    },

    // Status
    status: {
      operational: "Opérationnel",
      degraded: "Dégradé",
      offline: "Hors ligne",
      lastCheck: "Dernière vérification",
      ago: "il y a {time}",
    },

    // Stats
    stats: {
      eventsSent: "Événements envoyés aujourd'hui",
      errors: "Erreurs",
      successRate: "Taux succès",
      avgLatency: "Latence moyenne",
    },

    // Actions
    actions: {
      testNow: "Tester maintenant",
      viewLogs: "Voir logs",
      diagnose: "Diagnostiquer",
      resolve: "Résoudre",
      ignore24h: "Ignorer 24h",
      copyLogs: "Copier logs",
      retry: "Renvoyer",
      generateReport: "Rapport santé hebdomadaire",
    },

    // Alerts
    alerts: {
      title: "Problèmes détectés",
      noIssues: "Aucun problème détecté",
      detectedOn: "Détecté le {date}",
      severity: {
        critical: "Critique",
        warning: "Avertissement",
        info: "Information",
      },
    },

    // Diagnostics
    diagnostics: {
      title: "Diagnostics automatiques",
      running: "Exécution des tests...",
      test1: "Connexion plateforme API",
      test2: "Validité pixel ID",
      test3: "Permissions compte publicitaire",
      test4: "Configuration événements",
      test5: "Envoi événement test",
      passed: "Réussi",
      failed: "Échoué",
      details: "Détails",
    },

    // Logs
    logs: {
      title: "Historique événements",
      timestamp: "Horodatage",
      event: "Événement",
      platform: "Plateforme",
      status: "Statut",
      parameters: "Paramètres",
      response: "Réponse API",
      retryCount: "Tentatives",
      filters: {
        dateRange: "Période",
        platform: "Plateforme",
        status: "Statut",
        eventType: "Type événement",
        search: "Rechercher paramètres",
      },
      eventTypes: {
        pageView: "Page vue",
        purchase: "Achat",
        lead: "Lead",
        addToCart: "Ajout panier",
        initiateCheckout: "Début paiement",
      },
      statuses: {
        sent: "Envoyé",
        failed: "Échoué",
        pending: "En attente",
        retrying: "Nouvelle tentative",
      },
      export: "Exporter CSV",
    },

    // Notifications
    notifications: {
      title: "Notifications email",
      enableAlerts: "Alertes email",
      recipients: "Destinataires",
      addRecipient: "Ajouter destinataire",
      frequency: "Fréquence",
      frequencies: {
        realtime: "Temps réel",
        hourly: "Digest horaire",
        daily: "Digest quotidien",
        weekly: "Hebdomadaire",
      },
      types: {
        pixelOffline: "Pixel hors ligne >1h",
        highErrorRate: "Taux erreurs >10%",
        budgetExhausted: "Budget campagne épuisé",
        newConversion: "Nouvelle conversion",
      },
      save: "Enregistrer préférences",
    },

    // Report
    report: {
      title: "Rapport santé hebdomadaire",
      period: "Période: {start} - {end}",
      summary: "Résumé",
      uptime: "Disponibilité",
      totalEvents: "Total événements envoyés",
      globalSuccessRate: "Taux succès global",
      platforms: "Plateformes",
      alertsTriggered: "Alertes déclenchées",
      recommendations: "Recommandations",
      download: "Télécharger PDF",
    },

    // Platforms
    platforms: {
      meta: "Meta (Facebook/Instagram)",
      google: "Google Ads",
      tiktok: "TikTok Ads",
      linkedin: "LinkedIn Ads",
    },

    // Messages
    messages: {
      testSuccess: "Test réussi - Pixel fonctionne correctement",
      testFailed: "Test échoué - Vérifiez configuration",
      diagnosticsComplete: "Diagnostics terminés",
      logsCopied: "Logs copiés dans presse-papier",
      eventRetried: "Événement renvoyé avec succès",
      settingsSaved: "Préférences enregistrées",
      reportGenerated: "Rapport généré avec succès",
    },
  },

  de: {
    title: "Tracking-Pixel-Überwachung",
    subtitle:
      "Tägliche automatische Überprüfungen stellen sicher, dass Conversions korrekt an Werbeplattformen übermittelt werden",
    breadcrumb: {
      marketing: "Marketing",
      health: "Pixel-Gesundheit",
    },

    status: {
      operational: "Betriebsbereit",
      degraded: "Beeinträchtigt",
      offline: "Offline",
      lastCheck: "Letzte Überprüfung",
      ago: "vor {time}",
    },

    stats: {
      eventsSent: "Heute gesendete Ereignisse",
      errors: "Fehler",
      successRate: "Erfolgsquote",
      avgLatency: "Durchschn. Latenz",
    },

    actions: {
      testNow: "Jetzt testen",
      viewLogs: "Logs anzeigen",
      diagnose: "Diagnostizieren",
      resolve: "Beheben",
      ignore24h: "24h ignorieren",
      copyLogs: "Logs kopieren",
      retry: "Erneut senden",
      generateReport: "Wöchentlicher Gesundheitsbericht",
    },

    alerts: {
      title: "Erkannte Probleme",
      noIssues: "Keine Probleme erkannt",
      detectedOn: "Erkannt am {date}",
      severity: {
        critical: "Kritisch",
        warning: "Warnung",
        info: "Information",
      },
    },

    diagnostics: {
      title: "Automatische Diagnose",
      running: "Tests werden ausgeführt...",
      test1: "Plattform-API-Verbindung",
      test2: "Pixel-ID-Gültigkeit",
      test3: "Werbekonto-Berechtigungen",
      test4: "Ereigniskonfiguration",
      test5: "Test-Ereignis senden",
      passed: "Bestanden",
      failed: "Fehlgeschlagen",
      details: "Details",
    },

    logs: {
      title: "Ereignisverlauf",
      timestamp: "Zeitstempel",
      event: "Ereignis",
      platform: "Plattform",
      status: "Status",
      parameters: "Parameter",
      response: "API-Antwort",
      retryCount: "Versuche",
      filters: {
        dateRange: "Zeitraum",
        platform: "Plattform",
        status: "Status",
        eventType: "Ereignistyp",
        search: "Parameter suchen",
      },
      eventTypes: {
        pageView: "Seitenaufruf",
        purchase: "Kauf",
        lead: "Lead",
        addToCart: "In Warenkorb",
        initiateCheckout: "Checkout starten",
      },
      statuses: {
        sent: "Gesendet",
        failed: "Fehlgeschlagen",
        pending: "Ausstehend",
        retrying: "Erneuter Versuch",
      },
      export: "CSV exportieren",
    },

    notifications: {
      title: "E-Mail-Benachrichtigungen",
      enableAlerts: "E-Mail-Benachrichtigungen",
      recipients: "Empfänger",
      addRecipient: "Empfänger hinzufügen",
      frequency: "Häufigkeit",
      frequencies: {
        realtime: "Echtzeit",
        hourly: "Stündlich",
        daily: "Täglich",
        weekly: "Wöchentlich",
      },
      types: {
        pixelOffline: "Pixel offline >1h",
        highErrorRate: "Fehlerrate >10%",
        budgetExhausted: "Kampagnenbudget erschöpft",
        newConversion: "Neue Conversion",
      },
      save: "Einstellungen speichern",
    },

    report: {
      title: "Wöchentlicher Gesundheitsbericht",
      period: "Zeitraum: {start} - {end}",
      summary: "Zusammenfassung",
      uptime: "Verfügbarkeit",
      totalEvents: "Gesendete Ereignisse gesamt",
      globalSuccessRate: "Globale Erfolgsquote",
      platforms: "Plattformen",
      alertsTriggered: "Ausgelöste Warnungen",
      recommendations: "Empfehlungen",
      download: "PDF herunterladen",
    },

    platforms: {
      meta: "Meta (Facebook/Instagram)",
      google: "Google Ads",
      tiktok: "TikTok Ads",
      linkedin: "LinkedIn Ads",
    },

    messages: {
      testSuccess: "Test erfolgreich - Pixel funktioniert korrekt",
      testFailed: "Test fehlgeschlagen - Konfiguration überprüfen",
      diagnosticsComplete: "Diagnose abgeschlossen",
      logsCopied: "Logs in Zwischenablage kopiert",
      eventRetried: "Ereignis erfolgreich erneut gesendet",
      settingsSaved: "Einstellungen gespeichert",
      reportGenerated: "Bericht erfolgreich erstellt",
    },
  },

  it: {
    title: "Monitoraggio pixel tracking",
    subtitle:
      "Verifiche automatiche quotidiane garantiscono conversioni trasmesse correttamente alle piattaforme pubblicitarie",
    breadcrumb: {
      marketing: "Marketing",
      health: "Salute pixel",
    },

    status: {
      operational: "Operativo",
      degraded: "Degradato",
      offline: "Offline",
      lastCheck: "Ultima verifica",
      ago: "{time} fa",
    },

    stats: {
      eventsSent: "Eventi inviati oggi",
      errors: "Errori",
      successRate: "Tasso successo",
      avgLatency: "Latenza media",
    },

    actions: {
      testNow: "Testa ora",
      viewLogs: "Vedi log",
      diagnose: "Diagnostica",
      resolve: "Risolvi",
      ignore24h: "Ignora 24h",
      copyLogs: "Copia log",
      retry: "Reinvia",
      generateReport: "Report salute settimanale",
    },

    alerts: {
      title: "Problemi rilevati",
      noIssues: "Nessun problema rilevato",
      detectedOn: "Rilevato il {date}",
      severity: {
        critical: "Critico",
        warning: "Avviso",
        info: "Informazione",
      },
    },

    diagnostics: {
      title: "Diagnostica automatica",
      running: "Esecuzione test...",
      test1: "Connessione API piattaforma",
      test2: "Validità ID pixel",
      test3: "Permessi account pubblicitario",
      test4: "Configurazione eventi",
      test5: "Invio evento test",
      passed: "Superato",
      failed: "Fallito",
      details: "Dettagli",
    },

    logs: {
      title: "Storico eventi",
      timestamp: "Timestamp",
      event: "Evento",
      platform: "Piattaforma",
      status: "Stato",
      parameters: "Parametri",
      response: "Risposta API",
      retryCount: "Tentativi",
      filters: {
        dateRange: "Periodo",
        platform: "Piattaforma",
        status: "Stato",
        eventType: "Tipo evento",
        search: "Cerca parametri",
      },
      eventTypes: {
        pageView: "Visualizzazione pagina",
        purchase: "Acquisto",
        lead: "Lead",
        addToCart: "Aggiungi carrello",
        initiateCheckout: "Inizio checkout",
      },
      statuses: {
        sent: "Inviato",
        failed: "Fallito",
        pending: "In attesa",
        retrying: "Nuovo tentativo",
      },
      export: "Esporta CSV",
    },

    notifications: {
      title: "Notifiche email",
      enableAlerts: "Avvisi email",
      recipients: "Destinatari",
      addRecipient: "Aggiungi destinatario",
      frequency: "Frequenza",
      frequencies: {
        realtime: "Tempo reale",
        hourly: "Digest orario",
        daily: "Digest giornaliero",
        weekly: "Settimanale",
      },
      types: {
        pixelOffline: "Pixel offline >1h",
        highErrorRate: "Tasso errori >10%",
        budgetExhausted: "Budget campagna esaurito",
        newConversion: "Nuova conversione",
      },
      save: "Salva preferenze",
    },

    report: {
      title: "Report salute settimanale",
      period: "Periodo: {start} - {end}",
      summary: "Riepilogo",
      uptime: "Disponibilità",
      totalEvents: "Eventi totali inviati",
      globalSuccessRate: "Tasso successo globale",
      platforms: "Piattaforme",
      alertsTriggered: "Avvisi attivati",
      recommendations: "Raccomandazioni",
      download: "Scarica PDF",
    },

    platforms: {
      meta: "Meta (Facebook/Instagram)",
      google: "Google Ads",
      tiktok: "TikTok Ads",
      linkedin: "LinkedIn Ads",
    },

    messages: {
      testSuccess: "Test riuscito - Pixel funziona correttamente",
      testFailed: "Test fallito - Verifica configurazione",
      diagnosticsComplete: "Diagnostica completata",
      logsCopied: "Log copiati negli appunti",
      eventRetried: "Evento reinviato con successo",
      settingsSaved: "Preferenze salvate",
      reportGenerated: "Report generato con successo",
    },
  },

  en: {
    title: "Tracking pixels monitoring",
    subtitle:
      "Daily automatic checks ensure conversions are correctly reported to advertising platforms",
    breadcrumb: {
      marketing: "Marketing",
      health: "Pixels health",
    },

    status: {
      operational: "Operational",
      degraded: "Degraded",
      offline: "Offline",
      lastCheck: "Last check",
      ago: "{time} ago",
    },

    stats: {
      eventsSent: "Events sent today",
      errors: "Errors",
      successRate: "Success rate",
      avgLatency: "Avg latency",
    },

    actions: {
      testNow: "Test now",
      viewLogs: "View logs",
      diagnose: "Diagnose",
      resolve: "Resolve",
      ignore24h: "Ignore 24h",
      copyLogs: "Copy logs",
      retry: "Retry",
      generateReport: "Weekly health report",
    },

    alerts: {
      title: "Detected issues",
      noIssues: "No issues detected",
      detectedOn: "Detected on {date}",
      severity: {
        critical: "Critical",
        warning: "Warning",
        info: "Information",
      },
    },

    diagnostics: {
      title: "Automated diagnostics",
      running: "Running tests...",
      test1: "Platform API connection",
      test2: "Pixel ID validity",
      test3: "Ad account permissions",
      test4: "Events configuration",
      test5: "Send test event",
      passed: "Passed",
      failed: "Failed",
      details: "Details",
    },

    logs: {
      title: "Events history",
      timestamp: "Timestamp",
      event: "Event",
      platform: "Platform",
      status: "Status",
      parameters: "Parameters",
      response: "API response",
      retryCount: "Retries",
      filters: {
        dateRange: "Date range",
        platform: "Platform",
        status: "Status",
        eventType: "Event type",
        search: "Search parameters",
      },
      eventTypes: {
        pageView: "Page view",
        purchase: "Purchase",
        lead: "Lead",
        addToCart: "Add to cart",
        initiateCheckout: "Initiate checkout",
      },
      statuses: {
        sent: "Sent",
        failed: "Failed",
        pending: "Pending",
        retrying: "Retrying",
      },
      export: "Export CSV",
    },

    notifications: {
      title: "Email notifications",
      enableAlerts: "Email alerts",
      recipients: "Recipients",
      addRecipient: "Add recipient",
      frequency: "Frequency",
      frequencies: {
        realtime: "Real-time",
        hourly: "Hourly digest",
        daily: "Daily digest",
        weekly: "Weekly",
      },
      types: {
        pixelOffline: "Pixel offline >1h",
        highErrorRate: "Error rate >10%",
        budgetExhausted: "Campaign budget exhausted",
        newConversion: "New conversion",
      },
      save: "Save preferences",
    },

    report: {
      title: "Weekly health report",
      period: "Period: {start} - {end}",
      summary: "Summary",
      uptime: "Uptime",
      totalEvents: "Total events sent",
      globalSuccessRate: "Global success rate",
      platforms: "Platforms",
      alertsTriggered: "Alerts triggered",
      recommendations: "Recommendations",
      download: "Download PDF",
    },

    platforms: {
      meta: "Meta (Facebook/Instagram)",
      google: "Google Ads",
      tiktok: "TikTok Ads",
      linkedin: "LinkedIn Ads",
    },

    messages: {
      testSuccess: "Test successful - Pixel working correctly",
      testFailed: "Test failed - Check configuration",
      diagnosticsComplete: "Diagnostics completed",
      logsCopied: "Logs copied to clipboard",
      eventRetried: "Event retried successfully",
      settingsSaved: "Preferences saved",
      reportGenerated: "Report generated successfully",
    },
  },
} as const;

export type PixelsMonitoringTranslations = typeof pixelsMonitoringTranslations;
