/**
 * ============================================================================
 * VIAMENTOR - BILLING QUERY HOOKS
 * ============================================================================
 *
 * Hooks TanStack Query réutilisables pour facturation automatique:
 * - Génération automatique factures mensuelles
 * - Relances automatiques impayés
 * - Gestion crédits de rattrapage
 * - Utilisation crédits
 * - Calculs financiers
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  billingBusinessLogic,
  type Invoice,
  type MakeupCredit,
  type CancellationReason,
} from "@/polymet/data/viamentor-billing-business-rules";

// ============================================================================
// TYPES
// ============================================================================

export interface GenerateInvoiceParams {
  studentId: string;
  month: Date;
}

export interface ManageMakeupParams {
  lessonId: string;
  reason: CancellationReason;
}

export interface UseMakeupParams {
  studentId: string;
  lessonDuration: number;
}

export interface InvoiceFilters {
  status?: string;
  studentId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// ============================================================================
// QUERY HOOKS - INVOICES
// ============================================================================

/**
 * Hook pour récupérer les factures avec filtres
 *
 * @example
 * ```tsx
 * const { data: invoices, isLoading } = useInvoices({
 *   status: 'overdue',
 *   studentId: 'student-1'
 * })
 * ```
 */
export function useInvoices(filters?: InvoiceFilters) {
  return useQuery({
    queryKey: ["invoices", filters],
    queryFn: async () => {
      // TODO: Remplacer par vraie API call
      const invoices: Invoice[] = [];
      return invoices;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook pour récupérer une facture par ID
 *
 * @example
 * ```tsx
 * const { data: invoice, isLoading } = useInvoice(invoiceId)
 * ```
 */
export function useInvoice(id: string) {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: async () => {
      // TODO: Remplacer par vraie API call
      throw new Error(`Invoice ${id} not found`);
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook pour récupérer les factures en retard
 *
 * @example
 * ```tsx
 * const { data: overdueInvoices, isLoading } = useOverdueInvoices()
 * ```
 */
export function useOverdueInvoices() {
  return useQuery({
    queryKey: ["invoices", "overdue"],
    queryFn: async () => {
      // TODO: Remplacer par vraie API call
      const invoices: Invoice[] = [];
      return invoices;
    },
    staleTime: 1 * 60 * 1000, // 1 minute (données critiques)
  });
}

// ============================================================================
// QUERY HOOKS - MAKEUP CREDITS
// ============================================================================

/**
 * Hook pour récupérer les crédits de rattrapage d'un élève
 *
 * @example
 * ```tsx
 * const { data: credits, isLoading } = useMakeupCredits(studentId)
 * ```
 */
export function useMakeupCredits(studentId: string) {
  return useQuery({
    queryKey: ["makeupCredits", studentId],
    queryFn: async () => {
      // TODO: Remplacer par vraie API call
      const credits: MakeupCredit[] = [];
      return credits;
    },
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour récupérer les crédits disponibles (non expirés, non utilisés)
 *
 * @example
 * ```tsx
 * const { data: availableCredits } = useAvailableMakeupCredits(studentId)
 * ```
 */
export function useAvailableMakeupCredits(studentId: string) {
  return useQuery({
    queryKey: ["makeupCredits", studentId, "available"],
    queryFn: async () => {
      // TODO: Remplacer par vraie API call
      const credits: MakeupCredit[] = [];
      return credits.filter((c) => !c.used && c.expiryDate > new Date());
    },
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================================================
// MUTATION HOOKS - INVOICE GENERATION
// ============================================================================

/**
 * Hook pour générer une facture mensuelle automatiquement
 *
 * @example
 * ```tsx
 * const { mutate: generateInvoice, isPending } = useGenerateMonthlyInvoice()
 *
 * generateInvoice(
 *   { studentId: 'student-1', month: new Date() },
 *   {
 *     onSuccess: (invoice) => {
 *       console.log('Facture générée:', invoice.invoiceNumber)
 *     }
 *   }
 * )
 * ```
 */
export function useGenerateMonthlyInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: GenerateInvoiceParams) => {
      return await billingBusinessLogic.generateMonthlyInvoice(
        params.studentId,
        params.month
      );
    },
    onSuccess: (invoice) => {
      // Invalider les factures pour refetch
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({
        queryKey: ["invoices", invoice.studentId],
      });
    },
  });
}

/**
 * Hook pour générer toutes les factures mensuelles (batch)
 *
 * @example
 * ```tsx
 * const { mutate: generateAllInvoices } = useGenerateAllMonthlyInvoices()
 *
 * generateAllInvoices(
 *   { month: new Date(), studentIds: ['1', '2', '3'] },
 *   {
 *     onSuccess: (results) => {
 *       console.log(`${results.success} factures générées`)
 *     }
 *   }
 * )
 * ```
 */
export function useGenerateAllMonthlyInvoices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { month: Date; studentIds: string[] }) => {
      const results = {
        success: 0,
        failed: 0,
        invoices: [] as Invoice[],
        errors: [] as { studentId: string; error: string }[],
      };

      for (const studentId of params.studentIds) {
        try {
          const invoice = await billingBusinessLogic.generateMonthlyInvoice(
            studentId,
            params.month
          );
          results.success++;
          results.invoices.push(invoice);
        } catch (error) {
          results.failed++;
          results.errors.push({
            studentId,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      return results;
    },
    onSuccess: () => {
      // Invalider toutes les factures
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

// ============================================================================
// MUTATION HOOKS - OVERDUE PROCESSING
// ============================================================================

/**
 * Hook pour traiter les factures impayées (relances automatiques)
 *
 * @example
 * ```tsx
 * const { mutate: processOverdue, isPending } = useProcessOverdueInvoices()
 *
 * processOverdue(undefined, {
 *   onSuccess: () => {
 *     console.log('Relances envoyées')
 *   }
 * })
 * ```
 */
export function useProcessOverdueInvoices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await billingBusinessLogic.processOverdueInvoices();
    },
    onSuccess: () => {
      // Invalider les factures en retard
      queryClient.invalidateQueries({ queryKey: ["invoices", "overdue"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

// ============================================================================
// MUTATION HOOKS - MAKEUP CREDITS
// ============================================================================

/**
 * Hook pour gérer les crédits de rattrapage lors d'une annulation
 *
 * @example
 * ```tsx
 * const { mutate: manageCredit } = useManageMakeupCredit()
 *
 * manageCredit(
 *   { lessonId: 'lesson-1', reason: 'student_illness' },
 *   {
 *     onSuccess: (credit) => {
 *       if (credit) {
 *         console.log(`Crédit accordé: ${credit.amount} minutes`)
 *       } else {
 *         console.log('Pas de crédit accordé')
 *       }
 *     }
 *   }
 * )
 * ```
 */
export function useManageMakeupCredit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ManageMakeupParams) => {
      return await billingBusinessLogic.manageMakeupCredits(
        params.lessonId,
        params.reason
      );
    },
    onSuccess: (credit, variables) => {
      if (credit) {
        // Invalider les crédits de l'élève
        queryClient.invalidateQueries({
          queryKey: ["makeupCredits", credit.studentId],
        });
      }
    },
  });
}

/**
 * Hook pour utiliser un crédit de rattrapage
 *
 * @example
 * ```tsx
 * const { mutate: useCredit } = useUseMakeupCredit()
 *
 * useCredit(
 *   { studentId: 'student-1', lessonDuration: 90 },
 *   {
 *     onSuccess: (result) => {
 *       console.log(`Crédit utilisé: ${result.creditUsed} minutes`)
 *       console.log(`À payer: ${result.amountToPay} minutes`)
 *     }
 *   }
 * )
 * ```
 */
export function useUseMakeupCredit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UseMakeupParams) => {
      return await billingBusinessLogic.useMakeupCredit(
        params.studentId,
        params.lessonDuration
      );
    },
    onSuccess: (result, variables) => {
      // Invalider les crédits de l'élève
      queryClient.invalidateQueries({
        queryKey: ["makeupCredits", variables.studentId],
      });
    },
  });
}

// ============================================================================
// OPTIMISTIC UPDATES
// ============================================================================

/**
 * Hook pour générer une facture avec optimistic update
 * L'UI affiche immédiatement la facture avant la réponse serveur
 *
 * @example
 * ```tsx
 * const { mutate: generateInvoice } = useGenerateMonthlyInvoiceOptimistic()
 *
 * generateInvoice({ studentId: 'student-1', month: new Date() })
 * // UI se met à jour instantanément
 * ```
 */
export function useGenerateMonthlyInvoiceOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: GenerateInvoiceParams) => {
      return await billingBusinessLogic.generateMonthlyInvoice(
        params.studentId,
        params.month
      );
    },

    // Optimistic update
    onMutate: async (params) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["invoices"] });

      // Snapshot previous value
      const previousInvoices = queryClient.getQueryData<Invoice[]>([
        "invoices",
      ]);

      // Optimistically add new invoice
      const optimisticInvoice: Invoice = {
        id: "temp-" + Date.now(),
        invoiceNumber: "INV-PENDING",
        studentId: params.studentId,
        items: [],
        discounts: 0,
        subtotal: 0,
        vat: 0,
        total: 0,
        dueDate: new Date(),
        status: "draft",
        createdAt: new Date(),
      };

      queryClient.setQueryData<Invoice[]>(["invoices"], (old) =>
        old ? [...old, optimisticInvoice] : [optimisticInvoice]
      );

      return { previousInvoices };
    },

    // Rollback on error
    onError: (err, params, context) => {
      if (context?.previousInvoices) {
        queryClient.setQueryData(["invoices"], context.previousInvoices);
      }
    },

    // Always refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

/**
 * Hook pour utiliser un crédit avec optimistic update
 * L'UI se met à jour immédiatement
 *
 * @example
 * ```tsx
 * const { mutate: useCredit } = useUseMakeupCreditOptimistic()
 *
 * useCredit({ studentId: 'student-1', lessonDuration: 90 })
 * // Crédit déduit instantanément dans l'UI
 * ```
 */
export function useUseMakeupCreditOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UseMakeupParams) => {
      return await billingBusinessLogic.useMakeupCredit(
        params.studentId,
        params.lessonDuration
      );
    },

    // Optimistic update
    onMutate: async (params) => {
      await queryClient.cancelQueries({
        queryKey: ["makeupCredits", params.studentId],
      });

      const previousCredits = queryClient.getQueryData<MakeupCredit[]>([
        "makeupCredits",
        params.studentId,
      ]);

      // Optimistically deduct credit
      queryClient.setQueryData<MakeupCredit[]>(
        ["makeupCredits", params.studentId],
        (old) => {
          if (!old) return [];

          let remaining = params.lessonDuration;
          return old.map((credit) => {
            if (remaining <= 0 || credit.used) return credit;

            const deduction = Math.min(credit.amount, remaining);
            remaining -= deduction;

            return {
              ...credit,
              amount: credit.amount - deduction,
              used: credit.amount - deduction <= 0,
            };
          });
        }
      );

      return { previousCredits };
    },

    // Rollback on error
    onError: (err, params, context) => {
      if (context?.previousCredits) {
        queryClient.setQueryData(
          ["makeupCredits", params.studentId],
          context.previousCredits
        );
      }
    },

    // Always refetch
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["makeupCredits", variables.studentId],
      });
    },
  });
}

