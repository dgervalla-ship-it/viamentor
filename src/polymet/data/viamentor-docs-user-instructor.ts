/**
 * VIAMENTOR - Guide Utilisateur Instructor
 * Documentation complète pour les moniteurs d'auto-école
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * Bienvenue dans le guide utilisateur Instructor !
 *
 * Ce guide couvre toutes les fonctionnalités disponibles pour les
 * moniteurs d'auto-école.
 *
 * Version: 1.0.0
 * Rôle: Instructor
 * Permissions: Gestion leçons et élèves assignés
 */

// ============================================================================
// 📊 DASHBOARD MONITEUR
// ============================================================================

export const DASHBOARD_GUIDE = {
  title: "Dashboard Moniteur",
  route: "/instructor/dashboard",
  description: "Vue d'ensemble de votre journée",

  sections: {
    // Leçons du jour
    todayLessons: {
      title: "Mes Leçons du Jour",
      info: [
        "Horaires précis",
        "Élèves assignés",
        "Véhicules utilisés",
        "Lieux de rendez-vous",
      ],

      actions: [
        "Voir détails leçon",
        "Contacter l'élève",
        "Marquer comme complétée",
        "Annuler si nécessaire",
      ],
    },

    // Élèves assignés
    myStudents: {
      title: "Mes Élèves",
      info: [
        "Nombre d'élèves actifs",
        "Progression moyenne",
        "Prochains examens",
        "Alertes importantes",
      ],

      actions: [
        "Voir profil élève",
        "Consulter progression",
        "Planifier leçon",
        "Ajouter évaluation",
      ],
    },

    // Statistiques
    stats: {
      title: "Mes Statistiques",
      metrics: [
        "Heures enseignées ce mois",
        "Taux de réussite examens",
        "Satisfaction élèves",
        "Revenus générés",
      ],
    },
  },

  tips: [
    "Consultez votre planning chaque matin",
    "Préparez vos leçons à l'avance",
    "Mettez à jour les évaluations rapidement",
  ],
};

// ============================================================================
// 📅 PLANNING PERSONNEL
// ============================================================================

export const PLANNING_GUIDE = {
  title: "Mon Planning",
  route: "/instructor/planning",
  description: "Gérer votre planning personnel",

  views: {
    // Vue jour
    dayView: {
      title: "Vue Jour",
      features: [
        "Toutes les leçons du jour",
        "Horaires détaillés",
        "Temps de trajet",
        "Pauses",
      ],

      tips: [
        "Vérifiez les lieux de rendez-vous",
        "Prévoyez du temps pour les trajets",
        "Respectez vos pauses",
      ],
    },

    // Vue semaine
    weekView: {
      title: "Vue Semaine",
      features: [
        "Planning hebdomadaire",
        "Charge de travail",
        "Disponibilités",
        "Conflits potentiels",
      ],

      tips: [
        "Planifiez votre semaine le dimanche",
        "Équilibrez votre charge de travail",
        "Bloquez du temps pour les évaluations",
      ],
    },
  },

  workflows: {
    // Gérer disponibilités
    availability: {
      title: "Gérer mes Disponibilités",
      steps: [
        {
          step: 1,
          title: "Horaires Réguliers",
          description: "Définir vos horaires de travail habituels",
          example: "Lun-Ven 8h-18h, Sam 8h-12h",
        },
        {
          step: 2,
          title: "Exceptions",
          description: "Ajouter congés et indisponibilités",
          types: ["Congés", "Rendez-vous", "Formation", "Maladie"],
        },
        {
          step: 3,
          title: "Validation",
          description: "Vérifier et confirmer",
          tips: [
            "Planifiez vos congés à l'avance",
            "Informez l'école rapidement",
            "Vérifiez les leçons déjà planifiées",
          ],
        },
      ],
    },

    // Gérer une leçon
    manageLesson: {
      title: "Gérer une Leçon",
      actions: [
        {
          name: "Voir détails",
          description: "Consulter toutes les informations",
        },
        {
          name: "Contacter élève",
          description: "Appeler ou envoyer un message",
        },
        {
          name: "Modifier",
          description: "Changer horaire ou lieu",
          warning: "Prévenez l'élève rapidement",
        },
        {
          name: "Annuler",
          description: "Annuler avec raison",
          warning: "Proposez une alternative",
        },
        {
          name: "Compléter",
          description: "Marquer comme terminée",
          required: "Ajoutez une évaluation",
        },
      ],
    },
  },
};

// ============================================================================
// 👥 MES ÉLÈVES
// ============================================================================

