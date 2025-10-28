/**
 * ============================================================================
 * VIAMENTOR - Forms Migration Guide
 * ============================================================================
 *
 * Guide complet pour migrer les formulaires existants vers useValidatedForm
 */

// ============================================================================
// 1. INVENTAIRE FORMULAIRES EXISTANTS
// ============================================================================

export const existingForms = {
  students: {
    forms: [
      {
        name: "CreateStudentWizard",
        path: "@/polymet/components/viamentor-create-student-wizard",
        steps: 4,
        complexity: "high",
        priority: "high",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
      {
        name: "StudentInformationsTab",
        path: "@/polymet/components/viamentor-student-informations-tab",
        steps: 1,
        complexity: "medium",
        priority: "high",
        currentValidation: "Inline validation",
        needsMigration: true,
      },
    ],

    estimatedEffort: "4 heures",
  },

  instructors: {
    forms: [
      {
        name: "CreateInstructorWizard",
        path: "@/polymet/components/viamentor-create-instructor-wizard",
        steps: 3,
        complexity: "high",
        priority: "high",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
      {
        name: "InstructorInformationsTab",
        path: "@/polymet/components/viamentor-instructor-informations-tab",
        steps: 1,
        complexity: "medium",
        priority: "medium",
        currentValidation: "Inline validation",
        needsMigration: true,
      },
    ],

    estimatedEffort: "3 heures",
  },

  lessons: {
    forms: [
      {
        name: "BookLessonWizard",
        path: "@/polymet/components/viamentor-book-lesson-wizard",
        steps: 4,
        complexity: "high",
        priority: "critical",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
      {
        name: "LessonEvaluationPage",
        path: "@/polymet/pages/viamentor-lesson-evaluation-page",
        steps: 1,
        complexity: "medium",
        priority: "high",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
    ],

    estimatedEffort: "3 heures",
  },

  vehicles: {
    forms: [
      {
        name: "CreateVehicleWizard",
        path: "@/polymet/components/viamentor-create-vehicle-wizard",
        steps: 4,
        complexity: "high",
        priority: "medium",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
    ],

    estimatedEffort: "2 heures",
  },

  payments: {
    forms: [
      {
        name: "RecordPaymentModal",
        path: "@/polymet/components/viamentor-record-payment-modal",
        steps: 1,
        complexity: "medium",
        priority: "critical",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
      {
        name: "ImportCamtModal",
        path: "@/polymet/components/viamentor-import-camt-modal",
        steps: 4,
        complexity: "high",
        priority: "high",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
    ],

    estimatedEffort: "2 heures",
  },

  tenants: {
    forms: [
      {
        name: "CreateTenantWizard",
        path: "@/polymet/components/viamentor-create-tenant-wizard",
        steps: 5,
        complexity: "high",
        priority: "low",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
    ],

    estimatedEffort: "3 heures",
  },

  onboarding: {
    forms: [
      {
        name: "OnboardingWizard",
        path: "@/polymet/components/viamentor-onboarding-wizard",
        steps: 5,
        complexity: "high",
        priority: "medium",
        currentValidation: "React Hook Form + Zod",
        needsMigration: true,
      },
    ],

    estimatedEffort: "3 heures",
  },
};

// ============================================================================
// 2. PLAN DE MIGRATION PAR PRIORITÉ
// ============================================================================

export const migrationPlan = {
  phase1: {
    title: "Phase 1 - Formulaires Critiques (Semaine 1)",
    priority: "critical",
    forms: ["BookLessonWizard", "RecordPaymentModal", "LessonEvaluationPage"],

    estimatedEffort: "1 semaine",
    benefits: [
      "Validation temps réel paiements",
      "UX cohérente réservations",
      "Moins d'erreurs critiques",
    ],
  },

  phase2: {
    title: "Phase 2 - Formulaires Haute Priorité (Semaine 2-3)",
    priority: "high",
    forms: [
      "CreateStudentWizard",
      "CreateInstructorWizard",
      "StudentInformationsTab",
      "ImportCamtModal",
    ],

    estimatedEffort: "2 semaines",
    benefits: [
      "Création élèves/moniteurs standardisée",
      "Validation OAC/OMCo cohérente",
      "Import Camt fiabilisé",
    ],
  },

  phase3: {
    title: "Phase 3 - Formulaires Priorité Moyenne (Semaine 4)",
    priority: "medium",
    forms: [
      "CreateVehicleWizard",
      "InstructorInformationsTab",
      "OnboardingWizard",
    ],

    estimatedEffort: "1 semaine",
    benefits: [
      "Gestion véhicules améliorée",
      "Onboarding simplifié",
      "Maintenance facilitée",
    ],
  },

  phase4: {
    title: "Phase 4 - Formulaires Priorité Basse (Semaine 5)",
    priority: "low",
    forms: ["CreateTenantWizard"],
    estimatedEffort: "3 jours",
    benefits: ["Cohérence globale", "Codebase unifié"],
  },
};

// ============================================================================
// 3. GUIDE MIGRATION ÉTAPE PAR ÉTAPE
// ============================================================================

export const stepByStepGuide = {
  step1: {
    title: "1. Analyser le formulaire existant",
    tasks: [
      "Identifier le schema Zod utilisé",
      "Noter le mode validation actuel (onBlur/onChange/onSubmit)",
      "Lister les validations custom",
      "Vérifier les dépendances (conditional validation)",
    ],

    example: `
// AVANT - Analyser ce code
const form = useForm<StudentFormData>({
  mode: "onBlur",
  reValidateMode: "onChange",
  resolver: zodResolver(StudentSchema),
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
  },
});
    `,
  },

  step2: {
    title: "2. Identifier le use case approprié",
    tasks: [
      "Déterminer le type de formulaire (create/edit/search/payment)",
      "Choisir la configuration adaptée",
      "Vérifier si validation temps réel nécessaire",
    ],

    mapping: {
      create: "defaultFormConfig (onBlur)",
      edit: "defaultFormConfig (onBlur)",
      search: "searchFormConfig (no validation)",
      payment: "criticalFormConfig (onChange)",
      longForm: "longFormConfig (onSubmit)",
    },
  },

  step3: {
    title: "3. Migrer vers useValidatedForm",
    tasks: [
      "Remplacer useForm par useValidatedForm",
      "Ajouter useCase et locale",
      "Supprimer configuration manuelle",
      "Tester validation",
    ],
  },

  step4: {
    title: "4. Consolider les schemas si nécessaire",
    tasks: [
      "Vérifier si schema peut être consolidé",
      "Extraire règles communes",
      "Utiliser composition Zod (.extend())",
      "Documenter schema consolidé",
    ],
  },

  step5: {
    title: "5. Tester exhaustivement",
    tasks: [
      "Tester validation client",
      "Vérifier messages d'erreur FR/DE/IT/EN",
      "Tester focus automatique sur erreur",
      "Vérifier re-validation après correction",
      "Tester soumission avec erreurs",
    ],

    checklist: [
      "✅ Validation déclenche au bon moment",
      "✅ Messages d'erreur corrects",
      "✅ Focus automatique fonctionne",
      "✅ Re-validation après correction",
      "✅ Soumission bloquée si erreurs",
      "✅ Loading state pendant soumission",
      "✅ Success/error feedback après soumission",
    ],
  },

  step6: {
    title: "6. Documenter les changements",
    tasks: [
      "Mettre à jour README composant",
      "Documenter props interface",
      "Ajouter exemples utilisation",
      "Noter breaking changes éventuels",
    ],
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  existingForms,
  migrationPlan,
  stepByStepGuide,
};
