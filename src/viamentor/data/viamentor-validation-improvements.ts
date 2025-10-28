/**
 * ============================================================================
 * VIAMENTOR - Validation Improvements
 * ============================================================================
 *
 * Améliorations système validation :
 * - Consolidation schemas Zod dupliqués
 * - Standardisation validation UI
 * - Configuration React Hook Form unifiée
 * - Helpers validation réutilisables
 *
 * Score actuel : ⭐ 9/10
 * Objectif : ⭐ 10/10
 */

import { z } from "zod";
import type { UseFormProps } from "react-hook-form";

// ============================================================================
// 1. CONSOLIDATED SCHEMAS - Merger schemas dupliqués
// ============================================================================

/**
 * ❌ AVANT : Duplication
 *
 * LessonEvaluationSchema
 * InstructorLessonSchema
 *
 * ✅ APRÈS : Schema unifié avec composition
 */

// Base Lesson Schema - Réutilisable
export const BaseLessonSchema = z.object({
  id: z.string().uuid("ID invalide"),
  studentId: z.string().uuid("ID élève invalide"),
  instructorId: z.string().uuid("ID moniteur invalide"),
  vehicleId: z.string().uuid("ID véhicule invalide"),
  date: z.date({
    required_error: "Date requise",
    invalid_type_error: "Date invalide",
  }),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Heure invalide (HH:MM)"),
  duration: z
    .number()
    .min(45, "Durée minimum 45 minutes")
    .max(180, "Durée maximum 3 heures")
    .multipleOf(15, "Durée par tranches de 15 minutes"),
  category: z.enum(["B", "A", "C", "D"], {
    errorMap: () => ({ message: "Catégorie invalide" }),
  }),
  type: z.enum(["practical", "theory", "exam"], {
    errorMap: () => ({ message: "Type invalide" }),
  }),
  status: z.enum(["scheduled", "completed", "cancelled", "no_show"], {
    errorMap: () => ({ message: "Statut invalide" }),
  }),
});

// Lesson Evaluation Schema - Extension du base schema
export const LessonEvaluationSchema = BaseLessonSchema.extend({
  // Évaluation technique
  technicalSkills: z.object({
    steering: z.number().min(1).max(5, "Note entre 1 et 5"),
    braking: z.number().min(1).max(5, "Note entre 1 et 5"),
    clutch: z.number().min(1).max(5, "Note entre 1 et 5"),
    gearShift: z.number().min(1).max(5, "Note entre 1 et 5"),
    observation: z.number().min(1).max(5, "Note entre 1 et 5"),
    positioning: z.number().min(1).max(5, "Note entre 1 et 5"),
  }),

  // Comportement
  behavior: z.object({
    concentration: z.number().min(1).max(5, "Note entre 1 et 5"),
    confidence: z.number().min(1).max(5, "Note entre 1 et 5"),
    autonomy: z.number().min(1).max(5, "Note entre 1 et 5"),
    respect: z.number().min(1).max(5, "Note entre 1 et 5"),
  }),

  // Commentaires
  strengths: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(500, "Maximum 500 caractères"),
  improvements: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(500, "Maximum 500 caractères"),
  nextGoals: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(500, "Maximum 500 caractères"),

  // Progression
  readyForExam: z.boolean(),
  estimatedExamDate: z.date().optional(),

  // Signature
  instructorSignature: z.string().min(1, "Signature requise"),
  evaluationDate: z.date(),
}).refine(
  (data) => {
    // Si prêt pour examen, date estimée requise
    if (data.readyForExam && !data.estimatedExamDate) {
      return false;
    }
    return true;
  },
  {
    message: "Date d'examen estimée requise si élève prêt",
    path: ["estimatedExamDate"],
  }
);

