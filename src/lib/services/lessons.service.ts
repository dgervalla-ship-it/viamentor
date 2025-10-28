/**
 * VIAMENTOR - Service Leçons Pratiques
 * Gestion CRUD des leçons avec Supabase
 */

import { supabase } from '../supabase';

export interface Lesson {
  id: string;
  tenant_id: string;
  student_id: string;
  instructor_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  lesson_type: 'practical' | 'motorway' | 'night' | 'parking';
  category: string;
  pickup_location?: string;
  dropoff_location?: string;
  vehicle_id?: string;
  student_rating?: number;
  instructor_notes?: string;
  skills_practiced?: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  cancellation_reason?: string;
  cancelled_at?: string;
  price: number;
  payment_status: 'pending' | 'paid';
  created_at: string;
  updated_at: string;
}

export interface CreateLessonInput {
  student_id: string;
  instructor_id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_minutes?: number;
  lesson_type?: 'practical' | 'motorway' | 'night' | 'parking';
  category: string;
  pickup_location?: string;
  dropoff_location?: string;
  vehicle_id?: string;
  price: number;
}

/**
 * Récupérer toutes les leçons
 */
export async function getAllLessons(): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer une leçon par ID
 */
export async function getLessonById(id: string): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    throw error;
  }

  return data;
}

/**
 * Créer une leçon
 */
export async function createLesson(input: CreateLessonInput): Promise<Lesson> {
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
    .from('lessons')
    .insert({
      ...input,
      tenant_id: userData.tenant_id,
      duration_minutes: input.duration_minutes || 50,
      lesson_type: input.lesson_type || 'practical',
      status: 'scheduled',
      payment_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating lesson:', error);
    throw error;
  }

  return data;
}

/**
 * Mettre à jour une leçon
 */
export async function updateLesson(
  id: string,
  input: Partial<CreateLessonInput> & {
    status?: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
    instructor_notes?: string;
    student_rating?: number;
  }
): Promise<Lesson> {
  const { data, error } = await supabase
    .from('lessons')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lesson:', error);
    throw error;
  }

  return data;
}

/**
 * Annuler une leçon
 */
export async function cancelLesson(
  id: string,
  reason: string
): Promise<void> {
  const { error } = await supabase
    .from('lessons')
    .update({
      status: 'cancelled',
      cancellation_reason: reason,
      cancelled_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error cancelling lesson:', error);
    throw error;
  }
}

/**
 * Récupérer les leçons d'un étudiant
 */
export async function getStudentLessons(studentId: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching student lessons:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer les leçons d'un instructeur
 */
export async function getInstructorLessons(instructorId: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('instructor_id', instructorId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching instructor lessons:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer les leçons à venir
 */
export async function getUpcomingLessons(): Promise<Lesson[]> {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .gte('date', today)
    .eq('status', 'scheduled')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming lessons:', error);
    throw error;
  }

  return data || [];
}

/**
 * Récupérer les leçons d'une journée
 */
export async function getLessonsByDate(date: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('date', date)
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching lessons by date:', error);
    throw error;
  }

  return data || [];
}

/**
 * Vérifier les disponibilités d'un instructeur
 */
export async function checkInstructorAvailability(
  instructorId: string,
  date: string,
  startTime: string,
  endTime: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('instructor_id', instructorId)
    .eq('date', date)
    .eq('status', 'scheduled')
    .or(`start_time.lte.${startTime},end_time.gte.${endTime}`);

  if (error) {
    console.error('Error checking instructor availability:', error);
    throw error;
  }

  // Instructeur disponible si aucune leçon ne chevauche
  return data.length === 0;
}

