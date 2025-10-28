/**
 * VIAMENTOR - Guide Utilisateur Secretary
 * Documentation complète pour les secrétaires d'école de conduite
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * Bienvenue dans le guide utilisateur Secretary !
 *
 * Ce guide couvre toutes les fonctionnalités disponibles pour les
 * secrétaires d'école de conduite.
 *
 * Version: 1.0.0
 * Rôle: Secretary
 * Permissions: Gestion administrative et inscriptions
 */

// ============================================================================
// 📊 DASHBOARD SECRÉTARIAT
// ============================================================================

export const DASHBOARD_GUIDE = {
  title: "Dashboard Secrétariat",
  route: "/secretary/dashboard",
  description: "Vue d'ensemble de vos tâches quotidiennes",

  sections: {
    // Tâches du jour
    dailyTasks: {
      title: "Tâches du Jour",
      items: [
        "Inscriptions à traiter",
        "Appels à passer",
        "Emails à envoyer",
        "Documents à préparer",
      ],
    },

    // Activité récente
    recentActivity: {
      title: "Activité Récente",
      items: [
        "Nouvelles inscriptions",
        "Leçons réservées",
        "Messages reçus",
        "Documents générés",
      ],
    },

    // Actions rapides
    quickActions: {
      title: "Actions Rapides",
      items: [
        "Inscription rapide",
        "Réserver une leçon",
        "Rechercher un élève",
        "Voir le planning",
      ],
    },
  },

  tips: [
    "Consultez vos tâches chaque matin",
    "Priorisez les inscriptions urgentes",
    "Utilisez les actions rapides pour gagner du temps",
  ],
};

// ============================================================================
// 📝 INSCRIPTIONS RAPIDES
// ============================================================================

export const QUICK_REGISTRATION_GUIDE = {
  title: "Inscriptions Rapides",
  route: "/secretary/registrations",
  description: "Inscrire rapidement de nouveaux élèves",

  workflow: {
    title: "Processus d'Inscription Rapide",
    steps: [
      {
        step: 1,
        title: "Informations de Base",
        fields: [
          "Nom, Prénom",
          "Date de naissance",
          "Email, Téléphone",
          "Catégorie de permis",
        ],

        duration: "2 minutes",
      },
      {
        step: 2,
        title: "Documents Requis",
        checklist: [
          "Permis d'élève conducteur",
          "Cours de premiers secours",
          "Cours de sensibilisation",
          "Photo d'identité",
        ],

        tips: [
          "Vérifiez la validité des documents",
          "Scannez ou photographiez les documents",
          "Archivez dans le dossier élève",
        ],
      },
      {
        step: 3,
        title: "Assignation",
        fields: [
          "Moniteur disponible",
          "Date de début souhaitée",
          "Objectif d'examen",
        ],

        tips: [
          "Vérifiez les disponibilités du moniteur",
          "Proposez plusieurs dates",
          "Confirmez avec l'élève",
        ],
      },
      {
        step: 4,
        title: "Confirmation",
        actions: [
          "Envoyer email de bienvenue",
          "Créer le dossier élève",
          "Planifier première leçon",
          "Générer contrat",
        ],
      },
    ],
  },

  tips: [
    "Préparez tous les documents avant de commencer",
    "Utilisez les templates d'emails",
    "Confirmez toujours par téléphone",
    "Archivez les documents immédiatement",
  ],
};

// ============================================================================
// 🔍 RECHERCHE ÉLÈVES
// ============================================================================

export const STUDENTS_SEARCH_GUIDE = {
  title: "Recherche Élèves",
  route: "/secretary/students",
  description: "Rechercher et consulter les dossiers élèves",

  features: {
    // Recherche rapide
    quickSearch: {
      title: "Recherche Rapide",
      description: "Trouver un élève en quelques secondes",
      fields: ["Nom ou prénom", "Email", "Téléphone", "Numéro de dossier"],

      tips: [
        "Tapez au moins 3 caractères",
        "La recherche est insensible à la casse",
        "Utilisez * comme joker",
      ],
    },

    // Filtres avancés
    advancedFilters: {
      title: "Filtres Avancés",
      filters: [
        {
          name: "Statut",
          options: ["Actif", "En pause", "Terminé"],
        },
        {
          name: "Catégorie",
          options: ["B", "A1", "A", "C", "D"],
        },
        {
          name: "Moniteur",
          description: "Filtrer par moniteur assigné",
        },
        {
          name: "Date d'inscription",
          description: "Période d'inscription",
        },
      ],
    },

    // Actions disponibles
    actions: {
      title: "Actions Disponibles",
      items: [
        "Voir le profil complet",
        "Réserver une leçon",
        "Envoyer un message",
        "Imprimer documents",
        "Modifier informations",
      ],
    },
  },
};

// ============================================================================
// 📅 PLANNING
// ============================================================================