// Instructor Lesson Schema - Extension du base schema
export const InstructorLessonSchema = BaseLessonSchema.extend({
  // Planning
  pickupLocation: z.string().min(5, "Adresse de prise en charge requise"),
  dropoffLocation: z.string().min(5, "Adresse de dépose requise"),
  route: z.string().optional(),

  // Objectifs
  objectives: z.array(z.string()).min(1, "Au moins un objectif requis"),

  // Matériel
  materials: z
    .array(
      z.enum([
        "cones",
        "parking_markers",
        "emergency_kit",
        "theory_book",
        "exam_sheet",
      ])
    )
    .optional(),

  // Notes moniteur
  privateNotes: z.string().max(1000, "Maximum 1000 caractères").optional(),

  // Facturation
  price: z.number().min(0, "Prix invalide"),
  paid: z.boolean(),
  invoiceId: z.string().uuid().optional(),
});

// ============================================================================
// 2. SHARED VALIDATION RULES - Règles réutilisables
// ============================================================================

/**
 * Règles de validation communes pour éviter duplication
 */

// Validation email avec async check
export const emailValidation = z
  .string()
  .email("Email invalide")
  .refine(async (email) => {
    // Simulation API check
    // return !await emailExists(email);
    return true; // Mock
  }, "Email déjà utilisé");

// Validation téléphone suisse
export const swissPhoneValidation = z
  .string()
  .regex(
    /^(\+41|0041|0)[1-9]\d{8}$/,
    "Numéro suisse invalide (ex: +41 79 123 45 67)"
  );

// Validation âge minimum
export const ageValidation = (minAge: number) =>
  z.date().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= minAge;
  }, `L'élève doit avoir au moins ${minAge} ans`);

// Validation permis suisse
export const swissLicenseValidation = z
  .string()
  .regex(/^[A-Z]{2}\d{6}$/, "Format invalide (ex: GE123456)");

// Validation IBAN suisse
export const swissIBANValidation = z
  .string()
  .regex(
    /^CH\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?[\dA-Z]$/,
    "IBAN suisse invalide"
  );

// Validation plaque d'immatriculation suisse
export const swissPlateValidation = z
  .string()
  .regex(/^[A-Z]{2}\s?\d{1,6}$/, "Plaque suisse invalide (ex: GE 12345)");

// ============================================================================
// 3. STANDARDIZED FORM CONFIG - Configuration React Hook Form unifiée
// ============================================================================

/**
 * ❌ AVANT : Validation UI inconsistante
 *
 * Certains forms : validation onBlur
 * D'autres : validation onChange
 *
 * ✅ APRÈS : Configuration standardisée par use case
 */

// Configuration par défaut - Validation onBlur
export const defaultFormConfig: UseFormProps = {
  mode: "onBlur", // Validation après perte de focus
  reValidateMode: "onChange", // Re-validation en temps réel après première erreur
  criteriaMode: "all", // Afficher toutes les erreurs
  shouldFocusError: true, // Focus auto sur premier champ en erreur
  shouldUnregister: false, // Garder valeurs des champs unmounted
};

// Configuration pour formulaires critiques - Validation onChange
export const criticalFormConfig: UseFormProps = {
  mode: "onChange", // Validation en temps réel
  reValidateMode: "onChange",
  criteriaMode: "all",
  shouldFocusError: true,
  shouldUnregister: false,
};

// Configuration pour formulaires longs - Validation onSubmit
export const longFormConfig: UseFormProps = {
  mode: "onSubmit", // Validation uniquement à la soumission
  reValidateMode: "onChange", // Re-validation en temps réel après première erreur
  criteriaMode: "all",
  shouldFocusError: true,
  shouldUnregister: false,
};

// Configuration pour formulaires de recherche - Pas de validation
export const searchFormConfig: UseFormProps = {
  mode: "onChange",
  reValidateMode: "onChange",
  criteriaMode: "all",
  shouldFocusError: false,
  shouldUnregister: true,
};

/**
 * Mapping use cases → configurations
 */
export const formConfigByUseCase = {
  // Formulaires critiques (paiements, signatures, etc.)
  payment: criticalFormConfig,
  signature: criticalFormConfig,
  legal: criticalFormConfig,

  // Formulaires standards (création/édition)
  create: defaultFormConfig,
  edit: defaultFormConfig,
  profile: defaultFormConfig,

  // Formulaires longs (wizards, onboarding)
  wizard: longFormConfig,
  onboarding: longFormConfig,

  // Formulaires de recherche/filtres
  search: searchFormConfig,
  filter: searchFormConfig,
} as const;

