/**
 * VIAMENTOR - Guide Conformité RGPD Complète
 *
 * Documentation complète de la conformité RGPD/nLPD suisse
 * avec toutes les actions obligatoires implémentées
 */

// ============================================================================
// CONFORMITÉ RGPD - VUE D'ENSEMBLE
// ============================================================================

/**
 * Viamentor implémente une conformité RGPD/nLPD complète avec :
 *
 * 1. ✅ Consentement explicite et granulaire
 * 2. ✅ Droit à l'oubli (Right to be Forgotten)
 * 3. ✅ Portabilité des données (Data Portability)
 * 4. ✅ Notification des violations (Breach Notifications)
 * 5. ✅ Gestion des consentements cookies
 * 6. ✅ Politique de confidentialité complète
 * 7. ✅ Mentions légales conformes
 * 8. ✅ Audit trail complet
 */

// ============================================================================
// 1. CONSENTEMENT EXPLICITE
// ============================================================================

export const CONSENT_MANAGEMENT = {
  description: "Gestion granulaire des consentements utilisateur",

  features: [
    "Consentement opt-in explicite (pas de pré-cochage)",
    "Granularité par type de traitement",
    "Révocation facile à tout moment",
    "Historique des consentements",
    "Preuve horodatée avec IP et user-agent",
  ],

  consentTypes: [
    {
      id: "marketing",
      name: "Marketing et Promotions",
      required: false,
      description: "Emails marketing, newsletters, offres promotionnelles",
      legalBasis: "Consentement (Art. 6(1)(a) RGPD)",
    },
    {
      id: "analytics",
      name: "Analytics et Amélioration",
      required: false,
      description: "Analyse d'utilisation, amélioration du service",
      legalBasis: "Intérêt légitime (Art. 6(1)(f) RGPD)",
    },
    {
      id: "thirdParty",
      name: "Partage avec Partenaires",
      required: false,
      description: "Partage de données avec partenaires de confiance",
      legalBasis: "Consentement (Art. 6(1)(a) RGPD)",
    },
    {
      id: "profiling",
      name: "Profilage et Personnalisation",
      required: false,
      description: "Personnalisation de l'expérience utilisateur",
      legalBasis: "Consentement (Art. 6(1)(a) RGPD)",
    },
  ],

  implementation: {
    component: "@/viamentor/components/viamentor-gdpr-user-rights-actions",
    storage: "localStorage + Database",
    auditLog: "Tous les changements de consentement sont loggés",
  },
};

// ============================================================================
// 2. DROIT À L'OUBLI
// ============================================================================

export const RIGHT_TO_BE_FORGOTTEN = {
  description: "Droit de demander la suppression complète des données",

  legalBasis: "Art. 17 RGPD - Droit à l'effacement",

  process: [
    {
      step: 1,
      name: "Demande utilisateur",
      description: "L'utilisateur soumet une demande de suppression",
      actions: [
        "Formulaire avec raison optionnelle",
        "Confirmation explicite requise",
        "Email de confirmation envoyé",
      ],
    },
    {
      step: 2,
      name: "Vérification éligibilité",
      description: "Vérification des obligations légales de conservation",
      actions: [
        "Vérifier contrats actifs",
        "Vérifier obligations comptables (10 ans)",
        "Vérifier litiges en cours",
      ],

      timeline: "72 heures",
    },
    {
      step: 3,
      name: "Suppression des données",
      description: "Suppression effective de toutes les données",
      actions: [
        "Suppression base de données principale",
        "Suppression backups (sauf archives légales)",
        "Suppression caches et CDN",
        "Notification partenaires tiers",
      ],

      timeline: "30 jours maximum",
    },
    {
      step: 4,
      name: "Confirmation",
      description: "Confirmation de la suppression",
      actions: [
        "Email de confirmation envoyé",
        "Certificat de suppression disponible",
        "Audit log créé",
      ],
    },
  ],

  exceptions: [
    "Obligations légales de conservation (comptabilité: 10 ans)",
    "Litiges en cours ou potentiels",
    "Exercice de droits en justice",
    "Intérêt public (santé publique, recherche)",
  ],

  implementation: {
    component: "@/viamentor/components/viamentor-gdpr-user-rights-actions",
    workflow: "@/viamentor/components/viamentor-gdpr-process-wizard",
    timeline: "30 jours maximum (Art. 12(3) RGPD)",
  },
};

