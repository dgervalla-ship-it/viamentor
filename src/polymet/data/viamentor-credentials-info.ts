/**
 * VIAMENTOR - Informations d'identification
 * Document récapitulatif des identifiants de connexion
 *
 * @module data/viamentor-credentials-info
 * @version 1.1.0
 */

/**
 * Informations de connexion ViaMenutor
 */
export const VIAMENTOR_CREDENTIALS = {
  /**
   * Mot de passe universel pour tous les utilisateurs de test
   */
  PASSWORD: "viamentor2025",

  /**
   * Règles de validation du mot de passe
   */
  PASSWORD_RULES: {
    minLength: 8,
    description: "Minimum 8 caractères (sans contraintes de complexité)",
  },

  /**
   * Utilisateurs de test disponibles
   */
  USERS: [
    {
      role: "Platform Admin",
      email: "admin@viamentor.ch",
      password: "viamentor2025",
      description: "Administrateur plateforme - Accès complet",
      dashboard: "/tenants",
      permissions: [
        "Gestion des tenants",
        "Configuration globale",
        "Analytics plateforme",
        "GDPR compliance",
      ],
    },
    {
      role: "School Admin",
      email: "school@viamentor.ch",
      password: "viamentor2025",
      description: "Administrateur auto-école - Gestion complète",
      dashboard: "/dashboard",
      permissions: [
        "Gestion élèves",
        "Gestion moniteurs",
        "Planning et leçons",
        "Facturation",
        "Rapports",
      ],
    },
    {
      role: "Instructor",
      email: "instructor@viamentor.ch",
      password: "viamentor2025",
      description: "Moniteur - Gestion des leçons",
      dashboard: "/instructor-dashboard",
      permissions: [
        "Planning personnel",
        "Élèves assignés",
        "Évaluation progression",
        "Disponibilités",
      ],
    },
    {
      role: "Student",
      email: "student@viamentor.ch",
      password: "viamentor2025",
      description: "Élève - Suivi formation",
      dashboard: "/student-dashboard",
      permissions: [
        "Progression personnelle",
        "Réservation leçons",
        "Documents",
        "Paiements",
      ],
    },
  ],

  /**
   * Instructions de connexion
   */
  INSTRUCTIONS: {
    manual: [
      "1. Allez sur la page /login",
      "2. Entrez un email de test (ex: school@viamentor.ch)",
      "3. Entrez le mot de passe: viamentor2025",
      "4. Cliquez sur 'Se connecter'",
    ],

    quick: [
      "1. Allez sur la page /login",
      "2. Cliquez sur un bouton 'Connexion rapide'",
      "3. Le formulaire sera pré-rempli automatiquement",
      "4. Cliquez sur 'Se connecter'",
    ],

    autoLogin: [
      "1. Allez sur /supabase-demo",
      "2. Activez 'Auto-login' dans l'onglet Configuration",
      "3. Rechargez la page - connexion automatique !",
    ],
  },

  /**
   * Informations de sécurité
   */
  SECURITY: {
    environment: "development",
    warning:
      "⚠️ Ces identifiants sont UNIQUEMENT pour le développement et la démonstration",
    notes: [
      "Aucune connexion Supabase réelle",
      "Données stockées en localStorage",
      "Sessions expirées après 1 heure",
      "Ne jamais utiliser en production",
    ],
  },
} as const;

/**
 * Fonction helper pour obtenir les identifiants d'un rôle
 */
export function getCredentialsByRole(role: string) {
  return VIAMENTOR_CREDENTIALS.USERS.find((user) =>
    user.role.toLowerCase().includes(role.toLowerCase())
  );
}

/**
 * Fonction helper pour obtenir tous les emails
 */
export function getAllEmails() {
  return VIAMENTOR_CREDENTIALS.USERS.map((user) => user.email);
}

/**
 * Fonction helper pour valider un mot de passe
 */
export function validatePassword(password: string): {
  valid: boolean;
  message?: string;
} {
  const { minLength } = VIAMENTOR_CREDENTIALS.PASSWORD_RULES;

  if (password.length < minLength) {
    return {
      valid: false,
      message: `Le mot de passe doit contenir au moins ${minLength} caractères`,
    };
  }

  return { valid: true };
}

/**
 * Affichage formaté des identifiants (pour console/logs)
 */
export function displayCredentials() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         VIAMENTOR - IDENTIFIANTS DE CONNEXION             ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║                                                            ║");
  console.log("║  MOT DE PASSE UNIVERSEL: viamentor2025                     ║");
  console.log("║  (8 caractères minimum)                                    ║");
  console.log("║                                                            ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  UTILISATEURS DE TEST:                                     ║");
  console.log("║                                                            ║");

  VIAMENTOR_CREDENTIALS.USERS.forEach((user, index) => {
    console.log(`║  ${index + 1}. ${user.role.padEnd(20)} ║`);
    console.log(`║     Email: ${user.email.padEnd(35)} ║`);
    console.log(`║     Dashboard: ${user.dashboard.padEnd(31)} ║`);
    console.log(
      "║                                                            ║"
    );
  });

  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  CONNEXION RAPIDE:                                         ║");
  console.log("║  - Page /login → Boutons 'Connexion rapide'                ║");
  console.log("║  - Page /supabase-demo → Configuration auto-login          ║");
  console.log("║                                                            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
}

export default VIAMENTOR_CREDENTIALS;
