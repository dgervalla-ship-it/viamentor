/**
 * VIAMENTOR - Lesson Evaluation i18n
 * Traductions FR/DE/IT/EN évaluation leçon
 */

export type EvaluationLocale = "fr" | "de" | "it" | "en";

export const evaluationTranslations = {
  fr: {
    // Page title
    pageTitle: "Évaluer la leçon",

    // Lesson context
    lessonContext: {
      title: "Contexte de la leçon",
      student: "Élève",
      date: "Date et heure",
      duration: "Durée",
      category: "Catégorie",
      vehicle: "Véhicule",
      meetingPoint: "Point de rendez-vous",
    },

    // Themes section
    themes: {
      title: "Thèmes pratiqués durant la leçon",
      subtitle: "Sélectionner les thèmes abordés (minimum 1)",
      required: "Requis - Documentation OAC Art. 67",
      categories: {
        circulation: "Circulation générale",
        maneuvers: "Manœuvres",
        priorities: "Priorités",
        speed: "Vitesse",
        distances: "Distances de sécurité",
        overtaking: "Dépassements",
        direction_changes: "Changements de direction",
        defensive: "Conduite défensive",
        special_conditions: "Conditions spéciales",
        eco_driving: "Éco-conduite",
        parking: "Stationnement",
        highway: "Autoroute",
        other: "Autre",
      },
      items: {
        urban_driving: "Conduite urbaine",
        rural_driving: "Conduite rurale",
        highway_driving: "Conduite autoroute",
        parallel_parking: "Stationnement parallèle",
        angle_parking: "Stationnement en épi",
        bay_parking: "Stationnement en créneau",
        reverse_driving: "Marche arrière",
        u_turn: "Demi-tour",
        intersections: "Intersections",
        roundabouts: "Rond-points",
        traffic_signs: "Signalisation",
        pedestrian_crossings: "Passages piétons",
        speed_adaptation: "Adaptation de la vitesse",
        safety_distances: "Distances de sécurité",
        overtaking_technique: "Technique de dépassement",
        direction_signaling: "Signalisation changements",
        defensive_driving: "Anticipation défensive",
        night_driving: "Conduite de nuit",
        rain_driving: "Conduite sous la pluie",
        snow_driving: "Conduite sur neige",
        fog_driving: "Conduite dans le brouillard",
        fuel_economy: "Économie de carburant",
        parking_types: "Types de stationnement",
        highway_access_exit: "Accès/Sortie autoroute",
        other_custom: "Autre (préciser)",
      },
      customPlaceholder: "Préciser le thème...",
    },

    // Global rating
    globalRating: {
      title: "Note générale de la leçon",
      subtitle: "Évaluation globale de la performance",
      required: "Requis",
      explanation:
        "Cette note aide à suivre l'évolution de l'élève objectivement",
      ratings: {
        "1": "Insuffisant",
        "2": "Faible",
        "3": "Moyen",
        "4": "Bien",
        "5": "Excellent",
      },
      descriptions: {
        "1": "Difficultés majeures, objectifs non atteints",
        "2": "Lacunes importantes, travail conséquent nécessaire",
        "3": "Acceptable, compétences basiques en développement",
        "4": "Bonne performance, compétent, progression excellente",
        "5": "Exceptionnel, maîtrise, autonomie quasi complète",
      },
    },

    // Detailed evaluation
    detailedEvaluation: {
      title: "Évaluation par thème",
      subtitle: "Optionnel mais recommandé pour un feedback détaillé",
      themeRating: "Note",
      themeComment: "Commentaire",
      commentPlaceholder: "Ex: Bon placement, améliorer vitesse d'exécution",
      commentMaxLength: "150 caractères maximum",
    },

    // General comment
    generalComment: {
      title: "Commentaire général de la leçon",
      subtitle: "Description détaillée de la performance",
      required: "Requis - Minimum 50 caractères",
      placeholder:
        "Ex: Excellente concentration aujourd'hui. Points forts: priorités bien maîtrisées. À travailler: stationnement parallèle vitesse exécution. Recommandation: 2 leçons focus manœuvres zone urbaine calme puis progression trafic dense.",
      minLength: "Minimum 50 caractères",
      maxLength: "Maximum 500 caractères",
      currentLength: "caractères",
    },

    // Progress estimate
    progressEstimate: {
      title: "Progression depuis le début de la formation",
      subtitle: "Estimation subjective optionnelle",
      tooltip:
        "Estimation subjective du moniteur expérimenté complétant les données quantitatives",
      percentage: "Progression",
    },

    // Recommendations
    recommendations: {
      title: "Recommandations pour la prochaine leçon",
      subtitle: "Suggestions de focus et priorités",
      placeholder:
        "Ex: Continuer manœuvres + introduire conduite autoroute si météo favorable",
      maxLength: "300 caractères maximum",
    },

    // Safety concerns
    safetyConcerns: {
      title: "Points de vigilance sécurité",
      subtitle: "Signaler les problèmes critiques détectés",
      alert: "Points critiques signalés - Discussion nécessaire avec l'élève",
      items: {
        blind_spots_not_checked: "Angles morts non vérifiés",
        insufficient_safety_distances: "Distances de sécurité insuffisantes",
        inappropriate_speed: "Vitesse inadaptée",
        traffic_signs_ignored: "Signalisation ignorée",
        priorities_not_respected: "Priorités non respectées",
        high_stress: "Stress important",
        fatigue: "Fatigue",
        other_custom: "Autre (préciser)",
      },
      customPlaceholder: "Préciser le point de vigilance...",
    },

    // Digital signatures
    signatures: {
      title: "Signatures digitales",
      subtitle: "Requis OAC Art. 67 - Preuve légale d'authenticité",
      instructor: "Signature du moniteur",
      student: "Signature de l'élève",
      clear: "Effacer",
      sign: "Signer",
      studentAbsent: "Élève absent lors de la signature",
      legalNotice:
        "Les signatures prouvent l'authenticité de l'évaluation et ont une valeur légale",
      metadata: {
        timestamp: "Date et heure",
        location: "Localisation",
        ipAddress: "Adresse IP",
      },
    },

    // Actions
    actions: {
      save: "Enregistrer l'évaluation",
      saving: "Enregistrement...",
      cancel: "Annuler",
      viewEvaluation: "Voir l'évaluation",
      editEvaluation: "Modifier l'évaluation",
      downloadPDF: "Télécharger PDF",
      sendToStudent: "Envoyer à l'élève",
    },

    // Validation errors
    errors: {
      themesRequired: "Sélectionner au moins 1 thème",
      ratingRequired: "Note globale requise",
      commentTooShort: "Commentaire trop court (minimum 50 caractères)",
      commentTooLong: "Commentaire trop long (maximum 500 caractères)",
      instructorSignatureRequired: "Signature du moniteur requise",
      studentSignatureRequired:
        "Signature de l'élève requise (ou cocher 'Élève absent')",
    },

    // Success messages
    success: {
      saved: "Évaluation enregistrée avec succès!",
      thankYou: "Merci pour votre professionnalisme.",
      pdfGenerated: "PDF généré avec succès",
      emailSent: "Email envoyé à l'élève",
    },

    // Pending evaluations
    pending: {
      alert: "évaluations en attente",
      evaluateNext: "Évaluer la suivante",
    },

    // Edit confirmation
    editConfirm: {
      title: "Modifier l'évaluation",
      message: "Êtes-vous sûr de vouloir modifier cette évaluation?",
      warning: "Les modifications seront tracées dans l'historique d'audit",
      confirm: "Confirmer",
      cancel: "Annuler",
    },
  },

  de: {
    pageTitle: "Lektion bewerten",
    lessonContext: {
      title: "Lektionskontext",
      student: "Schüler",
      date: "Datum und Uhrzeit",
      duration: "Dauer",
      category: "Kategorie",
      vehicle: "Fahrzeug",
      meetingPoint: "Treffpunkt",
    },
    themes: {
      title: "Geübte Themen während der Lektion",
      subtitle: "Behandelte Themen auswählen (mindestens 1)",
      required: "Erforderlich - OAC Art. 67 Dokumentation",
      categories: {
        circulation: "Allgemeiner Verkehr",
        maneuvers: "Manöver",
        priorities: "Vorfahrtsregeln",
        speed: "Geschwindigkeit",
        distances: "Sicherheitsabstände",
        overtaking: "Überholen",
        direction_changes: "Richtungsänderungen",
        defensive: "Defensive Fahrweise",
        special_conditions: "Besondere Bedingungen",
        eco_driving: "Öko-Fahren",
        parking: "Parkieren",
        highway: "Autobahn",
        other: "Andere",
      },
      items: {
        urban_driving: "Stadtfahren",
        rural_driving: "Landstraßenfahren",
        highway_driving: "Autobahnfahren",
        parallel_parking: "Parallelparken",
        angle_parking: "Schrägparken",
        bay_parking: "Rückwärts einparken",
        reverse_driving: "Rückwärtsfahren",
        u_turn: "Wenden",
        intersections: "Kreuzungen",
        roundabouts: "Kreisverkehr",
        traffic_signs: "Verkehrsschilder",
        pedestrian_crossings: "Fussgängerstreifen",
        speed_adaptation: "Geschwindigkeitsanpassung",
        safety_distances: "Sicherheitsabstände",
        overtaking_technique: "Überholtechnik",
        direction_signaling: "Richtungsanzeige",
        defensive_driving: "Vorausschauendes Fahren",
        night_driving: "Nachtfahren",
        rain_driving: "Regenfahren",
        snow_driving: "Schneefahren",
        fog_driving: "Nebelfahren",
        fuel_economy: "Kraftstoffersparnis",
        parking_types: "Parkarten",
        highway_access_exit: "Autobahnzufahrt/-ausfahrt",
        other_custom: "Andere (angeben)",
      },
      customPlaceholder: "Thema angeben...",
    },
    globalRating: {
      title: "Gesamtnote der Lektion",
      subtitle: "Gesamtbewertung der Leistung",
      required: "Erforderlich",
      explanation:
        "Diese Note hilft, die Entwicklung des Schülers objektiv zu verfolgen",
      ratings: {
        "1": "Ungenügend",
        "2": "Schwach",
        "3": "Mittel",
        "4": "Gut",
        "5": "Ausgezeichnet",
      },
      descriptions: {
        "1": "Große Schwierigkeiten, Ziele nicht erreicht",
        "2": "Erhebliche Lücken, viel Arbeit erforderlich",
        "3": "Akzeptabel, grundlegende Fähigkeiten in Entwicklung",
        "4": "Gute Leistung, kompetent, ausgezeichneter Fortschritt",
        "5": "Außergewöhnlich, Beherrschung, fast vollständige Autonomie",
      },
    },
    detailedEvaluation: {
      title: "Bewertung nach Thema",
      subtitle: "Optional aber empfohlen für detailliertes Feedback",
      themeRating: "Note",
      themeComment: "Kommentar",
      commentPlaceholder:
        "Z.B.: Gute Platzierung, Ausführungsgeschwindigkeit verbessern",
      commentMaxLength: "Maximal 150 Zeichen",
    },
    generalComment: {
      title: "Allgemeiner Kommentar zur Lektion",
      subtitle: "Detaillierte Beschreibung der Leistung",
      required: "Erforderlich - Mindestens 50 Zeichen",
      placeholder:
        "Z.B.: Ausgezeichnete Konzentration heute. Stärken: Vorfahrtsregeln gut beherrscht. Zu üben: Parallelparken Ausführungsgeschwindigkeit. Empfehlung: 2 Lektionen Fokus Manöver ruhige Stadtzone dann Fortschritt dichter Verkehr.",
      minLength: "Mindestens 50 Zeichen",
      maxLength: "Maximal 500 Zeichen",
      currentLength: "Zeichen",
    },
    progressEstimate: {
      title: "Fortschritt seit Ausbildungsbeginn",
      subtitle: "Optionale subjektive Einschätzung",
      tooltip:
        "Subjektive Einschätzung des erfahrenen Fahrlehrers ergänzt quantitative Daten",
      percentage: "Fortschritt",
    },
    recommendations: {
      title: "Empfehlungen für die nächste Lektion",
      subtitle: "Vorschläge für Schwerpunkte und Prioritäten",
      placeholder:
        "Z.B.: Manöver fortsetzen + Autobahnfahren einführen bei günstigem Wetter",
      maxLength: "Maximal 300 Zeichen",
    },
    safetyConcerns: {
      title: "Sicherheitshinweise",
      subtitle: "Kritische Probleme melden",
      alert: "Kritische Punkte gemeldet - Gespräch mit Schüler erforderlich",
      items: {
        blind_spots_not_checked: "Tote Winkel nicht überprüft",
        insufficient_safety_distances: "Unzureichende Sicherheitsabstände",
        inappropriate_speed: "Unangemessene Geschwindigkeit",
        traffic_signs_ignored: "Verkehrsschilder ignoriert",
        priorities_not_respected: "Vorfahrtsregeln nicht beachtet",
        high_stress: "Hoher Stress",
        fatigue: "Müdigkeit",
        other_custom: "Andere (angeben)",
      },
      customPlaceholder: "Sicherheitshinweis angeben...",
    },
    signatures: {
      title: "Digitale Unterschriften",
      subtitle:
        "Erforderlich OAC Art. 67 - Rechtlicher Nachweis der Authentizität",
      instructor: "Unterschrift des Fahrlehrers",
      student: "Unterschrift des Schülers",
      clear: "Löschen",
      sign: "Unterschreiben",
      studentAbsent: "Schüler bei Unterschrift abwesend",
      legalNotice:
        "Die Unterschriften beweisen die Authentizität der Bewertung und haben rechtliche Gültigkeit",
      metadata: {
        timestamp: "Datum und Uhrzeit",
        location: "Standort",
        ipAddress: "IP-Adresse",
      },
    },
    actions: {
      save: "Bewertung speichern",
      saving: "Speichern...",
      cancel: "Abbrechen",
      viewEvaluation: "Bewertung ansehen",
      editEvaluation: "Bewertung bearbeiten",
      downloadPDF: "PDF herunterladen",
      sendToStudent: "An Schüler senden",
    },
    errors: {
      themesRequired: "Mindestens 1 Thema auswählen",
      ratingRequired: "Gesamtnote erforderlich",
      commentTooShort: "Kommentar zu kurz (mindestens 50 Zeichen)",
      commentTooLong: "Kommentar zu lang (maximal 500 Zeichen)",
      instructorSignatureRequired: "Unterschrift des Fahrlehrers erforderlich",
      studentSignatureRequired:
        "Unterschrift des Schülers erforderlich (oder 'Schüler abwesend' ankreuzen)",
    },
    success: {
      saved: "Bewertung erfolgreich gespeichert!",
      thankYou: "Vielen Dank für Ihre Professionalität.",
      pdfGenerated: "PDF erfolgreich erstellt",
      emailSent: "E-Mail an Schüler gesendet",
    },
    pending: {
      alert: "ausstehende Bewertungen",
      evaluateNext: "Nächste bewerten",
    },
    editConfirm: {
      title: "Bewertung bearbeiten",
      message: "Sind Sie sicher, dass Sie diese Bewertung bearbeiten möchten?",
      warning: "Änderungen werden im Audit-Verlauf nachverfolgt",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
    },
  },

  it: {
    pageTitle: "Valutare la lezione",
    lessonContext: {
      title: "Contesto della lezione",
      student: "Allievo",
      date: "Data e ora",
      duration: "Durata",
      category: "Categoria",
      vehicle: "Veicolo",
      meetingPoint: "Punto d'incontro",
    },
    themes: {
      title: "Temi praticati durante la lezione",
      subtitle: "Selezionare i temi trattati (minimo 1)",
      required: "Richiesto - Documentazione OAC Art. 67",
      categories: {
        circulation: "Circolazione generale",
        maneuvers: "Manovre",
        priorities: "Priorità",
        speed: "Velocità",
        distances: "Distanze di sicurezza",
        overtaking: "Sorpassi",
        direction_changes: "Cambi di direzione",
        defensive: "Guida difensiva",
        special_conditions: "Condizioni speciali",
        eco_driving: "Eco-guida",
        parking: "Parcheggio",
        highway: "Autostrada",
        other: "Altro",
      },
      items: {
        urban_driving: "Guida urbana",
        rural_driving: "Guida rurale",
        highway_driving: "Guida in autostrada",
        parallel_parking: "Parcheggio parallelo",
        angle_parking: "Parcheggio a spina",
        bay_parking: "Parcheggio a pettine",
        reverse_driving: "Retromarcia",
        u_turn: "Inversione a U",
        intersections: "Incroci",
        roundabouts: "Rotonde",
        traffic_signs: "Segnaletica",
        pedestrian_crossings: "Passaggi pedonali",
        speed_adaptation: "Adattamento della velocità",
        safety_distances: "Distanze di sicurezza",
        overtaking_technique: "Tecnica di sorpasso",
        direction_signaling: "Segnalazione cambi",
        defensive_driving: "Anticipazione difensiva",
        night_driving: "Guida notturna",
        rain_driving: "Guida sotto la pioggia",
        snow_driving: "Guida sulla neve",
        fog_driving: "Guida nella nebbia",
        fuel_economy: "Economia di carburante",
        parking_types: "Tipi di parcheggio",
        highway_access_exit: "Accesso/Uscita autostrada",
        other_custom: "Altro (specificare)",
      },
      customPlaceholder: "Specificare il tema...",
    },
    globalRating: {
      title: "Voto generale della lezione",
      subtitle: "Valutazione globale della performance",
      required: "Richiesto",
      explanation:
        "Questo voto aiuta a seguire l'evoluzione dell'allievo oggettivamente",
      ratings: {
        "1": "Insufficiente",
        "2": "Debole",
        "3": "Medio",
        "4": "Buono",
        "5": "Eccellente",
      },
      descriptions: {
        "1": "Difficoltà maggiori, obiettivi non raggiunti",
        "2": "Lacune importanti, lavoro consistente necessario",
        "3": "Accettabile, competenze di base in sviluppo",
        "4": "Buona performance, competente, progressione eccellente",
        "5": "Eccezionale, padronanza, autonomia quasi completa",
      },
    },
    detailedEvaluation: {
      title: "Valutazione per tema",
      subtitle: "Opzionale ma raccomandato per feedback dettagliato",
      themeRating: "Voto",
      themeComment: "Commento",
      commentPlaceholder:
        "Es: Buon posizionamento, migliorare velocità di esecuzione",
      commentMaxLength: "Massimo 150 caratteri",
    },
    generalComment: {
      title: "Commento generale della lezione",
      subtitle: "Descrizione dettagliata della performance",
      required: "Richiesto - Minimo 50 caratteri",
      placeholder:
        "Es: Eccellente concentrazione oggi. Punti forti: priorità ben padroneggiate. Da lavorare: parcheggio parallelo velocità esecuzione. Raccomandazione: 2 lezioni focus manovre zona urbana calma poi progressione traffico denso.",
      minLength: "Minimo 50 caratteri",
      maxLength: "Massimo 500 caratteri",
      currentLength: "caratteri",
    },
    progressEstimate: {
      title: "Progressione dall'inizio della formazione",
      subtitle: "Stima soggettiva opzionale",
      tooltip:
        "Stima soggettiva dell'istruttore esperto che completa i dati quantitativi",
      percentage: "Progressione",
    },
    recommendations: {
      title: "Raccomandazioni per la prossima lezione",
      subtitle: "Suggerimenti di focus e priorità",
      placeholder:
        "Es: Continuare manovre + introdurre guida autostrada se meteo favorevole",
      maxLength: "Massimo 300 caratteri",
    },
    safetyConcerns: {
      title: "Punti di vigilanza sicurezza",
      subtitle: "Segnalare i problemi critici rilevati",
      alert: "Punti critici segnalati - Discussione necessaria con l'allievo",
      items: {
        blind_spots_not_checked: "Angoli morti non verificati",
        insufficient_safety_distances: "Distanze di sicurezza insufficienti",
        inappropriate_speed: "Velocità inadeguata",
        traffic_signs_ignored: "Segnaletica ignorata",
        priorities_not_respected: "Priorità non rispettate",
        high_stress: "Stress importante",
        fatigue: "Fatica",
        other_custom: "Altro (specificare)",
      },
      customPlaceholder: "Specificare il punto di vigilanza...",
    },
    signatures: {
      title: "Firme digitali",
      subtitle: "Richiesto OAC Art. 67 - Prova legale di autenticità",
      instructor: "Firma dell'istruttore",
      student: "Firma dell'allievo",
      clear: "Cancellare",
      sign: "Firmare",
      studentAbsent: "Allievo assente alla firma",
      legalNotice:
        "Le firme provano l'autenticità della valutazione e hanno valore legale",
      metadata: {
        timestamp: "Data e ora",
        location: "Localizzazione",
        ipAddress: "Indirizzo IP",
      },
    },
    actions: {
      save: "Registrare la valutazione",
      saving: "Registrazione...",
      cancel: "Annullare",
      viewEvaluation: "Vedere la valutazione",
      editEvaluation: "Modificare la valutazione",
      downloadPDF: "Scaricare PDF",
      sendToStudent: "Inviare all'allievo",
    },
    errors: {
      themesRequired: "Selezionare almeno 1 tema",
      ratingRequired: "Voto generale richiesto",
      commentTooShort: "Commento troppo corto (minimo 50 caratteri)",
      commentTooLong: "Commento troppo lungo (massimo 500 caratteri)",
      instructorSignatureRequired: "Firma dell'istruttore richiesta",
      studentSignatureRequired:
        "Firma dell'allievo richiesta (o spuntare 'Allievo assente')",
    },
    success: {
      saved: "Valutazione registrata con successo!",
      thankYou: "Grazie per la vostra professionalità.",
      pdfGenerated: "PDF generato con successo",
      emailSent: "Email inviata all'allievo",
    },
    pending: {
      alert: "valutazioni in attesa",
      evaluateNext: "Valutare la seguente",
    },
    editConfirm: {
      title: "Modificare la valutazione",
      message: "Sei sicuro di voler modificare questa valutazione?",
      warning: "Le modifiche saranno tracciate nello storico di audit",
      confirm: "Confermare",
      cancel: "Annullare",
    },
  },

  en: {
    pageTitle: "Evaluate Lesson",
    lessonContext: {
      title: "Lesson Context",
      student: "Student",
      date: "Date and Time",
      duration: "Duration",
      category: "Category",
      vehicle: "Vehicle",
      meetingPoint: "Meeting Point",
    },
    themes: {
      title: "Themes Practiced During Lesson",
      subtitle: "Select covered themes (minimum 1)",
      required: "Required - OAC Art. 67 Documentation",
      categories: {
        circulation: "General Traffic",
        maneuvers: "Maneuvers",
        priorities: "Right of Way",
        speed: "Speed",
        distances: "Safety Distances",
        overtaking: "Overtaking",
        direction_changes: "Direction Changes",
        defensive: "Defensive Driving",
        special_conditions: "Special Conditions",
        eco_driving: "Eco-Driving",
        parking: "Parking",
        highway: "Highway",
        other: "Other",
      },
      items: {
        urban_driving: "Urban Driving",
        rural_driving: "Rural Driving",
        highway_driving: "Highway Driving",
        parallel_parking: "Parallel Parking",
        angle_parking: "Angle Parking",
        bay_parking: "Bay Parking",
        reverse_driving: "Reverse Driving",
        u_turn: "U-Turn",
        intersections: "Intersections",
        roundabouts: "Roundabouts",
        traffic_signs: "Traffic Signs",
        pedestrian_crossings: "Pedestrian Crossings",
        speed_adaptation: "Speed Adaptation",
        safety_distances: "Safety Distances",
        overtaking_technique: "Overtaking Technique",
        direction_signaling: "Direction Signaling",
        defensive_driving: "Defensive Anticipation",
        night_driving: "Night Driving",
        rain_driving: "Rain Driving",
        snow_driving: "Snow Driving",
        fog_driving: "Fog Driving",
        fuel_economy: "Fuel Economy",
        parking_types: "Parking Types",
        highway_access_exit: "Highway Access/Exit",
        other_custom: "Other (specify)",
      },
      customPlaceholder: "Specify theme...",
    },
    globalRating: {
      title: "Overall Lesson Rating",
      subtitle: "Global performance evaluation",
      required: "Required",
      explanation: "This rating helps track student progress objectively",
      ratings: {
        "1": "Insufficient",
        "2": "Weak",
        "3": "Average",
        "4": "Good",
        "5": "Excellent",
      },
      descriptions: {
        "1": "Major difficulties, objectives not achieved",
        "2": "Significant gaps, substantial work required",
        "3": "Acceptable, basic skills in development",
        "4": "Good performance, competent, excellent progress",
        "5": "Exceptional, mastery, almost complete autonomy",
      },
    },
    detailedEvaluation: {
      title: "Evaluation by Theme",
      subtitle: "Optional but recommended for detailed feedback",
      themeRating: "Rating",
      themeComment: "Comment",
      commentPlaceholder: "E.g.: Good positioning, improve execution speed",
      commentMaxLength: "150 characters maximum",
    },
    generalComment: {
      title: "General Lesson Comment",
      subtitle: "Detailed performance description",
      required: "Required - Minimum 50 characters",
      placeholder:
        "E.g.: Excellent concentration today. Strengths: right of way well mastered. To work on: parallel parking execution speed. Recommendation: 2 lessons focus maneuvers quiet urban area then progress to dense traffic.",
      minLength: "Minimum 50 characters",
      maxLength: "Maximum 500 characters",
      currentLength: "characters",
    },
    progressEstimate: {
      title: "Progress Since Training Start",
      subtitle: "Optional subjective estimate",
      tooltip:
        "Subjective estimate by experienced instructor complementing quantitative data",
      percentage: "Progress",
    },
    recommendations: {
      title: "Recommendations for Next Lesson",
      subtitle: "Focus and priority suggestions",
      placeholder:
        "E.g.: Continue maneuvers + introduce highway driving if weather favorable",
      maxLength: "300 characters maximum",
    },
    safetyConcerns: {
      title: "Safety Concerns",
      subtitle: "Report critical issues detected",
      alert: "Critical points reported - Discussion needed with student",
      items: {
        blind_spots_not_checked: "Blind spots not checked",
        insufficient_safety_distances: "Insufficient safety distances",
        inappropriate_speed: "Inappropriate speed",
        traffic_signs_ignored: "Traffic signs ignored",
        priorities_not_respected: "Right of way not respected",
        high_stress: "High stress",
        fatigue: "Fatigue",
        other_custom: "Other (specify)",
      },
      customPlaceholder: "Specify safety concern...",
    },
    signatures: {
      title: "Digital Signatures",
      subtitle: "Required OAC Art. 67 - Legal Proof of Authenticity",
      instructor: "Instructor Signature",
      student: "Student Signature",
      clear: "Clear",
      sign: "Sign",
      studentAbsent: "Student absent during signature",
      legalNotice:
        "Signatures prove evaluation authenticity and have legal value",
      metadata: {
        timestamp: "Date and Time",
        location: "Location",
        ipAddress: "IP Address",
      },
    },
    actions: {
      save: "Save Evaluation",
      saving: "Saving...",
      cancel: "Cancel",
      viewEvaluation: "View Evaluation",
      editEvaluation: "Edit Evaluation",
      downloadPDF: "Download PDF",
      sendToStudent: "Send to Student",
    },
    errors: {
      themesRequired: "Select at least 1 theme",
      ratingRequired: "Overall rating required",
      commentTooShort: "Comment too short (minimum 50 characters)",
      commentTooLong: "Comment too long (maximum 500 characters)",
      instructorSignatureRequired: "Instructor signature required",
      studentSignatureRequired:
        "Student signature required (or check 'Student absent')",
    },
    success: {
      saved: "Evaluation saved successfully!",
      thankYou: "Thank you for your professionalism.",
      pdfGenerated: "PDF generated successfully",
      emailSent: "Email sent to student",
    },
    pending: {
      alert: "pending evaluations",
      evaluateNext: "Evaluate Next",
    },
    editConfirm: {
      title: "Edit Evaluation",
      message: "Are you sure you want to edit this evaluation?",
      warning: "Changes will be tracked in audit history",
      confirm: "Confirm",
      cancel: "Cancel",
    },
  },
};

/**
 * Hook pour accéder aux traductions
 */
export function useEvaluationTranslations(locale: EvaluationLocale = "fr") {
  return evaluationTranslations[locale];
}
