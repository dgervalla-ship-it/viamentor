/**
 * ============================================================================
 * VIAMENTOR - I18N IMPROVEMENTS GUIDE
 * ============================================================================
 *
 * Améliorations système i18n pour passer de 9/10 à 10/10
 *
 * Problèmes identifiés:
 * ❌ Traductions hardcodées dans composants
 * ❌ Pas de namespace pour éviter collisions
 * ❌ Pas de script de vérification clés manquantes
 *
 * Solutions:
 * ✅ Centralisation traductions dans fichiers dédiés
 * ✅ Namespaces hiérarchiques (common.save vs students.save)
 * ✅ Script validation automatique
 * ✅ Type-safety avec TypeScript
 *
 * @module viamentor-i18n-improvements
 */

// ============================================================================
// 1. PROBLÈMES ACTUELS
// ============================================================================

/**
 * ❌ PROBLÈME 1: Traductions hardcodées
 */
const BEFORE_HARDCODED = `
// ❌ Avant - Traductions dans composant
export function StudentCard({ student }: Props) {
  const t = {
    fr: { status: "Actif", lessons: "leçons" },
    de: { status: "Aktiv", lessons: "Lektionen" },
  };
  
  return (
    <div>
      <span>{t[locale].status}</span>
      <span>{student.lessonsCount} {t[locale].lessons}</span>
    </div>
  );
}
`;

/**
 * ❌ PROBLÈME 2: Collisions de clés
 */
const BEFORE_COLLISIONS = `
// ❌ Avant - Même clé "save" partout
const studentsI18n = { save: "Enregistrer l'élève" };
const invoicesI18n = { save: "Enregistrer la facture" };
const settingsI18n = { save: "Enregistrer les paramètres" };

// Risque de collision et confusion
`;

/**
 * ❌ PROBLÈME 3: Pas de validation
 */
const BEFORE_NO_VALIDATION = `
// ❌ Avant - Clés manquantes non détectées
const t = useTranslation();

// Typo non détectée au build
t("students.statuss"); // ❌ Devrait être "status"

// Clé manquante en DE non détectée
t("students.newField"); // ✅ FR mais ❌ DE
`;

// ============================================================================
// 2. SOLUTION 1: CENTRALISATION TRADUCTIONS
// ============================================================================

/**
 * ✅ Structure de fichiers centralisée
 */
export const I18N_FILE_STRUCTURE = {
  structure: `
polymet/
├── i18n/
│   ├── locales/
│   │   ├── fr/
│   │   │   ├── common.json          # Traductions communes
│   │   │   ├── students.json        # Module élèves
│   │   │   ├── instructors.json     # Module moniteurs
│   │   │   ├── invoices.json        # Module factures
│   │   │   ├── planning.json        # Module planning
│   │   │   └── ...
│   │   ├── de/
│   │   │   ├── common.json
│   │   │   ├── students.json
│   │   │   └── ...
│   │   ├── it/
│   │   └── en/
│   ├── types.ts                     # Types TypeScript
│   ├── config.ts                    # Configuration i18n
│   ├── hooks.ts                     # Hooks React
│   └── validation.ts                # Script validation
`,
};

/**
 * ✅ Fichier common.json - Traductions communes
 */
