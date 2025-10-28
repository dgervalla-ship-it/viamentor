/**
 * ============================================================================
 * VIAMENTOR - Validation Tests
 * ============================================================================
 *
 * Tests unitaires pour schemas Zod et règles de validation
 * Framework: Vitest + Testing Library
 */

// ============================================================================
// 1. CONFIGURATION TESTS
// ============================================================================

export const testConfig = {
  framework: "Vitest",
  testingLibrary: "@testing-library/react",
  coverage: {
    target: "90%",
    statements: 90,
    branches: 85,
    functions: 90,
    lines: 90,
  },
  setup: `
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
  `,
};

// ============================================================================
// 2. TESTS RÈGLES VALIDATION RÉUTILISABLES
// ============================================================================

export const reusableRulesTests = {
  emailValidation: {
    description: "Tests validation email avec async check",
    testCases: [
      {
        name: "should accept valid email",
        input: "test@example.com",
        expected: { success: true },
      },
      {
        name: "should reject invalid email format",
        input: "invalid-email",
        expected: { success: false, error: "Email invalide" },
      },
      {
        name: "should reject email without domain",
        input: "test@",
        expected: { success: false, error: "Email invalide" },
      },
      {
        name: "should reject already existing email (async)",
        input: "existing@example.com",
        expected: { success: false, error: "Email déjà utilisé" },
        mock: { emailExists: true },
      },
      {
        name: "should accept new email (async)",
        input: "new@example.com",
        expected: { success: true },
        mock: { emailExists: false },
      },
    ],

    code: `
import { describe, it, expect, vi } from 'vitest';
import { emailValidation } from '@/viamentor/data/viamentor-validation-improvements';

describe('emailValidation', () => {
  it('should accept valid email', async () => {
    const result = await emailValidation.safeParseAsync('test@example.com');
    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', async () => {
    const result = await emailValidation.safeParseAsync('invalid-email');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Email invalide');
    }
  });

  it('should reject already existing email', async () => {
    // Mock emailExists function
    vi.mock('@/lib/api', () => ({
      emailExists: vi.fn().mockResolvedValue(true),
    }));

    const result = await emailValidation.safeParseAsync('existing@example.com');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('déjà utilisé');
    }
  });
});
    `,
  },

  swissPhoneValidation: {
    description: "Tests validation téléphone suisse",
    testCases: [
      {
        name: "should accept valid Swiss phone with +41",
        input: "+41791234567",
        expected: { success: true },
      },
      {
        name: "should accept valid Swiss phone with spaces",
        input: "+41 79 123 45 67",
        expected: { success: true },
      },
      {
        name: "should reject phone without +41",
        input: "0791234567",
        expected: { success: false, error: "Format: +41 XX XXX XX XX" },
      },
      {
        name: "should reject phone with wrong country code",
        input: "+33612345678",
        expected: { success: false, error: "Format: +41 XX XXX XX XX" },
      },
      {
        name: "should reject phone with invalid length",
        input: "+4179123",
        expected: { success: false, error: "Format: +41 XX XXX XX XX" },
      },
    ],

    code: `
import { describe, it, expect } from 'vitest';
import { swissPhoneValidation } from '@/viamentor/data/viamentor-validation-improvements';

describe('swissPhoneValidation', () => {
  it('should accept valid Swiss phone with +41', () => {
    const result = swissPhoneValidation.safeParse('+41791234567');
    expect(result.success).toBe(true);
  });

  it('should accept valid Swiss phone with spaces', () => {
    const result = swissPhoneValidation.safeParse('+41 79 123 45 67');
    expect(result.success).toBe(true);
  });

  it('should reject phone without +41', () => {
    const result = swissPhoneValidation.safeParse('0791234567');
    expect(result.success).toBe(false);
  });

  it('should reject phone with wrong country code', () => {
    const result = swissPhoneValidation.safeParse('+33612345678');
    expect(result.success).toBe(false);
  });
});
    `,
  },

  ageValidation: {
    description: "Tests validation âge minimum",
    testCases: [
      {
        name: "should accept age >= minAge",
        input: new Date("2005-01-01"),
        minAge: 15,
        expected: { success: true },
      },
      {
        name: "should reject age < minAge",
        input: new Date("2015-01-01"),
        minAge: 15,
        expected: {
          success: false,
          error: "L'élève doit avoir au moins 15 ans",
        },
      },
      {
        name: "should handle edge case (exactly minAge)",
        input: new Date(new Date().setFullYear(new Date().getFullYear() - 15)),
        minAge: 15,
        expected: { success: true },
      },
    ],

    code: `
import { describe, it, expect } from 'vitest';
import { ageValidation } from '@/viamentor/data/viamentor-validation-improvements';

describe('ageValidation', () => {
  it('should accept age >= minAge', () => {
    const birthDate = new Date('2005-01-01');
    const schema = ageValidation(15);
    const result = schema.safeParse(birthDate);
    expect(result.success).toBe(true);
  });

  it('should reject age < minAge', () => {
    const birthDate = new Date('2015-01-01');
    const schema = ageValidation(15);
    const result = schema.safeParse(birthDate);
    expect(result.success).toBe(false);
  });

  it('should handle edge case (exactly minAge)', () => {
    const today = new Date();
    const birthDate = new Date(today.setFullYear(today.getFullYear() - 15));
    const schema = ageValidation(15);
    const result = schema.safeParse(birthDate);
    expect(result.success).toBe(true);
  });
});
    `,
  },

  swissLicenseValidation: {
    description: "Tests validation permis suisse",
    testCases: [
      {
        name: "should accept valid Swiss license",
        input: "GE123456",
        expected: { success: true },
      },
      {
        name: "should accept license with lowercase canton",
        input: "ge123456",
        expected: { success: true },
      },
      {
        name: "should reject license without canton",
        input: "123456",
        expected: { success: false, error: "Format: GE123456" },
      },
      {
        name: "should reject license with invalid canton",
        input: "XX123456",
        expected: { success: false, error: "Format: GE123456" },
      },
    ],

    code: `
import { describe, it, expect } from 'vitest';
import { swissLicenseValidation } from '@/viamentor/data/viamentor-validation-improvements';

describe('swissLicenseValidation', () => {
  it('should accept valid Swiss license', () => {
    const result = swissLicenseValidation.safeParse('GE123456');
    expect(result.success).toBe(true);
  });

  it('should accept license with lowercase canton', () => {
    const result = swissLicenseValidation.safeParse('ge123456');
    expect(result.success).toBe(true);
  });

  it('should reject license without canton', () => {
    const result = swissLicenseValidation.safeParse('123456');
    expect(result.success).toBe(false);
  });
});
    `,
  },

  swissIBANValidation: {
    description: "Tests validation IBAN suisse",
    testCases: [
      {
        name: "should accept valid Swiss IBAN",
        input: "CH9300762011623852957",
        expected: { success: true },
      },
      {
        name: "should accept IBAN with spaces",
        input: "CH93 0076 2011 6238 5295 7",
        expected: { success: true },
      },
      {
        name: "should reject IBAN without CH",
        input: "FR7630006000011234567890189",
        expected: { success: false, error: "IBAN suisse requis (CH)" },
      },
      {
        name: "should reject IBAN with invalid length",
        input: "CH93007620116238",
        expected: { success: false, error: "IBAN suisse requis (CH)" },
      },
    ],

    code: `
import { describe, it, expect } from 'vitest';
import { swissIBANValidation } from '@/viamentor/data/viamentor-validation-improvements';

describe('swissIBANValidation', () => {
  it('should accept valid Swiss IBAN', () => {
    const result = swissIBANValidation.safeParse('CH9300762011623852957');
    expect(result.success).toBe(true);
  });

  it('should accept IBAN with spaces', () => {
    const result = swissIBANValidation.safeParse('CH93 0076 2011 6238 5295 7');
    expect(result.success).toBe(true);
  });

  it('should reject IBAN without CH', () => {
    const result = swissIBANValidation.safeParse('FR7630006000011234567890189');
    expect(result.success).toBe(false);
  });
});
    `,
  },
};

