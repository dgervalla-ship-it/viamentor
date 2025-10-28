/**
 * VIAMENTOR - AI Responses i18n
 * Traductions FR/DE/IT/EN pour système réponses IA avis
 */

// ============================================================================
// TYPES
// ============================================================================

export type AIResponsesLocale = "fr" | "de" | "it" | "en";

export interface AIResponsesTranslations {
  // Page principale
  page: {
    title: string;
    breadcrumb: string;
    description: string;
  };

  // Alert info
  alert: {
    aiValue: string;
  };

  // Configuration IA École
  schoolConfig: {
    title: string;
    subtitle: string;
    values: {
      label: string;
      placeholder: string;
      help: string;
    };
    tone: {
      label: string;
      placeholder: string;
      help: string;
    };
    keywords: {
      label: string;
      placeholder: string;
      help: string;
    };
    avoid: {
      label: string;
      placeholder: string;
      help: string;
    };
    language: {
      label: string;
      options: {
        fr: string;
        de: string;
        it: string;
        en: string;
      };
    };
    claudeAI: {
      label: string;
      description: string;
    };
    apiKey: {
      label: string;
      configured: string;
      notConfigured: string;
    };
    save: string;
  };

  // Templates réponses
  templates: {
    title: string;
    subtitle: string;
    table: {
      name: string;
      trigger: string;
      template: string;
      length: string;
      active: string;
      usage: string;
      actions: string;
    };
    triggers: {
      rating5: string;
      rating4: string;
      ratingNegative: string;
      keywords: string;
    };
    lengths: {
      short: string;
      medium: string;
      long: string;
    };
    actions: {
      edit: string;
      duplicate: string;
      test: string;
      delete: string;
    };
    addNew: string;
    variables: {
      title: string;
      studentName: string;
      schoolName: string;
      rating: string;
      reviewText: string;
      specificPoint: string;
    };
  };

  // Automatisation
  automation: {
    title: string;
    autoPositive: {
      label: string;
      description: string;
    };
    draftsNegative: {
      label: string;
      description: string;
    };
    responseDelay: {
      label: string;
      options: {
        immediate: string;
        "1hour": string;
        "4hours": string;
        "24hours": string;
      };
    };
  };

  // Modération
  moderation: {
    title: string;
    queue: string;
    originalReview: string;
    aiResponse: string;
    qualityScore: string;
    sentiment: {
      positive: string;
      neutral: string;
      negative: string;
    };
    actions: {
      approve: string;
      edit: string;
      regenerate: string;
      reject: string;
      manual: string;
    };
    versions: string;
    notes: {
      label: string;
      placeholder: string;
    };
  };

  // Apprentissage
  learning: {
    title: string;
    subtitle: string;
    table: {
      date: string;
      originalAI: string;
      humanFinal: string;
      difference: string;
      notes: string;
    };
    retrain: string;
    retrainDescription: string;
    metrics: {
      totalCorrections: string;
      averageImprovement: string;
      lastUpdate: string;
    };
  };

  // Métriques
  metrics: {
    totalGenerated: string;
    autoPublished: string;
    humanModerated: string;
    averageQuality: string;
    responseTime: string;
    learningPoints: string;
  };

  // Messages
  messages: {
    configSaved: string;
    templateSaved: string;
    responseApproved: string;
    responseRejected: string;
    retrainStarted: string;
    testSent: string;
    error: string;
  };

