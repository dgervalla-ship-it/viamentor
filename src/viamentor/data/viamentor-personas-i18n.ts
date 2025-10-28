/**
 * VIAMENTOR - Personas Pages i18n
 * Traductions FR/DE/IT/EN pour pages personas (Auto-écoles, Moniteurs, Élèves)
 */

// ============================================================================
// TYPES
// ============================================================================

export type PersonasLocale = "fr" | "de" | "it" | "en";

interface PersonasTranslations {
  // Breadcrumb
  breadcrumb: {
    home: string;
    schools: string;
    instructors: string;
    students: string;
  };

  // Auto-écoles
  schools: {
    hero: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    why: {
      title: string;
      block1: {
        title: string;
        subtitle: string;
        benefits: string[];
      };
      block2: {
        title: string;
        subtitle: string;
        features: string[];
      };
      block3: {
        title: string;
        subtitle: string;
        certifications: string[];
      };
    };
    features: {
      title: string;
      tabs: {
        management: string;
        planning: string;
        billing: string;
        marketing: string;
        analytics: string;
      };
    };
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };

  // Moniteurs
  instructors: {
    hero: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    arguments: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };

  // Élèves
  students: {
    hero: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    arguments: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };

  // Common
  common: {
    learnMore: string;
    startFreeTrial: string;
    requestDemo: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<PersonasLocale, PersonasTranslations> = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      schools: "Pour Auto-écoles",
      instructors: "Pour Moniteurs",
      students: "Pour Élèves",
    },
    schools: {
      hero: {
        title: "Logiciel complet pour auto-écoles suisses",
        subtitle:
          "Gestion élèves, planning, facturation QR-factures - Conforme OAC/nLPD",
        ctaPrimary: "Essai gratuit 30 jours",
        ctaSecondary: "Demander une démo",
      },
      why: {
        title: "Pourquoi Viamentor pour votre école ?",
        block1: {
          title: "Gagnez 15h/semaine",
          subtitle: "Automatisation complète de votre gestion administrative",
          benefits: [
            "Inscriptions automatisées avec wizard 5 étapes",
            "Planning intelligent avec détection de conflits",
            "Facturation QR-factures en 1 clic",
            "Relances automatiques des impayés",
          ],
        },
        block2: {
          title: "Augmentez vos revenus +30%",
          subtitle: "Outils marketing et CRM intégrés",
          features: [
            "CRM prospects avec pipeline de conversion",
            "Campagnes marketing par emails",
            "Pixels tracking des conversions",
            "Analytics de performances détaillés",
          ],
        },
        block3: {
          title: "Conformité garantie 100%",
          subtitle: "Respect total des normes suisses",
          certifications: [
            "nLPD Swiss et RGPD européen",
            "Standards OAC officiels",
            "QR-factures et BVR suisses",
            "Multi-langues FR/DE/IT/EN",
          ],
        },
      },
      features: {
        title: "Fonctionnalités détaillées",
        tabs: {
          management: "Gestion",
          planning: "Planning",
          billing: "Facturation",
          marketing: "Marketing",
          analytics: "Analytics",
        },
      },
      faq: {
        title: "Questions fréquentes des auto-écoles",
        items: [
          {
            question: "Comment migrer depuis un autre logiciel ?",
            answer:
              "Import de vos données CSV/Excel gratuit - Support migration inclus - 0 perte de données garantie. Notre équipe vous accompagne à chaque étape.",
          },
          {
            question: "Quel est le coût réel total ?",
            answer:
              "Tarification transparente : à partir de 149 CHF/mois tout inclus - Pas de frais cachés - Annulation flexible sans engagement.",
          },
          {
            question: "Formation de l'équipe nécessaire ?",
            answer:
              "Onboarding guidé d'1h - Vidéos tutoriels disponibles - Support prioritaire - 95% d'autonomie dès le premier jour.",
          },
          {
            question: "Sécurité des données élèves ?",
            answer:
              "Hébergement Suisse Supabase - Encryption AES-256 - Backups quotidiens - RGPD/nLPD compliant avec audit externe certifié.",
          },
        ],
      },
    },
    instructors: {
      hero: {
        title: "Moniteurs : Concentrez-vous sur l'enseignement",
        subtitle: "Planning automatisé, revenus trackés, évaluations digitales",
        ctaPrimary: "Essayer gratuitement",
        ctaSecondary: "Voir la démo",
      },
      arguments: {
        title: "Pourquoi les moniteurs adorent Viamentor",
        items: [
          {
            title: "Planning personnel mobile",
            description:
              "App iOS et Android - Disponibilités et créneaux - Sync Google Calendar automatique bidirectionnel",
          },
          {
            title: "Revenus transparents",
            description:
              "Si indépendant : commission % ou forfait mensuel - Calcul automatique - Fair, équitable et transparent",
          },
          {
            title: "Évaluations simplifiées",
            description:
              "Formulaire rapide post-leçon - Thèmes L-drive OAC - Progression élève et suivi pédagogique structuré",
          },
          {
            title: "Moins d'admin, plus de pédagogie",
            description:
              "Automation complète - Réduction paperasse - Focus sur l'enseignement et la transmission de compétences",
          },
        ],
      },
      faq: {
        title: "Questions fréquentes des moniteurs",
        items: [
          {
            question: "Comment gérer mes disponibilités ?",
            answer:
              "Interface mobile intuitive - Sync bidirectionnel avec votre calendrier personnel - Notifications en temps réel des réservations.",
          },
          {
            question: "Comment sont calculés mes revenus ?",
            answer:
              "Dashboard transparent avec détail par leçon - Export comptable mensuel - Calcul automatique des commissions ou forfaits.",
          },
          {
            question: "Puis-je travailler pour plusieurs écoles ?",
            answer:
              "Oui, gestion multi-écoles dans une seule app - Planning unifié - Revenus séparés par école.",
          },
        ],
      },
    },
    students: {
      hero: {
        title: "Élèves : Réservez vos leçons en 2 clics",
        subtitle: "Planning en ligne, paiement sécurisé, progression visible",
        ctaPrimary: "Créer mon compte",
        ctaSecondary: "Voir comment ça marche",
      },
      arguments: {
        title: "Pourquoi les élèves choisissent Viamentor",
        items: [
          {
            title: "Réservation 24/7",
            description:
              "Autonomie totale - Flexibilité maximale - Accessible partout, toujours disponible",
          },
          {
            title: "Paiement moderne",
            description:
              "Carte bancaire, Twint, QR-facture - Sécurisé et encrypté - PCI-DSS compliant",
          },
          {
            title: "Progression claire",
            description:
              "Dashboard visuel - Thèmes maîtrisés - Objectifs et prochaines étapes guidées",
          },
          {
            title: "Documents centralisés",
            description:
              "Contrat, factures, certificats - Stockage cloud - Accessible sur tous vos appareils",
          },
        ],
      },
      faq: {
        title: "Questions fréquentes des élèves",
        items: [
          {
            question: "Comment réserver une leçon ?",
            answer:
              "Connexion à votre espace - Choix du moniteur et de l'horaire - Confirmation instantanée par email et SMS.",
          },
          {
            question: "Puis-je annuler une leçon ?",
            answer:
              "Oui, jusqu'à 24h avant - Annulation gratuite - Crédit automatique sur votre compte.",
          },
          {
            question: "Comment suivre ma progression ?",
            answer:
              "Dashboard personnalisé - Thèmes L-drive validés - Recommandations personnalisées pour progresser.",
          },
        ],
      },
    },
    common: {
      learnMore: "En savoir plus",
      startFreeTrial: "Démarrer l'essai gratuit",
      requestDemo: "Demander une démo",
    },
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      schools: "Für Fahrschulen",
      instructors: "Für Fahrlehrer",
      students: "Für Fahrschüler",
    },
    schools: {
      hero: {
        title: "Komplette Software für Schweizer Fahrschulen",
        subtitle:
          "Schülerverwaltung, Planung, QR-Rechnungen - OAC/nDSG konform",
        ctaPrimary: "30 Tage kostenlos testen",
        ctaSecondary: "Demo anfordern",
      },
      why: {
        title: "Warum Viamentor für Ihre Fahrschule?",
        block1: {
          title: "Sparen Sie 15h/Woche",
          subtitle: "Vollständige Automatisierung Ihrer Verwaltung",
          benefits: [
            "Automatisierte Anmeldungen mit 5-Schritt-Wizard",
            "Intelligente Planung mit Konflikterkennung",
            "QR-Rechnungen mit 1 Klick",
            "Automatische Mahnungen bei Zahlungsverzug",
          ],
        },
        block2: {
          title: "Steigern Sie Ihren Umsatz +30%",
          subtitle: "Integrierte Marketing- und CRM-Tools",
          features: [
            "CRM für Interessenten mit Conversion-Pipeline",
            "E-Mail-Marketing-Kampagnen",
            "Conversion-Tracking-Pixel",
            "Detaillierte Leistungsanalysen",
          ],
        },
        block3: {
          title: "100% Konformität garantiert",
          subtitle: "Vollständige Einhaltung Schweizer Normen",
          certifications: [
            "Schweizer nDSG und europäische DSGVO",
            "Offizielle OAC-Standards",
            "Schweizer QR-Rechnungen und ESR",
            "Mehrsprachig DE/FR/IT/EN",
          ],
        },
      },
      features: {
        title: "Detaillierte Funktionen",
        tabs: {
          management: "Verwaltung",
          planning: "Planung",
          billing: "Abrechnung",
          marketing: "Marketing",
          analytics: "Analysen",
        },
      },
      faq: {
        title: "Häufige Fragen von Fahrschulen",
        items: [
          {
            question: "Wie migriere ich von anderer Software?",
            answer:
              "Kostenloser Import Ihrer CSV/Excel-Daten - Migrations-Support inklusive - 0 Datenverlust garantiert. Unser Team begleitet Sie bei jedem Schritt.",
          },
          {
            question: "Was sind die tatsächlichen Gesamtkosten?",
            answer:
              "Transparente Preise: ab 149 CHF/Monat alles inklusive - Keine versteckten Gebühren - Flexible Kündigung ohne Verpflichtung.",
          },
          {
            question: "Ist eine Teamschulung erforderlich?",
            answer:
              "Geführtes 1h-Onboarding - Tutorial-Videos verfügbar - Priority-Support - 95% Autonomie ab dem ersten Tag.",
          },
          {
            question: "Sicherheit der Schülerdaten?",
            answer:
              "Schweizer Hosting Supabase - AES-256-Verschlüsselung - Tägliche Backups - DSGVO/nDSG-konform mit zertifiziertem externem Audit.",
          },
        ],
      },
    },
    instructors: {
      hero: {
        title: "Fahrlehrer: Konzentrieren Sie sich aufs Unterrichten",
        subtitle:
          "Automatisierte Planung, getrackte Einnahmen, digitale Bewertungen",
        ctaPrimary: "Kostenlos testen",
        ctaSecondary: "Demo ansehen",
      },
      arguments: {
        title: "Warum Fahrlehrer Viamentor lieben",
        items: [
          {
            title: "Persönliche mobile Planung",
            description:
              "iOS- und Android-App - Verfügbarkeiten und Zeitfenster - Automatische bidirektionale Google Calendar-Synchronisation",
          },
          {
            title: "Transparente Einnahmen",
            description:
              "Für Selbständige: Provision % oder Monatspauschale - Automatische Berechnung - Fair, gerecht und transparent",
          },
          {
            title: "Vereinfachte Bewertungen",
            description:
              "Schnelles Formular nach der Lektion - L-drive OAC-Themen - Strukturierte Schülerfortschritte und pädagogisches Tracking",
          },
          {
            title: "Weniger Verwaltung, mehr Pädagogik",
            description:
              "Vollständige Automatisierung - Reduzierter Papierkram - Fokus auf Unterricht und Kompetenzvermittlung",
          },
        ],
      },
      faq: {
        title: "Häufige Fragen von Fahrlehrern",
        items: [
          {
            question: "Wie verwalte ich meine Verfügbarkeiten?",
            answer:
              "Intuitive mobile Oberfläche - Bidirektionale Synchronisation mit Ihrem persönlichen Kalender - Echtzeit-Benachrichtigungen bei Buchungen.",
          },
          {
            question: "Wie werden meine Einnahmen berechnet?",
            answer:
              "Transparentes Dashboard mit Details pro Lektion - Monatlicher Buchhaltungsexport - Automatische Berechnung von Provisionen oder Pauschalen.",
          },
          {
            question: "Kann ich für mehrere Schulen arbeiten?",
            answer:
              "Ja, Multi-Schulen-Verwaltung in einer App - Einheitliche Planung - Getrennte Einnahmen pro Schule.",
          },
        ],
      },
    },
    students: {
      hero: {
        title: "Fahrschüler: Buchen Sie Ihre Lektionen in 2 Klicks",
        subtitle: "Online-Planung, sichere Zahlung, sichtbare Fortschritte",
        ctaPrimary: "Konto erstellen",
        ctaSecondary: "So funktioniert's",
      },
      arguments: {
        title: "Warum Fahrschüler Viamentor wählen",
        items: [
          {
            title: "Buchung 24/7",
            description:
              "Volle Autonomie - Maximale Flexibilität - Überall zugänglich, immer verfügbar",
          },
          {
            title: "Moderne Zahlung",
            description:
              "Kreditkarte, Twint, QR-Rechnung - Sicher und verschlüsselt - PCI-DSS-konform",
          },
          {
            title: "Klare Fortschritte",
            description:
              "Visuelles Dashboard - Beherrschte Themen - Geführte Ziele und nächste Schritte",
          },
          {
            title: "Zentralisierte Dokumente",
            description:
              "Vertrag, Rechnungen, Zertifikate - Cloud-Speicher - Auf allen Ihren Geräten zugänglich",
          },
        ],
      },
      faq: {
        title: "Häufige Fragen von Fahrschülern",
        items: [
          {
            question: "Wie buche ich eine Lektion?",
            answer:
              "Anmeldung in Ihrem Bereich - Auswahl von Fahrlehrer und Zeitpunkt - Sofortige Bestätigung per E-Mail und SMS.",
          },
          {
            question: "Kann ich eine Lektion stornieren?",
            answer:
              "Ja, bis 24h vorher - Kostenlose Stornierung - Automatische Gutschrift auf Ihrem Konto.",
          },
          {
            question: "Wie verfolge ich meine Fortschritte?",
            answer:
              "Personalisiertes Dashboard - Validierte L-drive-Themen - Personalisierte Empfehlungen zum Fortschritt.",
          },
        ],
      },
    },
    common: {
      learnMore: "Mehr erfahren",
      startFreeTrial: "Kostenlose Testversion starten",
      requestDemo: "Demo anfordern",
    },
  },
  it: {
    breadcrumb: {
      home: "Home",
      schools: "Per Autoscuole",
      instructors: "Per Istruttori",
      students: "Per Allievi",
    },
    schools: {
      hero: {
        title: "Software completo per autoscuole svizzere",
        subtitle:
          "Gestione allievi, pianificazione, fatturazione QR - Conforme OAC/nLPD",
        ctaPrimary: "Prova gratuita 30 giorni",
        ctaSecondary: "Richiedi demo",
      },
      why: {
        title: "Perché Viamentor per la tua autoscuola?",
        block1: {
          title: "Risparmia 15h/settimana",
          subtitle: "Automazione completa della gestione amministrativa",
          benefits: [
            "Iscrizioni automatizzate con wizard 5 passaggi",
            "Pianificazione intelligente con rilevamento conflitti",
            "Fatturazione QR in 1 clic",
            "Solleciti automatici insoluti",
          ],
        },
        block2: {
          title: "Aumenta i ricavi +30%",
          subtitle: "Strumenti marketing e CRM integrati",
          features: [
            "CRM prospect con pipeline conversione",
            "Campagne marketing via email",
            "Pixel tracking conversioni",
            "Analytics prestazioni dettagliati",
          ],
        },
        block3: {
          title: "Conformità garantita 100%",
          subtitle: "Rispetto totale norme svizzere",
          certifications: [
            "nLPD Svizzera e GDPR europeo",
            "Standard OAC ufficiali",
            "Fatture QR e BVR svizzeri",
            "Multi-lingua IT/FR/DE/EN",
          ],
        },
      },
      features: {
        title: "Funzionalità dettagliate",
        tabs: {
          management: "Gestione",
          planning: "Pianificazione",
          billing: "Fatturazione",
          marketing: "Marketing",
          analytics: "Analytics",
        },
      },
      faq: {
        title: "Domande frequenti autoscuole",
        items: [
          {
            question: "Come migrare da altro software?",
            answer:
              "Import dati CSV/Excel gratuito - Supporto migrazione incluso - 0 perdita dati garantita. Il nostro team vi accompagna ad ogni passo.",
          },
          {
            question: "Qual è il costo totale reale?",
            answer:
              "Prezzi trasparenti: da 149 CHF/mese tutto incluso - Nessun costo nascosto - Cancellazione flessibile senza vincoli.",
          },
          {
            question: "Formazione team necessaria?",
            answer:
              "Onboarding guidato 1h - Video tutorial disponibili - Supporto prioritario - 95% autonomia dal primo giorno.",
          },
          {
            question: "Sicurezza dati allievi?",
            answer:
              "Hosting Svizzera Supabase - Crittografia AES-256 - Backup giornalieri - GDPR/nLPD conforme con audit esterno certificato.",
          },
        ],
      },
    },
    instructors: {
      hero: {
        title: "Istruttori: Concentratevi sull'insegnamento",
        subtitle:
          "Pianificazione automatizzata, ricavi tracciati, valutazioni digitali",
        ctaPrimary: "Prova gratuita",
        ctaSecondary: "Vedi demo",
      },
      arguments: {
        title: "Perché gli istruttori amano Viamentor",
        items: [
          {
            title: "Pianificazione personale mobile",
            description:
              "App iOS e Android - Disponibilità e slot - Sync Google Calendar automatica bidirezionale",
          },
          {
            title: "Ricavi trasparenti",
            description:
              "Se indipendente: commissione % o forfait mensile - Calcolo automatico - Equo, giusto e trasparente",
          },
          {
            title: "Valutazioni semplificate",
            description:
              "Form rapido post-lezione - Temi L-drive OAC - Progressione allievo e tracking pedagogico strutturato",
          },
          {
            title: "Meno admin, più pedagogia",
            description:
              "Automazione completa - Riduzione burocrazia - Focus su insegnamento e trasmissione competenze",
          },
        ],
      },
      faq: {
        title: "Domande frequenti istruttori",
        items: [
          {
            question: "Come gestire le mie disponibilità?",
            answer:
              "Interfaccia mobile intuitiva - Sync bidirezionale con calendario personale - Notifiche real-time prenotazioni.",
          },
          {
            question: "Come sono calcolati i miei ricavi?",
            answer:
              "Dashboard trasparente con dettaglio per lezione - Export contabile mensile - Calcolo automatico commissioni o forfait.",
          },
          {
            question: "Posso lavorare per più scuole?",
            answer:
              "Sì, gestione multi-scuola in una sola app - Pianificazione unificata - Ricavi separati per scuola.",
          },
        ],
      },
    },
    students: {
      hero: {
        title: "Allievi: Prenota le tue lezioni in 2 clic",
        subtitle:
          "Pianificazione online, pagamento sicuro, progressione visibile",
        ctaPrimary: "Crea account",
        ctaSecondary: "Vedi come funziona",
      },
      arguments: {
        title: "Perché gli allievi scelgono Viamentor",
        items: [
          {
            title: "Prenotazione 24/7",
            description:
              "Autonomia totale - Flessibilità massima - Accessibile ovunque, sempre disponibile",
          },
          {
            title: "Pagamento moderno",
            description:
              "Carta, Twint, fattura QR - Sicuro e crittografato - PCI-DSS conforme",
          },
          {
            title: "Progressione chiara",
            description:
              "Dashboard visuale - Temi padroneggiati - Obiettivi e prossimi passi guidati",
          },
          {
            title: "Documenti centralizzati",
            description:
              "Contratto, fatture, certificati - Storage cloud - Accessibile su tutti i dispositivi",
          },
        ],
      },
      faq: {
        title: "Domande frequenti allievi",
        items: [
          {
            question: "Come prenotare una lezione?",
            answer:
              "Accesso al tuo spazio - Scelta istruttore e orario - Conferma istantanea via email e SMS.",
          },
          {
            question: "Posso cancellare una lezione?",
            answer:
              "Sì, fino a 24h prima - Cancellazione gratuita - Credito automatico sul tuo account.",
          },
          {
            question: "Come seguire la mia progressione?",
            answer:
              "Dashboard personalizzato - Temi L-drive validati - Raccomandazioni personalizzate per progredire.",
          },
        ],
      },
    },
    common: {
      learnMore: "Scopri di più",
      startFreeTrial: "Inizia prova gratuita",
      requestDemo: "Richiedi demo",
    },
  },
  en: {
    breadcrumb: {
      home: "Home",
      schools: "For Driving Schools",
      instructors: "For Instructors",
      students: "For Students",
    },
    schools: {
      hero: {
        title: "Complete software for Swiss driving schools",
        subtitle:
          "Student management, planning, QR invoicing - OAC/nLPD compliant",
        ctaPrimary: "30-day free trial",
        ctaSecondary: "Request demo",
      },
      why: {
        title: "Why Viamentor for your school?",
        block1: {
          title: "Save 15h/week",
          subtitle: "Complete automation of your administrative management",
          benefits: [
            "Automated registrations with 5-step wizard",
            "Intelligent planning with conflict detection",
            "QR invoicing in 1 click",
            "Automatic reminders for unpaid invoices",
          ],
        },
        block2: {
          title: "Increase revenue +30%",
          subtitle: "Integrated marketing and CRM tools",
          features: [
            "Prospect CRM with conversion pipeline",
            "Email marketing campaigns",
            "Conversion tracking pixels",
            "Detailed performance analytics",
          ],
        },
        block3: {
          title: "100% compliance guaranteed",
          subtitle: "Full compliance with Swiss standards",
          certifications: [
            "Swiss nLPD and European GDPR",
            "Official OAC standards",
            "Swiss QR invoices and BVR",
            "Multi-language EN/FR/DE/IT",
          ],
        },
      },
      features: {
        title: "Detailed features",
        tabs: {
          management: "Management",
          planning: "Planning",
          billing: "Billing",
          marketing: "Marketing",
          analytics: "Analytics",
        },
      },
      faq: {
        title: "Frequently asked questions from driving schools",
        items: [
          {
            question: "How to migrate from another software?",
            answer:
              "Free CSV/Excel data import - Migration support included - 0 data loss guaranteed. Our team guides you through every step.",
          },
          {
            question: "What is the total real cost?",
            answer:
              "Transparent pricing: from 149 CHF/month all inclusive - No hidden fees - Flexible cancellation without commitment.",
          },
          {
            question: "Team training required?",
            answer:
              "Guided 1h onboarding - Tutorial videos available - Priority support - 95% autonomy from day one.",
          },
          {
            question: "Student data security?",
            answer:
              "Swiss Supabase hosting - AES-256 encryption - Daily backups - GDPR/nLPD compliant with certified external audit.",
          },
        ],
      },
    },
    instructors: {
      hero: {
        title: "Instructors: Focus on teaching",
        subtitle: "Automated planning, tracked earnings, digital evaluations",
        ctaPrimary: "Try for free",
        ctaSecondary: "See demo",
      },
      arguments: {
        title: "Why instructors love Viamentor",
        items: [
          {
            title: "Personal mobile planning",
            description:
              "iOS and Android app - Availabilities and slots - Automatic bidirectional Google Calendar sync",
          },
          {
            title: "Transparent earnings",
            description:
              "If independent: commission % or monthly flat rate - Automatic calculation - Fair, equitable and transparent",
          },
          {
            title: "Simplified evaluations",
            description:
              "Quick post-lesson form - L-drive OAC themes - Structured student progression and pedagogical tracking",
          },
          {
            title: "Less admin, more pedagogy",
            description:
              "Complete automation - Reduced paperwork - Focus on teaching and skills transmission",
          },
        ],
      },
      faq: {
        title: "Frequently asked questions from instructors",
        items: [
          {
            question: "How to manage my availabilities?",
            answer:
              "Intuitive mobile interface - Bidirectional sync with your personal calendar - Real-time booking notifications.",
          },
          {
            question: "How are my earnings calculated?",
            answer:
              "Transparent dashboard with per-lesson details - Monthly accounting export - Automatic calculation of commissions or flat rates.",
          },
          {
            question: "Can I work for multiple schools?",
            answer:
              "Yes, multi-school management in one app - Unified planning - Separate earnings per school.",
          },
        ],
      },
    },
    students: {
      hero: {
        title: "Students: Book your lessons in 2 clicks",
        subtitle: "Online planning, secure payment, visible progress",
        ctaPrimary: "Create account",
        ctaSecondary: "See how it works",
      },
      arguments: {
        title: "Why students choose Viamentor",
        items: [
          {
            title: "24/7 booking",
            description:
              "Total autonomy - Maximum flexibility - Accessible everywhere, always available",
          },
          {
            title: "Modern payment",
            description:
              "Card, Twint, QR invoice - Secure and encrypted - PCI-DSS compliant",
          },
          {
            title: "Clear progress",
            description:
              "Visual dashboard - Mastered themes - Guided goals and next steps",
          },
          {
            title: "Centralized documents",
            description:
              "Contract, invoices, certificates - Cloud storage - Accessible on all your devices",
          },
        ],
      },
      faq: {
        title: "Frequently asked questions from students",
        items: [
          {
            question: "How to book a lesson?",
            answer:
              "Login to your space - Choose instructor and time - Instant confirmation by email and SMS.",
          },
          {
            question: "Can I cancel a lesson?",
            answer:
              "Yes, up to 24h before - Free cancellation - Automatic credit to your account.",
          },
          {
            question: "How to track my progress?",
            answer:
              "Personalized dashboard - Validated L-drive themes - Personalized recommendations to progress.",
          },
        ],
      },
    },
    common: {
      learnMore: "Learn more",
      startFreeTrial: "Start free trial",
      requestDemo: "Request demo",
    },
  },
};

// ============================================================================
// HELPER FUNCTION
// ============================================================================

export function getPersonasTranslations(
  locale: PersonasLocale = "fr"
): PersonasTranslations {
  return translations[locale] || translations.fr;
}
