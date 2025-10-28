/**
 * VIAMENTOR - Guide Utilisateur Student
 * Documentation complète pour les élèves conducteurs
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * Bienvenue dans le guide utilisateur Student !
 *
 * Ce guide couvre toutes les fonctionnalités disponibles pour les
 * élèves conducteurs en formation.
 *
 * Version: 1.0.0
 * Rôle: Student
 * Permissions: Consultation et réservation leçons
 */

// ============================================================================
// 📊 MON DASHBOARD
// ============================================================================

export const DASHBOARD_GUIDE = {
  title: "Mon Dashboard",
  route: "/student/dashboard",
  description: "Vue d'ensemble de ma formation",

  sections: {
    // Progression
    progression: {
      title: "Ma Progression",
      metrics: [
        "Heures de conduite effectuées",
        "Compétences acquises",
        "Objectifs atteints",
        "Prochaines étapes",
      ],

      visual: "Barre de progression visuelle",
    },

    // Prochaines leçons
    upcomingLessons: {
      title: "Mes Prochaines Leçons",
      info: ["Date et heure", "Moniteur", "Lieu de rendez-vous", "Véhicule"],

      actions: [
        "Voir détails",
        "Contacter moniteur",
        "Annuler (si nécessaire)",
      ],
    },

    // Documents
    documents: {
      title: "Mes Documents",
      types: [
        "Permis d'élève",
        "Attestations de cours",
        "Contrat de formation",
        "Factures",
      ],

      actions: ["Télécharger", "Imprimer", "Partager"],
    },

    // Paiements
    payments: {
      title: "Mes Paiements",
      info: ["Solde en cours", "Factures en attente", "Historique paiements"],

      actions: ["Voir factures", "Effectuer paiement", "Télécharger reçus"],
    },
  },

  tips: [
    "Consultez votre dashboard régulièrement",
    "Suivez votre progression",
    "Préparez vos leçons à l'avance",
  ],
};

// ============================================================================
// 📅 RÉSERVER UNE LEÇON
// ============================================================================

export const BOOKING_GUIDE = {
  title: "Réserver une Leçon",
  route: "/student/lessons/book",
  description: "Réserver vos leçons de conduite",

  workflow: {
    title: "Processus de Réservation",
    steps: [
      {
        step: 1,
        title: "Choisir le Type",
        options: [
          "Leçon de conduite (50 min)",
          "Leçon double (100 min)",
          "Leçon d'autoroute",
          "Leçon de nuit",
        ],

        tips: [
          "Les leçons doubles sont plus efficaces",
          "Planifiez les leçons spéciales à l'avance",
        ],
      },
      {
        step: 2,
        title: "Sélectionner Date et Heure",
        features: [
          "Calendrier interactif",
          "Créneaux disponibles",
          "Filtrer par moniteur",
        ],

        tips: [
          "Réservez à l'avance pour avoir plus de choix",
          "Évitez les heures de pointe si possible",
        ],
      },
      {
        step: 3,
        title: "Choisir le Lieu",
        options: [
          "École de conduite",
          "Domicile",
          "Lieu de travail",
          "Autre adresse",
        ],

        tips: [
          "Le lieu de départ peut influencer le prix",
          "Prévoyez d'être prêt 5 minutes avant",
        ],
      },
      {
        step: 4,
        title: "Confirmer",
        info: [
          "Récapitulatif complet",
          "Prix de la leçon",
          "Conditions d'annulation",
        ],

        actions: [
          "Confirmer la réservation",
          "Recevoir confirmation par email",
        ],
      },
    ],
  },

  cancellation: {
    title: "Annulation de Leçon",
    policy: [
      "Gratuit jusqu'à 24h avant",
      "50% du prix entre 24h et 12h",
      "100% du prix moins de 12h avant",
    ],

    process: [
      "Mes Leçons > Sélectionner leçon",
      "Cliquer sur Annuler",
      "Indiquer la raison",
      "Confirmer l'annulation",
    ],

    tips: [
      "Annulez le plus tôt possible",
      "Expliquez la raison",
      "Reprogrammez rapidement",
    ],
  },
};

// ============================================================================
// 📚 MES LEÇONS
// ============================================================================

export const LESSONS_GUIDE = {
  title: "Mes Leçons",
  route: "/student/lessons",
  description: "Consulter l'historique de vos leçons",

  views: {
    // Leçons à venir
    upcoming: {
      title: "Leçons à Venir",
      info: [
        "Date et heure",
        "Moniteur",
        "Lieu de rendez-vous",
        "Type de leçon",
      ],

      actions: ["Voir détails", "Modifier", "Annuler", "Ajouter au calendrier"],
    },

    // Leçons passées
    past: {
      title: "Leçons Passées",
      info: ["Date", "Moniteur", "Durée", "Évaluation", "Commentaires"],

      features: [
        "Voir évaluation détaillée",
        "Consulter progression",
        "Télécharger rapport",
      ],
    },
  },

  evaluations: {
    title: "Mes Évaluations",
    content: [
      "Compétences techniques",
      "Points forts",
      "Points à améliorer",
      "Commentaires moniteur",
      "Objectifs prochaine leçon",
    ],

    tips: [
      "Lisez attentivement les évaluations",
      "Travaillez sur les points à améliorer",
      "Posez des questions à votre moniteur",
    ],
  },
};