export const PLANNING_GUIDE = {
  title: "Planning",
  route: "/secretary/planning",
  description: "Gérer le planning de l'école",

  views: {
    // Vue calendrier
    calendar: {
      title: "Vue Calendrier",
      features: [
        "Voir toutes les leçons",
        "Cours théoriques et pratiques",
        "Filtrer par moniteur",
        "Détecter les conflits",
      ],
    },

    // Vue liste
    list: {
      title: "Vue Liste",
      features: [
        "Liste détaillée des leçons",
        "Tri et filtres",
        "Export Excel/PDF",
        "Actions rapides",
      ],
    },
  },

  workflows: {
    // Réserver une leçon
    bookLesson: {
      title: "Réserver une Leçon",
      steps: [
        "Sélectionner l'élève",
        "Choisir moniteur et véhicule",
        "Définir date et heure",
        "Confirmer la réservation",
      ],

      tips: [
        "Vérifiez les disponibilités",
        "Confirmez avec l'élève",
        "Envoyez un email de confirmation",
      ],
    },

    // Modifier une leçon
    modifyLesson: {
      title: "Modifier une Leçon",
      actions: [
        "Changer la date/heure",
        "Changer le moniteur",
        "Changer le véhicule",
        "Annuler la leçon",
      ],

      tips: [
        "Prévenez l'élève rapidement",
        "Vérifiez les nouvelles disponibilités",
        "Documentez la raison du changement",
      ],
    },
  },
};

// ============================================================================
// 💬 COMMUNICATIONS
// ============================================================================

export const COMMUNICATIONS_GUIDE = {
  title: "Communications",
  route: "/staff/messages",
  description: "Gérer les communications avec élèves et moniteurs",

  features: {
    // Messagerie
    messaging: {
      title: "Messagerie Interne",
      features: [
        "Conversations avec élèves",
        "Conversations avec moniteurs",
        "Messages groupés",
        "Pièces jointes",
      ],

      tips: [
        "Répondez rapidement aux messages urgents",
        "Utilisez les templates pour gagner du temps",
        "Archivez les conversations importantes",
      ],
    },

    // Emails
    emails: {
      title: "Emails",
      templates: [
        "Email de bienvenue",
        "Confirmation de leçon",
        "Rappel de leçon",
        "Annulation de leçon",
        "Relance paiement",
      ],

      tips: [
        "Personnalisez les templates",
        "Vérifiez l'orthographe",
        "Incluez toujours les informations importantes",
      ],
    },

    // SMS
    sms: {
      title: "SMS",
      useCases: [
        "Rappels de leçons",
        "Confirmations urgentes",
        "Annulations de dernière minute",
        "Informations importantes",
      ],

      tips: [
        "Soyez concis",
        "Incluez le nom de l'école",
        "Évitez les abréviations",
      ],
    },
  },
};

// ============================================================================
// ✅ GESTION DES TÂCHES
// ============================================================================

export const TASKS_MANAGEMENT_GUIDE = {
  title: "Gestion des Tâches",
  route: "/staff/tasks",
  description: "Organiser et suivre vos tâches",

  features: {
    // Liste des tâches
    taskList: {
      title: "Liste des Tâches",
      categories: [
        "Inscriptions à traiter",
        "Appels à passer",
        "Documents à préparer",
        "Suivis à faire",
      ],

      priorities: ["Urgent", "Important", "Normal", "Faible"],
    },

    // Création de tâche
    createTask: {
      title: "Créer une Tâche",
      fields: [
        "Titre",
        "Description",
        "Priorité",
        "Date d'échéance",
        "Assigné à",
      ],
    },

    // Suivi
    tracking: {
      title: "Suivi des Tâches",
      statuses: ["À faire", "En cours", "Complétée", "Annulée"],
      tips: [
        "Mettez à jour le statut régulièrement",
        "Ajoutez des notes de progression",
        "Marquez comme complétée quand terminée",
      ],
    },
  },
};

// ============================================================================
// 📞 GESTION DES APPELS
// ============================================================================

