/**
 * VIAMENTOR - Guide Utilisateur School Admin
 * Documentation complète pour les administrateurs d'école
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * Bienvenue dans le guide utilisateur School Admin !
 *
 * Ce guide couvre toutes les fonctionnalités disponibles pour les
 * administrateurs d'école de conduite.
 *
 * Version: 1.0.0
 * Rôle: School Admin
 * Permissions: Gestion complète de l'école
 */

// ============================================================================
// 📊 DASHBOARD ÉCOLE
// ============================================================================

export const DASHBOARD_GUIDE = {
  title: "Dashboard École",
  route: "/school/dashboard",
  description: "Vue d'ensemble de l'activité de votre école",

  sections: {
    // KPIs principaux
    kpis: {
      title: "Indicateurs Clés",
      items: [
        {
          name: "Élèves Actifs",
          description: "Nombre d'élèves en formation",
          action: "Cliquer pour voir la liste complète",
        },
        {
          name: "Leçons du Jour",
          description: "Leçons planifiées aujourd'hui",
          action: "Cliquer pour voir le planning",
        },
        {
          name: "Revenus du Mois",
          description: "Chiffre d'affaires mensuel",
          action: "Cliquer pour voir les détails",
        },
        {
          name: "Taux de Réussite",
          description: "Taux de réussite aux examens",
          action: "Cliquer pour voir les analytics",
        },
      ],
    },

    // Activité récente
    activity: {
      title: "Activité Récente",
      items: [
        "Nouvelles inscriptions",
        "Leçons complétées",
        "Factures générées",
        "Examens passés",
      ],
    },

    // Actions rapides
    quickActions: {
      title: "Actions Rapides",
      items: [
        "Inscrire un nouvel élève",
        "Créer un moniteur",
        "Réserver une leçon",
        "Générer une facture",
      ],
    },
  },

  tips: [
    "Consultez le dashboard chaque matin pour avoir une vue d'ensemble",
    "Les KPIs sont mis à jour en temps réel",
    "Utilisez les actions rapides pour gagner du temps",
  ],
};

// ============================================================================
// 👥 GESTION DES ÉLÈVES
// ============================================================================

