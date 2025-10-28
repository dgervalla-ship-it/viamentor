/**
 * VIAMENTOR Tours i18n
 *
 * Traductions complètes FR/DE/IT/EN pour tours guidés utilisateurs
 * Scripts contextualisés par rôle avec terminologie professionnelle
 *
 * @module data/viamentor-tours-i18n
 * @version 1.0.0
 */

import type { SupportedLocale } from "@/viamentor/data/viamentor-i18n-config";

/**
 * Interface pour traductions tours
 */
export interface ToursTranslations {
  // Navigation globale
  navigation: {
    next: string;
    previous: string;
    skip: string;
    finish: string;
    close: string;
    progress: string; // "3/8"
  };

  // Options
  options: {
    dontShowAgain: string;
    learnMore: string;
  };

  // Tours par rôle
  schoolAdmin: {
    title: string;
    steps: {
      sidebar: { title: string; content: string };
      dashboard: { title: string; content: string };
      newStudent: { title: string; content: string };
      planning: { title: string; content: string };
      invoices: { title: string; content: string };
      analytics: { title: string; content: string };
      settings: { title: string; content: string };
      final: { title: string; content: string };
    };
  };

  instructor: {
    title: string;
    steps: {
      dashboard: { title: string; content: string };
      students: { title: string; content: string };
      evaluation: { title: string; content: string };
      planning: { title: string; content: string };
      profile: { title: string; content: string };
      final: { title: string; content: string };
    };
  };

  student: {
    title: string;
    steps: {
      dashboard: { title: string; content: string };
      booking: { title: string; content: string };
      progression: { title: string; content: string };
      invoices: { title: string; content: string };
      profile: { title: string; content: string };
    };
  };

  secretary: {
    title: string;
    steps: {
      tasks: { title: string; content: string };
      registration: { title: string; content: string };
      planning: { title: string; content: string };
      messages: { title: string; content: string };
      students: { title: string; content: string };
      final: { title: string; content: string };
    };
  };
}

/**
 * Traductions complètes par locale
 */
