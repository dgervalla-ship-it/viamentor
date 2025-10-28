/**
 * Viamentor - Service Examens
 * Gestion CRUD des examens (théoriques et pratiques) avec Supabase
 */

import { supabase } from '../supabase';

export interface Exam {
  id: string;
  tenant_id: string;
  student_id: string;
  exam_type: 'theory' | 'practical';
  category: string;
  exam_date: string;
  exam_time?: string;
  location?: string;
  examiner?: string;
  result?: 'passed' | 'failed' | 'pending';
  score?: number;
  max_score?: number;
  attempts_count: number;
  notes?: string;
  certificate_issued?: boolean;
  certificate_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExamInput {
  student_id: string;
  exam_type: 'theory' | 'practical';
  category: string;
  exam_date: string;
  exam_time?: string;
  location?: string;
  examiner?: string;
}

export interface UpdateExamInput extends Partial<CreateExamInput> {
  result?: 'passed' | 'failed' | 'pending';
  score?: number;
  notes?: string;
}

/**
 * Récupérer tous les examens
 */
export async function getAllExams(): Promise<Exam[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('exam_date', { ascending: false });

  if (error) {
    console.error('Error fetching exams:', error);
    throw new Error(`Failed to fetch exams: ${error.message}`);
  }

  return data || [];
}

/**
 * Récupérer un examen par ID
 */
export async function getExamById(id: string): Promise<Exam | null> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching exam:', error);
    throw new Error(`Failed to fetch exam: ${error.message}`);
  }

  return data;
}

/**
 * Créer un examen
 */
export async function createExam(input: CreateExamInput): Promise<Exam> {
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

  // Compter les tentatives précédentes
  const { count } = await supabase
    .from('exams')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', input.student_id)
    .eq('exam_type', input.exam_type)
    .eq('category', input.category);

  const { data, error } = await supabase
    .from('exams')
    .insert({
      ...input,
      tenant_id: userData.tenant_id,
      result: 'pending',
      attempts_count: (count || 0) + 1,
      certificate_issued: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating exam:', error);
    throw new Error(`Failed to create exam: ${error.message}`);
  }

  return data;
}

/**
 * Mettre à jour un examen
 */
export async function updateExam(
  id: string,
  input: UpdateExamInput
): Promise<Exam> {
  const { data, error } = await supabase
    .from('exams')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating exam:', error);
    throw new Error(`Failed to update exam: ${error.message}`);
  }

  return data;
}

/**
 * Supprimer un examen
 */
export async function deleteExam(id: string): Promise<void> {
  const { error } = await supabase
    .from('exams')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting exam:', error);
    throw new Error(`Failed to delete exam: ${error.message}`);
  }
}

/**
 * Récupérer les examens d'un élève
 */
export async function getStudentExams(studentId: string): Promise<Exam[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('student_id', studentId)
    .order('exam_date', { ascending: false });

  if (error) {
    console.error('Error fetching student exams:', error);
    throw new Error(`Failed to fetch student exams: ${error.message}`);
  }

  return data || [];
}

/**
 * Récupérer les examens à venir
 */
export async function getUpcomingExams(): Promise<Exam[]> {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .gte('exam_date', today)
    .eq('result', 'pending')
    .order('exam_date', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming exams:', error);
    throw new Error(`Failed to fetch upcoming exams: ${error.message}`);
  }

  return data || [];
}

/**
 * Enregistrer le résultat d'un examen
 */
export async function recordExamResult(
  id: string,
  result: 'passed' | 'failed',
  score?: number,
  maxScore?: number
): Promise<Exam> {
  const updateData: UpdateExamInput = {
    result,
    score,
  };

  // Si réussi, émettre le certificat
  if (result === 'passed') {
    updateData.certificate_issued = true;
    updateData.certificate_date = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('exams')
    .update({
      ...updateData,
      max_score: maxScore,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error recording exam result:', error);
    throw new Error(`Failed to record exam result: ${error.message}`);
  }

  return data;
}

/**
 * Obtenir les statistiques d'examens
 */
export async function getExamStats(studentId?: string): Promise<{
  total: number;
  passed: number;
  failed: number;
  pending: number;
  successRate: number;
}> {
  let query = supabase.from('exams').select('result');
  
  if (studentId) {
    query = query.eq('student_id', studentId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching exam stats:', error);
    throw new Error(`Failed to fetch exam stats: ${error.message}`);
  }

  const exams = data || [];
  const passed = exams.filter(e => e.result === 'passed').length;
  const failed = exams.filter(e => e.result === 'failed').length;
  const pending = exams.filter(e => e.result === 'pending').length;

  return {
    total: exams.length,
    passed,
    failed,
    pending,
    successRate: exams.length > 0 ? (passed / exams.length) * 100 : 0,
  };
}

/**
 * Service object
 */
export const examsService = {
  getAll: getAllExams,
  getById: getExamById,
  create: createExam,
  update: updateExam,
  delete: deleteExam,
  getByStudentId: getStudentExams,
  getUpcoming: getUpcomingExams,
  recordResult: recordExamResult,
  getStats: getExamStats,
};

