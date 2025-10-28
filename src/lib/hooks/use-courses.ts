/**
 * Viamentor - Hook React Query pour Courses
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesService } from '../services/courses.service';
import type { Course, CreateCourseInput } from '../services/courses.service';

// Query Keys
export const coursesKeys = {
  all: ['courses'] as const,
  lists: () => [...coursesKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...coursesKeys.lists(), filters] as const,
  details: () => [...coursesKeys.all, 'detail'] as const,
  detail: (id: string) => [...coursesKeys.details(), id] as const,
};

/**
 * Hook pour récupérer tous les cours
 */
export function useCourses() {
  return useQuery({
    queryKey: coursesKeys.lists(),
    queryFn: () => coursesService.getAll(),
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook pour récupérer un cours par ID
 */
export function useCourse(id: string) {
  return useQuery({
    queryKey: coursesKeys.detail(id),
    queryFn: () => coursesService.getById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}

/**
 * Hook pour créer un cours
 */
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseInput) => coursesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}

/**
 * Hook pour mettre à jour un cours
 */
export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCourseInput> }) =>
      coursesService.update(id, data),
    onSuccess: (updatedCourse) => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
      queryClient.setQueryData(coursesKeys.detail(updatedCourse.id), updatedCourse);
    },
  });
}

/**
 * Hook pour supprimer un cours
 */
export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coursesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}

/**
 * Hook pour inscrire un élève à un cours
 */
export function useEnrollStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, studentId }: { courseId: string; studentId: string }) =>
      coursesService.enrollStudent(courseId, studentId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.detail(variables.courseId) });
      queryClient.invalidateQueries({ queryKey: [...coursesKeys.all, 'participants', variables.courseId] });
    },
  });
}

/**
 * Hook pour récupérer les participants d'un cours
 */
export function useCourseParticipants(courseId: string) {
  return useQuery({
    queryKey: [...coursesKeys.all, 'participants', courseId],
    queryFn: () => coursesService.getParticipants(courseId),
    enabled: !!courseId,
    staleTime: 30000,
  });
}

/**
 * Hook pour récupérer les cours à venir
 */
export function useUpcomingCourses() {
  return useQuery({
    queryKey: [...coursesKeys.all, 'upcoming'],
    queryFn: () => coursesService.getUpcoming(),
    staleTime: 60000,
    refetchInterval: 300000, // Rafraîchir toutes les 5 minutes
  });
}