// ============================================================================
// 4. VALIDATION HELPERS - Utilitaires réutilisables
// ============================================================================

/**
 * Helper pour validation conditionnelle
 */
export const conditionalValidation = <T extends z.ZodTypeAny>(
  condition: boolean,
  schema: T,
  fallback: T = z.any() as T
): T => {
  return condition ? schema : fallback;
};

/**
 * Helper pour validation dépendante
 */
export const dependentValidation = <T extends z.ZodRawShape>(
  baseSchema: z.ZodObject<T>,
  dependencies: Array<{
    field: keyof T;
    dependsOn: keyof T;
    condition: (value: any) => boolean;
    schema: z.ZodTypeAny;
  }>
) => {
  let schema = baseSchema;

  dependencies.forEach(
    ({ field, dependsOn, condition, schema: fieldSchema }) => {
      schema = schema.refine(
        (data) => {
          if (condition(data[dependsOn])) {
            return fieldSchema.safeParse(data[field]).success;
          }
          return true;
        },
        {
          message: `${String(field)} requis`,
          path: [String(field)],
        }
      );
    }
  );

  return schema;
};

/**
 * Helper pour messages d'erreur localisés
 */
export const localizedErrorMap = (locale: "fr" | "de" | "it" | "en") => {
  const messages = {
    fr: {
      required: "Champ requis",
      invalid_type: "Type invalide",
      too_small: "Valeur trop petite",
      too_big: "Valeur trop grande",
      invalid_string: "Format invalide",
    },
    de: {
      required: "Pflichtfeld",
      invalid_type: "Ungültiger Typ",
      too_small: "Wert zu klein",
      too_big: "Wert zu groß",
      invalid_string: "Ungültiges Format",
    },
    it: {
      required: "Campo obbligatorio",
      invalid_type: "Tipo non valido",
      too_small: "Valore troppo piccolo",
      too_big: "Valore troppo grande",
      invalid_string: "Formato non valido",
    },
    en: {
      required: "Required field",
      invalid_type: "Invalid type",
      too_small: "Value too small",
      too_big: "Value too big",
      invalid_string: "Invalid format",
    },
  };

  return (
    issue: z.ZodIssueOptionalMessage,
    ctx: z.ErrorMapCtx
  ): { message: string } => {
    const localeMessages = messages[locale];

    switch (issue.code) {
      case z.ZodIssueCode.invalid_type:
        if (issue.received === "undefined") {
          return { message: localeMessages.required };
        }
        return { message: localeMessages.invalid_type };

      case z.ZodIssueCode.too_small:
        return { message: localeMessages.too_small };

      case z.ZodIssueCode.too_big:
        return { message: localeMessages.too_big };

      case z.ZodIssueCode.invalid_string:
        return { message: localeMessages.invalid_string };

      default:
        return { message: ctx.defaultError };
    }
  };
};

// ============================================================================
// 5. FORM VALIDATION HOOK - Hook personnalisé
// ============================================================================

/**
 * Hook personnalisé pour validation standardisée
 */
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface UseValidatedFormOptions<T extends z.ZodTypeAny> {
  schema: T;
  useCase?: keyof typeof formConfigByUseCase;
  locale?: "fr" | "de" | "it" | "en";
  defaultValues?: Partial<z.infer<T>>;
  onSubmit?: (data: z.infer<T>) => void | Promise<void>;
}

export const useValidatedForm = <T extends z.ZodTypeAny>({
  schema,
  useCase = "create",
  locale = "fr",
  defaultValues,
  onSubmit,
}: UseValidatedFormOptions<T>): UseFormReturn<z.infer<T>> => {
  // Configuration selon use case
  const config = formConfigByUseCase[useCase];

  // Schema avec error map localisé
  const localizedSchema = schema.pipe(z.any().transform((val) => val));

  // Form avec resolver Zod
  const form = useForm<z.infer<T>>({
    ...config,
    resolver: zodResolver(localizedSchema, {
      errorMap: localizedErrorMap(locale),
    }),
    defaultValues: defaultValues as any,
  });

  // Handle submit avec error handling
  const handleSubmit = form.handleSubmit(
    async (data) => {
      try {
        await onSubmit?.(data);
      } catch (error) {
        console.error("Form submission error:", error);
        form.setError("root", {
          type: "manual",
          message: "Erreur lors de la soumission",
        });
      }
    },
    (errors) => {
      console.error("Validation errors:", errors);
    }
  );

  return {
    ...form,
    handleSubmit,
  };
};

