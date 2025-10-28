/**
 * VIAMENTOR - Instructor Creation Wizard i18n
 *
 * Traductions FR/DE/IT/EN pour le wizard de création de moniteur
 * avec terminologie OMCo et références légales suisses
 */

export type InstructorWizardLocale = "fr" | "de" | "it" | "en";

export const INSTRUCTOR_WIZARD_TRANSLATIONS = {
  fr: {
    // Wizard général
    wizard: {
      title: "Créer un nouveau moniteur",
      subtitle: "Assistant de création d'un moniteur d'auto-école",
      close_confirmation:
        "Êtes-vous sûr de vouloir fermer ? Les données non sauvegardées seront perdues.",
      step_of: "Étape {current} sur {total}",
      progress: "Progression : {percent}%",
    },

    // Navigation
    navigation: {
      previous: "Précédent",
      next: "Suivant",
      create: "Créer le moniteur",
      cancel: "Annuler",
      save_draft: "Sauvegarder le brouillon",
    },

    // Steps
    steps: {
      personal_info: "Informations personnelles",
      qualifications: "Qualifications",
      legal_authorizations: "Autorisations légales",
      availability: "Disponibilités",
      summary: "Récapitulatif",
    },

    // Step 1 - Personal Info
    personal_info: {
      title: "Informations personnelles",
      subtitle: "Renseignez les informations de base du moniteur",

      // Photo
      photo: {
        label: "Photo de profil",
        upload: "Cliquez pour télécharger ou glissez une image",
        formats: "PNG, JPG jusqu'à 5MB",
        crop_title: "Recadrer la photo",
        crop_subtitle: "Ajustez la photo pour un format carré",
      },

      // Identité
      identity: {
        title: "Identité",
        first_name: "Prénom",
        first_name_placeholder: "Entrez le prénom",
        last_name: "Nom de famille",
        last_name_placeholder: "Entrez le nom de famille",
        birth_date: "Date de naissance",
        birth_date_placeholder: "Sélectionnez la date",
        gender: "Genre",
        gender_optional: "(optionnel)",
      },

      // Adresse
      address: {
        title: "Adresse",
        street: "Rue et numéro",
        street_placeholder: "Ex: Rue de la Paix 12",
        zip_code: "NPA",
        zip_code_placeholder: "1000",
        city: "Ville",
        city_placeholder: "Lausanne",
        canton: "Canton",
      },

      // Contact
      contact: {
        title: "Contact",
        email: "Adresse e-mail",
        email_placeholder: "moniteur@exemple.ch",
        phone: "Téléphone",
        phone_placeholder: "+41 79 123 45 67",
        nationality: "Nationalité",
        nationality_placeholder: "Sélectionnez la nationalité",
        languages: "Langues parlées",
        languages_subtitle: "Minimum 1 langue requise",
        iban: "IBAN",
        iban_placeholder: "CH93 0076 2011 6238 5295 7 (optionnel)",
        iban_optional: "(optionnel)",
      },
    },

    // Step 2 - Qualifications
    qualifications: {
      title: "Qualifications et habilitations",
      subtitle: "Brevet fédéral et catégories d'enseignement",

      // Brevet fédéral
      federal_license: {
        title: "Brevet fédéral de moniteur",
        subtitle: "Conformément aux exigences OMCo",
        number: "Numéro de brevet",
        number_placeholder: "Ex: CH-MON-2020-001",
        date: "Date d'obtention",
        date_placeholder: "Sélectionnez la date",
        scan: "Scan du brevet",
        scan_upload: "Télécharger le scan (PDF ou image)",
        scan_required: "Document obligatoire",
        verified: "Brevet vérifié",
        verified_subtitle:
          "Cochez si le brevet a été vérifié par l'administration",
      },

      // Habilitations
      categories: {
        title: "Habilitations par catégorie",
        subtitle: "Minimum 1 catégorie requise",
        select_categories: "Sélectionnez les catégories d'enseignement",
        obtained_date: "Date d'obtention",
        experience: "Expérience",
        experience_placeholder:
          "Décrivez votre expérience dans cette catégorie",
        certificates: "Attestations",
        certificates_upload: "Télécharger les attestations",
      },

      // Spécialités
      specialties: {
        title: "Spécialités",
        subtitle: "Maximum 5 spécialités (optionnel)",
        select: "Sélectionnez vos spécialités",
      },

      // Diplômes
      additional_diplomas: {
        title: "Diplômes additionnels",
        subtitle: "Formations complémentaires (optionnel)",
        placeholder: "Décrivez vos diplômes et formations complémentaires",
        max_chars: "Maximum 500 caractères",
      },
    },

    // Step 3 - Legal Authorizations
    legal_authorizations: {
      title: "Autorisations légales",
      subtitle: "Conformité OMCo 2007 Art. 3",
      omco_info: "OMCo Art. 3 : Autorisation cantonale + TPP requises",

      // Autorisation cantonale
      cantonal_authorization: {
        title: "Autorisation cantonale",
        subtitle: "Autorisation d'enseigner délivrée par le canton",
        number: "Numéro d'autorisation",
        number_placeholder: "Ex: VD-MON-2023-001",
        issuing_canton: "Canton émetteur",
        issuing_canton_placeholder: "Sélectionnez le canton",
        issue_date: "Date de délivrance",
        issue_date_placeholder: "Sélectionnez la date",
        expiration_date: "Date d'expiration",
        expiration_date_placeholder: "Sélectionnez la date",
        expires_in: "Expire dans {days} jours",
        renewal_warning: "Renouvellement proche - Moins de 180 jours",
        expired_warning: "Autorisation expirée",
        scan: "Scan de l'autorisation",
        scan_upload: "Télécharger le scan (PDF)",
      },

      // TPP
      tpp: {
        title: "TPP (Transport Personnes Professionnel)",
        subtitle: "Conformité OMCo Art. 3",
        info: "TPP obligatoire en Suisse pour l'enseignement de la conduite",
        has_valid: "TPP valide",
        has_valid_required: "TPP obligatoire selon OMCo Art. 3",
        number: "Numéro TPP",
        number_placeholder: "Ex: TPP-CH-2023-001",
        expiration_date: "Date d'expiration",
        expiration_date_placeholder: "Sélectionnez la date",
        certificate: "Certificat TPP",
        certificate_upload: "Télécharger le certificat (PDF)",
      },

      // Casier judiciaire
      criminal_record: {
        title: "Casier judiciaire",
        subtitle: "Extrait récent obligatoire",
        warning: "Requis pour la sécurité des élèves",
        extract_date: "Date de l'extrait",
        extract_date_placeholder: "Sélectionnez la date",
        extract_date_info: "L'extrait doit dater de moins de 3 mois",
        document: "Extrait du casier judiciaire",
        document_upload: "Télécharger l'extrait (PDF)",
        verified: "Vérifié conforme",
        verified_subtitle:
          "Cochez si l'extrait a été vérifié par l'administration",
      },

      // RC Pro
      professional_liability: {
        title: "Assurance RC Professionnelle",
        subtitle: "Protection recommandée",
        info: "RC professionnelle recommandée pour la protection du moniteur",
        company: "Compagnie d'assurance",
        company_placeholder: "Ex: Helvetia Assurances",
        policy_number: "Numéro de police",
        policy_number_placeholder: "Ex: RC-PRO-2023-001",
        expiration_date: "Date d'expiration",
        expiration_date_placeholder: "Sélectionnez la date",
        attestation: "Attestation d'assurance",
        attestation_upload: "Télécharger l'attestation (PDF)",
      },
    },

    // Genres
    gender: {
      male: "Homme",
      female: "Femme",
      other: "Autre",
    },

    // Langues
    languages: {
      french: "Français",
      german: "Allemand",
      italian: "Italien",
      english: "Anglais",
    },

    // Catégories
    categories: {
      B: "Catégorie B - Voiture",
      A: "Catégorie A - Moto",
      BE: "Catégorie BE - Voiture + remorque",
      A1: "Catégorie A1 - Moto légère",
      BPT: "Catégorie BPT - Transport professionnel",
    },

    // Spécialités
    specialties: {
      urban: "Conduite urbaine",
      highway: "Conduite autoroute",
      eco_driving: "Éco-conduite",
      defensive: "Conduite défensive",
      advanced: "Perfectionnement",
    },

    // Validation
    validation: {
      required: "Ce champ est obligatoire",
      invalid_email: "Format d'email invalide",
      invalid_phone: "Format de téléphone suisse invalide",
      invalid_iban: "Format IBAN suisse invalide",
      min_age_omco: "L'âge minimum requis est de 21 ans selon les règles OMCo",
      min_categories: "Au moins une catégorie d'habilitation est requise",
      max_specialties: "Maximum 5 spécialités autorisées",
      future_date: "La date ne peut pas être dans le futur",
      invalid_zip: "Le NPA doit contenir exactement 4 chiffres",
    },

    // Messages
    messages: {
      email_checking: "Vérification de l'email...",
      email_available: "Email disponible",
      email_taken: "Cet email est déjà utilisé",
      data_saved: "Données sauvegardées",
      validation_errors: "Veuillez corriger les erreurs avant de continuer",
    },
  },

  de: {
    // Wizard général
    wizard: {
      title: "Neuen Fahrlehrer erstellen",
      subtitle: "Assistent zur Erstellung eines Fahrlehrers",
      close_confirmation:
        "Sind Sie sicher, dass Sie schließen möchten? Nicht gespeicherte Daten gehen verloren.",
      step_of: "Schritt {current} von {total}",
      progress: "Fortschritt: {percent}%",
    },

    // Navigation
    navigation: {
      previous: "Zurück",
      next: "Weiter",
      create: "Fahrlehrer erstellen",
      cancel: "Abbrechen",
      save_draft: "Entwurf speichern",
    },

    // Steps
    steps: {
      personal_info: "Persönliche Informationen",
      qualifications: "Qualifikationen",
      legal_authorizations: "Rechtliche Genehmigungen",
      availability: "Verfügbarkeiten",
      summary: "Zusammenfassung",
    },

    // Step 1 - Personal Info
    personal_info: {
      title: "Persönliche Informationen",
      subtitle: "Geben Sie die Grundinformationen des Fahrlehrers ein",

      // Photo
      photo: {
        label: "Profilbild",
        upload: "Klicken Sie zum Hochladen oder ziehen Sie ein Bild hierher",
        formats: "PNG, JPG bis 5MB",
        crop_title: "Bild zuschneiden",
        crop_subtitle: "Passen Sie das Bild für ein quadratisches Format an",
      },

      // Identité
      identity: {
        title: "Identität",
        first_name: "Vorname",
        first_name_placeholder: "Vorname eingeben",
        last_name: "Nachname",
        last_name_placeholder: "Nachname eingeben",
        birth_date: "Geburtsdatum",
        birth_date_placeholder: "Datum auswählen",
        gender: "Geschlecht",
        gender_optional: "(optional)",
      },

      // Adresse
      address: {
        title: "Adresse",
        street: "Straße und Hausnummer",
        street_placeholder: "z.B. Friedensstraße 12",
        zip_code: "PLZ",
        zip_code_placeholder: "1000",
        city: "Stadt",
        city_placeholder: "Lausanne",
        canton: "Kanton",
      },

      // Contact
      contact: {
        title: "Kontakt",
        email: "E-Mail-Adresse",
        email_placeholder: "fahrlehrer@beispiel.ch",
        phone: "Telefon",
        phone_placeholder: "+41 79 123 45 67",
        nationality: "Nationalität",
        nationality_placeholder: "Nationalität auswählen",
        languages: "Gesprochene Sprachen",
        languages_subtitle: "Mindestens 1 Sprache erforderlich",
        iban: "IBAN",
        iban_placeholder: "CH93 0076 2011 6238 5295 7 (optional)",
        iban_optional: "(optional)",
      },
    },

    // Step 2 - Qualifications
    qualifications: {
      title: "Qualifikationen und Berechtigungen",
      subtitle: "Eidgenössisches Patent und Unterrichtskategorien",

      // Brevet fédéral
      federal_license: {
        title: "Eidgenössisches Fahrlehrerpatent",
        subtitle: "Gemäß den Anforderungen des ASTRA",
        number: "Patentnummer",
        number_placeholder: "z.B. CH-MON-2020-001",
        date: "Ausstellungsdatum",
        date_placeholder: "Datum auswählen",
        scan: "Scan des Patents",
        scan_upload: "Scan hochladen (PDF oder Bild)",
        scan_required: "Pflichtdokument",
        verified: "Patent verifiziert",
        verified_subtitle:
          "Ankreuzen, wenn das Patent von der Verwaltung verifiziert wurde",
      },

      // Habilitations
      categories: {
        title: "Berechtigungen nach Kategorie",
        subtitle: "Mindestens 1 Kategorie erforderlich",
        select_categories: "Unterrichtskategorien auswählen",
        obtained_date: "Ausstellungsdatum",
        experience: "Erfahrung",
        experience_placeholder:
          "Beschreiben Sie Ihre Erfahrung in dieser Kategorie",
        certificates: "Bescheinigungen",
        certificates_upload: "Bescheinigungen hochladen",
      },

      // Spécialités
      specialties: {
        title: "Spezialisierungen",
        subtitle: "Maximal 5 Spezialisierungen (optional)",
        select: "Wählen Sie Ihre Spezialisierungen",
      },

      // Diplômes
      additional_diplomas: {
        title: "Zusätzliche Diplome",
        subtitle: "Weiterbildungen (optional)",
        placeholder: "Beschreiben Sie Ihre Diplome und Weiterbildungen",
        max_chars: "Maximal 500 Zeichen",
      },
    },

    // Step 3 - Legal Authorizations
    legal_authorizations: {
      title: "Rechtliche Genehmigungen",
      subtitle: "ASTRA-Konformität 2007 Art. 3",
      omco_info: "ASTRA Art. 3: Kantonale Bewilligung + TPP erforderlich",

      // Autorisation cantonale
      cantonal_authorization: {
        title: "Kantonale Bewilligung",
        subtitle: "Vom Kanton erteilte Unterrichtsbewilligung",
        number: "Bewilligungsnummer",
        number_placeholder: "z.B. VD-MON-2023-001",
        issuing_canton: "Ausstellender Kanton",
        issuing_canton_placeholder: "Kanton auswählen",
        issue_date: "Ausstellungsdatum",
        issue_date_placeholder: "Datum auswählen",
        expiration_date: "Ablaufdatum",
        expiration_date_placeholder: "Datum auswählen",
        expires_in: "Läuft ab in {days} Tagen",
        renewal_warning: "Erneuerung bald - Weniger als 180 Tage",
        expired_warning: "Bewilligung abgelaufen",
        scan: "Scan der Bewilligung",
        scan_upload: "Scan hochladen (PDF)",
      },

      // TPP
      tpp: {
        title: "TPP (Berufsmäßiger Personentransport)",
        subtitle: "ASTRA-Konformität Art. 3",
        info: "TPP in der Schweiz für Fahrunterricht obligatorisch",
        has_valid: "Gültiges TPP",
        has_valid_required: "TPP gemäß ASTRA Art. 3 obligatorisch",
        number: "TPP-Nummer",
        number_placeholder: "z.B. TPP-CH-2023-001",
        expiration_date: "Ablaufdatum",
        expiration_date_placeholder: "Datum auswählen",
        certificate: "TPP-Zertifikat",
        certificate_upload: "Zertifikat hochladen (PDF)",
      },

      // Casier judiciaire
      criminal_record: {
        title: "Strafregisterauszug",
        subtitle: "Aktueller Auszug erforderlich",
        warning: "Erforderlich für die Sicherheit der Schüler",
        extract_date: "Datum des Auszugs",
        extract_date_placeholder: "Datum auswählen",
        extract_date_info: "Der Auszug muss weniger als 3 Monate alt sein",
        document: "Strafregisterauszug",
        document_upload: "Auszug hochladen (PDF)",
        verified: "Geprüft und konform",
        verified_subtitle:
          "Ankreuzen, wenn der Auszug von der Verwaltung geprüft wurde",
      },

      // RC Pro
      professional_liability: {
        title: "Berufshaftpflichtversicherung",
        subtitle: "Empfohlener Schutz",
        info: "Berufshaftpflicht zum Schutz des Fahrlehrers empfohlen",
        company: "Versicherungsgesellschaft",
        company_placeholder: "z.B. Helvetia Versicherungen",
        policy_number: "Policennummer",
        policy_number_placeholder: "z.B. RC-PRO-2023-001",
        expiration_date: "Ablaufdatum",
        expiration_date_placeholder: "Datum auswählen",
        attestation: "Versicherungsnachweis",
        attestation_upload: "Nachweis hochladen (PDF)",
      },
    },

    // Genres
    gender: {
      male: "Mann",
      female: "Frau",
      other: "Andere",
    },

    // Langues
    languages: {
      french: "Französisch",
      german: "Deutsch",
      italian: "Italienisch",
      english: "Englisch",
    },

    // Catégories
    categories: {
      B: "Kategorie B - Auto",
      A: "Kategorie A - Motorrad",
      BE: "Kategorie BE - Auto + Anhänger",
      A1: "Kategorie A1 - Leichtes Motorrad",
      BPT: "Kategorie BPT - Berufstransport",
    },

    // Spécialités
    specialties: {
      urban: "Stadtfahren",
      highway: "Autobahnfahren",
      eco_driving: "Eco-Fahren",
      defensive: "Defensives Fahren",
      advanced: "Perfektionierung",
    },

    // Validation
    validation: {
      required: "Dieses Feld ist erforderlich",
      invalid_email: "Ungültiges E-Mail-Format",
      invalid_phone: "Ungültiges Schweizer Telefonformat",
      invalid_iban: "Ungültiges Schweizer IBAN-Format",
      min_age_omco:
        "Das Mindestalter beträgt 21 Jahre gemäß ASTRA-Vorschriften",
      min_categories: "Mindestens eine Berechtigungskategorie ist erforderlich",
      max_specialties: "Maximal 5 Spezialisierungen erlaubt",
      future_date: "Das Datum darf nicht in der Zukunft liegen",
      invalid_zip: "Die PLZ muss genau 4 Ziffern enthalten",
    },

    // Messages
    messages: {
      email_checking: "E-Mail wird überprüft...",
      email_available: "E-Mail verfügbar",
      email_taken: "Diese E-Mail wird bereits verwendet",
      data_saved: "Daten gespeichert",
      validation_errors:
        "Bitte korrigieren Sie die Fehler, bevor Sie fortfahren",
    },
  },

  it: {
    // Wizard général
    wizard: {
      title: "Crea nuovo istruttore",
      subtitle: "Assistente per la creazione di un istruttore di guida",
      close_confirmation:
        "Sei sicuro di voler chiudere? I dati non salvati andranno persi.",
      step_of: "Passo {current} di {total}",
      progress: "Progresso: {percent}%",
    },

    // Navigation
    navigation: {
      previous: "Precedente",
      next: "Successivo",
      create: "Crea istruttore",
      cancel: "Annulla",
      save_draft: "Salva bozza",
    },

    // Steps
    steps: {
      personal_info: "Informazioni personali",
      qualifications: "Qualifiche",
      legal_authorizations: "Autorizzazioni legali",
      availability: "Disponibilità",
      summary: "Riepilogo",
    },

    // Step 1 - Personal Info
    personal_info: {
      title: "Informazioni personali",
      subtitle: "Inserisci le informazioni di base dell'istruttore",

      // Photo
      photo: {
        label: "Foto profilo",
        upload: "Clicca per caricare o trascina un'immagine",
        formats: "PNG, JPG fino a 5MB",
        crop_title: "Ritaglia foto",
        crop_subtitle: "Regola la foto per un formato quadrato",
      },

      // Identité
      identity: {
        title: "Identità",
        first_name: "Nome",
        first_name_placeholder: "Inserisci il nome",
        last_name: "Cognome",
        last_name_placeholder: "Inserisci il cognome",
        birth_date: "Data di nascita",
        birth_date_placeholder: "Seleziona la data",
        gender: "Genere",
        gender_optional: "(opzionale)",
      },

      // Adresse
      address: {
        title: "Indirizzo",
        street: "Via e numero",
        street_placeholder: "Es: Via della Pace 12",
        zip_code: "CAP",
        zip_code_placeholder: "1000",
        city: "Città",
        city_placeholder: "Losanna",
        canton: "Cantone",
      },

      // Contact
      contact: {
        title: "Contatto",
        email: "Indirizzo e-mail",
        email_placeholder: "istruttore@esempio.ch",
        phone: "Telefono",
        phone_placeholder: "+41 79 123 45 67",
        nationality: "Nazionalità",
        nationality_placeholder: "Seleziona la nazionalità",
        languages: "Lingue parlate",
        languages_subtitle: "Minimo 1 lingua richiesta",
        iban: "IBAN",
        iban_placeholder: "CH93 0076 2011 6238 5295 7 (opzionale)",
        iban_optional: "(opzionale)",
      },
    },

    // Step 2 - Qualifications
    qualifications: {
      title: "Qualifiche e abilitazioni",
      subtitle: "Brevetto federale e categorie di insegnamento",

      // Brevet fédéral
      federal_license: {
        title: "Brevetto federale di istruttore",
        subtitle: "Conforme ai requisiti USTRA",
        number: "Numero brevetto",
        number_placeholder: "Es: CH-MON-2020-001",
        date: "Data di ottenimento",
        date_placeholder: "Seleziona la data",
        scan: "Scansione del brevetto",
        scan_upload: "Carica scansione (PDF o immagine)",
        scan_required: "Documento obbligatorio",
        verified: "Brevetto verificato",
        verified_subtitle:
          "Spunta se il brevetto è stato verificato dall'amministrazione",
      },

      // Habilitations
      categories: {
        title: "Abilitazioni per categoria",
        subtitle: "Minimo 1 categoria richiesta",
        select_categories: "Seleziona le categorie di insegnamento",
        obtained_date: "Data di ottenimento",
        experience: "Esperienza",
        experience_placeholder:
          "Descrivi la tua esperienza in questa categoria",
        certificates: "Attestati",
        certificates_upload: "Carica attestati",
      },

      // Spécialités
      specialties: {
        title: "Specialità",
        subtitle: "Massimo 5 specialità (opzionale)",
        select: "Seleziona le tue specialità",
      },

      // Diplômes
      additional_diplomas: {
        title: "Diplomi aggiuntivi",
        subtitle: "Formazioni complementari (opzionale)",
        placeholder: "Descrivi i tuoi diplomi e formazioni complementari",
        max_chars: "Massimo 500 caratteri",
      },
    },

    // Step 3 - Legal Authorizations
    legal_authorizations: {
      title: "Autorizzazioni legali",
      subtitle: "Conformità USTRA 2007 Art. 3",
      omco_info: "USTRA Art. 3: Autorizzazione cantonale + TPP richieste",

      // Autorisation cantonale
      cantonal_authorization: {
        title: "Autorizzazione cantonale",
        subtitle: "Autorizzazione all'insegnamento rilasciata dal cantone",
        number: "Numero autorizzazione",
        number_placeholder: "Es: VD-MON-2023-001",
        issuing_canton: "Cantone emittente",
        issuing_canton_placeholder: "Seleziona il cantone",
        issue_date: "Data di rilascio",
        issue_date_placeholder: "Seleziona la data",
        expiration_date: "Data di scadenza",
        expiration_date_placeholder: "Seleziona la data",
        expires_in: "Scade tra {days} giorni",
        renewal_warning: "Rinnovo imminente - Meno di 180 giorni",
        expired_warning: "Autorizzazione scaduta",
        scan: "Scansione dell'autorizzazione",
        scan_upload: "Carica scansione (PDF)",
      },

      // TPP
      tpp: {
        title: "TPP (Trasporto Persone Professionale)",
        subtitle: "Conformità USTRA Art. 3",
        info: "TPP obbligatorio in Svizzera per l'insegnamento della guida",
        has_valid: "TPP valido",
        has_valid_required: "TPP obbligatorio secondo USTRA Art. 3",
        number: "Numero TPP",
        number_placeholder: "Es: TPP-CH-2023-001",
        expiration_date: "Data di scadenza",
        expiration_date_placeholder: "Seleziona la data",
        certificate: "Certificato TPP",
        certificate_upload: "Carica certificato (PDF)",
      },

      // Casier judiciaire
      criminal_record: {
        title: "Casellario giudiziale",
        subtitle: "Estratto recente obbligatorio",
        warning: "Richiesto per la sicurezza degli studenti",
        extract_date: "Data dell'estratto",
        extract_date_placeholder: "Seleziona la data",
        extract_date_info: "L'estratto deve essere di meno di 3 mesi",
        document: "Estratto del casellario giudiziale",
        document_upload: "Carica estratto (PDF)",
        verified: "Verificato conforme",
        verified_subtitle:
          "Spunta se l'estratto è stato verificato dall'amministrazione",
      },

      // RC Pro
      professional_liability: {
        title: "Assicurazione RC Professionale",
        subtitle: "Protezione raccomandata",
        info: "RC professionale raccomandata per la protezione dell'istruttore",
        company: "Compagnia assicurativa",
        company_placeholder: "Es: Helvetia Assicurazioni",
        policy_number: "Numero polizza",
        policy_number_placeholder: "Es: RC-PRO-2023-001",
        expiration_date: "Data di scadenza",
        expiration_date_placeholder: "Seleziona la data",
        attestation: "Attestato di assicurazione",
        attestation_upload: "Carica attestato (PDF)",
      },
    },

    // Genres
    gender: {
      male: "Uomo",
      female: "Donna",
      other: "Altro",
    },

    // Langues
    languages: {
      french: "Francese",
      german: "Tedesco",
      italian: "Italiano",
      english: "Inglese",
    },

    // Catégories
    categories: {
      B: "Categoria B - Auto",
      A: "Categoria A - Moto",
      BE: "Categoria BE - Auto + rimorchio",
      A1: "Categoria A1 - Moto leggera",
      BPT: "Categoria BPT - Trasporto professionale",
    },

    // Spécialités
    specialties: {
      urban: "Guida urbana",
      highway: "Guida autostradale",
      eco_driving: "Eco-guida",
      defensive: "Guida difensiva",
      advanced: "Perfezionamento",
    },

    // Validation
    validation: {
      required: "Questo campo è obbligatorio",
      invalid_email: "Formato e-mail non valido",
      invalid_phone: "Formato telefono svizzero non valido",
      invalid_iban: "Formato IBAN svizzero non valido",
      min_age_omco:
        "L'età minima richiesta è di 21 anni secondo le regole USTRA",
      min_categories: "È richiesta almeno una categoria di abilitazione",
      max_specialties: "Massimo 5 specialità consentite",
      future_date: "La data non può essere nel futuro",
      invalid_zip: "Il CAP deve contenere esattamente 4 cifre",
    },

    // Messages
    messages: {
      email_checking: "Verifica e-mail...",
      email_available: "E-mail disponibile",
      email_taken: "Questa e-mail è già in uso",
      data_saved: "Dati salvati",
      validation_errors: "Correggi gli errori prima di continuare",
    },
  },

  en: {
    // Wizard général
    wizard: {
      title: "Create new instructor",
      subtitle: "Driving instructor creation wizard",
      close_confirmation:
        "Are you sure you want to close? Unsaved data will be lost.",
      step_of: "Step {current} of {total}",
      progress: "Progress: {percent}%",
    },

    // Navigation
    navigation: {
      previous: "Previous",
      next: "Next",
      create: "Create instructor",
      cancel: "Cancel",
      save_draft: "Save draft",
    },

    // Steps
    steps: {
      personal_info: "Personal information",
      qualifications: "Qualifications",
      legal_authorizations: "Legal authorizations",
      availability: "Availability",
      summary: "Summary",
    },

    // Step 1 - Personal Info
    personal_info: {
      title: "Personal information",
      subtitle: "Enter the instructor's basic information",

      // Photo
      photo: {
        label: "Profile photo",
        upload: "Click to upload or drag an image",
        formats: "PNG, JPG up to 5MB",
        crop_title: "Crop photo",
        crop_subtitle: "Adjust the photo for a square format",
      },

      // Identité
      identity: {
        title: "Identity",
        first_name: "First name",
        first_name_placeholder: "Enter first name",
        last_name: "Last name",
        last_name_placeholder: "Enter last name",
        birth_date: "Date of birth",
        birth_date_placeholder: "Select date",
        gender: "Gender",
        gender_optional: "(optional)",
      },

      // Adresse
      address: {
        title: "Address",
        street: "Street and number",
        street_placeholder: "e.g. Peace Street 12",
        zip_code: "ZIP",
        zip_code_placeholder: "1000",
        city: "City",
        city_placeholder: "Lausanne",
        canton: "Canton",
      },

      // Contact
      contact: {
        title: "Contact",
        email: "Email address",
        email_placeholder: "instructor@example.ch",
        phone: "Phone",
        phone_placeholder: "+41 79 123 45 67",
        nationality: "Nationality",
        nationality_placeholder: "Select nationality",
        languages: "Spoken languages",
        languages_subtitle: "Minimum 1 language required",
        iban: "IBAN",
        iban_placeholder: "CH93 0076 2011 6238 5295 7 (optional)",
        iban_optional: "(optional)",
      },
    },

    // Step 2 - Qualifications
    qualifications: {
      title: "Qualifications and certifications",
      subtitle: "Federal license and teaching categories",

      // Brevet fédéral
      federal_license: {
        title: "Federal driving instructor license",
        subtitle: "According to ASTRA requirements",
        number: "License number",
        number_placeholder: "e.g. CH-MON-2020-001",
        date: "Date obtained",
        date_placeholder: "Select date",
        scan: "License scan",
        scan_upload: "Upload scan (PDF or image)",
        scan_required: "Required document",
        verified: "License verified",
        verified_subtitle:
          "Check if the license has been verified by administration",
      },

      // Habilitations
      categories: {
        title: "Certifications by category",
        subtitle: "Minimum 1 category required",
        select_categories: "Select teaching categories",
        obtained_date: "Date obtained",
        experience: "Experience",
        experience_placeholder: "Describe your experience in this category",
        certificates: "Certificates",
        certificates_upload: "Upload certificates",
      },

      // Spécialités
      specialties: {
        title: "Specialties",
        subtitle: "Maximum 5 specialties (optional)",
        select: "Select your specialties",
      },

      // Diplômes
      additional_diplomas: {
        title: "Additional diplomas",
        subtitle: "Complementary training (optional)",
        placeholder: "Describe your diplomas and complementary training",
        max_chars: "Maximum 500 characters",
      },
    },

    // Step 3 - Legal Authorizations
    legal_authorizations: {
      title: "Legal authorizations",
      subtitle: "ASTRA compliance 2007 Art. 3",
      omco_info: "ASTRA Art. 3: Cantonal authorization + TPP required",

      // Autorisation cantonale
      cantonal_authorization: {
        title: "Cantonal authorization",
        subtitle: "Teaching authorization issued by the canton",
        number: "Authorization number",
        number_placeholder: "e.g. VD-MON-2023-001",
        issuing_canton: "Issuing canton",
        issuing_canton_placeholder: "Select canton",
        issue_date: "Issue date",
        issue_date_placeholder: "Select date",
        expiration_date: "Expiration date",
        expiration_date_placeholder: "Select date",
        expires_in: "Expires in {days} days",
        renewal_warning: "Renewal soon - Less than 180 days",
        expired_warning: "Authorization expired",
        scan: "Authorization scan",
        scan_upload: "Upload scan (PDF)",
      },

      // TPP
      tpp: {
        title: "TPP (Professional Passenger Transport)",
        subtitle: "ASTRA compliance Art. 3",
        info: "TPP mandatory in Switzerland for driving instruction",
        has_valid: "Valid TPP",
        has_valid_required: "TPP mandatory according to ASTRA Art. 3",
        number: "TPP number",
        number_placeholder: "e.g. TPP-CH-2023-001",
        expiration_date: "Expiration date",
        expiration_date_placeholder: "Select date",
        certificate: "TPP certificate",
        certificate_upload: "Upload certificate (PDF)",
      },

      // Casier judiciaire
      criminal_record: {
        title: "Criminal record",
        subtitle: "Recent extract required",
        warning: "Required for student safety",
        extract_date: "Extract date",
        extract_date_placeholder: "Select date",
        extract_date_info: "Extract must be less than 3 months old",
        document: "Criminal record extract",
        document_upload: "Upload extract (PDF)",
        verified: "Verified compliant",
        verified_subtitle:
          "Check if extract has been verified by administration",
      },

      // RC Pro
      professional_liability: {
        title: "Professional Liability Insurance",
        subtitle: "Recommended protection",
        info: "Professional liability recommended for instructor protection",
        company: "Insurance company",
        company_placeholder: "e.g. Helvetia Insurance",
        policy_number: "Policy number",
        policy_number_placeholder: "e.g. RC-PRO-2023-001",
        expiration_date: "Expiration date",
        expiration_date_placeholder: "Select date",
        attestation: "Insurance certificate",
        attestation_upload: "Upload certificate (PDF)",
      },
    },

    // Genres
    gender: {
      male: "Male",
      female: "Female",
      other: "Other",
    },

    // Langues
    languages: {
      french: "French",
      german: "German",
      italian: "Italian",
      english: "English",
    },

    // Catégories
    categories: {
      B: "Category B - Car",
      A: "Category A - Motorcycle",
      BE: "Category BE - Car + trailer",
      A1: "Category A1 - Light motorcycle",
      BPT: "Category BPT - Professional transport",
    },

    // Spécialités
    specialties: {
      urban: "Urban driving",
      highway: "Highway driving",
      eco_driving: "Eco-driving",
      defensive: "Defensive driving",
      advanced: "Advanced training",
    },

    // Validation
    validation: {
      required: "This field is required",
      invalid_email: "Invalid email format",
      invalid_phone: "Invalid Swiss phone format",
      invalid_iban: "Invalid Swiss IBAN format",
      min_age_omco: "Minimum age required is 21 years according to ASTRA rules",
      min_categories: "At least one certification category is required",
      max_specialties: "Maximum 5 specialties allowed",
      future_date: "Date cannot be in the future",
      invalid_zip: "ZIP code must contain exactly 4 digits",
    },

    // Messages
    messages: {
      email_checking: "Checking email...",
      email_available: "Email available",
      email_taken: "This email is already in use",
      data_saved: "Data saved",
      validation_errors: "Please correct the errors before continuing",
    },
  },
} as const;

// Hook pour utiliser les traductions
export const useInstructorWizardTranslations = (
  locale: InstructorWizardLocale = "fr"
) => {
  const t = INSTRUCTOR_WIZARD_TRANSLATIONS[locale];

  // Fonction helper pour interpolation
  const interpolate = (
    text: string,
    params: Record<string, string | number>
  ) => {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  };

  return { t, interpolate };
};

// Export des traductions par défaut
export const getInstructorWizardTranslation = (
  locale: InstructorWizardLocale,
  key: string,
  params?: Record<string, string | number>
): string => {
  const keys = key.split(".");
  let value: any = INSTRUCTOR_WIZARD_TRANSLATIONS[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  if (typeof value === "string" && params) {
    return value.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  }

  return value || key;
};
