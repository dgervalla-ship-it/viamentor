/**
 * VIAMENTOR Student Wizard i18n
 * Traductions FR/DE/IT/EN avec terminologie OAC
 */

export type WizardLocale = "fr" | "de" | "it" | "en";

export const WIZARD_TRANSLATIONS = {
  fr: {
    // Dialog
    dialogTitle: "Créer un nouvel élève",
    dialogDescription: "Inscription complète avec validation OAC",
    closeConfirm: "Fermer sans enregistrer ?",
    closeConfirmMessage: "Les modifications seront perdues.",

    // Stepper
    step1: "Identité",
    step2: "Formation",
    step3: "Prérequis légaux",
    step4: "Récapitulatif",

    // Navigation
    previous: "Précédent",
    next: "Suivant",
    createStudent: "Créer l'élève",
    creating: "Création en cours...",
    cancel: "Annuler",

    // Step 1 - Identité
    identityTitle: "Informations personnelles",
    uploadPhoto: "Télécharger une photo",
    dragDropPhoto: "Glissez une photo ou cliquez",
    removePhoto: "Retirer la photo",
    photoMaxSize: "Maximum 2 MB",
    firstName: "Prénom",
    lastName: "Nom",
    birthDate: "Date de naissance",
    gender: "Genre",
    genderMale: "Homme",
    genderFemale: "Femme",
    genderOther: "Autre",
    genderPreferNot: "Préfère ne pas dire",
    street: "Rue et numéro",
    zipCode: "NPA",
    city: "Ville",
    canton: "Canton",
    email: "Email",
    emailAvailable: "Email disponible",
    emailTaken: "Email déjà utilisé",
    phone: "Téléphone",
    preferredLanguage: "Langue préférée",

    // Step 2 - Formation
    trainingTitle: "Inscriptions formations",
    selectCategories: "Sélectionnez les catégories",
    categoryB: "B - Voiture",
    categoryBDesc: "Permis véhicules légers <3500kg",
    categoryA: "A - Moto",
    categoryADesc: "Moto >35 kW, 18 ans minimum",
    categoryBE: "BE - Remorque",
    categoryBEDesc: "Ensemble véhicule + remorque <3500kg",
    categoryA1: "A1 - Moto légère",
    categoryA1Desc: "Moto ≤11 kW, 16 ans minimum",
    categoryBPT: "BPT - Taxi",
    categoryBPTDesc: "Transport professionnel, 21 ans minimum",
    enrollmentDate: "Date d'inscription",
    assignedInstructor: "Moniteur assigné",
    noInstructor: "Non assigné",
    noQualifiedInstructor: "Aucun moniteur habilité {category} disponible",
    selectPackage: "Formule",
    packageSingle: "Leçons à l'unité",
    packageSingleDesc: "Flexibilité maximale",
    package10: "Forfait 10 leçons",
    package10Desc: "Économisez 5%",
    package20: "Forfait 20 leçons",
    package20Desc: "Meilleure valeur - 10%",
    packageUnlimited: "Illimité mensuel",
    packageUnlimitedDesc: "Forfait tout compris",
    examTargetDate: "Objectif examen",
    notes: "Notes spécifiques",
    notesPlaceholder: "Handicaps, peurs, objectifs personnels...",

    // Step 3 - Prérequis légaux
    legalTitle: "Documents et prérequis obligatoires",
    legalSubtitle:
      "Conformité OAC (Ordonnance sur l'admission à la circulation)",

    learnerPermitTitle: "Permis d'élève conducteur",
    learnerPermitNumber: "Numéro de permis",
    learnerPermitIssue: "Date d'obtention",
    learnerPermitExpiry: "Date d'expiration",
    learnerPermitInfo:
      "Permis élève validité 2 ans renouvelable 1 fois (Art. 15 OAC)",
    learnerPermitExpiring:
      "Permis expire dans {days} jours - Planifier prorogation",
    learnerPermitVerified: "Permis vérifié (original vu)",
    uploadScan: "Télécharger scan",

    visionTestTitle: "Examen de la vue",
    visionTestCompleted: "Examen de la vue valide effectué",
    visionTestRequired: "Obligatoire (Art. 11 OAC)",
    visionTestDate: "Date de l'examen",
    uploadCertificate: "Télécharger certificat",

    firstAidTitle: "Cours de premiers secours",
    firstAidOrganization: "Organisme",
    firstAidDate: "Date du cours",
    firstAidHours: "Durée (heures)",
    firstAidMinimum: "Minimum 10h requis (Art. 11 OAC)",
    firstAidCompleted: "Cours complété",
    firstAidInfo:
      "Cours premiers secours 10h obligatoire avant examen pratique",

    trafficCourseTitle: "Cours de sensibilisation",
    trafficCourseCompleted: "Cours sensibilisation 8h complété",
    trafficCourseRequired: "Requis avant première leçon pratique (Art. 19 OAC)",
    trafficCourseDate: "Date du cours",

    theoryExamTitle: "Examen théorique",
    theoryExamStatus: "Statut examen théorique",
    theoryExamNotTaken: "Non passé",
    theoryExamPassed: "Réussi",
    theoryExamFailed: "Échoué",
    theoryExamDate: "Date de réussite",
    theoryExamScore: "Note (/50)",
    theoryExamFailCount: "Nombre d'échecs",
    theoryExamInfo:
      "Après 2 échecs, attestation moniteur requise (Art. 23 OAC)",

    motorcycleCourseTitle: "Cours obligatoire moto",
    motorcycleCourseCompleted: "Cours pratique moto 12h complété",
    motorcycleCourseRequired: "Obligatoire catégories A/A1 (Art. 25a OAC)",
    motorcycleCourseStart: "Date début",
    motorcycleCourseEnd: "Date fin",
    motorcycleCourseOrganization: "Organisme agréé",

    completeRequirements: "Compléter plus tard",
    requirementsIncomplete:
      "Prérequis incomplets - Peut être complété ultérieurement",

    // Step 4 - Récapitulatif
    summaryTitle: "Récapitulatif de l'inscription",
    summaryIdentity: "Identité",
    summaryTraining: "Formations",
    summaryLegal: "Prérequis légaux",
    edit: "Modifier",
    complete: "Complet",
    incomplete: "Incomplet",

    costEstimation: "Estimation des coûts",
    packagesTotal: "Forfaits sélectionnés",
    additionalCosts: "Frais supplémentaires",
    totalEstimation: "Total estimation",
    priceIndicative: "Prix indicatif hors forfaits supplémentaires",

    dataVerified: "J'ai vérifié toutes les informations et documents",
    sendWelcomeEmail: "Envoyer email de bienvenue à l'élève",
    welcomeEmailPreview: "Aperçu email",
    welcomeEmailSubject: "Bienvenue à {schoolName} !",

    // Success
    successTitle: "Élève créé avec succès !",
    successMessage: "L'élève {name} a été créé et peut commencer sa formation.",
    viewStudent: "Voir la fiche élève",
    createAnother: "Créer un autre élève",

    // Validation errors
    required: "Ce champ est requis",
    invalidEmail: "Format email invalide",
    invalidPhone: "Format téléphone invalide",
    invalidZipCode: "NPA suisse invalide (1000-9999)",
    minLength: "Minimum {min} caractères",
    maxLength: "Maximum {max} caractères",
    minAge:
      "Âge minimum {age} ans requis pour catégorie {category} (Art. 6 OAC)",
    emailCheckFailed: "Vérification email échouée",

    // OAC Articles
    oacArt6: "Art. 6 OAC",
    oacArt11: "Art. 11 OAC",
    oacArt15: "Art. 15 OAC",
    oacArt19: "Art. 19 OAC",
    oacArt23: "Art. 23 OAC",
    oacArt25a: "Art. 25a OAC",
  },

  de: {
    // Dialog
    dialogTitle: "Neuen Fahrschüler erstellen",
    dialogDescription: "Vollständige Anmeldung mit VZV-Validierung",
    closeConfirm: "Ohne Speichern schließen?",
    closeConfirmMessage: "Änderungen gehen verloren.",

    // Stepper
    step1: "Identität",
    step2: "Ausbildung",
    step3: "Gesetzliche Voraussetzungen",
    step4: "Zusammenfassung",

    // Navigation
    previous: "Zurück",
    next: "Weiter",
    createStudent: "Fahrschüler erstellen",
    creating: "Wird erstellt...",
    cancel: "Abbrechen",

    // Step 1 - Identität
    identityTitle: "Persönliche Informationen",
    uploadPhoto: "Foto hochladen",
    dragDropPhoto: "Foto ziehen oder klicken",
    removePhoto: "Foto entfernen",
    photoMaxSize: "Maximum 2 MB",
    firstName: "Vorname",
    lastName: "Nachname",
    birthDate: "Geburtsdatum",
    gender: "Geschlecht",
    genderMale: "Mann",
    genderFemale: "Frau",
    genderOther: "Andere",
    genderPreferNot: "Keine Angabe",
    street: "Straße und Nummer",
    zipCode: "PLZ",
    city: "Stadt",
    canton: "Kanton",
    email: "E-Mail",
    emailAvailable: "E-Mail verfügbar",
    emailTaken: "E-Mail bereits verwendet",
    phone: "Telefon",
    preferredLanguage: "Bevorzugte Sprache",

    // Step 2 - Formation
    trainingTitle: "Ausbildungsanmeldungen",
    selectCategories: "Kategorien auswählen",
    categoryB: "B - Auto",
    categoryBDesc: "Führerausweis Personenwagen <3500kg",
    categoryA: "A - Motorrad",
    categoryADesc: "Motorrad >35 kW, 18 Jahre minimum",
    categoryBE: "BE - Anhänger",
    categoryBEDesc: "Fahrzeug + Anhänger <3500kg",
    categoryA1: "A1 - Leichtes Motorrad",
    categoryA1Desc: "Motorrad ≤11 kW, 16 Jahre minimum",
    categoryBPT: "BPT - Taxi",
    categoryBPTDesc: "Beruflicher Transport, 21 Jahre minimum",
    enrollmentDate: "Anmeldedatum",
    assignedInstructor: "Zugewiesener Fahrlehrer",
    noInstructor: "Nicht zugewiesen",
    noQualifiedInstructor:
      "Kein qualifizierter Fahrlehrer {category} verfügbar",
    selectPackage: "Paket",
    packageSingle: "Einzelne Lektionen",
    packageSingleDesc: "Maximale Flexibilität",
    package10: "10-Lektionen-Paket",
    package10Desc: "Sparen Sie 5%",
    package20: "20-Lektionen-Paket",
    package20Desc: "Bester Wert - 10%",
    packageUnlimited: "Monatlich unbegrenzt",
    packageUnlimitedDesc: "All-inclusive-Paket",
    examTargetDate: "Prüfungsziel",
    notes: "Spezifische Notizen",
    notesPlaceholder: "Behinderungen, Ängste, persönliche Ziele...",

    // Step 3 - Prérequis légaux
    legalTitle: "Dokumente und obligatorische Voraussetzungen",
    legalSubtitle: "VZV-Konformität (Verkehrszulassungsverordnung)",

    learnerPermitTitle: "Lernfahrausweis",
    learnerPermitNumber: "Ausweisnummer",
    learnerPermitIssue: "Ausstellungsdatum",
    learnerPermitExpiry: "Ablaufdatum",
    learnerPermitInfo:
      "Lernfahrausweis Gültigkeit 2 Jahre, einmal verlängerbar (Art. 15 VZV)",
    learnerPermitExpiring:
      "Ausweis läuft in {days} Tagen ab - Verlängerung planen",
    learnerPermitVerified: "Ausweis überprüft (Original gesehen)",
    uploadScan: "Scan hochladen",

    visionTestTitle: "Sehtest",
    visionTestCompleted: "Gültiger Sehtest durchgeführt",
    visionTestRequired: "Obligatorisch (Art. 11 VZV)",
    visionTestDate: "Testdatum",
    uploadCertificate: "Zertifikat hochladen",

    firstAidTitle: "Nothelferkurs",
    firstAidOrganization: "Organisation",
    firstAidDate: "Kursdatum",
    firstAidHours: "Dauer (Stunden)",
    firstAidMinimum: "Minimum 10h erforderlich (Art. 11 VZV)",
    firstAidCompleted: "Kurs abgeschlossen",
    firstAidInfo: "Nothelferkurs 10h obligatorisch vor praktischer Prüfung",

    trafficCourseTitle: "Verkehrskundekurs",
    trafficCourseCompleted: "Verkehrskundekurs 8h abgeschlossen",
    trafficCourseRequired:
      "Erforderlich vor erster praktischer Lektion (Art. 19 VZV)",
    trafficCourseDate: "Kursdatum",

    theoryExamTitle: "Theorieprüfung",
    theoryExamStatus: "Status Theorieprüfung",
    theoryExamNotTaken: "Nicht abgelegt",
    theoryExamPassed: "Bestanden",
    theoryExamFailed: "Nicht bestanden",
    theoryExamDate: "Erfolgsdatum",
    theoryExamScore: "Note (/50)",
    theoryExamFailCount: "Anzahl Fehlversuche",
    theoryExamInfo:
      "Nach 2 Fehlversuchen, Fahrlehrerbestätigung erforderlich (Art. 23 VZV)",

    motorcycleCourseTitle: "Obligatorischer Motorradkurs",
    motorcycleCourseCompleted: "Praktischer Motorradkurs 12h abgeschlossen",
    motorcycleCourseRequired: "Obligatorisch Kategorien A/A1 (Art. 25a VZV)",
    motorcycleCourseStart: "Startdatum",
    motorcycleCourseEnd: "Enddatum",
    motorcycleCourseOrganization: "Anerkannte Organisation",

    completeRequirements: "Später vervollständigen",
    requirementsIncomplete:
      "Voraussetzungen unvollständig - Kann später vervollständigt werden",

    // Step 4 - Récapitulatif
    summaryTitle: "Anmeldungszusammenfassung",
    summaryIdentity: "Identität",
    summaryTraining: "Ausbildungen",
    summaryLegal: "Gesetzliche Voraussetzungen",
    edit: "Bearbeiten",
    complete: "Vollständig",
    incomplete: "Unvollständig",

    costEstimation: "Kostenschätzung",
    packagesTotal: "Ausgewählte Pakete",
    additionalCosts: "Zusätzliche Kosten",
    totalEstimation: "Gesamtschätzung",
    priceIndicative: "Richtpreis ohne zusätzliche Pakete",

    dataVerified: "Ich habe alle Informationen und Dokumente überprüft",
    sendWelcomeEmail: "Willkommens-E-Mail an Fahrschüler senden",
    welcomeEmailPreview: "E-Mail-Vorschau",
    welcomeEmailSubject: "Willkommen bei {schoolName}!",

    // Success
    successTitle: "Fahrschüler erfolgreich erstellt!",
    successMessage:
      "Der Fahrschüler {name} wurde erstellt und kann mit der Ausbildung beginnen.",
    viewStudent: "Fahrschüler anzeigen",
    createAnother: "Weiteren Fahrschüler erstellen",

    // Validation errors
    required: "Dieses Feld ist erforderlich",
    invalidEmail: "Ungültiges E-Mail-Format",
    invalidPhone: "Ungültiges Telefonformat",
    invalidZipCode: "Ungültige Schweizer PLZ (1000-9999)",
    minLength: "Minimum {min} Zeichen",
    maxLength: "Maximum {max} Zeichen",
    minAge:
      "Mindestalter {age} Jahre für Kategorie {category} erforderlich (Art. 6 VZV)",
    emailCheckFailed: "E-Mail-Überprüfung fehlgeschlagen",

    // OAC Articles (VZV in German)
    oacArt6: "Art. 6 VZV",
    oacArt11: "Art. 11 VZV",
    oacArt15: "Art. 15 VZV",
    oacArt19: "Art. 19 VZV",
    oacArt23: "Art. 23 VZV",
    oacArt25a: "Art. 25a VZV",
  },

  it: {
    // Dialog
    dialogTitle: "Crea nuovo allievo",
    dialogDescription: "Iscrizione completa con validazione OAC",
    closeConfirm: "Chiudere senza salvare?",
    closeConfirmMessage: "Le modifiche andranno perse.",

    // Stepper
    step1: "Identità",
    step2: "Formazione",
    step3: "Requisiti legali",
    step4: "Riepilogo",

    // Navigation
    previous: "Precedente",
    next: "Successivo",
    createStudent: "Crea allievo",
    creating: "Creazione in corso...",
    cancel: "Annulla",

    // Step 1 - Identité
    identityTitle: "Informazioni personali",
    uploadPhoto: "Carica foto",
    dragDropPhoto: "Trascina foto o clicca",
    removePhoto: "Rimuovi foto",
    photoMaxSize: "Massimo 2 MB",
    firstName: "Nome",
    lastName: "Cognome",
    birthDate: "Data di nascita",
    gender: "Genere",
    genderMale: "Uomo",
    genderFemale: "Donna",
    genderOther: "Altro",
    genderPreferNot: "Preferisco non dire",
    street: "Via e numero",
    zipCode: "NPA",
    city: "Città",
    canton: "Cantone",
    email: "Email",
    emailAvailable: "Email disponibile",
    emailTaken: "Email già utilizzata",
    phone: "Telefono",
    preferredLanguage: "Lingua preferita",

    // Step 2 - Formation
    trainingTitle: "Iscrizioni formazioni",
    selectCategories: "Seleziona categorie",
    categoryB: "B - Auto",
    categoryBDesc: "Licenza veicoli leggeri <3500kg",
    categoryA: "A - Moto",
    categoryADesc: "Moto >35 kW, 18 anni minimo",
    categoryBE: "BE - Rimorchio",
    categoryBEDesc: "Insieme veicolo + rimorchio <3500kg",
    categoryA1: "A1 - Moto leggera",
    categoryA1Desc: "Moto ≤11 kW, 16 anni minimo",
    categoryBPT: "BPT - Taxi",
    categoryBPTDesc: "Trasporto professionale, 21 anni minimo",
    enrollmentDate: "Data iscrizione",
    assignedInstructor: "Istruttore assegnato",
    noInstructor: "Non assegnato",
    noQualifiedInstructor:
      "Nessun istruttore qualificato {category} disponibile",
    selectPackage: "Formula",
    packageSingle: "Lezioni singole",
    packageSingleDesc: "Massima flessibilità",
    package10: "Pacchetto 10 lezioni",
    package10Desc: "Risparmia 5%",
    package20: "Pacchetto 20 lezioni",
    package20Desc: "Miglior valore - 10%",
    packageUnlimited: "Illimitato mensile",
    packageUnlimitedDesc: "Pacchetto tutto incluso",
    examTargetDate: "Obiettivo esame",
    notes: "Note specifiche",
    notesPlaceholder: "Disabilità, paure, obiettivi personali...",

    // Step 3 - Prérequis légaux
    legalTitle: "Documenti e requisiti obbligatori",
    legalSubtitle:
      "Conformità OAC (Ordinanza sull'ammissione alla circolazione)",

    learnerPermitTitle: "Licenza di allievo conducente",
    learnerPermitNumber: "Numero licenza",
    learnerPermitIssue: "Data rilascio",
    learnerPermitExpiry: "Data scadenza",
    learnerPermitInfo:
      "Licenza allievo validità 2 anni rinnovabile 1 volta (Art. 15 OAC)",
    learnerPermitExpiring:
      "Licenza scade tra {days} giorni - Pianificare proroga",
    learnerPermitVerified: "Licenza verificata (originale visto)",
    uploadScan: "Carica scansione",

    visionTestTitle: "Esame della vista",
    visionTestCompleted: "Esame della vista valido effettuato",
    visionTestRequired: "Obbligatorio (Art. 11 OAC)",
    visionTestDate: "Data esame",
    uploadCertificate: "Carica certificato",

    firstAidTitle: "Corso di primo soccorso",
    firstAidOrganization: "Organismo",
    firstAidDate: "Data corso",
    firstAidHours: "Durata (ore)",
    firstAidMinimum: "Minimo 10h richiesto (Art. 11 OAC)",
    firstAidCompleted: "Corso completato",
    firstAidInfo: "Corso primo soccorso 10h obbligatorio prima esame pratico",

    trafficCourseTitle: "Corso di sensibilizzazione",
    trafficCourseCompleted: "Corso sensibilizzazione 8h completato",
    trafficCourseRequired:
      "Richiesto prima prima lezione pratica (Art. 19 OAC)",
    trafficCourseDate: "Data corso",

    theoryExamTitle: "Esame teorico",
    theoryExamStatus: "Stato esame teorico",
    theoryExamNotTaken: "Non sostenuto",
    theoryExamPassed: "Superato",
    theoryExamFailed: "Fallito",
    theoryExamDate: "Data successo",
    theoryExamScore: "Voto (/50)",
    theoryExamFailCount: "Numero fallimenti",
    theoryExamInfo:
      "Dopo 2 fallimenti, attestato istruttore richiesto (Art. 23 OAC)",

    motorcycleCourseTitle: "Corso obbligatorio moto",
    motorcycleCourseCompleted: "Corso pratico moto 12h completato",
    motorcycleCourseRequired: "Obbligatorio categorie A/A1 (Art. 25a OAC)",
    motorcycleCourseStart: "Data inizio",
    motorcycleCourseEnd: "Data fine",
    motorcycleCourseOrganization: "Organismo approvato",

    completeRequirements: "Completare più tardi",
    requirementsIncomplete:
      "Requisiti incompleti - Può essere completato successivamente",

    // Step 4 - Récapitulatif
    summaryTitle: "Riepilogo iscrizione",
    summaryIdentity: "Identità",
    summaryTraining: "Formazioni",
    summaryLegal: "Requisiti legali",
    edit: "Modifica",
    complete: "Completo",
    incomplete: "Incompleto",

    costEstimation: "Stima costi",
    packagesTotal: "Pacchetti selezionati",
    additionalCosts: "Costi aggiuntivi",
    totalEstimation: "Totale stima",
    priceIndicative: "Prezzo indicativo esclusi pacchetti aggiuntivi",

    dataVerified: "Ho verificato tutte le informazioni e i documenti",
    sendWelcomeEmail: "Invia email di benvenuto all'allievo",
    welcomeEmailPreview: "Anteprima email",
    welcomeEmailSubject: "Benvenuto a {schoolName}!",

    // Success
    successTitle: "Allievo creato con successo!",
    successMessage:
      "L'allievo {name} è stato creato e può iniziare la formazione.",
    viewStudent: "Visualizza scheda allievo",
    createAnother: "Crea un altro allievo",

    // Validation errors
    required: "Questo campo è obbligatorio",
    invalidEmail: "Formato email non valido",
    invalidPhone: "Formato telefono non valido",
    invalidZipCode: "NPA svizzero non valido (1000-9999)",
    minLength: "Minimo {min} caratteri",
    maxLength: "Massimo {max} caratteri",
    minAge:
      "Età minima {age} anni richiesta per categoria {category} (Art. 6 OAC)",
    emailCheckFailed: "Verifica email fallita",

    // OAC Articles
    oacArt6: "Art. 6 OAC",
    oacArt11: "Art. 11 OAC",
    oacArt15: "Art. 15 OAC",
    oacArt19: "Art. 19 OAC",
    oacArt23: "Art. 23 OAC",
    oacArt25a: "Art. 25a OAC",
  },

  en: {
    // Dialog
    dialogTitle: "Create new student",
    dialogDescription: "Complete enrollment with OAC validation",
    closeConfirm: "Close without saving?",
    closeConfirmMessage: "Changes will be lost.",

    // Stepper
    step1: "Identity",
    step2: "Training",
    step3: "Legal requirements",
    step4: "Summary",

    // Navigation
    previous: "Previous",
    next: "Next",
    createStudent: "Create student",
    creating: "Creating...",
    cancel: "Cancel",

    // Step 1 - Identity
    identityTitle: "Personal information",
    uploadPhoto: "Upload photo",
    dragDropPhoto: "Drag photo or click",
    removePhoto: "Remove photo",
    photoMaxSize: "Maximum 2 MB",
    firstName: "First name",
    lastName: "Last name",
    birthDate: "Birth date",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Other",
    genderPreferNot: "Prefer not to say",
    street: "Street and number",
    zipCode: "ZIP code",
    city: "City",
    canton: "Canton",
    email: "Email",
    emailAvailable: "Email available",
    emailTaken: "Email already used",
    phone: "Phone",
    preferredLanguage: "Preferred language",

    // Step 2 - Training
    trainingTitle: "Training enrollments",
    selectCategories: "Select categories",
    categoryB: "B - Car",
    categoryBDesc: "Light vehicle license <3500kg",
    categoryA: "A - Motorcycle",
    categoryADesc: "Motorcycle >35 kW, 18 years minimum",
    categoryBE: "BE - Trailer",
    categoryBEDesc: "Vehicle + trailer combination <3500kg",
    categoryA1: "A1 - Light motorcycle",
    categoryA1Desc: "Motorcycle ≤11 kW, 16 years minimum",
    categoryBPT: "BPT - Taxi",
    categoryBPTDesc: "Professional transport, 21 years minimum",
    enrollmentDate: "Enrollment date",
    assignedInstructor: "Assigned instructor",
    noInstructor: "Not assigned",
    noQualifiedInstructor: "No qualified {category} instructor available",
    selectPackage: "Package",
    packageSingle: "Single lessons",
    packageSingleDesc: "Maximum flexibility",
    package10: "10-lesson package",
    package10Desc: "Save 5%",
    package20: "20-lesson package",
    package20Desc: "Best value - 10%",
    packageUnlimited: "Monthly unlimited",
    packageUnlimitedDesc: "All-inclusive package",
    examTargetDate: "Exam target",
    notes: "Specific notes",
    notesPlaceholder: "Disabilities, fears, personal goals...",

    // Step 3 - Legal requirements
    legalTitle: "Documents and mandatory requirements",
    legalSubtitle: "OAC compliance (Road Traffic Admission Ordinance)",

    learnerPermitTitle: "Learner's permit",
    learnerPermitNumber: "Permit number",
    learnerPermitIssue: "Issue date",
    learnerPermitExpiry: "Expiry date",
    learnerPermitInfo:
      "Learner's permit valid 2 years, renewable once (Art. 15 OAC)",
    learnerPermitExpiring: "Permit expires in {days} days - Plan renewal",
    learnerPermitVerified: "Permit verified (original seen)",
    uploadScan: "Upload scan",

    visionTestTitle: "Vision test",
    visionTestCompleted: "Valid vision test completed",
    visionTestRequired: "Mandatory (Art. 11 OAC)",
    visionTestDate: "Test date",
    uploadCertificate: "Upload certificate",

    firstAidTitle: "First aid course",
    firstAidOrganization: "Organization",
    firstAidDate: "Course date",
    firstAidHours: "Duration (hours)",
    firstAidMinimum: "Minimum 10h required (Art. 11 OAC)",
    firstAidCompleted: "Course completed",
    firstAidInfo: "10h first aid course mandatory before practical exam",

    trafficCourseTitle: "Traffic awareness course",
    trafficCourseCompleted: "8h traffic awareness course completed",
    trafficCourseRequired:
      "Required before first practical lesson (Art. 19 OAC)",
    trafficCourseDate: "Course date",

    theoryExamTitle: "Theory exam",
    theoryExamStatus: "Theory exam status",
    theoryExamNotTaken: "Not taken",
    theoryExamPassed: "Passed",
    theoryExamFailed: "Failed",
    theoryExamDate: "Success date",
    theoryExamScore: "Score (/50)",
    theoryExamFailCount: "Number of failures",
    theoryExamInfo:
      "After 2 failures, instructor certificate required (Art. 23 OAC)",

    motorcycleCourseTitle: "Mandatory motorcycle course",
    motorcycleCourseCompleted: "12h practical motorcycle course completed",
    motorcycleCourseRequired: "Mandatory for A/A1 categories (Art. 25a OAC)",
    motorcycleCourseStart: "Start date",
    motorcycleCourseEnd: "End date",
    motorcycleCourseOrganization: "Approved organization",

    completeRequirements: "Complete later",
    requirementsIncomplete: "Requirements incomplete - Can be completed later",

    // Step 4 - Summary
    summaryTitle: "Enrollment summary",
    summaryIdentity: "Identity",
    summaryTraining: "Training",
    summaryLegal: "Legal requirements",
    edit: "Edit",
    complete: "Complete",
    incomplete: "Incomplete",

    costEstimation: "Cost estimation",
    packagesTotal: "Selected packages",
    additionalCosts: "Additional costs",
    totalEstimation: "Total estimation",
    priceIndicative: "Indicative price excluding additional packages",

    dataVerified: "I have verified all information and documents",
    sendWelcomeEmail: "Send welcome email to student",
    welcomeEmailPreview: "Email preview",
    welcomeEmailSubject: "Welcome to {schoolName}!",

    // Success
    successTitle: "Student created successfully!",
    successMessage: "Student {name} has been created and can start training.",
    viewStudent: "View student profile",
    createAnother: "Create another student",

    // Validation errors
    required: "This field is required",
    invalidEmail: "Invalid email format",
    invalidPhone: "Invalid phone format",
    invalidZipCode: "Invalid Swiss ZIP code (1000-9999)",
    minLength: "Minimum {min} characters",
    maxLength: "Maximum {max} characters",
    minAge:
      "Minimum age {age} years required for category {category} (Art. 6 OAC)",
    emailCheckFailed: "Email check failed",

    // OAC Articles
    oacArt6: "Art. 6 OAC",
    oacArt11: "Art. 11 OAC",
    oacArt15: "Art. 15 OAC",
    oacArt19: "Art. 19 OAC",
    oacArt23: "Art. 23 OAC",
    oacArt25a: "Art. 25a OAC",
  },
};

export function useWizardTranslations(locale: WizardLocale = "fr") {
  return WIZARD_TRANSLATIONS[locale];
}
