/**
 * VIAMENTOR - Service Cours Théoriques
 * Gestion CRUD des cours avec Supabase
 */

import { supabase } from '../supabase';

export interface Course {
  id: string;
  tenant_id: string;
  category_id: string;
  title: string;
  type: 'weekday' | 'weekend' | 'intensive';
  start_date: string;
  end_date: string;
  total_sessions: number;
  session_duration_minutes: number;
  location?: string;
  room?: string;
  instructor_id?: string;
  max_participants: number;
  current_participants: number;
  price: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCourseInput {
  category_id: string;
  title: string;
  type: 'weekday' | 'weekend' | 'intensive';
  start_date: string;
  end_date: string;
  total_sessions?: number;
  session_duration_minutes?: number;
  location?: string;
  room?: string;
  instructor_id?: string;
  max_participants?: number;
  price: number;
}

/**
 * Récupérer tous les cours
 */
export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer un cours par ID
 */
export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    throw error;
  }

  return data;
}

/**
 * Créer un cours
 */
export async function createCourse(input: CreateCourseInput): Promise<Course> {
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
    .from('courses')
    .insert({
      ...input,
      tenant_id: userData.tenant_id,
      total_sessions: input.total_sessions || 1,
      session_duration_minutes: input.session_duration_minutes || 120,
      max_participants: input.max_participants || 12,
      current_participants: 0,
      status: 'scheduled',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating course:', error);
    throw error;
  }

  return data;
}

/**
 * Mettre à jour un cours
 */
export async function updateCourse(
  id: string,
  input: Partial<CreateCourseInput>
): Promise<Course> {
  const { data, error } = await supabase
    .from('courses')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating course:', error);
    throw error;
  }

  return data;
}

/**
 * Inscrire un étudiant à un cours
 */
export async function enrollStudent(
  courseId: string,
  studentId: string
): Promise<void> {
  // Vérifier la capacité
  const { data: course } = await supabase
    .from('courses')
    .select('current_participants, max_participants')
    .eq('id', courseId)
    .single();

  if (course && course.current_participants >= course.max_participants) {
    throw new Error('Course is full');
  }

  // Créer l'inscription
  const { error: enrollError } = await supabase
    .from('course_participants')
    .insert({
      course_id: courseId,
      student_id: studentId,
      payment_status: 'pending',
      status: 'enrolled',
    });

  if (enrollError) {
    console.error('Error enrolling student:', enrollError);
    throw enrollError;
  }

  // Incrémenter le nombre de participants
  const { error: updateError } = await supabase
    .from('courses')
    .update({ current_participants: (course?.current_participants || 0) + 1 })
    .eq('id', courseId);

  if (updateError) {
    console.error('Error updating course participants:', updateError);
    throw updateError;
  }
}

/**
 * Récupérer les participants d'un cours
 */
export async function getCourseParticipants(courseId: string) {
  const { data, error } = await supabase
    .from('course_participants')
    .select(`
      *,
      student:students(*)
    `)
    .eq('course_id', courseId);

  if (error) {
    console.error('Error fetching course participants:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer les cours à venir
 */
export async function getUpcomingCourses(): Promise<Course[]> {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .gte('start_date', today)
    .in('status', ['scheduled', 'in_progress'])
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming courses:', error);
    throw error;
  }

  return data || [];
}

/**
 * Supprimer un cours
 */
export async function deleteCourse(id: string): Promise<void> {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting course:', error);
    throw new Error(`Failed to delete course: ${error.message}`);
  }
}

/**
 * Service object pour cohérence avec les autres services
 */
export const coursesService = {
  getAll: getAllCourses,
  getById: getCourseById,
  create: createCourse,
  update: updateCourse,
  delete: deleteCourse,
  enrollStudent,
  getParticipants: getCourseParticipants,
  getUpcoming: getUpcomingCourses,
};

