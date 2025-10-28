/**
 * ============================================================================
 * VIAMENTOR - I18N README
 * ============================================================================
 *
 * Documentation complète du système d'internationalisation
 *
 * @module viamentor-i18n-readme
 */

// ============================================================================
// 📚 TABLE DES MATIÈRES
// ============================================================================

export const TABLE_OF_CONTENTS = {
  "1. Vue d'ensemble": "Présentation du système i18n",
  "2. Architecture": "Structure des fichiers et namespaces",
  "3. Utilisation": "Comment utiliser les traductions",
  "4. Validation": "Script de validation automatique",
  "5. Contribution": "Comment ajouter des traductions",
  "6. Migration": "Guide de migration depuis ancien système",
  "7. FAQ": "Questions fréquentes",
};

// ============================================================================
// 1. VUE D'ENSEMBLE
// ============================================================================

export const OVERVIEW = {
  description: `
Le système i18n de Viamentor supporte 4 langues (FR/DE/IT/EN) avec :
- Traductions centralisées par langue
- Namespaces pour éviter les collisions
- Pluralization automatique
- Formatage localisé (dates, nombres, devise)
- Validation automatique 100% coverage
- Fallback hiérarchique
`,

  features: [
    "✅ 4 langues : Français, Allemand, Italien, Anglais",
    "✅ Traductions centralisées dans @/polymet/i18n/locales/",
    "✅ Namespaces clairs (common, students, instructors, etc.)",
    "✅ Pluralization automatique (zero/one/other)",
    "✅ Formatage dates (Intl.DateTimeFormat)",
    "✅ Formatage nombres (Intl.NumberFormat)",
    "✅ Formatage devise CHF",
    "✅ Validation automatique des clés",
    "✅ TypeScript strict",
    "✅ CI/CD intégré",
  ],

  score: "10/10",
};

// ============================================================================
// 2. ARCHITECTURE
// ============================================================================

export const ARCHITECTURE = {
  structure: `
@/polymet/i18n/
  ├── locales/
  │   ├── fr.ts          # Toutes les traductions FR
  │   ├── de.ts          # Toutes les traductions DE
  │   ├── it.ts          # Toutes les traductions IT
  │   └── en.ts          # Toutes les traductions EN
  ├── namespaces.ts      # Types TypeScript
  ├── validator.ts       # Script validation
  └── index.ts           # Exports
`,

  namespaces: {
    common:
      "Traductions réutilisables (actions, statuts, messages, validation)",
    students: "Module gestion élèves",
    instructors: "Module gestion moniteurs",
    vehicles: "Module gestion véhicules",
    planning: "Module planning",
    invoices: "Module factures",
    analytics: "Module analytics",
    settings: "Module paramètres",
  },

  example: `
// @/polymet/i18n/locales/fr.ts
export const fr = {
  common: {
    actions: {
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
    },
  },
  students: {
    title: "Élèves",
    count: {
      zero: "Aucun élève",
      one: "1 élève",
      other: "{{count}} élèves",
    },
  },
};
`,
};

// ============================================================================
// 3. UTILISATION
// ============================================================================

export const USAGE = {
  basicUsage: `
// Hook useTranslation()
import { useTranslation } from "@/polymet/components/viamentor-locale-provider";

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("students.title")}</h1>
      <Button>{t("common.actions.save")}</Button>
    </div>
  );
}
`,

  pluralization: `
// Pluralization automatique
const { t } = useTranslation();

t("students.count", { count: 0 })  // "Aucun élève"
t("students.count", { count: 1 })  // "1 élève"
t("students.count", { count: 5 })  // "5 élèves"
`,

  interpolation: `
// Interpolation de variables
const { t } = useTranslation();

t("common.validation.minLength", { min: 3 })  // "Minimum 3 caractères"
t("common.validation.maxLength", { max: 50 }) // "Maximum 50 caractères"
`,

  formatting: `
// Formatage dates, nombres, devise
import { FormatDate, FormatNumber, FormatCurrency } from "@/polymet/components/viamentor-locale-provider";

<FormatDate value={new Date()} format="long" />
// FR: "18 octobre 2025"
// DE: "18. Oktober 2025"

<FormatNumber value={1234567.89} />
// FR: "1 234 567,89"
// DE: "1'234'567.89"

<FormatCurrency value={1500.50} />
// FR: "CHF 1'500.50"
// DE: "CHF 1'500.50"
`,

  namespaceConventions: `
// Conventions namespaces

// ✅ BON : Namespace clair
t("common.actions.save")           // Réutilisable
t("students.actions.createStudent") // Spécifique module

// ❌ MAUVAIS : Pas de namespace
t("save")                          // Collision possible
t("title")                         // Quel module ?
`,
};

