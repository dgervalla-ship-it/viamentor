/**
 * VIAMENTOR - FAQ Complète
 * Questions fréquemment posées et leurs réponses
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * FAQ complète Viamentor
 *
 * Cette FAQ couvre toutes les questions fréquentes des utilisateurs
 * organisées par catégorie et par rôle.
 *
 * Version: 1.0.0
 * Dernière mise à jour: 2025-01-20
 */

// ============================================================================
// 🎯 QUESTIONS GÉNÉRALES
// ============================================================================

export const GENERAL_FAQ = {
  title: "Questions Générales",

  questions: [
    {
      q: "Qu'est-ce que Viamentor ?",
      a: "Viamentor est un système de gestion complet pour écoles de conduite suisses, conforme aux réglementations OAC et OMCo.",
      tags: ["général", "présentation"],
    },
    {
      q: "Quels sont les rôles disponibles ?",
      a: "Super Admin, Platform Admin, School Admin, Secretary, Instructor, Student, Finance Manager, Marketing Manager, Accountant, Instructor Manager.",
      tags: ["général", "rôles"],
    },
    {
      q: "Quelles langues sont supportées ?",
      a: "Français, Allemand, Italien et Anglais avec traductions complètes.",
      tags: ["général", "i18n"],
    },
    {
      q: "Comment changer la langue ?",
      a: "Cliquez sur le sélecteur de langue dans le header (FR/DE/IT/EN).",
      tags: ["général", "i18n"],
    },
    {
      q: "Comment changer le thème (clair/sombre) ?",
      a: "Cliquez sur l'icône soleil/lune dans le header pour basculer entre les thèmes.",
      tags: ["général", "thème"],
    },
  ],
};

// ============================================================================
// 🔐 CONNEXION ET COMPTE
// ============================================================================

export const AUTH_FAQ = {
  title: "Connexion et Compte",

  questions: [
    {
      q: "Comment me connecter ?",
      a: "Allez sur /login, entrez votre email et mot de passe, puis cliquez sur Se connecter.",
      tags: ["auth", "connexion"],
    },
    {
      q: "J'ai oublié mon mot de passe, que faire ?",
      a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion et suivez les instructions.",
      tags: ["auth", "mot de passe"],
    },
    {
      q: "Comment changer mon mot de passe ?",
      a: "Profil > Paramètres > Sécurité > Changer mot de passe.",
      tags: ["auth", "mot de passe"],
    },
    {
      q: "Puis-je avoir plusieurs comptes ?",
      a: "Non, un email = un compte. Contactez l'administrateur pour changer de rôle.",
      tags: ["auth", "compte"],
    },
    {
      q: "Comment me déconnecter ?",
      a: "Cliquez sur votre avatar en haut à droite > Déconnexion.",
      tags: ["auth", "déconnexion"],
    },
  ],
};

// ============================================================================
// 👥 GESTION DES ÉLÈVES
// ============================================================================

export const STUDENTS_FAQ = {
  title: "Gestion des Élèves",

  questions: [
    {
      q: "Comment inscrire un nouvel élève ?",
      a: "Élèves > Nouveau > Suivez le wizard en 4 étapes (Identité, Formation, Documents, Résumé).",
      tags: ["élèves", "inscription"],
    },
    {
      q: "Quels documents sont obligatoires ?",
      a: "Permis d'élève conducteur, cours premiers secours, cours sensibilisation, autorisation parentale si mineur.",
      tags: ["élèves", "documents"],
    },
    {
      q: "Comment rechercher un élève ?",
      a: "Utilisez la barre de recherche en haut ou allez dans Élèves et utilisez les filtres.",
      tags: ["élèves", "recherche"],
    },
    {
      q: "Comment modifier les informations d'un élève ?",
      a: "Profil élève > Onglet Informations > Cliquez sur Modifier.",
      tags: ["élèves", "modification"],
    },
    {
      q: "Comment voir la progression d'un élève ?",
      a: "Profil élève > Onglet Progression pour voir heures, compétences et objectifs.",
      tags: ["élèves", "progression"],
    },
    {
      q: "Comment archiver un élève ?",
      a: "Profil élève > Actions > Archiver. L'élève reste consultable mais n'apparaît plus dans les listes actives.",
      tags: ["élèves", "archivage"],
    },
  ],
};

