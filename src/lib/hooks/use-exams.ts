/**
 * Viamentor - Hook React Query pour Exams
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { examsService } from '../services/exams.service';
import type { Exam, CreateExamInput, UpdateExamInput } from '../services/exams.service';

export const examsKeys = {
  all: ['exams'] as const,
  lists: () => [...examsKeys.all, 'list'] as const,
  detail: (id: string) => [...examsKeys.all, 'detail', id] as const,
};

export function useExams() {
  return useQuery({
    queryKey: examsKeys.lists(),
    queryFn: () => examsService.getAll(),
    staleTime: 60000,
  });
}

export function useExam(id: string) {
  return useQuery({
    queryKey: examsKeys.detail(id),
    queryFn: () => examsService.getById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExamInput) => examsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: examsKeys.lists() });
    },
  });
}

export function useUpdateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExamInput }) =>
      examsService.update(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: examsKeys.lists() });
      queryClient.setQueryData(examsKeys.detail(updated.id), updated);
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => examsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: examsKeys.lists() });
    },
  });
}

export function useStudentExams(studentId: string) {
  return useQuery({
    queryKey: [...examsKeys.all, 'student', studentId],
    queryFn: () => examsService.getByStudentId(studentId),
    enabled: !!studentId,
    staleTime: 30000,
  });
}

export function useUpcomingExams() {
  return useQuery({
    queryKey: [...examsKeys.all, 'upcoming'],
    queryFn: () => examsService.getUpcoming(),
    staleTime: 60000,
  });
}

export function useRecordExamResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      result, 
      score, 
      maxScore 
    }: { 
      id: string; 
      result: 'passed' | 'failed'; 
      score?: number; 
      maxScore?: number;
    }) => examsService.recordResult(id, result, score, maxScore),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: examsKeys.lists() });
      queryClient.setQueryData(examsKeys.detail(updated.id), updated);
    },
  });
}

export function useExamsStats(studentId?: string) {
  return useQuery({
    queryKey: studentId 
      ? [...examsKeys.all, 'stats', studentId]
      : [...examsKeys.all, 'stats'],
    queryFn: () => examsService.getStats(studentId),
    staleTime: 60000,
  });
}

