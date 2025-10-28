/**
 * Viamentor - Hook React Query pour Instructors
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instructorsService } from '../services/instructors.service';
import type { Instructor, CreateInstructorInput, UpdateInstructorInput } from '../services/instructors.service';

// Query Keys
export const instructorsKeys = {
  all: ['instructors'] as const,
  lists: () => [...instructorsKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...instructorsKeys.lists(), filters] as const,
  details: () => [...instructorsKeys.all, 'detail'] as const,
  detail: (id: string) => [...instructorsKeys.details(), id] as const,
};

/**
 * Hook pour récupérer tous les moniteurs
 */
export function useInstructors() {
  return useQuery({
    queryKey: instructorsKeys.lists(),
    queryFn: () => instructorsService.getAll(),
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook pour récupérer un moniteur par ID
 */
export function useInstructor(id: string) {
  return useQuery({
    queryKey: instructorsKeys.detail(id),
    queryFn: () => instructorsService.getById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}

/**
 * Hook pour créer un moniteur
 */
export function useCreateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInstructorInput) => instructorsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
    },
  });
}

/**
 * Hook pour mettre à jour un moniteur
 */
export function useUpdateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInstructorInput }) =>
      instructorsService.update(id, data),
    onSuccess: (updatedInstructor) => {
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
      queryClient.setQueryData(instructorsKeys.detail(updatedInstructor.id), updatedInstructor);
    },
  });
}

/**
 * Hook pour supprimer un moniteur
 */
export function useDeleteInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => instructorsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
    },
  });
}

/**
 * Hook pour récupérer les moniteurs actifs
 */
export function useActiveInstructors() {
  return useQuery({
    queryKey: [...instructorsKeys.all, 'active'],
    queryFn: () => instructorsService.getActive(),
    staleTime: 60000,
  });
}

/**
 * Hook pour récupérer les moniteurs disponibles pour une catégorie
 */
export function useAvailableInstructors(category: string) {
  return useQuery({
    queryKey: [...instructorsKeys.all, 'available', category],
    queryFn: () => instructorsService.getAvailable(category),
    enabled: !!category,
    staleTime: 30000,
  });
}

/**
 * Hook pour récupérer la charge de travail d'un moniteur
 */
export function useInstructorWorkload(instructorId: string) {
  return useQuery({
    queryKey: [...instructorsKeys.all, 'workload', instructorId],
    queryFn: () => instructorsService.getWorkload(instructorId),
    enabled: !!instructorId,
    staleTime: 30000,
  });
}

