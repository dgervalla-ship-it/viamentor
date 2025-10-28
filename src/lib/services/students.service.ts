/**
 * VIAMENTOR - Service Étudiants
 * Gestion CRUD des étudiants avec Supabase
 */

import { supabase } from '../supabase';

export interface Student {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  canton?: string;
  avs_number?: string;
  nationality?: string;
  faber_number?: string;
  categories?: string[];
  current_category?: string;
  theory_hours_completed: number;
  practical_hours_completed: number;
  total_lessons_completed: number;
  theory_exam_date?: string;
  theory_exam_passed: boolean;
  practical_exam_date?: string;
  practical_exam_passed: boolean;
  assigned_instructor_id?: string;
  faber_consent: boolean;
  cgu_consent: boolean;
  rgpd_consent: boolean;
  newsletter_consent: boolean;
  consent_date?: string;
  payment_status: 'pending' | 'partial' | 'paid';
  total_paid: number;
  status: 'active' | 'inactive' | 'graduated' | 'dropped';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStudentInput {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  canton?: string;
  avs_number?: string;
  current_category?: string;
  faber_consent: boolean;
  cgu_consent: boolean;
  rgpd_consent: boolean;
  newsletter_consent?: boolean;
}

export interface UpdateStudentInput extends Partial<CreateStudentInput> {
  theory_hours_completed?: number;
  practical_hours_completed?: number;
  assigned_instructor_id?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'dropped';
}

/**
 * Récupérer tous les étudiants du tenant
 */
export async function getAllStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching students:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer un étudiant par ID
 */
export async function getStudentById(id: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching student:', error);
    throw error;
  }

  return data;
}

/**
 * Créer un nouvel étudiant
 */
export async function createStudent(input: CreateStudentInput): Promise<Student> {
  // Récupérer le tenant_id de l'utilisateur connecté
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
    .from('students')
    .insert({
      ...input,
      tenant_id: userData.tenant_id,
      theory_hours_completed: 0,
      practical_hours_completed: 0,
      total_lessons_completed: 0,
      theory_exam_passed: false,
      practical_exam_passed: false,
      payment_status: 'pending',
      total_paid: 0,
      status: 'active',
      consent_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating student:', error);
    throw error;
  }

  return data;
}

/**
 * Mettre à jour un étudiant
 */
export async function updateStudent(
  id: string,
  input: UpdateStudentInput
): Promise<Student> {
  const { data, error } = await supabase
    .from('students')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating student:', error);
    throw error;
  }

  return data;
}

/**
 * Supprimer un étudiant (soft delete)
 */
export async function deleteStudent(id: string): Promise<void> {
  const { error } = await supabase
    .from('students')
    .update({ status: 'inactive' })
    .eq('id', id);

  if (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
}

/**
 * Rechercher des étudiants
 */
export async function searchStudents(query: string): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,faber_number.ilike.%${query}%`)
    .limit(50);

  if (error) {
    console.error('Error searching students:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer les étudiants par instructeur
 */
export async function getStudentsByInstructor(instructorId: string): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('assigned_instructor_id', instructorId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching students by instructor:', error);
    throw error;
  }

  return data || [];
}

/**
 * Statistiques étudiants
 */
export interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  graduated: number;
  with_theory_exam: number;
  with_practical_exam: number;
}

export async function getStudentStats(): Promise<StudentStats> {
  const { data, error } = await supabase
    .from('students')
    .select('status, theory_exam_passed, practical_exam_passed');

  if (error) {
    console.error('Error fetching student stats:', error);
    throw error;
  }

  const stats: StudentStats = {
    total: data.length,
    active: data.filter(s => s.status === 'active').length,
    inactive: data.filter(s => s.status === 'inactive').length,
    graduated: data.filter(s => s.status === 'graduated').length,
    with_theory_exam: data.filter(s => s.theory_exam_passed).length,
    with_practical_exam: data.filter(s => s.practical_exam_passed).length,
  };

  return stats;
}