export const COMMON_TRANSLATIONS = {
  "locales/fr/common.json": {
    actions: {
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      create: "Créer",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      import: "Importer",
      print: "Imprimer",
      download: "Télécharger",
      upload: "Téléverser",
      close: "Fermer",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      confirm: "Confirmer",
      submit: "Soumettre",
    },
    status: {
      active: "Actif",
      inactive: "Inactif",
      pending: "En attente",
      completed: "Terminé",
      cancelled: "Annulé",
      draft: "Brouillon",
    },
    messages: {
      success: "Opération réussie",
      error: "Une erreur est survenue",
      loading: "Chargement...",
      noData: "Aucune donnée disponible",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
    },
    validation: {
      required: "Ce champ est obligatoire",
      email: "Email invalide",
      phone: "Numéro de téléphone invalide",
      minLength: "Minimum {{min}} caractères",
      maxLength: "Maximum {{max}} caractères",
    },
    dates: {
      today: "Aujourd'hui",
      yesterday: "Hier",
      tomorrow: "Demain",
      thisWeek: "Cette semaine",
      thisMonth: "Ce mois",
      thisYear: "Cette année",
    },
  },

  "locales/de/common.json": {
    actions: {
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      create: "Erstellen",
      search: "Suchen",
      filter: "Filtern",
      export: "Exportieren",
      import: "Importieren",
      print: "Drucken",
      download: "Herunterladen",
      upload: "Hochladen",
      close: "Schließen",
      back: "Zurück",
      next: "Weiter",
      previous: "Zurück",
      confirm: "Bestätigen",
      submit: "Absenden",
    },
    status: {
      active: "Aktiv",
      inactive: "Inaktiv",
      pending: "Ausstehend",
      completed: "Abgeschlossen",
      cancelled: "Storniert",
      draft: "Entwurf",
    },
    messages: {
      success: "Vorgang erfolgreich",
      error: "Ein Fehler ist aufgetreten",
      loading: "Laden...",
      noData: "Keine Daten verfügbar",
      confirmDelete: "Möchten Sie wirklich löschen?",
    },
    validation: {
      required: "Dieses Feld ist erforderlich",
      email: "Ungültige E-Mail",
      phone: "Ungültige Telefonnummer",
      minLength: "Mindestens {{min}} Zeichen",
      maxLength: "Maximal {{max}} Zeichen",
    },
    dates: {
      today: "Heute",
      yesterday: "Gestern",
      tomorrow: "Morgen",
      thisWeek: "Diese Woche",
      thisMonth: "Dieser Monat",
      thisYear: "Dieses Jahr",
    },
  },
};

/**
 * ✅ Fichier students.json - Module élèves
 */
export const STUDENTS_TRANSLATIONS = {
  "locales/fr/students.json": {
    title: "Élèves",
    singular: "Élève",
    plural: "Élèves",

    actions: {
      create: "Créer un élève",
      edit: "Modifier l'élève",
      delete: "Supprimer l'élève",
      export: "Exporter les élèves",
      import: "Importer des élèves",
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
      status: "Statut",
      category: "Catégorie",
      instructor: "Moniteur",
    },

    status: {
      active: "Actif",
      inactive: "Inactif",
      suspended: "Suspendu",
      graduated: "Diplômé",
    },

    count: {
      zero: "Aucun élève",
      one: "1 élève",
      other: "{{count}} élèves",
    },

    messages: {
      createSuccess: "Élève créé avec succès",
      updateSuccess: "Élève modifié avec succès",
      deleteSuccess: "Élève supprimé avec succès",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet élève ?",
    },
  },

  "locales/de/students.json": {
    title: "Schüler",
    singular: "Schüler",
    plural: "Schüler",

    actions: {
      create: "Schüler erstellen",
      edit: "Schüler bearbeiten",
      delete: "Schüler löschen",
      export: "Schüler exportieren",
      import: "Schüler importieren",
    },

    fields: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      birthDate: "Geburtsdatum",
      address: "Adresse",
      city: "Stadt",
      postalCode: "Postleitzahl",
      canton: "Kanton",
      status: "Status",
      category: "Kategorie",
      instructor: "Fahrlehrer",
    },

    status: {
      active: "Aktiv",
      inactive: "Inaktiv",
      suspended: "Suspendiert",
      graduated: "Abgeschlossen",
    },

    count: {
      zero: "Keine Schüler",
      one: "1 Schüler",
      other: "{{count}} Schüler",
    },

    messages: {
      createSuccess: "Schüler erfolgreich erstellt",
      updateSuccess: "Schüler erfolgreich bearbeitet",
      deleteSuccess: "Schüler erfolgreich gelöscht",
      deleteConfirm: "Möchten Sie diesen Schüler wirklich löschen?",
    },
  },
};

