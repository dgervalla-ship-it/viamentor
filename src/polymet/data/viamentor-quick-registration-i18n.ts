/**
 * VIAMENTOR - Quick Registration i18n
 * Traductions FR/DE/IT/EN inscription rapide secrétariat
 */

export type QuickRegistrationLocale = "fr" | "de" | "it" | "en";

export const quickRegistrationTranslations = {
  fr: {
    // Page header
    title: "Inscriptions",
    subtitle: "Gestion des nouvelles inscriptions et élèves récents",

    // Tabs
    tabs: {
      new: "Nouvelles inscriptions",
      recent: "Élèves récents",
      prospects: "Prospects",
      all: "Tous les élèves",
    },

    // Stats cards
    stats: {
      monthRegistrations: "Inscriptions ce mois",
      conversionRate: "Taux de conversion",
      activeStudents: "Élèves actifs",
    },

    // Wizard
    wizard: {
      title: "Inscrire un nouvel élève",
      newRegistration: "Nouvelle inscription",

      steps: {
        identity: "Identité",
        training: "Formation",
        confirmation: "Confirmation",
      },

      buttons: {
        back: "Retour",
        next: "Suivant",
        finish: "Finaliser inscription",
        cancel: "Annuler",
        creating: "Création en cours...",
      },
    },

    // Step 1 - Identity
    identity: {
      title: "Informations de l'élève",
      subtitle: "Renseignez les informations essentielles",

      fields: {
        firstName: "Prénom",
        firstNamePlaceholder: "Ex: Jean",
        lastName: "Nom",
        lastNamePlaceholder: "Ex: Dupont",
        gender: "Civilité",
        genderOptions: {
          male: "Monsieur",
          female: "Madame",
          other: "Autre",
        },
        birthDate: "Date de naissance",
        age: "{{age}} ans",
        phone: "Téléphone portable",
        phonePlaceholder: "+41 XX XXX XX XX",
        email: "Email",
        emailPlaceholder: "exemple@email.com",
        address: "Adresse",
        addressPlaceholder: "Rue et numéro",
        postalCode: "NPA",
        postalCodePlaceholder: "1000",
        city: "Ville",
        cityPlaceholder: "Lausanne",
        canton: "Canton",
        photo: "Photo de l'élève",
        photoUpload: "Déposer une photo ou cliquer",
        photoSize: "Max 2 MB",
      },

      minor: {
        alert: "Élève mineur (moins de 18 ans)",
        alertDescription:
          "Les informations du représentant légal sont requises (OAC Art. 10)",
        guardianName: "Nom du représentant légal",
        guardianNamePlaceholder: "Nom complet du parent/tuteur",
        guardianPhone: "Téléphone du représentant",
        guardianPhonePlaceholder: "+41 XX XXX XX XX",
        consent: "Consentement parental obtenu",
        consentRequired:
          "Le consentement parental est obligatoire pour les mineurs",
      },

      learnerPermit: {
        label: "Permis d'élève conducteur obtenu",
        number: "Numéro du permis",
        numberPlaceholder: "Ex: 123456",
        date: "Date d'obtention",
        alert: "À obtenir avant les leçons pratiques",
        alertDescription:
          "Le permis d'élève conducteur est obligatoire pour commencer les leçons pratiques (OAC Art. 10)",
      },
    },

    // Step 2 - Training
    training: {
      title: "Parcours de formation souhaité",
      subtitle: "Définissez les objectifs et le programme",

      categories: {
        label: "Catégories de permis",
        description: "Sélectionnez au moins une catégorie",
        options: {
          B: "B - Voiture",
          A: "A - Moto",
          BE: "BE - Voiture avec remorque",
          A1: "A1 - Moto légère",
          BPT: "BPT - Transport de personnes",
        },
      },

      instructor: {
        label: "Moniteur assigné",
        auto: "Attribution automatique",
        autoDescription:
          "Le système attribuera le moniteur optimal selon disponibilité, spécialités et proximité",
        select: "Choisir un moniteur",
      },

      package: {
        label: "Forfait de leçons",
        optional: "Optionnel - Pré-vente recommandée",
        none: "À la carte",
        discovery: "Forfait découverte - 5 leçons",
        standard: "Pack standard - 10 leçons",
        intensive: "Pack intensif - 20 leçons",
        price: "{{price}} CHF",
        savings: "Économise {{amount}} CHF",
      },

      theoryClass: {
        label: "Cours théorique requis",
        alert: "Cours théorique obligatoire",
        alertDescription:
          "8 heures de cours théorique sont obligatoires avant l'examen théorique (OAC)",
      },

      goals: {
        label: "Objectifs et contraintes",
        placeholder:
          "Ex: Obtenir le permis avant septembre, disponible les soirs et week-ends...",
        description: "300 caractères maximum",
      },
    },

    // Step 3 - Confirmation
    confirmation: {
      title: "Vérifier les informations",
      subtitle: "Confirmez les détails avant finalisation",

      sections: {
        identity: "Identité",
        training: "Formation",
        quickActions: "Actions rapides",
        payment: "Paiement",
      },

      identitySummary: {
        age: "{{age}} ans",
        contact: "Contact",
        address: "Adresse",
        edit: "Modifier",
      },

      trainingSummary: {
        categories: "Catégories",
        instructor: "Moniteur",
        package: "Forfait",
        theoryClass: "Cours théorique",
        required: "Requis",
        notRequired: "Non requis",
      },

      quickActions: {
        scheduleLesson: "Planifier la première leçon maintenant",
        sendWelcome: "Envoyer l'email de bienvenue",
        createAccount: "Créer l'accès espace élève",
        activateNow: "Activer immédiatement",
        activateDescription:
          "L'élève pourra réserver des leçons dès maintenant",
      },

      payment: {
        total: "Total à payer",
        method: "Mode de paiement",
        methods: {
          cash: "Espèces",
          card: "Carte bancaire",
          transfer: "Virement",
          twint: "Twint",
          invoice: "Facturer plus tard",
        },
        process: "Encaisser",
        received: "Paiement reçu",
      },
    },

    // Recent registrations
    recent: {
      title: "Inscriptions récentes",
      subtitle: "30 derniers jours",

      table: {
        date: "Date",
        student: "Élève",
        categories: "Catégories",
        instructor: "Moniteur",
        package: "Forfait",
        status: "Statut",
        actions: "Actions",
      },

      status: {
        active: "Actif",
        pending: "Attente documents",
        inactive: "Inactif",
      },

      actions: {
        view: "Voir",
        complete: "Compléter",
        schedule: "Planifier leçon",
        message: "Message",
        delete: "Supprimer",
      },

      filters: {
        all: "Tous",
        date: "Date",
        category: "Catégorie",
        instructor: "Moniteur",
        status: "Statut",
      },

      export: "Exporter",
    },

    // Messages
    messages: {
      success: "Élève inscrit avec succès ! Bienvenue {{name}} !",
      error: "Une erreur est survenue lors de l'inscription",
      emailTaken: "Cette adresse email est déjà utilisée",
      validating: "Validation en cours...",
    },
  },

  de: {
    title: "Anmeldungen",
    subtitle: "Verwaltung neuer Anmeldungen und kürzlich registrierter Schüler",

    tabs: {
      new: "Neue Anmeldungen",
      recent: "Kürzliche Schüler",
      prospects: "Interessenten",
      all: "Alle Schüler",
    },

    stats: {
      monthRegistrations: "Anmeldungen diesen Monat",
      conversionRate: "Konversionsrate",
      activeStudents: "Aktive Schüler",
    },

    wizard: {
      title: "Neuen Schüler anmelden",
      newRegistration: "Neue Anmeldung",

      steps: {
        identity: "Identität",
        training: "Ausbildung",
        confirmation: "Bestätigung",
      },

      buttons: {
        back: "Zurück",
        next: "Weiter",
        finish: "Anmeldung abschließen",
        cancel: "Abbrechen",
        creating: "Wird erstellt...",
      },
    },

    identity: {
      title: "Schülerinformationen",
      subtitle: "Geben Sie die wesentlichen Informationen ein",

      fields: {
        firstName: "Vorname",
        firstNamePlaceholder: "z.B.: Hans",
        lastName: "Nachname",
        lastNamePlaceholder: "z.B.: Müller",
        gender: "Anrede",
        genderOptions: {
          male: "Herr",
          female: "Frau",
          other: "Andere",
        },
        birthDate: "Geburtsdatum",
        age: "{{age}} Jahre",
        phone: "Mobiltelefon",
        phonePlaceholder: "+41 XX XXX XX XX",
        email: "E-Mail",
        emailPlaceholder: "beispiel@email.com",
        address: "Adresse",
        addressPlaceholder: "Straße und Nummer",
        postalCode: "PLZ",
        postalCodePlaceholder: "1000",
        city: "Stadt",
        cityPlaceholder: "Lausanne",
        canton: "Kanton",
        photo: "Schülerfoto",
        photoUpload: "Foto ablegen oder klicken",
        photoSize: "Max 2 MB",
      },

      minor: {
        alert: "Minderjähriger Schüler (unter 18 Jahren)",
        alertDescription:
          "Informationen des gesetzlichen Vertreters erforderlich (VZV Art. 10)",
        guardianName: "Name des gesetzlichen Vertreters",
        guardianNamePlaceholder: "Vollständiger Name des Elternteils/Vormunds",
        guardianPhone: "Telefon des Vertreters",
        guardianPhonePlaceholder: "+41 XX XXX XX XX",
        consent: "Elterliche Zustimmung erhalten",
        consentRequired:
          "Elterliche Zustimmung ist für Minderjährige obligatorisch",
      },

      learnerPermit: {
        label: "Lernfahrausweis erhalten",
        number: "Ausweisnummer",
        numberPlaceholder: "z.B.: 123456",
        date: "Ausstellungsdatum",
        alert: "Vor praktischen Lektionen zu erhalten",
        alertDescription:
          "Der Lernfahrausweis ist obligatorisch, um mit praktischen Lektionen zu beginnen (VZV Art. 10)",
      },
    },

    training: {
      title: "Gewünschter Ausbildungsweg",
      subtitle: "Definieren Sie Ziele und Programm",

      categories: {
        label: "Führerscheinkategorien",
        description: "Wählen Sie mindestens eine Kategorie",
        options: {
          B: "B - Auto",
          A: "A - Motorrad",
          BE: "BE - Auto mit Anhänger",
          A1: "A1 - Leichtes Motorrad",
          BPT: "BPT - Personentransport",
        },
      },

      instructor: {
        label: "Zugewiesener Fahrlehrer",
        auto: "Automatische Zuweisung",
        autoDescription:
          "Das System weist den optimalen Fahrlehrer nach Verfügbarkeit, Fachgebieten und Nähe zu",
        select: "Fahrlehrer wählen",
      },

      package: {
        label: "Lektionspaket",
        optional: "Optional - Vorverkauf empfohlen",
        none: "À la carte",
        discovery: "Entdeckungspaket - 5 Lektionen",
        standard: "Standardpaket - 10 Lektionen",
        intensive: "Intensivpaket - 20 Lektionen",
        price: "{{price}} CHF",
        savings: "Sparen Sie {{amount}} CHF",
      },

      theoryClass: {
        label: "Theoriekurs erforderlich",
        alert: "Theoriekurs obligatorisch",
        alertDescription:
          "8 Stunden Theoriekurs sind vor der Theorieprüfung obligatorisch (VZV)",
      },

      goals: {
        label: "Ziele und Einschränkungen",
        placeholder:
          "z.B.: Führerschein vor September erhalten, abends und am Wochenende verfügbar...",
        description: "Maximal 300 Zeichen",
      },
    },

    confirmation: {
      title: "Informationen überprüfen",
      subtitle: "Bestätigen Sie die Details vor dem Abschluss",

      sections: {
        identity: "Identität",
        training: "Ausbildung",
        quickActions: "Schnellaktionen",
        payment: "Zahlung",
      },

      identitySummary: {
        age: "{{age}} Jahre",
        contact: "Kontakt",
        address: "Adresse",
        edit: "Bearbeiten",
      },

      trainingSummary: {
        categories: "Kategorien",
        instructor: "Fahrlehrer",
        package: "Paket",
        theoryClass: "Theoriekurs",
        required: "Erforderlich",
        notRequired: "Nicht erforderlich",
      },

      quickActions: {
        scheduleLesson: "Erste Lektion jetzt planen",
        sendWelcome: "Willkommens-E-Mail senden",
        createAccount: "Schülerzugang erstellen",
        activateNow: "Sofort aktivieren",
        activateDescription: "Der Schüler kann ab sofort Lektionen buchen",
      },

      payment: {
        total: "Zu zahlen",
        method: "Zahlungsmethode",
        methods: {
          cash: "Bargeld",
          card: "Karte",
          transfer: "Überweisung",
          twint: "Twint",
          invoice: "Später fakturieren",
        },
        process: "Kassieren",
        received: "Zahlung erhalten",
      },
    },

    recent: {
      title: "Kürzliche Anmeldungen",
      subtitle: "Letzte 30 Tage",

      table: {
        date: "Datum",
        student: "Schüler",
        categories: "Kategorien",
        instructor: "Fahrlehrer",
        package: "Paket",
        status: "Status",
        actions: "Aktionen",
      },

      status: {
        active: "Aktiv",
        pending: "Dokumente ausstehend",
        inactive: "Inaktiv",
      },

      actions: {
        view: "Ansehen",
        complete: "Vervollständigen",
        schedule: "Lektion planen",
        message: "Nachricht",
        delete: "Löschen",
      },

      filters: {
        all: "Alle",
        date: "Datum",
        category: "Kategorie",
        instructor: "Fahrlehrer",
        status: "Status",
      },

      export: "Exportieren",
    },

    messages: {
      success: "Schüler erfolgreich angemeldet! Willkommen {{name}}!",
      error: "Bei der Anmeldung ist ein Fehler aufgetreten",
      emailTaken: "Diese E-Mail-Adresse wird bereits verwendet",
      validating: "Validierung läuft...",
    },
  },

  it: {
    title: "Iscrizioni",
    subtitle: "Gestione nuove iscrizioni e allievi recenti",

    tabs: {
      new: "Nuove iscrizioni",
      recent: "Allievi recenti",
      prospects: "Prospect",
      all: "Tutti gli allievi",
    },

    stats: {
      monthRegistrations: "Iscrizioni questo mese",
      conversionRate: "Tasso di conversione",
      activeStudents: "Allievi attivi",
    },

    wizard: {
      title: "Iscrivere un nuovo allievo",
      newRegistration: "Nuova iscrizione",

      steps: {
        identity: "Identità",
        training: "Formazione",
        confirmation: "Conferma",
      },

      buttons: {
        back: "Indietro",
        next: "Avanti",
        finish: "Finalizzare iscrizione",
        cancel: "Annulla",
        creating: "Creazione in corso...",
      },
    },

    identity: {
      title: "Informazioni dell'allievo",
      subtitle: "Inserire le informazioni essenziali",

      fields: {
        firstName: "Nome",
        firstNamePlaceholder: "Es: Marco",
        lastName: "Cognome",
        lastNamePlaceholder: "Es: Rossi",
        gender: "Titolo",
        genderOptions: {
          male: "Signore",
          female: "Signora",
          other: "Altro",
        },
        birthDate: "Data di nascita",
        age: "{{age}} anni",
        phone: "Telefono cellulare",
        phonePlaceholder: "+41 XX XXX XX XX",
        email: "Email",
        emailPlaceholder: "esempio@email.com",
        address: "Indirizzo",
        addressPlaceholder: "Via e numero",
        postalCode: "NPA",
        postalCodePlaceholder: "1000",
        city: "Città",
        cityPlaceholder: "Losanna",
        canton: "Cantone",
        photo: "Foto dell'allievo",
        photoUpload: "Rilasciare una foto o cliccare",
        photoSize: "Max 2 MB",
      },

      minor: {
        alert: "Allievo minorenne (meno di 18 anni)",
        alertDescription:
          "Le informazioni del rappresentante legale sono richieste (OAC Art. 10)",
        guardianName: "Nome del rappresentante legale",
        guardianNamePlaceholder: "Nome completo del genitore/tutore",
        guardianPhone: "Telefono del rappresentante",
        guardianPhonePlaceholder: "+41 XX XXX XX XX",
        consent: "Consenso parentale ottenuto",
        consentRequired: "Il consenso parentale è obbligatorio per i minorenni",
      },

      learnerPermit: {
        label: "Licenza allievo conducente ottenuta",
        number: "Numero della licenza",
        numberPlaceholder: "Es: 123456",
        date: "Data di ottenimento",
        alert: "Da ottenere prima delle lezioni pratiche",
        alertDescription:
          "La licenza allievo conducente è obbligatoria per iniziare le lezioni pratiche (OAC Art. 10)",
      },
    },

    training: {
      title: "Percorso di formazione desiderato",
      subtitle: "Definire obiettivi e programma",

      categories: {
        label: "Categorie di patente",
        description: "Selezionare almeno una categoria",
        options: {
          B: "B - Auto",
          A: "A - Moto",
          BE: "BE - Auto con rimorchio",
          A1: "A1 - Moto leggera",
          BPT: "BPT - Trasporto persone",
        },
      },

      instructor: {
        label: "Istruttore assegnato",
        auto: "Assegnazione automatica",
        autoDescription:
          "Il sistema assegnerà l'istruttore ottimale secondo disponibilità, specialità e prossimità",
        select: "Scegliere un istruttore",
      },

      package: {
        label: "Pacchetto di lezioni",
        optional: "Opzionale - Pre-vendita consigliata",
        none: "À la carte",
        discovery: "Pacchetto scoperta - 5 lezioni",
        standard: "Pack standard - 10 lezioni",
        intensive: "Pack intensivo - 20 lezioni",
        price: "{{price}} CHF",
        savings: "Risparmia {{amount}} CHF",
      },

      theoryClass: {
        label: "Corso teorico richiesto",
        alert: "Corso teorico obbligatorio",
        alertDescription:
          "8 ore di corso teorico sono obbligatorie prima dell'esame teorico (OAC)",
      },

      goals: {
        label: "Obiettivi e vincoli",
        placeholder:
          "Es: Ottenere la patente prima di settembre, disponibile la sera e nei weekend...",
        description: "300 caratteri massimo",
      },
    },

    confirmation: {
      title: "Verificare le informazioni",
      subtitle: "Confermare i dettagli prima della finalizzazione",

      sections: {
        identity: "Identità",
        training: "Formazione",
        quickActions: "Azioni rapide",
        payment: "Pagamento",
      },

      identitySummary: {
        age: "{{age}} anni",
        contact: "Contatto",
        address: "Indirizzo",
        edit: "Modificare",
      },

      trainingSummary: {
        categories: "Categorie",
        instructor: "Istruttore",
        package: "Pacchetto",
        theoryClass: "Corso teorico",
        required: "Richiesto",
        notRequired: "Non richiesto",
      },

      quickActions: {
        scheduleLesson: "Pianificare la prima lezione ora",
        sendWelcome: "Inviare l'email di benvenuto",
        createAccount: "Creare l'accesso spazio allievo",
        activateNow: "Attivare immediatamente",
        activateDescription: "L'allievo potrà prenotare lezioni da subito",
      },

      payment: {
        total: "Totale da pagare",
        method: "Modalità di pagamento",
        methods: {
          cash: "Contanti",
          card: "Carta",
          transfer: "Bonifico",
          twint: "Twint",
          invoice: "Fatturare più tardi",
        },
        process: "Incassare",
        received: "Pagamento ricevuto",
      },
    },

    recent: {
      title: "Iscrizioni recenti",
      subtitle: "Ultimi 30 giorni",

      table: {
        date: "Data",
        student: "Allievo",
        categories: "Categorie",
        instructor: "Istruttore",
        package: "Pacchetto",
        status: "Stato",
        actions: "Azioni",
      },

      status: {
        active: "Attivo",
        pending: "Attesa documenti",
        inactive: "Inattivo",
      },

      actions: {
        view: "Vedere",
        complete: "Completare",
        schedule: "Pianificare lezione",
        message: "Messaggio",
        delete: "Eliminare",
      },

      filters: {
        all: "Tutti",
        date: "Data",
        category: "Categoria",
        instructor: "Istruttore",
        status: "Stato",
      },

      export: "Esportare",
    },

    messages: {
      success: "Allievo iscritto con successo! Benvenuto {{name}}!",
      error: "Si è verificato un errore durante l'iscrizione",
      emailTaken: "Questo indirizzo email è già utilizzato",
      validating: "Validazione in corso...",
    },
  },

  en: {
    title: "Registrations",
    subtitle: "Manage new registrations and recent students",

    tabs: {
      new: "New registrations",
      recent: "Recent students",
      prospects: "Prospects",
      all: "All students",
    },

    stats: {
      monthRegistrations: "Registrations this month",
      conversionRate: "Conversion rate",
      activeStudents: "Active students",
    },

    wizard: {
      title: "Register a new student",
      newRegistration: "New registration",

      steps: {
        identity: "Identity",
        training: "Training",
        confirmation: "Confirmation",
      },

      buttons: {
        back: "Back",
        next: "Next",
        finish: "Finalize registration",
        cancel: "Cancel",
        creating: "Creating...",
      },
    },

    identity: {
      title: "Student information",
      subtitle: "Enter essential information",

      fields: {
        firstName: "First name",
        firstNamePlaceholder: "e.g.: John",
        lastName: "Last name",
        lastNamePlaceholder: "e.g.: Doe",
        gender: "Title",
        genderOptions: {
          male: "Mr",
          female: "Mrs",
          other: "Other",
        },
        birthDate: "Date of birth",
        age: "{{age}} years old",
        phone: "Mobile phone",
        phonePlaceholder: "+41 XX XXX XX XX",
        email: "Email",
        emailPlaceholder: "example@email.com",
        address: "Address",
        addressPlaceholder: "Street and number",
        postalCode: "Postal code",
        postalCodePlaceholder: "1000",
        city: "City",
        cityPlaceholder: "Lausanne",
        canton: "Canton",
        photo: "Student photo",
        photoUpload: "Drop a photo or click",
        photoSize: "Max 2 MB",
      },

      minor: {
        alert: "Minor student (under 18 years old)",
        alertDescription:
          "Legal guardian information is required (OAC Art. 10)",
        guardianName: "Legal guardian name",
        guardianNamePlaceholder: "Full name of parent/guardian",
        guardianPhone: "Guardian phone",
        guardianPhonePlaceholder: "+41 XX XXX XX XX",
        consent: "Parental consent obtained",
        consentRequired: "Parental consent is mandatory for minors",
      },

      learnerPermit: {
        label: "Learner's permit obtained",
        number: "Permit number",
        numberPlaceholder: "e.g.: 123456",
        date: "Issue date",
        alert: "To be obtained before practical lessons",
        alertDescription:
          "The learner's permit is mandatory to start practical lessons (OAC Art. 10)",
      },
    },

    training: {
      title: "Desired training path",
      subtitle: "Define goals and program",

      categories: {
        label: "License categories",
        description: "Select at least one category",
        options: {
          B: "B - Car",
          A: "A - Motorcycle",
          BE: "BE - Car with trailer",
          A1: "A1 - Light motorcycle",
          BPT: "BPT - Passenger transport",
        },
      },

      instructor: {
        label: "Assigned instructor",
        auto: "Automatic assignment",
        autoDescription:
          "The system will assign the optimal instructor based on availability, specialties and proximity",
        select: "Choose an instructor",
      },

      package: {
        label: "Lesson package",
        optional: "Optional - Pre-sale recommended",
        none: "À la carte",
        discovery: "Discovery package - 5 lessons",
        standard: "Standard pack - 10 lessons",
        intensive: "Intensive pack - 20 lessons",
        price: "{{price}} CHF",
        savings: "Save {{amount}} CHF",
      },

      theoryClass: {
        label: "Theory class required",
        alert: "Theory class mandatory",
        alertDescription:
          "8 hours of theory class are mandatory before the theory exam (OAC)",
      },

      goals: {
        label: "Goals and constraints",
        placeholder:
          "e.g.: Get license before September, available evenings and weekends...",
        description: "300 characters maximum",
      },
    },

    confirmation: {
      title: "Verify information",
      subtitle: "Confirm details before finalization",

      sections: {
        identity: "Identity",
        training: "Training",
        quickActions: "Quick actions",
        payment: "Payment",
      },

      identitySummary: {
        age: "{{age}} years old",
        contact: "Contact",
        address: "Address",
        edit: "Edit",
      },

      trainingSummary: {
        categories: "Categories",
        instructor: "Instructor",
        package: "Package",
        theoryClass: "Theory class",
        required: "Required",
        notRequired: "Not required",
      },

      quickActions: {
        scheduleLesson: "Schedule first lesson now",
        sendWelcome: "Send welcome email",
        createAccount: "Create student account",
        activateNow: "Activate immediately",
        activateDescription:
          "The student will be able to book lessons right away",
      },

      payment: {
        total: "Total to pay",
        method: "Payment method",
        methods: {
          cash: "Cash",
          card: "Card",
          transfer: "Transfer",
          twint: "Twint",
          invoice: "Invoice later",
        },
        process: "Process payment",
        received: "Payment received",
      },
    },

    recent: {
      title: "Recent registrations",
      subtitle: "Last 30 days",

      table: {
        date: "Date",
        student: "Student",
        categories: "Categories",
        instructor: "Instructor",
        package: "Package",
        status: "Status",
        actions: "Actions",
      },

      status: {
        active: "Active",
        pending: "Pending documents",
        inactive: "Inactive",
      },

      actions: {
        view: "View",
        complete: "Complete",
        schedule: "Schedule lesson",
        message: "Message",
        delete: "Delete",
      },

      filters: {
        all: "All",
        date: "Date",
        category: "Category",
        instructor: "Instructor",
        status: "Status",
      },

      export: "Export",
    },

    messages: {
      success: "Student registered successfully! Welcome {{name}}!",
      error: "An error occurred during registration",
      emailTaken: "This email address is already in use",
      validating: "Validating...",
    },
  },
};

export function getQuickRegistrationTranslation(
  locale: QuickRegistrationLocale = "fr"
) {
  return quickRegistrationTranslations[locale];
}