// ============================================================================
// 👨‍🏫 GESTION DES MONITEURS
// ============================================================================

export const INSTRUCTORS_FAQ = {
  title: "Gestion des Moniteurs",

  questions: [
    {
      q: "Comment créer un nouveau moniteur ?",
      a: "Moniteurs > Nouveau > Suivez le wizard (Infos personnelles, Qualifications, Autorisations légales).",
      tags: ["moniteurs", "création"],
    },
    {
      q: "Quelles qualifications sont obligatoires ?",
      a: "Autorisation OMCo valide, catégories enseignées, assurance responsabilité civile.",
      tags: ["moniteurs", "qualifications"],
    },
    {
      q: "Comment gérer les disponibilités d'un moniteur ?",
      a: "Profil moniteur > Planning > Gérer disponibilités > Définir horaires et exceptions.",
      tags: ["moniteurs", "disponibilités"],
    },
    {
      q: "Comment voir les performances d'un moniteur ?",
      a: "Profil moniteur > Onglet Performance pour voir taux réussite, satisfaction, heures enseignées.",
      tags: ["moniteurs", "performance"],
    },
    {
      q: "Comment assigner un élève à un moniteur ?",
      a: "Profil élève > Informations > Modifier > Sélectionner moniteur assigné.",
      tags: ["moniteurs", "assignation"],
    },
  ],
};

// ============================================================================
// 📅 PLANNING ET LEÇONS
// ============================================================================

export const PLANNING_FAQ = {
  title: "Planning et Leçons",

  questions: [
    {
      q: "Comment réserver une leçon ?",
      a: "Planning > Nouvelle leçon > Sélectionnez élève, moniteur, véhicule, date et heure.",
      tags: ["planning", "réservation"],
    },
    {
      q: "Comment modifier une leçon ?",
      a: "Cliquez sur la leçon dans le planning > Modifier > Changez les informations > Enregistrer.",
      tags: ["planning", "modification"],
    },
    {
      q: "Comment annuler une leçon ?",
      a: "Cliquez sur la leçon > Annuler > Indiquez la raison > Confirmer.",
      tags: ["planning", "annulation"],
    },
    {
      q: "Quelle est la politique d'annulation ?",
      a: "Gratuit jusqu'à 24h avant, 50% entre 24h-12h, 100% moins de 12h avant.",
      tags: ["planning", "annulation"],
    },
    {
      q: "Comment voir les conflits de planning ?",
      a: "Le système détecte automatiquement les conflits et affiche des alertes.",
      tags: ["planning", "conflits"],
    },
    {
      q: "Comment exporter le planning ?",
      a: "Planning > Actions > Exporter > Choisissez format (Excel/PDF) et période.",
      tags: ["planning", "export"],
    },
  ],
};

// ============================================================================
// 💰 FACTURATION ET PAIEMENTS
// ============================================================================

export const BILLING_FAQ = {
  title: "Facturation et Paiements",

  questions: [
    {
      q: "Comment créer une facture ?",
      a: "Facturation > Nouvelle facture > Sélectionnez élève > Ajoutez prestations > Générer.",
      tags: ["facturation", "création"],
    },
    {
      q: "Comment envoyer une facture par email ?",
      a: "Facture > Actions > Envoyer par email > Vérifiez destinataire > Envoyer.",
      tags: ["facturation", "envoi"],
    },
    {
      q: "Qu'est-ce qu'un QR-bill ?",
      a: "Code QR suisse pour paiements bancaires, généré automatiquement sur chaque facture.",
      tags: ["facturation", "qr-bill"],
    },
    {
      q: "Comment enregistrer un paiement ?",
      a: "Paiements > Enregistrer paiement > Sélectionnez facture > Entrez montant et méthode.",
      tags: ["paiements", "enregistrement"],
    },
    {
      q: "Comment importer un fichier Camt.054 ?",
      a: "Paiements > Importer Camt > Sélectionnez fichier > Vérifiez matching > Valider.",
      tags: ["paiements", "camt"],
    },
    {
      q: "Comment gérer les relances ?",
      a: "Facturation > Relances > Configurez les règles automatiques ou envoyez manuellement.",
      tags: ["facturation", "relances"],
    },
  ],
};