// ============================================================================
// 3. PORTABILITÉ DES DONNÉES
// ============================================================================

export const DATA_PORTABILITY = {
  description: "Droit de recevoir ses données dans un format structuré",

  legalBasis: "Art. 20 RGPD - Droit à la portabilité",

  formats: [
    {
      format: "JSON",
      description: "Format structuré pour développeurs",
      useCase: "Migration vers autre système",
      structure: "Hiérarchique avec métadonnées",
    },
    {
      format: "CSV",
      description: "Format tableur pour analyse",
      useCase: "Analyse dans Excel/Google Sheets",
      structure: "Tableaux plats par entité",
    },
    {
      format: "PDF",
      description: "Format lisible pour archivage",
      useCase: "Lecture humaine, impression",
      structure: "Document formaté avec sections",
    },
  ],

  dataIncluded: [
    "Informations personnelles (nom, email, téléphone, adresse)",
    "Données de compte (préférences, paramètres)",
    "Historique d'activité (leçons, examens, paiements)",
    "Documents uploadés",
    "Consentements et préférences",
    "Historique de communication",
  ],

  dataExcluded: [
    "Données d'autres utilisateurs",
    "Données dérivées (analytics agrégées)",
    "Données confidentielles tiers",
    "Secrets commerciaux",
  ],

  process: [
    {
      step: 1,
      name: "Demande",
      description: "Sélection du format souhaité",
      timeline: "Immédiat",
    },
    {
      step: 2,
      name: "Préparation",
      description: "Génération du fichier d'export",
      timeline: "2-5 minutes",
      actions: [
        "Collecte des données",
        "Anonymisation données tiers",
        "Génération du fichier",
        "Chiffrement",
      ],
    },
    {
      step: 3,
      name: "Téléchargement",
      description: "Mise à disposition du fichier",
      timeline: "Lien valide 7 jours",
      security: [
        "Lien unique à usage unique",
        "Chiffrement AES-256",
        "Expiration automatique",
      ],
    },
  ],

  implementation: {
    component: "@/viamentor/components/viamentor-gdpr-user-rights-actions",
    timeline: "Immédiat à 48h (Art. 12(3) RGPD)",
    security: "Chiffrement AES-256, lien unique",
  },
};

// ============================================================================
// 4. NOTIFICATION DES VIOLATIONS
// ============================================================================

