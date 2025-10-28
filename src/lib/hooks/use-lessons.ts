/**
 * Viamentor - Hook React Query pour Lessons
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonsService } from '../services/lessons.service';
import type { Lesson, CreateLessonInput } from '../services/lessons.service';

// Query Keys
export const lessonsKeys = {
  all: ['lessons'] as const,
  lists: () => [...lessonsKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...lessonsKeys.lists(), filters] as const,
  details: () => [...lessonsKeys.all, 'detail'] as const,
  detail: (id: string) => [...lessonsKeys.details(), id] as const,
};

/**
 * Hook pour récupérer toutes les leçons
 */
export function useLessons() {
  return useQuery({
    queryKey: lessonsKeys.lists(),
    queryFn: () => lessonsService.getAll(),
    staleTime: 10000, // 10 secondes (données qui changent souvent)
  });
}

/**
 * Hook pour récupérer une leçon par ID
 */
export function useLesson(id: string) {
  return useQuery({
    queryKey: lessonsKeys.detail(id),
    queryFn: () => lessonsService.getById(id),
    enabled: !!id,
    staleTime: 30000,
  });
}

/**
 * Hook pour créer une leçon
 */
export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLessonInput) => lessonsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
    },
  });
}

/**
 * Hook pour mettre à jour une leçon
 */
export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lesson> }) =>
      lessonsService.update(id, data),
    onSuccess: (updatedLesson) => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
      queryClient.setQueryData(lessonsKeys.detail(updatedLesson.id), updatedLesson);
    },
  });
}

/**
 * Hook pour annuler une leçon
 */
export function useCancelLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      lessonsService.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
    },
  });
}

/**
 * Hook pour récupérer les leçons d'un élève
 */
export function useStudentLessons(studentId: string) {
  return useQuery({
    queryKey: [...lessonsKeys.all, 'student', studentId],
    queryFn: () => lessonsService.getByStudentId(studentId),
    enabled: !!studentId,
    staleTime: 30000,
  });
}

/**
 * Hook pour récupérer les leçons d'un moniteur
 */
export function useInstructorLessons(instructorId: string) {
  return useQuery({
    queryKey: [...lessonsKeys.all, 'instructor', instructorId],
    queryFn: () => lessonsService.getByInstructorId(instructorId),
    enabled: !!instructorId,
    staleTime: 10000,
  });
}

/**
 * Hook pour récupérer les leçons à venir
 */
export function useUpcomingLessons() {
  return useQuery({
    queryKey: [...lessonsKeys.all, 'upcoming'],
    queryFn: () => lessonsService.getUpcoming(),
    staleTime: 10000,
    refetchInterval: 60000, // Rafraîchir toutes les minutes
  });
}

/**
 * Hook pour récupérer les leçons d'une date
 */
export function useLessonsByDate(date: string) {
  return useQuery({
    queryKey: [...lessonsKeys.all, 'date', date],
    queryFn: () => lessonsService.getByDate(date),
    enabled: !!date,
    staleTime: 10000,
  });
}

/**
 * Hook pour vérifier la disponibilité d'un moniteur
 */
export function useCheckInstructorAvailability(
  instructorId: string,
  date: string,
  startTime: string,
  endTime: string
) {
  return useQuery({
    queryKey: [...lessonsKeys.all, 'availability', instructorId, date, startTime, endTime],
    queryFn: () => lessonsService.checkInstructorAvailability(instructorId, date, startTime, endTime),
    enabled: !!instructorId && !!date && !!startTime && !!endTime,
    staleTime: 10000,
  });
}

