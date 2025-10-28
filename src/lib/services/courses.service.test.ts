import { describe, it, expect, beforeEach, vi } from 'vitest';
import { coursesService } from './courses.service';
import { supabase } from '../supabase';

vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

describe('Courses Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('devrait récupérer tous les cours', async () => {
      const mockCourses = [
        { id: '1', name: 'CTC Formation', category: 'CTC', max_participants: 12 },
        { id: '2', name: 'Premier Secours', category: 'FIRST_AID', max_participants: 15 },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockCourses, error: null }),
      } as any);

      const courses = await coursesService.getAll();
      
      expect(courses).toHaveLength(2);
      expect(courses[0].category).toBe('CTC');
    });

    it('devrait gérer les erreurs correctement', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Database error' } 
        }),
      } as any);

      await expect(coursesService.getAll()).rejects.toThrow('Failed to fetch courses');
    });
  });

  describe('getById', () => {
    it('devrait récupérer un cours par ID', async () => {
      const mockCourse = { 
        id: '1', 
        name: 'CTC Formation',
        category: 'CTC',
        max_participants: 12
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockCourse, error: null }),
      } as any);

      const course = await coursesService.getById('1');
      
      expect(course).not.toBeNull();
      expect(course?.name).toBe('CTC Formation');
    });

    it('devrait retourner null si le cours n\'existe pas', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { code: 'PGRST116' } 
        }),
      } as any);

      const course = await coursesService.getById('999');
      
      expect(course).toBeNull();
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau cours', async () => {
      const newCourseData = {
        name: 'Sensibilisation',
        category: 'SENS' as const,
        max_participants: 20,
      };

      const mockCreatedCourse = {
        id: '3',
        ...newCourseData,
        created_at: new Date().toISOString(),
      };

      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockCreatedCourse, error: null }),
      } as any);

      const course = await coursesService.create(newCourseData);
      
      expect(course.id).toBe('3');
      expect(course.name).toBe('Sensibilisation');
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un cours', async () => {
      const updateData = {
        max_participants: 25,
      };

      const mockUpdatedCourse = {
        id: '1',
        name: 'CTC Formation',
        max_participants: 25,
      };

      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockUpdatedCourse, error: null }),
      } as any);

      const course = await coursesService.update('1', updateData);
      
      expect(course.max_participants).toBe(25);
    });
  });

  describe('delete', () => {
    it('devrait supprimer un cours', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      } as any);

      await expect(coursesService.delete('1')).resolves.not.toThrow();
    });

    it('devrait lancer une erreur si la suppression échoue', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: { message: 'Cannot delete' } }),
      } as any);

      await expect(coursesService.delete('1')).rejects.toThrow('Failed to delete course');
    });
  });
});

