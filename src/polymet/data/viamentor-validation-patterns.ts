/**
 * ============================================================================
 * VIAMENTOR - Validation Patterns Documentation
 * ============================================================================
 *
 * Documentation complète des patterns de validation et best practices
 */

// ============================================================================
// 1. PATTERNS SCHEMAS ZOD
// ============================================================================

export const zodPatterns = {
  composition: {
    title: "Pattern Composition - Réutilisation Schemas",
    description:
      "Créer des schemas de base et les étendre pour éviter la duplication",
    antiPattern: `
// ❌ ANTI-PATTERN - Duplication
const StudentSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\\+41\\d{9}$/),
  birthDate: z.date(),
});

const InstructorSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\\+41\\d{9}$/),
  licenseNumber: z.string(),
  hireDate: z.date(),
});
    `,
    bestPractice: `
// ✅ BEST PRACTICE - Composition
const BasePersonSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: emailValidation,
  phone: swissPhoneValidation,
});

const StudentSchema = BasePersonSchema.extend({
  birthDate: z.date(),
  category: z.enum(['A', 'B', 'C', 'D']),
});

const InstructorSchema = BasePersonSchema.extend({
  licenseNumber: swissLicenseValidation,
  hireDate: z.date(),
  categories: z.array(z.enum(['A', 'B', 'C', 'D'])),
});
    `,
    benefits: [
      "Code DRY (Don't Repeat Yourself)",
      "Maintenance simplifiée",
      "Évolution facilitée",
      "Cohérence garantie",
    ],
  },

  reusableRules: {
    title: "Pattern Règles Réutilisables",
    description:
      "Extraire les règles de validation communes dans des constantes",
    antiPattern: `
// ❌ ANTI-PATTERN - Règles dupliquées
const StudentSchema = z.object({
  email: z.string().email().refine(async (email) => {
    return !await emailExists(email);
  }, "Email déjà utilisé"),
});

const InstructorSchema = z.object({
  email: z.string().email().refine(async (email) => {
    return !await emailExists(email);
  }, "Email déjà utilisé"),
});
    `,
    bestPractice: `
// ✅ BEST PRACTICE - Règle réutilisable
export const emailValidation = z
  .string()
  .email("Email invalide")
  .refine(
    async (email) => {
      return !await emailExists(email);
    },
    { message: "Email déjà utilisé" }
  );

const StudentSchema = z.object({
  email: emailValidation,
});

const InstructorSchema = z.object({
  email: emailValidation,
});
    `,
    benefits: [
      "Validation cohérente",
      "Réutilisation facile",
      "Tests simplifiés",
      "Maintenance centralisée",
    ],
  },

  conditionalValidation: {
    title: "Pattern Validation Conditionnelle",
    description: "Valider un champ seulement si une condition est remplie",
    antiPattern: `
// ❌ ANTI-PATTERN - Logique complexe dans schema
const PaymentSchema = z.object({
  method: z.enum(['cash', 'card', 'bank_transfer']),
  iban: z.string().optional(),
}).refine(
  (data) => {
    if (data.method === 'bank_transfer') {
      return data.iban && /^CH\\d{19}$/.test(data.iban);
    }
    return true;
  },
  { message: "IBAN requis pour virement", path: ["iban"] }
);
    `,
    bestPractice: `
// ✅ BEST PRACTICE - Helper conditionalValidation
export const conditionalValidation = (
  condition: (data: any) => boolean,
  schema: z.ZodType
) => {
  return z.union([
    z.undefined(),
    schema,
  ]).refine(
    (value, ctx) => {
      if (condition(ctx.parent)) {
        return schema.safeParse(value).success;
      }
      return true;
    }
  );
};

const PaymentSchema = z.object({
  method: z.enum(['cash', 'card', 'bank_transfer']),
  iban: conditionalValidation(
    (data) => data.method === 'bank_transfer',
    swissIBANValidation
  ),
});
    `,
    benefits: [
      "Code plus lisible",
      "Logique réutilisable",
      "Messages d'erreur clairs",
      "Tests plus faciles",
    ],
  },

  dependentValidation: {
    title: "Pattern Validation Dépendante",
    description: "Valider un champ en fonction de la valeur d'un autre champ",
    bestPractice: `
// ✅ BEST PRACTICE - Helper dependentValidation
export const dependentValidation = (
  dependsOn: string,
  condition: (value: any) => boolean,
  schema: z.ZodType
) => {
  return z.union([
    z.undefined(),
    schema,
  ]).refine(
    (value, ctx) => {
      const dependentValue = ctx.parent[dependsOn];
      if (condition(dependentValue)) {
        return schema.safeParse(value).success;
      }
      return true;
    }
  );
};

// Exemple: Permis requis seulement si "hasLicense" est true
const InstructorSchema = z.object({
  hasLicense: z.boolean(),
  licenseNumber: dependentValidation(
    'hasLicense',
    (hasLicense) => hasLicense === true,
    swissLicenseValidation
  ),
});
    `,
    benefits: [
      "Validation dynamique",
      "UX améliorée",
      "Logique métier respectée",
    ],
  },

  asyncValidation: {
    title: "Pattern Validation Asynchrone",
    description:
      "Valider des données nécessitant un appel API (email exists, etc.)",
    bestPractice: `
// ✅ BEST PRACTICE - Async validation avec debounce
export const emailValidation = z
  .string()
  .email("Email invalide")
  .refine(
    async (email) => {
      // Debounce pour éviter trop d'appels API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      try {
        const exists = await checkEmailExists(email);
        return !exists;
      } catch (error) {
        // En cas d'erreur API, on accepte l'email
        console.error('Email check failed:', error);
        return true;
      }
    },
    { 
      message: "Email déjà utilisé",
      // Important: async validation
      async: true,
    }
  );
    `,
    benefits: [
      "Validation temps réel",
      "UX améliorée",
      "Moins d'erreurs soumission",
    ],

    warnings: [
      "⚠️ Ajouter debounce pour limiter appels API",
      "⚠️ Gérer les erreurs réseau gracefully",
      "⚠️ Afficher loading state pendant validation",
    ],
  },
};

