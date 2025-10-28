/**
 * VIAMENTOR - Support Tickets i18n
 * Traductions FR/DE/IT/EN pour système support helpdesk
 */

// ============================================================================
// TYPES
// ============================================================================

export type SupportLocale = "fr" | "de" | "it" | "en";

export interface SupportTranslations {
  page: {
    dashboard: {
      title: string;
      description: string;
      breadcrumb: string;
    };
    tickets: {
      title: string;
      description: string;
      breadcrumb: string;
    };
    ticketDetail: {
      title: string;
      breadcrumb: string;
    };
    kb: {
      title: string;
      description: string;
      breadcrumb: string;
    };
    kbArticle: {
      breadcrumb: string;
    };
  };
  stats: {
    openTickets: string;
    pendingResponse: string;
    resolvedToday: string;
    npsScore: string;
    avgResponseTime: string;
    slaRisk: string;
    dailyTarget: string;
    minutes: string;
  };
  tickets: {
    number: string;
    created: string;
    client: string;
    subject: string;
    priority: string;
    status: string;
    assignedTo: string;
    actions: string;
    slaBreached: string;
    noTickets: string;
  };
  priority: {
    urgent: string;
    high: string;
    normal: string;
    low: string;
  };
  status: {
    new: string;
    assigned: string;
    inProgress: string;
    waitingClient: string;
    resolved: string;
    closed: string;
  };
  filters: {
    priority: string;
    status: string;
    agent: string;
    slaBreached: string;
    allPriorities: string;
    allStatuses: string;
    allAgents: string;
  };
  bulkActions: {
    title: string;
    assign: string;
    transfer: string;
    escalate: string;
    close: string;
    selected: string;
  };
  detail: {
    clientInfo: string;
    timeline: string;
    initialMessage: string;
    responses: string;
    internalNotes: string;
    attachments: string;
    macros: string;
    sendResponse: string;
    resolveTicket: string;
    closeTicket: string;
    assignTo: string;
    changePriority: string;
    changeStatus: string;
    addNote: string;
    uploadFile: string;
    dragDrop: string;
    maxSize: string;
  };
  kb: {
    search: string;
    searchPlaceholder: string;
    categories: string;
    articles: string;
    views: string;
    rating: string;
    tags: string;
    relatedArticles: string;
    tableOfContents: string;
    helpful: string;
    yes: string;
    no: string;
    thanksFeedback: string;
  };
  categories: {
    gettingStarted: string;
    billing: string;
    planning: string;
    technical: string;
  };
  chat: {
    title: string;
    available: string;
    away: string;
    businessHours: string;
    typeMessage: string;
    send: string;
    typing: string;
    transferAgent: string;
    endChat: string;
  };
  actions: {
    viewDetail: string;
    assign: string;
    resolve: string;
    close: string;
    export: string;
    refresh: string;
    createTicket: string;
    search: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const supportTranslations: Record<SupportLocale, SupportTranslations> = {
  fr: {
    page: {
      dashboard: {
        title: "Centre support client",
        description: "Gestion des tickets et support utilisateurs",
        breadcrumb: "Support / Tableau de bord",
      },
      tickets: {
        title: "Gestion des tickets",
        description: "Liste et suivi des tickets support",
        breadcrumb: "Support / Tickets",
      },
      ticketDetail: {
        title: "Détail du ticket",
        breadcrumb: "Support / Tickets / Détail",
      },
      kb: {
        title: "Base de connaissances",
        description: "Articles d'aide et documentation",
        breadcrumb: "Support / Base de connaissances",
      },
      kbArticle: {
        breadcrumb: "Support / Base de connaissances / Article",
      },
    },
    stats: {
      openTickets: "Tickets ouverts",
      pendingResponse: "En attente réponse",
      resolvedToday: "Résolus aujourd'hui",
      npsScore: "Score NPS",
      avgResponseTime: "Temps réponse moyen",
      slaRisk: "Risque SLA",
      dailyTarget: "Objectif quotidien",
      minutes: "minutes",
    },
    tickets: {
      number: "Numéro",
      created: "Date création",
      client: "Client",
      subject: "Sujet",
      priority: "Priorité",
      status: "Statut",
      assignedTo: "Assigné à",
      actions: "Actions",
      slaBreached: "SLA dépassé",
      noTickets: "Aucun ticket trouvé",
    },
    priority: {
      urgent: "Urgente",
      high: "Haute",
      normal: "Normale",
      low: "Basse",
    },
    status: {
      new: "Nouveau",
      assigned: "Assigné",
      inProgress: "En cours",
      waitingClient: "Attente client",
      resolved: "Résolu",
      closed: "Fermé",
    },
    filters: {
      priority: "Priorité",
      status: "Statut",
      agent: "Agent",
      slaBreached: "SLA dépassé",
      allPriorities: "Toutes les priorités",
      allStatuses: "Tous les statuts",
      allAgents: "Tous les agents",
    },
    bulkActions: {
      title: "Actions groupées",
      assign: "Assigner",
      transfer: "Transférer",
      escalate: "Escalader",
      close: "Fermer",
      selected: "sélectionné(s)",
    },
    detail: {
      clientInfo: "Informations client",
      timeline: "Chronologie",
      initialMessage: "Message initial",
      responses: "Réponses",
      internalNotes: "Notes internes",
      attachments: "Pièces jointes",
      macros: "Modèles rapides",
      sendResponse: "Envoyer réponse",
      resolveTicket: "Résoudre ticket",
      closeTicket: "Fermer ticket",
      assignTo: "Assigner à",
      changePriority: "Changer priorité",
      changeStatus: "Changer statut",
      addNote: "Ajouter note",
      uploadFile: "Télécharger fichier",
      dragDrop: "Glisser-déposer ou cliquer",
      maxSize: "Taille max 10MB",
    },
    kb: {
      search: "Rechercher",
      searchPlaceholder: "Rechercher dans la base de connaissances...",
      categories: "Catégories",
      articles: "Articles",
      views: "vues",
      rating: "Note",
      tags: "Tags",
      relatedArticles: "Articles connexes",
      tableOfContents: "Table des matières",
      helpful: "Cet article vous a-t-il été utile ?",
      yes: "Oui",
      no: "Non",
      thanksFeedback: "Merci pour votre retour !",
    },
    categories: {
      gettingStarted: "Premiers pas",
      billing: "Facturation & Paiements",
      planning: "Planning & Leçons",
      technical: "Problèmes techniques",
    },
    chat: {
      title: "Aide en direct",
      available: "Agent disponible",
      away: "Absent",
      businessHours: "Lun-Ven 9h-18h CET",
      typeMessage: "Tapez votre message...",
      send: "Envoyer",
      typing: "En train d'écrire...",
      transferAgent: "Transférer à un agent",
      endChat: "Terminer la conversation",
    },
    actions: {
      viewDetail: "Voir détail",
      assign: "Assigner",
      resolve: "Résoudre",
      close: "Fermer",
      export: "Exporter",
      refresh: "Actualiser",
      createTicket: "Créer ticket",
      search: "Rechercher",
    },
  },
  de: {
    page: {
      dashboard: {
        title: "Kunden-Support-Center",
        description: "Ticket-Verwaltung und Benutzersupport",
        breadcrumb: "Support / Dashboard",
      },
      tickets: {
        title: "Ticket-Verwaltung",
        description: "Liste und Verfolgung von Support-Tickets",
        breadcrumb: "Support / Tickets",
      },
      ticketDetail: {
        title: "Ticket-Details",
        breadcrumb: "Support / Tickets / Details",
      },
      kb: {
        title: "Wissensdatenbank",
        description: "Hilfeartikel und Dokumentation",
        breadcrumb: "Support / Wissensdatenbank",
      },
      kbArticle: {
        breadcrumb: "Support / Wissensdatenbank / Artikel",
      },
    },
    stats: {
      openTickets: "Offene Tickets",
      pendingResponse: "Warten auf Antwort",
      resolvedToday: "Heute gelöst",
      npsScore: "NPS-Score",
      avgResponseTime: "Durchschn. Antwortzeit",
      slaRisk: "SLA-Risiko",
      dailyTarget: "Tagesziel",
      minutes: "Minuten",
    },
    tickets: {
      number: "Nummer",
      created: "Erstellungsdatum",
      client: "Kunde",
      subject: "Betreff",
      priority: "Priorität",
      status: "Status",
      assignedTo: "Zugewiesen an",
      actions: "Aktionen",
      slaBreached: "SLA überschritten",
      noTickets: "Keine Tickets gefunden",
    },
    priority: {
      urgent: "Dringend",
      high: "Hoch",
      normal: "Normal",
      low: "Niedrig",
    },
    status: {
      new: "Neu",
      assigned: "Zugewiesen",
      inProgress: "In Bearbeitung",
      waitingClient: "Warten auf Kunde",
      resolved: "Gelöst",
      closed: "Geschlossen",
    },
    filters: {
      priority: "Priorität",
      status: "Status",
      agent: "Agent",
      slaBreached: "SLA überschritten",
      allPriorities: "Alle Prioritäten",
      allStatuses: "Alle Status",
      allAgents: "Alle Agenten",
    },
    bulkActions: {
      title: "Massenaktionen",
      assign: "Zuweisen",
      transfer: "Übertragen",
      escalate: "Eskalieren",
      close: "Schließen",
      selected: "ausgewählt",
    },
    detail: {
      clientInfo: "Kundeninformationen",
      timeline: "Zeitachse",
      initialMessage: "Ursprüngliche Nachricht",
      responses: "Antworten",
      internalNotes: "Interne Notizen",
      attachments: "Anhänge",
      macros: "Schnellvorlagen",
      sendResponse: "Antwort senden",
      resolveTicket: "Ticket lösen",
      closeTicket: "Ticket schließen",
      assignTo: "Zuweisen an",
      changePriority: "Priorität ändern",
      changeStatus: "Status ändern",
      addNote: "Notiz hinzufügen",
      uploadFile: "Datei hochladen",
      dragDrop: "Ziehen & Ablegen oder Klicken",
      maxSize: "Max. Größe 10MB",
    },
    kb: {
      search: "Suchen",
      searchPlaceholder: "In der Wissensdatenbank suchen...",
      categories: "Kategorien",
      articles: "Artikel",
      views: "Aufrufe",
      rating: "Bewertung",
      tags: "Tags",
      relatedArticles: "Verwandte Artikel",
      tableOfContents: "Inhaltsverzeichnis",
      helpful: "War dieser Artikel hilfreich?",
      yes: "Ja",
      no: "Nein",
      thanksFeedback: "Vielen Dank für Ihr Feedback!",
    },
    categories: {
      gettingStarted: "Erste Schritte",
      billing: "Abrechnung & Zahlungen",
      planning: "Planung & Lektionen",
      technical: "Technische Probleme",
    },
    chat: {
      title: "Live-Hilfe",
      available: "Agent verfügbar",
      away: "Abwesend",
      businessHours: "Mo-Fr 9-18 Uhr MEZ",
      typeMessage: "Nachricht eingeben...",
      send: "Senden",
      typing: "Tippt...",
      transferAgent: "An Agent übertragen",
      endChat: "Chat beenden",
    },
    actions: {
      viewDetail: "Details anzeigen",
      assign: "Zuweisen",
      resolve: "Lösen",
      close: "Schließen",
      export: "Exportieren",
      refresh: "Aktualisieren",
      createTicket: "Ticket erstellen",
      search: "Suchen",
    },
  },
  it: {
    page: {
      dashboard: {
        title: "Centro supporto clienti",
        description: "Gestione ticket e supporto utenti",
        breadcrumb: "Supporto / Dashboard",
      },
      tickets: {
        title: "Gestione ticket",
        description: "Elenco e monitoraggio ticket di supporto",
        breadcrumb: "Supporto / Ticket",
      },
      ticketDetail: {
        title: "Dettaglio ticket",
        breadcrumb: "Supporto / Ticket / Dettaglio",
      },
      kb: {
        title: "Base di conoscenze",
        description: "Articoli di aiuto e documentazione",
        breadcrumb: "Supporto / Base di conoscenze",
      },
      kbArticle: {
        breadcrumb: "Supporto / Base di conoscenze / Articolo",
      },
    },
    stats: {
      openTickets: "Ticket aperti",
      pendingResponse: "In attesa di risposta",
      resolvedToday: "Risolti oggi",
      npsScore: "Punteggio NPS",
      avgResponseTime: "Tempo risposta medio",
      slaRisk: "Rischio SLA",
      dailyTarget: "Obiettivo giornaliero",
      minutes: "minuti",
    },
    tickets: {
      number: "Numero",
      created: "Data creazione",
      client: "Cliente",
      subject: "Oggetto",
      priority: "Priorità",
      status: "Stato",
      assignedTo: "Assegnato a",
      actions: "Azioni",
      slaBreached: "SLA superato",
      noTickets: "Nessun ticket trovato",
    },
    priority: {
      urgent: "Urgente",
      high: "Alta",
      normal: "Normale",
      low: "Bassa",
    },
    status: {
      new: "Nuovo",
      assigned: "Assegnato",
      inProgress: "In corso",
      waitingClient: "In attesa cliente",
      resolved: "Risolto",
      closed: "Chiuso",
    },
    filters: {
      priority: "Priorità",
      status: "Stato",
      agent: "Agente",
      slaBreached: "SLA superato",
      allPriorities: "Tutte le priorità",
      allStatuses: "Tutti gli stati",
      allAgents: "Tutti gli agenti",
    },
    bulkActions: {
      title: "Azioni di massa",
      assign: "Assegna",
      transfer: "Trasferisci",
      escalate: "Escalation",
      close: "Chiudi",
      selected: "selezionato/i",
    },
    detail: {
      clientInfo: "Informazioni cliente",
      timeline: "Cronologia",
      initialMessage: "Messaggio iniziale",
      responses: "Risposte",
      internalNotes: "Note interne",
      attachments: "Allegati",
      macros: "Modelli rapidi",
      sendResponse: "Invia risposta",
      resolveTicket: "Risolvi ticket",
      closeTicket: "Chiudi ticket",
      assignTo: "Assegna a",
      changePriority: "Cambia priorità",
      changeStatus: "Cambia stato",
      addNote: "Aggiungi nota",
      uploadFile: "Carica file",
      dragDrop: "Trascina o clicca",
      maxSize: "Dimensione max 10MB",
    },
    kb: {
      search: "Cerca",
      searchPlaceholder: "Cerca nella base di conoscenze...",
      categories: "Categorie",
      articles: "Articoli",
      views: "visualizzazioni",
      rating: "Valutazione",
      tags: "Tag",
      relatedArticles: "Articoli correlati",
      tableOfContents: "Indice",
      helpful: "Questo articolo è stato utile?",
      yes: "Sì",
      no: "No",
      thanksFeedback: "Grazie per il feedback!",
    },
    categories: {
      gettingStarted: "Primi passi",
      billing: "Fatturazione e Pagamenti",
      planning: "Pianificazione e Lezioni",
      technical: "Problemi tecnici",
    },
    chat: {
      title: "Aiuto in diretta",
      available: "Agente disponibile",
      away: "Assente",
      businessHours: "Lun-Ven 9-18 CET",
      typeMessage: "Scrivi il tuo messaggio...",
      send: "Invia",
      typing: "Sta scrivendo...",
      transferAgent: "Trasferisci ad agente",
      endChat: "Termina conversazione",
    },
    actions: {
      viewDetail: "Vedi dettaglio",
      assign: "Assegna",
      resolve: "Risolvi",
      close: "Chiudi",
      export: "Esporta",
      refresh: "Aggiorna",
      createTicket: "Crea ticket",
      search: "Cerca",
    },
  },
  en: {
    page: {
      dashboard: {
        title: "Customer Support Center",
        description: "Ticket management and user support",
        breadcrumb: "Support / Dashboard",
      },
      tickets: {
        title: "Ticket Management",
        description: "List and tracking of support tickets",
        breadcrumb: "Support / Tickets",
      },
      ticketDetail: {
        title: "Ticket Detail",
        breadcrumb: "Support / Tickets / Detail",
      },
      kb: {
        title: "Knowledge Base",
        description: "Help articles and documentation",
        breadcrumb: "Support / Knowledge Base",
      },
      kbArticle: {
        breadcrumb: "Support / Knowledge Base / Article",
      },
    },
    stats: {
      openTickets: "Open Tickets",
      pendingResponse: "Pending Response",
      resolvedToday: "Resolved Today",
      npsScore: "NPS Score",
      avgResponseTime: "Avg Response Time",
      slaRisk: "SLA Risk",
      dailyTarget: "Daily Target",
      minutes: "minutes",
    },
    tickets: {
      number: "Number",
      created: "Created Date",
      client: "Client",
      subject: "Subject",
      priority: "Priority",
      status: "Status",
      assignedTo: "Assigned To",
      actions: "Actions",
      slaBreached: "SLA Breached",
      noTickets: "No tickets found",
    },
    priority: {
      urgent: "Urgent",
      high: "High",
      normal: "Normal",
      low: "Low",
    },
    status: {
      new: "New",
      assigned: "Assigned",
      inProgress: "In Progress",
      waitingClient: "Waiting Client",
      resolved: "Resolved",
      closed: "Closed",
    },
    filters: {
      priority: "Priority",
      status: "Status",
      agent: "Agent",
      slaBreached: "SLA Breached",
      allPriorities: "All Priorities",
      allStatuses: "All Statuses",
      allAgents: "All Agents",
    },
    bulkActions: {
      title: "Bulk Actions",
      assign: "Assign",
      transfer: "Transfer",
      escalate: "Escalate",
      close: "Close",
      selected: "selected",
    },
    detail: {
      clientInfo: "Client Information",
      timeline: "Timeline",
      initialMessage: "Initial Message",
      responses: "Responses",
      internalNotes: "Internal Notes",
      attachments: "Attachments",
      macros: "Quick Templates",
      sendResponse: "Send Response",
      resolveTicket: "Resolve Ticket",
      closeTicket: "Close Ticket",
      assignTo: "Assign To",
      changePriority: "Change Priority",
      changeStatus: "Change Status",
      addNote: "Add Note",
      uploadFile: "Upload File",
      dragDrop: "Drag & drop or click",
      maxSize: "Max size 10MB",
    },
    kb: {
      search: "Search",
      searchPlaceholder: "Search in knowledge base...",
      categories: "Categories",
      articles: "Articles",
      views: "views",
      rating: "Rating",
      tags: "Tags",
      relatedArticles: "Related Articles",
      tableOfContents: "Table of Contents",
      helpful: "Was this article helpful?",
      yes: "Yes",
      no: "No",
      thanksFeedback: "Thanks for your feedback!",
    },
    categories: {
      gettingStarted: "Getting Started",
      billing: "Billing & Payments",
      planning: "Planning & Lessons",
      technical: "Technical Issues",
    },
    chat: {
      title: "Live Help",
      available: "Agent Available",
      away: "Away",
      businessHours: "Mon-Fri 9am-6pm CET",
      typeMessage: "Type your message...",
      send: "Send",
      typing: "Typing...",
      transferAgent: "Transfer to Agent",
      endChat: "End Chat",
    },
    actions: {
      viewDetail: "View Detail",
      assign: "Assign",
      resolve: "Resolve",
      close: "Close",
      export: "Export",
      refresh: "Refresh",
      createTicket: "Create Ticket",
      search: "Search",
    },
  },
};

// ============================================================================
// HELPER FUNCTION
// ============================================================================

export function getSupportTranslations(
  locale: SupportLocale = "fr"
): SupportTranslations {
  return supportTranslations[locale] || supportTranslations.fr;
}
