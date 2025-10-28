/**
 * Viamentor - Hook React Query pour Students
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsService } from '../services/students.service';
import type { Student, CreateStudentInput, UpdateStudentInput } from '../services/students.service';

// Query Keys
export const studentsKeys = {
  all: ['students'] as const,
  lists: () => [...studentsKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...studentsKeys.lists(), filters] as const,
  details: () => [...studentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentsKeys.details(), id] as const,
};

/**
 * Hook pour récupérer tous les élèves
 */
export function useStudents() {
  return useQuery({
    queryKey: studentsKeys.lists(),
    queryFn: () => studentsService.getAll(),
    staleTime: 30000, // 30 secondes
  });
}

/**
 * Hook pour récupérer un élève par ID
 */
export function useStudent(id: string) {
  return useQuery({
    queryKey: studentsKeys.detail(id),
    queryFn: () => studentsService.getById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook pour créer un élève
 */
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudentInput) => studentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
    },
  });
}

/**
 * Hook pour mettre à jour un élève
 */
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentInput }) =>
      studentsService.update(id, data),
    onSuccess: (updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      queryClient.setQueryData(studentsKeys.detail(updatedStudent.id), updatedStudent);
    },
  });
}

/**
 * Hook pour supprimer un élève
 */
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
    },
  });
}

/**
 * Hook pour récupérer les statistiques des élèves
 */
export function useStudentsStats() {
  return useQuery({
    queryKey: [...studentsKeys.all, 'stats'],
    queryFn: () => studentsService.getStats(),
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook pour rechercher des élèves par email
 */
export function useStudentByEmail(email: string) {
  return useQuery({
    queryKey: [...studentsKeys.all, 'email', email],
    queryFn: () => studentsService.getByEmail(email),
    enabled: !!email && email.includes('@'),
    staleTime: 30000,
  });
}