// ============================================================================
// 📊 ANALYTICS ET RAPPORTS
// ============================================================================

export const ANALYTICS_FAQ = {
  title: "Analytics et Rapports",

  questions: [
    {
      q: "Où voir les analytics ?",
      a: "Menu > Analytics > Choisissez le dashboard (Revenus, Moniteurs, Véhicules, Examens, Financier).",
      tags: ["analytics", "accès"],
    },
    {
      q: "Comment exporter un rapport ?",
      a: "Dashboard analytics > Actions > Exporter > Choisissez format et période.",
      tags: ["analytics", "export"],
    },
    {
      q: "Quelle est la différence entre MRR et revenus mensuels ?",
      a: "MRR = revenus récurrents mensuels (abonnements), Revenus mensuels = total incluant one-time.",
      tags: ["analytics", "métriques"],
    },
    {
      q: "Comment voir le taux de réussite aux examens ?",
      a: "Analytics > Examens > Section 'Taux de Réussite' avec graphiques détaillés.",
      tags: ["analytics", "examens"],
    },
    {
      q: "Comment consulter les performances des moniteurs ?",
      a: "Analytics > Moniteurs > Ranking, workload, satisfaction et catégories expertise.",
      tags: ["analytics", "moniteurs"],
    },
  ],
};

// ============================================================================
// 🚗 GESTION DES VÉHICULES
// ============================================================================

export const VEHICLES_FAQ = {
  title: "Gestion des Véhicules",

  questions: [
    {
      q: "Comment ajouter un véhicule ?",
      a: "Véhicules > Nouveau > Suivez le wizard (Infos, Équipements, Assurances, Résumé).",
      tags: ["véhicules", "ajout"],
    },
    {
      q: "Quels équipements sont obligatoires ?",
      a: "Selon OAC Art. 65-68: double commande, rétroviseur additionnel, signalisation école.",
      tags: ["véhicules", "équipements"],
    },
    {
      q: "Comment suivre l'entretien d'un véhicule ?",
      a: "Profil véhicule > Onglet Historique > Section Maintenance avec alertes automatiques.",
      tags: ["véhicules", "entretien"],
    },
    {
      q: "Comment voir l'utilisation d'un véhicule ?",
      a: "Profil véhicule > Onglet Analytics pour taux utilisation, coûts, revenus.",
      tags: ["véhicules", "utilisation"],
    },
    {
      q: "Comment gérer le carburant ?",
      a: "Profil véhicule > Onglet Carburant > Enregistrer pleins et suivre consommation.",
      tags: ["véhicules", "carburant"],
    },
  ],
};

// ============================================================================
// 📝 EXAMENS
// ============================================================================

export const EXAMS_FAQ = {
  title: "Examens",

  questions: [
    {
      q: "Comment inscrire un élève à l'examen ?",
      a: "Profil élève > Actions > Inscrire à l'examen > Vérifiez prérequis > Confirmer.",
      tags: ["examens", "inscription"],
    },
    {
      q: "Quels sont les prérequis pour l'examen ?",
      a: "Heures minimales, cours obligatoires, permis d'élève valide 12 mois, recommandation moniteur.",
      tags: ["examens", "prérequis"],
    },
    {
      q: "Comment enregistrer un résultat d'examen ?",
      a: "Examens > Sélectionner examen > Enregistrer résultat > Réussi/Échoué + commentaires.",
      tags: ["examens", "résultats"],
    },
    {
      q: "Comment voir les statistiques d'examens ?",
      a: "Analytics > Examens pour taux réussite, analyse échecs, recommandations.",
      tags: ["examens", "statistiques"],
    },
    {
      q: "Que faire en cas d'échec ?",
      a: "Analyser erreurs, planifier leçons supplémentaires, réinscrire quand prêt.",
      tags: ["examens", "échec"],
    },
  ],
};