// ============================================================================
// 2. PATTERNS REACT HOOK FORM
// ============================================================================

export const reactHookFormPatterns = {
  standardization: {
    title: "Pattern Standardisation Configuration",
    description: "Utiliser des configurations prédéfinies par use case",
    antiPattern: `
// ❌ ANTI-PATTERN - Configuration manuelle partout
const form1 = useForm({
  mode: 'onBlur',
  reValidateMode: 'onChange',
  shouldFocusError: true,
  resolver: zodResolver(Schema1),
});

const form2 = useForm({
  mode: 'onChange', // Différent!
  reValidateMode: 'onBlur', // Différent!
  shouldFocusError: false, // Différent!
  resolver: zodResolver(Schema2),
});
    `,
    bestPractice: `
// ✅ BEST PRACTICE - Configuration par use case
const form1 = useValidatedForm({
  schema: Schema1,
  useCase: 'create', // onBlur
  locale: 'fr',
});

const form2 = useValidatedForm({
  schema: Schema2,
  useCase: 'payment', // onChange
  locale: 'fr',
});
    `,
    benefits: [
      "UX cohérente",
      "Moins de boilerplate",
      "Configuration centralisée",
      "Maintenance simplifiée",
    ],
  },

  errorHandling: {
    title: "Pattern Gestion Erreurs",
    description: "Afficher les erreurs de validation de manière cohérente",
    bestPractice: `
// ✅ BEST PRACTICE - Composant ErrorMessage réutilisable
export function FormField({ 
  name, 
  label, 
  form, 
  ...props 
}: FormFieldProps) {
  const error = form.formState.errors[name];
  
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        {...form.register(name)}
        {...props}
        className={cn(
          "input",
          error && "border-destructive focus:ring-destructive"
        )}
      />
      {error && (
        <p className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}

// Utilisation
<FormField
  name="email"
  label="Email"
  form={form}
  type="email"
  placeholder="exemple@email.com"
/>
    `,
    benefits: [
      "Affichage erreurs cohérent",
      "Accessibilité améliorée",
      "Code réutilisable",
    ],
  },

  loadingStates: {
    title: "Pattern Loading States",
    description:
      "Gérer les états de chargement pendant validation et soumission",
    bestPractice: `
// ✅ BEST PRACTICE - Loading states
export function MyForm() {
  const form = useValidatedForm({
    schema: MySchema,
    useCase: 'create',
    locale: 'fr',
    onSubmit: async (data) => {
      await createResource(data);
    },
  });

  const { isSubmitting, isValidating } = form.formState;

  return (
    <form onSubmit={form.handleSubmit}>
      {/* Form fields */}
      
      <button 
        type="submit" 
        disabled={isSubmitting || isValidating}
      >
        {isSubmitting ? (
          <>
            <Loader2Icon className="animate-spin" />
            Enregistrement...
          </>
        ) : (
          'Enregistrer'
        )}
      </button>
    </form>
  );
}
    `,
    benefits: [
      "UX améliorée",
      "Feedback visuel",
      "Prévention double soumission",
    ],
  },

  focusManagement: {
    title: "Pattern Focus Management",
    description: "Gérer le focus automatique sur les erreurs",
    bestPractice: `
// ✅ BEST PRACTICE - Focus automatique
const form = useValidatedForm({
  schema: MySchema,
  useCase: 'create',
  locale: 'fr',
  // Focus automatique sur premier champ avec erreur
  shouldFocusError: true,
});

// Scroll vers erreur si hors viewport
useEffect(() => {
  const firstError = Object.keys(form.formState.errors)[0];
  if (firstError) {
    const element = document.getElementById(firstError);
    element?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
}, [form.formState.errors]);
    `,
    benefits: [
      "Accessibilité améliorée",
      "UX fluide",
      "Navigation clavier facilitée",
    ],
  },
};

