/**
 * ============================================================================
 * VIAMENTOR - I18N IMPLEMENTATION GUIDE
 * ============================================================================
 *
 * Guide complet pour implémenter les améliorations i18n
 * Score: 9/10 → 10/10
 */

// ============================================================================
// 1. CHECKLIST IMPLÉMENTATION
// ============================================================================

export const I18N_CHECKLIST = {
  "Phase 1 - Structure Centralisée": {
    priority: "HIGH",
    estimatedTime: "1 jour",
    tasks: [
      {
        id: "i18n-1",
        task: "Créer @/viamentor/i18n/locales/fr.ts avec structure complète",
        status: "pending" as const,
      },
      {
        id: "i18n-2",
        task: "Créer @/viamentor/i18n/locales/de.ts (copier structure FR)",
        status: "pending" as const,
      },
      {
        id: "i18n-3",
        task: "Créer @/viamentor/i18n/locales/it.ts (copier structure FR)",
        status: "pending" as const,
      },
      {
        id: "i18n-4",
        task: "Créer @/viamentor/i18n/locales/en.ts (copier structure FR)",
        status: "pending" as const,
      },
      {
        id: "i18n-5",
        task: "Créer @/viamentor/i18n/namespaces.ts (types TypeScript)",
        status: "pending" as const,
      },
      {
        id: "i18n-6",
        task: "Créer @/viamentor/i18n/validator.ts (script validation)",
        status: "pending" as const,
      },
      {
        id: "i18n-7",
        task: "Créer @/viamentor/i18n/index.ts (exports)",
        status: "pending" as const,
      },
    ],
  },

  "Phase 2 - Migration Traductions": {
    priority: "HIGH",
    estimatedTime: "2-3 jours",
    tasks: [
      {
        id: "i18n-8",
        task: "Migrer viamentor-students-i18n → students namespace",
        status: "pending" as const,
      },
      {
        id: "i18n-9",
        task: "Migrer viamentor-instructors-i18n → instructors namespace",
        status: "pending" as const,
      },
      {
        id: "i18n-10",
        task: "Migrer viamentor-vehicles-i18n → vehicles namespace",
        status: "pending" as const,
      },
      {
        id: "i18n-11",
        task: "Migrer viamentor-planning-i18n → planning namespace",
        status: "pending" as const,
      },
      {
        id: "i18n-12",
        task: "Migrer viamentor-invoices-i18n → invoices namespace",
        status: "pending" as const,
      },
      {
        id: "i18n-13",
        task: "Identifier traductions communes → common namespace",
        status: "pending" as const,
      },
      {
        id: "i18n-14",
        task: "Supprimer duplications",
        status: "pending" as const,
      },
    ],
  },

  "Phase 3 - Mise à Jour Composants": {
    priority: "MEDIUM",
    estimatedTime: "2-3 jours",
    tasks: [
      {
        id: "i18n-15",
        task: "Mettre à jour LocaleProvider pour fichiers centralisés",
        status: "pending" as const,
      },
      {
        id: "i18n-16",
        task: "Ajouter support namespaces dans useTranslation()",
        status: "pending" as const,
      },
      {
        id: "i18n-17",
        task: "Mettre à jour tous les composants students",
        status: "pending" as const,
      },
      {
        id: "i18n-18",
        task: "Mettre à jour tous les composants instructors",
        status: "pending" as const,
      },
      {
        id: "i18n-19",
        task: "Mettre à jour tous les composants vehicles",
        status: "pending" as const,
      },
      {
        id: "i18n-20",
        task: "Mettre à jour tous les autres composants",
        status: "pending" as const,
      },
    ],
  },

  "Phase 4 - Validation & Tests": {
    priority: "MEDIUM",
    estimatedTime: "1 jour",
    tasks: [
      {
        id: "i18n-21",
        task: "Créer script npm run i18n:validate",
        status: "pending" as const,
      },
      {
        id: "i18n-22",
        task: "Exécuter validation et corriger erreurs",
        status: "pending" as const,
      },
      {
        id: "i18n-23",
        task: "Vérifier coverage 100% pour toutes les langues",
        status: "pending" as const,
      },
      {
        id: "i18n-24",
        task: "Ajouter tests unitaires validation",
        status: "pending" as const,
      },
      {
        id: "i18n-25",
        task: "Intégrer validation dans CI/CD",
        status: "pending" as const,
      },
    ],
  },

  "Phase 5 - Nettoyage & Documentation": {
    priority: "LOW",
    estimatedTime: "0.5 jour",
    tasks: [
      {
        id: "i18n-26",
        task: "Supprimer anciens fichiers *-i18n.ts",
        status: "pending" as const,
      },
      {
        id: "i18n-27",
        task: "Mettre à jour documentation développeur",
        status: "pending" as const,
      },
      {
        id: "i18n-28",
        task: "Former l'équipe aux nouveaux patterns",
        status: "pending" as const,
      },
    ],
  },
};

