/**
 * Viamentor - Hook React Query pour Vehicles
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehiclesService } from '../services/vehicles.service';
import type { Vehicle, CreateVehicleInput, UpdateVehicleInput } from '../services/vehicles.service';

export const vehiclesKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehiclesKeys.all, 'list'] as const,
  detail: (id: string) => [...vehiclesKeys.all, 'detail', id] as const,
};

export function useVehicles() {
  return useQuery({
    queryKey: vehiclesKeys.lists(),
    queryFn: () => vehiclesService.getAll(),
    staleTime: 60000,
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: vehiclesKeys.detail(id),
    queryFn: () => vehiclesService.getById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVehicleInput) => vehiclesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVehicleInput }) =>
      vehiclesService.update(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
      queryClient.setQueryData(vehiclesKeys.detail(updated.id), updated);
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vehiclesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

export function useAvailableVehicles() {
  return useQuery({
    queryKey: [...vehiclesKeys.all, 'available'],
    queryFn: () => vehiclesService.getAvailable(),
    staleTime: 30000,
  });
}

export function useVehiclesByCategory(category: string) {
  return useQuery({
    queryKey: [...vehiclesKeys.all, 'category', category],
    queryFn: () => vehiclesService.getByCategory(category),
    enabled: !!category,
    staleTime: 60000,
  });
}