// ============================================================================
// 4. VALIDATION
// ============================================================================

export const VALIDATION = {
  description: `
Le script de validation vérifie que toutes les langues ont les mêmes clés
et détecte les clés manquantes ou en trop.
`,

  command: `
# Valider les traductions
npm run i18n:validate

# Vérifier coverage
npm run i18n:coverage
`,

  output: `
✅ Validation i18n réussie

Statistiques:
  Total clés: 487
  de: 487 clés (100.0%)
  it: 487 clés (100.0%)
  en: 487 clés (100.0%)
`,

  errorExample: `
❌ Validation i18n échouée

[de] 3 clés manquantes en de
  Clés: students.actions.viewProgress, instructors.fields.hireDate, ...

[it] 1 clé en trop en it
  Clés: students.actions.oldAction
`,

  cicd: `
// .github/workflows/i18n-validation.yml

name: I18n Validation

on:
  pull_request:
    paths:
      - 'polymet/i18n/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Validate i18n
        run: npm run i18n:validate
`,
};

// ============================================================================
// 5. CONTRIBUTION
// ============================================================================

export const CONTRIBUTION = {
  addingTranslations: `
// 1. Ajouter dans FR (référence)
// @/polymet/i18n/locales/fr.ts
export const fr = {
  students: {
    actions: {
      newAction: "Nouvelle action", // ✅ Ajouter ici
    },
  },
};

// 2. Ajouter dans DE
// @/polymet/i18n/locales/de.ts
export const de = {
  students: {
    actions: {
      newAction: "Neue Aktion", // ✅ Même clé
    },
  },
};

// 3. Ajouter dans IT
// @/polymet/i18n/locales/it.ts
export const it = {
  students: {
    actions: {
      newAction: "Nuova azione", // ✅ Même clé
    },
  },
};

// 4. Ajouter dans EN
// @/polymet/i18n/locales/en.ts
export const en = {
  students: {
    actions: {
      newAction: "New action", // ✅ Même clé
    },
  },
};

// 5. Valider
npm run i18n:validate
`,

  addingNamespace: `
// 1. Ajouter namespace dans FR
export const fr = {
  // ... autres namespaces
  
  newModule: {
    title: "Nouveau Module",
    actions: {
      create: "Créer",
    },
  },
};

// 2. Répéter pour DE, IT, EN

// 3. Mettre à jour types
// @/polymet/i18n/namespaces.ts
export type TranslationKey = 
  | \`common.\${string}\`
  | \`students.\${string}\`
  | \`newModule.\${string}\`; // ✅ Ajouter
`,

  bestPractices: [
    "✅ Toujours ajouter dans les 4 langues en même temps",
    "✅ Utiliser namespace approprié (common vs spécifique)",
    "✅ Valider avec npm run i18n:validate",
    "✅ Tester dans l'interface avec chaque langue",
    "✅ Respecter conventions de nommage (camelCase)",
    "✅ Utiliser pluralization quand nécessaire",
    "✅ Documenter traductions complexes",
  ],
};

// ============================================================================
// 6. MIGRATION
// ============================================================================