// ============================================================================
// 3. TESTS SCHEMAS CONSOLIDÉS
// ============================================================================

export const consolidatedSchemasTests = {
  baseLessonSchema: {
    description: "Tests schema base leçon",
    testCases: [
      {
        name: "should accept valid lesson data",
        input: {
          date: new Date(),
          duration: 90,
          studentId: "student-1",
          instructorId: "instructor-1",
          vehicleId: "vehicle-1",
        },
        expected: { success: true },
      },
      {
        name: "should reject lesson with invalid duration",
        input: {
          date: new Date(),
          duration: 30, // < 45 min
          studentId: "student-1",
          instructorId: "instructor-1",
          vehicleId: "vehicle-1",
        },
        expected: { success: false, error: "Durée minimum: 45 minutes" },
      },
    ],

    code: `
import { describe, it, expect } from 'vitest';
import { BaseLessonSchema } from '@/viamentor/data/viamentor-validation-improvements';

describe('BaseLessonSchema', () => {
  it('should accept valid lesson data', () => {
    const data = {
      date: new Date(),
      duration: 90,
      studentId: 'student-1',
      instructorId: 'instructor-1',
      vehicleId: 'vehicle-1',
    };
    const result = BaseLessonSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should reject lesson with invalid duration', () => {
    const data = {
      date: new Date(),
      duration: 30,
      studentId: 'student-1',
      instructorId: 'instructor-1',
      vehicleId: 'vehicle-1',
    };
    const result = BaseLessonSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
    `,
  },

  lessonEvaluationSchema: {
    description: "Tests schema évaluation leçon (extends BaseLessonSchema)",
    testCases: [
      {
        name: "should accept valid evaluation",
        input: {
          date: new Date(),
          duration: 90,
          studentId: "student-1",
          instructorId: "instructor-1",
          vehicleId: "vehicle-1",
          rating: 4,
          comments: "Bonne progression",
          skills: ["parking", "roundabouts"],
        },
        expected: { success: true },
      },
      {
        name: "should reject evaluation with invalid rating",
        input: {
          date: new Date(),
          duration: 90,
          studentId: "student-1",
          instructorId: "instructor-1",
          vehicleId: "vehicle-1",
          rating: 6, // > 5
          comments: "Bonne progression",
        },
        expected: { success: false, error: "Note entre 1 et 5" },
      },
    ],
  },
};

