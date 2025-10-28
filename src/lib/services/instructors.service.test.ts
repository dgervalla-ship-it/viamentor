import { describe, it, expect, beforeEach, vi } from 'vitest';
import { instructorsService } from './instructors.service';
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

describe('Instructors Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('devrait récupérer tous les moniteurs', async () => {
      const mockInstructors = [
        { 
          id: '1', 
          first_name: 'Jean',
          last_name: 'Dupont',
          email: 'jean@example.com',
          categories: ['B', 'BE'],
          status: 'active'
        },
        { 
          id: '2', 
          first_name: 'Marie',
          last_name: 'Martin',
          email: 'marie@example.com',
          categories: ['A', 'A1'],
          status: 'active'
        },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockInstructors, error: null }),
      } as any);

      const instructors = await instructorsService.getAll();
      
      expect(instructors).toHaveLength(2);
      expect(instructors[0].first_name).toBe('Jean');
    });
  });

  describe('getById', () => {
    it('devrait récupérer un moniteur par ID', async () => {
      const mockInstructor = { 
        id: '1', 
        first_name: 'Jean',
        last_name: 'Dupont',
        email: 'jean@example.com',
        categories: ['B', 'BE']
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockInstructor, error: null }),
      } as any);

      const instructor = await instructorsService.getById('1');
      
      expect(instructor).not.toBeNull();
      expect(instructor?.email).toBe('jean@example.com');
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau moniteur', async () => {
      const newInstructorData = {
        first_name: 'Paul',
        last_name: 'Durand',
        email: 'paul@example.com',
        phone: '+41 79 123 45 67',
        categories: ['B'],
        languages: ['fr'],
        status: 'active' as const,
      };

      const mockCreatedInstructor = {
        id: '3',
        ...newInstructorData,
        created_at: new Date().toISOString(),
      };

      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockCreatedInstructor, error: null }),
      } as any);

      const instructor = await instructorsService.create(newInstructorData);
      
      expect(instructor.id).toBe('3');
      expect(instructor.first_name).toBe('Paul');
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un moniteur', async () => {
      const updateData = {
        status: 'inactive' as const,
      };

      const mockUpdatedInstructor = {
        id: '1',
        first_name: 'Jean',
        status: 'inactive',
      };

      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockUpdatedInstructor, error: null }),
      } as any);

      const instructor = await instructorsService.update('1', updateData);
      
      expect(instructor.status).toBe('inactive');
    });
  });

  describe('delete', () => {
    it('devrait supprimer un moniteur', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      } as any);

      await expect(instructorsService.delete('1')).resolves.not.toThrow();
    });
  });

  describe('getAvailableInstructors', () => {
    it('devrait filtrer les moniteurs actifs', async () => {
      const mockInstructors = [
        { id: '1', first_name: 'Jean', status: 'active' },
        { id: '2', first_name: 'Marie', status: 'active' },
        { id: '3', first_name: 'Paul', status: 'inactive' },
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockInstructors.slice(0, 2), error: null }),
      } as any);

      const available = await instructorsService.getAll();
      
      expect(available).toHaveLength(2);
      expect(available.every(i => i.status === 'active')).toBe(true);
    });
  });
});