export const BREACH_NOTIFICATIONS = {
  description: "Notification obligatoire des violations de données",

  legalBasis: "Art. 33-34 RGPD - Notification des violations",

  timeline: {
    authority: "72 heures maximum (CNIL/PFPDT)",
    users: "Sans délai si risque élevé",
  },

  severityLevels: [
    {
      level: "high",
      name: "Critique",
      description: "Risque élevé pour les droits et libertés",
      examples: [
        "Vol de mots de passe",
        "Exposition données sensibles (santé, finances)",
        "Accès non autorisé massif",
      ],

      actions: [
        "Notification autorité < 72h",
        "Notification utilisateurs immédiate",
        "Mesures correctives urgentes",
        "Communication publique si nécessaire",
      ],
    },
    {
      level: "medium",
      name: "Modérée",
      description: "Risque modéré, mesures de protection en place",
      examples: [
        "Tentative d'accès bloquée",
        "Exposition limitée de données non sensibles",
        "Incident contenu rapidement",
      ],

      actions: [
        "Notification autorité < 72h",
        "Notification utilisateurs concernés",
        "Surveillance renforcée",
      ],
    },
    {
      level: "low",
      name: "Faible",
      description: "Risque faible, impact minimal",
      examples: [
        "Incident technique sans exposition",
        "Erreur corrigée immédiatement",
        "Données non sensibles, impact limité",
      ],

      actions: [
        "Documentation interne",
        "Pas de notification obligatoire",
        "Amélioration des processus",
      ],
    },
  ],

  notificationContent: [
    "Nature de la violation",
    "Catégories et nombre de personnes concernées",
    "Catégories et nombre d'enregistrements concernés",
    "Conséquences probables",
    "Mesures prises ou envisagées",
    "Coordonnées du DPO",
  ],

  userNotification: {
    channels: ["Email", "Notification in-app", "SMS si critique"],
    language: "Langue de l'utilisateur",
    tone: "Clair, transparent, sans jargon technique",
    content: [
      "Description de l'incident",
      "Données concernées",
      "Actions déjà prises",
      "Recommandations pour l'utilisateur",
      "Contact pour questions",
    ],
  },

  implementation: {
    component: "@/viamentor/components/viamentor-gdpr-user-rights-actions",
    storage: "@/viamentor/data/viamentor-gdpr-data",
    acknowledgement: "Utilisateur doit accuser réception",
  },
};

// ============================================================================
// 5. COOKIES ET TRACKERS
// ============================================================================

export const COOKIE_MANAGEMENT = {
  description: "Gestion conforme des cookies et trackers",

  legalBasis: "ePrivacy Directive + RGPD",

  categories: [
    {
      category: "essential",
      name: "Cookies Essentiels",
      required: true,
      description: "Nécessaires au fonctionnement du site",
      examples: [
        "Session utilisateur",
        "Authentification",
        "Panier d'achat",
        "Préférences de langue",
      ],

      consent: "Pas de consentement requis",
    },
    {
      category: "analytics",
      name: "Cookies Analytics",
      required: false,
      description: "Mesure d'audience et amélioration",
      examples: ["Google Analytics", "Hotjar", "Statistiques de visite"],

      consent: "Consentement requis",
      retention: "13 mois maximum",
    },
    {
      category: "marketing",
      name: "Cookies Marketing",
      required: false,
      description: "Publicité ciblée et remarketing",
      examples: ["Facebook Pixel", "Google Ads", "LinkedIn Insight"],

      consent: "Consentement requis",
      retention: "13 mois maximum",
    },
  ],

  implementation: {
    banner: "@/viamentor/components/viamentor-cookie-banner",
    storage: "localStorage",
    granularity: "Par catégorie",
    refresh: "Tous les 13 mois",
  },
};

// ============================================================================
// 6. AUDIT TRAIL
// ============================================================================

export const AUDIT_TRAIL = {
  description: "Traçabilité complète des actions RGPD",

  events: [
    "Consentement donné/retiré",
    "Demande d'accès aux données",
    "Demande de suppression",
    "Export de données",
    "Modification de données",
    "Violation de données",
    "Notification envoyée",
  ],

  dataLogged: [
    "Timestamp précis",
    "User ID",
    "Type d'action",
    "Détails de l'action",
    "IP address",
    "User agent",
    "Résultat (succès/échec)",
  ],

  retention: "5 ans minimum (preuve de conformité)",

  access: [
    "DPO (Data Protection Officer)",
    "Autorités de contrôle (CNIL/PFPDT)",
    "Utilisateur concerné (ses propres logs)",
  ],
};

// ============================================================================
// 7. PAGES RGPD
// ============================================================================