// ============================================================================
// 4. TESTS VALIDATION CONDITIONNELLE
// ============================================================================

export const conditionalValidationTests = {
  paymentForm: {
    description: "Tests validation conditionnelle paiement",
    testCases: [
      {
        name: "should require IBAN for bank_transfer",
        input: {
          amount: 100,
          method: "bank_transfer",
          iban: undefined,
        },
        expected: { success: false, error: "IBAN requis pour virement" },
      },
      {
        name: "should not require IBAN for cash",
        input: {
          amount: 100,
          method: "cash",
          iban: undefined,
        },
        expected: { success: true },
      },
      {
        name: "should validate IBAN format when provided",
        input: {
          amount: 100,
          method: "bank_transfer",
          iban: "invalid-iban",
        },
        expected: { success: false, error: "IBAN suisse requis" },
      },
    ],

    code: `
import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { conditionalValidation, swissIBANValidation } from '@/viamentor/data/viamentor-validation-improvements';

const PaymentSchema = z.object({
  amount: z.number().min(0.01),
  method: z.enum(['cash', 'card', 'bank_transfer']),
  iban: conditionalValidation(
    (data) => data.method === 'bank_transfer',
    swissIBANValidation
  ),
});

describe('Conditional Validation - Payment', () => {
  it('should require IBAN for bank_transfer', () => {
    const data = {
      amount: 100,
      method: 'bank_transfer' as const,
      iban: undefined,
    };
    const result = PaymentSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('should not require IBAN for cash', () => {
    const data = {
      amount: 100,
      method: 'cash' as const,
      iban: undefined,
    };
    const result = PaymentSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
    `,
  },
};

// ============================================================================
// 5. TESTS HOOK useValidatedForm
// ============================================================================