// ============================================================================
// 2. IMPLÉMENTATION DÉTAILLÉE
// ============================================================================

/**
 * ÉTAPE 1: Créer fichier centralisé FR
 */
const step1CreateFR = `
// @/viamentor/i18n/locales/fr.ts

export const fr = {
  // Namespace common (réutilisable)
  common: {
    actions: {
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      create: "Créer",
      close: "Fermer",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      import: "Importer",
      print: "Imprimer",
      download: "Télécharger",
      upload: "Téléverser",
      refresh: "Actualiser",
      reset: "Réinitialiser",
      submit: "Soumettre",
      confirm: "Confirmer",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      finish: "Terminer",
    },
    status: {
      active: "Actif",
      inactive: "Inactif",
      pending: "En attente",
      completed: "Terminé",
      cancelled: "Annulé",
      draft: "Brouillon",
      archived: "Archivé",
    },
    messages: {
      success: "Opération réussie",
      error: "Une erreur est survenue",
      loading: "Chargement en cours...",
      noData: "Aucune donnée disponible",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
      unsavedChanges: "Vous avez des modifications non enregistrées",
    },
    validation: {
      required: "Ce champ est obligatoire",
      email: "Email invalide",
      phone: "Numéro de téléphone invalide",
      minLength: "Minimum {{min}} caractères",
      maxLength: "Maximum {{max}} caractères",
    },
  },

  // Namespace students
  students: {
    title: "Élèves",
    subtitle: "Gestion des élèves",
    count: {
      zero: "Aucun élève",
      one: "1 élève",
      other: "{{count}} élèves",
    },
    actions: {
      createStudent: "Créer un élève",
      editStudent: "Modifier l'élève",
      deleteStudent: "Supprimer l'élève",
      exportList: "Exporter la liste",
      viewDetails: "Voir les détails",
      viewProgress: "Voir la progression",
      bookLesson: "Réserver une leçon",
    },
    fields: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      birthDate: "Date de naissance",
      address: "Adresse",
      city: "Ville",
      postalCode: "Code postal",
      canton: "Canton",
      category: "Catégorie",
      instructor: "Moniteur",
      status: "Statut",
    },
    tabs: {
      information: "Informations",
      progression: "Progression",
      documents: "Documents",
      invoices: "Factures",
      planning: "Planning",
      history: "Historique",
    },
  },

  // Namespace instructors
  instructors: {
    title: "Moniteurs",
    subtitle: "Gestion des moniteurs",
    count: {
      zero: "Aucun moniteur",
      one: "1 moniteur",
      other: "{{count}} moniteurs",
    },
    actions: {
      createInstructor: "Créer un moniteur",
      viewSchedule: "Voir le planning",
      viewPerformance: "Voir les performances",
    },
    fields: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      categories: "Catégories",
      status: "Statut",
    },
  },

  // Autres namespaces...
  vehicles: { title: "Véhicules" },
  planning: { title: "Planning" },
  invoices: { title: "Factures" },
  analytics: { title: "Analytics" },
  settings: { title: "Paramètres" },
};
`;

/**
 * ÉTAPE 2: Créer script validation
 */
const step2CreateValidator = `
// @/viamentor/i18n/validator.ts

import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { it } from "./locales/it";
import { en } from "./locales/en";

export interface ValidationError {
  lang: string;
  type: "missing" | "extra";
  keys: string[];
  message: string;
}

export function validateTranslations() {
  const reference = fr;
  const languages = { de, it, en };
  const errors: ValidationError[] = [];

  for (const [lang, translations] of Object.entries(languages)) {
    const refKeys = getAllKeys(reference);
    const langKeys = getAllKeys(translations);

    // Clés manquantes
    const missing = refKeys.filter(k => !langKeys.includes(k));
    if (missing.length > 0) {
      errors.push({
        lang,
        type: "missing",
        keys: missing,
        message: \`\${missing.length} clés manquantes en \${lang}\`,
      });
    }

    // Clés en trop
    const extra = langKeys.filter(k => !refKeys.includes(k));
    if (extra.length > 0) {
      errors.push({
        lang,
        type: "extra",
        keys: extra,
        message: \`\${extra.length} clés en trop en \${lang}\`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function getAllKeys(obj: any, prefix = ""): string[] {
  let keys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? \`\${prefix}.\${key}\` : key;

    if (typeof value === "object" && value !== null) {
      if ("zero" in value || "one" in value || "other" in value) {
        keys.push(fullKey);
      } else {
        keys = keys.concat(getAllKeys(value, fullKey));
      }
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}
`;