// ============================================================================
// 📈 MA PROGRESSION
// ============================================================================

export const PROGRESSION_GUIDE = {
  title: "Ma Progression",
  route: "/student/progression",
  description: "Suivre votre évolution",

  sections: {
    // Vue d'ensemble
    overview: {
      title: "Vue d'Ensemble",
      metrics: [
        "Heures totales",
        "Compétences acquises",
        "Taux de progression",
        "Estimation examen",
      ],
    },

    // Compétences
    skills: {
      title: "Mes Compétences",
      categories: [
        {
          name: "Maîtrise du véhicule",
          skills: [
            "Démarrage et arrêt",
            "Changements de vitesse",
            "Stationnement",
            "Manœuvres",
          ],
        },
        {
          name: "Circulation",
          skills: ["Observation", "Anticipation", "Priorités", "Signalisation"],
        },
        {
          name: "Situations spéciales",
          skills: ["Autoroute", "Nuit", "Intempéries", "Trafic dense"],
        },
      ],

      visual: "Graphique radar des compétences",
    },

    // Objectifs
    goals: {
      title: "Mes Objectifs",
      types: [
        "Objectifs à court terme",
        "Objectifs à moyen terme",
        "Objectif final (examen)",
      ],

      tracking: [
        "Statut de chaque objectif",
        "Date cible",
        "Actions nécessaires",
      ],
    },
  },

  tips: [
    "Consultez votre progression après chaque leçon",
    "Fixez-vous des objectifs réalistes",
    "Célébrez vos progrès",
    "Soyez patient avec vous-même",
  ],
};

// ============================================================================
// 💰 FACTURATION
// ============================================================================

export const BILLING_GUIDE = {
  title: "Ma Facturation",
  route: "/student/billing",
  description: "Gérer vos paiements",

  sections: {
    // Solde
    balance: {
      title: "Mon Solde",
      info: ["Solde actuel", "Factures en attente", "Prochaine échéance"],

      actions: ["Effectuer un paiement", "Voir détails"],
    },

    // Factures
    invoices: {
      title: "Mes Factures",
      info: ["Numéro de facture", "Date", "Montant", "Statut"],

      statuses: ["Payée", "En attente", "En retard"],

      actions: ["Télécharger PDF", "Effectuer paiement", "Voir détails"],
    },

    // Paiements
    payments: {
      title: "Mes Paiements",
      methods: [
        "Virement bancaire (QR-bill)",
        "Carte de crédit",
        "TWINT",
        "Espèces (à l'école)",
      ],

      info: ["Date de paiement", "Montant", "Méthode", "Référence"],
    },
  },

  tips: [
    "Payez vos factures à temps",
    "Conservez vos reçus",
    "Utilisez le QR-bill pour les virements",
    "Contactez l'école en cas de difficulté",
  ],
};

// ============================================================================
// 📄 MES DOCUMENTS
// ============================================================================

export const DOCUMENTS_GUIDE = {
  title: "Mes Documents",
  route: "/student/documents",
  description: "Accéder à vos documents",

  categories: {
    // Documents légaux
    legal: {
      title: "Documents Légaux",
      documents: [
        "Permis d'élève conducteur",
        "Attestation cours premiers secours",
        "Attestation cours sensibilisation",
        "Contrat de formation",
      ],

      actions: ["Télécharger", "Imprimer", "Envoyer par email"],
    },

    // Attestations
    certificates: {
      title: "Attestations",
      documents: [
        "Attestation d'heures",
        "Certificat de formation",
        "Attestation de présence",
      ],

      tips: ["Conservez tous vos certificats", "Nécessaires pour l'examen"],
    },

    // Factures
    invoices: {
      title: "Factures",
      documents: [
        "Factures payées",
        "Factures en attente",
        "Reçus de paiement",
      ],

      tips: ["Archivez vos factures", "Utiles pour déclaration impôts"],
    },
  },
};

// ============================================================================
// 📝 PRÉPARATION EXAMEN
// ============================================================================

