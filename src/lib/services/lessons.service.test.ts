import { describe, it, expect, beforeEach, vi } from 'vitest';
import { lessonsService } from './lessons.service';
import { supabase } from '../supabase';

vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

describe('Lessons Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('devrait récupérer toutes les leçons', async () => {
      const mockLessons = [
        { 
          id: '1', 
          student_id: 'student1', 
          instructor_id: 'instructor1',
          date: '2025-10-30',
          duration: 50,
          status: 'completed'
        },
        { 
          id: '2', 
          student_id: 'student2', 
          instructor_id: 'instructor1',
          date: '2025-10-31',
          duration: 50,
          status: 'scheduled'
        },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockLessons, error: null }),
      } as any);

      const lessons = await lessonsService.getAll();
      
      expect(lessons).toHaveLength(2);
      expect(lessons[0].status).toBe('completed');
    });
  });

  describe('getByStudentId', () => {
    it('devrait récupérer les leçons d\'un élève', async () => {
      const mockLessons = [
        { id: '1', student_id: 'student1', duration: 50 },
        { id: '2', student_id: 'student1', duration: 50 },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockLessons, error: null }),
      } as any);

      const lessons = await lessonsService.getByStudentId('student1');
      
      expect(lessons).toHaveLength(2);
      expect(lessons[0].student_id).toBe('student1');
    });
  });

  describe('getByInstructorId', () => {
    it('devrait récupérer les leçons d\'un moniteur', async () => {
      const mockLessons = [
        { id: '1', instructor_id: 'instructor1', duration: 50 },
        { id: '2', instructor_id: 'instructor1', duration: 50 },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockLessons, error: null }),
      } as any);

      const lessons = await lessonsService.getByInstructorId('instructor1');
      
      expect(lessons).toHaveLength(2);
      expect(lessons[0].instructor_id).toBe('instructor1');
    });
  });

  describe('create', () => {
    it('devrait créer une nouvelle leçon', async () => {
      const newLessonData = {
        student_id: 'student1',
        instructor_id: 'instructor1',
        date: '2025-11-01',
        start_time: '10:00',
        duration: 50,
        status: 'scheduled' as const,
      };

      const mockCreatedLesson = {
        id: '3',
        ...newLessonData,
        created_at: new Date().toISOString(),
      };

      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockCreatedLesson, error: null }),
      } as any);

      const lesson = await lessonsService.create(newLessonData);
      
      expect(lesson.id).toBe('3');
      expect(lesson.status).toBe('scheduled');
    });
  });

  describe('cancel', () => {
    it('devrait annuler une leçon', async () => {
      const mockCancelledLesson = {
        id: '1',
        status: 'cancelled',
      };

      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockCancelledLesson, error: null }),
      } as any);

      const lesson = await lessonsService.update('1', { status: 'cancelled' });
      
      expect(lesson.status).toBe('cancelled');
    });
  });
});

