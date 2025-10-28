/**
 * Viamentor - Hook React Query pour Tenants
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tenantsService } from '../services/tenants.service';
import type { Tenant, CreateTenantInput, UpdateTenantInput } from '../services/tenants.service';

export const tenantsKeys = {
  all: ['tenants'] as const,
  lists: () => [...tenantsKeys.all, 'list'] as const,
  detail: (id: string) => [...tenantsKeys.all, 'detail', id] as const,
  current: () => [...tenantsKeys.all, 'current'] as const,
};

export function useTenants() {
  return useQuery({
    queryKey: tenantsKeys.lists(),
    queryFn: () => tenantsService.getAll(),
    staleTime: 300000, // 5 minutes (données qui changent rarement)
  });
}

export function useTenant(id: string) {
  return useQuery({
    queryKey: tenantsKeys.detail(id),
    queryFn: () => tenantsService.getById(id),
    enabled: !!id,
    staleTime: 300000,
  });
}

export function useCurrentTenant() {
  return useQuery({
    queryKey: tenantsKeys.current(),
    queryFn: () => tenantsService.getCurrent(),
    staleTime: 300000,
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTenantInput) => tenantsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
    },
  });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTenantInput }) =>
      tenantsService.update(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
      queryClient.setQueryData(tenantsKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: tenantsKeys.current() });
    },
  });
}

export function useSuspendTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      tenantsService.suspend(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
    },
  });
}

export function useActivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tenantsService.activate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
    },
  });
}

export function useUpgradePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, plan }: { id: string; plan: 'professional' | 'enterprise' }) =>
      tenantsService.upgradePlan(id, plan),
    onSuccess: (updated) => {
      queryClient.setQueryData(tenantsKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: tenantsKeys.current() });
    },
  });
}

export function useTenantStats(tenantId: string) {
  return useQuery({
    queryKey: [...tenantsKeys.all, 'stats', tenantId],
    queryFn: () => tenantsService.getStats(tenantId),
    enabled: !!tenantId,
    staleTime: 60000,
  });
}

