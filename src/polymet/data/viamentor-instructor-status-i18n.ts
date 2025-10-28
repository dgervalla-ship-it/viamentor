/**
 * VIAMENTOR - Instructor Status i18n
 * Traductions FR/DE/IT/EN pour configuration statut professionnel et rémunération
 */

export type InstructorStatusLocale = "fr" | "de" | "it" | "en";

export interface InstructorStatusTranslations {
  // Page
  pageTitle: string;
  pageDescription: string;
  breadcrumb: {
    instructors: string;
    status: string;
  };

  // Alert info
  alert: {
    title: string;
    description: string;
  };

  // Types statuts
  statusTypes: {
    title: string;
    required: string;
    independentSolo: {
      label: string;
      description: string;
    };
    independentAttached: {
      label: string;
      description: string;
    };
    employee: {
      label: string;
      description: string;
    };
  };

  // Modèles paiement
  paymentModels: {
    title: string;
    subtitle: string;
    free: {
      label: string;
      badge: string;
      description: string;
    };
    flatFee: {
      label: string;
      description: string;
      amountLabel: string;
      amountPlaceholder: string;
      startDateLabel: string;
      autoDebitLabel: string;
      autoDebitDescription: string;
    };
    commission: {
      label: string;
      description: string;
      rateLabel: string;
      splitLabel: string;
      instructorLabel: string;
      schoolLabel: string;
      exampleTitle: string;
      exampleLesson: string;
      exampleInstructor: string;
      exampleSchool: string;
    };
    notesLabel: string;
    notesPlaceholder: string;
  };

  // Contrat
  contract: {
    title: string;
    description: string;
    uploadLabel: string;
    uploadDescription: string;
    uploadButton: string;
    startDateLabel: string;
    startDateRequired: string;
    endDateLabel: string;
    endDateDescription: string;
    internalNotesLabel: string;
    internalNotesPlaceholder: string;
  };

  // Employé
  employee: {
    title: string;
    salaryLabel: string;
    salaryPlaceholder: string;
    contractTypeLabel: string;
    contractTypes: {
      cdi: string;
      cdd: string;
      apprenticeship: string;
      internship: string;
    };
    hireDateLabel: string;
    weeklyHoursLabel: string;
    weeklyHoursPlaceholder: string;
    performanceBonusLabel: string;
    performanceBonusDescription: string;
    benefitsLabel: string;
    benefitsPlaceholder: string;
  };

  // Simulation revenus
  simulation: {
    title: string;
    description: string;
    lessonsLabel: string;
    lessonsPlaceholder: string;
    priceLabel: string;
    pricePlaceholder: string;
    results: {
      grossRevenue: string;
      schoolShare: string;
      flatFee: string;
      instructorNet: string;
    };
  };

  // Actions
  actions: {
    save: string;
    saving: string;
    cancel: string;
    reset: string;
  };

  // Messages
  messages: {
    saveSuccess: string;
    saveError: string;
    emailNotification: string;
  };

  // Validation
  validation: {
    required: string;
    minAmount: string;
    maxAmount: string;
    minRate: string;
    maxRate: string;
    minSalary: string;
    maxSalary: string;
    minHours: string;
    maxHours: string;
  };
}

export const instructorStatusTranslations: Record<
  InstructorStatusLocale,
  InstructorStatusTranslations