export const STUDENTS_GUIDE = {
  title: "Mes Élèves",
  route: "/instructor/students",
  description: "Gérer vos élèves assignés",

  features: {
    // Liste élèves
    studentsList: {
      title: "Liste de mes Élèves",
      info: [
        "Nom et photo",
        "Catégorie de permis",
        "Heures effectuées",
        "Progression",
        "Prochain examen",
      ],

      filters: ["Tous", "Actifs", "Prêts pour examen", "En difficulté"],
    },

    // Profil élève
    studentProfile: {
      title: "Profil Élève",
      tabs: [
        {
          name: "Informations",
          content: [
            "Données personnelles",
            "Coordonnées",
            "Catégorie",
            "Date de début",
          ],
        },
        {
          name: "Progression",
          content: [
            "Heures effectuées",
            "Compétences acquises",
            "Points à améliorer",
            "Objectifs",
          ],
        },
        {
          name: "Historique",
          content: ["Toutes les leçons", "Évaluations", "Incidents", "Notes"],
        },
      ],

      actions: [
        "Planifier leçon",
        "Ajouter évaluation",
        "Envoyer message",
        "Voir documents",
      ],
    },
  },

  workflows: {
    // Évaluer un élève
    evaluate: {
      title: "Évaluer un Élève",
      when: "Après chaque leçon",
      sections: [
        {
          name: "Compétences Techniques",
          items: [
            "Maîtrise du véhicule",
            "Observation",
            "Anticipation",
            "Respect des règles",
          ],

          scale: "1-5 étoiles",
        },
        {
          name: "Comportement",
          items: [
            "Concentration",
            "Confiance",
            "Stress management",
            "Progression",
          ],

          scale: "1-5 étoiles",
        },
        {
          name: "Commentaires",
          description: "Notes détaillées sur la leçon",
          tips: [
            "Soyez constructif",
            "Mentionnez les points positifs",
            "Donnez des conseils concrets",
            "Fixez des objectifs pour la prochaine leçon",
          ],
        },
      ],
    },

    // Préparer à l'examen
    examPreparation: {
      title: "Préparer à l'Examen",
      checklist: [
        {
          item: "Heures minimales",
          requirement: "Minimum requis selon catégorie",
        },
        {
          item: "Compétences",
          requirement: "Toutes les compétences maîtrisées",
        },
        {
          item: "Conduite autonome",
          requirement: "Capable de conduire seul",
        },
        {
          item: "Confiance",
          requirement: "Élève se sent prêt",
        },
        {
          item: "Examen blanc",
          requirement: "Réussi avec succès",
        },
      ],

      tips: [
        "Ne précipitez pas l'inscription",
        "Faites un examen blanc",
        "Rassurez l'élève",
        "Donnez des conseils pratiques",
      ],
    },
  },
};

// ============================================================================
// 📝 ÉVALUATIONS
// ============================================================================

export const EVALUATIONS_GUIDE = {
  title: "Évaluations",
  route: "/instructor/evaluations",
  description: "Gérer les évaluations de vos élèves",

  types: {
    // Évaluation de leçon
    lessonEvaluation: {
      title: "Évaluation de Leçon",
      when: "Après chaque leçon",
      duration: "5 minutes",
      sections: [
        "Compétences techniques",
        "Comportement",
        "Progression",
        "Commentaires",
        "Objectifs prochaine leçon",
      ],
    },

    // Évaluation périodique
    periodicEvaluation: {
      title: "Évaluation Périodique",
      when: "Tous les 10 cours",
      duration: "15 minutes",
      sections: [
        "Bilan général",
        "Évolution depuis dernière évaluation",
        "Points forts",
        "Points à améliorer",
        "Plan d'action",
      ],
    },

    // Évaluation pré-examen
    preExamEvaluation: {
      title: "Évaluation Pré-Examen",
      when: "Avant inscription examen",
      duration: "30 minutes",
      sections: [
        "Examen blanc complet",
        "Évaluation détaillée",
        "Recommandation",
        "Conseils pour l'examen",
      ],
    },
  },

  tips: [
    "Soyez toujours constructif",
    "Documentez précisément",
    "Partagez avec l'élève",
    "Suivez l'évolution dans le temps",
  ],
};

// ============================================================================
// 🔄 RATTRAPAGES
// ============================================================================

export const MAKEUPS_GUIDE = {
  title: "Rattrapages",
  route: "/instructor/makeups",
  description: "Gérer les crédits de rattrapage",

  overview: {
    title: "Vue d'Ensemble",
    info: [
      "Crédits disponibles par élève",
      "Dates d'expiration",
      "Historique des rattrapages",
      "Statistiques",
    ],
  },

  workflows: {
    // Accorder un crédit
    grantCredit: {
      title: "Accorder un Crédit",
      when: [
        "Annulation de votre part",
        "Problème véhicule",
        "Circonstances exceptionnelles",
      ],

      steps: [
        "Sélectionner l'élève",
        "Choisir la raison",
        "Définir la date d'expiration",
        "Confirmer",
      ],

      tips: [
        "Expliquez la raison à l'élève",
        "Définissez une date d'expiration raisonnable",
        "Documentez la situation",
      ],
    },

    // Utiliser un crédit
    useCredit: {
      title: "Utiliser un Crédit",
      when: "Lors de la réservation d'une leçon",
      process: [
        "Le crédit est automatiquement détecté",
        "Vous êtes informé lors de la réservation",
        "Le crédit est déduit après la leçon",
      ],
    },

    // Annuler un crédit
    cancelCredit: {
      title: "Annuler un Crédit",
      when: [
        "Crédit accordé par erreur",
        "Situation résolue autrement",
        "Demande de l'élève",
      ],

      warning: "Action irréversible, confirmez avec l'élève",
    },
  },
};