export const GDPR_PAGES = {
  compliance: {
    path: "/compliance/gdpr",
    component: "@/viamentor/pages/viamentor-gdpr-compliance-page",
    description: "Dashboard DPO avec gestion requêtes et consentements",
    access: "DPO, Platform Admin, Super Admin",
  },

  privacyPolicy: {
    path: "/confidentialite",
    component: "@/viamentor/pages/viamentor-privacy-policy-page",
    description: "Politique de confidentialité complète",
    access: "Public",
    languages: ["fr", "de", "it", "en"],
  },

  cookiesPolicy: {
    path: "/cookies",
    component: "@/viamentor/pages/viamentor-cookies-policy-page",
    description: "Politique cookies détaillée",
    access: "Public",
    languages: ["fr", "de", "it", "en"],
  },

  legalTerms: {
    path: "/mentions-legales",
    component: "@/viamentor/pages/viamentor-legal-terms-page",
    description: "Mentions légales conformes",
    access: "Public",
    languages: ["fr", "de", "it", "en"],
  },

  userRights: {
    path: "/settings/privacy",
    component: "@/viamentor/components/viamentor-gdpr-user-rights-actions",
    description: "Gestion des droits RGPD utilisateur",
    access: "Utilisateur authentifié",
  },
};

// ============================================================================
// 8. CONFORMITÉ SUISSE (nLPD)
// ============================================================================

export const SWISS_NLPD_COMPLIANCE = {
  description:
    "Conformité avec la nouvelle loi suisse sur la protection des données",

  effectiveDate: "2023-09-01",

  specificRequirements: [
    {
      requirement: "Registre des traitements",
      description: "Documentation de tous les traitements de données",
      implementation: "Registre interne maintenu par le DPO",
    },
    {
      requirement: "Privacy by Design",
      description: "Protection des données dès la conception",
      implementation: "Revue de sécurité pour toutes les nouvelles features",
    },
    {
      requirement: "Analyse d'impact (PIA)",
      description: "Pour les traitements à risque élevé",
      implementation: "PIA documentée pour chaque nouveau traitement",
    },
    {
      requirement: "Transferts internationaux",
      description: "Garanties pour transferts hors Suisse/UE",
      implementation: "Clauses contractuelles types, adequacy decisions",
    },
  ],

  penalties: {
    max: "CHF 250'000 (personnes physiques)",
    violations: [
      "Non-respect des obligations d'information",
      "Non-respect des droits des personnes concernées",
      "Transferts illicites de données",
    ],
  },
};

// ============================================================================
// 9. CHECKLIST CONFORMITÉ
// ============================================================================

export const COMPLIANCE_CHECKLIST = {
  legal: [
    "✅ Politique de confidentialité complète et à jour",
    "✅ Mentions légales conformes",
    "✅ Politique cookies détaillée",
    "✅ CGU/CGV avec clauses RGPD",
  ],

  technical: [
    "✅ Consentement explicite et granulaire",
    "✅ Droit à l'oubli implémenté",
    "✅ Portabilité des données (JSON/CSV/PDF)",
    "✅ Notification des violations",
    "✅ Chiffrement des données sensibles (AES-256)",
    "✅ Pseudonymisation des données analytics",
    "✅ Audit trail complet",
  ],

  organizational: [
    "✅ DPO désigné et contactable",
    "✅ Registre des traitements maintenu",
    "✅ Procédures de gestion des violations",
    "✅ Formation du personnel",
    "✅ Contrats avec sous-traitants conformes",
  ],

  userRights: [
    "✅ Droit d'accès (Art. 15)",
    "✅ Droit de rectification (Art. 16)",
    "✅ Droit à l'effacement (Art. 17)",
    "✅ Droit à la limitation (Art. 18)",
    "✅ Droit à la portabilité (Art. 20)",
    "✅ Droit d'opposition (Art. 21)",
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
  CONSENT_MANAGEMENT,
  RIGHT_TO_BE_FORGOTTEN,
  DATA_PORTABILITY,
  BREACH_NOTIFICATIONS,
  COOKIE_MANAGEMENT,
  AUDIT_TRAIL,
  GDPR_PAGES,
  SWISS_NLPD_COMPLIANCE,
  COMPLIANCE_CHECKLIST,
};