export const STUDENTS_MANAGEMENT_GUIDE = {
  title: "Gestion des Élèves",
  route: "/students",
  description: "Gérer tous vos élèves en formation",

  workflows: {
    // Créer un élève
    createStudent: {
      title: "Inscrire un Nouvel Élève",
      steps: [
        {
          step: 1,
          title: "Identité",
          fields: [
            "Nom, Prénom",
            "Date de naissance",
            "Adresse complète",
            "Email, Téléphone",
            "Photo (optionnel)",
          ],

          validation: "Tous les champs obligatoires doivent être remplis",
        },
        {
          step: 2,
          title: "Formation",
          fields: [
            "Catégorie de permis (B, A1, etc.)",
            "Moniteur assigné",
            "Date de début",
            "Objectif d'examen",
          ],

          validation: "La catégorie doit être valide selon OAC",
        },
        {
          step: 3,
          title: "Documents Légaux",
          fields: [
            "Permis d'élève conducteur",
            "Cours de premiers secours",
            "Cours de sensibilisation",
            "Autorisation parentale (si mineur)",
          ],

          validation: "Documents obligatoires selon OAC Art. 10-15",
        },
        {
          step: 4,
          title: "Résumé",
          action: "Vérifier et confirmer l'inscription",
        },
      ],

      tips: [
        "Préparez tous les documents avant de commencer",
        "Vérifiez la validité du permis d'élève",
        "Assignez un moniteur disponible",
      ],
    },

    // Voir détail élève
    viewStudent: {
      title: "Consulter le Profil Élève",
      tabs: [
        {
          name: "Informations",
          content: [
            "Données personnelles",
            "Coordonnées",
            "Moniteur assigné",
            "Statut formation",
          ],
        },
        {
          name: "Progression",
          content: [
            "Heures de conduite",
            "Compétences acquises",
            "Objectifs atteints",
            "Prochaines étapes",
          ],
        },
        {
          name: "Documents",
          content: [
            "Permis d'élève",
            "Attestations",
            "Contrat de formation",
            "Factures",
          ],
        },
        {
          name: "Factures",
          content: [
            "Historique facturation",
            "Paiements reçus",
            "Solde en cours",
            "Générer nouvelle facture",
          ],
        },
        {
          name: "Planning",
          content: [
            "Leçons passées",
            "Leçons à venir",
            "Réserver nouvelle leçon",
            "Historique complet",
          ],
        },
        {
          name: "Historique",
          content: [
            "Toutes les activités",
            "Modifications",
            "Communications",
            "Notes internes",
          ],
        },
      ],

      actions: [
        "Modifier les informations",
        "Réserver une leçon",
        "Générer une facture",
        "Envoyer un message",
        "Voir les documents",
      ],
    },

    // Filtrer et rechercher
    filterStudents: {
      title: "Filtrer et Rechercher",
      filters: [
        {
          name: "Recherche",
          description: "Nom, email ou téléphone",
        },
        {
          name: "Statut",
          options: ["Actif", "En pause", "Terminé", "Abandonné"],
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

      tips: [
        "Utilisez la recherche rapide pour trouver un élève",
        "Combinez plusieurs filtres pour affiner",
        "Sauvegardez vos filtres fréquents",
      ],
    },

    // Actions groupées
    bulkActions: {
      title: "Actions Groupées",
      actions: [
        {
          name: "Envoyer un email",
          description: "Envoyer un email à plusieurs élèves",
        },
        {
          name: "Changer de moniteur",
          description: "Réassigner plusieurs élèves",
        },
        {
          name: "Exporter",
          description: "Exporter la liste en Excel/PDF",
        },
        {
          name: "Archiver",
          description: "Archiver plusieurs élèves",
        },
      ],

      tips: [
        "Sélectionnez les élèves avec les checkboxes",
        "Les actions s'appliquent à tous les élèves sélectionnés",
        "Confirmez toujours avant d'appliquer",
      ],
    },
  },
};

// ============================================================================
// 👨‍🏫 GESTION DES MONITEURS
// ============================================================================

export const INSTRUCTORS_MANAGEMENT_GUIDE = {
  title: "Gestion des Moniteurs",
  route: "/instructors",
  description: "Gérer votre équipe de moniteurs",

  workflows: {
    // Créer un moniteur
    createInstructor: {
      title: "Créer un Nouveau Moniteur",
      steps: [
        {
          step: 1,
          title: "Informations Personnelles",
          fields: [
            "Nom, Prénom",
            "Date de naissance",
            "Adresse",
            "Email, Téléphone",
            "Photo",
          ],
        },
        {
          step: 2,
          title: "Qualifications",
          fields: [
            "Catégories enseignées (B, A1, etc.)",
            "Numéro autorisation OMCo",
            "Date d'obtention",
            "Date d'expiration",
            "Certificats",
          ],

          validation: "Autorisation OMCo obligatoire",
        },
        {
          step: 3,
          title: "Autorisations Légales",
          fields: [
            "Extrait casier judiciaire",
            "Autorisation d'enseigner",
            "Assurance responsabilité civile",
            "Contrat de travail",
          ],

          validation: "Documents obligatoires selon OMCo",
        },
      ],

      tips: [
        "Vérifiez la validité de l'autorisation OMCo",
        "Assurez-vous que tous les documents sont à jour",
        "Définissez les catégories enseignées",
      ],
    },

    // Voir détail moniteur
    viewInstructor: {
      title: "Consulter le Profil Moniteur",
      tabs: [
        {
          name: "Informations",
          content: [
            "Données personnelles",
            "Qualifications",
            "Catégories enseignées",
            "Statut",
          ],
        },
        {
          name: "Planning",
          content: [
            "Disponibilités",
            "Leçons planifiées",
            "Historique",
            "Statistiques",
          ],
        },
        {
          name: "Élèves",
          content: [
            "Élèves assignés",
            "Progression des élèves",
            "Évaluations",
            "Statistiques",
          ],
        },
        {
          name: "Performance",
          content: [
            "Taux de réussite",
            "Satisfaction élèves",
            "Heures enseignées",
            "Revenus générés",
          ],
        },
      ],

      actions: [
        "Modifier les informations",
        "Gérer les disponibilités",
        "Voir le planning",
        "Consulter les statistiques",
      ],
    },

    // Gérer les disponibilités
    manageAvailability: {
      title: "Gérer les Disponibilités",
      features: [
        {
          name: "Horaires réguliers",
          description: "Définir les horaires de travail hebdomadaires",
        },
        {
          name: "Exceptions",
          description: "Ajouter des congés ou indisponibilités",
        },
        {
          name: "Calendrier",
          description: "Vue calendrier des disponibilités",
        },
        {
          name: "Conflits",
          description: "Détection automatique des conflits",
        },
      ],

      tips: [
        "Mettez à jour les disponibilités régulièrement",
        "Planifiez les congés à l'avance",
        "Vérifiez les conflits avant de confirmer",
      ],
    },
  },
};

// ============================================================================
// 📅 PLANNING ET LEÇONS
// ============================================================================

export const PLANNING_GUIDE = {
  title: "Planning et Leçons",
  route: "/planning",
  description: "Gérer le planning de votre école",

  views: {
    // Vue mois
    monthView: {
      title: "Vue Mois",
      description: "Vue d'ensemble mensuelle",
      features: [
        "Voir toutes les leçons du mois",
        "Cours théoriques et pratiques",
        "Filtrer par moniteur/élève/véhicule",
        "Détecter les conflits",
      ],
    },

    // Vue semaine
    weekView: {
      title: "Vue Semaine",
      description: "Planning hebdomadaire détaillé",
      features: [
        "Voir les leçons de la semaine",
        "Drag & drop pour déplacer",
        "Créer nouvelle leçon",
        "Voir les disponibilités",
      ],
    },

    // Vue jour
    dayView: {
      title: "Vue Jour",
      description: "Planning journalier précis",
      features: [
        "Voir toutes les leçons du jour",
        "Horaires précis",
        "Statuts en temps réel",
        "Actions rapides",
      ],
    },
  },

  workflows: {
    // Réserver une leçon
    bookLesson: {
      title: "Réserver une Leçon",
      steps: [
        {
          step: 1,
          title: "Sélectionner l'Élève",
          description: "Choisir l'élève pour la leçon",
        },
        {
          step: 2,
          title: "Moniteur et Véhicule",
          description: "Sélectionner moniteur et véhicule disponibles",
        },
        {
          step: 3,
          title: "Date et Heure",
          description: "Choisir le créneau horaire",
          validation: "Vérification automatique des disponibilités",
        },
        {
          step: 4,
          title: "Confirmation",
          description: "Vérifier et confirmer la réservation",
        },
      ],

      tips: [
        "Vérifiez les disponibilités avant de réserver",
        "Respectez les temps de pause entre leçons",
        "Confirmez avec l'élève avant de valider",
      ],
    },

    // Gérer une leçon
    manageLesson: {
      title: "Gérer une Leçon",
      actions: [
        {
          name: "Modifier",
          description: "Changer date, heure, moniteur ou véhicule",
        },
        {
          name: "Annuler",
          description: "Annuler la leçon avec raison",
        },
        {
          name: "Compléter",
          description: "Marquer comme complétée",
        },
        {
          name: "Évaluer",
          description: "Ajouter une évaluation",
        },
      ],

      tips: [
        "Prévenez l'élève en cas de modification",
        "Documentez les annulations",
        "Complétez les évaluations rapidement",
      ],
    },
  },
};

// ============================================================================
// 💰 FACTURATION
// ============================================================================

export const BILLING_GUIDE = {
  title: "Facturation",
  route: "/billing",
  description: "Gérer la facturation de votre école",

  workflows: {
    // Créer une facture
    createInvoice: {
      title: "Créer une Facture",
      steps: [
        {
          step: 1,
          title: "Sélectionner l'Élève",
          description: "Choisir l'élève à facturer",
        },
        {
          step: 2,
          title: "Ajouter les Prestations",
          items: [
            "Leçons de conduite",
            "Cours théoriques",
            "Examens",
            "Forfaits",
            "Autres services",
          ],
        },
        {
          step: 3,
          title: "Vérifier le Total",
          items: [
            "Sous-total",
            "TVA (8.1%)",
            "Remises éventuelles",
            "Total TTC",
          ],
        },
        {
          step: 4,
          title: "Générer",
          options: [
            "Envoyer par email",
            "Télécharger PDF",
            "Imprimer",
            "Générer QR-bill",
          ],
        },
      ],

      tips: [
        "Vérifiez les prix avant de générer",
        "Incluez toujours le QR-bill pour les paiements",
        "Envoyez la facture rapidement",
      ],
    },

    // Gérer les paiements
    managePayments: {
      title: "Gérer les Paiements",
      features: [
        {
          name: "Enregistrer un paiement",
          description: "Saisir manuellement un paiement reçu",
        },
        {
          name: "Import Camt.054",
          description: "Importer les paiements bancaires",
        },
        {
          name: "Réconciliation",
          description: "Associer paiements aux factures",
        },
        {
          name: "Relances",
          description: "Gérer les relances automatiques",
        },
      ],

      tips: [
        "Importez les Camt.054 régulièrement",
        "Réconciliez les paiements rapidement",
        "Configurez les relances automatiques",
      ],
    },

    // Rapports comptables
    accountingReports: {
      title: "Rapports Comptables",
      reports: [
        {
          name: "Journal des ventes",
          description: "Toutes les factures émises",
        },
        {
          name: "Décompte TVA",
          description: "Calcul TVA pour déclaration",
        },
        {
          name: "Grand livre",
          description: "Écritures comptables",
        },
        {
          name: "Balance",
          description: "Soldes des comptes",
        },
      ],

      tips: [
        "Exportez les rapports mensuellement",
        "Vérifiez le décompte TVA avant déclaration",
        "Archivez les rapports annuels",
      ],
    },
  },
};

// ============================================================================
// 📊 ANALYTICS
// ============================================================================

export const ANALYTICS_GUIDE = {
  title: "Analytics",
  route: "/analytics",
  description: "Analyser les performances de votre école",

  dashboards: {
    // Revenus
    revenue: {
      title: "Analytics Revenus",
      metrics: [
        "MRR (Monthly Recurring Revenue)",
        "Chiffre d'affaires mensuel",
        "Évolution des revenus",
        "Prévisions",
      ],

      charts: [
        "Évolution MRR",
        "Analyse par cohorte",
        "Taux de churn",
        "Forecasting ML",
      ],
    },

    // Moniteurs
    instructors: {
      title: "Performance Moniteurs",
      metrics: [
        "Taux de réussite",
        "Satisfaction élèves",
        "Heures enseignées",
        "Revenus générés",
      ],

      charts: [
        "Ranking performance",
        "Analyse workload",
        "Satisfaction par moniteur",
        "Catégories expertise",
      ],
    },

    // Véhicules
    vehicles: {
      title: "Analytics Véhicules",
      metrics: [
        "Taux d'utilisation",
        "Coûts d'exploitation",
        "Consommation carburant",
        "ROI par véhicule",
      ],

      charts: [
        "Utilisation flotte",
        "Analyse coûts",
        "Maintenance tracking",
        "Revenus par véhicule",
      ],
    },

    // Examens
    exams: {
      title: "Analytics Examens",
      metrics: [
        "Taux de réussite global",
        "Moyenne tentatives",
        "Évolution mensuelle",
        "Benchmarking",
      ],

      charts: [
        "Taux réussite par catégorie",
        "Analyse échecs",
        "Performance moniteurs",
        "Recommandations IA",
      ],
    },

    // Financier
    financial: {
      title: "Analytics Financières",
      metrics: [
        "Rentabilité",
        "Ratios financiers",
        "Cash-flow",
        "Budget tracking",
      ],

      charts: [
        "Analyse revenus",
        "Profitabilité",
        "Prévisions cash-flow",
        "Analyse pricing",
      ],
    },
  },

  tips: [
    "Consultez les analytics hebdomadairement",
    "Utilisez les insights pour optimiser",
    "Exportez les rapports pour vos réunions",
    "Suivez les KPIs critiques",
  ],
};

// ============================================================================
// ⚙️ PARAMÈTRES
// ============================================================================

export const SETTINGS_GUIDE = {
  title: "Paramètres",
  route: "/settings",
  description: "Configurer votre école",

  sections: {
    // École
    school: {
      title: "Informations École",
      settings: [
        "Nom de l'école",
        "Adresse complète",
        "Coordonnées",
        "Logo",
        "Horaires d'ouverture",
      ],
    },

    // Tarification
    pricing: {
      title: "Tarification",
      settings: [
        "Prix des leçons par catégorie",
        "Forfaits et packages",
        "Promotions",
        "TVA",
        "Conditions de paiement",
      ],
    },

    // Notifications
    notifications: {
      title: "Notifications",
      settings: [
        "Templates emails",
        "Templates SMS",
        "Triggers automatiques",
        "Préférences envoi",
      ],
    },

    // Utilisateurs
    users: {
      title: "Utilisateurs",
      settings: [
        "Gérer les comptes",
        "Rôles et permissions",
        "Invitations",
        "Désactivations",
      ],
    },

    // Intégrations
    integrations: {
      title: "Intégrations",
      settings: ["Comptabilité", "Paiements", "Marketing", "API externe"],
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
      "Consultez le dashboard chaque matin",
      "Vérifiez le planning du jour",
      "Traitez les notifications importantes",
      "Répondez aux messages urgents",
    ],
  },

  weekly: {
    title: "Routine Hebdomadaire",
    tips: [
      "Revoyez les analytics de la semaine",
      "Planifiez la semaine suivante",
      "Vérifiez les disponibilités moniteurs",
      "Suivez les paiements en attente",
    ],
  },

  monthly: {
    title: "Routine Mensuelle",
    tips: [
      "Analysez les performances du mois",
      "Générez les rapports comptables",
      "Préparez le décompte TVA",
      "Planifiez les objectifs du mois suivant",
    ],
  },

  shortcuts: {
    title: "Raccourcis Clavier",
    shortcuts: [
      "Ctrl+K : Recherche globale",
      "Ctrl+N : Nouvel élève",
      "Ctrl+L : Nouvelle leçon",
      "Ctrl+I : Nouvelle facture",
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
      q: "Comment inscrire un nouvel élève ?",
      a: "Allez dans Élèves > Nouveau > Suivez le wizard en 4 étapes",
    },
    {
      q: "Comment réserver une leçon ?",
      a: "Planning > Nouvelle leçon > Sélectionnez élève, moniteur, date",
    },
    {
      q: "Comment générer une facture ?",
      a: "Facturation > Nouvelle facture > Sélectionnez élève et prestations",
    },
    {
      q: "Comment voir les analytics ?",
      a: "Analytics > Choisissez le dashboard souhaité",
    },
    {
      q: "Comment modifier les tarifs ?",
      a: "Paramètres > Tarification > Modifiez les prix",
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

export const SCHOOL_ADMIN_GUIDE_VERSION = "1.0.0";
export const SCHOOL_ADMIN_GUIDE_LAST_UPDATE = "2025-01-20";