// ============================================================================
// 💬 COMMUNICATIONS
// ============================================================================

export const COMMUNICATIONS_GUIDE = {
  title: "Communications",
  route: "/instructor/messages",
  description: "Communiquer avec vos élèves",

  channels: {
    // Messagerie interne
    messaging: {
      title: "Messagerie Interne",
      features: [
        "Conversations privées",
        "Pièces jointes",
        "Historique complet",
        "Notifications",
      ],

      tips: [
        "Répondez rapidement",
        "Soyez professionnel",
        "Archivez les conversations importantes",
      ],
    },

    // Appels
    calls: {
      title: "Appels Téléphoniques",
      when: [
        "Urgences",
        "Annulations",
        "Discussions importantes",
        "Préparation examen",
      ],

      tips: [
        "Choisissez un moment approprié",
        "Préparez ce que vous voulez dire",
        "Prenez des notes",
      ],
    },

    // SMS
    sms: {
      title: "SMS",
      when: [
        "Rappels de leçons",
        "Confirmations rapides",
        "Informations urgentes",
      ],

      tips: [
        "Soyez concis",
        "Incluez les informations essentielles",
        "Évitez les abréviations",
      ],
    },
  },
};

// ============================================================================
// 📊 MES STATISTIQUES
// ============================================================================

export const STATISTICS_GUIDE = {
  title: "Mes Statistiques",
  route: "/instructor/performance",
  description: "Consulter vos performances",

  metrics: {
    // Performance
    performance: {
      title: "Performance",
      kpis: [
        "Taux de réussite examens",
        "Satisfaction élèves",
        "Heures enseignées",
        "Nombre d'élèves formés",
      ],
    },

    // Revenus
    revenue: {
      title: "Revenus",
      info: [
        "Revenus mensuels",
        "Évolution",
        "Répartition par catégorie",
        "Prévisions",
      ],
    },

    // Workload
    workload: {
      title: "Charge de Travail",
      metrics: [
        "Heures par semaine",
        "Nombre de leçons",
        "Temps de trajet",
        "Équilibre vie pro/perso",
      ],
    },
  },

  tips: [
    "Consultez vos stats régulièrement",
    "Identifiez vos points forts",
    "Travaillez sur vos points faibles",
    "Fixez-vous des objectifs",
  ],
};

// ============================================================================
// 💡 CONSEILS ET ASTUCES
// ============================================================================

export const TIPS_AND_TRICKS = {
  title: "Conseils et Astuces",

  teaching: {
    title: "Conseils Pédagogiques",
    tips: [
      "Adaptez votre enseignement à chaque élève",
      "Soyez patient et encourageant",
      "Expliquez clairement les erreurs",
      "Célébrez les progrès",
      "Créez un environnement de confiance",
    ],
  },

  safety: {
    title: "Sécurité",
    tips: [
      "Vérifiez toujours le véhicule avant",
      "Soyez vigilant en permanence",
      "Anticipez les situations dangereuses",
      "Gardez le contrôle du véhicule",
      "Respectez le code de la route",
    ],
  },

  efficiency: {
    title: "Efficacité",
    tips: [
      "Planifiez vos trajets intelligemment",
      "Préparez vos leçons à l'avance",
      "Utilisez les temps morts",
      "Documentez rapidement",
      "Communiquez efficacement",
    ],
  },
};

// ============================================================================
// ❓ FAQ
// ============================================================================

export const FAQ = {
  title: "Questions Fréquentes",

  questions: [
    {
      q: "Comment voir mon planning ?",
      a: "Dashboard > Mon Planning ou Instructor > Planning",
    },
    {
      q: "Comment évaluer un élève ?",
      a: "Après la leçon > Marquer complétée > Ajouter évaluation",
    },
    {
      q: "Comment gérer mes disponibilités ?",
      a: "Instructor > Planning > Gérer disponibilités",
    },
    {
      q: "Comment accorder un crédit de rattrapage ?",
      a: "Instructor > Rattrapages > Accorder crédit > Sélectionner élève",
    },
    {
      q: "Comment contacter un élève ?",
      a: "Profil élève > Actions > Envoyer message ou Appeler",
    },
  ],
};

export const INSTRUCTOR_GUIDE_VERSION = "1.0.0";
export const INSTRUCTOR_GUIDE_LAST_UPDATE = "2025-01-20";