export const MIGRATION = {
  fromOldSystem: `
// ❌ ANCIEN SYSTÈME : Traductions dispersées

// @/polymet/data/viamentor-students-i18n
export const STUDENTS_TRANSLATIONS = {
  fr: {
    title: "Élèves",
    save: "Enregistrer",
  },
};

// Utilisation
import { STUDENTS_TRANSLATIONS } from "@/polymet/data/viamentor-students-i18n";

const { locale } = useLocale();
const t = STUDENTS_TRANSLATIONS[locale];

<h1>{t.title}</h1>
<Button>{t.save}</Button>

// ✅ NOUVEAU SYSTÈME : Traductions centralisées

// @/polymet/i18n/locales/fr.ts
export const fr = {
  common: {
    actions: {
      save: "Enregistrer",
    },
  },
  students: {
    title: "Élèves",
  },
};

// Utilisation
import { useTranslation } from "@/polymet/components/viamentor-locale-provider";

const { t } = useTranslation();

<h1>{t("students.title")}</h1>
<Button>{t("common.actions.save")}</Button>
`,

  migrationSteps: [
    "1. Identifier toutes les traductions du module",
    "2. Copier vers namespace approprié dans fr.ts",
    "3. Identifier traductions communes → common namespace",
    "4. Répéter pour de.ts, it.ts, en.ts",
    "5. Mettre à jour composants pour utiliser t()",
    "6. Valider avec npm run i18n:validate",
    "7. Tester dans l'interface",
    "8. Supprimer ancien fichier *-i18n.ts",
  ],
};

// ============================================================================
// 7. FAQ
// ============================================================================

export const FAQ = [
  {
    question: "Comment ajouter une nouvelle traduction ?",
    answer: `
Ajouter la clé dans les 4 fichiers (fr.ts, de.ts, it.ts, en.ts) avec le même chemin,
puis valider avec npm run i18n:validate.
    `,
  },
  {
    question: "Quelle langue est la référence ?",
    answer: `
Le français (fr.ts) est la langue de référence. Toutes les autres langues doivent
avoir exactement les mêmes clés.
    `,
  },
  {
    question: "Comment gérer la pluralization ?",
    answer: `
Utiliser la structure { zero: "...", one: "...", other: "..." } et passer { count: n }
au hook t(). La pluralization est automatique.
    `,
  },
  {
    question: "Que faire si une clé est manquante ?",
    answer: `
Le script de validation détectera la clé manquante. Ajouter la traduction dans la langue
concernée et re-valider.
    `,
  },
  {
    question: "Comment tester les traductions ?",
    answer: `
Utiliser le sélecteur de langue dans l'interface et vérifier que toutes les traductions
s'affichent correctement. Le hook useLocale() permet de changer la langue.
    `,
  },
  {
    question: "Puis-je utiliser des traductions imbriquées ?",
    answer: `
Oui, les namespaces supportent l'imbrication illimitée. Exemple :
t("students.tabs.information.fields.firstName")
    `,
  },
  {
    question: "Comment formater des dates/nombres ?",
    answer: `
Utiliser les composants FormatDate, FormatNumber, FormatCurrency qui gèrent
automatiquement le formatage selon la locale active.
    `,
  },
  {
    question: "Le système supporte-t-il le RTL ?",
    answer: `
Actuellement non, mais l'architecture permet d'ajouter facilement le support RTL
pour l'arabe ou l'hébreu si nécessaire.
    `,
  },
];

// ============================================================================
// 8. RESSOURCES
// ============================================================================

export const RESOURCES = {
  files: [
    "@/polymet/i18n/locales/fr.ts - Traductions françaises",
    "@/polymet/i18n/locales/de.ts - Traductions allemandes",
    "@/polymet/i18n/locales/it.ts - Traductions italiennes",
    "@/polymet/i18n/locales/en.ts - Traductions anglaises",
    "@/polymet/i18n/validator.ts - Script validation",
    "@/polymet/i18n/namespaces.ts - Types TypeScript",
    "@/polymet/components/viamentor-locale-provider - Provider React",
  ],

  documentation: [
    "@/polymet/data/viamentor-i18n-improvements - Analyse et améliorations",
    "@/polymet/data/viamentor-i18n-implementation-guide - Guide implémentation",
    "@/polymet/data/viamentor-i18n-readme - Ce fichier",
  ],

  externalLinks: [
    "Intl.DateTimeFormat - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat",
    "Intl.NumberFormat - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat",
    "ICU Message Format - https://unicode-org.github.io/icu/userguide/format_parse/messages/",
  ],
};

// ============================================================================
// EXPORTS
// ============================================================================

// Exports déjà déclarés ci-dessus