// ============================================================================
// 3. SOLUTION 2: NAMESPACES HIÉRARCHIQUES
// ============================================================================

/**
 * ✅ Types TypeScript avec namespaces
 */
export const I18N_TYPES = `
// polymet/i18n/types.ts

/**
 * Locales supportées
 */
export type SupportedLocale = "fr" | "de" | "it" | "en";

/**
 * Namespaces disponibles
 */
export type I18nNamespace = 
  | "common"
  | "students"
  | "instructors"
  | "invoices"
  | "planning"
  | "vehicles"
  | "analytics"
  | "settings";

/**
 * Structure des traductions avec namespaces
 */
export interface TranslationKeys {
  common: {
    actions: {
      save: string;
      cancel: string;
      delete: string;
      edit: string;
      // ...
    };
    status: {
      active: string;
      inactive: string;
      // ...
    };
    // ...
  };
  students: {
    title: string;
    singular: string;
    plural: string;
    actions: {
      create: string;
      edit: string;
      delete: string;
      // ...
    };
    fields: {
      firstName: string;
      lastName: string;
      // ...
    };
    // ...
  };
  // ... autres namespaces
}

/**
 * Type-safe translation key
 */
export type TranslationKey<N extends I18nNamespace = I18nNamespace> = 
  N extends "common" ? \`common.\${keyof TranslationKeys["common"]}\` :
  N extends "students" ? \`students.\${keyof TranslationKeys["students"]}\` :
  // ... autres namespaces
  string;
`;

/**
 * ✅ Hook useTranslation avec namespaces
 */
export const USE_TRANSLATION_HOOK = `
// polymet/i18n/hooks.ts
import { useContext } from "react";
import { LocaleContext } from "@/polymet/components/viamentor-locale-provider";
import type { SupportedLocale, I18nNamespace, TranslationKey } from "./types";

/**
 * Hook pour traductions avec namespace
 */
export function useTranslation(namespace?: I18nNamespace) {
  const { locale, translations } = useContext(LocaleContext);

  /**
   * Fonction de traduction type-safe
   */
  function t(key: TranslationKey, params?: Record<string, any>): string {
    // Extraire namespace et clé
    const [ns, ...keyParts] = key.split(".");
    const actualKey = keyParts.join(".");

    // Récupérer traduction
    const nsTranslations = translations[locale]?.[ns];
    let value = getNestedValue(nsTranslations, actualKey);

    // Fallback hiérarchique
    if (!value && locale !== "fr") {
      value = getNestedValue(translations.fr[ns], actualKey);
    }
    if (!value && locale !== "en") {
      value = getNestedValue(translations.en[ns], actualKey);
    }

    // Interpolation paramètres
    if (value && params) {
      Object.entries(params).forEach(([key, val]) => {
        value = value.replace(\`{{\${key}}}\`, String(val));
      });
    }

    return value || key;
  }

  /**
   * Fonction de traduction avec namespace par défaut
   */
  function tn(key: string, params?: Record<string, any>): string {
    if (namespace) {
      return t(\`\${namespace}.\${key}\`, params);
    }
    return t(key, params);
  }

  /**
   * Pluralization
   */
  function tp(key: string, count: number, params?: Record<string, any>): string {
    const pluralKey = count === 0 ? "zero" : count === 1 ? "one" : "other";
    return tn(\`\${key}.\${pluralKey}\`, { count, ...params });
  }

  return { t, tn, tp, locale };
}

/**
 * Helper pour récupérer valeur nested
 */
function getNestedValue(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}
`;

/**
 * ✅ Utilisation dans composants
 */