> = {
  fr: {
    pageTitle: "Configurer statut professionnel",
    pageDescription:
      "Définissez la relation juridique et le modèle de rémunération du moniteur",
    breadcrumb: {
      instructors: "Moniteurs",
      status: "Statut & Rémunération",
    },
    alert: {
      title: "Configuration statut moniteur",
      description:
        "Définissez la relation juridique et le modèle de rémunération du moniteur. Cela impacte la facturation automatique et les reversements de commissions.",
    },
    statusTypes: {
      title: "Type de statut",
      required: "Requis",
      independentSolo: {
        label: "Indépendant sans salle",
        description:
          "Freelance autonome - Utilise Viamentor en solo - Gère ses propres élèves, factures et véhicules - Aucun lien juridique avec l'école",
      },
      independentAttached: {
        label: "Indépendant rattaché salle",
        description:
          "Freelance partenaire - Utilise l'infrastructure de l'école (planning, véhicules, locaux) - Reversement selon accord commercial - Facturation séparée des élèves",
      },
      employee: {
        label: "Employé salarié",
        description:
          "Contrat de travail - Salaire fixe mensuel + primes - 100% du CA revient à l'école - Horaires fixés par l'employeur",
      },
    },
    paymentModels: {
      title: "Modèle de rémunération partenariat",
      subtitle: "Choisissez le modèle de reversement pour le moniteur rattaché",
      free: {
        label: "Gratuit 0%",
        badge: "Recommandé début",
        description:
          "Le moniteur utilise l'infrastructure gratuitement et garde 100% du CA des leçons. Idéal pour une période d'essai et construire la confiance progressivement.",
      },
      flatFee: {
        label: "Forfait mensuel fixe",
        description:
          "Loyer mensuel indépendant du CA. Prévisibilité budgétaire et stabilité. Le moniteur garde 100% du CA après paiement du forfait.",
        amountLabel: "Montant mensuel (CHF)",
        amountPlaceholder: "500",
        startDateLabel: "Date début prélèvement",
        autoDebitLabel: "Prélèvement automatique",
        autoDebitDescription: "Activer le prélèvement automatique mensuel",
      },
      commission: {
        label: "Commission % variable",
        description:
          "Pourcentage du CA de chaque leçon reversé à l'école. Automatique, transparent et en temps réel. Risque partagé et intérêts alignés.",
        rateLabel: "Taux de commission (%)",
        splitLabel: "Répartition",
        instructorLabel: "Moniteur",
        schoolLabel: "École",
        exampleTitle: "Exemple de calcul",
        exampleLesson: "Leçon 90 CHF",
        exampleInstructor: "Moniteur",
        exampleSchool: "École",
      },
      notesLabel: "Notes internes",
      notesPlaceholder:
        "Ex: Négociation acceptée à 18% au lieu de 20% en raison de l'expérience et de la clientèle fidèle...",
    },
    contract: {
      title: "Documents contractuels",
      description:
        "Téléchargez le contrat de partenariat signé pour protection juridique des deux parties",
      uploadLabel: "Contrat de partenariat signé",
      uploadDescription: "PDF, maximum 10 MB",
      uploadButton: "Télécharger le contrat",
      startDateLabel: "Date début contrat",
      startDateRequired: "Requis si statut rattaché",
      endDateLabel: "Date fin contrat",
      endDateDescription: "Optionnel - Laissez vide pour CDI",
      internalNotesLabel: "Notes internes",
      internalNotesPlaceholder:
        "Ex: Négociation acceptée à 18% au lieu de 20% car forte expérience 15 ans et clientèle fidèle...",
    },
    employee: {
      title: "Informations emploi",
      salaryLabel: "Salaire brut mensuel (CHF)",
      salaryPlaceholder: "5000",
      contractTypeLabel: "Type de contrat",
      contractTypes: {
        cdi: "CDI - Contrat durée indéterminée",
        cdd: "CDD - Contrat durée déterminée",
        apprenticeship: "Apprentissage",
        internship: "Stage",
      },
      hireDateLabel: "Date d'embauche",
      weeklyHoursLabel: "Heures hebdomadaires",
      weeklyHoursPlaceholder: "42",
      performanceBonusLabel: "Primes de performance",
      performanceBonusDescription:
        "Activer le système de primes basé sur les KPIs",
      benefitsLabel: "Avantages",
      benefitsPlaceholder:
        "Ex: Véhicule de service, assurance complémentaire LCA, formation continue OAC gratuite...",
    },
    simulation: {
      title: "Simulation revenus",
      description: "Estimez les revenus mensuels selon le modèle choisi",
      lessonsLabel: "Nombre de leçons par mois",
      lessonsPlaceholder: "80",
      priceLabel: "Prix moyen leçon (CHF)",
      pricePlaceholder: "90",
      results: {
        grossRevenue: "CA brut total",
        schoolShare: "Reversement école",
        flatFee: "Forfait mensuel",
        instructorNet: "Net moniteur",
      },
    },
    actions: {
      save: "Enregistrer statut",
      saving: "Enregistrement...",
      cancel: "Annuler",
      reset: "Réinitialiser",
    },
    messages: {
      saveSuccess: "Statut moniteur enregistré avec succès",
      saveError: "Erreur lors de l'enregistrement du statut",
      emailNotification:
        "Le moniteur a été notifié par email de la mise à jour",
    },
    validation: {
      required: "Ce champ est requis",
      minAmount: "Montant minimum 0 CHF",
      maxAmount: "Montant maximum 5000 CHF",
      minRate: "Commission minimum 0%",
      maxRate: "Commission maximum 50%",
      minSalary: "Salaire minimum 3000 CHF brut",
      maxSalary: "Salaire maximum 15000 CHF brut",
      minHours: "Minimum 20h/semaine",
      maxHours: "Maximum 42h/semaine (légal Suisse)",
    },
  },

  de: {
    pageTitle: "Berufsstatus konfigurieren",
    pageDescription:
      "Definieren Sie die rechtliche Beziehung und das Vergütungsmodell des Fahrlehrers",
    breadcrumb: {
      instructors: "Fahrlehrer",
      status: "Status & Vergütung",
    },
    alert: {
      title: "Fahrlehrer-Status Konfiguration",
      description:
        "Definieren Sie die rechtliche Beziehung und das Vergütungsmodell des Fahrlehrers. Dies wirkt sich auf die automatische Rechnungsstellung und Provisionsauszahlungen aus.",
    },
    statusTypes: {
      title: "Statustyp",
      required: "Erforderlich",
      independentSolo: {
        label: "Selbständig ohne Fahrschule",
        description:
          "Autonomer Freelancer - Nutzt Viamentor solo - Verwaltet eigene Schüler, Rechnungen und Fahrzeuge - Keine rechtliche Verbindung zur Fahrschule",
      },
      independentAttached: {
        label: "Selbständig angeschlossen",
        description:
          "Partner-Freelancer - Nutzt Infrastruktur der Fahrschule (Planung, Fahrzeuge, Räume) - Auszahlung gemäß Handelsvereinbarung - Separate Rechnungsstellung",
      },
      employee: {
        label: "Angestellter",
        description:
          "Arbeitsvertrag - Festes Monatsgehalt + Prämien - 100% Umsatz geht an Fahrschule - Arbeitszeiten vom Arbeitgeber festgelegt",
      },
    },
    paymentModels: {
      title: "Partnerschafts-Vergütungsmodell",
      subtitle:
        "Wählen Sie das Auszahlungsmodell für den angeschlossenen Fahrlehrer",
      free: {
        label: "Kostenlos 0%",
        badge: "Empfohlen Start",
        description:
          "Fahrlehrer nutzt Infrastruktur kostenlos und behält 100% des Umsatzes. Ideal für Probezeit und schrittweisen Vertrauensaufbau.",
      },
      flatFee: {
        label: "Feste monatliche Gebühr",
        description:
          "Monatliche Miete unabhängig vom Umsatz. Budgetplanbarkeit und Stabilität. Fahrlehrer behält 100% des Umsatzes nach Zahlung der Gebühr.",
        amountLabel: "Monatlicher Betrag (CHF)",
        amountPlaceholder: "500",
        startDateLabel: "Startdatum Abbuchung",
        autoDebitLabel: "Automatische Abbuchung",
        autoDebitDescription: "Monatliche automatische Abbuchung aktivieren",
      },
      commission: {
        label: "Variable Provision %",
        description:
          "Prozentsatz des Umsatzes jeder Lektion an Fahrschule. Automatisch, transparent und in Echtzeit. Geteiltes Risiko und abgestimmte Interessen.",
        rateLabel: "Provisionssatz (%)",
        splitLabel: "Aufteilung",
        instructorLabel: "Fahrlehrer",
        schoolLabel: "Fahrschule",
        exampleTitle: "Berechnungsbeispiel",
        exampleLesson: "Lektion 90 CHF",
        exampleInstructor: "Fahrlehrer",
        exampleSchool: "Fahrschule",
      },
      notesLabel: "Interne Notizen",
      notesPlaceholder:
        "Z.B.: Verhandlung auf 18% statt 20% akzeptiert aufgrund Erfahrung und treuer Kundschaft...",
    },
    contract: {
      title: "Vertragsdokumente",
      description:
        "Laden Sie den unterzeichneten Partnerschaftsvertrag hoch für rechtlichen Schutz beider Parteien",
      uploadLabel: "Unterzeichneter Partnerschaftsvertrag",
      uploadDescription: "PDF, maximal 10 MB",
      uploadButton: "Vertrag hochladen",
      startDateLabel: "Vertragsbeginn",
      startDateRequired: "Erforderlich bei angeschlossenem Status",
      endDateLabel: "Vertragsende",
      endDateDescription: "Optional - Leer lassen für unbefristeten Vertrag",
      internalNotesLabel: "Interne Notizen",
      internalNotesPlaceholder:
        "Z.B.: Verhandlung auf 18% statt 20% akzeptiert wegen 15 Jahren Erfahrung und treuer Kundschaft...",
    },
    employee: {
      title: "Beschäftigungsinformationen",
      salaryLabel: "Bruttomonatsgehalt (CHF)",
      salaryPlaceholder: "5000",
      contractTypeLabel: "Vertragsart",
      contractTypes: {
        cdi: "Unbefristeter Vertrag",
        cdd: "Befristeter Vertrag",
        apprenticeship: "Lehre",
        internship: "Praktikum",
      },
      hireDateLabel: "Einstellungsdatum",
      weeklyHoursLabel: "Wochenstunden",
      weeklyHoursPlaceholder: "42",
      performanceBonusLabel: "Leistungsprämien",
      performanceBonusDescription:
        "Prämiensystem basierend auf KPIs aktivieren",
      benefitsLabel: "Zusatzleistungen",
      benefitsPlaceholder:
        "Z.B.: Dienstwagen, Zusatzversicherung, kostenlose Weiterbildung...",
    },
    simulation: {
      title: "Einkommenssimulation",
      description:
        "Schätzen Sie das monatliche Einkommen gemäß gewähltem Modell",
      lessonsLabel: "Anzahl Lektionen pro Monat",
      lessonsPlaceholder: "80",
      priceLabel: "Durchschnittspreis Lektion (CHF)",
      pricePlaceholder: "90",
      results: {
        grossRevenue: "Bruttoumsatz gesamt",
        schoolShare: "Auszahlung Fahrschule",
        flatFee: "Monatliche Gebühr",
        instructorNet: "Netto Fahrlehrer",
      },
    },
    actions: {
      save: "Status speichern",
      saving: "Speichern...",
      cancel: "Abbrechen",
      reset: "Zurücksetzen",
    },
    messages: {
      saveSuccess: "Fahrlehrer-Status erfolgreich gespeichert",
      saveError: "Fehler beim Speichern des Status",
      emailNotification:
        "Fahrlehrer wurde per E-Mail über die Aktualisierung benachrichtigt",
    },
    validation: {
      required: "Dieses Feld ist erforderlich",
      minAmount: "Mindestbetrag 0 CHF",
      maxAmount: "Höchstbetrag 5000 CHF",
      minRate: "Mindestprovision 0%",
      maxRate: "Höchstprovision 50%",
      minSalary: "Mindestgehalt 3000 CHF brutto",
      maxSalary: "Höchstgehalt 15000 CHF brutto",
      minHours: "Minimum 20h/Woche",
      maxHours: "Maximum 42h/Woche (gesetzlich Schweiz)",
    },
  },

  it: {
    pageTitle: "Configurare stato professionale",
    pageDescription:
      "Definire la relazione giuridica e il modello di remunerazione dell'istruttore",
    breadcrumb: {
      instructors: "Istruttori",
      status: "Stato & Remunerazione",
    },
    alert: {
      title: "Configurazione stato istruttore",
      description:
        "Definire la relazione giuridica e il modello di remunerazione dell'istruttore. Questo influisce sulla fatturazione automatica e sui versamenti delle commissioni.",
    },
    statusTypes: {
      title: "Tipo di stato",
      required: "Richiesto",
      independentSolo: {
        label: "Indipendente senza scuola",
        description:
          "Freelance autonomo - Utilizza Viamentor da solo - Gestisce propri allievi, fatture e veicoli - Nessun legame giuridico con la scuola",
      },
      independentAttached: {
        label: "Indipendente collegato",
        description:
          "Freelance partner - Utilizza infrastruttura della scuola (pianificazione, veicoli, locali) - Versamento secondo accordo commerciale - Fatturazione separata",
      },
      employee: {
        label: "Dipendente",
        description:
          "Contratto di lavoro - Stipendio fisso mensile + premi - 100% fatturato alla scuola - Orari fissati dal datore di lavoro",
      },
    },
    paymentModels: {
      title: "Modello di remunerazione partnership",
      subtitle: "Scegliere il modello di versamento per l'istruttore collegato",
      free: {
        label: "Gratuito 0%",
        badge: "Consigliato inizio",
        description:
          "L'istruttore utilizza l'infrastruttura gratuitamente e mantiene il 100% del fatturato. Ideale per periodo di prova e costruire fiducia progressivamente.",
      },
      flatFee: {
        label: "Canone mensile fisso",
        description:
          "Affitto mensile indipendente dal fatturato. Prevedibilità di budget e stabilità. L'istruttore mantiene il 100% del fatturato dopo pagamento del canone.",
        amountLabel: "Importo mensile (CHF)",
        amountPlaceholder: "500",
        startDateLabel: "Data inizio prelievo",
        autoDebitLabel: "Prelievo automatico",
        autoDebitDescription: "Attivare prelievo automatico mensile",
      },
      commission: {
        label: "Commissione % variabile",
        description:
          "Percentuale del fatturato di ogni lezione versata alla scuola. Automatico, trasparente e in tempo reale. Rischio condiviso e interessi allineati.",
        rateLabel: "Tasso di commissione (%)",
        splitLabel: "Ripartizione",
        instructorLabel: "Istruttore",
        schoolLabel: "Scuola",
        exampleTitle: "Esempio di calcolo",
        exampleLesson: "Lezione 90 CHF",
        exampleInstructor: "Istruttore",
        exampleSchool: "Scuola",
      },
      notesLabel: "Note interne",
      notesPlaceholder:
        "Es: Negoziazione accettata al 18% invece del 20% per esperienza e clientela fedele...",
    },
    contract: {
      title: "Documenti contrattuali",
      description:
        "Caricare il contratto di partnership firmato per protezione giuridica di entrambe le parti",
      uploadLabel: "Contratto di partnership firmato",
      uploadDescription: "PDF, massimo 10 MB",
      uploadButton: "Caricare contratto",
      startDateLabel: "Data inizio contratto",
      startDateRequired: "Richiesto se stato collegato",
      endDateLabel: "Data fine contratto",
      endDateDescription:
        "Opzionale - Lasciare vuoto per contratto indeterminato",
      internalNotesLabel: "Note interne",
      internalNotesPlaceholder:
        "Es: Negoziazione accettata al 18% invece del 20% per 15 anni esperienza e clientela fedele...",
    },
    employee: {
      title: "Informazioni impiego",
      salaryLabel: "Stipendio lordo mensile (CHF)",
      salaryPlaceholder: "5000",
      contractTypeLabel: "Tipo di contratto",
      contractTypes: {
        cdi: "Contratto indeterminato",
        cdd: "Contratto determinato",
        apprenticeship: "Apprendistato",
        internship: "Stage",
      },
      hireDateLabel: "Data assunzione",
      weeklyHoursLabel: "Ore settimanali",
      weeklyHoursPlaceholder: "42",
      performanceBonusLabel: "Premi di performance",
      performanceBonusDescription: "Attivare sistema premi basato su KPI",
      benefitsLabel: "Vantaggi",
      benefitsPlaceholder:
        "Es: Veicolo di servizio, assicurazione complementare, formazione continua gratuita...",
    },
    simulation: {
      title: "Simulazione redditi",
      description: "Stimare i redditi mensili secondo il modello scelto",
      lessonsLabel: "Numero lezioni al mese",
      lessonsPlaceholder: "80",
      priceLabel: "Prezzo medio lezione (CHF)",
      pricePlaceholder: "90",
      results: {
        grossRevenue: "Fatturato lordo totale",
        schoolShare: "Versamento scuola",
        flatFee: "Canone mensile",
        instructorNet: "Netto istruttore",
      },
    },
    actions: {
      save: "Salvare stato",
      saving: "Salvataggio...",
      cancel: "Annullare",
      reset: "Ripristinare",
    },
    messages: {
      saveSuccess: "Stato istruttore salvato con successo",
      saveError: "Errore durante il salvataggio dello stato",
      emailNotification:
        "L'istruttore è stato notificato via email dell'aggiornamento",
    },
    validation: {
      required: "Questo campo è richiesto",
      minAmount: "Importo minimo 0 CHF",
      maxAmount: "Importo massimo 5000 CHF",
      minRate: "Commissione minima 0%",
      maxRate: "Commissione massima 50%",
      minSalary: "Stipendio minimo 3000 CHF lordo",
      maxSalary: "Stipendio massimo 15000 CHF lordo",
      minHours: "Minimo 20h/settimana",
      maxHours: "Massimo 42h/settimana (legale Svizzera)",
    },
  },

  en: {
    pageTitle: "Configure professional status",
    pageDescription:
      "Define the legal relationship and compensation model for the instructor",
    breadcrumb: {
      instructors: "Instructors",
      status: "Status & Compensation",
    },
    alert: {
      title: "Instructor status configuration",
      description:
        "Define the legal relationship and compensation model for the instructor. This impacts automatic billing and commission payments.",
    },
    statusTypes: {
      title: "Status type",
      required: "Required",
      independentSolo: {
        label: "Independent without school",
        description:
          "Autonomous freelancer - Uses Viamentor solo - Manages own students, invoices and vehicles - No legal connection to school",
      },
      independentAttached: {
        label: "Independent attached",
        description:
          "Partner freelancer - Uses school infrastructure (planning, vehicles, premises) - Payment according to commercial agreement - Separate billing",
      },
      employee: {
        label: "Employee",
        description:
          "Employment contract - Fixed monthly salary + bonuses - 100% revenue to school - Hours set by employer",
      },
    },
    paymentModels: {
      title: "Partnership compensation model",
      subtitle: "Choose the payment model for the attached instructor",
      free: {
        label: "Free 0%",
        badge: "Recommended start",
        description:
          "Instructor uses infrastructure for free and keeps 100% of revenue. Ideal for trial period and building trust progressively.",
      },
      flatFee: {
        label: "Fixed monthly fee",
        description:
          "Monthly rent independent of revenue. Budget predictability and stability. Instructor keeps 100% of revenue after fee payment.",
        amountLabel: "Monthly amount (CHF)",
        amountPlaceholder: "500",
        startDateLabel: "Debit start date",
        autoDebitLabel: "Automatic debit",
        autoDebitDescription: "Enable automatic monthly debit",
      },
      commission: {
        label: "Variable commission %",
        description:
          "Percentage of revenue from each lesson to school. Automatic, transparent and real-time. Shared risk and aligned interests.",
        rateLabel: "Commission rate (%)",
        splitLabel: "Split",
        instructorLabel: "Instructor",
        schoolLabel: "School",
        exampleTitle: "Calculation example",
        exampleLesson: "Lesson 90 CHF",
        exampleInstructor: "Instructor",
        exampleSchool: "School",
      },
      notesLabel: "Internal notes",
      notesPlaceholder:
        "E.g.: Negotiation accepted at 18% instead of 20% due to experience and loyal clientele...",
    },
    contract: {
      title: "Contract documents",
      description:
        "Upload signed partnership contract for legal protection of both parties",
      uploadLabel: "Signed partnership contract",
      uploadDescription: "PDF, maximum 10 MB",
      uploadButton: "Upload contract",
      startDateLabel: "Contract start date",
      startDateRequired: "Required if attached status",
      endDateLabel: "Contract end date",
      endDateDescription: "Optional - Leave empty for permanent contract",
      internalNotesLabel: "Internal notes",
      internalNotesPlaceholder:
        "E.g.: Negotiation accepted at 18% instead of 20% due to 15 years experience and loyal clientele...",
    },
    employee: {
      title: "Employment information",
      salaryLabel: "Gross monthly salary (CHF)",
      salaryPlaceholder: "5000",
      contractTypeLabel: "Contract type",
      contractTypes: {
        cdi: "Permanent contract",
        cdd: "Fixed-term contract",
        apprenticeship: "Apprenticeship",
        internship: "Internship",
      },
      hireDateLabel: "Hire date",
      weeklyHoursLabel: "Weekly hours",
      weeklyHoursPlaceholder: "42",
      performanceBonusLabel: "Performance bonuses",
      performanceBonusDescription: "Enable bonus system based on KPIs",
      benefitsLabel: "Benefits",
      benefitsPlaceholder:
        "E.g.: Company car, supplementary insurance, free continuing education...",
    },
    simulation: {
      title: "Revenue simulation",
      description: "Estimate monthly income according to chosen model",
      lessonsLabel: "Number of lessons per month",
      lessonsPlaceholder: "80",
      priceLabel: "Average lesson price (CHF)",
      pricePlaceholder: "90",
      results: {
        grossRevenue: "Total gross revenue",
        schoolShare: "School payment",
        flatFee: "Monthly fee",
        instructorNet: "Instructor net",
      },
    },
    actions: {
      save: "Save status",
      saving: "Saving...",
      cancel: "Cancel",
      reset: "Reset",
    },
    messages: {
      saveSuccess: "Instructor status saved successfully",
      saveError: "Error saving status",
      emailNotification: "Instructor has been notified by email of the update",
    },
    validation: {
      required: "This field is required",
      minAmount: "Minimum amount 0 CHF",
      maxAmount: "Maximum amount 5000 CHF",
      minRate: "Minimum commission 0%",
      maxRate: "Maximum commission 50%",
      minSalary: "Minimum salary 3000 CHF gross",
      maxSalary: "Maximum salary 15000 CHF gross",
      minHours: "Minimum 20h/week",
      maxHours: "Maximum 42h/week (legal Switzerland)",
    },
  },
};

/**
 * Hook pour récupérer les traductions
 */
export function useInstructorStatusTranslations(
  locale: InstructorStatusLocale = "fr"
) {
  return instructorStatusTranslations[locale];
}