export const CALLS_MANAGEMENT_GUIDE = {
  title: "Gestion des Appels",
  description: "Gérer les appels entrants et sortants",

  workflows: {
    // Appel entrant
    incomingCall: {
      title: "Appel Entrant",
      steps: [
        {
          step: 1,
          title: "Accueil",
          script:
            "Bonjour, [Nom École], [Votre Nom] à l'appareil, comment puis-je vous aider ?",
        },
        {
          step: 2,
          title: "Identification",
          questions: [
            "Puis-je avoir votre nom ?",
            "Êtes-vous déjà inscrit ?",
            "Quel est l'objet de votre appel ?",
          ],
        },
        {
          step: 3,
          title: "Traitement",
          actions: [
            "Rechercher le dossier si élève existant",
            "Répondre à la question",
            "Prendre rendez-vous si nécessaire",
            "Noter les informations importantes",
          ],
        },
        {
          step: 4,
          title: "Conclusion",
          script:
            "Y a-t-il autre chose que je puisse faire pour vous ? Merci de votre appel, bonne journée !",
        },
      ],
    },

    // Appel sortant
    outgoingCall: {
      title: "Appel Sortant",
      preparation: [
        "Vérifier le dossier de l'élève",
        "Préparer les informations nécessaires",
        "Avoir un stylo et du papier",
        "Choisir un moment approprié",
      ],

      script:
        "Bonjour, je suis [Votre Nom] de [Nom École]. Je vous appelle concernant [Objet]. Est-ce un bon moment pour vous ?",
    },
  },

  tips: [
    "Soyez toujours courtois et professionnel",
    "Prenez des notes pendant l'appel",
    "Confirmez toujours les informations importantes",
    "Faites un suivi après l'appel si nécessaire",
  ],
};

// ============================================================================
// 📄 GESTION DES DOCUMENTS
// ============================================================================

export const DOCUMENTS_GUIDE = {
  title: "Gestion des Documents",
  description: "Gérer les documents administratifs",

  documentTypes: {
    // Documents élèves
    students: {
      title: "Documents Élèves",
      types: [
        "Contrat de formation",
        "Permis d'élève conducteur",
        "Attestations de cours",
        "Factures",
        "Certificats",
      ],

      tips: [
        "Scannez tous les documents originaux",
        "Nommez les fichiers de manière cohérente",
        "Archivez dans le dossier de l'élève",
        "Vérifiez les dates d'expiration",
      ],
    },

    // Documents administratifs
    administrative: {
      title: "Documents Administratifs",
      types: [
        "Contrats moniteurs",
        "Assurances véhicules",
        "Autorisations OMCo",
        "Rapports mensuels",
      ],

      tips: [
        "Maintenez un classement organisé",
        "Vérifiez les dates d'échéance",
        "Renouvelez les documents à temps",
      ],
    },
  },

  workflows: {
    // Générer un document
    generate: {
      title: "Générer un Document",
      steps: [
        "Sélectionner le type de document",
        "Choisir le template",
        "Remplir les informations",
        "Vérifier et valider",
        "Télécharger ou imprimer",
      ],
    },

    // Archiver un document
    archive: {
      title: "Archiver un Document",
      steps: [
        "Scanner le document",
        "Nommer le fichier correctement",
        "Classer dans le bon dossier",
        "Ajouter des tags si nécessaire",
        "Vérifier la lisibilité",
      ],
    },
  },
};

// ============================================================================
// 💡 CONSEILS ET ASTUCES
// ============================================================================

export const TIPS_AND_TRICKS = {
  title: "Conseils et Astuces",

  daily: {
    title: "Routine Quotidienne",
    tips: [
      "Consultez vos tâches chaque matin",
      "Traitez les inscriptions en priorité",
      "Répondez aux messages urgents",
      "Mettez à jour le planning",
    ],
  },

  efficiency: {
    title: "Gagner en Efficacité",
    tips: [
      "Utilisez les templates d'emails",
      "Créez des raccourcis pour les tâches fréquentes",
      "Groupez les tâches similaires",
      "Utilisez la recherche rapide",
    ],
  },

  communication: {
    title: "Communication Efficace",
    tips: [
      "Soyez toujours courtois et professionnel",
      "Répondez rapidement aux demandes",
      "Confirmez toujours les informations importantes",
      "Utilisez le bon canal (email, SMS, téléphone)",
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
      q: "Comment inscrire rapidement un élève ?",
      a: "Utilisez l'inscription rapide : Secretary > Inscriptions > Suivez les 4 étapes",
    },
    {
      q: "Comment rechercher un élève ?",
      a: "Utilisez la recherche rapide en haut de page ou allez dans Secretary > Élèves",
    },
    {
      q: "Comment réserver une leçon ?",
      a: "Planning > Nouvelle leçon > Sélectionnez élève, moniteur et date",
    },
    {
      q: "Comment envoyer un email à un élève ?",
      a: "Profil élève > Actions > Envoyer un message > Choisissez le template",
    },
    {
      q: "Comment gérer mes tâches ?",
      a: "Staff > Tâches > Créez et suivez vos tâches quotidiennes",
    },
  ],
};

// ============================================================================
// 📞 SUPPORT
// ============================================================================

export const SUPPORT = {
  title: "Support",

  contact: {
    email: "support@viamentor.ch",
    phone: "+41 XX XXX XX XX",
    hours: "Lun-Ven 9h-18h",
  },

  resources: [
    "Documentation complète",
    "Vidéos tutoriels",
    "Base de connaissances",
    "Forum communauté",
  ],
};

export const SECRETARY_GUIDE_VERSION = "1.0.0";
export const SECRETARY_GUIDE_LAST_UPDATE = "2025-01-20";