export const COMPONENT_USAGE = `
// ✅ Après - Traductions centralisées avec namespaces

// Composant avec namespace par défaut
export function StudentCard({ student }: Props) {
  const { tn, tp } = useTranslation("students");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tn("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label>{tn("fields.firstName")}</Label>
          <span>{student.firstName}</span>
        </div>
        <div>
          <Label>{tn("fields.status")}</Label>
          <Badge>{tn(\`status.\${student.status}\`)}</Badge>
        </div>
        <div>
          {tp("count", student.lessonsCount)}
        </div>
      </CardContent>
      <CardFooter>
        <Button>{tn("actions.edit")}</Button>
        <Button variant="destructive">{tn("actions.delete")}</Button>
      </CardFooter>
    </Card>
  );
}

// Composant avec traductions communes
export function ConfirmDialog({ onConfirm }: Props) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("common.messages.confirmDelete")}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">{t("common.actions.cancel")}</Button>
          <Button onClick={onConfirm}>{t("common.actions.confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
`;

// ============================================================================
// 4. SOLUTION 3: SCRIPT VALIDATION
// ============================================================================

/**
 * ✅ Script validation clés manquantes
 */
export const VALIDATION_SCRIPT = `
// polymet/i18n/validation.ts
import fs from "fs";
import path from "path";
import type { SupportedLocale, I18nNamespace } from "./types";

const LOCALES: SupportedLocale[] = ["fr", "de", "it", "en"];
const NAMESPACES: I18nNamespace[] = [
  "common",
  "students",
  "instructors",
  "invoices",
  "planning",
  "vehicles",
  "analytics",
  "settings",
];

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  type: "missing_key" | "missing_locale" | "invalid_json";
  namespace: string;
  locale: string;
  key?: string;
  message: string;
}

interface ValidationWarning {
  type: "unused_key" | "inconsistent_structure";
  namespace: string;
  locale: string;
  key?: string;
  message: string;
}

/**
 * Valider toutes les traductions
 */
export async function validateTranslations(): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. Charger traductions de référence (FR)
  const referenceTranslations = await loadAllTranslations("fr");

  // 2. Valider chaque locale
  for (const locale of LOCALES) {
    if (locale === "fr") continue;

    const translations = await loadAllTranslations(locale);

    // 3. Comparer avec référence
    for (const namespace of NAMESPACES) {
      const refKeys = getAllKeys(referenceTranslations[namespace]);
      const localeKeys = getAllKeys(translations[namespace]);

      // Clés manquantes
      const missingKeys = refKeys.filter((key) => !localeKeys.includes(key));
      missingKeys.forEach((key) => {
        errors.push({
          type: "missing_key",
          namespace,
          locale,
          key,
          message: \`Missing key "\${key}" in \${locale}/\${namespace}.json\`,
        });
      });

      // Clés inutilisées (warning)
      const unusedKeys = localeKeys.filter((key) => !refKeys.includes(key));
      unusedKeys.forEach((key) => {
        warnings.push({
          type: "unused_key",
          namespace,
          locale,
          key,
          message: \`Unused key "\${key}" in \${locale}/\${namespace}.json\`,
        });
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Charger toutes les traductions d'une locale
 */
async function loadAllTranslations(locale: SupportedLocale): Promise<Record<string, any>> {
  const translations: Record<string, any> = {};

  for (const namespace of NAMESPACES) {
    const filePath = path.join(
      process.cwd(),
      "polymet",
      "i18n",
      "locales",
      locale,
      \`\${namespace}.json\`
    );

    try {
      const content = await fs.promises.readFile(filePath, "utf-8");
      translations[namespace] = JSON.parse(content);
    } catch (error) {
      console.error(\`Error loading \${filePath}:\`, error);
      translations[namespace] = {};
    }
  }

  return translations;
}

/**
 * Récupérer toutes les clés d'un objet (nested)
 */
function getAllKeys(obj: any, prefix = ""): string[] {
  const keys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? \`\${prefix}.\${key}\` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

/**
 * CLI pour validation
 */
if (require.main === module) {
  validateTranslations().then((result) => {
    console.log("\\n🌍 Validation i18n Viamentor\\n");

    if (result.errors.length > 0) {
      console.log(\`❌ \${result.errors.length} erreur(s) trouvée(s):\\n\`);
      result.errors.forEach((error) => {
        console.log(\`  • \${error.message}\`);
      });
    }

    if (result.warnings.length > 0) {
      console.log(\`\\n⚠️  \${result.warnings.length} avertissement(s):\\n\`);
      result.warnings.forEach((warning) => {
        console.log(\`  • \${warning.message}\`);
      });
    }

    if (result.valid) {
      console.log("\\n✅ Toutes les traductions sont valides !\\n");
      process.exit(0);
    } else {
      console.log("\\n❌ Validation échouée\\n");
      process.exit(1);
    }
  });
}
`;