export const TOURS_I18N: Record<SupportedLocale, ToursTranslations> = {
  // ============================================================================
  // FRANÇAIS
  // ============================================================================
  fr: {
    navigation: {
      next: "Suivant",
      previous: "Précédent",
      skip: "Passer",
      finish: "Terminer",
      close: "Fermer",
      progress: "{current}/{total}",
    },

    options: {
      dontShowAgain: "Ne plus afficher ce guide",
      learnMore: "En savoir plus",
    },

    schoolAdmin: {
      title: "Bienvenue sur Viamentor !",
      steps: {
        sidebar: {
          title: "Navigation principale",
          content:
            "Toutes les fonctionnalités de votre auto-école sont accessibles ici. Explorez les différentes sections pour gérer élèves, moniteurs, planning et facturation.",
        },
        dashboard: {
          title: "Vue d'ensemble temps réel",
          content:
            "Votre tableau de bord affiche les indicateurs clés : élèves actifs, leçons du jour, revenus mensuels. Tout est mis à jour en temps réel.",
        },
        newStudent: {
          title: "Inscrivez votre premier élève",
          content:
            "Cliquez ici pour ajouter un nouvel élève. Le wizard vous guide à travers toutes les étapes : identité, formation, documents obligatoires OAC.",
        },
        planning: {
          title: "Gérez vos leçons",
          content:
            "Le planning centralise toutes les leçons pratiques et cours théoriques. Drag & drop pour déplacer, filtres par moniteur ou véhicule.",
        },
        invoices: {
          title: "Facturation simplifiée",
          content:
            "Créez des factures conformes avec QR-bill suisse automatique. Suivez les paiements, relances et exports comptables.",
        },
        analytics: {
          title: "Analytics et rapports",
          content:
            "Analysez la performance de votre auto-école : taux de réussite, revenus, utilisation véhicules. Exportez vos rapports en PDF/Excel.",
        },
        settings: {
          title: "Personnalisez Viamentor",
          content:
            "Configurez vos tarifs, horaires d'ouverture, templates emails, et tous les paramètres de votre auto-école.",
        },
        final: {
          title: "Vous êtes prêt !",
          content:
            "Vous maîtrisez maintenant les bases de Viamentor. Explorez à votre rythme, notre support est disponible 24/7 si besoin.",
        },
      },
    },

    instructor: {
      title: "Bienvenue Moniteur !",
      steps: {
        dashboard: {
          title: "Vos leçons du jour",
          content:
            "Consultez votre planning quotidien avec tous les détails : élève, horaire, véhicule, lieu de rendez-vous.",
        },
        students: {
          title: "Vos élèves assignés",
          content:
            "Retrouvez la liste complète de vos élèves avec leur progression pédagogique, prochaines leçons et historique.",
        },
        evaluation: {
          title: "Évaluation obligatoire OAC",
          content:
            "Après chaque leçon, évaluez les compétences selon les thèmes L-drive. C'est une obligation légale pour la traçabilité.",
        },
        planning: {
          title: "Votre disponibilité",
          content:
            "Gérez vos créneaux disponibles, congés et absences. Le système bloque automatiquement les réservations pendant vos indisponibilités.",
        },
        profile: {
          title: "Profil et paramètres",
          content:
            "Mettez à jour vos coordonnées, habilitations catégories, et préférences de notification.",
        },
        final: {
          title: "Bonne route !",
          content:
            "Vous êtes prêt à utiliser Viamentor. Bonne formation à vos élèves !",
        },
      },
    },

    student: {
      title: "Bienvenue Élève !",
      steps: {
        dashboard: {
          title: "Votre progression",
          content:
            "Suivez visuellement votre avancement : heures effectuées, objectifs pédagogiques, prochaine étape vers l'examen.",
        },
        booking: {
          title: "Réservez vos leçons",
          content:
            "Réservez en autonomie vos leçons de conduite. Choisissez votre moniteur, date, horaire et lieu de rendez-vous.",
        },
        progression: {
          title: "Tracker pédagogique",
          content:
            "Consultez vos évaluations détaillées par thème L-drive. Identifiez vos points forts et axes d'amélioration.",
        },
        invoices: {
          title: "Vos factures",
          content:
            "Accédez à toutes vos factures, forfaits et paiements. Téléchargez les QR-bills pour payer facilement.",
        },
        profile: {
          title: "Documents et profil",
          content:
            "Uploadez vos documents obligatoires (permis d'élève, photo, etc.) et mettez à jour vos coordonnées.",
        },
      },
    },

    secretary: {
      title: "Bienvenue Secrétaire !",
      steps: {
        tasks: {
          title: "Tâches quotidiennes",
          content:
            "Priorisez vos tâches du jour : inscriptions à finaliser, appels à passer, documents à vérifier.",
        },
        registration: {
          title: "Inscription rapide",
          content:
            "Wizard d'inscription optimisé pour enregistrer rapidement les nouveaux élèves au téléphone ou au guichet.",
        },
        planning: {
          title: "Coordination planning",
          content:
            "Vue globale du planning pour coordonner moniteurs, véhicules et salles de cours théoriques.",
        },
        messages: {
          title: "Communications",
          content:
            "Messagerie interne pour communiquer avec moniteurs et élèves. Templates emails pour gagner du temps.",
        },
        students: {
          title: "Base de données élèves",
          content:
            "Recherchez rapidement un élève, consultez son dossier complet, éditez ses informations.",
        },
        final: {
          title: "Tout est prêt !",
          content:
            "Vous maîtrisez les outils essentiels pour votre travail quotidien. Bonne journée !",
        },
      },
    },
  },

  // ============================================================================
  // DEUTSCH
  // ============================================================================
  de: {
    navigation: {
      next: "Weiter",
      previous: "Zurück",
      skip: "Überspringen",
      finish: "Fertig",
      close: "Schließen",
      progress: "{current}/{total}",
    },

    options: {
      dontShowAgain: "Diesen Leitfaden nicht mehr anzeigen",
      learnMore: "Mehr erfahren",
    },

    schoolAdmin: {
      title: "Willkommen bei Viamentor!",
      steps: {
        sidebar: {
          title: "Hauptnavigation",
          content:
            "Alle Funktionen Ihrer Fahrschule sind hier zugänglich. Erkunden Sie die verschiedenen Bereiche zur Verwaltung von Schülern, Fahrlehrern, Zeitplan und Abrechnung.",
        },
        dashboard: {
          title: "Echtzeit-Übersicht",
          content:
            "Ihr Dashboard zeigt die wichtigsten Kennzahlen: aktive Schüler, heutige Lektionen, monatliche Einnahmen. Alles wird in Echtzeit aktualisiert.",
        },
        newStudent: {
          title: "Ersten Schüler anmelden",
          content:
            "Klicken Sie hier, um einen neuen Schüler hinzuzufügen. Der Assistent führt Sie durch alle Schritte: Identität, Ausbildung, obligatorische OAC-Dokumente.",
        },
        planning: {
          title: "Lektionen verwalten",
          content:
            "Der Zeitplan zentralisiert alle praktischen Lektionen und Theoriekurse. Drag & Drop zum Verschieben, Filter nach Fahrlehrer oder Fahrzeug.",
        },
        invoices: {
          title: "Vereinfachte Abrechnung",
          content:
            "Erstellen Sie konforme Rechnungen mit automatischer Schweizer QR-Rechnung. Verfolgen Sie Zahlungen, Mahnungen und Buchhaltungsexporte.",
        },
        analytics: {
          title: "Analytics und Berichte",
          content:
            "Analysieren Sie die Leistung Ihrer Fahrschule: Erfolgsquote, Einnahmen, Fahrzeugnutzung. Exportieren Sie Ihre Berichte als PDF/Excel.",
        },
        settings: {
          title: "Viamentor anpassen",
          content:
            "Konfigurieren Sie Ihre Tarife, Öffnungszeiten, E-Mail-Vorlagen und alle Parameter Ihrer Fahrschule.",
        },
        final: {
          title: "Sie sind bereit!",
          content:
            "Sie beherrschen jetzt die Grundlagen von Viamentor. Erkunden Sie in Ihrem Tempo, unser Support ist 24/7 verfügbar.",
        },
      },
    },

    instructor: {
      title: "Willkommen Fahrlehrer!",
      steps: {
        dashboard: {
          title: "Ihre heutigen Lektionen",
          content:
            "Sehen Sie Ihren Tagesplan mit allen Details: Schüler, Uhrzeit, Fahrzeug, Treffpunkt.",
        },
        students: {
          title: "Ihre zugewiesenen Schüler",
          content:
            "Finden Sie die vollständige Liste Ihrer Schüler mit ihrem pädagogischen Fortschritt, nächsten Lektionen und Verlauf.",
        },
        evaluation: {
          title: "Obligatorische OAC-Bewertung",
          content:
            "Bewerten Sie nach jeder Lektion die Fähigkeiten nach L-drive-Themen. Dies ist eine gesetzliche Pflicht zur Rückverfolgbarkeit.",
        },
        planning: {
          title: "Ihre Verfügbarkeit",
          content:
            "Verwalten Sie Ihre verfügbaren Zeitfenster, Urlaube und Abwesenheiten. Das System blockiert automatisch Buchungen während Ihrer Nichtverfügbarkeit.",
        },
        profile: {
          title: "Profil und Einstellungen",
          content:
            "Aktualisieren Sie Ihre Kontaktdaten, Kategorieberechtigungen und Benachrichtigungseinstellungen.",
        },
        final: {
          title: "Gute Fahrt!",
          content:
            "Sie sind bereit, Viamentor zu nutzen. Viel Erfolg bei der Ausbildung Ihrer Schüler!",
        },
      },
    },

    student: {
      title: "Willkommen Schüler!",
      steps: {
        dashboard: {
          title: "Ihr Fortschritt",
          content:
            "Verfolgen Sie visuell Ihren Fortschritt: absolvierte Stunden, pädagogische Ziele, nächster Schritt zur Prüfung.",
        },
        booking: {
          title: "Lektionen buchen",
          content:
            "Buchen Sie selbstständig Ihre Fahrstunden. Wählen Sie Ihren Fahrlehrer, Datum, Uhrzeit und Treffpunkt.",
        },
        progression: {
          title: "Pädagogischer Tracker",
          content:
            "Sehen Sie Ihre detaillierten Bewertungen nach L-drive-Themen. Identifizieren Sie Ihre Stärken und Verbesserungsbereiche.",
        },
        invoices: {
          title: "Ihre Rechnungen",
          content:
            "Greifen Sie auf alle Ihre Rechnungen, Pakete und Zahlungen zu. Laden Sie QR-Rechnungen herunter, um einfach zu bezahlen.",
        },
        profile: {
          title: "Dokumente und Profil",
          content:
            "Laden Sie Ihre obligatorischen Dokumente hoch (Lernfahrausweis, Foto usw.) und aktualisieren Sie Ihre Kontaktdaten.",
        },
      },
    },

    secretary: {
      title: "Willkommen Sekretär!",
      steps: {
        tasks: {
          title: "Tägliche Aufgaben",
          content:
            "Priorisieren Sie Ihre Tagesaufgaben: Anmeldungen abschließen, Anrufe tätigen, Dokumente überprüfen.",
        },
        registration: {
          title: "Schnellanmeldung",
          content:
            "Optimierter Anmelde-Assistent zur schnellen Registrierung neuer Schüler am Telefon oder am Schalter.",
        },
        planning: {
          title: "Zeitplankoordination",
          content:
            "Gesamtansicht des Zeitplans zur Koordination von Fahrlehrern, Fahrzeugen und Theoriekursräumen.",
        },
        messages: {
          title: "Kommunikation",
          content:
            "Interne Nachrichtenfunktion zur Kommunikation mit Fahrlehrern und Schülern. E-Mail-Vorlagen zum Zeitsparen.",
        },
        students: {
          title: "Schülerdatenbank",
          content:
            "Suchen Sie schnell einen Schüler, sehen Sie seine vollständige Akte ein, bearbeiten Sie seine Informationen.",
        },
        final: {
          title: "Alles bereit!",
          content:
            "Sie beherrschen die wesentlichen Werkzeuge für Ihre tägliche Arbeit. Einen schönen Tag!",
        },
      },
    },
  },

  // ============================================================================
  // ITALIANO
  // ============================================================================
  it: {
    navigation: {
      next: "Avanti",
      previous: "Indietro",
      skip: "Salta",
      finish: "Fine",
      close: "Chiudi",
      progress: "{current}/{total}",
    },

    options: {
      dontShowAgain: "Non mostrare più questa guida",
      learnMore: "Scopri di più",
    },

    schoolAdmin: {
      title: "Benvenuto su Viamentor!",
      steps: {
        sidebar: {
          title: "Navigazione principale",
          content:
            "Tutte le funzionalità della tua scuola guida sono accessibili qui. Esplora le diverse sezioni per gestire studenti, istruttori, pianificazione e fatturazione.",
        },
        dashboard: {
          title: "Panoramica in tempo reale",
          content:
            "La tua dashboard mostra gli indicatori chiave: studenti attivi, lezioni di oggi, entrate mensili. Tutto è aggiornato in tempo reale.",
        },
        newStudent: {
          title: "Iscrivi il tuo primo studente",
          content:
            "Clicca qui per aggiungere un nuovo studente. Il wizard ti guida attraverso tutte le fasi: identità, formazione, documenti obbligatori OAC.",
        },
        planning: {
          title: "Gestisci le tue lezioni",
          content:
            "La pianificazione centralizza tutte le lezioni pratiche e i corsi teorici. Drag & drop per spostare, filtri per istruttore o veicolo.",
        },
        invoices: {
          title: "Fatturazione semplificata",
          content:
            "Crea fatture conformi con QR-bill svizzera automatica. Monitora pagamenti, solleciti ed esportazioni contabili.",
        },
        analytics: {
          title: "Analytics e report",
          content:
            "Analizza le prestazioni della tua scuola guida: tasso di successo, entrate, utilizzo veicoli. Esporta i tuoi report in PDF/Excel.",
        },
        settings: {
          title: "Personalizza Viamentor",
          content:
            "Configura le tue tariffe, orari di apertura, template email e tutti i parametri della tua scuola guida.",
        },
        final: {
          title: "Sei pronto!",
          content:
            "Ora padroneggi le basi di Viamentor. Esplora al tuo ritmo, il nostro supporto è disponibile 24/7 se necessario.",
        },
      },
    },

    instructor: {
      title: "Benvenuto Istruttore!",
      steps: {
        dashboard: {
          title: "Le tue lezioni di oggi",
          content:
            "Consulta la tua pianificazione giornaliera con tutti i dettagli: studente, orario, veicolo, luogo di incontro.",
        },
        students: {
          title: "I tuoi studenti assegnati",
          content:
            "Trova l'elenco completo dei tuoi studenti con il loro progresso pedagogico, prossime lezioni e storico.",
        },
        evaluation: {
          title: "Valutazione obbligatoria OAC",
          content:
            "Dopo ogni lezione, valuta le competenze secondo i temi L-drive. È un obbligo legale per la tracciabilità.",
        },
        planning: {
          title: "La tua disponibilità",
          content:
            "Gestisci le tue fasce orarie disponibili, ferie e assenze. Il sistema blocca automaticamente le prenotazioni durante le tue indisponibilità.",
        },
        profile: {
          title: "Profilo e impostazioni",
          content:
            "Aggiorna i tuoi contatti, abilitazioni categorie e preferenze di notifica.",
        },
        final: {
          title: "Buona strada!",
          content:
            "Sei pronto per utilizzare Viamentor. Buona formazione ai tuoi studenti!",
        },
      },
    },

    student: {
      title: "Benvenuto Studente!",
      steps: {
        dashboard: {
          title: "Il tuo progresso",
          content:
            "Segui visivamente il tuo avanzamento: ore effettuate, obiettivi pedagogici, prossimo passo verso l'esame.",
        },
        booking: {
          title: "Prenota le tue lezioni",
          content:
            "Prenota autonomamente le tue lezioni di guida. Scegli il tuo istruttore, data, orario e luogo di incontro.",
        },
        progression: {
          title: "Tracker pedagogico",
          content:
            "Consulta le tue valutazioni dettagliate per tema L-drive. Identifica i tuoi punti di forza e aree di miglioramento.",
        },
        invoices: {
          title: "Le tue fatture",
          content:
            "Accedi a tutte le tue fatture, pacchetti e pagamenti. Scarica le QR-bill per pagare facilmente.",
        },
        profile: {
          title: "Documenti e profilo",
          content:
            "Carica i tuoi documenti obbligatori (licenza allievo, foto, ecc.) e aggiorna i tuoi contatti.",
        },
      },
    },

    secretary: {
      title: "Benvenuto Segretario!",
      steps: {
        tasks: {
          title: "Compiti quotidiani",
          content:
            "Dai priorità ai tuoi compiti del giorno: iscrizioni da finalizzare, chiamate da fare, documenti da verificare.",
        },
        registration: {
          title: "Iscrizione rapida",
          content:
            "Wizard di iscrizione ottimizzato per registrare rapidamente i nuovi studenti al telefono o allo sportello.",
        },
        planning: {
          title: "Coordinamento pianificazione",
          content:
            "Vista globale della pianificazione per coordinare istruttori, veicoli e aule di corsi teorici.",
        },
        messages: {
          title: "Comunicazioni",
          content:
            "Messaggistica interna per comunicare con istruttori e studenti. Template email per risparmiare tempo.",
        },
        students: {
          title: "Database studenti",
          content:
            "Cerca rapidamente uno studente, consulta il suo fascicolo completo, modifica le sue informazioni.",
        },
        final: {
          title: "Tutto pronto!",
          content:
            "Padroneggi gli strumenti essenziali per il tuo lavoro quotidiano. Buona giornata!",
        },
      },
    },
  },

  // ============================================================================
  // ENGLISH
  // ============================================================================
  en: {
    navigation: {
      next: "Next",
      previous: "Previous",
      skip: "Skip",
      finish: "Finish",
      close: "Close",
      progress: "{current}/{total}",
    },

    options: {
      dontShowAgain: "Don't show this guide again",
      learnMore: "Learn more",
    },

    schoolAdmin: {
      title: "Welcome to Viamentor!",
      steps: {
        sidebar: {
          title: "Main Navigation",
          content:
            "All your driving school features are accessible here. Explore the different sections to manage students, instructors, schedule and billing.",
        },
        dashboard: {
          title: "Real-time Overview",
          content:
            "Your dashboard displays key indicators: active students, today's lessons, monthly revenue. Everything is updated in real-time.",
        },
        newStudent: {
          title: "Enroll Your First Student",
          content:
            "Click here to add a new student. The wizard guides you through all steps: identity, training, mandatory OAC documents.",
        },
        planning: {
          title: "Manage Your Lessons",
          content:
            "The schedule centralizes all practical lessons and theory courses. Drag & drop to move, filters by instructor or vehicle.",
        },
        invoices: {
          title: "Simplified Billing",
          content:
            "Create compliant invoices with automatic Swiss QR-bill. Track payments, reminders and accounting exports.",
        },
        analytics: {
          title: "Analytics and Reports",
          content:
            "Analyze your driving school performance: success rate, revenue, vehicle utilization. Export your reports as PDF/Excel.",
        },
        settings: {
          title: "Customize Viamentor",
          content:
            "Configure your rates, opening hours, email templates, and all your driving school settings.",
        },
        final: {
          title: "You're Ready!",
          content:
            "You now master the basics of Viamentor. Explore at your own pace, our support is available 24/7 if needed.",
        },
      },
    },

    instructor: {
      title: "Welcome Instructor!",
      steps: {
        dashboard: {
          title: "Your Today's Lessons",
          content:
            "View your daily schedule with all details: student, time, vehicle, meeting location.",
        },
        students: {
          title: "Your Assigned Students",
          content:
            "Find the complete list of your students with their pedagogical progress, upcoming lessons and history.",
        },
        evaluation: {
          title: "Mandatory OAC Evaluation",
          content:
            "After each lesson, evaluate skills according to L-drive themes. This is a legal requirement for traceability.",
        },
        planning: {
          title: "Your Availability",
          content:
            "Manage your available time slots, vacations and absences. The system automatically blocks bookings during your unavailability.",
        },
        profile: {
          title: "Profile and Settings",
          content:
            "Update your contact details, category authorizations, and notification preferences.",
        },
        final: {
          title: "Safe Driving!",
          content:
            "You're ready to use Viamentor. Good training to your students!",
        },
      },
    },

    student: {
      title: "Welcome Student!",
      steps: {
        dashboard: {
          title: "Your Progress",
          content:
            "Track your advancement visually: hours completed, pedagogical goals, next step towards the exam.",
        },
        booking: {
          title: "Book Your Lessons",
          content:
            "Book your driving lessons independently. Choose your instructor, date, time and meeting location.",
        },
        progression: {
          title: "Pedagogical Tracker",
          content:
            "View your detailed evaluations by L-drive theme. Identify your strengths and areas for improvement.",
        },
        invoices: {
          title: "Your Invoices",
          content:
            "Access all your invoices, packages and payments. Download QR-bills to pay easily.",
        },
        profile: {
          title: "Documents and Profile",
          content:
            "Upload your mandatory documents (learner's permit, photo, etc.) and update your contact details.",
        },
      },
    },

    secretary: {
      title: "Welcome Secretary!",
      steps: {
        tasks: {
          title: "Daily Tasks",
          content:
            "Prioritize your daily tasks: registrations to finalize, calls to make, documents to verify.",
        },
        registration: {
          title: "Quick Registration",
          content:
            "Optimized registration wizard to quickly register new students by phone or at the counter.",
        },
        planning: {
          title: "Schedule Coordination",
          content:
            "Global view of the schedule to coordinate instructors, vehicles and theory course rooms.",
        },
        messages: {
          title: "Communications",
          content:
            "Internal messaging to communicate with instructors and students. Email templates to save time.",
        },
        students: {
          title: "Student Database",
          content:
            "Quickly search for a student, view their complete file, edit their information.",
        },
        final: {
          title: "All Set!",
          content:
            "You master the essential tools for your daily work. Have a great day!",
        },
      },
    },
  },
};

/**
 * Helper pour récupérer les traductions d'un tour
 */
export function getTourTranslations(
  role: "schoolAdmin" | "instructor" | "student" | "secretary",
  locale: SupportedLocale = "fr"
): ToursTranslations[typeof role] & {
  navigation: ToursTranslations["navigation"];
  options: ToursTranslations["options"];
} {
  const translations = TOURS_I18N[locale];
  return {
    ...translations[role],
    navigation: translations.navigation,
    options: translations.options,
  };
}

export type { ToursTranslations };