// ============================================================================
// 🔄 RATTRAPAGES
// ============================================================================

export const MAKEUPS_FAQ = {
  title: "Rattrapages",

  questions: [
    {
      q: "Qu'est-ce qu'un crédit de rattrapage ?",
      a: "Crédit offert à un élève pour compenser une leçon annulée par l'école ou le moniteur.",
      tags: ["rattrapages", "définition"],
    },
    {
      q: "Comment accorder un crédit ?",
      a: "Moniteur > Rattrapages > Accorder crédit > Sélectionner élève et raison.",
      tags: ["rattrapages", "accord"],
    },
    {
      q: "Quelle est la durée de validité ?",
      a: "Configurable dans Paramètres > Rattrapages (par défaut 90 jours).",
      tags: ["rattrapages", "validité"],
    },
    {
      q: "Comment utiliser un crédit ?",
      a: "Automatique lors de la réservation si crédit disponible.",
      tags: ["rattrapages", "utilisation"],
    },
    {
      q: "Que se passe-t-il si le crédit expire ?",
      a: "Notification automatique avant expiration, puis crédit perdu si non utilisé.",
      tags: ["rattrapages", "expiration"],
    },
  ],
};

// ============================================================================
// ⚙️ PARAMÈTRES
// ============================================================================

export const SETTINGS_FAQ = {
  title: "Paramètres",

  questions: [
    {
      q: "Comment modifier les informations de l'école ?",
      a: "Paramètres > École > Modifier nom, adresse, coordonnées, logo.",
      tags: ["paramètres", "école"],
    },
    {
      q: "Comment changer les tarifs ?",
      a: "Paramètres > Tarification > Modifier prix leçons, forfaits, TVA.",
      tags: ["paramètres", "tarifs"],
    },
    {
      q: "Comment configurer les notifications ?",
      a: "Paramètres > Notifications > Définir templates emails/SMS et triggers.",
      tags: ["paramètres", "notifications"],
    },
    {
      q: "Comment gérer les utilisateurs ?",
      a: "Paramètres > Utilisateurs > Inviter, modifier rôles, désactiver comptes.",
      tags: ["paramètres", "utilisateurs"],
    },
    {
      q: "Comment configurer les horaires d'ouverture ?",
      a: "Paramètres > Horaires > Définir jours et heures d'ouverture, jours fériés.",
      tags: ["paramètres", "horaires"],
    },
  ],
};

// ============================================================================
// 🔧 PROBLÈMES TECHNIQUES
// ============================================================================

export const TECHNICAL_FAQ = {
  title: "Problèmes Techniques",

  questions: [
    {
      q: "La page ne charge pas, que faire ?",
      a: "Rafraîchissez (F5), videz le cache (Ctrl+Shift+R), vérifiez votre connexion internet.",
      tags: ["technique", "chargement"],
    },
    {
      q: "J'ai une erreur 'Unauthorized', pourquoi ?",
      a: "Votre session a expiré ou vous n'avez pas les permissions. Reconnectez-vous.",
      tags: ["technique", "erreur"],
    },
    {
      q: "Les données ne se mettent pas à jour",
      a: "Rafraîchissez la page ou attendez quelques secondes (mise à jour temps réel).",
      tags: ["technique", "données"],
    },
    {
      q: "Je ne vois pas certaines fonctionnalités",
      a: "Vérifiez vos permissions (rôle). Contactez l'administrateur si nécessaire.",
      tags: ["technique", "permissions"],
    },
    {
      q: "Comment signaler un bug ?",
      a: "Support > Signaler un problème > Décrivez le bug avec captures d'écran.",
      tags: ["technique", "bug"],
    },
  ],
};

// ============================================================================
// 📱 MOBILE ET RESPONSIVE
// ============================================================================