/**
 * ✅ Script package.json
 */
export const PACKAGE_JSON_SCRIPTS = {
  scripts: {
    "i18n:validate": "tsx polymet/i18n/validation.ts",
    "i18n:check": "npm run i18n:validate",
    prebuild: "npm run i18n:validate",
  },
};

// ============================================================================
// 5. CHECKLIST IMPLÉMENTATION
// ============================================================================

export const I18N_CHECKLIST = {
  "Phase 1 - Restructuration Fichiers": {
    estimatedTime: "1 jour",
    tasks: [
      {
        id: "i18n-1",
        task: "Créer structure polymet/i18n/locales/",
        status: "pending" as const,
      },
      {
        id: "i18n-2",
        task: "Créer common.json pour FR/DE/IT/EN",
        status: "pending" as const,
      },
      {
        id: "i18n-3",
        task: "Migrer traductions students vers students.json",
        status: "pending" as const,
      },
      {
        id: "i18n-4",
        task: "Migrer traductions instructors vers instructors.json",
        status: "pending" as const,
      },
      {
        id: "i18n-5",
        task: "Migrer toutes les autres traductions",
        status: "pending" as const,
      },
    ],
  },

  "Phase 2 - Types & Hooks": {
    estimatedTime: "0.5 jour",
    tasks: [
      {
        id: "i18n-6",
        task: "Créer types.ts avec namespaces",
        status: "pending" as const,
      },
      {
        id: "i18n-7",
        task: "Créer hooks.ts avec useTranslation()",
        status: "pending" as const,
      },
      {
        id: "i18n-8",
        task: "Mettre à jour LocaleProvider",
        status: "pending" as const,
      },
    ],
  },

  "Phase 3 - Migration Composants": {
    estimatedTime: "2 jours",
    tasks: [
      {
        id: "i18n-9",
        task: "Migrer composants students vers nouveau système",
        status: "pending" as const,
      },
      {
        id: "i18n-10",
        task: "Migrer composants instructors",
        status: "pending" as const,
      },
      {
        id: "i18n-11",
        task: "Migrer tous les autres composants",
        status: "pending" as const,
      },
    ],
  },

  "Phase 4 - Validation": {
    estimatedTime: "0.5 jour",
    tasks: [
      {
        id: "i18n-12",
        task: "Créer validation.ts",
        status: "pending" as const,
      },
      {
        id: "i18n-13",
        task: "Ajouter scripts npm",
        status: "pending" as const,
      },
      {
        id: "i18n-14",
        task: "Configurer CI/CD validation",
        status: "pending" as const,
      },
      {
        id: "i18n-15",
        task: "Tester validation sur toutes les locales",
        status: "pending" as const,
      },
    ],
  },
};

// ============================================================================
// 6. ROADMAP
// ============================================================================

export const I18N_ROADMAP = {
  "Jour 1 - Restructuration": {
    morning: "Créer structure fichiers + common.json",
    afternoon: "Migrer students.json et instructors.json",
  },

  "Jour 2 - Migration": {
    morning: "Migrer tous les autres namespaces",
    afternoon: "Créer types.ts et hooks.ts",
  },

  "Jour 3 - Composants": {
    morning: "Migrer composants students/instructors",
    afternoon: "Migrer tous les autres composants",
  },

  "Jour 4 - Validation": {
    morning: "Créer validation.ts + scripts",
    afternoon: "Tests et CI/CD",
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

// Tous les exports sont déjà déclarés avec 'export const' ci-dessus
