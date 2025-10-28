/**
 * VIAMENTOR - Service Instructeurs
 * Gestion CRUD des moniteurs avec Supabase
 */

import { supabase } from '../supabase';

export interface Instructor {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  license_number?: string;
  categories: string[];
  languages: string[];
  weekly_hours: number;
  max_students: number;
  assigned_vehicle_ids?: string[];
  rating: number;
  total_reviews: number;
  status: 'active' | 'inactive' | 'vacation';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInstructorInput {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  license_number?: string;
  categories: string[];
  languages: string[];
  weekly_hours?: number;
  max_students?: number;
}

export interface UpdateInstructorInput extends Partial<CreateInstructorInput> {
  status?: 'active' | 'inactive' | 'vacation';
  rating?: number;
}

/**
 * Récupérer tous les instructeurs
 */
export async function getAllInstructors(): Promise<Instructor[]> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching instructors:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer un instructeur par ID
 */
export async function getInstructorById(id: string): Promise<Instructor | null> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching instructor:', error);
    throw error;
  }

  return data;
}

/**
 * Créer un instructeur
 */
export async function createInstructor(input: CreateInstructorInput): Promise<Instructor> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: userData } = await supabase
    .from('users')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  if (!userData?.tenant_id) {
    throw new Error('User tenant not found');
  }

  const { data, error } = await supabase
    .from('instructors')
    .insert({
      ...input,
      tenant_id: userData.tenant_id,
      weekly_hours: input.weekly_hours || 35,
      max_students: input.max_students || 12,
      rating: 0,
      total_reviews: 0,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating instructor:', error);
    throw error;
  }

  return data;
}

/**
 * Mettre à jour un instructeur
 */
export async function updateInstructor(
  id: string,
  input: UpdateInstructorInput
): Promise<Instructor> {
  const { data, error } = await supabase
    .from('instructors')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating instructor:', error);
    throw error;
  }

  return data;
}

/**
 * Récupérer les instructeurs actifs
 */
export async function getActiveInstructors(): Promise<Instructor[]> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('status', 'active')
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching active instructors:', error);
    throw error;
  }

  return data || [];
}

/**
 * Calculer la charge de travail d'un instructeur
 */
export async function getInstructorWorkload(instructorId: string): Promise<{
  current_students: number;
  max_students: number;
  workload_percentage: number;
}> {
  const { data: instructor } = await supabase
    .from('instructors')
    .select('max_students')
    .eq('id', instructorId)
    .single();

  const { count } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true })
    .eq('assigned_instructor_id', instructorId)
    .eq('status', 'active');

  const current_students = count || 0;
  const max_students = instructor?.max_students || 12;
  const workload_percentage = Math.round((current_students / max_students) * 100);

  return {
    current_students,
    max_students,
    workload_percentage,
  };
}

/**
 * Trouver les instructeurs disponibles pour une catégorie
 */
export async function getAvailableInstructors(category: string): Promise<Instructor[]> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .contains('categories', [category])
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching available instructors:', error);
    throw error;
  }

  // Filtrer par charge de travail
  const availableInstructors = [];
  
  for (const instructor of data || []) {
    const workload = await getInstructorWorkload(instructor.id);
    if (workload.workload_percentage < 100) {
      availableInstructors.push({
        ...instructor,
        workload: workload.workload_percentage,
      });
    }
  }

  // Trier par workload (moins chargés en premier)
  return availableInstructors.sort((a: any, b: any) => a.workload - b.workload);
}

/**
 * Supprimer un instructeur
 */
export async function deleteInstructor(id: string): Promise<void> {
  const { error } = await supabase
    .from('instructors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting instructor:', error);
    throw new Error(`Failed to delete instructor: ${error.message}`);
  }
}

/**
 * Service object pour cohérence avec les autres services
 */
export const instructorsService = {
  getAll: getAllInstructors,
  getById: getInstructorById,
  create: createInstructor,
  update: updateInstructor,
  delete: deleteInstructor,
  getActive: getActiveInstructors,
  getAvailable: getAvailableInstructors,
  getWorkload: getInstructorWorkload,
};