// ============================================================================
// 3. PATTERNS I18N
// ============================================================================

export const i18nPatterns = {
  errorMaps: {
    title: "Pattern Error Maps Localisés",
    description: "Traduire automatiquement les messages d'erreur Zod",
    bestPractice: `
// ✅ BEST PRACTICE - Error maps par langue
export const localizedErrorMap = (locale: SupportedLocale) => {
  const translations = {
    fr: {
      invalid_type: "Type invalide",
      too_small: "Trop court",
      too_big: "Trop long",
      invalid_string: "Format invalide",
    },
    de: {
      invalid_type: "Ungültiger Typ",
      too_small: "Zu kurz",
      too_big: "Zu lang",
      invalid_string: "Ungültiges Format",
    },
    // ... autres langues
  };

  return (issue: z.ZodIssueOptionalMessage, ctx: z.ErrorMapCtx) => {
    const t = translations[locale];
    return { message: t[issue.code] || ctx.defaultError };
  };
};

// Utilisation dans hook
const form = useValidatedForm({
  schema: MySchema,
  locale: 'fr', // Messages en français
});
    `,
    benefits: [
      "Support multilingue automatique",
      "Messages cohérents",
      "Maintenance centralisée",
    ],
  },

  customMessages: {
    title: "Pattern Messages Personnalisés",
    description: "Surcharger les messages par défaut pour des cas spécifiques",
    bestPractice: `
// ✅ BEST PRACTICE - Messages personnalisés
const StudentSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  
  email: emailValidation,
  
  birthDate: z
    .date()
    .refine(
      (date) => calculateAge(date) >= 15,
      "L'élève doit avoir au moins 15 ans pour s'inscrire"
    ),
});
    `,
    benefits: [
      "Messages contextuels",
      "UX améliorée",
      "Clarté pour l'utilisateur",
    ],
  },
};

// ============================================================================
// 4. PATTERNS PERFORMANCE
// ============================================================================

export const performancePatterns = {
  debouncing: {
    title: "Pattern Debouncing Validation",
    description: "Limiter les validations pendant la saisie",
    bestPractice: `
// ✅ BEST PRACTICE - Debounce async validation
import { useDebouncedCallback } from 'use-debounce';

export function EmailField({ form }: Props) {
  const debouncedValidate = useDebouncedCallback(
    async (email: string) => {
      await form.trigger('email');
    },
    300 // 300ms debounce
  );

  return (
    <input
      {...form.register('email')}
      onChange={(e) => {
        form.setValue('email', e.target.value);
        debouncedValidate(e.target.value);
      }}
    />
  );
}
    `,
    benefits: ["Moins d'appels API", "Performance améliorée", "UX fluide"],
  },

  memoization: {
    title: "Pattern Memoization Schemas",
    description: "Mémoriser les schemas Zod pour éviter recréation",
    bestPractice: `
// ✅ BEST PRACTICE - Memoize schemas
import { useMemo } from 'react';

export function MyForm({ minAge }: Props) {
  // Schema mémorisé, recréé seulement si minAge change
  const schema = useMemo(
    () => z.object({
      birthDate: ageValidation(minAge),
    }),
    [minAge]
  );

  const form = useValidatedForm({
    schema,
    useCase: 'create',
    locale: 'fr',
  });

  return <form>...</form>;
}
    `,
    benefits: [
      "Performance améliorée",
      "Moins de re-renders",
      "Validation plus rapide",
    ],
  },
};