export const MOBILE_FAQ = {
  title: "Mobile et Responsive",

  questions: [
    {
      q: "Puis-je utiliser Viamentor sur mobile ?",
      a: "Oui, l'interface est entièrement responsive et optimisée pour mobile/tablette.",
      tags: ["mobile", "compatibilité"],
    },
    {
      q: "Y a-t-il une application mobile ?",
      a: "Non, mais l'interface web s'adapte parfaitement aux mobiles (PWA).",
      tags: ["mobile", "app"],
    },
    {
      q: "Comment naviguer sur mobile ?",
      a: "Menu hamburger en haut à gauche, swipe pour changer d'onglet, touch gestures.",
      tags: ["mobile", "navigation"],
    },
    {
      q: "Puis-je réserver une leçon depuis mon téléphone ?",
      a: "Oui, toutes les fonctionnalités sont disponibles sur mobile.",
      tags: ["mobile", "fonctionnalités"],
    },
  ],
};

// ============================================================================
// 📞 SUPPORT ET AIDE
// ============================================================================

export const SUPPORT_FAQ = {
  title: "Support et Aide",

  questions: [
    {
      q: "Comment contacter le support ?",
      a: "Email: support@viamentor.ch, Téléphone: +41 XX XXX XX XX (Lun-Ven 9h-18h).",
      tags: ["support", "contact"],
    },
    {
      q: "Où trouver la documentation ?",
      a: "Menu > Documentation ou visitez /docs pour accéder à tous les guides.",
      tags: ["support", "documentation"],
    },
    {
      q: "Y a-t-il des vidéos tutoriels ?",
      a: "Oui, disponibles dans la section Aide de chaque module.",
      tags: ["support", "tutoriels"],
    },
    {
      q: "Puis-je demander une formation ?",
      a: "Oui, contactez le support pour planifier une session de formation.",
      tags: ["support", "formation"],
    },
    {
      q: "Quel est le délai de réponse du support ?",
      a: "Moins de 24h en semaine, 48h le week-end pour questions non urgentes.",
      tags: ["support", "délai"],
    },
  ],
};

// ============================================================================
// 📋 INDEX PAR TAGS
// ============================================================================

export const FAQ_BY_TAGS = {
  général: [
    "Qu'est-ce que Viamentor ?",
    "Quels sont les rôles disponibles ?",
    "Quelles langues sont supportées ?",
  ],

  élèves: [
    "Comment inscrire un nouvel élève ?",
    "Comment rechercher un élève ?",
    "Comment voir la progression d'un élève ?",
  ],

  moniteurs: [
    "Comment créer un nouveau moniteur ?",
    "Comment gérer les disponibilités d'un moniteur ?",
    "Comment voir les performances d'un moniteur ?",
  ],

  planning: [
    "Comment réserver une leçon ?",
    "Comment modifier une leçon ?",
    "Comment annuler une leçon ?",
  ],

  facturation: [
    "Comment créer une facture ?",
    "Comment enregistrer un paiement ?",
    "Comment importer un fichier Camt.054 ?",
  ],

  examens: [
    "Comment inscrire un élève à l'examen ?",
    "Quels sont les prérequis pour l'examen ?",
    "Comment enregistrer un résultat d'examen ?",
  ],
};

// ============================================================================
// 🔍 RECHERCHE RAPIDE
// ============================================================================

export const QUICK_SEARCH_KEYWORDS = {
  // Mots-clés pour recherche rapide
  inscription: ["élève", "nouveau", "créer", "ajouter"],
  réservation: ["leçon", "planning", "réserver", "book"],
  facturation: ["facture", "paiement", "invoice", "billing"],
  examen: ["test", "pratique", "inscription"],
  moniteur: ["instructor", "teacher", "disponibilité"],
  véhicule: ["voiture", "car", "vehicle", "entretien"],
  support: ["aide", "help", "contact", "problème"],
};

export const FAQ_VERSION = "1.0.0";
export const FAQ_LAST_UPDATE = "2025-01-20";
export const TOTAL_QUESTIONS = 100; // Approximatif
