/**
 * Viamentor - Hook React Query pour Invoices
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesService } from '../services/invoices.service';
import type { Invoice, CreateInvoiceData, UpdateInvoiceData } from '../services/invoices.service';

// Query Keys
export const invoicesKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoicesKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...invoicesKeys.lists(), filters] as const,
  details: () => [...invoicesKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoicesKeys.details(), id] as const,
};

/**
 * Hook pour récupérer toutes les factures
 */
export function useInvoices() {
  return useQuery({
    queryKey: invoicesKeys.lists(),
    queryFn: () => invoicesService.getAll(),
    staleTime: 30000, // 30 secondes
  });
}

/**
 * Hook pour récupérer une facture par ID
 */
export function useInvoice(id: string) {
  return useQuery({
    queryKey: invoicesKeys.detail(id),
    queryFn: () => invoicesService.getById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}

/**
 * Hook pour créer une facture
 */
export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceData) => invoicesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...invoicesKeys.all, 'stats'] });
    },
  });
}

/**
 * Hook pour mettre à jour une facture
 */
export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInvoiceData }) =>
      invoicesService.update(id, data),
    onSuccess: (updatedInvoice) => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
      queryClient.setQueryData(invoicesKeys.detail(updatedInvoice.id), updatedInvoice);
      queryClient.invalidateQueries({ queryKey: [...invoicesKeys.all, 'stats'] });
    },
  });
}

/**
 * Hook pour supprimer une facture
 */
export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...invoicesKeys.all, 'stats'] });
    },
  });
}

/**
 * Hook pour récupérer les factures d'un élève
 */
export function useStudentInvoices(studentId: string) {
  return useQuery({
    queryKey: [...invoicesKeys.all, 'student', studentId],
    queryFn: () => invoicesService.getByStudentId(studentId),
    enabled: !!studentId,
    staleTime: 30000,
  });
}

/**
 * Hook pour marquer une facture comme payée
 */
export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, paymentMethod }: { id: string; paymentMethod: string }) =>
      invoicesService.markAsPaid(id, paymentMethod),
    onSuccess: (updatedInvoice) => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
      queryClient.setQueryData(invoicesKeys.detail(updatedInvoice.id), updatedInvoice);
      queryClient.invalidateQueries({ queryKey: [...invoicesKeys.all, 'stats'] });
    },
  });
}

/**
 * Hook pour envoyer une facture
 */
export function useSendInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoicesService.send(id),
    onSuccess: (updatedInvoice) => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
      queryClient.setQueryData(invoicesKeys.detail(updatedInvoice.id), updatedInvoice);
    },
  });
}

/**
 * Hook pour annuler une facture
 */
export function useCancelInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoicesService.cancel(id),
    onSuccess: (updatedInvoice) => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
      queryClient.setQueryData(invoicesKeys.detail(updatedInvoice.id), updatedInvoice);
      queryClient.invalidateQueries({ queryKey: [...invoicesKeys.all, 'stats'] });
    },
  });
}

/**
 * Hook pour récupérer les statistiques de facturation
 */
export function useInvoicesStats() {
  return useQuery({
    queryKey: [...invoicesKeys.all, 'stats'],
    queryFn: () => invoicesService.getStats(),
    staleTime: 60000,
  });
}

/**
 * Hook pour récupérer les items d'une facture
 */
export function useInvoiceItems(invoiceId: string) {
  return useQuery({
    queryKey: [...invoicesKeys.all, 'items', invoiceId],
    queryFn: () => invoicesService.getItems(invoiceId),
    enabled: !!invoiceId,
    staleTime: 60000,
  });
}

/**
 * Hook pour générer le PDF d'une facture
 */
export function useGenerateInvoicePDF() {
  return useMutation({
    mutationFn: async ({ 
      invoiceId, 
      schoolInfo, 
      studentInfo 
    }: Parameters<typeof invoicesService.generatePDF>) => {
      const pdfBuffer = await invoicesService.generatePDF(invoiceId, schoolInfo, studentInfo);
      
      // Créer un Blob et le télécharger
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture-${invoiceId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      
      return pdfBuffer;
    },
  });
}