// ============================================================================
// 5. PATTERNS TESTING
// ============================================================================

export const testingPatterns = {
  unitTests: {
    title: "Pattern Tests Unitaires Schemas",
    description: "Tester les schemas Zod de manière isolée",
    bestPractice: `
// ✅ BEST PRACTICE - Tests unitaires
import { describe, it, expect } from 'vitest';

describe('StudentSchema', () => {
  it('should accept valid student data', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      birthDate: new Date('2005-01-01'),
    };
    
    const result = StudentSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should reject student under 15 years old', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      birthDate: new Date('2015-01-01'),
    };
    
    const result = StudentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('15 ans');
    }
  });
});
    `,
  },

  integrationTests: {
    title: "Pattern Tests Intégration Forms",
    description: "Tester les formulaires avec React Testing Library",
    bestPractice: `
// ✅ BEST PRACTICE - Tests intégration
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('CreateStudentForm', () => {
  it('should show validation errors', async () => {
    render(<CreateStudentForm />);
    
    const submitButton = screen.getByRole('button', { name: /enregistrer/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/prénom.*requis/i)).toBeInTheDocument();
    });
  });

  it('should submit valid data', async () => {
    const onSubmit = vi.fn();
    render(<CreateStudentForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: 'Doe' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
      });
    });
  });
});
    `,
  },
};

// ============================================================================
// 6. ANTI-PATTERNS À ÉVITER
// ============================================================================

export const antiPatterns = {
  noValidation: {
    title: "❌ Pas de Validation Client",
    problem: "Compter uniquement sur la validation serveur",
    why: "UX dégradée, feedback tardif, plus d'erreurs",
    solution: "Toujours valider côté client ET serveur",
  },

  inconsistentValidation: {
    title: "❌ Validation Inconsistante",
    problem: "Différentes règles selon les formulaires",
    why: "UX imprévisible, confusion utilisateurs",
    solution: "Utiliser useValidatedForm avec use cases standardisés",
  },

  noErrorMessages: {
    title: "❌ Pas de Messages d'Erreur",
    problem: "Validation sans feedback visuel",
    why: "Utilisateur ne sait pas quoi corriger",
    solution: "Toujours afficher messages d'erreur clairs",
  },

  syncValidationForAsync: {
    title: "❌ Validation Synchrone pour Données Async",
    problem: "Vérifier email exists sans async",
    why: "Validation incorrecte, erreurs serveur",
    solution: "Utiliser .refine() avec async pour appels API",
  },

  noDebounce: {
    title: "❌ Pas de Debounce Validation Async",
    problem: "Valider à chaque frappe sans debounce",
    why: "Trop d'appels API, performance dégradée",
    solution: "Debounce 300ms pour validation async",
  },
};

// ============================================================================
// 7. CHECKLIST BEST PRACTICES
// ============================================================================

export const bestPracticesChecklist = {
  schemas: [
    "✅ Utiliser composition Zod (.extend())",
    "✅ Extraire règles communes",
    "✅ Documenter schemas complexes",
    "✅ Tester tous les cas edge",
  ],

  forms: [
    "✅ Utiliser useValidatedForm",
    "✅ Choisir use case approprié",
    "✅ Afficher loading states",
    "✅ Gérer focus automatique",
  ],

  i18n: [
    "✅ Utiliser error maps localisés",
    "✅ Messages personnalisés contextuels",
    "✅ Tester toutes les langues",
  ],

  performance: [
    "✅ Debounce validation async",
    "✅ Mémoriser schemas",
    "✅ Optimiser re-renders",
  ],

  testing: [
    "✅ Tests unitaires schemas",
    "✅ Tests intégration forms",
    "✅ Coverage > 90%",
  ],
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  zodPatterns,
  reactHookFormPatterns,
  i18nPatterns,
  performancePatterns,
  testingPatterns,
  antiPatterns,
  bestPracticesChecklist,
};