// ============================================================================
// BACKGROUND SYNC
// ============================================================================

/**
 * Hook pour synchroniser automatiquement les factures en arrière-plan
 * Utile pour les dashboards qui doivent rester à jour
 *
 * @example
 * ```tsx
 * // Dans un dashboard
 * useInvoicesBackgroundSync({ interval: 60000 }) // Sync toutes les minutes
 * ```
 */
export function useInvoicesBackgroundSync(options?: {
  interval?: number;
  enabled?: boolean;
}) {
  const queryClient = useQueryClient();
  const interval = options?.interval || 5 * 60 * 1000; // 5 minutes par défaut
  const enabled = options?.enabled !== false;

  return useQuery({
    queryKey: ["invoices", "background-sync"],
    queryFn: async () => {
      // Refetch toutes les factures
      await queryClient.invalidateQueries({ queryKey: ["invoices"] });
      return { lastSync: new Date() };
    },
    enabled,
    refetchInterval: interval,
    refetchIntervalInBackground: true,
  });
}

/**
 * Hook pour traiter automatiquement les relances en arrière-plan
 * À utiliser dans un composant admin/cron job
 *
 * @example
 * ```tsx
 * // Dans un composant admin
 * useOverdueProcessingBackgroundJob({ interval: 3600000 }) // Toutes les heures
 * ```
 */
export function useOverdueProcessingBackgroundJob(options?: {
  interval?: number;
  enabled?: boolean;
}) {
  const { mutate: processOverdue } = useProcessOverdueInvoices();
  const interval = options?.interval || 60 * 60 * 1000; // 1 heure par défaut
  const enabled = options?.enabled !== false;

  return useQuery({
    queryKey: ["invoices", "overdue-processing"],
    queryFn: async () => {
      // Traiter les factures en retard
      processOverdue();
      return { lastProcessed: new Date() };
    },
    enabled,
    refetchInterval: interval,
    refetchIntervalInBackground: true,
  });
}