export const useValidatedFormTests = {
  basicUsage: {
    description: "Tests utilisation basique hook",
    code: `
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useValidatedForm } from '@/viamentor/data/viamentor-validation-improvements';
import { z } from 'zod';

const TestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

describe('useValidatedForm - Basic Usage', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useValidatedForm({
        schema: TestSchema,
        useCase: 'create',
        locale: 'fr',
        defaultValues: {
          name: '',
          email: '',
        },
      })
    );

    expect(result.current.getValues()).toEqual({
      name: '',
      email: '',
    });
  });

  it('should validate on blur for create use case', async () => {
    const { result } = renderHook(() =>
      useValidatedForm({
        schema: TestSchema,
        useCase: 'create',
        locale: 'fr',
      })
    );

    await act(async () => {
      result.current.setValue('name', 'a'); // Too short
      await result.current.trigger('name');
    });

    expect(result.current.formState.errors.name).toBeDefined();
  });

  it('should show localized error messages', async () => {
    const { result } = renderHook(() =>
      useValidatedForm({
        schema: TestSchema,
        useCase: 'create',
        locale: 'fr',
      })
    );

    await act(async () => {
      result.current.setValue('email', 'invalid');
      await result.current.trigger('email');
    });

    expect(result.current.formState.errors.email?.message).toContain('invalide');
  });
});
    `,
  },

  useCaseConfigs: {
    description: "Tests configurations par use case",
    code: `
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useValidatedForm } from '@/viamentor/data/viamentor-validation-improvements';
import { z } from 'zod';

const TestSchema = z.object({
  amount: z.number().min(0.01),
});

describe('useValidatedForm - Use Case Configs', () => {
  it('should use onChange validation for payment use case', () => {
    const { result } = renderHook(() =>
      useValidatedForm({
        schema: TestSchema,
        useCase: 'payment',
        locale: 'fr',
      })
    );

    // Payment use case should have onChange mode
    expect(result.current.formState.mode).toBe('onChange');
  });

  it('should use onBlur validation for create use case', () => {
    const { result } = renderHook(() =>
      useValidatedForm({
        schema: TestSchema,
        useCase: 'create',
        locale: 'fr',
      })
    );

    // Create use case should have onBlur mode
    expect(result.current.formState.mode).toBe('onBlur');
  });

  it('should disable validation for search use case', () => {
    const { result } = renderHook(() =>
      useValidatedForm({
        schema: TestSchema,
        useCase: 'search',
        locale: 'fr',
      })
    );

    // Search use case should have no validation
    expect(result.current.formState.mode).toBe('onSubmit');
  });
});
    `,
  },
};

// ============================================================================
// 6. TESTS INTÉGRATION REACT HOOK FORM
// ============================================================================

export const reactHookFormIntegrationTests = {
  formSubmission: {
    description: "Tests soumission formulaire",
    code: `
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useValidatedForm } from '@/viamentor/data/viamentor-validation-improvements';
import { z } from 'zod';

const TestSchema = z.object({
  name: z.string().min(2),
});

function TestForm() {
  const form = useValidatedForm({
    schema: TestSchema,
    useCase: 'create',
    locale: 'fr',
    onSubmit: vi.fn(),
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input {...form.register('name')} />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('React Hook Form Integration', () => {
  it('should prevent submission with validation errors', async () => {
    const onSubmit = vi.fn();
    render(<TestForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('should submit valid data', async () => {
    const onSubmit = vi.fn();
    render(<TestForm />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Valid Name' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'Valid Name' });
    });
  });
});
    `,
  },
};

// ============================================================================
// 7. COMMANDES NPM TESTS
// ============================================================================

export const testCommands = {
  runAll: "npm run test",
  runWatch: "npm run test:watch",
  runCoverage: "npm run test:coverage",
  runUnit: "npm run test:unit",
  runIntegration: "npm run test:integration",
  runE2E: "npm run test:e2e",
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  testConfig,
  reusableRulesTests,
  consolidatedSchemasTests,
  conditionalValidationTests,
  useValidatedFormTests,
  reactHookFormIntegrationTests,
  testCommands,
};