/**
 * ÉTAPE 3: Mettre à jour LocaleProvider
 */
const step3UpdateProvider = `
// @/viamentor/components/viamentor-locale-provider

import { fr } from "@/viamentor/i18n/locales/fr";
import { de } from "@/viamentor/i18n/locales/de";
import { it } from "@/viamentor/i18n/locales/it";
import { en } from "@/viamentor/i18n/locales/en";

const TRANSLATIONS = { fr, de, it, en };

export function useTranslation() {
  const { locale } = useLocale();

  const t = useCallback((key: string, params?: Record<string, any>) => {
    const translations = TRANSLATIONS[locale];
    const value = getValueByKey(translations, key);

    if (!value) {
      console.warn(\`Missing translation: \${key}\`);
      return key;
    }

    // Pluralization
    if (typeof value === "object" && params?.count !== undefined) {
      const count = params.count;
      const pluralKey = count === 0 ? "zero" : count === 1 ? "one" : "other";
      return interpolate(value[pluralKey] || value.other, params);
    }

    return interpolate(value, params);
  }, [locale]);

  return { t };
}

function getValueByKey(obj: any, key: string): any {
  const parts = key.split(".");
  let current = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
}

function interpolate(str: string, params?: Record<string, any>): string {
  if (!params) return str;

  return str.replace(/{{(\\w+)}}/g, (_, key) => {
    return params[key]?.toString() || "";
  });
}
`;

/**
 * ÉTAPE 4: Mettre à jour composants
 */
const step4UpdateComponents = `
// ❌ AVANT
import { STUDENTS_TRANSLATIONS } from "@/viamentor/data/viamentor-students-i18n";

export function StudentsList() {
  const { locale } = useLocale();
  const t = STUDENTS_TRANSLATIONS[locale];

  return (
    <div>
      <h1>{t.title}</h1>
      <Button>{t.save}</Button>
      <Button>{t.createStudent}</Button>
    </div>
  );
}

// ✅ APRÈS
import { useTranslation } from "@/viamentor/components/viamentor-locale-provider";

export function StudentsList() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("students.title")}</h1>
      <Button>{t("common.actions.save")}</Button>
      <Button>{t("students.actions.createStudent")}</Button>
    </div>
  );
}
`;

/**
 * ÉTAPE 5: Script CLI validation
 */
const step5CLI = `
// scripts/validate-i18n.ts

import { validateTranslations } from "@/viamentor/i18n/validator";

const result = validateTranslations();

if (!result.valid) {
  console.error("❌ Validation i18n échouée\\n");

  for (const error of result.errors) {
    console.error(\`[\${error.lang}] \${error.message}\`);
    console.error(\`  Clés: \${error.keys.slice(0, 5).join(", ")}\${error.keys.length > 5 ? "..." : ""}\`);
  }

  process.exit(1);
}

console.log("✅ Validation i18n réussie");
`;

/**
 * ÉTAPE 6: Intégration CI/CD
 */
const step6CICD = `
// .github/workflows/i18n-validation.yml

name: I18n Validation

on:
  pull_request:
    paths:
      - 'viamentor/i18n/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate i18n
        run: npm run i18n:validate
`;

// ============================================================================
// 3. ROADMAP
// ============================================================================

export const I18N_ROADMAP = {
  "Semaine 1 - Structure & Migration": {
    days: "Lundi-Mercredi",
    focus: "Créer structure centralisée et migrer traductions",
    deliverables: [
      "✅ Structure @/viamentor/i18n/ créée",
      "✅ Fichiers fr/de/it/en créés",
      "✅ Script validation créé",
      "✅ Traductions migrées vers namespaces",
      "✅ Duplications supprimées",
    ],
  },

  "Semaine 1 - Composants": {
    days: "Jeudi-Vendredi",
    focus: "Mettre à jour LocaleProvider et composants",
    deliverables: [
      "✅ LocaleProvider mis à jour",
      "✅ Hook useTranslation() avec namespaces",
      "✅ 50% des composants migrés",
    ],
  },

  "Semaine 2 - Finalisation": {
    days: "Lundi-Mercredi",
    focus: "Finir migration et validation",
    deliverables: [
      "✅ 100% des composants migrés",
      "✅ Validation 100% coverage",
      "✅ Tests unitaires",
      "✅ CI/CD intégré",
      "✅ Documentation",
    ],
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  step1CreateFR,
  step2CreateValidator,
  step3UpdateProvider,
  step4UpdateComponents,
  step5CLI,
  step6CICD,
};