export const EXAM_PREPARATION_GUIDE = {
  title: "Préparation à l'Examen",
  route: "/student/exams",
  description: "Se préparer pour l'examen pratique",

  requirements: {
    title: "Prérequis",
    checklist: [
      {
        item: "Heures minimales",
        requirement: "Selon catégorie (ex: 25h pour B)",
      },
      {
        item: "Cours obligatoires",
        requirement: "Premiers secours + Sensibilisation",
      },
      {
        item: "Permis d'élève",
        requirement: "Valide depuis 12 mois minimum",
      },
      {
        item: "Recommandation moniteur",
        requirement: "Moniteur confirme que vous êtes prêt",
      },
    ],
  },

  preparation: {
    title: "Se Préparer",
    tips: [
      "Faites un examen blanc avec votre moniteur",
      "Révisez le code de la route",
      "Pratiquez les manœuvres",
      "Dormez bien la veille",
      "Arrivez en avance le jour J",
    ],
  },

  dayOf: {
    title: "Le Jour de l'Examen",
    checklist: [
      "Permis d'élève",
      "Pièce d'identité",
      "Lunettes (si nécessaire)",
      "Chaussures appropriées",
    ],

    tips: [
      "Restez calme et confiant",
      "Écoutez les instructions",
      "Prenez votre temps",
      "Respirez profondément",
    ],
  },

  results: {
    title: "Résultats",
    success: {
      title: "En cas de Réussite",
      steps: [
        "Félicitations !",
        "Récupérez votre permis provisoire",
        "Période probatoire de 3 ans",
        "Cours de perfectionnement obligatoire",
      ],
    },
    failure: {
      title: "En cas d'Échec",
      steps: [
        "Ne vous découragez pas",
        "Analysez les erreurs avec votre moniteur",
        "Planifiez des leçons supplémentaires",
        "Réinscrivez-vous quand prêt",
      ],
    },
  },
};

// ============================================================================
// 💬 COMMUNICATIONS
// ============================================================================

export const COMMUNICATIONS_GUIDE = {
  title: "Communications",
  route: "/student/messages",
  description: "Communiquer avec votre moniteur et l'école",

  channels: {
    // Messagerie
    messaging: {
      title: "Messagerie Interne",
      features: [
        "Conversations avec moniteur",
        "Messages de l'école",
        "Pièces jointes",
        "Historique",
      ],

      tips: [
        "Utilisez pour questions non urgentes",
        "Soyez clair et précis",
        "Vérifiez régulièrement",
      ],
    },

    // Téléphone
    phone: {
      title: "Téléphone",
      when: [
        "Urgences",
        "Annulations de dernière minute",
        "Questions importantes",
      ],

      tips: [
        "Appelez aux heures appropriées",
        "Laissez un message si pas de réponse",
      ],
    },

    // Email
    email: {
      title: "Email",
      when: [
        "Questions administratives",
        "Demandes de documents",
        "Réclamations",
      ],

      tips: [
        "Utilisez un objet clair",
        "Soyez poli et professionnel",
        "Incluez votre numéro de dossier",
      ],
    },
  },
};

// ============================================================================
// 💡 CONSEILS ET ASTUCES
// ============================================================================

export const TIPS_AND_TRICKS = {
  title: "Conseils et Astuces",

  learning: {
    title: "Apprentissage",
    tips: [
      "Pratiquez régulièrement",
      "Soyez patient avec vous-même",
      "Posez des questions",
      "Apprenez de vos erreurs",
      "Restez concentré pendant les leçons",
    ],
  },

  safety: {
    title: "Sécurité",
    tips: [
      "Respectez toujours le code de la route",
      "Soyez vigilant",
      "Anticipez les dangers",
      "Ne conduisez jamais fatigué",
      "Adaptez votre conduite aux conditions",
    ],
  },

  efficiency: {
    title: "Efficacité",
    tips: [
      "Réservez vos leçons à l'avance",
      "Préparez vos questions avant",
      "Révisez entre les leçons",
      "Suivez votre progression",
      "Fixez-vous des objectifs",
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
      q: "Comment réserver une leçon ?",
      a: "Dashboard > Réserver une leçon > Suivez les 4 étapes",
    },
    {
      q: "Comment annuler une leçon ?",
      a: "Mes Leçons > Sélectionner leçon > Annuler (au moins 24h avant)",
    },
    {
      q: "Comment voir ma progression ?",
      a: "Dashboard > Ma Progression ou Student > Progression",
    },
    {
      q: "Comment payer une facture ?",
      a: "Facturation > Mes Factures > Sélectionner facture > Payer",
    },
    {
      q: "Comment contacter mon moniteur ?",
      a: "Messages > Nouvelle conversation > Sélectionner moniteur",
    },
    {
      q: "Quand puis-je passer l'examen ?",
      a: "Après validation de votre moniteur et respect des prérequis",
    },
  ],
};

export const STUDENT_GUIDE_VERSION = "1.0.0";
export const STUDENT_GUIDE_LAST_UPDATE = "2025-01-20";