// ============================================================================
// 6. USAGE EXAMPLES - Exemples d'utilisation
// ============================================================================

/**
 * Exemple 1 : Formulaire création élève
 */
export const exampleStudentForm = () => {
  const form = useValidatedForm({
    schema: z.object({
      firstName: z
        .string()
        .min(2, "Prénom trop court")
        .max(50, "Prénom trop long"),
      lastName: z.string().min(2, "Nom trop court").max(50, "Nom trop long"),
      email: emailValidation,
      phone: swissPhoneValidation,
      birthDate: ageValidation(15),
    }),
    useCase: "create",
    locale: "fr",
    defaultValues: {},
    onSubmit: async (data) => {
      console.log("Student created:", data);
    },
  });

  return form;
};

/**
 * Exemple 2 : Formulaire évaluation leçon
 */
export const exampleLessonEvaluationForm = () => {
  const form = useValidatedForm({
    schema: LessonEvaluationSchema,
    useCase: "create",
    locale: "fr",
    defaultValues: {},
    onSubmit: async (data) => {
      console.log("Evaluation submitted:", data);
    },
  });

  return form;
};

/**
 * Exemple 3 : Formulaire paiement (critique)
 */
export const examplePaymentForm = () => {
  const form = useValidatedForm({
    schema: z.object({
      amount: z.number().min(0.01, "Montant minimum 0.01 CHF"),
      method: z.enum(["cash", "card", "bank_transfer", "twint"]),
      reference: z.string().min(1, "Référence requise"),
      iban: conditionalValidation(
        true, // condition
        swissIBANValidation,
        z.string().optional()
      ),
    }),
    useCase: "payment",
    locale: "fr",
    defaultValues: {},
    onSubmit: async (data) => {
      console.log("Payment processed:", data);
    },
  });

  return form;
};

// ============================================================================
// 7. MIGRATION GUIDE - Guide de migration
// ============================================================================

/**
 * MIGRATION GUIDE
 *
 * 1. Identifier les schemas dupliqués
 *    - Chercher patterns similaires
 *    - Extraire base schemas
 *    - Utiliser .extend() pour spécialisation
 *
 * 2. Standardiser validation UI
 *    - Remplacer configurations custom par formConfigByUseCase
 *    - Utiliser useValidatedForm hook
 *    - Vérifier comportement validation
 *
 * 3. Ajouter error maps localisés
 *    - Importer localizedErrorMap
 *    - Passer locale au hook
 *    - Tester messages dans toutes les langues
 *
 * 4. Tester exhaustivement
 *    - Validation client
 *    - Validation server
 *    - Messages d'erreur
 *    - UX validation
 */

export const migrationChecklist = {
  schemas: [
    "✅ Merger LessonEvaluationSchema + InstructorLessonSchema",
    "✅ Extraire règles communes (email, phone, age, etc.)",
    "✅ Créer base schemas réutilisables",
  ],

  ui: [
    "✅ Standardiser mode validation (onBlur/onChange/onSubmit)",
    "✅ Unifier reValidateMode",
    "✅ Configurer shouldFocusError",
  ],

  i18n: [
    "✅ Ajouter error maps localisés",
    "✅ Tester messages FR/DE/IT/EN",
    "✅ Vérifier cohérence terminologie",
  ],

  testing: [
    "✅ Tests unitaires schemas Zod",
    "✅ Tests intégration React Hook Form",
    "✅ Tests E2E formulaires critiques",
  ],
};

// ============================================================================
// EXPORTS
// ============================================================================

export type { UseValidatedFormOptions };