  // Statuts
  status: {
    published: string;
    pending: string;
    rejected: string;
    draft: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const aiResponsesTranslations: Record<
  AIResponsesLocale,
  AIResponsesTranslations
> = {
  fr: {
    page: {
      title: "Configurer IA réponses avis",
      breadcrumb: "Avis / Réponses automatiques",
      description:
        "IA personnalisée génère réponses authentiques cohérentes ton école.",
    },
    alert: {
      aiValue:
        "IA personnalisée génère réponses authentiques cohérentes ton école.",
    },
    schoolConfig: {
      title: "Personnalisation IA votre école",
      subtitle: "Entraînez IA style communication unique",
      values: {
        label: "Valeurs école",
        placeholder:
          "Professionnalisme, Bienveillance, Excellence pédagogique, Sécurité priorité",
        help: "Définissez la personnalité et l'identité de votre école",
      },
      tone: {
        label: "Ton souhaité",
        placeholder: "Chaleureux mais professionnel, Empathique, Reconnaissant",
        help: "Décrivez le sentiment et l'émotion à transmettre",
      },
      keywords: {
        label: "Mots-clés à inclure",
        placeholder: "sécurité, qualité, merci, équipe, formation",
        help: "Vocabulaire spécifique à votre domaine d'expertise",
      },
      avoid: {
        label: "Phrases à éviter",
        placeholder: "Malheureusement, Désolé problème, Excuses",
        help: "Expressions négatives à filtrer pour rester positif",
      },
      language: {
        label: "Langue principale",
        options: {
          fr: "Français",
          de: "Deutsch",
          it: "Italiano",
          en: "English",
        },
      },
      claudeAI: {
        label: "Utiliser IA Claude Anthropic",
        description:
          "Modèle avancé recommandé pour des réponses de qualité supérieure",
      },
      apiKey: {
        label: "Clé API",
        configured: "Configurée et sécurisée",
        notConfigured: "Non configurée",
      },
      save: "Enregistrer configuration",
    },
    templates: {
      title: "Bibliothèque templates IA",
      subtitle: "Modèles adaptatifs selon contexte avis",
      table: {
        name: "Nom template",
        trigger: "Déclencheur",
        template: "Template base",
        length: "Longueur",
        active: "Actif",
        usage: "Utilisations",
        actions: "Actions",
      },
      triggers: {
        rating5: "5 étoiles",
        rating4: "4 étoiles",
        ratingNegative: "1-3 étoiles négatif",
        keywords: "Mots-clés détectés",
      },
      lengths: {
        short: "Court (50 mots)",
        medium: "Moyen (100 mots)",
        long: "Long (150 mots)",
      },
      actions: {
        edit: "Modifier",
        duplicate: "Dupliquer",
        test: "Tester",
        delete: "Supprimer",
      },
      addNew: "Nouveau template",
      variables: {
        title: "Variables disponibles",
        studentName: "Nom de l'élève",
        schoolName: "Nom de l'école",
        rating: "Note de l'avis",
        reviewText: "Texte de l'avis",
        specificPoint: "Point spécifique extrait par IA",
      },
    },
    automation: {
      title: "Automatisation réponses",
      autoPositive: {
        label: "Réponses auto avis positifs",
        description:
          "Publier automatiquement les réponses aux avis 4-5 étoiles",
      },
      draftsNegative: {
        label: "Brouillons avis négatifs",
        description:
          "Créer des brouillons pour révision humaine des avis négatifs",
      },
      responseDelay: {
        label: "Délai réponse",
        options: {
          immediate: "Immédiat",
          "1hour": "1 heure",
          "4hours": "4 heures",
          "24hours": "24 heures max",
        },
      },
    },
    moderation: {
      title: "Modération réponses",
      queue: "File d'attente",
      originalReview: "Avis original",
      aiResponse: "Réponse IA générée",
      qualityScore: "Score qualité",
      sentiment: {
        positive: "Positif",
        neutral: "Neutre",
        negative: "Négatif",
      },
      actions: {
        approve: "Approuver",
        edit: "Modifier",
        regenerate: "Régénérer",
        reject: "Rejeter",
        manual: "Répondre manuellement",
      },
      versions: "Versions",
      notes: {
        label: "Notes de modération",
        placeholder: "Commentaires sur les modifications...",
      },
    },
    learning: {
      title: "Amélioration IA",
      subtitle: "IA apprend préférences corrections",
      table: {
        date: "Date correction",
        originalAI: "Réponse IA originale",
        humanFinal: "Réponse humaine finale",
        difference: "Différence",
        notes: "Notes d'amélioration",
      },
      retrain: "Réentraîner modèle",
      retrainDescription: "Améliorer l'IA avec les corrections accumulées",
      metrics: {
        totalCorrections: "Corrections totales",
        averageImprovement: "Amélioration moyenne",
        lastUpdate: "Dernière mise à jour",
      },
    },
    metrics: {
      totalGenerated: "Réponses générées",
      autoPublished: "Auto-publiées",
      humanModerated: "Modérées humainement",
      averageQuality: "Qualité moyenne",
      responseTime: "Temps de réponse",
      learningPoints: "Points d'apprentissage",
    },
    messages: {
      configSaved: "Configuration IA sauvegardée avec succès",
      templateSaved: "Template sauvegardé avec succès",
      responseApproved: "Réponse approuvée et publiée",
      responseRejected: "Réponse rejetée",
      retrainStarted: "Réentraînement du modèle démarré",
      testSent: "Email de test envoyé",
      error: "Une erreur s'est produite",
    },
    status: {
      published: "Publié",
      pending: "En attente",
      rejected: "Rejeté",
      draft: "Brouillon",
    },
  },

  de: {
    page: {
      title: "KI-Antworten konfigurieren",
      breadcrumb: "Bewertungen / Automatische Antworten",
      description:
        "Personalisierte KI generiert authentische, konsistente Antworten im Ton Ihrer Schule.",
    },
    alert: {
      aiValue:
        "Personalisierte KI generiert authentische, konsistente Antworten im Ton Ihrer Schule.",
    },
    schoolConfig: {
      title: "KI-Personalisierung Ihrer Schule",
      subtitle:
        "Trainieren Sie die KI auf Ihren einzigartigen Kommunikationsstil",
      values: {
        label: "Schulwerte",
        placeholder:
          "Professionalität, Wohlwollen, Pädagogische Exzellenz, Sicherheit Priorität",
        help: "Definieren Sie die Persönlichkeit und Identität Ihrer Schule",
      },
      tone: {
        label: "Gewünschter Ton",
        placeholder: "Herzlich aber professionell, Empathisch, Dankbar",
        help: "Beschreiben Sie das zu vermittelnde Gefühl und die Emotion",
      },
      keywords: {
        label: "Einzuschließende Schlüsselwörter",
        placeholder: "Sicherheit, Qualität, Danke, Team, Ausbildung",
        help: "Spezifisches Vokabular Ihres Fachbereichs",
      },
      avoid: {
        label: "Zu vermeidende Phrasen",
        placeholder: "Leider, Entschuldigung Problem, Entschuldigungen",
        help: "Negative Ausdrücke filtern, um positiv zu bleiben",
      },
      language: {
        label: "Hauptsprache",
        options: {
          fr: "Français",
          de: "Deutsch",
          it: "Italiano",
          en: "English",
        },
      },
      claudeAI: {
        label: "Claude Anthropic KI verwenden",
        description: "Erweiterte Modell empfohlen für höhere Antwortqualität",
      },
      apiKey: {
        label: "API-Schlüssel",
        configured: "Konfiguriert und gesichert",
        notConfigured: "Nicht konfiguriert",
      },
      save: "Konfiguration speichern",
    },
    templates: {
      title: "KI-Template-Bibliothek",
      subtitle: "Adaptive Modelle je nach Bewertungskontext",
      table: {
        name: "Template-Name",
        trigger: "Auslöser",
        template: "Basis-Template",
        length: "Länge",
        active: "Aktiv",
        usage: "Verwendungen",
        actions: "Aktionen",
      },
      triggers: {
        rating5: "5 Sterne",
        rating4: "4 Sterne",
        ratingNegative: "1-3 Sterne negativ",
        keywords: "Erkannte Schlüsselwörter",
      },
      lengths: {
        short: "Kurz (50 Wörter)",
        medium: "Mittel (100 Wörter)",
        long: "Lang (150 Wörter)",
      },
      actions: {
        edit: "Bearbeiten",
        duplicate: "Duplizieren",
        test: "Testen",
        delete: "Löschen",
      },
      addNew: "Neues Template",
      variables: {
        title: "Verfügbare Variablen",
        studentName: "Name des Schülers",
        schoolName: "Name der Schule",
        rating: "Bewertungsnote",
        reviewText: "Bewertungstext",
        specificPoint: "Spezifischer von KI extrahierter Punkt",
      },
    },
    automation: {
      title: "Antwort-Automatisierung",
      autoPositive: {
        label: "Auto-Antworten positive Bewertungen",
        description:
          "Automatisch Antworten auf 4-5 Sterne Bewertungen veröffentlichen",
      },
      draftsNegative: {
        label: "Entwürfe negative Bewertungen",
        description:
          "Entwürfe für menschliche Überprüfung negativer Bewertungen erstellen",
      },
      responseDelay: {
        label: "Antwort-Verzögerung",
        options: {
          immediate: "Sofort",
          "1hour": "1 Stunde",
          "4hours": "4 Stunden",
          "24hours": "24 Stunden max",
        },
      },
    },
    moderation: {
      title: "Antwort-Moderation",
      queue: "Warteschlange",
      originalReview: "Original-Bewertung",
      aiResponse: "Generierte KI-Antwort",
      qualityScore: "Qualitätsscore",
      sentiment: {
        positive: "Positiv",
        neutral: "Neutral",
        negative: "Negativ",
      },
      actions: {
        approve: "Genehmigen",
        edit: "Bearbeiten",
        regenerate: "Regenerieren",
        reject: "Ablehnen",
        manual: "Manuell antworten",
      },
      versions: "Versionen",
      notes: {
        label: "Moderationsnotizen",
        placeholder: "Kommentare zu Änderungen...",
      },
    },
    learning: {
      title: "KI-Verbesserung",
      subtitle: "KI lernt Präferenzen und Korrekturen",
      table: {
        date: "Korrekturdatum",
        originalAI: "Original KI-Antwort",
        humanFinal: "Finale menschliche Antwort",
        difference: "Unterschied",
        notes: "Verbesserungsnotizen",
      },
      retrain: "Modell neu trainieren",
      retrainDescription: "KI mit gesammelten Korrekturen verbessern",
      metrics: {
        totalCorrections: "Gesamtkorrekturen",
        averageImprovement: "Durchschnittliche Verbesserung",
        lastUpdate: "Letztes Update",
      },
    },
    metrics: {
      totalGenerated: "Generierte Antworten",
      autoPublished: "Auto-veröffentlicht",
      humanModerated: "Menschlich moderiert",
      averageQuality: "Durchschnittliche Qualität",
      responseTime: "Antwortzeit",
      learningPoints: "Lernpunkte",
    },
    messages: {
      configSaved: "KI-Konfiguration erfolgreich gespeichert",
      templateSaved: "Template erfolgreich gespeichert",
      responseApproved: "Antwort genehmigt und veröffentlicht",
      responseRejected: "Antwort abgelehnt",
      retrainStarted: "Modell-Neutraining gestartet",
      testSent: "Test-E-Mail gesendet",
      error: "Ein Fehler ist aufgetreten",
    },
    status: {
      published: "Veröffentlicht",
      pending: "Ausstehend",
      rejected: "Abgelehnt",
      draft: "Entwurf",
    },
  },

  it: {
    page: {
      title: "Configurare risposte IA",
      breadcrumb: "Recensioni / Risposte automatiche",
      description:
        "IA personalizzata genera risposte autentiche coerenti con il tono della scuola.",
    },
    alert: {
      aiValue:
        "IA personalizzata genera risposte autentiche coerenti con il tono della scuola.",
    },
    schoolConfig: {
      title: "Personalizzazione IA della vostra scuola",
      subtitle: "Addestrate l'IA al vostro stile di comunicazione unico",
      values: {
        label: "Valori della scuola",
        placeholder:
          "Professionalità, Benevolenza, Eccellenza pedagogica, Sicurezza priorità",
        help: "Definite la personalità e l'identità della vostra scuola",
      },
      tone: {
        label: "Tono desiderato",
        placeholder: "Caloroso ma professionale, Empatico, Riconoscente",
        help: "Descrivete il sentimento e l'emozione da trasmettere",
      },
      keywords: {
        label: "Parole chiave da includere",
        placeholder: "sicurezza, qualità, grazie, team, formazione",
        help: "Vocabolario specifico del vostro settore di competenza",
      },
      avoid: {
        label: "Frasi da evitare",
        placeholder: "Sfortunatamente, Scusate problema, Scuse",
        help: "Espressioni negative da filtrare per rimanere positivi",
      },
      language: {
        label: "Lingua principale",
        options: {
          fr: "Français",
          de: "Deutsch",
          it: "Italiano",
          en: "English",
        },
      },
      claudeAI: {
        label: "Utilizzare IA Claude Anthropic",
        description:
          "Modello avanzato raccomandato per risposte di qualità superiore",
      },
      apiKey: {
        label: "Chiave API",
        configured: "Configurata e sicura",
        notConfigured: "Non configurata",
      },
      save: "Salvare configurazione",
    },
    templates: {
      title: "Libreria template IA",
      subtitle: "Modelli adattivi secondo il contesto delle recensioni",
      table: {
        name: "Nome template",
        trigger: "Trigger",
        template: "Template base",
        length: "Lunghezza",
        active: "Attivo",
        usage: "Utilizzi",
        actions: "Azioni",
      },
      triggers: {
        rating5: "5 stelle",
        rating4: "4 stelle",
        ratingNegative: "1-3 stelle negativo",
        keywords: "Parole chiave rilevate",
      },
      lengths: {
        short: "Corto (50 parole)",
        medium: "Medio (100 parole)",
        long: "Lungo (150 parole)",
      },
      actions: {
        edit: "Modificare",
        duplicate: "Duplicare",
        test: "Testare",
        delete: "Eliminare",
      },
      addNew: "Nuovo template",
      variables: {
        title: "Variabili disponibili",
        studentName: "Nome dell'allievo",
        schoolName: "Nome della scuola",
        rating: "Voto della recensione",
        reviewText: "Testo della recensione",
        specificPoint: "Punto specifico estratto dall'IA",
      },
    },
    automation: {
      title: "Automazione risposte",
      autoPositive: {
        label: "Risposte auto recensioni positive",
        description:
          "Pubblicare automaticamente le risposte alle recensioni 4-5 stelle",
      },
      draftsNegative: {
        label: "Bozze recensioni negative",
        description:
          "Creare bozze per revisione umana delle recensioni negative",
      },
      responseDelay: {
        label: "Ritardo risposta",
        options: {
          immediate: "Immediato",
          "1hour": "1 ora",
          "4hours": "4 ore",
          "24hours": "24 ore max",
        },
      },
    },
    moderation: {
      title: "Moderazione risposte",
      queue: "Coda di attesa",
      originalReview: "Recensione originale",
      aiResponse: "Risposta IA generata",
      qualityScore: "Punteggio qualità",
      sentiment: {
        positive: "Positivo",
        neutral: "Neutrale",
        negative: "Negativo",
      },
      actions: {
        approve: "Approvare",
        edit: "Modificare",
        regenerate: "Rigenerare",
        reject: "Rifiutare",
        manual: "Rispondere manualmente",
      },
      versions: "Versioni",
      notes: {
        label: "Note di moderazione",
        placeholder: "Commenti sulle modifiche...",
      },
    },
    learning: {
      title: "Miglioramento IA",
      subtitle: "L'IA impara preferenze e correzioni",
      table: {
        date: "Data correzione",
        originalAI: "Risposta IA originale",
        humanFinal: "Risposta umana finale",
        difference: "Differenza",
        notes: "Note di miglioramento",
      },
      retrain: "Riaddestare modello",
      retrainDescription: "Migliorare l'IA con le correzioni accumulate",
      metrics: {
        totalCorrections: "Correzioni totali",
        averageImprovement: "Miglioramento medio",
        lastUpdate: "Ultimo aggiornamento",
      },
    },
    metrics: {
      totalGenerated: "Risposte generate",
      autoPublished: "Auto-pubblicate",
      humanModerated: "Moderate umanamente",
      averageQuality: "Qualità media",
      responseTime: "Tempo di risposta",
      learningPoints: "Punti di apprendimento",
    },
    messages: {
      configSaved: "Configurazione IA salvata con successo",
      templateSaved: "Template salvato con successo",
      responseApproved: "Risposta approvata e pubblicata",
      responseRejected: "Risposta rifiutata",
      retrainStarted: "Riaddestramento del modello avviato",
      testSent: "Email di test inviata",
      error: "Si è verificato un errore",
    },
    status: {
      published: "Pubblicato",
      pending: "In attesa",
      rejected: "Rifiutato",
      draft: "Bozza",
    },
  },

  en: {
    page: {
      title: "Configure AI responses",
      breadcrumb: "Reviews / Automatic responses",
      description:
        "Personalized AI generates authentic responses consistent with your school's tone.",
    },
    alert: {
      aiValue:
        "Personalized AI generates authentic responses consistent with your school's tone.",
    },
    schoolConfig: {
      title: "AI personalization for your school",
      subtitle: "Train AI to your unique communication style",
      values: {
        label: "School values",
        placeholder:
          "Professionalism, Kindness, Pedagogical excellence, Safety priority",
        help: "Define your school's personality and identity",
      },
      tone: {
        label: "Desired tone",
        placeholder: "Warm but professional, Empathetic, Grateful",
        help: "Describe the feeling and emotion to convey",
      },
      keywords: {
        label: "Keywords to include",
        placeholder: "safety, quality, thank you, team, training",
        help: "Specific vocabulary of your field of expertise",
      },
      avoid: {
        label: "Phrases to avoid",
        placeholder: "Unfortunately, Sorry problem, Apologies",
        help: "Filter negative expressions to stay positive",
      },
      language: {
        label: "Primary language",
        options: {
          fr: "Français",
          de: "Deutsch",
          it: "Italiano",
          en: "English",
        },
      },
      claudeAI: {
        label: "Use Claude Anthropic AI",
        description: "Advanced model recommended for superior response quality",
      },
      apiKey: {
        label: "API Key",
        configured: "Configured and secure",
        notConfigured: "Not configured",
      },
      save: "Save configuration",
    },
    templates: {
      title: "AI template library",
      subtitle: "Adaptive models according to review context",
      table: {
        name: "Template name",
        trigger: "Trigger",
        template: "Base template",
        length: "Length",
        active: "Active",
        usage: "Usage",
        actions: "Actions",
      },
      triggers: {
        rating5: "5 stars",
        rating4: "4 stars",
        ratingNegative: "1-3 stars negative",
        keywords: "Detected keywords",
      },
      lengths: {
        short: "Short (50 words)",
        medium: "Medium (100 words)",
        long: "Long (150 words)",
      },
      actions: {
        edit: "Edit",
        duplicate: "Duplicate",
        test: "Test",
        delete: "Delete",
      },
      addNew: "New template",
      variables: {
        title: "Available variables",
        studentName: "Student name",
        schoolName: "School name",
        rating: "Review rating",
        reviewText: "Review text",
        specificPoint: "Specific point extracted by AI",
      },
    },
    automation: {
      title: "Response automation",
      autoPositive: {
        label: "Auto responses positive reviews",
        description: "Automatically publish responses to 4-5 star reviews",
      },
      draftsNegative: {
        label: "Drafts negative reviews",
        description: "Create drafts for human review of negative reviews",
      },
      responseDelay: {
        label: "Response delay",
        options: {
          immediate: "Immediate",
          "1hour": "1 hour",
          "4hours": "4 hours",
          "24hours": "24 hours max",
        },
      },
    },
    moderation: {
      title: "Response moderation",
      queue: "Queue",
      originalReview: "Original review",
      aiResponse: "Generated AI response",
      qualityScore: "Quality score",
      sentiment: {
        positive: "Positive",
        neutral: "Neutral",
        negative: "Negative",
      },
      actions: {
        approve: "Approve",
        edit: "Edit",
        regenerate: "Regenerate",
        reject: "Reject",
        manual: "Respond manually",
      },
      versions: "Versions",
      notes: {
        label: "Moderation notes",
        placeholder: "Comments on changes...",
      },
    },
    learning: {
      title: "AI improvement",
      subtitle: "AI learns preferences and corrections",
      table: {
        date: "Correction date",
        originalAI: "Original AI response",
        humanFinal: "Final human response",
        difference: "Difference",
        notes: "Improvement notes",
      },
      retrain: "Retrain model",
      retrainDescription: "Improve AI with accumulated corrections",
      metrics: {
        totalCorrections: "Total corrections",
        averageImprovement: "Average improvement",
        lastUpdate: "Last update",
      },
    },
    metrics: {
      totalGenerated: "Generated responses",
      autoPublished: "Auto-published",
      humanModerated: "Human moderated",
      averageQuality: "Average quality",
      responseTime: "Response time",
      learningPoints: "Learning points",
    },
    messages: {
      configSaved: "AI configuration saved successfully",
      templateSaved: "Template saved successfully",
      responseApproved: "Response approved and published",
      responseRejected: "Response rejected",
      retrainStarted: "Model retraining started",
      testSent: "Test email sent",
      error: "An error occurred",
    },
    status: {
      published: "Published",
      pending: "Pending",
      rejected: "Rejected",
      draft: "Draft",
    },
  },
};
