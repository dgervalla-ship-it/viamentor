/**
 * VIAMENTOR - Onboarding Wizard i18n
 * Traductions FR/DE/IT/EN pour configuration initiale
 */

export type OnboardingLocale = "fr" | "de" | "it" | "en";

export interface OnboardingTranslations {
  // Header
  header: {
    welcome: string;
    subtitle: string;
    skipNotAllowed: string;
  };

  // Stepper
  stepper: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };

  // Step 1: École
  step1: {
    title: string;
    subtitle: string;
    logo: {
      label: string;
      dropzone: string;
      formats: string;
      maxSize: string;
      preview: string;
      change: string;
      remove: string;
    };
    name: {
      label: string;
      placeholder: string;
      help: string;
    };
    description: {
      label: string;
      placeholder: string;
      help: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    phone: {
      label: string;
      placeholder: string;
      help: string;
    };
    address: {
      title: string;
      street: string;
      zip: string;
      city: string;
      canton: string;
    };
    brandColor: {
      label: string;
      help: string;
      preview: string;
    };
    multiSites: {
      label: string;
      description: string;
    };
  };

  // Step 2: Utilisateurs
  step2: {
    title: string;
    subtitle: string;
    alert: {
      title: string;
      description: string;
    };
    table: {
      email: string;
      role: string;
      name: string;
      sendInvite: string;
      actions: string;
    };
    roles: {
      INSTRUCTOR: string;
      SECRETARY: string;
      SCHOOL_ADMIN: string;
      tooltips: {
        INSTRUCTOR: string;
        SECRETARY: string;
        SCHOOL_ADMIN: string;
      };
    };
    addUser: string;
    importCSV: string;
    downloadTemplate: string;
    minimumInstructor: string;
    preview: {
      title: string;
      pending: string;
    };
  };

  // Step 3: Catégories
  step3: {
    title: string;
    subtitle: string;
    categories: {
      label: string;
      help: string;
    };
    addLater: {
      label: string;
      description: string;
    };
  };

  // Step 4: Paiements
  step4: {
    title: string;
    subtitle: string;
    currency: {
      label: string;
    };
    methods: {
      label: string;
      cash: string;
      card: string;
      bank_transfer: string;
      twint: string;
      invoice: string;
    };
    invoicing: {
      title: string;
      enabled: string;
      iban: string;
      ibanPlaceholder: string;
      qrBill: string;
      qrBillHelp: string;
    };
    prices: {
      title: string;
      lesson: string;
      theory: string;
      help: string;
    };
  };

  // Step 5: Finalisation
  step5: {
    title: string;
    subtitle: string;
    summary: {
      title: string;
      school: string;
      users: string;
      categories: string;
      payment: string;
    };
    terms: {
      accept: string;
      privacy: string;
      newsletter: string;
      dataProcessing: string;
    };
    launch: string;
    launching: string;
  };

  // Navigation
  navigation: {
    previous: string;
    next: string;
    finish: string;
  };

  // Auto-save
  autoSave: {
    saving: string;
    saved: string;
    error: string;
  };

  // Validation
  validation: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    invalidZip: string;
    invalidIBAN: string;
    minLength: string;
    maxLength: string;
    uniqueEmail: string;
    minInstructor: string;
  };
}

