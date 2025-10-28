/**
 * VIAMENTOR - Marketing i18n
 * Traductions FR/DE/IT/EN pour homepage marketing et landing pages
 */

// ============================================================================
// TYPES
// ============================================================================

export type MarketingLocale = "fr" | "de" | "it" | "en";

interface MarketingTranslations {
  nav: {
    logo: string;
    forSchools: string;
    forInstructors: string;
    forStudents: string;
    pricing: string;
    demo: string;
    resources: {
      title: string;
      blog: string;
      blogDesc: string;
      faq: string;
      faqDesc: string;
      caseStudies: string;
      caseStudiesDesc: string;
      integrations: string;
      integrationsDesc: string;
    };
    login: string;
    freeTrial: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustBadge: string;
    rating: string;
  };
  benefits: {
    title: string;
    timeSaving: {
      title: string;
      stat: string;
      description: string;
    };
    revenue: {
      title: string;
      stat: string;
      description: string;
      badge: string;
    };
    compliance: {
      title: string;
      stat: string;
      description: string;
    };
    card1: {
      title: string;
      description: string;
    };
    card2: {
      title: string;
      description: string;
    };
    card3: {
      title: string;
      description: string;
    };
  };
  cta: {
    startFreeTrial: string;
    watchDemo: string;
    getStarted: string;
    learnMore: string;
    bookLesson: string;
    viewDemo: string;
  };
  benefits: {
    title: string;
    card1: {
      title: string;
      description: string;
    };
    card2: {
      title: string;
      description: string;
    };
    card3: {
      title: string;
      description: string;
    };
  };
  features: {
    title: string;
    planning: string;
    qrInvoices: string;
    crm: string;
    analytics: string;
    mobileApp: string;
  };
  personas: {
    title: string;
    schools: {
      title: string;
      cta: string;
      hero: {
        title: string;
        subtitle: string;
      };
      arguments: {
        title: string;
        subtitle: string;
        timeSaving: string[];
        revenue: string[];
        compliance: string[];
      };
      features: {
        title: string;
        subtitle: string;
        tabs: {
          management: string;
          planning: string;
          billing: string;
          marketing: string;
          analytics: string;
        };
        management: Array<{ title: string; description: string }>;
        planning: Array<{ title: string; description: string }>;
        billing: Array<{ title: string; description: string }>;
        marketing: Array<{ title: string; description: string }>;
        analytics: Array<{ title: string; description: string }>;
      };
      faq: {
        title: string;
        subtitle: string;
        items: Array<{ question: string; answer: string }>;
      };
    };
    instructors: {
      title: string;
      cta: string;
      hero: {
        badge: string;
        title: string;
        subtitle: string;
        mobile: string;
        sync: string;
      };
      arguments: {
        title: string;
        subtitle: string;
        planning: {
          title: string;
          description: string;
          features: string[];
        };
        revenue: {
          title: string;
          description: string;
          features: string[];
        };
        evaluations: {
          title: string;
          description: string;
          features: string[];
        };
        automation: {
          title: string;
          description: string;
          features: string[];
        };
      };
      benefits: {
        title: string;
        subtitle: string;
        items: Array<{ title: string; description: string; points: string[] }>;
      };
      testimonials: {
        title: string;
        subtitle: string;
        items: Array<{ quote: string; name: string; role: string }>;
      };
      finalCta: {
        title: string;
        subtitle: string;
        free: string;
      };
    };
    students: {
      title: string;
      cta: string;
      hero: {
        badge: string;
        title: string;
        subtitle: string;
        available: string;
        secure: string;
        appTitle: string;
      };
      arguments: {
        title: string;
        subtitle: string;
        booking: {
          title: string;
          description: string;
          features: string[];
        };
        payment: {
          title: string;
          description: string;
          features: string[];
        };
        progression: {
          title: string;
          description: string;
          features: string[];
        };
        documents: {
          title: string;
          description: string;
          features: string[];
        };
      };
      howItWorks: {
        title: string;
        subtitle: string;
        steps: Array<{ title: string; description: string }>;
      };
      benefits: {
        title: string;
        subtitle: string;
        items: Array<{ title: string; description: string; points: string[] }>;
      };
      testimonials: {
        title: string;
        subtitle: string;
        items: Array<{ quote: string; name: string; category: string }>;
      };
      finalCta: {
        title: string;
        subtitle: string;
        easy: string;
      };
    };
  };
  socialProof: {
    title: string;
  };
  finalCta: {
    title: string;
    button: string;
  };
  footer: {
    product: string;
    resources: string;
    legal: string;
    contact: string;
    copyright: string;
    madeInSwitzerland: string;
  };
  pricing: {
    hero: {
      title: string;
      subtitle: string;
    };
    billing: {
      monthly: string;
      annual: string;
      save: string;
    };
    plans: {
      starter: {
        name: string;
        tagline: string;
        price: string;
        features: string[];
        cta: string;
      };
      professional: {
        name: string;
        tagline: string;
        badge: string;
        price: string;
        features: string[];
        cta: string;
      };
      enterprise: {
        name: string;
        tagline: string;
        price: string;
        features: string[];
        cta: string;
      };
    };
    comparison: {
      title: string;
      subtitle: string;
    };
    faq: {
      title: string;
      items: Array<{ question: string; answer: string }>;
    };
  };
  demo: {
    hero: {
      title: string;
      subtitle: string;
    };
    video: {
      chapters: Array<{ time: string; title: string }>;
    };
    requestDemo: {
      title: string;
      name: string;
      email: string;
      phone: string;
      schoolSize: string;
      needs: string;
      consent: string;
      submit: string;
    };
  };
  faq: {
    hero: {
      title: string;
      subtitle: string;
    };
    search: {
      placeholder: string;
    };
    categories: {
      general: string;
      features: string;
      pricing: string;
      technical: string;
      security: string;
      support: string;
    };
  };
  blog: {
    hero: {
      title: string;
      subtitle: string;
    };
    search: {
      placeholder: string;
    };
    filters: {
      title: string;
      categories: {
        news: string;
        management: string;
        regulations: string;
        marketing: string;
        success: string;
      };
    };
    article: {
      readMore: string;
      readingTime: string;
      relatedArticles: string;
      shareArticle: string;
    };
    cta: {
      title: string;
      button: string;
    };
  };
  resources: {
    hero: {
      title: string;
      subtitle: string;
    };
    types: {
      ebook: string;
      checklist: string;
      template: string;
      webinar: string;
    };
    download: {
      button: string;
      modalTitle: string;
      email: string;
      consent: string;
      submit: string;
    };
  };
  caseStudies: {
    hero: {
      title: string;
      subtitle: string;
    };
    stats: {
      students: string;
      timeReduction: string;
      satisfaction: string;
    };
    readFullStory: string;
  };
  legal: {
    nav: {
      terms: string;
      privacy: string;
      cookies: string;
      about: string;
    };
    terms: {
      title: string;
      updated: string;
      publisher: {
        title: string;
        company: string;
        address: string;
        uid: string;
        ide: string;
        rc: string;
        email: string;
        phone: string;
      };
      hosting: {
        title: string;
        provider: string;
      };
      director: {
        title: string;
        name: string;
      };
      ip: {
        title: string;
        content: string;
      };
    };
    privacy: {
      title: string;
      updated: string;
      controller: {
        title: string;
        company: string;
        dpo: string;
      };
      dataCollected: {
        title: string;
        items: string[];
      };
      purposes: {
        title: string;
        items: string[];
      };
      retention: {
        title: string;
        active: string;
        inactive: string;
        logs: string;
        accounting: string;
      };
      rights: {
        title: string;
        access: string;
        rectification: string;
        deletion: string;
        portability: string;
        opposition: string;
        limitation: string;
      };
    };
    cookies: {
      title: string;
      updated: string;
      intro: string;
      table: {
        name: string;
        type: string;
        duration: string;
        provider: string;
        purpose: string;
        optout: string;
      };
      types: {
        essential: string;
        analytics: string;
        marketing: string;
      };
      banner: {
        title: string;
        message: string;
        acceptAll: string;
        rejectAll: string;
        customize: string;
      };
    };
    about: {
      hero: {
        title: string;
        mission: string;
      };
      story: {
        title: string;
        timeline: Array<{ year: string; title: string; description: string }>;
      };
      team: {
        title: string;
        subtitle: string;
        members: Array<{
          name: string;
          role: string;
          bio: string;
        }>;
      };
      values: {
        title: string;
        items: Array<{ title: string; description: string }>;
      };
    };
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<MarketingLocale, MarketingTranslations> = {
  fr: {
    blog: {
      hero: {
        title: "Actualités et conseils auto-écoles",
        subtitle: "Restez informés des nouveautés et meilleures pratiques",
      },
      search: {
        placeholder: "Rechercher un article...",
      },
      filters: {
        title: "Catégories",
        categories: {
          news: "Nouveautés produit",
          management: "Conseils gestion",
          regulations: "Réglementation OAC",
          marketing: "Marketing auto-école",
          success: "Success stories",
        },
      },
      article: {
        readMore: "Lire la suite",
        readingTime: "min de lecture",
        relatedArticles: "Lire aussi",
        shareArticle: "Partager l'article",
      },
      cta: {
        title: "Essayer ViaMenutor gratuitement",
        button: "Démarrer l'essai gratuit",
      },
    },
    resources: {
      hero: {
        title: "Ressources gratuites",
        subtitle:
          "Guides, templates et outils pour développer votre auto-école",
      },
      types: {
        ebook: "Ebook PDF",
        checklist: "Checklist",
        template: "Template Excel",
        webinar: "Webinar replay",
      },
      download: {
        button: "Télécharger gratuitement",
        modalTitle: "Télécharger la ressource",
        email: "Votre email professionnel",
        consent: "J'accepte de recevoir des emails de ViaMenutor",
        submit: "Télécharger maintenant",
      },
    },
    caseStudies: {
      hero: {
        title: "Ils ont transformé leur auto-école",
        subtitle: "Découvrez comment nos clients ont boosté leur activité",
      },
      stats: {
        students: "élèves inscrits",
        timeReduction: "admin",
        satisfaction: "satisfaction moniteurs",
      },
      readFullStory: "Lire l'étude complète",
    },
    nav: {
      logo: "ViaMenutor",
      forSchools: "Pour Auto-écoles",
      forInstructors: "Pour Moniteurs",
      forStudents: "Pour Élèves",
      pricing: "Tarifs",
      demo: "Démo",
      resources: {
        title: "Ressources",
        blog: "Blog",
        blogDesc: "Actualités et conseils",
        faq: "FAQ",
        faqDesc: "Questions fréquentes",
        caseStudies: "Cas clients",
        caseStudiesDesc: "Témoignages de réussite",
        integrations: "Intégrations",
        integrationsDesc: "Connectez vos outils",
      },
      login: "Connexion",
      freeTrial: "Essai gratuit",
    },
    hero: {
      title: "La plateforme #1 pour auto-écoles suisses",
      subtitle:
        "Gestion complète élèves, planning, facturation QR-factures - Conforme OAC/nLPD",
      ctaPrimary: "Démarrer gratuitement",
      ctaSecondary: "Voir démo vidéo",
      trustBadge: "500+ auto-écoles",
      rating: "4.9/5",
    },
    cta: {
      startFreeTrial: "Essai gratuit 30 jours",
      watchDemo: "Voir démo vidéo",
      getStarted: "Commencer maintenant",
      learnMore: "En savoir plus",
      bookLesson: "Réserver une leçon",
      viewDemo: "Voir la démo",
    },
    benefits: {
      title: "Pourquoi 500+ auto-écoles nous font confiance",
      timeSaving: {
        title: "Gain de temps",
        stat: "Gagnez 15h/semaine",
        description: "Automatisation complète des tâches répétitives",
      },
      revenue: {
        title: "Croissance",
        stat: "+30% revenus moyenne",
        description: "Optimisation et meilleure conversion",
        badge: "Revenus",
      },
      compliance: {
        title: "Conformité",
        stat: "100% conforme Swiss",
        description: "Respect total des normes suisses",
      },
      card1: {
        title: "Gagnez 15h/semaine",
        description:
          "Automatisation complète inscriptions, planning, facturation et relances",
      },
      card2: {
        title: "+30% revenus moyenne",
        description:
          "Optimisation planning, réduction annulations, meilleure conversion prospects",
      },
      card3: {
        title: "100% conforme Swiss",
        description:
          "Respect OAC, nLPD, QR-factures suisses - Hébergement données en Suisse",
      },
    },
    features: {
      title: "Tout ce dont vous avez besoin. Rien de superflu.",
      planning: "Planning intelligent avec détection conflits",
      qrInvoices: "QR-factures suisses automatiques",
      crm: "CRM prospects avec suivi conversions",
      analytics: "Analytics avancés et prévisions IA",
      mobileApp: "App mobile avec GPS temps réel",
    },
    personas: {
      title: "Pour qui ?",
      schools: {
        title: "Gérez votre école",
        cta: "En savoir plus",
        hero: {
          title: "Logiciel complet pour auto-écoles suisses",
          subtitle:
            "Gestion élèves, planning, facturation QR-factures - Conforme OAC/nLPD",
        },
        arguments: {
          title: "Pourquoi ViaMenutor pour votre école ?",
          subtitle: "Des résultats concrets et mesurables dès le premier mois",
          timeSaving: [
            "Inscriptions automatisées avec wizard 5 étapes",
            "Planning intelligent avec détection conflits",
            "Facturation QR-factures en 1 clic",
            "Relances automatiques des impayés",
          ],

          revenue: [
            "CRM prospects avec pipeline visuel",
            "Campagnes marketing par email",
            "Pixels tracking des conversions",
            "Analytics de performance détaillés",
          ],

          compliance: [
            "nLPD Swiss RGPD compliant",
            "Standards OAC respectés",
            "QR-factures BVR suisses",
            "Multi-langues FR/DE/IT/EN",
          ],
        },
        features: {
          title: "Fonctionnalités détaillées",
          subtitle: "Tout ce dont vous avez besoin pour gérer votre auto-école",
          tabs: {
            management: "Gestion",
            planning: "Planning",
            billing: "Facturation",
            marketing: "Marketing",
            analytics: "Analytics",
          },
          management: [
            {
              title: "Gestion élèves",
              description:
                "Dossiers complets avec documents, progression et historique",
            },
            {
              title: "Gestion moniteurs",
              description: "Planning, disponibilités et performance",
            },
            {
              title: "Gestion véhicules",
              description: "Maintenance, GPS et analytics utilisation",
            },
          ],

          planning: [
            {
              title: "Calendrier intelligent",
              description: "Détection automatique des conflits",
            },
            {
              title: "Réservations en ligne",
              description: "Élèves réservent 24/7 en autonomie",
            },
            {
              title: "Synchronisation",
              description: "Google Calendar, Outlook, iCal",
            },
          ],

          billing: [
            {
              title: "QR-factures",
              description: "Génération automatique conforme BVR",
            },
            {
              title: "Paiements",
              description: "Carte, Twint, virement, espèces",
            },
            {
              title: "Relances",
              description: "Automatisation des rappels impayés",
            },
          ],

          marketing: [
            {
              title: "CRM prospects",
              description: "Pipeline visuel et suivi conversions",
            },
            {
              title: "Campagnes email",
              description: "Templates professionnels personnalisables",
            },
            {
              title: "Tracking pixels",
              description: "Google Analytics, Facebook Pixel",
            },
          ],

          analytics: [
            {
              title: "Tableaux de bord",
              description: "KPIs temps réel et prévisions",
            },
            {
              title: "Rapports",
              description: "Financiers, pédagogiques, opérationnels",
            },
            { title: "Exports", description: "Excel, PDF, comptabilité" },
          ],
        },
        faq: {
          title: "Questions fréquentes des écoles",
          subtitle: "Toutes les réponses à vos questions",
          items: [
            {
              question: "Migration depuis un autre logiciel ?",
              answer:
                "Import de données CSV/Excel gratuit - Support migration inclus - 0 perte de données garantie. Notre équipe vous accompagne étape par étape.",
            },
            {
              question: "Quel est le coût réel total ?",
              answer:
                "Tarification transparente à partir de 149 CHF/mois tout inclus - Pas de frais cachés - Annulation flexible sans engagement. Essai gratuit 30 jours.",
            },
            {
              question: "Formation de l'équipe nécessaire ?",
              answer:
                "Onboarding guidé 1h - Vidéos tutoriels disponibles - Support prioritaire inclus - 95% d'autonomie dès le premier jour.",
            },
            {
              question: "Sécurité des données élèves ?",
              answer:
                "Hébergement Suisse Supabase - Encryption AES-256 - Backups quotidiens automatiques - RGPD/nLPD compliant avec audit externe certifié.",
            },
          ],
        },
      },
      instructors: {
        title: "Optimisez votre temps",
        cta: "En savoir plus",
        hero: {
          badge: "Pour moniteurs",
          title: "Concentrez-vous sur l'enseignement",
          subtitle:
            "Planning automatisé, revenus trackés, évaluations digitales",
          mobile: "App iOS & Android",
          sync: "Sync Google Calendar",
        },
        arguments: {
          title: "Pourquoi les moniteurs adorent ViaMenutor",
          subtitle: "Moins d'administratif, plus de pédagogie",
          planning: {
            title: "Planning personnel mobile",
            description: "Gérez vos disponibilités où que vous soyez",
            features: [
              "App mobile iOS et Android",
              "Disponibilités et créneaux",
              "Sync Google Calendar bidirectionnelle",
              "Notifications push temps réel",
            ],
          },
          revenue: {
            title: "Revenus transparents",
            description: "Suivez vos gains en temps réel",
            features: [
              "Commission % ou forfait mensuel",
              "Calcul automatique des revenus",
              "Historique détaillé",
              "Prévisions mensuelles",
            ],
          },
          evaluations: {
            title: "Évaluations simplifiées",
            description: "Formulaires rapides post-leçon",
            features: [
              "Thèmes L-drive OAC",
              "Progression élève automatique",
              "Suivi pédagogique structuré",
              "Signatures digitales",
            ],
          },
          automation: {
            title: "Moins d'admin, plus de pédagogie",
            description: "Automatisation des tâches répétitives",
            features: [
              "Réduction paperasse 80%",
              "Focus sur l'enseignement",
              "Transmission de connaissances",
              "Passion et vocation",
            ],
          },
        },
        benefits: {
          title: "Les avantages concrets",
          subtitle: "Ce que vous gagnez au quotidien",
          items: [
            {
              title: "Gain de temps",
              description: "Économisez 10h/semaine sur l'administratif",
              points: [
                "Planning automatisé",
                "Évaluations rapides",
                "Moins de paperasse",
              ],
            },
            {
              title: "Meilleure organisation",
              description: "Tout centralisé dans une seule app",
              points: [
                "Calendrier unifié",
                "Documents accessibles",
                "Communication simplifiée",
              ],
            },
            {
              title: "Plus de revenus",
              description: "Optimisez votre planning et vos gains",
              points: [
                "Moins d'annulations",
                "Meilleur taux de remplissage",
                "Transparence financière",
              ],
            },
          ],
        },
        testimonials: {
          title: "Ce que disent les moniteurs",
          subtitle: "Témoignages authentiques",
          items: [
            {
              quote:
                "J'ai gagné 12h par semaine depuis que j'utilise ViaMenutor. Je peux enfin me concentrer sur l'enseignement.",
              name: "Marc Dubois",
              role: "Moniteur indépendant, Genève",
            },
            {
              quote:
                "L'app mobile est géniale. Je gère tout depuis mon téléphone entre deux leçons.",
              name: "Laura Schneider",
              role: "Monitrice, Zurich",
            },
            {
              quote:
                "Les évaluations digitales sont un vrai plus. Mes élèves adorent voir leur progression en temps réel.",
              name: "Thomas Weber",
              role: "Moniteur, Lausanne",
            },
          ],
        },
        finalCta: {
          title: "Prêt à simplifier votre quotidien ?",
          subtitle: "Rejoignez les 500+ moniteurs qui utilisent ViaMenutor",
          free: "Gratuit pour les moniteurs employés",
        },
      },
      students: {
        title: "Apprenez sereinement",
        cta: "En savoir plus",
        hero: {
          badge: "Pour élèves",
          title: "Réservez vos leçons en 2 clics",
          subtitle: "Planning en ligne, paiement sécurisé, progression visible",
          available: "Disponible 24/7",
          secure: "Paiement sécurisé",
          appTitle: "Mon Permis",
        },
        arguments: {
          title: "Pourquoi les élèves choisissent ViaMenutor",
          subtitle: "Une expérience moderne et intuitive",
          booking: {
            title: "Réservation 24/7",
            description: "Réservez quand vous voulez, où vous voulez",
            features: [
              "Autonomie totale",
              "Flexibilité maximale",
              "Disponibilité universelle",
              "Toujours accessible",
            ],
          },
          payment: {
            title: "Paiement moderne",
            description: "Tous les moyens de paiement acceptés",
            features: [
              "Carte bancaire",
              "Twint",
              "QR-facture",
              "Sécurisé PCI-DSS",
            ],
          },
          progression: {
            title: "Progression claire",
            description: "Visualisez votre avancement en temps réel",
            features: [
              "Dashboard visuel",
              "Thèmes maîtrisés",
              "Objectifs et prochaines étapes",
              "Guidance personnalisée",
            ],
          },
          documents: {
            title: "Documents centralisés",
            description: "Tous vos documents au même endroit",
            features: [
              "Contrat et factures",
              "Certificats et attestations",
              "Cloud storage sécurisé",
              "Accessible partout",
            ],
          },
        },
        howItWorks: {
          title: "Comment ça marche ?",
          subtitle: "Simple comme bonjour",
          steps: [
            {
              title: "Créez votre compte",
              description:
                "Inscription en 2 minutes avec vos informations de base",
            },
            {
              title: "Réservez vos leçons",
              description:
                "Choisissez votre moniteur, date et heure en quelques clics",
            },
            {
              title: "Suivez votre progression",
              description: "Dashboard personnalisé avec tous vos indicateurs",
            },
          ],
        },
        benefits: {
          title: "Les avantages pour vous",
          subtitle: "Une expérience d'apprentissage optimale",
          items: [
            {
              title: "Flexibilité totale",
              description: "Réservez selon votre emploi du temps",
              points: [
                "Planning adapté à vos contraintes",
                "Modification facile",
                "Rappels automatiques",
              ],
            },
            {
              title: "Suivi personnalisé",
              description: "Votre progression en temps réel",
              points: [
                "Évaluations après chaque leçon",
                "Recommandations personnalisées",
                "Objectifs clairs",
              ],
            },
            {
              title: "Tranquillité d'esprit",
              description: "Tout est géré pour vous",
              points: [
                "Paiements sécurisés",
                "Documents toujours accessibles",
                "Support réactif",
              ],
            },
          ],
        },
        testimonials: {
          title: "Ce que disent les élèves",
          subtitle: "Témoignages authentiques",
          items: [
            {
              quote:
                "Super pratique de pouvoir réserver mes leçons depuis mon téléphone. L'app est vraiment bien faite.",
              name: "Emma Martin",
              category: "Catégorie B",
            },
            {
              quote:
                "J'adore voir ma progression après chaque leçon. Ça me motive à continuer !",
              name: "Lucas Dubois",
              category: "Catégorie A1",
            },
            {
              quote:
                "Le paiement par Twint est tellement pratique. Plus besoin de penser aux factures.",
              name: "Sarah Weber",
              category: "Catégorie B",
            },
          ],
        },
        finalCta: {
          title: "Prêt à commencer votre formation ?",
          subtitle:
            "Rejoignez les milliers d'élèves qui apprennent avec ViaMenutor",
          easy: "Simple, rapide et sécurisé",
        },
      },
    },
    socialProof: {
      title: "Ils nous font confiance",
    },
    finalCta: {
      title: "Prêt à transformer votre auto-école ?",
      subtitle: "Rejoignez les 500+ écoles qui nous font confiance",
      button: "Démarrer maintenant",
      noCard: "Essai gratuit 30 jours - Sans carte bancaire",
    },
    footer: {
      product: "Produit",
      resources: "Ressources",
      legal: "Légal",
      contact: "Contact",
      copyright: "© 2025 ViaMenutor - Tous droits réservés",
      madeInSwitzerland: "Fait en Suisse 🇨🇭",
    },
    pricing: {
      hero: {
        title: "Tarifs transparents. Sans surprise.",
        subtitle:
          "Essai gratuit 30 jours - Annulation flexible - Support inclus",
      },
      billing: {
        monthly: "Mensuel",
        annual: "Annuel",
        save: "Économisez 20%",
      },
      plans: {
        starter: {
          name: "Starter",
          tagline: "Pour débuter",
          price: "149 CHF/mois",
          features: [
            "30 élèves maximum",
            "2 moniteurs",
            "Planning basique",
            "QR-factures suisses",
            "Support email",
          ],

          cta: "Commencer",
        },
        professional: {
          name: "Professional",
          tagline: "Recommandé",
          badge: "Populaire",
          price: "299 CHF/mois",
          features: [
            "100 élèves",
            "5 moniteurs",
            "Planning avancé avec détection conflits",
            "CRM prospects",
            "Campagnes marketing",
            "Analytics avancés",
            "Support prioritaire",
            "Multi-sites",
          ],

          cta: "Essayer gratuitement",
        },
        enterprise: {
          name: "Enterprise",
          tagline: "Sur mesure",
          price: "Prix sur demande",
          features: [
            "Élèves illimités",
            "Moniteurs illimités",
            "API access",
            "SSO SAML",
            "SLA 99.9%",
            "Account manager dédié",
            "Formation sur site",
            "White-label optionnel",
          ],

          cta: "Nous contacter",
        },
      },
      comparison: {
        title: "Comparer les fonctionnalités",
        subtitle: "Trouvez le plan qui correspond à vos besoins",
      },
      faq: {
        title: "Questions fréquentes sur les tarifs",
        items: [
          {
            question: "Y a-t-il des frais d'installation ou de setup ?",
            answer:
              "Aucun frais d'installation. Tout est inclus gratuitement avec un onboarding guidé par notre équipe.",
          },
          {
            question: "Y a-t-il un engagement de durée ?",
            answer:
              "Aucun engagement. Abonnement mensuel flexible avec annulation possible moyennant un préavis de 30 jours.",
          },
          {
            question: "Y a-t-il des frais supplémentaires cachés ?",
            answer:
              "Non, tout est inclus de manière transparente. Les mises à jour et nouvelles fonctionnalités sont gratuites.",
          },
          {
            question: "Proposez-vous des réductions pour plusieurs écoles ?",
            answer:
              "Oui, nous proposons des tarifs dégressifs pour les groupes d'écoles. Contactez-nous pour un devis personnalisé.",
          },
          {
            question: "Avez-vous une garantie satisfait ou remboursé ?",
            answer:
              "Oui, essai gratuit de 30 jours. Si vous n'êtes pas satisfait, remboursement intégral sans aucune question posée.",
          },
        ],
      },
    },
    demo: {
      hero: {
        title: "Découvrez ViaMenutor en action",
        subtitle: "Vidéo démo 4 min - Ou réservez une démo personnalisée",
      },
      video: {
        chapters: [
          { time: "0:30", title: "Inscription élève" },
          { time: "1:15", title: "Planning leçon" },
          { time: "2:00", title: "Facturation QR" },
          { time: "2:45", title: "Analytics" },
          { time: "3:30", title: "App mobile" },
        ],
      },
      requestDemo: {
        title: "Demander une démo personnalisée",
        name: "Nom complet",
        email: "Email professionnel",
        phone: "Téléphone",
        schoolSize: "Taille de votre école",
        needs: "Besoins spécifiques (optionnel)",
        consent: "J'accepte d'être contacté par ViaMenutor",
        submit: "Demander une démo",
      },
    },
    faq: {
      hero: {
        title: "Questions fréquentes",
        subtitle: "Trouvez rapidement vos réponses",
      },
      search: {
        placeholder: "Rechercher une question...",
      },
      categories: {
        general: "Général",
        features: "Fonctionnalités",
        pricing: "Tarifs",
        technical: "Technique",
        security: "Sécurité",
        support: "Support",
      },
    },
    legal: {
      nav: {
        terms: "Mentions légales",
        privacy: "Confidentialité",
        cookies: "Cookies",
        about: "À propos",
      },
      terms: {
        title: "Mentions légales",
        updated: "Dernière mise à jour: 15.01.2025",
        publisher: {
          title: "Éditeur",
          company: "ViaMenutor SA",
          address: "Route de Lausanne 45, 1202 Genève, Suisse",
          uid: "CHE-123.456.789 TVA",
          ide: "IDE CH-550.1.234.567-8",
          rc: "RC Genève CH-660-1234567-8",
          email: "contact@viamentor.ch",
          phone: "+41 22 123 45 67",
        },
        hosting: {
          title: "Hébergement",
          provider: "Supabase Inc. - Serveurs: Suisse (Zurich)",
        },
        director: {
          title: "Directeur de publication",
          name: "Jean Dupont, CEO",
        },
        ip: {
          title: "Propriété intellectuelle",
          content:
            "Copyright © 2025 ViaMenutor SA. Tous droits réservés. Les marques, logos, designs et code source sont protégés par les lois sur la propriété intellectuelle. Toute utilisation non autorisée est strictement interdite et fera l'objet de poursuites judiciaires.",
        },
      },
      privacy: {
        title: "Politique de confidentialité",
        updated: "Dernière mise à jour: 15.01.2025",
        controller: {
          title: "Responsable du traitement",
          company: "ViaMenutor SA",
          dpo: "Délégué à la protection des données: dpo@viamentor.ch",
        },
        dataCollected: {
          title: "Données collectées",
          items: [
            "Identité: nom, prénom, email, téléphone",
            "Données de connexion: adresse IP, logs, timestamps",
            "Données de paiement: carte bancaire (anonymisée via Stripe)",
            "Données d'utilisation: analytics anonymisées et agrégées",
          ],
        },
        purposes: {
          title: "Finalités du traitement",
          items: [
            "Exécution du contrat de service (Article 6.1.b RGPD)",
            "Consentement explicite de l'utilisateur (Article 6.1.a RGPD)",
            "Obligation légale: comptabilité et fiscalité (Article 6.1.c RGPD)",
            "Intérêt légitime: amélioration du service (Article 6.1.f RGPD)",
          ],
        },
        retention: {
          title: "Durée de conservation",
          active:
            "Comptes actifs: données conservées pendant toute la durée du contrat",
          inactive: "Comptes inactifs >2 ans: suppression automatique",
          logs: "Logs d'accès: 6 mois maximum",
          accounting: "Données comptables: 10 ans (obligation légale suisse)",
        },
        rights: {
          title: "Vos droits",
          access: "Droit d'accès à vos données",
          rectification: "Droit de rectification",
          deletion: "Droit à l'effacement",
          portability: "Droit à la portabilité",
          opposition: "Droit d'opposition",
          limitation: "Droit à la limitation du traitement",
        },
      },
      cookies: {
        title: "Politique de cookies",
        updated: "Dernière mise à jour: 15.01.2025",
        intro:
          "Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences à tout moment.",
        table: {
          name: "Nom",
          type: "Type",
          duration: "Durée",
          provider: "Fournisseur",
          purpose: "Finalité",
          optout: "Désactiver",
        },
        types: {
          essential: "Essentiel",
          analytics: "Analytique",
          marketing: "Marketing",
        },
        banner: {
          title: "Gestion des cookies",
          message:
            "Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. Vous pouvez accepter tous les cookies ou personnaliser vos préférences.",
          acceptAll: "Tout accepter",
          rejectAll: "Tout refuser",
          customize: "Personnaliser",
        },
      },
      about: {
        hero: {
          title: "Notre mission",
          mission:
            "Moderniser la formation à la conduite en Suisse en simplifiant la vie des auto-écoles, moniteurs et élèves grâce à la technologie.",
        },
        story: {
          title: "Notre histoire",
          timeline: [
            {
              year: "2023",
              title: "Fondation",
              description:
                "Identification du besoin de modernisation des auto-écoles suisses. Opportunité de marché confirmée par 50+ entretiens avec des directeurs d'écoles.",
            },
            {
              year: "2024",
              title: "Lancement beta",
              description:
                "50 écoles pilotes testent la plateforme. Feedback intensif, itérations rapides, améliorations continues basées sur les retours terrain.",
            },
            {
              year: "2025",
              title: "500+ écoles",
              description:
                "Croissance exponentielle, traction confirmée, momentum accéléré. Expansion dans toute la Suisse romande et alémanique.",
            },
          ],
        },
        team: {
          title: "Notre équipe",
          subtitle: "Des passionnés au service de votre réussite",
          members: [
            {
              name: "Jean Dupont",
              role: "CEO & Founder",
              bio: "15 ans d'expérience dans la tech. Passionné par l'innovation et la transformation digitale des PME suisses.",
            },
            {
              name: "Marie Martin",
              role: "CTO",
              bio: "Experte en architecture logicielle. Anciennement chez Google Zurich. Spécialiste sécurité et scalabilité.",
            },
            {
              name: "Thomas Weber",
              role: "Head of Product",
              bio: "Designer UX/UI primé. Obsédé par la simplicité et l'expérience utilisateur. Ancien Apple.",
            },
          ],
        },
        values: {
          title: "Nos valeurs",
          items: [
            {
              title: "Innovation",
              description:
                "Nous repoussons les limites de la technologie pour créer des solutions avant-gardistes qui transforment l'industrie.",
            },
            {
              title: "Qualité",
              description:
                "Excellence et standards élevés dans tout ce que nous faisons. Rigueur, exigence et perfectionnisme.",
            },
            {
              title: "Simplicité",
              description:
                "Interfaces intuitives et évidentes. Accessibilité universelle. Facilité d'utilisation pour tous.",
            },
            {
              title: "Transparence",
              description:
                "Honnêteté, ouverture et authenticité dans toutes nos relations. Communication claire et directe.",
            },
          ],
        },
      },
    },
  },
  de: {
    nav: {
      logo: "ViaMenutor",
      forSchools: "Für Fahrschulen",
      forInstructors: "Für Fahrlehrer",
      forStudents: "Für Fahrschüler",
      pricing: "Preise",
      demo: "Demo",
      resources: {
        title: "Ressourcen",
        blog: "Blog",
        blogDesc: "News und Tipps",
        faq: "FAQ",
        faqDesc: "Häufige Fragen",
        caseStudies: "Kundenreferenzen",
        caseStudiesDesc: "Erfolgsgeschichten",
        integrations: "Integrationen",
        integrationsDesc: "Verbinden Sie Ihre Tools",
      },
      login: "Anmelden",
      freeTrial: "Kostenlos testen",
    },
    hero: {
      title: "Die #1 Plattform für Schweizer Fahrschulen",
      subtitle:
        "Komplette Verwaltung Fahrschüler, Planung, QR-Rechnungen - OAC/nDSG konform",
      ctaPrimary: "Kostenlos starten",
      ctaSecondary: "Demo-Video ansehen",
      trustBadge: "500+ Fahrschulen",
      rating: "4.9/5",
    },
    cta: {
      startFreeTrial: "30 Tage kostenlos testen",
      watchDemo: "Demo-Video ansehen",
      getStarted: "Jetzt starten",
      learnMore: "Mehr erfahren",
      bookLesson: "Lektion buchen",
      viewDemo: "Demo ansehen",
    },
    benefits: {
      title: "Warum 500+ Fahrschulen uns vertrauen",
      card1: {
        title: "Sparen Sie 15h/Woche",
        description:
          "Vollständige Automatisierung Anmeldungen, Planung, Rechnungen und Mahnungen",
      },
      card2: {
        title: "+30% Umsatz im Durchschnitt",
        description:
          "Planungsoptimierung, weniger Stornierungen, bessere Interessenten-Konversion",
      },
      card3: {
        title: "100% Swiss konform",
        description:
          "OAC, nDSG, Schweizer QR-Rechnungen - Datenhosting in der Schweiz",
      },
    },
    features: {
      title: "Alles was Sie brauchen. Nichts Überflüssiges.",
      planning: "Intelligente Planung mit Konflikterkennung",
      qrInvoices: "Automatische Schweizer QR-Rechnungen",
      crm: "CRM Interessenten mit Conversion-Tracking",
      analytics: "Erweiterte Analytics und KI-Prognosen",
      mobileApp: "Mobile App mit Echtzeit-GPS",
    },
    personas: {
      title: "Für wen?",
      schools: {
        title: "Verwalten Sie Ihre Fahrschule",
        cta: "Mehr erfahren",
      },
      instructors: {
        title: "Optimieren Sie Ihre Zeit",
        cta: "Mehr erfahren",
      },
      students: {
        title: "Lernen Sie entspannt",
        cta: "Mehr erfahren",
      },
    },
    socialProof: {
      title: "Sie vertrauen uns",
    },
    finalCta: {
      title: "Bereit, Ihre Fahrschule zu transformieren?",
      button: "Jetzt starten",
    },
    footer: {
      product: "Produkt",
      resources: "Ressourcen",
      legal: "Rechtliches",
      contact: "Kontakt",
      copyright: "© 2025 ViaMenutor - Alle Rechte vorbehalten",
      madeInSwitzerland: "Made in Switzerland 🇨🇭",
    },
    pricing: {
      hero: { title: "", subtitle: "" },
      billing: { monthly: "", annual: "", save: "" },
      plans: {
        starter: { name: "", tagline: "", price: "", features: [], cta: "" },
        professional: {
          name: "",
          tagline: "",
          badge: "",
          price: "",
          features: [],
          cta: "",
        },
        enterprise: { name: "", tagline: "", price: "", features: [], cta: "" },
      },
      comparison: { title: "", subtitle: "" },
      faq: { title: "", items: [] },
    },
    demo: {
      hero: { title: "", subtitle: "" },
      video: { chapters: [] },
      requestDemo: {
        title: "",
        name: "",
        email: "",
        phone: "",
        schoolSize: "",
        needs: "",
        consent: "",
        submit: "",
      },
    },
    faq: {
      hero: { title: "", subtitle: "" },
      search: { placeholder: "" },
      categories: {
        general: "",
        features: "",
        pricing: "",
        technical: "",
        security: "",
        support: "",
      },
    },
    legal: {
      nav: {
        terms: "Impressum",
        privacy: "Datenschutz",
        cookies: "Cookies",
        about: "Über uns",
      },
      terms: {
        title: "Impressum",
        updated: "Letzte Aktualisierung: 15.01.2025",
        publisher: {
          title: "Herausgeber",
          company: "ViaMenutor SA",
          address: "Route de Lausanne 45, 1202 Genf, Schweiz",
          uid: "CHE-123.456.789 MWST",
          ide: "IDE CH-550.1.234.567-8",
          rc: "HR Genf CH-660-1234567-8",
          email: "contact@viamentor.ch",
          phone: "+41 22 123 45 67",
        },
        hosting: {
          title: "Hosting",
          provider: "Supabase Inc. - Server: Schweiz (Zürich)",
        },
        director: { title: "Verantwortlicher", name: "Jean Dupont, CEO" },
        ip: {
          title: "Geistiges Eigentum",
          content: "Copyright © 2025 ViaMenutor SA. Alle Rechte vorbehalten.",
        },
      },
      privacy: {
        title: "Datenschutzerklärung",
        updated: "Letzte Aktualisierung: 15.01.2025",
        controller: {
          title: "Verantwortlicher",
          company: "ViaMenutor SA",
          dpo: "Datenschutzbeauftragter: dpo@viamentor.ch",
        },
        dataCollected: { title: "Erhobene Daten", items: [] },
        purposes: { title: "Zwecke", items: [] },
        retention: {
          title: "Aufbewahrung",
          active: "",
          inactive: "",
          logs: "",
          accounting: "",
        },
        rights: {
          title: "Ihre Rechte",
          access: "",
          rectification: "",
          deletion: "",
          portability: "",
          opposition: "",
          limitation: "",
        },
      },
      cookies: {
        title: "Cookie-Richtlinie",
        updated: "Letzte Aktualisierung: 15.01.2025",
        intro: "",
        table: {
          name: "",
          type: "",
          duration: "",
          provider: "",
          purpose: "",
          optout: "",
        },
        types: { essential: "", analytics: "", marketing: "" },
        banner: {
          title: "",
          message: "",
          acceptAll: "",
          rejectAll: "",
          customize: "",
        },
      },
      about: {
        hero: { title: "Unsere Mission", mission: "" },
        story: { title: "Unsere Geschichte", timeline: [] },
        team: { title: "Unser Team", subtitle: "", members: [] },
        values: { title: "Unsere Werte", items: [] },
      },
    },
  },
  it: {
    nav: {
      logo: "ViaMenutor",
      forSchools: "Per Autoscuole",
      forInstructors: "Per Istruttori",
      forStudents: "Per Allievi",
      pricing: "Prezzi",
      demo: "Demo",
      resources: {
        title: "Risorse",
        blog: "Blog",
        blogDesc: "Notizie e consigli",
        faq: "FAQ",
        faqDesc: "Domande frequenti",
        caseStudies: "Casi clienti",
        caseStudiesDesc: "Storie di successo",
        integrations: "Integrazioni",
        integrationsDesc: "Collega i tuoi strumenti",
      },
      login: "Accedi",
      freeTrial: "Prova gratuita",
    },
    hero: {
      title: "La piattaforma #1 per autoscuole svizzere",
      subtitle:
        "Gestione completa allievi, pianificazione, fatturazione QR-fatture - Conforme OAC/nLPD",
      ctaPrimary: "Inizia gratuitamente",
      ctaSecondary: "Guarda video demo",
    },
    benefits: {
      title: "Perché 500+ autoscuole si fidano di noi",
      card1: {
        title: "Risparmia 15h/settimana",
        description:
          "Automazione completa iscrizioni, pianificazione, fatturazione e solleciti",
      },
      card2: {
        title: "+30% ricavi in media",
        description:
          "Ottimizzazione pianificazione, riduzione cancellazioni, migliore conversione prospect",
      },
      card3: {
        title: "100% conforme Swiss",
        description:
          "Rispetto OAC, nLPD, QR-fatture svizzere - Hosting dati in Svizzera",
      },
    },
    features: {
      title: "Tutto ciò di cui hai bisogno. Niente di superfluo.",
      planning: "Pianificazione intelligente con rilevamento conflitti",
      qrInvoices: "QR-fatture svizzere automatiche",
      crm: "CRM prospect con tracciamento conversioni",
      analytics: "Analytics avanzati e previsioni IA",
      mobileApp: "App mobile con GPS in tempo reale",
    },
    personas: {
      title: "Per chi?",
      schools: {
        title: "Gestisci la tua scuola",
        cta: "Scopri di più",
      },
      instructors: {
        title: "Ottimizza il tuo tempo",
        cta: "Scopri di più",
      },
      students: {
        title: "Impara serenamente",
        cta: "Scopri di più",
      },
    },
    socialProof: {
      title: "Si fidano di noi",
    },
    finalCta: {
      title: "Pronto a trasformare la tua autoscuola?",
      button: "Inizia ora",
    },
    footer: {
      product: "Prodotto",
      resources: "Risorse",
      legal: "Legale",
      contact: "Contatto",
      copyright: "© 2025 ViaMenutor - Tutti i diritti riservati",
      madeInSwitzerland: "Made in Switzerland 🇨🇭",
    },
  },
  en: {
    nav: {
      logo: "ViaMenutor",
      forSchools: "For Driving Schools",
      forInstructors: "For Instructors",
      forStudents: "For Students",
      pricing: "Pricing",
      demo: "Demo",
      resources: {
        title: "Resources",
        blog: "Blog",
        blogDesc: "News and tips",
        faq: "FAQ",
        faqDesc: "Frequently asked questions",
        caseStudies: "Case Studies",
        caseStudiesDesc: "Success stories",
        integrations: "Integrations",
        integrationsDesc: "Connect your tools",
      },
      login: "Login",
      freeTrial: "Free Trial",
    },
    hero: {
      title: "The #1 platform for Swiss driving schools",
      subtitle:
        "Complete student management, planning, QR-invoicing - OAC/nLPD compliant",
      ctaPrimary: "Start for free",
      ctaSecondary: "Watch demo video",
    },
    benefits: {
      title: "Why 500+ driving schools trust us",
      card1: {
        title: "Save 15h/week",
        description:
          "Complete automation of registrations, planning, invoicing and reminders",
      },
      card2: {
        title: "+30% revenue on average",
        description:
          "Planning optimization, reduced cancellations, better prospect conversion",
      },
      card3: {
        title: "100% Swiss compliant",
        description:
          "OAC, nLPD, Swiss QR-invoices compliant - Data hosting in Switzerland",
      },
    },
    features: {
      title: "Everything you need. Nothing superfluous.",
      planning: "Smart planning with conflict detection",
      qrInvoices: "Automatic Swiss QR-invoices",
      crm: "Prospect CRM with conversion tracking",
      analytics: "Advanced analytics and AI forecasting",
      mobileApp: "Mobile app with real-time GPS",
    },
    personas: {
      title: "For whom?",
      schools: {
        title: "Manage your school",
        cta: "Learn more",
      },
      instructors: {
        title: "Optimize your time",
        cta: "Learn more",
      },
      students: {
        title: "Learn peacefully",
        cta: "Learn more",
      },
    },
    socialProof: {
      title: "They trust us",
    },
    finalCta: {
      title: "Ready to transform your driving school?",
      button: "Start now",
    },
    footer: {
      product: "Product",
      resources: "Resources",
      legal: "Legal",
      contact: "Contact",
      copyright: "© 2025 ViaMenutor - All rights reserved",
      madeInSwitzerland: "Made in Switzerland 🇨🇭",
    },
  },
};

// ============================================================================
// HELPER FUNCTION
// ============================================================================

export function getMarketingTranslations(locale: MarketingLocale = "fr") {
  return translations[locale] || translations.fr;
}