export const ONBOARDING_I18N: Record<OnboardingLocale, OnboardingTranslations> =
  {
    // ============================================================================
    // FRANÇAIS
    // ============================================================================
    fr: {
      header: {
        welcome: "Bienvenue sur Viamentor !",
        subtitle: "Configurons ensemble votre auto-école en 5 étapes simples",
        skipNotAllowed: "Configuration obligatoire pour démarrer",
      },

      stepper: {
        step1: "École",
        step2: "Utilisateurs",
        step3: "Catégories",
        step4: "Paiements",
        step5: "Finalisation",
      },

      step1: {
        title: "Commençons par votre auto-école",
        subtitle:
          "Ces informations seront visibles par vos élèves et partenaires",
        logo: {
          label: "Logo de l'école",
          dropzone: "Glissez votre logo ici ou cliquez pour parcourir",
          formats: "JPG, PNG ou WEBP",
          maxSize: "Maximum 5 MB",
          preview: "Aperçu du logo",
          change: "Changer",
          remove: "Supprimer",
        },
        name: {
          label: "Nom de l'auto-école",
          placeholder: "Ex : Auto-École Genève",
          help: "Ce nom apparaîtra sur tous vos documents",
        },
        description: {
          label: "Description (optionnel)",
          placeholder:
            "Présentez votre école en quelques mots : spécialités, valeurs, expérience...",
          help: "Maximum 500 caractères",
        },
        email: {
          label: "Email de contact",
          placeholder: "contact@autoecole.ch",
        },
        phone: {
          label: "Téléphone",
          placeholder: "+41 22 123 45 67",
          help: "Format suisse : +41 XX XXX XX XX",
        },
        address: {
          title: "Adresse",
          street: "Rue et numéro",
          zip: "Code postal",
          city: "Ville",
          canton: "Canton",
        },
        brandColor: {
          label: "Couleur de marque",
          help: "Cette couleur sera utilisée dans l'interface et les documents",
          preview: "Aperçu en temps réel",
        },
        multiSites: {
          label: "Gestion multi-sites",
          description:
            "Activez si vous gérez plusieurs agences (configuration avancée)",
        },
      },

      step2: {
        title: "Créez votre équipe",
        subtitle:
          "Invitez vos moniteurs et collaborateurs à rejoindre Viamentor",
        alert: {
          title: "Vous êtes l'administrateur principal",
          description:
            "Ajoutez vos moniteurs et secrétaires. Ils recevront un email d'invitation pour créer leur compte.",
        },
        table: {
          email: "Email",
          role: "Rôle",
          name: "Nom (optionnel)",
          sendInvite: "Envoyer invitation",
          actions: "Actions",
        },
        roles: {
          INSTRUCTOR: "Moniteur",
          SECRETARY: "Secrétaire",
          SCHOOL_ADMIN: "Administrateur",
          tooltips: {
            INSTRUCTOR:
              "Gère les leçons, évalue les élèves, consulte son planning",
            SECRETARY:
              "Inscrit les élèves, gère le planning, traite les paiements",
            SCHOOL_ADMIN: "Accès complet à toutes les fonctionnalités",
          },
        },
        addUser: "Ajouter un utilisateur",
        importCSV: "Importer depuis CSV",
        downloadTemplate: "Télécharger le modèle",
        minimumInstructor: "Au moins 1 moniteur requis pour démarrer",
        preview: {
          title: "Utilisateurs invités",
          pending: "En attente",
        },
      },

      step3: {
        title: "Configurer votre offre de formation",
        subtitle: "Définissez vos catégories, tarifs et véhicules",
        categories: {
          label: "Catégories proposées",
          help: "Vous pourrez ajouter d'autres catégories plus tard",
        },
        addLater: {
          label: "Ajouter les véhicules plus tard",
          description:
            "Vous pourrez enregistrer vos véhicules après la configuration initiale",
        },
      },

      step4: {
        title: "Configuration des paiements",
        subtitle: "Définissez vos méthodes de paiement et tarifs de base",
        currency: {
          label: "Devise",
        },
        methods: {
          label: "Méthodes de paiement acceptées",
          cash: "Espèces",
          card: "Carte bancaire",
          bank_transfer: "Virement bancaire",
          twint: "TWINT",
          invoice: "Facture",
        },
        invoicing: {
          title: "Facturation",
          enabled: "Activer la facturation automatique",
          iban: "IBAN pour les paiements",
          ibanPlaceholder: "CH00 0000 0000 0000 0000 0",
          qrBill: "Générer QR-factures suisses",
          qrBillHelp: "Conforme au Swiss Payment Standard",
        },
        prices: {
          title: "Tarifs par défaut",
          lesson: "Prix leçon pratique (CHF)",
          theory: "Prix cours théorique (CHF)",
          help: "Ces tarifs peuvent être personnalisés par catégorie plus tard",
        },
      },

      step5: {
        title: "Finalisation",
        subtitle: "Vérifiez vos informations et lancez votre auto-école",
        summary: {
          title: "Récapitulatif",
          school: "École",
          users: "Utilisateurs",
          categories: "Catégories",
          payment: "Paiement",
        },
        terms: {
          accept: "J'accepte les conditions générales d'utilisation",
          privacy: "J'accepte la politique de confidentialité",
          newsletter: "Je souhaite recevoir les actualités Viamentor",
          dataProcessing:
            "J'autorise le traitement de mes données conformément au RGPD",
        },
        launch: "Lancer mon auto-école",
        launching: "Lancement en cours...",
      },

      navigation: {
        previous: "Précédent",
        next: "Continuer",
        finish: "Terminer",
      },

      autoSave: {
        saving: "Sauvegarde...",
        saved: "Sauvegardé",
        error: "Erreur de sauvegarde",
      },

      validation: {
        required: "Ce champ est requis",
        invalidEmail: "Email invalide",
        invalidPhone: "Format téléphone invalide",
        invalidZip: "Code postal invalide (1000-9999)",
        invalidIBAN: "IBAN suisse invalide",
        minLength: "Trop court",
        maxLength: "Trop long",
        uniqueEmail: "Cet email est déjà utilisé",
        minInstructor: "Au moins 1 moniteur requis",
      },
    },

    // ============================================================================
    // DEUTSCH
    // ============================================================================
    de: {
      header: {
        welcome: "Willkommen bei Viamentor!",
        subtitle:
          "Konfigurieren wir Ihre Fahrschule gemeinsam in 5 einfachen Schritten",
        skipNotAllowed: "Konfiguration erforderlich zum Starten",
      },

      stepper: {
        step1: "Schule",
        step2: "Benutzer",
        step3: "Kategorien",
        step4: "Zahlungen",
        step5: "Abschluss",
      },

      step1: {
        title: "Beginnen wir mit Ihrer Fahrschule",
        subtitle:
          "Diese Informationen werden für Ihre Schüler und Partner sichtbar sein",
        logo: {
          label: "Schul-Logo",
          dropzone: "Logo hier ablegen oder klicken zum Durchsuchen",
          formats: "JPG, PNG oder WEBP",
          maxSize: "Maximum 5 MB",
          preview: "Logo-Vorschau",
          change: "Ändern",
          remove: "Entfernen",
        },
        name: {
          label: "Name der Fahrschule",
          placeholder: "z.B.: Fahrschule Zürich",
          help: "Dieser Name erscheint auf allen Ihren Dokumenten",
        },
        description: {
          label: "Beschreibung (optional)",
          placeholder:
            "Stellen Sie Ihre Schule in wenigen Worten vor: Spezialitäten, Werte, Erfahrung...",
          help: "Maximum 500 Zeichen",
        },
        email: {
          label: "Kontakt-E-Mail",
          placeholder: "kontakt@fahrschule.ch",
        },
        phone: {
          label: "Telefon",
          placeholder: "+41 44 123 45 67",
          help: "Schweizer Format: +41 XX XXX XX XX",
        },
        address: {
          title: "Adresse",
          street: "Strasse und Nummer",
          zip: "Postleitzahl",
          city: "Stadt",
          canton: "Kanton",
        },
        brandColor: {
          label: "Markenfarbe",
          help: "Diese Farbe wird in der Benutzeroberfläche und Dokumenten verwendet",
          preview: "Echtzeit-Vorschau",
        },
        multiSites: {
          label: "Multi-Standort-Verwaltung",
          description:
            "Aktivieren, wenn Sie mehrere Filialen verwalten (erweiterte Konfiguration)",
        },
      },

      step2: {
        title: "Erstellen Sie Ihr Team",
        subtitle:
          "Laden Sie Ihre Fahrlehrer und Mitarbeiter ein, Viamentor beizutreten",
        alert: {
          title: "Sie sind der Hauptadministrator",
          description:
            "Fügen Sie Ihre Fahrlehrer und Sekretäre hinzu. Sie erhalten eine Einladungs-E-Mail zur Kontoerstellung.",
        },
        table: {
          email: "E-Mail",
          role: "Rolle",
          name: "Name (optional)",
          sendInvite: "Einladung senden",
          actions: "Aktionen",
        },
        roles: {
          INSTRUCTOR: "Fahrlehrer",
          SECRETARY: "Sekretär",
          SCHOOL_ADMIN: "Administrator",
          tooltips: {
            INSTRUCTOR:
              "Verwaltet Lektionen, bewertet Schüler, sieht seinen Zeitplan",
            SECRETARY:
              "Registriert Schüler, verwaltet Zeitplan, bearbeitet Zahlungen",
            SCHOOL_ADMIN: "Vollzugriff auf alle Funktionen",
          },
        },
        addUser: "Benutzer hinzufügen",
        importCSV: "Aus CSV importieren",
        downloadTemplate: "Vorlage herunterladen",
        minimumInstructor: "Mindestens 1 Fahrlehrer erforderlich zum Starten",
        preview: {
          title: "Eingeladene Benutzer",
          pending: "Ausstehend",
        },
      },

      step3: {
        title: "Konfigurieren Sie Ihr Ausbildungsangebot",
        subtitle: "Definieren Sie Ihre Kategorien, Preise und Fahrzeuge",
        categories: {
          label: "Angebotene Kategorien",
          help: "Sie können später weitere Kategorien hinzufügen",
        },
        addLater: {
          label: "Fahrzeuge später hinzufügen",
          description:
            "Sie können Ihre Fahrzeuge nach der Erstkonfiguration registrieren",
        },
      },

      step4: {
        title: "Zahlungskonfiguration",
        subtitle: "Definieren Sie Ihre Zahlungsmethoden und Grundpreise",
        currency: {
          label: "Währung",
        },
        methods: {
          label: "Akzeptierte Zahlungsmethoden",
          cash: "Bargeld",
          card: "Bankkarte",
          bank_transfer: "Banküberweisung",
          twint: "TWINT",
          invoice: "Rechnung",
        },
        invoicing: {
          title: "Rechnungsstellung",
          enabled: "Automatische Rechnungsstellung aktivieren",
          iban: "IBAN für Zahlungen",
          ibanPlaceholder: "CH00 0000 0000 0000 0000 0",
          qrBill: "Schweizer QR-Rechnungen generieren",
          qrBillHelp: "Konform mit Swiss Payment Standard",
        },
        prices: {
          title: "Standardpreise",
          lesson: "Preis Fahrlektion (CHF)",
          theory: "Preis Theoriekurs (CHF)",
          help: "Diese Preise können später pro Kategorie angepasst werden",
        },
      },

      step5: {
        title: "Abschluss",
        subtitle:
          "Überprüfen Sie Ihre Informationen und starten Sie Ihre Fahrschule",
        summary: {
          title: "Zusammenfassung",
          school: "Schule",
          users: "Benutzer",
          categories: "Kategorien",
          payment: "Zahlung",
        },
        terms: {
          accept: "Ich akzeptiere die Allgemeinen Geschäftsbedingungen",
          privacy: "Ich akzeptiere die Datenschutzrichtlinie",
          newsletter: "Ich möchte Viamentor-Neuigkeiten erhalten",
          dataProcessing:
            "Ich autorisiere die Verarbeitung meiner Daten gemäss DSGVO",
        },
        launch: "Meine Fahrschule starten",
        launching: "Start läuft...",
      },

      navigation: {
        previous: "Zurück",
        next: "Weiter",
        finish: "Fertig",
      },

      autoSave: {
        saving: "Speichern...",
        saved: "Gespeichert",
        error: "Speicherfehler",
      },

      validation: {
        required: "Dieses Feld ist erforderlich",
        invalidEmail: "Ungültige E-Mail",
        invalidPhone: "Ungültiges Telefonformat",
        invalidZip: "Ungültige Postleitzahl (1000-9999)",
        invalidIBAN: "Ungültige Schweizer IBAN",
        minLength: "Zu kurz",
        maxLength: "Zu lang",
        uniqueEmail: "Diese E-Mail wird bereits verwendet",
        minInstructor: "Mindestens 1 Fahrlehrer erforderlich",
      },
    },

    // ============================================================================
    // ITALIANO
    // ============================================================================
    it: {
      header: {
        welcome: "Benvenuto su Viamentor!",
        subtitle:
          "Configuriamo insieme la tua scuola guida in 5 semplici passaggi",
        skipNotAllowed: "Configurazione obbligatoria per iniziare",
      },

      stepper: {
        step1: "Scuola",
        step2: "Utenti",
        step3: "Categorie",
        step4: "Pagamenti",
        step5: "Finalizzazione",
      },

      step1: {
        title: "Iniziamo con la tua scuola guida",
        subtitle:
          "Queste informazioni saranno visibili ai tuoi studenti e partner",
        logo: {
          label: "Logo della scuola",
          dropzone: "Trascina il tuo logo qui o clicca per sfogliare",
          formats: "JPG, PNG o WEBP",
          maxSize: "Massimo 5 MB",
          preview: "Anteprima logo",
          change: "Cambia",
          remove: "Rimuovi",
        },
        name: {
          label: "Nome della scuola guida",
          placeholder: "Es: Scuola Guida Lugano",
          help: "Questo nome apparirà su tutti i tuoi documenti",
        },
        description: {
          label: "Descrizione (opzionale)",
          placeholder:
            "Presenta la tua scuola in poche parole: specialità, valori, esperienza...",
          help: "Massimo 500 caratteri",
        },
        email: {
          label: "Email di contatto",
          placeholder: "contatto@scuolaguida.ch",
        },
        phone: {
          label: "Telefono",
          placeholder: "+41 91 123 45 67",
          help: "Formato svizzero: +41 XX XXX XX XX",
        },
        address: {
          title: "Indirizzo",
          street: "Via e numero",
          zip: "Codice postale",
          city: "Città",
          canton: "Cantone",
        },
        brandColor: {
          label: "Colore del marchio",
          help: "Questo colore sarà utilizzato nell'interfaccia e nei documenti",
          preview: "Anteprima in tempo reale",
        },
        multiSites: {
          label: "Gestione multi-sede",
          description:
            "Attiva se gestisci più agenzie (configurazione avanzata)",
        },
      },

      step2: {
        title: "Crea il tuo team",
        subtitle:
          "Invita i tuoi istruttori e collaboratori a unirsi a Viamentor",
        alert: {
          title: "Sei l'amministratore principale",
          description:
            "Aggiungi i tuoi istruttori e segretari. Riceveranno un'email di invito per creare il loro account.",
        },
        table: {
          email: "Email",
          role: "Ruolo",
          name: "Nome (opzionale)",
          sendInvite: "Invia invito",
          actions: "Azioni",
        },
        roles: {
          INSTRUCTOR: "Istruttore",
          SECRETARY: "Segretario",
          SCHOOL_ADMIN: "Amministratore",
          tooltips: {
            INSTRUCTOR:
              "Gestisce le lezioni, valuta gli studenti, consulta il suo planning",
            SECRETARY:
              "Iscrive gli studenti, gestisce il planning, elabora i pagamenti",
            SCHOOL_ADMIN: "Accesso completo a tutte le funzionalità",
          },
        },
        addUser: "Aggiungi utente",
        importCSV: "Importa da CSV",
        downloadTemplate: "Scarica modello",
        minimumInstructor: "Almeno 1 istruttore richiesto per iniziare",
        preview: {
          title: "Utenti invitati",
          pending: "In attesa",
        },
      },

      step3: {
        title: "Configura la tua offerta formativa",
        subtitle: "Definisci le tue categorie, tariffe e veicoli",
        categories: {
          label: "Categorie offerte",
          help: "Potrai aggiungere altre categorie più tardi",
        },
        addLater: {
          label: "Aggiungi veicoli più tardi",
          description:
            "Potrai registrare i tuoi veicoli dopo la configurazione iniziale",
        },
      },

      step4: {
        title: "Configurazione pagamenti",
        subtitle: "Definisci i tuoi metodi di pagamento e tariffe base",
        currency: {
          label: "Valuta",
        },
        methods: {
          label: "Metodi di pagamento accettati",
          cash: "Contanti",
          card: "Carta bancaria",
          bank_transfer: "Bonifico bancario",
          twint: "TWINT",
          invoice: "Fattura",
        },
        invoicing: {
          title: "Fatturazione",
          enabled: "Attiva fatturazione automatica",
          iban: "IBAN per i pagamenti",
          ibanPlaceholder: "CH00 0000 0000 0000 0000 0",
          qrBill: "Genera QR-fatture svizzere",
          qrBillHelp: "Conforme allo Swiss Payment Standard",
        },
        prices: {
          title: "Tariffe predefinite",
          lesson: "Prezzo lezione pratica (CHF)",
          theory: "Prezzo corso teorico (CHF)",
          help: "Queste tariffe possono essere personalizzate per categoria più tardi",
        },
      },

      step5: {
        title: "Finalizzazione",
        subtitle: "Verifica le tue informazioni e lancia la tua scuola guida",
        summary: {
          title: "Riepilogo",
          school: "Scuola",
          users: "Utenti",
          categories: "Categorie",
          payment: "Pagamento",
        },
        terms: {
          accept: "Accetto i termini e condizioni generali",
          privacy: "Accetto la politica sulla privacy",
          newsletter: "Desidero ricevere le novità Viamentor",
          dataProcessing:
            "Autorizzo il trattamento dei miei dati conformemente al GDPR",
        },
        launch: "Lancia la mia scuola guida",
        launching: "Lancio in corso...",
      },

      navigation: {
        previous: "Precedente",
        next: "Continua",
        finish: "Termina",
      },

      autoSave: {
        saving: "Salvataggio...",
        saved: "Salvato",
        error: "Errore di salvataggio",
      },

      validation: {
        required: "Questo campo è obbligatorio",
        invalidEmail: "Email non valida",
        invalidPhone: "Formato telefono non valido",
        invalidZip: "Codice postale non valido (1000-9999)",
        invalidIBAN: "IBAN svizzero non valido",
        minLength: "Troppo corto",
        maxLength: "Troppo lungo",
        uniqueEmail: "Questa email è già utilizzata",
        minInstructor: "Almeno 1 istruttore richiesto",
      },
    },

    // ============================================================================
    // ENGLISH
    // ============================================================================
    en: {
      header: {
        welcome: "Welcome to Viamentor!",
        subtitle:
          "Let's configure your driving school together in 5 simple steps",
        skipNotAllowed: "Configuration required to start",
      },

      stepper: {
        step1: "School",
        step2: "Users",
        step3: "Categories",
        step4: "Payments",
        step5: "Finalization",
      },

      step1: {
        title: "Let's start with your driving school",
        subtitle:
          "This information will be visible to your students and partners",
        logo: {
          label: "School logo",
          dropzone: "Drop your logo here or click to browse",
          formats: "JPG, PNG or WEBP",
          maxSize: "Maximum 5 MB",
          preview: "Logo preview",
          change: "Change",
          remove: "Remove",
        },
        name: {
          label: "Driving school name",
          placeholder: "e.g.: Geneva Driving School",
          help: "This name will appear on all your documents",
        },
        description: {
          label: "Description (optional)",
          placeholder:
            "Present your school in a few words: specialties, values, experience...",
          help: "Maximum 500 characters",
        },
        email: {
          label: "Contact email",
          placeholder: "contact@drivingschool.ch",
        },
        phone: {
          label: "Phone",
          placeholder: "+41 22 123 45 67",
          help: "Swiss format: +41 XX XXX XX XX",
        },
        address: {
          title: "Address",
          street: "Street and number",
          zip: "Postal code",
          city: "City",
          canton: "Canton",
        },
        brandColor: {
          label: "Brand color",
          help: "This color will be used in the interface and documents",
          preview: "Real-time preview",
        },
        multiSites: {
          label: "Multi-site management",
          description:
            "Enable if you manage multiple agencies (advanced configuration)",
        },
      },

      step2: {
        title: "Create your team",
        subtitle: "Invite your instructors and staff to join Viamentor",
        alert: {
          title: "You are the main administrator",
          description:
            "Add your instructors and secretaries. They will receive an invitation email to create their account.",
        },
        table: {
          email: "Email",
          role: "Role",
          name: "Name (optional)",
          sendInvite: "Send invitation",
          actions: "Actions",
        },
        roles: {
          INSTRUCTOR: "Instructor",
          SECRETARY: "Secretary",
          SCHOOL_ADMIN: "Administrator",
          tooltips: {
            INSTRUCTOR:
              "Manages lessons, evaluates students, views their schedule",
            SECRETARY:
              "Registers students, manages schedule, processes payments",
            SCHOOL_ADMIN: "Full access to all features",
          },
        },
        addUser: "Add user",
        importCSV: "Import from CSV",
        downloadTemplate: "Download template",
        minimumInstructor: "At least 1 instructor required to start",
        preview: {
          title: "Invited users",
          pending: "Pending",
        },
      },

      step3: {
        title: "Configure your training offer",
        subtitle: "Define your categories, prices and vehicles",
        categories: {
          label: "Offered categories",
          help: "You can add more categories later",
        },
        addLater: {
          label: "Add vehicles later",
          description:
            "You can register your vehicles after the initial configuration",
        },
      },

      step4: {
        title: "Payment configuration",
        subtitle: "Define your payment methods and base prices",
        currency: {
          label: "Currency",
        },
        methods: {
          label: "Accepted payment methods",
          cash: "Cash",
          card: "Bank card",
          bank_transfer: "Bank transfer",
          twint: "TWINT",
          invoice: "Invoice",
        },
        invoicing: {
          title: "Invoicing",
          enabled: "Enable automatic invoicing",
          iban: "IBAN for payments",
          ibanPlaceholder: "CH00 0000 0000 0000 0000 0",
          qrBill: "Generate Swiss QR-bills",
          qrBillHelp: "Compliant with Swiss Payment Standard",
        },
        prices: {
          title: "Default prices",
          lesson: "Practical lesson price (CHF)",
          theory: "Theory course price (CHF)",
          help: "These prices can be customized per category later",
        },
      },

      step5: {
        title: "Finalization",
        subtitle: "Review your information and launch your driving school",
        summary: {
          title: "Summary",
          school: "School",
          users: "Users",
          categories: "Categories",
          payment: "Payment",
        },
        terms: {
          accept: "I accept the terms and conditions",
          privacy: "I accept the privacy policy",
          newsletter: "I want to receive Viamentor news",
          dataProcessing:
            "I authorize the processing of my data in accordance with GDPR",
        },
        launch: "Launch my driving school",
        launching: "Launching...",
      },

      navigation: {
        previous: "Previous",
        next: "Continue",
        finish: "Finish",
      },

      autoSave: {
        saving: "Saving...",
        saved: "Saved",
        error: "Save error",
      },

      validation: {
        required: "This field is required",
        invalidEmail: "Invalid email",
        invalidPhone: "Invalid phone format",
        invalidZip: "Invalid postal code (1000-9999)",
        invalidIBAN: "Invalid Swiss IBAN",
        minLength: "Too short",
        maxLength: "Too long",
        uniqueEmail: "This email is already used",
        minInstructor: "At least 1 instructor required",
      },
    },
  };
